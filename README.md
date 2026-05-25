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

## Estructura

- `src/data/` — contenido del CV (sincronizado con `my-cv.md`)
- `legacy/` — sitio anterior (referencia)
- `public/Profile.pdf` — CV descargable

## Paleta

- Celeste `#00e8ff`
- Rosa neón `#ff3d9a`
- Violeta `#9d4edd` (transiciones celeste → rosa)
