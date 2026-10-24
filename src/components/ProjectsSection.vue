<script setup lang="ts">
import { ref } from 'vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import { projects, type Project } from '@/data/projects'
import { assetUrl } from '@/utils/assetUrl'

const badgeLabels = {
  production: 'En producción',
  opensource: 'Open source',
  youtube: 'Canal YouTube',
  itchio: 'itch.io',
  personal: 'Proyecto propio',
  prototype: 'En desarrollo',
  integration: 'Integración propia',
} as const

const [lead, ...cases] = projects.filter((project) => project.tier === 'case')
const products = projects.filter((project) => project.tier === 'product')
const more = projects.filter((project) => project.tier === 'more')

const lightbox = ref<{ images: string[]; alts: string[]; index: number } | null>(null)

function openGallery(project: Project, index = 0) {
  if (!project.images?.length) return
  lightbox.value = {
    images: project.images.map((src) => assetUrl(src)),
    alts: project.images.map((_, i) => `Captura ${i + 1} de ${project.name}`),
    index,
  }
}

const boardColumns = [
  { title: 'Por hacer', cards: ['team', 'agent'] },
  { title: 'En curso', cards: ['agent', 'team'] },
  { title: 'Hecho', cards: ['pr', 'team'] },
]

function thumb(project: Project) {
  return project.previews?.[0] ?? project.images?.[0] ?? project.image
}
</script>

