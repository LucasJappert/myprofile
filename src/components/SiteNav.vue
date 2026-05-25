<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { mobileDrawerLinks, mobileQuickLinks, navHighlightLink, navLinks } from '@/data/nav'
import { useMobileMenu } from '@/composables/useMobileMenu'

defineProps<{
  activeId: string
}>()

const { menuOpen, toggleMenu, closeMenu } = useMobileMenu()

const panelRef = ref<HTMLElement | null>(null)
const menuBtnRef = ref<HTMLButtonElement | null>(null)

function onKeydown(e: KeyboardEvent) {
  if (!menuOpen.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    closeMenu()
    menuBtnRef.value?.focus()
    return
  }

  if (e.key !== 'Tab' || !panelRef.value) return

  const focusable = panelRef.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled])',
  )
  if (focusable.length === 0) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(menuOpen, async (open) => {
  if (open) {
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    panelRef.value?.querySelector<HTMLElement>('a[href]')?.focus()
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="nav">
    <div class="nav__inner container">
      <a
        href="#inicio"
        class="nav__brand"
        :class="{ 'is-active': activeId === 'inicio' }"
        aria-label="Inicio"
        @click="closeMenu"
      >
        LJ
      </a>

      <nav class="nav__tabs" aria-label="Navegación rápida">
        <a
          v-for="link in mobileQuickLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav__tab"
          :class="{ 'is-active': activeId === link.id }"
          :aria-label="link.label"
          @click="closeMenu"
        >
          <span class="nav__tab-icon" aria-hidden="true">{{ link.icon }}</span>
          <span class="nav__tab-label">{{ link.shortLabel }}</span>
        </a>
      </nav>

      <nav class="nav__links nav__links--desktop" aria-label="Secciones">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          :class="{ 'is-active': activeId === link.id }"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        ref="menuBtnRef"
        type="button"
        class="nav__more"
        :class="{ 'nav__more--open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-controls="nav-drawer"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Más secciones: Perfil, Educación y Logros Google'"
        @click="toggleMenu"
      >
        <span class="nav__more-icon" aria-hidden="true" />
        <span class="nav__tab-label">Más</span>
      </button>
    </div>

    <div
      id="nav-drawer"
      class="nav-drawer"
      :class="{ 'nav-drawer--open': menuOpen }"
      :aria-hidden="!menuOpen"
    >
      <button
        type="button"
        class="nav-drawer__backdrop"
        aria-label="Cerrar menú"
        tabindex="-1"
        @click="closeMenu"
      />
      <nav
        ref="panelRef"
        class="nav-drawer__panel"
        aria-label="Más secciones"
        :aria-hidden="!menuOpen"
      >
        <a
          v-for="link in mobileDrawerLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-drawer__link"
          :class="{ 'is-active': activeId === link.id }"
          @click="closeMenu"
        >
          <span class="nav-drawer__icon" aria-hidden="true">{{ link.icon }}</span>
          {{ link.label }}
        </a>
        <a
          :href="navHighlightLink.href"
          class="nav-drawer__link nav-drawer__link--highlight"
          :class="{ 'is-active': activeId === navHighlightLink.activeSectionId }"
          @click="closeMenu"
        >
          <span class="nav-drawer__icon" aria-hidden="true">{{ navHighlightLink.icon }}</span>
          {{ navHighlightLink.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 110;
  height: var(--nav-h);
  background: rgba(5, 6, 13, 0.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(14px);
}

.nav__inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 0.5rem;
}

.nav__brand {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  min-height: 2.5rem;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.15rem;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  flex-shrink: 0;
  text-decoration: none;
}

.nav__brand::after {
  content: '';
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: 0.1rem;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient-brand);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav__brand.is-active::after {
  transform: scaleX(1);
}

.nav__tabs {
  display: none;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.15rem;
  min-width: 0;
}

.nav__tab,
.nav__more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  min-width: 2.35rem;
  min-height: 2.5rem;
  padding: 0.2rem 0.15rem;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  background: transparent;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.nav__tab::after {
  content: '';
  position: absolute;
  left: 18%;
  right: 18%;
  bottom: 0.05rem;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient-brand);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav__tab:hover,
.nav__tab.is-active,
.nav__more:hover {
  color: var(--celeste);
}

.nav__tab.is-active {
  font-weight: 600;
}

.nav__tab.is-active::after {
  transform: scaleX(1);
}

.nav__tab-icon {
  font-size: 1rem;
  line-height: 1;
}

.nav__tab-label {
  line-height: 1.1;
  letter-spacing: 0.01em;
}

.nav__more {
  flex-shrink: 0;
}

.nav__more--open {
  color: var(--celeste);
  font-weight: 600;
}

.nav__more-icon {
  position: relative;
  display: block;
  width: 1rem;
  height: 1rem;
}

.nav__more-icon::before,
.nav__more-icon::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1rem;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  transition: transform 0.2s ease;
}

.nav__more-icon::before {
  transform: translate(-50%, -50%);
  box-shadow: 0 -5px 0 currentColor, 0 5px 0 currentColor;
}

.nav__more--open .nav__more-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow: none;
}

.nav__more--open .nav__more-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.nav__more:not(.nav__more--open) .nav__more-icon::after {
  opacity: 0;
}

.nav__links {
  display: none;
  gap: 0.35rem 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav__links a {
  position: relative;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-muted);
  padding: 0.35rem 0.15rem;
  transition: color 0.2s ease;
}

.nav__links a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient-brand);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav__links a:hover {
  color: var(--celeste);
}

.nav__links a.is-active {
  color: var(--celeste);
  font-weight: 600;
}

.nav__links a.is-active::after {
  transform: scaleX(1);
}

.nav__brand:focus-visible,
.nav__tab:focus-visible,
.nav__more:focus-visible,
.nav__links a:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 2px;
  border-radius: 6px;
}

