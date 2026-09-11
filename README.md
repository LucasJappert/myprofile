# myprofile — Lucas Jappert

Sitio de perfil profesional. Vue 3 + Vite + TypeScript, desplegado en GitHub Pages.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173/myprofile/` (el `base` apunta al subpath del repo).

## Build

```bash
npm run build
npm run preview
```

## Actualizar contenido y CV

El contenido editorial vive en `src/data/`: perfil, experiencia, proyectos,
competencias y formación. La web y el CV comparten estos datos.

```bash
# Solo la primera vez, para generar y verificar el PDF
npx playwright install chromium
npm run cv
npm run build
```

`npm run cv` genera `public/Lucas-Jappert-CV.pdf` (dos páginas), `docs/cv.md`
y una vista intermedia en `tmp/cv.html`. Usa `docs/cv-template.html` como diseño
y rechaza contenido que exceda el tamaño de página. Revisar visualmente el PDF
antes de publicarlo.

Si ya tenés Chromium instalado, el generador admite su ruta mediante
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

Para sincronizar también la copia local del CV en el repo hermano:

```bash
npm run cv -- --markdown-output ../my-cv/my-cv.md
```

Actualización editorial: septiembre de 2026. Los proyectos en desarrollo y las
integraciones de herramientas de terceros se identifican como tales; no se
publican métricas de impacto sin evidencia.

## Deploy

Al hacer merge a `main`, el workflow `.github/workflows/deploy.yml` publica `dist/` en GitHub Pages.

En **Settings → Pages**, el origen debe ser **GitHub Actions** (no “Deploy from a branch”).

## Analytics (visitas)

Tracking vía el **mismo** Google Apps Script y Sheet que la landing; eventos del perfil en pestaña **MyProfile**. Setup del script GAS: [`docs/ANALYTICS-GAS.md`](docs/ANALYTICS-GAS.md).

- Producción: URL en `.env.production` (misma `/exec` que la landing).
- Probar en local: copiá `.env.example` → `.env.local` con `VITE_ANALYTICS_ALLOW_DEV=true`.

## Estructura

- `src/data/` — fuente compartida de la web y del CV
- `legacy/` — sitio anterior (referencia)
- `public/Lucas-Jappert-CV.pdf` — CV descargable actualizado
- `docs/cv.md` — CV completo en Markdown, generado desde el contenido de la web
- `Profile.pdf` — referencia histórica, no es el CV descargable

## Paleta

- Celeste `#00e8ff`
- Agua `#2ee8b8`
- Verde `#22e884` (gradiente marca: celeste → agua → verde)
