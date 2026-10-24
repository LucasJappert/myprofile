<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { profile } from '@/data/profile'
import { assetUrl } from '@/utils/assetUrl'
import { summonCat } from '@/utils/cats'
import { contourSegments, pointInPolygon, sampleTerrain, type Segment } from '@/utils/terrain'

/** Contorno del lote en coordenadas normalizadas. */
const PARCEL = [
  [0.07, 0.14],
  [0.52, 0.06],
  [0.93, 0.12],
  [0.95, 0.62],
  [0.74, 0.93],
  [0.2, 0.9],
  [0.05, 0.55],
] as const
const PIN = { x: 0.56, y: 0.42 }
const BREAKS = [0.2, 0.4, 0.6, 0.8]
const CLASS_COLORS = ['#e5533d', '#f0913a', '#e9cf4a', '#8fdb5a', '#22e884']
const CLASS_LABELS = ['Bajo', 'Medio-bajo', 'Medio', 'Medio-alto', 'Alto']
const SWEEP_MS = 1700

interface Cell {
  col: number
  row: number
  cls: number
}

const stageRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const hover = ref<{ x: number; y: number; label: string } | null>(null)
const pinOpen = ref(false)
/** La ilustración se descarga recién al abrir la tarjeta por primera vez */
const cardLoaded = ref(false)

function setPin(open: boolean) {
  pinOpen.value = open
  if (open) cardLoaded.value = true
}

let context: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let cellSize = 9
let cells: Cell[] = []
let cellIndex = new Map<string, Cell>()
let contours: Segment[] = []
let sweep = 1
let hoverCell: Cell | null = null
let frame = 0
let observer: ResizeObserver | null = null

const classOf = (value: number) => BREAKS.filter((limit) => value >= limit).length

function build() {
  const stage = stageRef.value
  const canvas = canvasRef.value
  if (!stage || !canvas || !context) return
  width = stage.clientWidth
  height = stage.clientHeight
  cellSize = width < 420 ? 7 : 9
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(width * ratio)
  canvas.height = Math.round(height * ratio)
  context.setTransform(ratio, 0, 0, ratio, 0, 0)

  const cols = Math.floor(width / cellSize)
  const rows = Math.floor(height / cellSize)
  const grid = sampleTerrain(cols - 1, rows - 1)
  cells = []
  cellIndex = new Map()
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = ((col + 0.5) * cellSize) / width
      const cy = ((row + 0.5) * cellSize) / height
      if (!pointInPolygon(cx, cy, PARCEL)) continue
      const cell = { col, row, cls: classOf(grid[row]![col]!) }
      cells.push(cell)
      cellIndex.set(`${col}:${row}`, cell)
    }
  }
  contours = BREAKS.flatMap((level) => contourSegments(grid, level))
  draw()
}

function parcelPath(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  PARCEL.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x * width, y * height)
    else ctx.lineTo(x * width, y * height)
  })
  ctx.closePath()
}

function draw() {
  const ctx = context
  if (!ctx) return
  const front = sweep * (width + 60) - 30
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(142, 234, 255, 0.12)'
  for (let y = cellSize * 2; y < height; y += cellSize * 3) {
    for (let x = cellSize * 2; x < width; x += cellSize * 3) ctx.fillRect(x, y, 1, 1)
  }

  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, Math.max(0, front), height)
  ctx.clip()

  ctx.globalAlpha = 0.8
  for (const cell of cells) {
    ctx.fillStyle = CLASS_COLORS[cell.cls]!
    ctx.fillRect(cell.col * cellSize, cell.row * cellSize, cellSize, cellSize)
  }
  ctx.globalAlpha = 1
  // Retícula tenue: sugiere píxeles satelitales sin ensuciar el mapa
  ctx.fillStyle = 'rgba(5, 6, 13, 0.16)'
  for (const cell of cells) {
    ctx.fillRect(cell.col * cellSize, cell.row * cellSize, cellSize, 1)
    ctx.fillRect(cell.col * cellSize, cell.row * cellSize, 1, cellSize)
  }

  ctx.save()
  parcelPath(ctx)
  ctx.clip()
  ctx.strokeStyle = 'rgba(5, 6, 13, 0.55)'
  ctx.lineWidth = 1.25
  ctx.beginPath()
  for (const [x1, y1, x2, y2] of contours) {
    ctx.moveTo((x1 + 0.5) * cellSize, (y1 + 0.5) * cellSize)
    ctx.lineTo((x2 + 0.5) * cellSize, (y2 + 0.5) * cellSize)
  }
  ctx.stroke()
  ctx.restore()
  ctx.restore()

  parcelPath(ctx)
  ctx.strokeStyle = '#00e8ff'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.fillStyle = '#05060d'
  for (const [x, y] of PARCEL) {
    ctx.fillRect(x * width - 3, y * height - 3, 6, 6)
    ctx.strokeRect(x * width - 3, y * height - 3, 6, 6)
  }

  if (sweep < 1) {
    const gradient = ctx.createLinearGradient(front - 40, 0, front, 0)
    gradient.addColorStop(0, 'rgba(0, 232, 255, 0)')
    gradient.addColorStop(1, 'rgba(0, 232, 255, 0.35)')
    ctx.fillStyle = gradient
    ctx.fillRect(front - 40, 0, 40, height)
    ctx.fillStyle = '#00e8ff'
    ctx.fillRect(front, 0, 1.5, height)
  }

  if (hoverCell) {
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 1.5
    ctx.strokeRect(hoverCell.col * cellSize - 1, hoverCell.row * cellSize - 1, cellSize + 1, cellSize + 1)
  }
}

