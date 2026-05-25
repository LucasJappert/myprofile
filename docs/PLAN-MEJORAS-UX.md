# Plan de mejoras UI/UX — myprofile

Sitio: [lucasjappert.github.io/myprofile](https://lucasjappert.github.io/myprofile/)  
Stack: Vue 3 + Vite + TypeScript  
Última revisión del plan: **2026-05-25** · **Sprint UX-1 cerrado**  
Referencia: auditoría post-MVP (screenshot localhost + código en `src/`)

**Cómo usar este documento:** marcá cada ítem con `[x]` cuando esté implementado y commiteado en `dev` (o `main` si ya está publicado). Podés agregar fecha y commit opcional al lado.

---

## Resumen de estado

| Prioridad | Total ítems | Hechos (UX-1) |
|-----------|-------------|---------------|
| Alta      | 7           | 6 (+1 opcional pendiente) |
| Media     | 7           | 3 parciales |
| Baja      | 5           | 0 → UX-4 |
| Móvil     | 4           | 2 |
| **Sprint UX-1** | —       | **Cerrado** |

---

## Lo que ya funciona (no requiere cambio urgente)

- [x] Identidad de color celeste / agua / verde definida en tokens CSS
- [x] Hero con nombre, rol, tagline, CTAs y foto
- [x] Timeline de experiencia con rol actual destacado
- [x] Skills por chips (sin barras de porcentaje)
- [x] Tema oscuro coherente
- [x] Nav inferior en móvil + `prefers-reduced-motion` básico
- [x] Sitio en español (contenido principal)
- [x] Build Vue + Vite + deploy GitHub Pages configurado

---

## Prioridad alta

Impacto fuerte en percepción profesional, usabilidad o accesibilidad. Conviene abordar primero.

### 1. Ritmo visual — evitar “todas las secciones son la misma card”

- [ ] Variar layouts por sección (hero full-bleed; experiencia sin card contenedora redundante; etc.)
- [ ] Reducir bordes/glow repetidos en cada bloque
- [ ] Definir 2–3 patrones de superficie (plana, card, destacado) y usarlos de forma consistente

**Archivos probables:** `src/components/*Section.vue`, `src/assets/main.css`

---

### 2. Densidad de texto en Experiencia

- [x] Bullets de Agroideas visibles (6 ítems, sin colapsar — preferencia del autor)
- [x] Texto APIX corregido (sin “Maizplus”)
- [x] Agrupar roles antiguos bajo “Experiencia anterior” colapsable (CREDISAN, Senado)

**Archivos probables:** `src/data/experience.ts`, `src/components/ExperienceSection.vue`

---

### 3. Contraste y accesibilidad (WCAG)

- [x] Subir luminosidad de `--text-muted` (objetivo ≥ 4.5:1 sobre fondo para texto body)
- [x] Revisar contraste de chips (paleta celeste/agua/verde sobre `--bg-card`)
- [x] Añadir `:focus-visible` claro en links, botones y nav (outline 2px celeste)
- [ ] Validar con Lighthouse Accessibility o axe DevTools

**Archivos probables:** `src/assets/main.css`, componentes con `.btn` y `.chip`

---

### 4. Navegación móvil completa

- [x] Incluir acceso a Perfil y Educación (drawer vía botón “Más” + menú hamburguesa)
- [x] Implementar scroll-spy: resaltar sección activa en nav
- [x] Asegurar área táctil mínima 44×44px en ítems de navegación

**Archivos probables:** `src/components/SiteNav.vue`, `src/components/MobileNav.vue`, lógica en `App.vue`

---

### 5. Consistencia de idioma (español)

- [x] Cambiar “Skills” → “Competencias” o “Habilidades” en nav, `id` de sección y título
- [x] Revisar labels sueltos en inglés (footer, intereses)
- [x] Copy del hero alineado (`profile.ts` — rol + tagline)

**Archivos probables:** `src/data/profile.ts`, `SiteNav.vue`, `MobileNav.vue`, `SkillsSection.vue`

---

### 6. Foto de perfil vs. estética neón

- [ ] Decidir tratamiento: recorte, fondo oscuro, duotone celeste/rosa, o reemplazo por avatar/ilustración
- [ ] Ajustar marco del hero (sombra, proporción, `object-position`)
- [ ] Optimizar peso de imagen (WebP/AVIF en `public/`)

**Archivos probables:** `public/profile.png`, `src/components/HeroSection.vue`

---

### 7. Proyectos con evidencia visual

- [ ] Añadir thumbnail o captura por proyecto destacado
- [ ] Badge “En producción” / “Open source” donde aplique
- [ ] Mejorar jerarquía en cards (título → descripción → stack → link)
- [ ] Reutilizar imágenes de `legacy/images/portfolios/` si sirven, o nuevas capturas

**Archivos probables:** `src/data/projects.ts`, `src/components/ProjectsSection.vue`, `public/projects/`

---

## Prioridad media

Pulido profesional; mejora percepción sin rehacer la estructura.

### 8. Jerarquía tipográfica

- [x] Definir escala tipográfica (`--text-base`, `--text-sm`, `--text-xs`)
- [x] Aumentar tamaños globales y `line-height` en párrafos largos
- [x] Fechas en `--agua` y tamaño `--text-sm` en timeline/educación

**Archivos probables:** `src/assets/main.css`, componentes de sección

---

### 9. Uso moderado de gradientes

- [ ] Reservar gradiente de marca para: nombre en hero + botón primario
- [ ] Títulos de sección: celeste sólido o blanco (sin gradiente)
- [ ] Fechas / acentos: rosa sólido; violeta solo en transiciones puntuales

**Archivos probables:** `src/assets/main.css`, `.section-title`, timeline, chips

---

### 10. CTAs y jerarquía de acciones

- [x] Hero: primario “Descargar CV”, secundario “Ver proyectos” o LinkedIn
- [x] Hero: primario + secundario “Ver proyectos” (ghost)
- [ ] Evitar duplicar mismos CTAs sin motivo (hero vs contacto: OK si contacto suma email + redes)

**Archivos probables:** `HeroSection.vue`, `ContactSection.vue`, `main.css`

---

### 11. Sección Contacto más útil

- [ ] Botón “Copiar email” con feedback (toast o texto “Copiado”)
- [ ] Copy más específico (agrotech, APIs, IA aplicada)
- [ ] Iconos SVG para LinkedIn / GitHub (accesibles, con `aria-label`)

**Archivos probables:** `ContactSection.vue`, `public/icons.svg` o componentes icono

---

### 12. Skills — escaneabilidad

- [ ] Mostrar 6–8 skills top + enlace “ver todas” o expandir
- [ ] O codificar por color: celeste (frontend), rosa (IA), violeta (DevOps)
- [ ] Reducir tamaño de grid en móvil (1 columna)

**Archivos probables:** `SkillsSection.vue`, `src/data/skills.ts`

---

### 13. Destacar formación complementaria (hackathons)

- [ ] Badges visibles para PWA Hackathon (1.er puesto) y AMP (2.º puesto)
- [ ] Separar visualmente “Complementaria” vs “Educación formal”
- [ ] Opcional: icono trofeo o pill destacada

**Archivos probables:** `EducationSection.vue`, `src/data/education.ts`

---

### 14. Footer con más presencia de marca

- [ ] Links rápidos (LinkedIn, GitHub, CV)
- [ ] Año dinámico + línea corta de stack (“Vue 3 + Vite”)
- [ ] Ajustar glow inferior para cierre visual sin distraer

**Archivos probables:** `SiteFooter.vue`

---

## Prioridad baja

Nice-to-have e innovación; después de alta y media.

### 15. Micro-interacciones

- [ ] Scroll reveal suave en entradas de sección (respetando `prefers-reduced-motion`)
- [ ] Hover sutil en cards de proyectos y timeline
- [ ] Transición suave al expandir detalle de experiencia

---

### 16. Indicador de progreso de scroll

- [ ] Barra fina superior (gradiente celeste → rosa) según `scrollY`
- [ ] Opcional: índice lateral en desktop

---

### 17. Modo claro (opcional)

- [ ] Definir tokens light
- [ ] Toggle en nav con persistencia `localStorage`
- [ ] Solo si aporta a la marca; no obligatorio

---

### 18. Open Graph y redes sociales

- [ ] Imagen OG estática generada (hero + nombre + gradiente)
- [ ] Actualizar `meta` en `index.html` con descripción alineada al CV
- [ ] Probar preview en LinkedIn Post Inspector

**Archivos probables:** `index.html`, `public/og-image.png`

---

### 19. Sincronización contenido ↔ CV

- [ ] Documentar flujo: editar `my-cv.md` → actualizar `src/data/*.ts`
- [ ] Opcional futuro: script que parsee MD y genere JSON/TS
- [ ] Verificar rol público, fechas y proyectos vs `Profile.pdf`

**Archivos probables:** `README.md`, repo `my-cv`

---

## Móvil (transversal)

Ítems específicos de viewport pequeño; pueden hacerse dentro de los puntos anteriores.

- [x] Colapsar Agroideas por defecto en `< 768px` (vía `<details>` cerrado)
- [ ] Validar `padding-bottom` del `main` con barra inferior + `safe-area-inset`
- [ ] Hero móvil: texto primero o foto más compacta (orden en grid)
- [ ] Probar en iOS Safari (100dvh, barra de URL, scroll)

---

## Sprints sugeridos (orden de implementación)

### Sprint UX-1 — Fundamentos ✅ CERRADO

- [x] Rebrand celeste + agua + verde
- [x] Ítems **2**, **3**, **4**, **5**, **8** parcial, **10** parcial
- [x] Nav activo (subrayado), drawer Escape + focus trap, experiencia anterior colapsable

### Sprint UX-2 — Visual y proyectos (2–3 sesiones)

- [ ] Ítems **1**, **6**, **7** (ritmo visual, foto, thumbnails)
- [x] Ítem **9** parcial (títulos de sección en celeste sólido; gradiente en hero/CTA)

### Sprint UX-3 — Pulido y marca (1–2 sesiones)

- [ ] Ítems **8**, **10**, **11**, **12**, **13**, **14**
- [ ] Ítems móvil pendientes

### Sprint UX-4 — Extra (opcional)

- [ ] Ítems **15**–**19**

---

## Registro de cambios

| Fecha       | Sprint / ítem | Commit / notas |
|-------------|---------------|----------------|
| 2026-05-25  | Plan creado   | Basado en auditoría chat + screenshot local |
| 2026-05-25  | Sprint UX-1 A+C | Competencias, contraste, focus, hero CTA, Agroideas `<details>` |
| 2026-05-25  | Sprint UX-1 B   | Scroll-spy, drawer móvil, tipografías, APIX, bullets visibles |
| 2026-05-25  | Sprint UX-1 cierre | Paleta verde, nav activo, a11y drawer, exp. anterior, footer ES |

---

## Notas

- Contenido fuente de verdad del CV: `/home/ljappert/my-repos/my-cv/my-cv.md`
- Sitio legacy de referencia: `legacy/`
- Publicación producción: merge `dev` → `main` + GitHub Actions Pages
