<script setup lang="ts">
import { experience, experienceIntro, type ExperienceItem } from '@/data/experience'

function jobKey(job: ExperienceItem) {
  return `${job.company}-${job.period}`
}

function jobImpact(job: ExperienceItem) {
  return job.highlights?.[0] ?? job.summary
}
</script>

<template>
  <section id="experiencia" class="section reveal">
    <div class="container">
      <div class="experience__heading">
        <div>
          <p class="experience__eyebrow">Trayectoria</p>
          <h2 class="section-title"><span>Experiencia</span></h2>
        </div>
        <p>{{ experienceIntro }}</p>
      </div>

      <ol class="timeline">
        <li
          v-for="(job, index) in experience"
          :key="jobKey(job)"
          class="timeline__item"
          :class="{ 'timeline__item--current': job.current }"
        >
          <span class="timeline__node" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <details class="timeline__card">
            <summary>
              <div class="timeline__summary-top">
                <span v-if="job.current" class="timeline__current">Rol actual</span>
                <time>{{ job.period }}</time>
              </div>
              <h3>{{ job.role }}</h3>
              <p class="timeline__company">{{ job.company }}</p>
              <p class="timeline__impact">{{ jobImpact(job) }}</p>
              <span class="timeline__toggle" aria-hidden="true" />
            </summary>
            <div class="timeline__content">
              <p>{{ job.summary }}</p>
              <ul v-if="job.highlights && job.highlights.length > 1">
                <li v-for="highlight in job.highlights.slice(1)" :key="highlight">{{ highlight }}</li>
              </ul>
              <span v-if="job.location" class="timeline__location">{{ job.location }}</span>
            </div>
          </details>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience__heading { display: grid; gap: 1rem; margin-bottom: 2.5rem; }
.experience__heading .section-title { margin: 0; }
.experience__heading > p { max-width: 44rem; margin: 0; color: var(--text-muted); }
.experience__eyebrow { margin: 0 0 .35rem; color: var(--agua); font: 600 var(--text-xs)/1 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }

.timeline { position: relative; display: grid; gap: 1.2rem; margin: 0; padding: 0; list-style: none; }
.timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: 1.35rem; width: 1px; background: linear-gradient(180deg, transparent, var(--celeste) 8%, var(--agua) 55%, rgba(152,110,255,.55) 92%, transparent); box-shadow: 0 0 14px rgba(0,232,255,.28); }
.timeline__item { position: relative; padding-left: 3.8rem; }
.timeline__node { position: absolute; z-index: 2; top: 1.2rem; left: 0; display: grid; place-items: center; width: 2.7rem; height: 2.7rem; border: 1px solid rgba(0,232,255,.35); border-radius: 50%; color: var(--celeste); background: #080a14; box-shadow: 0 0 0 .4rem var(--bg-deep), 0 0 24px rgba(0,232,255,.12); font: 600 var(--text-xs) var(--font-mono); }
.timeline__item--current .timeline__node { color: var(--bg-deep); border-color: transparent; background: var(--gradient-brand); }
.timeline__card { position: relative; overflow: hidden; border: 1px solid rgba(0,232,255,.14); border-radius: var(--radius-lg); background: rgba(8,10,20,.72); backdrop-filter: blur(14px); transition: border-color .25s ease, background .25s ease, transform .25s ease; }
.timeline__card:hover, .timeline__card[open] { border-color: rgba(46,232,184,.34); background: rgba(10,14,25,.9); }
.timeline__card summary { position: relative; padding: 1.25rem 3.8rem 1.25rem 1.35rem; cursor: pointer; list-style: none; }
.timeline__card summary::-webkit-details-marker { display: none; }
.timeline__summary-top { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin-bottom: .5rem; color: var(--text-muted); font: 500 var(--text-xs) var(--font-mono); }
.timeline__current { padding: .25rem .55rem; border: 1px solid rgba(34,232,132,.35); border-radius: 999px; color: var(--verde); background: rgba(34,232,132,.08); }
.timeline h3 { margin: 0; font-size: clamp(1.12rem, 2.6vw, 1.5rem); line-height: 1.2; }
.timeline__company { margin: .25rem 0 0; color: var(--celeste); font-size: var(--text-sm); line-height: 1.4; }
.timeline__impact { display: -webkit-box; max-width: 52ch; margin: .75rem 0 0; overflow: hidden; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.5; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.timeline__toggle { position: absolute; top: 50%; right: 1.3rem; width: 1.6rem; height: 1.6rem; border: 1px solid var(--border); border-radius: 50%; transform: translateY(-50%); }
.timeline__toggle::before, .timeline__toggle::after { content: ''; position: absolute; inset: 50% auto auto 50%; width: .62rem; height: 1px; background: var(--agua); transform: translate(-50%,-50%); transition: transform .2s ease; }
.timeline__toggle::after { transform: translate(-50%,-50%) rotate(90deg); }
.timeline__card[open] .timeline__toggle::after { transform: translate(-50%,-50%) rotate(0); }
.timeline__content { padding: 0 1.35rem 1.35rem; border-top: 1px solid rgba(0,232,255,.09); }
.timeline__content > p { margin: 1.1rem 0 0; color: var(--text-muted); line-height: 1.65; }
.timeline__content ul { margin: 1rem 0 0; padding-left: 1.2rem; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.65; }
.timeline__content li + li { margin-top: .55rem; }
.timeline__content li::marker { color: var(--agua); }
.timeline__location { display: block; margin-top: 1rem; color: var(--text-muted); font: var(--text-xs) var(--font-mono); }

@media (min-width: 800px) {
  .experience__heading { grid-template-columns: .75fr 1.25fr; align-items: end; }
  .timeline { gap: 0; }
  .timeline::before { left: 50%; }
  .timeline__item { display: grid; grid-template-columns: 1fr 1fr; min-height: 9.5rem; padding: 0; }
  .timeline__item:nth-child(odd) .timeline__card { grid-column: 1; margin: 0 3rem 1.4rem 0; }
  .timeline__item:nth-child(even) .timeline__card { grid-column: 2; margin: 0 0 1.4rem 3rem; }
  .timeline__node { top: 1.1rem; left: 50%; transform: translateX(-50%); }
  .timeline__item:nth-child(even) .timeline__card { grid-row: 1; }
}
</style>
