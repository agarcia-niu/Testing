# HU-TECH-STOCK-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-STOCK-001 |
| Título | Validación just-in-time con soporte a "reserva por X minutos" |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Stock |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero validación de stock just-in-time antes de encolar,
para evitar overselling y garantizar disponibilidad real al momento de la compra.

### Cómo debe funcionar
- Ejecuta stock check inmediatamente antes de encolar la orden.
- Si el backend ofrece token/TTL de reserva temporal, guarda el token en el draft de la orden.
- El diseño funciona con o sin soporte de reserva por parte del backend.

## Criterios de Aceptación
- [ ] La validación de stock siempre se ejecuta antes de encolar la orden.
- [ ] Soporte para token de reserva temporal si el backend lo ofrece.
- [ ] Timeout controlado para la validación de stock.
- [ ] El flujo funciona correctamente con y sin reserva de stock.

## Dependencias
- HU-TECH-FOUND-002
- HU-TECH-CART-001

## Impacto
- Usuarios afectados: Equipo de desarrollo, negocio
- Módulos afectados: app/network/

## Riesgos
- Backend no soporta reserva temporal de stock.
- Mitigación: Diseño flexible que funcione con o sin reserva, degradando gracefully.

## Telemetría
- Evento: stock_check_success, stock_check_failed, stock_reservation_created
- Métrica: Tasa de overselling

## Notas
- La validación just-in-time es la última barrera antes de crear la orden y es crítica para la integridad del inventario.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
