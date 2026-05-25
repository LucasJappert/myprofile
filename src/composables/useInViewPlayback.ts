import { onMounted, onUnmounted, ref, type Ref } from 'vue'

const VISIBLE_RATIO = 0.35

export function useInViewPlayback(rootRef: Ref<HTMLElement | null>) {
  const isPlaying = ref(false)
  const motionAllowed = ref(true)

  onMounted(() => {
    motionAllowed.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = rootRef.value
    if (!el || !motionAllowed.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        isPlaying.value =
          entry.isIntersecting && entry.intersectionRatio >= VISIBLE_RATIO
      },
      {
        threshold: [0, 0.2, VISIBLE_RATIO, 0.5, 0.75],
        rootMargin: '-6% 0px -6% 0px',
      },
    )

    observer.observe(el)
    onUnmounted(() => observer.disconnect())
  })

  return { isPlaying, motionAllowed }
}
