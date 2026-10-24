<script setup lang="ts">
import { profile } from '@/data/profile'
import { summonCat } from '@/utils/cats'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__id">
        <strong>{{ profile.name }}</strong>
        <span>© {{ year }} · {{ profile.location }}</span>
      </p>
      <p class="footer__interests" aria-label="Intereses personales">
        {{ profile.interests.map((item) => item.label).join(' · ') }}
      </p>
      <button type="button" class="footer__cat" @click="summonCat">
        <span aria-hidden="true">🐾</span> Invocar un gato
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1.75rem 0 calc(1.75rem + env(safe-area-inset-bottom));
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer__inner {
  display: grid;
  gap: 0.9rem;
  align-items: center;
  color: var(--text-muted);
  font-size: var(--text-xs);
}

.footer__id { display: flex; flex-wrap: wrap; gap: 0.35rem 0.75rem; margin: 0; }
.footer__id strong { color: var(--text); font-weight: 600; }
.footer__interests { margin: 0; font-family: var(--font-mono); font-size: 0.75rem; }

.footer__cat {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.5rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font: 600 var(--text-xs) var(--font-sans);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.footer__cat:hover { border-color: var(--agua); color: var(--agua); }

@media (min-width: 840px) {
  .footer__inner { grid-template-columns: auto 1fr auto; gap: 2rem; }
  .footer__interests { text-align: center; }
}
</style>
