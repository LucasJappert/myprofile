<script setup lang="ts">
import { computed, ref } from 'vue'
import { skillDomains, skillGroups } from '@/data/skills'

const selectedId = ref(skillDomains[0].id)
const selected = computed(() => skillDomains.find((domain) => domain.id === selectedId.value) ?? skillDomains[0])
</script>

<template>
  <section id="stack" class="section reveal">
    <div class="container">
      <div class="skills__heading">
        <div>
          <p class="skills__eyebrow">Cómo conecto las piezas</p>
          <h2 class="section-title"><span>Mapa de capacidades</span></h2>
        </div>
        <p>El stack importa por lo que permite construir. Elegí un dominio para ver sus tecnologías y productos.</p>
      </div>

      <div class="skills-map">
        <div class="skills-map__constellation" aria-label="Dominios técnicos">
          <svg class="skills-map__links" viewBox="0 0 100 100" aria-hidden="true">
            <line
              v-for="domain in skillDomains"
              :key="domain.id"
              x1="50"
              y1="50"
              :x2="domain.x"
              :y2="domain.y"
            />
          </svg>

          <div class="skills-map__core" aria-hidden="true">
            <span>LJ</span>
            <small>conecta</small>
          </div>

          <button
            v-for="domain in skillDomains"
            :key="domain.id"
            type="button"
            class="skills-map__node"
            :class="{ 'is-active': selectedId === domain.id }"
            :style="{ '--x': `${domain.x}%`, '--y': `${domain.y}%` }"
            :aria-pressed="selectedId === domain.id"
            @click="selectedId = domain.id"
          >
            <span>{{ domain.label }}</span>
          </button>
        </div>

        <Transition name="domain-swap" mode="out-in">
          <article :key="selected.id" class="skills-map__detail">
            <span class="skills-map__detail-index">0{{ skillDomains.findIndex((domain) => domain.id === selected.id) + 1 }}</span>
            <h3>{{ selected.title }}</h3>
            <p>{{ selected.description }}</p>
            <div class="skills-map__technologies">
              <span v-for="item in selected.items" :key="item">{{ item }}</span>
            </div>
            <div class="skills-map__projects">
              <small>Aplicado en</small>
              <strong v-for="project in selected.projects" :key="project">{{ project }}</strong>
            </div>
          </article>
        </Transition>
      </div>

      <details class="skills__complete">
        <summary>
          <span>
            <small>Inventario técnico</small>
            Ver stack completo
          </span>
          <i aria-hidden="true">↓</i>
        </summary>
        <div class="skills__complete-grid">
          <article v-for="group in skillGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <div>
              <span v-for="item in group.items" :key="item">{{ item }}</span>
            </div>
          </article>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.skills__heading { display: grid; gap: 1rem; margin-bottom: 2rem; }
