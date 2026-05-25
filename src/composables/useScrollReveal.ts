import { onMounted, onUnmounted } from 'vue'

const REVEAL_SELECTOR = '.reveal'

export function useScrollReveal() {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)

    if (prefersReduced || elements.length === 0) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
