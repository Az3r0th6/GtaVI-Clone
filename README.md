# Grand Theft Auto VI — Rockstar Games Full-Stack Clone

**Desarrollado por:** Martin Calvo Ruiz (`tinchoccr@gmail.com`)  
**Producción en vivo (Render):** [https://gtavi-clone.onrender.com/](https://gtavi-clone.onrender.com/)

## Características Principales
- **Réplica Full-Stack de `rockstargames.com/VI`**: Hero interactivo con anuncio oficial del Launch Trailer, barra sticky de 3 zonas, galería de 4 tráilers con capítulos interactivos, comparativa de ediciones (*Standard*, *Ultimate* y *The Vice City Collector’s Box*), sintonizador de radio con síntesis Web Audio en tiempo real, explorador de regiones de Leonida, galería 4K y tienda oficial.
- **Firma de Autor Integrada y Personalizable**: Incluye insignia de autor en la barra de navegación, el hero y el pie de página (`Desarrollado por Martin Calvo Ruiz`), además de un modal interactivo (`/VI/developer`) y endpoint `POST /api/developer` para personalizar el nombre y firma en vivo.
- **Servidor Express + Vite**: Backend en `server.ts` que gestiona reservas (`/api/preorders`), reproducciones de tráilers (`/api/trailers/:id/view`), radio (`/api/radio/:stationId/listen`), suscripciones a *Rockstar Propaganda* (`/api/propaganda`) y créditos del desarrollador (`/api/developer`).

## Cómo actualizar tu repositorio de GitHub y Render (`https://gtavi-clone.onrender.com/`)

1. **Exportar o sincronizar a GitHub desde Google AI Studio:**
   - Haz clic en el icono de **GitHub** (o **Download ZIP**) en la esquina superior derecha de Google AI Studio para enviar los cambios a tu repositorio conectado.
2. **Despliegue automático en Render:**
   - Al hacer *push* a la rama principal (`main`) de tu repositorio de GitHub, **Render** detectará el nuevo commit y actualizará automáticamente [https://gtavi-clone.onrender.com/](https://gtavi-clone.onrender.com/).
