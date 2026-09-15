<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="perfil" class="section section--alt section--after-hero reveal">
    <div class="container">
      <div class="about__heading">
        <div>
          <p class="about__eyebrow">Perfil</p>
          <h2 class="section-title"><span>Sobre mí</span></h2>
        </div>
        <p class="about__manifesto">Producto, arquitectura y operación bajo una misma mirada.</p>
      </div>

      <div class="about">
        <article class="about__lead surface--accent">
          <span class="about__index">01 / ENFOQUE</span>
          <p>{{ profile.about[0] }}</p>
        </article>

        <div class="about__signals" aria-label="Resumen profesional">
          <article>
            <strong>15+</strong>
            <span>años construyendo software</span>
          </article>
          <article>
            <strong>Agrotech + IA</strong>
            <span>foco actual</span>
          </article>
          <article>
            <strong>Idea → operación</strong>
            <span>alcance de punta a punta</span>
          </article>
        </div>

        <article class="about__story about__story--current">
          <span>02 / HOY</span>
          <p>{{ profile.about[1] }}</p>
        </article>
        <article class="about__story about__story--personal">
          <span>03 / TAMBIÉN CONSTRUYO</span>
          <p>{{ profile.about[2] }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section--after-hero {
  padding-top: 2rem;
  scroll-margin-top: calc(var(--nav-h) + 0.75rem);
}

@media (min-width: 900px) {
  .section--after-hero {
    padding-top: 1.75rem;
  }

  .section--after-hero .section-title { margin-bottom: 0; }
}

.about__heading {
  display: grid;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1.5rem;
}
.about__heading .section-title { margin: 0; }
.about__eyebrow { margin: 0 0 .35rem; color: var(--agua); font: 600 var(--text-xs)/1 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }
.about__manifesto { max-width: 30rem; margin: 0; color: var(--text-muted); font-size: clamp(1rem, 2vw, 1.25rem); line-height: 1.5; }

.about { display: grid; gap: 1rem; }
.about p { margin: 0; color: var(--text-muted); line-height: 1.72; }

.about__lead { position: relative; overflow: hidden; padding: clamp(1.4rem, 4vw, 2.5rem); }
.about__lead::after { content: ''; position: absolute; right: -5rem; bottom: -7rem; width: 18rem; height: 18rem; border-radius: 50%; background: rgba(0,232,255,.09); filter: blur(24px); }
.about__lead p { position: relative; z-index: 1; max-width: 61ch; color: var(--text); font-size: clamp(1.05rem, 2.1vw, 1.3rem); line-height: 1.62; }
.about__index, .about__story > span { display: block; margin-bottom: .8rem; color: var(--agua); font: 600 var(--text-xs)/1 var(--font-mono); letter-spacing: .08em; }

.about__signals { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: .7rem; }
.about__signals article { min-width: 0; padding: 1.1rem; border: 1px solid rgba(0,232,255,.14); border-radius: var(--radius); background: rgba(7,10,18,.68); }
.about__signals strong { display: block; overflow-wrap: anywhere; color: var(--celeste); font-size: clamp(1rem, 2.2vw, 1.35rem); line-height: 1.15; }
.about__signals span { display: block; margin-top: .4rem; color: var(--text-muted); font-size: var(--text-xs); line-height: 1.4; }

.about__story { padding: 1.3rem 1.4rem; border: 1px solid var(--border); border-radius: var(--radius-lg); background: rgba(9,11,21,.58); }
.about__story--personal { border-color: rgba(152,110,255,.2); background: linear-gradient(145deg, rgba(19,12,35,.55), rgba(9,11,21,.58)); }
.about__story--personal > span { color: #b5a0ff; }

@media (min-width: 820px) {
  .about__heading { grid-template-columns: .9fr 1.1fr; }
  .about { grid-template-columns: minmax(0,1.25fr) minmax(18rem,.75fr); }
  .about__lead { grid-row: span 2; }
  .about__signals { grid-template-columns: 1fr; }
  .about__story { min-height: 100%; }
}

@media (min-width: 1040px) {
  .about { grid-template-columns: minmax(0,1.1fr) minmax(18rem,.7fr) minmax(18rem,.7fr); }
  .about__lead { grid-row: span 2; }
  .about__signals { grid-column: 2 / -1; grid-template-columns: repeat(3,minmax(0,1fr)); }
}

@media (max-width: 560px) {
  .about__signals { grid-template-columns: 1fr; }
  .about__signals article { display: grid; grid-template-columns: minmax(7.5rem,auto) 1fr; align-items: center; gap: .8rem; padding: .9rem 1rem; }
  .about__signals span { margin-top: 0; }
}
</style>
