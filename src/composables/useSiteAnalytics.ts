import { navLinks } from '@/data/nav'
import {
  isAnalyticsEnabled,
  persistUtmsFromUrl,
  trackEvent,
  trackPageView,
} from '@/utils/analytics'
import { onMounted, onUnmounted } from 'vue'

function sectionFromElement(el: Element | null): string {
  const section = el?.closest('section[id]') as HTMLElement | null
  return section?.id || ''
}

function linkLabel(anchor: HTMLAnchorElement): string {
  try {
    const u = new URL(anchor.href, window.location.href)
    if (u.protocol === 'mailto:') return u.pathname || 'email'
    return u.hostname.replace(/^www\./, '')
  } catch {
    return anchor.getAttribute('href') || 'link'
  }
}

function isCvLink(href: string): boolean {
  return /\.pdf($|\?)/i.test(href) || /Profile\.pdf/i.test(href)
}

function bindClickTracking(): void {
  const onClick = (ev: MouseEvent) => {
    if (!isAnalyticsEnabled()) return

    const target = ev.target
    if (!(target instanceof Element)) return

    const copyBtn = target.closest('.contact__copy')
    if (copyBtn) {
      trackEvent('email_copy', 'contacto')
      return
    }

    const anchor = target.closest('a')
    if (!anchor?.href) return

    const section = sectionFromElement(anchor)
    const href = anchor.href

    if (href.startsWith('mailto:')) {
      trackEvent('contact_email_click', section || 'contacto')
      return
    }

    if (isCvLink(href)) {
      trackEvent('cv_download', section || 'hero')
      return
    }

    if (anchor.target === '_blank' && !href.startsWith(window.location.origin)) {
      trackEvent('outbound_click', `${section || 'site'}:${linkLabel(anchor)}`)
    }
  }

  document.addEventListener('click', onClick, true)
  onUnmounted(() => document.removeEventListener('click', onClick, true))
}

function bindSectionTracking(): void {
  const seen = new Set<string>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const id = (entry.target as HTMLElement).id
        if (!id || seen.has(id)) continue
        seen.add(id)
        trackEvent('section_view', id)
      }
    },
    { threshold: 0.2, rootMargin: '-10% 0px -55% 0px' },
  )

  for (const { id } of navLinks) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }

  onUnmounted(() => observer.disconnect())
}

let booted = false

function boot(): void {
  if (booted || !isAnalyticsEnabled()) return
  booted = true

  persistUtmsFromUrl()
  trackPageView()
  bindSectionTracking()
  bindClickTracking()
}

export function useSiteAnalytics(): void {
  onMounted(() => {
    boot()

    const onPageShow = (ev: PageTransitionEvent) => {
      if (ev.persisted) {
        booted = false
        boot()
      }
    }
    window.addEventListener('pageshow', onPageShow)
    onUnmounted(() => window.removeEventListener('pageshow', onPageShow))
  })
}
