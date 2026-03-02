# CLAUDE.md — REGLAS DEL PROYECTO (PLANTILLA DE GOBERNANZA)

## Proyecto
- **Nombre**: [NOMBRE_PROYECTO]
- **Framework**: [FRAMEWORK]
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

### Plantilla de Historia de Usuario:

```
ID: HU-XXX
Título:
Tipo: [FUNCIONAL | TECNICA | NO_FUNCIONAL | UI_UX]
Fase: [PHASE_0_FUNDACION | PHASE_1_MVP | PHASE_2_SCALE]
Epic:
Estado: [PENDIENTE | EN_PROGRESO | PARCIAL | FINALIZADA | BLOQUEADA | DESCARTADA]
Prioridad: [P0 | P1 | P2 | P3]

Descripción:
Como [tipo de usuario],
quiero [acción/funcionalidad],
para [beneficio/valor].

Criterios de Aceptación:
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

Dependencias:
- Ninguna / HU-XXX

Impacto:
- Usuarios afectados:
- Módulos afectados:

Riesgos:
- Riesgo 1
- Mitigación:

Telemetría:
- Evento:
- Métrica:

Notas:
-

Creada: YYYY-MM-DD
Actualizada: YYYY-MM-DD
```

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
- `FUNCIONAL` — Comportamiento visible para el usuario
- `TECNICA` — Infraestructura, implementación interna
- `NO_FUNCIONAL` — Rendimiento, seguridad, accesibilidad
- `UI_UX` — Interfaz de usuario y experiencia

## 4. Fases
- `PHASE_0_FUNDACION` — Infraestructura base, setup, gobernanza
- `PHASE_1_MVP` — Funcionalidad core del producto mínimo viable
- `PHASE_2_SCALE` — Mejoras, optimización, escalabilidad

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
- No inventar integraciones externas.
- No crear prompts sin solicitud.
- No agregar dependencias sin ADR.

## 8. Estructura de Planning

```
planning/
├── 00_index.md                    # Índice maestro del proyecto
├── 01_product/                    # Definición de producto, visión, alcance
│   └── README.md
├── 02_user-stories/               # Historias de Usuario organizadas por fase
│   ├── template-hu.md             # Plantilla para nuevas HUs
│   ├── backlog.md                 # Backlog consolidado
│   ├── phase-0-fundacion/         # HUs de Phase 0
│   ├── phase-1-mvp/              # HUs de Phase 1
│   └── phase-2-scale/            # HUs de Phase 2
├── 03_architecture/               # Documentos de arquitectura del sistema
│   └── README.md
├── 04_technical-decisions/        # ADRs (Architecture Decision Records)
│   └── ADR-template.md
├── 05_prompts-registry/           # Registro de prompts utilizados
│   └── README.md
├── 06_flow-diagrams/              # Diagramas de flujo (Mermaid)
├── 07_api-contracts/              # Contratos de API y catálogo de errores
├── 08_non-functional/             # Requisitos no funcionales
│   └── README.md
└── 09_roadmap/                    # Roadmap por fases y plan de releases
    └── README.md
```

## 9. Plantilla ADR (Architecture Decision Record)

Archivo: `ADR-XXX-titulo-corto.md`

```
# ADR-XXX: [Título de la Decisión]

## Estado
[PROPUESTA | ACEPTADA | RECHAZADA | DEPRECADA | REEMPLAZADA]

## Fecha
YYYY-MM-DD

## Contexto
Describir el contexto y el problema que motiva esta decisión.

## Opciones Consideradas
1. Opción A — Descripción breve
2. Opción B — Descripción breve
3. Opción C — Descripción breve

## Decisión
Describir la decisión tomada y por qué se eligió esta opción.

## Consecuencias

### Positivas
- Consecuencia positiva 1
- Consecuencia positiva 2

### Negativas
- Consecuencia negativa 1
- Consecuencia negativa 2

## Referencias
- Enlaces o documentos relevantes

## HUs Relacionadas
- HU-XXX
```

## 10. Plantilla Índice Maestro (`00_index.md`)

```
# Índice Maestro del Proyecto

## [NOMBRE_PROYECTO]

| Carpeta | Contenido | Estado |
|---------|-----------|--------|
| `01_product/` | Definición de producto, visión, alcance | PENDIENTE |
| `02_user-stories/` | Historias de Usuario y plantilla HU | PENDIENTE |
| `03_architecture/` | Arquitectura técnica del sistema | PENDIENTE |
| `04_technical-decisions/` | ADRs (Architecture Decision Records) | PENDIENTE |
| `05_prompts-registry/` | Registro de prompts utilizados | PENDIENTE |
| `06_flow-diagrams/` | Diagramas de flujo | PENDIENTE |
| `07_api-contracts/` | Contratos de API | PENDIENTE |
| `08_non-functional/` | Requisitos no funcionales | PENDIENTE |
| `09_roadmap/` | Roadmap del proyecto por fases | PENDIENTE |

## Documentos de Referencia
- `/CLAUDE.md` — Reglas del proyecto
- `/CHANGELOG.md` — Registro de cambios

## Fase Actual: PHASE_0_FUNDACION

### Principios
- **Framework**: [FRAMEWORK]
- **Fuente de Verdad**: `planning/` y `CLAUDE.md`
```

## 11. Convención de IDs para Historias de Usuario

Formato: `HU-[TIPO]-[EPIC]-[NÚMERO]`

- **TIPO**: `FUNC`, `TECH`, `NF`, `UI`
- **EPIC**: Identificador corto del epic (ej: AUTH, CAT, CART, FOUND)
- **NÚMERO**: Secuencial de 3 dígitos (001, 002...)

Ejemplos:
- `HU-FUNC-AUTH-001` — Historia funcional de autenticación
- `HU-TECH-FOUND-003` — Historia técnica de fundación
- `HU-NF-SEC-001` — Historia no funcional de seguridad
- `HU-UI-CAT-001` — Historia UI/UX de catálogo

## 12. Convenciones Generales de Código
- TypeScript strict mode obligatorio
- Archivos: camelCase para código, kebab-case para documentación
- Un export por archivo para componentes
- Interfaces sobre types cuando sea posible

---

## Instrucciones de Uso

Para aplicar esta gobernanza a un nuevo proyecto:

1. Copiar este archivo como `CLAUDE.md` en la raíz del proyecto
2. Reemplazar `[NOMBRE_PROYECTO]` y `[FRAMEWORK]`
3. Crear la estructura `planning/` según la sección 8
4. Agregar secciones específicas del dominio según necesidad (ej: reglas de sync, flujos de negocio, políticas de datos)
5. Definir la estructura de carpetas de código del proyecto en una nueva sección
6. Comenzar con Phase 0: crear HUs fundacionales y ADRs iniciales
