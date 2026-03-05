# ADR-001: Organización de Archivos de Historias de Usuario

## Estado
ACEPTADA

## Fecha
2026-03-01

## Contexto
El proyecto requiere materializar 43 Historias de Usuario en el directorio `planning/02_user-stories/`. Se necesita definir cómo organizar estos archivos para maximizar trazabilidad, facilitar trabajo concurrente y mantener el principio de Fuente Única de Verdad.

## Opciones Consideradas
1. **Un archivo por HU con subdirectorios por fase** — 43 archivos individuales organizados en `phase-0-fundacion/`, `phase-1-mvp/`, `phase-2-scale/`, más un `backlog.md` como índice maestro.
2. **Archivos agrupados por fase+tipo** — 12 archivos (ej: `phase-0-funcional.md` con varias HUs dentro). Menos archivos pero diffs más ruidosos.
3. **Un archivo por fase** — 3 archivos grandes. Mínimo de archivos pero difícil rastrear cambios individuales y alto riesgo de conflictos en merge.

## Decisión
Se elige la **Opción 1: Un archivo por HU con subdirectorios por fase**.

Razones:
- Cada HU tiene historial git independiente, facilitando auditoría de cambios de estado.
- Trabajo concurrente sin conflictos de merge (cada persona edita archivos distintos).
- Cumple con CLAUDE.md: "Toda HU debe reflejar su estado real" — cambios atómicos por HU.
- El `backlog.md` proporciona vista panorámica sin sacrificar granularidad.
- 43 archivos es manejable; si crece a 100+ en Phase 2, la estructura escala naturalmente.

## Consecuencias

### Positivas
- Máxima trazabilidad git por HU individual
- Sin conflictos de merge en trabajo paralelo
- Búsqueda rápida con `grep`/`glob` por archivo
- Escalabilidad natural

### Negativas
- Mayor cantidad de archivos en el repositorio
- Requiere mantener `backlog.md` sincronizado como índice
- Navegación requiere entrar a subdirectorios

## Referencias
- `CLAUDE.md` — Sección 2: Gestión de Historias de Usuario
- `planning/02_user-stories/template-hu.md` — Plantilla canónica

## HUs Relacionadas
- HU-FUNC-FOUND-001 (estructura base del repositorio)
- HU-FUNC-FOUND-002 (roadmap por fases)
