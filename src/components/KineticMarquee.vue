<script setup lang="ts">
const capabilities = [
  'Arquitectura de producto',
  'IA aplicada',
  'Sistemas geoespaciales',
  'Equipos técnicos',
  'Migraciones de datos',
  'Operación observable',
]

const technologies = [
  'Vue 3',
  'TypeScript',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Earth Engine',
  'YOLO',
  'Codex',
]

const products = ['APIX', 'Pía', 'Sprint IT', 'DayLog', 'Lucas AI', 'Memorable Summaries']
</script>

<template>
  <section class="kinetic" aria-label="Áreas, tecnologías y productos destacados">
    <div class="kinetic__row">
      <div class="kinetic__track">
        <div v-for="copy in 2" :key="copy" class="kinetic__group" :aria-hidden="copy === 2">
          <span v-for="item in capabilities" :key="item"><i aria-hidden="true">◆</i>{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="kinetic__row kinetic__row--reverse">
      <div class="kinetic__track">
        <div v-for="copy in 2" :key="copy" class="kinetic__group" :aria-hidden="copy === 2">
          <span v-for="item in technologies" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="kinetic__row kinetic__row--slow">
      <div class="kinetic__track">
        <div v-for="copy in 2" :key="copy" class="kinetic__group" :aria-hidden="copy === 2">
          <span v-for="item in products" :key="item"><i aria-hidden="true">●</i>{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kinetic {
  position: relative;
  overflow: hidden;
  padding: 3rem 0;
  border-block: 1px solid rgba(0, 232, 255, 0.12);
  background:
    linear-gradient(100deg, rgba(0, 232, 255, 0.06), rgba(138, 108, 255, 0.08), rgba(34, 232, 132, 0.06)),
    rgba(5, 6, 13, 0.5);
  -webkit-mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
  mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
}

.kinetic__row {
  width: 100%;
  overflow: hidden;
  contain: paint;
}

.kinetic__row + .kinetic__row { margin-top: 0.85rem; }

.kinetic__track {
  display: flex;
  width: max-content;
  animation: kinetic-scroll 34s linear infinite;
}

.kinetic__row--reverse .kinetic__track {
  animation-direction: reverse;
  animation-duration: 29s;
}

.kinetic__row--slow .kinetic__track { animation-duration: 42s; }

.kinetic__group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-right: 0.75rem;
}

.kinetic__group span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.35rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid rgba(0, 232, 255, 0.18);
  border-radius: 999px;
  color: var(--text-muted);
  background: rgba(12, 14, 24, 0.68);
  font-size: var(--text-sm);
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

.kinetic__row:nth-child(2) span { color: var(--agua); }
.kinetic__row:nth-child(3) span { color: var(--celeste); }
.kinetic__group i { color: var(--verde); font-style: normal; font-size: 0.65rem; }

@keyframes kinetic-scroll {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .kinetic { mask-image: none; -webkit-mask-image: none; }
  .kinetic__row { overflow-x: auto; contain: none; }
  .kinetic__track { animation: none; }
  .kinetic__group[aria-hidden='true'] { display: none; }
}
</style>
