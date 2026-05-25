<script setup lang="ts">
import type { ExperienceItem } from '@/data/experience'
import { experienceEarlier, experienceIntro, experiencePrimary } from '@/data/experience'

function jobKey(job: ExperienceItem) {
  return `${job.company}-${job.period}`
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
          :class="{ 'timeline__item--featured': job.featured }"
        >
          <div class="timeline__marker" aria-hidden="true">
            <span>{{ index + 1 }}</span>
          </div>
          <article class="timeline__card surface--muted" :class="{ 'timeline__card--featured': job.featured }">
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

      <details v-if="experienceEarlier.length" class="timeline__earlier">
        <summary>Experiencia anterior ({{ experienceEarlier.length }} roles)</summary>
        <ol class="timeline timeline--nested">
          <li
            v-for="(job, index) in experienceEarlier"
            :key="jobKey(job)"
            class="timeline__item"
          >
            <div class="timeline__marker timeline__marker--muted" aria-hidden="true">
              <span>{{ index + 1 }}</span>
            </div>
            <article class="timeline__card surface--muted" :class="{ 'timeline__card--featured': job.featured }">
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
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 1rem;
}

.timeline__marker {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 1.25rem;
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

.timeline__card--featured {
  border-color: rgba(46, 232, 184, 0.38);
  box-shadow: var(--shadow-glow);
}

.timeline__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
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
  line-height: 1.7;
}

.timeline__highlights {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: 1.7;
}

.timeline__highlights li {
  margin-bottom: 0.4rem;
}

.timeline__earlier {
  margin-top: 2rem;
}

.timeline__earlier summary {
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--agua);
  list-style: none;
  user-select: none;
  padding: 0.5rem 0;
}

.timeline__earlier summary::-webkit-details-marker {
  display: none;
}

.timeline__earlier summary::before {
  content: '▸ ';
  display: inline-block;
  transition: transform 0.2s ease;
}

.timeline__earlier[open] summary::before {
  transform: rotate(90deg);
}

.timeline__earlier summary:hover {
  color: var(--verde);
}

.timeline__earlier summary:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .timeline__meta {
    text-align: left;
    width: 100%;
  }
}
</style>
