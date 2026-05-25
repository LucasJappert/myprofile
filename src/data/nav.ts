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
  { id: 'competencias', label: 'Competencias', shortLabel: 'Comp.', icon: '◇' },
  { id: 'educacion', label: 'Educación', shortLabel: 'Educ.', icon: '▤' },
  { id: 'contacto', label: 'Contacto', shortLabel: 'Contacto', icon: '✉' },
]

/** Ítems fijos en la barra inferior móvil */
export const mobileBarLinks = navLinks.filter((l) =>
  ['inicio', 'experiencia', 'proyectos', 'competencias', 'contacto'].includes(l.id),
)
