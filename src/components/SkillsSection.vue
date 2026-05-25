<script setup lang="ts">
import { skillGroups } from '@/data/skills'
</script>

<template>
  <section id="stack" class="section reveal">
    <div class="container">
      <h2 class="section-title"><span>Stack técnico</span></h2>
      <div class="skills-grid">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          class="skills-card surface--tile"
          :class="{ 'skills-card--highlight': group.highlight }"
        >
          <h3>{{ group.title }}</h3>
          <div class="skills-card__tags">
            <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .skills-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.skills-card h3 {
  margin: 0 0 0.75rem;
  font-size: var(--text-base);
  color: var(--celeste);
}

.skills-card--highlight {
  border-color: rgba(46, 232, 184, 0.32);
  background: linear-gradient(
    155deg,
    rgba(0, 232, 255, 0.07),
    rgba(10, 12, 22, 0.55) 55%,
    rgba(34, 232, 132, 0.06)
  );
  box-shadow: 0 0 24px rgba(0, 232, 255, 0.06);
}

.skills-card--highlight h3 {
  color: var(--verde);
}

.skills-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skills-card__tags .chip {
  font-size: var(--text-sm);
  padding: 0.35rem 0.65rem;
}
</style>
