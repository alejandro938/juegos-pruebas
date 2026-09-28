# Página de revisión de Khorvath-Prime

`../index.html` es el juego entero con un panel a la derecha: informe de lo que cambió en cada sala, botones
«Visto bueno» / «Cambiar algo», notas que se guardan solas (en el navegador y, si se elige, en un fichero .md),
«Siguiente / Repetir / Lista» y dónde está el secreto de la sala.

Para regenerarla cuando cambie el juego: `node build.js ../../index.html ../index.html`
(`salas.json` sale del juego con el arnés de pruebas; `informes/N.md` es el informe del operario de cada sala).
