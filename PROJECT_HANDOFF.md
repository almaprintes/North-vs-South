# NORTH vs SOUTH · Continuidad de proyecto

Fecha: 2026-10-14. Rama principal prevista: `main`. Prototipo DEV 0.1.

## Decisiones de diseño confirmadas

- RPG móvil de armwrestling, protagonista único elegido entre varios luchadores iniciales; modo historia con ese luchador.
- NORTH y SOUTH representan los hemisferios terrestres; geografía real, deportistas ficticios.
- Controles de fuerza mediante alternancia rápida L/R. La habilidad manual se combina con estadísticas de Fuerza, Muñeca, Técnica, Resistencia y Explosividad.
- Dominio físico continuo 50/50 a 100/0, con progresión de dificultad por posición y referencias cada 10%, sin saltos de animación.
- Expresiones y posturas del personaje según dominio, cansancio y presión.
- Técnica por ventanas voluntarias que nunca interrumpen automáticamente el combate. Icono preparado discreto. Minijuegos de reflejos y barra de precisión oscilante.
- Stances THUMBS (móvil sujeto) y TABLETOP (móvil apoyado), cada uno guarda posición y diámetro de botones L/R por separado.
- Gimnasio con 5 minijuegos; fatiga y progreso de atributos. Desarrollo físico gradual del luchador.
- Primer objetivo: validar prototipo táctil móvil, antes de desarrollar 3D definitivo.

## Alcance real del archivo actual

`index.html` contiene una prueba autónoma y funcional sin red ni backend. Los valores finales de balance, animaciones IK, modelos 3D y motor de competición aún requieren implementación y pruebas de juego.

## Política de publicación

Verificar el workflow/deploy verde antes de declarar Pages publicado; no afirmar que es live sin comprobar el sitio.


## DEV 0.3 · Animación correcta

La deformación de fotografías/sprites se sustituye por `rig3d.js` (WebGL2, esqueleto procedural con segmentos rígidos y geometría 3D) y `rig2d.js` (reserva articulada sin deformar fotografías). `index.html` conserva físicas, técnicas, entrenamientos y stances. El protagonista es siempre el competidor de la izquierda; `pos=100` representa PIN en la almohadilla derecha roja, `pos=0` PIN en la almohadilla izquierda azul. Longitudes rígidas y apoyo de codos verificados en 101 posiciones mediante `tests/rig.test.cjs`. El PIN permanece en pantalla 850 ms antes del resultado. **Pendiente:** pruebas visuales reales WebGL2 en Safari/iPhone; no presentar estos personajes estilizados como render cinematográfico definitivo.

### Rectificación DEV 0.3.1 (23/11/2026)

Feedback directo del usuario: el rig low-poly reemplazó el arte premium por muñecos visualmente inaceptables. Se restaura la ilustración premium como opción predeterminada, sin falsa animación. `?devRig=1` activa el rig técnico para especialistas. Mantener siempre prioridad de calidad artística y realismo anatómico; no volver a poner low-poly como diseño final. Próxima tarea sustancial: personajes 3D de alta fidelidad con articulaciones IK auténticas y manos libres en sus agarres.


DEV 0.4: Vista experimental `?frames=1` con 6 poses NORTH 50-100. Atlas `assets/frames-north-v04.webp`. SOUTH aún no validado; no mostrar imágenes antiguas con pin en apoyo de codo. La vista normal sigue DEV 0.3.1. Mantener ambas posibilidades y completar 0-49 antes de hacerla default.


## DEV 0.4.1 (23/11/2026)
La queja de ausencia de movimiento tenía 3 causas: la reproducción estaba oculta tras `?frames=1`, las imágenes NORTH solo se usaban con personajes NORTH y la demostración requería pulsar su botón. Corregido: dos atlas 6 frames, activación por defecto, demostración automática al entrar en Combate y barra para scrub manual, sin alterar físicas/stats/stances. `preview.html` usa GIF nativo, siempre animado. Corregido `northDom` cuando el usuario es SOUTH. Pendiente comprobar Safari/iPhone y geometría del fotograma PIN extremo SOUTH (no declarar 100% validado). No sustituir los assets premium por low-poly.

## Feedback pendiente 23/11/2026 — Victoria del azul desde atrás
El rojo ganando está casi perfecto y **no debe alterarse**. La victoria del azul debe mostrarlo desde la espalda, inclinándose sobre las muñecas para alcanzar **la almohadilla de PIN del extremo opuesto de la mesa**, no la misma de la victoria roja. Las muñecas no necesitan quedar claramente visibles; sí debe ser anatómicamente creíble. Sigue siendo una corrección gráfica **pendiente de generación e inspección visual**, no arreglada por la selección de sprites. Especificación y criterios completos: `docs/BLUE_VICTORY_CAMERA_PIN_SPEC_2026-11-23.md`. Mantener 4 almohadillas (2 codos + 2 PIN); no espejar la victoria roja ni sustituir arte premium por muñecos low-poly.


## DEV 0.4.2 candidato (23/11/2026)
Nuevo atlas azul alternativo bajo `?blueCandidate=1`, conservando SOUTH original y NORTH original por defecto. La nueva postura final enseña más la espalda del ganador azul, pero no se declara versión definitiva: diferencias de encuadre y transición visibles. Pedir aprobación visual y pulir arte antes de predeterminarlo. Revisar `README.md` y la especificación de PIN azul.
