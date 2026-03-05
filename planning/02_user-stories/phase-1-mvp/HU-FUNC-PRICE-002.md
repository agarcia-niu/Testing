# HU-FUNC-PRICE-002

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-PRICE-002 |
| Título | Calcular y mostrar costo de envío en checkout |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Pricing/Envío |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver el costo de envío calculado antes de confirmar mi compra,
para conocer el total real.

### Cómo debe funcionar
- El usuario confirma su dirección de envío.
- Se calcula el costo de envío basado en las reglas configuradas por el administrador.
- No se permite finalizar la compra si no se ha calculado el envío.

## Criterios de Aceptación
- [ ] Costo de envío calculado y visible antes de confirmar la compra.
- [ ] Mensaje de error claro si falla el cálculo de envío.
- [ ] Checkout bloqueado hasta que el envío esté calculado correctamente.

## Dependencias
- HU-FUNC-PRICE-001
- HU-TECH-PRICE-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- Las reglas de envío pueden cambiar sin notificación previa.
- Mitigación: Recalcular el costo de envío siempre antes de confirmar la compra.

## Telemetría
- Evento: shipping_calculated, shipping_calculation_failed
- Métrica: Costo de envío promedio, tasa de fallo de cálculo de envío

## Notas
- El cálculo de envío depende de la dirección del usuario y las reglas del administrador en WooCommerce.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
