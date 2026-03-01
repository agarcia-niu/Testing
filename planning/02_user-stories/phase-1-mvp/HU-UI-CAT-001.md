# HU-UI-CAT-001

| Campo | Valor |
|-------|-------|
| ID | HU-UI-CAT-001 |
| Título | Cards de producto con jerarquía clara |
| Tipo | UI_UX |
| Fase | PHASE_1_MVP |
| Epic | Catálogo |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero ver cards de producto con información clara,
para decidir rápidamente qué comprar.

### Cómo debe funcionar
- Imagen, nombre, precio y disponibilidad visible en 5-10 segundos.
- Jerarquía visual que priorice la información más relevante para la decisión de compra.

## Criterios de Aceptación
- [ ] Tap targets correctos (44px mínimo).
- [ ] Jerarquía visual clara.
- [ ] Imagen + nombre + precio + disponibilidad visibles.

## Dependencias
- HU-FUNC-CAT-001
- HU-UI-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/components/

## Riesgos
- Imágenes de producto con aspect ratios variados.
- Mitigación: Container con aspect ratio fijo + object-fit.

## Telemetría
- Evento: product_card_tapped
- Métrica: CTR de cards de producto

## Notas
- Asegurar que la card sea legible en pantallas pequeñas de gama media.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
