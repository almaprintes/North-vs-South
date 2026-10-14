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

## DEV 0.1.1 · Primera revisión de ergonomía

- Pantalla de combate adaptada a móviles de menor altura (hasta 375 × 667 CSS px en las pruebas).
- Se prioriza mantener ambos botones L/R visibles y accesibles sin desplazamiento vertical durante la ronda.
- En pantallas cortas se ocultan indicadores secundarios y se reduce la arena sin cambiar las físicas ni estadísticas.
- La validación es de navegador móvil simulado; queda pendiente la prueba táctil real en iPhone y la confirmación externa de GitHub Pages y Actions.
