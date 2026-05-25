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
        <div class="hero__frame">
          <img :src="`${base}profile.png`" alt="Foto de perfil de Lucas Jappert" width="320" height="320" />
        </div>
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
  min-height: min(100dvh, 900px);
  display: flex;
  align-items: center;
}

.hero__mesh {
  position: absolute;
  inset: -20% -10%;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(0, 232, 255, 0.2), transparent 55%),
    radial-gradient(ellipse 50% 45% at 80% 60%, rgba(255, 61, 154, 0.15), transparent 50%),
    radial-gradient(ellipse 40% 40% at 50% 80%, rgba(157, 78, 221, 0.18), transparent 45%);
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
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3rem;
  }
}

.hero__eyebrow {
  margin: 0 0 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
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
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
}

.hero__tagline {
  margin: 1rem 0 0;
  max-width: 36ch;
  color: var(--text-muted);
  font-size: 1.05rem;
}

.hero__location {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  font-weight: 500;
}

.hero__frame {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 3px;
  background: var(--gradient-brand);
  box-shadow: var(--shadow-glow);
}

.hero__frame img {
  display: block;
  width: 100%;
  border-radius: calc(var(--radius-lg) - 3px);
  background: var(--bg-surface);
  aspect-ratio: 1;
  object-fit: cover;
}

.hero__visual {
  max-width: 320px;
  margin-inline: auto;
}

@media (min-width: 900px) {
  .hero__visual {
    margin-inline: auto 0;
  }
}
</style>
