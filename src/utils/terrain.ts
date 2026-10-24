/** Relieve sintético y determinista para el mapa ilustrativo del hero. */

type Bump = [cx: number, cy: number, radius: number, weight: number]

const BUMPS: Bump[] = [
  [0.22, 0.3, 0.16, 0.9],
  [0.68, 0.24, 0.12, 0.55],
  [0.58, 0.68, 0.2, 1],
  [0.86, 0.6, 0.1, -0.45],
  [0.3, 0.78, 0.12, -0.6],
  [0.45, 0.45, 0.09, -0.35],
]

/** Altura en coordenadas normalizadas (0–1). */
export function terrain(x: number, y: number): number {
  let value = 0
  for (const [cx, cy, radius, weight] of BUMPS) {
    const dx = x - cx
    const dy = y - cy
    value += weight * Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius))
  }
  return value + 0.09 * Math.sin(x * 9 + y * 4) + 0.06 * Math.sin(y * 13 - x * 5)
}

/** Muestrea el relieve en una grilla y lo normaliza a 0–1. */
export function sampleTerrain(cols: number, rows: number, scale = 1): number[][] {
  const grid: number[][] = []
  let min = Infinity
  let max = -Infinity
  for (let row = 0; row <= rows; row += 1) {
    const line: number[] = []
    for (let col = 0; col <= cols; col += 1) {
      const value = terrain((col / cols) * scale, (row / rows) * scale)
      min = Math.min(min, value)
      max = Math.max(max, value)
      line.push(value)
    }
    grid.push(line)
  }
  return grid.map((line) => line.map((value) => (value - min) / (max - min)))
}

export type Segment = [x1: number, y1: number, x2: number, y2: number]

/** Curvas de nivel por marching squares; devuelve segmentos en celdas de la grilla. */
export function contourSegments(grid: number[][], level: number): Segment[] {
  const segments: Segment[] = []
  const lerp = (a: number, b: number) => (level - a) / (b - a)

  for (let row = 0; row < grid.length - 1; row += 1) {
    for (let col = 0; col < grid[row]!.length - 1; col += 1) {
      const tl = grid[row]![col]!
      const tr = grid[row]![col + 1]!
      const br = grid[row + 1]![col + 1]!
      const bl = grid[row + 1]![col]!
      const points: Array<[number, number]> = []
      if (tl < level !== tr < level) points.push([col + lerp(tl, tr), row])
      if (tr < level !== br < level) points.push([col + 1, row + lerp(tr, br)])
      if (bl < level !== br < level) points.push([col + lerp(bl, br), row + 1])
      if (tl < level !== bl < level) points.push([col, row + lerp(tl, bl)])
      if (points.length === 2) {
        segments.push([points[0]![0], points[0]![1], points[1]![0], points[1]![1]])
      } else if (points.length === 4) {
        segments.push([points[0]![0], points[0]![1], points[1]![0], points[1]![1]])
        segments.push([points[2]![0], points[2]![1], points[3]![0], points[3]![1]])
      }
    }
  }
  return segments
}

export function pointInPolygon(x: number, y: number, polygon: ReadonlyArray<readonly [number, number]>): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i]!
    const [xj, yj] = polygon[j]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
