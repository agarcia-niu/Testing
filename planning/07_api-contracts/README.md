# Contratos de API

## App Mobile WooCommerce

Este directorio contiene los contratos de API del proyecto.

---

## Documentos

| Archivo | Contenido | Estado |
|---------|-----------|--------|
| [woocommerce-endpoints.md](./woocommerce-endpoints.md) | Endpoints WooCommerce documentados desde PDF de referencia | EN_PROGRESO |
| [order-contract.md](./order-contract.md) | Contrato de creación de órdenes (payload, validaciones, response) | EN_PROGRESO |
| [error-catalog.md](./error-catalog.md) | Catálogo de errores estándar (14 códigos) | EN_PROGRESO |

---

## Endpoints Confirmados (desde API_Reference_WooCommerce.pdf)

| # | Endpoint | Método | Uso en MVP |
|---|----------|--------|:----------:|
| 1 | `/wp-json/wc/v3/products` | GET | Sí |
| 2 | `/wp-json/wc/v3/orders` | POST | Sí |
| 3 | `/wp-json/wc/v3/customers/{id}` | GET | Sí |
| 4 | `/wp-json/wc/v3/customers?role=all` | GET | No |

---

## Gaps Identificados

Los siguientes endpoints son **necesarios para el MVP** pero **NO aparecen en el PDF de referencia**. Se requiere confirmación con el equipo de backend o documentación adicional de WooCommerce.

| Endpoint | Método | Requerido por | HU | Prioridad |
|----------|--------|---------------|----|-----------|
| `/wp-json/wc/v3/orders` | GET | Pull incremental de pedidos (historial del usuario) | HU-TECH-SYNC-001 | P0 |
| `/wp-json/wc/v3/orders/{id}` | GET | Verificación de idempotencia/dedup antes de retry | HU-TECH-CHK-001 | P0 |

### Impacto de los Gaps

- **Sin GET /orders**: No se puede implementar la pantalla de historial de pedidos con sync (HU-FUNC-ORD-001)
- **Sin GET /orders/{id}**: La verificación de dedup por `client_order_id` tras timeout/5xx no puede ejecutarse completamente (HU-TECH-CHK-001)

### Acción Requerida

> Confirmar con el equipo de backend que estos endpoints estándar de WooCommerce REST API v3 están disponibles y documentar sus parámetros y respuestas.

---

> **Estado**: EN_PROGRESO — Contratos base documentados. Gaps pendientes de resolución.
> Toda integración requiere ADR previo en `04_technical-decisions/`.
> Última actualización: 2026-03-04
