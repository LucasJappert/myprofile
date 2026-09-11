/** URL pública del sitio (GitHub Pages). Una sola fuente para SEO y sitemap. */
export const site = {
  origin: 'https://lucasjappert.github.io',
  basePath: '/myprofile/',
  title: 'Lucas Jappert | Full Stack Engineering Lead',
  description:
    'Liderazgo técnico e IA aplicada. Responsable de Sistemas en Agroideas: APIX, asistentes de IA, PostgreSQL y productos propios. Más de 15 años creando software.',
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
