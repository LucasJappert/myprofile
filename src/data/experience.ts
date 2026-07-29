export interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  summary: string
  highlights?: string[]
  featured?: boolean
  /** Rol en curso — badge y énfasis visual en la timeline */
  current?: boolean
}

export const experienceIntro =
  'Engineering Lead con 15+ años construyendo software de punta a punta. Dirijo la plataforma digital de Agroideas S.A. — APIs, aplicaciones web, tiempo real y automatización.';

/** Roles recientes — siempre visibles */
export const experiencePrimary: ExperienceItem[] = [
  {
    company: 'Agroideas S.A. · Agrotech',
    role: 'Head of Systems',
    period: 'Oct 2021 – Presente',
    location: 'Rafaela, Argentina',
    current: true,
    summary:
      'Defino la arquitectura y lidero el desarrollo de la plataforma digital: API compartida, intranet operativa, agricultura de precisión (APIX) y herramientas internas — productos usados a diario por operaciones, técnicos y negocio.',
    highlights: [
      'api-core (FastAPI, Python, Azure): plataforma compartida — gateway multi-modelo (DeepSeek, Claude vía OpenRouter/Orca), clima, pipeline de noticias agro, métricas de uso y servicios transversales.',
      'Agroideas-In (Node, TypeScript, Vue 3, Socket.IO, PWA): intranet ops (stock, granos, pedidos) en tiempo real, notificaciones push, Sprint-IT e integración con ERP legacy (SQL Server dual).',
      'APIX (Vue 3, Capacitor, Node BFF, FastAPI, GEE/Sentinel, YOLOv8): agricultura de precisión — lotes y mapas, ambientaciones, penetrometría, índices satelitales, mapas de productividad, drone/CV y PDFs server-side (Playwright).',
      'sprint-it (integrado en Agroideas-In): gestión ágil del equipo — sprints, estimación de esfuerzo, notas colaborativas y resúmenes con IA.',
      'Code reviews en cada PR. Pipelines CI/CD multi-stage con Docker en Azure DevOps. Administración de servidores, bases de datos (SQL Server) y dominios. Interlocutor directo con áreas de negocio para definir productos.',
    ],
  },
  {
    company: 'Megatone · Retail',
    role: 'Team Leader · Full Stack Developer',
    period: 'Jul 2014 – Jun 2021',
    location: 'Santa Fe',
    summary:
      'Lideré el equipo de desarrollo del e-commerce durante 7 años. .NET Framework, SQL Server, Vue.js. Responsable de requerimientos, arquitectura, performance y SEO del sitio.',
  },
  {
    company: 'SBI Technology · CoderHouse · Proyectos personales',
    role: 'Software Developer · Profesor · Freelance',
    period: 'Consultoría, docencia y proyectos personales',
    summary: 'Roles complementarios en consultoría, docencia y proyectos propios.',
    highlights: [
      'SBI Technology — APIs REST .NET Core + Akka.NET, Azure Functions, CI/CD (Jun 2021 – Oct 2022).',
      'CoderHouse — Profesor de Vue.js: 30 alumnos, Composition API, TypeScript (Abr 2022 – Jul 2022).',
      'Proyectos personales — Memorable Summaries, GanasDeSaber (yt-video-factory), DayLog + lucas-ai-api, Hermes Agent, detección con YOLOv8/OpenCV (cams/onvix), videojuegos multijugador (Nova RPG, VB.NET/C#, MonoGame +10 años).',
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
