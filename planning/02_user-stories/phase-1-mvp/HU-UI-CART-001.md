# HU-UI-CART-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-CART-001 |
| Título | Carrito con CTA fijo "Ir a pagar" |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Carrito |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero un carrito con botón "Ir a pagar" siempre visible,
para avanzar al checkout sin buscar el botón.

### Cómo debe funcionar
- CTA siempre visible (fixed bottom) sin importar el scroll.
- Resumen simple del total visible junto al CTA.

## Criterios de Aceptación
- [ ] CTA no se oculta con scroll.
- [ ] Resumen visible (items + total).
- [ ] Botón deshabilitado si carrito vacío.

## Dependencias
- HU-FUNC-CART-001
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/cart/

## Riesgos
- CTA oculto por teclado en ajuste de cantidad.
- Mitigación: Dismiss keyboard al scroll.

## Telemetría
- Evento: cart_cta_tapped, cart_viewed
- Métrica: Tasa de avance carrito→checkout

## Notas
- El CTA debe ser lo suficientemente grande y contrastante para ser identificable de inmediato.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
