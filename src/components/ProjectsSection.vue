<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import ProjectVideoMedia from '@/components/ProjectVideoMedia.vue'
import { projects, type Project, type ProjectCategory } from '@/data/projects'
import { assetUrl } from '@/utils/assetUrl'

type FilterId = 'all' | ProjectCategory

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'agroideas', label: 'Agroideas' },
  { id: 'ai', label: 'IA' },
  { id: 'products', label: 'Productos' },
  { id: 'games', label: 'Juegos' },
  { id: 'opensource', label: 'Open source' },
]

const badgeLabels = {
  production: 'En producción',
  opensource: 'Open source',
  youtube: 'Canal YouTube',
  itchio: 'itch.io',
  personal: 'Proyecto propio',
  prototype: 'En desarrollo',
  integration: 'Integración propia',
} as const

const activeFilter = ref<FilterId>('all')
const activeIndex = ref(0)
const showAll = ref(false)
const lightbox = ref<{ images: string[]; alts: string[]; index: number } | null>(null)

function categories(project: Project): FilterId[] {
  return ['all', ...project.categories]
}

const filteredProjects = computed(() =>
  projects.filter((project) => categories(project).includes(activeFilter.value)),
)

const showcaseProjects = computed(() => {
  const featured = filteredProjects.value.filter((project) => project.featured)
  return featured.length ? featured : filteredProjects.value
})

const activeProject = computed(() => showcaseProjects.value[activeIndex.value] ?? projects[0])
const indexProjects = computed(() =>
  filteredProjects.value.filter((project) => project.name !== activeProject.value.name),
)
const visibleProjects = computed(() =>
  indexProjects.value.slice(0, showAll.value ? indexProjects.value.length : 4),
)

watch(activeFilter, () => {
  activeIndex.value = 0
  showAll.value = false
})

function go(delta: number) {
  const total = showcaseProjects.value.length
  if (total > 1) activeIndex.value = (activeIndex.value + delta + total) % total
}

function hasGallery(project: Project) {
  return Boolean(project.images && project.images.length > 1)
}

function openGallery(project: Project, index: number) {
  if (!project.images?.length) return
  lightbox.value = {
    images: project.images.map((src) => assetUrl(src)),
    alts: project.images.map((_, i) => `Captura ${i + 1} de ${project.name}`),
    index,
  }
}
</script>

