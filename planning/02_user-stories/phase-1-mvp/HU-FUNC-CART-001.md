# HU-FUNC-CART-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-CART-001 |
| Título | Agregar, ajustar y eliminar productos del carrito local |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Carrito |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero manejar mi carrito de compras persistente,
para preparar mis pedidos sin perder productos al cerrar la app.

### Cómo debe funcionar
- Agregar productos al carrito desde el listado o el detalle del producto.
- Ajustar la cantidad de cada producto directamente en el carrito.
- Eliminar productos del carrito.
- El carrito persiste al cerrar y reabrir la app.

## Criterios de Aceptación
- [ ] Agregar, eliminar y ajustar cantidad de productos funciona correctamente.
- [ ] Subtotal base visible en todo momento en el carrito.
- [ ] El carrito persiste al cerrar y reabrir la app sin pérdida de datos.

## Dependencias
- HU-FUNC-CAT-001
- HU-TECH-CART-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/cart/, app/storage/

## Riesgos
- Un producto eliminado del catálogo puede persistir en el carrito local.
- Mitigación: Validación de existencia del producto al abrir el carrito.

## Telemetría
- Evento: cart_item_added, cart_item_removed, cart_quantity_changed
- Métrica: Items promedio por carrito

## Notas
- El carrito es completamente local y offline; la sincronización ocurre solo al momento del checkout.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
