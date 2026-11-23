# NORTH vs SOUTH — corrección pendiente de la victoria del azul

Fecha del feedback: 23/11/2026
Estado: **especificación registrada, arte no corregido ni validado aún**.

## Comentario del jugador
> «Era casi perfecta el rojo ganando es perfecto pero el azul para ganar la almohadilla está al otro lado de la mesa para verlo ganando veríamos su espalda inclinándose sobre las muñecas. Estas no se verían bien pero no hace falta».

## Corrección obligatoria
- **Conservar intacta la secuencia de victoria del rojo**, que el jugador considera correcta.
- La secuencia de victoria del **azul** debe representar una victoria **hacia el otro extremo de la mesa**, no duplicar la del rojo, ni desplazar artificialmente la mano hacia la misma almohadilla.
- En el PIN del azul, desde la cámara del combate, predomina **la espalda del ganador azul**, con el torso y hombros inclinándose de forma creíble sobre el área de las muñecas. **No es necesario que el agarre quede totalmente visible**, pero nunca debe parecer que las manos están desconectadas.
- Mantener **cuatro almohadillas** distinguibles: dos soportes de codo, que sirven de pivote y mantienen el apoyo de los brazos, y dos almohadillas **laterales de victoria (PIN)**. La mano vencida debe contactar con la almohadilla de PIN de su lado; no con el apoyo de codo.
- Conservar la cámara, el estilo visual premium, las proporciones de los atletas, la mesa y su iluminación entre los seis fotogramas. No hacer efecto espejo de la secuencia roja ni estirar/interpolar fotografías o sustituirlas por rig low-poly.

## Implementación pretendida
- La lógica actual en `index.html` / `frameForDominance` ya asigna NORTH (azul, izquierda) a su atlas y SOUTH (rojo, derecha) al suyo. **No alterar el motor de dominio para camuflar un error gráfico**.
- Se necesita **rehacer únicamente las poses relevantes del atlas azul** (`assets/frames-north-v04.webp`) si se confirma que son las incoherentes, manteniendo los seis cuadros 724×362 en atlas 3×2 (2172×724), o introducir un asset nuevo versionado del mismo formato. Confirmar primero visualmente qué cuadros están afectados.
- El extremo PIN azul debe progresar por etapas continuas desde el centro, con orientación, inclinación y ubicación realistas. El fotograma extremo no basta si las poses intermedias saltan de lado o giran abruptamente.
- Actualizar cualquier demo/preview derivada después de cambiar el atlas. La demo no debe anunciar como corregida la geometría hasta pasar revisión visual en Safari/iPhone.

## Criterios de aceptación
1. Deslizador a 50%: ambos contrincantes en posición central con agarre coherente.
2. Avance progresivo hacia victoria roja: **misma calidad y composición aprobadas**.
3. Avance progresivo hacia victoria azul: el ganador gira e inclina el torso hasta presentar principalmente la espalda a cámara; el brazo vencido cae hacia la almohadilla **opuesta** al PIN rojo.
4. En ambos extremos: apoyos de codo y PIN independientes, sin manos atravesando madera, sin almohadillas intercambiadas, sin deformación de cuerpos.
5. Scrubber de 0 a 100% y reproducción automática escogen el atlas y el cuadro correctos. También cuando el personaje jugable es SOUTH.
6. Probar visualmente en iPhone/Safari además de las pruebas automatizadas; la selección correcta de sprites **no demuestra** por sí sola corrección anatómica.

## Alcance
Es una corrección de **arte, puesta en escena y anatomía**. No modificar estadísticas, físicas RPG, stances THUMBS/TABLETOP ni controles.