<template>
  <section id="proyectos" class="section reveal">
    <div class="container">
      <div class="projects__heading">
        <div>
          <p class="projects__eyebrow">Trabajo seleccionado</p>
          <h2 class="section-title"><span>Proyectos</span></h2>
        </div>
        <p>Productos reales, IA aplicada y experimentos que terminaron convertidos en herramientas.</p>
      </div>

      <div class="projects__filters" role="group" aria-label="Filtrar proyectos">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="projects__filter"
          :class="{ 'is-active': activeFilter === filter.id }"
          :aria-pressed="activeFilter === filter.id"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="showcase" @keydown.left="go(-1)" @keydown.right="go(1)">
        <Transition name="project-swap" mode="out-in">
          <article :key="activeProject.name" class="showcase__card" data-tilt tabindex="0">
            <div class="showcase__media">
              <ProjectVideoMedia
                v-if="activeProject.youtubeId"
                :video-id="activeProject.youtubeId"
                :project-name="activeProject.name"
              />
              <button
                v-else-if="hasGallery(activeProject)"
                type="button"
                class="showcase__image-button"
                :aria-label="`Ampliar capturas de ${activeProject.name}`"
                @click="openGallery(activeProject, 0)"
              >
                <img :src="assetUrl(activeProject.images![0])" :alt="`Captura de ${activeProject.name}`" />
              </button>
              <img
                v-else-if="activeProject.image"
                :src="assetUrl(activeProject.image)"
                :alt="`Ilustración conceptual de ${activeProject.name}`"
              />
              <div v-else class="showcase__fallback" aria-hidden="true">
                <span class="showcase__orbit" />
                <span class="showcase__monogram">{{ activeProject.name.slice(0, 2) }}</span>
                <div class="showcase__signal">
                  <i v-for="index in 8" :key="index" :style="{ '--i': index }" />
                </div>
              </div>
              <div v-if="activeProject.images?.length" class="showcase__thumbs">
                <button
                  v-for="(image, index) in activeProject.images"
                  :key="image"
                  type="button"
                  :aria-label="`Ver captura ${index + 1}`"
                  @click="openGallery(activeProject, index)"
                >
                  <img :src="assetUrl(image)" alt="" loading="lazy" />
                </button>
              </div>
            </div>

            <div class="showcase__body">
              <div class="showcase__topline">
                <span v-if="activeProject.badge" class="project-badge">
                  {{ badgeLabels[activeProject.badge] }}
                </span>
                <span>{{ activeProject.period }}</span>
              </div>
              <h3>{{ activeProject.name }}</h3>
              <p>{{ activeProject.description }}</p>
              <ul v-if="activeProject.highlights?.length">
                <li v-for="highlight in activeProject.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <div class="showcase__stack">
                <span v-for="tech in activeProject.stack" :key="tech">{{ tech }}</span>
              </div>
              <a
                v-if="activeProject.href"
                :href="activeProject.href"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
                data-magnetic
              >
                Ver proyecto <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </Transition>

        <div class="showcase__controls">
          <span class="showcase__counter">
            {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(showcaseProjects.length).padStart(2, '0') }}
          </span>
          <div class="showcase__progress" aria-hidden="true">
            <span :style="{ width: `${((activeIndex + 1) / showcaseProjects.length) * 100}%` }" />
          </div>
          <button type="button" aria-label="Proyecto anterior" :disabled="showcaseProjects.length < 2" @click="go(-1)">←</button>
          <button type="button" aria-label="Proyecto siguiente" :disabled="showcaseProjects.length < 2" @click="go(1)">→</button>
        </div>
      </div>

      <div class="projects__index-heading">
        <h3>Más proyectos</h3>
        <span>{{ indexProjects.length }} adicionales</span>
      </div>
      <div class="projects__index">
        <details v-for="project in visibleProjects" :key="project.name" class="project-row">
          <summary>
            <span class="project-row__number">{{ String(projects.indexOf(project) + 1).padStart(2, '0') }}</span>
            <img
              v-if="project.image"
              class="project-row__thumb"
              :src="assetUrl(project.image)"
              alt=""
              width="96"
              height="54"
              loading="lazy"
            />
            <span class="project-row__name">{{ project.name }}</span>
            <span class="project-row__period">{{ project.period }}</span>
          </summary>
          <div class="project-row__detail">
            <p>{{ project.description }}</p>
            <div>
              <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
            </div>
            <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer">Abrir proyecto ↗</a>
          </div>
        </details>
      </div>
      <button
        v-if="indexProjects.length > 4"
        type="button"
        class="projects__more btn btn-ghost"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Mostrar menos' : `Ver índice completo (${indexProjects.length})` }}
      </button>
    </div>

    <ImageLightbox
      v-if="lightbox"
      :images="lightbox.images"
      :alts="lightbox.alts"
      :index="lightbox.index"
      @close="lightbox = null"
      @update:index="lightbox.index = $event"
    />
  </section>
</template>

<style scoped>
.projects__heading { display: grid; gap: 1rem; margin-bottom: 1.5rem; }
.projects__heading .section-title { margin-bottom: 0; }
.projects__heading > p { max-width: 40rem; margin: 0; color: var(--text-muted); }
.projects__eyebrow { margin: 0 0 .35rem; font: 600 var(--text-xs)/1 var(--font-mono); color: var(--agua); letter-spacing: .12em; text-transform: uppercase; }

.projects__filters { display: flex; flex-wrap: wrap; gap: .55rem; padding-bottom: 1.25rem; }
.projects__filter { flex: 0 0 auto; min-height: 2.75rem; padding: .55rem .95rem; border: 1px solid var(--border); border-radius: 999px; background: rgba(8,10,18,.6); color: var(--text-muted); font: 600 var(--text-xs) var(--font-sans); cursor: pointer; transition: .2s ease; }
.projects__filter:hover, .projects__filter.is-active { color: var(--bg-deep); border-color: transparent; background: var(--gradient-brand); box-shadow: 0 0 20px rgba(0,232,255,.14); }

