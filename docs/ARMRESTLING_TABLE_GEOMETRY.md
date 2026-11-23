# NORTH vs SOUTH — geometría de la mesa de pulsos

Estado: especificación obligatoria de arte y animación (2026-11-23).

## Referencia deportiva

Fuente oficial: https://www.waf-armwrestling.com/armwrestling-rules/armwrestling-table/

La mesa tiene CUATRO almohadillas distintas:
1. **Dos almohadillas de codo (elbow pads)**: cuadradas, una para cada competidor, de 17,8 × 17,8 cm y 5,1 cm de grosor en las especificaciones WAF 2023. Los codos de los brazos de competición permanecen apoyados aquí.
2. **Dos almohadillas de contacto o PIN (touch/pin pads)**: alargadas, de 25,4 cm de longitud × 10,2 cm de altura según la misma referencia, situadas en ángulo junto a las zonas laterales. NO son las almohadillas de codo.
3. **Dos agarres verticales (hand pegs)** para las manos libres, uno en cada lado, independientes de las almohadillas.

Para la mesa de brazo derecho, la disposición lateral y los ángulos deben seguir la referencia WAF y no inventarse simetrías equivocadas.

## Convención de animación para la vista lateral de NORTH vs SOUTH

- Jugador visual a la izquierda (azul) = NORTH; rival a la derecha (rojo) = SOUTH (cuando se utilice este emparejamiento).
- Posición 50: manos de combate trabadas y elevadas sobre el centro, sin PIN.
- Posición 100: gana el jugador de la izquierda; la línea de muñeca o mano del rival baja hasta el **pin pad lateral del lado derecho / rojo**, sin hundirse en su propia almohadilla cuadrada de codo.
- Posición 0: gana el jugador de la derecha; la mano o línea de muñeca del jugador izquierdo baja hasta el **pin pad lateral del lado izquierdo / azul**, separada de su almohadilla cuadrada de codo.
- En 0..100: codos sobre pads cuadradas, manos libres sobre pegs propios, manos de competición permanecen trabadas, sin cruzar brazos libres ni desplazar los agarres de la mesa.
- El entorno, indumentaria, rostros y cámara se mantienen consistentes entre frames. Solo cambia la postura competitiva, y ningún segmento anatómico se deforma para interpolar.

## Control de calidad obligatorio antes de integrar sprites

Rechazar cualquier frame que muestre:
- Menos o más de cuatro almohadillas, o una almohadilla de codo utilizada como objetivo de victoria.
- PIN que no alcance la almohadilla alargada correspondiente.
- Manos libres cruzadas o agarrando el peg del contrario.
- Codos desplazados de su cuadrado, manos de combate separadas, antebrazos elásticos, manos extra, cambios de vestuario/cámara/escenario.
- Interpretación inversa del marcador de dominio.

Los frames generados antes de fijar esta geometría **no se consideran validados** ni deben emplearse como atlas definitivo. Primero validar imágenes extremas: 0%, 50% y 100%; después generar y comprobar los intermedios. El hecho de tener imágenes separadas no garantiza continuidad anatómica perfecta.
