# HU-UI-SCALE-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-SCALE-001 |
| Título | UX post-compra mejorada (recompra rápida) |
| Tipo | UI_UX |
| Fase | PHASE_2_SCALE |
| Epic | Growth |
| Estado | PENDIENTE |
| Prioridad | P2 |

## Descripción
Como usuario recurrente,
quiero poder recomprar rápidamente desde mi historial,
para ahorrar tiempo en pedidos frecuentes.

### Cómo debe funcionar
- Reordenar desde historial de pedidos (si se decide implementar).
- Accesos rápidos a wishlist y programa de lealtad.
- Reducir fricción en el flujo de recompra.

## Criterios de Aceptación
- [ ] Botón "Reordenar" en detalle de pedido (si aplica)
- [ ] Accesos rápidos a wishlist y lealtad desde home/perfil
- [ ] Reduce fricción de recompra medido por telemetría
- [ ] UX validada con usuarios

## Dependencias
- Phase 1 completada
- HU-FUNC-SCALE-001 (Wishlist)
- HU-FUNC-SCALE-002 (Programa de lealtad)
- HU-FUNC-ORD-001 (Historial de pedidos)

## Impacto
- Usuarios afectados: Usuario final (compradores recurrentes)
- Módulos afectados: app/ui/screens/orders/, app/ui/screens/home/

## Riesgos
- Reordenar con productos descontinuados o sin stock
- Mitigación: Validar disponibilidad antes de agregar al carrito

## Telemetría
- Evento: reorder_tapped, reorder_completed, quick_access_used
- Métrica: Tasa de recompra, tiempo de recompra vs primera compra

## Notas
- Requiere datos de comportamiento de Phase 1 para diseño informado

---
Creada: 2026-03-01
Actualizada: 2026-03-01
