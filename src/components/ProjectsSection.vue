<script setup lang="ts">
import { projects } from '@/data/projects'

const base = import.meta.env.BASE_URL

const badgeLabels = {
  production: 'En producción',
  opensource: 'Open source',
} as const

function imageSrc(path: string) {
  return `${base}${path}`
}
</script>

<template>
  <section id="proyectos" class="section">
    <div class="container">
      <h2 class="section-title"><span>Proyectos</span></h2>
      <div class="bento">
        <article
          v-for="(project, index) in projects"
          :key="project.name"
          class="card bento__item"
          :class="{ 'bento__item--featured': project.featured }"
        >
          <div v-if="project.image" class="bento__media">
            <img
              :src="imageSrc(project.image)"
              :alt="`Captura de ${project.name}`"
              loading="lazy"
              :fetchpriority="index < 2 ? 'high' : 'auto'"
            />
          </div>
          <div class="bento__body">
            <header class="bento__header">
              <div class="bento__title-row">
                <h3>{{ project.name }}</h3>
                <span v-if="project.badge" class="bento__badge" :class="`bento__badge--${project.badge}`">
                  {{ badgeLabels[project.badge] }}
                </span>
              </div>
              <time>{{ project.period }}</time>
            </header>
            <p>{{ project.description }}</p>
            <div class="bento__stack">
              <span v-for="tech in project.stack" :key="tech" class="chip chip--agua">{{ tech }}</span>
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
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  display: grid;
  gap: 1.25rem;
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

  .bento__item--featured:first-child {
    grid-column: span 2;
  }
}

.bento__item {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.bento__media {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border);
}

.bento__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.bento__body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.bento__header {
  margin-bottom: 0.5rem;
}

.bento__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.bento__item h3 {
  margin: 0;
  font-size: 1.125rem;
}

.bento__badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
}

.bento__badge--production {
  color: var(--verde);
  background: rgba(34, 232, 132, 0.12);
  border: 1px solid rgba(34, 232, 132, 0.3);
}

.bento__badge--opensource {
  color: var(--agua);
  background: rgba(46, 232, 184, 0.1);
  border: 1px solid rgba(46, 232, 184, 0.28);
}

.bento__item time {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--agua);
}

.bento__item p {
  margin: 0;
  font-size: var(--text-sm);
  line-height: 1.65;
  color: var(--text-muted);
  flex: 1;
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
  font-size: var(--text-sm);
  font-weight: 600;
}

.bento__item--featured {
  border-color: rgba(0, 232, 255, 0.35);
}

.bento__item--featured .bento__media {
  aspect-ratio: 16 / 8;
}
</style>
