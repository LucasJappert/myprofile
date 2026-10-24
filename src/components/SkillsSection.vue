<script setup lang="ts">
import { skillDomains, skillGroups, type SkillDomain } from '@/data/skills'
import AppIcon, { type IconName } from '@/components/AppIcon.vue'

const domainIcons: Record<SkillDomain['id'], IconName> = {
  product: 'code',
  ai: 'spark',
  data: 'database',
  infra: 'server',
  geo: 'globe',
}
</script>

<template>
  <section id="stack" class="section reveal">
    <div class="container">
      <div class="section-head">
        <div>
          <p class="section-head__eyebrow"><b>04</b> Cómo conecto las piezas</p>
          <h2>Capacidades</h2>
        </div>
        <p>El stack importa por lo que permite construir: cada dominio, con sus herramientas y dónde lo apliqué.</p>
      </div>

      <ol class="domains">
        <li v-for="domain in skillDomains" :key="domain.id" class="domain">
          <div class="domain__title">
            <span class="icon-box"><AppIcon :name="domainIcons[domain.id]" /></span>
            <h3>{{ domain.title }}</h3>
            <p>{{ domain.description }}</p>
          </div>
          <div class="domain__tools stack">
            <span v-for="item in domain.items" :key="item" class="tag">{{ item }}</span>
          </div>
          <p class="domain__projects">
            <span class="meta">Aplicado en</span>
            <strong>{{ domain.projects.join(' · ') }}</strong>
          </p>
        </li>
      </ol>

      <details class="inventory surface">
        <summary>
          <span>Ver inventario técnico completo</span>
          <i aria-hidden="true" />
        </summary>
        <div class="inventory__grid">
          <article v-for="group in skillGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.items.join(' · ') }}</p>
          </article>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.domains {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}

.domain {
  display: grid;
  gap: 1rem;
  padding: 1.5rem 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  transition: background 0.25s ease;
}
.domain:hover { background: linear-gradient(90deg, rgba(0, 232, 255, 0.035), transparent 70%); }

.domain__title { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 0.15rem 0.9rem; }
.domain__title .icon-box { grid-row: span 2; }
.domain h3 { margin: 0; padding-top: 0.25rem; font-size: 1.2rem; line-height: 1.3; }
.domain__title p { grid-column: 2; margin: 0.2rem 0 0; color: var(--text-muted); font-size: 0.92rem; line-height: 1.55; }

.stack { display: flex; flex-wrap: wrap; align-content: flex-start; gap: 0.4rem; }

.domain__projects { display: grid; gap: 0.3rem; margin: 0; align-content: start; }
.domain__projects strong { color: var(--text); font-size: 0.95rem; font-weight: 600; line-height: 1.4; }

.inventory {
  margin-top: 1.5rem;
  border: 1px solid rgba(0, 232, 255, 0.16);
  border-radius: var(--radius);
}
.inventory summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.5rem;
  padding: 0.6rem 1.1rem;
  color: var(--celeste);
  font-weight: 600;
  font-size: var(--text-sm);
  cursor: pointer;
  list-style: none;
}
.inventory summary::-webkit-details-marker { display: none; }
.inventory summary i {
  width: 0.55rem;
  height: 0.55rem;
  border-right: 1.5px solid var(--agua);
  border-bottom: 1.5px solid var(--agua);
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.2s ease;
}
.inventory[open] summary i { transform: rotate(225deg) translateY(-2px); }
.inventory__grid {
  display: grid;
  gap: 1.1rem 2rem;
  padding: 0.5rem 1.1rem 1.25rem;
}
.inventory h3 { margin: 0 0 0.3rem; font-size: var(--text-xs); font-family: var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--agua); }
.inventory p { margin: 0; color: var(--text-muted); font-size: 0.92rem; line-height: 1.55; }

@media (min-width: 900px) {
  .domain {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) 12rem;
    gap: 2rem;
    align-items: start;
  }
  .inventory__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
