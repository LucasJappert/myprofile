<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { navLinks } from '@/data/nav'
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
      <a href="#inicio" class="nav__brand" @click="closeMenu">LJ</a>

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
        class="nav__menu-btn"
        :aria-expanded="menuOpen"
        aria-controls="nav-drawer"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú de secciones'"
        @click="toggleMenu"
      >
        <span class="nav__menu-icon" aria-hidden="true" />
      </button>
    </div>

    <Teleport to="body">
      <div
        v-show="menuOpen"
        id="nav-drawer"
        class="nav-drawer"
        :class="{ 'nav-drawer--open': menuOpen }"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <button
          type="button"
          class="nav-drawer__backdrop"
          aria-label="Cerrar menú"
          @click="closeMenu"
        />
        <nav
          ref="panelRef"
          class="nav-drawer__panel"
          aria-label="Secciones del sitio"
        >
          <div class="nav-drawer__head">
            <span class="nav-drawer__title">Secciones</span>
            <button type="button" class="nav-drawer__close" aria-label="Cerrar" @click="closeMenu">
              ✕
            </button>
          </div>
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="nav-drawer__link"
            :class="{ 'is-active': activeId === link.id }"
            @click="closeMenu"
          >
            <span class="nav-drawer__icon" aria-hidden="true">{{ link.icon }}</span>
            {{ link.label }}
          </a>
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-h);
  background: rgba(5, 6, 13, 0.88);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(14px);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
}

.nav__brand {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.2rem;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  flex-shrink: 0;
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

.nav__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(0, 232, 255, 0.06);
  cursor: pointer;
}

.nav__menu-icon {
  display: block;
  width: 1.15rem;
  height: 2px;
  background: var(--celeste);
  box-shadow: 0 -6px 0 var(--celeste), 0 6px 0 var(--celeste);
}

.nav__menu-btn:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 3px;
}

.nav__brand:focus-visible,
.nav__links a:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .nav__links--desktop {
    display: flex;
  }

  .nav__menu-btn {
    display: none;
  }
}

.nav-drawer {
  position: fixed;
  inset: 0;
  z-index: 200;
  pointer-events: none;
}

.nav-drawer--open {
  pointer-events: auto;
}

.nav-drawer__backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(5, 6, 13, 0.75);
  cursor: pointer;
}

.nav-drawer__panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(18rem, 88vw);
  height: 100%;
  padding: calc(var(--nav-h) + 0.5rem) 1.25rem 1.5rem;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transform: translateX(100%);
  transition: transform 0.25s ease;
  overflow-y: auto;
}

@media (prefers-reduced-motion: reduce) {
  .nav-drawer__panel {
    transition: none;
  }
}

.nav-drawer--open .nav-drawer__panel {
  transform: translateX(0);
}

.nav-drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.nav-drawer__title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.nav-drawer__close {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
}

.nav-drawer__close:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 2px;
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
</style>
