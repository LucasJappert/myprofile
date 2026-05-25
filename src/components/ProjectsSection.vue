<script setup lang="ts">
import { projects } from '@/data/projects'
</script>

<template>
  <section id="proyectos" class="section">
    <div class="container">
      <h2 class="section-title"><span>Proyectos</span></h2>
      <div class="bento">
        <article
          v-for="project in projects"
          :key="project.name"
          class="card bento__item"
          :class="{ 'bento__item--featured': project.featured }"
        >
          <header>
            <h3>{{ project.name }}</h3>
            <time>{{ project.period }}</time>
          </header>
          <p>{{ project.description }}</p>
          <div class="bento__stack">
            <span v-for="tech in project.stack" :key="tech" class="chip chip--violet">{{ tech }}</span>
          </div>
          <a
            v-if="project.href"
            :href="project.href"
            target="_blank"
            rel="noopener noreferrer"
            class="bento__link"
          >
            Ver proyecto →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .bento {
    grid-template-columns: repeat(3, 1fr);
  }
  .bento__item--featured {
    grid-column: span 1;
  }
  .bento__item--featured:first-child {
    grid-column: span 2;
  }
}

.bento__item header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.bento__item h3 {
  margin: 0;
  font-size: 1.05rem;
}

.bento__item time {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--rosa);
}

.bento__item p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.bento__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 1rem;
}

.bento__link {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.88rem;
  font-weight: 600;
}

.bento__item--featured {
  border-color: rgba(0, 232, 255, 0.35);
}
</style>