.showcase { position: relative; }
.showcase__card { --rotate-x: 0deg; --rotate-y: 0deg; position: relative; display: grid; min-width: 0; overflow: hidden; border: 1px solid rgba(0,232,255,.2); border-radius: 1.5rem; background: rgba(7,9,18,.86); box-shadow: 0 30px 80px rgba(0,0,0,.32); }
.showcase__card::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: radial-gradient(25rem circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0,232,255,.1), transparent 65%); }
.showcase__media { position: relative; min-width: 0; aspect-ratio: 16 / 9; overflow: hidden; background: linear-gradient(135deg, #071927, #07100f 58%, #171028); }
.showcase__media > img, .showcase__image-button, .showcase__image-button img, .showcase__media :deep(.bento__media--video) { display: block; width: 100%; height: 100%; min-height: 0; object-fit: cover; }
.showcase__image-button { padding: 0; border: 0; cursor: zoom-in; }
.showcase__fallback { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; }
.showcase__fallback::before { content: ''; position: absolute; width: 25rem; height: 25rem; border-radius: 50%; background: radial-gradient(circle, rgba(0,232,255,.13), transparent 64%); }
.showcase__orbit { position: absolute; width: 17rem; height: 17rem; border: 1px solid rgba(46,232,184,.25); border-radius: 50%; box-shadow: 0 0 60px rgba(0,232,255,.08), inset 0 0 40px rgba(46,232,184,.05); }
.showcase__orbit::before, .showcase__orbit::after { content: ''; position: absolute; inset: 2rem; border: 1px dashed rgba(152,110,255,.34); border-radius: 50%; transform: rotate(33deg); }
.showcase__orbit::after { inset: 4.2rem; border-color: rgba(0,232,255,.28); }
.showcase__monogram { z-index: 1; font: 700 clamp(3.5rem, 9vw, 7rem)/1 var(--font-mono); letter-spacing: -.12em; color: transparent; -webkit-text-stroke: 1px rgba(238,242,255,.72); filter: drop-shadow(0 0 25px rgba(0,232,255,.38)); }
.showcase__signal { position: absolute; inset: auto 1.5rem 1.4rem; display: flex; align-items: end; gap: .35rem; height: 3rem; opacity: .55; }
.showcase__signal i { width: .3rem; height: calc(.45rem + var(--i) * .25rem); border-radius: 1rem; background: var(--gradient-brand); }
.showcase__thumbs { position: absolute; right: 1rem; bottom: 1rem; display: flex; gap: .4rem; }
.showcase__thumbs button { width: 3.4rem; height: 2.4rem; padding: .12rem; border: 1px solid rgba(255,255,255,.28); border-radius: .4rem; background: #05060d; cursor: zoom-in; }
.showcase__thumbs img { width: 100%; height: 100%; object-fit: cover; }

.showcase__body { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; padding: clamp(1.4rem, 4vw, 3rem); }
.showcase__topline { display: flex; flex-wrap: wrap; align-items: center; gap: .65rem; color: var(--text-muted); font: 500 var(--text-xs) var(--font-mono); }
.project-badge { padding: .28rem .58rem; border: 1px solid rgba(46,232,184,.32); border-radius: 999px; color: var(--agua); background: rgba(46,232,184,.08); }
.showcase h3 { margin: 1rem 0 .85rem; font-size: clamp(1.8rem, 4vw, 3.2rem); line-height: 1.03; letter-spacing: -.035em; }
.showcase__body > p { margin: 0; color: var(--text-muted); line-height: 1.65; }
.showcase__body ul { margin: 1rem 0 0; padding-left: 1.1rem; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.55; }
.showcase__body li::marker { color: var(--agua); }
.showcase__stack { display: flex; flex-wrap: wrap; gap: .42rem; margin: auto 0 1.3rem; padding-top: 1.4rem; }
.showcase__stack span, .project-row__detail span { padding: .27rem .55rem; border: 1px solid rgba(0,232,255,.18); border-radius: 999px; color: #9debf4; background: rgba(0,232,255,.06); font-size: var(--text-xs); }

.showcase__controls { display: grid; grid-template-columns: auto minmax(5rem, 1fr) auto auto; align-items: center; gap: .65rem; margin-top: .9rem; }
.showcase__counter { font: 500 var(--text-xs) var(--font-mono); color: var(--text-muted); }
.showcase__progress { height: 2px; background: rgba(255,255,255,.08); }
.showcase__progress span { display: block; height: 100%; background: var(--gradient-brand); transition: width .35s ease; }
.showcase__controls button { display: grid; place-items: center; width: 2.8rem; height: 2.8rem; border: 1px solid var(--border); border-radius: 50%; background: rgba(8,10,18,.7); color: var(--text); cursor: pointer; font-size: 1.15rem; }
.showcase__controls button:hover:not(:disabled) { color: var(--celeste); border-color: var(--celeste); }
.showcase__controls button:disabled { opacity: .3; cursor: default; }

.projects__index-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin: 3rem 0 .8rem; }
.projects__index-heading h3 { margin: 0; font-size: 1.25rem; }
.projects__index-heading span { color: var(--text-muted); font: var(--text-xs) var(--font-mono); }
.projects__index { border-top: 1px solid var(--border); }
.project-row { min-width: 0; overflow: clip; border-bottom: 1px solid var(--border); }
.project-row:not([open]) .project-row__detail { display: none; }
.project-row summary { display: grid; grid-template-columns: 2.4rem 5rem minmax(0,1fr) auto 1.1rem; gap: .8rem; align-items: center; min-height: 4.5rem; padding: .55rem .25rem; cursor: pointer; list-style: none; }
.project-row summary::-webkit-details-marker { display: none; }
.project-row summary::after { content: '+'; margin-left: .35rem; color: var(--agua); }
.project-row[open] summary::after { content: '−'; }
.project-row__number { color: var(--agua); font: var(--text-xs) var(--font-mono); }
.project-row__thumb { display: block; width: 5rem; aspect-ratio: 16 / 9; border: 1px solid rgba(0,232,255,.18); border-radius: .45rem; object-fit: cover; background: #07111c; }
.project-row__name { font-weight: 600; line-height: 1.3; }
.project-row__period { color: var(--text-muted); font-size: var(--text-xs); }
.project-row__detail { width: 100%; max-width: 100%; min-width: 0; padding: 0 2.5rem 1.25rem 3.45rem; }
.project-row__detail p { max-width: 46rem; margin: 0 0 .8rem; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.55; }
.project-row__detail div { display: flex; flex-wrap: wrap; gap: .35rem; }
.project-row__detail a { display: inline-block; margin-top: .8rem; font-size: var(--text-sm); }
.projects__more { display: flex; margin: 1.25rem auto 0; }

.project-swap-enter-active, .project-swap-leave-active { transition: opacity .24s ease, transform .24s ease; }
.project-swap-enter-from { opacity: 0; transform: translateX(1rem); }
.project-swap-leave-to { opacity: 0; transform: translateX(-1rem); }

@media (min-width: 820px) {
  .projects__heading { grid-template-columns: 1fr 1fr; align-items: end; }
  .showcase__card { min-height: 32rem; grid-template-columns: minmax(0, 1.12fr) minmax(22rem, .88fr); }
  .showcase__media { min-height: 32rem; aspect-ratio: auto; }
}

@media (max-width: 420px) {
  .projects__filters { gap: .4rem; }
  .projects__filter { flex: 1 0 auto; padding-inline: .7rem; }
  .showcase h3 { font-size: 1.65rem; }
  .showcase__body { padding: 1.2rem; }
  .showcase__body > p { font-size: .9rem; line-height: 1.55; }
  .project-row summary { grid-template-columns: 1.5rem 3.5rem minmax(0,1fr) 1rem; gap: .5rem; }
  .project-row__thumb { width: 3.5rem; }
  .project-row__period { display: none; }
}

@media (max-width: 619px) {
  .project-row summary { grid-template-columns: 1.75rem 4rem minmax(0,1fr) 1.1rem; gap: .6rem; }
  .project-row__thumb { width: 4rem; }
  .project-row__period { display: none; }
  .project-row__detail { padding-left: 2.25rem; padding-right: .5rem; }
  .showcase__body ul { display: none; }
  .showcase__body { padding: 1.35rem; }
  .showcase__stack { margin-bottom: 1rem; }
}

@media (max-width: 420px) {
  .project-row summary { grid-template-columns: 1.5rem 3.5rem minmax(0,1fr) 1rem; gap: .5rem; }
  .project-row__thumb { width: 3.5rem; }
  .showcase__body { padding: 1.2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .project-swap-enter-active, .project-swap-leave-active { transition: none; }
}
</style>
