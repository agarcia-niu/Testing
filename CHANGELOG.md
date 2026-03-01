# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [0.2.0] - 2026-03-01

### Agregado
- 43 Historias de Usuario creadas en `planning/02_user-stories/`:
  - `phase-0-fundacion/` — 11 HUs (2 FUNCIONAL, 5 TECNICA, 2 NO_FUNCIONAL, 2 UI_UX)
  - `phase-1-mvp/` — 27 HUs (8 FUNCIONAL, 8 TECNICA, 4 NO_FUNCIONAL, 7 UI_UX)
  - `phase-2-scale/` — 5 HUs (2 FUNCIONAL, 1 TECNICA, 1 NO_FUNCIONAL, 1 UI_UX)
- `planning/02_user-stories/backlog.md` — Índice maestro con tabla de resumen y mapa de dependencias Mermaid.
- `planning/04_technical-decisions/ADR-001-organizacion-archivos-hu.md` — ADR para organización de archivos HU.
- `planning/07_api-contracts/error-catalog.md` — Catálogo de errores estándar.
- HU-FUNC-FOUND-001 marcada como FINALIZADA (estructura ya creada).

### Modificado
- `CLAUDE.md` — Agregada sección de prioridades permitidas (P0/P1/P2/P3).
- `planning/02_user-stories/template-hu.md` — Prioridades actualizadas a P0/P1/P2/P3.
- `planning/09_roadmap/README.md` — Expandido con las 43 HUs por fase y epic.
- `planning/00_index.md` — Estados actualizados (user-stories, technical-decisions, roadmap → EN_PROGRESO).

---

## [0.1.0] - 2026-02-28

### Agregado
- Estructura de gobernanza del proyecto creada.
- `CLAUDE.md` con reglas del proyecto.
- Estructura de carpetas `planning/` con subdirectorios numerados.
- Plantilla base de Historias de Usuario (`template-hu.md`).
- Plantilla ADR (`ADR-template.md`).
- Placeholders para api-contracts, flow-diagrams y demás secciones.
- Carpetas `branding/` y `app/` vacías.
- `.gitignore` para React Native + Expo.
