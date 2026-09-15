<script setup lang="ts">
import { profile } from '@/data/profile'
import { useCopyText } from '@/composables/useCopyText'

const { copied, failed, copy } = useCopyText()
</script>

<template>
  <section id="contacto" class="section contact reveal">
    <div class="container">
      <div class="contact__card" data-tilt>
        <span class="contact__halo" aria-hidden="true" />
        <div class="contact__signal" aria-hidden="true">
          <i v-for="index in 12" :key="index" />
        </div>
        <p class="contact__eyebrow"><span /> Disponible para conversar</p>
        <h2>Construyamos algo que valga la pena <em>operar.</em></h2>
        <p class="contact__lead">
          Producto, arquitectura e IA aplicada. Si hay un problema interesante detrás, escribime.
        </p>
        <div class="contact__actions">
          <a :href="`mailto:${profile.email}`" class="btn btn-primary" data-magnetic>Enviar email ↗</a>
          <button
            type="button"
            class="btn btn-ghost contact__copy"
            data-magnetic
            aria-live="polite"
            @click="copy(profile.email)"
          >
            {{ copied ? 'Email copiado ✓' : failed ? 'No se pudo copiar' : 'Copiar email' }}
          </button>
        </div>
        <a :href="`mailto:${profile.email}`" class="contact__email">{{ profile.email }}</a>
        <div class="contact__footer">
          <span>{{ profile.location }}</span>
          <nav aria-label="Enlaces de contacto">
            <a :href="profile.cvUrl" target="_blank" rel="noopener">CV</a>
            <a
              v-for="link in profile.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { padding-block: 3.5rem 2.5rem; }
.contact__card { position: relative; overflow: hidden; min-height: 28rem; padding: clamp(2rem, 6vw, 4.5rem); border: 1px solid rgba(0,232,255,.27); border-radius: clamp(1.4rem,4vw,2.7rem); background: linear-gradient(135deg, rgba(6,25,34,.94), rgba(7,9,18,.96) 53%, rgba(23,11,39,.94)); box-shadow: 0 35px 100px rgba(0,0,0,.42), inset 0 1px rgba(255,255,255,.06); }
.contact__card::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .16; background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px); background-size: 3rem 3rem; mask-image: linear-gradient(to bottom, #000, transparent 76%); }
.contact__halo { position: absolute; top: -12rem; right: -9rem; width: 32rem; height: 32rem; border: 1px solid rgba(152,110,255,.18); border-radius: 50%; box-shadow: 0 0 90px rgba(152,110,255,.1), inset 0 0 90px rgba(0,232,255,.05); }
.contact__halo::before, .contact__halo::after { content: ''; position: absolute; inset: 3.5rem; border: 1px dashed rgba(0,232,255,.22); border-radius: 50%; }
.contact__halo::after { inset: 8rem; border-style: solid; border-color: rgba(46,232,184,.18); }
.contact__eyebrow { position: relative; z-index: 1; display: flex; align-items: center; gap: .55rem; margin: 0 0 1rem; color: var(--agua); font: 600 var(--text-xs) var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
.contact__eyebrow span { width: .55rem; height: .55rem; border-radius: 50%; background: var(--verde); box-shadow: 0 0 15px var(--verde); }
.contact h2 { position: relative; z-index: 1; max-width: 54rem; margin: 0; font-size: clamp(2.45rem, 7vw, 5.4rem); line-height: .96; letter-spacing: -.055em; }
.contact h2 em { color: transparent; font-style: normal; background: linear-gradient(90deg, var(--celeste), var(--agua), #a888ff); background-clip: text; -webkit-background-clip: text; }
.contact__lead { position: relative; z-index: 1; max-width: 39rem; margin: 1.5rem 0 0; color: var(--text-muted); font-size: clamp(1rem,2vw,1.25rem); }
.contact__actions { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 2rem; }
.contact__email { position: relative; z-index: 1; display: inline-block; margin-top: 1.25rem; color: var(--text-muted); font: var(--text-xs) var(--font-mono); word-break: break-all; }
.contact__email:hover { color: var(--celeste); }
.contact__footer { position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: space-between; gap: .8rem 2rem; margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,.1); color: var(--text-muted); font: var(--text-xs) var(--font-mono); }
.contact__footer nav { display: flex; gap: 1.2rem; }
.contact__footer a { color: var(--text-muted); }
.contact__footer a:hover { color: var(--agua); }
.contact__signal { position: absolute; right: 2rem; bottom: 5rem; display: flex; align-items: end; gap: .3rem; height: 4rem; opacity: .38; }
.contact__signal i { width: .22rem; height: calc(.5rem + (var(--random, 1) * .2rem)); border-radius: 1rem; background: var(--gradient-brand); }
.contact__signal i:nth-child(2n) { height: 2.4rem; }
.contact__signal i:nth-child(3n) { height: 3.6rem; }
.contact__signal i:nth-child(5n) { height: 1.4rem; }

@media (max-width: 520px) {
  .contact__card { min-height: 0; padding: 2rem 1.25rem; }
  .contact__actions { align-items: stretch; }
  .contact__actions .btn { width: 100%; }
  .contact__signal { display: none; }
}
</style>
