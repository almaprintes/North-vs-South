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