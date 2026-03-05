# HU-TECH-FOUND-004

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-FOUND-004 |
| Título | Sync Queue base (job runner local) |
| Tipo | TECNICA |
| Fase | PHASE_0_FUNDACION |
| Epic | Sync |
| Estado | FINALIZADA |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero tener una cola de operaciones local que encole y procese jobs sin bloquear UI,
para garantizar que operaciones críticas (como crear orden) se completen de forma confiable.

### Cómo debe funcionar
- Jobs con tipo + payload almacenados en SQLite.
- Estados: PENDING, SENDING, CONFIRMED, FAILED_RETRYABLE, FAILED_FINAL.
- Runner procesa jobs mientras la app está activa.
- Retries con backoff controlado.

## Criterios de Aceptación
- [x] Sync queue implementada con persistencia en SQLite
- [x] Estados de job correctamente gestionados (PENDING → SENDING → CONFIRMED/FAILED)
- [x] Runner que procesa jobs en background sin bloquear UI
- [x] Retries con backoff exponencial controlado
- [x] Encola/procesa job dummy contra mock exitosamente

## Dependencias
- HU-TECH-FOUND-001
- HU-TECH-FOUND-003 (SQLite para persistencia de jobs)

## Impacto
- Usuarios afectados: Usuario final (confiabilidad de operaciones)
- Módulos afectados: app/sync/

## Riesgos
- Jobs huérfanos si la app se cierra durante procesamiento
- Mitigación: Recovery de jobs en estado SENDING al reiniciar app

## Telemetría
- Evento: sync_job_enqueued, sync_job_confirmed, sync_job_failed
- Métrica: Tasa de éxito de jobs, tiempo promedio de procesamiento

## Notas
- Crítico para el flujo de checkout (HU-FUNC-CHK-001)

---
Creada: 2026-03-01
Actualizada: 2026-03-01
