# HU-NF-FOUND-002

| Campo | Valor |
|-------|-------|
| ID | HU-NF-FOUND-002 |
| Título | Catálogo de errores estándar (UX-friendly) |
| Tipo | NO_FUNCIONAL |
| Fase | PHASE_0_FUNDACION |
| Epic | Calidad |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario de la app,
quiero ver mensajes de error claros con acciones recomendadas,
para saber qué hacer cuando algo falla.

### Cómo debe funcionar
- Cada error interno define un mensaje humano + CTA (reintentar, login, revisar conexión).
- Catálogo documentado en `planning/07_api-contracts/error-catalog.md`.
- UI consume el catálogo para mostrar mensajes consistentes.

## Criterios de Aceptación
- [ ] `planning/07_api-contracts/error-catalog.md` creado con todos los tipos de error
- [ ] Cada error tiene: código, mensaje humano, acción recomendada (CTA)
- [ ] Catálogo usable por componentes UI
- [ ] Cubre: network, timeout, 401, 403, 404, 422, 500, offline

## Dependencias
- HU-FUNC-FOUND-001
- HU-TECH-FOUND-002 (modelo de errores HTTP)

## Impacto
- Usuarios afectados: Usuario final (experiencia ante errores)
- Módulos afectados: planning/07_api-contracts/, app/ui/ (componentes de error)

## Riesgos
- Catálogo incompleto que no cubra errores reales en producción
- Mitigación: Revisión del catálogo en cada sprint y actualización progresiva

## Telemetría
- Evento: error_shown_to_user
- Métrica: Frecuencia de cada tipo de error mostrado

## Notas
- Base para todos los flujos de error en Phase 1

---
Creada: 2026-03-01
Actualizada: 2026-03-01
