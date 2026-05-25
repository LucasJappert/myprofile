<script setup lang="ts">
import { complementary, education } from '@/data/education'
</script>

<template>
  <section id="educacion" class="section section--alt">
    <div class="container">
      <h2 class="section-title"><span>Formación</span></h2>

      <h3 class="subsection">Complementaria</h3>
      <ul class="edu-list edu-list--highlights">
        <li v-for="item in complementary" :key="item.title" class="edu-item surface--tile">
          <div class="edu-item__head">
            <strong>{{ item.title }}</strong>
            <span class="edu-item__period">{{ item.period }}</span>
          </div>
          <span class="edu-item__inst">{{ item.institution }}</span>
          <span v-if="item.note" class="chip chip--verde edu-item__note">{{ item.note }}</span>
        </li>
      </ul>

      <h3 class="subsection">Educación formal</h3>
      <ul class="edu-list edu-list--compact">
        <li
          v-for="item in education"
          :key="item.title + item.period"
          class="edu-item edu-item--row"
        >
          <strong>{{ item.title }}</strong>
          <span class="edu-item__period">{{ item.period }}</span>
          <span class="edu-item__inst">{{ item.institution }}</span>
        </li>
      </ul>
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

.edu-list--compact {
  gap: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
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
