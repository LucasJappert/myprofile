<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="contacto" class="section contact">
    <div class="container">
      <h2 class="section-title"><span>Contacto</span></h2>
      <div class="contact__card card">
        <p>¿Proyecto interesante o rol con impacto técnico? Escribime.</p>
        <a :href="`mailto:${profile.email}`" class="contact__email">{{ profile.email }}</a>
        <div class="contact__actions">
          <a :href="profile.cvUrl" class="btn btn-primary" target="_blank" rel="noopener">Descargar CV (PDF)</a>
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
  max-width: 520px;
  margin-inline: auto;
}

.contact__card p {
  margin: 0 0 1rem;
  color: var(--text-muted);
}

.contact__email {
  display: block;
  font-family: var(--font-mono);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  word-break: break-all;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
</style>
