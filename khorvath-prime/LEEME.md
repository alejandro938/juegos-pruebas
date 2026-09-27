# Khorvath-Prime (juego en construcción)

Juego de sigilo y rescate para el Arcade de la web, inspirado en las mecánicas de Abe (sin copiar nada suyo).
Se construye en la nube (rama claude/free-credits-cloud-mz8cak). Vive en lab/ (solo con sesión del CRM) hasta que esté terminado;
entonces pasará a juegos/khorvath-prime/ con su entrada en juegos.json, sus 14 idiomas, el ranking común y su prueba.

Un solo fichero: index.html (fondos pintados incrustados, sonido sintetizado, sin dependencias).

## Qué hay dentro
- 62 salas hechas a mano en 6 zonas + jefe (las 62 con solución guionizada y verificada), 108 hermanos que rescatar, 60 «turnos extra» generados y el reto diario.
- Selector de salas (Salas), ayuda «?», galería de mapas con luz (tecla G, ↑/↓ para cambiar de mapa), contador
  EVADIDOS / PERDIDOS / EN CELDA siempre arriba, contrarreloj por zona, medallas.
- Mecánicas: tono (sincronizar Gólems, montar sabuesos, Gólem aliado), órdenes 1-2-3, Gólems de ronda con parada y
  Gólems dormidos, drones, cadenas, telégrafo de pared, lodo refractario, vagoneta sobre raíl, salas a oscuras con
  lámparas que se rompen de una tuerca, duelo de silbatos contra el altavoz.

## Cómo se comprueba (pruebas/khorvath y la prueba 173 de la batería)
- harness.js: carga el juego en node sin navegador; bot.js: bot genérico que juega con teclas; runbots.js: lo lanza
  en paralelo sobre todas las salas; sol/room-N.js: solución guionizada de cada sala; checksol.js N: la comprueba
  con varias semillas. Cada sala hecha a mano tiene su guion verificado.
