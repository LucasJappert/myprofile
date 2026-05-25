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

function layoutClass(layout?: string) {
  if (layout === 'lead') return 'bento__item--lead'
  if (layout === 'support') return 'bento__item--support'
  if (layout === 'trio') return 'bento__item--trio'
  if (layout === 'wide') return 'bento__item--wide'
  return ''
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
          class="card card--hover bento__item"
          :class="[
            { 'bento__item--featured': project.featured },
            layoutClass(project.layout),
          ]"
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
  align-items: start;
}

@media (min-width: 640px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento__item--wide {
    grid-column: 1 / -1;
  }

  .bento__item--lead,
  .bento__item--support {
    grid-column: span 1;
  }
}

@media (min-width: 640px) and (max-width: 959px) {
  .bento__item--lead {
    grid-column: 1 / -1;
  }

  .bento__item--support {
    grid-column: 1 / -1;
  }

  .bento__item--trio:nth-child(5) {
    grid-column: 1 / -1;
  }
}

@media (min-width: 960px) {
  /* 30 cols: fila 1 = 21+9 (70/30), fila 2 = 10+10+10 (tercios) */
  .bento {
    grid-template-columns: repeat(30, 1fr);
  }

  .bento__item--lead {
    grid-column: span 21;
  }

  .bento__item--support {
    grid-column: span 9;
  }

  .bento__item--trio {
    grid-column: span 10;
  }

  .bento__item--wide {
    grid-column: 1 / -1;
  }
}

.bento__item {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.bento__item--lead,
.bento__item--support {
  max-height: 500px;
}

.bento__media {
  position: relative;
  flex-shrink: 0;
  height: 200px;
  max-height: 280px;
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border);
}

@media (min-width: 960px) {
  .bento__item--lead .bento__media {
    height: min(280px, 42vh);
    max-height: 280px;
  }

  .bento__item--support .bento__media {
    height: min(220px, 36vh);
    max-height: 220px;
  }

  .bento__item--trio .bento__media {
    height: 180px;
    max-height: 180px;
  }

  .bento__item--trio h3 {
    font-size: 1rem;
  }

  .bento__item--trio .bento__body {
    padding: 0.95rem 1rem 1.15rem;
  }

  .bento__item--trio .chip {
    font-size: 0.7rem;
    padding: 0.15rem 0.45rem;
  }
}

.bento__item--trio:not(:has(.bento__media)) .bento__body {
  padding-top: 1.25rem;
}

.bento__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.bento__item--wide .bento__media {
  height: auto;
  max-height: none;
}

.bento__item--wide .bento__media img {
  width: 100%;
  height: auto;
  object-fit: unset;
  object-position: center center;
}

.bento__body {
  padding: 1.1rem 1.35rem 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: auto;
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
  line-height: 1.55;
  color: var(--text-muted);
}

.bento__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.bento__link {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: var(--text-sm);
  font-weight: 600;
}

.bento__item--featured {
  border-color: rgba(0, 232, 255, 0.35);
}
</style>
