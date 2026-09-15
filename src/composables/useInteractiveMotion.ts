import { onMounted, onUnmounted } from 'vue'

export function useInteractiveMotion() {
  let activeMagnetic: HTMLElement | null = null
  let activeTilt: HTMLElement | null = null
  let frame = 0
  let pointerEvent: PointerEvent | null = null

  const reset = (element: HTMLElement | null, properties: string[]) => {
    properties.forEach((property) => element?.style.removeProperty(property))
  }

  const update = () => {
    frame = 0
    const event = pointerEvent
    if (!event) return
    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)

    const target = event.target instanceof Element ? event.target : null
    const magnetic = target?.closest<HTMLElement>('[data-magnetic]') ?? null
    if (activeMagnetic && activeMagnetic !== magnetic) {
      reset(activeMagnetic, ['--magnetic-x', '--magnetic-y'])
    }
    activeMagnetic = magnetic
    if (magnetic) {
      const rect = magnetic.getBoundingClientRect()
      const x = Math.max(-7, Math.min(7, (event.clientX - rect.left - rect.width / 2) * 0.08))
      const y = Math.max(-7, Math.min(7, (event.clientY - rect.top - rect.height / 2) * 0.08))
      magnetic.style.setProperty('--magnetic-x', `${x}px`)
      magnetic.style.setProperty('--magnetic-y', `${y}px`)
    }

    const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null
    if (activeTilt && activeTilt !== tilt) {
      reset(activeTilt, ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y'])
    }
    activeTilt = tilt
    if (tilt) {
      const rect = tilt.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width
      const ny = (event.clientY - rect.top) / rect.height
      tilt.style.setProperty('--tilt-x', `${(0.5 - ny) * 4}deg`)
      tilt.style.setProperty('--tilt-y', `${(nx - 0.5) * 5}deg`)
      tilt.style.setProperty('--spot-x', `${nx * 100}%`)
      tilt.style.setProperty('--spot-y', `${ny * 100}%`)
    }
  }

  const onPointerMove = (event: PointerEvent) => {
    pointerEvent = event
    if (!frame) frame = window.requestAnimationFrame(update)
  }

  const onPointerOut = (event: PointerEvent) => {
    if (event.relatedTarget) return
    reset(activeMagnetic, ['--magnetic-x', '--magnetic-y'])
    reset(activeTilt, ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y'])
    activeMagnetic = null
    activeTilt = null
  }

  onMounted(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) return
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerout', onPointerOut, { passive: true })
  })

  onUnmounted(() => {
    window.cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerout', onPointerOut)
  })
}
