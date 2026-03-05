# HU-TECH-OBS-001

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-OBS-001 |
| Título | Instrumentación del embudo de conversión |
| Tipo | TECNICA |
| Fase | PHASE_1_MVP |
| Epic | Observabilidad |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero instrumentar el embudo de conversión,
para medir fricciones en cada paso y optimizar la tasa de compra.

### Cómo debe funcionar
- Dispara eventos clave en cada paso del embudo con session_id incluido.
- Incluye client_order_id en los eventos de checkout y order cuando aplique.
- Cubre el embudo completo: catálogo → carrito → checkout → orden.

## Criterios de Aceptación
- [ ] Los eventos mínimos están implementados en cada paso del embudo de conversión.
- [ ] Todos los eventos incluyen session_id como campo obligatorio.
- [ ] Los eventos de checkout y order incluyen client_order_id.
- [ ] El embudo completo catálogo → carrito → checkout → orden está cubierto.

## Dependencias
- HU-TECH-FOUND-005

## Impacto
- Usuarios afectados: Equipo de desarrollo, producto
- Módulos afectados: app/telemetry/

## Riesgos
- Eventos faltantes en puntos críticos del embudo que impiden análisis completo.
- Mitigación: Checklist de eventos revisado y validado por producto antes de implementar.

## Telemetría
- Evento: funnel_catalog_view, funnel_cart_add, funnel_checkout_start, funnel_order_complete
- Métrica: Tasa de conversión por paso del embudo

## Notas
- La instrumentación del embudo es clave para decisiones de producto basadas en datos.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
