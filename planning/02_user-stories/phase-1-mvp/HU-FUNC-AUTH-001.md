# HU-FUNC-AUTH-001

| Campo | Valor |
|-------|-------|
| ID | HU-FUNC-AUTH-001 |
| Título | Login obligatorio para acceder a la app |
| Tipo | FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Autenticación |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero iniciar sesión para acceder a catálogo, carrito y pedidos,
para proteger mi información y mi cuenta.

### Cómo debe funcionar
- Sin sesión activa, el usuario es redirigido a la pantalla de Login.
- Si el token expira, se fuerza un re-login mostrando un mensaje claro de expiración.

## Criterios de Aceptación
- [ ] Manejo completo de expiración de token (respuesta 401).
- [ ] Redirect automático a pantalla de login si no hay sesión activa.
- [ ] Mensaje claro al usuario cuando la sesión ha expirado.

## Dependencias
- HU-TECH-FOUND-001
- HU-TECH-FOUND-002
- HU-NF-FOUND-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/ui/screens/auth/, app/network/

## Riesgos
- El flujo de re-autenticación puede interrumpir la experiencia del usuario.
- Mitigación: Implementar silent refresh antes de que el token expire.

## Telemetría
- Evento: login_success, login_failure, token_expired
- Métrica: Tasa de login exitoso, frecuencia de expiración de token

## Notas
- El login es requisito previo para cualquier funcionalidad de la app en Phase 1.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
