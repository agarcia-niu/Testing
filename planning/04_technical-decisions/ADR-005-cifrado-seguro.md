# ADR-005: Cifrado y Almacenamiento Seguro

## Estado
ACEPTADA

## Fecha
2026-03-01

## Contexto
La aplicación maneja datos sensibles (tokens JWT, user_id, order drafts) que deben almacenarse de forma segura en el dispositivo. Se necesita una estrategia de cifrado que proteja estos datos y permita limpieza completa al logout. Debe funcionar en iOS y Android sin configuración nativa adicional.

## Opciones Consideradas
1. **expo-secure-store** — Módulo integrado de Expo. Usa iOS Keychain y Android EncryptedSharedPreferences. Sin configuración nativa.
2. **react-native-mmkv (encrypted)** — Key-value store de alto rendimiento con opción de cifrado. Requiere config plugin en Expo.
3. **AsyncStorage + cifrado manual** — AsyncStorage estándar con capa de cifrado AES manual. Mayor complejidad y superficie de error.

## Decisión
Se elige la **Opción 1: expo-secure-store**.

Razones:
- Integrado en Expo SDK — sin dependencias ni config plugins adicionales.
- Usa mecanismos nativos de seguridad del OS (Keychain en iOS, EncryptedSharedPreferences en Android).
- API simple de key-value suficiente para tokens y credenciales.
- Compatible con managed workflow.

### Datos a proteger:
| Dato | Almacenamiento | Cifrado |
|------|---------------|---------|
| Token JWT | expo-secure-store | Sí (nativo OS) |
| user_id | expo-secure-store | Sí (nativo OS) |
| Order drafts | SQLite (campo cifrado o minimizado) | Parcial |
| Contraseña | NUNCA almacenada | N/A |
| Datos de pago | NUNCA almacenados | N/A |

### Política de limpieza (logout):
1. `SecureStore.deleteItemAsync('token')`
2. `SecureStore.deleteItemAsync('user_id')`
3. Limpiar tablas sensibles de SQLite (orders con status DRAFT, cart_items)
4. Limpiar telemetry_events no enviados (opcional)

### Limitaciones conocidas:
- expo-secure-store tiene límite de 2KB por valor en Android
- No es adecuado para almacenar grandes cantidades de datos
- Para datos grandes sensibles → usar SQLite con campos minimizados

## Consecuencias

### Positivas
- Cifrado nativo del OS — máxima seguridad disponible
- Zero configuración nativa
- API simple y directa
- Cumple requisito de "token nunca en texto plano"

### Negativas
- Límite de 2KB por valor en Android (suficiente para tokens)
- No es un store general (solo para secretos)
- Sin soporte de queries (es key-value, no DB)

## Referencias
- https://docs.expo.dev/versions/latest/sdk/securestore/
- planning/03_architecture/politica-datos-sensibles.md
- CLAUDE.md — Restricción: Cifrado de datos sensibles

## HUs Relacionadas
- HU-NF-FOUND-001 (Cifrado de datos sensibles en storage)
- HU-TECH-AUTH-001 (Persistencia segura de sesión)
- HU-NF-SEC-001 (Política de datos sensibles)
