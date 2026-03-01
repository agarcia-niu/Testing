# HU-FUNC-SCALE-002

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-SCALE-002 |
| Título | Programa de lealtad |
| Tipo | FUNCIONAL |
| Fase | PHASE_2_SCALE |
| Epic | Growth |
| Estado | PENDIENTE |
| Prioridad | P2 |

## Descripción
Como usuario frecuente,
quiero ver mis puntos y beneficios de lealtad,
para sentirme motivado a seguir comprando.

### Cómo debe funcionar
- Mostrar puntos/beneficios acumulados.
- Reglas de lealtad configuradas desde administración.
- Visibilidad de beneficios disponibles y progreso.

## Criterios de Aceptación
- [ ] Sección de lealtad accesible desde perfil
- [ ] Puntos/beneficios visibles
- [ ] Reglas definidas desde administración y reflejadas en app
- [ ] Historial de puntos ganados/canjeados

## Dependencias
- Phase 1 completada
- HU-FUNC-AUTH-001 (sesión de usuario)

## Impacto
- Usuarios afectados: Usuario final (clientes recurrentes)
- Módulos afectados: app/ui/screens/loyalty/, app/network/

## Riesgos
- Reglas de lealtad complejas difíciles de representar en UI
- Mitigación: Diseñar UI flexible que soporte reglas simples inicialmente

## Telemetría
- Evento: loyalty_viewed, loyalty_reward_redeemed
- Métrica: Usuarios con programa activo, tasa de canje

## Notas
- Requiere definición de reglas de negocio con stakeholders

---
Creada: 2026-03-01
Actualizada: 2026-03-01