@media (max-width: 767px) {
  .nav__inner {
    padding-inline: 0.25rem;
  }

  .nav__tabs,
  .nav__more {
    display: flex;
  }

  .nav__tab-label {
    font-size: 0.65rem;
  }
}

@media (max-width: 360px) {
  .nav__tab-label {
    display: none;
  }

  .nav__tab,
  .nav__more {
    min-width: 2.1rem;
  }
}

@media (min-width: 768px) {
  .nav__links--desktop {
    display: flex;
  }

  .nav__tabs,
  .nav__more {
    display: none;
  }
}

.nav-drawer {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  visibility: hidden;
}

.nav-drawer--open {
  visibility: visible;
}

.nav-drawer__backdrop,
.nav-drawer__panel {
  pointer-events: none;
}

.nav-drawer--open .nav-drawer__backdrop,
.nav-drawer--open .nav-drawer__panel {
  pointer-events: auto;
}

.nav-drawer__backdrop {
  position: absolute;
  top: var(--nav-h);
  left: 0;
  right: 0;
  bottom: 0;
  border: none;
  background: rgba(5, 6, 13, 0.72);
  cursor: pointer;
}

.nav-drawer__panel {
  position: absolute;
  top: var(--nav-h);
  right: 0;
  width: min(18rem, 88vw);
  height: calc(100dvh - var(--nav-h));
  padding: 0.85rem 1rem 1.25rem;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  border-top: 1px solid rgba(0, 232, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transform: translateX(100%);
  transition: transform 0.22s ease;
  overflow-y: auto;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .nav-drawer__panel {
    transition: none;
  }
}

.nav-drawer--open .nav-drawer__panel {
  transform: translateX(0);
}

@media (min-width: 768px) {
  .nav-drawer {
    display: none;
  }
}

.nav-drawer__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0.75rem;
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-muted);
  border-radius: var(--radius);
  border-left: 3px solid transparent;
}

.nav-drawer__link:hover {
  color: var(--celeste);
  background: rgba(0, 232, 255, 0.06);
}

.nav-drawer__link.is-active {
  color: var(--celeste);
  font-weight: 600;
  background: rgba(46, 232, 184, 0.08);
  border-left-color: var(--agua);
}

.nav-drawer__icon {
  font-size: 1.1rem;
  width: 1.5rem;
  text-align: center;
}

.nav-drawer__link--highlight {
  margin-top: 0.35rem;
  border-top: 1px solid rgba(0, 232, 255, 0.12);
  padding-top: 1rem;
  color: var(--verde);
}

.nav-drawer__link--highlight.is-active {
  color: var(--celeste);
}
</style>
