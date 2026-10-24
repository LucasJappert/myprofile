<script setup lang="ts">
import { complementaryGrid, featuredComplementary, formalEducation } from '@/data/education'
import AppIcon from '@/components/AppIcon.vue'

const studies = [...formalEducation, ...complementaryGrid].sort((a, b) => b.period.localeCompare(a.period))
</script>

<template>
  <section id="educacion" class="section reveal">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="section-head__eyebrow"><b>05</b> Aprendizaje continuo</p>
          <h2>Formación</h2>
        </div>
        <p>Base técnica, práctica en producto y aprendizaje que se convierte en software.</p>
      </div>

      <div class="education">
        <article
          v-if="featuredComplementary"
          id="educacion-google"
          class="award surface surface--green"
          tabindex="-1"
        >
          <span class="award__mark" aria-hidden="true"><AppIcon name="award" :size="88" /></span>
          <p class="award__top">
            <span class="tag tag--live">1.er puesto</span>
            <span class="meta">{{ featuredComplementary.institution }} · {{ featuredComplementary.period }}</span>
          </p>
          <h3>{{ featuredComplementary.title }}</h3>
          <p>
            Competencia posterior a la charla de PWA: aplicamos lo aprendido junto a profesionales de
            Google y ganamos el primer puesto.
          </p>
        </article>

        <ul class="studies">
          <li v-for="item in studies" :key="item.title">
            <span class="icon-box"><AppIcon name="study" /></span>
            <div>
              <span class="meta">{{ item.period }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.institution }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.education { display: grid; gap: 1.5rem; }

.award {
  position: relative;
  overflow: hidden;
  padding: clamp(1.4rem, 3.5vw, 2.1rem);
  border: 1px solid rgba(34, 232, 132, 0.24);
  border-radius: var(--radius-lg);
  scroll-margin-top: calc(var(--nav-h) + 1rem);
}
.award:focus { outline: none; }
.award__mark {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  color: rgba(34, 232, 132, 0.16);
  pointer-events: none;
}
.award__top { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin: 0; }
.award h3 { margin: 1rem 0 0.6rem; font-size: clamp(1.4rem, 2.8vw, 1.9rem); line-height: 1.12; letter-spacing: -0.025em; }
.award > p:last-child { margin: 0; max-width: 46ch; color: var(--text-muted); font-size: var(--text-sm); line-height: 1.6; }

.studies { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255, 255, 255, 0.09); }
.studies li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 1rem;
  padding: 1.1rem 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
.studies .meta { color: var(--agua); }
.studies h3 { margin: 0.2rem 0 0; font-size: 1.05rem; line-height: 1.35; }
.studies p { margin: 0.2rem 0 0; color: var(--text-muted); font-size: var(--text-xs); }

@media (min-width: 840px) {
  .education { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 3rem; align-items: start; }
}
</style>
