/* ═══ LLAVES LOCAS · MOTOR (sin pantalla) ═══════════════════════════════════════════════
   Plataformas de pantalla fija con las REGLAS del Manic Miner (Spectrum/Amstrad, 1983), sin
   copiar nada suyo (ni pantallas, ni dibujos, ni música, ni nombre):
   · la sala es de 32×16 casillas de 8 px; el agente ocupa 2 casillas de ancho y 2 de alto;
   · anda 2 px por paso (4 pasos = 1 casilla); darse la vuelta gasta un paso sin moverse;
   · el SALTO es siempre el mismo: 18 pasos, sube 20 px y baja 20 px, y en el aire no se
     cambia de dirección; se atraviesan los suelos desde abajo, los muros no;
   · se cae en vertical, 4 px por paso; caer demasiado mata (contador del original: empieza
     en 2 al salir de un borde y en 6 al acabar un salto; aterrizar con 12 o más = muerte);
   · las CINTAS te llevan; andar en contra es como pulsar las dos teclas: te quedas quieto;
   · los suelos que se DESHACEN aguantan 8 pasos pisados; las casillas MORTALES matan al tocarlas;
   · los enemigos van por un camino fijo y el choque es al píxel;
   · el AIRE baja sin parar; la puerta solo se abre con todas las llaves; lo que sobra de aire
     se cobra en puntos; vida extra cada 10.000.
   Este bloque se prueba con node (_pruebas/mansion-escape-room.js) y lo usa la pantalla.
   ════════════════════════════════════════════════════════════════════════════════════════ */