.skills__heading .section-title { margin: 0; }
.skills__heading > p { max-width: 39rem; margin: 0; color: var(--text-muted); }
.skills__eyebrow { margin: 0 0 .35rem; color: #a888ff; font: 600 var(--text-xs)/1 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }
.skills-map { display: grid; gap: 1rem; }
.skills-map__constellation { position: relative; min-height: 29rem; overflow: hidden; border: 1px solid rgba(152,110,255,.2); border-radius: var(--radius-lg); background: radial-gradient(circle at center, rgba(152,110,255,.12), transparent 34%), linear-gradient(145deg, rgba(5,17,27,.8), rgba(12,8,24,.82)); }
.skills-map__constellation::before { content: ''; position: absolute; inset: 0; opacity: .18; background-image: radial-gradient(circle, #9ceffc 1px, transparent 1px); background-size: 28px 28px; mask-image: radial-gradient(circle at center, #000, transparent 78%); }
.skills-map__links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.skills-map__links line { stroke: rgba(0,232,255,.3); stroke-width: .22; stroke-dasharray: 1.3 1.6; vector-effect: non-scaling-stroke; }
.skills-map__core { position: absolute; z-index: 2; top: 50%; left: 50%; display: grid; place-items: center; width: 6.4rem; height: 6.4rem; border: 1px solid rgba(0,232,255,.46); border-radius: 50%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(0,232,255,.17), rgba(7,9,18,.94) 70%); box-shadow: 0 0 0 1rem rgba(0,232,255,.025), 0 0 50px rgba(0,232,255,.15); }
.skills-map__core span { font: 700 1.5rem/1 var(--font-mono); }
.skills-map__core small { margin-top: -.9rem; color: var(--text-muted); font: var(--text-xs) var(--font-mono); }
.skills-map__node { position: absolute; z-index: 3; top: var(--y); left: var(--x); display: grid; place-items: center; width: 5.25rem; height: 5.25rem; padding: .25rem; border: 1px solid rgba(0,232,255,.26); border-radius: 50%; transform: translate(-50%,-50%); background: rgba(7,10,20,.9); color: var(--text); cursor: pointer; font: 600 var(--text-xs) var(--font-mono); transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease, color .22s ease; }
.skills-map__node:hover, .skills-map__node.is-active { transform: translate(-50%,-50%) scale(1.08); color: var(--bg-deep); border-color: transparent; background: var(--gradient-brand); box-shadow: 0 0 32px rgba(0,232,255,.25); }
.skills-map__detail { position: relative; min-height: 18rem; padding: clamp(1.4rem, 4vw, 2.5rem); overflow: hidden; border: 1px solid rgba(152,110,255,.22); border-radius: var(--radius-lg); background: linear-gradient(145deg, rgba(16,12,31,.92), rgba(7,13,23,.88)); }
.skills-map__detail::after { content: ''; position: absolute; right: -6rem; bottom: -8rem; width: 18rem; height: 18rem; border-radius: 50%; background: rgba(152,110,255,.12); filter: blur(35px); }
.skills-map__detail-index { color: #a888ff; font: 600 var(--text-xs) var(--font-mono); }
.skills-map__detail h3 { position: relative; z-index: 1; margin: .65rem 0 .75rem; font-size: clamp(1.5rem, 3vw, 2.25rem); }
.skills-map__detail > p { position: relative; z-index: 1; margin: 0; color: var(--text-muted); line-height: 1.6; }
.skills-map__technologies { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: .45rem; margin-top: 1.25rem; }
.skills-map__technologies span { padding: .35rem .65rem; border: 1px solid rgba(152,110,255,.32); border-radius: 999px; background: rgba(152,110,255,.09); color: #c8b8ff; font-size: var(--text-xs); }
.skills-map__projects { position: relative; z-index: 1; display: flex; flex-wrap: wrap; align-items: baseline; gap: .45rem .8rem; margin-top: 1.5rem; }
.skills-map__projects small { flex-basis: 100%; color: var(--text-muted); font: var(--text-xs) var(--font-mono); }
.skills-map__projects strong { color: var(--agua); font-size: var(--text-sm); }
.skills__complete { margin-top: 1rem; overflow: hidden; border: 1px solid rgba(0,232,255,.2); border-radius: var(--radius-lg); background: linear-gradient(110deg, rgba(0,232,255,.055), rgba(152,110,255,.055)); transition: border-color .2s ease, background .2s ease; }
.skills__complete:hover, .skills__complete[open] { border-color: rgba(46,232,184,.42); background: linear-gradient(110deg, rgba(0,232,255,.085), rgba(152,110,255,.08)); }
.skills__complete > summary { display: flex; align-items: center; justify-content: space-between; min-height: 4rem; padding: .8rem 1.1rem; color: var(--celeste); cursor: pointer; list-style: none; font: 700 var(--text-sm) var(--font-sans); }
.skills__complete > summary::-webkit-details-marker { display: none; }
.skills__complete > summary span { display: grid; gap: .18rem; }
.skills__complete > summary small { color: var(--text-muted); font: 500 var(--text-xs) var(--font-mono); letter-spacing: .06em; text-transform: uppercase; }
.skills__complete > summary i { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border: 1px solid rgba(0,232,255,.25); border-radius: 50%; color: var(--agua); font-style: normal; transition: transform .25s ease, background .25s ease; }
.skills__complete[open] > summary i { transform: rotate(180deg); background: rgba(0,232,255,.08); }
.skills__complete-grid { display: grid; gap: .8rem; padding: .2rem 1rem 1rem; }
.skills__complete-grid article { padding: .9rem; border: 1px solid rgba(0,232,255,.1); border-radius: .7rem; background: rgba(255,255,255,.018); }
.skills__complete-grid h3 { margin: 0 0 .6rem; font-size: var(--text-sm); }
.skills__complete-grid article div { display: flex; flex-wrap: wrap; gap: .35rem; }
.skills__complete-grid span { color: var(--text-muted); font-size: var(--text-xs); }
.skills__complete-grid span:not(:last-child)::after { content: ' · '; color: var(--agua); }
.domain-swap-enter-active, .domain-swap-leave-active { transition: opacity .18s ease, transform .18s ease; }
.domain-swap-enter-from, .domain-swap-leave-to { opacity: 0; transform: translateY(.5rem); }

@media (min-width: 840px) {
  .skills__heading { grid-template-columns: 1fr 1fr; align-items: end; }
  .skills-map { grid-template-columns: minmax(0,1.2fr) minmax(19rem,.8fr); }
  .skills-map__detail { min-height: auto; }
  .skills__complete-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}

@media (max-width: 560px) {
  .skills-map__constellation { min-height: auto; display: grid; grid-template-columns: repeat(3,1fr); gap: .5rem; padding: 1rem; }
  .skills-map__links, .skills-map__core { display: none; }
  .skills-map__node { position: static; width: auto; height: auto; min-height: 3rem; border-radius: 999px; transform: none; }
  .skills-map__node:hover, .skills-map__node.is-active { transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .domain-swap-enter-active, .domain-swap-leave-active { transition: none; }
}
</style>
