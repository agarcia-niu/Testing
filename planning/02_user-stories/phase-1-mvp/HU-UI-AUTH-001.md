# HU-UI-AUTH-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-AUTH-001 |
| Título | Pantalla Login rápida, simple y confiable |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Autenticación |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero una pantalla de login simple y rápida,
para acceder a la app sin fricción.

### Cómo debe funcionar
- CTA visible sin necesidad de scroll.
- Mensajes claros de error que indiquen al usuario qué corregir.
- Loading inmediato al submit para dar feedback visual.

## Criterios de Aceptación
- [ ] CTA principal visible sin scroll.
- [ ] Errores accionables.
- [ ] Loading state inmediato.

## Dependencias
- HU-FUNC-AUTH-001
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/auth/

## Riesgos
- Teclado oculta campos de entrada.
- Mitigación: KeyboardAvoidingView + scroll.

## Telemetría
- Evento: login_screen_viewed, login_cta_tapped
- Métrica: Tiempo entre vista y tap de CTA

## Notas
- Priorizar simplicidad visual para reducir fricción en el primer contacto con la app.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
