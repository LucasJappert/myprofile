<script setup lang="ts">
/** Íconos de línea propios (24×24, trazo) para tarjetas y listas. */
const paths = {
  layers: ['M12 3 3 8l9 5 9-5-9-5Z', 'm3 13 9 5 9-5'],
  chat: ['M4 5h16v11H9l-5 4V5Z', 'M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01'],
  database: [
    'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Z',
    'M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6',
    'M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  ],
  board: ['M4 4h4.5v12H4z', 'M10 4h4.5v8H10z', 'M16 4h4v15h-4z'],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  cycle: ['M4.5 10A8 8 0 0 1 18 6.3L20 8', 'M20 3.5V8h-4.5', 'M19.5 14A8 8 0 0 1 6 17.7L4 16', 'M4 20.5V16h4.5'],
  code: ['m8 8-5 4 5 4', 'm16 8 5 4-5 4', 'm14 5-4 14'],
  spark: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z', 'M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z'],
  server: ['M3.5 4.5h17v6.5h-17z', 'M3.5 13h17v6.5h-17z', 'M7 7.75h.01M7 16.25h.01'],
  globe: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18', 'M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z'],
  award: ['M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z', 'm8.6 13.8-1.6 7.2 5-3 5 3-1.6-7.2'],
  study: ['m2 9 10-5 10 5-10 5Z', 'M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 7v5l3.2 2'],
  sprout: ['M12 21v-9', 'M12 12C12 7 8.5 4 4 4c0 5 3 8 8 8Z', 'M12 14.5c0-4 3-7 8-7 0 4-3 7-8 7Z'],
  route: ['M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z', 'M18 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z', 'M8 18h6.5a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6H16'],
  pulse: ['M3 12h4l3-7 4 14 3-7h4'],
  build: ['m14.5 6.5 3-3 3 3-3 3', 'M17.5 3.5 9 12', 'M3 21l6-6', 'M9 12l3 3', 'M5.5 15.5l3 3'],
} as const

export type IconName = keyof typeof paths

defineProps<{ name: IconName; size?: number }>()
</script>

<template>
  <svg
    class="app-icon"
    :width="size ?? 20"
    :height="size ?? 20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>
