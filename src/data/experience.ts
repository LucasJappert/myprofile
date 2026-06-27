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
      'Defino la arquitectura y lidero el desarrollo de la plataforma digital de la empresa: APIs REST, intranet, aplicación de agricultura de precisión y herramientas internas — cinco productos utilizados diariamente por distintas áreas.',
    highlights: [
      'api-core (FastAPI, Python, Azure): API central que integra modelos de lenguaje (DeepSeek, Claude), datos satelitales, generación automatizada de contenido agronómico y métricas de negocio.',
      'Agroideas-In (Node, TypeScript, Vue 3, Socket.IO, PWA): Intranet en tiempo real con notificaciones push, WebSockets e integración con ERP legacy.',
      'APIX (FastAPI, GEE, YOLOv8): agricultura de precisión con índices de vegetación satelitales, mapas de rendimiento, prescripciones y análisis de margen bruto.',
      'sprint-it (Vue 3, Firebase, PWA): gestión ágil del equipo — sprints, estimación de esfuerzo y notas colaborativas.',
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
      'Proyectos personales — Automatización con agentes de IA (Hermes Agent), detección de objetos con YOLOv8 y OpenCV (cams/onvix), desarrollo de videojuegos multijugador (Nova RPG, VB.NET/C#, MonoGame +10 años).',
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
