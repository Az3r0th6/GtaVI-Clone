import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  validatePreorderInput,
  calculateOrderBreakdown,
  generateConfirmationCode,
  validatePropagandaSignup,
  validateDeveloperProfile,
  DEFAULT_DEVELOPER_PROFILE,
  EDITIONS,
  type PreorderInput,
  type DeveloperProfile,
} from './src/utils/preorderLogic.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredPreorder extends PreorderInput {
  id: string;
  confirmationCode: string;
  totalUsd: number;
  createdAt: string;
}

interface PropagandaSubscriber {
  email: string;
  birthYear: string;
  subscribedAt: string;
}

let developerProfile: DeveloperProfile = {
  ...DEFAULT_DEVELOPER_PROFILE,
  name: process.env.DEVELOPER_NAME || DEFAULT_DEVELOPER_PROFILE.name,
  role: process.env.DEVELOPER_ROLE || DEFAULT_DEVELOPER_PROFILE.role,
  email: process.env.DEVELOPER_EMAIL || DEFAULT_DEVELOPER_PROFILE.email,
  renderUrl: process.env.RENDER_EXTERNAL_URL || DEFAULT_DEVELOPER_PROFILE.renderUrl,
};

const preorders: StoredPreorder[] = [
  {
    id: 'pre-1',
    fullName: 'Lucia Caminos',
    email: 'lucia.caminos@vicecity.net',
    edition: 'ultimate',
    platform: 'ps5',
    format: 'digital',
    region: 'US',
    ageVerified: true,
    confirmationCode: 'RSG-VI-ULT-PS5-9F42A1',
    totalUsd: 106.99,
    createdAt: '2026-10-18T19:30:00Z',
  },
  {
    id: 'pre-2',
    fullName: 'Jason Duval',
    email: 'jason.duval@leonidakeys.org',
    edition: 'collectors',
    platform: 'xbox',
    format: 'physical',
    region: 'US',
    ageVerified: true,
    confirmationCode: 'RSG-VI-COL-XBX-3B81E0',
    totalUsd: 213.99,
    createdAt: '2026-10-19T02:15:00Z',
  },
];

const propagandaSubscribers: PropagandaSubscriber[] = [
  {
    email: 'vicecity.insider@rockstargames.com',
    birthYear: '1995',
    subscribedAt: '2026-10-15T12:00:00Z',
  },
];

const trailerViews: Record<string, number> = {
  launch: 84290410,
  extended: 51920185,
  trailer2: 142850900,
  trailer1: 248910320,
};

const radioStationPlays: Record<string, number> = {
  flash_fm: 194200,
  calle_ocho: 173850,
  vice_beach_underground: 158400,
  gator_country: 112300,
  neon_nights_105: 208910,
};

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.get('/api/state', (_req, res) => {
    res.json({
      preorders,
      propagandaCount: 1428500 + propagandaSubscribers.length,
      trailerViews,
      radioStationPlays,
      editions: EDITIONS,
      developerProfile,
    });
  });

  app.post('/api/developer', (req, res) => {
    const check = validateDeveloperProfile(req.body || {});
    if (!check.valid || !check.sanitized) {
      res.status(400).json({ error: check.error || 'Invalid developer profile' });
      return;
    }
    developerProfile = check.sanitized;
    res.json({ developerProfile });
  });

  app.post('/api/preorders', (req, res) => {
    const input = req.body as PreorderInput;
    const validation = validatePreorderInput(input);
    if (!validation.valid) {
      res.status(400).json({
        error: 'Validation failed',
        errors: validation.errors,
      });
      return;
    }

    const breakdown = calculateOrderBreakdown(input.edition, input.format, input.region);
    const confirmationCode = generateConfirmationCode(input.email, input.edition, input.platform);

    const record: StoredPreorder = {
      ...input,
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      id: `pre-${Date.now()}`,
      confirmationCode,
      totalUsd: breakdown.total,
      createdAt: new Date().toISOString(),
    };

    preorders.unshift(record);

    res.status(201).json({
      preorder: record,
      breakdown,
      totalReservations: preorders.length,
    });
  });

  app.post('/api/trailers/:id/view', (req, res) => {
    const { id } = req.params;
    if (trailerViews[id] !== undefined) {
      trailerViews[id] += 1;
    } else {
      trailerViews[id] = 1;
    }
    res.json({ id, views: trailerViews[id], trailerViews });
  });

  app.post('/api/radio/:stationId/listen', (req, res) => {
    const { stationId } = req.params;
    if (radioStationPlays[stationId] !== undefined) {
      radioStationPlays[stationId] += 1;
    } else {
      radioStationPlays[stationId] = 1;
    }
    res.json({ stationId, plays: radioStationPlays[stationId], radioStationPlays });
  });

  app.post('/api/propaganda', (req, res) => {
    const { email, birthYear } = req.body as { email: string; birthYear: string };
    const check = validatePropagandaSignup(email, birthYear);
    if (!check.valid) {
      res.status(400).json({ error: check.error });
      return;
    }

    const exists = propagandaSubscribers.some(
      (s) => s.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!exists) {
      propagandaSubscribers.push({
        email: email.trim(),
        birthYear: String(birthYear).trim(),
        subscribedAt: new Date().toISOString(),
      });
    }

    res.status(201).json({
      subscribed: true,
      email: email.trim(),
      propagandaCount: 1428500 + propagandaSubscribers.length,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    app.get('/@vite/client', (_req, res) => {
      res.type('application/javascript').send(`
const sheetsMap = new Map();
export function updateStyle(id, content) {
  if (typeof document === 'undefined') return;
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-vite-dev-id', id);
    style.textContent = content;
    document.head.appendChild(style);
  } else {
    style.textContent = content;
  }
  sheetsMap.set(id, style);
}
export function removeStyle(id) {
  const style = sheetsMap.get(id);
  if (style && style.parentNode) {
    style.parentNode.removeChild(style);
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    accept() {},
    dispose() {},
    prune() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
    data: {},
  };
}
export function injectQuery(url) {
  return url;
}
export class ErrorOverlay extends HTMLElement {}
`);
    });

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Rockstar Games /VI Full-Stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
