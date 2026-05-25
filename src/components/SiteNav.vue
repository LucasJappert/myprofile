<script setup lang="ts">
const links = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'competencias', label: 'Competencias' },
  { id: 'educacion', label: 'Educación' },
  { id: 'contacto', label: 'Contacto' },
]
</script>

<template>
  <header class="nav">
    <div class="nav__inner container">
      <a href="#inicio" class="nav__brand">LJ</a>
      <nav class="nav__links" aria-label="Secciones">
        <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ link.label }}</a>
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
  z-index: 100;
  height: var(--nav-h);
  background: rgba(5, 6, 13, 0.82);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(14px);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav__brand {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.1rem;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav__links {
  display: none;
  gap: 1.25rem;
}

.nav__links a {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-muted);
}

.nav__links a:hover {
  color: var(--celeste);
}

.nav__brand:focus-visible,
.nav__links a:focus-visible {
  outline: 2px solid var(--celeste);
  outline-offset: 3px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .nav__links {
    display: flex;
  }
}

@media (max-width: 767px) {
  .nav__inner {
    justify-content: center;
  }
  .nav__brand {
    font-size: 1.25rem;
  }
}
</style>
