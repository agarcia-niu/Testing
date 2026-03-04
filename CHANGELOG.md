# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [0.3.1] - 2026-03-04

### Agregado
- `planning/07_api-contracts/woocommerce-endpoints.md` — Endpoints WooCommerce documentados desde referencia API oficial (4 endpoints, 3 usados en MVP).
- `planning/07_api-contracts/order-contract.md` — Contrato de creación de órdenes con payload completo, validaciones pre-envío y response esperado.
- `planning/03_architecture/woocommerce-integration.md` — Arquitectura de integración con 4 flujos (catálogo, auth, checkout, pedidos) y diagramas de secuencia.
- `planning/08_non-functional/api-security.md` — Política de seguridad API: manejo de credenciales, almacenamiento seguro y política de no exposición.

### Modificado
- `planning/07_api-contracts/README.md` — Actualizado con endpoints confirmados y gaps identificados (GET /orders, GET /orders/{id}).
- Planning actualizado para Phase 1 MVP.

---

## [0.3.0] - 2026-03-01

### Agregado — Phase 0B (Governance)
- 5 ADRs técnicos: ADR-002 (Expo), ADR-003 (HTTP client), ADR-004 (SQLite), ADR-005 (cifrado), ADR-006 (navegación).
- 4 documentos de arquitectura en `planning/03_architecture/`:
  - `idempotencia.md` — Estrategia client_order_id para dedup de órdenes.
  - `estados-orden.md` — Estados locales, transiciones y mapeo a WooCommerce.
  - `politica-datos-sensibles.md` — Clasificación de datos y política de limpieza.
  - `reconciliacion.md` — Pull incremental con modified_after, remote siempre gana.
- `planning/09_roadmap/phase-plan.md` — Plan formal con criterios de entrada/salida y KPIs.

### Agregado — Phase 0A (Base Técnica)
- Proyecto Expo SDK 55 inicializado con TypeScript strict.
- `src/core/` — Tipos (AppError, ApiResponse, Result<T>, Product, CartItem, Order, SyncJob, TelemetryEvent), config y catálogo de errores (14 códigos).
- `src/infra/security/` — SecureStorage wrapper (expo-secure-store) + AuthStorage (session management).
- `src/infra/http/` — HttpClient fetch wrapper con interceptor JWT, timeout AbortController, normalización de errores.
- `src/infra/storage/` — SQLite singleton con migration runner, migración 001 (5 tablas), 4 repositorios CRUD.
- `src/infra/sync/` — SyncQueue con jobRunner, retry backoff exponencial, recovery de jobs stuck.
- `src/infra/telemetry/` — SessionManager (UUID), TelemetryService (track + flush + autoFlush).
- `src/ui/components/` — Loading, ErrorView, OfflineBanner.
- `src/ui/hooks/` — useNetworkStatus (NetInfo).
- `app/` — Navegación Expo Router: root layout, tabs (Catálogo, Carrito, Pedidos), Login, Checkout (modal), 404.

### Agregado — Phase 0C (Arquitectura Checkout)
- `planning/03_architecture/modelo-order-draft.md` — Modelo completo de order_draft.
- `planning/03_architecture/flujo-checkout.md` — Flujo paso a paso con manejo de errores y reglas de negocio.
- `planning/03_architecture/degradacion-sistema.md` — Estrategia de degradación por niveles.
- `planning/06_flow-diagrams/flujo-compra.md` — Diagramas Mermaid completos del flujo de compra.

### Modificado
- `CLAUDE.md` — Secciones 8-12: convenciones de carpetas, sync rules, idempotencia, checkout flow, política de datos.
- 11 HUs de Phase 0 marcadas como FINALIZADA (todas completadas).
- `planning/02_user-stories/backlog.md` — Estado general actualizado (11 FINALIZADAS).
- `planning/09_roadmap/README.md` — Phase 0 completada.
- `planning/00_index.md` — Fase actual: PHASE_1_MVP.

---

## [0.2.0] - 2026-03-01

### Agregado
- 43 Historias de Usuario creadas en `planning/02_user-stories/`:
  - `phase-0-fundacion/` — 11 HUs (2 FUNCIONAL, 5 TECNICA, 2 NO_FUNCIONAL, 2 UI_UX)
  - `phase-1-mvp/` — 27 HUs (8 FUNCIONAL, 8 TECNICA, 4 NO_FUNCIONAL, 7 UI_UX)
  - `phase-2-scale/` — 5 HUs (2 FUNCIONAL, 1 TECNICA, 1 NO_FUNCIONAL, 1 UI_UX)
- `planning/02_user-stories/backlog.md` — Índice maestro con tabla de resumen y mapa de dependencias Mermaid.
- `planning/04_technical-decisions/ADR-001-organizacion-archivos-hu.md` — ADR para organización de archivos HU.
- `planning/07_api-contracts/error-catalog.md` — Catálogo de errores estándar.
- HU-FUNC-FOUND-001 marcada como FINALIZADA (estructura ya creada).

### Modificado
- `CLAUDE.md` — Agregada sección de prioridades permitidas (P0/P1/P2/P3).
- `planning/02_user-stories/template-hu.md` — Prioridades actualizadas a P0/P1/P2/P3.
- `planning/09_roadmap/README.md` — Expandido con las 43 HUs por fase y epic.
- `planning/00_index.md` — Estados actualizados (user-stories, technical-decisions, roadmap → EN_PROGRESO).

---

## [0.1.0] - 2026-02-28

### Agregado
- Estructura de gobernanza del proyecto creada.
- `CLAUDE.md` con reglas del proyecto.
- Estructura de carpetas `planning/` con subdirectorios numerados.
- Plantilla base de Historias de Usuario (`template-hu.md`).
- Plantilla ADR (`ADR-template.md`).
- Placeholders para api-contracts, flow-diagrams y demás secciones.
- Carpetas `branding/` y `app/` vacías.
- `.gitignore` para React Native + Expo.
