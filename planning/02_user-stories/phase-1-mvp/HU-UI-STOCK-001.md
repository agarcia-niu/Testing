# HU-UI-STOCK-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-STOCK-001 |
| Título | UI de stock con acciones rápidas |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Stock |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver opciones claras cuando un producto no tiene stock,
para resolver sin salir del flujo de compra.

### Cómo debe funcionar
- Lista de productos afectados por falta de stock.
- CTA por cada producto: ajustar cantidad, quitar del carrito o reintentar.

## Criterios de Aceptación
- [ ] Reduce abandono.
- [ ] Acciones claras por item sin stock.
- [ ] No obliga a volver al catálogo.

## Dependencias
- HU-FUNC-STOCK-001
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- Demasiadas opciones confunden.
- Mitigación: Máximo 3 acciones por item.

## Telemetría
- Evento: stock_action_adjust, stock_action_remove, stock_action_retry
- Métrica: Acción más elegida, tasa de abandono

## Notas
- Priorizar la acción de ajustar cantidad como opción principal para retener la venta.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
