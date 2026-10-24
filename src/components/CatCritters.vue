<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { SUMMON_CAT_EVENT } from '@/utils/cats'

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

onMounted(() => window.addEventListener(SUMMON_CAT_EVENT, spawnCritter))

onUnmounted(() => {
  window.removeEventListener(SUMMON_CAT_EVENT, spawnCritter)
  timers.forEach((timer) => window.clearTimeout(timer))
})
</script>

<template>
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
      <span><span>{{ critter.emoji }}</span></span>
    </span>
  </div>
</template>

<style scoped>
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

/* Los emojis de gato miran a la izquierda: se espejan para caminar hacia la derecha */
.critter > span > span { display: block; transform: scaleX(-1); }

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

@media (prefers-reduced-motion: reduce) {
  .critter {
    left: 4.5rem;
    animation: none;
  }
  .critter > span { animation: none; }
}
</style>
