/** URL pública del sitio (GitHub Pages). Una sola fuente para SEO y sitemap. */
export const site = {
  origin: 'https://lucasjappert.github.io',
  basePath: '/myprofile/',
  title: 'Lucas Jappert | Responsable de Sistemas · Full Stack',
  description:
    'Responsable de Sistemas y desarrollador full stack en Agroideas S.A. (agrotech). TypeScript, Python, Vue, IA aplicada, Azure y 15+ años llevando productos a producción.',
  ogImagePath: 'assets/og-profile.png',
  ogImageWidth: 1596,
  ogImageHeight: 829,
  locale: 'es_AR',
  language: 'es-AR',
  email: 'lucasnicolasjappert@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/lucasjappert/',
    'https://github.com/LucasJappert',
  ],
} as const

/** URL absoluta del sitio o de un recurso bajo `public/`. */
export function siteUrl(path = ''): string {
  const base = `${site.origin}${site.basePath}`.replace(/\/+$/, '') + '/'
  if (!path) return base
  return base + path.replace(/^\//, '')
}
