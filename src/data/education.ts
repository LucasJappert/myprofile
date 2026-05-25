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
    institution: 'Google Argentina',
    title: 'AMP Hackathon — Accelerated Mobile Pages',
    period: '2018',
    note: '2.º puesto',
    provider: 'google',
    rank: 2,
  },
  {
    institution: 'Punto Net, Córdoba',
    title: 'OWASP Top Ten 2017',
    period: '2021',
    note: 'Seguridad web',
  },
  {
    institution: 'UTN, Resistencia',
    title: 'Scrum Master — Agile Technologies',
    period: '2019',
  },
]

export const featuredComplementary = complementary.find((item) => item.featured)

export const complementaryGrid = complementary.filter((item) => !item.featured)

export const education: EducationItem[] = [
  {
    institution: 'Udemy',
    title: 'Desarrollo con Node.js — aplicación, testing y seguridad',
    period: '2023 – 2024',
  },
  {
    institution: 'UTN',
    title: 'Ingeniería Electromecánica (incompleta)',
    period: '2015',
  },
  {
    institution: 'UTN',
    title: 'Tecnicatura Superior en Programación',
    period: '2011 – 2013',
  },
  {
    institution: 'Escuela San José de Calasanz',
    title: 'Teoría y Gestión de Organizaciones, Economía',
    period: '2002 – 2006',
  },
]
