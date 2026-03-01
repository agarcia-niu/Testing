# Política de Datos Sensibles

## Principio
Minimizar la superficie de exposición. Solo almacenar lo estrictamente necesario para funcionalidad offline.

## Clasificación de Datos

### Nivel 1: Secretos (cifrado obligatorio)
| Dato | Almacenamiento | Método |
|------|---------------|--------|
| Token JWT | expo-secure-store | Cifrado nativo OS |
| user_id | expo-secure-store | Cifrado nativo OS |
| session_id | Memoria (no persiste) | N/A |

### Nivel 2: Datos sensibles del negocio (protección parcial)
| Dato | Almacenamiento | Método |
|------|---------------|--------|
| Order drafts | SQLite | Campos minimizados, limpieza en logout |
| Cart items | SQLite | Limpieza en logout |
| Precio/snapshot | SQLite | Solo para referencia offline |

### Nivel 3: Datos de cache (sin cifrado)
| Dato | Almacenamiento | Método |
|------|---------------|--------|
| Catálogo productos | SQLite | Cache con TTL por sync |
| Historial pedidos | SQLite | Solo pedidos confirmados |
| Telemetría eventos | SQLite | Buffer temporal |

### NUNCA almacenar
- Contraseña del usuario
- Datos de tarjeta/pago
- Información bancaria
- Datos biométricos

## Política de Limpieza (Logout)

Al ejecutar logout, en este orden:
1. `SecureStore.deleteItemAsync('auth_token')` — Eliminar token
2. `SecureStore.deleteItemAsync('user_id')` — Eliminar user_id
3. `DELETE FROM orders WHERE status_local = 'DRAFT'` — Limpiar drafts
4. `DELETE FROM cart_items` — Vaciar carrito
5. `DELETE FROM sync_queue WHERE status != 'CONFIRMED'` — Limpiar jobs pendientes
6. `DELETE FROM telemetry_events WHERE flushed = 0` — Limpiar telemetría pendiente (opcional)
7. Navegar a pantalla de Login

## Política en Telemetría
- NUNCA incluir token, contraseña o datos de pago en eventos de telemetría.
- Sanitizar datos antes de track(): eliminar campos sensibles de payloads.
- session_id es el único identificador de correlación (NO user_id en eventos).

## Checklist de Seguridad

- [ ] Token nunca en texto plano (verificar con inspección de storage)
- [ ] Logout limpia todos los secretos
- [ ] Datos de pago nunca tocan storage local
- [ ] Telemetría no filtra datos sensibles
- [ ] Order drafts se limpian en logout
- [ ] Logs de desarrollo no imprimen tokens

---

> Referenciado por: CLAUDE.md sección 12
> HUs Relacionadas: HU-NF-FOUND-001, HU-NF-SEC-001, HU-TECH-AUTH-001
> Última actualización: 2026-03-01
