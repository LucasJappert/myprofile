<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

interface Critter {
  id: number
  emoji: string
  lane: number
  duration: number
}

const critters = ref<Critter[]>([])
const timers = new Map<number, number>()
let nextId = 1

function spawnCritter() {
  const id = nextId++
  const critter: Critter = {
    id,
    emoji: ['🐈', '🐈‍⬛', '🐈'][id % 3]!,
    lane: 1 + (id % 3) * 1.8,
    duration: 7 + (id % 3) * 1.2,
  }
  critters.value = [...critters.value.slice(-4), critter]
  const timer = window.setTimeout(() => {
    critters.value = critters.value.filter((item) => item.id !== id)
    timers.delete(id)
  }, critter.duration * 1000 + 400)
  timers.set(id, timer)
}

onUnmounted(() => {
  timers.forEach((timer) => window.clearTimeout(timer))
})
</script>

<template>
  <div class="cat-control">
    <button type="button" class="cat-control__button" aria-label="Invocar un gato" @click="spawnCritter">
      <span aria-hidden="true">🐾</span>
    </button>
    <span class="cat-control__hint" aria-hidden="true">Invocar gato</span>
  </div>
  <div class="critters" aria-hidden="true">
    <span
      v-for="critter in critters"
      :key="critter.id"
      class="critter"
      :style="{
        '--critter-lane': `${critter.lane}rem`,
        '--critter-duration': `${critter.duration}s`,
      }"
    >
      <span>{{ critter.emoji }}</span>
    </span>
  </div>
</template>

<style scoped>
.cat-control {
  position: fixed;
  left: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  z-index: 106;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cat-control__button {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid rgba(46, 232, 184, 0.38);
  border-radius: 50%;
  color: var(--text);
  background: rgba(10, 12, 22, 0.9);
  box-shadow: var(--shadow-glow);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.cat-control__button:hover {
  transform: translateY(-2px) rotate(-6deg);
  border-color: var(--agua);
  background: rgba(18, 28, 38, 0.96);
}

.cat-control__hint {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: var(--text-xs);
  color: var(--text-muted);
  background: rgba(10, 12, 22, 0.88);
  opacity: 0;
  transform: translateX(-0.35rem);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
}

.cat-control:has(.cat-control__button:hover) .cat-control__hint,
.cat-control:has(.cat-control__button:focus-visible) .cat-control__hint {
  opacity: 1;
  transform: translateX(0);
}

.critters {
  position: fixed;
  inset: auto 0 0;
  z-index: 104;
  height: 8rem;
  pointer-events: none;
  overflow: hidden;
}

.critter {
  position: absolute;
  left: -5rem;
  bottom: var(--critter-lane);
  font-size: 2.2rem;
  filter: drop-shadow(0 0 12px rgba(0, 232, 255, 0.32));
  animation: critter-walk var(--critter-duration) linear forwards;
}

.critter > span {
  display: block;
  animation: critter-bob 0.46s ease-in-out infinite alternate;
}

@keyframes critter-walk {
  to { transform: translateX(calc(100vw + 10rem)); }
}

@keyframes critter-bob {
  to { transform: translateY(-0.38rem) rotate(4deg); }
}

@media (max-width: 720px) {
  .cat-control { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .critter {
    left: 4.5rem;
    animation: none;
  }
  .critter > span { animation: none; }
}
</style>
