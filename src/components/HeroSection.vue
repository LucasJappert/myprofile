<script setup lang="ts">
import { profile } from '@/data/profile'
import { assetUrl } from '@/utils/assetUrl'
</script>

<template>
  <section id="inicio" class="hero section">
    <div class="hero__aurora" aria-hidden="true" />
    <div class="hero__comet" aria-hidden="true" />
    <div class="container hero__grid">
      <div class="hero__lead">
        <div v-if="profile.currentEmployer || profile.credentialHighlight" class="hero__topline">
          <p v-if="profile.currentEmployer" class="hero__employer">
            <span>{{ profile.currentEmployer.company }}</span>
            <i aria-hidden="true">·</i>
            {{ profile.currentEmployer.sector }}
          </p>
          <a
            v-if="profile.credentialHighlight"
            :href="profile.credentialHighlight.href"
            class="hero__credential"
          >
            <span aria-hidden="true" />
            <b class="hero__credential-long">{{ profile.credentialHighlight.label }}</b>
            <b class="hero__credential-short">{{ profile.credentialHighlight.shortLabel }}</b>
          </a>
        </div>

        <p class="hero__eyebrow">Producto · Arquitectura · IA aplicada</p>
        <h1 class="hero__name">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.role }}</p>
        <p class="hero__tagline">{{ profile.tagline }}</p>
        <p class="hero__location"><span aria-hidden="true">⌖</span> {{ profile.location }}</p>

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

      <div class="hero__visual" aria-label="Ilustración personal y áreas de trabajo">
        <div class="hero__orbit hero__orbit--outer" aria-hidden="true" />
        <div class="hero__orbit hero__orbit--inner" aria-hidden="true" />
        <figure class="hero__figure" data-tilt>
          <div class="hero__frame">
            <img
              :src="assetUrl(profile.avatar)"
              :alt="profile.avatarAlt"
              width="400"
              height="500"
              fetchpriority="high"
            />
          </div>
          <figcaption>Una vida entre código, ideas y gatos.</figcaption>
        </figure>

        <article class="hero__panel hero__panel--console" aria-label="Productos destacados">
          <header>
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            <b>system-map.ts</b>
          </header>
          <p><i>agrotech</i><strong>→ APIX</strong></p>
          <p><i>assistant</i><strong>→ Pía</strong></p>
          <p><i>personal</i><strong>→ DayLog</strong></p>
        </article>

        <article class="hero__panel hero__panel--signal" aria-label="Perfil profesional">
          <span>15+ años</span>
          <strong>Producto · IA · Datos</strong>
          <i aria-hidden="true"><b /><b /><b /><b /><b /></i>
        </article>
      </div>

      <a href="#perfil" class="hero__scroll-hint">
        <span>Explorar trayectoria</span>
        <i aria-hidden="true">↓</i>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(900px, 100svh);
  padding-top: calc(var(--nav-h) + 3.25rem);
  padding-bottom: 5rem;
  display: grid;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

.hero::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: -5%;
  right: -5%;
  bottom: -4.5rem;
  height: 9rem;
  background: rgba(8, 10, 18, 0.76);
  border-top: 1px solid rgba(0, 232, 255, 0.12);
  transform: rotate(-1.6deg);
}

.hero__aurora {
  position: absolute;
  z-index: -2;
  inset: -30%;
  pointer-events: none;
  background:
    radial-gradient(ellipse 44% 38% at 16% 28%, rgba(0, 232, 255, 0.22), transparent 68%),
    radial-gradient(ellipse 38% 44% at 83% 48%, rgba(34, 232, 132, 0.13), transparent 70%),
    radial-gradient(ellipse 30% 36% at 65% 18%, rgba(138, 108, 255, 0.13), transparent 72%);
  filter: blur(10px);
  animation: hero-aurora 16s ease-in-out infinite alternate;
}

.hero__comet {
  position: absolute;
  z-index: -1;
  top: 17%;
  left: -12rem;
  width: 8rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(to right, transparent, rgba(0, 232, 255, 0.9));
  box-shadow: 4rem 0 24px rgba(0, 232, 255, 0.38);
  transform: rotate(-14deg);
  animation: comet-pass 5.8s cubic-bezier(0.2, 0.75, 0.2, 1) 1s both;
}

.hero__comet::after {
  content: '';
  position: absolute;
  right: -0.2rem;
  top: 50%;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 16px var(--celeste), 0 0 32px var(--agua);
  transform: translateY(-50%);
}

.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.03fr) minmax(300px, 0.97fr);
  align-items: center;
  gap: 3rem;
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
.hero__lead > :nth-child(7) { animation-delay: 0.56s; }
.hero__lead > :nth-child(8) { animation-delay: 0.64s; }

