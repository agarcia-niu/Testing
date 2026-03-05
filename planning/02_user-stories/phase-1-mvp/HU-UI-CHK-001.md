# HU-UI-CHK-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-CHK-001 |
| Título | UI "Procesando orden" + éxito/error |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Checkout |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver el estado de mi orden mientras se procesa,
para mantener confianza en que mi pedido será registrado.

### Cómo debe funcionar
- Estado "procesando" con explicación clara de lo que está sucediendo.
- Éxito: mostrar order_id + botón "Ver pedido".
- Error: mensaje claro + botón reintentar (si aplica).

## Criterios de Aceptación
- [ ] Mensajes humanos en español.
- [ ] Pantalla de procesando clara.
- [ ] Éxito muestra order_id.
- [ ] Error con CTA.

## Dependencias
- HU-FUNC-CHK-001
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- Estado "procesando" sin timeout genera ansiedad.
- Mitigación: Timeout con mensaje + opción de ver pedidos.

## Telemetría
- Evento: order_processing_shown, order_success_shown, order_error_shown
- Métrica: Tiempo promedio en pantalla de procesando

## Notas
- El mensaje de procesando debe transmitir calma y confianza al usuario.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
