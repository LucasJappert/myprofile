<script setup lang="ts">
import { profile } from '@/data/profile'
import { assetUrl } from '@/utils/assetUrl'
</script>

<template>
  <section id="inicio" class="hero section">
    <div class="hero__mesh" aria-hidden="true" />
    <div class="container hero__grid">
      <div class="hero__content">
        <p v-if="profile.currentEmployer" class="hero__employer">
          <span class="hero__employer-company">{{ profile.currentEmployer.company }}</span>
          <span class="hero__employer-sep" aria-hidden="true">·</span>
          <span class="hero__employer-sector">{{ profile.currentEmployer.sector }}</span>
        </p>
        <h1 class="hero__name">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.role }}</p>
        <a
          v-if="profile.credentialHighlight"
          :href="profile.credentialHighlight.href"
          class="hero__credential"
        >
          <span class="hero__credential-dot" aria-hidden="true" />
          <span class="hero__credential-long">{{ profile.credentialHighlight.label }}</span>
          <span class="hero__credential-short">{{ profile.credentialHighlight.shortLabel }}</span>
        </a>
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
        <a href="#perfil" class="hero__scroll-hint">
          <span class="hero__scroll-hint-label">Sobre mí</span>
          <span class="hero__scroll-hint-icon" aria-hidden="true">↓</span>
        </a>
      </div>
      <div class="hero__visual">
        <figure class="hero__figure">
          <div class="hero__frame hero__frame--art">
            <img
              :src="assetUrl(profile.avatar)"
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
  padding-top: calc(var(--nav-h) + 2rem);
  padding-bottom: 2rem;
  overflow: hidden;
  min-height: auto;
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
  .hero {
    min-height: clamp(30rem, 76dvh, 40rem);
    padding-bottom: 1.5rem;
  }

  .hero__grid {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 2rem;
    align-items: center;
  }
}

.hero__employer {
  margin: 0 0 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.hero__employer-company {
  color: var(--celeste);
  font-weight: 600;
}

.hero__employer-sep {
  margin: 0 0.35rem;
  color: var(--text-muted);
}

.hero__employer-sector {
  color: var(--agua);
  text-transform: uppercase;
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
}

.hero__credential {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.65rem 0 0;
  padding: 0.35rem 0.75rem 0.35rem 0.55rem;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--verde);
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid rgba(34, 232, 132, 0.35);
  background: rgba(34, 232, 132, 0.08);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.hero__credential:hover {
  color: var(--celeste);
  border-color: rgba(0, 232, 255, 0.45);
  background: rgba(0, 232, 255, 0.1);
}

.hero__credential-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--gradient-brand);
  box-shadow: 0 0 8px rgba(34, 232, 132, 0.6);
}

.hero__credential-short {
  display: none;
}

@media (max-width: 480px) {
  .hero__credential-long {
    display: none;
  }

  .hero__credential-short {
    display: inline;
  }
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
  margin: 0.5rem 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
}

@media (min-width: 900px) {
  .hero__role {
    font-size: 1.25rem;
  }
}

.hero__tagline {
  margin: 0.65rem 0 0;
  max-width: 38ch;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.55;
}

.hero__location {
  margin: 0.35rem 0 0;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.15rem;
}

.hero__social {
  display: flex;
  gap: 1rem;
  margin-top: 0.85rem;
  font-size: var(--text-sm);
  font-weight: 500;
}

.hero__scroll-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--agua);
  text-decoration: none;
  opacity: 0.85;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.hero__scroll-hint:hover {
  color: var(--celeste);
  opacity: 1;
}

.hero__scroll-hint-icon {
  font-size: 1rem;
  line-height: 1;
  animation: hint-bob 2s ease-in-out infinite;
}

@keyframes hint-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-hint-icon {
    animation: none;
  }
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
  padding: 2px;
  overflow: hidden;
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
  height: 100%;
  min-height: 220px;
  border-radius: calc(var(--radius-lg) - 1px);
  background: radial-gradient(ellipse at 50% 15%, #1a2744 0%, #0a0e18 50%, #05060d 100%);
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 35%;
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
    max-width: 340px;
  }

  .hero__frame img {
    min-height: 240px;
  }
}

@media (max-width: 899px) {
  .hero {
    min-height: auto;
    padding-bottom: 3rem;
  }

  .hero__content {
    order: 1;
  }

  .hero__visual {
    order: 2;
    max-width: 260px;
  }

  .hero__frame img {
    min-height: 220px;
  }
}
</style>