.hero__topline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.15rem;
}

.hero__employer {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--agua);
}
.hero__employer span { color: var(--celeste); font-weight: 700; }
.hero__employer i { margin-inline: 0.35rem; color: var(--text-muted); font-style: normal; }

.hero__credential {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.32rem 0.65rem;
  border: 1px solid rgba(34, 232, 132, 0.32);
  border-radius: 999px;
  color: var(--verde);
  background: rgba(34, 232, 132, 0.08);
  font-size: var(--text-xs);
}
.hero__credential > span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--verde);
  box-shadow: 0 0 9px var(--verde);
  animation: signal-pulse 2s ease-in-out infinite;
}
.hero__credential-short { display: none; }

.hero__eyebrow {
  margin: 0 0 0.35rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8eeaff;
}

.hero__name {
  margin: 0;
  font-size: clamp(3.25rem, 7.8vw, 6.25rem);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.055em;
  background: linear-gradient(125deg, #ffffff 10%, var(--celeste) 42%, var(--agua) 70%, var(--verde));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 28px rgba(0, 232, 255, 0.12));
}

.hero__role {
  margin: 0.8rem 0 0;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: var(--text);
}

.hero__tagline {
  max-width: 48ch;
  margin: 1.25rem 0 0;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.65;
}

.hero__location {
  margin: 0.5rem 0 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}
.hero__location span { color: var(--agua); }

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.45rem;
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
  min-height: 34rem;
  display: grid;
  place-items: center;
}

.hero__figure {
  position: relative;
  z-index: 3;
  width: min(76%, 340px);
  margin: 0;
  transform-style: preserve-3d;
}

.hero__frame {
  position: relative;
  padding: 2px;
  border-radius: 2rem;
  overflow: hidden;
  background: linear-gradient(150deg, var(--celeste), rgba(138, 108, 255, 0.76), var(--verde));
  box-shadow: 0 1.5rem 5rem rgba(0, 0, 0, 0.5), 0 0 55px rgba(0, 232, 255, 0.14);
}

.hero__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 30%), rgba(255, 255, 255, 0.18), transparent 28%);
  pointer-events: none;
}

.hero__frame img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: calc(2rem - 2px);
  object-fit: cover;
  object-position: center 35%;
  background: #080c18;
}

.hero__figure figcaption {
  margin-top: 0.6rem;
  text-align: center;
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-style: italic;
}

.hero__orbit {
  position: absolute;
  z-index: 1;
  border: 1px solid rgba(0, 232, 255, 0.17);
  border-radius: 50%;
  box-shadow: inset 0 0 45px rgba(0, 232, 255, 0.025);
}
.hero__orbit::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -0.3rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--celeste);
  box-shadow: 0 0 16px var(--celeste);
}
.hero__orbit--outer { width: 29rem; height: 29rem; animation: orbit-spin 18s linear infinite; }
.hero__orbit--inner {
  width: 23rem;
  height: 23rem;
  border-color: rgba(34, 232, 132, 0.14);
  animation: orbit-spin 13s linear infinite reverse;
}

.hero__panel {
  position: absolute;
  z-index: 4;
  border: 1px solid rgba(0, 232, 255, 0.2);
  border-radius: 1rem;
  background: rgba(8, 12, 22, 0.76);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.36), inset 0 1px rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
}

