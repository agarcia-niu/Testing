# HU-FUNC-SCALE-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-SCALE-001 |
| Título | Wishlist (favoritos) |
| Tipo | FUNCIONAL |
| Fase | PHASE_2_SCALE |
| Epic | Growth |
| Estado | PENDIENTE |
| Prioridad | P2 |

## Descripción
Como usuario,
quiero guardar productos en una lista de favoritos,
para comprarlos más adelante sin tener que buscarlos de nuevo.

### Cómo debe funcionar
- Botón guardar en producto (corazón/estrella).
- Lista wishlist accesible desde perfil.
- Funciona offline (almacenamiento local).
- Sync con backend cuando exista soporte.

## Criterios de Aceptación
- [ ] Botón de favorito en card y detalle de producto
- [ ] Lista de wishlist accesible desde perfil
- [ ] Funciona offline (persistencia local)
- [ ] Sincroniza cuando hay conexión y backend lo soporte

## Dependencias
- Phase 1 completada
- HU-TECH-FOUND-003 (SQLite)
- HU-FUNC-CAT-001 (Catálogo)

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/wishlist/, app/storage/

## Riesgos
- Wishlist crece sin límite y afecta performance
- Mitigación: Límite configurable + paginación

## Telemetría
- Evento: wishlist_item_added, wishlist_item_removed, wishlist_viewed
- Métrica: Items promedio en wishlist, conversión wishlist→carrito

## Notas
- Depende de que Phase 1 esté completa

---
Creada: 2026-03-01
Actualizada: 2026-03-01