<template>
  <section id="proyectos" class="section reveal">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="section-head__eyebrow"><b>03</b> Trabajo seleccionado</p>
          <h2>Proyectos</h2>
        </div>
        <p>Productos reales, IA aplicada y experimentos que terminaron convertidos en herramientas.</p>
      </div>

      <p class="group-label">En Agroideas</p>

      <article v-if="lead" class="case case--lead surface surface--green">
        <figure class="case__media">
          <button
            type="button"
            class="case__shot"
            :aria-label="`Ampliar capturas de ${lead.name}`"
            @click="openGallery(lead)"
          >
            <img :src="assetUrl(thumb(lead)!)" :alt="`Captura de ${lead.name}`" width="960" height="516" loading="lazy" />
            <span class="case__zoom" aria-hidden="true">Ampliar ↗</span>
          </button>
          <div v-if="(lead.images?.length ?? 0) > 1" class="case__thumbs">
            <button
              v-for="(image, index) in lead.images"
              :key="image"
              type="button"
              :aria-label="`Ver captura ${index + 1} de ${lead.name}`"
              @click="openGallery(lead, index)"
            >
              <img :src="assetUrl(image)" alt="" loading="lazy" />
            </button>
          </div>
          <figcaption v-if="lead.imagesCaption">{{ lead.imagesCaption }}</figcaption>
        </figure>
        <div class="case__body">
          <p class="case__topline">
            <span v-if="lead.badge" class="tag tag--live">{{ badgeLabels[lead.badge] }}</span>
            <span class="meta">{{ lead.period }}</span>
          </p>
          <h3>{{ lead.name }}</h3>
          <p>{{ lead.description }}</p>
          <ul v-if="lead.highlights?.length">
            <li v-for="highlight in lead.highlights" :key="highlight">{{ highlight }}</li>
          </ul>
          <div class="stack">
            <span v-for="tech in lead.stack" :key="tech" class="tag">{{ tech }}</span>
          </div>
          <a v-if="lead.href" :href="lead.href" target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-magnetic>
            Ver APIX <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>

      <div class="case-pair">
        <article v-for="project in cases" :key="project.name" class="case surface">
          <figure v-if="project.schematic === 'assistant'" class="case__media schematic" aria-label="Esquema: pregunta, herramientas de lectura y respuesta con fuentes">
            <div class="flow">
              <div class="flow__node">
                <span class="flow__icon" aria-hidden="true">?</span>
                <strong>Pregunta</strong>
                <span>texto o voz</span>
              </div>
              <i class="flow__link" aria-hidden="true" />
              <div class="flow__node flow__node--tools">
                <span class="flow__icon" aria-hidden="true">⌘</span>
                <strong>Herramientas</strong>
                <span>datos · documentación</span>
                <em>entorno aislado</em>
              </div>
              <i class="flow__link" aria-hidden="true" />
              <div class="flow__node flow__node--answer">
                <span class="flow__icon" aria-hidden="true">✓</span>
                <strong>Respuesta</strong>
                <span class="flow__sources"><b>fuente</b><b>fuente</b></span>
              </div>
            </div>
          </figure>
          <figure v-else-if="project.schematic === 'board'" class="case__media schematic" aria-label="Esquema: tablero de sprint con tareas del equipo y de agentes de IA">
            <div class="board">
              <div v-for="(column, c) in boardColumns" :key="column.title" class="board__col">
                <p>{{ column.title }}</p>
                <div v-for="(card, k) in column.cards" :key="k" class="board__card" :class="`board__card--${card}`">
                  <i :style="{ width: `${55 + ((c * 3 + k * 7) % 4) * 10}%` }" />
                  <i :style="{ width: `${30 + ((c * 5 + k * 3) % 3) * 12}%` }" />
                  <span>{{ card === 'agent' ? 'agente IA' : card === 'pr' ? 'PR ↗' : 'equipo' }}</span>
                </div>
              </div>
            </div>
          </figure>
          <figure v-else class="case__media case__media--art">
            <img :src="assetUrl(thumb(project)!)" :alt="`Ilustración de ${project.name}`" loading="lazy" />
          </figure>
          <div class="case__body">
            <p class="case__topline">
              <span v-if="project.badge" class="tag tag--live">{{ badgeLabels[project.badge] }}</span>
              <span class="meta">{{ project.period }}</span>
            </p>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <ul v-if="project.highlights?.length">
              <li v-for="highlight in project.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
            <div class="stack">
              <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
            </div>
          </div>
        </article>
      </div>

      <p class="group-label">Productos propios</p>

      <div class="products">
        <article v-for="project in products" :key="project.name" class="product surface surface--warm">
          <button
            type="button"
            class="product__media"
            :class="{ 'product__media--phones': project.mediaKind === 'phones' }"
            :aria-label="`Ampliar capturas de ${project.name}`"
            @click="openGallery(project)"
          >
            <template v-if="project.mediaKind === 'phones'">
              <img
                v-for="image in project.previews ?? project.images"
                :key="image"
                :src="assetUrl(image)"
                alt=""
                width="280"
                height="599"
                loading="lazy"
              />
            </template>
            <img v-else :src="assetUrl(thumb(project)!)" :alt="`Captura de ${project.name}`" width="800" height="500" loading="lazy" />
          </button>
          <div class="product__body">
            <p class="case__topline">
              <span v-if="project.badge" class="tag tag--live">{{ badgeLabels[project.badge] }}</span>
              <span class="meta">{{ project.period }}</span>
            </p>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div class="stack">
              <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
            </div>
            <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer" class="product__link">
              Abrir {{ project.name }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>

      <p class="group-label">Más proyectos <span>{{ more.length }}</span></p>

      <div class="index">
        <details v-for="project in more" :key="project.name" class="index__row">
          <summary>
            <img
              v-if="thumb(project)"
              class="index__thumb"
              :src="assetUrl(thumb(project)!)"
              alt=""
              width="96"
              height="60"
              loading="lazy"
            />
            <span class="index__name">{{ project.name }}</span>
            <span class="index__period">{{ project.period }}</span>
            <i class="index__toggle" aria-hidden="true" />
          </summary>
          <div class="index__detail">
            <p>{{ project.description }}</p>
            <div class="stack">
              <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
            </div>
            <a v-if="project.href" :href="project.href" target="_blank" rel="noopener noreferrer">
              Abrir proyecto <span aria-hidden="true">↗</span>
            </a>
          </div>
        </details>
      </div>
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
.group-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: clamp(2.5rem, 6vw, 3.75rem) 0 1rem;
  font: 600 var(--text-xs)/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.group-label:first-of-type { margin-top: 0; }
.group-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.09);
}
.group-label span { color: var(--agua); }

.stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }

/* Casos */
.case {
  align-content: start;
  display: grid;
  overflow: hidden;
  border: 1px solid rgba(0, 232, 255, 0.16);
  border-radius: var(--radius-lg);
}

.case__media {
  position: relative;
  margin: 0;
  background: #060a10;
}
.case__media img { display: block; width: 100%; height: 100%; object-fit: cover; }
.case__media--art { aspect-ratio: 21 / 9; }
.case__media figcaption {
  padding: 0.6rem 1rem 0.8rem;
  font: 500 0.72rem/1.4 var(--font-mono);
  color: var(--text-muted);
}

