import { onMounted, onUnmounted, ref } from 'vue'

const SHOW_AFTER_PX = 320

export function useScrollToTop() {
  const visible = ref(false)

  function update() {
    visible.value = window.scrollY > SHOW_AFTER_PX
  }

  function scrollToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { visible, scrollToTop }
}
