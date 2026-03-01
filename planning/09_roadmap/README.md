# Roadmap del Proyecto

## App Mobile WooCommerce

---

## PHASE_0_FUNDACION (11 HUs)

### FUNCIONAL
- [x] HU-FUNC-FOUND-001 — Estructura oficial del repositorio y carpetas
- [x] HU-FUNC-FOUND-002 — Roadmap por fases publicado en planning

### TECNICA
- [x] HU-TECH-FOUND-001 — Proyecto base Expo (React Native) listo para escalar
- [x] HU-TECH-FOUND-002 — Cliente HTTP base + normalización de errores
- [x] HU-TECH-FOUND-003 — SQLite base + repositorios (offline-first)
- [x] HU-TECH-FOUND-004 — Sync Queue base (job runner local)
- [x] HU-TECH-FOUND-005 — Telemetría base + correlación por session_id

### NO_FUNCIONAL
- [x] HU-NF-FOUND-001 — Cifrado de datos sensibles en storage
- [x] HU-NF-FOUND-002 — Catálogo de errores estándar (UX-friendly)

### UI_UX
- [x] HU-UI-FOUND-001 — Estados globales UI (loading/error/offline) consistentes
- [x] HU-UI-FOUND-002 — Base de navegación y layout (safe areas, estructura MVP)

---

## PHASE_1_MVP (27 HUs)

### Autenticación
- [ ] HU-FUNC-AUTH-001 — Login obligatorio para acceder a la app
- [ ] HU-TECH-AUTH-001 — Persistencia segura de sesión (token + user_id)
- [ ] HU-UI-AUTH-001 — Pantalla Login rápida, simple y confiable

### Catálogo
- [ ] HU-FUNC-CAT-001 — Navegar catálogo y categorías offline (modo lectura)
- [ ] HU-TECH-CAT-001 — Sincronización incremental de catálogo (pull)
- [ ] HU-NF-CAT-001 — Performance catálogo en gama media
- [ ] HU-UI-CAT-001 — Cards de producto con jerarquía clara

### Carrito
- [ ] HU-FUNC-CART-001 — Agregar, ajustar y eliminar productos del carrito local
- [ ] HU-TECH-CART-001 — Persistencia de carrito + price_snapshot
- [ ] HU-UI-CART-001 — Carrito con CTA fijo "Ir a pagar"

### Pricing/Envío
- [ ] HU-FUNC-PRICE-001 — Mostrar descuento por volumen aplicado en checkout
- [ ] HU-FUNC-PRICE-002 — Calcular y mostrar costo de envío en checkout
- [ ] HU-TECH-PRICE-001 — Servicio de cotización (quote) para totales finales
- [ ] HU-UI-PRICE-001 — Checkout con desglose claro de totales

### Stock
- [ ] HU-FUNC-STOCK-001 — Validar stock antes de permitir finalizar compra (hard stop)
- [ ] HU-TECH-STOCK-001 — Validación just-in-time con soporte a "reserva por X minutos"
- [ ] HU-UI-STOCK-001 — UI de stock con acciones rápidas

### Checkout
- [ ] HU-FUNC-CHK-001 — Finalizar compra encolando la orden (flujo confiable)
- [ ] HU-TECH-CHK-001 — Idempotencia (client_order_id) + deduplicación por consulta
- [ ] HU-NF-CHK-001 — Prevención de doble tap y multi-submit
- [ ] HU-UI-CHK-001 — UI "Procesando orden" + éxito/error

### Pedidos
- [ ] HU-FUNC-ORD-001 — Ver historial y detalle de pedidos (Pendiente/Entregado)
- [ ] HU-UI-ORD-001 — Historial simple con 2 estados visibles

### Sync / Observabilidad / Seguridad
- [ ] HU-TECH-SYNC-001 — Pull incremental de pedidos
- [ ] HU-TECH-OBS-001 — Instrumentación del embudo de conversión
- [ ] HU-NF-OBS-001 — Notificar degradación del sistema padre (Woo/ERP)
- [ ] HU-NF-SEC-001 — Política de datos sensibles (cifrado + minimización)

---

## PHASE_2_SCALE (5 HUs)

- [ ] HU-FUNC-SCALE-001 — Wishlist (favoritos)
- [ ] HU-FUNC-SCALE-002 — Programa de lealtad
- [ ] HU-TECH-SCALE-001 — Preparar base para notificaciones futuras (sin activar)
- [ ] HU-NF-SCALE-001 — Hardening de performance (catálogo + imágenes)
- [ ] HU-UI-SCALE-001 — UX post-compra mejorada (recompra rápida)

---

> **Estado**: PHASE_0_FUNDACION COMPLETADA — Próximo: PHASE_1_MVP
> Actualizar este documento al finalizar cada HU.
> Última actualización: 2026-03-01
