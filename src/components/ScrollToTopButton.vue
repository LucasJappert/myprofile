<script setup lang="ts">
import { useScrollToTop } from '@/composables/useScrollToTop'

const { visible, scrollToTop } = useScrollToTop()
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-show="visible"
      type="button"
      class="scroll-top"
      aria-label="Volver arriba"
      @click="scrollToTop"
    >
      <svg
        class="scroll-top__icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 14l6-6 6 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-top {
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
  z-index: 105;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid rgba(46, 232, 184, 0.45);
  border-radius: 50%;
  background: rgba(10, 12, 22, 0.92);
  color: var(--agua);
  cursor: pointer;
  box-shadow: var(--shadow-glow);
  backdrop-filter: blur(10px);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.scroll-top:hover {
  color: var(--celeste);
  border-color: rgba(0, 232, 255, 0.55);
  background: rgba(14, 16, 28, 0.96);
  transform: translateY(-2px);
}

.scroll-top:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 3px;
}

.scroll-top__icon {
  display: block;
  width: 1.15rem;
  height: 1.15rem;
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(0.75rem) scale(0.92);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-top {
    transition: none;
  }

  .scroll-top:hover {
    transform: none;
  }

  .scroll-top-enter-active,
  .scroll-top-leave-active {
    transition: opacity 0.01ms;
  }

  .scroll-top-enter-from,
  .scroll-top-leave-to {
    transform: none;
  }
}

@media (min-width: 768px) {
  .scroll-top {
    right: 1.25rem;
    bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
    width: 3rem;
    height: 3rem;
  }
}
</style>
