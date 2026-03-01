# HU-TECH-FOUND-005

| Campo | Valor |
|-------|-------|
| ID | HU-TECH-FOUND-005 |
| Título | Telemetría base + correlación por session_id |
| Tipo | TECNICA |
| Fase | PHASE_0_FUNDACION |
| Epic | Observabilidad |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como equipo de desarrollo,
quiero tener una capa base de analytics/eventos con correlación por sesión,
para poder medir el comportamiento del usuario y diagnosticar problemas.

### Cómo debe funcionar
- Se crea session_id al abrir la app.
- Todo evento incluye session_id para correlación.
- Configuración enable/disable por entorno.
- Eventos almacenados localmente antes de enviar.

## Criterios de Aceptación
- [ ] session_id generado al iniciar app
- [ ] Todos los eventos incluyen session_id
- [ ] Configuración enable/disable funcional
- [ ] Eventos registrados localmente con formato estándar
- [ ] Interfaz de telemetría definida (sin backend real)

## Dependencias
- HU-TECH-FOUND-001
- HU-TECH-FOUND-003 (SQLite para buffer local de eventos)

## Impacto
- Usuarios afectados: Equipo de desarrollo, producto
- Módulos afectados: app/telemetry/

## Riesgos
- Overhead de telemetría afectando performance en gama media
- Mitigación: Batching de eventos y flush periódico, no síncrono

## Telemetría
- Evento: telemetry_session_start, telemetry_flush
- Métrica: Eventos por sesión, latencia de flush

## Notas
- Base para HU-TECH-OBS-001 (instrumentación del embudo de conversión)

---
Creada: 2026-03-01
Actualizada: 2026-03-01