var MOTOR = (function () {
  'use strict';
  var ANCHO = 32, ALTO = 16;
  var SALTO = [-4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  var CAIDA_MORTAL = 12;
  var AIRE = 1800;                 // pasos de aire de una sala normal (unos 2 min a 15 pasos/s)
  var DERRUMBE = 8;                // pasos que aguanta un suelo que se deshace
  var PUNTOS_LLAVE = 100, VIDA_EXTRA = 10000;
  // Bonus escondidos (idea de Alejandro, 22-sep; no están en el original): gema +500, aire +25 %,
  // vida +1, reloj = los enemigos se quedan quietos 75 pasos (5 s).
  var BONUS = { gema: 500, aire: 0.25, reloj: 75, moneda: 50, esmeralda: 250, rubi: 500, diamante: 1000 };
  var RACHA = 45;                  // pasos (3 s) para encadenar llaves: ×2, ×3, ×4
  var PROPINA = 500;               // la propina del cliente con TODO el aire; con la mitad, 250
  // Poderes (5.ª tanda, 22-sep): botas = salto alto, paraguas = caída lenta y sin daño, imán = atrae llaves; 150 pasos (10 s)
  var PODER = 150;
  // (25-sep, 2b) modo moderno: pasos de «perdón al borde» y de «salto guardado» (ver pasoAgente)
  var COYOTE = 4, GUARDA = 5;
  // Salto con botas: sube 32 px (4 filas) y al bajar pasa justo por -24, -16 y -8 (así puede aterrizar en cada fila)
  // (24-sep) LA GALAXIA, gravedad baja: el salto sube 32 px (4 casillas) y dura 30 pasos; se cae a la mitad de velocidad
  // y se aguantan caídas el doble de largas. Se pide con `gravedad: 'baja'` en la casa o calle.
  // (24-sep, arreglo) la bajada pasa JUSTO por cada fila (72, 80, 88, 96, 104…): antes se saltaba las de 2 y 4 filas
  // más arriba y no se aterrizaba en ellas. Sube 36 px: se llega a un suelo 4 filas más alto.
  var SALTO_LUNA = [-4, -4, -4, -4, -4, -3, -3, -2, -2, -2, -1, -1, -1, -1, 0, 0, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4];
  // trampolín: sube 40 px (5 casillas)
  var SALTO_TRAMP = [-6, -5, -5, -4, -4, -4, -3, -3, -2, -2, -1, -1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6];
  var SALTO_ALTO = [-4, -4, -4, -4, -4, -4, -4, -2, -2, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4];
  // Casillas:  ' ' aire · F suelo · G suelo de cristal · W muro · B bloque (muro) · C se deshace · < > cinta
  //            X Y mortales · Z muro falso · R A bloques de color (rojo/azul: solo es sólido el color activo)
  //            * interruptor de color · 1-4 teletransportes (por parejas) · (K llave, P puerta, @ agente: del plano)
  // (23-sep) J = CAJA que se empuja (2×2 casillas; no va en el plano: va en def.cajas y en el agente, w.cajas)
  // (24-sep, Alejandro: «que para entrar a la sala secreta el suelo sea invisible») I = suelo INVISIBLE: se pisa como F y no se ve
  // (24-sep) T trampolín (te lanza 5 filas) · H hielo (resbala) · S suelo que se HUNDE si te quedas encima (y vuelve)
  // (25-sep, idea 25) U = muro que se ROMPE a cabezazos desde abajo (3 golpes; con la seta, 1). Es la U y no la R porque
  // la R ya es el bloque rojo de los interruptores de color. Mientras no se rompe, es muro (el robot la trata como W).
  var PISABLE = { F: 1, G: 1, W: 1, B: 1, C: 1, '<': 1, '>': 1, J: 1, I: 1, T: 1, H: 1, S: 1, U: 1, O: 1, $: 1 };   // (25-sep) O = madera: se pisa como F y las termitas se la comen
  // (25-sep, 2b) $ = LADRILLO que el interruptor de monedas (palanca `hace: 'monedas'`) convierte en moneda 10 s (y las
  // monedas, en ladrillo). Mientras no se toca, es un bloque más (el robot lo trata como B)
  var MURO = { W: 1, B: 1, J: 1, U: 1, $: 1 };
  // (23-sep, casas nuevas) L = rayo LÁSER: mata; se apaga con su palanca («abre», como una compuerta)
  var MORTAL = { X: 1, Y: 1, L: 1 };
  // (23-sep) LLAVES Y PUERTAS DE COLORES: m/n/q = llave roja/azul/verde (se coge al pasar) · M/N/Q = su puerta, que es
  // muro hasta que llevas su llave. Se guardan en el agente (w.llc, un bit por color) para que el robot las siga.
  var LLAVE_COLOR = { m: 1, n: 2, q: 4 }, PUERTA_COLOR = { M: 1, N: 2, Q: 4 };

  /* ── Dibujos (también sirven para el choque al píxel). '.' = transparente ─────────────── */
  var PIERNAS = [
    ['..mm..mm..', '.mm....mm.', '.mm....mm.', 'kkk....kkk'],
    ['..mm..mm..', '..mm..mm..', '..mm..mm..', '..kkk.kkk.'],
    ['...mmmm...', '...mmmm...', '...mmmm...', '...kkkkk..'],
    ['..mm..mm..', '..mm.mm...', '.mm...mm..', '.kkk..kkk.']
  ];
  var CUERPO = ['...hhhh...', '..hhhhhh..', '..hsssss..', '..hssoss..', '...ssss...', '...wgww...',
    '..nnwgnn..', '.nnnwgnnn.', '.nnnngnnn.', '.snnnnnns.', '..nnnnnn..', '..mmmmmm..'];
  // Personajes para elegir (22-sep, Alejandro): solo cambia el DIBUJO; el choque usa siempre la silueta del agente,
  // así ninguno tiene ventaja. Piernas «l» (medias, piel, metal) según el personaje.
  var PIERNAS_L = PIERNAS.map(function (p) { return p.map(function (f) { return f.replace(/m/g, 'l'); }); });
  var CUERPO_ROBOT = ['....a.....', '....e.....', '..gggggg..', '..ggggcg..', '..gggggg..', '..gxxxxg..',
    '...gggg...', '.ggddddgg.', '.gdydyddg.', 'g.dddddd.g', '..dddddd..', '..gggggg..'];
  var CUERPO_AGENTA = ['...hhhh...', '..hhhhhh..', '.hhsssss..', '.hhssoss..', '.hhhssss..', '.hh.sgs...',
    '.hnnnnnn..', '.nnnwwnnn.', '.nnnwwnnn.', '.snnnnnns.', '..nnnnnn..', '..mmmmmm..'];
  var CUERPO_TURISTA = ['...yyyy...', '.yyyyyyyy.', '..hsssss..', '..hssoss..', '...ssss...', '...sss....',
    '..ffpffp..', '.fpffpfff.', '.ffpfffpf.', '.sffpffps.', '..ffffff..', '..bbbbbb..'];
  // 23-sep (Alejandro, con sus cuatro vitrinas): Mago de Hielo, Héroe del Espacio, Ninja en la Sombra y Guerrero
  // Fantástico. Dibujados desde cero a 10×16 como los demás; el bastón, la katana y el escudo son solo dibujo.
  // el mago conjura un fragmento de hielo (c) en la mano, con destellos plateados (x) alrededor
  var CUERPO_MAGO = ['c....zx...', 'cc..zzz...', 'd..zzzzz..', 'dzzzzzzzzz', 'd..ssoss..', 'd.wwwwww..',
    'dnnwwwwnnx', 'dnnnwwnnsc', 'snennnnnnc', 'dnnnnnnenx', 'd.nnennnn.', 'd.nnnnnnn.'];
  var CUERPO_ASTRO = ['...hhhh...', '..hhhhhh..', '.hhvvvvh..', '.hhvyyvh..', '.hhvvvvh..', '..hhhhhh..',
    '.pggggggp.', '.gggrgggg.', '.gggggggg.', '.wguuuugw.', '..gggggg..', '..gggggg..'];
  var CUERPO_NINJA = ['...nnnn.r.', '..nnnnnnr.', '..nnnnnr..', '..nssoss..', '..nnnnnn..', '...nnnn...',
    '..nrndnn..', '.nnnrnnnn.', '.ndnnrnnn.', '.dnrrrrnd.', '..nnnnnn..', '..nnnnnn..'];
  // la espada, en alto (hoja m, guarda k, mano s) para que se vea; el escudo con la cruz a la derecha
  var CUERPO_GUERRERO = ['...yyyy...', '..yyyyyy..', '..ysssss..', '..yssoss..', 'm.yyyyys..', 'm..yyyy...',
    'mcccbbcwww', 'mccbrbcwrw', 'kcbrrrbrrr', 'ssbbrbbwrw', '..bbbbbwww', '..cccccc..'];
  var SPR = {
    agente: PIERNAS.map(function (p) { return CUERPO.concat(p); }),
    androide: PIERNAS_L.map(function (p) { return CUERPO_ROBOT.concat(p); }),
    agenta: PIERNAS_L.map(function (p) { return CUERPO_AGENTA.concat(p); }),
    turista: PIERNAS_L.map(function (p) { return CUERPO_TURISTA.concat(p); }),
    mago: PIERNAS_L.map(function (p) { return CUERPO_MAGO.concat(p); }),
    astronauta: PIERNAS_L.map(function (p) { return CUERPO_ASTRO.concat(p); }),
    ninja: PIERNAS_L.map(function (p) { return CUERPO_NINJA.concat(p); }),
    guerrero: PIERNAS_L.map(function (p) { return CUERPO_GUERRERO.concat(p); }),
    robot: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '..........', '..........', '..........',
        '....aa....', '....aa....', '.rrrrrrrr.', '.rwwrrwwr.', '.rrrrrrrr.', 'rrrrrrrrrr',
        i ? 'r.g.g.g.gr' : 'rg.g.g.g.r', 'rrrrrrrrrr', i ? '.k.k..k.k.' : '.kkk..kkk.', i ? '.kkk..kkk.' : '.k.k..k.k.'];
    }),
    cangrejo: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........',
        '.w......w.', '.k......k.', 'rr.rrrr.rr', 'r.rrrrrr.r', '..rrrrrr..', '.rrrrrrrr.',
        i ? '.r.r..r.r.' : 'r.r.rr.r.r', i ? 'r..r..r..r' : '.r......r.'];
    }),
    barril: [0, 1, 2, 3].map(function (i) {
      var f = ['..........', '..........', '..........', '..........', '..........', '..........',
        '..bbbbbb..', '.bbbbbbbb.', 'bbhhhhhhbb', 'bbbbbbbbbb', 'bbbbbbbbbb', 'bbhhhhhhbb', 'bbbbbbbbbb',
        'bbbbbbbbbb', 'bbhhhhhhbb', '.bbbbbbbb.'];
      var fila = [9, 12, 10, 13][i], col = [3, 5, 6, 4][i];
      f[fila] = f[fila].slice(0, col) + 'yy' + f[fila].slice(col + 2);
      return f;
    }),
    rata: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '..........', '..........', '..........',
        '..........', '..........', '..........', '..........', '......g.g.', '.....gggg.', '..gggggogg',
        '.ggggggggp', 'g.gggggg..', i ? '...k.k.k.k' : '..k.k.k.k.'];
    }),
    gaviota: [
      ['................', 'w..............w', 'ww............ww', '.www........www.', '..wwww....wwww..',
        '....wwwwwwwwwoyy', '......wwwwwww...', '.......gg.gg....'],
      ['................', '................', '................', 'wwww........wwww', '.wwwwwwwwwwwwoyy',
        '....wwwwwwwww...', '......gg.gg.....', '................'],
      ['................', '................', '................', '................', '....wwwwwwwwwoyy',
        '..wwwwwwwwwww...', '.www........www.', 'ww............ww'],
      ['................', '................', '................', 'wwww........wwww', '.wwwwwwwwwwwwoyy',
        '....wwwwwwwww...', '......gg.gg.....', '................']
    ],
    presidente: [0, 1, 0, 1].map(function (i) {
      return ['....hhhh....', '...hhhhhh...', '...ssssss...', '...kkskks...', '...ssssss...', '...smmmms...',
        '....ssss....', '..gggwwggg..', '.ggggwrgggg.', '.ggggwrgggg.', i ? '.sgggwrggpp.' : '.sgggwrggps.',
        '..gggggggpp.', '..gggggggpp.', '...gg..gg...', i ? '..gg....gg..' : '...gg..gg...', i ? '.kkk....kkk.' : '..kkk..kkk..'];
    }),
    gigante: [0, 1].map(function (i) {
      return (i ? ['r.r..........r.r', 'rrr..........rrr', '.r............r.'] : ['rrr..........rrr', 'r.r..........r.r', 'rrr..........rrr'])
        .concat(['.r....w..w....r.', '.r....k..k....r.', '..r..rrrrrr..r..', '...rrrrrrrrrr...', '..rrrrrrrrrrrr..',
          '.rrrrrrrrrrrrrr.', '.rrrrryyyyrrrrr.', '..rrrrrrrrrrrr..', '...rrrrrrrrrr...', '..r.r.r..r.r.r..',
          i ? 'r.r.r......r.r.r' : '.r.r.r....r.r.r.', i ? '.r..r......r..r.' : 'r..r..r..r..r..r', '................']);
    }),
    // (22-sep, 2.ª tanda) enemigos nuevos para las casas 5-20
    murcielago: [
      ['m..............m', 'mm............mm', 'mmm..m....m..mmm', '.mmmmmmmmmmmmmm.', '..mmmmoomoommm..', '....mmmmmmmm....', '......m..m......', '................'],
      ['................', '................', '.....m....m.....', 'mmmmmmmmmmmmmmmm', '.mmmmmoommoommm.', '..m..mmmmmm..m..', '......m..m......', '................'],
      ['................', '................', '.....m....m.....', '....mmoommoom...', '...mmmmmmmmmm...', '..mmm..mm..mmm..', '.mm..........mm.', 'm..............m'],
      ['................', '................', '.....m....m.....', 'mmmmmmmmmmmmmmmm', '.mmmmmoommoommm.', '..m..mmmmmm..m..', '......m..m......', '................']
    ],
    gato: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '..........', '..........', '..........', '..........', '..........',
        '.......g.g', '.......ggg', 'g......gog', 'g.gggggggg', '.gggggggg.', '.gggggggg.',
        i ? '.g.g..g.g.' : 'g..g..g..g', i ? '.k.k..k.k.' : 'k..k..k..k'];
    }),
    medusa: [0, 1, 2, 1].map(function (i) {
      return ['...pppppp...', '..pppppppp..', '.ppwpppwppp.', '.pppppppppp.', 'pppppppppppp', '.p.p.p.p.p.p',
        i === 0 ? '.p.p.p.p.p.p' : '..p.p.p.p.p.', i === 2 ? '..p.p.p.p.p.' : '.p.p.p.p.p.p', i === 1 ? '.p...p...p..' : '..p...p...p.', '..........'.slice(0, 12) + '..'];
    }),
    // (6.ª tanda) para las casas RETRO: satélite que cae y se estrella, teléfono, pingüino y ameba
    satelite: [0, 1, 2, 3].map(function (i) {
      if (i === 3) return ['................', '................', '..y..y....y..y..', '...y.y...y.y....', '....yyyyyyyy....', '...yyrrrrrryy...',
        '..yyrrwwwwrryy..', '..yyrrwwwwrryy..', '...yyrrrrrryy...', '....yyyyyyyy....', '...y.y...y.y....', '..y..y....y..y..', '................', '................', '................', '................'];
      return ['................', '....gg....gg....', '....gg....gg....', '..ggggggggggg...', '..g.g.g.g.g.g...', '.....wwwwww.....', '....wwrrrrww....', '....wwrooorww...',
        '....wwrrrrww....', '.....wwwwww.....', '..g.g.g.g.g.g...', '..ggggggggggg...', '....gg' + (i ? '.' : 'g') + '...gg....', '....gg....gg....', '................', '................'];
    }),
    telefono: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '..........', '..........', i ? '.kk....kk.' : '..........',
        '..kkkkkk..', '.kkkkkkkk.', '.kwwkkwwk.', '.kkkkkkkk.', '..kkkkkk..', '.kkkkkkkk.', 'kkkkkkkkkk', 'k.kkkkkk.k', '.kkkkkkkk.', '..k....k..'];
    }),
    pinguino: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '...kkkk...', '..kkkkkk..', '..kwkkwk..', '..kkyykk..', '..kkkkkk..',
        '.kkkwwkkk.', '.kkwwwwkk.', '.kkwwwwkk.', '.kkwwwwkk.', '..kwwwwk..', '..kkwwkk..', i ? '..yy..yy..' : '.yy....yy.', '..........'];
    }),
    ameba: [0, 1, 2, 1].map(function (i) {
      return ['...pppp.....', '..pppppp....', '.pppwppwpp..', 'pppppppppp..', 'pppppppppp..', i === 0 ? 'pppppppppp..' : '.pppppppp...',
        i === 2 ? '.pp.pp.pp...' : 'ppp.pp.ppp..', i === 1 ? '..p..p..p...' : '.p.p..p.p...', '............', '............', '............', '............'];
    }),
    pato: [0, 1, 0, 1].map(function (i) {
      return ['..........', '..........', '..........', '..........', '..........', '..........', '..........',
        '......yy..', '.....yyoy.', '.....yyyyo', 'y...yyyy..', 'yyyyyyyyy.', '.yyyyyyyy.', i ? 'bbbbbbbbbb' : '.bbbbbbbb.', i ? '.bbbbbbbb.' : 'bbbbbbbbbb', '..........'];
    }),
    // (23-sep, casas nuevas) PELOTA de golf que bota (fr 1 = aplastada contra el suelo)
    pelota: [0, 1].map(function (i) {
      return i ? ['..........', '..........', '..........', '..wwwwww..', '.wwgwwgww.', 'wwwwwwwwww', 'wgwwgwwgww', '.wwwwwwww.']
        : ['...wwww...', '..wwwwww..', '.wwgwwgww.', '.wwwwwwww.', '.wgwwgwww.', '.wwwwwgww.', '..wwwwww..', '...wwww...'];
    }),
    // FANTASMA TÍMIDO: se acerca cuando le das la espalda; si le miras, se tapa la cara y se queda quieto (fr 2)
    timido: [0, 1, 2, 1].map(function (i) {
      var cara = i === 2 ? ['.wwwwwwwwww.', 'wwgwwwwwwgww', 'wggwwwwwwggw', 'wwgwwwwwwgww'] : ['.wwwwwwwwww.', 'wwkkwwwwkkww', 'wwkkwwwwkkww', 'wwwwwkkwwwww'];
      return ['....wwww....', '..wwwwwwww..'].concat(cara, ['wwwwwwwwwwww', 'wwwwwwwwwwww', 'wwwwwwwwwwww',
        i === 1 ? 'w.ww.ww.ww.w' : '.ww.ww.ww.ww', i === 1 ? '..w..w..w...' : 'w..w..w..w..', '............']);
    }),
    // JEFES: el Notario (sella con su tampón) y el Inspector de Hacienda (con su carpeta)
    notario: [0, 1, 0, 1].map(function (i) {
      return ['....kkkk....', '...kkkkkk...', '...ssssss...', '..wkwsswkw..', '...ssssss...', '....smms....',
        '..kkkwwkkk..', '.kkkkwrkkkkk', '.kkkkwrkkkk' + (i ? 'r' : 'k'), (i ? '.skkkwrkkkrr' : '.skkkwrkkkkr'), '..kkkkkkkk' + (i ? 'rr' : 'r.'),
        '..kkkkkkkk..', '...kk..kk...', i ? '..kk....kk..' : '...kk..kk...', i ? '.kkk....kkk.' : '..kkk..kkk..', '............'];
    }),
    inspector: [0, 1, 0, 1].map(function (i) {
      return ['...hhhhhh...', '..hhhhhhhh..', '...ssssss...', '...kwskws...', '...ssssss...', '....skks....',
        '..gggwwggg..', '.ggggwrgggg.', 'yyyggwrgggg.', 'yywygwrggss.', 'yyyyggggg...', '..gggggggg..', '...gg..gg...',
        i ? '..gg....gg..' : '...gg..gg...', i ? '.kkk....kkk.' : '..kkk..kkk..', '............'];
    })
  };
  SPR.tasador = SPR.presidente;
  // (24-sep) los DIBUJOS NUEVOS (personajes, figuritas arcade, leyendas, animalitos, clientes): sprites-extra.js
  var EXTRA = typeof SPRITES_EXTRA !== 'undefined' ? SPRITES_EXTRA : null;
  if (!EXTRA && typeof module !== 'undefined' && typeof require === 'function') { try { EXTRA = require('./sprites-extra.js'); } catch (e) {} }
  if (EXTRA && EXTRA.SPR) Object.keys(EXTRA.SPR).forEach(function (k) { if (!SPR[k]) SPR[k] = EXTRA.SPR[k]; });
  var MASCARA = {};
  function mascara(nombre, fr) {
    var k = nombre + fr;
    if (MASCARA[k]) return MASCARA[k];
    // (26-sep, arreglo D) un dibujo con MENOS fotogramas de los que pide el bicho que se mueve (caracol, avispaHada: 2; el
    // motor pide hasta el 3) colgaba el motor: se usa el fotograma módulo los que tiene
    var lista = SPR[nombre], nf = lista.length, arte = lista[(((fr | 0) % nf) + nf) % nf], puntos = [];
    for (var y = 0; y < arte.length; y++) for (var x = 0; x < arte[y].length; x++) if (arte[y][x] !== '.') puntos.push([x, y]);
    // (25-sep) arriba = la primera fila con dibujo (para PISAR a los bichos bajitos: la rata empieza 10 px más abajo)
    var arriba = puntos.length ? Math.min.apply(null, puntos.map(function (p) { return p[1]; })) : 0;
    return (MASCARA[k] = { puntos: puntos, ancho: arte[0].length, alto: arte.length, arriba: arriba });
  }

  /* ── Las casas: las 20 vienen de casas.js (var LLAVES_CASAS; en node, require). Si no está, las 4 primeras de
     aquí abajo (formato antiguo por piezas: [tipo, col1, fila1, col2, fila2]). ───────────────────────────────── */
  var CASAS_FUERA = null, TESOROS_FUERA = null;
  if (typeof LLAVES_CASAS !== 'undefined') { CASAS_FUERA = LLAVES_CASAS; if (typeof LLAVES_TESOROS !== 'undefined') TESOROS_FUERA = LLAVES_TESOROS; }
  else if (typeof module !== 'undefined' && typeof require === 'function') { try { CASAS_FUERA = require('./casas.js'); TESOROS_FUERA = CASAS_FUERA.tesoros || null; } catch (e) {} }
  var SALAS = CASAS_FUERA || [
    {
      id: 'jardin', nombre: 'El Jardín de la Villa', tema: 'jardin',
      piezas: [
        ['F', 1, 15, 30, 15], ['Y', 9, 14, 9, 14], ['B', 24, 14, 25, 14],
        ['F', 27, 12, 30, 12],
        ['<', 14, 10, 25, 10], ['F', 5, 10, 11, 10], ['B', 8, 9, 9, 9],
        ['F', 1, 12, 3, 12],
        ['F', 1, 7, 6, 7], ['B', 1, 6, 2, 6],
        ['F', 4, 4, 24, 4], ['C', 13, 4, 16, 4], ['X', 11, 1, 11, 1], ['X', 19, 1, 19, 1],
        ['F', 25, 7, 30, 7]
      ],
      llaves: [[12, 7], [2, 3], [21, 1], [30, 5], [17, 11]],
      bonus: [[8, 1, 'gema'], [1, 10, 'aire']],
      puerta: [29, 13], agente: [2, 13, 1],
      enemigos: [{ tipo: 'h', spr: 'robot', x: 12, fila: 13, min: 11, max: 21, dir: 1 }]
    },
    {
      id: 'bodega', nombre: 'La Bodega', tema: 'bodega',
      piezas: [
        ['F', 1, 15, 30, 15], ['X', 16, 14, 16, 14], ['B', 4, 14, 5, 14],
        ['F', 7, 12, 10, 12], ['C', 11, 12, 17, 12], ['>', 18, 12, 26, 12], ['F', 27, 12, 30, 12], ['B', 29, 11, 30, 11],
        ['F', 16, 9, 26, 9], ['F', 6, 9, 12, 9], ['C', 9, 9, 11, 9], ['B', 6, 8, 7, 8],
        ['F', 1, 6, 4, 6], ['B', 1, 5, 2, 5],
        ['F', 5, 4, 30, 4], ['C', 20, 4, 23, 4], ['X', 13, 1, 13, 1], ['X', 25, 1, 25, 1]
      ],
      llaves: [[1, 13], [15, 8], [30, 8], [14, 7], [9, 5], [18, 1]],
      bonus: [[1, 2, 'gema'], [30, 6, 'reloj']],
      puerta: [29, 2], agente: [28, 13, -1],
      // (22-sep, Alejandro) el barril del pasillo de arriba no se podía saltar: ahí el techo corta el salto.
      // Ahora va por el suelo de la izquierda del medio, donde el salto es entero.
      enemigos: [
        { tipo: 'h', spr: 'barril', x: 8, fila: 13, min: 7, max: 19, dir: 1 },
        { tipo: 'h', spr: 'rata', x: 18, fila: 7, min: 17, max: 25, dir: -1 },
        { tipo: 'h', spr: 'barril', x: 10, fila: 7, min: 8, max: 11, dir: 1, lento: true }
      ]
    },
    {
      id: 'azotea', nombre: 'La Azotea', tema: 'azotea',
      piezas: [
        ['F', 1, 15, 30, 15], ['B', 3, 14, 4, 14], ['B', 27, 14, 28, 14],
        ['F', 6, 12, 11, 12], ['B', 10, 11, 11, 11], ['F', 2, 9, 8, 9], ['B', 2, 8, 3, 8], ['F', 5, 6, 12, 6],
        ['F', 20, 12, 25, 12], ['B', 20, 11, 21, 11], ['F', 23, 9, 29, 9], ['B', 28, 8, 29, 8], ['F', 19, 6, 26, 6],
        ['X', 8, 5, 8, 5], ['X', 23, 5, 23, 5]
      ],
      llaves: [[3, 4], [12, 4], [19, 4], [28, 4], [15, 10]],
      bonus: [[1, 10, 'vida'], [30, 5, 'gema']],
      puerta: [15, 13], agente: [1, 13, 1],
      enemigos: [
        { tipo: 'v', spr: 'gaviota', x: 104, y: 30, min: 20, max: 96, dy: 2 },
        { tipo: 'v', spr: 'gaviota', x: 136, y: 80, min: 20, max: 96, dy: -3 },
        { tipo: 'v', spr: 'presidente', x: 118, y: 8, min: 8, max: 56, dy: 1, vecino: true, minFinal: 40, dyFinal: 2 }
      ]
    },
    {
      id: 'cala', nombre: 'La Cala del Cangrejo', tema: 'cala',
      piezas: [
        ['F', 1, 15, 30, 15], ['B', 29, 14, 30, 14],
        ['F', 22, 12, 27, 12], ['<', 12, 12, 21, 12], ['F', 4, 12, 10, 12], ['B', 4, 11, 5, 11],
        ['F', 7, 9, 18, 9], ['C', 12, 9, 14, 9], ['B', 9, 8, 10, 8], ['F', 21, 9, 28, 9], ['B', 26, 8, 27, 8],
        ['F', 1, 6, 8, 6],
        ['F', 10, 4, 30, 4], ['W', 19, 2, 19, 3]
      ],
      llaves: [[1, 4], [22, 7], [30, 12], [16, 8], [24, 2]],
      bonus: [[28, 5, 'gema'], [1, 10, 'reloj']],
      puerta: [29, 2], agente: [2, 13, 1],
      palancas: [
        { x: 8, y: 8, hace: 'abre', celdas: [[19, 2], [19, 3]] },
        { x: 28, y: 8, hace: 'cae', celdas: [[13, 4], [14, 4]] }
      ],
      enemigos: [
        { tipo: 'h', spr: 'cangrejo', x: 5, fila: 13, min: 4, max: 13, dir: 1 },
        { tipo: 'h', spr: 'cangrejo', x: 24, fila: 13, min: 16, max: 26, dir: -1 },
        { tipo: 'h', spr: 'rata', x: 16, fila: 7, min: 15, max: 17, dir: 1, lento: true },
        { tipo: 'g', spr: 'gigante', x: 104, y: 16 }
      ]
    }
  ];

  /* ── Planos dibujados con letras (casas 5-20): una cadena por fila, todas del mismo largo ──
     ' ' o '.' aire · F W B C < > X Y como arriba · Z muro FALSO (parece muro y se atraviesa: esconde secretos)
     K llave · P puerta (su casilla de arriba a la izquierda) · @ el agente (su casilla de arriba a la izquierda)
     g gema · a aire · v vida · r reloj · h trozo de corazón · o moneda (sala del tesoro)                        */
  var LETRA_BONUS = { g: 'gema', a: 'aire', v: 'vida', r: 'reloj', h: 'corazon', o: 'moneda',
    e: 'esmeralda', b: 'rubi', d: 'diamante', j: 'botas', u: 'paraguas', i: 'iman', l: 'linterna', p: 'patinete', k: 'aireGrande',
    s: 'dobleSalto', w: 'goma', t: 'arena', y: 'globo', f: 'seta', z: 'estrella', c: 'pila' };
  var PILA = 1350;                 // (idea 8) la pila de la linterna dura 90 s; las pilas `c` recargan media
  var VISIBLES = { moneda: 1, esmeralda: 1, rubi: 1, diamante: 1, botas: 1, paraguas: 1, iman: 1, linterna: 1, patinete: 1, pila: 1,
    dobleSalto: 1, goma: 1, arena: 1, globo: 1, seta: 1, estrella: 1 };
  // (24-sep, idea 101, como en Mario) los bichos que se pueden PISAR saltándoles encima; los demás siguen matando
  var PISABLES_BICHO = { pato: 1, rata: 1, cangrejo: 1, gato: 1, pinguino: 1, camarero: 1, vendedor: 1, cabra: 1 };  // no escondidos
  function lee(def) {
    var W = def.ancho || ANCHO, H = def.alto || ALTO, m = [], x, y;
    var r = { llaves: [], bonus: [], puerta: null, agente: null, teles: {} };
    for (y = 0; y < H; y++) { m.push([]); for (x = 0; x < W; x++) m[y].push(' '); }
    if (def.mapa) {
      if (def.mapa.length !== H) throw new Error('Casa «' + def.id + '»: el plano tiene ' + def.mapa.length + ' filas y deben ser ' + H);
      for (y = 0; y < H; y++) {
        if (def.mapa[y].length !== W) throw new Error('Casa «' + def.id + '»: la fila ' + y + ' mide ' + def.mapa[y].length + ' y debe medir ' + W);
        for (x = 0; x < W; x++) {
          var ch = def.mapa[y][x];
          if (ch === 'K') r.llaves.push([x, y]);
          else if (ch === 'P') r.puerta = [x, y];
          else if (ch === '@') r.agente = [x, y, 1];
          else if (LETRA_BONUS[ch]) r.bonus.push([x, y, LETRA_BONUS[ch]]);
          else if (/[1-4]/.test(ch)) (r.teles[ch] = r.teles[ch] || []).push([x, y]);
          else if (ch !== '.') m[y][x] = ch;
        }
      }
    } else {
      for (x = 0; x < W; x++) m[0][x] = 'W';
      for (y = 0; y < H; y++) { m[y][0] = 'W'; m[y][W - 1] = 'W'; }
      (def.piezas || []).forEach(function (p) {
        for (y = p[2]; y <= p[4]; y++) for (x = p[1]; x <= p[3]; x++) m[y][x] = p[0];
      });
    }
    r.mapa = m;
    return r;
  }
  function plano(def) { return lee(def).mapa; }

  /* ── Casa ESPEJO (idea 6): la misma casa dada la vuelta de izquierda a derecha. Como la física es simétrica, si la
     casa se puede acabar, su espejo también. Las marcas de 2×2 (P, @, 1-4) se colocan por su casilla de la izquierda. ── */
  function anchoSpr(nombre) { var a = SPR[nombre]; return a ? a[0][0].length : 16; }
  // un enemigo dado la vuelta (lo usan la casa espejo y los ayudantes del Gran Tasador)
  function espejoEnemigo(e, W) {
    var o = JSON.parse(JSON.stringify(e));
    if (o.tipo === 'h') { o.x = W - 2 - e.x; o.min = W - 2 - e.max; o.max = W - 2 - e.min; o.dir = -(e.dir || 1); }
    else o.x = W * 8 - e.x - anchoSpr(e.spr);
    if (o.tipo === 'p' || o.tipo === 'a') { var an = anchoSpr(e.spr); o.min = W * 8 - e.max - an; o.max = W * 8 - e.min - an; o.fase = (e.fase || 0) + (e.max - e.min); }
    // (25-sep) monstruos nuevos: su tramo (px), y el okupa su llave, su techo y hacia dónde se va
    if ((o.tipo === 'suegra' || o.tipo === 'perro' || o.tipo === 'cofre' || o.tipo === 'generoso' || o.tipo === 'gente') && e.min != null) { var a2 = anchoSpr(e.spr); o.min = W * 8 - e.max - a2; o.max = W * 8 - e.min - a2; }
    if (o.tipo === 'suegra' || o.tipo === 'perro' || o.tipo === 'cofre' || o.tipo === 'okupa' || o.tipo === 'generoso' || o.tipo === 'gente') o.dir = -(e.dir || 1);
    if (o.tipo === 'f' && e.cols) o.cols = e.cols.map(function (c) { return W * 8 - c - anchoSpr(e.spr); });   // (26-sep, arreglo) sus columnas, al otro lado
    if (o.tipo === 'okupa') { if (e.llave) o.llave = [W - 1 - e.llave[0], e.llave[1]]; if (e.techo) o.techo = [W - 1 - e.techo[0], e.techo[1]]; o.salida = -(e.salida || 1); }
    return o;
  }
  function espejo(def) {
    if (!def.mapa) return def;
    var W = def.ancho || ANCHO, H = def.alto || ALTO, m = [], x, y;
    for (y = 0; y < H; y++) { m.push([]); for (x = 0; x < W; x++) m[y].push(' '); }
    var marcas = [];
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var ch = def.mapa[y][x];
      if (ch === 'P' || ch === '@' || /[1-4]/.test(ch)) marcas.push([ch, x, y]);
      else m[y][W - 1 - x] = ch === '<' ? '>' : ch === '>' ? '<' : ch;
    }
    marcas.forEach(function (k) { m[k[2]][W - 2 - k[1]] = k[0]; });
    var d = JSON.parse(JSON.stringify(def));
    d.mapa = m.map(function (f) { return f.join(''); });
    d.id = def.id + '-espejo'; d.espejo = true; d.dir = -(def.dir || 1);
    d.enemigos = (def.enemigos || []).map(function (e) { return espejoEnemigo(e, W); });
    if (def.jefe) d.jefe = espejoJefe(def.jefe, W);                        // (25-sep) el jefe, también al revés
    // (23-sep) lo nuevo: zonas de viento (cambia de sentido) y vapor, cajas y noria
    var zona = function (z) { var o = [W - 1 - z[2], z[1], W - 1 - z[0], z[3]]; if (z.length > 4) o.push(-z[4]); return o; };
    if (def.viento) d.viento = def.viento.map(zona);
    if (def.vapor) d.vapor = def.vapor.map(zona);
    if (def.cascada) d.cascada = def.cascada.map(zona);
    if (def.sombras) d.sombras = def.sombras.map(zona);
    if (def.premioFinal) d.premioFinal = [W - 1 - def.premioFinal[0], def.premioFinal[1], def.premioFinal[2]];
    if (def.cajas) d.cajas = def.cajas.map(function (c) { return [W - 2 - c[0], c[1]]; });
    // (25-sep, arreglo) las barras, prensas y rayos no se daban la vuelta: en la casa espejo se quedaban en su columna de antes
    if (def.barras) d.barras = def.barras.map(function (b) { var o = JSON.parse(JSON.stringify(b)); o.x = W - 1 - b.x; return o; });
    if (def.prensas) d.prensas = def.prensas.map(function (p) { var o = JSON.parse(JSON.stringify(p)); o.x = W - 1 - p.x; return o; });
    if (def.rayos) d.rayos = def.rayos.map(function (r) { var o = JSON.parse(JSON.stringify(r)); o.x1 = W - 1 - r.x2; o.x2 = W - 1 - r.x1; return o; });
    if (def.lamparas) d.lamparas = def.lamparas.map(function (l) { var o = l.slice(); o[0] = W - 1 - l[0]; return o; });
    d.palancas = (def.palancas || []).map(function (p) {
      // (26-sep, idea 80) la palanca que cambia la sala lleva la letra de cada casilla (las cintas, al revés)
      return { x: W - 1 - p.x, y: p.y, hace: p.hace, golpe: p.golpe, reversible: p.reversible, pone: p.pone, dura: p.dura, celdas: (p.celdas || []).map(function (c) { return c.length > 2 ? [W - 1 - c[0], c[1], c[2] === '<' ? '>' : c[2] === '>' ? '<' : c[2]] : [W - 1 - c[0], c[1]]; }) };
    });
    // (25-sep, 2b) la salida secreta (2 de ancho, como la P), las medallas de control y los sitios de las botas de muelle
    if (def.salidaSecreta) { d.salidaSecreta = copia(def.salidaSecreta); d.salidaSecreta.x = W - 2 - def.salidaSecreta.x; }
    if (def.medallas) d.medallas = def.medallas.map(function (m) { var o = m.slice(); o[0] = W - 2 - m[0]; return o; });
    // (26-sep, fase B) la BANDERA de control (la Gran Villa) también: se quedaba en su columna de antes y, en la casa al revés,
    // al volver a ella tras morir el bicho te pillaba en el paso 9
    if (def.checkpoint) { d.checkpoint = def.checkpoint.slice(); d.checkpoint[0] = W - 2 - def.checkpoint[0]; }
    if (def.muelle) d.muelle = def.muelle.map(function (m) { var o = m.slice(); o[0] = W - 1 - m[0]; return o; });
    d.plataformas = (def.plataformas || []).map(function (p) {
      var o = JSON.parse(JSON.stringify(p)), an = p.ancho * 8;
      o.x = W * 8 - p.x - an;
      if (p.eje === 'c') { o.cx = W * 8 - p.cx; o.inv = !p.inv; }
      else if (p.eje === 'h' && p.espera) { o.min = W * 8 - p.max - an; o.max = W * 8 - p.min - an; o.fase = (p.fase || 0) + (p.max - p.min) / (p.vel || 1) + p.espera; }
      else if (p.eje === 'h') { o.min = W * 8 - p.max - an; o.max = W * 8 - p.min - an; o.fase = (p.fase || 0) + (p.max - p.min); }
      return o;
    });
    // (25-sep, secretos) lo nuevo también se da la vuelta: casillas sueltas → W-1-x; lo de 2 de ancho (puerta del reflejo) → W-2-x
    var cx1 = function (c) { var o = c.slice(); o[0] = W - 1 - c[0]; return o; };
    var ox1 = function (o0) { var o = JSON.parse(JSON.stringify(o0)); if (o0.x != null) o.x = W - 1 - o0.x; return o; };
    if (def.trucos) d.trucos = def.trucos.map(function (t) {
      var o = ox1(t); if (t.celdas) o.celdas = t.celdas.map(cx1); if (t.premio) o.premio = cx1(t.premio); return o;
    });
    if (def.objetos) d.objetos = def.objetos.map(ox1);
    if (def.meta) d.meta = ox1(def.meta);
    if (def.fantasmas) d.fantasmas = def.fantasmas.map(cx1);
    if (def.pasadizos) d.pasadizos = def.pasadizos.map(ox1);
    if (def.pintadas) d.pintadas = def.pintadas.map(ox1);
    if (def.huellasPista) d.huellasPista = def.huellasPista.map(cx1);
    if (def.chimeneas) d.chimeneas = def.chimeneas.map(cx1);
    if (def.zonas) d.zonas = def.zonas.map(function (z) { var o = JSON.parse(JSON.stringify(z)); o.x0 = W - 1 - z.x1; o.x1 = W - 1 - z.x0; return o; });
    if (def.reflejo) { var rf = def.reflejo; d.reflejo = JSON.parse(JSON.stringify(rf)); d.reflejo.x0 = W - 1 - rf.x1; d.reflejo.x1 = W - 1 - rf.x0; if (rf.px != null) d.reflejo.px = W - 2 - rf.px; }
    // (26-sep, pendientes) las burbujas, la pista de baile, las lianas, el perro del cliente y la mesa del notario (2 casillas)
    if (def.burbujas) d.burbujas = def.burbujas.map(function (b) { var o = b.slice(); o[0] = W - 1 - b[0]; return o; });
    if (def.baile) d.baile = def.baile.map(function (z) { var o = copia(z); o.x1 = W - 1 - z.x2; o.x2 = W - 1 - z.x1; return o; });
    if (def.lianas) d.lianas = def.lianas.map(function (L) { var o = copia(L); o.x = W * 8 - L.x; o.inv = !L.inv; return o; });
    if (def.perroCliente) d.perroCliente = [W - 2 - def.perroCliente[0], def.perroCliente[1]];
    if (def.notario) { d.notario = copia(def.notario); d.notario.x = W - 2 - def.notario.x; }
    if (def.bonus) d.bonus = def.bonus.map(cx1); if (def.llaves) d.llaves = def.llaves.map(cx1);   // (26-sep, arreglo) los de fuera del plano
    return d;
  }

  /* ── Plataformas que se mueven (5.ª tanda): nubes y cristales. Su sitio depende SOLO del paso (s.t), así el robot
     comprobador puede saber dónde están en cada momento. Van y vuelven entre min y max (px) por su eje, a «vel» px/paso
     (en horizontal, vel 2: el agente se mueve de 2 en 2 px). { tipo:'nube'|'cristal', x, y, ancho (casillas), eje:'h'|'v', min, max, vel, fase } ── */
  function posPlat(p, t) {
    // (23-sep) NORIA: eje 'c' → la cabina da vueltas alrededor de (cx, cy) con su radio, una vuelta cada `periodo`
    // pasos (sin voltearse). La x va en pares, como el agente, para que al llevarle no se descuadre.
    if (p.eje === 'c') {
      var N = p.periodo || 240, qc = (((t + (p.fase || 0)) % N) + N) % N, an = 2 * Math.PI * qc / N;
      return { x: 2 * Math.round((p.cx + (p.inv ? -1 : 1) * Math.cos(an) * p.radio - p.ancho * 4) / 2), y: Math.round(p.cy + Math.sin(an) * p.radio) };
    }
    var L = p.max - p.min, v = p.vel || 1;
    if (L <= 0) return { x: p.x, y: p.y };
    // (23-sep) ASCENSOR: con `espera`, se para esos pasos en cada punta (su `fase` va en pasos)
    if (p.espera) {
      var ida = L / v, ciclo = 2 * ida + 2 * p.espera, qa = (((t + (p.fase || 0)) % ciclo) + ciclo) % ciclo, da;
      if (qa < p.espera) da = p.min;
      else if (qa < p.espera + ida) da = p.min + (qa - p.espera) * v;
      else if (qa < 2 * p.espera + ida) da = p.max;
      else da = p.max - (qa - 2 * p.espera - ida) * v;
      return p.eje === 'h' ? { x: da, y: p.y } : { x: p.x, y: da };
    }
    var q = ((t * v + (p.fase || 0)) % (2 * L) + 2 * L) % (2 * L), d = p.min + (q <= L ? q : 2 * L - q);
    return p.eje === 'h' ? { x: d, y: p.y } : { x: p.x, y: d };
  }
  function periodoPlat(p) {
    if (p.eje === 'c') return p.periodo || 240;
    var L = p.max - p.min; if (L <= 0) return 1;
    return (2 * L) / (p.vel || 1) + (p.espera ? 2 * p.espera : 0);
  }
  function encima(w, p, pos) {   // ¿el agente está (en horizontal) sobre la plataforma?
    var ax = w.x * 8 + w.f * 2 + 1, an = p.ancho * 8;
    return ax + 8 > pos.x && ax < pos.x + an;
  }
  function platDebajo(s, w) {    // la plataforma sobre la que está de pie (o -1)
    if (s.sinPlataformas || !s.plataformas.length) return -1;
    for (var i = 0; i < s.plataformas.length; i++) {
      var p = s.plataformas[i], q = posPlat(p, s.t);
      if (q.y === w.y + 16 && encima(w, p, q)) return i;
    }
    return -1;
  }

  /* ── La Sala del Tesoro: sale al acabar una casa con TODOS sus bonus (idea 3). 30 s para coger monedas;
     no se muere por el aire: cuando se acaba, se sigue a la casa siguiente. ── */
  // (22-sep, Alejandro: «no se puede subir arriba») los pisos están a 3 filas y se sube por escalones de 1 fila (B)
  var TESORO = {
    id: 'tesoro', nombre: 'La Sala del Tesoro', tema: 'tesoro', tesoro: true, aire: 0.25, enemigos: [],
    mapa: (function () {
      var m = [], x, y;
      for (y = 0; y < 16; y++) { m.push([]); for (x = 0; x < 32; x++) m[y].push(y === 0 || x === 0 || x === 31 ? 'W' : ' '); }
      function pon(ch, x1, y1, x2, y2) { for (var yy = y1; yy <= y2; yy++) for (var xx = x1; xx <= x2; xx++) m[yy][xx] = ch; }
      pon('F', 1, 15, 30, 15); pon('B', 8, 14, 9, 14); pon('B', 22, 14, 23, 14);          // suelo y dos escalones
      pon('F', 11, 12, 20, 12); pon('B', 12, 11, 13, 11); pon('B', 18, 11, 19, 11);      // piso 1
      pon('F', 1, 9, 10, 9); pon('F', 21, 9, 30, 9); pon('B', 3, 8, 4, 8); pon('B', 27, 8, 28, 8);   // piso 2
      pon('C', 5, 9, 7, 9); pon('C', 24, 9, 26, 9);
      pon('F', 6, 6, 25, 6); pon('>', 13, 6, 18, 6);                                      // piso 3 (arriba)
      [3, 5, 11, 13, 15, 17, 19, 26, 28].forEach(function (c) { m[13][c] = 'o'; });
      [14, 15, 16, 17].forEach(function (c) { m[11][c] = 'o'; });
      [15, 16].forEach(function (c) { m[8][c] = 'o'; });
      [2, 5, 7, 9, 22, 24, 26, 29].forEach(function (c) { m[7][c] = 'o'; });
      [7, 9, 11, 13, 15, 17, 19, 21, 23].forEach(function (c) { m[5][c] = 'o'; });
      [10, 14, 18, 22].forEach(function (c) { m[3][c] = 'o'; });
      m[13][1] = '@';
      return m.map(function (f) { return f.join(''); });
    })()
  };

  var TESOROS = (TESOROS_FUERA && TESOROS_FUERA.length) ? TESOROS_FUERA : [TESORO];
  /* ── Dos tandas de casas: las 20 de la costa y las 20 «retro» (homenaje a los juegos de 1983, con planos nuestros).
     cambiaPack('retro'|'normal') cambia la lista con la que juega todo el motor. ── */
  var NORMALES = SALAS.slice();
  var RETRO = (typeof LLAVES_RETRO !== 'undefined' && LLAVES_RETRO) || (CASAS_FUERA && CASAS_FUERA.retro) || [];
  // (23-sep) 3.ª tanda: las 10 casas NUEVAS (noria, viento, vapor, cajas, marea, jefes…): cambiaPack('nuevas')
  var NUEVAS = (typeof LLAVES_NUEVAS !== 'undefined' && LLAVES_NUEVAS) || (CASAS_FUERA && CASAS_FUERA.nuevas) || [];
  // (24-sep) 4.ª tanda: las casas de LA GALAXIA (gravedad baja): cambiaPack('galaxia')
  var GALAXIA = (typeof LLAVES_GALAXIA !== 'undefined' && LLAVES_GALAXIA) || (CASAS_FUERA && CASAS_FUERA.galaxia) || [];
  var PACK = 'normal';
  function packActual() { return PACK; }
  function cambiaPack(p) {
    var l = p === 'retro' ? RETRO : p === 'nuevas' ? NUEVAS : p === 'galaxia' ? GALAXIA : NORMALES;
    if (!l.length) return false;
    SALAS.length = 0; l.forEach(function (d) { SALAS.push(d); }); PACK = p;
    return true;
  }

  function nuevaSala(n) {
    var def = typeof n === 'object' ? n : SALAS[n];
    var L = lee(def);
    var llaves = (def.llaves || []).concat(L.llaves), bon = (def.bonus || []).concat(L.bonus);
    // (24-sep, Alejandro) premioFinal: [x, y, tipo] → un premio que APARECE al coger la última llave
    if (def.premioFinal) bon = bon.concat([def.premioFinal.concat(['final'])]);
    var pu = def.puerta || L.puerta;
    var s = {
      n: typeof n === 'object' ? -1 : n, def: def, mapa: L.mapa, derr: {},
      ancho: def.ancho || ANCHO, alto: def.alto || ALTO, tesoro: !!def.tesoro,
      llaves: llaves.map(function (k) { return { x: k[0], y: k[1], cogida: false }; }),
      puerta: pu ? { x: pu[0], y: pu[1] } : null,
      aire: Math.round(AIRE * (def.aire || 1)), aireMax: Math.round(AIRE * (def.aire || 1)),
      enemigos: (def.enemigos || []).map(function (e) {
        var o = JSON.parse(JSON.stringify(e));
        o.fr = 0; o.f = 0;
        if (o.tipo === 'h') o.y = o.fila * 8;
        return o;
      }),
      palancas: (def.palancas || []).map(function (p) { return { x: p.x, y: p.y, hace: p.hace, celdas: p.celdas || [], movida: false, golpe: !!p.golpe, reversible: !!p.reversible, pone: p.pone || '', dura: p.dura || 0 }; }),
      bonus: bon.map(function (b) { return { x: b[0], y: b[1], tipo: b[2], cogido: false, alFinal: b[3] === 'final' }; }),
      plataformas: (def.plataformas || []).map(function (p) { return JSON.parse(JSON.stringify(p)); }),
      teles: L.teles, oscuro: !!def.oscuro, linterna: false, col: 0, iman: 0,
      // casas a oscuras: lámparas fijas que alumbran un trozo, y la luz general cuando se da al interruptor
      lamparas: (def.lamparas || []).map(function (l) { return l.slice(); }), luz: false,
      haz: (def.haz || []).map(function (h) { return h.slice(); }),   // rayos de luz: dentro, el aire se gasta 4 veces más deprisa
      // (23-sep, casas nuevas) zonas en casillas [c1, f1, c2, f2(, sentido)]: el VIENTO empuja de lado (también en el aire)
      // y el VAPOR te sube; el AGUA sube desde abajo con el tiempo ({ desde, hasta, cada }: fila de salida, tope y pasos por fila)
      viento: (def.viento || []).map(function (v) { return v.slice(); }), vapor: (def.vapor || []).map(function (v) { return v.slice(); }),
      cascada: (def.cascada || []).map(function (v) { return v.slice(); }), sombras: (def.sombras || []).map(function (v) { return v.slice(); }),
      agua: def.agua ? JSON.parse(JSON.stringify(def.agua)) : null,
      prensas: (def.prensas || []).map(copia), rayos: (def.rayos || []).map(copia), barras: (def.barras || []).map(copia),
      calle: !!def.calle, sal: def.salidas || null, vallaAbierta: false, luna: def.gravedad === 'baja', lento: 0, hundidos: [],
      falsas: (def.llavesFalsas || []).map(function (k) { return { x: k[0], y: k[1], cogida: false }; }),
      congelado: 0, secretoVisto: false, ultLlave: -999,
      t: 0
    };
    s.quedan = s.llaves.length;
    // (24-sep, idea 2) los SECRETOS de la casa: cada grupo de muros falsos Z que se tocan es un secreto; se cuentan los que encuentras
    s.secretos = gruposZ(s.mapa); s.secretosVistos = 0;
    // (25-sep, ideas 115-137) los SECRETOS NUEVOS (PLAN-SECRETOS.md): trucos que se disparan, objetos que se llevan, la
    // contrarreloj secreta, llaves fantasma, muros que se rompen (U), la luz que se apaga, pasadizos y zonas de la estrella
    s.trucos = (def.trucos || []).map(function (t) {
      return { tipo: t.tipo, x: t.x, y: t.y, n: t.n || (t.tipo === 'golpes' ? 5 : 3), celdas: (t.celdas || []).map(function (c) { return c.slice(); }),
        hace: t.hace || '', pone: t.pone || '', premio: t.premio ? t.premio.slice() : null, obj: t.obj || '', hecho: false, cuenta: 0, dentro: false };
    });
    s.objetos = (def.objetos || []).map(function (o) { return { x: o.x, y: o.y, tipo: o.tipo, id: o.id, cogido: false }; });
    s.lleva = {};                                   // lo que has cogido en ESTA sala (para el truco «objeto»)
    s.meta = def.meta ? { x: def.meta.x, y: def.meta.y } : null; s.crono = 0;
    s.fantasmas = {}; (def.fantasmas || []).forEach(function (f) { s.fantasmas[f[0] + ',' + f[1]] = 1; });
    s.rotos = {}; s.grietas = {};                   // muros U rotos y golpes que llevan los que aún aguantan
    s.apagada = false; s.pintadas = (def.pintadas || []).map(copia);
    s.pasadizos = (def.pasadizos || []).map(copia); s.zonas = (def.zonas || []).map(copia);
    s.tocado = false; s.orden = [];                 // ¿has tocado alguna tecla desde que empezó la sala? · orden de las llaves
    s.jefe = def.jefe ? nuevoJefe(def.jefe) : null;  // (25-sep, ideas 138-144) el jefe de la casa
    // (y ya en su sitio del paso 0, para que el cartel de «¡Preparado!» no lo pinte en una esquina; su reloj sigue en 0)
    if (s.jefe && MUEVE_JEFE && MUEVE_JEFE[s.jefe.tipo]) { MUEVE_JEFE[s.jefe.tipo](s, s.jefe, 0); s.jefe.peligros = []; s.jefe.blancos = []; s.jefe.sucesos = []; s.jefe.tinta = 0; }
    // (25-sep, 2b) la SALIDA SECRETA (se ve al pasar por ella), las MEDALLAS de control que ya has tocado y el interruptor
    // de ladrillos y monedas (pasos que le quedan)
    s.salidaSec = def.salidaSecreta ? copia(def.salidaSecreta) : null; s.salidaVista = false;
    s.medallasVistas = {}; s.monedasT = 0;
    pendientesSala(s, def);                        // (26-sep) burbujas, baile, lianas, perro, notario, bandera…
    return s;
  }
  // (25-sep) cuántos secretos tiene la sala en total: los grupos de muros falsos y los trucos
  function secretosTotal(s) { return (s.secretos || []).length + (s.trucos || []).length; }
  // (25-sep, idea 6) LLAVE FANTASMA: solo se ve (y se coge) 25 de cada 60 pasos
  function llaveVisible(s, k) { return !(s.fantasmas && s.fantasmas[k.x + ',' + k.y]) || (s.t % 60) < 25; }
  function gruposZ(m) {
    var visto = {}, grupos = [];
    for (var y = 0; y < m.length; y++) for (var x = 0; x < m[y].length; x++) {
      if (m[y][x] !== 'Z' || visto[x + ',' + y]) continue;
      var g = {}, pila = [[x, y]]; visto[x + ',' + y] = 1;
      while (pila.length) {
        var c = pila.pop(); g[c[0] + ',' + c[1]] = 1;
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
          var nx = c[0] + d[0], ny = c[1] + d[1], k = nx + ',' + ny;
          if (m[ny] && m[ny][nx] === 'Z' && !visto[k]) { visto[k] = 1; pila.push([nx, ny]); }
        });
      }
      grupos.push({ celdas: g, visto: false });
    }
    return grupos;
  }
  function nuevoAgente(def) {
    var a = def.agente || lee(def).agente;
    // col: color activo de los bloques R/A (0 rojo, 1 azul) · plat: plataforma bajo los pies · tele/enSw: para no repetir
    // teletransporte ni interruptor sin salir antes · botas/paraguas: pasos que quedan del poder · alto: este salto es con botas
    var w = { x: a[0], f: 0, y: a[1] * 8, dir: def.dir || a[2] || 1, aire: 0, salto: 0, jdir: 0, muerto: false,
      col: 0, plat: -1, tele: false, enSw: false, botas: 0, paraguas: 0, alto: false, llc: 0,
      cajas: def.cajas && def.cajas.length ? def.cajas.map(function (c) { return c.slice(); }) : null };
    if (def.obras) w.casco = 1;                        // (26-sep, idea 48) en la casa en obras se entra con casco
    return w;
  }

  function celda(s, x, y) {
    // (24-sep, el juego seguido) en las CALLES, el borde con salida está abierto: por ahí se pasa a la pantalla vecina
    if (x < 0) return s.sal && s.sal.izq ? ' ' : 'W';
    if (x >= (s.ancho || ANCHO)) return s.sal && s.sal.der ? ' ' : 'W';
    if (y < 0) return s.sal && s.sal.arr ? ' ' : 'W';
    if (y >= (s.alto || ALTO)) return ' ';
    var ch = s.mapa[y][x];
    if (s.cajas) for (var ic = 0; ic < s.cajas.length; ic++) {
      var cj = s.cajas[ic]; if (x - cj[0] >= 0 && x - cj[0] < 2 && y - cj[1] >= 0 && y - cj[1] < 2) return 'J';
    }
    if (ch === 'R') return s.col === 0 ? 'B' : ' ';      // bloques de color: solo el activo es sólido
    if (ch === 'A') return s.col === 1 ? 'B' : ' ';
    if (PUERTA_COLOR[ch]) return (s.llc || 0) & PUERTA_COLOR[ch] ? ' ' : 'B';
    if (ch === 'V') return s.vallaAbierta ? ' ' : 'B';
    if (s.barras && s.barras.length && barraCierra(s, x, y)) return 'B';        // VALLA entre mundos: muro hasta vender las casas que pide   // puerta de color: abierta si llevas su llave
    if (ch === ' ' && s.baile && s.baile.length && bailePisa(s, x, y)) return 'F';   // (26-sep, idea 15) la pista de baile, al compás
    return ch;
  }
  function filas(w) { var r = w.y >> 3, l = [r, r + 1]; if (w.y & 7) l.push(r + 2); return l; }
  function hayMuro(s, col, w) { return filas(w).some(function (r) { return MURO[celda(s, col, r)]; }); }
  function apoyoSuelo(s, w) {
    if (w.y & 7) return false;
    var r = (w.y >> 3) + 2;
    return !!(PISABLE[celda(s, w.x, r)] || PISABLE[celda(s, w.x + 1, r)]);
  }
  function apoyo(s, w) { return apoyoSuelo(s, w) || platDebajo(s, w) >= 0; }
  // ¿Al bajar de yAntes a w.y ha pasado por encima de una plataforma? → se posa en ella (devuelve su número o -1)
  function posaEnPlat(s, w, yAntes) {
    if (s.sinPlataformas) return -1;
    for (var i = 0; i < s.plataformas.length; i++) {
      var p = s.plataformas[i], q0 = posPlat(p, s.t - 1), q1 = posPlat(p, s.t);
      if (yAntes + 16 <= q0.y && w.y + 16 >= q1.y && encima(w, p, q1)) { w.y = q1.y - 16; return i; }
    }
    return -1;
  }
  function copia(o) { return JSON.parse(JSON.stringify(o)); }
  /* TRAMPAS CON RITMO (24-sep). Todas: periodo (pasos) y fase.
     · prensas: [{ x, arriba, abajo, periodo, fase }] — una barra de UNA columna que baja del techo (fila `arriba`) hasta la
       fila `abajo` y vuelve a subir: la punta y la barra matan. El recorrido: 1/4 bajando, 1/4 abajo, 1/2 subiendo y arriba.
     · rayos: [{ x1, x2, y1, y2, periodo, encendido, fase }] — zona de casillas que MATA mientras está encendida
       (`encendido` pasos de cada periodo; los 12 anteriores parpadea flojito: aviso).
     · barras: [{ x, y1, y2, periodo, cerrada, fase }] — columna de casillas que es MURO durante `cerrada` pasos de cada periodo. */
  function faseRitmo(p, t) { var P = p.periodo || 60; return (((t + (p.fase || 0)) % P) + P) % P; }
  function largoPrensa(p, t) {                     // hasta qué fila llega la prensa ahora
    var P = p.periodo || 60, q = faseRitmo(p, t), L = p.abajo - p.arriba;
    var f = q < P / 4 ? q / (P / 4) : q < P / 2 ? 1 : q < P ? 1 - (q - P / 2) / (P / 2) : 0;
    return p.arriba + Math.round(f * L);
  }
  function rayoEncendido(p, t) { return faseRitmo(p, t) < (p.encendido || (p.periodo || 60) / 2); }
  function barraCierra(s, x, y) {
    for (var i = 0; i < s.barras.length; i++) { var b = s.barras[i]; if (x === b.x && y >= b.y1 && y <= b.y2 && faseRitmo(b, s.t) < (b.cerrada || (b.periodo || 60) / 2)) return true; }
    return false;
  }
  function peligroRitmo(s, x, y) {
    var i, p;
    for (i = 0; i < (s.prensas || []).length; i++) { p = s.prensas[i]; if (x === p.x && y >= p.arriba && y <= largoPrensa(p, s.t)) return true; }
    for (i = 0; i < (s.rayos || []).length; i++) { p = s.rayos[i]; if (x >= p.x1 && x <= p.x2 && y >= p.y1 && y <= p.y2 && rayoEncendido(p, s.t)) return true; }
    return false;
  }
  // ¿delante de qué puerta o tubería de la calle está? (de pie, con su casilla de arriba a la izquierda en ella)
  function puertaBajo(s, w) {
    if (!s.sal || w.aire !== 0 || (w.y & 7)) return null;
    var r = null;
    (s.def.puertas || []).concat(s.def.tuberias || [], s.def.tienda ? [{ x: s.def.tienda.x, y: s.def.tienda.y, tienda: true }] : []).forEach(function (p) { if (w.x === p.x && (w.y >> 3) === p.y && puertaExiste(s, p)) r = p; });
    return r;
  }
  // (25-sep, ideas 129 y 133) hay puertas que NO EXISTEN hasta que toca: la del autobús nocturno (soloNoche, con s.noche,
  // que copia j.noche) y la que aparece al hacer un truco de esa calle (truco: i)
  function puertaExiste(s, p) {
    if (p.soloNoche && !s.noche && !nocheVuelta(s.av)) return false;   // (27-sep, P5) en la vuelta a Nerja, el autobús nocturno sale
    if (p.acto && p.calle && !actoAbierto(s.av, p.acto)) return false;   // (27-sep, P5) el «Autobús a la Gran Villa»: solo desde la vuelta
    if (p.truco != null && !(s.trucos && s.trucos[p.truco] && s.trucos[p.truco].hecho)) return false;
    return true;
  }
  // (25-sep, idea 128) ¿están vendidas TODAS las casas normales de ese mundo? (abre la puerta sin número). Normales = las de
  // puertas sin condición (ni extra, ni pide, ni pideEstatuillas) de las calles de ese mundo que no son secretas.
  // Calle secreta = `secreta: true`, o a la que solo se llega por una puerta de noche o de truco (ningún borde ni puerta normal lleva a ella)
  function secretasDeCalles() {
    var oculta = {}, normal = {}, r = {};
    CALLES.forEach(function (c) {
      Object.keys(c.salidas || {}).forEach(function (l) { if (c.salidas[l]) normal[c.salidas[l]] = 1; });
      (c.puertas || []).forEach(function (p) { if (p.calle) (p.soloNoche || p.truco != null ? oculta : normal)[p.calle] = 1; });
    });
    CALLES.forEach(function (c, i) { if (c.secreta || (i > 0 && oculta[c.id] && !normal[c.id])) r[c.id] = 1; });
    return r;
  }
  function extraAbiertaAv(av, mundo) {
    if (!av) return true;
    var sec = secretasDeCalles(), total = 0, hechas = 0;
    CALLES.forEach(function (c) {
      if ((c.mundo || '') !== (mundo || '') || sec[c.id]) return;
      (c.puertas || []).forEach(function (p) {
        // (27-sep, P5) las de la VUELTA (`acto`) no cuentan: la puerta sin número de Nerja se abre con sus 13 casas y el Pulpo
        if (!p.casa || p.extra || p.pide || p.pideEstatuillas || p.soloNoche || p.truco != null || p.acto) return;
        total++; if (av.vendidas && av.vendidas[p.casa]) hechas++;
      });
    });
    return total > 0 && hechas >= total;
  }
  function extraAbierta(j, mundo) { return extraAbiertaAv(j && j.av, mundo); }
  // (25-sep, ideas 125, 127, 128) ¿se puede entrar por esta puerta de casa? Devuelve null si sí, o el suceso que toca.
  // Sin aventura (el robot, las pruebas sueltas) todas se abren, como antes.
  function puertaCierre(s, p, ev) {
    var av = s.av; if (!av) return null;
    // (27-sep, P5) las casas de la VUELTA: cerradas («El dueño está de viaje») hasta vencer al Cometa (las ya vendidas en
    // partidas de antes, abiertas)
    if (p.acto && !actoAbierto(av, p.acto) && !(av.vendidas && av.vendidas[p.casa])) return 'deViaje';
    if (p.pide) {
      if (av.dado && av.dado[p.casa]) return null;
      if (av.lleva && av.lleva[p.pide]) { av.dado = av.dado || {}; av.dado[p.casa] = 1; ev.push('regalo'); return null; }
      return 'pideObjeto';
    }
    if (p.extra && !extraAbiertaAv(av, s.def.mundo)) return 'puertaCerrada';
    if (p.pideEstatuillas && Object.keys(av.estatuillas || {}).length < p.pideEstatuillas) return 'puertaCerrada';
    // (26-sep, P4) la PUERTA DEL JEFE: se abre al vender `pideVendidas` casas de ESTE mundo (cuentaAv: normales y jefes)
    if (p.pideVendidas && cuentaAv(av, s.def.mundo || '').vendidas < p.pideVendidas) return 'puertaCerrada';
    return null;
  }
  // ¿está de pie sobre esa letra? (mira las dos casillas de debajo de los pies)
  function sobre(s, w, ch) { if (w.y & 7) return false; var r = (w.y >> 3) + 2; return celda(s, w.x, r) === ch || celda(s, w.x + 1, r) === ch; }
  // (idea 56) los suelos que se hundieron vuelven al rato (150 pasos), si no estás encima
  function hundidos(j, s, w) {
    if (!s.hundidos || !s.hundidos.length) return;
    s.hundidos = s.hundidos.filter(function (h) {
      if (s.t - h.t < 150) return true;
      if (ocupa(w).some(function (q) { return q[0] === h.x && q[1] === h.y; })) return true;
      s.mapa[h.y][h.x] = 'S'; return false;
    });
  }
  // (idea 99) bajar por una TUBERÍA de la calle a su sótano de bonus (una vez cada una)
  function entrarTuberia(j, id) {
    var d = null; TESOROS.forEach(function (x) { if (x.id === id) d = x; }); if (!d) return false;
    j.av.tuberias = j.av.tuberias || {}; if (j.av.tuberias[id]) return false;
    j.av.tuberias[id] = 1;
    j.av.volver = { pantalla: j.av.pantalla, x: j.w.x, y: j.w.y, dir: j.w.dir, casa: null };
    j.s = nuevaSala(d); j.s.n = j.n; j.w = nuevoAgente(d); j.salida = false; j.enTesoro = true; j.enCasa = null;
    return true;
  }
  function cinta(s, w) {
    var r = (w.y >> 3) + 2, a = celda(s, w.x, r), b = celda(s, w.x + 1, r);
    if (a === '<' || b === '<') return -1;
    if (a === '>' || b === '>') return 1;
    return 0;
  }
  function techo(s, w, ny) {
    var r = ny >> 3;
    if ((w.y >> 3) === r) return false;
    return !!(MURO[celda(s, w.x, r)] || MURO[celda(s, w.x + 1, r)]);
  }
  function mover(s, w, d) {
    if (d > 0) {
      if (w.f < 3) { w.f++; return true; }
      if (hayMuro(s, w.x + 2, w)) return empuja(s, w, 1);
      w.x++; w.f = 0; return true;
    }
    if (w.f > 0) { w.f--; return true; }
    if (hayMuro(s, w.x - 1, w)) return empuja(s, w, -1);
    w.x--; w.f = 3; return true;
  }
  /* (23-sep) CAJAS: andando por el suelo contra una caja de tu altura, la empujas una casilla si detrás hay hueco;
     si se queda sin suelo, cae hasta el siguiente. Las cajas van en el agente (w.cajas) y se copian al moverlas,
     para que el robot pueda probar todas las jugadas sin que una estropee otra. */
  function empuja(s, w, d) {
    if (!w.cajas || w.aire !== 0 || (w.y & 7)) return false;
    var fila = w.y >> 3, col = d > 0 ? w.x + 2 : w.x - 1, i, c = -1;
    for (i = 0; i < w.cajas.length; i++) {
      var k = w.cajas[i];
      if (k[1] === fila && (col === k[0] || col === k[0] + 1)) { c = i; break; }
    }
    if (c < 0) return false;
    var bx = w.cajas[c][0], by = fila, nx = d > 0 ? bx + 2 : bx - 1;
    s.cajas = w.cajas;
    // (sí se puede echar a unos pinchos: la caja los tapa y se pasa por encima)
    if (MURO[celda(s, nx, by)] || MURO[celda(s, nx, by + 1)]) return false;
    var nuevas = w.cajas.map(function (q) { return q.slice(); });
    nuevas[c][0] = bx + d;
    w.cajas = nuevas; s.cajas = nuevas;
    var alto = s.alto || ALTO;
    // cae mientras no tenga nada debajo (mira sus dos casillas; las demás cajas cuentan como suelo)
    while (nuevas[c][1] + 2 < alto) {
      var y2 = nuevas[c][1] + 2, x0 = nuevas[c][0];
      nuevas[c] = [-9, -9];                                   // que no se pise a sí misma
      var libre = !PISABLE[celda(s, x0, y2)] && !PISABLE[celda(s, x0 + 1, y2)];
      nuevas[c] = [x0, y2 - 2];
      if (!libre) break;
      nuevas[c][1]++;
    }
    s.empujon = true;
    return true;
  }
  function ocupa(w) {
    var l = [];
    filas(w).forEach(function (r) { l.push([w.x, r], [w.x + 1, r]); });
    return l;
  }

  // (23-sep) ¿el agente está dentro de alguna zona [c1, f1, c2, f2, …]? devuelve la zona o null
  function zonaDe(lista, w) {
    if (!lista || !lista.length) return null;
    var fs = filas(w);
    for (var i = 0; i < lista.length; i++) {
      var z = lista[i];
      if (w.x + 1 >= z[0] && w.x <= z[2] && fs.some(function (r) { return r >= z[1] && r <= z[3]; })) return z;
    }
    return null;
  }
  // (23-sep) MAREA: el agua sube y baja entre dos filas (y de su superficie, en px). { arriba, abajo, periodo, fase }
  function nivelAgua(s, t) {
    var a = s.agua; if (!a) return 1e9;
    var P = a.periodo || 480, q = (((t + (a.fase || 0)) % P) + P) % P, med = P / 2, fr = q < med ? q / med : (P - q) / med;
    return a.abajo * 8 - Math.round(fr * (a.abajo - a.arriba) * 8);
  }
  // Cada cuántos pasos se repite TODO lo que se mueve solo en la sala (nubes, noria, ascensor, marea, y el viento y el
  // vapor, que empujan un paso sí y otro no). Lo usa el robot para llevar el tiempo.
  function periodoSala(s) {
    var L = 1, mcd = function (a, b) { return b ? mcd(b, a % b) : a; }, mcm = function (a, b) { return a / mcd(a, b) * b; };
    if (!s.sinPlataformas) s.plataformas.forEach(function (p) { L = mcm(L, periodoPlat(p)); });
    if ((s.viento && s.viento.length) || (s.vapor && s.vapor.length) || (s.cascada && s.cascada.length)) L = mcm(L, 2);
    if (s.agua) L = mcm(L, s.agua.periodo || 480);
    (s.prensas || []).concat(s.rayos || [], s.barras || []).forEach(function (p) { L = mcm(L, p.periodo || 60); });
    if (s.fantasmas && Object.keys(s.fantasmas).length) L = mcm(L, 60);     // (25-sep) llaves fantasma: 60 pasos
    (s.baile || []).forEach(function (z) { L = mcm(L, z.periodo || 48); });   // (26-sep, idea 15) la pista de baile
    return L;
  }

  // Un paso del agente contra el terreno (sin enemigos ni llaves). ev: lista de sucesos.
  function pasoAgente(s, w, inp, ev) {
    ev = ev || [];
    if (w.muerto) return ev;
    s.col = w.col || 0; s.llc = w.llc || 0; s.cajas = w.cajas || null; s.empujon = false;
    var d = (inp.der ? 1 : 0) - (inp.izq ? 1 : 0), yAntes;
    // (23-sep) VAPOR: dentro de la columna de vapor flotas y subes (4 px un paso sí y otro no) y te mueves de lado;
    // al salir por arriba caes, así que te quedas «flotando» en lo alto hasta que te apartas a un borde.
    if (zonaDe(s.vapor, w)) {
      w.plat = -1; w.salto = 0; w.jdir = 0; w.aire = 2; if (w.coyote || w.guarda) w.coyote = w.guarda = 0;   // (26-sep) el modo moderno no se guarda aquí dentro
      if (d) { w.dir = d; mover(s, w, d); }
      if (!(s.t & 1) && !techo(s, w, w.y - 4) && w.y >= 4) w.y -= 4;
      viento(s, w);
      return finPaso(s, w, ev);
    }
    // (24-sep, Alejandro: «cuando ponga agua cayendo, que te baje de verdad») CASCADA: dentro, si no estás de pie, el agua
    // te baja despacio (4 px un paso sí y otro no) sin que la caída cuente, y te puedes mover de lado para salir.
    if (zonaDe(s.cascada, w) && !apoyo(s, w) && w.aire !== 1) {
      w.plat = -1; w.salto = 0; w.jdir = 0; w.aire = 2; if (w.coyote || w.guarda) w.coyote = w.guarda = 0;   // (26-sep) el modo moderno no se guarda aquí dentro
      if (d) { w.dir = d; mover(s, w, d); }
      if (!(s.t & 1)) { w.y += (w.y & 3) ? 4 - (w.y & 3) : 4; if (apoyoSuelo(s, w)) { w.aire = 0; ev.push('aterriza'); } }
      viento(s, w);
      return finPaso(s, w, ev);
    }
    // (24-sep, idea 32) ESCALERA de mano (E): con SALTAR subes, sin tocar nada bajas despacio; de lado, te bajas de ella
    if (ocupa(w).some(function (q) { return celda(s, q[0], q[1]) === 'E'; }) && (inp.saltar || w.aire !== 0)) {
      w.plat = -1; w.salto = 0; w.jdir = 0; w.aire = 2; if (w.coyote || w.guarda) w.coyote = w.guarda = 0;   // (26-sep) el modo moderno no se guarda aquí dentro
      if (d) { w.dir = d; mover(s, w, d); }
      if (inp.saltar) { if (!techo(s, w, w.y - 2)) w.y -= 2; }
      else if (!apoyoSuelo(s, w)) w.y += (w.y & 1) ? 1 : 2;   // (24-sep) si vienes de un salto con altura impar, primero a par: si no, te saltabas el suelo
      if (apoyoSuelo(s, w) && !inp.saltar) { w.aire = 0; }
      viento(s, w);
      return finPaso(s, w, ev);
    }
    // (idea 28) DOBLE SALTO (poder): en el aire, volver a pulsar SALTAR da otro salto
    // (25-sep, 2b: con el perdón al borde aún a mano, primero se gasta el perdón y el doble salto se guarda para luego)
    var dobleYa = false;
    if (w.doble > 0 && w.aire !== 0 && inp.saltar && !w.saltoAntes && !w.dobleUsado && !(w.coyote > 0)) { w.aire = 1; w.salto = 0; w.jdir = d || w.jdir; w.alto = false; w.dobleUsado = true; dobleYa = true; ev.push('salto'); }
    // (idea 55) GLOBO (poder): en el aire, con SALTAR subes flotando; si no, bajas despacio (como el paraguas)
    if (w.globo > 0 && w.aire !== 0 && inp.saltar && w.saltoAntes) { w.aire = 2; w.salto = 0; if (d) { w.dir = d; mover(s, w, d); } if (!techo(s, w, w.y - 2) && w.y > 2) w.y -= 2; w.saltoAntes = true; return finPaso(s, w, ev); }
    w.saltoPrev = w.saltoAntes; w.saltoAntes = !!inp.saltar;
    /* (25-sep, 2b) MODO MODERNO (solo con j.moderno, una opción del menú apagada de fábrica; el robot y las casas siguen con
       las reglas clásicas del Manic Miner): PERDÓN AL BORDE = durante COYOTE pasos después de salir ANDANDO de un suelo
       todavía se puede saltar · SALTO GUARDADO = si pulsas saltar en el aire hasta GUARDA pasos antes de aterrizar, salta
       en cuanto toca el suelo (aunque ya lo hayas soltado). */
    var guardado = false;
    if (w.moderno) {
      if (w.aire === 0) w.coyote = 0;
      else if (w.coyote > 0) {
        if (inp.saltar && w.aire >= 2) { w.aire = 1; w.salto = 0; w.jdir = d; w.plat = -1; w.alto = w.botas > 0; w.rebote = false; w.coyote = 0; w.guarda = 0; dobleYa = true; if (d) w.dir = d; ev.push('salto', 'perdon'); }
        else w.coyote--;
      }
      if (w.aire !== 0 && inp.saltar && !w.saltoPrev && !dobleYa) w.guarda = GUARDA;
      else if (w.guarda > 0 && w.aire !== 0) w.guarda--;
      guardado = w.aire === 0 && w.guarda > 0;
    }
    // 0) de pie en una plataforma que se mueve: te lleva con ella
    if (w.aire === 0 && w.plat >= 0 && !s.sinPlataformas && s.plataformas[w.plat]) {
      var pl = s.plataformas[w.plat], a0 = posPlat(pl, s.t - 1), a1 = posPlat(pl, s.t), ddx = a1.x - a0.x, ddy = a1.y - a0.y;
      if (ddy < 0 && techo(s, w, w.y + ddy)) { w.plat = -1; w.aire = 2; }
      else { w.y += ddy; for (var k = 0; k < Math.abs(ddx); k += 2) mover(s, w, ddx > 0 ? 1 : -1); }
    }
    if (w.aire === 0) w.dobleUsado = false;
    // (idea 30) TRAMPOLÍN (T): al pisarlo te lanza 5 filas hacia arriba (hacia donde vayas)
    if (w.aire === 0 && sobre(s, w, 'T')) { w.aire = 1; w.salto = 0; w.jdir = d; w.plat = -1; w.alto = 2; if (d) w.dir = d; ev.push('rebote'); }
    // (24-sep) delante de una PUERTA o TUBERÍA de la calle, SALTAR (nueva pulsación) = entrar, en vez de saltar
    if (w.aire === 0 && s.sal && inp.saltar && !w.saltoPrev) {
      var pu = puertaBajo(s, w);
      // (25-sep) + puertas que llevan a otra CALLE (w.puertaCalle; el cambio lo hace paso()) y puertas de casa con condición
      // (w.puertaDef = la puerta, para que la pantalla lea el vecino y lo que pide)
      if (pu) {
        if (pu.tienda) ev.push('tienda');
        else if (pu.calle) { w.puertaCalle = pu.calle; ev.push('puertaCalle'); }
        // (25-sep, 2b) TUBERÍA DE ATAJO entre mundos: `atajo` = la calle a la que lleva (y allí, otra que vuelve)
        // (26-sep, P4) en la aventura, el atajo solo vale con LAS DOS calles ya pisadas (o si ya lo usaste en esta partida)
        else if (pu.atajo) { if (s.av && !atajoAbierto(s.av, s.def.id, pu.atajo)) { w.atajoCerrado = pu.atajo; ev.push('atajoCerrado'); } else { w.puertaCalle = pu.atajo; w.atajo = s.def.id; ev.push('atajo'); } }
        else if (pu.casa) { w.puertaCasa = pu.casa; w.puertaDef = pu; var cierre = puertaCierre(s, pu, ev); ev.push(cierre || 'puerta'); }
        else { w.tuberia = pu.a; ev.push('tuberia'); }
        return finPaso(s, w, ev);
      }
    }
    if (w.aire === 0) {
      var c = cinta(s, w), aFavor = c && d === c;
      if (c) { if (d === 0) d = c; else if (d === -c) d = 0; }
      if (inp.saltar || guardado) {
        w.aire = 1; w.salto = 0; w.jdir = d; w.plat = -1; w.alto = w.botas > 0; w.rebote = false;
        if (d) w.dir = d;
        ev.push('salto');
        if (guardado) { w.guarda = 0; if (!inp.saltar) ev.push('saltoGuardado'); }
      } else if (d) {
        if (d !== w.dir) w.dir = d;
        else { mover(s, w, d); if (aFavor) mover(s, w, d); if (w.patin > 0) mover(s, w, d); if (sobre(s, w, 'H')) w.resbala = 3; }
      } else if (w.resbala > 0 && sobre(s, w, 'H')) {           // (idea 31) HIELO: al soltar, sigues resbalando un poco
        w.resbala--; mover(s, w, w.dir);   // (24-sep) patinete: el doble de rápido   // (22-sep, Alejandro) andando a favor de la cinta, el doble de rápido
      }
    }
    if (w.aire === 1) {
      var tabla = w.alto === 2 ? SALTO_TRAMP : w.alto ? SALTO_ALTO : s.luna ? SALTO_LUNA : SALTO;
      var dy = tabla[w.salto], ny = w.y + dy;
      if (dy < 0 && techo(s, w, ny)) {
        w.aire = 2;
        // (25-sep, idea 25) se ha dado con la cabeza contra un muro U: paso() lo agrieta o lo rompe (solo si hay U, para que
        // el robot no cargue con un campo más en cada posición)
        if (s.mapa[ny >> 3] && (s.mapa[ny >> 3][w.x] === 'U' || s.mapa[ny >> 3][w.x + 1] === 'U')) w.cabeza = ny >> 3;
      } else {
        yAntes = w.y; w.y = ny; w.salto++;
        if (w.jdir) mover(s, w, w.jdir);
        var enPl = dy > 0 ? posaEnPlat(s, w, yAntes) : -1;
        if (enPl >= 0) { w.aire = 0; w.plat = enPl; ev.push('aterriza'); }
        else if (dy > 0 && apoyoSuelo(s, w)) { w.aire = 0; w.plat = -1; ev.push('aterriza'); }
        else if (w.salto >= tabla.length) { w.aire = w.paraguas > 0 || w.rebote ? 2 : 6; w.rebote = false; }   // (25-sep) tras el rebote de pisar, la caída cuenta como desde un borde
      }
    } else if (w.aire >= 2) {
      // (22-sep) si ya hay suelo debajo (p. ej. un salto cortado por el techo nada más empezar), se queda de pie:
      // antes bajaba 4 px sin mirar y se hundía en el suelo
      if (apoyoSuelo(s, w)) { w.aire = 0; w.plat = -1; ev.push('aterriza'); }
      else if (platDebajo(s, w) >= 0) { w.aire = 0; w.plat = platDebajo(s, w); ev.push('aterriza'); }
      else {
        yAntes = w.y;
        // (22-sep) si viene de una nube vertical puede estar «a medio escalón» (y no múltiplo de 4): el primer tramo
        // lo recoloca; si no, nunca pasaba justo por el suelo y caía sin fin atravesándolo todo
        var resto = w.y & 3;
        if (w.paraguas > 0 || w.globo > 0) { w.y += resto ? 4 - resto : 2; w.aire = 2; }        // paraguas (y globo): cae despacio y la caída no cuenta
        else if (s.luna) { w.y += (w.y & 1) ? 1 : 2; w.aire++; }                 // la Galaxia: cae a 2 px por paso
        else { w.y += resto ? 4 - resto : 4; w.aire++; }
        var enP = posaEnPlat(s, w, yAntes);
        if (enP >= 0 || apoyoSuelo(s, w)) {
          if (w.aire >= (s.luna ? CAIDA_MORTAL * 4 : CAIDA_MORTAL)) { w.muerto = 'caida'; ev.push('muerte'); return ev; }
          w.aire = 0; w.plat = enP; ev.push('aterriza');
        }
      }
    }
    viento(s, w);
    if (w.aire === 0) {
      if (apoyoSuelo(s, w)) w.plat = -1;
      else { var pd = platDebajo(s, w); if (pd >= 0) w.plat = pd; else { w.aire = 2; w.plat = -1; if (w.moderno) w.coyote = COYOTE; } }   // (2b) perdón al borde
      if (w.aire === 0 && w.plat < 0 && !s.sinDerrumbe) {
        var r = (w.y >> 3) + 2;
        [w.x, w.x + 1].forEach(function (x) {
          var cc = celda(s, x, r);
          if (cc !== 'C' && cc !== 'S') return;
          var k = x + ',' + r;
          s.derr[k] = (s.derr[k] || 0) + 1;
          if (cc === 'C' && s.derr[k] >= DERRUMBE) { s.mapa[r][x] = ' '; delete s.derr[k]; ev.push('derrumbe'); }
          if (cc === 'S' && s.derr[k] >= DERRUMBE * 3) { s.mapa[r][x] = ' '; delete s.derr[k]; (s.hundidos = s.hundidos || []).push({ x: x, y: r, t: s.t }); ev.push('hunde'); }
        });
      }
    }
    return finPaso(s, w, ev);
  }
  // (23-sep) VIENTO: dentro de su zona te empuja una casilla de 2 px hacia su lado, un paso sí y otro no (de pie o saltando)
  function viento(s, w) {
    var z = zonaDe(s.viento, w);
    if (z && !(s.t & 1)) mover(s, w, z[4] < 0 ? -1 : 1);
  }
  // Lo común al final de cada paso: teletransportes, interruptores, llaves de colores, cajas, agua y lo que mata
  function finPaso(s, w, ev) {
    if (s.empujon) { ev.push('caja'); s.empujon = false; }
    // Teletransportes (idea 4): de pie en uno (su casilla de arriba a la izquierda), apareces en su pareja.
    // Para volver hay que salir y entrar otra vez.
    var enTele = false;
    if (w.aire === 0 && !(w.y & 7) && s.teles) Object.keys(s.teles).forEach(function (n) {
      var par = s.teles[n]; if (enTele || !par || par.length !== 2) return;
      for (var i = 0; i < 2; i++) if (w.x === par[i][0] && (w.y >> 3) === par[i][1]) {
        enTele = true;
        if (!w.tele) { w.x = par[1 - i][0]; w.y = par[1 - i][1] * 8; w.f = 0; w.plat = -1; ev.push('tele'); }
        return;
      }
    });
    w.tele = enTele;
    // Interruptor de color (idea 5): al entrar en «*», cambian los bloques rojos y azules
    var enSw = ocupa(w).some(function (c) { return celda(s, c[0], c[1]) === '*'; });
    if (enSw && !w.enSw) { w.col = (w.col || 0) ^ 1; s.col = w.col; ev.push('color'); }
    w.enSw = enSw;
    // Llaves de colores: al pasar por una, abre para siempre (en esta casa) las puertas de su color
    ocupa(w).forEach(function (c) {
      var b = LLAVE_COLOR[celda(s, c[0], c[1])];
      if (b && !((w.llc || 0) & b)) { w.llc = (w.llc || 0) | b; s.llc = w.llc; ev.push('llaveColor'); }
    });
    // (24-sep) bordes de las calles: al salir por uno, se pasa a la pantalla vecina (lo hace paso() con w.borde)
    if (s.sal) {
      var W8 = (s.ancho || ANCHO);
      if (s.sal.izq && w.x < 0) { w.borde = 'izq'; return ev; }
      if (s.sal.der && w.x > W8 - 2) { w.borde = 'der'; return ev; }
      if (s.sal.arr && w.y < -8) { w.borde = 'arr'; return ev; }
      if (s.sal.aba && w.y >= (s.alto || ALTO) * 8 - 8) { w.borde = 'aba'; return ev; }
      w.enPuerta = !!puertaBajo(s, w);                        // (para dibujar la flechita de «entrar»)
    }
    if (w.y >= (s.alto || ALTO) * 8) { w.muerto = 'caida'; ev.push('muerte'); return ev; }
    // Marea: si el agua te cubre los ojos, te ahogas · (26-sep, idea 12) con el respiro de una burbuja, no
    if (s.agua && !(w.respiro > 0) && w.y + 4 >= nivelAgua(s, s.t)) { w.muerto = 'agua'; ev.push('muerte'); return ev; }
    if (!(w.goma > 0) && !(w.estrella > 0) && ocupa(w).some(function (c) { return MORTAL[celda(s, c[0], c[1])]; })) { w.muerto = 'pincho'; ev.push('muerte'); }
    // (26-sep, arreglo A1) con la protección de después de volver a la calle (w.inv, parpadeando), la prensa y el rayo tampoco
    // (26-sep, revisión) solo EN LA CALLE: dentro de una casa, el parpadeo de perder la seta (45 pasos) libra de los bichos, no de
    // la prensa ni del rayo (como antes de A1; si no, cambiaba la dificultad de las casas)
    if (!w.muerto && !(w.estrella > 0) && !(w.inv > 0 && s.calle) && ocupa(w).some(function (c) { return peligroRitmo(s, c[0], c[1]); })) { w.muerto = 'rayo'; ev.push('muerte'); }
    // (idea 57) PUERTA QUE SE CIERRA (D): al terminar de cruzarla, se cierra detrás de ti (no hay vuelta atrás)
    if (!s.sinDerrumbe) {
      var enD = {}; ocupa(w).forEach(function (q) { if (celda(s, q[0], q[1]) === 'D') enD[q[0]] = 1; });
      Object.keys(s.dAntes || {}).forEach(function (cx) { if (enD[cx]) return; cx = +cx; for (var yy = 0; yy < s.mapa.length; yy++) if (s.mapa[yy][cx] === 'D') s.mapa[yy][cx] = 'B'; ev.push('cierra'); });
      s.dAntes = enD;
    }

    return ev;
  }

  function pasoEnemigos(s) {
    if (s.congelado > 0) { s.congelado--; return; }
    if (s.lento > 0) { s.lento--; if (s.t & 1) return; }       // (24-sep, idea 54) reloj de arena: a cámara lenta
    // (idea 35) el IMITADOR repite lo que hiciste hace 3 segundos
    if (s.objetivo) { s.huella = s.huella || []; s.huella.push({ x: s.objetivo.x, y: s.objetivo.y, dir: s.objetivo.dir }); if (s.huella.length > 60) s.huella.shift(); }
    s.enemigos.forEach(function (e) {
      if (e.fuera) return;
      if (e.tipo === 'h') {
        if (e.robado > 0) e.robado--;                            // (147) el moroso: tras robarte, 48 pasos sin volver a robar
        if (e.lento && (s.t & 1)) return;
        if (e.dir > 0) { if (e.f < 3) e.f++; else if (e.x < e.max) { e.x++; e.f = 0; } else e.dir = -1; }
        else { if (e.f > 0) e.f--; else if (e.x > e.min) { e.x--; e.f = 3; } else e.dir = 1; }
        e.fr = e.f;
        if (e.come) comeCosas(s, e);                              // (25-sep, 148/149) aspiradora y termitas
      } else if (e.tipo === 'm') {
        var hu = s.huella && s.huella.length >= 60 ? s.huella[0] : null;
        if (hu) { e.x = hu.x; e.y = hu.y; e.dir = hu.dir; e.fr = (s.t >> 2) & 3; }
        else e.y = -99;                                      // aún no ha salido
      } else if (e.tipo === 'v') {
        // (idea 18) murciélago DORMIDO: no se mueve hasta que saltas cerca (a 5 casillas); si vas andando, ni se entera
        if (e.duerme && !e.despierto) { var ob = s.objetivo; if (ob && ob.salta && Math.abs(ob.x - e.x) < 40) e.despierto = true; else { e.fr = 0; return; } }
        var min = e.min, max = e.max;
        if (e.vecino && s.quedan === 0) { min = e.minFinal; e.dy = e.dy > 0 ? e.dyFinal : -e.dyFinal; }
        e.y += e.dy;
        if (e.y <= min) { e.y = min; e.dy = Math.abs(e.dy); }
        else if (e.y >= max) { e.y = max; e.dy = -Math.abs(e.dy); }
        e.fr = (e.fr + 1) & 3;
      } else if (e.tipo === 'g') {
        if (e.cae) { e.y += 4; if (e.y > (s.alto || ALTO) * 8) e.fuera = true; }
        if ((s.t & 3) === 0) e.fr = (e.fr + 1) & 1;
      } else if (e.tipo === 'f') {
        // Satélites que caen (pantallas retro): caen por una columna, se estrellan abajo y vuelven a caer por otra.
        // Su sitio sale del paso (s.t), así que el robot puede seguirlos.
        var cols = e.cols || [e.x], caida = Math.round((e.yFin - e.y0) / (e.vel || 2)), ciclo = caida + (e.espera || 12);
        var q = ((s.t + (e.fase || 0)) % (ciclo * cols.length) + ciclo * cols.length) % (ciclo * cols.length);
        var cual = Math.floor(q / ciclo), dentro = q % ciclo;
        e.x = cols[cual];
        e.estalla = dentro >= caida;
        e.y = e.estalla ? e.yFin : e.y0 + dentro * (e.vel || 2);
        e.fr = e.estalla ? 3 : (dentro >> 1) & 1;
      } else if (e.tipo === 'c') {
        // El Tasador (jefe final, idea 7): flota a través de todo hacia el agente, a 1 px por paso (el agente anda a 2).
        // Se despierta al coger todas las llaves (o desde el principio con siempre:true).
        if (!e.activo && (e.siempre || s.quedan === 0)) e.activo = true;
        if (e.activo && s.objetivo) {
          var tx = s.objetivo.x - 1, ty = s.objetivo.y, v = e.vel || 1;
          e.x += Math.max(-v, Math.min(v, tx - e.x)); e.y += Math.max(-v, Math.min(v, ty - e.y));
        }
        e.fr = (e.fr + ((s.t & 3) === 0 ? 1 : 0)) & 3;
      } else if (e.tipo === 'p') {
        // (23-sep) PELOTA que bota: va y viene entre min y max (px) y da botes de `alto` px cada `bote` pasos.
        // Como su sitio sale del paso (s.t), el robot la sigue igual que a los satélites.
        if (e.y0 === undefined) e.y0 = e.y;
        var Lp = e.max - e.min, vp = e.vel || 1, qp = Lp > 0 ? (((s.t * vp + (e.fase || 0)) % (2 * Lp)) + 2 * Lp) % (2 * Lp) : 0;
        e.x = e.min + (qp <= Lp ? qp : 2 * Lp - qp);
        var B = e.bote || 24, bq = (((s.t + (e.fase || 0)) % B) + B) % B / B;
        e.y = e.y0 - Math.round((e.alto || 24) * 4 * bq * (1 - bq));
        e.fr = bq < 0.08 || bq > 0.92 ? 1 : 0;
      } else if (e.tipo === 'a') {
        // (24-sep, Alejandro: «un pájaro volando que, si saltas debajo suya, te ataque; si no, nada») vuela de lado entre
        // min y max (px); si SALTAS justo debajo, se lanza en picado hasta `baja` px y vuelve a subir. El robot no lo sigue.
        if (e.y0 === undefined) { e.y0 = e.y; e.dir = e.dir || 1; e.pica = 0; }
        var oa = s.objetivo;
        if (!e.pica && oa && oa.salta && oa.y > e.y && Math.abs(oa.x + 5 - (e.x + 8)) < 14) e.pica = 1;
        if (e.pica === 1) { e.y += 3; if (e.y >= e.y0 + (e.baja || 56)) e.pica = 2; }
        else if (e.pica === 2) { e.y -= 1; if (e.y <= e.y0) { e.y = e.y0; e.pica = 0; } }
        else { e.x += e.dir * (e.vel || 1); if (e.x >= e.max) { e.x = e.max; e.dir = -1; } else if (e.x <= e.min) { e.x = e.min; e.dir = 1; } }
        e.fr = e.pica === 1 ? 2 : (s.t >> 2) & 3;
      } else if (e.tipo === 't') {
        // FANTASMA TÍMIDO: si el agente le mira, se tapa la cara y no se mueve; si le da la espalda, se acerca
        // (atraviesa paredes, como el Tasador). El robot no lo sigue: se mira jugando.
        var o = s.objetivo;
        if (!o) return;
        var mira = (o.dir || 1) > 0 ? e.x + 6 >= o.x : e.x + 6 <= o.x + 10;
        if (mira) { e.fr = 2; return; }
        var vt = e.vel || 1;
        if (s.t & 1) { e.x += Math.max(-vt, Math.min(vt, o.x - 1 - e.x)); e.y += Math.max(-vt, Math.min(vt, o.y + 2 - e.y)); }
        e.fr = (s.t >> 3) & 1;
      } else pasoMonstruo(s, e);                                 // (25-sep, 145-152) okupa, suegra, perro, dueño, cofre
    });
    if (s.jefe && !s.jefe.vencido) mueveJefe(s, s.jefe);          // (25-sep, 138-144) el jefe, con su propio reloj
  }
  function posEnemigo(e) {
    if (e.tipo === 'h') return { x: e.x * 8 + e.f * 2, y: e.y, flip: e.dir < 0 };
    // (25-sep) los monstruos nuevos que andan miran hacia donde van (y en la casa espejo, al revés: dir empieza en -1)
    var gira = e.tipo === 'suegra' || e.tipo === 'perro' || e.tipo === 'cofre' || e.tipo === 'okupa' || e.tipo === 'generoso' || e.tipo === 'gente';
    return { x: e.x, y: e.y, flip: gira ? (e.dir || 1) < 0 : false };
  }
  function choca(w, e) {
    var a = mascara('agente', w.f), p = posEnemigo(e), b = mascara(e.spr, e.fr);
    var ax = w.x * 8 + w.f * 2, ay = w.y;
    if (ax + a.ancho <= p.x || p.x + b.ancho <= ax || ay + a.alto <= p.y || p.y + b.alto <= ay) return false;
    var tabla = {};
    a.puntos.forEach(function (q) { tabla[(w.dir < 0 ? a.ancho - 1 - q[0] : q[0]) + ax + ',' + (q[1] + ay)] = 1; });
    return b.puntos.some(function (q) { return tabla[(p.flip ? b.ancho - 1 - q[0] : q[0]) + p.x + ',' + (q[1] + p.y)]; });
  }

  /* ── La partida ────────────────────────────────────────────────────────────────────────── */
  // opc: { turbo } → puntos ×2 (la pantalla, además, acelera) · { espejo } → todas las casas al revés (reto semanal)
  //      { dos } → 2 jugadores en el mismo ordenador (idea 15): no hay vidas; gana quien coja más llaves
  function nuevaPartida(n, opc) {
    opc = opc || {};
    var j = { puntos: 0, vidas: 2, proxVida: VIDA_EXTRA, vuelta: 0, racha: 1, corazones: 0, cogidos: {}, turbo: !!opc.turbo,
      espejo: !!opc.espejo, dos: !!opc.dos, puntos2: 0, llaves1: 0, llaves2: 0, enTesoro: false };
    opcModos(j, opc);                                  // (25-sep) desafío del día, sin morir, mejoras y peques (todo opcional)
    empezarSala(j, n || 0);
    return j;
  }
  function claveBonus(s, b) { return s.def.id + ':' + b.x + ',' + b.y; }
  // En la 2.ª vuelta (y en la 4.ª…) las casas salen en ESPEJO (idea 6)
  function defDe(j, n) { var d = SALAS[n]; return (j.espejo || j.vuelta % 2 === 1) ? espejo(d) : d; }
  function empezarSala(j, n) {
    j.n = n; j.s = nuevaSala(defDe(j, n)); j.s.n = n; j.w = nuevoAgente(j.s.def); j.salida = false; j.enTesoro = false; j.racha = 1; j.propina = 0;
    if (j.dos) { j.w2 = nuevoAgente(j.s.def); j.w2.x = Math.min(j.s.ancho - 3, j.w2.x + 2); j.llaves1 = 0; j.llaves2 = 0; j.gana = 0; }
    // los trozos de corazón ya cogidos en esta partida no vuelven a salir (aunque mueras y la casa empiece de cero)
    j.s.bonus.forEach(function (b) { if (b.tipo === 'corazon' && j.cogidos && j.cogidos[claveBonus(j.s, b)]) b.cogido = true; });
    marcaObjetos(j);                                  // (25-sep) la estatuilla, la carta o las gafas que ya tienes no vuelven a salir
    modosSala(j);                                     // (25-sep, ideas 167 y 179) regla del desafío del día y mejora del aire
    j.salidaSec = null;                               // (25-sep, 2b) por qué puerta has salido (la secreta lleva a otra calle)
    poderContraJefe(j);                               // (25-sep, 2b) el poder de otro jefe vencido le quita una vida a este
    if (j.revisita) preparaRevisita(j);               // (25-sep, 2b) de vuelta a una casa vendida, con las botas de muelle
  }
  // (22-sep, Alejandro: «las pantallas de bonus, todas diferentes») hay varias salas de bonus; cada casa lleva a una
  function tesoroDe(n) { return TESOROS[((n || 0) % TESOROS.length + TESOROS.length) % TESOROS.length]; }
  function entrarTesoro(j) {
    // (26-sep, arreglo M1) en la aventura, la casa queda VENDIDA al ganarla, ANTES de su sala de bonus: si te pillaban en la
    // sala de bonus, volvías a la calle con la casa sin vender (y con el Gran Tasador no salía el final)
    if (j.av && j.enCasa && !j.revisita) vendeCasa(j, j.enCasa);
    // (26-sep, revisión) si has salido por la SALIDA SECRETA, queda apuntada ya (antes, solo al acabar la sala de bonus)
    var sec = j.salidaSec; if (j.av && sec && sec.calle && calle(sec.calle)) (j.av.salidas = j.av.salidas || {})[sec.casa || j.enCasa] = sec.calle;
    var d = tesoroDe(j.n);
    j.s = nuevaSala(d); j.s.n = j.n; j.w = nuevoAgente(d); j.salida = false; j.enTesoro = true; j.racha = 1;
  }
  function sumar(j, p, ev, quien) {
    p = p * (j.turbo ? 2 : 1) * (j.feliz > 0 ? 2 : 1);      // feliz: la «hora feliz» (evento sorpresa): ×2 un rato
    sumaTal(j, p, ev, quien);
  }
  // (26-sep, arreglo B4) los puntos TAL CUAL, sin el ×2 del turbo ni de la hora feliz (lo que devuelve el moroso)
  function sumaTal(j, p, ev, quien) {
    if (quien === 2) { j.puntos2 += p; return; }
    j.puntos += p;
    while (j.puntos >= j.proxVida) { j.proxVida += VIDA_EXTRA; if (sinExtras(j)) continue; j.vidas++; ev.push('vida'); }   // (168 y 167) sin morir / un solo intento: ninguna vida extra
  }
  // Las 3 estrellas de una casa (se miran al entrar por la puerta, antes de cobrar el aire):
  // ① acabarla · ② salir con la mitad del aire o más · ③ coger todos sus bonus (también los del secreto)
  // (las monedas «extra» de la lluvia sorpresa no cuentan para las estrellas ni para ir al bonus)
  // (26-sep) los premios de la tanda «pendientes» (ladrillos, casco, imán gigante) tampoco: son ayudas opcionales, y así ponerlos en
  // una casa que ya existe no le cambia ni las estrellas ni la entrada a su sala de bonus
  function propios(s) { return s.bonus.filter(function (b) { return !b.extra && !OPCIONAL_BONUS[b.tipo]; }); }
  function estrellas(s) {
    var b = propios(s);
    return [true, s.aire * 2 >= s.aireMax, b.length > 0 && b.every(function (x) { return x.cogido; })];
  }
  function todosBonus(s) { var b = propios(s); return b.length > 0 && b.every(function (x) { return x.cogido; }); }
  // La casa del día: la misma para todos por la fecha ('2026-09-22')
  function casaDelDia(fecha) {
    var h = 0; String(fecha).split('').forEach(function (c) { h = (h * 31 + c.charCodeAt(0)) >>> 0; });
    return h % SALAS.length;
  }
  // Lo que coge un agente al pasar: llaves, secreto, bonus, piedras preciosas y poderes. quien: 1 o 2 (2 jugadores)
  function recoge(j, s, w, quien, ev) {
    var celdas = ocupa(w), cx = w.x * 8 + w.f * 2 + 5, cy = w.y + 8;
    var cerca = function (x, y) { return celdas.some(function (c) { return c[0] === x && c[1] === y; }) ||
      (s.iman > 0 && Math.abs(x * 8 + 4 - cx) <= 26 && Math.abs(y * 8 + 4 - cy) <= 26) || imanGrande(s, x, y, cx, cy); };   // imán: 3 casillas · (26-sep, 51) el gigante: 8
    (s.falsas || []).forEach(function (k) {
      if (k.cogida || !celdas.some(function (c) { return c[0] === k.x && c[1] === k.y; })) return;
      k.cogida = true; s.aire = Math.max(1, s.aire - Math.round(s.aireMax * 0.25)); ev.push('llaveFalsa');
    });
    s.llaves.forEach(function (k, ik) {
      if (k.cogida || !cerca(k.x, k.y) || !llaveVisible(s, k)) return;   // (25-sep) la llave fantasma, solo cuando se ve
      if (llaveTapada(s, k)) return;                                        // (25-sep, idea 145) con el okupa encima, no
      if (s.orden) s.orden.push(ik);                                        // (25-sep, idea 121) para el truco «alReves»
      // racha: otra llave antes de 3 s (45 pasos) → ×2, ×3, ×4
      j.racha = s.t - s.ultLlave <= RACHA ? Math.min(4, (j.racha || 1) + 1) : 1;
      s.ultLlave = s.t;
      // la llave DORADA (sale a veces, la pone la pantalla): vale ×5
      k.cogida = true; s.quedan--; sumar(j, PUNTOS_LLAVE * j.racha * (k.dorada ? 5 : 1) * multLlave(j), ev, quien); ev.push('llave');
      if (s.imanG > 0 && !enCelda(celdas, k.x, k.y)) { (j.imanTrae = j.imanTrae || []).push([k.x, k.y, 'llave']); ev.push('imanTrae'); }   // (26-sep, 51) vuela hacia ti
      if (k.dorada) ev.push('llaveDorada');
      if (quien === 2) j.llaves2++; else j.llaves1++;
      if (j.racha > 1) ev.push('racha');
      if (s.quedan === 0 && jefeFuera(s)) ev.push('abierta');            // (25-sep) con el jefe vivo, la puerta sigue cerrada
    });
    // Muro falso: al meterte por primera vez, «¡secreto!»
    (s.secretos || []).forEach(function (g) {
      if (g.visto || !celdas.some(function (c) { return g.celdas[c[0] + ',' + c[1]]; })) return;
      g.visto = true; s.secretosVistos++; s.secretoVisto = true; ev.push('secreto');
    });
    // Bonus escondidos (apenas se ven), piedras preciosas y poderes (se ven)
    s.bonus.forEach(function (b) {
      if (b.cogido || b.comida || (b.alFinal && s.quedan > 0)) return;   // (comida: se la tragó la aspiradora)
      if (!celdas.some(function (c) { return c[0] === b.x && c[1] === b.y; })) { if (!traeIman(j, s, b, cx, cy)) return; ev.push('imanTrae'); }   // (26-sep, 51) o te la trae el imán gigante
      b.cogido = true; ev.push('bonus', 'bonus_' + b.tipo);
      if (s.calle && j.av && !b.extra) (j.av.premios = j.av.premios || {})[claveBonus(s, b)] = 1;   // (26-sep) en la calle ya no vuelve a salir
      if (b.muelle && j.av) { (j.av.muelleHechos = j.av.muelleHechos || {})[b.muelle] = 1; ev.push('muelleSecreto'); }   // (25-sep, 2b)
      if (b.tipo === 'gema') sumar(j, BONUS.gema, ev, quien);
      else if (BONUS[b.tipo] && (b.tipo === 'esmeralda' || b.tipo === 'rubi' || b.tipo === 'diamante' || b.tipo === 'moneda')) sumar(j, BONUS[b.tipo], ev, quien);
      else if (b.tipo === 'aire') s.aire = Math.min(s.aireMax, s.aire + Math.round(s.aireMax * BONUS.aire));
      else if (b.tipo === 'aireGrande') s.aire = Math.min(s.aireMax, s.aire + Math.round(s.aireMax * 0.6));   // (24-sep, idea 10) la grande: +60 %
      else if (b.tipo === 'vida') { if (sinExtras(j)) { sumar(j, SIN_MORIR_VIDA, ev, quien); ev.push('sinVida'); } else { j.vidas++; ev.push('vida'); } }
      else if (b.tipo === 'reloj') s.congelado = BONUS.reloj;
      else if (b.tipo === 'botas') w.botas = poderDe(j);           // (25-sep, idea 179) poderDe = PODER sin mejoras
      else if (b.tipo === 'paraguas') w.paraguas = poderDe(j);
      else if (b.tipo === 'dobleSalto') w.doble = poderDe(j);
      else if (b.tipo === 'goma') w.goma = poderDe(j);
      else if (b.tipo === 'arena') s.lento = poderDe(j);
      else if (b.tipo === 'globo') w.globo = poderDe(j);
      else if (b.tipo === 'seta') w.grande = 1;
      else if (b.tipo === 'estrella') w.estrella = poderDe(j);
      else if (b.tipo === 'patinete') w.patin = poderDe(j);
      else if (b.tipo === 'iman') s.iman = poderDe(j);
      else if (b.tipo === 'linterna') { s.linterna = true; s.tuvoLinterna = true; s.pila = PILA; }
      else if (b.tipo === 'pila') { s.pila = Math.min(PILA, (s.pila || 0) + PILA / 2); if (s.tuvoLinterna) s.linterna = true; }
      else if (b.tipo === 'imanGigante') s.imanG = poderDe(j);                                                   // (26-sep, 51)
      else if (b.tipo === 'ladrillos') w.ladrillos = Math.min(LADRILLOS_MAX, (w.ladrillos || 0) + LADRILLOS);   // (26-sep, 108)
      else if (b.tipo === 'casco') w.casco = 1;                                                                  // (26-sep, 48)
      else if (b.tipo === 'corazon') {
        j.cogidos[claveBonus(s, b)] = 1;
        j.corazones = (j.corazones || 0) + 1; ev.push('corazon');
        if (j.corazones >= 4) { j.corazones -= 4; if (sinExtras(j)) { sumar(j, SIN_MORIR_VIDA, ev); ev.push('sinVida'); } else { j.vidas++; ev.push('vida', 'corazonCompleto'); } }
      }
    });
    cogeObjetos(j, s, celdas, ev);
    return celdas;
  }
  /* (25-sep, ideas 125, 126, 127, 131 y 41) OBJETOS que se cogen y se llevan: estatuillas y cartas (al álbum de la
     aventura), gafas/reliquia/… (en la mochila: j.av.lleva) y el cronómetro, que empieza la contrarreloj de la sala.
     Sin aventura se apuntan en j.objetos y ya está. */
  function cogeObjetos(j, s, celdas, ev) {
    (s.objetos || []).forEach(function (o) {
      if (o.cogido || !celdas.some(function (c) { return c[0] === o.x && c[1] === o.y; })) return;
      o.cogido = true; s.lleva[o.tipo] = 1;
      ev.push('objeto', 'objeto:' + o.tipo);
      if (o.tipo === 'cronometro') { s.crono = 450; return; }
      var av = j.av;
      if (!av) { j.objetos = j.objetos || {}; j.objetos[o.tipo + (o.id != null ? ':' + o.id : '')] = 1; return; }
      if (o.tipo === 'estatuilla') (av.estatuillas = av.estatuillas || {})[o.id] = 1;
      else if (o.tipo === 'carta') (av.cartas = av.cartas || {})[o.id] = 1;
      else (av.lleva = av.lleva || {})[o.tipo] = 1;
    });
  }
  // (25-sep) lo que ya tienes en la aventura no vuelve a salir (al entrar en una casa o volver a una calle)
  function marcaObjetos(j) {
    var av = j.av, s = j.s; if (!av || !s || !s.objetos) return;
    s.objetos.forEach(function (o) {
      if ((o.tipo === 'estatuilla' && av.estatuillas && av.estatuillas[o.id]) || (o.tipo === 'carta' && av.cartas && av.cartas[o.id]) ||
        (o.tipo !== 'estatuilla' && o.tipo !== 'carta' && o.tipo !== 'cronometro' && av.lleva && av.lleva[o.tipo])) o.cogido = true;
    });
  }
  // (26-sep) los PREMIOS de las CALLES (monedas, gemas, piedras, vidas y corazones) no vuelven a salir: antes, al volver a entrar
  // en la calle salían otra vez y se podían sacar sin fin yendo y viniendo. Van en j.av.premios['calle:x,y'] (se guardan con la
  // partida); los corazones, además, en j.cogidos, como en las casas
  function marcaPremios(j) {
    var av = j.av, s = j.s; if (!av || !s || !s.calle) return;
    s.bonus.forEach(function (b) { var k = claveBonus(s, b); if (!b.extra && ((av.premios && av.premios[k]) || (b.tipo === 'corazon' && j.cogidos && j.cogidos[k]))) b.cogido = true; });
  }
  /* (25-sep, ideas 115-131 y 23) TRUCOS: el disparador de secreto genérico. Al dispararse (una vez por sala), «truco» y
     «secreto», cuenta como secreto encontrado y hace lo suyo: abre/crea (como una palanca), monedas o un premio.
     En una CALLE se apunta en j.av.trucos['<idCalle>:<i>'] y se vuelve a aplicar al entrar (sin volver a dar premios). */
  function efectoCeldas(s, p) {                     // lo que hace una palanca de «abre» o «crea» (y los trucos igual)
    p.guardado = p.celdas.map(function (c) { return s.mapa[c[1]][c[0]]; });
    p.celdas.forEach(function (c) { s.mapa[c[1]][c[0]] = p.hace === 'crea' ? (p.pone || 'F') : ' '; });
  }
  function aplicaTrucoSala(j, s, i, ev, callado) {
    var t = s.trucos && s.trucos[i]; if (!t || t.hecho) return ev;
    t.hecho = true; s.secretosVistos++; s.secretoVisto = true;
    if (!callado) ev.push('truco', 'secreto');
    if (t.hace === 'abre' || t.hace === 'crea') efectoCeldas(s, t);
    else if (!callado && t.hace === 'monedas') t.celdas.forEach(function (c) { s.bonus.push({ x: c[0], y: c[1], tipo: 'moneda', cogido: false, alFinal: false, extra: true, truco: true }); });
    else if (!callado && t.hace === 'premio' && t.premio) s.bonus.push({ x: t.premio[0], y: t.premio[1], tipo: t.premio[2], cogido: false, alFinal: false, extra: true, truco: true });
    if (s.calle && j.av) { j.av.trucos = j.av.trucos || {}; j.av.trucos[s.def.id + ':' + i] = 1; }
    return ev;
  }
  // La pantalla lo llama cuando aciertas el acertijo de la Esfinge (devuelve los sucesos, para pasarlos por suceso())
  function aplicaTruco(j, i) { var ev = []; aplicaTrucoSala(j, j.s, i, ev); if (j.s && j.s.esfinge === i) j.s.esfinge = -1; return ev; }
  // (25-sep) al volver a una calle, lo que ya hiciste en ella sigue hecho (la puerta de la planta 13, el muro abierto…)
  function reaplicaTrucos(j) {
    var s = j.s, av = j.av; if (!av || !av.trucos || !s || !s.calle) return;
    s.trucos.forEach(function (t, i) { if (av.trucos[s.def.id + ':' + i]) aplicaTrucoSala(j, s, i, [], true); });
  }
  function hayTecla(inp) { return !!(inp && (inp.izq || inp.der || inp.saltar)); }
  function trucos(j, s, w, inp, celdas, ev) {
    if (hayTecla(inp)) s.tocado = true;
    if (!s.trucos || !s.trucos.length) return;
    var aterriza = ev.indexOf('aterriza') >= 0, deCabeza = !(w.y & 7) ? w.y >> 3 : -1;
    s.trucos.forEach(function (t, i) {
      if (t.hecho) return;
      var enCol = w.x === t.x || w.x + 1 === t.x;
      var toca = celdas.some(function (c) { return c[0] === t.x && c[1] === t.y; });
      var entra = toca && !t.dentro; t.dentro = toca;
      var dispara = false;
      if (t.tipo === 'cuadro') {             // (115) de pie, quieto delante del cuadro 45 pasos (3 s)
        if (w.aire === 0 && !hayTecla(inp) && enCol && (deCabeza === t.y || deCabeza === t.y - 1)) t.cuenta++; else t.cuenta = 0;
        dispara = t.cuenta >= 45;
      } else if (t.tipo === 'baldosa') {     // (117) aterrizar n veces con los pies sobre la baldosa
        if (aterriza && w.aire === 0 && !(w.y & 7) && (w.y >> 3) + 2 === t.y && enCol) t.cuenta++;
        dispara = t.cuenta >= t.n;
      } else if (t.tipo === 'paciente') {    // (122) 30 s sin tocar NINGUNA tecla desde que empieza la sala
        dispara = !s.tocado && s.t >= 450;
        if (dispara) ev.push('miau');
      } else if (t.tipo === 'alReves') {     // (121) las llaves, justo al revés de como están en la lista
        if (s.quedan === 0 && ev.indexOf('abierta') >= 0) {
          // el orden de la lista es el del plano (por filas, de izquierda a derecha); en la casa ESPEJO, el de la original
          var lista = s.llaves.map(function (k, q) { return q; });
          if (s.def.espejo) lista.sort(function (a, b) { var ka = s.llaves[a], kb = s.llaves[b]; return ka.y - kb.y || kb.x - ka.x || a - b; });
          var n = lista.length;
          dispara = n > 1 && s.orden.length === n && s.orden.every(function (k, q) { return k === lista[n - 1 - q]; });
        }
      } else if (t.tipo === 'golpes') {      // (130) n cabezazos desde abajo (como la palanca de golpe)
        var tc = tocaPalanca({ golpe: true, x: t.x, y: t.y }, celdas);
        if (tc && !t.golpeDentro) t.cuenta++;
        t.golpeDentro = tc;
        dispara = t.cuenta >= t.n;
      } else if (t.tipo === 'objeto') {      // (131) tocar la casilla llevando el objeto
        dispara = toca && !!(s.lleva[t.obj] || (j.av && j.av.lleva && j.av.lleva[t.obj]));
      } else if (t.tipo === 'esfinge') {     // (23) la pantalla pregunta; si aciertas, M.aplicaTruco(j, i)
        if (entra) { s.esfinge = i; ev.push('esfinge'); }
      }
      if (dispara) aplicaTrucoSala(j, s, i, ev);
    });
  }
  // Un paso de juego. Devuelve los sucesos: salto, llave, palanca, cae, vida, muerte, salida…
  // inp2: los mandos del jugador 2 (solo con 2 jugadores)
  function paso(j, inp, inp2) {
    var s = j.s, w = j.w, ev = [];
    if ((w.muerto && !j.dos) || j.salida) return ev;
    s.t++;
    if (j.peques) j.inmortal = true;                       // (25-sep, idea 182) modo peques: no se muere nunca
    // (25-sep) + ruido (el perro guardián: aterrizaste o ibas el doble de rápido) y pie (la fila del suelo que pisas, o -1)
    s.objetivo = { x: w.x * 8 + w.f * 2, y: w.y, dir: w.dir, salta: w.aire === 1, ruido: !!w.ruido, pie: w.aire === 0 && !(w.y & 7) ? (w.y >> 3) + 2 : -1 };
    pasoEnemigos(s);
    s.enemigos.forEach(function (e) { if (e.aviso) { ev.push(e.aviso); e.aviso = null; } });
    pasoProyectiles(j, s, ev);                               // (26-sep, 108) los ladrillos que has lanzado
    if (s.baile && s.baile.length && s.baile.some(function (z) { return faseRitmo(z, s.t) === 0; })) ev.push('compas');   // (26-sep, 15)
    if (w.botas > 0) w.botas--;
    if (w.paraguas > 0) w.paraguas--;
    if (w.patin > 0) w.patin--;
    if (w.doble > 0) w.doble--;
    // (26-sep, P4 · DOBLE SALTO COMO HABILIDAD) con las Botas del Doble Salto, o en una casa o calle marcada, siempre puesto
    if (dobleSiempre(j)) { if (!(w.doble > 1)) w.doble = 2; if (j.w2 && !(j.w2.doble > 1)) j.w2.doble = 2; }
    if (w.goma > 0) w.goma--;
    if (w.globo > 0) w.globo--;
    if (w.estrella > 0) w.estrella--;
    if (w.inv > 0) w.inv--;
    if (s.iman > 0) s.iman--;
    if (s.imanG > 0) s.imanG--;                              // (26-sep, 51) el imán gigante
    if (w.respiro > 0) w.respiro--;                          // (26-sep, 12) el respiro de la burbuja
    if (w.lianaSuelta > 0) w.lianaSuelta--;                  // (26-sep, 29) recién soltado de una liana
    if (s.bocaT > 0 && --s.bocaT === 0 && s.bocaAbajo) { s.bocaAbajo = false; s.palancas.forEach(function (p) { if (p.hace === 'bocaAbajo') p.movida = false; }); ev.push('bocaArriba'); }   // (26-sep, 60) vuelve sola (y su palanca, también: arreglo)
    hundidos(j, s, w);
    if (s.linterna && s.pila > 0 && s.oscuro && !s.luz) { s.pila--; if (s.pila === 0) { s.linterna = false; ev.push('pilaFin'); } }
    // (25-sep, 2b) el modo moderno va en el agente (pasoAgente no ve la partida) · en una casa ya vendida a la que vuelves
    // con las BOTAS DE MUELLE, saltas alto todo el rato
    w.moderno = !!j.moderno; if (j.w2) j.w2.moderno = !!j.moderno;
    if (j.revisita) w.botas = Math.max(w.botas || 0, 2);
    if (j.dos && s.monedasT > 0 && --s.monedasT === 0) finMonedas(s, ev);   // (26-sep, arreglo) con 2 jugadores también se acaba
    if (j.dos) return pasoDos(j, inp, inp2 || {}, ev);
    s.noche = !!j.noche || nocheVuelta(j.av); if (j.av) s.av = j.av;   // (27-sep, P5) + la noche de la vuelta ·            // (25-sep) para las puertas de noche y las que tienen condición
    // (26-sep, PLAN-TUNELES.md) TÚNEL SECRETO: de pie ENCIMA de un bloque de las `bajadas` de la calle y ABAJO (pulsación
    // nueva) → 'bajada' (la pantalla hace la animación y llama a M.entrarBajada) o, si ya está vaciado, 'bajadaUsada'
    var abajoPrev = w.abajoAntes; w.abajoAntes = !!(inp && inp.abajo);
    if (inp && inp.abajo && !abajoPrev && j.av && s.calle) {
      var ib = bajadaBajo(s, w);
      if (ib >= 0) { if (bajadaAbierta(j, s, ib)) { w.bajada = ib; ev.push('bajada'); } else { var bq = s.def.bajadas[ib]; if (bq && !bq.casa && bq.calle && calle(bq.calle)) { w.atajoCerrado = bq.calle; ev.push('atajoCerrado'); } else ev.push('bajadaUsada'); } return ev; }   // (26-sep, P4) atajo cerrado
    }
    // (26-sep, idea 108) ABAJO (pulsación nueva) con ladrillos en la mano: lanzas uno (colgado de una liana, ABAJO resbala)
    if (inp && inp.abajo && !abajoPrev && w.ladrillos > 0 && w.liana == null) lanza(j, s, w, ev);
    var ax0 = w.x * 8 + w.f * 2, ay0 = w.y, n0 = ev.length;
    // (26-sep, idea 29) colgado de una LIANA, la liana te lleva; si no, lo de siempre y, en el aire, ¿te agarras a una?
    if (w.liana != null) pasoLiana(s, w, inp || {}, ev); else { pasoAgente(s, w, inp, ev); agarraLiana(s, w, ev); }
    dingAscensor(s, w, ev);                                  // (26-sep, idea 39) el ascensor se para contigo: «¡ding!»
    w.ruido = ev.indexOf('aterriza', n0) >= 0 || Math.abs(w.x * 8 + w.f * 2 - ax0) >= 4;
    // (26-sep, arreglo A1) al ENTRAR por una puerta (casa, otra calle, tubería, atajo o la tienda) no se muere en ese mismo
    // paso: antes, pulsar justo cuando bajaba la prensa o pasaba el pato por la puerta te mataba al entrar
    var entra = ['puerta', 'puertaCalle', 'atajo', 'tuberia', 'tienda'].some(function (k) { return ev.indexOf(k, n0) >= 0; });
    if (entra && w.muerto) { w.muerto = false; for (var ie = ev.length - 1; ie >= n0; ie--) if (ev[ie] === 'muerte') ev.splice(ie, 1); }
    if (w.muerto && j.inmortal) revive(j, s, w, ev);      // modo truco: inmortal
    if (w.muerto) return ev;
    if (w.borde) { var lado = w.borde; w.borde = null; cambiaPantalla(j, lado); ev.push('pantalla'); return ev; }
    // (25-sep, ideas 129 y 133) puerta que lleva a otra calle: apareces en la puerta de allí que vuelve aquí (o en su salida)
    // (25-sep, 2b) + la TUBERÍA DE ATAJO entre mundos (una tubería de la calle con `atajo`): se apunta en j.av.atajos
    if (w.puertaCalle) {
      var idc = w.puertaCalle, de = w.atajo; w.puertaCalle = null; w.atajo = null;
      if (j.av && irCalle(j, idc)) { if (de) { (j.av.atajos = j.av.atajos || {})[de + '>' + idc] = 1; ev.push('atajoUsado'); } ev.push('pantalla'); }
      return ev;
    }
    if (entra) { if (hayTecla(inp)) s.tocado = true; return ev; }   // (26-sep, A1) entrando: ni bichos ni jefe en este paso
    if (w.cabeza != null) { rompeMuros(j, s, w, w.cabeza, ev); w.cabeza = null; }
    var celdas = recoge(j, s, w, 1, ev);
    pendientesPaso(j, s, w, celdas, ev);                     // (26-sep) burbujas, perro del cliente, notario y bandera de la puerta
    trucos(j, s, w, inp, celdas, ev);
    secretosDePaso(j, s, w, celdas, ev);
    if (j.feliz > 0) j.feliz--;
    if (s.monedasT > 0 && --s.monedasT === 0) finMonedas(s, ev);   // (25-sep, 2b) se acaba el interruptor de monedas
    miraCheckpoint(j, ev);
    if (s.tesoro && s.bonus.every(function (b) { return b.cogido; })) { j.salida = true; ev.push('salida'); return ev; }
    palancas(j, s, celdas, ev, 'dentro');
    miraOkupas(s, celdas, ev);                               // (25-sep, 145) cabezazo al techo del okupa
    // (25-sep, 138-144) el JEFE: pisar su blanco le quita una vida; tocar lo que mata, como un bicho
    if (s.jefe && choqueJefe(j, s, w, ev, w.y > ay0)) {
      if (w.grande) { w.grande = 0; w.inv = 45; ev.push('encoge'); }
      else { w.muerto = 'jefe'; ev.push('muerte'); if (j.inmortal) revive(j, s, w, ev); else return ev; }
    }
    // (el dueño solo existe con la linterna encendida)
    var toca = s.enemigos.filter(function (e) { return !e.fuera && (e.tipo !== 'c' || e.activo) && (e.tipo !== 'dueno' || s.linterna) && choca(w, e); });
    if (toca.length) {
      var cae = cayendo(s, w) && !(w.y < ay0);                 // (26-sep, M2) subiendo (con el globo, el vapor…) no se pisa
      toca.forEach(function (e) {
        var pe = posEnemigo(e);
        if (e.tipo === 'generoso') { golpeGeneroso(j, s, w, e, ev, cae, w.y < ay0); return; }                  // (26-sep, túneles) no mata: da premios
        if (w.estrella > 0 && mata(e)) { e.fuera = true; sumar(j, 300, ev); ev.push('estrellaGolpe'); sueltaLoSuyo(j, s, e, ev); }   // (idea 105) estrella: los tumbas · (26-sep, B3) y sueltan lo suyo
        // (idea 101) pisarlos desde arriba · (25-sep, idea 2b) con COMBO si encadenas sin tocar el suelo
        // (25-sep, arreglo) se mide desde lo más alto de su DIBUJO: antes, desde el borde de arriba del cuadro, y a los
        // bichos bajitos (rata, cangrejo, gato: 8-10 px de aire encima) no se les podía pisar nunca
        else if (pisable(e) && cae && w.y + 16 <= pe.y + mascara(e.spr, e.fr).arriba + 8) pisaBicho(j, s, w, e, ev);
      });
      // (25-sep, 145-152) los que no matan hacen lo suyo al tocarlos (empujar, robar, contar su historia)
      toca.forEach(function (e) { if (!e.fuera && !mata(e)) tocaInofensivo(j, s, w, e, ev); });
      toca = toca.filter(function (e) { return !e.fuera && mata(e); });
      // (26-sep, idea 48) con CASCO, lo que te cae encima (bichos que caen) da en el casco una vez y no mata
      if (toca.length && w.casco > 0 && !(w.inv > 0) && toca.every(function (e) { return e.tipo === 'f'; })) { w.casco = 0; w.inv = 30; ev.push('cascoGolpe'); toca = []; }
      if (toca.length && w.inv > 0) toca = [];
      if (toca.length && w.grande) { w.grande = 0; w.inv = 45; ev.push('encoge'); toca = []; }                // (idea 100) seta: aguantas un golpe
    }
    if (toca.length) {
      w.muerto = 'enemigo'; ev.push('muerte');
      if (j.inmortal) revive(j, s, w, ev); else return ev;
    }
    if (w.aire === 0) w.combo = 0;                           // (25-sep) el combo se acaba al tocar el suelo
    if (s.puerta && s.quedan === 0 && jefeFuera(s) && w.x === s.puerta.x && (w.y >> 3) === s.puerta.y && w.aire === 0) return saleCasa(j, s, ev);
    // (25-sep, 2b) SALIDA SECRETA: una segunda puerta escondida (s.salidaSec, 2×2 como la P). Se descubre al pasar por ella
    // ('salidaVista') y, con la puerta ya abierta (todas las llaves y el jefe vencido), se sale por ella: la casa se vende
    // igual, con 2.000 de premio, y en la aventura apareces en OTRA calle (la de `calle`). Nada obligatorio pasa por aquí.
    var ss = s.salidaSec;
    if (ss && !s.tesoro) {
      if (!s.salidaVista && celdas.some(function (c) { return c[0] >= ss.x && c[0] <= ss.x + 1 && c[1] >= ss.y && c[1] <= ss.y + 1; })) { s.salidaVista = true; ev.push('salidaVista'); }
      if (puertaAbierta(s) && w.x === ss.x && (w.y >> 3) === ss.y && w.aire === 0) {
        j.salidaSec = { calle: ss.calle || '', px: ss.px, py: ss.py, casa: s.def.id.replace(/-espejo$/, '') };
        if (!j.revisita) sumar(j, SALIDA_SECRETA, ev);
        ev.push('salidaSecreta');
        return saleCasa(j, s, ev);
      }
    }
    if (s.calle) { s.aire = s.aireMax; return ev; }          // en la calle se respira: no se gasta aire
    s.aire--;
    // rayo de luz (pantallas retro): dentro, el aire se va mucho más deprisa
    if (s.haz.length && celdas.some(function (c) { return s.haz.some(function (h) { return c[0] >= h[0] && c[0] <= h[2] && c[1] >= h[1] && c[1] <= h[3]; }); })) {
      s.aire -= 3; ev.push('quema');
    }
    if (j.aireInf) s.aire = s.aireMax;                           // modo truco: aire infinito
    if (s.aire <= 0) {
      s.aire = 0;
      if (s.tesoro) { j.salida = true; ev.push('salida'); }      // en el tesoro, el tiempo se acaba y ya está
      else { w.muerto = 'aire'; ev.push('muerte'); if (j.inmortal) revive(j, s, w, ev); }
    }
    return ev;
  }
  // Al salir por la puerta (o por la salida secreta): la propina del cliente (idea 9), la racha del modo fuego, el cofre del
  // ahorrador (idea 120) y «salida». (25-sep, 2b) En una casa ya vendida a la que vuelves con las botas de muelle no hay
  // propina ni racha ni cofre: solo se sale.
  var SALIDA_SECRETA = 2000;
  function saleCasa(j, s, ev) {
    j.salida = true;
    // el cliente te espera en la puerta: propina según el aire que te sobra (idea 9)
    if (!s.tesoro && !j.revisita) { j.propina = Math.round(PROPINA * s.aire / s.aireMax * (1 + MEJORA.propina * nivelMejora(j, 'propina'))); sumar(j, j.propina, ev); ev.push('propina'); casaSinMorir(j, ev); }
    // (26-sep, idea 49) sales con el perro del cliente: +1.000
    if (s.perroC && s.perroC.sigue && !s.tesoro && !j.revisita) { sumar(j, PERRO_PUNTOS, ev); ev.push('perroEntregado'); }
    // (25-sep, idea 120) la casa tenía monedas y no has cogido NINGUNA: la pantalla da el cofre
    var mon = propios(s).filter(function (b) { return b.tipo === 'moneda'; });
    if (!s.tesoro && !j.revisita && mon.length && !mon.some(function (b) { return b.cogido; })) ev.push('sinMonedas');
    if (j.revisita) ev.push('revisitaFin');
    ev.push('salida'); return ev;
  }
  /* (25-sep, 2b) INTERRUPTOR DE LADRILLOS Y MONEDAS (palanca `hace: 'monedas'`, `dura` pasos; 150 = 10 s): los ladrillos $
     pasan a ser monedas (extra: no cuentan para las estrellas) y las monedas que no has cogido, ladrillos (se pisan: sirven
     de escalón). Al acabarse, las monedas que quedan vuelven a ser ladrillos (las cogidas, no) y los ladrillos, monedas. */
  var MONEDAS_T = 150;
  function interruptorMonedas(s, p, ev) {
    var y, x;
    s.bonus.forEach(function (b) {
      if (b.tipo !== 'moneda' || b.cogido || b.comida || b.deLadrillo || b.ladrillo || !s.mapa[b.y] || s.mapa[b.y][b.x] !== ' ') return;
      b.ladrillo = true; s.mapa[b.y][b.x] = '$';
    });
    for (y = 0; y < s.mapa.length; y++) for (x = 0; x < s.mapa[y].length; x++) {
      if (s.mapa[y][x] !== '$' || s.bonus.some(function (b) { return b.ladrillo && b.x === x && b.y === y; })) continue;
      s.mapa[y][x] = ' '; s.bonus.push({ x: x, y: y, tipo: 'moneda', cogido: false, alFinal: false, extra: true, deLadrillo: true });
    }
    s.monedasT = p.dura || MONEDAS_T; ev.push('monedasOn');
  }
  function finMonedas(s, ev) {
    s.bonus = s.bonus.filter(function (b) {
      if (b.ladrillo) { b.ladrillo = false; if (s.mapa[b.y][b.x] === '$') s.mapa[b.y][b.x] = ' '; return true; }
      if (b.deLadrillo && !b.cogido) { s.mapa[b.y][b.x] = '$'; return false; }
      return true;
    });
    s.monedasT = 0; ev.push('monedasOff');
  }
  // Modo truco «inmortal»: en vez de morir, sigues (y si te has salido del mapa, vuelves a la entrada)
  function revive(j, s, w, ev) {
    w.muerto = false;
    for (var i = ev.length - 1; i >= 0; i--) if (ev[i] === 'muerte') ev.splice(i, 1);
    if (w.y >= (s.alto || ALTO) * 8 - 8 || w.y < 0) {
      var a = nuevoAgente(s.def);
      w.x = a.x; w.y = a.y; w.f = 0; w.dir = a.dir;
    }
    w.aire = 0; w.plat = -1;
    if (s.aire <= 0) s.aire = Math.max(s.aire, Math.round(s.aireMax * 0.25));
    if (j.peques) w.inv = Math.max(w.inv || 0, PEQUES_INV);  // (25-sep, idea 182) y un ratito sin que los bichos te toquen
    ev.push('salvado');
  }
  // (25-sep, idea 25) MURO QUE SE ROMPE (U): cabezazo desde abajo. Grande (seta), al primero; si no, al tercero.
  // s.grietas['x,y'] = golpes que lleva (la pantalla la pinta agrietada) · s.rotos['x,y'] = 1 cuando se rompe
  function rompeMuros(j, s, w, fila, ev) {
    [w.x, w.x + 1].forEach(function (x) {
      if (!s.mapa[fila] || s.mapa[fila][x] !== 'U') return;
      var k = x + ',' + fila;
      s.grietas[k] = (s.grietas[k] || 0) + 1;
      if (w.grande || s.grietas[k] >= 3) { s.mapa[fila][x] = ' '; s.rotos[k] = 1; delete s.grietas[k]; ev.push('rompe'); }
      else ev.push('grieta');
    });
  }
  function enCelda(celdas, x, y) { return celdas.some(function (c) { return c[0] === x && c[1] === y; }); }
  // Lo que se mira en cada paso: contrarreloj (41), pasadizos (26) y zonas de la estrella fugaz (132)
  function secretosDePaso(j, s, w, celdas, ev) {
    if (s.crono > 0) {
      if (s.meta && enCelda(celdas, s.meta.x, s.meta.y)) { s.crono = 0; s.meta = null; sumar(j, 5000, ev); ev.push('contrarrelojGana'); }
      else if (--s.crono === 0) { s.meta = null; ev.push('contrarrelojPierde'); }
    }
    // pasadizo: pisar su casilla (estar en ella o de pie encima) → w.pasadizo = casa; la pantalla llama a M.entrarPasadizo
    var pie = w.aire === 0 && !(w.y & 7) ? (w.y >> 3) + 2 : -9;
    (s.pasadizos || []).forEach(function (p) {
      var toca = enCelda(celdas, p.x, p.y) || (pie === p.y && (w.x === p.x || w.x + 1 === p.x));
      if (toca && !p.dentro) { w.pasadizo = p.casa; ev.push('pasadizo'); }
      p.dentro = toca;
    });
    // zona de la estrella fugaz: al entrar en el rectángulo, a esa casa (como una puerta: w.puertaCasa y «puerta»)
    (s.zonas || []).forEach(function (z) {
      var dentro = !!zonaDe([[z.x0, z.y0, z.x1, z.y1]], w);
      if (dentro && !z.dentro) { w.puertaCasa = z.casa; w.puertaDef = null; ev.push('zonaSecreta', 'puerta'); }
      z.dentro = dentro;
    });
  }
  // (25-sep, ideas 129 y 133) a otra calle por una puerta: apareces delante de la puerta de allí que vuelve a esta calle
  function irCalle(j, id) {
    var de = j.s && j.s.def && j.s.def.id, d = calle(id); if (!d) return false;
    // (25-sep, 2b) la vuelta puede ser también una tubería de atajo que lleva a la calle de la que vienes
    var vuelta = null; (d.puertas || []).concat(d.tuberias || []).forEach(function (p) { if ((p.calle === de || p.atajo === de) && !vuelta) vuelta = p; });
    if (!ponCalle(j, id, vuelta ? vuelta.x : null, vuelta ? vuelta.y * 8 : null)) return false;
    j.w.enPuerta = true; protege(j);                  // (26-sep, A1)
    return true;
  }
  /* ══ (26-sep, PLAN-TUNELES.md) LOS TÚNELES SECRETOS (Alejandro: «que en estos muros, si das para ABAJO, entres en un túnel»;
     como las tuberías de los juegos de fontaneros, solo la idea). En una CALLE:
       bajadas: [{ x, y, casa: 'superbonus-N', pista }]   o   [{ x, y, calle: 'id', atajo: true, pista }]
     (x, y) = el BLOQUE sólido que se pisa; `pista` ('grieta', 'brillo' o 'moneda') solo la usa la pantalla para dibujar.
     De pie ENCIMA (una de las dos casillas de los pies) y ABAJO (inp.abajo, pulsación nueva) → 'bajada' y w.bajada = su
     número ('bajadaUsada' si es una súper bonus ya vaciada o que no está en el juego). La pantalla anima el túnel y llama a
     M.entrarBajada(j), que devuelve los sucesos:
     · súper bonus (`casa`, con `superbonus: true`): 'tunelZona'; entras en ella y j.av.volver = ENCIMA del mismo bloque (al
       acabarla, o si te pillan, vuelves ahí). NO se vende (vendeCasa). Se cobra UNA vez: j.av.bajadas['<calle>:<i>'] = 1.
     · atajo (`calle` + `atajo`): 'tunelAtajo' y 'pantalla': a esa calle, ENCIMA de su bajada de vuelta (la que lleva aquí)
       o, si no tiene, en su @. Vale siempre; se apunta en j.av.atajos['de>a'] (el tablero del mundo lo pinta).
     Nada obligatorio pasa por aquí (el robot no pulsa ABAJO). ══ */
  function bajadaBajo(s, w) {
    var l = s && s.calle && s.def.bajadas; if (!l || !l.length || w.aire !== 0 || (w.y & 7)) return -1;
    var r = (w.y >> 3) + 2;
    for (var i = 0; i < l.length; i++) if (l[i].y === r && (w.x === l[i].x || w.x + 1 === l[i].x) && PISABLE[celda(s, l[i].x, r)]) return i;
    return -1;
  }
  function claveBajada(s, i) { return s.def.id + ':' + i; }
  function bajadaAbierta(j, s, i) {
    var b = s && s.def.bajadas && s.def.bajadas[i]; if (!b || !j || !j.av) return false;
    if (b.casa) return !!casaPorId(b.casa) && !(j.av.bajadas && j.av.bajadas[claveBajada(s, i)]);
    return !!(b.calle && calle(b.calle)) && atajoAbierto(j.av, s.def.id, b.calle);   // (26-sep, P4) con las dos calles pisadas
  }
  // dónde se aparece al llegar por un túnel a otra calle: de pie encima de su bajada de vuelta (si cabe el agente) o, si no, null (@)
  function llegadaTunel(d, de) {
    var b = null; (d.bajadas || []).forEach(function (q) { if (!b && q.calle === de) b = q; });
    if (!b) return null;
    var s = nuevaSala(d), y = b.y - 2, W = d.ancho || ANCHO;
    var cabe = function (x) { return x >= 0 && x + 1 < W && [x, x + 1].every(function (c) { return !MURO[celda(s, c, y)] && !MURO[celda(s, c, y + 1)]; }); };
    var x = cabe(b.x) ? b.x : cabe(b.x - 1) ? b.x - 1 : null;
    return x == null ? null : { x: x, y: y * 8 };
  }
  function entrarBajada(j) {
    var s = j.s, w = j.w, i = w ? w.bajada : null, ev = [];
    if (w) w.bajada = null;
    if (i == null || !s || !s.calle || !j.av || !bajadaAbierta(j, s, i)) return ev;
    var b = s.def.bajadas[i];
    if (b.casa) {
      var c = casaPorId(b.casa);
      (j.av.bajadas = j.av.bajadas || {})[claveBajada(s, i)] = 1;
      j.av.volver = { pantalla: j.av.pantalla, x: w.x, y: w.y, dir: w.dir, casa: b.casa, bajada: claveBajada(s, i) };
      cambiaPack(c.pack); j.check = null; j.revisita = false;
      empezarSala(j, c.n); j.enCasa = b.casa;
      ev.push('tunelZona');
      return ev;
    }
    var de = s.def.id, q = llegadaTunel(calle(b.calle), de);
    ponCalle(j, b.calle, q ? q.x : null, q ? q.y : null);
    j.w.enPuerta = true; j.w.abajoAntes = true; protege(j);
    (j.av.atajos = j.av.atajos || {})[de + '>' + b.calle] = 1;
    ev.push('tunelAtajo', 'pantalla');
    return ev;
  }
  // (25-sep, idea 26) PASADIZO entre casas: te mete en la otra casa sin cambiar a qué puerta de la calle vuelves; al acabarla,
  // la vendida es ESA. Fuera de la aventura, te lleva a esa casa como práctica.
  function entrarPasadizo(j, id) {
    var c = casaPorId(id); if (!c) return false;
    if (j.av && j.av.vendidas[id]) return false;
    cambiaPack(c.pack);
    j.revisita = false; j.check = null;               // (25-sep, 2b) la casa del pasadizo no está vendida: visita de verdad
    empezarSala(j, c.n);
    if (j.av) j.enCasa = id;
    return true;
  }
  // 2 jugadores: cada uno con sus mandos; si te pillan, vuelves a la salida al rato (no hay vidas). Entrar el primero
  // por la puerta da 500; cuando se acaba el aire o alguien entra, gana quien tenga más llaves.
  function pasoDos(j, inp, inp2, ev) {
    var s = j.s;
    [[j.w, inp, 1], [j.w2, inp2, 2]].forEach(function (q) {
      var w = q[0], n = q[2];
      if (j.salida) return;
      if (w.espera > 0) { if (--w.espera === 0) { var o = nuevoAgente(s.def); if (n === 2) o.x = Math.min(s.ancho - 3, o.x + 2); for (var k in o) w[k] = o[k]; } return; }
      var e0 = [];
      pasoAgente(s, w, q[1], e0);
      e0.forEach(function (e) { ev.push(e === 'muerte' ? 'choque' + n : e); });
      if (w.muerto) { w.espera = 30; return; }
      var celdas = recoge(j, s, w, n, ev);
      palancas(j, s, celdas, ev, 'dentro' + n);
      if (s.enemigos.some(function (e) { return !e.fuera && (e.tipo !== 'c' || e.activo) && mata(e) && choca(w, e); })) { w.muerto = 'enemigo'; w.espera = 30; ev.push('choque' + n); return; }
      if (s.puerta && s.quedan === 0 && jefeFuera(s) && w.x === s.puerta.x && (w.y >> 3) === s.puerta.y && w.aire === 0) {
        sumar(j, 500, ev, n); j.salida = true; j.primero = n;
      }
    });
    if (!j.salida) { s.aire--; if (s.aire <= 0) { s.aire = 0; j.salida = true; j.primero = 0; } }
    if (j.salida) { j.gana = j.llaves1 > j.llaves2 ? 1 : j.llaves2 > j.llaves1 ? 2 : (j.primero || 0); ev.push('salida'); }
    return ev;
  }
  // Palancas: se accionan al ENTRAR en su casilla. La de «abre» es de una vez. La de «cae» (22-sep, Alejandro) es un
  // interruptor: la 1.ª vez quita el suelo y tira al gigante; la siguiente vuelve a poner el suelo para poder pasar.
  /* ¿El agente toca la palanca? La normal, al pasar por su casilla. La de GOLPE (golpe:true, 24-sep) es un bloque que
     se acciona dándole con la CABEZA desde abajo: cuenta cuando la fila de arriba del agente es la de justo debajo
     del bloque (ponlo a 3 filas o más del suelo, para que haga falta saltar). */
  function tocaPalanca(p, celdas) {
    if (!p.golpe) return celdas.some(function (c) { return c[0] === p.x && c[1] === p.y; });
    var arriba = Math.min.apply(null, celdas.map(function (c) { return c[1]; }));
    return arriba === p.y + 1 && celdas.some(function (c) { return c[0] === p.x && c[1] === arriba; });
  }
  function palancas(j, s, celdas, ev, marcaDentro) {
    s.palancas.forEach(function (p) {
      var toca = tocaPalanca(p, celdas);
      var entra = toca && !p[marcaDentro];
      p[marcaDentro] = toca;
      // (26-sep, ideas 80 y 60) la palanca que CAMBIA la sala (ida y vuelta) y la que pone la casa BOCA ABAJO (también ida y vuelta)
      if (entra && p.hace === 'cambia') { cambiaSala(s, p, celdas, ev); return; }
      if (entra && p.hace === 'bocaAbajo') { s.bocaAbajo = !s.bocaAbajo; s.bocaT = s.bocaAbajo ? (p.dura || 0) : 0; p.movida = s.bocaAbajo; ev.push('palanca', s.bocaAbajo ? 'bocaAbajo' : 'bocaArriba'); return; }
      // (24-sep, Alejandro: «que la palanca que quita un muro sea reversible: si la pisas otra vez, que se ponga») reversible:true
      if (!entra || (p.movida && p.hace !== 'cae' && p.hace !== 'apaga' && !p.reversible)) return;
      // (25-sep, idea 140) palanca que corta una GRÚA del Promotor: le quita una vida (una vez cada una)
      if (p.hace === 'jefe') { if (!p.movida && s.jefe && !s.jefe.vencido) { p.movida = true; ev.push('palanca'); golpeJefe(j, s, { toca: true, id: 'palanca' }, ev); } return; }
      // (25-sep, 2b) el interruptor de ladrillos y monedas: vale otra vez cuando se acaba el anterior
      if (p.hace === 'monedas') { if (!(s.monedasT > 0)) { ev.push('palanca'); interruptorMonedas(s, p, ev); } return; }
      ev.push(p.golpe ? 'golpe' : 'palanca');
      // (25-sep, idea 124) interruptor que APAGA y enciende la luz de una casa con luz: a oscuras se ven las pintadas
      if (p.hace === 'apaga') { s.apagada = !s.apagada; p.movida = s.apagada; ev.push('apaga'); return; }
      if (!p.movida) {
        p.movida = true;
        // 23-sep (Alejandro): interruptor de la luz. En una casa a oscuras, al tocarlo se enciende y ya no se apaga.
        if (p.hace === 'luz') { s.luz = true; ev.push('luz'); return; }
        // 'crea' (bloque que se golpea con la cabeza, como en los juegos de Mario): en vez de quitar, PONE suelo
        efectoCeldas(s, p);
        if (p.hace === 'cae') s.enemigos.forEach(function (e) { if (e.tipo === 'g' && !e.cae) { e.cae = true; sumar(j, 100, ev); ev.push('cae'); } });
      } else {
        p.movida = false;
        p.celdas.forEach(function (c, i) { s.mapa[c[1]][c[0]] = p.guardado[i]; });
        ev.push('suelo');
      }
    });
  }
  // Semana del año (para el reto semanal: la misma casa, al revés y a oscuras, toda la semana)
  function retoSemana(fecha) {
    // (25-sep, arreglo) semana ISO: se cuenta desde el JUEVES de esa semana, así la semana de fin de año (lunes 28-dic a
    // domingo 3-ene) es una sola y no cambia de casas el día 1 (en 2026 los números salen iguales que antes)
    var d = new Date(fecha + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 3 - (d.getUTCDay() + 6) % 7);
    var ini = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)), sem = 1 + Math.floor((d - ini) / 604800000);
    return { semana: d.getUTCFullYear() + '-' + sem, casa: (sem * 7 + 3) % SALAS.length };
  }
  /* ── (25-sep) MODOS Y ENGANCHE (PLAN-TANDA-JEFES.md, sección 2: ideas 166, 167, 168, 177, 178, 179 y 182) ───────────
     Todo va con banderas en `j` que SOLO pone la pantalla (o `nuevaPartida(n, opc)`): sin ellas el juego es el de siempre,
     y el robot no las usa nunca. Nada de esto hace falta para acabar ninguna casa. */
  function semilla(txt) {                                  // un número «al azar» pero fijo para cada texto (fecha, semana)
    var h = 7; String(txt).split('').forEach(function (c) { h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0; });
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0; h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
    return (h ^ (h >>> 16)) >>> 0;
  }
  // (166) CONTRARRELOJ DE LA SEMANA: 3 casas fijas toda la semana (las mismas en todos los aparatos), seguidas y contra
  // el reloj. El récord es propio (se guarda en el aparato); el ranking mundial, cuando el juego esté publicado.
  function cronoSemana(fecha) {
    var r = retoSemana(fecha), N = SALAS.length, h = semilla('crono|' + r.semana), l = [], quiere = Math.min(3, N);
    for (var i = 0; i < 64 && l.length < quiere; i++) { var c = (h >>> 5) % N; if (l.indexOf(c) < 0) l.push(c); h = (Math.imul(h, 1103515245) + 12345) >>> 0; }
    for (var k = 0; l.length < quiere; k++) if (l.indexOf(k) < 0) l.push(k);
    return { semana: r.semana, casas: l };
  }
  // (167) DESAFÍO DEL DÍA: una regla rara, la misma para todos ese día, en una casa (otra que la «casa del día»)
  var DESAFIOS = ['espejo', 'apagon', 'prisa', 'xxl', 'iman', 'muelle', 'rebajas', 'unIntento'];
  function desafioDia(fecha) {
    var h = semilla('desafio|' + fecha), N = SALAS.length, casa = (h >>> 8) % N;
    if (N > 1 && casa === casaDelDia(fecha)) casa = (casa + 1) % N;
    return { fecha: String(fecha), regla: DESAFIOS[h % DESAFIOS.length], casa: casa };
  }
  // (179) MEJORAS PARA SIEMPRE (la pantalla las compra con la «hucha» de puntos): nivel de 0 al máximo de cada una
  var MEJORA = { aire: 0.1, propina: 0.2, poder: 0.2 }, MEJORA_MAX = { aire: 3, propina: 3, poder: 3, vida: 1 };
  function nivelMejora(j, k) { var n = j && j.mejoras ? +j.mejoras[k] || 0 : 0; return Math.max(0, Math.min(MEJORA_MAX[k] || 0, n)); }
  function poderDe(j) { return Math.round(PODER * (1 + MEJORA.poder * nivelMejora(j, 'poder'))); }
  // (178) MODO FUEGO: 3 casas seguidas sin morir → las llaves valen el doble hasta que mueras
  var FUEGO = 3, SIN_MORIR_VIDA = 500, PEQUES_INV = 30;
  // (168 «sin morir» y 167 «un solo intento») ninguna vida de más en toda la partida: ni por puntos, ni la vida escondida, ni
  // el 4.º corazón, ni el combo del 8.º bicho, ni las 100 monedas (la pantalla): en su lugar, +SIN_MORIR_VIDA puntos
  function sinExtras(j) { return !!(j && (j.sinMorir || j.desafio === 'unIntento')); }
  function multLlave(j) { return (j.fuego ? 2 : 1) * (j.desafio === 'rebajas' ? 3 : 1); }
  function casaSinMorir(j, ev) {                           // al salir por la puerta de una casa (la sala de bonus no cuenta)
    if (j.dos) return;
    j.rachaCasas = (j.rachaCasas || 0) + 1;
    if (j.rachaCasas > (j.rachaMax || 0)) j.rachaMax = j.rachaCasas;
    if (!j.fuego && j.rachaCasas >= FUEGO) { j.fuego = true; ev.push('fuego'); }
  }
  function rompeRacha(j) { j.rachaCasas = 0; j.fuego = false; }
  // Lo que la partida trae de fuera: opc.desafio (la regla), opc.sinMorir, opc.mejoras ({ aire, propina, poder }), opc.peques
  function opcModos(j, opc) {
    if (opc.desafio && DESAFIOS.indexOf(opc.desafio) >= 0) {
      j.desafio = opc.desafio;
      if (opc.desafio === 'espejo') j.espejo = true;          // el cliente lo quiere todo al revés
      if (opc.desafio === 'prisa') j.turbo = true;            // con prisa: la pantalla va más deprisa y los puntos ×2
      if (opc.desafio === 'unIntento') j.vidas = 0;           // un solo intento
    }
    if (opc.sinMorir) { j.sinMorir = true; j.vidas = 0; }       // (168) UNA vida y ninguna extra
    if (opc.mejoras && typeof opc.mejoras === 'object') j.mejoras = { aire: +opc.mejoras.aire || 0, propina: +opc.mejoras.propina || 0, poder: +opc.mejoras.poder || 0 };
    if (opc.peques) { j.peques = true; j.inmortal = true; }      // (182)
    if (opc.moderno) j.moderno = true;                          // (25-sep, 2b) perdón al borde y salto guardado
  }
  // Al empezar cada casa (y al volver a empezarla tras morir): la regla del desafío y la mejora del aire
  function modosSala(j) {
    var s = j.s, w = j.w; if (!s || !w || s.calle || s.tesoro) return;
    var na = nivelMejora(j, 'aire');
    if (na) { s.aireMax = Math.round(s.aireMax * (1 + MEJORA.aire * na)); s.aire = s.aireMax; }
    var r = j.desafio;
    if (r === 'apagon') s.oscuro = true;                      // a oscuras, como el reto de la semana
    else if (r === 'xxl') w.grande = 1;                       // aguantas un golpe (como la seta)
    else if (r === 'iman') s.iman = s.aireMax;                // imán toda la visita
    else if (r === 'muelle') w.doble = s.aireMax;             // doble salto toda la visita
  }
  // (177) el COFRE de cada día de la semana (lunes = 0): además de sus monedas de siempre, algo distinto cada día
  var COFRES = [['lunes', 'monedas', 50], ['martes', 'iman', 0], ['miercoles', 'vida', 0], ['jueves', 'xp', 60], ['viernes', 'botas', 0], ['sabado', 'seta', 0], ['domingo', 'monedas', 120]];
  function cofreDelDia(fecha) {
    var d = new Date(String(fecha) + 'T12:00:00Z'), n = isNaN(d.getTime()) ? 0 : (d.getUTCDay() + 6) % 7;
    return { dia: n, nombre: COFRES[n][0], tipo: COFRES[n][1], n: COFRES[n][2] };
  }
  // El regalo del cofre se pone al empezar la 1.ª casa de la partida siguiente (false si no es de los que se ponen)
  function regaloCofre(j, tipo) {
    if (!j || !j.s || !j.w) return false;
    if (tipo === 'iman') j.s.iman = PODER * 2;
    else if (tipo === 'botas') j.w.botas = PODER * 2;
    else if (tipo === 'seta') j.w.grande = 1;
    else if (tipo === 'vida') j.vidas++;
    else return false;
    return true;
  }
  // Tras «salida»: pasa el aire que sobra a puntos poco a poco. Devuelve true al acabar.
  function airePuntos(j, trozo, ev) {
    var q = Math.min(trozo, j.s.aire);
    j.s.aire -= q; sumar(j, q, ev || []);
    return j.s.aire <= 0;
  }
  function siguienteSala(j) {
    var n = j.n + 1;
    if (n >= SALAS.length) { n = 0; j.vuelta++; }
    empezarSala(j, n);
  }
  /* ── EL JUEGO SEGUIDO (24-sep, Alejandro: «un único juego de principio a fin, como Goody») ─────────────────
     Un MUNDO de pantallas de calle (def.calle) unidas por sus bordes (def.salidas); cada casa es una puerta
     (def.puertas: [{x, y, casa: id}]). j.av guarda el viaje: en qué calle estás, por dónde entraste (para volver ahí
     si te pillan en la calle), qué casas están vendidas y a qué calle se vuelve al salir de una casa. */
  var CALLES = (typeof LLAVES_CALLES !== 'undefined' && LLAVES_CALLES) || (CASAS_FUERA && CASAS_FUERA.calles) || [];
  function calle(id) { for (var i = 0; i < CALLES.length; i++) if (CALLES[i].id === id) return CALLES[i]; return null; }
  function casaPorId(id) {
    var packs = [['normal', NORMALES], ['retro', RETRO], ['nuevas', NUEVAS], ['galaxia', GALAXIA]];
    for (var p = 0; p < packs.length; p++) for (var i = 0; i < packs[p][1].length; i++) if (packs[p][1][i].id === id) return { pack: packs[p][0], n: i, def: packs[p][1][i] };
    return null;
  }
  // ¿cuántas casas de este mundo hay vendidas? (para abrir su valla)
  function vendidasDe(j, mundo) {
    var n = 0; Object.keys(j.av.vendidas).forEach(function (id) { if (!mundo || j.av.mundoDe[id] === mundo) n++; }); return n;
  }
  /* (26-sep, fase B · PLAN-JUEGO-UNICO 3.1) UNA SOLA CUENTA para el marcador «🏠 vendidas / total»: las casas normales y los
     jefes. NO cuentan las puertas `extra`, `pide`, `pideEstatuillas`, `soloNoche` o `truco`, las casas de las calles secretas,
     las súper bonus (túneles) ni las bajadas. Así el total y lo vendido cuentan LO MISMO (antes: «70 / 65», porque lo vendido
     sumaba también las secretas). av: j.av o lo guardado (P.aventura); mundo: solo ese mundo (opcional). */
  function cuentaAv(av, mundo) {
    var v = (av && av.vendidas) || {}, total = 0, vend = 0, vistas = {};
    CALLES.forEach(function (c) {
      if (c.secreta || (mundo && (c.mundo || '') !== mundo)) return;
      (c.puertas || []).forEach(function (p) {
        if (!p.casa || p.extra || p.pide || p.pideEstatuillas || p.soloNoche || p.truco != null || vistas[p.casa]) return;
        // (27-sep, P5) las de la VUELTA no cuentan mientras su acto está cerrado (salvo las ya vendidas: partidas de antes); sin
        // aventura (av null) cuentan todas
        if (p.acto && av && !actoAbierto(av, p.acto) && !v[p.casa]) return;
        var d = casaPorId(p.casa); if (d && d.def.superbonus) return;
        vistas[p.casa] = 1; total++; if (v[p.casa]) vend++;
      });
    });
    return { total: total, vendidas: vend };
  }
  /* ══ (26-sep, P4 · PLAN-JUEGO-UNICO 3.0) LA REGLA DE CADA MUNDO (igual en los 7) ══════════════════════════════════════════
     · La PUERTA DEL JEFE lleva `pideVendidas: N`: se abre al vender N casas de ESE mundo (contadas con cuentaAv). NUNCA `pide`,
       que ya es «llevar un objeto» (con `pide: 9` no se abriría nunca). Cerrada → 'puertaCerrada' (la pantalla dice cuántas faltan).
     · La VALLA pide al JEFE: `valla: { mundo, jefe: 'jefe-…' }` (ya no cuenta casas). Para las partidas de antes: si ya has
       pisado (o vendido) algo de un mundo de MÁS ALLÁ, sigue abierta: nadie se queda encerrado al volver por un atajo.
     · La VERJA de la Gran Villa: `valla: { pideVendidas: 60 }` (cuentaAv de todos los mundos; abierta también si ya vendiste una
       casa de detrás, la Gran Villa). La valla de antes (`{ mundo, n }` o un número) sigue contando casas, como siempre.
     · Los ATAJOS (tuberías y túneles con `atajo`) solo valen con LAS DOS calles ya pisadas, o si ya se usaron en esa partida
       (av.atajos): sirven para volver, nunca para saltarse un mundo. Cerrado → 'atajoCerrado' (w.atajoCerrado = a dónde iba).
     · Vencer al jefe (vendeCasa) → j.superado = { mundo, jefe, cifra, botas }: la pantalla saca «MUNDO SUPERADO» y guarda.
       La puerta con `da: 'dobleSalto'` (la del Gorila) da las BOTAS DEL DOBLE SALTO para siempre (av.dobleSalto).
     · La puerta con `sale: { calle, x, y }` (la del Gorila): al salir con la casa vendida, apareces ahí (junto a la valla).
     · objetivoAv(j): lo que falta, para la línea de arriba ({ k, n, jefe, casa, mundo }; la pantalla lo dice con t()).
     Sin aventura (el robot, las casas sueltas) nada cambia: el robot mira las calles con la valla abierta. ══ */
  function condicionPuerta(p) { return !!(p.extra || p.pide || p.pideEstatuillas || p.soloNoche || p.truco != null); }
  // los mundos en el orden del viaje (el de su primera calle que no es secreta)
  function ordenMundos() {
    var r = []; CALLES.forEach(function (c) { var m = c.mundo || ''; if (!c.secreta && m && r.indexOf(m) < 0) r.push(m); }); return r;
  }
  // la puerta del jefe de un mundo (la que lleva `pideVendidas`): { casa, pide, calle } o null
  function jefeDe(mundo) {
    for (var i = 0; i < CALLES.length; i++) {
      var c = CALLES[i]; if (c.secreta || (c.mundo || '') !== (mundo || '')) continue;
      for (var k = 0; k < (c.puertas || []).length; k++) { var p = c.puertas[k]; if (p.casa && p.pideVendidas) return { casa: p.casa, pide: p.pideVendidas, calle: c.id }; }
    }
    return null;
  }
  // ¿de qué mundo es JEFE esta casa? (su puerta lleva `pideVendidas`, o una valla la pide) · '' si de ninguno
  function mundoDeJefe(id) {
    var r = '';
    CALLES.forEach(function (c) {
      if (r || c.secreta) return;
      (c.puertas || []).forEach(function (p) { if (!r && p.casa === id && p.pideVendidas) r = c.mundo || ''; });
      if (!r && c.valla && c.valla.jefe === id) r = c.valla.mundo || c.mundo || '';
    });
    return r;
  }
  // la casa que da las BOTAS DEL DOBLE SALTO (la de la puerta con `da: 'dobleSalto'`: el Gorila) · '' si no hay
  function casaBotas() {
    var r = ''; CALLES.forEach(function (c) { (c.puertas || []).forEach(function (p) { if (!r && p.casa && p.da === 'dobleSalto') r = p.casa; }); }); return r;
  }
  // (para las partidas de antes) ¿has pisado una calle, o vendido una casa, de un mundo de más allá de este?
  function pisadaMasAlla(av, mundo) {
    var o = ordenMundos(), i = o.indexOf(mundo || ''), pis = (av && av.pisadas) || {}, md = (av && av.mundoDe) || {};
    if (i < 0) return false;
    if (CALLES.some(function (c) { return pis[c.id] && o.indexOf(c.mundo || '') > i; })) return true;
    return Object.keys((av && av.vendidas) || {}).some(function (id) { return o.indexOf(md[id] || '') > i; });
  }
  function vallaAbiertaAv(av, d) {
    var v = d && d.valla; if (!v) return true;
    var vend = (av && av.vendidas) || {};
    if (v.jefe) return !!vend[v.jefe] || pisadaMasAlla(av, v.mundo || d.mundo);
    if (v.pideVendidas) return cuentaAv(av).vendidas >= v.pideVendidas || (d.puertas || []).some(function (p) { return p.casa && !condicionPuerta(p) && vend[p.casa]; });
    return vendidasDe({ av: { vendidas: vend, mundoDe: (av && av.mundoDe) || {} } }, v.mundo || null) >= (v.n || v);   // (la de antes: contando casas)
  }
  // ¿vale este ATAJO (de la calle `de` a la calle `a`)? Sin aventura, siempre (como antes)
  function atajoAbierto(av, de, a) {
    if (!av) return true;
    var pis = av.pisadas || {}, at = av.atajos || {};
    return !!((pis[de] && pis[a]) || at[de + '>' + a] || at[a + '>' + de]);
  }
  // los SECRETOS de un mundo, para «MUNDO SUPERADO»: las casas secretas (puertas con condición, calles secretas y zonas de la
  // estrella), los túneles de súper bonus y las salas de bonus de sus tuberías. { hechos, total }
  function secretosMundo(av, mundo) {
    var vend = (av && av.vendidas) || {}, baj = (av && av.bajadas) || {}, tub = (av && av.tuberias) || {}, sec = secretasDeCalles(), vistas = {}, r = { hechos: 0, total: 0 };
    var cuenta = function (hecho) { r.total++; if (hecho) r.hechos++; };
    CALLES.forEach(function (c) {
      if ((c.mundo || '') !== (mundo || '')) return;
      (c.puertas || []).forEach(function (p) { if (p.casa && !vistas[p.casa] && (c.secreta || sec[c.id] || condicionPuerta(p))) { vistas[p.casa] = 1; cuenta(vend[p.casa]); } });
      (c.zonas || []).forEach(function (z) { if (z.casa && !vistas[z.casa]) { vistas[z.casa] = 1; cuenta(vend[z.casa]); } });
      (c.bajadas || []).forEach(function (b, i) { if (b.casa) cuenta(baj[c.id + ':' + i]); });
      (c.tuberias || []).forEach(function (p) { if (p.a) cuenta(tub[p.a]); });
    });
    return r;
  }
  // (para las partidas de antes, sin `mundos`) los mundos ya pisados o con algo vendido ya están vistos: sin tarjeta otra vez
  function mundosDeAntes(av, pantalla) {
    var r = {}, pis = av.pisadas || {}, md = av.mundoDe || {}, c0 = calle(pantalla);
    CALLES.forEach(function (c) { if (pis[c.id] && c.mundo) r[c.mundo] = { tarjeta: 1 }; });
    Object.keys(av.vendidas || {}).forEach(function (id) { if (md[id]) r[md[id]] = { tarjeta: 1 }; });
    if (c0 && c0.mundo) r[c0.mundo] = { tarjeta: 1 };
    return r;
  }
  /* EL OBJETIVO, siempre arriba en una línea (3.0.6). Devuelve { k, n, jefe, casa, mundo } (o null con calles sin puertas de
     jefe, las de antes de P4):
       'vende'  faltan n casas de este mundo para abrir la puerta del jefe    'vence'  la puerta está abierta: vence al jefe
       'sigue'  este mundo ya está superado: sigue hacia `mundo`              'verja'  faltan n casas para la verja de la Gran Villa
       'entra'  la verja está abierta: vende `casa` (la Gran Villa)           'final'  vence al jefe final (su puerta `extra`)
       'todo'   todo vendido (o la aventura ya terminada) */
  function objetivoAv(j) {
    var av = j && j.av; if (!av) return null;
    var o = ordenMundos(); if (!o.some(function (m) { return jefeDe(m); })) return null;
    var vend = av.vendidas || {}, c = calle(av.pantalla), mu = c ? (c.mundo || '') : '';
    if (av.terminada) return { k: 'todo', mundo: mu };
    var jf = jefeDe(mu);
    if (jf && !vend[jf.casa]) {
      var n = jf.pide - cuentaAv(av, mu).vendidas;
      return n > 0 ? { k: 'vende', n: n, jefe: jf.casa, mundo: mu } : { k: 'vence', jefe: jf.casa, mundo: mu };
    }
    // (27-sep, P5) LA VUELTA A NERJA: en las calles del mundo de las puertas `acto`, con la noche de la vuelta (del Cometa al Tasador)
    if (nocheVuelta(av) && mu && mundoDeActo('vuelta') === mu) {
      var cvv = null; CALLES.forEach(function (x) { if (!cvv && x.valla && x.valla.pideVendidas) cvv = x; });
      return { k: 'vuelta', n: cvv ? Math.max(0, cvv.valla.pideVendidas - cuentaAv(av).vendidas) : 0, mundo: mu };
    }
    var i = o.indexOf(mu), ult = o[o.length - 1];
    if (mu !== ult) {
      for (var k = i + 1; k < o.length; k++) { var j2 = jefeDe(o[k]); if (!j2 || !vend[j2.casa]) return { k: 'sigue', mundo: o[k] }; }
      return { k: 'sigue', mundo: ult };
    }
    var cv = null; CALLES.forEach(function (x) { if (!cv && (x.mundo || '') === mu && x.valla && x.valla.pideVendidas) cv = x; });
    if (cv && !vallaAbiertaAv(av, cv)) return { k: 'verja', n: Math.max(1, cv.valla.pideVendidas - cuentaAv(av).vendidas), mundo: mu };
    var normal = '', extra = '';
    CALLES.forEach(function (x) {
      if ((x.mundo || '') !== mu || x.secreta) return;
      (x.puertas || []).forEach(function (p) { if (!p.casa || vend[p.casa]) return; if (!condicionPuerta(p)) { if (!normal) normal = p.casa; } else if (p.extra && !extra) extra = p.casa; });
    });
    if (normal) return { k: 'entra', casa: normal, mundo: mu };
    if (extra) return { k: 'final', jefe: extra, mundo: mu };
    return { k: 'todo', mundo: mu };
  }
  /* (26-sep, PLAN-JUEGO-UNICO · DOBLE SALTO COMO HABILIDAD) el doble salto está SIEMPRE puesto con las Botas (j.av.dobleSalto, al
     vencer al Gorila) o con j.dobleSalto, que pone la PANTALLA en cada paso cuando la casa o la calle está marcada
     `dobleSalto: true` (las de después del Gorila): así, fuera de la aventura (la casa del día, las revanchas…), se juega igual
     que la mira el robot (mansion-escape-room-mapa.js lee la misma marca). El motor no lee la marca: M.paso con una casa marcada
     y sin nada más sigue siendo un salto (lo que espera la prueba del robot). */
  function dobleSiempre(j) { return !!(j && ((j.av && j.av.dobleSalto) || j.dobleSalto)); }
  /* (27-sep, P5 · PLAN-JUEGO-UNICO M7) LOS ACTOS: LA VUELTA A NERJA, DE NOCHE. Una puerta con `acto: 'vuelta'` está cerrada («El
     dueño está de viaje»: suceso 'deViaje') hasta que se abre ese acto; lo abre VENDER la casa de la puerta con `abreActo: 'vuelta'`
     (el Cometa) → j.av.actos.vuelta = 1 (se guarda). La NOCHE de la vuelta dura hasta vencer al Tasador (av.terminada); las puertas
     siguen abiertas después. Una puerta a CALLE con `acto` (el «Autobús a la Gran Villa») no existe hasta entonces. Sin aventura
     (el robot, las casas sueltas), todo abierto, como siempre. */
  function actoAbierto(av, acto) { return !av || !acto || !!(av.actos && av.actos[acto]); }
  function nocheVuelta(av) { return !!(av && av.actos && av.actos.vuelta && !av.terminada); }
  function actoQueAbre(id) { var r = null; CALLES.forEach(function (c) { (c.puertas || []).forEach(function (p) { if (!r && p.casa === id && p.abreActo) r = p.abreActo; }); }); return r; }
  function mundoDeActo(a) { var r = ''; CALLES.forEach(function (c) { (c.puertas || []).forEach(function (p) { if (!r && p.acto === a) r = c.mundo || ''; }); }); return r; }
  // partidas de antes (sin `actos`): si ya vendieron la casa que abre un acto, ese acto está abierto
  function actosDeAntes(vend) { var r = {}; Object.keys(vend || {}).forEach(function (id) { var a = actoQueAbre(id); if (a) r[a] = 1; }); return r; }
  // si al salir de esa casa (con su puerta en esa calle) apareces en otro sitio: `sale` (la del Gorila, junto a la valla del portal)
  function saleDe(idCalle, id) {
    var c = calle(idCalle), r = null;
    ((c && c.puertas) || []).forEach(function (p) { if (!r && p.casa === id && p.sale && calle(p.sale.calle)) r = p.sale; });
    return r;
  }
  function ponCalle(j, id, x, y, dir) {
    var d = calle(id); if (!d) return false;
    var s = nuevaSala(d); s.n = -1;
    s.vallaAbierta = vallaAbiertaAv(j.av, d);        // (26-sep, P4) la valla pide al JEFE (la verja, casas con cuentaAv; la de antes, casas)
    var w = nuevoAgente(d);
    if (j.w && j.w.ladrillos > 0) w.ladrillos = j.w.ladrillos;   // (26-sep, arreglo) los ladrillos que llevas no se pierden
    if (x != null) { w.x = x; w.y = y; w.f = 0; if (dir) w.dir = dir; }
    j.s = s; j.w = w; j.av.pantalla = id; j.av.entrada = { x: w.x, y: w.y, dir: w.dir };
    j.enTesoro = false; j.salida = false; j.enCasa = null;
    // (25-sep, 2b) las calles pisadas (el mapa del mundo las ilumina) · en la calle ya no hay visita con muelle
    (j.av.pisadas = j.av.pisadas || {})[id] = 1; j.revisita = false;
    // (25-sep, secretos) la calle sabe de la aventura (puertas con condición) y si es de noche; lo que ya hiciste sigue hecho
    s.av = j.av; s.noche = !!j.noche || nocheVuelta(j.av);   // (27-sep, P5) + la noche de la vuelta
    reaplicaTrucos(j); marcaObjetos(j); marcaPremios(j);
    return true;
  }
  // opc: { empieza: id de la calle de salida, guardado: lo que se guardó para «Continuar» }
  function nuevaAventura(opc) {
    opc = opc || {};
    var j = { puntos: 0, vidas: 2, proxVida: VIDA_EXTRA, vuelta: 0, racha: 1, corazones: 0, cogidos: {}, turbo: false,
      espejo: false, dos: false, puntos2: 0, llaves1: 0, llaves2: 0, enTesoro: false, n: 0 };
    j.av = { pantalla: '', vendidas: {}, cifras: [], mundoDe: {}, entrada: null, volver: null, hist: {}, tuberias: {},
      // (25-sep, secretos) trucos hechos en las calles, estatuillas, cartas, lo que llevas, puertas con regalo ya dado y
      // el máximo de secretos encontrados por casa (el álbum, lo apunta la pantalla)
      trucos: {}, estatuillas: {}, cartas: {}, lleva: {}, dado: {}, secretos: {},
      // (25-sep, 2b) poderes de los jefes vencidos, calles pisadas y atajos usados (el mapa del mundo), salidas secretas
      // encontradas, las botas de muelle y los sitios de muelle ya cogidos
      poderesJefe: {}, pisadas: {}, atajos: {}, salidas: {}, muelleHechos: {}, muelle: false,
      // (26-sep) los premios ya cogidos en las calles ('calle:x,y') y los túneles de súper bonus ya vaciados ('calle:i')
      premios: {}, bajadas: {},
      // (26-sep, revisión M4) las veces que te ha ganado cada jefe en ESTA aventura (tipo → n): se guardan, así al «Continuar» se acuerda
      jefeHoy: {},
      // (26-sep, P4) las BOTAS DEL DOBLE SALTO (al vencer al Gorila) y lo de cada mundo: { tarjeta (ya salió su tarjeta grande),
      // t0 (el tiempo jugado al entrar: lo apunta la pantalla), superado }
      dobleSalto: false, mundos: {},
      // (27-sep, P5) los ACTOS ya abiertos ({ vuelta: 1 } al vencer al Cometa)
      actos: {} };
    if (opc.moderno) j.moderno = true;                 // (25-sep, 2b) el modo moderno (perdón al borde y salto guardado)
    CALLES.forEach(function (c) { (c.puertas || []).forEach(function (p) { j.av.mundoDe[p.casa] = c.mundo || ''; }); });
    // (26-sep, revisión R1) sobre una COPIA: si no, la partida y lo guardado compartían premios, trucos, vendidas… y lo que
    // cogías se apuntaba en lo guardado sin sus vidas ni sus puntos (al «Menú» + «Continuar», el premio se perdía)
    var g = opc.guardado && typeof opc.guardado === 'object' ? copia(opc.guardado) : null;
    if (g && g.pantalla && calle(g.pantalla)) {
      j.puntos = +g.puntos || 0; j.vidas = g.vidas != null ? +g.vidas : 2; j.corazones = +g.corazones || 0;
      j.proxVida = Math.max(VIDA_EXTRA, (Math.floor(j.puntos / VIDA_EXTRA) + 1) * VIDA_EXTRA);
      j.av.vendidas = g.vendidas || {}; j.av.cifras = g.cifras || []; j.cogidos = g.cogidos || {}; j.av.hist = g.hist || {}; j.av.tuberias = g.tuberias || {}; j.av.bandera = g.bandera || null; j.av.banderas = g.banderas || {};
      ['trucos', 'estatuillas', 'cartas', 'lleva', 'dado', 'secretos'].forEach(function (k) { j.av[k] = g[k] || {}; });   // (25-sep)
      ['poderesJefe', 'pisadas', 'atajos', 'salidas', 'muelleHechos', 'premios', 'bajadas', 'jefeHoy'].forEach(function (k) { j.av[k] = g[k] && typeof g[k] === 'object' ? g[k] : {}; });   // (25-sep, 2b) · (26-sep) + premios, bajadas y jefeHoy
      j.av.muelle = !!g.muelle;
      // (26-sep, P4) las partidas de antes: las Botas, si ya vendieron al Gorila; los mundos ya pisados, vistos (sin tarjeta)
      var cb = casaBotas(); j.av.dobleSalto = !!g.dobleSalto || !!(cb && j.av.vendidas[cb]);
      j.av.mundos = g.mundos && typeof g.mundos === 'object' ? g.mundos : mundosDeAntes(j.av, g.pantalla);
      j.av.actos = g.actos && typeof g.actos === 'object' ? g.actos : actosDeAntes(j.av.vendidas);   // (27-sep, P5) las de antes: por lo vendido
      if (g.terminada) j.av.terminada = true;          // (26-sep, fase B) la aventura ya acabada sigue guardada («Terminada ★»)
      ponCalle(j, g.pantalla, g.x, g.y, g.dir);
      // se sigue delante de la puerta de la casa que acabas de vender · (26-sep, A1) con unos pasos de protección
      if (g.enPuerta) { j.w.enPuerta = true; j.w.abajoAntes = true; protege(j); }
    } else ponCalle(j, opc.empieza || (CALLES[0] && CALLES[0].id));
    return j;
  }
  // Lo que se guarda para seguir otro día (lo mínimo: dónde estás y qué llevas)
  function guardadoAventura(j) {
    var v = j.enCasa && j.av.volver, w = v ? j.av.volver : { x: j.w.x, y: j.w.y, dir: j.w.dir };
    // (26-sep, revisión R1) una COPIA: lo guardado no cambia solo al coger algo; cambia al volver a guardar (todo junto)
    return copia({ v: 1, pantalla: v ? j.av.volver.pantalla : j.av.pantalla, x: w.x, y: w.y, dir: w.dir,
      enPuerta: !!v || !!j.w.enPuerta, puntos: j.puntos, vidas: j.vidas, corazones: j.corazones,
      vendidas: j.av.vendidas, cifras: j.av.cifras, cogidos: j.cogidos, hist: j.av.hist || {}, tuberias: j.av.tuberias || {}, bandera: j.av.bandera || null, banderas: j.av.banderas || {},
      trucos: j.av.trucos || {}, estatuillas: j.av.estatuillas || {}, cartas: j.av.cartas || {}, lleva: j.av.lleva || {}, dado: j.av.dado || {}, secretos: j.av.secretos || {},
      poderesJefe: j.av.poderesJefe || {}, pisadas: j.av.pisadas || {}, atajos: j.av.atajos || {}, salidas: j.av.salidas || {}, muelleHechos: j.av.muelleHechos || {}, muelle: !!j.av.muelle,
      premios: j.av.premios || {}, bajadas: j.av.bajadas || {}, jefeHoy: j.av.jefeHoy || {},   // (26-sep) · (revisión) + jefeHoy
      terminada: !!j.av.terminada,                       // (26-sep, fase B) acabada: no se borra, se queda como «Terminada ★»
      actos: j.av.actos || {},                           // (27-sep, P5) los actos (la vuelta a Nerja)
      dobleSalto: !!j.av.dobleSalto, mundos: j.av.mundos || {} });   // (26-sep, P4) las Botas del Doble Salto y lo de cada mundo
  }
  // Al cruzar un borde: a la pantalla vecina, por el borde contrario, a la misma altura (o columna)
  function cambiaPantalla(j, lado) {
    var s = j.s, w = j.w, id = s.sal && s.sal[lado], d = id && calle(id);
    if (!d) return false;
    var W = d.ancho || ANCHO, H = d.alto || ALTO;
    var o = { x: w.x, f: w.f, y: w.y, dir: w.dir, aire: w.aire, salto: w.salto, jdir: w.jdir, alto: w.alto, botas: w.botas, paraguas: w.paraguas, patin: w.patin, llc: w.llc,
      doble: w.doble, dobleUsado: w.dobleUsado, saltoAntes: w.saltoAntes };   // (26-sep, P4) el doble salto no se recarga al cruzar
    ponCalle(j, id);
    var n = j.w; Object.keys(o).forEach(function (k) { n[k] = o[k]; });
    if (lado === 'izq') { n.x = W - 2; n.f = 3; }
    else if (lado === 'der') { n.x = 0; n.f = 0; }
    else if (lado === 'arr') { n.y = H * 8 - 16; }
    else if (lado === 'aba') { n.y = 0; if (n.aire >= 2) n.aire = 2; }   // la caída sigue, pero sin contar lo de arriba
    n.plat = -1; n.enPuerta = true;                            // (si apareces justo en una puerta, no entras sin querer)
    j.av.entrada = { x: n.x, y: n.y, dir: n.dir };
    return true;
  }
  // Entrar en una casa por su puerta
  // (25-sep, 2b) con las BOTAS DE MUELLE (tieneMuelle) también se entra en las casas ya VENDIDAS: es una visita para
  // explorar (la puerta ya está abierta, no hay propina ni premios de siempre) y allí están los sitios de `muelle`
  function entrarCasa(j, id) {
    var c = casaPorId(id); if (!c) return false;
    var re = !!j.av.vendidas[id];
    if (re && !tieneMuelle(j)) return false;
    j.av.volver = { pantalla: j.av.pantalla, x: j.w.x, y: j.w.y, dir: j.w.dir, casa: id };
    cambiaPack(c.pack);
    j.check = null;                                   // (2b) las medallas de control son de cada casa
    j.revisita = re;
    var lad = j.w && j.w.ladrillos;                     // (26-sep, arreglo) los ladrillos de la calle entran contigo
    empezarSala(j, c.n);
    if (lad > 0) j.w.ladrillos = lad;
    j.enCasa = id;
    return true;
  }
  // Al acabar la casa (y su sala de bonus, si tocaba): VENDIDA, su cifra, y a la calle delante de su puerta
  // (25-sep, 2b) si has salido por la SALIDA SECRETA, apareces en otra calle: en (px, py) o, si no, en su salida
  function volverCalle(j) {
    var id = j.enCasa || (j.av.volver && j.av.volver.casa), v = j.av.volver, sec = j.salidaSec;
    vendeCasa(j, id);                                  // (26-sep) una súper bonus (túnel) no se vende
    cambiaPack('normal');
    j.salidaSec = null; j.check = null;
    if (sec && sec.calle && calle(sec.calle)) {
      (j.av.salidas = j.av.salidas || {})[sec.casa || id] = sec.calle;
      ponCalle(j, sec.calle, sec.px != null ? sec.px : null, sec.py != null ? sec.py * 8 : null); j.w.enPuerta = true;
    } else if (v && !v.bajada && j.av.vendidas[id] && saleDe(v.pantalla, id)) {   // (26-sep, P4) la puerta con `sale` (el Gorila)
      var sa = saleDe(v.pantalla, id); ponCalle(j, sa.calle, sa.x, sa.y * 8, sa.dir || 1); j.w.enPuerta = true;
    } else if (v) { ponCalle(j, v.pantalla, v.x, v.y, v.dir); j.w.enPuerta = true; if (v.bajada) j.w.abajoAntes = true; }
    j.av.volver = null;
    protege(j);                                        // (26-sep, A1) unos pasos sin que la prensa o el bicho de la puerta te pillen
  }
  // (26-sep) VENDER una casa en la aventura (una vez, con su cifra). Las casas SÚPER BONUS (los túneles) no se venden: son un
  // premio (ni cuentan para las vallas, ni para la puerta sin número, ni para la Gran Villa)
  function vendeCasa(j, id) {
    if (!id || !j.av || j.av.vendidas[id]) return false;
    var c = casaPorId(id); if (c && c.def.superbonus) return false;
    j.av.vendidas[id] = 1; j.av.cifras.push((id.length * 7 + id.charCodeAt(0)) % 10);
    // (26-sep, P4) vencer al JEFE de un mundo: «MUNDO SUPERADO» (lo saca la pantalla, con la cifra de la caja fuerte que da ese
    // jefe) · la puerta con `da: 'dobleSalto'` (el Gorila) da además las BOTAS DEL DOBLE SALTO, para siempre
    var mj = mundoDeJefe(id);
    if (mj) { j.superado = { mundo: mj, jefe: id, cifra: j.av.cifras[j.av.cifras.length - 1], botas: false }; var mm = j.av.mundos = j.av.mundos || {}; (mm[mj] = mm[mj] || {}).superado = 1; }
    // (27-sep, P5) vender la casa de la puerta con `abreActo` (el Cometa) abre ese acto: la VUELTA A NERJA, DE NOCHE
    var ac = actoQueAbre(id); if (ac && !(j.av.actos && j.av.actos[ac])) { (j.av.actos = j.av.actos || {})[ac] = 1; if (j.superado && j.superado.jefe === id) j.superado.acto = ac; else j.actoNuevo = ac; }
    if (id === casaBotas() && !j.av.dobleSalto) { j.av.dobleSalto = true; if (j.superado && j.superado.jefe === id) j.superado.botas = true; else j.botasNuevas = true; }
    return true;
  }

  /* (26-sep, arreglo A1 de VERIFICACION-JEFES.md) al volver a la CALLE (tras morir, al salir de una casa, al «Continuar» o al
     llegar por una puerta o un túnel de otra calle) apareces delante de la puerta; si justo ahí pasaba la prensa o un bicho,
     morías en el primer paso pulsaras lo que pulsaras, una y otra vez hasta el FIN DE PARTIDA. Ahora, PROTEGE pasos (3 s)
     parpadeando (w.inv) en los que ni los bichos, ni la prensa, ni el rayo te pillan: tiempo de apartarse. */
  var PROTEGE = 48;
  function protege(j) { if (j && j.w) j.w.inv = Math.max(j.w.inv || 0, PROTEGE); }
  // Tras «muerte»: devuelve true si aún quedan vidas (y reinicia la sala entera, como el original).
  function trasMorir(j) {
    rompeRacha(j);                                               // (25-sep, idea 178) morir apaga el «modo fuego»
    if (j.vidas <= 0 && !j.vidasInf) return false;
    if (!j.vidasInf) j.vidas--;                                  // modo truco: vidas infinitas
    // en la calle: vuelves a la última BANDERA de control si está en esta misma calle; si no, por donde entraste
    if (j.av && j.s.calle) {
      var b = j.av.bandera, e = b && b.pantalla === j.av.pantalla ? b : (j.av.entrada || {});
      // (26-sep, revisión) abajoAntes: tras llegar por un ATAJO, la entrada está encima del túnel de vuelta; con el ▼ o la flecha
      // que quitan el cartel todavía pulsados, en el primer paso te volvías por el túnel sin querer (hay que soltar y pulsar)
      ponCalle(j, j.av.pantalla, e.x, e.y, e.dir); j.w.enPuerta = true; j.w.abajoAntes = true; protege(j); return true;
    }
    // (24-sep, Alejandro: «cuando te maten, que salgas fuera a la puerta, por si quieres hacer otra o entrar de nuevo»)
    // (25-sep, 2b) salvo si has tocado una MEDALLA DE CONTROL de esta casa: entonces sigues dentro, desde la medalla
    var enMedalla = j.check && j.check.id === j.s.def.id && j.check.n === j.n && !j.s.calle && !j.enTesoro;
    // (26-sep, revisión) j.salidaSec (salida secreta → sala de bonus → te pillan) no se queda puesto: si no, al acabar el sótano de
    // una TUBERÍA de la calle aparecías en la calle de aquella salida secreta (ya queda apuntada en entrarTesoro)
    if (j.av && j.av.volver && !enMedalla) { var v = j.av.volver; j.salidaSec = null; cambiaPack('normal'); ponCalle(j, v.pantalla, v.x, v.y, v.dir); j.w.enPuerta = true; j.av.volver = null; protege(j); return true; }
    empezarSala(j, j.n);
    // Bandera de control (casas con «checkpoint», la 20) y medallas de control (2b): vuelves a ella con lo que ya habías cogido
    var c = j.check;
    if (c && c.n === j.n && c.id === j.s.def.id) {
      var s = j.s;
      c.llaves.forEach(function (i) { if (s.llaves[i]) s.llaves[i].cogida = true; });
      s.quedan = s.llaves.filter(function (k) { return !k.cogida; }).length;
      c.bonus.forEach(function (i) { if (s.bonus[i]) s.bonus[i].cogido = true; });
      c.palancas.forEach(function (i) {
        var p = s.palancas[i]; if (!p || p.hace !== 'abre') return;
        p.movida = true; p.guardado = p.celdas.map(function (q) { return s.mapa[q[1]][q[0]]; });
        p.celdas.forEach(function (q) { s.mapa[q[1]][q[0]] = ' '; });
      });
      s.checkpointVisto = true;
      Object.keys(c.vistas || {}).forEach(function (k) { s.medallasVistas[k] = 1; });   // (2b) las medallas ya tocadas no vuelven a sonar
      j.w.x = c.x; j.w.y = c.y * 8; j.w.f = 0;
    }
    return true;
  }
  /* ¿Ha tocado la bandera de control? (se llama en cada paso). (25-sep, 2b) + las MEDALLAS DE CONTROL de las casas largas
     (`medallas: [[x, y], …]`: la casilla de la izquierda del agente y la fila de su cabeza, como la bandera): la última
     que tocas es donde vuelves si te pillan, con lo que ya llevabas (también en la aventura: no te echan a la calle). */
  function miraCheckpoint(j, ev) {
    var s = j.s, cp = s.def.checkpoint;
    if (j.dos || s.calle || s.tesoro) return;
    var marca = function (x, y, ev1) {
      j.check = { n: j.n, id: s.def.id, x: x, y: y, vistas: copia(s.medallasVistas || {}),
        llaves: s.llaves.map(function (k, i) { return k.cogida ? i : -1; }).filter(function (i) { return i >= 0; }),
        bonus: s.bonus.map(function (b, i) { return b.cogido && b.tipo !== 'corazon' ? i : -1; }).filter(function (i) { return i >= 0; }),
        palancas: s.palancas.map(function (p, i) { return p.movida ? i : -1; }).filter(function (i) { return i >= 0; }) };
      ev.push(ev1);
    };
    var aqui = function (m) { return j.w.aire === 0 && Math.abs(j.w.x - m[0]) <= 1 && (j.w.y >> 3) === m[1]; };
    if (cp && !s.checkpointVisto && aqui(cp)) { s.checkpointVisto = true; marca(cp[0], cp[1], 'checkpoint'); }
    (s.def.medallas || []).forEach(function (m, i) {
      if (s.medallasVistas[i] || !aqui(m)) return;
      s.medallasVistas[i] = 1; marca(m[0], m[1], 'medallaControl');
    });
  }

  /* ══ (25-sep, ideas 138-152 · PLAN-TANDA-JEFES.md) LOS JEFES, LOS MONSTRUOS NUEVOS Y EL COMBO ══════════════════════
     JEFE: `jefe: { tipo, vida, fases, … }` en la casa (las llaves pueden ser 0: vencerle = abrir la puerta).
     Se mueve con su propio reloj (J.reloj, que se para con el reloj y la arena, como los bichos) y TODO lo suyo se repite
     cada 96 pasos (la momia, que te persigue, no). En cada paso deja en s.jefe: x, y, an, al (su cuerpo), `peligros`
     [{x, y, an, al, tipo}] que MATAN y `blancos` [{x, y, an, al, id, toca}] que le hacen daño PISÁNDOLOS desde arriba
     (cayendo) o, con `toca`, tocándolos. Los choques del jefe son a rectángulos (el agente: 8×16 px, de x+1 a x+9) para
     que la casa ESPEJO sea exacta. La puerta NO se abre hasta vencerlo: puertaAbierta(s).
     Sucesos: 'jefeGolpe' (+1.000) · 'jefeFase' · 'jefeVencido' (+5.000; y 'abierta' si no quedan llaves) · 'jefeTinta'
     (el pulpo: 3 s a oscuras, s.jefe.tinta) · 'jefeTele' (la momia salta de vitrina) · 'jefeLlama' / 'jefeGrua' (el final). */
  var PUNTOS_JEFE = 5000, PUNTOS_GOLPE = 1000, INV_JEFE = 30;
  // (idea 2b) COMBO: bichos pisados seguidos sin tocar el suelo: 100, 200, 400… y al 8.º, vida extra
  var COMBO = [100, 200, 400, 800, 1600, 3200, 6400];
  function rectAg(w) { return { x: w.x * 8 + w.f * 2 + 1, y: w.y, an: 8, al: 16 }; }
  function solapa(a, b) { return a.x < b.x + b.an && b.x < a.x + a.an && a.y < b.y + b.al && b.y < a.y + a.al; }
  function jefeFuera(s) { return !s.jefe || s.jefe.vencido; }
  function puertaAbierta(s) { return s.quedan === 0 && jefeFuera(s); }
  function rs(v) { return v < 0 ? -Math.round(-v) : Math.round(v); }          // redondeo simétrico (para el espejo)
  function cayendo(s, w) { return w.aire >= 2 || (w.aire === 1 && ((w.alto === 2 ? SALTO_TRAMP : w.alto ? SALTO_ALTO : s.luna ? SALTO_LUNA : SALTO)[Math.max(0, w.salto - 1)] || 0) > 0); }
  function nuevoJefe(d) {
    var J = copia(d);
    J.vidaMax = d.vida || 3; J.vida = J.vidaMax; J.fases = d.fases || 1; J.fase = 1; J.golpes = 0;
    J.reloj = 0; J.inv = 0; J.pausa = 0; J.vencido = false; J.tinta = 0; J.heridos = {}; J.sucesos = []; J.sinVer = 0; J.aturdido = 0;
    J.peligros = []; J.blancos = []; J.an = d.an || 16; J.al = d.al || 16; J.x = d.x || 0; J.y = d.y || 0; J.fr = 0; J.flip = false;
    J.sentido = d.sentido || 1;
    return J;
  }
  var sueloJ = function (J) { return (J.suelo || 15) * 8; };
  // ir y volver en 96 pasos: ida 32, parado 16 (¡expuesto!), vuelta 32, parado 16. Con sentido -1 empieza por la otra punta
  function patrulla(J, q) {
    var L = J.max - J.min, k = q % 96, u, para = false, ida = 1;
    if (k < 32) u = Math.round(L * k / 32);
    else if (k < 48) { u = L; para = true; }
    else if (k < 80) { u = L - Math.round(L * (k - 48) / 32); ida = -1; }
    else { u = 0; para = true; ida = -1; }
    return { x: J.sentido > 0 ? J.min + u : J.max - u, para: para, dir: ida * J.sentido };
  }
  // su cuerpo: si está EXPUESTO, lo de arriba (8 px) es el blanco y lo de abajo mata; si no, todo mata
  function cuerpoJefe(J, expuesto) {
    if (expuesto) {
      J.blancos.push({ x: J.x + 4, y: J.y, an: J.an - 8, al: 8, id: 'cabeza' });
      J.peligros.push({ x: J.x + 2, y: J.y + 8, an: J.an - 4, al: J.al - 8, tipo: 'cuerpo' });
    } else J.peligros.push({ x: J.x + 2, y: J.y, an: J.an - 4, al: J.al, tipo: 'cuerpo' });
  }
  // cosas que caen del techo por columnas (ladrillos, carpetas, fichas): una cada `periodo` pasos, en la columna que toca
  // (y dos a la vez desde la fase `dobleEn`). c = { cols, periodo (48), vel (4 px), y0 (8) }
  function caidas(J, q, c, tipo) {
    if (!c || !c.cols || !c.cols.length) return;
    var n = c.cols.length, per = c.periodo || 48, vel = c.vel || 4, y0 = c.y0 != null ? c.y0 : 8, fin = sueloJ(J) - 8;
    var tandas = J.fase >= (c.dobleEn || 99) ? 2 : 1;
    for (var t = 0; t < tandas; t++) {
      var qq = q + t * Math.floor(per / 2), k = qq % per, i = Math.floor(qq / per) % n, y = y0 + k * vel;
      if (t) i = (i + Math.floor(n / 2)) % n;
      if (y <= fin) J.peligros.push({ x: c.cols[i] * 8, y: y, an: 8, al: 8, tipo: tipo || 'ladrillo' });
    }
  }
  var MUEVE_JEFE = {
    // (138) EL PULPO DEL PUERTO: sus tentáculos asoman por las tapas del muelle (cols) por turnos: 8 pasos subiendo, arriba
    // (24/20/16 pasos según la fase: entonces se le pisa la punta), 8 bajando. Cada tentáculo pisado ya no sale. Echa TINTA
    // (3 s a oscuras) cada 96 pasos, y en la fase 3 cada 48.
    pulpo: function (s, J, q) {
      var suelo = sueloJ(J), queda = [24, 20, 16][Math.min(2, J.fase - 1)];
      J.tentaculos = [];
      (J.cols || []).forEach(function (c, i) {
        var h = 0;
        if (!J.heridos[i]) {
          var k = ((q - i * 32) % 96 + 96) % 96;
          if (k < 8) h = 2 * (k + 1); else if (k < 8 + queda) h = 16; else if (k < 16 + queda) h = 16 - 2 * (k - 8 - queda + 1);
        }
        J.tentaculos.push(h);
        if (h > 0) J.peligros.push({ x: c * 8, y: suelo - h, an: 8, al: h, tipo: 'tentaculo' });
        if (h === 16) J.blancos.push({ x: c * 8, y: suelo - 16, an: 8, al: 6, id: i });
      });
      if (q % 96 === 60 || (J.fase >= 3 && q % 96 === 12)) { J.tinta = 45; J.sucesos.push('jefeTinta'); }
      if (J.cuerpo) { J.x = J.cuerpo[0]; J.y = J.cuerpo[1]; }
      J.fr = (q >> 3) & 1;
    },
    // (139) EL GORILA DEL ANDAMIO: va y viene por el suelo; en cada punta se para a darse golpes en el pecho (expuesto: se
    // le pisa la cabeza). Tira ladrillos por columnas; en la fase 2 rompe los suelos de `rompe` y tira dos a la vez.
    gorila: function (s, J, q) {
      var p = patrulla(J, q);
      J.x = p.x; J.y = sueloJ(J) - J.al; J.flip = p.dir < 0; J.expuesto = p.para;
      J.fr = p.para ? 2 + ((q >> 2) & 1) : (q >> 2) & 1;
      cuerpoJefe(J, p.para);
      caidas(J, q, J.caen, 'ladrillo');
    },
    // (140) EL PROMOTOR FANTASMA: flota de lado a lado por arriba y suelta ladrillos desde donde está (cada 48, 32 o 24
    // pasos según la fase). No se le pisa: se le vence cortando sus 3 GRÚAS (palancas `hace: 'jefe'`). Los muros que
    // levanta son `barras` de la casa (las que se abren y se cierran a ritmo, que el robot ya entiende).
    promotor: function (s, J, q) {
      var pos = function (qq) { var L = J.max - J.min, k = qq % 96, u = k < 48 ? Math.round(L * k / 48) : Math.round(L * (96 - k) / 48); return J.sentido > 0 ? J.min + u : J.max - u; };
      J.x = pos(q); J.fr = (q >> 3) & 1; J.flip = pos(q + 1) < J.x;
      J.peligros.push({ x: J.x + 2, y: J.y + 2, an: J.an - 4, al: J.al - 4, tipo: 'cuerpo' });
      var cada = [48, 32, 24][Math.min(2, J.fase - 1)], k0 = q - (q % cada), yl = J.y + J.al + (q - k0) * 4;
      if (k0 > 0 && yl <= sueloJ(J) - 8) J.peligros.push({ x: pos(k0) + J.an / 2 - 4, y: yl, an: 8, al: 8, tipo: 'ladrillo' });
    },
    // (141) EL REY DE LAS FICHAS: dispara fichas 64 pasos y luego abre la ranura 32 (expuesto). Cada vida que pierde cambia
    // de «juego»: 1 pinball (fichas rodando por el suelo), 2 marcianitos (lluvia por columnas), 3 fichas que botan.
    reyFichas: function (s, J, q) {
      var suelo = sueloJ(J), k = q % 96, sen = J.sentido, W8 = (s.ancho || ANCHO) * 8;
      J.y = suelo - J.al; J.expuesto = k >= 64; J.fr = J.expuesto ? 2 : (k >> 3) & 1; J.flip = sen < 0;
      cuerpoJefe(J, J.expuesto);
      if (J.fase === 2) { caidas(J, q, J.lluvia, 'ficha'); return; }
      [0, 32].forEach(function (sp) {                                          // dos fichas por tanda (a 64 px una de otra)
        for (var m = 0; m < 2; m++) {
          var dt = k - sp + m * 96; if (dt < 0 || q - dt < 0) continue;          // (las de antes de empezar, no)
          var x = sen > 0 ? J.x + J.an + 2 * dt : J.x - 6 - 2 * dt;
          if (x < 8 || x + 6 > W8 - 8) continue;
          var y = suelo - 6;
          if (J.fase >= 3) { var b = (dt % 24) / 24; y = suelo - 6 - Math.round(96 * b * (1 - b)); }
          J.peligros.push({ x: x, y: y, an: 6, al: 6, tipo: 'ficha' });
        }
      });
    },
    // (142) LA MOMIA FARAONA: te persigue despacio por su piso (medio px por paso; 1 desde la fase 2). Si la pierdes de vista
    // (48 pasos de pie en otro piso) salta a la vitrina de tu piso más cercana (a 6 casillas o más). Tras un golpe se queda
    // quieta 32 pasos y reaparece en la vitrina más lejana. vitrinas: [[x px, fila del suelo, min px, max px]]
    momia: function (s, J, q) {
      var o = s.objetivo; J.fr = (q >> 3) & 1;
      if (J.fila == null) J.fila = J.suelo || 15;
      if (J.aturdido > 0) { if (--J.aturdido === 0) teleMomia(J, o, 'lejos'); J.fr = 2; }
      else if (o) {
        var cx = J.x + J.an / 2, ax = o.x + 5, anda = J.fase >= 2 || (q & 1);
        if (anda) { if (ax > cx + 1 && J.x < J.max) { J.x++; J.flip = false; } else if (ax < cx - 1 && J.x > J.min) { J.x--; J.flip = true; } }
        if (o.pie > 0 && o.pie !== J.fila) J.sinVer++; else J.sinVer = 0;
        if (J.sinVer >= 48) { J.sinVer = 0; teleMomia(J, o, 'cerca'); }
      }
      J.y = J.fila * 8 - J.al;
      J.blancos.push({ x: J.x + 2, y: J.y, an: J.an - 4, al: 6, id: 'cabeza' });
      J.peligros.push({ x: J.x + 2, y: J.y + 6, an: J.an - 4, al: J.al - 6, tipo: 'cuerpo' });
    },
    // (143) EL COMETA REY: da una vuelta en círculo con su estela de fuego, cae cansado a su sitio (cx), descansa (entonces se
    // le pisa la corona) y vuelve a subir. Vuelta + 8 + descanso + 8 = 96 (vuelta 56/64/68 según la fase).
    cometa: function (s, J, q) {
      var tiempos = [[56, 24], [64, 16], [68, 12]][Math.min(2, J.fase - 1)], vu = tiempos[0], re = tiempos[1];
      var k = q % 96, h = J.an / 2, yRep = sueloJ(J) - J.al, yTop = J.cy - J.radio - h;
      var enCirculo = function (kk) { var a = 2 * Math.PI * kk / vu; return { x: J.cx + rs(J.sentido * J.radio * Math.sin(a)) - h, y: J.cy - Math.round(J.radio * Math.cos(a)) - h }; };
      J.cansado = false; J.fr = (q >> 2) & 1;
      if (k < vu) {
        var p = enCirculo(k); J.x = p.x; J.y = p.y;
        for (var d = 1; d <= 6; d++) { if (k - 3 * d < 0) break; var e = enCirculo(k - 3 * d); J.peligros.push({ x: e.x + h - 4, y: e.y + h - 4, an: 8, al: 8, tipo: 'fuego' }); }
      } else if (k < vu + 8) { J.x = J.cx - h; J.y = yTop + Math.round((yRep - yTop) * (k - vu + 1) / 8); }
      else if (k < vu + 8 + re) { J.x = J.cx - h; J.y = yRep; J.cansado = true; J.fr = 2; }
      else { J.x = J.cx - h; J.y = yRep - Math.round((yRep - yTop) * (k - vu - 8 - re + 1) / 8); }
      cuerpoJefe(J, J.cansado);
    },
    // (144) EL GRAN TASADOR (azotea de la Gran Villa), 3 fases: 1 pasea y le caen carpetas; 2 llama a sus ayudantes (un bicho
    // de cada mundo); 3 se sube a la GRÚA: cruza por arriba y en cada punta el gancho le baja al suelo (expuesto) 16 pasos.
    granTasador: function (s, J, q) {
      if (J.fase < 3) {
        var p = patrulla(J, q);
        J.x = p.x; J.y = sueloJ(J) - J.al; J.flip = p.dir < 0; J.expuesto = p.para; J.fr = p.para ? 2 + ((q >> 2) & 1) : (q >> 2) & 1;
        cuerpoJefe(J, p.para);
        if (J.fase === 1) caidas(J, q, J.caen, 'carpeta');
        return;
      }
      var L = J.max - J.min, k = q % 48, lado = Math.floor(q / 48) % 2, u, abajo = sueloJ(J) - J.al, arriba = J.yGrua || 16;
      if (k < 16) u = Math.round(L * k / 16); else u = L;
      if (lado) u = L - u;
      J.x = J.sentido > 0 ? J.min + u : J.max - u; J.flip = (lado ? -1 : 1) * J.sentido < 0;
      J.expuesto = k >= 24 && k < 40; J.fr = J.expuesto ? 2 : (q >> 2) & 1;
      if (k < 16) J.y = arriba; else if (k < 24) J.y = arriba + Math.round((abajo - arriba) * (k - 15) / 8);
      else if (k < 40) J.y = abajo; else J.y = abajo - Math.round((abajo - arriba) * (k - 39) / 8);
      J.gancho = true;
      cuerpoJefe(J, J.expuesto);
    }
  };
  // la momia salta a una vitrina: 'cerca' = la de tu piso más cercana a 6 casillas o más; 'lejos' = la más lejana de todas
  // (a igual distancia, la que queda hacia su `sentido`, así el espejo elige la misma)
  function teleMomia(J, o, como) {
    var ax = o ? o.x + 5 : 0, mejor = null, md = como === 'lejos' ? -1 : 1e9;
    (J.vitrinas || []).forEach(function (v) {
      var c = v[0] + J.an / 2, d = Math.abs(c - ax);
      if (como === 'cerca' && (v[1] !== (o && o.pie) || d < 24)) return;   // (a 3 casillas o más: no te cae encima)
      var mejora = como === 'lejos' ? d > md : d < md;
      if (!mejora && d === md && mejor && (c - ax) * J.sentido > 0) mejora = true;
      if (mejora) { md = d; mejor = v; }
    });
    if (!mejor) return;
    J.x = mejor[0]; J.fila = mejor[1]; J.min = mejor[2]; J.max = mejor[3]; J.sucesos.push('jefeTele');
  }
  // (25-sep) tras cada golpe el jefe se queda PARADO 24 pasos (J.pausa: su reloj no corre; lo suyo se queda donde está):
  // así el rebote no te deja caer encima de él mientras se mueve y hay tiempo de apartarse. La momia no (ya se marea).
  var PAUSA_JEFE = 24;
  function mueveJefe(s, J) {
    // (26-sep, arreglo B2) la pausa baja SIEMPRE (la momia no se para, pero antes su pausa se quedaba en 24 toda la pelea y
    // la pantalla le pintaba las estrellitas de mareo hasta el final)
    var quieto = J.pausa > 0 && J.tipo !== 'momia';
    if (J.pausa > 0) J.pausa--;
    if (!quieto) J.reloj++;
    J.peligros = []; J.blancos = [];
    if (J.tinta > 0) J.tinta--;
    var n = J.sucesos.length, tinta = J.tinta;
    var f = MUEVE_JEFE[J.tipo]; if (f) f(s, J, J.reloj);
    if (quieto) { J.sucesos.length = n; J.tinta = tinta; }       // (parado no vuelve a echar tinta ni nada)
  }
  function cambiaFase(s, J, ev) {
    if (J.tipo === 'gorila' && J.fase >= 2 && J.rompe) { J.rompe.forEach(function (c) { if (s.mapa[c[1]]) s.mapa[c[1]][c[0]] = ' '; }); ev.push('derrumbe'); }
    if (J.tipo === 'granTasador' && J.fase === 2) {
      (J.ayudantes || []).forEach(function (e) { var o = copia(e); o.fr = 0; o.f = 0; if (o.tipo === 'h') o.y = o.fila * 8; o.ayudante = true; s.enemigos.push(o); });
      ev.push('jefeLlama');
    }
    if (J.tipo === 'granTasador' && J.fase === 3) { s.enemigos.forEach(function (e) { if (e.ayudante) e.fuera = true; }); ev.push('jefeGrua'); }
    // el cometa cambia de ritmo (vuelta más larga): si con el nuevo ritmo le tocaría estar bajando, se le deja descansando
    if (J.tipo === 'cometa') { var vu = [56, 64, 68][Math.min(2, J.fase - 1)], kk = J.reloj % 96; if (kk < vu + 8) J.reloj += vu + 8 - kk; }
  }
  function golpeJefe(j, s, b, ev) {
    var J = s.jefe;
    J.vida--; J.inv = INV_JEFE; J.golpes++; J.pausa = PAUSA_JEFE;
    if (J.tipo === 'pulpo' && b && b.id != null) J.heridos[b.id] = 1;
    if (J.tipo === 'momia') J.aturdido = 32;
    sumar(j, PUNTOS_GOLPE, ev); ev.push('jefeGolpe');
    if (J.vida <= 0) {
      J.vencido = true; J.peligros = []; J.blancos = []; J.tinta = 0;
      s.enemigos.forEach(function (e) { if (e.ayudante) e.fuera = true; });
      sumar(j, PUNTOS_JEFE, ev); ev.push('jefeVencido');
      // (25-sep, 2b) en la aventura, cada jefe vencido da su PODER (le quita una vida a otro jefe: PODER_JEFE)
      if (j.av && PODER_JEFE[J.tipo]) { var pj = j.av.poderesJefe = j.av.poderesJefe || {}; if (!pj[J.tipo]) { pj[J.tipo] = 1; ev.push('poderJefe'); } }
      if (s.quedan === 0) ev.push('abierta');
      return;
    }
    var f = 1 + Math.floor(J.golpes * J.fases / J.vidaMax);
    if (f > J.fase) { J.fase = f; ev.push('jefeFase'); cambiaFase(s, J, ev); }
  }
  // Tras moverse el agente: ¿ha pisado un blanco? (golpe y rebote) · ¿le ha tocado algo que mata? (devuelve true)
  // (26-sep, arreglo M2) `baja`: el agente ha BAJADO de verdad en este paso. Pisar al jefe lo exige: con el GLOBO, subir
  // flotando pegado a él contaba como caerle encima (aire 2) y le quitaba vidas sin pisarle
  function choqueJefe(j, s, w, ev, baja) {
    var J = s.jefe; if (!J || J.vencido) return false;
    if (J.inv > 0) J.inv--;
    while (J.sucesos.length) ev.push(J.sucesos.shift());
    var ra = rectAg(w), cae = cayendo(s, w) && baja !== false, b = null, i;
    var protegido = J.inv > 0 || J.aturdido > 0;                 // (la momia mareada tampoco se deja dar)
    if (!protegido) for (i = 0; i < J.blancos.length && !b; i++) {
      var bl = J.blancos[i];
      if (bl.toca ? solapa(ra, bl) : cae && solapa(ra, bl) && w.y + 16 <= bl.y + 8) b = bl;
    }
    if (b) { golpeJefe(j, s, b, ev); if (!b.toca) rebota(w); return false; }
    // (25-sep) recién golpeado (invulnerable), caerle otra vez encima no mata: rebotas sin hacerle daño
    if (protegido) for (i = 0; i < J.blancos.length; i++) { var bi = J.blancos[i]; if (!bi.toca && cae && solapa(ra, bi) && w.y + 16 <= bi.y + 8) { rebota(w); return false; } }
    if (w.estrella > 0 || w.inv > 0) return false;
    for (i = 0; i < J.peligros.length; i++) if (solapa(ra, J.peligros[i])) {
      // (26-sep, idea 48) con CASCO, un ladrillo o una carpeta que te cae encima da en el casco (una vez)
      if (w.casco > 0 && (J.peligros[i].tipo === 'ladrillo' || J.peligros[i].tipo === 'carpeta')) { w.casco = 0; w.inv = 30; ev.push('cascoGolpe'); return false; }
      return true;
    }
    return false;
  }
  /* ══ (25-sep, 2b) EL MAPA DE LOS JEFES (como en los juegos de robots de los 80): al acabar la Urbanización (sus casas
     normales vendidas, o su jefe vencido) se puede ir a CUALQUIER jefe, en el orden que quieras, y cada jefe vencido da un
     PODER que le quita una vida a otro (su punto débil); la cadena da la vuelta y contra el Gran Tasador valen los seis
     juntos. Todo opcional y solo en la aventura: sin poderes, los jefes son los de siempre. ══ */
  var JEFES = [['jefe-nerja', 'pulpo', 'nerja'], ['jefe-edificio', 'gorila', 'edificio'], ['jefe-urba', 'promotor', 'urba'],
    ['jefe-recreativos', 'reyFichas', 'recreativos'], ['jefe-museo', 'momia', 'museo'], ['jefe-galaxia', 'cometa', 'galaxia'], ['jefe-final', 'granTasador', 'final']];
  // [poder que da, jefe contra el que vale]
  var PODER_JEFE = { pulpo: ['tinta', 'momia'], momia: ['vendas', 'gorila'], gorila: ['casco', 'promotor'], promotor: ['plano', 'reyFichas'],
    reyFichas: ['ficha', 'cometa'], cometa: ['estela', 'pulpo'] };
  function todosPoderes(pod) { return Object.keys(PODER_JEFE).every(function (k) { return pod && pod[k]; }); }
  function debilDe(tipo) { var r = null; Object.keys(PODER_JEFE).forEach(function (k) { if (PODER_JEFE[k][1] === tipo) r = k; }); return r; }
  function mapaJefesAbierto(j) { var av = j && j.av; return !!av && (extraAbiertaAv(av, 'urba') || !!(av.vendidas && av.vendidas['jefe-urba'])); }
  /* (26-sep, arreglo de la revisión) ¿se puede elegir este jefe en el mapa? Los seis de los mundos, en el orden que quieras;
     el GRAN TASADOR (el final), como en los juegos de robots de los 80, solo al final: cuando su puerta de la calle se abre
     (la de `villa-camino` es `extra`: al vender las casas normales del mundo final, la Gran Villa). Antes se le podía elegir
     nada más vender la Urbanización y, al vencerle, se acababa la aventura saltándose Recreativos, Museo y Galaxia. */
  function jefeAbierto(av, id) {
    var q = JEFES.filter(function (x) { return x[0] === id; })[0]; if (!q || !av) return false;
    var m = q[2], extra = id === 'jefe-final';
    CALLES.forEach(function (c) { (c.puertas || []).forEach(function (p) { if (p.casa === id) { m = c.mundo || m; if (p.extra) extra = true; } }); });
    if (!extra) return true;
    var v = {}; Object.keys(av.vendidas || {}).forEach(function (k) { v[k] = 1; }); v[id] = 1;     // (su propia casa no cuenta)
    return extraAbiertaAv({ vendidas: v }, m);
  }
  function mapaJefes(j) {
    var av = (j && j.av) || {}, pod = av.poderesJefe || {};
    return JEFES.map(function (q) {
      var tipo = q[1], mio = PODER_JEFE[tipo] || null, debil = debilDe(tipo);
      return { id: q[0], tipo: tipo, mundo: q[2], existe: !!casaPorId(q[0]), vendida: !!(av.vendidas && av.vendidas[q[0]]),
        vencido: !!pod[tipo] || !!(av.vendidas && av.vendidas[q[0]]), poder: mio ? mio[0] : '', contra: mio ? mio[1] : '',
        debil: debil, debilListo: tipo === 'granTasador' ? todosPoderes(pod) : !!(debil && pod[debil]), abierto: jefeAbierto(av, q[0]) };
    });
  }
  // desde el mapa de los jefes: a la casa de ese jefe (sin cambiar a qué calle vuelves)
  function irJefe(j, id) {
    if (!mapaJefesAbierto(j) || !JEFES.some(function (q) { return q[0] === id; })) return false;
    if (j.av.vendidas[id] || !casaPorId(id) || !jefeAbierto(j.av, id)) return false;
    return entrarCasa(j, id);
  }
  // al empezar la casa de un jefe: si llevas el poder de su punto débil, empieza con una vida menos (nunca menos de 1)
  function poderContraJefe(j) {
    var s = j.s, J = s && s.jefe, pod = j.av && j.av.poderesJefe; if (!J || !pod) return;
    var vale = J.tipo === 'granTasador' ? todosPoderes(pod) : !!(debilDe(J.tipo) && pod[debilDe(J.tipo)]);
    if (!vale || J.vidaMax <= 1) return;
    J.vidaMax--; J.vida = J.vidaMax; J.debil = J.tipo === 'granTasador' ? 'todos' : debilDe(J.tipo);
  }
  /* (25-sep, 2b) LAS BOTAS DE MUELLE, para siempre (la tienda de la calle las vende, o un objeto `muelle` en una casa): con
     ellas se vuelve a las casas ya VENDIDAS y allí se salta alto todo el rato. En esa visita la puerta ya está abierta, no
     hay llaves ni premios de siempre y aparecen los sitios de `muelle: [[x, y, tipo]]` de la casa (secretos nuevos, una vez). */
  function tieneMuelle(j) { var av = j && j.av; return !!(av && (av.muelle || (av.lleva && av.lleva.muelle))); }
  function daMuelle(j) { if (!j || !j.av) return false; j.av.muelle = true; return true; }
  function preparaRevisita(j) {
    var s = j.s, av = j.av, id = s.def.id.replace(/-espejo$/, '');
    s.llaves.forEach(function (k) { k.cogida = true; }); s.quedan = 0; s.revisita = true;
    // (26-sep, arreglo) los ya cogidos se quedan en la lista, como cogidos: la medalla de control guarda POSICIONES de esta
    // lista y, si se quitaban, al morir se daba por cogido otro sitio que no habías tocado
    s.bonus = (s.def.muelle || []).map(function (m) { var k = id + ':' + m[0] + ',' + m[1]; return { x: m[0], y: m[1], tipo: m[2] || 'diamante', cogido: !!(av && av.muelleHechos && av.muelleHechos[k]), alFinal: false, extra: true, muelle: k }; });
    s.objetos.forEach(function (o) { o.cogido = true; });
    s.trucos.forEach(function (t, i) { aplicaTrucoSala(j, s, i, [], true); });     // (lo que abrían, abierto; sin premios otra vez)
    s.secretosVistos = 0; s.secretoVisto = false;     // (y eso no cuenta como encontrado: el álbum guarda lo que encontraste tú)
    j.w.botas = 2;
    // (26-sep, arreglo) en una casa-JEFE ya vendida, el jefe sigue vencido y la puerta abierta: si no, se le volvía a ganar
    // en cada visita (3 × 1.000 + 5.000 cada vez: puntos sin fin con las botas)
    var Jf = s.jefe; if (Jf) { Jf.vencido = true; Jf.vida = 0; Jf.peligros = []; Jf.blancos = []; Jf.tinta = 0; Jf.sucesos = []; s.palancas.forEach(function (p) { if (p.hace === 'jefe') p.movida = true; }); }
  }
  /* (25-sep, 2b) EL MAPA DEL MUNDO dibujado como un tablero: los mundos en orden con sus calles (las pisadas, iluminadas;
     las secretas no se enseñan hasta que las pisas) y los ATAJOS (tuberías con `atajo`), que solo salen cuando los usas. */
  function mapaMundo(av) {
    av = av || {};
    var mundos = [], idx = {}, atajos = [], par = {}, sec = secretasDeCalles(), pis = av.pisadas || {}, at = av.atajos || {};
    CALLES.forEach(function (c) {
      var m = c.mundo || '';
      if (idx[m] == null) { idx[m] = mundos.length; mundos.push({ id: m, calles: [], visto: false, hecho: false }); }
      var o = mundos[idx[m]], vista = !!(pis[c.id] || av.pantalla === c.id || (c.puertas || []).some(function (p) { return p.casa && av.vendidas && av.vendidas[p.casa]; }));   // (26-sep) + guardados de antes de las pisadas
      o.calles.push({ id: c.id, nombre: c.nombre || c.id, vista: vista, aqui: av.pantalla === c.id, secreta: !!sec[c.id] });
      if (vista) o.visto = true;
      // (26-sep) + los túneles de atajo (bajadas con `atajo`), como una tubería de atajo más
      (c.tuberias || []).concat((c.bajadas || []).filter(function (b) { return b.atajo && b.calle; }).map(function (b) { return { atajo: b.calle }; })).forEach(function (p) {
        if (!p.atajo || !calle(p.atajo)) return;
        var k = [c.id, p.atajo].sort().join('|'); if (par[k]) return; par[k] = 1;
        atajos.push({ de: c.id, a: p.atajo, mundoDe: m, mundoA: calle(p.atajo).mundo || '', visto: !!(at[c.id + '>' + p.atajo] || at[p.atajo + '>' + c.id]) });
      });
    });
    mundos.forEach(function (o) { o.hecho = !!av.vendidas && extraAbiertaAv(av, o.id); });
    return { mundos: mundos, atajos: atajos };
  }
  // dónde está lo que hay que golpear (para el robot que lo gana y las pistas): centros en px
  function jefeDianas(s) {
    var J = s.jefe; if (!J || J.vencido) return [];
    if (J.tipo === 'pulpo') return (J.cols || []).map(function (c, i) { return J.heridos[i] ? null : { x: c * 8 + 4, y: sueloJ(J) - 16 }; }).filter(Boolean);
    if (J.tipo === 'promotor') return s.palancas.filter(function (p) { return p.hace === 'jefe' && !p.movida; }).map(function (p) { return { x: p.x * 8 + 4, y: p.y * 8, toca: true }; });
    if (J.tipo === 'cometa') return [{ x: J.cx, y: sueloJ(J) - J.al }];
    return [{ x: J.x + J.an / 2, y: J.y }];
  }
  function espejoJefe(J0, W) {
    var J = copia(J0), W8 = W * 8, an = J0.an || 16, col = function (c) { return W - 1 - c; };
    if (J0.x != null) J.x = W8 - J0.x - an;
    if (J0.min != null && J0.max != null) { J.min = W8 - J0.max - an; J.max = W8 - J0.min - an; }
    J.sentido = -(J0.sentido || 1);
    if (J0.cx != null) J.cx = W8 - J0.cx;
    if (J0.cols) J.cols = J0.cols.map(col);
    ['caen', 'lluvia'].forEach(function (k) { if (J0[k] && J0[k].cols) J[k].cols = J0[k].cols.map(col); });
    if (J0.rompe) J.rompe = J0.rompe.map(function (c) { return [W - 1 - c[0], c[1]]; });
    if (J0.cuerpo) J.cuerpo = [W8 - J0.cuerpo[0] - (J0.cuerpo[2] || 32)].concat(J0.cuerpo.slice(1));
    if (J0.vitrinas) J.vitrinas = J0.vitrinas.map(function (v) { return [W8 - v[0] - an, v[1], W8 - v[3] - an, W8 - v[2] - an]; });
    if (J0.ayudantes) J.ayudantes = J0.ayudantes.map(function (e) { return espejoEnemigo(e, W); });
    return J;
  }

  /* MONSTRUOS NUEVOS (145-152). Los que NO matan: okupa, suegra, dueño, moroso (roba) y termitas (come: 'madera');
     el perro solo despierto y el cofre solo abierto. mata(e) lo dice (y el robot no sigue a los que no matan). */
  function mata(e) {
    if (e.tipo === 'okupa' || e.tipo === 'suegra' || e.tipo === 'dueno' || e.tipo === 'generoso' || e.tipo === 'gente') return false;   // (26-sep) + el Generoso y la gente
    if (e.tipo === 'perro') return !!e.despierto;
    if (e.tipo === 'cofre') return !!e.abierto;
    if (e.roba || e.come === 'madera') return false;
    return true;
  }
  // ¿lo sigue el robot? (recorrido fijo que depende solo del paso y que mata)
  function sigueRobot(e) { return (e.tipo === 'h' || e.tipo === 'v' || e.tipo === 'f' || e.tipo === 'p') && mata(e); }
  // (26-sep, arreglo) la GENTE no se pisa aunque lleve el dibujo de un bicho pisable (camarero, vendedor): antes desaparecía,
  // daba +100 y combo y su regalo no llegaba nunca
  function pisable(e) { return e.tipo !== 'gente' && !!(PISABLES_BICHO[e.spr] || e.roba || e.come || (e.tipo === 'cofre' && e.abierto)); }
  function centroE(e) { return e.x + anchoSpr(e.spr) / 2; }
  function altoSpr(n) { return SPR[n] ? SPR[n][0].length : 16; }
  // (145-152) lo que hacen al moverse (lo llama pasoEnemigos). Sus avisos van en e.aviso y paso() los saca como sucesos.
  function pasoMonstruo(s, e) {
    var o = s.objetivo, t = s.t;
    if (e.tipo === 'okupa') {                 // (145) sentado en su llave; tras el cabezazo al techo, se va andando
      if (e.sale) { e.x += e.sale; e.dir = e.sale; e.fr = 2 + ((t >> 2) & 1); if (++e.pasos >= 48) e.fuera = true; }
      else e.fr = (t >> 4) & 1;
    } else if (e.tipo === 'suegra') {         // (146) te sigue por su tramo a 1 px por paso; no mata: te empuja
      if (e.empuja > 0) e.empuja--;
      if (o) { var cs = centroE(e), as = o.x + 5; if (as > cs + 1 && e.x < e.max) { e.x++; e.dir = 1; } else if (as < cs - 1 && e.x > e.min) { e.x--; e.dir = -1; } }
      e.fr = (t >> 3) & 1;
    } else if (e.tipo === 'perro') {          // (150) duerme; con RUIDO cerca (aterrizar, ir el doble de rápido) se despierta
      if (e.x0 == null) e.x0 = e.x;
      if (!e.despierto) {
        if (e.x !== e.x0) { e.x += e.x0 > e.x ? 1 : -1; e.dir = e.x0 > e.x ? 1 : -1; e.fr = 2 + ((t >> 2) & 1); }
        else {
          e.fr = (t >> 4) & 1;
          if (o && o.ruido && Math.abs(o.x + 5 - centroE(e)) < 48 && Math.abs(o.y + 16 - (e.y + 8)) < 20) { e.despierto = 96; e.aviso = 'ladra'; }
        }
      } else {
        e.despierto--;
        if (o) { var cp = centroE(e), ap = o.x + 5; if (ap > cp + 1 && e.x < e.max) { e.x = Math.min(e.max, e.x + 2); e.dir = 1; } else if (ap < cp - 1 && e.x > e.min) { e.x = Math.max(e.min, e.x - 2); e.dir = -1; } }
        e.fr = 2 + ((t >> 1) & 1);
      }
    } else if (e.tipo === 'dueno') {          // (151) flota; solo se ve (y se le habla) con la linterna encendida
      e.fr = (t >> 3) & 1;
    } else if (e.tipo === 'cofre') {          // (152/58) cofre trampa: a menos de 3 casillas se abre y salta hacia ti 48 pasos
      if (e.x0 == null) e.x0 = e.x;
      if (!e.abierto) {
        e.fr = 0;
        if (e.x !== e.x0) { e.x += e.x0 > e.x ? 1 : -1; }
        // (solo si llegas ANDANDO: cerrado no se le puede pisar; caerle encima lo abre al tocar tú el suelo)
        else if (o && o.pie > 0 && Math.abs(o.x + 5 - centroE(e)) < 24 && Math.abs(o.y + 16 - (e.y + altoSpr(e.spr))) < 12) { e.abierto = 48; e.aviso = 'cofreMuerde'; }
      } else {
        e.abierto--;
        if (o && (t & 1)) { var cc = centroE(e), ac = o.x + 5; if (ac > cc + 1 && e.x < e.max) { e.x = Math.min(e.max, e.x + 2); e.dir = 1; } else if (ac < cc - 1 && e.x > e.min) { e.x = Math.max(e.min, e.x - 2); e.dir = -1; } }
        e.fr = 1 + ((t >> 2) & 1);
      }
    } else if (e.tipo === 'generoso') {       // (26-sep, túneles) EL GENEROSO: pasea despacio de min a max (px) y vuelve, con su
      // propio reloj (ida y vuelta en 96 pasos por cada 48 px de tramo: a 1 px por paso más o menos; en espejo, exacto al revés).
      // Tras un golpe se queda 24 pasos quieto (su reloj no corre) y, tras el 5.º, se va corriendo 48 pasos y desaparece
      if (e.huye) { e.x += 2 * e.huye; e.dir = e.huye; e.fr = 3; if (++e.pasos >= 48) e.fuera = true; }
      else if (e.golpeado > 0) { e.golpeado--; e.fr = 2; }
      else {
        var Lg = Math.max(1, e.max - e.min), Pg = 96 * Math.max(1, Math.round(Lg / 48)), hg = Pg / 2;
        if (e.reloj == null) { e.lado = (e.dir || 1) < 0 ? -1 : 1; e.reloj = Math.round((e.lado > 0 ? e.x - e.min : e.max - e.x) * hg / Lg); }
        e.reloj = (e.reloj + 1) % Pg;
        var ug = e.reloj < hg ? Math.round(Lg * e.reloj / hg) : Math.round(Lg * (Pg - e.reloj) / hg), nxg = e.lado > 0 ? e.min + ug : e.max - ug;
        if (nxg !== e.x) e.dir = nxg > e.x ? 1 : -1;
        e.x = nxg; e.fr = (t >> 3) & 1;
      }
    } else if (e.tipo === 'gente') genteAnda(e, t);          // (26-sep, idea 109) la gente de la calle
  }
  // (148) la aspiradora se come las monedas por donde pasa · (149) las termitas se comen la madera (O) cada 48 pasos
  function comeCosas(s, e) {
    var px = e.x * 8 + e.f * 2, an = anchoSpr(e.spr), al = SPR[e.spr] ? SPR[e.spr][0].length : 8;
    if (e.come === 'monedas' && s.bonus) s.bonus.forEach(function (b) {
      if (b.tipo !== 'moneda' || b.cogido || b.comida) return;
      if (b.x * 8 < px + an && px < b.x * 8 + 8 && b.y * 8 < e.y + al && e.y < b.y * 8 + 8) { b.comida = true; e.comio = (e.comio || 0) + 1; e.aviso = 'comeMoneda'; }
    });
    if (e.come === 'madera' && s.mapa && s.t % 48 === 0) {
      var fila = (e.y >> 3) + 1;
      [px + 3, px + 13].forEach(function (p) { var cx = p >> 3; if (s.mapa[fila] && s.mapa[fila][cx] === 'O') { s.mapa[fila][cx] = ' '; e.aviso = 'termita'; } });
    }
  }
  // al pisar un bicho: el COMBO (100, 200, 400… y vida al 8.º) y lo suyo de cada uno
  function pisaBicho(j, s, w, e, ev) {
    e.fuera = true;
    w.combo = (w.combo || 0) + 1;
    var pts = w.combo >= 8 ? 0 : COMBO[w.combo - 1];
    if (!pts && sinExtras(j)) { pts = SIN_MORIR_VIDA; ev.push('sinVida'); }   // (168 y 167) el 8.º bicho tampoco da vida
    if (pts) sumar(j, pts, ev); else { j.vidas++; ev.push('vida', 'comboVida'); }
    j.comboPisa = { n: w.combo, p: pts * (j.turbo ? 2 : 1) * (j.feliz > 0 ? 2 : 1) };   // (J.combo es de la pantalla: las piedras)
    ev.push('pisa'); if (w.combo > 1) ev.push('combo');
    sueltaLoSuyo(j, s, e, ev);
    rebota(w);
  }
  /* (26-sep, arreglos B3, B4 y B5) lo que suelta un bicho al quitarlo de en medio, PISADO o tumbado con la ESTRELLA (antes, con
     la estrella, la aspiradora se iba con la moneda dentro y la casa se quedaba sin todos sus bonus):
     · el moroso devuelve EXACTAMENTE lo robado (sumaTal: robó sin multiplicar; antes, en turbo o en la hora feliz, devolvía el
       doble, y siempre 100 más). El premio por pisarle es el del combo, que sale con su propio aviso;
     · la aspiradora escupe las monedas que se comió (se marcan en la moneda, no en ella: así se copia la sala sin romper nada);
     · el cofre suelta su diamante en la columna de su centro. Si el centro cae justo en la raya entre dos casillas, en la casa
       ESPEJO se coge la de la izquierda (en la original, la de la derecha): así sale en el sitio espejo exacto. */
  function sueltaLoSuyo(j, s, e, ev) {
    if (e.roba && e.saco) { sumaTal(j, e.saco, ev); j.cobrado = e.saco; e.saco = 0; ev.push('morosoPaga'); }
    if (e.come === 'monedas' && e.comio) { s.bonus.forEach(function (b) { if (b.comida) b.comida = false; }); e.comio = 0; ev.push('escupe'); }
    if (e.tipo === 'cofre') {
      var c = centroE(e), col = Math.floor(c / 8); if (s.def && s.def.espejo && c % 8 === 0) col--;
      s.bonus.push({ x: col, y: (e.y >> 3) + 1, tipo: 'diamante', cogido: false, alFinal: false, extra: true }); ev.push('cofreVence');
    }
  }
  /* El REBOTE al pisar (bicho o jefe): un salto entero desde la fila justa. (25-sep, arreglo) Antes seguía el salto a medias
     (w.salto = 4) desde una altura cualquiera y no volvía a pasar por la fila del suelo: el agente lo atravesaba y se
     mataba. Ahora sube desde la casilla de arriba (y múltiplo de 8), vuelve justo a ella, y la caída de después cuenta
     como desde un borde (el jefe mide hasta 3 casillas). */
  function rebota(w) { w.y -= w.y & 7; w.aire = 1; w.salto = 0; w.alto = false; w.rebote = true; }
  // tocar a uno que no mata
  function tocaInofensivo(j, s, w, e, ev) {
    if (e.tipo === 'suegra') {
      if (!(e.empuja > 0) && w.aire === 0) {
        var ca = w.x * 8 + w.f * 2 + 5, ce = centroE(e), d = ca > ce ? 1 : ca < ce ? -1 : (e.dir || 1);   // (justo en medio: hacia donde iba ella; así el espejo es exacto)
        for (var i = 0; i < 4; i++) mover(s, w, d);
        e.empuja = 12; ev.push('empujon');
      }
    } else if (e.roba) {
      if (!(e.robado > 0) && j.puntos > 0) { var q = Math.min(e.roba, j.puntos); j.puntos -= q; e.saco = (e.saco || 0) + q; e.robado = 48; j.robado = q; ev.push('moroso'); }
    } else if (e.tipo === 'dueno') {
      if (s.linterna) { e.fuera = true; sumar(j, 500, ev); j.dueno = e.k || 0; ev.push('dueno'); }
    } else if (e.tipo === 'gente') genteToca(j, s, w, e, ev);   // (26-sep, idea 109) te ayuda o te aparta
  }
  // (145) el cabezazo al techo del okupa (como una palanca de golpe): se levanta y se va
  function miraOkupas(s, celdas, ev) {
    s.enemigos.forEach(function (e) {
      if (e.tipo !== 'okupa' || e.fuera || e.sale || !e.techo) return;
      var tc = tocaPalanca({ golpe: true, x: e.techo[0], y: e.techo[1] }, celdas);
      if (tc && !e.golpeDentro) { e.sale = e.salida || 1; e.pasos = 0; ev.push('okupa'); }
      e.golpeDentro = tc;
    });
  }
  // ¿hay un okupa sentado encima de esta llave? (no se puede coger)
  function llaveTapada(s, k) {
    return s.enemigos.some(function (e) { return e.tipo === 'okupa' && !e.fuera && !e.sale && e.llave && e.llave[0] === k.x && e.llave[1] === k.y; });
  }
  /* (26-sep, PLAN-TUNELES.md) EL GENEROSO, la hucha-cerdito gigante de las casas súper bonus: NO mata. Cada PISOTÓN (caerle
     encima) o CABEZAZO (darle de un salto desde abajo) le hace soltar una lluvia de 5 a 8 monedas a su alrededor, en la fila de
     sus pies y la de encima (se cogen andando), y en el 2.º y el 4.º, además, una gema; luego se queda 24 pasos quieto y no se
     le puede volver a dar. Al 5.º suelta un diamante y una vida y se va corriendo por el lado contrario al tuyo. Todo lo que
     suelta es `extra` (no cuenta para las estrellas). Sucesos 'generosoGolpe' (+200) y 'generosoAdios'. El robot no lo sigue. */
  var GENEROSO_GOLPES = 5, GENEROSO_PUNTOS = 200;
  function golpeGeneroso(j, s, w, e, ev, cae, sube) {
    if (e.huye || e.golpeado > 0) return;
    var pe = posEnemigo(e), m = mascara(e.spr, e.fr);
    var pisa = cae && w.y + 16 <= pe.y + m.arriba + 8, cabezazo = !pisa && sube && w.y >= pe.y + (m.alto >> 1);
    if (!pisa && !cabezazo) return;
    e.golpes = (e.golpes || 0) + 1; e.golpeado = 24;
    if (pisa) rebota(w); else { w.aire = 2; w.salto = 0; }          // (el cabezazo corta el salto, como un techo)
    sumar(j, GENEROSO_PUNTOS, ev); ev.push('generosoGolpe');
    var c = centroE(e), cc = Math.floor(c / 8), sg = s.def && s.def.espejo ? -1 : 1; if (sg < 0 && c % 8 === 0) cc--;
    var fin = e.golpes >= GENEROSO_GOLPES, tipos = [], k;
    if (fin) tipos = ['diamante', 'vida'];
    else { if (e.golpes % 2 === 0) tipos.push('gema'); for (k = 0; k < 5 + (e.golpes - 1) % 4; k++) tipos.push('moneda'); }
    var pie = (e.y >> 3) + (m.alto >> 3) - 1, sitios = [], offs = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6];
    [pie, pie - 1].forEach(function (fy) { offs.forEach(function (o) { sitios.push([cc + o * sg, fy]); }); });
    var libre = function (q) {
      return q[1] >= 0 && q[0] >= 0 && q[0] < (s.ancho || ANCHO) && s.mapa[q[1]] && s.mapa[q[1]][q[0]] === ' ' &&
        !s.bonus.some(function (b) { return !b.cogido && b.x === q[0] && b.y === q[1]; });
    };
    for (k = 0; k < sitios.length && tipos.length; k++) if (libre(sitios[k])) s.bonus.push({ x: sitios[k][0], y: sitios[k][1], tipo: tipos.shift(), cogido: false, alFinal: false, extra: true, generoso: true });
    if (fin) { e.huye = (w.x * 8 + w.f * 2 + 5) < c ? 1 : -1; e.pasos = 0; ev.push('generosoAdios'); }
  }

  /* ══ (26-sep, TANDA «PENDIENTES DE ANTES» · PLAN-TANDA-JEFES.md, sección 4) ═══════════════════════════════════════════
     Todo OPCIONAL: sin estos campos en la casa el juego es el de siempre, y el ROBOT no los usa (lo que el agente hace con
     ellos va en paso(), que el robot no llama; solo la pista de baile va en celda(), y el robot la sigue en el tiempo como
     a las barras). Nada obligatorio puede depender de ellos.
     · 12 BURBUJAS: `burbujas: [[col, filaAbajo, filaArriba, periodo (96), fase]]` → una burbuja sube por esa columna (con
       marea, solo bajo el agua). Tocarla: +10 % de aire y RESPIRO (w.respiro = 48 pasos en que el agua no te ahoga). Una
       por vuelta. Suceso 'burbuja'.
     · 15 PLATAFORMAS AL RITMO: `baile: [{ x1, x2, y, periodo: 48, on: 24, fase }]` → esas casillas son suelo solo `on` pasos
       de cada periodo (celda() las da como F). Suceso 'compas' cuando una se enciende (la música marca el compás).
     · 29 LIANAS: `lianas: [{ x, y, largo: 40, amp: 35, periodo: 96, fase }]` (px: el gancho; amp en grados) → se balancean;
       saltando contra una te agarras ('liana'); SALTAR te suelta con un salto hacia donde va (o hacia la flecha que pulses)
       y ABAJO resbala hasta la punta (y otra vez ABAJO, te dejas caer): 'lianaSuelta'.
     · 60 LA CASA BOCA ABAJO: palanca `hace: 'bocaAbajo'` (con `dura`, vuelve sola) → s.bocaAbajo: la pantalla la pinta del
       revés; las reglas no cambian. Sucesos 'bocaAbajo' / 'bocaArriba'.
     · 80 SALAS QUE CAMBIAN: palanca `hace: 'cambia', celdas: [[x, y, 'letra'], …]` → cada pisada cambia esas casillas a su
       letra y la siguiente las devuelve; nunca si te dejaría dentro de un muro o de un pincho ('cambiaNo'). Suceso 'cambia'.
     · 51 IMÁN GIGANTE: premio `imanGigante` (letra x) → 10 s en que las llaves, monedas y piedras a 8 casillas vuelan a ti
       ('imanTrae'; j.imanTrae = [[x, y, tipo], …] para la pantalla).
     · 108 LANZAR COSAS: premio `ladrillos` (+5, hasta 9) → ABAJO lanza uno en arco hacia donde miras: tumba al bicho que toque
       (+200), agrieta el muro U y se rompe contra lo demás. Sucesos 'lanza', 'ladrilloGolpe', 'ladrilloPlof', 'ladrilloJefe'.
     · 109 GENTE DE LA CALLE: bicho `{ tipo: 'gente', spr, x, y, min, max, hace: 'ayuda' | 'molesta', regalo, dice }` (px).
       Pasea (96 pasos por cada 48 px de tramo), no mata y no se pisa. El que AYUDA da su regalo UNA vez (en la aventura, una
       vez en toda la partida: j.av.dado) ('monedas' +100, 'ladrillos',
       'aire' o 'pista'); el que MOLESTA te aparta. Sucesos 'genteAyuda' (+ 'gentePista') y 'genteMolesta'.
     · 39 ASCENSOR DE CRISTAL: plataforma `tipo: 'ascensorCristal'` (como el ascensor, con `espera`): 'ding' al pararse contigo.
     · 48 CASA EN OBRAS: `obras: true` → entras con CASCO (w.casco): lo que te cae encima (bichos 'f', ladrillos y carpetas de
       los jefes) da en el casco una vez y no mata ('cascoGolpe'). También el premio `casco`.
     · 49 EL PERRO DEL CLIENTE: `perroCliente: [x, y]` (2 casillas, sobre el suelo) → tócalo y te sigue ('perroSigue'); si sales
       por la puerta con él, +1.000 ('perroEntregado').
     · 50 FIRMAR ANTE NOTARIO: `notario: { x, y, periodo: 96, esta: 48, fase }` (la mesa, 2 casillas) → el notario está en su
       mesa `esta` pasos de cada periodo; tócala mientras está: +1.500 ('firma'); si no está, 'notarioFuera'.
     · 102 BANDERA EN LA PUERTA: con la puerta abierta, el mástil junto a ella (2 casillas a la derecha o 1 a la izquierda, si
       está libre y con suelo; si no, hasta 4 columnas más allá o un poco más arriba: mastilDe; `mastil: false` lo quita): tócalo EN EL AIRE y cuanto más alto, más puntos (100 a 5.000). Una
       vez por casa. Suceso 'banderaPuerta' (s.banderaPts, s.banderaAlto). ══ */
  var RESPIRO = 48, LADRILLOS = 5, LADRILLOS_MAX = 9, IMAN_G = 64, PERRO_PUNTOS = 1000, FIRMA_PUNTOS = 1500, LADRILLO_PUNTOS = 200;
  var BANDERA_PUNTOS = [[40, 5000], [28, 2000], [18, 800], [8, 400], [0, 100]];   // (altura de los pies sobre el suelo de la puerta, px)
  var IMAN_TRAE = { moneda: 1, esmeralda: 1, rubi: 1, diamante: 1 };
  var OPCIONAL_BONUS = { ladrillos: 1, casco: 1, imanGigante: 1 };   // (no cuentan para las estrellas ni para la sala de bonus: propios())
  LETRA_BONUS.x = 'imanGigante';
  VISIBLES.imanGigante = 1; VISIBLES.ladrillos = 1; VISIBLES.casco = 1;
  function pendientesSala(s, def) {
    s.burbujas = (def.burbujas || []).map(function (b) { return b.slice(); }); s.burbujaCog = {};
    s.baile = (def.baile || []).map(function (z) { var o = copia(z); o.periodo = z.periodo || 48; o.on = z.on || o.periodo / 2; return o; });
    s.lianas = (def.lianas || []).map(copia);
    s.proyectiles = []; s.bocaAbajo = false; s.bocaT = 0; s.imanG = 0;
    s.perroC = def.perroCliente ? { x: def.perroCliente[0], y: def.perroCliente[1], sigue: false } : null;
    var n = def.notario;
    s.notario = n ? { x: n.x, y: n.y, periodo: n.periodo || 96, esta: n.esta || 48, fase: n.fase || 0, firmado: false, dentro: false } : null;
    s.mastil = mastilDe(s, def); s.banderaHecha = false; s.banderaPts = 0; s.banderaAlto = 0;
  }
  // (102) el mástil de la bandera: la columna libre junto a la puerta (en la casa espejo se mira primero el otro lado)
  // (el mástil sube por la columna mientras esté libre: de 4 a 7 casillas, con suelo debajo)
  // (26-sep, arreglo) antes solo miraba 2 columnas (2 a la derecha y 1 a la izquierda) y pedía 4 casillas: faltaba en 31 de las
  // 71 casas. Ahora, por orden: al nivel de la puerta, hasta 4 columnas de ella (sin un muro en medio) y con 4, 3 o 2 casillas
  // (primero las altas); si no cabe, en el suelo de al lado, una fila más arriba, luego dos y luego tres. m.y1 = la fila del pie
  // del mástil (los puntos se miden desde ahí).
  function mastilDe(s, def) {
    if (!s.puerta || def.calle || def.tesoro || def.mastil === false) return null;
    var p = s.puerta, y1 = p.y + 1;
    // (el mástil no atraviesa llaves, premios, palancas, teletransportes, trucos, objetos, medallas ni la salida secreta)
    var en = function (l, x, y, dos) { return (l || []).some(function (q) { var qx = q.x != null ? q.x : q[0], qy = q.y != null ? q.y : q[1]; return (qx === x || (dos && qx + 1 === x)) && (qy === y || (dos && qy + 1 === y)); }); };
    var teles = []; Object.keys(s.teles || {}).forEach(function (n) { teles = teles.concat(s.teles[n]); });
    var ocupada = function (x, y) {
      return en(s.llaves, x, y) || en(s.bonus, x, y) || en(s.palancas, x, y) || en(s.trucos, x, y) || en(s.objetos, x, y) || en(teles, x, y, true) ||
        en(def.medallas, x, y, true) || en(s.salidaSec ? [s.salidaSec] : [], x, y, true) || en(def.checkpoint ? [def.checkpoint] : [], x, y, true);
    };
    var arriba = function (x, yb, min) {
      if (x < 1 || x >= (s.ancho || ANCHO) - 1 || !s.mapa[yb + 1] || !PISABLE[s.mapa[yb + 1][x]]) return -1;
      var y = yb; while (y >= 1 && y > yb - 7 && s.mapa[y][x] === ' ' && !ocupada(x, y)) y--;
      return yb - y >= min ? y + 1 : -1;
    };
    var paso = function (x) { for (var c = Math.min(x, p.x + 1) + 1; c < Math.max(x, p.x); c++) if (MURO[s.mapa[y1][c]] || MURO[s.mapa[y1 - 1][c]]) return false; return true; };
    var OFF = [2, -1, 3, -2, 4, -3];
    for (var nivel = 0; nivel < 4; nivel++) for (var min = 4; min >= 2; min--) for (var i = 0; i < OFF.length; i++) {
      var x = p.x + (def.espejo ? 1 - OFF[i] : OFF[i]), yb = y1 - nivel;
      if (!paso(x)) continue;
      var y0 = arriba(x, yb, min); if (y0 >= 0) return { x: x, y0: y0, y1: yb };
    }
    return null;
  }
  function banderaPaso(j, s, w, ev) {
    var m = s.mastil; if (!m || s.banderaHecha || w.aire === 0 || s.tesoro || !puertaAbierta(s)) return;
    var ax = w.x * 8 + w.f * 2 + 1, px = m.x * 8 + 3;
    if (!(ax < px + 2 && px < ax + 8) || w.y + 16 <= m.y0 * 8 || w.y >= (m.y1 + 1) * 8) return;
    var alto = Math.max(0, (m.y1 + 1) * 8 - (w.y + 16)), pts = 100;
    for (var i = 0; i < BANDERA_PUNTOS.length; i++) if (alto >= BANDERA_PUNTOS[i][0]) { pts = BANDERA_PUNTOS[i][1]; break; }
    s.banderaHecha = true; s.banderaAlto = alto; s.banderaPts = pts;
    if (!j.revisita) sumar(j, pts, ev);
    ev.push('banderaPuerta');
  }
  // (15) ¿está encendida esta casilla de la pista de baile?
  function bailePisa(s, x, y) {
    for (var i = 0; i < s.baile.length; i++) { var z = s.baile[i]; if (y === z.y && x >= z.x1 && x <= z.x2 && faseRitmo(z, s.t) < z.on) return true; }
    return false;
  }
  // (12) la burbuja i: dónde está ahora y en qué vuelta va (null si ya la cogiste en esta vuelta o está fuera del agua)
  function posBurbuja(b, t) {
    var P = b[3] || 96, u = t + (b[4] || 0), q = ((u % P) + P) % P, ab = b[1] * 8, ar = b[2] * 8;
    return { x: b[0] * 8 + 1, y: Math.round(ab - q * (ab - ar) / P), vuelta: Math.floor(u / P) };
  }
  function burbujaViva(s, i, t) {
    var q = posBurbuja(s.burbujas[i], t);
    if (s.burbujaCog[i] === q.vuelta || (s.agua && q.y < nivelAgua(s, t))) return null;
    return q;
  }
  function burbujasPaso(j, s, w, ev) {
    if (!s.burbujas || !s.burbujas.length) return;
    var r = rectAg(w);
    s.burbujas.forEach(function (b, i) {
      var q = burbujaViva(s, i, s.t); if (!q || !solapa(r, { x: q.x, y: q.y, an: 6, al: 6 })) return;
      s.burbujaCog[i] = q.vuelta; w.respiro = RESPIRO;
      if (!s.calle && !s.tesoro) s.aire = Math.min(s.aireMax, s.aire + Math.round(s.aireMax * 0.1));
      ev.push('burbuja');
    });
  }
  // (29) LIANAS: el ángulo de la cuerda y el punto a `d` px del gancho
  function angLiana(L, t) {
    var P = L.periodo || 96, q = (((t + (L.fase || 0)) % P) + P) % P;
    return (L.inv ? -1 : 1) * (L.amp != null ? L.amp : 35) * Math.PI / 180 * Math.sin(2 * Math.PI * q / P);
  }
  function velLiana(L, t) { var P = L.periodo || 96, q = (((t + (L.fase || 0)) % P) + P) % P; return (L.inv ? -1 : 1) * Math.cos(2 * Math.PI * q / P); }
  function puntoLiana(L, t, d) { var a = angLiana(L, t); return { x: L.x + d * Math.sin(a), y: L.y + d * Math.cos(a) }; }
  function hayMuroEn(s, x, y) {
    var r = y >> 3, fs = (y & 7) ? [r, r + 1, r + 2] : [r, r + 1];
    return fs.some(function (f) { return MURO[celda(s, x, f)] || MURO[celda(s, x + 1, f)]; });
  }
  function colocaLiana(s, w) {
    var L = s.lianas[w.liana], q = puntoLiana(L, s.t, w.lianaD), nx = 2 * Math.round((q.x - 5) / 2), ny = Math.round(q.y - 2);
    var x = Math.floor(nx / 8), f = (nx - x * 8) >> 1;
    if (hayMuroEn(s, x, ny)) return false;
    w.x = x; w.f = f; w.y = ny; return true;
  }
  function agarraLiana(s, w, ev) {
    if (!s.lianas || !s.lianas.length || w.muerto || w.aire === 0 || w.lianaSuelta > 0 || w.liana != null) return;
    var ax = w.x * 8 + w.f * 2 + 5;
    for (var i = 0; i < s.lianas.length; i++) {
      var L = s.lianas[i], c = Math.cos(angLiana(L, s.t)); if (c < 0.3) continue;
      var d = (w.y + 2 - L.y) / c; if (d < 8 || d > (L.largo || 40)) continue;
      if (Math.abs(puntoLiana(L, s.t, d).x - ax) > 5) continue;
      var antes = { x: w.x, f: w.f, y: w.y };
      w.liana = i; w.lianaD = Math.round(d);
      if (!colocaLiana(s, w)) { w.liana = null; w.x = antes.x; w.f = antes.f; w.y = antes.y; continue; }
      w.salto = 0; w.jdir = 0; w.aire = 2; w.plat = -1; w.alto = false; w.rebote = false; w.coyote = 0; w.guarda = 0;
      ev.push('liana'); return;
    }
  }
  function sueltaLiana(w, salta, dir, ev, s) {
    w.liana = null; w.lianaSuelta = 12; w.y -= w.y & 3; w.salto = 0; w.alto = false; w.rebote = false;
    // (26-sep, arreglo) con los pies metidos en un suelo (la cuerda te deja a 4 px), te quedas ENCIMA: antes, al caer desde una
    // y que no era múltiplo de 8, nunca se posaba y atravesabas ese suelo (en el Club de Playa, hasta matarte de la caída).
    // Subir hasta la fila de 8 no mete la cabeza en nada nuevo: son las mismas filas que ya ocupaba.
    if (s && (w.y & 7)) { var rp = (w.y + 16) >> 3; if (PISABLE[celda(s, w.x, rp)] || PISABLE[celda(s, w.x + 1, rp)]) w.y -= w.y & 7; }
    if (salta) { w.aire = 1; w.jdir = dir; if (dir) w.dir = dir; ev.push('salto'); }
    else { w.aire = 2; w.jdir = 0; }
    ev.push('lianaSuelta');
  }
  function pasoLiana(s, w, inp, ev) {
    var L = s.lianas && s.lianas[w.liana], nueva = !!inp.saltar && !w.saltoAntes;
    w.saltoPrev = w.saltoAntes; w.saltoAntes = !!inp.saltar;
    if (!L) { w.liana = null; w.aire = 2; return finPaso(s, w, ev); }
    var d = (inp.der ? 1 : 0) - (inp.izq ? 1 : 0); if (d) w.dir = d;
    if (nueva) { sueltaLiana(w, true, d || (velLiana(L, s.t) >= 0 ? 1 : -1), ev, s); return finPaso(s, w, ev); }
    if (inp.abajo) {
      if (w.lianaD >= (L.largo || 40) && !w.abajoLiana) { sueltaLiana(w, false, 0, ev, s); return finPaso(s, w, ev); }
      w.lianaD = Math.min(L.largo || 40, w.lianaD + 2);
    }
    w.abajoLiana = !!inp.abajo;          // (26-sep, arreglo) mantener ABAJO en la punta no te suelta: hay que volver a pulsar
    if (!colocaLiana(s, w)) sueltaLiana(w, false, 0, ev, s); else w.aire = 2;
    return finPaso(s, w, ev);
  }
  // (80) la sala que CAMBIA con la palanca (ida y vuelta); `celdas` = las casillas que ocupa quien la pisa
  function cambiaSala(s, p, celdas, ev) {
    if (!p.orig) p.orig = p.celdas.map(function (c) { return s.mapa[c[1]][c[0]]; });
    var va = !p.movida, nuevas = p.celdas.map(function (c, i) { return va ? (c[2] != null ? c[2] : ' ') : p.orig[i]; });
    var mal = celdas.some(function (q) { for (var i = 0; i < p.celdas.length; i++) if (p.celdas[i][0] === q[0] && p.celdas[i][1] === q[1] && (MURO[nuevas[i]] || MORTAL[nuevas[i]])) return true; return false; });
    if (mal) { ev.push('cambiaNo'); return; }
    p.celdas.forEach(function (c, i) { s.mapa[c[1]][c[0]] = nuevas[i]; });
    p.movida = va; ev.push('palanca', 'cambia');
  }
  // (51) el IMÁN GIGANTE: ¿esta casilla está a su alcance?
  function imanGrande(s, x, y, cx, cy) { return s.imanG > 0 && Math.abs(x * 8 + 4 - cx) <= IMAN_G && Math.abs(y * 8 + 4 - cy) <= IMAN_G; }
  function traeIman(j, s, b, cx, cy) {
    if (!IMAN_TRAE[b.tipo] || !imanGrande(s, b.x, b.y, cx, cy)) return false;
    (j.imanTrae = j.imanTrae || []).push([b.x, b.y, b.tipo]); return true;
  }
  // (108) LANZAR un ladrillo (ABAJO): en arco hacia donde miras; 3 en el aire como mucho
  function lanza(j, s, w, ev) {
    if (!(w.ladrillos > 0) || (s.proyectiles || []).length >= 3) return false;
    w.ladrillos--;
    var d = w.dir < 0 ? -1 : 1;
    // (sube 12 px, vuelve a su altura a unas 10 casillas y sigue cayendo: a los bichos del suelo les da a 10-12 casillas)
    (s.proyectiles = s.proyectiles || []).push({ x: w.x * 8 + w.f * 2 + 5 + d * 4, y: w.y + 5, vx: 4 * d, vy: -2, t: 0 });
    ev.push('lanza'); return true;
  }
  function pasoProyectiles(j, s, ev) {
    if (!s.proyectiles || !s.proyectiles.length) return;
    s.proyectiles = s.proyectiles.filter(function (p) {
      p.t++; p.x += p.vx; p.y += p.vy; if (p.t % 4 === 0 && p.vy < 4) p.vy++;
      var cx = Math.floor(p.x / 8), cy = Math.floor(p.y / 8);
      if (p.x < 0 || p.y < 0 || cx >= (s.ancho || ANCHO) || cy >= (s.alto || ALTO) || p.t > 90) return false;
      var dio = null;
      s.enemigos.forEach(function (e) {
        if (dio || e.fuera || !mata(e) || e.tipo === 'c' || e.tipo === 'm' || e.tipo === 'g' || !SPR[e.spr]) return;   // (ni el Tasador, ni tu sombra, ni el gigante)
        var pe = posEnemigo(e), mk = mascara(e.spr, e.fr);
        if (p.x >= pe.x && p.x < pe.x + mk.ancho && p.y >= pe.y + mk.arriba && p.y < pe.y + mk.alto) dio = e;
      });
      if (dio) { dio.fuera = true; sumar(j, LADRILLO_PUNTOS, ev); ev.push('ladrilloGolpe'); sueltaLoSuyo(j, s, dio, ev); s.plof = { x: p.x, y: p.y, t: s.t }; return false; }
      var J0 = s.jefe;
      if (J0 && !J0.vencido && p.x >= J0.x && p.x < J0.x + J0.an && p.y >= J0.y && p.y < J0.y + J0.al) { ev.push('ladrilloJefe'); s.plof = { x: p.x, y: p.y, t: s.t }; return false; }
      var ch = celda(s, cx, cy);
      if (ch === 'U' && s.mapa[cy]) {
        var k = cx + ',' + cy; s.grietas[k] = (s.grietas[k] || 0) + 1;
        if (s.grietas[k] >= 3) { s.mapa[cy][cx] = ' '; s.rotos[k] = 1; delete s.grietas[k]; ev.push('rompe'); } else ev.push('grieta');
        return false;
      }
      if (MURO[ch] || PISABLE[ch]) { ev.push('ladrilloPlof'); s.plof = { x: p.x, y: p.y, t: s.t }; return false; }
      return true;
    });
  }
  // (109) la GENTE de la calle: pasea con su reloj (como el Generoso) y se para un rato cuando la tocas
  function genteAnda(e, t) {
    if (e.empuja > 0) e.empuja--;
    if (e.para > 0) { e.para--; e.fr = 0; return; }
    var L = Math.max(1, (e.max != null ? e.max : e.x) - (e.min != null ? e.min : e.x)), mn = e.min != null ? e.min : e.x, mx = mn + L;
    var P = 96 * Math.max(1, Math.round(L / 48)), h = P / 2;
    if (e.reloj == null) { e.lado = (e.dir || 1) < 0 ? -1 : 1; e.reloj = Math.round((e.lado > 0 ? e.x - mn : mx - e.x) * h / L); }
    e.reloj = (e.reloj + 1) % P;
    var u = e.reloj < h ? Math.round(L * e.reloj / h) : Math.round(L * (P - e.reloj) / h), nx = e.lado > 0 ? mn + u : mx - u;
    if (L <= 1) nx = e.x;
    if (nx !== e.x) e.dir = nx > e.x ? 1 : -1;
    e.x = nx; e.fr = (t >> 3) & 1;
  }
  function genteToca(j, s, w, e, ev) {
    j.gente = e.dice || 0;
    if (e.hace === 'molesta') {
      if (e.empuja > 0 || w.aire !== 0) return;
      var ca = w.x * 8 + w.f * 2 + 5, ce = centroE(e), d = ca > ce ? 1 : ca < ce ? -1 : (e.dir || 1);
      for (var i = 0; i < 4; i++) mover(s, w, d);
      e.empuja = 24; e.para = 12; ev.push('genteMolesta');
      return;
    }
    // (26-sep, arreglo) en la aventura, lo que ya te dio no vuelve a darlo al salir de la pantalla y volver (la calle se crea de
    // nuevo): se apunta en j.av.dado, como las puertas con regalo · y en la calle (donde el aire no se gasta) el aire son monedas
    var clave = j.av && s.calle ? 'gente:' + s.def.id + ':' + s.enemigos.indexOf(e) : '';
    if (e.dado || (clave && j.av.dado && j.av.dado[clave])) return;
    if (clave) (j.av.dado = j.av.dado || {})[clave] = 1;
    var rg = e.regalo || 'monedas'; if (rg === 'aire' && (s.calle || s.tesoro)) rg = 'monedas';
    e.dado = true; e.para = 24; j.genteRegalo = rg;
    if (rg === 'ladrillos') w.ladrillos = Math.min(LADRILLOS_MAX, (w.ladrillos || 0) + LADRILLOS);
    else if (rg === 'aire') s.aire = Math.min(s.aireMax, s.aire + Math.round(s.aireMax * 0.25));
    else if (rg === 'pista') ev.push('gentePista');
    else sumar(j, 100, ev);
    ev.push('genteAyuda');
  }
  // (39) el ascensor (de cristal o no) acaba de pararse contigo encima
  function dingAscensor(s, w, ev) {
    if (w.aire !== 0 || w.plat < 0 || s.sinPlataformas) return;
    var p = s.plataformas[w.plat]; if (!p || !p.espera) return;
    var a = posPlat(p, s.t - 1), b = posPlat(p, s.t), c = posPlat(p, s.t + 1);
    if ((a.x !== b.x || a.y !== b.y) && b.x === c.x && b.y === c.y) ev.push('ding');
  }
  // (49) el perro del cliente y (50) la mesa del notario: se tocan con cualquiera de las casillas del agente
  function perroPaso(s, celdas, ev) {
    var p = s.perroC; if (!p || p.sigue) return;
    if (enCelda(celdas, p.x, p.y) || enCelda(celdas, p.x + 1, p.y)) { p.sigue = true; ev.push('perroSigue'); }
  }
  function notarioEsta(n, t) { return !!n && faseRitmo(n, t) < n.esta; }
  function notarioPaso(j, s, celdas, ev) {
    var n = s.notario; if (!n || n.firmado) return;
    var toca = enCelda(celdas, n.x, n.y) || enCelda(celdas, n.x + 1, n.y);
    if (toca && notarioEsta(n, s.t)) { n.firmado = true; if (!j.revisita) sumar(j, FIRMA_PUNTOS, ev); ev.push('firma'); }
    else if (toca && !n.dentro) ev.push('notarioFuera');
    n.dentro = toca;
  }
  // lo de esta tanda que se mira en cada paso (tras coger lo que toca)
  function pendientesPaso(j, s, w, celdas, ev) {
    burbujasPaso(j, s, w, ev);
    perroPaso(s, celdas, ev);
    notarioPaso(j, s, celdas, ev);
    banderaPaso(j, s, w, ev);
  }

  return {
    ANCHO: ANCHO, ALTO: ALTO, SALTO: SALTO, CAIDA_MORTAL: CAIDA_MORTAL, AIRE: AIRE, DERRUMBE: DERRUMBE, RACHA: RACHA,
    AVATARES: ['agente', 'androide', 'agenta', 'turista', 'mago', 'astronauta', 'ninja', 'guerrero'], PUNTOS_LLAVE: PUNTOS_LLAVE, VIDA_EXTRA: VIDA_EXTRA, BONUS: BONUS, SPR: SPR, SALAS: SALAS, TESORO: TESORO, PISABLE: PISABLE, MURO: MURO, MORTAL: MORTAL,
    LETRA_BONUS: LETRA_BONUS, lee: lee, plano: plano, nuevaSala: nuevaSala, nuevoAgente: nuevoAgente, celda: celda, apoyo: apoyo, ocupa: ocupa,
    pasoAgente: pasoAgente, tocaPalanca: tocaPalanca, pasoEnemigos: pasoEnemigos, posEnemigo: posEnemigo, choca: choca, mascara: mascara,
    nuevaPartida: nuevaPartida, empezarSala: empezarSala, entrarTesoro: entrarTesoro, paso: paso, airePuntos: airePuntos,
    siguienteSala: siguienteSala, trasMorir: trasMorir, estrellas: estrellas, todosBonus: todosBonus, casaDelDia: casaDelDia,
    SALTO_ALTO: SALTO_ALTO, SALTO_LUNA: SALTO_LUNA, PODER: PODER, PROPINA: PROPINA, VISIBLES: VISIBLES, espejo: espejo, posPlat: posPlat, periodoPlat: periodoPlat,
    platDebajo: platDebajo, retoSemana: retoSemana, defDe: defDe, TESOROS: TESOROS, tesoroDe: tesoroDe, sumar: sumar, cambiaPack: cambiaPack, packActual: packActual, RETRO: RETRO,
    NUEVAS: NUEVAS, GALAXIA: GALAXIA, CALLES: CALLES, largoPrensa: largoPrensa, rayoEncendido: rayoEncendido, faseRitmo: faseRitmo, barraCierra: barraCierra, AVATARES_EXTRA: (EXTRA && EXTRA.AVATARES) || [], entrarTuberia: entrarTuberia, SALTO_TRAMP: SALTO_TRAMP, PISABLES_BICHO: PISABLES_BICHO, calle: calle, casaPorId: casaPorId, nuevaAventura: nuevaAventura, guardadoAventura: guardadoAventura,
    cambiaPantalla: cambiaPantalla, entrarCasa: entrarCasa, volverCalle: volverCalle, vendidasDe: vendidasDe, cuentaAv: cuentaAv, periodoSala: periodoSala, nivelAgua: nivelAgua, zonaDe: zonaDe, LLAVE_COLOR: LLAVE_COLOR, PUERTA_COLOR: PUERTA_COLOR,
    // (25-sep, secretos: PLAN-SECRETOS.md y MOTOR-SECRETOS-LISTO.md)
    aplicaTruco: aplicaTruco, llaveVisible: llaveVisible, entrarPasadizo: entrarPasadizo, extraAbierta: extraAbierta,
    puertaExiste: puertaExiste, secretosTotal: secretosTotal, irCalle: irCalle,
    // (25-sep, jefes y monstruos: PLAN-TANDA-JEFES.md)
    puertaAbierta: puertaAbierta, jefeDianas: jefeDianas, mata: mata, sigueRobot: sigueRobot, COMBO: COMBO, rectAg: rectAg, solapa: solapa,
    PUNTOS_JEFE: PUNTOS_JEFE, PUNTOS_GOLPE: PUNTOS_GOLPE, espejoJefe: espejoJefe,
    // (25-sep, modos y enganche: ideas 166, 167, 168, 177, 178, 179 y 182)
    cronoSemana: cronoSemana, desafioDia: desafioDia, DESAFIOS: DESAFIOS, cofreDelDia: cofreDelDia, COFRES: COFRES, regaloCofre: regaloCofre,
    FUEGO: FUEGO, MEJORA: MEJORA, MEJORA_MAX: MEJORA_MAX, poderDe: poderDe, multLlave: multLlave, SIN_MORIR_VIDA: SIN_MORIR_VIDA, PEQUES_INV: PEQUES_INV, sinExtras: sinExtras,
    // (25-sep, 2b «cosas de juegos buenos»: PLAN-TANDA-JEFES.md) modo moderno, mapa de jefes, mapa del mundo y atajos, salida
    // secreta, interruptor de monedas, botas de muelle y medallas de control
    COYOTE: COYOTE, GUARDA: GUARDA, JEFES: JEFES, PODER_JEFE: PODER_JEFE, mapaJefes: mapaJefes, mapaJefesAbierto: mapaJefesAbierto, irJefe: irJefe, jefeAbierto: jefeAbierto,
    mapaMundo: mapaMundo, SALIDA_SECRETA: SALIDA_SECRETA, MONEDAS_T: MONEDAS_T, tieneMuelle: tieneMuelle, daMuelle: daMuelle,
    // (26-sep, arreglos y TÚNELES SECRETOS: PLAN-TUNELES.md y VERIFICACION-JEFES.md)
    PROTEGE: PROTEGE, vendeCasa: vendeCasa, bajadaBajo: bajadaBajo, bajadaAbierta: bajadaAbierta, claveBajada: claveBajada, entrarBajada: entrarBajada,
    llegadaTunel: llegadaTunel, GENEROSO_GOLPES: GENEROSO_GOLPES, GENEROSO_PUNTOS: GENEROSO_PUNTOS, sueltaLoSuyo: sueltaLoSuyo,
    // (26-sep, tanda «pendientes de antes»: burbujas, baile, lianas, casa boca abajo, salas que cambian, imán gigante, ladrillos,
    // gente, ascensor de cristal, casco, perro del cliente, notario y bandera de la puerta)
    RESPIRO: RESPIRO, LADRILLOS: LADRILLOS, LADRILLOS_MAX: LADRILLOS_MAX, IMAN_G: IMAN_G, PERRO_PUNTOS: PERRO_PUNTOS, FIRMA_PUNTOS: FIRMA_PUNTOS,
    LADRILLO_PUNTOS: LADRILLO_PUNTOS, BANDERA_PUNTOS: BANDERA_PUNTOS, posBurbuja: posBurbuja, burbujaViva: burbujaViva, bailePisa: bailePisa,
    angLiana: angLiana, puntoLiana: puntoLiana, notarioEsta: notarioEsta, mastilDe: mastilDe, lanza: lanza, faseRitmoZ: faseRitmo,
    // (26-sep, P4 · PLAN-JUEGO-UNICO 3.0) la regla de cada mundo y las Botas del Doble Salto
    ordenMundos: ordenMundos, jefeDe: jefeDe, mundoDeJefe: mundoDeJefe, casaBotas: casaBotas, vallaAbiertaAv: vallaAbiertaAv, atajoAbierto: atajoAbierto,
    secretosMundo: secretosMundo, objetivoAv: objetivoAv, dobleSiempre: dobleSiempre, saleDe: saleDe,
    // (27-sep, P5) los actos: la vuelta a Nerja, de noche
    actoAbierto: actoAbierto, nocheVuelta: nocheVuelta, actoQueAbre: actoQueAbre, mundoDeActo: mundoDeActo, actosDeAntes: actosDeAntes
  };
})();
if (typeof module !== 'undefined') module.exports = MOTOR;