function animateSweep() {
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / SWEEP_MS)
    sweep = 1 - Math.pow(1 - t, 3)
    draw()
    if (t < 1) frame = requestAnimationFrame(step)
  }
  sweep = 0
  frame = requestAnimationFrame(step)
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || sweep < 1 || !stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const cell = cellIndex.get(`${Math.floor(x / cellSize)}:${Math.floor(y / cellSize)}`) ?? null
  if (cell !== hoverCell) {
    hoverCell = cell
    draw()
  }
  hover.value = cell ? { x, y, label: `Ambiente ${CLASS_LABELS[cell.cls]!.toLowerCase()}` } : null
}

function onPointerLeave() {
  hoverCell = null
  hover.value = null
  draw()
}

onMounted(() => {
  context = canvasRef.value?.getContext('2d') ?? null
  build()
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) animateSweep()
  observer = new ResizeObserver(() => build())
  if (stageRef.value) observer.observe(stageRef.value)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <figure class="field-map">
    <header class="field-map__bar">
      <span><i aria-hidden="true" /> ambientes · lote ilustrativo</span>
      <span class="field-map__coords">31°15′S 61°29′O</span>
    </header>

    <div
      ref="stageRef"
      class="field-map__stage"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <canvas ref="canvasRef" aria-hidden="true" />
      <span class="field-map__north" aria-hidden="true">N</span>
      <span class="field-map__scale" aria-hidden="true"><i />200 m</span>
      <p
        v-if="hover"
        class="field-map__readout"
        aria-hidden="true"
        :style="{ left: `${hover.x}px`, top: `${hover.y}px` }"
      >
        {{ hover.label }}
      </p>

      <div
        class="field-map__pin"
        :class="{ 'is-open': pinOpen }"
        :style="{ left: `${PIN.x * 100}%`, top: `${PIN.y * 100}%` }"
        @mouseleave="setPin(false)"
      >
        <button
          type="button"
          class="field-map__marker"
          :aria-expanded="pinOpen"
          aria-label="Ver ilustración personal"
          @click="setPin(!pinOpen)"
          @mouseenter="setPin(true)"
        >
          <span
            class="field-map__avatar"
            :style="{ backgroundImage: `url(${assetUrl(profile.avatarPin)})` }"
          />
        </button>
        <span class="field-map__pin-label">Rafaela · acá trabajo</span>
        <div class="field-map__card">
          <img v-if="cardLoaded" :src="assetUrl(profile.avatarCard)" :alt="profile.avatarAlt" width="400" height="500" />
          <p>Una vida entre código, campo y gatos.</p>
          <button type="button" class="field-map__cat" @click="summonCat">
            <span aria-hidden="true">🐾</span> Invocar un gato
          </button>
        </div>
      </div>
    </div>

    <footer class="field-map__ramp">
      <span>Bajo</span>
      <i aria-hidden="true"><b v-for="color in CLASS_COLORS" :key="color" :style="{ background: color }" /></i>
      <span>Alto</span>
    </footer>
  </figure>
</template>

<style scoped>
.field-map {
  position: relative;
  margin: 0;
  border: 1px solid rgba(0, 232, 255, 0.22);
  border-radius: 1.25rem;
  background: rgba(6, 9, 16, 0.86);
  box-shadow: 0 1.5rem 4.5rem rgba(0, 0, 0, 0.5);
}

.field-map__bar,
.field-map__ramp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 1rem;
  font: 500 0.72rem/1 var(--font-mono);
  color: var(--text-muted);
}
.field-map__bar { border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
.field-map__bar span:first-child { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text); }
.field-map__bar i {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--verde);
  box-shadow: 0 0 8px var(--verde);
}

