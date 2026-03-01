# HU-UI-FOUND-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-FOUND-001 |
| Título | Estados globales UI (loading/error/offline) consistentes |
| Tipo | UI_UX |
| Fase | PHASE_0_FUNDACION |
| Epic | UI Base |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario de la app,
quiero ver estados de carga, error y offline de forma consistente en toda la app,
para entender siempre qué está pasando.

### Cómo debe funcionar
- Loading: skeleton/spinner consistente.
- Offline: banner no intrusivo indicando modo sin conexión.
- Error: mensaje humano del catálogo de errores + botón reintentar.

## Criterios de Aceptación
- [ ] Componente Loading (skeleton/spinner) creado y reutilizable
- [ ] Componente OfflineBanner creado (no intrusivo)
- [ ] Componente ErrorView creado (mensaje + CTA reintentar)
- [ ] Componentes usados en pantalla placeholder de demostración

## Dependencias
- HU-TECH-FOUND-001
- HU-NF-FOUND-002 (catálogo de errores para mensajes)

## Impacto
- Usuarios afectados: Usuario final (experiencia visual consistente)
- Módulos afectados: app/ui/components/

## Riesgos
- Inconsistencia visual si no se definen tokens de diseño (colores, espaciado)
- Mitigación: Definir design tokens mínimos antes de crear componentes

## Telemetría
- Evento: offline_banner_shown, error_view_shown, loading_timeout
- Métrica: Tiempo promedio en estado loading, frecuencia de offline banner

## Notas
- Base para todas las pantallas de Phase 1

---
Creada: 2026-03-01
Actualizada: 2026-03-01
