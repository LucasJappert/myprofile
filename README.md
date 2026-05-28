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

## Deploy

Al hacer merge a `main`, el workflow `.github/workflows/deploy.yml` publica `dist/` en GitHub Pages.

En **Settings → Pages**, el origen debe ser **GitHub Actions** (no “Deploy from a branch”).

## Analytics (visitas)

Tracking vía el **mismo** Google Apps Script y Sheet que la landing; eventos del perfil en pestaña **MyProfile**. Setup del script GAS: [`docs/ANALYTICS-GAS.md`](docs/ANALYTICS-GAS.md).

- Producción: URL en `.env.production` (misma `/exec` que la landing).
- Probar en local: copiá `.env.example` → `.env.local` con `VITE_ANALYTICS_ALLOW_DEV=true`.

## Estructura

- `src/data/` — contenido del CV (sincronizado con `my-cv.md`)
- `legacy/` — sitio anterior (referencia)
- `public/Profile.pdf` — CV descargable

## Paleta

- Celeste `#00e8ff`
- Agua `#2ee8b8`
- Verde `#22e884` (gradiente marca: celeste → agua → verde)
