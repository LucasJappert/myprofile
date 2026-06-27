export interface EducationItem {
  institution: string
  title: string
  period: string
  note?: string
  provider?: 'google'
  /** 1 = oro / destacado principal; 2 = plata */
  rank?: 1 | 2
  /** Tarjeta hero en la sección Formación */
  featured?: boolean
}

export const complementary: EducationItem[] = [
  {
    institution: 'Google Argentina',
    title: 'PWA Hackathon — Modern Mobile Web',
    period: '2019',
    note: '1.er puesto',
    provider: 'google',
    rank: 1,
    featured: true,
  },
  {
    institution: 'UTN FRRE',
    title: 'Scrum Master',
    period: '2019',
  },
]

export const featuredComplementary = complementary.find((item) => item.featured)

export const complementaryGrid = complementary.filter((item) => !item.featured)

export type FormalCategory = 'university' | 'courses' | 'secondary'

export interface FormalEducationItem extends EducationItem {
  category: FormalCategory
}

export const formalEducation: FormalEducationItem[] = [
  {
    institution: 'UTN',
    title: 'Tecnicatura Superior en Programación',
    period: '2014',
    category: 'university',
  },
]

const formalLabels: Record<FormalCategory, string> = {
  university: 'Universidad y tecnicatura',
  courses: 'Cursos y certificaciones',
  secondary: 'Educación secundaria',
}

export const formalEducationGroups = (['university', 'courses', 'secondary'] as const)
  .map((category) => ({
    category,
    label: formalLabels[category],
    items: formalEducation.filter((item) => item.category === category),
  }))
  .filter((group) => group.items.length > 0)
