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
  font-size: var(--text-xs);
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
  color: var(--rosa);
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

@media (max-width: 600px) {
  .timeline__meta {
    text-align: left;
    width: 100%;
  }
}
</style>
