/** URL pública del sitio (GitHub Pages). Una sola fuente para SEO y sitemap. */
export const site = {
  origin: 'https://lucasjappert.github.io',
  basePath: '/myprofile/',
  title: 'Lucas Jappert | Full Stack Engineering Lead',
  description:
    'Engineering Lead en Agroideas S.A. (agrotech). TypeScript, Python, Vue, FastAPI, Azure e IA aplicada. 15+ años construyendo software de punta a punta.',
  ogImagePath: 'assets/og-profile.png',
  ogImageWidth: 1596,
  ogImageHeight: 829,
  locale: 'es_AR',
  language: 'es-AR',
  email: 'lucasnicolasjappert@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/lucasjappert/',
    'https://github.com/LucasJappert',
    'https://www.youtube.com/@GanasDeSaber',
  ],
} as const

/** URL absoluta del sitio o de un recurso bajo `public/`. */
export function siteUrl(path = ''): string {
  const base = `${site.origin}${site.basePath}`.replace(/\/+$/, '') + '/'
  if (!path) return base
  return base + path.replace(/^\//, '')
}
