<script setup lang="ts">
const links = [
  { id: 'inicio', label: 'Inicio', icon: '⌂' },
  { id: 'experiencia', label: 'Exp.', icon: '◆' },
  { id: 'proyectos', label: 'Proy.', icon: '▣' },
  { id: 'skills', label: 'Skills', icon: '◇' },
  { id: 'contacto', label: 'Contacto', icon: '✉' },
]
</script>

<template>
  <nav class="mobile-nav" aria-label="Navegación móvil">
    <a v-for="link in links" :key="link.id" :href="`#${link.id}`">
      <span class="mobile-nav__icon" aria-hidden="true">{{ link.icon }}</span>
      <span>{{ link.label }}</span>
    </a>
  </nav>
</template>

<style scoped>
.mobile-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  justify-content: space-around;
  padding: 0.5rem 0.25rem calc(0.5rem + env(safe-area-inset-bottom));
  background: rgba(5, 6, 13, 0.92);
  border-top: 1px solid var(--border);
  backdrop-filter: blur(14px);
}

.mobile-nav a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--text-muted);
  padding: 0.25rem;
}

.mobile-nav a:hover {
  color: var(--celeste);
}

.mobile-nav__icon {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}
</style>
