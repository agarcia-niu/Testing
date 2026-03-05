# HU-FUNC-CAT-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-CAT-001 |
| Título | Navegar catálogo y categorías offline (modo lectura) |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Catálogo |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver el catálogo cacheado sin conexión,
para seguir navegando productos cuando no hay internet.

### Cómo debe funcionar
- Sin conexión a internet, se muestra el catálogo desde cache con un badge de "última actualización".
- Si no hay cache disponible, se muestra un estado vacío con guía para el usuario.

## Criterios de Aceptación
- [ ] Navegación offline estable sin errores ni cierres inesperados.
- [ ] Badge de "última actualización" visible cuando se navega desde cache.
- [ ] Empty state con instrucciones claras si no hay cache disponible.

## Dependencias
- HU-FUNC-AUTH-001
- HU-TECH-FOUND-003
- HU-TECH-CAT-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/catalog/, app/storage/

## Riesgos
- Cache desactualizado puede mostrar precios incorrectos al usuario.
- Mitigación: Timestamp visible de última actualización + refresh automático al reconectar.

## Telemetría
- Evento: catalog_view_offline, catalog_view_online
- Métrica: Porcentaje de vistas offline vs online

## Notas
- El modo offline es uno de los pilares de la app; esta HU debe garantizar una experiencia fluida sin conexión.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
