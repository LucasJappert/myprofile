/** Identificador de build (commit en CI); invalida caché de archivos en public/. */
const buildId = import.meta.env.VITE_BUILD_ID ?? 'dev'

/** URL bajo BASE_URL con query de versión para forzar actualización tras cada deploy. */
export function assetUrl(path: string): string {
  const normalized = path.replace(/^\//, '')
  const url = `${import.meta.env.BASE_URL}${normalized}`
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}v=${buildId}`
}
