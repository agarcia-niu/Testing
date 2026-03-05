# HU-NF-SCALE-001

| Campo | Valor |
|-------|-------|
| ID | HU-NF-SCALE-001 |
| Título | Hardening de performance (catálogo + imágenes) |
| Tipo | NO_FUNCIONAL |
| Fase | PHASE_2_SCALE |
| Epic | Performance |
| Estado | PENDIENTE |
| Prioridad | P1 |

## Descripción
Como usuario con dispositivo gama media,
quiero que la app funcione fluida con catálogos grandes,
para tener una experiencia de compra sin interrupciones.

### Cómo debe funcionar
- Lazy loading optimizado para listas grandes.
- Cache avanzado de imágenes con eviction policy.
- Medición de p95 en tiempos de carga y scroll.

## Criterios de Aceptación
- [ ] Métricas de performance mejoradas respecto a MVP
- [ ] Lazy loading optimizado medido con benchmarks
- [ ] Cache de imágenes con política de eviction definida
- [ ] Métricas p95 documentadas y dentro de objetivo

## Dependencias
- HU-NF-CAT-001 (performance base del catálogo)
- Phase 1 completada

## Impacto
- Usuarios afectados: Usuario final (especialmente gama media/baja)
- Módulos afectados: app/ui/screens/catalog/, app/storage/

## Riesgos
- Optimizaciones rompen funcionalidad existente
- Mitigación: Tests de regresión antes y después de cada optimización

## Telemetría
- Evento: performance_metric_captured
- Métrica: Tiempo de carga p50/p95, FPS promedio, uso de memoria

## Notas
- Basado en datos reales de telemetría de Phase 1

---
Creada: 2026-03-01
Actualizada: 2026-03-01
