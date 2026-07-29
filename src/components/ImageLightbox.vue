<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  images: string[]
  alts?: string[]
  index: number
}>()

const emit = defineEmits<{
  close: []
  'update:index': [index: number]
}>()

function close() {
  emit('close')
}

function go(delta: number) {
  const len = props.images.length
  if (len < 2) return
  emit('update:index', (props.index + delta + len) % len)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'ArrowRight') go(1)
}

watch(
  () => props.index,
  () => {
    document.body.style.overflow = 'hidden'
  },
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      class="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada"
      @click.self="close"
    >
      <button type="button" class="lightbox__close" aria-label="Cerrar" @click="close">
        ×
      </button>

      <button
        v-if="images.length > 1"
        type="button"
        class="lightbox__nav lightbox__nav--prev"
        aria-label="Anterior"
        @click="go(-1)"
      >
        ‹
      </button>

      <img
        class="lightbox__img"
        :src="images[index]"
        :alt="alts?.[index] ?? `Imagen ${index + 1}`"
        @click.stop
      />

      <button
        v-if="images.length > 1"
        type="button"
        class="lightbox__nav lightbox__nav--next"
        aria-label="Siguiente"
        @click="go(1)"
      >
        ›
      </button>

      <p v-if="images.length > 1" class="lightbox__counter">
        {{ index + 1 }} / {{ images.length }}
      </p>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 3.5rem;
  background: rgba(5, 6, 13, 0.92);
  backdrop-filter: blur(8px);
  cursor: zoom-out;
  animation: lightbox-in 0.18s ease-out;
}

@keyframes lightbox-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox__img {
  max-width: min(100%, 920px);
  max-height: calc(100vh - 4rem);
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-glow);
  cursor: default;
}

.lightbox__close {
  position: absolute;
  top: 0.75rem;
  right: 0.85rem;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(14, 16, 28, 0.9);
  color: var(--text);
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.lightbox__close:hover {
  border-color: var(--celeste);
  color: var(--celeste);
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(14, 16, 28, 0.9);
  color: var(--text);
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.lightbox__nav:hover {
  border-color: var(--agua);
  color: var(--agua);
}

.lightbox__nav--prev {
  left: 0.75rem;
}

.lightbox__nav--next {
  right: 0.75rem;
}

.lightbox__counter {
  position: absolute;
  bottom: 0.85rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
  pointer-events: none;
}

@media (max-width: 639px) {
  .lightbox {
    padding: 3.5rem 0.75rem 2.5rem;
  }

  .lightbox__nav--prev {
    left: 0.35rem;
  }

  .lightbox__nav--next {
    right: 0.35rem;
  }
}
</style>
