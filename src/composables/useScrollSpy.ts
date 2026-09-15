import { onMounted, onUnmounted, ref, type Ref } from 'vue'

function getScrollOffset(): number {
  const navHeight = document.querySelector<HTMLElement>('.nav')?.getBoundingClientRect().height
  return (navHeight && Number.isFinite(navHeight) ? navHeight : 64) + 20
}

/** Marca la sección cuyo top ya pasó el offset del nav (más fiable que solo intersection ratio). */
export function useScrollSpy(sectionIds: string[]): Ref<string> {
  const activeId = ref(sectionIds[0] ?? 'inicio')

  onMounted(() => {
    let ticking = false

    const updateFromHash = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1))
      if (sectionIds.includes(hashId)) activeId.value = hashId
    }

    const update = () => {
      ticking = false
      const offset = getScrollOffset()
      const lastId = sectionIds[sectionIds.length - 1]
      const scrollEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 64

      // Sección corta al final (p. ej. Contacto): su top puede no pasar el offset
      if (scrollEnd && lastId) {
        activeId.value = lastId
        return
      }

      let current = sectionIds[0] ?? 'inicio'

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }

      activeId.value = current
    }

    const scheduleUpdate = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    window.addEventListener('hashchange', updateFromHash)
    window.addEventListener('scrollend', scheduleUpdate)

    onUnmounted(() => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', updateFromHash)
      window.removeEventListener('scrollend', scheduleUpdate)
    })
  })

  return activeId
}
