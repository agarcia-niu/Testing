# ADR-003: Cliente HTTP

## Estado
ACEPTADA

## Fecha
2026-03-01

## Contexto
La aplicación necesita un cliente HTTP central que maneje autenticación JWT, normalización de errores y timeouts. Debe ser compatible con el modo offline-first y no conectar a endpoints reales en Phase 0.

## Opciones Consideradas
1. **Fetch nativo con wrapper custom** — API estándar del navegador disponible en React Native. Sin dependencias externas. Control total del comportamiento.
2. **Axios** — Librería popular (~13KB). Interceptores built-in, cancelación, transformación de request/response.
3. **Ky** — Wrapper sobre fetch (~3KB). API más ergonómica pero orientada a browser.

## Decisión
Se elige la **Opción 1: Fetch nativo con wrapper custom**.

Razones:
- Zero dependencias externas adicionales.
- Fetch está disponible nativamente en React Native.
- Control total sobre interceptores JWT, timeout y normalización de errores.
- Sin riesgo de incompatibilidad con versiones de React Native/Expo.
- Wrapper custom se adapta exactamente al modelo de error del proyecto (error-catalog.md).

### Características del wrapper:
- Interceptor JWT automático (adjunta token si existe en SecureStore)
- Timeout configurable (default: 15 segundos)
- Normalización de errores a formato estándar del proyecto
- Tipos de error: NETWORK, TIMEOUT, AUTH (401/403), CLIENT (4xx), SERVER (5xx)
- AbortController para cancelación de requests

## Consecuencias

### Positivas
- Zero dependencias HTTP externas
- Comportamiento 100% controlado y predecible
- Formato de error alineado al error-catalog.md
- Sin overhead de librería externa

### Negativas
- Requiere implementar manualmente lo que Axios provee built-in (interceptores, retry)
- Más código propio a mantener
- Sin soporte automático de progress events (no necesario para MVP)

## Referencias
- planning/07_api-contracts/error-catalog.md — Catálogo de errores estándar
- CLAUDE.md — Restricción: No inventar endpoints reales

## HUs Relacionadas
- HU-TECH-FOUND-002 (Cliente HTTP base)
- HU-NF-FOUND-002 (Catálogo de errores)
