# HU-TECH-FOUND-002

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-FOUND-002 |
| Título | Cliente HTTP base + normalización de errores |
| Tipo | TECNICA |
| Fase | PHASE_0_FUNDACION |
| Epic | Networking |
| Estado | FINALIZADA |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero tener un HttpClient central con soporte JWT y error model único,
para que todas las llamadas de red sean consistentes y mantenibles.

### Cómo debe funcionar
- Todas las llamadas HTTP pasan por un cliente central.
- Adjunta token JWT si existe en storage seguro.
- Normaliza errores (network/timeout/4xx/5xx) en formato estándar.
- No se implementan endpoints reales (solo interfaz y mocks).

## Criterios de Aceptación
- [x] HttpClient central implementado con interceptores
- [x] Timeout configurable definido
- [x] Formato de error estándar definido e implementado
- [x] Soporte JWT (attach token si existe)
- [x] Sin endpoints reales (solo contra mocks)

## Dependencias
- HU-TECH-FOUND-001
- HU-NF-FOUND-001 (cifrado para token storage)

## Impacto
- Usuarios afectados: Equipo de desarrollo
- Módulos afectados: app/network/

## Riesgos
- Selección de librería HTTP inadecuada para offline-first
- Mitigación: ADR obligatorio para selección de librería HTTP

## Telemetría
- Evento: http_request_error
- Métrica: Tasa de errores HTTP por tipo (network/timeout/4xx/5xx)

## Notas
- Requiere ADR para selección de librería HTTP (fetch, axios, ky, etc.)

---
Creada: 2026-03-01
Actualizada: 2026-03-01
