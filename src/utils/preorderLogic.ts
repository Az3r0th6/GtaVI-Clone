export type EditionId = 'standard' | 'ultimate' | 'collectors';
export type PlatformId = 'ps5' | 'xbox';
export type FormatId = 'digital' | 'physical';

export interface EditionInfo {
  id: EditionId;
  name: string;
  subtitle: string;
  priceUsd: number;
  badge?: string;
  bonuses: string[];
}

export interface PreorderInput {
  fullName: string;
  email: string;
  edition: EditionId;
  platform: PlatformId;
  format: FormatId;
  region: string;
  ageVerified: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof PreorderInput, string>>;
}

export const EDITIONS: Record<EditionId, EditionInfo> = {
  standard: {
    id: 'standard',
    name: 'Standard Edition',
    subtitle: 'Grand Theft Auto VI full base game plus the Vintage Vice City Pack pre-order bonus.',
    priceUsd: 69.99,
    bonuses: [
      'Grand Theft Auto VI Full Game',
      'Pre-Order Bonus: Vintage Vice City Pack',
      'Ocean View Pastel Suit & Neon Infernus Livery',
      'Early Access to Vice City Radio Digital Sampler',
    ],
  },
  ultimate: {
    id: 'ultimate',
    name: 'Ultimate Edition',
    subtitle: 'An exclusive collection of items threaded across all aspects of Jason and Lucia’s story.',
    priceUsd: 99.99,
    badge: 'MOST POPULAR',
    bonuses: [
      'Grand Theft Auto VI Full Game',
      'Pre-Order Bonus: Vintage Vice City Pack',
      'Jason & Lucia High-Roller Heist Attire & Custom Weapons',
      'Leonida Keys Speedboat & Custom Muscle Car Pack',
      'Digital Official Soundtrack: GTAVI The Album',
      'GTA Online $2,500,000 Bonus Cash & Leonida Safe House',
    ],
  },
  collectors: {
    id: 'collectors',
    name: 'The Vice City Collector’s Box',
    subtitle: 'Physical limited-run Collector’s Box with SteelBook, 3x LP Vinyl Set, and Vice City Lockbox.',
    priceUsd: 199.99,
    badge: 'LIMITED EDITION',
    bonuses: [
      'Everything in the Ultimate Edition',
      'Custom Embossed Vice City Sunset SteelBook',
      'GTAVI: The Album Triple Gatefold 180g Neon Vinyl',
      '220-Page Hardcover Art of Leonida & Vice City Book',
      'Bank of Leonida Security Deposit Lockbox & Replica Key',
    ],
  },
};

export function validatePreorderInput(input: PreorderInput): ValidationResult {
  const errors: Partial<Record<keyof PreorderInput, string>> = {};

  const trimmedName = (input.fullName || '').trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedEmail = (input.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address for your Rockstar reservation.';
  }

  if (!input.edition || !EDITIONS[input.edition]) {
    errors.edition = 'Please select a valid edition.';
  }

  if (input.platform !== 'ps5' && input.platform !== 'xbox') {
    errors.platform = 'Please select PlayStation 5 or Xbox Series X|S.';
  }

  if (input.format !== 'digital' && input.format !== 'physical') {
    errors.format = 'Please select Digital or Physical format.';
  }

  if (!input.region || input.region.trim().length === 0) {
    errors.region = 'Please select your region.';
  }

  if (!input.ageVerified) {
    errors.ageVerified = 'You must confirm you are 17+ (ESRB Mature 17+) to reserve Grand Theft Auto VI.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateOrderBreakdown(edition: EditionId, format: FormatId, region: string) {
  const info = EDITIONS[edition] || EDITIONS.standard;
  const basePrice = info.priceUsd;
  const shipping = format === 'physical' ? (edition === 'collectors' ? 0 : 6.99) : 0;
  const taxRate = region === 'US' ? 0.07 : region === 'EU' ? 0.19 : 0.08;
  const estimatedTax = Number((basePrice * taxRate).toFixed(2));
  const total = Number((basePrice + shipping + estimatedTax).toFixed(2));

  return {
    basePrice,
    shipping,
    estimatedTax,
    total,
  };
}

export function generateConfirmationCode(email: string, edition: EditionId, platform: PlatformId): string {
  const clean = email.trim().toLowerCase();
  let hash = 2166136261;
  for (let i = 0; i < clean.length; i++) {
    hash ^= clean.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const hex = (hash >>> 0).toString(16).toUpperCase().padStart(8, '0').slice(0, 6);
  const edCode = edition === 'ultimate' ? 'ULT' : edition === 'collectors' ? 'COL' : 'STD';
  const platCode = platform === 'ps5' ? 'PS5' : 'XBX';
  return `RSG-VI-${edCode}-${platCode}-${hex}`;
}

export function validatePropagandaSignup(email: string, birthYear: string): { valid: boolean; error?: string } {
  const trimmedEmail = (email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  const yearNum = Number(birthYear);
  if (!birthYear || Number.isNaN(yearNum) || yearNum < 1900 || yearNum > 2009) {
    return { valid: false, error: 'You must be 17 or older (born 2009 or earlier) to subscribe.' };
  }
  return { valid: true };
}
