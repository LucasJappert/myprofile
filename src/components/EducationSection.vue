<script setup lang="ts">
import {
  complementaryGrid,
  featuredComplementary,
  formalEducationGroups,
  type EducationItem,
} from '@/data/education'

function itemClasses(item: EducationItem) {
  return {
    'edu-item--google': item.provider === 'google',
    'edu-item--rank-1': item.rank === 1,
    'edu-item--rank-2': item.rank === 2,
  }
}

function rankLabel(rank?: 1 | 2) {
  if (rank === 1) return '1.er puesto'
  if (rank === 2) return '2.º puesto'
  return null
}
</script>

<template>
  <section id="educacion" class="section section--alt">
    <div class="container">
      <h2 class="section-title"><span>Formación</span></h2>

      <h3 class="subsection">Complementaria</h3>

      <article
        v-if="featuredComplementary"
        id="educacion-google"
        class="edu-featured surface--accent"
        tabindex="-1"
      >
        <div class="edu-featured__badges">
          <span class="edu-featured__provider">Google Argentina</span>
          <span class="edu-featured__award">🏆 {{ rankLabel(featuredComplementary.rank) }}</span>
        </div>
        <h4 class="edu-featured__title">{{ featuredComplementary.title }}</h4>
        <p class="edu-featured__meta">
          <time>{{ featuredComplementary.period }}</time>
          · Intensivo presencial con equipos en vivo
        </p>
        <p class="edu-featured__copy">
          Competencia post-charla PWA: aplicamos lo aprendido con profesionales de Google y
          ganamos el primer puesto.
        </p>
      </article>

      <p v-if="complementaryGrid.some((i) => i.provider === 'google')" class="edu-google-label">
        También en Google
      </p>

      <ul class="edu-list edu-list--highlights">
        <li
          v-for="item in complementaryGrid"
          :key="item.title"
          class="edu-item surface--tile"
          :class="itemClasses(item)"
        >
          <div class="edu-item__head">
            <strong>{{ item.title }}</strong>
            <span class="edu-item__period">{{ item.period }}</span>
          </div>
          <span class="edu-item__inst">{{ item.institution }}</span>
          <span
            v-if="item.note"
            class="chip edu-item__note"
            :class="item.rank === 1 ? 'chip--verde' : item.rank === 2 ? 'chip--agua' : 'chip--verde'"
          >
            <template v-if="item.provider === 'google'">Google · </template>{{ item.note }}
          </span>
        </li>
      </ul>

      <h3 class="subsection">Educación formal</h3>
      <div
        v-for="group in formalEducationGroups"
        :key="group.category"
        class="edu-formal-group"
      >
        <h4 class="edu-formal-group__label">{{ group.label }}</h4>
        <ul class="edu-list edu-list--compact">
          <li
            v-for="item in group.items"
            :key="item.title + item.period"
            class="edu-item edu-item--row"
          >
            <strong>{{ item.title }}</strong>
            <span class="edu-item__period">{{ item.period }}</span>
            <span class="edu-item__inst">{{ item.institution }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.subsection {
  margin: 0 0 1rem;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--agua);
}

.subsection:not(:first-of-type) {
  margin-top: 2.5rem;
}

.edu-featured {
  margin-bottom: 1.25rem;
  scroll-margin-top: calc(var(--nav-h) + 1rem);
}

.edu-featured:focus {
  outline: none;
}

.edu-featured__badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.edu-featured__provider {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--celeste);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 232, 255, 0.35);
  background: rgba(0, 232, 255, 0.08);
}

.edu-featured__award {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--verde);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(34, 232, 132, 0.12);
  border: 1px solid rgba(34, 232, 132, 0.35);
}

.edu-featured__title {
  margin: 0;
  font-size: clamp(1.15rem, 3vw, 1.35rem);
  font-weight: 700;
  line-height: 1.3;
}

.edu-featured__meta {
  margin: 0.5rem 0 0;
  font-size: var(--text-sm);
  color: var(--agua);
}

.edu-featured__meta time {
  font-family: var(--font-mono);
  font-weight: 500;
}

.edu-featured__copy {
  margin: 0.85rem 0 0;
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--text-muted);
}

.edu-google-label {
  margin: 0 0 0.65rem;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.edu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.edu-list--highlights {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .edu-list--highlights {
    grid-template-columns: repeat(2, 1fr);
  }
}

.edu-formal-group {
  margin-bottom: 1.25rem;
}

.edu-formal-group:last-child {
  margin-bottom: 0;
}

.edu-formal-group__label {
  margin: 0 0 0.5rem;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.edu-list--compact {
  gap: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.edu-item--google {
  border-color: rgba(0, 232, 255, 0.22);
  background: linear-gradient(
    145deg,
    rgba(0, 232, 255, 0.05),
    rgba(10, 12, 22, 0.55)
  );
}

.edu-item--rank-2.edu-item--google {
  box-shadow: inset 0 0 0 1px rgba(46, 232, 184, 0.12);
}

.edu-item__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}

.edu-item strong {
  font-size: var(--text-base);
}

.edu-item__period {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--agua);
  font-weight: 500;
}

.edu-item__inst {
  display: block;
  margin-top: 0.35rem;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.edu-item__note {
  margin-top: 0.5rem;
}

.edu-item--row {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'title period'
    'inst inst';
  gap: 0.25rem 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 232, 255, 0.08);
  background: rgba(10, 12, 22, 0.35);
}

.edu-item--row:last-child {
  border-bottom: none;
}

.edu-item--row strong {
  grid-area: title;
}

.edu-item--row .edu-item__period {
  grid-area: period;
  text-align: right;
}

.edu-item--row .edu-item__inst {
  grid-area: inst;
}

@media (max-width: 600px) {
  .edu-item--row {
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'period'
      'inst';
  }

  .edu-item--row .edu-item__period {
    text-align: left;
  }
}
</style>
