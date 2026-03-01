# ADR-004: Almacenamiento Local SQLite

## Estado
ACEPTADA

## Fecha
2026-03-01

## Contexto
La aplicación opera en modo offline-first y necesita persistencia local para catálogo de productos, carrito de compras, pedidos y cola de sincronización. Se requiere un motor de base de datos local con soporte para migraciones versionadas.

## Opciones Consideradas
1. **expo-sqlite** — Módulo integrado de Expo. API síncrona y asíncrona. Sin configuración nativa adicional.
2. **react-native-sqlite-storage** — Wrapper de comunidad sobre SQLite nativo. Requiere linking manual o config plugin.
3. **WatermelonDB** — Base de datos reactiva sobre SQLite. Observables automáticos, lazy loading. Mayor complejidad.
4. **Realm** — Base de datos móvil de MongoDB. API orientada a objetos. Vendor lock-in.

## Decisión
Se elige la **Opción 1: expo-sqlite**.

Razones:
- Integrado en Expo SDK — sin dependencias nativas adicionales.
- API simple y directa (SQL puro).
- Compatible con managed workflow sin config plugins.
- Suficiente para el volumen esperado de datos (catálogo <5000 productos).
- Migraciones versionadas implementables con patrón simple.

### Esquema de tablas:
- `products` — Catálogo de productos (offline cache)
- `cart_items` — Carrito de compras (persistente)
- `orders` — Pedidos locales (draft + confirmados)
- `sync_queue` — Cola de operaciones pendientes
- `telemetry_events` — Buffer de eventos de telemetría
- `sync_metadata` — Metadata de sincronización (last_sync_at, etc.)

### Patrón de migraciones:
- Archivos numerados: `001_initial.ts`, `002_xxx.ts`, etc.
- Tabla `sync_metadata` guarda versión actual de DB
- Runner ejecuta migraciones pendientes al iniciar app

## Consecuencias

### Positivas
- Sin dependencias nativas extra
- API de SQL puro — portable y depurable
- Performance adecuada para el volumen de datos del MVP
- Migraciones simples y versionadas

### Negativas
- Sin ORM — queries manuales (mitigable con repositorios tipados)
- Sin observables reactivos (WatermelonDB los tiene)
- Límite práctico de performance con >10K registros en tabla única

## Referencias
- https://docs.expo.dev/versions/latest/sdk/sqlite/
- CLAUDE.md — Modo offline-first

## HUs Relacionadas
- HU-TECH-FOUND-003 (SQLite base + repositorios)
- HU-TECH-FOUND-004 (Sync Queue — usa sync_queue table)
- HU-TECH-FOUND-005 (Telemetría — usa telemetry_events table)
