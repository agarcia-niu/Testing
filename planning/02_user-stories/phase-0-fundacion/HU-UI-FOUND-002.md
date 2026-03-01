# HU-UI-FOUND-002

| Campo | Valor |
|-------|-------|
| ID | HU-UI-FOUND-002 |
| Título | Base de navegación y layout (safe areas, estructura MVP) |
| Tipo | UI_UX |
| Fase | PHASE_0_FUNDACION |
| Epic | UI Base |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario de la app,
quiero poder navegar entre las pantallas principales de forma fluida,
para acceder rápidamente a cada sección de la app.

### Cómo debe funcionar
- Stack/tabs definidos para Login, Catálogo, Carrito, Checkout, Pedidos.
- Respeta safe areas en iOS y Android.
- Tap targets mínimos de 44px.
- Navegación funcional entre pantallas stub.

## Criterios de Aceptación
- [ ] Navegación con stack y tabs configurada
- [ ] Pantallas stub para Login, Catálogo, Carrito, Checkout, Pedidos
- [ ] Safe areas respetadas en ambas plataformas
- [ ] Tap targets de mínimo 44px
- [ ] Navegación funcional entre todas las pantallas stub

## Dependencias
- HU-TECH-FOUND-001
- HU-UI-FOUND-001 (componentes base de estados)

## Impacto
- Usuarios afectados: Usuario final (navegabilidad)
- Módulos afectados: app/ui/navigation/, app/ui/screens/

## Riesgos
- Cambios de estructura de navegación difíciles de refactorizar después
- Mitigación: Validar estructura de tabs con stakeholders antes de implementar

## Telemetría
- Evento: screen_view (con screen_name)
- Métrica: Pantallas más visitadas, flujo de navegación

## Notas
- Requiere ADR para selección de librería de navegación (React Navigation, Expo Router, etc.)

---
Creada: 2026-03-01
Actualizada: 2026-03-01
