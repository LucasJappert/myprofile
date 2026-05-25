<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="perfil" class="section section--alt reveal">
    <div class="container">
      <h2 class="section-title"><span>Sobre mí</span></h2>
      <div class="about surface--plain">
        <p v-for="(paragraph, i) in profile.about" :key="i">{{ paragraph }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about p {
  margin: 0 0 1rem;
  color: var(--text-muted);
  font-size: var(--text-base);
  line-height: 1.75;
}

.about p:last-child {
  margin-bottom: 0;
}
</style>
