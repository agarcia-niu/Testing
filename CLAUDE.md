# CLAUDE.md — REGLAS DEL PROYECTO

## Proyecto
- **Nombre**: App Mobile WooCommerce
- **Framework**: React Native + Expo
- **Modo**: Offline-first (excepto compras)
- **Idioma**: Español

---

## 1. Fuente Única de Verdad
- `planning/` es la referencia oficial del proyecto.
- Nunca generar arquitectura nueva sin revisar `planning/`.
- Nunca modificar HUs sin actualizar backlog.
- Si hay contradicción → consultar antes de continuar.
- Toda decisión técnica debe registrarse como ADR en `planning/04_technical-decisions/`.
- Toda HU debe reflejar su estado real.
- Ningún prompt se genera sin solicitud explícita.

## 2. Gestión de Historias de Usuario

Cada historia debe incluir:
- ID único
- Título
- Tipo
- Fase
- Epic
- Estado
- Prioridad
- Descripción
- Criterios de Aceptación
- Dependencias
- Impacto
- Riesgos
- Telemetría
- Notas
- Fecha de creación
- Fecha de última actualización

### Prioridades permitidas:
- `P0` — Bloqueante / fundacional
- `P1` — Funcionalidad core MVP
- `P2` — Importante pero diferible
- `P3` — Deseable, baja urgencia

### Estados permitidos:
- `PENDIENTE`
- `EN_PROGRESO`
- `PARCIAL`
- `FINALIZADA`
- `BLOQUEADA`
- `DESCARTADA`

## 3. Clasificación Obligatoria de HUs

Tipo debe ser uno de:
- `FUNCIONAL`
- `TECNICA`
- `NO_FUNCIONAL`
- `UI_UX`

## 4. Fases
- `PHASE_0_FUNDACION`
- `PHASE_1_MVP`
- `PHASE_2_SCALE`

## 5. Prompts
- Ningún prompt se genera sin solicitud explícita.
- Todo prompt debe basarse únicamente en `planning/` y este documento.
- Si falta información → consultar antes de generar.
- Registro de prompts en `planning/05_prompts-registry/`.

## 6. Actualización Obligatoria
- Toda HU finalizada debe actualizar `planning/09_roadmap/`.
- Registrar cambios en `CHANGELOG.md`.
- Toda decisión técnica requiere ADR en `planning/04_technical-decisions/`.

## 7. Restricciones
- No inventar endpoints reales.
- No inventar integración ERP.
- No crear prompts sin solicitud.
- No agregar dependencias sin ADR.

## 8. Convenciones de Carpetas

### Estructura del proyecto:
- `app/` — Rutas y pantallas (Expo Router file-based routing). EXCLUSIVO para navegación.
- `src/` — Código modular de la aplicación:
  - `src/core/` — Tipos compartidos, configuración, constantes
  - `src/infra/http/` — Cliente HTTP y normalización de errores
  - `src/infra/storage/` — SQLite, migraciones, repositorios
  - `src/infra/sync/` — Cola de sincronización y job runner
  - `src/infra/security/` — Cifrado y almacenamiento seguro
  - `src/infra/telemetry/` — Eventos, sesiones, analytics
  - `src/ui/` — Componentes compartidos y hooks
  - `src/modules/` — Módulos de feature (por epic)
- `assets/` — Recursos estáticos (imágenes, fuentes)
- `planning/` — Documentación y gobernanza (fuente de verdad)
- `branding/` — Assets de marca

### Convenciones de código:
- TypeScript strict mode obligatorio
- Archivos: camelCase para código, kebab-case para documentación
- Un export por archivo para componentes React
- Interfaces sobre types cuando sea posible

## 9. Reglas de Sincronización

### Sync Queue:
- Toda operación de escritura al servidor DEBE pasar por sync_queue.
- Estados de job: PENDING → SENDING → CONFIRMED / FAILED_RETRYABLE / FAILED_FINAL.
- Retry con backoff exponencial (2s, 4s, 8s).
- Recovery de crash: jobs en SENDING → PENDING al reiniciar app.
- No bloquear UI durante procesamiento.

### Pull incremental:
- Query por `modified_after=last_sync_at`.
- Actualizar `last_sync_at` solo tras sync exitoso.
- No bloquear UI durante sync.
- Frecuencia: al reconectar + al abrir pantalla relevante.

### Reconciliación local-remoto:
- Remote siempre gana (excepto carrito local).
- Carrito: merge local + remoto con timestamp más reciente.
- Conflictos: registrar evento de telemetría y resolver silenciosamente.
- Referencia completa: `planning/03_architecture/reconciliacion.md`

## 10. Idempotencia Obligatoria

- Toda orden DEBE tener `client_order_id` (UUID v4) generado ANTES de encolar.
- `client_order_id` se guarda como metadata en WooCommerce.
- Antes de retry tras respuesta incierta:
  1. Consultar órdenes recientes del usuario.
  2. Comparar `client_order_id` en metadata.
  3. Si match → CONFIRMED (dedup exitoso).
  4. Si no match → retry controlado.
- Referencia completa: `planning/03_architecture/idempotencia.md`

## 11. Flujo Oficial de Checkout

El checkout sigue un flujo estricto documentado en `planning/03_architecture/flujo-checkout.md`:
1. Bloqueo de multi-submit (UI + lógica)
2. Validación de stock (hard stop)
3. Quote final (subtotal + descuento + envío)
4. Crear order_draft local
5. Encolar CREATE_ORDER en sync_queue
6. Procesamiento async por job runner
7. Confirmación o dedup por consulta
- NUNCA asumir éxito sin confirmación del servidor.
- CERO duplicidad de órdenes garantizada.

## 12. Política de Datos Sensibles

### Datos cifrados (expo-secure-store):
- Token JWT
- user_id

### Datos NUNCA almacenados:
- Contraseña del usuario
- Datos de pago/tarjeta

### Limpieza en logout:
1. Borrar token y user_id de SecureStore
2. Limpiar orders con status DRAFT de SQLite
3. Limpiar cart_items de SQLite
4. Limpiar telemetry_events no enviados (opcional)

### Principio de minimización:
- Solo almacenar lo estrictamente necesario para funcionalidad offline.
- Referencia completa: `planning/03_architecture/politica-datos-sensibles.md`
