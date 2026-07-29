<script setup lang="ts">
import { ref } from 'vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import ProjectVideoMedia from '@/components/ProjectVideoMedia.vue'
import { projects } from '@/data/projects'
import { assetUrl } from '@/utils/assetUrl'

const badgeLabels = {
  production: 'En producción',
  opensource: 'Open source',
  youtube: 'Canal YouTube',
  itchio: 'itch.io',
} as const

const lightbox = ref<{
  images: string[]
  alts: string[]
  index: number
} | null>(null)

function layoutClass(layout?: string) {
  if (layout === 'lead') return 'bento__item--lead'
  if (layout === 'support') return 'bento__item--support'
  if (layout === 'row2-primary') return 'bento__item--row2-primary'
  if (layout === 'row2-compact') return 'bento__item--row2-compact'
  if (layout === 'wide') return 'bento__item--wide'
  return ''
}

function hasMedia(project: (typeof projects)[number]) {
  return Boolean(project.youtubeId || project.images?.length || project.image)
}

function hasGallery(project: (typeof projects)[number]) {
  return Boolean(project.images && project.images.length > 1)
}

function openGallery(project: (typeof projects)[number], index: number) {
  if (!project.images?.length) return
  lightbox.value = {
    images: project.images.map((src) => assetUrl(src)),
    alts: project.images.map((_, i) => `Captura ${i + 1} de ${project.name}`),
    index,
  }
}

function closeLightbox() {
  lightbox.value = null
}
</script>

<template>
  <section id="proyectos" class="section reveal">
    <div class="container">
      <h2 class="section-title"><span>Proyectos</span></h2>
      <div class="bento">
        <article
          v-for="(project, index) in projects"
          :key="project.name"
          class="card card--hover bento__item"
          :class="[
            { 'bento__item--featured': project.featured },
            { 'bento__item--gallery': hasGallery(project) },
            layoutClass(project.layout),
          ]"
        >
          <div
            class="bento__wide-inner"
            :class="{
              'bento__wide-inner--stack': project.layout !== 'wide',
              'bento__wide-inner--text-only': project.layout === 'row2-compact',
            }"
          >
            <ProjectVideoMedia
              v-if="project.youtubeId"
              :video-id="project.youtubeId"
              :project-name="project.name"
            />
            <div
              v-else-if="hasGallery(project)"
              class="bento__media bento__media--gallery"
            >
              <button
                v-for="(src, imgIndex) in project.images"
                :key="src"
                type="button"
                class="bento__gallery-btn"
                :aria-label="`Ampliar captura ${imgIndex + 1} de ${project.name}`"
                @click.stop="openGallery(project, imgIndex)"
              >
                <img
                  :src="assetUrl(src)"
                  :alt="`Captura ${imgIndex + 1} de ${project.name}`"
                  loading="lazy"
                  :fetchpriority="index < 2 && imgIndex === 0 ? 'high' : 'auto'"
                />
              </button>
            </div>
            <div v-else-if="project.image" class="bento__media">
              <img
                :src="assetUrl(project.image)"
                :alt="`Captura de ${project.name}`"
                loading="lazy"
                :fetchpriority="index < 2 ? 'high' : 'auto'"
              />
            </div>
            <div class="bento__body" :class="{ 'bento__body--solo': !hasMedia(project) }">
              <header class="bento__header">
                <div class="bento__title-row">
                  <h3>{{ project.name }}</h3>
                  <a
                    v-if="project.badge && project.badgeHref"
                    :href="project.badgeHref"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bento__badge"
                    :class="`bento__badge--${project.badge}`"
                    @click.stop
                  >
                    {{ badgeLabels[project.badge] }}
                  </a>
                  <span
                    v-else-if="project.badge"
                    class="bento__badge"
                    :class="`bento__badge--${project.badge}`"
                  >
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
          </div>
        </article>
      </div>
    </div>

    <ImageLightbox
      v-if="lightbox"
      :images="lightbox.images"
      :alts="lightbox.alts"
      :index="lightbox.index"
      @close="closeLightbox"
      @update:index="lightbox.index = $event"
    />
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
    align-items: stretch;
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

  .bento__item--row2-primary {
    grid-column: 1 / -1;
  }

  .bento__item--row2-compact {
    grid-column: span 1;
  }
}

@media (min-width: 960px) {
  /* Wide primero (auto); luego lead+support; Moo + 3 compactos; wide final */
  .bento {
    grid-template-columns: repeat(30, 1fr);
    grid-template-rows: auto;
    align-items: stretch;
  }

  .bento__item--wide {
    grid-column: 1 / -1;
  }

  .bento__item--lead {
    grid-column: span 21;
  }

  .bento__item--support {
    grid-column: span 9;
  }

  .bento__item--row2-primary {
    grid-column: 1 / span 15;
    grid-row: span 3;
  }

  .bento__item--row2-compact {
    grid-column: 16 / -1;
  }
}

