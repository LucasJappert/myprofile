<script setup lang="ts">
import {
  experienceEarlier,
  experienceIntro,
  experiencePrimary,
  type ExperienceItem,
} from '@/data/experience'
import AppIcon, { type IconName } from '@/components/AppIcon.vue'

const [current, ...previous] = experiencePrimary

/** Separa «APIX: detalle» en etiqueta y detalle para escanear más rápido */
function splitHighlight(text: string) {
  const match = text.match(/^([^:—]{2,64})(?::|\s—)\s+(.*)$/)
  return match ? { label: match[1]!.trim(), body: match[2]! } : { label: '', body: text }
}

const highlightIcons: [string, IconName][] = [
  ['APIX', 'layers'],
  ['Pía', 'chat'],
  ['Migración', 'database'],
  ['Sprint', 'board'],
  ['Agroideas-In', 'grid'],
  ['Entrega', 'cycle'],
]

const currentHighlights = (current?.highlights ?? []).map((text) => {
  const item = splitHighlight(text)
  const icon = highlightIcons.find(([prefix]) => item.label.startsWith(prefix))?.[1] ?? 'spark'
  return { ...item, icon }
})

/** Años en el rol actual (desde octubre de 2021) */
const yearsInRole = Math.floor((Date.now() - new Date(2021, 9, 1).getTime()) / (365.25 * 864e5))

function jobKey(job: ExperienceItem) {
  return `${job.company}-${job.period}`
}
</script>

