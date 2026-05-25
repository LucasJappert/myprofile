export interface NavLink {
  id: string
  label: string
  shortLabel: string
  icon: string
}

export const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Inicio', shortLabel: 'Inicio', icon: '⌂' },
  { id: 'perfil', label: 'Perfil', shortLabel: 'Perfil', icon: '◎' },
  { id: 'experiencia', label: 'Experiencia', shortLabel: 'Exp.', icon: '◆' },
  { id: 'proyectos', label: 'Proyectos', shortLabel: 'Proy.', icon: '▣' },
  { id: 'stack', label: 'Stack técnico', shortLabel: 'Stack', icon: '◇' },
  { id: 'educacion', label: 'Educación', shortLabel: 'Educ.', icon: '▤' },
  { id: 'contacto', label: 'Contacto', shortLabel: 'Contacto', icon: '✉' },
]

/** Accesos rápidos móvil (Inicio = marca LJ en el header) */
export const mobileQuickLinks = navLinks.filter((l) =>
  ['experiencia', 'proyectos', 'stack', 'contacto'].includes(l.id),
)

/** Solo en el panel «Más» (evita duplicar tabs del header) */
export const mobileDrawerLinks = navLinks.filter(
  (l) => !mobileQuickLinks.some((q) => q.id === l.id) && l.id !== 'inicio',
)

/** @deprecated Usar mobileQuickLinks; se mantiene por compatibilidad en docs */
export const mobileBarLinks = navLinks.filter((l) =>
  ['inicio', 'experiencia', 'proyectos', 'stack', 'contacto'].includes(l.id),
)

/** Enlace extra en drawer (ancla dentro de Formación) */
export const navHighlightLink = {
  href: '#educacion-google',
  label: 'Logros Google',
  icon: '★',
  /** Para marcar activo cuando la sección educacion está visible */
  activeSectionId: 'educacion',
} as const
