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
import AmbientCanvas from '@/components/AmbientCanvas.vue'
import CursorGlow from '@/components/CursorGlow.vue'
import CatCritters from '@/components/CatCritters.vue'
import KineticMarquee from '@/components/KineticMarquee.vue'
import { navLinks } from '@/data/nav'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSiteAnalytics } from '@/composables/useSiteAnalytics'
import { useInteractiveMotion } from '@/composables/useInteractiveMotion'

const activeId = useScrollSpy(navLinks.map((l) => l.id))

function onNavigate(id: string) {
  activeId.value = id
}
useScrollReveal()
useSiteAnalytics()
useInteractiveMotion()
</script>

<template>
  <div class="app">
    <div class="app__bg" aria-hidden="true" />
    <AmbientCanvas />
    <CursorGlow />
    <ScrollProgressBar />
    <ScrollToTopButton />
    <CatCritters />
    <SiteNav :active-id="activeId" @navigate="onNavigate" />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <KineticMarquee />
      <EducationSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.app {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  isolation: isolate;
  overflow-x: clip;
}

.app__bg {
  position: fixed;
  inset: 0;
  z-index: -3;
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
