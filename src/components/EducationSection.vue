<script setup lang="ts">
import {
  complementaryGrid,
  featuredComplementary,
  formalEducationGroups,
} from '@/data/education'

function rankLabel(rank?: 1 | 2) {
  if (rank === 1) return '1.er puesto'
  if (rank === 2) return '2.º puesto'
  return null
}
</script>

<template>
  <section id="educacion" class="section section--alt reveal">
    <div class="container">
      <div class="education__heading">
        <div>
          <p class="education__eyebrow">Aprendizaje continuo</p>
          <h2 class="section-title"><span>Formación</span></h2>
        </div>
        <p>Base técnica, práctica en producto y aprendizaje que se convierte en software.</p>
      </div>

      <div class="education__grid">
        <article
          v-if="featuredComplementary"
          id="educacion-google"
          class="edu-featured surface--accent"
          tabindex="-1"
        >
          <span class="edu-featured__number" aria-hidden="true">01</span>
          <div class="edu-featured__badges">
            <span class="edu-featured__provider">Google Argentina</span>
            <span class="edu-featured__award">🏆 {{ rankLabel(featuredComplementary.rank) }}</span>
          </div>
          <h3>{{ featuredComplementary.title }}</h3>
          <p class="edu-featured__meta">
            <time>{{ featuredComplementary.period }}</time>
            · Intensivo presencial con equipos en vivo
          </p>
          <p class="edu-featured__copy">
            Competencia post-charla PWA: aplicamos lo aprendido con profesionales de Google y
            ganamos el primer puesto.
          </p>
          <div class="edu-featured__result">
            <span>Aprender</span><i aria-hidden="true">→</i>
            <span>Construir</span><i aria-hidden="true">→</i>
            <strong>Ganar</strong>
          </div>
        </article>

        <div class="education__path">
          <section v-if="complementaryGrid.length" class="education__group">
            <p class="education__group-label">Especialización</p>
            <article v-for="item in complementaryGrid" :key="item.title" class="edu-card">
              <span class="edu-card__period">{{ item.period }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.institution }}</p>
            </article>
          </section>

          <section
            v-for="group in formalEducationGroups"
            :key="group.category"
            class="education__group"
          >
            <p class="education__group-label">{{ group.label }}</p>
            <article v-for="item in group.items" :key="item.title + item.period" class="edu-card">
              <span class="edu-card__period">{{ item.period }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.institution }}</p>
            </article>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.education__heading { display: grid; gap: 1rem; align-items: end; margin-bottom: 2rem; }
.education__heading .section-title { margin: 0; }
.education__heading > p { max-width: 38rem; margin: 0; color: var(--text-muted); }
.education__eyebrow, .education__group-label { margin: 0 0 .4rem; color: var(--agua); font: 600 var(--text-xs)/1 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }
.education__grid { display: grid; gap: 1rem; }

.edu-featured { position: relative; min-height: 24rem; overflow: hidden; padding: clamp(1.5rem, 4vw, 2.75rem); scroll-margin-top: calc(var(--nav-h) + 1rem); }
.edu-featured:focus { outline: none; }
.edu-featured::after { content: ''; position: absolute; right: -5rem; bottom: -7rem; width: 20rem; height: 20rem; border: 1px solid rgba(0,232,255,.16); border-radius: 50%; box-shadow: 0 0 0 2.5rem rgba(0,232,255,.025), 0 0 0 5rem rgba(152,110,255,.02); }
.edu-featured__number { position: absolute; right: 1.5rem; top: 1rem; color: rgba(255,255,255,.045); font: 700 clamp(5rem,14vw,10rem)/1 var(--font-mono); }
.edu-featured__badges { position: relative; z-index: 1; display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin-bottom: 1.2rem; }
.edu-featured__provider, .edu-featured__award { padding: .32rem .7rem; border-radius: 999px; font-size: var(--text-xs); font-weight: 700; }
.edu-featured__provider { border: 1px solid rgba(0,232,255,.35); color: var(--celeste); background: rgba(0,232,255,.08); font-family: var(--font-mono); letter-spacing: .05em; text-transform: uppercase; }
.edu-featured__award { border: 1px solid rgba(34,232,132,.35); color: var(--verde); background: rgba(34,232,132,.1); }
.edu-featured h3 { position: relative; z-index: 1; max-width: 18ch; margin: 0; font-size: clamp(1.8rem,4vw,3.25rem); line-height: 1.05; letter-spacing: -.035em; }
.edu-featured__meta { position: relative; z-index: 1; margin: 1rem 0 0; color: var(--agua); font-size: var(--text-sm); }
.edu-featured__meta time { font-family: var(--font-mono); }
.edu-featured__copy { position: relative; z-index: 1; max-width: 48ch; margin: 1rem 0 0; color: var(--text-muted); line-height: 1.65; }
.edu-featured__result { position: relative; z-index: 1; display: flex; flex-wrap: wrap; align-items: center; gap: .55rem; margin-top: 2rem; color: var(--text-muted); font: 600 var(--text-sm) var(--font-mono); }
.edu-featured__result i { color: var(--agua); font-style: normal; }
.edu-featured__result strong { color: var(--verde); }

.education__path { display: grid; gap: 1rem; }
.education__group { padding: 1.25rem; border: 1px solid var(--border); border-radius: var(--radius-lg); background: rgba(8,10,18,.64); }
.education__group-label { margin-bottom: .85rem; color: #b5a0ff; }
.edu-card { position: relative; padding: 1rem 4.4rem 1rem 1rem; border-left: 2px solid rgba(0,232,255,.36); background: rgba(255,255,255,.022); }
.edu-card + .edu-card { margin-top: .65rem; }
.edu-card h3 { margin: 0; font-size: 1rem; line-height: 1.35; }
.edu-card p { margin: .35rem 0 0; color: var(--text-muted); font-size: var(--text-sm); }
.edu-card__period { position: absolute; top: 1rem; right: 1rem; color: var(--agua); font: 500 var(--text-xs) var(--font-mono); }

@media (min-width: 820px) {
  .education__heading { grid-template-columns: 1fr 1fr; }
  .education__grid { grid-template-columns: minmax(0,1.2fr) minmax(18rem,.8fr); }
}
</style>
