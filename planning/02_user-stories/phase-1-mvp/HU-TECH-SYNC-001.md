# HU-TECH-SYNC-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-SYNC-001 |
| Título | Pull incremental de pedidos (al abrir y al entrar a Pedidos) |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Sync |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero sincronización incremental de pedidos,
para mantener el historial actualizado sin necesidad de descarga completa.

### Cómo debe funcionar
- Ejecuta sync incremental de pedidos filtrado por fecha/modified.
- Guarda el campo last_orders_sync_at tras cada sincronización exitosa.
- No bloquea la UI durante el proceso de sincronización.

## Criterios de Aceptación
- [ ] La sincronización incremental de pedidos funciona correctamente por fecha/modified.
- [ ] El campo last_orders_sync_at se actualiza después de cada sync exitoso.
- [ ] La UI no se bloquea durante la sincronización de pedidos.
- [ ] El sync es estable con conexión intermitente.

## Dependencias
- HU-TECH-FOUND-002
- HU-TECH-FOUND-003

## Impacto
- Usuarios afectados: Equipo de desarrollo
- Módulos afectados: app/storage/, app/network/

## Riesgos
- Pedidos perdidos si la sincronización falla silenciosamente sin notificar.
- Mitigación: Indicador de última sincronización visible al usuario en la pantalla de pedidos.

## Telemetría
- Evento: orders_sync_started, orders_sync_completed
- Métrica: Pedidos sincronizados por pull

## Notas
- El sync se dispara al abrir la app y al entrar a la sección de Pedidos.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
