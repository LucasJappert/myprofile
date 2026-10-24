<script setup lang="ts">
import { profile } from '@/data/profile'
import AppIcon, { type IconName } from '@/components/AppIcon.vue'

const signals: { value: string; label: string; icon: IconName }[] = [
  { value: '15+', label: 'años construyendo software', icon: 'clock' },
  { value: 'Agrotech + IA', label: 'foco actual', icon: 'sprout' },
  { value: 'Idea → operación', label: 'alcance de punta a punta', icon: 'route' },
]
</script>

<template>
  <section id="perfil" class="section about reveal">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="section-head__eyebrow"><b>01</b> Perfil</p>
          <h2>Sobre mí</h2>
        </div>
        <p>Producto, arquitectura y operación bajo una misma mirada.</p>
      </div>

      <div class="about__grid">
        <p class="about__lead">{{ profile.about[0] }}</p>

        <dl class="about__signals" aria-label="Resumen profesional">
          <div v-for="signal in signals" :key="signal.value">
            <span class="icon-box"><AppIcon :name="signal.icon" /></span>
            <dt>{{ signal.value }}</dt>
            <dd>{{ signal.label }}</dd>
          </div>
        </dl>
      </div>

      <div class="about__stories">
        <article>
          <h3><AppIcon name="pulse" :size="16" /> Hoy</h3>
          <p>{{ profile.about[1] }}</p>
        </article>
        <article>
          <h3><AppIcon name="build" :size="16" /> También construyo</h3>
          <p>{{ profile.about[2] }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  gap: 2rem;
}

.about__lead {
  margin: 0;
  max-width: 34ch;
  font-size: clamp(1.3rem, 2.5vw, 1.85rem);
  font-weight: 500;
  line-height: 1.38;
  letter-spacing: -0.015em;
  color: var(--text);
  text-wrap: pretty;
}

.about__signals {
  display: grid;
  margin: 0;
  align-content: start;
}
.about__signals div {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 0.85rem;
  row-gap: 0.2rem;
  align-items: center;
  padding: 0.95rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}
.about__signals div:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.09); }
.about__signals .icon-box { grid-row: span 2; }
.about__signals dt {
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.15;
  color: var(--celeste);
}
.about__signals dd {
  margin: 0;
  font: 500 var(--text-xs)/1.3 var(--font-mono);
  color: var(--text-muted);
}

.about__stories {
  display: grid;
  gap: 1.75rem;
  margin-top: clamp(2.25rem, 5vw, 3.5rem);
}
.about__stories h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.6rem;
  font: 600 var(--text-xs)/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--agua);
}
.about__stories p {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: 1.7;
}

@media (min-width: 840px) {
  .about__grid { grid-template-columns: minmax(0, 1fr) 17rem; gap: 4rem; }
  .about__stories { grid-template-columns: 1fr 1fr; gap: 3rem; }
  .about__stories article + article {
    padding-left: 3rem;
    border-left: 1px solid rgba(255, 255, 255, 0.09);
  }
}

@media (max-width: 560px) {
  .about__signals div { padding: 0.75rem 0; }
  .about__signals dt { font-size: 1.05rem; }
}
</style>
