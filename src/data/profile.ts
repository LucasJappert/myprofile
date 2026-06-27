import { assetUrl } from '@/utils/assetUrl'

export const profile = {
  name: 'Lucas Jappert',
  /** Línea superior del hero (empresa actual) */
  currentEmployer: {
    company: 'Agroideas S.A.',
    sector: 'Agrotech',
  },
  role: 'Full Stack Engineering Lead',
  location: 'Rafaela, Argentina',
  tagline:
    'Liderazgo técnico, arquitectura de sistemas, producto. TypeScript + Python + Vue + FastAPI. CI/CD, code review, IA aplicada. 15+ años.',
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
  cvUrl: assetUrl('Lucas-Jappert-CV.pdf'),
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucasjappert/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/LucasJappert', icon: 'github' },
  ],
  about: [
    'Engineering Lead con 15+ años construyendo software de punta a punta. Dirijo la plataforma digital de Agroideas S.A. — APIs, aplicaciones web, tiempo real y automatización. Conecto requerimientos de negocio, decisiones de arquitectura y desarrollo para entregar productos completos. TypeScript, Python, Vue.js, FastAPI, Azure, Cursor. IA aplicada en productos reales.',
    'Integración de modelos de lenguaje en APIs productivas (DeepSeek Flash/Pro, Claude vía OrcaRouter). Automatización de contenido agronómico con LLMs y jobs asíncronos. Visión por computadora con YOLOv8 + OpenCV para detección en tiempo real. Procesamiento de imágenes satelitales con Google Earth Engine. Automatización de tareas con agentes de IA (cronjobs, subagentes en paralelo).',
  ],
  interests: [
    { label: 'Programación', icon: 'code' },
    { label: 'Desarrollo de juegos', icon: 'game' },
    { label: 'Fútbol', icon: 'ball' },
    { label: 'Música', icon: 'music' },
    { label: 'Aprendizaje', icon: 'learn' },
  ],
} as const
