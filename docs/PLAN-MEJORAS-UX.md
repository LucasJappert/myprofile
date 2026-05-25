# Plan de mejoras UI/UX — myprofile

Sitio: [lucasjappert.github.io/myprofile](https://lucasjappert.github.io/myprofile/)  
Stack: Vue 3 + Vite + TypeScript  
Última revisión del plan: **2026-05-25** · **Sprint UX-3 implementado (pendiente commit / revisión)**  
Referencia: auditoría post-MVP + screenshot localhost

**Cómo usar este documento:** marcá cada ítem con `[x]` cuando esté implementado y commiteado en `dev` (o `main` si ya está publicado). Podés agregar fecha y commit opcional al lado.

---

## Resumen de estado

| Prioridad | Total ítems | Estado |
|-----------|-------------|--------|
| Alta      | 7           | Completo (Lighthouse manual pendiente) |
| Media     | 7           | Mayoría hecha en UX-2 / UX-3 |
| Baja      | 5           | Pendiente → **UX-4** |
| Móvil     | 4           | 3/4 en UX-3 (iOS Safari manual) |
| **Sprint UX-3** | —       | **Implementado, sin commit** |

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

### 1. Ritmo visual — evitar “todas las secciones son la misma card”

- [x] Variar layouts por sección (about plain, skills tiles, educación lista, contacto accent)
- [x] Hover solo en cards de proyectos (`card--hover`)
- [x] Patrones `surface--plain`, `surface--muted`, `surface--tile`, `surface--accent`

---

### 2. Densidad de texto en Experiencia

- [x] Bullets de Agroideas visibles (6 ítems)
- [x] Texto APIX corregido (sin “Maizplus”)
- [x] Agrupar roles antiguos bajo “Experiencia anterior” colapsable
- [x] Párrafo introductorio bajo el título (UX-3)

---

### 3. Contraste y accesibilidad (WCAG)

- [x] Subir luminosidad de `--text-muted`
- [x] Revisar contraste de chips (UX-3: tonos más legibles)
- [x] Añadir `:focus-visible` claro en links, botones y nav
- [ ] Validar con Lighthouse Accessibility o axe DevTools (manual)

---

### 4. Navegación móvil completa

- [x] Drawer vía botón “Más” + menú hamburguesa
- [x] Scroll-spy: resaltar sección activa
- [x] Área táctil mínima 44×44px
- [x] Enlace drawer “Logros Google” → `#educacion-google` (UX-3)

---

### 5. Consistencia de idioma (español)

- [x] “Competencias” en nav y sección
- [x] Labels en español (footer, copy)
- [x] Hero alineado a `profile.ts`

---

### 6. Foto de perfil vs. estética neón

- [x] Ilustración `profile-image.jpeg`
- [x] `object-fit: cover` en marco hero (sin bandas laterales)
- [ ] Optimizar peso (WebP/AVIF) — **UX-4**

---

### 7. Proyectos con evidencia visual

- [x] Thumbnails + badges
- [x] Bento: fila 1 (70/30), fila 2 (3 cols), fila 3 overlay ancho completo
- [x] Altura máx. ~500px fila destacada; overlay imagen proporcional
- [x] Placeholder visual **cams / onvix** (UX-3)
- [x] `object-position` afinado en **sprint-it** (UX-3)

---

## Prioridad media

### 8. Jerarquía tipográfica

- [x] Escala tipográfica en tokens
- [x] Tamaños y `line-height` en párrafos largos
- [x] Fechas en timeline/educación

---

### 9. Uso moderado de gradientes

- [x] Gradiente en nombre hero + botón primario
- [x] Títulos de sección: celeste sólido
- [x] Chips y fechas con color sólido de marca

---

### 10. CTAs y jerarquía de acciones

- [x] Hero: CV primario, proyectos secundario
- [x] Chip credencial Google → Formación (UX-3)
- [x] Contacto: “Enviar email” primario + copiar email (UX-3)

---

### 11. Sección Contacto más útil

- [x] Botón “Copiar email” con feedback “Copiado ✓”
- [x] Email visible + `mailto`
- [ ] Copy más específico agrotech (opcional)
- [ ] Iconos SVG LinkedIn / GitHub — **UX-4**

---

### 12. Skills — escaneabilidad

- [x] Destacar grupos **IA y automatización** y **Gestión y liderazgo** (`highlight`)
- [ ] Mostrar 6–8 top + “ver todas” — **UX-4** (opcional)
- [x] Grid 1 col móvil / 2 tablet / 4 desktop

---

### 13. Destacar formación complementaria (hackathons)

- [x] Tarjeta featured PWA 1.er puesto + chips Google
- [x] AMP 2.º con estilo `edu-item--google`
- [x] Educación formal agrupada: universidad / cursos / secundaria (UX-3)

---

### 14. Footer con más presencia de marca

- [x] Links rápidos (LinkedIn, GitHub, CV, Logros Google)
- [x] Intereses movidos desde Sobre mí al footer
- [x] Año dinámico + stack en línea de copyright

---

## Prioridad baja → Sprint UX-4

### 15. Micro-interacciones

- [ ] Scroll reveal suave (con `prefers-reduced-motion`)
- [ ] Hover sutil en timeline
- [ ] Transición al expandir experiencia anterior

### 16. Indicador de progreso de scroll

- [ ] Barra superior según `scrollY`

### 17. Modo claro (opcional)

- [ ] Tokens light + toggle

### 18. Open Graph y redes sociales

- [ ] `og-image.png` + meta en `index.html`

### 19. Sincronización contenido ↔ CV

- [ ] Flujo documentado `my-cv.md` → `src/data/*.ts`

---

## Móvil (transversal)

- [x] Experiencia anterior colapsable
- [x] `padding-bottom` main + `safe-area-inset-bottom` (UX-3)
- [x] Hero móvil: texto primero, foto más compacta, chip corto (UX-3)
- [ ] Prueba manual iOS Safari

---

## Sprints

### Sprint UX-1 — Fundamentos ✅ CERRADO

### Sprint UX-2 — Visual y proyectos ✅ CERRADO

- Thumbnails, bento proyectos, `profile-image.jpeg`, superficies variadas

### Sprint UX-3 — Pulido y marca ✅ IMPLEMENTADO (revisión local, sin commit)

- [x] Proyectos: placeholder cams, sprint-it crop, overlay layout horizontal desktop
- [x] Hero: chip Google bajo rol, label corto móvil, tagline acortado, cover foto
- [x] Formación: featured Google + grupos formales
- [x] Competencias: highlight IA + Gestión
- [x] Experiencia: intro
- [x] Contacto: copiar email
- [x] Footer: links + intereses
- [x] Nav drawer: Logros Google
- [x] Contraste chips / `--text-muted`

**Commit previo relacionado (parcial UX-3):** `90cffa3` — bento + Google destacado inicial

### Sprint UX-4 — Extra (opcional)

- Ítems **15**–**19**, Lighthouse, OG, WebP

---

## Registro de cambios

| Fecha       | Sprint / ítem | Commit / notas |
|-------------|---------------|----------------|
| 2026-05-25  | Plan creado   | Basado en auditoría chat + screenshot local |
| 2026-05-25  | Sprint UX-1   | Nav, contraste, experiencia, español |
| 2026-05-25  | Sprint UX-2   | Thumbnails, Moo Raiders, ritmo visual |
| 2026-05-25  | Post UX-2     | `90cffa3` — bento 70/30/trio/wide, hero Google chip, overlay proporcional |
| 2026-05-25  | Sprint UX-3   | Pendiente commit — pulido auditoría (ver lista arriba) |

---

## Notas

- Contenido fuente de verdad del CV: `/home/ljappert/my-repos/my-cv/my-cv.md`
- Sitio legacy de referencia: `legacy/`
- Publicación producción: merge `dev` → `main` + GitHub Actions Pages
