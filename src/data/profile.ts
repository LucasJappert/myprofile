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
    'Lidero equipos y construyo productos de punta a punta: plataformas agrotech, asistentes de IA y automatización. Más de 15 años conectando negocio, arquitectura y software.',
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
    'Soy responsable de Sistemas en Agroideas S.A. Diseño la arquitectura, desarrollo y acompaño al equipo desde la definición del problema hasta la operación del producto. Trabajo con TypeScript, Python y Vue, sobre APIs, datos y aplicaciones que conectan agricultura de precisión con la gestión diaria de la empresa.',
    'Mi trabajo reciente combina asistentes de IA con fuentes verificables, migraciones a PostgreSQL, procesamiento de imágenes satelitales y herramientas para coordinar desarrollo humano y agentes de código. Me importa que cada solución se pueda mantener, observar y mejorar con evidencia.',
    'También construyo productos propios: DayLog reúne actividad, consumo de IA y apuntes de voz; Memorable Summaries convierte libros en experiencias de lectura y audio; GanasDeSaber conecta guiones, síntesis de voz y video. Los juegos multijugador siguen siendo parte de mi recorrido, con Nova RPG y Moo Raiders.',
  ],
  interests: [
    { label: 'Programación', icon: 'code' },
    { label: 'Desarrollo de juegos', icon: 'game' },
    { label: 'Fútbol', icon: 'ball' },
    { label: 'Música', icon: 'music' },
    { label: 'Aprendizaje', icon: 'learn' },
  ],
} as const
