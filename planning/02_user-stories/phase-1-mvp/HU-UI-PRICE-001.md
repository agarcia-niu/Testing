# HU-UI-PRICE-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-PRICE-001 |
| Título | Checkout con desglose claro de totales |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Pricing/Envío |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver un desglose claro de subtotal, descuento, envío y total en checkout,
para saber exactamente cuánto voy a pagar.

### Cómo debe funcionar
- Subtotal, descuento, envío y total con etiquetas simples.
- Sin tecnicismos ni jerga técnica.

## Criterios de Aceptación
- [ ] Desglose completo visible.
- [ ] Etiquetas en español simple.
- [ ] Sin jerga técnica.

## Dependencias
- HU-FUNC-PRICE-001
- HU-FUNC-PRICE-002
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- Desglose confuso con demasiadas líneas.
- Mitigación: Máximo 4-5 líneas de desglose.

## Telemetría
- Evento: price_breakdown_viewed
- Métrica: Tiempo en pantalla de desglose

## Notas
- Usar lenguaje coloquial y directo para las etiquetas del desglose.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
