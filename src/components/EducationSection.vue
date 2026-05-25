<script setup lang="ts">
import { complementary, education } from '@/data/education'
</script>

<template>
  <section id="educacion" class="section">
    <div class="container">
      <h2 class="section-title"><span>Formación</span></h2>

      <h3 class="subsection">Complementaria</h3>
      <ul class="edu-list">
        <li v-for="item in complementary" :key="item.title" class="card edu-item">
          <div class="edu-item__head">
            <strong>{{ item.title }}</strong>
            <span class="edu-item__period">{{ item.period }}</span>
          </div>
          <span class="edu-item__inst">{{ item.institution }}</span>
          <span v-if="item.note" class="chip chip--rosa edu-item__note">{{ item.note }}</span>
        </li>
      </ul>

      <h3 class="subsection">Educación</h3>
      <ul class="edu-list">
        <li v-for="item in education" :key="item.title + item.period" class="card edu-item">
          <div class="edu-item__head">
            <strong>{{ item.title }}</strong>
            <span class="edu-item__period">{{ item.period }}</span>
          </div>
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
  color: var(--violeta);
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
  font-size: var(--text-xs);
  color: var(--rosa);
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
</style>
