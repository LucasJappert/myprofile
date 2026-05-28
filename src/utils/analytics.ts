/** Visitas y eventos → mismo Apps Script que la landing (pestaña MyProfile). Ver docs/ANALYTICS-GAS.md */

import { getClientContext, getClientContextForGet } from '@/utils/clientContext'

const SESSION_KEY = 'myprofile_session_id'
const UTM_STORAGE_KEY = 'myprofile_utms'
/** Pestaña destino en la Google Sheet compartida con la landing */
const ANALYTICS_SHEET_TAB = 'MyProfile'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

type UtmKey = (typeof UTM_KEYS)[number]
type Utms = Partial<Record<UtmKey, string>>

export type AnalyticsEventPayload = {
  type: 'event'
  /** Pestaña en la Sheet; el script de la landing usa "Eventos" por defecto */
  sheet_tab: string
  event: string
  section: string
  page: string
  page_path: string
  session_id: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
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

export type TrackOptions = {
  /** visit = beacon + POST (+ GET fuera de in-app browsers) */
  mode?: 'visit' | 'post' | 'get'
  /** Si false, permite el mismo evento+section en la misma carga */
  dedupe?: boolean
}

const sent = new Set<string>()

function endpoint(): string {
  const url = (import.meta.env.VITE_ANALYTICS_URL ?? '').trim()
  if (!url || url.includes('REEMPLAZAR')) return ''
  return url
}

export function isAnalyticsDevOrigin(): boolean {
  if (import.meta.env.VITE_ANALYTICS_ALLOW_DEV === 'true') return false
  if (typeof window === 'undefined') return true

  if (window.location.protocol === 'file:') return true

  const h = (window.location.hostname || '').toLowerCase()
  return h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h.endsWith('.local')
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(endpoint()) && !isAnalyticsDevOrigin()
}

function readUtmsFromParams(params: URLSearchParams): Utms {
  const out: Utms = {}
  for (const key of UTM_KEYS) {
    const v = params.get(key)
    if (v) out[key] = v
  }
  return out
}

export function persistUtmsFromUrl(): void {
  const fromUrl = readUtmsFromParams(new URLSearchParams(window.location.search))
  if (!Object.keys(fromUrl).length) return
  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {
    /* privado / ITP */
  }
}

function readStoredUtms(): Utms {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === 'object' ? (parsed as Utms) : {}
  } catch {
    return {}
  }
}

function readUtms(): Record<UtmKey, string> {
  const fromUrl = readUtmsFromParams(new URLSearchParams(window.location.search))
  const stored = readStoredUtms()
  const out = {} as Record<UtmKey, string>
  for (const key of UTM_KEYS) {
    out[key] = fromUrl[key] || stored[key] || ''
  }
  return out
}

function sessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
    sessionStorage.setItem(SESSION_KEY, id)
    return id
  } catch {
    return 's_anon'
  }
}

function pageLabel(): string {
  const host = window.location.host || window.location.hostname || ''
  return host ? `${host} · profile` : 'profile'
}

function buildPayload(event: string, section: string): AnalyticsEventPayload {
  const utms = readUtms()
  const ctx = getClientContext()
  return {
    type: 'event',
    sheet_tab: ANALYTICS_SHEET_TAB,
    event,
    section: section || '',
    page: pageLabel(),
    page_path: window.location.pathname + window.location.search,
    session_id: sessionId(),
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    utm_content: utms.utm_content,
    utm_term: utms.utm_term,
    ...ctx,
  }
}

function payloadForGet(payload: AnalyticsEventPayload): Record<string, string> {
  const compact = getClientContextForGet()
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries({ ...payload, ...compact })) {
    if (key === 'user_agent') continue
    if (value !== undefined && value !== null) out[key] = String(value)
  }
  return out
}

function isInAppBrowser(): boolean {
  const ua = navigator.userAgent || ''
  return /Instagram|FBAN|FBAV|FB_IAB|FBIOS|MetaIAB/i.test(ua)
}

function sendBeacon(payload: AnalyticsEventPayload): boolean {
  const url = endpoint()
  if (!url || !navigator.sendBeacon) return false
  try {
    const blob = new Blob([JSON.stringify(payload)], {
      type: 'text/plain;charset=utf-8',
    })
    return navigator.sendBeacon(url, blob)
  } catch {
    return false
  }
}

function sendPost(payload: AnalyticsEventPayload): void {
  const url = endpoint()
  if (!url) return

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* silencioso */
  })
}

function sendGet(payload: AnalyticsEventPayload): void {
  const url = endpoint()
  if (!url) return

  const base = url.includes('?') ? url.split('?')[0]! : url
  const params = new URLSearchParams(payloadForGet(payload))

  const img = new Image()
  img.src = `${base}?${params.toString()}`
}

function deliver(payload: AnalyticsEventPayload, mode: TrackOptions['mode']): void {
  if (mode === 'visit') {
    const beaconOk = sendBeacon(payload)
    if (!beaconOk) sendPost(payload)
    if (!isInAppBrowser()) {
      sendGet(payload)
    } else if (!beaconOk) {
      window.setTimeout(() => sendPost(payload), 2500)
    }
    return
  }

  if (mode === 'get') {
    sendGet(payload)
    return
  }

  if (!sendBeacon(payload)) sendPost(payload)
}

/** Registra un evento en la Sheet (si hay URL configurada y no es dev). */
export function trackEvent(
  event: string,
  section = '',
  options: TrackOptions = {},
): void {
  if (!isAnalyticsEnabled()) return

  const dedupeKey = `${event}|${section}`
  if (options.dedupe !== false && sent.has(dedupeKey)) return
  if (options.dedupe !== false) sent.add(dedupeKey)

  deliver(buildPayload(event, section), options.mode ?? 'post')
}

export function trackPageView(): void {
  trackEvent('page_view', 'profile', { mode: 'visit' })
}
