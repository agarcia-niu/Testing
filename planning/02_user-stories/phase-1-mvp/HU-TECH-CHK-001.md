# HU-TECH-CHK-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-CHK-001 |
| Título | Idempotencia (client_order_id) + deduplicación por consulta |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Checkout |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero idempotencia en la creación de órdenes mediante client_order_id,
para evitar duplicados por red caída o reintentos automáticos.

### Cómo debe funcionar
- Genera un client_order_id único antes de encolar la orden.
- Si la respuesta del servidor es incierta: consulta las últimas órdenes para verificar.
- Si coincide con orden existente → marca como CONFIRMED.
- Si no coincide → ejecuta retry controlado con el mismo client_order_id.

## Criterios de Aceptación
- [ ] El client_order_id se genera antes de encolar la orden.
- [ ] La deduplicación por consulta de órdenes recientes funciona correctamente.
- [ ] No se crean órdenes duplicadas bajo ningún escenario de fallo de red.
- [ ] El retry controlado reutiliza el mismo client_order_id.

## Dependencias
- HU-TECH-FOUND-004
- HU-TECH-STOCK-001
- HU-TECH-PRICE-001

## Impacto
- Usuarios afectados: Equipo de desarrollo, negocio, usuario final
- Módulos afectados: app/sync/, app/network/

## Riesgos
- El client_order_id no llega al servidor por timeout de red.
- Mitigación: Consulta de verificación post-envío + retry con el mismo ID para garantizar idempotencia.

## Telemetría
- Evento: order_created, order_deduplicated, order_retry
- Métrica: Tasa de deduplicación, reintentos promedio por orden

## Notas
- La idempotencia es fundamental para la confiabilidad del checkout en modo offline-first.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
