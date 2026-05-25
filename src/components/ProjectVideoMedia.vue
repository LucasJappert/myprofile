<script setup lang="ts">
import { ref } from 'vue'
import { useInViewPlayback } from '@/composables/useInViewPlayback'
import { youtubeEmbedSrc, youtubePosterSrc } from '@/utils/youtube'

defineProps<{
  videoId: string
  projectName: string
}>()

const rootRef = ref<HTMLElement | null>(null)
const { isPlaying, motionAllowed } = useInViewPlayback(rootRef)
</script>

<template>
  <div ref="rootRef" class="bento__media bento__media--video">
    <iframe
      v-if="isPlaying"
      :src="youtubeEmbedSrc(videoId)"
      :title="`Video de ${projectName}`"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
    <div v-else class="bento__video-poster" aria-hidden="true">
      <img :src="youtubePosterSrc(videoId)" alt="" loading="lazy" decoding="async" />
      <span class="bento__video-play">▶</span>
    </div>
    <span v-if="!motionAllowed" class="sr-only">
      Vista previa en pausa (preferencia de movimiento reducido del sistema)
    </span>
  </div>
</template>

<style scoped>
.bento__media--video {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border);
}

.bento__media--video iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  pointer-events: none;
}

.bento__video-poster {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
  background: var(--bg-deep);
}

.bento__video-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

.bento__video-play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1rem;
  color: var(--text);
  background: rgba(5, 6, 13, 0.72);
  border: 1px solid rgba(0, 232, 255, 0.35);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
  opacity: 0.85;
}
</style>