.case__shot {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}
.case__shot img { aspect-ratio: 960 / 516; }
.case__zoom {
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  background: rgba(5, 6, 13, 0.82);
  color: var(--text);
  font: 500 0.72rem/1.2 var(--font-mono);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.case__shot:hover .case__zoom,
.case__shot:focus-visible .case__zoom { opacity: 1; }

.case__thumbs {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem 0;
}
.case__thumbs button {
  width: 5.5rem;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 0.4rem;
  background: none;
  cursor: zoom-in;
  transition: border-color 0.2s ease;
}
.case__thumbs button:hover { border-color: var(--celeste); }
.case__thumbs img { aspect-ratio: 16 / 9; }

.case__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(1.25rem, 3.5vw, 2.25rem);
}
.case__topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}
.case h3 {
  margin: 0.85rem 0 0.6rem;
  font-size: clamp(1.35rem, 2.6vw, 1.75rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
}
.case--lead h3 { font-size: clamp(1.75rem, 3.6vw, 2.6rem); }
.case__body > p { margin: 0; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.65; }
.case__body ul { margin: 0.9rem 0 0; padding-left: 1.1rem; color: var(--text-muted); font-size: 0.92rem; line-height: 1.55; }
.case__body li + li { margin-top: 0.35rem; }
.case__body li::marker { color: var(--agua); }
.case__body .stack { margin-top: 1.25rem; }
.case__body .btn { margin-top: 1.5rem; }

.case-pair { display: grid; gap: 1rem; margin-top: 1rem; }

/* Esquemas dibujados (Pía, Sprint IT) */
.schematic {
  display: grid;
  place-items: center;
  min-height: 13rem;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background:
    radial-gradient(circle, rgba(142, 234, 255, 0.13) 1px, transparent 1.5px) 0 0 / 18px 18px,
    #060a10;
}

.flow {
  display: grid;
  grid-template-columns: 1fr 2rem 1.15fr 2rem 1fr;
  align-items: center;
  width: 100%;
  max-width: 30rem;
}
.flow__node {
  display: grid;
  justify-items: center;
  gap: 0.2rem;
  padding: 0.85rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.8rem;
  background: rgba(8, 11, 18, 0.95);
  text-align: center;
}
.flow__node strong { font-size: 0.85rem; line-height: 1.2; }
.flow__node span { color: var(--text-muted); font: 500 0.66rem/1.3 var(--font-mono); }
.flow__node em {
  margin-top: 0.2rem;
  padding: 0.1rem 0.4rem;
  border: 1px dashed rgba(233, 207, 74, 0.5);
  border-radius: 999px;
  color: var(--ramp-3);
  font: 500 0.6rem/1.3 var(--font-mono);
  font-style: normal;
}
.flow__node--tools { border-color: rgba(0, 232, 255, 0.35); }
.flow__node--answer { border-color: rgba(34, 232, 132, 0.4); }
.flow__icon {
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  margin-bottom: 0.2rem;
  border-radius: 50%;
  background: rgba(0, 232, 255, 0.1);
  color: var(--celeste) !important;
  font: 700 0.85rem/1 var(--font-sans) !important;
}
.flow__node--answer .flow__icon { background: rgba(34, 232, 132, 0.12); color: var(--verde) !important; }
.flow__sources { display: flex; gap: 0.25rem; }
.flow__sources b {
  padding: 0.08rem 0.35rem;
  border-radius: 0.3rem;
  background: rgba(34, 232, 132, 0.12);
  color: var(--verde);
  font-weight: 500;
}
.flow__link {
  position: relative;
  height: 1px;
  border-top: 1px dashed rgba(0, 232, 255, 0.5);
}
.flow__link::after {
  content: '';
  position: absolute;
  right: -1px;
  top: -4px;
  border: 3.5px solid transparent;
  border-left: 5px solid rgba(0, 232, 255, 0.8);
}

.board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
  width: 100%;
  max-width: 30rem;
}
.board__col {
  display: grid;
  align-content: start;
  gap: 0.4rem;
  padding: 0.55rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.03);
}
.board__col p {
  margin: 0 0 0.1rem;
  color: var(--text-muted);
  font: 600 0.62rem/1 var(--font-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.board__card {
  display: grid;
  gap: 0.3rem;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 2px solid var(--ramp-5);
  border-radius: 0.4rem;
  background: rgba(8, 11, 18, 0.95);
}
.board__card i { display: block; height: 0.3rem; border-radius: 1px; background: rgba(255, 255, 255, 0.16); }
.board__card span { justify-self: start; color: var(--text-muted); font: 500 0.6rem/1.2 var(--font-mono); }
.board__card--agent { border-left-color: var(--celeste); }
.board__card--agent span { color: var(--celeste); }
.board__card--pr { border-left-color: var(--ramp-3); }
.board__card--pr span { color: var(--ramp-3); }

/* Productos propios */
.products { display: grid; gap: 1rem; }

.product {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(0, 232, 255, 0.14);
  border-radius: var(--radius-lg);
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.product:hover { border-color: rgba(46, 232, 184, 0.36); }

.product__media {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #060a10;
  cursor: zoom-in;
}
.product__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.product:hover .product__media img { transform: scale(1.03); }

.product__media--phones {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.6rem;
  padding: 1.1rem 1rem 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 100%, rgba(233, 207, 74, 0.12), transparent 70%),
    #060a10;
}
.product__media--phones img {
  width: 28%;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-bottom: 0;
  border-radius: 0.6rem 0.6rem 0 0;
}
.product__media--phones img:nth-child(2) { width: 31%; }

.product__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem 1.3rem 1.35rem;
}
.product h3 { margin: 0.75rem 0 0.5rem; font-size: 1.3rem; line-height: 1.15; letter-spacing: -0.02em; }
.product__body > p { margin: 0; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; }
.product__body .stack { margin-top: 1rem; }
.product__link { margin-top: auto; padding-top: 1.1rem; font-size: var(--text-sm); font-weight: 600; }

/* Índice */
.index { border-top: 1px solid rgba(255, 255, 255, 0.09); }
.index__row { border-bottom: 1px solid rgba(255, 255, 255, 0.09); }
.index__row summary {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) auto 1.75rem;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 0.25rem;
  cursor: pointer;
  list-style: none;
}
.index__row summary::-webkit-details-marker { display: none; }
.index__row summary:hover .index__name { color: var(--celeste); }
.index__thumb {
  display: block;
  width: 4.5rem;
  aspect-ratio: 16 / 10;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.4rem;
  object-fit: cover;
  background: #060a10;
}
.index__name { font-weight: 600; line-height: 1.3; transition: color 0.2s ease; }
.index__period { color: var(--text-muted); font-size: var(--text-xs); text-align: right; }
.index__toggle {
  position: relative;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid var(--border);
  border-radius: 50%;
}
.index__toggle::before,
.index__toggle::after {
  content: '';
  position: absolute;
  inset: 50% auto auto 50%;
  width: 0.6rem;
  height: 1px;
  background: var(--agua);
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}
.index__toggle::after { transform: translate(-50%, -50%) rotate(90deg); }
.index__row[open] .index__toggle::after { transform: translate(-50%, -50%); }
.index__detail { padding: 0.15rem 2.75rem 1.25rem calc(4.5rem + 1.25rem); }
.index__detail p { max-width: 62ch; margin: 0 0 0.85rem; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.6; }
.index__detail a { display: inline-block; margin-top: 0.85rem; font-size: var(--text-sm); font-weight: 600; }

