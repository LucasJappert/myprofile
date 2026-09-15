export interface SkillGroup {
  title: string
  items: string[]
  /** Destaca el grupo en la grilla (diferencial profesional) */
  highlight?: boolean
}

export interface SkillDomain {
  id: 'product' | 'ai' | 'data' | 'infra' | 'geo'
  title: string
  label: string
  description: string
  items: string[]
  projects: string[]
  x: number
  y: number
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'product',
    title: 'Producto y frontend',
    label: 'Producto',
    description: 'Interfaces y flujos pensados desde el problema hasta la operación cotidiana.',
    items: ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'PWA'],
    projects: ['APIX', 'Sprint IT', 'DayLog'],
    x: 50,
    y: 8,
  },
  {
    id: 'ai',
    title: 'IA aplicada',
    label: 'IA',
    description: 'Asistentes con herramientas, voz, evaluación y modelos integrados a productos reales.',
    items: ['LLMs', 'MCP', 'Codex', 'Whisper', 'TTS', 'YOLOv8'],
    projects: ['Pía', 'Lucas AI', 'GanasDeSaber'],
    x: 88,
    y: 37,
  },
  {
    id: 'data',
    title: 'Datos y servicios',
    label: 'Datos',
    description: 'APIs, bases de datos y migraciones con trazabilidad y foco en la integridad.',
    items: ['FastAPI', 'PostgreSQL', 'SQL Server', 'SQLite', 'SQLAlchemy'],
    projects: ['APIX', 'API Core', 'Sprint IT'],
    x: 74,
    y: 84,
  },
  {
    id: 'infra',
    title: 'Infraestructura',
    label: 'Infra',
    description: 'Entrega y operación en Linux, contenedores y servicios de nube observables.',
    items: ['Linux', 'Docker', 'Podman', 'DigitalOcean', 'Azure', 'Netlify'],
    projects: ['API Core', 'Lucas AI', 'DayLog'],
    x: 26,
    y: 84,
  },
  {
    id: 'geo',
    title: 'Tecnología geoespacial',
    label: 'Geo',
    description: 'Procesamiento satelital y agronómico para convertir capas complejas en decisiones.',
    items: ['Earth Engine', 'Sentinel', 'NDVI', 'GeoPandas', 'Rasterio'],
    projects: ['APIX'],
    x: 12,
    y: 37,
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes',
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'VB.NET', 'GDScript', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['Vue 2/3', 'Pinia', 'Vuetify', 'Vite', 'Chart.js', 'PWA', 'Workbox', 'Capacitor', 'SCSS'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Express', 'Node.js', 'REST', 'OpenAPI', 'Socket.IO', 'JWT', 'RBAC'],
  },
  {
    title: 'Datos e infra',
    items: ['PostgreSQL', 'SQL Server', 'SQLite', 'SQLAlchemy', 'Linux', 'Docker', 'Podman', 'DigitalOcean', 'Azure', 'Netlify'],
  },
  {
    title: 'Entrega y calidad',
    items: ['Azure DevOps', 'GitHub Actions', 'CI/CD', 'Revisión de código', 'Pytest', 'Playwright', 'Observabilidad', 'Migraciones de datos'],
  },
  {
    title: 'IA y automatización',
    items: [
      'LLMs',
      'Asistentes con herramientas',
      'MCP',
      'Evaluación de respuestas',
      'OpenRouter / OrcaRouter',
      'Whisper',
      'TTS',
      'FFmpeg',
      'YOLOv8',
      'OpenCV',
      'Puppeteer',
    ],
    highlight: true,
  },
  {
    title: 'Desarrollo con agentes',
    items: ['Codex', 'Cursor', 'Hermes', 'Skills', 'AGENTS.md', 'Worktrees', 'Trazabilidad de tareas'],
  },
  {
    title: 'Gestión y liderazgo',
    items: ['Liderazgo técnico', 'Arquitectura', 'Producto', 'Scrum', 'Priorización', 'Planificación de sprints', 'Equipos ágiles'],
    highlight: true,
  },
  {
    title: 'Geoespacial',
    items: ['Google Earth Engine', 'Sentinel', 'NDVI', 'GeoPandas', 'Rasterio', 'Mapas de productividad'],
    highlight: true,
  },
  {
    title: 'Idiomas',
    items: ['Español (nativo)', 'Inglés: lectura y escritura técnicas'],
  },
]
