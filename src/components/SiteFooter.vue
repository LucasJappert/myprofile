<script setup lang="ts">
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <nav class="footer__links" aria-label="Enlaces rápidos">
        <a
          v-for="link in profile.links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label }}
        </a>
        <a :href="profile.cvUrl" target="_blank" rel="noopener">CV (PDF)</a>
        <a href="#educacion-google">Logros Google</a>
      </nav>
      <p class="footer__interests" aria-label="Intereses personales">
        <span
          v-for="item in profile.interests"
          :key="item.label"
          class="chip"
          :class="{ 'chip--verde': item.icon === 'game', 'chip--agua': item.icon === 'learn' }"
        >
          {{ item.label }}
        </span>
      </p>
      <p class="footer__copy">© {{ year }} Lucas Jappert · Vue 3 + Vite + TypeScript</p>
      <p class="footer__gradient" aria-hidden="true" />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 0 calc(5rem + env(safe-area-inset-bottom));
  border-top: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.footer__inner {
  position: relative;
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem 1.25rem;
  margin-bottom: 1rem;
}

.footer__links a {
  font-weight: 600;
  font-size: var(--text-sm);
}

.footer__interests {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin: 0 0 1rem;
}

.footer__interests .chip {
  font-size: 0.75rem;
  padding: 0.28rem 0.55rem;
}

.footer__copy {
  margin: 0;
}

.footer__gradient {
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 120px;
  background: var(--gradient-brand);
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
}

@media (min-width: 768px) {
  .footer {
    padding-bottom: 2.5rem;
  }
}
</style>
