export interface SkillGroup {
  title: string
  items: string[]
  /** Destaca el grupo en la grilla (diferencial profesional) */
  highlight?: boolean
}

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
