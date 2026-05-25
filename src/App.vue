<script setup lang="ts">
import SiteNav from '@/components/SiteNav.vue'
import MobileNav from '@/components/MobileNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { navLinks } from '@/data/nav'
import { useScrollSpy } from '@/composables/useScrollSpy'

const activeId = useScrollSpy(navLinks.map((l) => l.id))
</script>

<template>
  <div class="app">
    <div class="app__bg" aria-hidden="true" />
    <SiteNav :active-id="activeId" />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
    <SiteFooter />
    <MobileNav :active-id="activeId" />
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100dvh;
}

.app__bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--bg-deep);
  pointer-events: none;
}

.app__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-soft);
  opacity: 0.6;
}

main {
  padding-bottom: 4.5rem;
}

@media (min-width: 768px) {
  main {
    padding-bottom: 0;
  }
}
</style>
