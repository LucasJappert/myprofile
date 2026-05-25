import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { site, siteUrl } from './src/data/site'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildSeoHead(buildId: string): string {
  const url = siteUrl()
  const ogImage = `${siteUrl(site.ogImagePath)}?v=${buildId}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lucas Jappert',
    jobTitle: 'Responsable de Sistemas',
    url,
    image: ogImage,
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rafaela',
      addressRegion: 'Santa Fe',
      addressCountry: 'AR',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Agroideas S.A.',
    },
    sameAs: [...site.sameAs],
    knowsAbout: [
      'TypeScript',
      'Python',
      'Vue.js',
      'Agrotech',
      'Inteligencia artificial',
      'Azure',
    ],
  }

  const title = escapeHtml(site.title)
  const description = escapeHtml(site.description)

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lucas Jappert" />
    <meta property="og:locale" content="${site.locale}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="${site.ogImageWidth}" />
    <meta property="og:image:height" content="${site.ogImageHeight}" />
    <meta property="og:image:alt" content="Lucas Jappert — perfil profesional full stack y agrotech" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="Lucas Jappert — perfil profesional full stack y agrotech" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
}

function buildCacheBustPlugin(): Plugin {
  const buildId = process.env.VITE_BUILD_ID ?? 'dev'
  return {
    name: 'build-cache-bust',
    transformIndexHtml(html) {
      return html
        .replace('<!--INJECT_SEO-->', buildSeoHead(buildId))
        .replace(/(href="[^"]*favicon\.svg)(")/, `$1?v=${buildId}$2`)
        .replace('</head>', `    <meta name="build-version" content="${buildId}" />\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), buildCacheBustPlugin()],
  base: '/myprofile/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
