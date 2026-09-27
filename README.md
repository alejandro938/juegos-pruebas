# Juegos en pruebas · Stela Digital

Taller de juegos de Alejandro Zayas. Cada juego vive en su carpeta y se sirve tal cual (HTML, sin compilar) con
Cloudflare Pages en `juegos.steladigital.com`. **Nada de aquí toca la web de Stela Mare ni su CRM.**

| Carpeta | Juego | Estado |
|---|---|---|
| `khorvath-prime/` | Khorvath-Prime, sigilo y rescate (un solo `index.html`) | en construcción: 62 salas verificadas; faltan los 14 idiomas |

- `index.html`: portada que lista los juegos (con `noindex`: es un taller, no una web).
- `robots.txt`: pide a los buscadores que no indexen nada.
- Cloudflare Pages: preajuste «Ninguno», sin comando de compilación, directorio de salida `/`.
- Las herramientas de prueba de Khorvath (arnés, bot, guiones) están en el repositorio de la web, en `pruebas/khorvath/`.
