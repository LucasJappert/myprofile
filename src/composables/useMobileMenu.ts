import { ref } from 'vue'

const menuOpen = ref(false)

export function useMobileMenu() {
  function openMenu() {
    menuOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeMenu() {
    menuOpen.value = false
    document.body.style.overflow = ''
  }

  function toggleMenu() {
    if (menuOpen.value) closeMenu()
    else openMenu()
  }

  return { menuOpen, openMenu, closeMenu, toggleMenu }
}
