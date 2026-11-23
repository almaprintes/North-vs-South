# DEV 0.4 — Reproductor de fotogramas premium (experimental)

**Fecha:** 2026-11-23

- Activar con `?frames=1` en GitHub Pages.
- Archivo `assets/frames-north-v04.webp`: atlas WebP de 2172 × 724 px, 3 columnas × 2 filas; cada frame mide 724 × 362 px.
- Seis fotogramas de NORTH: 50%, 60%, 70%, 80%, 90%, 100%. Sin warping, morphing o redimensionamiento independiente de brazos.
- Se selecciona el frame por `game.pos`, el mismo valor de dominio que controla la física y el resultado.
- Los cuatro apoyos se distinguen en la plancha generada (dos pads de codo y dos pin pads). En 100% la mano de SOUTH toca el pad de PIN lateral rojo.
- La animación experimental mantiene un frame central si gana SOUTH (< 50%), con aviso visible de arte pendiente, **no pretende mostrar una victoria visual falsa de NORTH**.
- La escena premium anterior permanece como predeterminada sin query param; el low-poly rig solo se activa con `?devRig=1`.
- Si falla la descarga del atlas, hay fallback al arte premium original.
- Sigue pendiente la secuencia de 0-49% (SOUTH), el resto de los 21 frames planteados, y la verificación en Safari iOS real. No activar este modo por defecto hasta completar ambos lados.

## Criterios para la fase SOUTH

Antes de aceptar cualquier nueva imagen, validar: codos sobre sus almohadillas cuadradas, manos libres en pegs propios, cuatro pads separados, agarrón continuo y contacto final de la mano de NORTH con el pin pad **azul lateral**. Mantener exactamente los personajes y encuadre de NORTH.

La guía de geometría obligatoria está en `docs/ARMRESTLING_TABLE_GEOMETRY.md`.
