# HU-TECH-FOUND-003

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-FOUND-003 |
| Título | SQLite base + repositorios (offline-first) |
| Tipo | TECNICA |
| Fase | PHASE_0_FUNDACION |
| Epic | Storage |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero tener persistencia local con SQLite para catálogo, carrito, pedidos y sync queue,
para soportar el modo offline-first de la aplicación.

### Cómo debe funcionar
- DB con migraciones versionadas.
- CRUD por entidad (catálogo, carrito, pedidos, sync queue).
- Metadata de sincronización (updated_at, last_sync_at) en cada tabla.

## Criterios de Aceptación
- [ ] SQLite configurado con migraciones versionadas
- [ ] CRUD implementado y probado por entidad
- [ ] Campos de metadata de sync (updated_at, last_sync_at) en cada tabla
- [ ] Repositorios con interfaz consistente

## Dependencias
- HU-TECH-FOUND-001

## Impacto
- Usuarios afectados: Equipo de desarrollo, usuario final (experiencia offline)
- Módulos afectados: app/storage/

## Riesgos
- Performance de SQLite con catálogos grandes (1000+ productos)
- Mitigación: Benchmarks tempranos con datos de prueba representativos

## Telemetría
- Evento: db_migration_applied, db_query_slow
- Métrica: Tiempo de queries críticas (p95)

## Notas
- Requiere ADR para selección de librería SQLite (expo-sqlite, react-native-sqlite-storage, etc.)

---
Creada: 2026-03-01
Actualizada: 2026-03-01