.field-map__stage {
  position: relative;
  aspect-ratio: 5 / 4;
}
.field-map__stage canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.field-map__north {
  position: absolute;
  top: 0.7rem;
  right: 0.85rem;
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font: 600 0.65rem/1 var(--font-mono);
  color: var(--text);
}
.field-map__north::before {
  content: '';
  position: absolute;
  top: -0.45rem;
  border: 0.22rem solid transparent;
  border-bottom: 0.32rem solid var(--celeste);
}

.field-map__scale {
  position: absolute;
  right: 0.85rem;
  bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font: 500 0.65rem/1 var(--font-mono);
  color: var(--text-muted);
}
.field-map__scale i {
  width: 3.5rem;
  height: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 0;
}

.field-map__readout {
  position: absolute;
  z-index: 3;
  margin: 0;
  padding: 0.3rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 0.4rem;
  background: rgba(5, 6, 13, 0.92);
  font: 500 0.7rem/1.2 var(--font-mono);
  color: var(--text);
  white-space: nowrap;
  pointer-events: none;
  transform: translate(0.9rem, -130%);
}

.field-map__pin {
  position: absolute;
  z-index: 4;
  transform: translate(-50%, -100%);
}

.field-map__marker {
  position: relative;
  display: block;
  padding: 3px;
  border: 0;
  border-radius: 50% 50% 50% 0;
  background: var(--gradient-brand);
  box-shadow: 0 0.6rem 1.6rem rgba(0, 0, 0, 0.55);
  transform: rotate(-45deg);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.field-map__marker:hover,
.field-map__pin.is-open .field-map__marker { transform: rotate(-45deg) scale(1.08); }

.field-map__avatar {
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #080c18;
  background-size: cover;
  background-position: center;
  transform: rotate(45deg);
}

.field-map__pin-label {
  position: absolute;
  left: calc(100% + 0.6rem);
  top: 50%;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: rgba(5, 6, 13, 0.88);
  font: 500 0.68rem/1.2 var(--font-mono);
  color: var(--text);
  white-space: nowrap;
  transform: translateY(-50%);
}

.field-map__card {
  position: absolute;
  right: calc(100% + 0.75rem);
  top: -0.5rem;
  width: 11.5rem;
  padding: 0.4rem 0.4rem 0.6rem;
  border: 1px solid rgba(0, 232, 255, 0.25);
  border-radius: 0.9rem;
  background: rgba(6, 9, 16, 0.96);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.55);
  opacity: 0;
  visibility: hidden;
  transform: translateX(0.5rem);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
}
.field-map__pin.is-open { z-index: 6; }
.field-map__pin.is-open .field-map__card { opacity: 1; visibility: visible; transform: none; }
.field-map__card img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 0.6rem;
  object-fit: cover;
  object-position: center 40%;
}
.field-map__cat {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.5rem 0.2rem 0;
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font: 600 0.72rem var(--font-sans);
  cursor: pointer;
}
.field-map__cat:hover { border-color: var(--agua); color: var(--agua); }
.field-map__card p {
  margin: 0.45rem 0.2rem 0;
  font-size: 0.75rem;
  line-height: 1.35;
  color: var(--text-muted);
}

.field-map__ramp { border-top: 1px solid rgba(255, 255, 255, 0.06); justify-content: flex-start; }
.field-map__ramp i { display: flex; flex: 0 1 11rem; gap: 2px; }
.field-map__ramp b { flex: 1; height: 0.4rem; border-radius: 1px; }

@media (max-width: 560px) {
  .field-map__stage { aspect-ratio: 4 / 3.3; }
  .field-map__avatar { width: 2.75rem; height: 2.75rem; }
  .field-map__card { width: 9.5rem; }
  .field-map__coords { display: none; }
  .field-map__pin-label { left: 50%; top: calc(100% + 0.35rem); transform: translateX(-50%); }
}
</style>
