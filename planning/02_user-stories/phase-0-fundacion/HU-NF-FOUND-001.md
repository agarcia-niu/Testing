# HU-NF-FOUND-001

| Campo | Valor |
|-------|-------|
| ID | HU-NF-FOUND-001 |
| Título | Cifrado de datos sensibles en storage |
| Tipo | NO_FUNCIONAL |
| Fase | PHASE_0_FUNDACION |
| Epic | Seguridad |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario de la app,
quiero que mis datos sensibles estén cifrados en el dispositivo,
para proteger mi información personal y credenciales.

### Cómo debe funcionar
- Token nunca almacenado en texto plano.
- Logout limpia todos los secretos del storage seguro.
- Drafts de orden cifrados o minimizados en almacenamiento local.

## Criterios de Aceptación
- [ ] Token almacenado con cifrado (SecureStore o equivalente)
- [ ] Logout limpia secretos completamente
- [ ] Drafts de orden protegidos en storage
- [ ] Verificación de que no hay datos sensibles en texto plano en storage

## Dependencias
- HU-TECH-FOUND-001

## Impacto
- Usuarios afectados: Usuario final (seguridad de datos)
- Módulos afectados: app/storage/, app/network/ (token management)

## Riesgos
- Incompatibilidad de APIs de cifrado entre iOS y Android
- Mitigación: Usar Expo SecureStore que abstrae ambas plataformas

## Telemetría
- Evento: secure_store_error
- Métrica: Tasa de errores de cifrado/descifrado

## Notas
- Requiere ADR para selección de estrategia de cifrado (SecureStore, MMKV encrypted, etc.)

---
Creada: 2026-03-01
Actualizada: 2026-03-01
