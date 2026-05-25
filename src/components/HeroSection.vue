<script setup lang="ts">
import { profile } from '@/data/profile'

const base = import.meta.env.BASE_URL
</script>

<template>
  <section id="inicio" class="hero section">
    <div class="hero__mesh" aria-hidden="true" />
    <div class="container hero__grid">
      <div class="hero__content">
        <p class="hero__eyebrow">Hola, soy</p>
        <h1 class="hero__name">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.role }}</p>
        <p class="hero__tagline">{{ profile.tagline }}</p>
        <p class="hero__location">{{ profile.location }}</p>
        <div class="hero__actions">
          <a :href="profile.cvUrl" class="btn btn-primary" target="_blank" rel="noopener">
            Descargar CV
          </a>
          <a href="#proyectos" class="btn btn-ghost">Ver proyectos</a>
        </div>
        <div class="hero__social">
          <a
            v-for="link in profile.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
      <div class="hero__visual">
        <figure class="hero__figure">
          <div class="hero__frame hero__frame--art">
            <img
              :src="`${base}${profile.avatar}`"
              :alt="profile.avatarAlt"
              width="400"
              height="500"
              fetchpriority="high"
            />
          </div>
          <figcaption class="hero__caption">Ilustración personal</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--nav-h) + 3rem);
  padding-bottom: 4rem;
  overflow: hidden;
  min-height: min(100dvh, 920px);
  display: flex;
  align-items: center;
}

.hero__mesh {
  position: absolute;
  inset: -20% -10%;
  background:
    radial-gradient(ellipse 55% 45% at 18% 28%, rgba(0, 232, 255, 0.22), transparent 55%),
    radial-gradient(ellipse 45% 40% at 82% 55%, rgba(34, 232, 132, 0.14), transparent 50%),
    radial-gradient(ellipse 35% 35% at 72% 22%, rgba(46, 232, 184, 0.12), transparent 45%),
    radial-gradient(ellipse 30% 25% at 50% 12%, rgba(255, 255, 255, 0.04), transparent 40%);
  pointer-events: none;
  animation: mesh-drift 18s ease-in-out infinite alternate;
}

@keyframes mesh-drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(2%, -2%) scale(1.03);
  }
}

.hero__grid {
  position: relative;
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 900px) {
  .hero__grid {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 3rem;
  }
}

.hero__eyebrow {
  margin: 0 0 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--celeste);
}

.hero__name {
  margin: 0;
  font-size: clamp(2.25rem, 7vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__role {
  margin: 0.75rem 0 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}

.hero__tagline {
  margin: 1rem 0 0;
  max-width: 38ch;
  color: var(--text-muted);
  font-size: var(--text-base);
}

.hero__location {
  margin: 0.5rem 0 0;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.hero__social {
  display: flex;
  gap: 1.25rem;
  margin-top: 1.5rem;
  font-size: var(--text-sm);
  font-weight: 500;
}

.hero__figure {
  margin: 0;
}

.hero__frame {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 3px;
  background: var(--gradient-brand);
  box-shadow: var(--shadow-glow);
}

.hero__frame--art {
  padding: 4px;
  background: linear-gradient(
    160deg,
    rgba(0, 232, 255, 0.85),
    rgba(46, 232, 184, 0.7) 45%,
    rgba(34, 232, 132, 0.85)
  );
}

.hero__frame img {
  display: block;
  width: 100%;
  border-radius: calc(var(--radius-lg) - 4px);
  background: radial-gradient(ellipse at 50% 20%, #1a2744 0%, #0a0e18 55%, #05060d 100%);
  aspect-ratio: 4 / 5;
  object-fit: contain;
  object-position: center center;
}

.hero__caption {
  margin-top: 0.65rem;
  text-align: center;
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-style: italic;
}

.hero__visual {
  max-width: min(100%, 380px);
  margin-inline: auto;
}

@media (min-width: 900px) {
  .hero__visual {
    margin-inline: auto 0;
    max-width: 400px;
  }
}

@media (max-width: 899px) {
  .hero__content {
    order: 1;
  }

  .hero__visual {
    order: 2;
    max-width: 320px;
  }
}
</style>
