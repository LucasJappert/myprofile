<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p>© {{ year }} Lucas Jappert · Hecho con Vue 3 + Vite + TypeScript</p>
      <p class="footer__gradient" aria-hidden="true" />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 0 5rem;
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

.footer__inner p {
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
