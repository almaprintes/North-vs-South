# NORTH vs SOUTH — Armwrestling RPG

Prototipo jugable **DEV 0.1** del juego móvil de pulsos NORTH vs SOUTH.

## Ejecutar

- Abrir `index.html` en un navegador moderno.
- Está pensado para uso táctil en **vertical** desde el móvil.
- No requiere Node, frameworks, cuentas ni recursos externos.

## Contenido del prototipo

- Elección de un luchador para seguir su historia.
- Combate con alternancia de botones L/R.
- Dominio visual continuo 50/50 — 100/0 y fatiga.
- Oportunidades técnicas activadas voluntariamente.
- Minijuegos de reflejos y barra de precisión.
- Entrenamiento de Fuerza, Muñeca, Técnica, Resistencia y Explosividad.
- Dos perfiles ergonómicos: **THUMBS** y **TABLETOP**, con controles reubicables y redimensionables.
- Guardado local en el navegador, cuando está disponible.

## Publicar en GitHub Pages

1. Crear un repositorio público `North-vs-South` en la cuenta `almaprintes`.
2. Subir estos archivos a la rama `main`, manteniendo `index.html` en la raíz.
3. En **Settings → Pages**, elegir **Deploy from a branch**, rama **main**, carpeta **/(root)** y guardar.
4. Esperar a que el despliegue de GitHub Pages figure como completado correctamente.
5. Visitar `https://almaprintes.github.io/North-vs-South/` para probar desde el iPhone.

**No usar el enlace de Pages hasta que GitHub confirme el despliegue.**

## Estado

DEV 0.1 es una maqueta funcional; los personajes 3D y el equilibrio definitivo del combate están pendientes. El prototipo no implementa juego multijugador.

## Próximos pasos

- Pruebas táctiles en iPhone con ambos stances.
- Ajustar presión de ambos luchadores, ritmo y resistencia con datos reales de juego.
- Añadir sistemas de cámara, IK y animaciones 3D.
- Incorporar modo historia, ciudades y torneos NORTH vs SOUTH.

## DEV 0.2 · Pack premium de arte (2026-11-23)

- 7 imágenes WebP locales en `assets/`: escena de combate, dos retratos conceptuales, logotipo, botones azul/rojo y splash del menú. Tamaño total ≈191 KB.
- La escena se renderiza sobre el canvas sustituyendo la ilustración de personajes procedimental; incluye halo dinámico de fuerza y posición.
- Las barras de energía, dominio, técnica, controles L/R, stances y minijuegos siguen siendo DOM interactivo.
- Si falla la carga del arte, se mantiene el dibujo procedural 2D previo como reserva.
- Los personajes de la escena son **arte conceptual fijo**, no avatares individuales del luchador seleccionado ni rig 3D articulado. Las expresiones y posturas fotográficas no están animadas aún.
- Pendiente: pruebas en dispositivos reales, sprites por personaje, rig/IK y animación de brazos, optimización visual final.

## DEV 0.2.1 · Movimiento visible de brazos

- Corregido el problema comunicado: la escena premium ya no queda inmóvil mientras un círculo simula el movimiento. Se ha retirado ese círculo.
- Un atlas WebP de 21 fotogramas deformados mueve manos y antebrazos en función de `g.pos` (0-100); interpolación visual y temblor vinculados a energía.
- Añadida una demostración de movimiento en la pantalla de combate, sin alterar la partida.
- La animación es una solución **2D provisional**: no hay rig 3D, cambios faciales independientes ni pin anatómicamente exacto. El próximo paso gráfico es construir sprites separados/rig IK real.
- Si falla la carga del atlas, se emplea la animación vectorial anterior, no la ilustración estática.
- Pendiente: comprobar Safari/iPhone real y comportamiento de Pages.


## DEV 0.3 — Rig articulado para el combate

- La escena principal usa WebGL2 nativo: **dos personajes 3D estilizados**, mesa, almohadillas de codo, almohadillas de pin y agarres. No requiere bibliotecas externas.
- Los brazos enfrentados tienen huesos rígidos, con **longitud invariable** en el antebrazo (0,975) y brazo superior (1,06). Los codos se desplazan dentro de sus propias almohadillas y las manos permanecen agarradas.
- La mano libre de cada competidor sujeta **exclusivamente el agarre de su lado**.
- **50/50:** manos verticales; **100/0:** gana el jugador izquierdo y toca la almohadilla de pin de la derecha (roja); **0/100:** gana el rival derecho y toca la almohadilla izquierda (azul). No hay saltos entre tramos.
- Tras un PIN, se muestran 850 ms del agarre en contacto con la almohadilla antes del resultado.
- Si el navegador no admite WebGL2, entra una **animación 2D articulada con la misma geometría**. No se usa la antigua animación que deformaba una fotografía.
- **Validación automática:** `node tests/rig.test.cjs` verifica 101 posiciones, longitudes, apoyos y dirección del PIN.
- **Comprobación manual pendiente:** calidad, velocidad y tacto en el iPhone real; el navegador de QA automatizado actualmente tiene WebGL bloqueado, así que el renderizado 3D no está validado visualmente allí.

### Limitaciones actuales

Este es un **rig 3D funcional y estilizado**, no personajes humanos de calidad cinematográfica con piel y expresión fotorrealistas. El objetivo de este paso es **corregir la anatomía y la mecánica visual** antes de producir modelos y texturas premium. Los luchadores siguen siendo modelos genéricos, no avatares únicos de la historia.


## DEV 0.3.1 — Corrección visual prioritaria (23/11/2026)

- Ilustración premium restaurada como vista principal; el rig WebGL low-poly ya no es la experiencia predeterminada.
- La imagen de los luchadores es **estática**. No se muestra como si fuera una animación ni se añade un círculo artificial sobre las manos. Indicadores, técnicas y controles siguen siendo interactivos.
- El prototipo de rig solo se muestra bajo `?devRig=1`, para pruebas de geometría y PIN.
- Próximo objetivo gráfico: personajes de alta fidelidad riggeados, con huesos e IK, anatomía correcta y animaciones que terminen al contacto con la almohadilla.
- Pendiente: verificar el renderizado en Safari real y el estado del despliegue de GitHub Pages.


## DEV 0.4 — Prueba de fotogramas de NORTH

Accede a `?frames=1` para probar seis imágenes premium de NORTH (50–100%) asociadas al marcador. La vista predeterminada no cambia y las poses de SOUTH **siguen pendientes de validación**. Consulta [el estado y la geometría de esta prueba](docs/FRAME_PREVIEW_0.4.md).
