import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useScrollSpy(sectionIds: string[]): Ref<string> {
  const activeId = ref(sectionIds[0] ?? 'inicio')

  onMounted(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0 && visible[0]?.target.id) {
          activeId.value = visible[0].target.id
        }
      },
      {
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    )

    elements.forEach((el) => observer.observe(el))

    onUnmounted(() => observer.disconnect())
  })

  return activeId
}
