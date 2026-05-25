export interface Project {
  name: string
  period: string
  stack: string[]
  description: string
  href?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'Nova RPG',
    period: '2015 – Presente',
    stack: ['VB.NET', 'C#', 'MonoGame', 'TCP'],
    description: 'MMORPG 2D cliente-servidor: clanes, dungeons, PvP, +10 años de evolución.',
    href: 'https://novarpgoficial.com',
    featured: true,
  },
  {
    name: 'sprint-it',
    period: 'Producción',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Firebase', 'PWA'],
    description: 'Gestión ágil del equipo Agroideas: sprints, esfuerzo, notas TipTap, adjuntos.',
    href: 'https://github.com/LucasJappert/sprint-it',
    featured: true,
  },
  {
    name: 'moomoo-lan-party',
    period: 'Godot 4.4',
    stack: ['GDScript', 'ENet', 'LAN'],
    description: 'Wave defense cooperativo multijugador con servidor autoritativo.',
    href: 'https://github.com/LucasJappert/moomoo-lan-party',
    featured: true,
  },
  {
    name: 'new-aoe-overlay',
    period: 'Streamers',
    stack: ['Vue 3', 'WebSocket'],
    description: 'Overlay AoE2 DE: ELO, civs, win probability en vivo.',
    href: 'https://lucasjappert.github.io/new-aoe-overlay-public/',
  },
  {
    name: 'cams / onvix',
    period: 'Visión',
    stack: ['FastAPI', 'OpenCV', 'YOLOv8', 'Vue 3'],
    description: 'Monitoreo IP/ONVIF, detección de personas, notificaciones.',
  },
  {
    name: 'online-notes',
    period: 'PWA',
    stack: ['Vue 3', 'Netlify'],
    description: 'Notas rápidas en la nube.',
    href: 'https://speedy-notes.netlify.app',
  },
]
