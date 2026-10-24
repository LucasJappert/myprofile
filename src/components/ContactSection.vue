<script setup lang="ts">
import { profile } from '@/data/profile'
import { useCopyText } from '@/composables/useCopyText'

const { copied, failed, copy } = useCopyText()
</script>

<template>
  <section id="contacto" class="section contact reveal">
    <div class="container">
      <div class="contact__card">
        <div class="contact__topo" aria-hidden="true" />
        <p class="section-head__eyebrow"><b>06</b> Contacto</p>
        <h2>Construyamos algo que valga la pena <em>operar</em>.</h2>
        <p class="contact__lead">
          Producto, arquitectura e IA aplicada. Si hay un problema interesante detrás, escribime.
        </p>
        <div class="contact__actions">
          <a :href="`mailto:${profile.email}`" class="btn btn-primary" data-magnetic>
            Enviar email <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            class="btn btn-ghost"
            data-magnetic
            aria-live="polite"
            @click="copy(profile.email)"
          >
            {{ copied ? 'Email copiado ✓' : failed ? 'No se pudo copiar' : 'Copiar email' }}
          </button>
        </div>
        <dl class="contact__details">
          <div>
            <dt>Email</dt>
            <dd><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>{{ profile.location }}</dd>
          </div>
          <div>
            <dt>Perfiles</dt>
            <dd class="contact__links">
              <a
                v-for="link in profile.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ link.label }} ↗</a>
              <a :href="profile.cvUrl" target="_blank" rel="noopener">CV ↗</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(1.75rem, 6vw, 4.5rem);
  border: 1px solid rgba(0, 232, 255, 0.22);
  border-radius: clamp(1.25rem, 3vw, 2rem);
  background:
    radial-gradient(ellipse 60% 70% at 100% 100%, rgba(34, 232, 132, 0.1), transparent 70%),
    rgba(7, 10, 17, 0.95);
}

/* Curvas de nivel en la esquina, eco del mapa del inicio */
.contact__topo {
  position: absolute;
  z-index: -1;
  inset: 0;
  opacity: 0.7;
  background:
    repeating-radial-gradient(ellipse 55% 65% at 92% 95%, transparent 0 26px, rgba(46, 232, 184, 0.1) 26px 27px),
    repeating-radial-gradient(ellipse 40% 45% at 70% 20%, transparent 0 30px, rgba(0, 232, 255, 0.06) 30px 31px);
  -webkit-mask-image: linear-gradient(110deg, transparent 35%, #000 85%);
  mask-image: linear-gradient(110deg, transparent 35%, #000 85%);
}

.contact h2 {
  max-width: 15ch;
  margin: 0;
  font-size: clamp(2.3rem, 6.4vw, 4.9rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  text-wrap: balance;
}
.contact h2 em {
  font-style: normal;
  background: linear-gradient(100deg, var(--ramp-3) 0%, var(--ramp-4) 45%, var(--ramp-5) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contact__lead {
  max-width: 40ch;
  margin: 1.4rem 0 0;
  color: var(--text-muted);
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
}

.contact__actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 2rem; }

.contact__details {
  display: grid;
  gap: 1rem 2.5rem;
  margin: 2.75rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}
.contact__details dt {
  margin-bottom: 0.25rem;
  font: 600 0.7rem/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.contact__details dd { margin: 0; font-size: var(--text-sm); color: var(--text); overflow-wrap: anywhere; }
.contact__links { display: flex; flex-wrap: wrap; gap: 1rem; }

@media (min-width: 760px) {
  .contact__details { grid-template-columns: auto auto 1fr; }
}

@media (max-width: 520px) {
  .contact__actions .btn { flex: 1 1 100%; }
}
</style>
