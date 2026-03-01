# HU-FUNC-ORD-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-ORD-001 |
| Título | Ver historial y detalle de pedidos (Pendiente/Entregado) |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Pedidos |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver mi historial de pedidos con estados simples,
para dar seguimiento a mis compras.

### Cómo debe funcionar
- Lista de pedidos con fecha, total y estado simple (Pendiente/Entregado).
- Detalle de cada pedido con items y resumen de la compra.
- Se incluye el estado "en proceso" para pedidos cuyo job aún está en cola de sincronización.

## Criterios de Aceptación
- [ ] Muestra solo los estados Pendiente y Entregado en la lista.
- [ ] Estado "en proceso" visible para jobs que aún están en cola de sincronización.
- [ ] Detalle del pedido con items, fecha y total correctamente mostrados.

## Dependencias
- HU-FUNC-CHK-001
- HU-TECH-SYNC-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/orders/, app/storage/

## Riesgos
- Un pedido confirmado en el servidor puede no aparecer inmediatamente en la lista local.
- Mitigación: Pull de datos al entrar a la pantalla de pedidos + indicador de sincronización visible.

## Telemetría
- Evento: orders_list_viewed, order_detail_viewed
- Métrica: Frecuencia de consulta de pedidos

## Notas
- Los estados simplificados (Pendiente/Entregado) facilitan la comprensión del usuario sin exponer complejidad interna del sistema.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
