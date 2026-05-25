<script setup lang="ts">
import { useScrollProgress } from '@/composables/useScrollProgress'

const { progress } = useScrollProgress()
</script>

<template>
  <div
    class="scroll-progress"
    role="progressbar"
    :aria-valuenow="Math.round(progress * 100)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Progreso de lectura de la página"
  >
    <div class="scroll-progress__bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  z-index: 110;
  height: 3px;
  pointer-events: none;
  background: rgba(5, 6, 13, 0.5);
}

.scroll-progress__bar {
  height: 100%;
  width: 100%;
  transform-origin: left center;
  background: var(--gradient-brand);
  box-shadow: 0 0 12px rgba(0, 232, 255, 0.45);
  will-change: transform;
  transition: transform 0.12s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress__bar {
    transition: none;
  }
}

@media (min-width: 768px) {
  .scroll-progress {
    height: 2px;
  }
}
</style>
