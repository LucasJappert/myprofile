export interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  summary: string
  highlights?: string[]
  featured?: boolean
}

export const experienceIntro =
  'Liderazgo de sistemas en agrotech: plataforma multi-producto, equipo ágil, Azure y IA aplicada en producción desde Rafaela.';

/** Roles recientes — siempre visibles */
export const experiencePrimary: ExperienceItem[] = [
  {
    company: 'Agroideas S.A.',
    role: 'Responsable de Sistemas',
    period: 'Oct 2021 – Presente',
    location: 'Rafaela, Santa Fe',
    featured: true,
    summary:
      'Liderazgo del ecosistema digital: APIs, frontends, integraciones ERP, IA y despliegue en Azure/Docker.',
    highlights: [
      'Scrum Master del equipo; sprint-it en producción para gestión ágil.',
      'api-core (FastAPI): IA con OpenRouter/OrcaRouter, clima, noticias agro, métricas.',
      'Intranet Agroideas-In: Node/TS, Socket.IO, Vue 3, PWA, Web Push.',
      'APIX: agricultura de precisión, mapas, reportes agronómicos.',
      'Azure DevOps: PRs, Pipelines CI/CD, Docker multi-stage.',
      'Flujo diario con Cursor, OpenCode y documentación para agentes.',
    ],
  },
  {
    company: 'SBI Technology',
    role: 'Full Stack Developer',
    period: 'Jun 2021 – Oct 2022',
    location: 'Rafaela, Santa Fe',
    summary: 'Desarrollo full stack en proyectos para clientes locales (TS/JS y Vue).',
  },
  {
    company: 'Coderhouse',
    role: 'Profesor Vue.js',
    period: 'Abr 2022 – Jul 2022',
    summary: 'Curso de Vue.js: componentes, Composition API, estado y buenas prácticas.',
  },
  {
    company: 'Megatone (Bazar Avenida S.A.)',
    role: 'Team Leader / Full Stack Developer',
    period: 'Jul 2014 – Jun 2021',
    location: 'Santa Fe',
    summary: 'Liderazgo de equipo y desarrollo full stack en retail a escala (~7 años).',
  },
  {
    company: 'Freelancer',
    role: 'Dueño de producto / Full Stack',
    period: '2015 – 2021',
    summary: 'Sistemas PC + PWA (stock/ventas), kioscos, encuestas dinámicas, Foro Club Benelli.',
    highlights: [
      'PWA publicada: Sistema de control de stock y ventas PC-APP.',
      'PWA publicada: Foro Club Benelli Argentina.',
    ],
  },
]

/** Trayectoria anterior — colapsable */
export const experienceEarlier: ExperienceItem[] = [
  {
    company: 'CREDISAN',
    role: 'Gerencia y Administración',
    period: 'Sep 2010 – Jun 2014',
    location: 'Rafaela',
    summary: 'Cartera, facturación, créditos y caja — base analítica trasladada al software.',
  },
  {
    company: 'Oficina Senador Alcides Calvo',
    role: 'Administración',
    period: 'Mar 2007 – Jun 2014',
    location: 'Rafaela',
    summary: 'Relación institucional, prensa, administración, desarrollo de software y asesoría.',
  },
]

/** Lista completa (compatibilidad) */
export const experience: ExperienceItem[] = [...experiencePrimary, ...experienceEarlier]
