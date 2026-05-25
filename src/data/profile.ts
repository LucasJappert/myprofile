export const profile = {
  name: 'Lucas Jappert',
  role: 'Responsable de Sistemas · Full Stack Developer',
  location: 'Rafaela, Santa Fe, Argentina',
  tagline:
    '15+ años construyendo plataformas agrotech, APIs e IA aplicada en producción.',
  email: 'lucasnicolasjappert@gmail.com',
  cvUrl: `${import.meta.env.BASE_URL}Profile.pdf`,
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucasjappert/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/LucasJappert', icon: 'github' },
  ],
  about: [
    'Desarrollador de software con más de 15 años de experiencia, especializado en TypeScript, Python, Node.js y Vue.js. Lidero el área de sistemas en Agroideas S.A., donde diseño y mantengo una plataforma agrotech multi-producto y coordino al equipo con prácticas ágiles.',
    'Combino arquitectura full stack, integración con ERP legacy, tiempo real (WebSockets), PWA, observabilidad e IA aplicada (LLMs vía OpenRouter y OrcaRouter, visión, TTS). Uso desarrollo asistido por IA con Cursor y OpenCode, y documentación para agentes en los repos (AGENTS.md, docs/, .cursor/rules/).',
    'En paralelo desarrollo productos propios: MMORPG 2D, herramientas para streamers, juegos en Godot 4 y proyectos de visión por computadora.',
  ],
  interests: [
    { label: 'Programación', icon: 'code' },
    { label: 'Desarrollo de juegos', icon: 'game' },
    { label: 'Fútbol', icon: 'ball' },
    { label: 'Música', icon: 'music' },
    { label: 'Aprendizaje', icon: 'learn' },
  ],
} as const
