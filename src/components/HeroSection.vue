<script setup lang="ts">
import { profile } from '@/data/profile'
import FieldMap from '@/components/FieldMap.vue'
</script>

<template>
  <section id="inicio" class="hero section">
    <div class="hero__topo" aria-hidden="true" />
    <div class="container hero__grid">
      <div class="hero__lead">
        <p class="hero__topline">
          <span>{{ profile.currentEmployer.company }}</span>
          <i aria-hidden="true">·</i>
          {{ profile.currentEmployer.sector }}
          <i aria-hidden="true">·</i>
          {{ profile.location }}
        </p>

        <h1 class="hero__name">
          {{ profile.name }}
          <span>{{ profile.role }}</span>
        </h1>
        <p class="hero__thesis">
          {{ profile.thesis.lead }} <em>{{ profile.thesis.highlight }}</em>.
        </p>
        <p class="hero__tagline">{{ profile.heroIntro }}</p>

        <div class="hero__actions">
          <a
            :href="profile.cvUrl"
            class="btn btn-primary"
            target="_blank"
            rel="noopener"
            data-magnetic
          >
            Descargar CV <span aria-hidden="true">↗</span>
          </a>
          <a href="#proyectos" class="btn btn-ghost" data-magnetic>
            Ver proyectos <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div class="hero__social" aria-label="Perfiles profesionales">
          <a
            v-for="link in profile.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="hero__visual">
        <FieldMap />
        <nav class="hero__layers" aria-label="Productos destacados">
          <p>Capas activas</p>
          <a v-for="layer in profile.heroLayers" :key="layer.name" href="#proyectos">
            <i aria-hidden="true" :style="{ background: layer.color }" />
            <strong>{{ layer.name }}</strong>
            <span>{{ layer.detail }}</span>
          </a>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(900px, 100svh);
  padding-top: calc(var(--nav-h) + 3rem);
  padding-bottom: 4.5rem;
  display: grid;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

/* Fondo propio del hero que se funde con el resto de la página */
.hero::before {
  content: '';
  position: absolute;
  z-index: -2;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 75% 45%, rgba(34, 232, 132, 0.07), transparent 70%), var(--bg-deep);
  -webkit-mask-image: linear-gradient(to bottom, #000 85%, transparent);
  mask-image: linear-gradient(to bottom, #000 85%, transparent);
}

/* Curvas de nivel de fondo: anillos concéntricos deformados */
.hero__topo {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background:
    repeating-radial-gradient(ellipse 60% 48% at 18% 30%, transparent 0 34px, rgba(0, 232, 255, 0.08) 34px 35px),
    repeating-radial-gradient(ellipse 52% 60% at 88% 82%, transparent 0 40px, rgba(46, 232, 184, 0.07) 40px 41px);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 40% 45%, #000 30%, transparent 80%);
  mask-image: radial-gradient(ellipse 80% 70% at 40% 45%, #000 30%, transparent 80%);
}

.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  align-items: center;
  gap: 3.5rem;
}

.hero__lead > * {
  animation: hero-rise 0.72s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
.hero__lead > :nth-child(1) { animation-delay: 0.08s; }
.hero__lead > :nth-child(2) { animation-delay: 0.16s; }
.hero__lead > :nth-child(3) { animation-delay: 0.24s; }
.hero__lead > :nth-child(4) { animation-delay: 0.32s; }
.hero__lead > :nth-child(5) { animation-delay: 0.4s; }
.hero__lead > :nth-child(6) { animation-delay: 0.48s; }

.hero__topline {
  margin: 0 0 1.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
}
.hero__topline span { color: var(--celeste); font-weight: 700; }
.hero__topline i { margin-inline: 0.4rem; font-style: normal; opacity: 0.6; }

.hero__name {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.15rem 0.75rem;
  font-size: clamp(1.6rem, 2.6vw, 2.1rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
}
.hero__name span {
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0;
  color: var(--agua);
}

.hero__thesis {
  margin: 1rem 0 0;
  max-width: 15ch;
  font-size: clamp(2.6rem, 4.6vw, 4.15rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.05em;
  color: var(--text);
  text-wrap: balance;
}
.hero__thesis em {
  font-style: normal;
  background: linear-gradient(100deg, #e9cf4a 0%, #8fdb5a 45%, var(--verde) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__tagline {
  max-width: 50ch;
  margin: 1.5rem 0 0;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.65;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.hero__social {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  font-size: var(--text-sm);
  font-weight: 600;
}
.hero__social a span { opacity: 0.55; }

.hero__visual {
  position: relative;
  animation: hero-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards;
}

.hero__layers {
  position: absolute;
  z-index: 5;
  left: -2.25rem;
  bottom: 3.25rem;
  display: grid;
  gap: 0.15rem;
  min-width: 14.5rem;
  padding: 0.7rem 0.6rem 0.6rem;
  border: 1px solid rgba(0, 232, 255, 0.22);
  border-radius: 0.9rem;
  background: rgba(6, 9, 16, 0.92);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
}
.hero__layers p {
  margin: 0 0.4rem 0.25rem;
  font: 600 0.65rem/1.4 var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.hero__layers a {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0.4rem;
  border-radius: 0.5rem;
  color: var(--text);
  font-size: 0.82rem;
  line-height: 1.2;
}
.hero__layers a:hover { background: rgba(255, 255, 255, 0.05); color: var(--text); }
.hero__layers i {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 2px;
}
.hero__layers span { color: var(--text-muted); font-size: 0.75rem; }

@keyframes hero-rise { from { opacity: 0; transform: translateY(1.1rem); filter: blur(5px); } }

@media (max-width: 899px) {
  .hero { min-height: auto; padding-top: calc(var(--nav-h) + 1.75rem); padding-bottom: 3.5rem; }
  .hero__grid { grid-template-columns: 1fr; gap: 2rem; }
  .hero__visual { max-width: 36rem; }
  .hero__layers { position: static; margin-top: 0.75rem; min-width: 0; }
}

@media (max-width: 560px) {
  .hero { padding-top: calc(var(--nav-h) + 1.1rem); padding-bottom: 2.5rem; }
  .hero__grid { gap: 1.5rem; }
  .hero__lead > * {
    animation-name: hero-rise-mobile;
    animation-duration: .36s;
    animation-delay: .04s !important;
  }
  .hero__topline { margin-bottom: 0.9rem; font-size: 0.7rem; }
  .hero__name { font-size: 1.35rem; }
  .hero__name span { font-size: 0.85rem; }
  .hero__thesis { margin-top: 0.7rem; font-size: clamp(2.35rem, 11.5vw, 3rem); }
  .hero__tagline { margin-top: 0.9rem; font-size: .93rem; line-height: 1.55; }
  .hero__actions { gap: .5rem; margin-top: 1.1rem; }
  .hero__actions .btn { flex: 1 1 8rem; min-height: 2.75rem; padding-inline: .8rem; }
  .hero__social { margin-top: .7rem; font-size: .78rem; }
  .hero__layers { grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 0.5rem; }
  .hero__layers p { grid-column: 1 / -1; }
  .hero__layers a { grid-template-columns: auto 1fr; gap: 0.4rem; padding: 0.3rem; }
  .hero__layers span { display: none; }
}

@keyframes hero-rise-mobile {
  from { opacity: 0; transform: translateY(.55rem); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__lead > *,
  .hero__visual { animation: none; }
}
</style>
