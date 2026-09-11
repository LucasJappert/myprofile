export interface Project {
  name: string
  period: string
  stack: string[]
  description: string
  highlights?: string[]
  href?: string
  image?: string
  images?: string[]
  badge?: 'production' | 'opensource' | 'youtube' | 'itchio' | 'personal' | 'prototype' | 'integration'
  badgeHref?: string
  youtubeId?: string
  featured?: boolean
  layout?: 'wide' | 'default'
}

export const projects: Project[] = [
  {
    name: 'APIX · Agricultura de precisión',
    period: 'Agroideas',
    stack: ['Vue 3', 'Python', 'FastAPI', 'PostgreSQL', 'Earth Engine', 'YOLO'],
    description: 'Una plataforma que conecta datos del lote con decisiones agronómicas: mapas de productividad, ambientes, imágenes satelitales, suelo e informes de implantación.',
    highlights: [
      'Desarrollo de producto, procesamiento geoespacial e integración entre aplicaciones y APIs.',
      'Migración a PostgreSQL y evolución de la operación, el monitoreo y los informes.',
    ],
    href: 'https://app.apix.ag/soluciones',
    badge: 'production',
    featured: true,
  },
  {
    name: 'Pía · Asistente de APIX',
    period: 'IA aplicada en Agroideas',
    stack: ['Codex', 'MCP', 'Python', 'TypeScript', 'PostgreSQL'],
    description: 'Asistente integrado en APIX para consultar datos y entender cómo funciona la plataforma mediante lenguaje natural, con contexto de conversación y entrada por voz.',
    highlights: [
      'Investiga datos y documentación mediante herramientas de lectura en un entorno aislado.',
      'Respuestas con fuentes, validación de evidencia y evaluación de consultas representativas.',
    ],
    featured: true,
  },
  {
    name: 'Sprint IT',
    period: 'Integrado en Agroideas-In',
    stack: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.IO'],
    description: 'Herramienta propia para planificar y seguir el trabajo del equipo: sprints, esfuerzo, comentarios, adjuntos, actividad y pull requests en un mismo lugar.',
    highlights: [
      'Colaboración en tiempo real e integración con Azure DevOps.',
      'Tareas preparadas para IA, seguimiento de ejecución y registro del resultado del agente.',
    ],
    badge: 'production',
    featured: true,
  },
  {
    name: 'Lucas AI · Servicios personales',
    period: 'Backend de DayLog e integraciones',
    stack: ['FastAPI', 'SQLAlchemy', 'SQLite', 'Podman', 'Whisper'],
    description: 'Backend que reúne métricas de uso de IA, transcripción de voz, agenda, notificaciones y monitoreo de cámaras. También aloja el motor del asistente de APIX como servicio aislado.',
    highlights: [
      'Integraciones de modelos, control de acceso y operación en Linux.',
      'Separación de fuentes, dispositivos y períodos para interpretar el consumo de IA.',
    ],
    badge: 'personal',
    featured: true,
  },
  {
    name: 'DayLog',
    period: 'Producto personal',
    stack: ['Vue 3', 'FastAPI', 'Chart.js', 'Whisper', 'Web Push'],
    description: 'Un lugar para entender el día: actividad de las PCs, consumo de IA, agenda, recordatorios, cámaras y diario personal. Los apuntes de voz y los resúmenes diarios conectan actividad con contexto.',
    href: 'https://daylog-lucas.netlify.app',
    image: 'assets/daylog/home.webp',
    badge: 'production',
    featured: true,
    layout: 'wide',
  },
  {
    name: 'Memorable Summaries',
    period: 'Producto personal',
    stack: ['Vue 3', 'TypeScript', 'TTS', 'LLMs'],
    description: 'Resúmenes interactivos para volver a lo importante de cada libro: biblioteca, capítulos y reproducción de audio. Un proceso editorial con IA conecta el texto, la lectura y la narración.',
    href: 'https://lucasjappert.github.io/memorable-summaries/',
    images: ['assets/memorable-summaries/biblioteca.webp', 'assets/memorable-summaries/libro.webp', 'assets/memorable-summaries/reproductor.webp'],
    badge: 'opensource',
    layout: 'wide',
  },
  {
    name: 'GanasDeSaber',
    period: 'Canal y fábrica de videos',
    stack: ['FastAPI', 'Vue 3', 'LLMs', 'TTS', 'FFmpeg'],
    description: 'Divulgación con una herramienta propia de producción: guion, escenas, voz, subtítulos, render y miniaturas. Incluye revisión de narración y reintentos selectivos para mejorar el audio generado.',
    href: 'https://www.youtube.com/@GanasDeSaber',
    image: 'assets/ganas-de-saber/image.webp',
    badge: 'youtube',
    layout: 'wide',
  },
  {
    name: 'Meeting Recorder',
    period: 'Herramienta local para Linux',
    stack: ['Python', 'GTK', 'PipeWire', 'FFmpeg', 'Whisper'],
    description: 'Grabación de reuniones con audio del sistema y micrófono en pistas separadas. Transcripción local, marcas de tiempo y revisión de ecos para preparar resúmenes y documentos apoyados en el audio original.',
    badge: 'personal',
  },
  {
    name: 'SoftAlign',
    period: 'Iniciativa propia',
    stack: ['Vue 3', 'TypeScript', 'Netlify', 'Automatización'],
    description: 'Propuesta de servicio para transformar datos dispersos de empresas y estudios profesionales en reportes ejecutivos. Desarrollo de la oferta, identidad, web y flujo de diagnóstico y calificación de consultas.',
    badge: 'prototype',
  },
  {
    name: 'Nova RPG',
    period: 'Desde 2015',
    stack: ['VB.NET', 'C#', 'MonoGame', 'TCP'],
    description: 'MMORPG 2D cliente-servidor con combate, clanes, dungeons y PvP. Más de diez años de evolución de un producto propio y experiencia con sistemas multijugador.',
    href: 'https://novarpgoficial.com',
    youtubeId: 'VRarAjHraOw',
    badge: 'personal',
  },
  {
    name: 'Moo Raiders',
    period: 'Juego cooperativo LAN',
    stack: ['Godot', 'GDScript', 'ENet'],
    description: 'Defensa por oleadas para jugar en equipo: héroes, habilidades e items, con servidor autoritativo y sincronización multijugador.',
    href: 'https://lucasjappert.itch.io/mooraiders',
    youtubeId: 'tlN-feT4x44',
    badge: 'itchio',
  },
  {
    name: 'Hermes · Integración de agentes',
    period: 'Personalización de una herramienta open source',
    stack: ['Python', 'LLMs', 'Skills', 'Automatización'],
    description: 'Integración y personalización de Hermes para automatizaciones, tareas programadas y herramientas propias. Forma parte de mi entorno de trabajo con IA y de sus métricas de uso.',
    badge: 'integration',
  },
  {
    name: 'API Core · Servicios compartidos',
    period: 'Agroideas',
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'LLMs'],
    description: 'Servicios transversales de clima, noticias agro, modelos de IA y métricas. Una base común para conectar productos y observar el uso de sus APIs.',
    badge: 'production',
  },
  {
    name: 'AoE2 · Overlay para streamers',
    period: 'Herramienta para transmisiones',
    stack: ['Vue 3', 'WebSocket'],
    description: 'Información de partidas de Age of Empires II DE en vivo: ELO, civilizaciones y probabilidad estimada de victoria, integrada en la transmisión.',
    href: 'https://lucasjappert.github.io/new-aoe-overlay-public/',
    image: 'projects/aoe-overlay1.png',
    badge: 'opensource',
    layout: 'wide',
  },
]
