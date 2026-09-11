import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createServer } from 'vite'
import { chromium } from 'playwright'

const root = fileURLToPath(new URL('../', import.meta.url))
const server = await createServer({ root, server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' })
let data
try {
  const [profile, experience, projects, skills, education] = await Promise.all([
    server.ssrLoadModule('/src/data/profile.ts'),
    server.ssrLoadModule('/src/data/experience.ts'),
    server.ssrLoadModule('/src/data/projects.ts'),
    server.ssrLoadModule('/src/data/skills.ts'),
    server.ssrLoadModule('/src/data/education.ts'),
  ])
  data = { ...profile, ...experience, ...projects, ...skills, ...education }
} finally {
  await server.close()
}

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const list = (values) => `<ul>${values.map((value) => `<li>${escape(value)}</li>`).join('')}</ul>`
const { profile, experiencePrimary, experienceEarlier, projects, skillGroups, complementary, formalEducation } = data
const selectedProjects = projects.filter((p) => ['DayLog', 'Lucas AI · Servicios personales', 'Memorable Summaries', 'GanasDeSaber', 'Meeting Recorder', 'SoftAlign', 'Nova RPG', 'Moo Raiders'].includes(p.name))
const jobHtml = experiencePrimary.map((job) => `<article class="job"><div class="job-heading"><h3>${escape(job.role)}</h3><span>${escape(job.period)}</span></div><p class="company">${escape(job.company)}</p><p>${escape(job.summary)}</p>${job.highlights ? list(job.highlights) : ''}</article>`).join('')
const projectHtml = selectedProjects.map((p) => `<article class="project"><h3>${p.href ? `<a href="${escape(p.href)}">${escape(p.name)}</a>` : escape(p.name)}</h3><p class="meta">${escape(p.period)}</p><p>${escape(p.description)}</p><p class="tech">${escape(p.stack.join(' · '))}</p></article>`).join('')
const skillHtml = skillGroups.filter((g) => ['Lenguajes', 'Backend', 'Datos e infra', 'Desarrollo con agentes', 'Gestión y liderazgo'].includes(g.title)).map((g) => `<div class="skill"><h3>${escape(g.title)}</h3><p>${escape(g.items.slice(0, 7).join(' · '))}</p></div>`).join('')
const educationHtml = [...formalEducation, ...complementary].map((e) => `<p><strong>${escape(e.title)}</strong><br>${escape(e.institution)} · ${escape(e.period)}${e.note ? ` · ${escape(e.note)}` : ''}</p>`).join('')
const substitutions = {
  NAME: escape(profile.name), ROLE: escape(profile.role), TAGLINE: escape(profile.tagline),
  EMAIL: escape(profile.email), LOCATION: escape(profile.location),
  ABOUT: escape(profile.about[0]), EXPERIENCE: jobHtml, PROJECTS: projectHtml,
  SKILLS: skillHtml, EDUCATION: educationHtml,
}
let html = await readFile(path.join(root, 'docs/cv-template.html'), 'utf8')
html = html.replace(/\{\{([A-Z]+)\}\}/g, (_, key) => {
  if (!(key in substitutions)) throw new Error(`Unknown template token: ${key}`)
  return substitutions[key]
})
await mkdir(path.join(root, 'tmp'), { recursive: true })
const htmlPath = path.join(root, 'tmp/cv.html')
await writeFile(htmlPath, html)
const browser = await chromium.launch({ headless: true, channel: 'chromium', executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined })
try {
  const page = await browser.newPage()
  await page.goto(new URL(`file://${htmlPath}`).href)
  await page.evaluate(() => document.fonts.ready)
  const overflow = await page.locator('.page').evaluateAll((pages) => pages.map((p) => ({ height: p.clientHeight, content: p.scrollHeight })).filter((p) => p.content > p.height + 1))
  if (overflow.length) throw new Error(`CV content overflows page: ${JSON.stringify(overflow)}`)
  const footerOverlap = await page.locator('.page').evaluateAll((pages) => pages.some((p) => {
    const footerTop = p.querySelector('footer').getBoundingClientRect().top
    return [...p.children].filter((child) => child.tagName !== 'FOOTER').some((child) => child.getBoundingClientRect().bottom > footerTop - 8)
  }))
  if (footerOverlap) throw new Error('CV content overlaps a footer')
  await page.pdf({ path: path.join(root, 'public/Lucas-Jappert-CV.pdf'), preferCSSPageSize: true, printBackground: true })
} finally {
  await browser.close()
}

const md = [
  `# ${profile.name}`, `**${profile.role}**`, profile.location,
  `Email: ${profile.email} · [Web](https://lucasjappert.github.io/myprofile/) · [LinkedIn](https://www.linkedin.com/in/lucasjappert/) · [GitHub](https://github.com/LucasJappert)`,
  '## Perfil', ...profile.about,
  '## Experiencia', ...[...experiencePrimary, ...experienceEarlier].map((j) => `### ${j.company}\n\n**${j.role}** · ${j.period}\n\n${j.summary}${j.highlights ? '\n\n' + j.highlights.map((h) => '- ' + h).join('\n') : ''}`),
  '## Proyectos', ...projects.map((p) => `### ${p.name}\n\n${p.period}\n\n${p.description}\n\n${p.stack.join(' · ')}${p.href ? '\n\n[Ver proyecto](' + p.href + ')' : ''}`),
  '## Competencias', ...skillGroups.map((g) => `### ${g.title}\n\n${g.items.join(' · ')}`),
  '## Formación', ...[...formalEducation, ...complementary].map((e) => `- ${e.title} · ${e.institution} · ${e.period}${e.note ? ' · ' + e.note : ''}`),
  '*Contenido sincronizado con src/data/ de myprofile. Actualización editorial: septiembre de 2026.*',
].join('\n\n') + '\n'
await writeFile(path.join(root, 'docs/cv.md'), md)
const markdownOutput = process.argv.indexOf('--markdown-output')
if (markdownOutput !== -1) {
  if (!process.argv[markdownOutput + 1]) throw new Error('Missing --markdown-output path')
  await writeFile(path.resolve(root, process.argv[markdownOutput + 1]), md)
}
console.log('CV generado: public/Lucas-Jappert-CV.pdf y docs/cv.md, desde src/data/.')
