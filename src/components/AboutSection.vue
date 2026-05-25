<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="perfil" class="section section--alt section--after-hero reveal">
    <div class="container">
      <h2 class="section-title"><span>Sobre mí</span></h2>
      <div class="about surface--plain">
        <p v-for="(paragraph, i) in profile.about" :key="i">{{ paragraph }}</p>
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

  .section--after-hero .section-title {
    margin-bottom: 1.25rem;
  }
}

.about p {
  margin: 0 0 1rem;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.8;
}

.about p:last-child {
  margin-bottom: 0;
}
</style>
