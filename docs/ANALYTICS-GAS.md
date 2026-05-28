# Analytics — mismo Sheet y mismo Apps Script que la landing

El perfil usa la **misma URL `/exec`** que *Ingeniero Aumentado*. El front manda `sheet_tab: "MyProfile"` y el script escribe en esa pestaña. La landing sigue yendo a **Eventos** (sin cambios en su JS).

## Pestañas en la Sheet

| Pestaña | Origen |
|---------|--------|
| `Aplicaciones` | Formulario landing |
| `Eventos` | Visitas / funnel landing |
| `MyProfile` | Visitas del sitio de perfil (GitHub Pages) |

## Script unificado (reemplazar el actual en Apps Script)

Pegá esto en **Extensiones → Apps Script** de la Sheet que ya usás (`SHEET_ID` abajo). Es tu script actual + routing por `sheet_tab`.

```javascript
/**
 * Ingeniero Aumentado + MyProfile — formulario, eventos landing y eventos perfil
 *
 * 1. Misma Google Sheet (SHEET_ID).
 * 2. Implementar como app web → copiar URL /exec.
 * 3. Landing: js/config.js → FORM_SUBMIT_URL
 * 4. MyProfile: VITE_ANALYTICS_URL (misma URL /exec)
 */

var SHEET_ID = "1Xom_jpFm3C6B8adqyrWvMiYt_J-R2TC3MpaspHuXqZ8";
var NOTIFY_EMAIL = "ljappert@agroideassa.com";

var TAB_APPLICATIONS = "Aplicaciones";
var TAB_EVENTS = "Eventos";
var TAB_MYPROFILE = "MyProfile";

function doPost(e) {
  try {
    var body = parseBody_(e);
    if (!body || typeof body !== "object") {
      return jsonResponse_({ ok: false, error: "empty_body" });
    }

    if (body.type === "event") {
      return handleEvent_(body);
    }

    return handleApplication_(body);
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var p = e && e.parameter ? e.parameter : {};
  if (p.type === "event" && p.event) {
    return handleEvent_({
      type: "event",
      sheet_tab: p.sheet_tab || "",
      event: p.event,
      section: p.section || "",
      page: p.page || "",
      page_path: p.page_path || "",
      session_id: p.session_id || "",
      utm_source: p.utm_source || "",
      utm_medium: p.utm_medium || "",
      utm_campaign: p.utm_campaign || "",
      utm_content: p.utm_content || "",
      utm_term: p.utm_term || "",
    });
  }
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "ingeniero-aumentado-form", version: 4 })
  ).setMimeType(ContentService.MimeType.JSON);
}

function handleApplication_(data) {
  if (isHoneypot_(data)) {
    return jsonResponse_({ ok: true, skipped: "honeypot" });
  }

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = getOrCreateSheet_(ss, TAB_APPLICATIONS, APPLICATION_HEADERS_);
  ensureHeaders_(sheet, APPLICATION_HEADERS_);

  var semaforo = calcSemaforo_(data);
  var row = [
    new Date(),
    semaforo,
    "",
    clean_(data.nombre),
    clean_(data.whatsapp),
    clean_(data.pais),
    clean_(data.experiencia),
    clean_(data.areas || data.tecnologias),
    clean_(data.ia_codear),
    clean_(data.costaria),
    clean_(data.github),
    clean_(data.email),
    clean_(data.utm_source),
    clean_(data.utm_medium),
    clean_(data.utm_campaign),
    clean_(data.utm_content),
    clean_(data.utm_term),
  ];

  sheet.appendRow(row);

  if (NOTIFY_EMAIL) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: semaforo + " Nueva aplicación — " + clean_(data.nombre),
        body: formatApplicationEmail_(data, semaforo),
      });
    } catch (mailErr) {
      /* no fallar el POST si el mail falla */
    }
  }

  return jsonResponse_({ ok: true, semaforo: semaforo });
}

function handleEvent_(data) {
  var tabName = resolveEventTab_(data);
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = getOrCreateSheet_(ss, tabName, EVENT_HEADERS_);
  ensureHeaders_(sheet, EVENT_HEADERS_);

  sheet.appendRow([
    new Date(),
    clean_(data.event),
    clean_(data.section),
    clean_(data.page),
    clean_(data.page_path),
    clean_(data.session_id),
    clean_(data.utm_source),
    clean_(data.utm_medium),
    clean_(data.utm_campaign),
    clean_(data.utm_content),
    clean_(data.utm_term),
  ]);

  return jsonResponse_({ ok: true, sheet_tab: tabName });
}

/** MyProfile manda sheet_tab explícito; la landing sigue en Eventos. */
function resolveEventTab_(data) {
  var tab = clean_(data.sheet_tab);
  if (tab === TAB_MYPROFILE) return TAB_MYPROFILE;
  return TAB_EVENTS;
}

var APPLICATION_HEADERS_ = [
  "timestamp",
  "semaforo",
  "notas",
  "nombre",
  "whatsapp",
  "pais",
  "experiencia",
  "areas",
  "ia_codear",
  "costaria",
  "github",
  "email",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

var EVENT_HEADERS_ = [
  "timestamp",
  "event",
  "section",
  "page",
  "page_path",
  "session_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

function calcSemaforo_(data) {
  var exp = clean_(data.experiencia);
  var areas = clean_(data.areas || data.tecnologias).toLowerCase();
  var costaria = clean_(data.costaria);
  var github = clean_(data.github);

  var shortExp = exp === "nada" || exp === "menos-6m";
  var longExp = exp === "6m-2a" || exp === "2-5a" || exp === "5a-mas";
  var onlyNinguna =
    areas.indexOf("ninguna") !== -1 &&
    areas.indexOf("frontend") === -1 &&
    areas.indexOf("backend") === -1 &&
    areas.indexOf("full stack") === -1 &&
    areas.indexOf("base de datos") === -1 &&
    areas.indexOf("devops") === -1;
  var hasSql = areas.indexOf("base de datos") !== -1;
  var hasGit = github.length > 8;
  var weakAnswer = costaria.length < 25;

  if (shortExp && onlyNinguna && weakAnswer) {
    return "🔴";
  }
  if (longExp && (hasSql || hasGit) && costaria.length >= 25) {
    return "🟢";
  }
  return "🟡";
}

function formatApplicationEmail_(data, semaforo) {
  return [
    "Semáforo: " + semaforo,
    "",
    "Nombre: " + clean_(data.nombre),
    "WhatsApp: " + clean_(data.whatsapp),
    "País: " + clean_(data.pais),
    "Experiencia: " + clean_(data.experiencia),
    "Áreas: " + clean_(data.areas || data.tecnologias),
    "IA: " + clean_(data.ia_codear),
    "",
    "¿Qué le costaría?:",
    clean_(data.costaria),
    "",
    "GitHub: " + (clean_(data.github) || "(no)"),
    "Email: " + (clean_(data.email) || "(no)"),
    "",
    "UTM: " +
      [
        clean_(data.utm_source),
        clean_(data.utm_medium),
        clean_(data.utm_campaign),
        clean_(data.utm_content),
      ]
        .filter(Boolean)
        .join(" / "),
  ].join("\n");
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return null;
  }
  return JSON.parse(e.postData.contents);
}

function isHoneypot_(data) {
  return clean_(data.website).length > 0;
}

function clean_(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).trim();
}

function getOrCreateSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() > 0) {
    return;
  }
  sheet.appendRow(headers);
  sheet.setFrozenRows(1);
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

## Después de pegar el script

1. **Guardar** el proyecto Apps Script.
2. **Implementar → Administrar implementaciones → editar (lápiz) → Nueva versión → Implementar**  
   (así la URL `/exec` existente sigue igual; no hace falta cambiar config en la landing).
3. La pestaña **MyProfile** se crea sola al llegar el primer evento del perfil.

## Configurar MyProfile

La URL de producción va en **`.env.production`** (commiteada; misma `/exec` que `FORM_SUBMIT_URL` de la landing). Vite la incluye en el build de GitHub Pages automáticamente.

Para probar en localhost, copiá `.env.example` → `.env.local`:

```env
VITE_ANALYTICS_URL=https://script.google.com/macros/s/TU_DEPLOYMENT/exec
VITE_ANALYTICS_ALLOW_DEV=true
```

## Eventos del perfil (pestaña MyProfile)

| event | section | Cuándo |
|-------|---------|--------|
| `page_view` | `profile` | Carga |
| `section_view` | id de sección | Scroll (~20% visible) |
| `contact_email_click` | sección | Click `mailto:` |
| `email_copy` | `contacto` | Copiar email |
| `cv_download` | sección | PDF del CV |
| `outbound_click` | `seccion:dominio` | Links externos |

La landing **no** manda `sheet_tab` → el script usa **Eventos** como siempre. No hace falta tocar `landing-events.js`.
