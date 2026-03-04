# Endpoints WooCommerce — Referencia para App Mobile

## Fuente

Documentado a partir de: `API_Reference_WooCommerce.pdf` (referencia oficial del proyecto).
Base URL: `https://{dominio}/wp-json/wc/v3`
Versión API: WooCommerce REST API v3

---

## Autenticación

Todos los endpoints requieren autenticación.

- **En desarrollo/Postman**: Basic Auth con Consumer Key (`ck_xxxxx`) + Consumer Secret (`cs_xxxxx`).
- **En la app**: JWT de usuario inyectado por `HttpClient` (interceptor Bearer token). Ver [api-security.md](../08_non-functional/api-security.md).

---

## 1. Listar Productos

| Campo | Valor |
|-------|-------|
| **Endpoint** | `/wp-json/wc/v3/products` |
| **Método** | `GET` |
| **Autenticación** | Requerida |
| **Descripción** | Obtiene el listado completo de productos de la tienda WooCommerce. |

### Parámetros

Ninguno requerido. WooCommerce admite filtros opcionales estándar (paginación, búsqueda, categoría, etc.) no documentados en el PDF.

### Ejemplo de Request

```http
GET /wp-json/wc/v3/products
Authorization: Basic {credentials}
```

### Ejemplo de Response

```json
[
  {
    "id": 4993,
    "name": "Nombre del Producto",
    "slug": "nombre-del-producto",
    "permalink": "https://{dominio}/producto/nombre-del-producto/",
    "type": "simple",
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "<p>Descripción completa del producto.</p>",
    "short_description": "<p>Descripción corta.</p>",
    "sku": "SKU-001",
    "price": "150.00",
    "regular_price": "150.00",
    "sale_price": "",
    "stock_quantity": 25,
    "stock_status": "instock",
    "categories": [
      {
        "id": 15,
        "name": "Categoría",
        "slug": "categoria"
      }
    ],
    "images": [
      {
        "id": 100,
        "src": "https://{dominio}/wp-content/uploads/imagen.jpg",
        "name": "imagen",
        "alt": ""
      }
    ]
  }
]
```

### Uso en la App

| Módulo | Archivo | Función |
|--------|---------|---------|
| HTTP | `src/infra/http/httpClient.ts` | `HttpClient.get('/products')` |
| Storage | `src/infra/storage/repositories/productRepository.ts` | `ProductRepository.upsertBatch()` |
| Sync | Pull incremental | `modified_after=last_sync_at` (ver [reconciliacion.md](../03_architecture/reconciliacion.md)) |

### Flujo

```
WooCommerce → GET /products → HttpClient.get() → ProductRepository.upsertBatch() → SQLite products
```

### Mapeo Response → Entidad Local

| Campo WooCommerce | Campo Local (`Product`) |
|-------------------|------------------------|
| `id` | `id` |
| `name` | `name` |
| `price` | `price` (parseFloat) |
| `stock_quantity` | `stockQuantity` |
| `categories[0].name` | `category` |
| `images[0].src` | `imageUrl` |
| (objeto completo) | `dataJson` (JSON.stringify) |

---

## 2. Crear Orden

| Campo | Valor |
|-------|-------|
| **Endpoint** | `/wp-json/wc/v3/orders` |
| **Método** | `POST` |
| **Content-Type** | `application/json` |
| **Autenticación** | Requerida |
| **Descripción** | Crea un nuevo pedido en WooCommerce. |

### Parámetros (Body)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `customer_id` | `number` | Sí | ID del cliente en WooCommerce |
| `payment_method` | `string` | Sí | Slug del método de pago (ej: `"bacs"`) |
| `payment_method_title` | `string` | Sí | Nombre visible del método de pago |
| `set_paid` | `boolean` | Sí | Si la orden se marca como pagada al crear |
| `line_items` | `array` | Sí | Productos del pedido |
| `line_items[].product_id` | `number` | Sí | ID del producto |
| `line_items[].quantity` | `number` | Sí | Cantidad |

### Ejemplo de Request

```http
POST /wp-json/wc/v3/orders
Content-Type: application/json
Authorization: Basic {credentials}
```

```json
{
  "customer_id": 1680,
  "payment_method": "bacs",
  "payment_method_title": "Transferencia bancaria",
  "set_paid": false,
  "line_items": [
    {
      "product_id": 4993,
      "quantity": 1
    }
  ]
}
```

### Ejemplo de Response

```json
{
  "id": 12345,
  "status": "pending",
  "customer_id": 1680,
  "payment_method": "bacs",
  "payment_method_title": "Transferencia bancaria",
  "set_paid": false,
  "total": "150.00",
  "line_items": [
    {
      "product_id": 4993,
      "quantity": 1,
      "subtotal": "150.00",
      "total": "150.00"
    }
  ],
  "date_created": "2026-03-04T10:30:00",
  "meta_data": []
}
```

### Notas Importantes

