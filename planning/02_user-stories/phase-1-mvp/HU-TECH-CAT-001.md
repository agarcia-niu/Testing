# HU-TECH-CAT-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-CAT-001 |
| Título | Sincronización incremental de catálogo (pull) |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Catálogo |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero sincronización incremental de catálogo (pull),
para mantenerlo actualizado sin necesidad de descargar todo el catálogo cada vez.

### Cómo debe funcionar
- Ejecuta pull incremental al reconectar o detectar conectividad.
- Actualiza la base de datos local y el campo last_sync_at tras cada sync exitoso.
- No bloquea la UI durante el proceso de sincronización.

## Criterios de Aceptación
- [ ] La sincronización incremental funciona filtrando por modified_after.
- [ ] Se actualiza last_sync_at después de cada sync exitoso.
- [ ] La UI no se bloquea durante la sincronización.
- [ ] Los reintentos están controlados con backoff progresivo.

## Dependencias
- HU-TECH-FOUND-002
- HU-TECH-FOUND-003

## Impacto
- Usuarios afectados: Equipo de desarrollo, usuario final
- Módulos afectados: app/storage/, app/network/

## Riesgos
- Datos inconsistentes por sincronización parcial interrumpida.
- Mitigación: Transacciones atómicas en SQLite para garantizar consistencia.

## Telemetría
- Evento: catalog_sync_started, catalog_sync_completed, catalog_sync_failed
- Métrica: Items sincronizados por pull

## Notas
- El sync incremental reduce significativamente el consumo de datos y el tiempo de actualización.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
