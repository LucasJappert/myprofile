<template>
  <div class="cursor-glow" aria-hidden="true" />
</template>

<style scoped>
.cursor-glow {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 90;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0, 232, 255, 0.09), rgba(46, 232, 184, 0.025) 42%, transparent 70%);
  transform: translate3d(calc(var(--pointer-x, -500px) - 50%), calc(var(--pointer-y, -500px) - 50%), 0);
  mix-blend-mode: screen;
  will-change: transform;
}

@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .cursor-glow {
    display: none;
  }
}
</style>
