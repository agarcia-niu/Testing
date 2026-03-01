# HU-TECH-CART-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-CART-001 |
| Título | Persistencia de carrito + price_snapshot |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Carrito |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero persistir el carrito con snapshot de precio,
para mantener los datos del carrito entre sesiones y recalcular precios reales en checkout.

### Cómo debe funcionar
- Guarda un snapshot del precio al momento de agregar cada item al carrito.
- Ejecuta re-cálculo con precios reales del servidor durante el checkout.
- La persistencia del carrito es estable entre sesiones y cierres de la app.

## Criterios de Aceptación
- [ ] El snapshot de precio se guarda junto con cada item al agregarlo al carrito.
- [ ] Las operaciones CRUD del carrito funcionan de forma estable.
- [ ] Se ejecuta re-cálculo de precios reales en el momento del checkout.

## Dependencias
- HU-TECH-FOUND-003
- HU-TECH-CAT-001

## Impacto
- Usuarios afectados: Equipo de desarrollo
- Módulos afectados: app/storage/

## Riesgos
- Snapshot desactualizado causa confusión al usuario respecto al precio final.
- Mitigación: Indicador visual de "precio puede variar" cuando el snapshot tiene antigüedad significativa.

## Telemetría
- Evento: cart_persisted, cart_restored, price_snapshot_stale
- Métrica: Antigüedad promedio de snapshots de precio

## Notas
- El snapshot sirve como referencia visual; el precio definitivo siempre se obtiene del servidor en checkout.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
