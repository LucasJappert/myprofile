export type ClientContext = {
  device_type: string
  browser: string
  os: string
  viewport: string
  screen: string
  language: string
  referrer: string
  timezone: string
  user_agent: string
}

let cached: ClientContext | null = null

function truncate(value: string, max: number): string {
  if (value.length <= max) return value
  return value.slice(0, max)
}

function detectDeviceType(ua: string): string {
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet'
  if (/Mobile|iPhone|iPod|Android.*Mobile|IEMobile|Opera Mini/i.test(ua)) return 'mobile'
  return 'desktop'
}

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return 'Edge'
  if (/OPR\/|Opera/i.test(ua)) return 'Opera'
  if (/Firefox\//i.test(ua)) return 'Firefox'
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return 'Chrome'
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'Safari'
  return 'Other'
}

function detectOs(ua: string, platform: string): string {
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
  if (/Android/i.test(ua)) return 'Android'
  if (/CrOS/i.test(ua)) return 'ChromeOS'
  if (/Linux/i.test(ua) || /Linux/i.test(platform)) return 'Linux'
  return 'Other'
}

function readTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  } catch {
    return ''
  }
}

/** Metadatos del visitante (cacheados por carga). */
export function getClientContext(): ClientContext {
  if (cached) return cached

  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''

  cached = {
    device_type: detectDeviceType(ua),
    browser: detectBrowser(ua),
    os: detectOs(ua, platform),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${screen.width}x${screen.height}`,
    language: navigator.language || '',
    referrer: truncate(document.referrer || '', 500),
    timezone: readTimezone(),
    user_agent: truncate(ua, 500),
  }

  return cached
}

/** Versión compacta para GET (evita URLs demasiado largas). */
export function getClientContextForGet(): Omit<ClientContext, 'user_agent'> & {
  user_agent?: never
} {
  const ctx = getClientContext()
  return {
    device_type: ctx.device_type,
    browser: ctx.browser,
    os: ctx.os,
    viewport: ctx.viewport,
    screen: ctx.screen,
    language: ctx.language,
    referrer: truncate(ctx.referrer, 200),
    timezone: ctx.timezone,
  }
}
