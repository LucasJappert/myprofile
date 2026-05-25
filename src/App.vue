<script setup lang="ts">
import SiteNav from '@/components/SiteNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ScrollProgressBar from '@/components/ScrollProgressBar.vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import { navLinks } from '@/data/nav'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useScrollSpy } from '@/composables/useScrollSpy'

const activeId = useScrollSpy(navLinks.map((l) => l.id))
useScrollReveal()
</script>

<template>
  <div class="app">
    <div class="app__bg" aria-hidden="true" />
    <ScrollProgressBar />
    <ScrollToTopButton />
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
</style>
