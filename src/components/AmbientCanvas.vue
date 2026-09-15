<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface GridPoint {
  x: number
  y: number
  phase: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let context: CanvasRenderingContext2D | null = null
let frame = 0
let running = true
let lastRender = 0
let viewportWidth = 0
let viewportHeight = 0
let mobile = false
let points: GridPoint[] = []
let links: Array<[number, number]> = []
let removeResize: (() => void) | null = null
let removePointer: (() => void) | null = null
let removeVisibility: (() => void) | null = null
const pointer = { x: 0, y: 0 }
const easedPointer = { x: 0, y: 0 }

function createGrid() {
  const cols = mobile ? 9 : 14
  const rows = mobile ? 6 : 9
  points = []
  links = []

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = row * cols + col
      points.push({
        x: (col / (cols - 1)) * viewportWidth,
        y: (row / (rows - 1)) * viewportHeight,
        phase: row * 0.71 + col * 0.47,
      })
      if (col < cols - 1) links.push([index, index + 1])
      if (row < rows - 1) links.push([index, index + cols])
      if (col < cols - 1 && row < rows - 1 && (row + col) % 4 === 0) {
        links.push([index, index + cols + 1])
      }
    }
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas || !context) return

  viewportWidth = window.innerWidth
  viewportHeight = window.innerHeight
  mobile = viewportWidth <= 720
  const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.4)
  canvas.width = Math.round(viewportWidth * pixelRatio)
  canvas.height = Math.round(viewportHeight * pixelRatio)
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  createGrid()
}

function colorForProgress(progress: number) {
  if (progress < 0.55) {
    const amount = progress / 0.55
    return `rgb(${Math.round(46 * amount)}, 232, ${Math.round(255 - 71 * amount)})`
  }
  const amount = (progress - 0.55) / 0.45
  return `rgb(${Math.round(46 + 106 * amount)}, ${Math.round(232 - 122 * amount)}, ${Math.round(184 + 71 * amount)})`
}

function displacedPoint(point: GridPoint, elapsed: number) {
  const wave = Math.sin(point.phase + elapsed * 0.45) * (mobile ? 3.5 : 5)
  return {
    x: point.x + easedPointer.x * 10 + wave * 0.35,
    y: point.y + easedPointer.y * 8 + wave,
  }
}

function render(timestamp: number) {
  if (!context || !running) return
  frame = window.requestAnimationFrame(render)

  const interval = mobile ? 1000 / 24 : 1000 / 30
  if (timestamp - lastRender < interval) return
  lastRender = timestamp

  const elapsed = timestamp / 1000
  const maxScroll = Math.max(document.documentElement.scrollHeight - viewportHeight, 1)
  const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
  const color = colorForProgress(progress)
  easedPointer.x += (pointer.x - easedPointer.x) * 0.05
  easedPointer.y += (pointer.y - easedPointer.y) * 0.05

  context.clearRect(0, 0, viewportWidth, viewportHeight)
  context.strokeStyle = color
  context.lineWidth = 0.65
  context.globalAlpha = 0.14
  context.beginPath()
  for (const [fromIndex, toIndex] of links) {
    const from = displacedPoint(points[fromIndex]!, elapsed)
    const to = displacedPoint(points[toIndex]!, elapsed)
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
  }
  context.stroke()

  context.fillStyle = color
  context.globalAlpha = 0.58
  for (const point of points) {
    const current = displacedPoint(point, elapsed)
    context.beginPath()
    context.arc(current.x, current.y, mobile ? 1.25 : 1.4, 0, Math.PI * 2)
    context.fill()
  }

  context.globalAlpha = 0.3
  const dustCount = mobile ? 22 : 42
  for (let index = 0; index < dustCount; index += 1) {
    const x = ((index * 97.3 + elapsed * (3 + (index % 3))) % (viewportWidth + 40)) - 20
    const y = (index * 53.7 + Math.sin(elapsed * 0.35 + index) * 18) % viewportHeight
    context.fillRect(x, y, 1.2, 1.2)
  }
  context.globalAlpha = 1
}

onMounted(() => {
  const canvas = canvasRef.value
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!canvas || reducedMotion) return

  context = canvas.getContext('2d', { alpha: true })
  if (!context) return

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX / window.innerWidth - 0.5
    pointer.y = event.clientY / window.innerHeight - 0.5
  }
  const onVisibility = () => {
    running = !document.hidden
    if (running) frame = window.requestAnimationFrame(render)
    else window.cancelAnimationFrame(frame)
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  removeResize = () => window.removeEventListener('resize', resize)
  removePointer = () => window.removeEventListener('pointermove', onPointerMove)
  removeVisibility = () => document.removeEventListener('visibilitychange', onVisibility)
  frame = window.requestAnimationFrame(render)
})

onUnmounted(() => {
  running = false
  window.cancelAnimationFrame(frame)
  removeResize?.()
  removePointer?.()
  removeVisibility?.()
})
</script>

<template>
  <canvas ref="canvasRef" class="ambient-canvas" aria-hidden="true" />
</template>

<style scoped>
.ambient-canvas {
  position: fixed;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.5;
  mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.88) 70%, transparent 100%);
}

@media (max-width: 720px) {
  .ambient-canvas { opacity: 0.32; }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-canvas { display: none; }
}
</style>
