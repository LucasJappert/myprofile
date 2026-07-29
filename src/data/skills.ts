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
    items: ['SQL Server', 'Azure SQL', 'SQLite', 'Firebase', 'Supabase', 'Docker', 'Podman', 'Netlify', 'PM2', 'Gunicorn'],
  },
  {
    title: 'DevOps (Azure)',
    items: ['Azure DevOps', 'Pull Requests', 'Azure Pipelines', 'CI/CD', 'Docker multi-stage'],
  },
  {
    title: 'IA y automatización',
    items: [
      'LLMs',
      'OrcaRouter',
      'DeepSeek',
      'Claude',
      'OmniVoice',
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
    title: 'Herramientas IA',
    items: ['Cursor', 'OpenCode', 'lucas-ai-api', 'AGENTS.md', 'docs/', '.cursor/rules/'],
  },
  {
    title: 'Gestión y liderazgo',
    items: ['Scrum Master', 'Backlog', 'Daily', 'Sprint planning', 'Retros', 'Equipos ágiles'],
    highlight: true,
  },
  {
    title: 'Idiomas',
    items: ['Español (nativo)', 'Inglés: lectura y escritura técnicas'],
  },
]
