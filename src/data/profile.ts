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
  /** Tesis del hero; la palabra destacada va aparte */
  thesis: { lead: 'Construyo software que vale la pena', highlight: 'operar' },
  heroIntro:
    'Lidero Sistemas en Agroideas: del dato del lote a la decisión agronómica, con asistentes de IA que citan sus fuentes y herramientas que el equipo usa todos los días. Más de 15 años entre negocio, arquitectura y software.',
  /** Capas del mapa del hero: productos que resumen el trabajo actual */
  heroLayers: [
    { name: 'APIX', detail: 'Agricultura de precisión', color: '#22e884' },
    { name: 'Pía', detail: 'IA con fuentes verificables', color: '#00e8ff' },
    { name: 'DayLog', detail: 'Telemetría personal', color: '#e9cf4a' },
  ],
  email: 'lucasnicolasjappert@gmail.com',
  /** Recortes livianos: rostro para el pin del mapa e ilustración 4:5 para su tarjeta */
  avatarPin: 'avatar-pin.webp',
  avatarCard: 'avatar-card.webp',
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
