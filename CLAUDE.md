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
