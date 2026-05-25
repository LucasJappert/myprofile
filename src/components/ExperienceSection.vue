<script setup lang="ts">
import type { ExperienceItem } from '@/data/experience'
import { experienceEarlier, experienceIntro, experiencePrimary } from '@/data/experience'

function jobKey(job: ExperienceItem) {
  return `${job.company}-${job.period}`
}

function periodBeforePresent(period: string) {
  const marker = 'Presente'
  if (!period.endsWith(marker)) return period
  return period.slice(0, -marker.length).trimEnd()
}
</script>

<template>
  <section id="experiencia" class="section reveal">
    <div class="container">
      <h2 class="section-title"><span>Experiencia</span></h2>
      <p class="experience__intro">{{ experienceIntro }}</p>
      <ol class="timeline">
        <li
          v-for="(job, index) in experiencePrimary"
          :key="jobKey(job)"
          class="timeline__item"
          :class="{ 'timeline__item--current': job.current }"
        >
          <article class="timeline__card surface--muted" :class="{ 'timeline__card--current': job.current }">
            <div class="timeline__marker" aria-hidden="true">
              <span>{{ index + 1 }}</span>
            </div>
            <header class="timeline__header">
              <div>
                <div class="timeline__title-row">
                  <h3>{{ job.role }}</h3>
                  <span v-if="job.current" class="chip chip--verde timeline__current-badge">Rol actual</span>
                </div>
                <p class="timeline__company">{{ job.company }}</p>
              </div>
              <div class="timeline__meta">
                <time v-if="job.current && job.period.endsWith('Presente')">
                  {{ periodBeforePresent(job.period) }}
                  <span class="timeline__present">Presente</span>
                </time>
                <time v-else>{{ job.period }}</time>
                <span v-if="job.location">{{ job.location }}</span>
              </div>
            </header>
            <p>{{ job.summary }}</p>
            <ul v-if="job.highlights?.length" class="timeline__highlights">
              <li v-for="h in job.highlights" :key="h">{{ h }}</li>
            </ul>
          </article>
        </li>
      </ol>

      <details v-if="experienceEarlier.length" class="timeline__earlier">
        <summary class="timeline__earlier-summary">
          <span class="timeline__earlier-icon" aria-hidden="true" />
          <span class="timeline__earlier-label">
            Experiencia anterior ({{ experienceEarlier.length }} roles)
          </span>
        </summary>
        <ol class="timeline timeline--nested">
          <li
            v-for="(job, index) in experienceEarlier"
            :key="jobKey(job)"
            class="timeline__item"
          >
            <article class="timeline__card surface--muted">
              <div class="timeline__marker timeline__marker--muted" aria-hidden="true">
                <span>{{ index + 1 }}</span>
              </div>
              <header class="timeline__header">
                <div>
                  <h3>{{ job.role }}</h3>
                  <p class="timeline__company">{{ job.company }}</p>
                </div>
                <div class="timeline__meta">
                  <time>{{ job.period }}</time>
                  <span v-if="job.location">{{ job.location }}</span>
                </div>
              </header>
              <p>{{ job.summary }}</p>
              <ul v-if="job.highlights?.length" class="timeline__highlights">
                <li v-for="h in job.highlights" :key="h">{{ h }}</li>
              </ul>
            </article>
          </li>
        </ol>
      </details>
    </div>
  </section>
</template>

<style scoped>
.experience__intro {
  margin: -1rem 0 1.75rem;
  max-width: 58ch;
  font-size: var(--text-base);
  line-height: 1.65;
  color: var(--text-muted);
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline--nested {
  margin-top: 1rem;
}

.timeline__item {
  display: block;
}

.timeline__card {
  position: relative;
}

.timeline__marker {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.timeline__marker span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: 50%;
  background: var(--gradient-brand);
  color: var(--bg-deep);
}

.timeline__marker--muted span {
  background: rgba(46, 232, 184, 0.2);
  color: var(--agua);
  border: 1px solid rgba(46, 232, 184, 0.35);
}

.timeline__card--current {
  border-color: rgba(46, 232, 184, 0.38);
  box-shadow: var(--shadow-glow);
}

.timeline__card--current::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75rem;
  bottom: 0.75rem;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--gradient-brand);
}

.timeline__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.65rem;
}

.timeline__title-row h3 {
  margin: 0;
}

.timeline__current-badge {
  flex-shrink: 0;
}

.timeline__present {
  font-weight: 600;
  color: var(--verde);
}

.timeline__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
  padding-right: 2.75rem;
}

.timeline__header h3 {
  margin: 0;
  font-size: 1.2rem;
}
.timeline__company {
  margin: 0.2rem 0 0;
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--celeste);
}

.timeline__meta {
  text-align: right;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.timeline__meta time {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--agua);
}

.timeline__card > p {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.75;
}

.timeline__highlights {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.75;
}

.timeline__highlights li {
  margin-bottom: 0.4rem;
}

.timeline__earlier {
  margin-top: 1.25rem;
}

.timeline__earlier-summary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  list-style: none;
  user-select: none;
  padding: 0.85rem 1rem;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--agua);
  border-radius: var(--radius-md);
  border: 1px solid rgba(46, 232, 184, 0.28);
  background: rgba(46, 232, 184, 0.06);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.timeline__earlier-summary::-webkit-details-marker {
  display: none;
}

.timeline__earlier-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: rgba(46, 232, 184, 0.14);
  color: var(--verde);
  transition: transform 0.2s ease, background 0.2s ease;
}

.timeline__earlier-icon::before {
  content: '';
  width: 0.45rem;
  height: 0.45rem;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg) translate(-1px, 1px);
  transition: transform 0.2s ease;
}

.timeline__earlier[open] .timeline__earlier-icon {
  background: rgba(0, 232, 255, 0.12);
  color: var(--celeste);
}

.timeline__earlier[open] .timeline__earlier-icon::before {
  transform: rotate(45deg) translate(0, -1px);
}

.timeline__earlier-label {
  line-height: 1.35;
}

.timeline__earlier-summary:hover {
  color: var(--verde);
  border-color: rgba(34, 232, 132, 0.4);
  background: rgba(34, 232, 132, 0.1);
}

.timeline__earlier-summary:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 2px;
}

.timeline__earlier[open] .timeline__earlier-summary {
  margin-bottom: 0.25rem;
  border-color: rgba(0, 232, 255, 0.35);
  background: rgba(0, 232, 255, 0.06);
}

@media (max-width: 600px) {
  .timeline__meta {
    text-align: left;
    width: 100%;
    padding-right: 0;
  }

  .timeline__header {
    padding-right: 2.5rem;
  }
}
</style>
