# HU-FUNC-CHK-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-CHK-001 |
| Título | Finalizar compra encolando la orden (flujo confiable) |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Checkout |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero que al confirmar mi compra el proceso sea confiable y no genere duplicados,
para tener certeza de que mi pedido fue registrado correctamente.

### Cómo debe funcionar
- Al hacer tap en "Finalizar", se bloquea el botón para evitar doble tap.
- Se valida el stock real de los productos.
- Se obtiene el quote final del servidor.
- Se crea un draft de la orden.
- Se encola el job CREATE_ORDER para procesamiento.
- No se asume éxito sin confirmación del servidor.

## Criterios de Aceptación
- [ ] Cero duplicidad de órdenes garantizada.
- [ ] Bloqueo de doble tap en el botón de finalizar.
- [ ] Flujo completo: validación de stock, quote, draft y enqueue.
- [ ] No se asume éxito sin confirmación explícita del servidor.

## Dependencias
- HU-FUNC-STOCK-001
- HU-FUNC-PRICE-001
- HU-FUNC-PRICE-002
- HU-TECH-CHK-001
- HU-TECH-FOUND-004

## Impacto
- Usuarios afectados: Usuario final, negocio (integridad de pedidos)
- Módulos afectados: app/ui/screens/checkout/, app/sync/

## Riesgos
- Red intermitente puede generar un estado incierto en la creación de la orden.
- Mitigación: Idempotencia con client_order_id + consulta de verificación posterior.

## Telemetría
- Evento: checkout_started, checkout_completed, checkout_failed, checkout_duplicate_prevented
- Métrica: Tasa de conversión de checkout, tiempo de confirmación de orden

## Notas
- Este flujo es crítico para la integridad del negocio; la idempotencia y la prevención de duplicados son requisitos no negociables.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