<template>
  <section id="experiencia" class="section reveal">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="section-head__eyebrow"><b>02</b> Trayectoria</p>
          <h2>Experiencia</h2>
        </div>
        <p>{{ experienceIntro }}</p>
      </div>

      <article v-if="current" class="current surface surface--green">
        <header class="current__head">
          <p class="current__meta">
            <span class="tag tag--live">Rol actual</span>
            <span class="meta">{{ current.period }}</span>
          </p>
          <h3>
            <span v-for="part in current.role.split(' · ')" :key="part">{{ part }}</span>
          </h3>
          <p class="current__company">{{ current.company }}<span v-if="current.location"> · {{ current.location }}</span></p>
          <p class="current__summary">{{ current.summary }}</p>
          <div class="current__tenure">
            <span class="icon-box"><AppIcon name="clock" /></span>
            <p><strong>{{ yearsInRole }} años</strong> liderando Sistemas en Agroideas</p>
          </div>
        </header>
        <ul class="current__highlights">
          <li v-for="item in currentHighlights" :key="item.body">
            <span class="icon-box"><AppIcon :name="item.icon" /></span>
            <div>
              <strong v-if="item.label">{{ item.label }}</strong>
              <span>{{ item.body }}</span>
            </div>
          </li>
        </ul>
      </article>

      <ol class="ledger">
        <li v-for="job in previous" :key="jobKey(job)">
          <details class="ledger__row">
            <summary>
              <span class="ledger__period meta">{{ job.period }}</span>
              <span class="ledger__title">
                <strong>{{ job.role }}</strong>
                <span>{{ job.company }}</span>
              </span>
              <i class="ledger__toggle" aria-hidden="true" />
            </summary>
            <div class="ledger__detail">
              <p>{{ job.summary }}</p>
              <ul v-if="job.highlights?.length">
                <li v-for="highlight in job.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>
          </details>
        </li>
      </ol>

      <div v-if="experienceEarlier.length" class="earlier">
        <p class="earlier__label">Antes del software</p>
        <ul>
          <li v-for="job in experienceEarlier" :key="jobKey(job)">
            <span class="meta">{{ job.period }}</span>
            <span><strong>{{ job.role }}</strong> · {{ job.company }}</span>
            <span class="earlier__summary">{{ job.summary }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.current {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  gap: 2rem;
  padding: clamp(1.4rem, 4vw, 2.5rem);
  border: 1px solid rgba(46, 232, 184, 0.24);
  border-radius: var(--radius-lg);
}

/* Curvas de nivel en la esquina inferior: eco del mapa del inicio */
.current::before {
  content: '';
  position: absolute;
  z-index: -1;
  left: -8rem;
  bottom: -10rem;
  width: 30rem;
  height: 26rem;
  background: repeating-radial-gradient(ellipse at center, transparent 0 22px, rgba(46, 232, 184, 0.11) 22px 23px);
  -webkit-mask-image: radial-gradient(closest-side, #000 40%, transparent);
  mask-image: radial-gradient(closest-side, #000 40%, transparent);
  pointer-events: none;
}

.current__head { display: flex; flex-direction: column; }

.current__tenure {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.current__tenure p { margin: 0; color: var(--text-muted); font-size: var(--text-xs); line-height: 1.4; }
.current__tenure strong { display: block; color: var(--text); font-size: 1.15rem; }

.current__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1rem;
}

.current h3 span { display: block; }
.current h3 span + span { color: var(--agua); }
.current h3 {
  margin: 0;
  font-size: clamp(1.45rem, 3vw, 2.1rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
}

.current__company {
  margin: 0.45rem 0 0;
  color: var(--agua);
  font-size: var(--text-sm);
}
.current__company span { color: var(--text-muted); }

.current__summary {
  margin: 1.1rem 0 0;
  max-width: 46ch;
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: 1.65;
}

.current__highlights {
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: var(--radius);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
}
.current__highlights li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  background: rgba(7, 10, 16, 0.94);
  color: var(--text-muted);
  transition: background 0.3s ease;
  font-size: 0.92rem;
  line-height: 1.55;
}
.current__highlights li > div > span::first-letter { text-transform: uppercase; }
.current__highlights li:hover {
  background:
    radial-gradient(18rem 10rem at 0% 0%, rgba(46, 232, 184, 0.08), transparent 70%),
    rgba(9, 13, 20, 0.96);
}
.current__highlights li:hover .icon-box { border-color: rgba(46, 232, 184, 0.5); color: var(--verde); }
.current__highlights li > div { display: grid; gap: 0.3rem; }
.current__highlights strong {
  color: var(--text);
  font-size: var(--text-sm);
  line-height: 1.3;
}

.ledger {
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}
.ledger > li { border-bottom: 1px solid rgba(255, 255, 255, 0.09); }

.ledger__row summary {
  display: grid;
  grid-template-columns: 13rem minmax(0, 1fr) 1.75rem;
  align-items: center;
  gap: 1.25rem;
  padding: 1.15rem 0.25rem;
  cursor: pointer;
  list-style: none;
}
.ledger__row summary::-webkit-details-marker { display: none; }
.ledger__row summary:hover .ledger__title strong { color: var(--celeste); }

.ledger__title { display: grid; gap: 0.15rem; min-width: 0; }
.ledger__title strong { font-size: 1.08rem; line-height: 1.3; transition: color 0.2s ease; }
.ledger__title span { color: var(--text-muted); font-size: var(--text-xs); }

.ledger__toggle {
  position: relative;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid var(--border);
  border-radius: 50%;
}
.ledger__toggle::before,
.ledger__toggle::after {
  content: '';
  position: absolute;
  inset: 50% auto auto 50%;
  width: 0.6rem;
  height: 1px;
  background: var(--agua);
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease;
}
.ledger__toggle::after { transform: translate(-50%, -50%) rotate(90deg); }
.ledger__row[open] .ledger__toggle::after { transform: translate(-50%, -50%); }

.ledger__detail {
  padding: 0 2.75rem 1.4rem calc(13rem + 1.5rem);
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: 1.65;
}
.ledger__detail p { margin: 0; max-width: 62ch; }
.ledger__detail ul { margin: 0.75rem 0 0; padding-left: 1.1rem; max-width: 62ch; }
.ledger__detail li + li { margin-top: 0.4rem; }
.ledger__detail li::marker { color: var(--agua); }

.earlier { margin-top: 2rem; }
.earlier__label {
  margin: 0 0 0.6rem;
  font: 600 var(--text-xs)/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.earlier ul { margin: 0; padding: 0; list-style: none; }
.earlier li {
  display: grid;
  grid-template-columns: 13rem minmax(0, 1fr);
  gap: 0.2rem 1.25rem;
  padding: 0.55rem 0.25rem;
  color: var(--text-muted);
  font-size: var(--text-xs);
  line-height: 1.5;
}
.earlier strong { color: var(--text); font-weight: 600; }
.earlier__summary { grid-column: 2; }

@media (min-width: 900px) {
  .current { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 2.5rem; }
  .current__highlights { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 700px) {
  .ledger__row summary { grid-template-columns: minmax(0, 1fr) 1.75rem; gap: 0.35rem 1rem; }
  .ledger__period { grid-column: 1 / -1; }
  .ledger__title { grid-row: 2; }
  .ledger__toggle { grid-row: 2; }
  .ledger__detail { padding: 0 0.25rem 1.25rem; }
  .earlier li { grid-template-columns: 1fr; }
  .earlier__summary { grid-column: 1; }
}
</style>
