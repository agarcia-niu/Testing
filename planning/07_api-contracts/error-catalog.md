# Catálogo de Errores Estándar

## App Mobile WooCommerce

Este catálogo define los errores estándar de la app con mensajes humanos y acciones recomendadas.

---

## Formato

| Código | Tipo | Mensaje Usuario | CTA |
|--------|------|-----------------|-----|
| código_interno | categoría | texto que ve el usuario | acción sugerida |

---

## Errores de Red

| Código | Tipo | Mensaje Usuario | CTA |
|--------|------|-----------------|-----|
| `ERR_NETWORK` | Network | No hay conexión a internet | Revisar conexión |
| `ERR_TIMEOUT` | Network | La operación tardó demasiado | Reintentar |
| `ERR_SERVER_DOWN` | Network | El servicio no está disponible | Reintentar más tarde |

## Errores de Autenticación

| Código | Tipo | Mensaje Usuario | CTA |
|--------|------|-----------------|-----|
| `ERR_AUTH_INVALID` | Auth | Usuario o contraseña incorrectos | Verificar datos |
| `ERR_AUTH_EXPIRED` | Auth | Tu sesión ha expirado | Iniciar sesión |
| `ERR_AUTH_FORBIDDEN` | Auth | No tienes permisos para esta acción | Contactar soporte |

## Errores de Datos

| Código | Tipo | Mensaje Usuario | CTA |
|--------|------|-----------------|-----|
| `ERR_NOT_FOUND` | Data | El recurso no fue encontrado | Volver |
| `ERR_VALIDATION` | Data | Datos incorrectos, verifica la información | Corregir datos |
| `ERR_CONFLICT` | Data | Hubo un conflicto con la operación | Reintentar |

## Errores de Servidor

| Código | Tipo | Mensaje Usuario | CTA |
|--------|------|-----------------|-----|
| `ERR_SERVER_500` | Server | Ocurrió un error inesperado | Reintentar |
| `ERR_SERVER_DEGRADED` | Server | El sistema está presentando problemas | Esperar / Reintentar más tarde |

## Errores de Stock/Checkout

| Código | Tipo | Mensaje Usuario | CTA |
|--------|------|-----------------|-----|
| `ERR_STOCK_UNAVAILABLE` | Stock | Producto sin stock disponible | Ajustar / Quitar / Reintentar |
| `ERR_QUOTE_FAILED` | Checkout | No se pudo calcular el total | Reintentar |
| `ERR_ORDER_FAILED` | Checkout | No se pudo crear el pedido | Reintentar |
| `ERR_SHIPPING_FAILED` | Checkout | No se pudo calcular el envío | Verificar dirección |

---

> **Estado**: PENDIENTE — Completar y validar durante implementación de Phase 0 y Phase 1.
> Referenciado por: HU-NF-FOUND-002
> Última actualización: 2026-03-01
