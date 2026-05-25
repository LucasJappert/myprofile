<script setup lang="ts">
import { skillGroups } from '@/data/skills'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="section-title"><span>Competencias</span></h2>
      <div class="skills-grid">
        <article v-for="group in skillGroups" :key="group.title" class="card skills-card">
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
  gap: 1rem;
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
  font-size: 0.95rem;
  color: var(--celeste);
}

.skills-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skills-card__tags .chip {
  font-size: 0.72rem;
  padding: 0.28rem 0.55rem;
}
</style>
