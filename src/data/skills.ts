export interface SkillGroup {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes',
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'VB.NET', 'GDScript', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['Vue 2/3', 'Pinia', 'Vuetify', 'Vite', 'PWA', 'Workbox', 'Capacitor', 'SCSS'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Express', 'Node.js', 'REST', 'OpenAPI', 'Socket.IO', 'JWT', 'RBAC'],
  },
  {
    title: 'Datos e infra',
    items: ['SQL Server', 'Azure SQL', 'Firebase', 'Supabase', 'Docker', 'PM2', 'Gunicorn'],
  },
  {
    title: 'DevOps (Azure)',
    items: ['Azure DevOps', 'Pull Requests', 'Azure Pipelines', 'CI/CD', 'Docker multi-stage'],
  },
  {
    title: 'IA y automatización',
    items: ['OpenRouter', 'OrcaRouter', 'DeepSeek', 'Gemini', 'YOLOv8', 'OpenCV', 'TTS', 'Puppeteer'],
  },
  {
    title: 'Herramientas IA',
    items: ['Cursor', 'OpenCode', 'AGENTS.md', 'docs/', '.cursor/rules/'],
  },
  {
    title: 'Gestión',
    items: ['Scrum Master', 'Backlog', 'Daily', 'Sprint planning', 'Retros'],
  },
]
