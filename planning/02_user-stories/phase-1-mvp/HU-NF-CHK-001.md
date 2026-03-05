# HU-NF-CHK-001

| Campo | Valor |
|-------|-------|
| ID | HU-NF-CHK-001 |
| Título | Prevención de doble tap y multi-submit |
| Tipo | NO_FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Checkout |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero que el botón de confirmar compra no me permita duplicar pedidos,
para tener confianza en el proceso.

### Cómo debe funcionar
- Botón se deshabilita inmediatamente tras el primer tap.
- No se crean múltiples drafts de pedido en paralelo.
- Reintentos controlados internamente sin intervención del usuario.

## Criterios de Aceptación
- [ ] Sin duplicidad de pedidos.
- [ ] Botón deshabilitado tras primer tap.
- [ ] No se generan múltiples drafts.

## Dependencias
- HU-FUNC-CHK-001
- HU-TECH-CHK-001

## Impacto
- Usuarios afectados: Usuario final, negocio
- Módulos afectados: app/ui/screens/checkout/

## Riesgos
- Race condition entre UI y lógica de negocio.
- Mitigación: Lock mutex en capa de servicio.

## Telemetría
- Evento: double_tap_prevented
- Métrica: Frecuencia de intentos de doble tap

## Notas
- Crítico para la integridad de pedidos y la confianza del usuario.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
