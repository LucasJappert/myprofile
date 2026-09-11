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
  'Liderazgo de equipos, desarrollo de producto y operación de sistemas. De e-commerce e integraciones empresariales a agricultura de precisión e IA aplicada.';

/** Roles recientes — siempre visibles */
export const experiencePrimary: ExperienceItem[] = [
  {
    company: 'Agroideas S.A. · Agrotech',
    role: 'Responsable de Sistemas · Engineering Lead',
    period: 'Oct 2021 – Presente',
    location: 'Rafaela, Argentina',
    current: true,
    summary:
      'Lidero el desarrollo de APIX, Agroideas-In y sus servicios compartidos. Conecto las necesidades de agrónomos, operaciones y negocio con decisiones de producto, arquitectura y entrega.',
    highlights: [
      'APIX: mapas de productividad y ambientes, series Sentinel, altimetría, informes agronómicos y análisis de implantación con visión por computadora.',
      'Pía, asistente de APIX: consultas en lenguaje natural sobre datos y documentación, contexto de conversación, entrada por voz y respuestas con fuentes; herramientas de lectura y ejecución aislada.',
      'Migración de servicios y bases de SQL Server a PostgreSQL: adaptación de consultas, integridad de datos, respaldos, validación y monitoreo. Integración con el ERP existente.',
      'Sprint IT: planificación, esfuerzo, colaboración en tiempo real e integración con pull requests. Flujo de tareas para agentes de IA con asignación, seguimiento y registro de resultados.',
      'Agroideas-In y API Core: operaciones, stock, granos, notificaciones, clima, noticias y servicios de IA compartidos; analítica de uso y monitoreo de APIs y bases de datos.',
      'Priorización con negocio, revisión de código y entrega continua con Azure DevOps. Operación de servicios en Linux y contenedores; reglas y documentación compartidas para el equipo y sus agentes de desarrollo.',
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
      'Productos propios — DayLog y Lucas AI, Memorable Summaries, GanasDeSaber, herramientas de transcripción y automatización. Desarrollo de videojuegos multijugador: Nova RPG y Moo Raiders.',
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
