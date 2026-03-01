# HU-TECH-PRICE-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-PRICE-001 |
| Título | Servicio de cotización (quote) para totales finales |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Pricing/Envío |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero un servicio de cotización (quote) que calcule totales finales,
para que el checkout tenga datos reales del servidor con desglose completo.

### Cómo debe funcionar
- La función quote(cart, address) retorna subtotal, discount, shipping, total y breakdown.
- Si la cotización falla, el checkout se detiene y no permite continuar.
- No se inventan endpoints reales; se define la interfaz del servicio.

## Criterios de Aceptación
- [ ] La interfaz de quote está definida con parámetros y respuesta tipados.
- [ ] El quote retorna desglose completo: subtotal, discount, shipping, total, breakdown.
- [ ] El checkout se bloquea si el quote falla o no responde.
- [ ] No se inventan endpoints reales en la implementación.

## Dependencias
- HU-TECH-FOUND-002
- HU-TECH-CART-001

## Impacto
- Usuarios afectados: Equipo de desarrollo
- Módulos afectados: app/network/, app/ui/screens/checkout/

## Riesgos
- Latencia alta del quote frustra al usuario en el flujo de checkout.
- Mitigación: Timeout corto configurado + cache del último quote válido como fallback temporal.

## Telemetría
- Evento: quote_requested, quote_success, quote_failed
- Métrica: Tiempo de respuesta de quote (p50, p95)

## Notas
- El servicio de quote es crítico para la integridad de precios en el checkout.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
