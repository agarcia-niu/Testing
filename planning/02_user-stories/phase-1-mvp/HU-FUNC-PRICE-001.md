# HU-FUNC-PRICE-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-PRICE-001 |
| Título | Mostrar descuento por volumen aplicado en checkout |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Pricing/Envío |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver los descuentos aplicados en el checkout,
para entender el total final de mi compra.

### Cómo debe funcionar
- El checkout muestra el subtotal, el descuento aplicado (monto y porcentaje) y el total.
- Si no aplica ningún descuento, se muestra la etiqueta "Sin descuento".

## Criterios de Aceptación
- [ ] Desglose consistente de subtotal, descuento y total en la pantalla de checkout.
- [ ] Etiqueta "Sin descuento" visible cuando no aplica ningún descuento.

## Dependencias
- HU-FUNC-CART-001
- HU-TECH-PRICE-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- El descuento calculado en la app puede diferir del calculado en el servidor.
- Mitigación: Usar el quote del servidor como fuente de verdad para el cálculo final.

## Telemetría
- Evento: discount_applied, discount_not_applied
- Métrica: Porcentaje de pedidos con descuento, monto promedio de descuento

## Notas
- Los descuentos por volumen son definidos por el administrador en WooCommerce y se obtienen via API.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
