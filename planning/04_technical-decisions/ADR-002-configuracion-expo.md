# ADR-002: Configuración del Proyecto Expo

## Estado
ACEPTADA

## Fecha
2026-03-01

## Contexto
El proyecto requiere un framework de desarrollo mobile que soporte iOS y Android con un modelo offline-first. Se necesita definir la versión de SDK, el workflow (managed vs bare), el lenguaje de tipado, y las dependencias base del proyecto.

## Opciones Consideradas
1. **Expo SDK 52, managed workflow, TypeScript strict** — Framework completo con herramientas integradas (EAS Build, Expo Router). No requiere Xcode/Android Studio para desarrollo básico.
2. **React Native CLI (bare)** — Control total del proyecto nativo. Requiere configuración manual de cada dependencia nativa.
3. **Expo bare workflow** — Combina Expo con acceso nativo directo. Mayor complejidad de mantenimiento.

## Decisión
Se elige la **Opción 1: Expo SDK 52, managed workflow, TypeScript strict**.

Razones:
- Managed workflow simplifica builds y actualizaciones OTA.
- Expo SDK 52 incluye expo-sqlite, expo-secure-store y expo-router como módulos integrados.
- TypeScript strict previene errores en tiempo de compilación.
- Compatible con el modelo offline-first del proyecto.
- Menor curva de aprendizaje y mantenimiento.

### Dependencias base incluidas en esta decisión:
- `expo` ~52.0 — Framework base
- `expo-router` — Navegación file-based (ver ADR-006)
- `@react-native-community/netinfo` — Detección de estado de red para offline-first
- `uuid` — Generación de client_order_id para idempotencia

### Estructura de directorios:
- `app/` — Reservado para Expo Router (rutas y pantallas)
- `src/` — Código modular de la aplicación (core, infra, ui)
- `assets/` — Recursos estáticos (imágenes, fuentes)

## Consecuencias

### Positivas
- Desarrollo rápido sin configuración nativa
- Builds automatizados con EAS
- Módulos Expo integrados (SQLite, SecureStore) sin linking manual
- Hot reload confiable

### Negativas
- Limitado a APIs que Expo soporta (mitigable con config plugins)
- Tamaño de bundle ligeramente mayor que bare React Native
- Dependencia del ecosistema Expo para actualizaciones de SDK

## Referencias
- https://docs.expo.dev/
- CLAUDE.md — Restricción: React Native + Expo

## HUs Relacionadas
- HU-TECH-FOUND-001 (Proyecto base Expo)
