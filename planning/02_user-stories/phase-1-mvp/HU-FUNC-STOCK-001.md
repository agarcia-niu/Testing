# HU-FUNC-STOCK-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-STOCK-001 |
| Título | Validar stock antes de permitir finalizar compra (hard stop) |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Stock |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero que se valide el stock real antes de confirmar mi compra,
para evitar pedidos que no se puedan cumplir.

### Cómo debe funcionar
- Antes de encolar la orden, se valida el stock real de cada producto contra el servidor.
- Si la validación falla, se bloquea el checkout y se ofrecen opciones: ajustar cantidad, eliminar producto o reintentar.

## Criterios de Aceptación
- [ ] No se crean órdenes sin stock validado previamente.
- [ ] Acciones claras ante falta de stock: ajustar cantidad, quitar producto o reintentar validación.

## Dependencias
- HU-FUNC-CART-001
- HU-TECH-STOCK-001

## Impacto
- Usuarios afectados: Usuario final, negocio (evita overselling)
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- La latencia de validación de stock puede frustrar al usuario.
- Mitigación: Feedback inmediato con indicador de carga + timeout corto para la validación.

## Telemetría
- Evento: stock_validation_success, stock_validation_failed
- Métrica: Tasa de bloqueo por stock, items sin stock más frecuentes

## Notas
- La validación de stock es un hard stop: sin stock confirmado, no se puede proceder con el checkout.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
