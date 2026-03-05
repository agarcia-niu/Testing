# HU-UI-ORD-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-ORD-001 |
| Título | Historial simple con 2 estados visibles |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Pedidos |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver mi historial de pedidos con estados simples,
para dar seguimiento rápido a mis compras.

### Cómo debe funcionar
- Solo 2 estados visibles: Pendiente y Entregado.
- Empty state con CTA al catálogo cuando no hay pedidos.

## Criterios de Aceptación
- [ ] Lista simple y rápida.
- [ ] Solo 2 estados (Pendiente/Entregado).
- [ ] Empty state con CTA "Ir al catálogo".

## Dependencias
- HU-FUNC-ORD-001
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/orders/

## Riesgos
- Lista crece sin paginación.
- Mitigación: Paginación o virtualización desde el inicio.

## Telemetría
- Evento: orders_list_viewed, order_empty_state_cta_tapped
- Métrica: Frecuencia de visita a pedidos

## Notas
- Mantener la interfaz minimalista para facilitar el seguimiento rápido.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
