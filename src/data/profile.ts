export const profile = {
  name: 'Lucas Jappert',
  role: 'Responsable de Sistemas · Full Stack Developer',
  location: 'Rafaela, Santa Fe, Argentina',
  tagline: 'Liderazgo de sistemas en agrotech · full stack e IA en producción.',
  /** Enlace breve al logro Google (sección Formación) */
  credentialHighlight: {
    label: '1.er puesto · Google PWA Hackathon',
    shortLabel: 'Google PWA · 1.º',
    href: '#educacion-google',
  },
  email: 'lucasnicolasjappert@gmail.com',
  avatar: 'profile-image.jpeg',
  avatarAlt:
    'Ilustración caricaturesca de Lucas con su pareja y tres gatos, bajo un cielo nocturno con cometa, luna y estrellas',
  cvUrl: `${import.meta.env.BASE_URL}Profile.pdf`,
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucasjappert/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/LucasJappert', icon: 'github' },
  ],
  about: [
    'Llevo más de 15 años construyendo software que llega a producción. Hoy dirijo el área de sistemas en Agroideas S.A.: defino arquitectura, priorizo el backlog y acompaño al equipo en un ecosistema agrotech multi-producto — APIs, intranet, PWA, integración con ERP legacy y despliegue en Azure con CI/CD y revisión por pares.',
    'Mi fuerte está en traducir dominio complejo en producto: TypeScript, Python y Vue.js en frontend y backend, tiempo real (WebSockets), observabilidad e IA aplicada en servicios reales (LLMs, visión y automatización de contenido). Combino entrega disciplinada con un flujo moderno de desarrollo asistido por IA, siempre con convenciones claras para que el equipo escale sin depender de una sola persona.',
    'Fuera del trabajo sigo profundizando en IA aplicada: gateways OpenRouter y OrcaRouter, modelos como DeepSeek y un flujo diario con Cursor y OpenCode para prototipar y entregar más rápido. En paralelo mantengo proyectos propios — MMORPG 2D, overlays para streamers, Godot 4 y visión por computadora — donde pruebo arquitectura, tiempo real y nuevas herramientas antes de llevarlas al equipo.',
  ],
  interests: [
    { label: 'Programación', icon: 'code' },
    { label: 'Desarrollo de juegos', icon: 'game' },
    { label: 'Fútbol', icon: 'ball' },
    { label: 'Música', icon: 'music' },
    { label: 'Aprendizaje', icon: 'learn' },
  ],
} as const
