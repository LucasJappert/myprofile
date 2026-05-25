<script setup lang="ts">
import { profile } from '@/data/profile'
import { useCopyText } from '@/composables/useCopyText'

const { copied, copy } = useCopyText()

async function copyEmail() {
  await copy(profile.email)
}
</script>

<template>
  <section id="contacto" class="section contact">
    <div class="container">
      <h2 class="section-title"><span>Contacto</span></h2>
      <div class="contact__card surface--accent">
        <p>¿Proyecto interesante o rol con impacto técnico? Escribime.</p>
        <div class="contact__email-row">
          <a :href="`mailto:${profile.email}`" class="contact__email">{{ profile.email }}</a>
          <button
            type="button"
            class="contact__copy btn btn-ghost"
            :aria-label="copied ? 'Correo copiado' : 'Copiar correo'"
            @click="copyEmail"
          >
            {{ copied ? 'Copiado ✓' : 'Copiar' }}
          </button>
        </div>
        <div class="contact__actions">
          <a :href="`mailto:${profile.email}`" class="btn btn-primary">Enviar email</a>
          <a :href="profile.cvUrl" class="btn btn-ghost" target="_blank" rel="noopener">Descargar CV (PDF)</a>
          <a
            v-for="link in profile.links"
            :key="link.href"
            :href="link.href"
            class="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__card {
  text-align: center;
  max-width: 560px;
  margin-inline: auto;
}

.contact__card p {
  margin: 0 0 1rem;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.65;
}

.contact__email-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.contact__email {
  font-family: var(--font-mono);
  font-size: clamp(0.9rem, 2.5vw, 1.0625rem);
  font-weight: 500;
  word-break: break-all;
}

.contact__copy {
  padding: 0.45rem 0.9rem;
  font-size: var(--text-xs);
  min-height: 2.5rem;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
</style>
