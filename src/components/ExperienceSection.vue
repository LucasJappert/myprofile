<script setup lang="ts">
import { experience } from '@/data/experience'
</script>

<template>
  <section id="experiencia" class="section">
    <div class="container">
      <h2 class="section-title"><span>Experiencia</span></h2>
      <ol class="timeline">
        <li
          v-for="(job, index) in experience"
          :key="job.company + job.period"
          class="timeline__item"
          :class="{ 'timeline__item--featured': job.featured }"
        >
          <div class="timeline__marker" aria-hidden="true">
            <span>{{ index + 1 }}</span>
          </div>
          <article class="card timeline__card">
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
            <details v-if="job.moreHighlights?.length" class="timeline__details">
              <summary>Ver detalle</summary>
              <ul class="timeline__highlights">
                <li v-for="h in job.moreHighlights" :key="h">{{ h }}</li>
              </ul>
            </details>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50%;
  background: var(--gradient-brand);
  color: var(--bg-deep);
}

.timeline__item--featured .timeline__card {
  border-color: rgba(255, 61, 154, 0.4);
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
  font-size: 1.1rem;
}

.timeline__company {
  margin: 0.2rem 0 0;
  font-weight: 600;
  color: var(--celeste);
}

.timeline__meta {
  text-align: right;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.timeline__meta time {
  display: block;
  font-family: var(--font-mono);
  color: var(--rosa);
}

.timeline__card > p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.timeline__highlights {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.timeline__highlights li {
  margin-bottom: 0.35rem;
}

.timeline__details {
  margin-top: 0.75rem;
}

.timeline__details summary {
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--celeste);
  list-style: none;
  user-select: none;
}

.timeline__details summary::-webkit-details-marker {
  display: none;
}

.timeline__details summary::before {
  content: '▸ ';
  display: inline-block;
  transition: transform 0.2s ease;
}

.timeline__details[open] summary::before {
  transform: rotate(90deg);
}

.timeline__details summary:hover {
  color: var(--rosa);
}

.timeline__details summary:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 3px;
  border-radius: 4px;
}

.timeline__details .timeline__highlights {
  margin-top: 0.65rem;
}

@media (max-width: 600px) {
  .timeline__meta {
    text-align: left;
    width: 100%;
  }
}
</style>
