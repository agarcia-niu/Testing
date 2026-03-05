# HU-NF-SEC-001

| Campo | Valor |
|-------|-------|
| ID | HU-NF-SEC-001 |
| Título | Política de datos sensibles (cifrado + minimización) |
| Tipo | NO_FUNCIONAL |
| Fase | PHASE_1_MVP |
| Epic | Seguridad |
| Estado | PENDIENTE |
| Prioridad | P0 |

## Descripción
Como usuario,
quiero que la app guarde el mínimo de datos necesarios y los proteja,
para reducir el riesgo de exposición de mi información.

### Cómo debe funcionar
- Guardar el mínimo necesario de datos del usuario.
- Cifrar toda información sensible almacenada localmente.
- Logout limpia todos los datos del usuario del dispositivo.

## Criterios de Aceptación
- [ ] Checklist de seguridad en planning.
- [ ] Datos sensibles cifrados.
- [ ] Minimización documentada.
- [ ] Logout limpia datos.

## Dependencias
- HU-NF-FOUND-001
- HU-TECH-AUTH-001

## Impacto
- Usuarios afectados: Usuario final
- Módulos afectados: app/storage/, planning/08_non-functional/

## Riesgos
- Datos sensibles en logs o telemetría.
- Mitigación: Sanitización de datos en capa de telemetría.

## Telemetría
- Evento: N/A (política de seguridad)
- Métrica: N/A (política de seguridad)

## Notas
- Documentar qué datos se almacenan y cuáles se cifran como parte del checklist de seguridad.

---
Creada: 2026-03-01
Actualizada: 2026-03-01
