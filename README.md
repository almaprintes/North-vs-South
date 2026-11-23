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

- Restaurada la ilustración premium en la vista principal del combate; la prueba WebGL con luchadores de estilo low-poly **ya no aparece por defecto**.
- La ilustración premium es **estática**: no se presenta como animación de los brazos, y no se dibuja un círculo simulando el agarre. Los indicadores de dominio, energía y técnicas sí son interactivos.
- El rig 3D sigue disponible *solo* para comprobaciones internas abriendo `?devRig=1` (no es arte final). Con ese parámetro vuelve a mostrarse el botón de prueba de ambos PIN.
- Se mantienen el motor de combate, la progresión, los minijuegos y los controles THUMBS/TABLETOP.
- Para tener movimiento anatómico **y** el aspecto premium hará falta un modelo 3D riggeado/texturizado de calidad o una animación 2D construida con poses coherentes y articulaciones reales. No equiparar una ilustración fija, una interpolación fotográfica o un rig low-poly a ese objetivo.
- Pendiente: validar visualmente en Safari real y revisar el deploy de Pages/Actions.


# NORTH vs SOUTH — DEV 0.4, preview de fotogramas

## Qué funciona
- Reproductor de **6 imágenes premium distintas** para el dominio de NORTH entre 50% y 100%, en pasos de 10%.
- Sprite atlas WebP de 247 KB. Los fotogramas se seleccionan desde el estado real del combate.
- Las manos no se distorsionan ni se estiran en código: se muestra una imagen completa por posición.
- Las dos almohadillas de codo y las dos de PIN son distintas en la nueva secuencia NORTH.
- La física RPG, los dos stances y los minijuegos continúan sin cambios.
- Si el atlas no carga, el juego mantiene la escena ilustrada anterior.

## Acceso de prueba
- `?frames=1`: activa la prueba de 6 fotogramas de NORTH.
- `?devRig=1`: rig de geometría anterior solo para desarrollo.
- Sin parámetros: mantiene la vista premium estable de DEV 0.3.1.

## Limitaciones pendientes
- No se ha validado todavía una secuencia equivalente de SOUTH. Si el rival domina (0..49), la vista experimental conserva la postura central y **se indica que faltan imágenes**; no se representa una falsa victoria de NORTH.
- 6 fotogramas, no 21. No se declara terminada la animación completa de ambos lados.
- La cámara y los personajes son coherentes dentro de los seis frames, pero la secuencia es deliberadamente escalonada, no rig 3D.
- Pendiente de comprobar en iPhone/Safari real y Pages.

## Pruebas ejecutadas
- `node --check` en JS del juego y rigs, `node tests/rig.test.cjs` correcto.
- Tamaño del atlas y asignación paso/frame comprobados.


## DEV 0.4.1 — Animación por fotogramas visible por defecto (23/11/2026)

**Corrección tras la prueba en iPhone:** DEV 0.4 exigía `?frames=1`, un protagonista NORTH y pulsar «Ver secuencia» para apreciar movimiento, por lo que parecía estático.

- Ahora los dos atlas se cargan siempre en el combate (salvo `?devRig=1`).
- Al abrir **Combate** comienza automáticamente una demostración de ida y vuelta de NORTH y SOUTH.
- Deslizador bajo la escena para elegir del 0% al 100% sin jugar; desaparece durante la ronda.
- El combate real selecciona el fotograma según su dominio, con correspondencia hemisférica correcta incluso si el protagonista es SOUTH.
- Se usa una composición visual fija (NORTH azul izquierda / SOUTH rojo derecha). Los textos de los competidores y la barra se ordenan del mismo modo.
- Dos atlas WebP 3×2 de seis fotogramas cada uno; sin deformaciones programáticas.
- Página de prueba sin JavaScript: [`preview.html`](preview.html), con GIF de dos sentidos.
- **Limitación:** seis posturas por hemisferio, no diez. El PIN final de SOUTH necesita una revisión adicional de la almohadilla; esto no es una animación anatómica definitiva. Los actores de este arte son ilustrativos, no los modelos personalizados de la historia.
- Pruebas automáticas del mapeo 0..100 y sintaxis; pendiente validar Safari real y Pages en el dispositivo.

## DEV 0.4.3 — Vista previa de una dirección (23/11/2026)
La demostración ya no alterna atlas incompatibles: se elige Gana azul o Gana rojo; el deslizador se limita al lado seleccionado y la reproducción termina en el PIN sin saltar a la otra animación. `preview.html` sustituye el GIF combinado por una prueba controlada. **Los atlas originales no se han cambiado.** Esto elimina la mezcla en la demo, pero NO resuelve la anatomía del PIN azul ni el cambio de atlas en pleno combate real; queda pendiente un único arte coherente y verificación en iPhone.