.bento__item {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

/* Altura según contenido; el tope lo ponemos en el bloque media, no en el texto */
.bento__item--lead,
.bento__item--support {
  max-height: none;
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
  .bento__item--lead .bento__wide-inner--stack,
  .bento__item--support .bento__wide-inner--stack {
    flex: 0 1 auto;
    height: auto;
  }

  .bento__item--lead .bento__body,
  .bento__item--support .bento__body {
    flex: 0 0 auto;
    overflow: visible;
  }

  .bento__item--lead .bento__media {
    height: min(280px, 42vh);
    max-height: 280px;
  }

  .bento__item--support .bento__media {
    height: min(220px, 36vh);
    max-height: 220px;
  }

  .bento__item--lead :deep(.bento__media--video),
  .bento__item--row2-primary :deep(.bento__media--video) {
    flex-shrink: 0;
    height: min(300px, 36vh);
    min-height: 200px;
    max-height: 300px;
  }

  .bento__item--row2-primary .bento__wide-inner--stack {
    flex: 1;
    min-height: 0;
  }

  .bento__item--row2-compact .bento__body,
  .bento__item--row2-primary .bento__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .bento__item--row2-compact .bento__stack,
  .bento__item--row2-primary .bento__stack {
    margin-top: auto;
  }

  .bento__item--row2-compact .bento__link,
  .bento__item--row2-primary .bento__link {
    margin-top: 0.65rem;
  }
}

@media (min-width: 640px) and (max-width: 959px) {
  .bento__item--row2-primary :deep(.bento__media--video) {
    height: 200px;
    min-height: 200px;
    max-height: 200px;
  }

  .bento__item--row2-compact .bento__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .bento__item--row2-compact .bento__stack {
    margin-top: auto;
  }
}

.bento__wide-inner--stack {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
}

.bento__wide-inner--text-only {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
}

.bento__body--solo {
  padding: 1rem 1.1rem 1.15rem;
  border-top: none;
}

.bento__item--row2-compact h3 {
  font-size: 1rem;
}

.bento__item--row2-compact p {
  font-size: var(--text-sm);
  line-height: 1.55;
}

.bento__item--row2-compact .chip {
  font-size: var(--text-xs);
  padding: 0.2rem 0.5rem;
}

.bento__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.bento__item--support .bento__media img {
  object-position: left top;
}

.bento__item--wide .bento__wide-inner {
  display: flex;
  flex-direction: column;
}

.bento__item--wide .bento__media {
  height: auto;
  max-height: none;
}

.bento__item--wide .bento__media img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center center;
}

.bento__media--gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  height: auto;
  max-height: none;
  padding: 0;
  background: var(--border);
  border-bottom: 1px solid var(--border);
}

.bento__gallery-btn {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: #05060d;
  cursor: zoom-in;
  line-height: 0;
}

.bento__gallery-btn:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: -2px;
  z-index: 1;
}

.bento__media--gallery img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: top center;
  border-radius: 0;
  border: none;
  background: #05060d;
  transition: opacity 0.15s ease;
}

.bento__gallery-btn:hover img {
  opacity: 0.88;
}

@media (max-width: 639px) {
  .bento__media--gallery {
    grid-template-columns: 1fr;
    max-height: none;
    overflow-y: visible;
  }

  .bento__media--gallery img {
    height: 400px;
  }
}

@media (min-width: 960px) {
  .bento__item--wide .bento__wide-inner {
    display: grid;
    /* Media ancha + panel de texto (~30%) — GanasDeSaber / aoe: imagen izq */
    grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
    align-items: stretch;
  }

  /* Memorable: texto izq, galería der (espejo) */
  .bento__item--wide.bento__item--gallery .bento__wide-inner {
    grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
  }

  .bento__item--wide.bento__item--gallery .bento__body {
    grid-column: 1;
    grid-row: 1;
  }

  .bento__item--wide.bento__item--gallery .bento__media {
    grid-column: 2;
    grid-row: 1;
  }

  .bento__item--wide .bento__media {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 12rem;
    height: auto;
    max-height: none;
    border-bottom: none;
    border-right: 1px solid var(--border);
  }

  .bento__item--wide.bento__item--gallery .bento__media {
    border-right: none;
    border-left: 1px solid var(--border);
  }

  .bento__item--wide .bento__media:not(.bento__media--gallery) img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .bento__item--wide .bento__body {
    justify-content: center;
    padding: 1rem 1.15rem;
  }

  .bento__item--wide .bento__stack {
    gap: 0.3rem;
  }

  .bento__item--wide .bento__stack .chip {
    font-size: var(--text-xs);
    padding: 0.25rem 0.55rem;
  }

  .bento__item--gallery .bento__media--gallery {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-content: stretch;
    gap: 1px;
    padding: 0;
    height: 100%;
  }

  .bento__item--gallery .bento__media--gallery img {
    height: 400px;
    width: 100%;
    object-fit: cover;
    object-position: top center;
  }
}

.bento__body {
  padding: 1.1rem 1.35rem 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  overflow: visible;
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
  font-size: var(--text-xs);
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

.bento__badge--youtube {
  color: #ff8a8a;
  background: rgba(255, 60, 60, 0.12);
  border: 1px solid rgba(255, 80, 80, 0.35);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

a.bento__badge--youtube:hover {
  color: #ffb4b4;
  background: rgba(255, 60, 60, 0.2);
  border-color: rgba(255, 120, 120, 0.5);
}

.bento__badge--itchio {
  color: #f0a8ff;
  background: rgba(250, 92, 255, 0.12);
  border: 1px solid rgba(250, 92, 255, 0.35);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

a.bento__badge--itchio:hover {
  color: #f5c8ff;
  background: rgba(250, 92, 255, 0.22);
  border-color: rgba(250, 140, 255, 0.5);
}

.bento__item time {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--agua);
}

.bento__item p {
  margin: 0;
  font-size: var(--text-base);
  line-height: 1.6;
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