.hero__panel--console {
  left: -2rem;
  top: 2rem;
  width: 14rem;
  padding: 0 0.85rem 0.8rem;
  transform: rotate(-5deg);
  animation: panel-float 7.2s ease-in-out infinite;
}
.hero__panel--console header {
  display: flex;
  align-items: center;
  gap: 0.32rem;
  min-height: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.hero__panel--console header span {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: #ff7068;
}
.hero__panel--console header span:nth-child(2) { background: #ffce56; }
.hero__panel--console header span:nth-child(3) { background: #32d583; }
.hero__panel--console header b {
  margin-left: auto;
  font: 500 0.68rem/1 var(--font-mono);
  color: var(--text-muted);
}
.hero__panel--console p {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 0.6rem 0 0;
  font: 500 0.72rem/1.25 var(--font-mono);
}
.hero__panel--console i { color: var(--text-muted); font-style: normal; }
.hero__panel--console strong { color: var(--agua); }

.hero__panel--signal {
  right: -1rem;
  bottom: 3.8rem;
  width: 13.5rem;
  padding: 0.9rem 1rem;
  transform: rotate(4deg);
  animation: panel-float 8s ease-in-out -2s infinite reverse;
}
.hero__panel--signal > span {
  display: block;
  font: 600 0.68rem/1 var(--font-mono);
  color: var(--verde);
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.hero__panel--signal strong { display: block; margin-top: 0.45rem; font-size: 0.82rem; }
.hero__panel--signal i {
  display: flex;
  align-items: end;
  gap: 0.22rem;
  height: 1.15rem;
  margin-top: 0.65rem;
}
.hero__panel--signal i b {
  flex: 1;
  height: 38%;
  border-radius: 2px 2px 0 0;
  background: var(--gradient-brand);
}
.hero__panel--signal i b:nth-child(2) { height: 72%; }
.hero__panel--signal i b:nth-child(3) { height: 55%; }
.hero__panel--signal i b:nth-child(4) { height: 92%; }
.hero__panel--signal i b:nth-child(5) { height: 68%; }

.hero__scroll-hint {
  position: absolute;
  left: 0;
  bottom: -2.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--agua);
  font-size: var(--text-sm);
  font-weight: 600;
}
.hero__scroll-hint i { font-style: normal; animation: hint-bob 1.8s ease-in-out infinite; }

@keyframes hero-rise { from { opacity: 0; transform: translateY(1.1rem); filter: blur(5px); } }
@keyframes hero-aurora { to { transform: translate3d(2.5%, -2%, 0) scale(1.04); } }
@keyframes comet-pass {
  0% { opacity: 0; transform: translate3d(0, 0, 0) rotate(-14deg); }
  12% { opacity: 1; }
  78% { opacity: 1; }
  100% { opacity: 0; transform: translate3d(calc(100vw + 28rem), 16rem, 0) rotate(-14deg); }
}
@keyframes signal-pulse { 50% { opacity: 0.45; transform: scale(0.75); } }
@keyframes orbit-spin { to { transform: rotate(360deg); } }
@keyframes panel-float { 50% { translate: 0 -0.6rem; } }
@keyframes hint-bob { 50% { transform: translateY(0.25rem); } }

@media (max-width: 899px) {
  .hero { min-height: auto; padding-top: calc(var(--nav-h) + 1.75rem); padding-bottom: 4rem; }
  .hero__grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .hero__name { font-size: clamp(3rem, 15vw, 5rem); }
  .hero__tagline { max-width: 58ch; }
  .hero__visual { min-height: 28rem; }
  .hero__figure { width: min(70vw, 320px); }
  .hero__panel--console { left: max(0rem, calc(50% - 18rem)); }
  .hero__panel--signal { right: max(0rem, calc(50% - 18rem)); }
  .hero__scroll-hint { position: static; grid-column: 1; justify-self: start; }
}

@media (max-width: 560px) {
  .hero { padding-top: calc(var(--nav-h) + 1rem); padding-bottom: 3.25rem; }
  .hero__grid { gap: 1.15rem; }
  .hero__lead > * {
    animation-name: hero-rise-mobile;
    animation-duration: .36s;
    animation-delay: .04s !important;
  }
  .hero__topline { gap: .45rem; margin-bottom: 0.55rem; }
  .hero__employer { font-size: .7rem; }
  .hero__credential-long { display: none; }
  .hero__credential-short { display: inline; }
  .hero__eyebrow { margin-bottom: .2rem; font-size: 0.67rem; }
  .hero__name { font-size: clamp(2.65rem, 13vw, 4.25rem); }
  .hero__role { margin-top: .55rem; font-size: 1.05rem; }
  .hero__tagline {
    display: -webkit-box;
    margin-top: .7rem;
    overflow: hidden;
    font-size: .91rem;
    line-height: 1.5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .hero__location { margin-top: .35rem; font-size: .76rem; }
  .hero__actions { gap: .5rem; margin-top: .9rem; }
  .hero__actions .btn { flex: 1 1 8rem; min-height: 2.75rem; padding-inline: .8rem; }
  .hero__social { margin-top: .7rem; font-size: .78rem; }
  .hero__visual { min-height: 23rem; }
  .hero__figure { width: min(72vw, 250px); }
  .hero__orbit--outer { width: 20rem; height: 20rem; }
  .hero__orbit--inner { width: 16rem; height: 16rem; }
  .hero__panel--console { left: -0.5rem; top: 0; width: 10.25rem; }
  .hero__panel--signal { right: -0.4rem; bottom: 2rem; width: 10.5rem; }
  .hero__figure figcaption { display: none; }
  .hero__scroll-hint { display: none; }
}

@keyframes hero-rise-mobile {
  from { opacity: 0; transform: translateY(.55rem); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__lead > *,
  .hero__aurora,
  .hero__comet,
  .hero__credential > span,
  .hero__orbit,
  .hero__panel,
  .hero__scroll-hint i { animation: none; }
}
</style>
