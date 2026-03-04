# ADR-007: Autenticación Basic Auth con Consumer Keys

## Estado
ACEPTADA

## Fecha
2026-03-04

## Contexto

La app móvil necesita autenticarse contra la API WooCommerce REST v3 para consumir endpoints de productos, órdenes y clientes. El PDF de referencia API muestra autenticación mediante Basic Auth con Consumer Key y Consumer Secret.

Originalmente se planteó usar JWT de usuario (ADR implícito en api-security.md), pero:
- No se cuenta con endpoint JWT documentado en el PDF de referencia.
- Los endpoints disponibles (GET /products, POST /orders, GET /customers/{id}) funcionan con Basic Auth.
- Se necesita avanzar con la implementación de Catálogo y Carrito sin depender de un endpoint de login.

## Opciones Consideradas

1. **Basic Auth directo** — Consumer Key + Consumer Secret codificados en Base64, enviados en header `Authorization: Basic {base64}`.
2. **JWT de usuario** — Login con username/password, token JWT en cada request.
3. **OAuth 1.0a** — Protocolo estándar de WooCommerce para conexiones no-HTTPS.

## Decisión

Usar **Basic Auth directo** con Consumer Key y Consumer Secret para el MVP.

Las credenciales se almacenan en `expo-secure-store` (cifrado nativo del OS) y se inyectan automáticamente por el `HttpClient` en cada request.

## Consecuencias

### Positivas
- Funciona inmediatamente con los endpoints documentados en el PDF.
- No requiere plugin adicional de WordPress (como JWT Authentication).
- Simplifica el flujo: no hay login/logout de usuario, no hay manejo de expiración de token.
- Desbloquea la implementación de Catálogo, Carrito y Checkout sin esperar endpoint de auth.

### Negativas
- Las consumer keys otorgan acceso a nivel tienda (no a nivel usuario individual).
- Si se extraen del dispositivo, podrían usarse para acceder a datos de otros clientes.
- No hay concepto de "sesión de usuario" — la app necesitará otro mecanismo para identificar al usuario (ej: selección de customer_id).
- En producción se recomienda migrar a una capa intermedia (proxy backend) que oculte las consumer keys.

### Mitigaciones
- Consumer keys almacenadas en `expo-secure-store` (iOS Keychain / Android EncryptedSharedPreferences).
- Consumer keys NUNCA en código fuente ni documentación versionada.
- Se evaluará migración a proxy backend en Phase 2 si los datos de telemetría lo justifican.

## Cambios en Código

| Archivo | Cambio |
|---------|--------|
| `src/infra/security/secureStorage.ts` | Agregar `saveConsumerKey()`, `getConsumerKey()`, `saveConsumerSecret()`, `getConsumerSecret()` |
| `src/infra/http/httpClient.ts` | Interceptor de auth: priorizar Basic Auth si hay consumer keys, fallback a Bearer token |
| `planning/08_non-functional/api-security.md` | Actualizar para reflejar decisión de Basic Auth |

## Referencias
- `API_Reference_WooCommerce.pdf` — Documentación de referencia del proyecto
- [woocommerce-endpoints.md](../07_api-contracts/woocommerce-endpoints.md) — Endpoints documentados
- [api-security.md](../08_non-functional/api-security.md) — Política de seguridad API

## HUs Relacionadas
- HU-FUNC-CAT-001, HU-TECH-CAT-001 (Catálogo)
- HU-FUNC-CART-001, HU-TECH-CART-001 (Carrito)
- HU-FUNC-CHK-001 (Checkout)
