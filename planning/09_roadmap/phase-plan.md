# Plan por Fases (Phase Plan)

## App Mobile WooCommerce

---

## PHASE_0_FUNDACION — Sprint 0

### Objetivo
Crear la base técnica y de gobernanza sólida para comenzar Phase 1 sin deuda estructural.

### Criterios de Entrada
- Repositorio creado con estructura de gobernanza
- HUs definidas y priorizadas
- Stakeholders alineados en alcance

### Criterios de Salida
- App corre en iOS/Android (dev)
- DB SQLite funcional con migraciones
- Sync queue funcional con job dummy
- HttpClient operativo (sin endpoints reales)
- Telemetría base con session_id
- Navegación entre pantallas stub
- Arquitectura de checkout documentada
- CLAUDE.md consolidado con todas las reglas
- ADRs creados para cada decisión técnica

### HUs (11)
| ID | Título | Prioridad |
|----|--------|-----------|
| HU-FUNC-FOUND-001 | Estructura del repositorio | P0 |
| HU-FUNC-FOUND-002 | Roadmap por fases | P0 |
| HU-TECH-FOUND-001 | Proyecto base Expo | P0 |
| HU-TECH-FOUND-002 | Cliente HTTP | P0 |
| HU-TECH-FOUND-003 | SQLite + repositorios | P0 |
| HU-TECH-FOUND-004 | Sync Queue | P0 |
| HU-TECH-FOUND-005 | Telemetría base | P0 |
| HU-NF-FOUND-001 | Cifrado datos sensibles | P0 |
| HU-NF-FOUND-002 | Catálogo de errores | P0 |
| HU-UI-FOUND-001 | Estados globales UI | P0 |
| HU-UI-FOUND-002 | Navegación y layout | P0 |

---

## PHASE_1_MVP — Piloto End-to-End

### Objetivo
Entregar el flujo completo de compra funcional: Login → Catálogo → Carrito → Checkout → Pedidos.

### Criterios de Entrada
- Phase 0 completada (11/11 HUs FINALIZADA)
- Arquitectura de checkout documentada y aprobada
- ADRs de dependencias creados

### Criterios de Salida
- Login funcional con persistencia de sesión
- Catálogo navegable offline con sync incremental
- Carrito persistente con precio snapshot
- Checkout con validación de stock, quote y enqueue
- Cero duplicidad de órdenes (idempotencia verificada)
- Historial de pedidos con 2 estados (Pendiente/Entregado)
- Telemetría del embudo de conversión
- Performance aceptable en gama media (100+ productos)

### KPIs de Conversión
| KPI | Métrica | Objetivo |
|-----|---------|----------|
| Tasa de login | login_success / login_attempts | > 95% |
| Catálogo → Carrito | cart_item_added / catalog_view | > 30% |
| Carrito → Checkout | checkout_started / cart_viewed | > 50% |
| Checkout → Confirmado | checkout_completed / checkout_started | > 80% |
| Abandono por stock | stock_validation_failed / checkout_started | < 5% |
| Duplicidad de órdenes | order_dedup_resolved / checkout_completed | 0% duplicados |

### HUs (27)
Organizadas por Epic: Autenticación (3), Catálogo (4), Carrito (3), Pricing/Envío (4), Stock (3), Checkout (4), Pedidos (2), Sync/Obs/Seguridad (4).

---

## PHASE_2_SCALE — Post-Piloto

### Objetivo
Escalar la app con features de crecimiento y optimización basada en datos reales de Phase 1.

### Criterios de Entrada
- Phase 1 completada
- Datos de telemetría disponibles (mínimo 30 días de uso)
- Feedback de usuarios piloto recopilado

### Criterios de Salida
- Wishlist funcional (offline + sync)
- Programa de lealtad visible
- Base para notificaciones preparada (feature flag apagado)
- Performance optimizada (p95 mejorado)
- UX de recompra implementada

### Priorización
| Prioridad | HUs |
|-----------|-----|
| P1 | HU-NF-SCALE-001 (Performance hardening) |
| P2 | HU-FUNC-SCALE-001 (Wishlist), HU-FUNC-SCALE-002 (Lealtad), HU-TECH-SCALE-001 (Notificaciones), HU-UI-SCALE-001 (UX recompra) |

### HUs (5)
Organizadas por tipo: Funcional (2), Técnica (1), No Funcional (1), UI/UX (1).

---

> Referenciado por: HU-FUNC-FOUND-002
> Última actualización: 2026-03-01
