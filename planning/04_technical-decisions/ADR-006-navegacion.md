# ADR-006: Navegación

## Estado
ACEPTADA

## Fecha
2026-03-01

## Contexto
La aplicación necesita un sistema de navegación que soporte el flujo MVP: Login → Tabs (Catálogo, Carrito, Pedidos) → Checkout. Debe manejar safe areas, responder a estado de autenticación, y ser escalable para Phase 2.

## Opciones Consideradas
1. **Expo Router** — Navegación file-based construida sobre React Navigation. Convención de archivos en `app/`. Deep linking automático. Enfoque recomendado por Expo.
2. **React Navigation (programático)** — Navegación programática clásica. Configuración explícita de stacks y tabs. Mayor control pero más código boilerplate.
3. **React Native Navigation (Wix)** — Navegación nativa pura. Mejor performance pero incompatible con Expo managed workflow.

## Decisión
Se elige la **Opción 1: Expo Router**.

Razones:
- Recomendado oficialmente por Expo para proyectos nuevos.
- File-based routing reduce boilerplate significativamente.
- Deep linking automático (útil para futuras notificaciones en Phase 2).
- Construido sobre React Navigation — mismas capacidades subyacentes.
- Mejor integración con Expo SDK y tooling.

### Estructura de rutas:
```
app/
├── _layout.tsx           # Root layout (auth guard, providers)
├── login.tsx             # Stack: Pantalla de login
├── checkout.tsx          # Stack: Pantalla de checkout
├── (tabs)/
│   ├── _layout.tsx       # Tab navigator config
│   ├── catalog.tsx       # Tab: Catálogo de productos
│   ├── cart.tsx           # Tab: Carrito de compras
│   └── orders.tsx         # Tab: Historial de pedidos
└── +not-found.tsx        # Pantalla 404
```

### Flujo de navegación:
1. App inicia → Root layout verifica auth
2. Sin sesión → redirect a `/login`
3. Con sesión → muestra tabs (Catálogo, Carrito, Pedidos)
4. Checkout → se abre como stack sobre tabs
5. Logout → limpia sesión → redirect a `/login`

### Convenciones:
- Directorio `app/` EXCLUSIVO para rutas (Expo Router)
- Código de negocio/UI en `src/`
- Pantallas importan componentes de `src/ui/components/`

## Consecuencias

### Positivas
- Estructura de rutas visible en el filesystem
- Deep linking automático sin configuración
- Menor boilerplate vs React Navigation programático
- Tipado automático de rutas con TypeScript

### Negativas
- Directorio `app/` reservado exclusivamente para Expo Router
- Menor flexibilidad que navegación programática pura (mitigable con API programática de router)
- Cambios de estructura de navegación requieren mover archivos

## Referencias
- https://docs.expo.dev/router/introduction/
- ADR-002 — Configuración del proyecto Expo
- CLAUDE.md — Reglas del proyecto

## HUs Relacionadas
- HU-UI-FOUND-002 (Base de navegación y layout)
- HU-UI-AUTH-001 (Pantalla Login)
