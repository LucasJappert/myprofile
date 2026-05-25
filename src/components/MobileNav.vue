<script setup lang="ts">
import { mobileBarLinks, navLinks } from '@/data/nav'
import { useMobileMenu } from '@/composables/useMobileMenu'

defineProps<{
  activeId: string
}>()

const { openMenu } = useMobileMenu()

const drawerOnlyLinks = navLinks.filter(
  (l) => !mobileBarLinks.some((b) => b.id === l.id),
)
</script>

<template>
  <nav class="mobile-nav" aria-label="Navegación móvil rápida">
    <a
      v-for="link in mobileBarLinks"
      :key="link.id"
      :href="`#${link.id}`"
      :class="{ 'is-active': activeId === link.id }"
    >
      <span class="mobile-nav__icon" aria-hidden="true">{{ link.icon }}</span>
      <span>{{ link.shortLabel }}</span>
    </a>
    <button
      type="button"
      class="mobile-nav__more"
      :class="{ 'is-active': drawerOnlyLinks.some((l) => l.id === activeId) }"
      aria-label="Más secciones: Perfil y Educación"
      @click="openMenu"
    >
      <span class="mobile-nav__icon" aria-hidden="true">☰</span>
      <span>Más</span>
    </button>
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
  padding: 0.45rem 0.15rem calc(0.45rem + env(safe-area-inset-bottom));
  background: rgba(5, 6, 13, 0.94);
  border-top: 1px solid var(--border);
  backdrop-filter: blur(14px);
}

.mobile-nav a,
.mobile-nav__more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-muted);
  padding: 0.3rem 0.2rem;
  border: none;
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}

.mobile-nav a:hover,
.mobile-nav a.is-active,
.mobile-nav__more:hover,
.mobile-nav__more.is-active {
  color: var(--celeste);
}

.mobile-nav a.is-active,
.mobile-nav__more.is-active {
  font-weight: 600;
}

.mobile-nav a:focus-visible,
.mobile-nav__more:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 2px;
  border-radius: 6px;
}

.mobile-nav__icon {
  font-size: 1.05rem;
}

@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}
</style>
