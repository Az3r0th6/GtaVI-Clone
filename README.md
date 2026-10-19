# Grand Theft Auto VI — Rockstar Games Full-Stack Clone

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Clon **Full-Stack** de alto detalle de la página oficial de **Grand Theft Auto VI (`rockstargames.com/VI`)**, construido con **React 19, TypeScript, Tailwind CSS v4 y Express**. Replica la experiencia visual, tipográfica e interactiva del portal oficial ambientado en **Vice City** y el estado de **Leonida**.

🔗 **Demo en Vivo (Render):** [https://gtavi-clone.onrender.com/](https://gtavi-clone.onrender.com/)

---

## ✨ Características Principales

- **Hero & Navegación Oficial:**
  - Banner superior animado del *Launch Trailer* con siluetas tropicales de Vice City.
  - Barra de navegación *sticky* de 3 zonas con acceso rápido a cada sección y menú desplegable a pantalla completa.
  - Mosaico principal en alta definición con fecha de lanzamiento (*Coming November 19, 2026*), insignias vectoriales de **PlayStation 5** y **Xbox Series X|S**, y botón de reserva interactivo.
- **Reproductor Interactivo de Tráilers (`/VI/launch-trailer`):**
  - Soporte para los 4 avances oficiales (*Launch Trailer*, *An Extended Look*, *Trailer 2* y *Trailer 1*).
  - Selector de capítulos interactivo, barra de progreso en tiempo real y contador de visualizaciones sincronizado con el servidor.
- **Sistema Full-Stack de Pre-Orden (`/VI/pre-order`):**
  - Selección de edición (*Standard Edition*, *Ultimate Edition* y *The Vice City Collector’s Box*), plataforma (*PS5* / *Xbox Series X|S*), formato (*Digital* / *Físico*) y región.
  - Cálculo automático de impuestos y envío, validación de mayoría de edad (**ESRB Mature 17+**) y generación determinista de códigos únicos de reserva (`RSG-VI-...`).
- **Sintonizador de Radio de Vice City (`/VI/radio`):**
  - Previsualización interactiva de emisoras (*Flash FM*, *Calle Ocho*, *Vice Beach Underground*, *Gator Country*) con síntesis de audio en tiempo real mediante **Web Audio API**.
- **Explorador de Leonida (`/VI/leonida`) y Galería 4K (`/VI/media`):**
  - Dossier interactivo de regiones (*Vice City*, *Leonida Keys*, *Grassrivers*, *Port Gellhorn*) y *lightbox* de capturas y arte oficial con descarga directa.
- **Tienda Oficial (`/VI/shop`) & Rockstar Newswire:**
  - Catálogo filtrable de *Merchandise* y *Collector’s Box*, artículos completos del *Newswire* y suscripción al boletín *Rockstar Propaganda*.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Web Audio API, History API Routing |
| **Backend** | Node.js, Express (`server.ts`), REST API JSON |
| **Build & Tooling** | Vite 8, `tsx`, Node.js Test Runner (`node:test`) |
| **Despliegue** | Render ([gtavi-clone.onrender.com](https://gtavi-clone.onrender.com/)) |

---

## 📁 Estructura del Proyecto

```text
├── public/
│   └── assets/vi/                  # Recursos gráficos oficiales, key art y emblemas SVG/PNG/JPG
├── src/
│   ├── components/
│   │   ├── NavbarAndHero.tsx       # Banner superior, navbar sticky y hero principal
│   │   ├── TrailersAndEditionsSection.tsx # Showcase de tráilers, ediciones y bonos de reserva
│   │   ├── WorldShopAndNewsSection.tsx    # Narrativa de Vice City, radio, Leonida, tienda y footer
│   │   ├── InteractiveModals.tsx   # Modales interactivos sincronizados con rutas /VI/*
│   │   └── RockstarIcons.tsx       # Iconografía vectorial oficial (VI, R*, PS5, Xbox Series X|S)
│   ├── data/
│   │   └── gtaData.ts              # Datos estructurados de tráilers, emisoras, regiones y tienda
│   ├── utils/
│   │   ├── preorderLogic.ts        # Lógica pura de validación, cálculo de precios y rutas
│   │   └── preorderLogic.test.ts   # Pruebas unitarias automatizadas (node:test)
│   ├── App.tsx                     # Componente raíz y sincronización con la API
│   ├── main.tsx                    # Punto de entrada de React
│   └── index.css                   # Estilos globales y gradientes de Vice City
├── server.ts                       # Servidor Full-Stack Express + Vite
├── package.json
└── tsconfig.json
```

---

## 🔌 Endpoints de la API (`server.ts`)

- `GET /api/state` — Devuelve el estado global (reservas activas, reproducciones de tráilers, radio y suscriptores).
- `POST /api/preorders` — Valida los datos del formulario y registra una nueva reserva devolviendo el desglose y código de confirmación.
- `POST /api/trailers/:id/view` — Incrementa el contador de visualizaciones del tráiler seleccionado.
- `POST /api/radio/:stationId/listen` — Registra una sintonización en vivo de una emisora de radio.
- `POST /api/propaganda` — Valida mayoría de edad (17+) y registra la suscripción al boletín *Rockstar Propaganda*.

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/gtavi-clone.git
   cd gtavi-clone
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo (Frontend + Backend en el puerto 3000):**
   ```bash
   npm run dev
   ```

4. **Ejecutar pruebas unitarias:**
   ```bash
   node --test src/utils/preorderLogic.test.ts
   ```

5. **Compilar para producción:**
   ```bash
   npm run build
   npm start
   ```

---

## 📄 Licencia y Autoría

**© 2026 Martin Calvo Ruiz. Todos los derechos reservados.**  
Proyecto desarrollado con fines de portafolio e ingeniería Full-Stack. Todas las marcas, logotipos e imágenes de *Grand Theft Auto VI* pertenecen a *Rockstar Games / Take-Two Interactive*.