- La app agrega `meta_data` con `client_order_id` para idempotencia (ver [order-contract.md](./order-contract.md)).
- La app también puede agregar campos `billing` y `shipping` (ver contrato de órdenes).
- El precio NO se envía en `line_items`; WooCommerce usa su precio actual.
- `set_paid: false` siempre en MVP — el pago se maneja externamente.

### Uso en la App

| Módulo | Archivo | Función |
|--------|---------|---------|
| Sync | `src/infra/sync/jobRunner.ts` | Procesador `CREATE_ORDER` |
| Storage | `src/infra/storage/repositories/orderRepository.ts` | `OrderRepository.create()` / `updateStatus()` |
| Checkout | Ver [flujo-checkout.md](../03_architecture/flujo-checkout.md) | Flujo completo |

### Flujo

```
CartItems → OrderDraft (DRAFT) → SyncQueue.enqueue(CREATE_ORDER) → JobRunner → POST /orders → CONFIRMED
```

---

## 3. Obtener Cliente por ID

| Campo | Valor |
|-------|-------|
| **Endpoint** | `/wp-json/wc/v3/customers/{id}` |
| **Método** | `GET` |
| **Autenticación** | Requerida |
| **Descripción** | Obtiene los datos de un cliente específico por su ID. |

### Parámetros (Path)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | `number` | Sí | ID del cliente en WooCommerce |

### Ejemplo de Request

```http
GET /wp-json/wc/v3/customers/1680
Authorization: Basic {credentials}
```

### Ejemplo de Response

```json
{
  "id": 1680,
  "date_created": "2025-01-15T08:00:00",
  "email": "cliente@ejemplo.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "role": "customer",
  "username": "juan.perez",
  "billing": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "company": "",
    "address_1": "Calle Principal 123",
    "address_2": "",
    "city": "Ciudad",
    "state": "Estado",
    "postcode": "12345",
    "country": "MX",
    "email": "cliente@ejemplo.com",
    "phone": "555-1234"
  },
  "shipping": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "company": "",
    "address_1": "Calle Principal 123",
    "address_2": "",
    "city": "Ciudad",
    "state": "Estado",
    "postcode": "12345",
    "country": "MX"
  }
}
```

### Uso en la App

| Módulo | Archivo | Función |
|--------|---------|---------|
| HTTP | `src/infra/http/httpClient.ts` | `HttpClient.get('/customers/{id}')` |
| Security | `src/infra/security/authStorage.ts` | Almacenar `userId` post-login |

### Flujo

```
Login exitoso → SecureStorage.saveUserId() → GET /customers/{id} → Datos billing/shipping para checkout
```

### Datos Relevantes para la App

- `billing` y `shipping`: Se usan como datos predeterminados al construir el payload de orden.
- `email`: Identificación del usuario.
- `id`: Se almacena como `userId` en SecureStorage tras login.

---

## 4. Listar Todos los Clientes

| Campo | Valor |
|-------|-------|
| **Endpoint** | `/wp-json/wc/v3/customers` |
| **Método** | `GET` |
| **Autenticación** | Requerida |
| **Descripción** | Obtiene el listado de todos los clientes. |

### Parámetros (Query)

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `role` | `string` | No | Filtro por rol de usuario (ej: `"all"`) |

### Ejemplo de Request

```http
GET /wp-json/wc/v3/customers?role=all
Authorization: Basic {credentials}
```

### Ejemplo de Response

```json
[
  {
    "id": 1680,
    "email": "cliente@ejemplo.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "role": "customer",
    "username": "juan.perez",
    "billing": { "..." },
    "shipping": { "..." }
  }
]
```

### Uso en la App

> **NO requerido en MVP.** La app solo consulta clientes por ID individual (`GET /customers/{id}`) usando el `userId` del usuario autenticado. El listado completo de clientes es un endpoint administrativo que no se consume desde la app móvil.

---

## Resumen de Endpoints

| # | Endpoint | Método | Usado en MVP | Módulo |
|---|----------|--------|:------------:|--------|
| 1 | `/products` | GET | Sí | Catálogo |
| 2 | `/orders` | POST | Sí | Checkout |
| 3 | `/customers/{id}` | GET | Sí | Autenticación |
| 4 | `/customers?role=all` | GET | No | — |

---

## Gaps Identificados

Los siguientes endpoints son **necesarios para el MVP** pero **NO aparecen en el PDF de referencia**:

| Endpoint | Método | Requerido por | HU |
|----------|--------|---------------|----|
| `/orders` | GET | Pull incremental de pedidos | HU-TECH-SYNC-001 |
| `/orders/{id}` | GET | Verificación de idempotencia/dedup | HU-TECH-CHK-001 |

> **Acción requerida**: Confirmar existencia de estos endpoints con el equipo de backend o documentación WooCommerce adicional. Registrado en [README.md](./README.md).

---

> Fuente: `API_Reference_WooCommerce.pdf`
> HUs Relacionadas: HU-FUNC-CAT-001, HU-TECH-CAT-001, HU-FUNC-CHK-001, HU-FUNC-AUTH-001
> Última actualización: 2026-03-04