@media (min-width: 900px) {
  .schematic { aspect-ratio: 21 / 9; }
  .case--lead { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
  /* La captura ocupa todo el alto de la columna; miniaturas y pie quedan abajo */
  .case--lead .case__media {
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }
  .case--lead .case__shot { flex: 1; min-height: 0; }
  .case--lead .case__shot img {
    position: absolute;
    inset: 0;
    aspect-ratio: auto;
    object-position: left top;
  }
  .case--lead .case__thumbs { padding-top: 0.85rem; }
  .case-pair { grid-template-columns: 1fr 1fr; }
  .products { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 640px) and (max-width: 899px) {
  .products { grid-template-columns: 1fr 1fr; }
  .products .product:last-child { grid-column: 1 / -1; flex-direction: row; }
  .products .product:last-child .product__media {
    flex: 0 0 50%;
    aspect-ratio: auto;
    border-bottom: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
  }
}

@media (max-width: 640px) {
  .schematic { padding: 1.25rem 0.75rem; }
  .flow { grid-template-columns: 1fr 1rem 1.15fr 1rem 1fr; }
  .flow__node { padding: 0.65rem 0.3rem; }
  .flow__node strong { font-size: 0.75rem; }
  .flow__node span { font-size: 0.58rem; }
  .index__row summary { grid-template-columns: 3.5rem minmax(0, 1fr) 1.75rem; gap: 0.75rem; }
  .index__thumb { width: 3.5rem; }
  .index__period { display: none; }
  .index__detail { padding: 0 0.25rem 1.1rem; }
  .case__body ul { display: none; }
}
</style>
