import { ref } from 'vue'

export function useCopyText() {
  const copied = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      if (resetTimer) clearTimeout(resetTimer)
      resetTimer = setTimeout(() => {
        copied.value = false
      }, 2200)
      return true
    } catch {
      copied.value = false
      return false
    }
  }

  return { copied, copy }
}
