/* ═══ LLAVES LOCAS · LAS 20 CASAS ═══
   Generado por _herramientas/mansion-escape-room-junta.js desde _herramientas/borradores/ (NO editar a mano: se edita el
   borrador y se vuelve a juntar). Formato y física: _herramientas/borradores/INSTRUCCIONES.md
   Comprobar: node _herramientas/mansion-escape-room-mapa.js [--enemigos] */
var LLAVES_CASAS = [
  {
    id: "jardin",
    nombre: "El Jardín de la Villa",
    tema: "jardin",
    carteles: [
      [5,14,"dCartelJardin"]
    ],
    trucos: [
      {"tipo":"cuadro","x":6,"y":13,"hace":"premio","premio":[4,13,"diamante"]}
    ],
    objetos: [
      {"x":30,"y":10,"tipo":"carta","id":2}
    ],
    huellasPista: [
      [22,9],
      [24,9],
      [26,11],
      [27,11]
    ],
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W       g  X     X   K         W",
      "W                              W",
      "W K                        d   W",
      "W   FFFFFFFFFCCCCFFFFFFFF FFFFFW",
      "W                             KW",
      "WBB               e       Eu   W",
      "WFFFFFF     K            FFFFFFW",
      "W                         E    W",
      "W       BB                E WWWW",
      "Wa   FFFFFFF  <<<<<<<<<<<<E Za W",
      "W                K        E Z rW",
      "WFFF     e                 IWWWW",
      "W @                          P W",
      "W        Y              BB     W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    premioFinal: [
      2,
      2,
      "diamante"
    ],
    sombras: [
      [28,10,30,11]
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":12,"fila":13,"min":11,"max":21,"dir":1},
      {"tipo":"h","spr":"pato","x":20,"fila":8,"min":14,"max":24,"dir":-1,"lento":true},
      {"tipo":"perro","spr":"perroGuardian","x":232,"y":24,"min":216,"max":232}
    ]
  },
  {
    id: "bodega",
    nombre: "La Bodega",
    tema: "bodega",
    trucos: [
      {"tipo":"paciente","x":25,"y":14,"hace":"premio","premio":[22,13,"diamante"]}
    ],
    fantasmas: [
      [30,8]
    ],
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W            X    K      X     W",
      "Wg                           P W",
      "W                              W",
      "W    FFFFFFFFFFFFFFFCCCCFFFFFFFW",
      "WBB p      K                   W",
      "WWWWF         b               rW",
      "W aZ          K                W",
      "Wv Z  BB       K              KW",
      "WWWWIFFFFCCCF   FFFFFFFFFFF    W",
      "Wa                             W",
      "W b  b                       BBW",
      "W      FFFFCCCCCFF>>>>>>>>>FFFFW",
      "WK                          @  W",
      "W   BB          X              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,7,2,8]
    ],
    enemigos: [
      {"tipo":"h","spr":"barril","x":8,"fila":13,"min":6,"max":10,"dir":1},
      {"tipo":"manso","hace":"timido","spr":"barril","x":200,"y":104,"min":176,"max":216,"premio":"rubi"},
      {"tipo":"h","spr":"rata","x":21,"fila":7,"min":20,"max":22,"dir":-1},
      {"tipo":"h","spr":"barril","x":6,"fila":7,"min":5,"max":7,"dir":1,"lento":true}
    ],
    dir: -1
  },
  {
    dibujos: {"T":"trampTendedero"},
    id: "azotea",
    nombre: "La Azotea",
    tema: "azotea",
    chimeneas: [
      [30,1,7]
    ],
    aire: 0.9,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W              d             gEW",
      "W                             EW",
      "Wa                            EW",
      "W  K        K      K        K EW",
      "W       X              X      EW",
      "W    FFFFFF          FFFFFF   EW",
      "W                             EW",
      "W BB                        BB W",
      "W FFFFFFF              FFFFFFWWW",
      "Wv             K   FFFF     Z aW",
      "W         BB        BB      Z rW",
      "W     FFFFFF        FFFFFF IWWWW",
      "W@             P             WWW",
      "W  BB                      BBWWW",
      "WFFFFFFFFFFFFTTFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [28,10,30,11]
    ],
    plataformas: [
      {"tipo":"nube","x":88,"y":48,"ancho":3,"eje":"h","min":88,"max":144,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":96,"y":30,"min":20,"max":96,"dy":2},
      {"tipo":"v","spr":"gaviota","x":136,"y":80,"min":20,"max":96,"dy":-3},
      {"tipo":"v","spr":"presidente","x":118,"y":8,"min":8,"max":56,"dy":1,"vecino":true,"minFinal":40,"dyFinal":2},
      {"tipo":"f","spr":"pelota","cols":[48,80],"y0":8,"yFin":40,"vel":2,"espera":32,"fase":0,"presi":2}
    ]
  },
  {
    id: "cala",
    nombre: "La Cala del Cangrejo",
    tema: "cala",
    mareaBaja: [
      [16,14,"diamante"]
    ],
    trucos: [
      {"tipo":"baldosa","x":27,"y":15,"dibujo":"baldosaX","hace":"monedas","celdas":[[26,11],[27,11],[28,11]]}
    ],
    huellasPista: [
      [5,8],
      [6,8],
      [7,8]
    ],
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                    b        aW",
      "W                  W    K    P W",
      "W                  W           W",
      "WK        FFFFFFFFFFFFFFFFFFFFFW",
      "W                           g  W",
      "WWWWGGGGG                      W",
      "W aZ                  K        W",
      "Wa Z     BB     K         BB   W",
      "WWWWIFFFFFFFCCCFFFF  GGGGGGGG  W",
      "Wr                            dW",
      "W e BB                         W",
      "W   FFFFFFF <<<<<<<<<<GGGGGG  KW",
      "W @                            W",
      "W                            BBW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":1,"y":2,"hace":"abre","celdas":[[19,2],[19,3]]},
      {"x":28,"y":8,"hace":"cae","celdas":[[13,4],[14,4]]}
    ],
    sombras: [
      [1,7,2,8]
    ],
    plataformas: [
      {"tipo":"cristal","x":232,"y":56,"ancho":2,"eje":"v","min":56,"max":88,"vel":1,"fase":0}
    ],
    agua: {"arriba":13,"abajo":16,"periodo":320,"fase":200},
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":6,"fila":13,"min":6,"max":13,"dir":1},
      {"tipo":"h","spr":"cangrejo","x":24,"fila":13,"min":16,"max":25,"dir":-1},
      {"tipo":"g","spr":"gigante","x":104,"y":16},
      {"tipo":"manso","hace":"concha","spr":"cangrejo","x":208,"y":104,"min":200,"max":216}
    ]
  },
  {
    pinta: [
      [10,15,"fondoPiscina"],
      [11,15,"fondoPiscina"],
      [12,15,"fondoPiscina"],
      [13,15,"fondoPiscina"],
      [14,15,"fondoPiscina"],
      [15,15,"fondoPiscina"],
      [16,15,"fondoPiscina"],
      [17,15,"fondoPiscina"],
      [18,15,"fondoPiscina"],
      [19,15,"fondoPiscina"],
      [20,15,"fondoPiscina"],
      [21,15,"fondoPiscina"]
    ],
    id: "piscina",
    nombre: "La Piscina Infinita",
    tema: "piscina",
    muelle: [
      [4,6,"diamante"]
    ],
    reflejo: {"x0":3,"y0":9,"x1":5,"y1":10,"px":4,"py":2},
    fantasmas: [
      [30,14]
    ],
    trucos: [
      {"tipo":"golpes","x":6,"y":9,"n":3,"hace":"abre","celdas":[[10,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14]]}
    ],
    aire: 1.2,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWW   K                     W",
      "Wh d Z           K           P W",
      "W  a Z l                       W",
      "WWWWWWIFFFFF   CCFF   FFFFFFFFFW",
      "W       K                  K   W",
      "W           FFF    FFF         W",
      "W                              W",
      "WFF>>>>>>>     K       FFFFF   W",
      "W                              W",
      "W         FFF  b  FFFF        aW",
      "Wg             r               W",
      "W    FFFF       e       FFFFF  W",
      "W@     j    o o o o o          W",
      "W  BB     YYYYYYYYYYYYBB      KW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,2,4,3]
    ],
    plataformas: [
      {"tipo":"cristal","x":80,"y":112,"ancho":3,"eje":"h","min":80,"max":128,"vel":2,"fase":0},
      {"tipo":"cristal","x":104,"y":112,"ancho":3,"eje":"h","min":104,"max":152,"vel":2,"fase":48}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":25,"fila":13,"min":24,"max":26,"dir":-1,"lento":true},
      {"tipo":"v","spr":"medusa","x":114,"y":88,"min":84,"max":104,"dy":2}
    ]
  },
  {
    id: "cuevas",
    nombre: "Las Cuevas de Nerja",
    tema: "cueva",
    crece: [
      {"x":16,"yBase":11,"alto":3,"periodo":96,"fase":0}
    ],
    trucos: [
      {"tipo":"orden","modo":"golpe","dibujo":"estalactitaNota","celdas":[[1,4,"do"],[3,4,"mi"],[5,4,"sol"]],"hace":"premio","premio":[2,7,"diamante"]}
    ],
    huellasPista: [
      [22,7],
      [23,7],
      [24,7],
      [25,7]
    ],
    aire: 2,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W K   X    X  K     X          W",
      "W@                      K      W",
      "W   l    K     e               W",
      "WGGGGG    GGCCCGG     CCCCGGGGGW",
      "W          X               WWWWW",
      "WK     GG         GGG      Z v W",
      "W            d             Za gW",
      "WFFFFF    FFCCCFF     FFFFIWWWWW",
      "Wr                             W",
      "W      GG          GGG        aW",
      "W         e                    W",
      "WGGGGG    FFFCCFF      GGGGGG  W",
      "W                   d        P W",
      "W      BB X   K      BB   X    W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [28,6,30,7]
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":18,"fila":13,"min":17,"max":19,"dir":1},
      {"tipo":"v","spr":"murcielago","x":136,"y":60,"min":36,"max":100,"dy":2,"duerme":true},
      {"tipo":"v","spr":"murcielago","x":72,"y":80,"min":48,"max":100,"dy":-2},
      {"tipo":"v","spr":"murcielago","x":200,"y":50,"min":40,"max":92,"dy":2},
      {"tipo":"h","spr":"rata","x":26,"fila":10,"min":26,"max":27,"dir":1,"lento":true}
    ]
  },
  {
    id: "frigiliana",
    nombre: "Frigiliana",
    tema: "pueblo",
    objetos: [
      {"x":24,"y":1,"tipo":"estatuilla","id":"nerja"},
      {"x":3,"y":13,"tipo":"azulejo"}
    ],
    trucos: [
      {"tipo":"objeto","x":26,"y":11,"obj":"azulejo","dibujo":"filaAzulejos","hace":"premio","premio":[24,10,"estrella"]}
    ],
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWW     R            W  W    W",
      "W d Zr    R  d     K   W  W    W",
      "Wa  Z b K R            WUUW    W",
      "WWWWWII   R                    W",
      "W        AR       Y          P W",
      "W    FFFFCCCCFFFFFFFFFFFFFF    W",
      "WK               K           BBW",
      "W               B          BBBBW",
      "W    F>>>>>>FFFFFFFFFFFFFFF   KW",
      "WBB       K     e     K        W",
      "WBBBB           *              W",
      "WWWWWFFFFFFCCCFFFF<<<<<<FFF    W",
      "W v Z  @                     BBW",
      "Wg aZ                Y  K  BBBBW",
      "WFFFFFFFFF>>>>>FFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,2,3,3],
      [1,13,3,14],
      [24,1,25,2]
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":12,"fila":13,"min":11,"max":16,"dir":1},
      {"tipo":"h","spr":"rata","x":5,"fila":10,"min":5,"max":6,"dir":-1},
      {"tipo":"h","spr":"gato","x":21,"fila":7,"min":20,"max":25,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":104,"y":60,"min":20,"max":100,"dy":2},
      {"tipo":"h","spr":"barril","x":24,"fila":4,"min":23,"max":25,"dir":-1,"lento":true}
    ]
  },
  {
    id: "puerto",
    nombre: "El Puerto Deportivo",
    clima: "lluvia",
    tema: "puerto",
    zarpa: {"propina":1000},
    muelle: [
      [23,6,"diamante"]
    ],
    objetos: [
      {"x":30,"y":4,"tipo":"carta","id":0}
    ],
    aire: 1.2,
    sombras: [
      [26,3,29,4]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                        WWWWWWW",
      "W        e    b          WWWWWWW",
      "W K                    K Z h gWW",
      "Wr                       Z  a WW",
      "W   i       K       FFFFIWWWWWWW",
      "WFFFFF                         W",
      "W                 BB           W",
      "W   FFFFFCCCFFFFF      K       W",
      "WFF     K         K            W",
      "W                             aW",
      "W FFFFFFFFFK                   W",
      "W             FFFFFFF<<<<<<<   W",
      "W@                        P    W",
      "W                            BBW",
      "WFFFFFFFFXXXFFFFFFFFFXXXFFFFFFFW"
    ],
    plataformas: [
      {"tipo":"cristal","x":48,"y":48,"ancho":3,"eje":"h","min":48,"max":136,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":15,"fila":13,"min":12,"max":19,"dir":1},
      {"tipo":"v","spr":"gaviota","x":92,"y":60,"min":56,"max":100,"dy":2},
      {"tipo":"h","spr":"pato","x":8,"fila":6,"min":5,"max":15,"dir":-1}
    ]
  },
  {
    id: "cocina",
    nombre: "La Cocina del Chef",
    tema: "cocina",
    muelle: [
      [24,6,"diamante"]
    ],
    trucos: [
      {"tipo":"alReves","hace":"premio","premio":[8,13,"diamante"]}
    ],
    pasadizos: [
      {"x":14,"y":2,"casa":"faro"}
    ],
    aire: 1.2,
    sombras: [
      [1,13,4,14],
      [1,1,5,2],
      [14,1,15,2]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W2  daW      W  W              W",
      "W   b W      W  W   1  r    K  W",
      "WWWWWWW    K WUUW              W",
      "W                  FFFFFFFFFFF W",
      "W K                            W",
      "W    FFFFFCCCFFFFF             W",
      "W         K                    W",
      "WFFF   2                e      W",
      "W                    K         W",
      "W     FFFFFFFFF               KW",
      "W              K               W",
      "WWWWWW           FFFFFFFFFFF   W",
      "W v ZP                  @  1   W",
      "Wa   Z   X                   BBW",
      "WWWWWWFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    rayos: [
      {"x1":21,"x2":21,"y1":11,"y2":11,"periodo":48,"encendido":24,"fase":0,"dibujo":"fuego"},
      {"x1":21,"x2":21,"y1":14,"y2":14,"periodo":48,"encendido":24,"fase":24,"dibujo":"fuego"}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":14,"fila":13,"min":11,"max":19,"dir":1},
      {"tipo":"suegra","spr":"suegra","x":72,"y":64,"min":56,"max":96},
      {"tipo":"v","spr":"polillaColibri","x":124,"y":60,"min":40,"max":96,"dy":2}
    ]
  },
  {
    id: "garaje",
    nombre: "El Garaje",
    tema: "garaje",
    objetos: [
      {"x":2,"y":4,"tipo":"cronometro"},
      {"x":25,"y":6,"tipo":"llaveInglesa"}
    ],
    trucos: [
      {"tipo":"objeto","x":5,"y":14,"obj":"llaveInglesa","dibujo":"cocheCapo","hace":"monedas","celdas":[[8,13],[9,13],[10,13],[11,13]]}
    ],
    meta: {"x":1,"y":13},
    aire: 1.2,
    sombras: [
      [1,3,5,4]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWWW                        W",
      "WWWWWWW       K        d   a   W",
      "W h   Z                        W",
      "Wa  g Z                        W",
      "WWWWWWWIFFFFFFFFFFFFFF        KW",
      "W                              W",
      "W              K      b FFFFFFFW",
      "W                   K          W",
      "WK                    B        W",
      "W           >>>>>>FFFF         W",
      "W           a             WWWWWW",
      "WFFFFFFFF    K          FFW    W",
      "W @                       WP  KW",
      "W        BB     e         W    W",
      "WFFFFFFFFFFF  FFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":8,"y":4,"hace":"abre","celdas":[[26,13],[26,14]]}
    ],
    plataformas: [
      {"tipo":"cristal","x":176,"y":112,"ancho":2,"eje":"v","min":40,"max":112,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cocheRojo","x":20,"fila":14,"min":15,"max":24,"dir":-1,"espera":24,"fase":0,"aviso":16},
      {"tipo":"h","spr":"robot","x":19,"fila":8,"min":18,"max":20,"dir":1},
      {"tipo":"h","spr":"furgoneta","x":3,"fila":11,"min":2,"max":7,"dir":1,"lento":true}
    ]
  },
  {
    id: "faro",
    nombre: "El Faro",
    clima: "lluvia",
    tema: "faro",
    rachas: [
      {"zona":[16,1,27,4],"sentido":-1,"periodo":96,"on":16,"fase":40,"sonido":"sirena"}
    ],
    muelle: [
      [3,7,"diamante"]
    ],
    trucos: [
      {"tipo":"cuadro","x":6,"y":11,"hace":"premio","premio":[8,11,"diamante"]}
    ],
    aire: 1.2,
    oscuro: true,
    faro: [
      3,
      1
    ],
    lamparas: [
      [6,3],
      [14,5],
      [22,7],
      [15,9],
      [6,11],
      [27,12]
    ],
    sombras: [
      [28,7,30,8]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                    d         W",
      "W       K      e            u  W",
      "WP                             W",
      "W            K                 W",
      "WFFFFFFFFF                     W",
      "W                    K     WWWWW",
      "W           FFCCFF         Z g W",
      "W              K           Z vaW",
      "W                   FFFFFIIWWWWW",
      "W K                           KW",
      "W           >>>>>>             W",
      "W           K         a        W",
      "W   FFFFFF             l  @    W",
      "W           Y       Y        BBW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    plataformas: [
      {"tipo":"cristal","x":80,"y":104,"ancho":2,"eje":"v","min":40,"max":104,"vel":2,"fase":0},
      {"tipo":"nube","x":96,"y":24,"ancho":3,"eje":"h","min":96,"max":160,"vel":2,"fase":0},
      {"tipo":"nube","x":144,"y":40,"ancho":3,"eje":"h","min":144,"max":208,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":15,"fila":13,"min":13,"max":18,"dir":1},
      {"tipo":"v","spr":"gaviota","x":144,"y":70,"min":48,"max":104,"dy":2},
      {"tipo":"v","spr":"murcielago","x":48,"y":64,"min":48,"max":80,"dy":-2}
    ]
  },
  {
    id: "obra",
    nombre: "La Obra Nueva",
    clima: "levante",
    tema: "obra",
    objetos: [
      {"x":29,"y":13,"tipo":"carta","id":1}
    ],
    pintadas: [
      {"x":2,"y":11,"k":5},
      {"x":2,"y":7,"k":4},
      {"x":1,"y":4,"k":0}
    ],
    aire: 1,
    sombras: [
      [26,12,30,14]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "Wr *    e               W     KW",
      "W    K       X  b       W      W",
      "WFFFFF RRR              W  P   W",
      "W           K  AAA   a  W      W",
      "W                 BBBBBBWFFFFFFW",
      "WFFFFFF   <<<<                 W",
      "W             BB            K  W",
      "W      BB     BB               W",
      "W  FFFFFFFOOFFFF  FFFFFFFWWWWWWW",
      "WK                   K   WWWWWWW",
      "W                        WWWWWWW",
      "WFFFFFFF  >>>>>>  CCFFCC Z     W",
      "W @         K   BB       Z  g  W",
      "W               BB  XX   Z    aW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    plataformas: [
      {"tipo":"cristal","x":128,"y":104,"ancho":2,"eje":"v","min":56,"max":104,"vel":1,"fase":0}
    ],
    palancas: [
      {"x":2,"y":3,"hace":"abre","celdas":[[24,2],[24,3],[24,4]]},
      {"x":13,"y":11,"hace":"cae","celdas":[[20,9]]},
      {"x":27,"y":14,"hace":"apaga"}
    ],
    prensas: [
      {"x":6,"arriba":12,"abajo":13,"periodo":48,"fase":0}
    ],
    rachas: [
      {"zona":[19,1,30,4],"sentido":-1,"periodo":96,"on":64,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":10,"fila":13,"min":9,"max":14,"dir":1},
      {"tipo":"h","spr":"termitas","x":9,"fila":8,"min":9,"max":10,"dir":1,"lento":true,"come":"madera"},
      {"tipo":"h","spr":"barril","x":19,"fila":10,"min":18,"max":22,"dir":1},
      {"tipo":"h","spr":"robot","x":26,"fila":7,"min":25,"max":28,"dir":1,"lento":true},
      {"tipo":"g","spr":"gigante","x":160,"y":56}
    ]
  },
  {
    id: "mercadillo",
    nombre: "El Mercadillo",
    tema: "mercado",
    palancas: [
      {"x":4,"y":13,"hace":"crea","paga":150,"celdas":[[9,9],[10,9]]}
    ],
    muelle: [
      [2,6,"diamante"]
    ],
    trucos: [
      {"tipo":"cuadro","x":6,"y":13,"hace":"premio","premio":[8,13,"diamante"]}
    ],
    aire: 1.2,
    sombras: [
      [1,1,2,3]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "Wa Z                           W",
      "Wh Z   K       P          1 K  W",
      "W gZIFFFF     F  F        F  FFW",
      "WWWW           FF  K       FF  W",
      "WWWW   e                       W",
      "W   FFFFFF  FFF  FFF  <<<<<  <<W",
      "WK                      b     KW",
      "W                              W",
      "W>>>>>>>>  FFFFFFFFFF  CCCFFFCCW",
      "Wa   2      K        2         W",
      "W                              W",
      "WFFFFFF i CCCCCC    FFFFFF     W",
      "W @               K     1     rW",
      "W       BB                 X   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":12,"fila":13,"min":11,"max":19,"dir":1},
      {"tipo":"h","spr":"rata","x":18,"fila":7,"min":15,"max":19,"dir":-1},
      {"tipo":"h","spr":"barril","x":13,"fila":4,"min":12,"max":18,"dir":1},
      {"tipo":"v","spr":"gaviota","x":168,"y":40,"min":16,"max":100,"dy":2},
      {"tipo":"h","spr":"moroso","x":22,"fila":10,"min":20,"max":24,"dir":1,"lento":true,"roba":150}
    ]
  },
  {
    id: "yate",
    nombre: "El Yate",
    tema: "yate",
    objetos: [
      {"x":23,"y":14,"tipo":"gafas"}
    ],
    aire: 1,
    sombras: [
      [23,13,24,14]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W e         K  X   K           W",
      "W              X          d    W",
      "W       a  FFFFFFFFFF K        W",
      "W                    u         W",
      "W       F            FF        W",
      "W            K                KW",
      "W        BB         BB         W",
      "W      FFFF>>>>FFCCCCFF  F  FFFW",
      "W  @            r              W",
      "WK   BB                BB      W",
      "W  FFFFFFF  FFFFFFFFFFFFFW    bW",
      "WFFW P           K    Zg W     W",
      "W  W           X      Z aW     W",
      "WYYWFFFFFFFFFFFFFFFFFFFFFWYYYYYW"
    ],
    plataformas: [
      {"tipo":"nube","x":16,"y":32,"ancho":2,"eje":"h","min":16,"max":44,"vel":2,"fase":0},
      {"tipo":"nube","x":176,"y":40,"ancho":2,"eje":"h","min":176,"max":232,"vel":2,"fase":0},
      {"tipo":"cristal","x":208,"y":104,"ancho":2,"eje":"h","min":208,"max":224,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":14,"fila":10,"min":12,"max":17,"dir":1},
      {"tipo":"h","spr":"rata","x":17,"fila":7,"min":15,"max":18,"dir":-1,"lento":true},
      {"tipo":"v","spr":"gaviota","x":224,"y":20,"min":8,"max":64,"dy":2},
      {"tipo":"v","spr":"medusa","x":8,"y":100,"min":64,"max":120,"dy":1},
      {"tipo":"a","spr":"gaviota","x":8,"y":8,"min":8,"max":8,"baja":16,"aviso":12},
      {"tipo":"a","spr":"gaviota","x":232,"y":8,"min":232,"max":232,"baja":16,"aviso":12,"unaVez":true},
      {"tipo":"cofre","spr":"cofreTrampa","x":160,"y":104,"min":160,"max":160}
    ]
  },
  {
    id: "sierra",
    nombre: "La Sierra de Almijara",
    clima: "niebla",
    tema: "sierra",
    muelle: [
      [8,1,"diamante"]
    ],
    trucos: [
      {"tipo":"baldosa","x":1,"y":13,"dibujo":"brocal","hace":"monedas","celdas":[[2,10],[3,10],[4,10]]}
    ],
    aire: 2,
    sombras: [
      [29,6,30,8]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W            K                 W",
      "W                            d W",
      "W  d   a       P               W",
      "W                           WWWW",
      "W GGG   K     GGGG     K    WWWW",
      "W                           Z  W",
      "WK      FCC          CCF    Z vW",
      "W                       K  IZa W",
      "WFFFFF                     GGGGW",
      "W              K              gW",
      "W  @ j K FFFF      FFFF    K   W",
      "W         h   BBBB             W",
      "WFFFFF        BBBB        GGGZZW",
      "WBBBBB        BBBB        BB  bW",
      "WBBBBBYYYYYYYYBBBBYYYYYYYYBBHHHW"
    ],
    plataformas: [
      {"tipo":"nube","x":88,"y":64,"ancho":3,"eje":"h","min":88,"max":136,"vel":2,"fase":0},
      {"tipo":"nube","x":192,"y":56,"ancho":2,"eje":"v","min":32,"max":56,"vel":1,"fase":0}
    ],
    enemigos: [
      {"tipo":"v","spr":"murcielago","x":40,"y":40,"min":24,"max":100,"dy":2},
      {"tipo":"v","spr":"murcielago","x":200,"y":80,"min":30,"max":90,"dy":-2},
      {"tipo":"h","spr":"gato","x":9,"fila":9,"min":9,"max":11,"dir":1},
      {"tipo":"h","spr":"rata","x":21,"fila":9,"min":19,"max":21,"dir":-1},
      {"tipo":"p","spr":"cabra","x":112,"y":80,"min":112,"max":136,"vel":1,"alto":16,"bote":24,"fase":0}
    ]
  },
  {
    id: "acueducto",
    nombre: "El Acueducto del Águila",
    tema: "acueducto",
    muelle: [
      [8,1,"diamante"]
    ],
    trucos: [
      {"tipo":"paciente","x":3,"y":12,"hace":"premio","premio":[4,12,"diamante"]}
    ],
    aire: 1.1,
    sombras: [
      [24,10,25,12]
    ],
    cascada: [
      [10,8,12,13]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W     d              K         W",
      "W  K       K               a   W",
      "W2             K               W",
      "W                              W",
      "WFFF  FFFF   F  FCCFF   FFFFF  W",
      "W     WW        WW K   WWWW   KW",
      "WK  FFWW      FFWW   FFWWWW    W",
      "W     WWr  GG   WW     Z  W  FFW",
      "WFF   WW e      WW>>>  Za W    W",
      "W     WWGG    GGWW    bZ gWGG  W",
      "W@  FFWW2   K 1 WW   FIWWWW1 P W",
      "W   FFWW  XXXX  WW XXX WWWW    W",
      "WFFFFFFFFFFFFFFFFFFF   FFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":84,"y":30,"min":24,"max":72,"dy":2},
      {"tipo":"v","spr":"murcielago","x":152,"y":50,"min":36,"max":84,"dy":1},
      {"tipo":"h","spr":"gato","x":14,"fila":5,"min":13,"max":19,"dir":1},
      {"tipo":"h","spr":"rata","x":27,"fila":13,"min":26,"max":29,"dir":-1,"lento":true}
    ]
  },
  {
    dibujos: {"E":"escEnredadera"},
    id: "invernadero",
    nombre: "El Invernadero",
    tema: "invernadero",
    muelle: [
      [2,1,"diamante"]
    ],
    trucos: [
      {"tipo":"alReves","hace":"premio","premio":[3,5,"diamante"]},
      {"tipo":"objeto","x":2,"y":6,"obj":"regadera","dibujo":"macetaGrande","hace":"crea","pone":"E","celdas":[[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]]},
      {"tipo":"objeto","x":2,"y":6,"obj":"regadera","dibujo":"macetaGrande","hace":"premio","premio":[2,1,"vida"]}
    ],
    objetos: [
      {"x":29,"y":12,"tipo":"regadera"}
    ],
    haz: [
      [9,1,10,6],
      [14,1,15,6]
    ],
    aire: 2,
    sombras: [
      [29,10,30,12]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "WK          K   d           K  W",
      "W                              W",
      "W      K        K    P         W",
      "W          Y       *         Y W",
      "WFFF     FF   F     FFFFF      W",
      "W     Y                        W",
      "W K FFFFF        F  K    <<<WWWW",
      "We           Y       R      ZgaW",
      "WFFF     >>>    > F      a  Z  W",
      "W             e   b         Z hW",
      "W@  <<<<<       AAA         WWWW",
      "W   i * Y    K   Y      Y   WWWW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":10,"fila":13,"min":9,"max":15,"dir":1,"lento":true},
      {"tipo":"v","spr":"arañita","x":64,"y":40,"min":36,"max":96,"dy":1},
      {"tipo":"v","spr":"arañaPavo","x":176,"y":90,"min":24,"max":100,"dy":-1},
      {"tipo":"h","spr":"rata","x":23,"fila":5,"min":20,"max":22,"dir":1,"lento":true}
    ]
  },
  {
    id: "balcon",
    nombre: "El Balcón de Europa",
    clima: "levante",
    tema: "balcon",
    trucos: [
      {"tipo":"baldosa","x":25,"y":5,"hace":"premio","premio":[29,4,"rubi"]}
    ],
    rachas: [
      {"zona":[21,1,30,4],"sentido":-1,"periodo":80,"on":48,"fase":0,"manga":[22,4]}
    ],
    aire: 1.5,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "Wa           WWWWWW            W",
      "W            W    W            W",
      "W K          W P  W   u    K   W",
      "W            W    W            W",
      "W  FFFFFFFFFFWWWWWW   FFFFFFFFFW",
      "W              K           WWWWW",
      "WFF                FF      Z h W",
      "W  K                       Za gW",
      "W  FFFFFFFF  <<<<<<  FFFFFIWWWWW",
      "W                              W",
      "W@    K    FF    FFr           W",
      "W              d      b       KW",
      "WWWWW   BB               WWWWWWW",
      "WWWWW   BB               WWWWWWW",
      "WWWWWYYYBBYYYYYYYYYYYYYYYWWWWWWW"
    ],
    sombras: [
      [28,7,30,8]
    ],
    plataformas: [
      {"tipo":"nube","x":80,"y":104,"ancho":3,"eje":"h","min":80,"max":136,"vel":2,"fase":0},
      {"tipo":"nube","x":144,"y":104,"ancho":3,"eje":"h","min":144,"max":176,"vel":2,"fase":0}
    ],
    palancas: [
      {"x":30,"y":2,"hace":"abre","celdas":[[13,3],[13,4]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":7,"fila":7,"min":6,"max":8,"dir":1},
      {"tipo":"v","spr":"gaviota","x":116,"y":80,"min":72,"max":104,"dy":2},
      {"tipo":"v","spr":"gaviota","x":168,"y":90,"min":80,"max":104,"dy":-3},
      {"tipo":"h","spr":"gato","x":24,"fila":7,"min":24,"max":25,"dir":1,"lento":true}
    ]
  },
  {
    id: "sanjuan",
    nombre: "La Noche de San Juan",
    clima: "fuegos",
    tema: "sanjuan",
    oscuro: true,
    trucos: [
      {"tipo":"baldosa","x":24,"y":11,"hace":"monedas","celdas":[[21,9],[22,9],[23,9]]},
      {"tipo":"encima","x":13,"y":14,"n":3,"hace":"premio","premio":[14,13,"diamante"]},
      {"tipo":"saltaBicho","a":6,"n":7,"hace":"premio","premio":[22,12,"diamante"]}
    ],
    aire: 1.5,
    sombras: [
      [29,12,30,14]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W               g              W",
      "W                              W",
      "W K          K        K        W",
      "W               X            K W",
      "W      FFF     FFF             W",
      "W                              W",
      "WFFFF     K CCC    FFFF   FFF  W",
      "WFFF     X  F                  W",
      "WFFF   FFFFFF  FFFF       P    W",
      "W          FF                  W",
      "W K FFF    FFF   K  FFFFFFFFWWWW",
      "W                           Z aW",
      "W@FF    FFF K  <<<<     r   Z  W",
      "W Fel X FbF  X FdFFX        Z vW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    lamparas: [
      [8,4],
      [20,6],
      [16,10],
      [25,2]
    ],
    palancas: [
      {"x":5,"y":13,"hace":"luz"}
    ],
    plataformas: [
      {"tipo":"nube","x":152,"y":96,"ancho":2,"eje":"h","min":152,"max":200,"vel":2,"fase":0},
      {"tipo":"nube","x":40,"y":48,"ancho":2,"eje":"h","min":40,"max":88,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":14,"fila":13,"min":14,"max":17,"dir":1},
      {"tipo":"v","spr":"gaviota","x":176,"y":30,"min":16,"max":80,"dy":2},
      {"tipo":"v","spr":"murcielago","x":60,"y":40,"min":24,"max":64,"dy":1},
      {"tipo":"h","spr":"pato","x":19,"fila":5,"min":19,"max":21,"dir":1},
      {"tipo":"v","spr":"presidente","x":210,"y":16,"min":16,"max":80,"dy":1,"vecino":true,"minFinal":40,"dyFinal":2},
      {"tipo":"dueno","spr":"fantasmaDueno","x":232,"y":64,"k":3},
      {"tipo":"manso","hace":"empuja","spr":"cocheRojo","x":176,"y":112,"min":176,"max":200,"dir":1,"fuerza":3}
    ]
  },
  {
    dibujos: {"E":"escLibros"},
    id: "granvilla",
    nombre: "La Gran Villa Stela Mare",
    tema: "villa",
    ancho: 64,
    alto: 32,
    aire: 2,
    trucos: [
      {"tipo":"cuadro","x":10,"y":23,"hace":"premio","premio":[8,23,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                                                              W",
      "W                                                              W",
      "WWWWW               K                 a                e       W",
      "W   W                                         K                W",
      "W   Z                            BB               u         P  W",
      "Wda Z                     X      BB       X                    W",
      "WFFFFFFF      FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW",
      "WFFFF                                                  W      dW",
      "WWWWW   FFF                                            W     RRW",
      "W   W             K                                    W       W",
      "W   Z      FFF                      1                  A K     W",
      "Wdg Z      FFF                                         A   *   W",
      "WFFFFFFFFFFFFFFFCCCCFFFFFFFF<<<<<<<FFFFFFFFF      FFFFFFFFFFFFFW",
      "W                                                         FFFFFW",
      "W                           K               FFF           WWWWWW",
      "W                                                         W    W",
      "W  K                  FFFFFF                   FFF        Z    W",
      "W                   XXFFFFFF                   FFF        Z  vdW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF      FFFFFFFFFFFFFFFFFFFFW",
      "W                                          W         FFFF      W",
      "W     K                       b      FFF   W      K  FFFF      W",
      "W           r                      K       W                   W",
      "W                                       FFFW     CCCC          W",
      "W                                       FFFW  b        K       W",
      "WFFFFFFFFFFFFFFF      FFFFFFFFFF>>>>>FFFFFFW         FFFF      W",
      "W                                          W                  aW",
      "W    e   K      FFF      K            K    W     FFFF     WWWWWW",
      "W                                          W              W    W",
      "W @                FFF1                    W         FFFF Z    W",
      "W       j          FFF   Y    BB           W         FFFF Z  hdW",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
    ],
    sombras: [
      [1,4,4,6],
      [1,10,4,12],
      [58,16,62,18],
      [58,28,62,30]
    ],
    plataformas: [
      {"tipo":"nube","x":72,"y":56,"ancho":2,"eje":"h","min":72,"max":88,"vel":2,"fase":0},
      {"tipo":"cristal","x":360,"y":232,"ancho":2,"eje":"v","min":216,"max":232,"vel":2,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":6,"fila":29,"min":5,"max":12,"dir":1},
      {"tipo":"h","spr":"cangrejo","x":36,"fila":29,"min":34,"max":41,"dir":-1},
      {"tipo":"h","spr":"pato","x":26,"fila":23,"min":25,"max":30,"dir":1},
      {"tipo":"h","spr":"barril","x":45,"fila":29,"min":44,"max":51,"dir":1},
      {"tipo":"h","spr":"gato","x":8,"fila":17,"min":5,"max":12,"dir":1},
      {"tipo":"v","spr":"murcielago","x":376,"y":170,"min":160,"max":224,"dy":2},
      {"tipo":"v","spr":"medusa","x":240,"y":110,"min":104,"max":136,"dy":2},
      {"tipo":"v","spr":"gaviota","x":304,"y":20,"min":8,"max":40,"dy":2},
      {"tipo":"g","spr":"gigante","x":192,"y":88},
      {"tipo":"v","spr":"presidente","x":448,"y":16,"min":8,"max":32,"dy":2,"vecino":true,"minFinal":16,"dyFinal":2},
      {"tipo":"c","spr":"tasador","x":16,"y":216,"vel":1}
    ],
    palancas: [
      {"x":2,"y":23,"hace":"abre","celdas":[[43,29],[43,30]]},
      {"x":40,"y":12,"hace":"cae","celdas":[[24,13],[25,13]]},
      {"x":16,"y":15,"golpe":true,"dibujo":"libroPalanca","hace":"crea","pone":"E","celdas":[[15,13],[15,14],[15,15],[15,16],[15,17],[15,18]]},
      {"x":28,"y":24,"hace":"para","a":{"tipo":"c","cols":[22,26],"bajoDe":20},"pasos":75,"unaVez":true,"dibujo":"lampara"}
    ],
    checkpoint: [
      32,
      17
    ]
  }
];
/* Las salas de bonus (la Sala del Tesoro y sus hermanas): cada casa lleva a una */
var LLAVES_TESOROS = [
  {
    id: "tesoro",
    nombre: "La Sala del Tesoro",
    tema: "tesoro",
    tesoro: true,
    aire: 0.3,
    enemigos: [
      {"tipo":"a","spr":"murcielago","x":184,"y":8,"min":168,"max":200,"vel":1,"baja":24}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W1                  Z          W",
      "W               b   Z  o  o  o W",
      "WWW   o   o   b   b Z     d    W",
      "W                   Z      dd1 W",
      "W    o o o o o o o  W d        W",
      "W  FFFFFFFFFF>>>>>>FWWWWWWWWWWWW",
      "W o  o o o            o o o  o W",
      "WBB            ee              W",
      "WFFFFCCCFFF          FFFCCCFFFFW",
      "W                              W",
      "W           BBooooBB           W",
      "W          FFFFFFFFFF          W",
      "W@ o o     o o o o o      o o  W",
      "W       BB            BB       W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [21,1,30,5]
    ],
    hazDibujo: "rojo",
    haz: [
      [15,13,16,14],
      [15,7,16,8]
    ]
  },
  {
    id: "cielo",
    nombre: "El Cielo de Oro",
    tema: "cielo",
    tesoro: true,
    aire: 0.3,
    enemigos: [

    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                       W      W",
      "W                       W o  o W",
      "W                       Z   d  W",
      "W              d        Zo  e oW",
      "W             o o       WWWWWWWW",
      "W b         o     o          e W",
      "W o        B o     B         o W",
      "W              o               W",
      "W o    o                o    o W",
      "W        o  o      o  o        W",
      "WFFFF      FFFFFFFFFF      FFFFW",
      "W    o  o              o       W",
      "W              @               W",
      "W     o  o    o  o    o  o     W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    plataformas: [
      {"tipo":"nube","x":40,"y":104,"ancho":3,"eje":"h","min":40,"max":64,"vel":2,"fase":0},
      {"tipo":"nube","x":168,"y":104,"ancho":3,"eje":"h","min":168,"max":192,"vel":2,"fase":12},
      {"tipo":"nube","x":40,"y":88,"ancho":3,"eje":"h","min":40,"max":64,"vel":2,"fase":12},
      {"tipo":"nube","x":168,"y":88,"ancho":3,"eje":"h","min":168,"max":192,"vel":2,"fase":0},
      {"tipo":"nube","x":96,"y":72,"ancho":3,"eje":"h","min":96,"max":128,"vel":2,"fase":0}
    ],
    palancas: [
      {"x":19,"y":7,"golpe":true,"hace":"crea","pone":"F","celdas":[[21,9],[22,9],[23,9]]},
      {"x":11,"y":7,"golpe":true,"hace":"crea","pone":"F","celdas":[[16,7],[17,7],[18,7],[19,5],[20,5],[21,5],[22,5],[23,5]]}
    ],
    sombras: [
      [25,1,30,4]
    ]
  },
  {
    id: "cristal",
    nombre: "La Cueva de Cristal",
    tema: "cristal",
    tesoro: true,
    aire: 0.3,
    enemigos: [

    ],
    trucos: [
      {"tipo":"orden","modo":"pisa","dibujo":"cristalNota","celdas":[[3,13,0],[9,13,4],[21,13,7],[27,13,12]],"hace":"premio","premio":[2,12,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                          W   W",
      "W              o           W o W",
      "W             o oo         We  W",
      "W            e    e        W   W",
      "W           o  o    o      Zd dW",
      "W             o  o      o  Za oW",
      "W       o  o   GG  o   GGGGWWWWW",
      "W         o    WW    o         W",
      "W  o   o   GG  WW  GG  o    o  W",
      "W     o    WWd WW dWW    o     W",
      "W   o  GG  WWGGWWGGWW  GG  o  oW",
      "W      WW bWWWWWWWWWWb WW      W",
      "W@oGG  WWGGWWWWWWWWWWGGWW  GGo W",
      "W  WWe WWWWWWWWWWWWWWWWWW eWW  W",
      "WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW"
    ],
    sombras: [
      [28,1,30,6]
    ]
  },
  {
    id: "casino",
    nombre: "El Casino de las Cintas",
    tema: "casino",
    tesoro: true,
    aire: 0.15,
    enemigos: [

    ],
    tragaperras: {"rodillos":[[25,8],[27,8],[29,8]],"premio":3000,"par":300},
    valeFila: {"2":1000,"4":500,"7":200,"10":200},
    oscuro: true,
    lamparas: [
      [1,1],
      [30,1],
      [7,10],
      [30,10]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                          Wa  W",
      "W           o  B  d     o  W   W",
      "W                          Wb  W",
      "W         o  o  o  o  o  o W   W",
      "W                          W o W",
      "W       <<<<<<<<<<<<<<<<<FFFFFFW",
      "W  o     o  o  o  o            W",
      "W    o       o       FF  B B B W",
      "WWWWWWF>>>>>>>>>>>>>>>>        W",
      "W    W     o  o  o  o          W",
      "W   aW  FF  o   o         o    W",
      "W    W  <<<<<<<<<<<<<<<<FFFFFFFW",
      "W    Z@      o     o           W",
      "WBB  Z   o  o  o  o  o  o   BB W",
      "WFFFFFFFF>>>>>>>>>>>>>>>>>>FFFFW"
    ],
    palancas: [
      {"x":1,"y":12,"hace":"luz"},
      {"x":25,"y":3,"hace":"abre","reversible":true,"celdas":[[27,4],[27,5]]}
    ],
    sombras: [
      [1,10,4,14],
      [28,1,30,5]
    ],
    trucos: [
      {"tipo":"golpes","x":15,"y":2,"n":3,"hace":"monedas","celdas":[[12,5],[13,5],[14,5],[16,5],[17,5],[18,5],[13,3],[17,3]]}
    ]
  },
  {
    id: "portales",
    nombre: "El Laberinto de Portales",
    tema: "portales",
    tesoro: true,
    aire: 0.3,
    oscuro: true,
    enemigos: [
      {"tipo":"a","spr":"murcielago","x":32,"y":64,"min":16,"max":56,"vel":1,"baja":32},
      {"tipo":"a","spr":"murcielago","x":200,"y":8,"min":184,"max":224,"vel":1,"baja":24}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W         W     Z    W         W",
      "W         W     Z    W         W",
      "W   d o o W o   Z e oW  o  o   W",
      "W         W     WWWWWW   e     W",
      "W b o  o  Z o  o o 4 W4    o 3 W",
      "W         Z  FF      W   BB    W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W         W          W         W",
      "W         W          W         W",
      "W         W    oo    W  o      W",
      "W   o o   W   o  o   W   o o   W",
      "W         W          W         W",
      "W@ l o 1  W1 o    o2 W2 o o  3 W",
      "W         W    BB    W         W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":19,"y":2,"hace":"luz"}
    ],
    sombras: [
      [17,1,20,3]
    ]
  },
  {
    id: "disco",
    nombre: "La Discoteca",
    tema: "disco",
    tesoro: true,
    aire: 0.3,
    enemigos: [
      {"tipo":"a","spr":"gaviota","x":120,"y":12,"min":40,"max":200,"vel":1,"baja":56}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W              d               W",
      "W e           o  o           e W",
      "Wo o                        o oW",
      "W o          o    o          o W",
      "W              *               W",
      "WAAAA       oFFFFFFo       AAAAW",
      "W       o     o  o     o       W",
      "W    BB    BB      BB    BB    W",
      "WFFFFFFFFRRRAAAAAAAARRRFFFFFFFFW",
      "W       o     o  @  o      Ze dW",
      "W      BB o  o  o  o  o  o Zoo*W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [28,13,30,14]
    ],
    trucos: [
      {"tipo":"baldosa","x":13,"y":9,"n":3,"hace":"monedas","celdas":[[12,6],[13,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6]]}
    ]
  },
  {
    id: "anillos",
    nombre: "Los Anillos",
    tema: "espacio",
    tesoro: true,
    soloTuberia: true,
    gravedad: "baja",
    aire: 0.3,
    enemigos: [

    ],
    pinta: [
      [14,1,"planetaAnillos"],
      [4,5,"asteroide"],
      [27,5,"asteroide"]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W         o  o  o  o           W",
      "W      o                o      W",
      "W    o     d       d      o    W",
      "W                              W",
      "W          FFFFFFFFFF          W",
      "W  o                        o  W",
      "W o  o                    o  o W",
      "W  FFFFFF              FFFFFF  W",
      "W                              W",
      "W        o  o      o  o        W",
      "W         FFFF    FFFF         W",
      "W   o          @          o    W",
      "W  o  o                  o  o  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "mudanza",
    nombre: "La Mudanza",
    tema: "trastero",
    tesoro: true,
    soloCasa: true,
    aire: 0.35,
    enemigos: [

    ],
    cajas: [
      [9,13],
      [21,13]
    ],
    pinta: [
      [14,13,"camionMudanza"],
      [2,13,"cajaMudanza"],
      [28,13,"cajaMudanza"]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W  o o                   o o   W",
      "W   o                     o    W",
      "W  FFFF                  FFFF  W",
      "W                              W",
      "W  o  o    o    @    o  o  o   W",
      "W  o o o    o  o  o  o   o o o W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "subasta",
    nombre: "La Subasta",
    tema: "casino",
    tesoro: true,
    soloCasa: true,
    aire: 0.4,
    enemigos: [

    ],
    subasta: {"cada":48,"sube":0.5,"tope":4},
    pinta: [
      [15,7,"subastador"],
      [13,7,"atril"],
      [4,12,"etiquetaPrecio"],
      [26,12,"etiquetaPrecio"]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W              d               W",
      "W               o              W",
      "W            FFFFFF            W",
      "W        b             b       W",
      "W       FFFF        FFFF       W",
      "W    e    o o      o o    e    W",
      "W   FFFF  o    @      o  FFFF  W",
      "W  o o o o o o o  o o o o o o  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  }
];
/* Las 20 casas RETRO (modo homenaje; planos nuestros) */
var LLAVES_RETRO = [
  {
    id: "r01",
    nombre: "El Sótano Central",
    tema: "jardin",
    paleta: "sotano",
    aire: 0.72,
    sombras: [
      [1,5,3,8],
      [1,13,4,14]
    ],
    trucos: [
      {"tipo":"baldosa","x":8,"y":15,"n":3,"hace":"monedas","celdas":[[7,11],[8,11],[9,11]]}
    ],
    vapor: [
      {"zona":[17,10,19,12],"periodo":48,"on":32,"fase":0}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                          P   W",
      "WWWW         K                 W",
      "Wa Z     FFFFFFF   FFFFFFFFFFFFW",
      "W dZ      K                    W",
      "WWWWFF  B               K      W",
      "W       FFFFFCCC   FFFFFFFFFFFFW",
      "Wa                    e        W",
      "W          K                B  W",
      "WWWWWWFFFFFFFFCCC   >>>>>>FFFF W",
      "W   Z @                      r W",
      "W g Z     B     K       K      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":14,"fila":13,"min":11,"max":22,"dir":1},
      {"tipo":"r","spr":"rata","vel":1,"ciclo":240,"escondida":32,"agujeros":[[8,80],[88,80],[214,80],[160,80]]},
      {"tipo":"h","spr":"gato","x":23,"fila":7,"min":20,"max":25,"dir":-1,"lento":true}
    ]
  },
  {
    id: "r02",
    nombre: "La Cámara Frigorífica",
    tema: "jardin",
    paleta: "hielo",
    aire: 0.72,
    sombras: [
      [1,13,4,14],
      [26,7,30,8]
    ],
    fantasmas: [
      [26,11]
    ],
    objetos: [
      {"x":3,"y":13,"tipo":"pescado","a":"pinguino","pasos":75,"cerca":3}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W  P                           W",
      "W    r   K                     W",
      "W FFFFFFFFFCCCFFF         WWWWWW",
      "W                         Z   dW",
      "W           B     K       Z    W",
      "W FFHHHHHHHHHHHHHHFFCCCFFFWWWWWW",
      "W                   K          W",
      "W               e     B   K    W",
      "WWWWW        FFFFFFFFFFFFFFFFFFW",
      "W   Z                       @  W",
      "Wag ZK          K       B      W",
      "WIIIIFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"pinguino","x":12,"fila":13,"min":8,"max":19,"dir":1},
      {"tipo":"h","spr":"pinguino","x":18,"fila":7,"min":16,"max":21,"dir":-1,"lento":true},
      {"tipo":"v","spr":"medusa","x":84,"y":88,"min":80,"max":104,"dy":2},
      {"tipo":"h","spr":"rata","x":8,"fila":4,"min":8,"max":13,"dir":1,"lento":true}
    ]
  },
  {
    id: "r03",
    nombre: "La Pajarera",
    tema: "jardin",
    paleta: "pajarera",
    aire: 0.72,
    sombras: [
      [27,12,30,14]
    ],
    trucos: [
      {"tipo":"golpes","x":5,"y":2,"n":5,"hace":"premio","premio":[9,6,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W    B                         W",
      "W                              W",
      "W                              W",
      "W                          P   W",
      "Wa                   K         W",
      "WFFFFFFFFFFF   FFFFFFFFF   FFFFW",
      "W                              W",
      "W    K      FFF    K    FFF    W",
      "W        K           r         W",
      "WFFFFFFFFFFF   FFFFFFFFF   FFFFW",
      "W                          WWWWW",
      "W     @     FFF    K    FFFZ   W",
      "W        K  FFFK       bFFFZda W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIW"
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":96,"y":24,"min":16,"max":104,"dy":4,"espera":26,"fase":0,"aviso":12},
      {"tipo":"v","spr":"gaviota","x":104,"y":96,"min":24,"max":112,"dy":-2},
      {"tipo":"v","spr":"gaviota","x":192,"y":48,"min":16,"max":104,"dy":-2},
      {"tipo":"v","spr":"gaviota","x":200,"y":72,"min":24,"max":112,"dy":4}
    ]
  },
  {
    id: "r04",
    nombre: "La Mina Abandonada",
    tema: "jardin",
    paleta: "mina",
    aire: 0.72,
    palancas: [
      {"x":8,"y":5,"hace":"abre","retardo":45,"celdas":[[6,1],[6,2]]}
    ],
    sombras: [
      [27,10,30,11]
    ],
    objetos: [
      {"x":4,"y":2,"tipo":"carta","id":3}
    ],
    plataformas: [
      {"tipo":"vagoneta","x":112,"y":40,"ancho":3,"eje":"h","min":112,"max":160,"vel":2}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     W                        W",
      "W     W           g            W",
      "WWWUUWW           BB          aW",
      "W                K     P       W",
      "W     b                    WWWWW",
      "W FFFFFFFFF   FFFFFFFFFFFFFXXXXW",
      "W                              W",
      "W WWWW              B        K W",
      "W XXXX        <<<<<<FFFFFFFWWWWW",
      "W                     K    Z d W",
      "W   K         K         B  Z  aW",
      "W FFFFFFFF>>>>>>>>FFFFFFFFFWWWWW",
      "W @                            W",
      "W       B     K     r     K    W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"barril","x":14,"fila":13,"min":11,"max":20,"dir":1},
      {"tipo":"h","spr":"rata","x":21,"fila":10,"min":20,"max":25,"dir":1,"lento":true},
      {"tipo":"h","spr":"robot","x":23,"fila":7,"min":21,"max":26,"dir":-1},
      {"tipo":"h","spr":"cangrejo","x":17,"fila":4,"min":15,"max":20,"dir":1,"lento":true}
    ]
  },
  {
    id: "r05",
    nombre: "La Guarida del Portero",
    tema: "jardin",
    paleta: "ladrillo",
    aire: 0.72,
    sombras: [
      [1,13,4,14]
    ],
    trucos: [
      {"tipo":"paciente","x":3,"y":4,"hace":"premio","premio":[4,5,"vida"]}
    ],
    palancas: [
      {"x":29,"y":14,"hace":"para","a":0,"modo":"sube","pasos":60,"recarga":300,"dibujo":"timbre"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                   B          W",
      "W                              W",
      "Wa                             W",
      "W         b         K        K W",
      "W FFFFFFFFFFF   FFFFFFFFF   FFFW",
      "W                              W",
      "W     K               B        W",
      "W   FFFFFFFFFFF   FFFFFFF   FFFW",
      "W                              W",
      "W         B      K   r      K  W",
      "WWWWWWFFFFFFF   FFFFFFFFF   FFFW",
      "Wa  Z @                   P    W",
      "W d Z   K     K     B          W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"v","spr":"presidente","x":200,"y":56,"min":56,"max":104,"dy":1,"vecino":true,"minFinal":72,"dyFinal":2},
      {"tipo":"h","spr":"gato","x":14,"fila":13,"min":10,"max":21,"dir":1},
      {"tipo":"h","spr":"robot","x":8,"fila":10,"min":7,"max":12,"dir":1},
      {"tipo":"h","spr":"pato","x":20,"fila":7,"min":18,"max":23,"dir":-1,"lento":true},
      {"tipo":"okupa","spr":"okupa","x":152,"y":32,"llave":[20,5],"techo":[20,2],"salida":-1},
      {"tipo":"perro","spr":"perroGuardian","x":8,"y":112,"min":8,"max":16}
    ]
  },
  {
    id: "r06",
    nombre: "La Planta Depuradora",
    tema: "jardin",
    paleta: "depuradora",
    aire: 0.72,
    sombras: [
      [1,13,3,14]
    ],
    trucos: [
      {"tipo":"cuadro","x":7,"y":5,"hace":"monedas","celdas":[[10,5],[11,5],[12,5]]}
    ],
    plataformas: [
      {"tipo":"burbuja","x":232,"y":120,"ancho":2,"eje":"v","min":88,"max":120,"vel":1,"espera":16,"fase":0}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                            a W",
      "W                              W",
      "W    K        K          P     W",
      "W        e          K          W",
      "W  FFFFFFFFFFFFFFF   FFFFFFFFF W",
      "W                              W",
      "W                 FFF          W",
      "W   K                   K      W",
      "W FFFFFFFF   FFFFF      FFFFF  W",
      "WWWW    K    b      K          W",
      "Wg Z  @   FFF        FFF       W",
      "Wa Z      FFFK       FFF       W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":16,"fila":13,"min":14,"max":19,"dir":1},
      {"tipo":"h","spr":"rata","x":8,"fila":9,"min":3,"max":8,"dir":-1},
      {"tipo":"v","spr":"ameba","x":96,"y":60,"min":40,"max":88,"dy":2},
      {"tipo":"v","spr":"ameba","x":184,"y":76,"min":52,"max":100,"dy":-2}
    ]
  },
  {
    id: "r07",
    nombre: "La Tina",
    tema: "jardin",
    paleta: "tina",
    adornos: [
      [27,13,"banera"]
    ],
    aire: 0.72,
    sombras: [
      [1,5,4,6]
    ],
    palancas: [
      {"x":3,"y":5,"hace":"apaga"}
    ],
    pintadas: [
      {"x":2,"y":2,"k":5},
      {"x":2,"y":8,"k":4},
      {"x":2,"y":12,"k":6}
    ],
    huellasPista: [
      [8,6],
      [7,6],
      [6,6],
      [5,6]
    ],
    agua: {"arriba":13,"abajo":16,"periodo":80,"fase":60},
    plataformas: [
      {"tipo":"patito","x":120,"y":122,"ancho":1,"sigueAgua":6}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "WWWWW                        a W",
      "Wa  Z                      P   W",
      "W g Z                K         W",
      "WFFFFFFFF>>F   FFFFFFFFF   FFFFW",
      "W                              W",
      "W    e   K  FFF    K    FFF    W",
      "W        K           b         W",
      "WFFFFFFFFFFF    FFFFFFFF   FFFFW",
      "W                              W",
      "W     @     FFF    K    FFF    W",
      "W        K  FFFK     K  FFF    W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"telefono","x":6,"fila":9,"min":1,"max":10,"dir":1},
      {"tipo":"h","spr":"pinguino","x":12,"fila":13,"min":9,"max":18,"dir":1},
      {"tipo":"v","spr":"medusa","x":104,"y":16,"min":8,"max":88,"dy":2},
      {"tipo":"h","spr":"telefono","x":3,"fila":5,"min":1,"max":6,"dir":1}
    ]
  },
  {
    id: "r08",
    nombre: "El Gorila del Andamio",
    tema: "jardin",
    paleta: "andamio",
    aire: 0.72,
    sombras: [
      [28,13,30,14]
    ],
    trucos: [
      {"tipo":"cuadro","x":13,"y":9,"hace":"premio","premio":[15,10,"diamante"]}
    ],
    plataformas: [
      {"tipo":"ascensor","x":8,"y":32,"ancho":2,"eje":"v","min":32,"max":120,"vel":2,"espera":4,"fase":0}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                      W       W",
      "Wa      K              W    P  W",
      "W      K               W  b    W",
      "W  FF  FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W                           g  W",
      "W    FF  K       K             W",
      "W FFFFF   FFFFFFFF   F         W",
      "W                     OOOOOOO  W",
      "W      FFF        FFF          W",
      "W   K       e         K        W",
      "W FF      FFFFFFFF     FFFF    W",
      "W    K                      WWWW",
      "W@  FFF             FFF     Z gW",
      "W   FFF   K         FFF     Z aW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":24,"y":10,"hace":"cae","celdas":[[13,7],[14,7]]},
      {"x":20,"y":6,"hace":"abre","celdas":[[23,1],[23,2],[23,3]]}
    ],
    enemigos: [
      {"tipo":"g","spr":"gigante","x":104,"y":40},
      {"tipo":"h","spr":"rata","x":12,"fila":13,"min":8,"max":19,"dir":1},
      {"tipo":"h","spr":"telefono","x":12,"fila":9,"min":10,"max":15,"dir":-1},
      {"tipo":"v","spr":"ameba","x":128,"y":60,"min":40,"max":88,"dy":2},
      {"tipo":"h","spr":"termitas","x":22,"fila":7,"min":22,"max":23,"dir":1,"lento":true,"come":"madera"}
    ]
  },
  {
    id: "r09",
    nombre: "Amebas Locas",
    tema: "jardin",
    paleta: "ameba",
    aire: 0.72,
    sombras: [
      [1,13,3,14]
    ],
    fantasmas: [
      [22,8]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                             aW",
      "W                              W",
      "W                          P   W",
      "W               K         e    W",
      "W     FFF      FFF      FFFFFF W",
      "W   d        K        K        W",
      "W  FFF      FFF      FFF       W",
      "W       K        K             W",
      "W      FFF      FFF      FFF   W",
      "WWWW K        K                W",
      "Wg Z  F     @          FF      W",
      "Wa Z  FFF K     FFF    FFF     W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"v","spr":"ameba","x":80,"y":40,"min":32,"max":104,"dy":3},
      {"tipo":"v","spr":"ameba","x":152,"y":96,"min":32,"max":104,"dy":-3},
      {"tipo":"v","spr":"ameba","x":48,"y":64,"min":48,"max":96,"dy":2},
      {"tipo":"v","spr":"ameba","x":120,"y":80,"min":40,"max":88,"dy":-1},
      {"tipo":"v","spr":"ameba","x":200,"y":56,"min":40,"max":88,"dy":2}
    ]
  },
  {
    dibujos: {"T":"trampSeta","tele":"teleTronco"},
    id: "r10",
    nombre: "El Bosque Encantado",
    tema: "jardin",
    paleta: "bosque",
    aire: 0.72,
    sombras: [
      [1,13,3,14]
    ],
    trucos: [
      {"tipo":"alReves","hace":"premio","premio":[29,13,"vida"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "Wa   1                    P    W",
      "W   K                   K   d  W",
      "W  FFFF               FFFFFFFF W",
      "W  e                K          W",
      "W FFFF            FFFF         W",
      "W    K            K            W",
      "W   FFFF      FFFF             W",
      "W           K                  W",
      "WWWW    K  FFFF     FFFF       W",
      "Wg Z  @  B       B       B   1 W",
      "Wa Z     B   Y   B   Y   B  Y  W",
      "WFFFFFFFFFFFFFFTFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"pinguino","x":12,"fila":13,"min":10,"max":16,"dir":1},
      {"tipo":"h","spr":"rata","x":20,"fila":13,"min":18,"max":24,"dir":-1},
      {"tipo":"v","spr":"ameba","x":120,"y":60,"min":40,"max":96,"dy":2},
      {"tipo":"v","spr":"murcielago","x":176,"y":40,"min":24,"max":80,"dy":-2}
    ]
  },
  {
    id: "r11",
    nombre: "La Centralita",
    tema: "jardin",
    paleta: "centralita",
    aire: 0.72,
    sombras: [
      [27,7,30,8]
    ],
    reflejo: {"x0":20,"y0":7,"x1":22,"y1":8,"px":27,"py":7},
    objetos: [
      {"x":30,"y":8,"tipo":"carta","id":4}
    ],
    palancas: [
      {"x":5,"y":14,"hace":"para","a":"mitad","pasos":60,"recarga":300,"dibujo":"clavija"},
      {"x":26,"y":14,"hace":"para","a":"mitad","pasos":60,"recarga":300,"dibujo":"clavija"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W  P      K           K        W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFF    FFFFFFFFFW",
      "W    K              BB   r     W",
      "W         K       BBBB         W",
      "WFFFFFFF    FFFFFFFFFF   FFWWWWW",
      "W         BB               Z gaW",
      "W       BBBB               Z e W",
      "WFFFFFFFFFFFFFFFFF    FFFFFWWWWW",
      "W    K              BB         W",
      "W                 BBBB   K     W",
      "WFFFFFFF    FFFFFFFFFFFFF  FFFFW",
      "W @       BB                  aW",
      "W       BBBB B K B             W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"v","spr":"telefono","x":44,"y":24,"min":24,"max":72,"dy":2},
      {"tipo":"v","spr":"telefono","x":104,"y":40,"min":32,"max":80,"dy":-2},
      {"tipo":"v","spr":"telefono","x":184,"y":24,"min":24,"max":72,"dy":2},
      {"tipo":"v","spr":"telefono","x":204,"y":64,"min":56,"max":104,"dy":-2}
    ]
  },
  {
    id: "r12",
    nombre: "El Gorila Vuelve",
    tema: "jardin",
    paleta: "andamio2",
    aire: 0.72,
    sombras: [
      [12,1,18,2]
    ],
    trucos: [
      {"tipo":"cuadro","x":12,"y":13,"hace":"premio","premio":[6,13,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W          WoEE  v WW          W",
      "W @  K EE  W EE   oWW   b P EE W",
      "W      EE  WWZZWWWWWW       EE W",
      "WFFFFFFEEF   EE     WFFFFFFFEEFW",
      "W      EE    EE   K W EE  K EE W",
      "W EEK  EE  FFFFFFFBBW EE    EE W",
      "W EE e EE            FEEFFFFFFFW",
      "WFEEFFFFFF    K       EE       W",
      "W EE                  EE K  EE W",
      "W EE K EE   FFFFFFF   EE    EE W",
      "W EE   EE            FFFFFFFEEFW",
      "WFFFFFFEEF                  EE W",
      "Wa     EE    K              EE W",
      "W      EE           g       EE W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":13,"y":9,"hace":"cae","celdas":[[17,6]]}
    ],
    enemigos: [
      {"tipo":"g","spr":"gigante","x":128,"y":32},
      {"tipo":"r","spr":"barril","vel":2,"ciclo":192,"tramos":[[116,32,78,32],[78,32,78,48],[78,48,16,48],[16,48,16,80],[16,80,56,80],[56,80,56,104],[56,104,200,104]]},
      {"tipo":"h","spr":"robot","x":4,"fila":6,"min":3,"max":8,"dir":1},
      {"tipo":"v","spr":"ameba","x":152,"y":56,"min":48,"max":96,"dy":4}
    ]
  },
  {
    id: "r13",
    nombre: "La Refinería",
    tema: "jardin",
    velos: [
      {"zona":[21,7,22,8],"tipo":"chorro","periodo":48,"on":24,"fase":0}
    ],
    trucos: [
      {"tipo":"orden","modo":"golpe","dibujo":"valvula","celdas":[[6,2,"sol"],[8,2,"mi"],[12,2,"do"]],"hace":"premio","premio":[2,5,"diamante"]}
    ],
    paleta: "refineria",
    aire: 0.72,
    sombras: [
      [16,13,18,14]
    ],
    objetos: [
      {"x":1,"y":13,"tipo":"cronometro"}
    ],
    meta: {"x":29,"y":1},
    rayos: [
      {"x1":14,"x2":14,"y1":1,"y2":2,"periodo":80,"encendido":24,"fase":0,"dibujo":"vapor"},
      {"x1":25,"x2":25,"y1":1,"y2":2,"periodo":80,"encendido":24,"fase":40,"dibujo":"vapor"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W  P      K           K        W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFF    FFFFFFFFFW",
      "W    K              BB   K     W",
      "W    e         K  BBBB         W",
      "WFFFFFFF    FFFFFFFFFFFFFFFFFFFW",
      "W         BB                 gaW",
      "W       BBBB                   W",
      "WFFFFFFFFFFFFFFFFF    CCCFFFFFFW",
      "W    K              BB         W",
      "W                 BBBB   K     W",
      "WFFFFFFF    FFFFFFFFFFCCCFFFFFFW",
      "W @       BB   Zb  Z          aW",
      "W       BBBB   Z p Z           W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":3,"fila":9,"min":1,"max":6,"dir":1},
      {"tipo":"h","spr":"barril","x":24,"fila":12,"min":22,"max":27,"dir":-1},
      {"tipo":"h","spr":"robot","x":22,"fila":6,"min":17,"max":26,"dir":1},
      {"tipo":"h","spr":"rata","x":25,"fila":3,"min":23,"max":28,"dir":-1}
    ]
  },
  {
    id: "r14",
    nombre: "La Bahía de Satélites",
    tema: "jardin",
    paleta: "satelites",
    aire: 0.72,
    sombras: [
      [1,7,4,8]
    ],
    trucos: [
      {"tipo":"baldosa","x":26,"y":15,"n":3,"hace":"premio","premio":[29,13,"rubi"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W         K       K        P   W",
      "W                              W",
      "WFFFFFFF    FFFFFFFFFFFFFFFFFFFW",
      "W         BBK     r      K     W",
      "W       BBBB             K     W",
      "WWWWWFFFFFFFFFFFFF       FFFFFFW",
      "Wad Z               BB         W",
      "W g Z             BBBB         W",
      "WWWWWFFF    FFFFFFFFFFFFFFFFFFFW",
      "W         BBK                  W",
      "W       BBBB             K     W",
      "WFFFFFFFFFFFFF  FF    FFFFFFFFFW",
      "Wa                  BB@        W",
      "W                 BBBB         W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"f","spr":"satelite","cols":[96,112],"y0":8,"yFin":112,"vel":4,"espera":22,"fase":0,"escalon":true},
      {"tipo":"f","spr":"satelite","cols":[192,208,224],"y0":8,"yFin":112,"vel":4,"espera":6,"fase":48},
      {"tipo":"h","spr":"robot","x":20,"fila":9,"min":17,"max":22,"dir":1},
      {"tipo":"v","spr":"ameba","x":160,"y":24,"min":24,"max":72,"dy":2}
    ]
  },
  {
    id: "r15",
    nombre: "La Caja Fuerte",
    tema: "jardin",
    paleta: "cajafuerte",
    aire: 0.72,
    sombras: [
      [1,1,2,2]
    ],
    objetos: [
      {"x":2,"y":11,"tipo":"estatuilla","id":"edificio"}
    ],
    rayos: [
      {"x1":13,"x2":13,"y1":7,"y2":8,"periodo":80,"encendido":32,"fase":0},
      {"x1":21,"x2":21,"y1":7,"y2":8,"periodo":80,"encendido":32,"fase":40}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WvZP      K           K        W",
      "WaZ                            W",
      "WFFFFFFFFFFFFFFFFF    FFFFFFFFFW",
      "W    K        B     BB         W",
      "W    d        B   BBBB   K     W",
      "WFFFFFFF    FFFFFFFFFFFFFFFWWWWW",
      "W         BB   K           WWWWW",
      "W       BBBB               WWWWW",
      "WFFFFFFFFFFFFFFFFF    FFFFFWWWWW",
      "W  W K              BB  B      W",
      "W  W              BBBB  BK     W",
      "WUUFFFFF    FFFFFFFFFFFFFFFFFFFW",
      "W @       BB                  aW",
      "W       BBBB                   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":19,"fila":12,"min":18,"max":23,"dir":1},
      {"tipo":"h","spr":"rata","x":8,"fila":6,"min":5,"max":10,"dir":1},
      {"tipo":"v","spr":"ameba","x":176,"y":24,"min":24,"max":72,"dy":2},
      {"tipo":"h","spr":"moroso","x":12,"fila":10,"min":12,"max":14,"dir":1,"lento":true,"roba":150},
      {"tipo":"cofre","spr":"cofreTrampa","x":216,"y":104,"min":200,"max":232}
    ]
  },
  {
    id: "r16",
    nombre: "La Caverna Dieciséis",
    tema: "jardin",
    paleta: "caverna",
    cristalFragil: [
      [26,27,12]
    ],
    aire: 1.1,
    sombras: [
      [1,4,3,5]
    ],
    trucos: [
      {"tipo":"golpes","x":8,"y":0,"n":5,"hace":"premio","premio":[9,5,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     K                    K   W",
      "W                K             W",
      "WWWWW             d          a W",
      "WvaZ                      e    W",
      "Wg Z           K               W",
      "WGGGGGGGGGG  GCCCCGGGG  GGGGGGGW",
      "W    K                    b    W",
      "W                  BB    K     W",
      "WGGGGGG   GG>>>>>>GGG  GGGGGGGGW",
      "W          K                   W",
      "W      BB                      W",
      "WGGGGGGGGGGGG   GGGGCCCCCCGG   W",
      "W@                    K     P  W",
      "W   BB        X                W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":8,"fila":13,"min":6,"max":11,"dir":1},
      {"tipo":"h","spr":"arañita","x":20,"fila":11,"min":17,"max":22,"dir":-1},
      {"tipo":"v","spr":"murcielago","x":96,"y":40,"min":24,"max":72,"dy":2},
      {"tipo":"f","spr":"satelite","cols":[72,152,208],"y0":8,"yFin":104,"vel":4,"espera":8,"fase":0},
      {"tipo":"h","spr":"gato","x":27,"fila":4,"min":26,"max":28,"dir":-1,"lento":true}
    ]
  },
  {
    id: "r17",
    nombre: "El Almacén",
    tema: "jardin",
    paleta: "almacen",
    aire: 0.72,
    oscuro: true,
    lamparas: [
      [5,7],
      [22,7],
      [27,11],
      [15,2]
    ],
    palancas: [
      {"x":7,"y":13,"hace":"luz"}
    ],
    sombras: [
      [25,13,30,14]
    ],
    trucos: [
      {"tipo":"golpes","x":18,"y":0,"n":5,"hace":"premio","premio":[19,5,"pila"]},
      {"tipo":"caida","x":7,"y":12,"filas":3,"hace":"premio","premio":[6,11,"diamante"]}
    ],
    plataformas: [
      {"tipo":"caja","x":96,"y":32,"ancho":2,"eje":"h","min":96,"max":192,"vel":2,"sentido":1,"fase":0},
      {"tipo":"caja","x":96,"y":32,"ancho":2,"eje":"h","min":96,"max":192,"vel":2,"sentido":1,"fase":48}
    ],
    huellasPista: [
      [21,14],
      [22,14],
      [23,14],
      [24,14]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W      K              K        W",
      "W                              W",
      "Wa           e                 W",
      "W    K                    K    W",
      "W                              W",
      "WFFFFFFFFF   FFFFFFFFFF  FFFFFFW",
      "W        K                     W",
      "W               BB             W",
      "WFFFFF   FFFFFFFFFFF  FFFFFFFFFW",
      "W    b             P    K      W",
      "W         BB                   W",
      "WFFFFFFFFFFFFF   FFFFFFFFFWWWWWW",
      "W@  l        BB      K   Z a  gW",
      "W  BB        BB             h  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"barril","x":17,"fila":13,"min":16,"max":21,"dir":1},
      {"tipo":"h","spr":"robot","x":22,"fila":10,"min":21,"max":26,"dir":-1},
      {"tipo":"v","spr":"murcielago","x":112,"y":40,"min":24,"max":72,"dy":2},
      {"tipo":"h","spr":"rata","x":15,"fila":4,"min":14,"max":19,"dir":1,"lento":true},
      {"tipo":"dueno","spr":"fantasmaDueno","x":200,"y":24,"k":1}
    ]
  },
  {
    id: "r18",
    nombre: "La Revancha de las Amebas",
    tema: "jardin",
    paleta: "ameba2",
    aire: 0.72,
    sombras: [
      [25,13,30,14]
    ],
    trucos: [
      {"tipo":"cuadro","x":16,"y":13,"hace":"premio","premio":[18,13,"esmeralda"]}
    ],
    objetos: [
      {"x":27,"y":14,"tipo":"huevo","a":"ameba"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W       K             K        W",
      "W                            a W",
      "W    d                  e      W",
      "W                            b W",
      "W            K                 W",
      "WFFFF>>>>>>>FFFF  FF<<<<<<FFFFFW",
      "W      K                       W",
      "W   BB                  BB     W",
      "WFFFFFFFFFFFF   FFFF>>>>>>FFF  W",
      "W         K              K     W",
      "W         BB    BB             W",
      "WFFFFFFFFFFFFFFFFFFFF   FFWWWWWW",
      "W@ P         K           Z  v  W",
      "W     BB             BB  Za  g W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"v","spr":"ameba","x":88,"y":16,"min":8,"max":32,"dy":4},
      {"tipo":"v","spr":"ameba","x":168,"y":24,"min":16,"max":40,"dy":-4},
      {"tipo":"v","spr":"ameba","x":176,"y":60,"min":48,"max":72,"dy":4},
      {"tipo":"v","spr":"ameba","x":112,"y":72,"min":72,"max":88,"dy":2,"despierta":4},
      {"tipo":"h","spr":"pinguino","x":10,"fila":13,"min":8,"max":19,"dir":1}
    ]
  },
  {
    id: "r19",
    nombre: "El Generador Solar",
    tema: "jardin",
    paleta: "solar",
    aire: 0.75,
    vapor: [
      [1,2,2,14]
    ],
    cascada: [
      [27,1,28,14]
    ],
    sombras: [
      [4,10,8,11]
    ],
    pasadizos: [
      {"x":4,"y":12,"casa":"r20"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W      K  d        K           W",
      "W                              W",
      "W  FFFFFFFFFF   FFFFFFFFFF     W",
      "W                         W   KW",
      "W                         W    W",
      "W  FFFFFFF  FFFFFFFFFFFFFFW  FFW",
      "W     K                   W    W",
      "W                        KW    W",
      "W  WWWWWWFFFFFFF   FFFFFFFW    W",
      "W  W a  Z                 W   aW",
      "W  W  g Z     K           W  e W",
      "W  WWWWWWIIIFFFFFF   FFFFFW  FFW",
      "W    @          K            P W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":14,"fila":4,"min":13,"max":18,"dir":1},
      {"tipo":"h","spr":"rata","x":20,"fila":7,"min":19,"max":21,"dir":-1,"lento":true},
      {"tipo":"r","spr":"pelota","rodea":[15,3,24,3],"ciclo":96},
      {"tipo":"f","spr":"satelite","cols":[96,176],"y0":8,"yFin":104,"vel":2,"espera":16,"fase":0}
    ]
  },
  {
    id: "r20",
    nombre: "La Barrera Final",
    tema: "jardin",
    paleta: "final",
    aire: 1,
    cascada: [
      [13,1,14,14]
    ],
    vapor: [
      [29,2,30,14]
    ],
    sombras: [
      [1,4,4,5]
    ],
    trucos: [
      {"tipo":"baldosa","x":27,"y":15,"n":3,"hace":"monedas","celdas":[[27,11],[28,11],[29,11]]}
    ],
    huellasPista: [
      [8,5],
      [7,5],
      [6,5],
      [5,5]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                 K       b    W",
      "W                              W",
      "WWWWW          FFFFFFFFFFFFF   W",
      "Wh gZ    K       K             W",
      "Wa  Z                          W",
      "WWWWWII    FF  FFFFFF  FFFFF   W",
      "W        BB     K              W",
      "W      BBBB                    W",
      "W    CCFFFFFF  FF  FHHHHHHHF   W",
      "W  BB K       a       K        W",
      "WBBBB     K                    W",
      "WFFFFFFFF      >>>>   FFFFFF   W",
      "W @        BB   K   P          W",
      "W     XX BBBB            XX    W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":26,"y":8,"hace":"cae","celdas":[[22,3],[23,3]]}
    ],
    enemigos: [
      {"tipo":"v","spr":"presidente","x":160,"y":56,"min":56,"max":104,"dy":1,"vecino":true,"minFinal":56,"dyFinal":2},
      {"tipo":"g","spr":"gigante","x":176,"y":8},
      {"tipo":"h","spr":"telefono","x":21,"fila":7,"min":20,"max":23,"dir":1},
      {"tipo":"f","spr":"satelite","cols":[184,200],"y0":8,"yFin":104,"vel":3,"espera":16,"fase":0}
    ]
  }
];
/* Las 10 casas NUEVAS (3.ª tanda) */
var LLAVES_NUEVAS = [
  {
    id: "feria",
    nombre: "La Feria de Agosto",
    tema: "feria",
    clima: "fuegos",
    aire: 1.3,
    palancas: [
      {"x":1,"y":10,"hace":"apaga"}
    ],
    pintadas: [
      {"x":14,"y":3,"k":2},
      {"x":22,"y":10,"k":5},
      {"x":6,"y":13,"k":8}
    ],
    trucos: [
      {"tipo":"cuadro","x":20,"y":13,"hace":"premio","premio":[22,13,"diamante"]},
      {"tipo":"combo","n":3,"hace":"premio","premio":[14,8,"vida"]},
      {"tipo":"vuelta","plat":0,"hace":"premio","premio":[23,4,"diamante"],"sube":6}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K                  h     K  W",
      "W         r                    W",
      "W                   K         eW",
      "W                              W",
      "WFFFFFFFFFFF               FFFFW",
      "W         K  FF                W",
      "W a                            W",
      "WWWWW    >>>>FFFF              W",
      "W   Z FF        K              W",
      "W g Z                          W",
      "WFFFFFFFFFF    FF              W",
      "W@      K   FF               P W",
      "W                o o   o o o   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    plataformas: [
      {"tipo":"cabina","eje":"c","x":172,"y":48,"cx":184,"cy":80,"radio":32,"periodo":160,"fase":0,"ancho":3},
      {"tipo":"cabina","eje":"c","x":172,"y":48,"cx":184,"cy":80,"radio":32,"periodo":160,"fase":40,"ancho":3},
      {"tipo":"cabina","eje":"c","x":172,"y":48,"cx":184,"cy":80,"radio":32,"periodo":160,"fase":80,"ancho":3},
      {"tipo":"cabina","eje":"c","x":172,"y":48,"cx":184,"cy":80,"radio":32,"periodo":160,"fase":120,"ancho":3}
    ],
    enemigos: [
      {"tipo":"p","spr":"pelota","x":32,"y":112,"min":32,"max":112,"vel":1,"alto":24,"bote":32,"fase":0},
      {"tipo":"h","spr":"pato","x":9,"fila":7,"min":9,"max":13,"dir":1},
      {"tipo":"h","spr":"pato","x":11,"fila":7,"min":9,"max":13,"dir":1},
      {"tipo":"h","spr":"pato","x":13,"fila":7,"min":9,"max":13,"dir":1},
      {"tipo":"v","spr":"murcielago","x":128,"y":50,"min":50,"max":90,"dy":2},
      {"tipo":"h","spr":"aspiradora","x":22,"fila":14,"min":22,"max":26,"dir":1,"lento":true,"come":"monedas"},
      {"tipo":"manso","hace":"empuja","spr":"cocheRojo","x":112,"y":112,"min":112,"max":136,"dir":1,"fuerza":2},
      {"tipo":"manso","hace":"empuja","spr":"cocheRojo","x":136,"y":112,"min":112,"max":136,"dir":-1,"fuerza":2}
    ]
  },
  {
    id: "caminito",
    nombre: "El Caminito del Rey",
    tema: "caminito",
    clima: "niebla",
    aire: 1,
    fantasmas: [
      [15,7]
    ],
    huellasPista: [
      [25,8],
      [26,8],
      [27,8]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W     K           h            W",
      "W                              W",
      "W         e          K         W",
      "W                              W",
      "W    FFFFFFFF      FFCCFF   WWWW",
      "W F            K          K Z  W",
      "W                           Zg W",
      "WFFFF    FFFFFFF         FFFFFFW",
      "W     F       K        F   K   W",
      "W                 o o o        W",
      "W    FFFFFFF   FFOOOOOOFFCCC   W",
      "W@ F                    P  r  FW",
      "W     a                        W",
      "WFFFFFFFF            FFFFFFFFFFW"
    ],
    rachas: [
      {"zona":[18,9,22,11],"sentido":1,"periodo":96,"on":64,"fase":0,"manga":[15,8]},
      {"zona":[11,7,15,8],"sentido":-1,"periodo":96,"on":32,"fase":0,"alterna":true},
      {"zona":[13,2,18,5],"sentido":1,"periodo":96,"on":64,"fase":48}
    ],
    velos: [
      {"zona":[9,13,20,14],"tipo":"niebla","periodo":96,"on":48,"fase":24}
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":120,"y":32,"min":32,"max":72,"dy":2},
      {"tipo":"v","spr":"gaviota","x":112,"y":16,"min":16,"max":48,"dy":2},
      {"tipo":"h","spr":"rata","x":23,"fila":10,"min":23,"max":26,"dir":1},
      {"tipo":"h","spr":"termitas","x":17,"fila":11,"min":17,"max":21,"dir":1,"lento":true,"come":"madera"}
    ]
  },
  {
    id: "golf",
    dobleSalto: true,
    nombre: "El Club de Golf",
    tema: "golf",
    clima: "lluvia",
    aire: 1.3,
    trucos: [
      {"tipo":"baldosa","x":5,"y":15,"n":3,"hace":"premio","premio":[7,13,"diamante"]},
      {"tipo":"alReves","hace":"premio","premio":[4,4,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W    K                   h     W",
      "W                       K      W",
      "W P         K                 dW",
      "W                              W",
      "WFFFFFFFFFFFFFFFF    FFFFFFWWWWW",
      "W           K     FF       Z   W",
      "W                          Z g W",
      "WF    FFFFFFFFFFFFFFFFXXXFFFFFFW",
      "W  FF   a           K        K W",
      "W                              W",
      "WFFFFFFFFFFFXXFF<<<<FFFFF    FFW",
      "W@        K    e          FF   W",
      "W                              W",
      "WFFFFFFFFFFFFFXXXFFF>>>>FFFFFFFW"
    ],
    enemigos: [
      {"tipo":"p","spr":"pelota","x":40,"y":112,"min":40,"max":100,"vel":1,"alto":24,"bote":30,"fase":0},
      {"tipo":"p","spr":"pelota","x":120,"y":88,"min":120,"max":200,"vel":1,"alto":24,"bote":32,"fase":20},
      {"tipo":"p","spr":"pelota","x":56,"y":64,"min":56,"max":116,"vel":1,"alto":20,"bote":40,"fase":10},
      {"tipo":"p","spr":"pelota","x":168,"y":40,"min":168,"max":204,"vel":1,"alto":16,"bote":24,"fase":0},
      {"tipo":"h","spr":"gato","x":24,"fila":13,"min":24,"max":29,"dir":-1},
      {"tipo":"perro","spr":"perroGuardian","x":224,"y":40,"min":216,"max":232}
    ]
  },
  {
    id: "spa",
    nombre: "El Spa Termal",
    tema: "spa",
    aire: 1,
    reflejo: {"x0":3,"y0":1,"x1":8,"y1":3,"px":27,"py":10},
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                            K W",
      "W              h               W",
      "W                         FFFFFW",
      "W   K       e  K    K          W",
      "W                              W",
      "W  FFFFFFFFFF    FFFFFFFF      W",
      "WFF  P                  K      W",
      "W                              W",
      "WFFFFFFFF              FFFFWWWWW",
      "W@       FF          FF    Z   W",
      "W                          Z g W",
      "WFFFFFFFFFF          FFFFFFFFFFW",
      "W      Ka                K     W",
      "W   o       o     o         o  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    vapor: [
      [14,6,15,14],
      [27,3,28,8]
    ],
    agua: {"arriba":12,"abajo":16,"periodo":400,"fase":0},
    viento: [
      [9,13,12,14,-1],
      [17,13,20,14,1]
    ],
    haz: [
      [28,10,30,11]
    ],
    enemigos: [
      {"tipo":"v","spr":"medusa","x":64,"y":60,"min":60,"max":110,"dy":1},
      {"tipo":"h","spr":"pato","x":18,"fila":4,"min":18,"max":22,"dir":1},
      {"tipo":"h","spr":"rata","x":21,"fila":13,"min":21,"max":25,"dir":1,"lento":true}
    ]
  },
  {
    id: "marina",
    nombre: "La Marina de Noche",
    tema: "marina",
    aire: 0.8,
    oscuro: true,
    trucos: [
      {"tipo":"paciente","x":9,"y":14,"hace":"premio","premio":[4,13,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                   K     h    W",
      "W                              W",
      "W             K                W",
      "W                              W",
      "WWWWWF    FFFFFF        FFFF   W",
      "W   Z  FF K                  K W",
      "W v Z                          W",
      "WFFFFFFFFFFFF             FFFFFW",
      "W   K         FF        K      W",
      "W                              W",
      "WFFFFFF    FFFFF        FFF    W",
      "W@      FF    K           r  P W",
      "W    l                         W",
      "WFFFFFFFFFFFXXXF        FFFFFFFW"
    ],
    lamparas: [
      [5,11],
      [16,8],
      [25,4],
      [28,12]
    ],
    faro: [
      20,
      1
    ],
    palancas: [
      {"x":3,"y":13,"hace":"luz"}
    ],
    plataformas: [
      {"tipo":"ascensor","x":152,"y":120,"ancho":3,"eje":"v","min":48,"max":120,"vel":1,"espera":40,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":24,"fila":13,"min":24,"max":27,"dir":1},
      {"tipo":"v","spr":"gaviota","x":88,"y":50,"min":50,"max":106,"dy":1},
      {"tipo":"t","spr":"timido","x":240,"y":16,"vel":1},
      {"tipo":"manso","hace":"vigila","spr":"turista","x":196,"y":32,"min":192,"max":206,"luz":5,"espera":32},
      {"tipo":"dueno","spr":"fantasmaDueno","x":16,"y":32,"k":1}
    ]
  },
  {
    id: "helipuerto",
    nombre: "El Helipuerto",
    tema: "helipuerto",
    clima: "levante",
    aire: 1,
    objetos: [
      {"x":13,"y":4,"tipo":"carta","id":5}
    ],
    huellasPista: [
      [24,14],
      [25,14],
      [26,14],
      [27,14]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                h             W",
      "W      o    K     o            W",
      "W P                           KW",
      "W                              W",
      "WFFFF      FFFF      FFFFF   FFW",
      "W                   K    W   WWW",
      "W K              XX      W   WWW",
      "WFFFFFFF  FFFFFFFFFFFFFFFW   WWW",
      "W       BB  LL    K      W   WWW",
      "W     a     LL        g  W   WWW",
      "WFF  FFFFFFFFFFFFFFFFFFFFW   WWW",
      "W@ BB              LL  K     ZvW",
      "W                  LL        Z W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    viento: [
      [1,1,24,3,-1]
    ],
    rachas: [
      {"zona":[23,6,30,14],"sentido":-1,"periodo":192,"on":28,"fase":123}
    ],
    plataformas: [
      {"tipo":"helicoptero","x":208,"y":104,"ancho":3,"eje":"v","min":48,"max":104,"vel":2,"espera":68,"fase":0}
    ],
    palancas: [
      {"x":22,"y":8,"hace":"abre","celdas":[[19,13],[20,13],[19,14],[20,14],[12,10],[13,10],[12,11],[13,11]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":8,"fila":13,"min":7,"max":14,"dir":1},
      {"tipo":"h","spr":"gato","x":10,"fila":7,"min":10,"max":13,"dir":1,"lento":true},
      {"tipo":"v","spr":"gaviota","x":40,"y":8,"min":8,"max":40,"dy":1},
      {"tipo":"h","spr":"jeque","x":21,"fila":4,"min":21,"max":24,"dir":1,"lento":true,"despierta":"final"}
    ]
  },
  {
    adornos: [
      [20,8,"cuadroBoda"],
      [23,8,"cuadroBebe"],
      [26,8,"cuadroNino"],
      [17,11,"cuadroVacaciones"],
      [21,11,"cuadroMaletas"]
    ],
    id: "dosplantas",
    nombre: "La Casa de Dos Plantas",
    tema: "dosplantas",
    ancho: 32,
    alto: 32,
    aire: 1.4,
    dobleSalto: true,
    trucos: [
      {"tipo":"golpes","x":9,"y":2,"n":5,"hace":"premio","premio":[12,5,"rubi"]}
    ],
    huellasPista: [
      [25,30],
      [26,30],
      [27,30]
    ],
    medallas: [
      [15,26],
      [9,20]
    ],
    toboganes: [
      {"x1":3,"x2":6,"y1":3,"y2":4,"sentido":1}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "Wh       B                     W",
      "W  FF           K              W",
      "W    FF                        W",
      "W                           P  W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFF  FFFFFFFW",
      "W   K                          W",
      "W                X             W",
      "WFFFFFFF  FFFFFFFFFFFFFFFFFFFFFW",
      "W             K                W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFF  FFFFFFFFFW",
      "W           a               K  W",
      "W                              W",
      "WFFF  FFFFFFFFFFFFFFFFFFFFNWWWWW",
      "W         K               N    W",
      "W                         N    W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWF  W",
      "W n   K                        W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFF  FFFFFFFFFW",
      "W                              W",
      "W o o o o                K     W",
      "WFFFFFFFFF  FFFFFFFFFFFFFFFFFFFW",
      "W                 g            W",
      "W  K                           W",
      "WWWWWWWWWFFFFFFFFFFF  FFFFFFWWWW",
      "W@   m  M                   Z dW",
      "W       M     K         r   Z  W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":11,"fila":29,"min":11,"max":17,"dir":1},
      {"tipo":"h","spr":"rata","x":13,"fila":23,"min":13,"max":16,"dir":1},
      {"tipo":"h","spr":"gato","x":8,"fila":14,"min":8,"max":14,"dir":1},
      {"tipo":"h","spr":"pato","x":10,"fila":5,"min":10,"max":16,"dir":1},
      {"tipo":"v","spr":"murcielago","x":200,"y":64,"min":64,"max":88,"dy":1},
      {"tipo":"h","spr":"aspiradora","x":2,"fila":24,"min":2,"max":5,"dir":1,"lento":true,"come":"monedas"}
    ]
  },
  {
    id: "biblioteca",
    nombre: "La Biblioteca",
    tema: "biblioteca",
    objetos: [
      {"x":7,"y":2,"tipo":"carta","id":6}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     W  W                     W",
      "W     W  W      K              W",
      "W     WUUW                 WWWWW",
      "WP            r            Z  dW",
      "W                          Z   W",
      "WFFF  FFFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB    K           g    K   W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFF  W",
      "W         h      WWWW        BBW",
      "W                  K           W",
      "WWWW                      WWWWWW",
      "W@           K BBBBBB     W l  W",
      "W    K XXXXX   BBBBBB    KW   bW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    cajas: [
      [3,13],
      [17,11]
    ],
    palancas: [
      {"x":21,"y":10,"golpe":true,"dibujo":"libroPalanca","hace":"abre","celdas":[[26,13],[26,14]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":8,"fila":4,"min":8,"max":11,"dir":1,"lento":true},
      {"tipo":"v","spr":"arañita","x":96,"y":40,"min":40,"max":72,"dy":1},
      {"tipo":"v","spr":"murcielago","x":184,"y":72,"min":72,"max":104,"dy":1},
      {"tipo":"dueno","spr":"fantasmaDueno","x":56,"y":32,"k":2}
    ]
  },
  {
    id: "trastero",
    nombre: "El Trastero",
    tema: "trastero",
    aire: 1.1,
    fantasmas: [
      [29,14]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                   Q          W",
      "W       K           Q          W",
      "W                   Q       WWWW",
      "W                   Q    P  Z  W",
      "W        a          Q       Z dW",
      "WFFFFFFFFFFF  FFFFFFQFFFFFFFFFFW",
      "W q LL      BB  K     g        W",
      "W   LL                         W",
      "WFFWWWWWWFFFFFFFFFFWWWWWWWW    W",
      "W          h   B               W",
      "W                     K        W",
      "W  FFFFFF          FFFFFFFFFFFFW",
      "WBB @          K BB            W",
      "W      K XXXXX               K W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    cajas: [
      [5,10],
      [26,10]
    ],
    palancas: [
      {"x":3,"y":5,"hace":"abre","celdas":[[4,7],[5,7],[4,8],[5,8]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":20,"fila":13,"min":20,"max":23,"dir":1},
      {"tipo":"manso","hace":"timido","spr":"turista","x":32,"y":80,"min":24,"max":48,"premio":"rubi"},
      {"tipo":"h","spr":"gato","x":13,"fila":7,"min":13,"max":16,"dir":1},
      {"tipo":"h","spr":"rata","x":5,"fila":4,"min":5,"max":6,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":184,"y":8,"min":8,"max":24,"dy":1},
      {"tipo":"okupa","spr":"okupa","x":120,"y":104,"llave":[15,13],"techo":[15,10],"salida":1}
    ]
  },
  {
    id: "notaria",
    dobleSalto: true,
    nombre: "La Notaría",
    tema: "notaria",
    aire: 1.3,
    trucos: [
      {"tipo":"cuadro","x":20,"y":4,"hace":"premio","premio":[22,4,"diamante"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W    LL                        W",
      "W    LL                       hW",
      "W    LL         K              W",
      "W P  LL                        W",
      "W   KLL                        W",
      "WFFFFFFFFFFFF>>>FFFFFFFFFF  FFFW",
      "W         K           g   BB   W",
      "W                XX            W",
      "WFF  FFFFFFFFFFFFFFFFFFFFFFFFFFW",
      "W  BB                          W",
      "WK    r           K            W",
      "WFFFFFFFFFCCCCFFFFFFFFFF  FFWWWW",
      "W@                      BB  Z vW",
      "W    K  XX           K      Z  W",
      "WFFFFFFFFFFFFF>>>>FFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":27,"y":11,"hace":"abre","celdas":[[5,1],[6,1],[5,2],[6,2],[5,3],[6,3],[5,4],[6,4],[5,5],[6,5]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"notario","x":6,"fila":7,"min":6,"max":13,"dir":1},
      {"tipo":"h","spr":"robot","x":11,"fila":13,"min":11,"max":14,"dir":1},
      {"tipo":"h","spr":"moroso","x":17,"fila":4,"min":17,"max":22,"dir":1,"lento":true,"roba":150},
      {"tipo":"suegra","spr":"suegra","x":144,"y":80,"min":112,"max":176,"voz":"suegra"},
      {"tipo":"manso","hace":"notario","spr":"notario","x":184,"y":32,"min":176,"max":194,"cada":48,"seca":192},
      {"tipo":"m","spr":"agente","x":8,"y":-99},
      {"tipo":"c","spr":"inspector","x":216,"y":104,"vel":1},
      {"tipo":"t","spr":"timido","x":232,"y":16,"vel":1}
    ]
  },
  {
    id: "concesionario",
    nombre: "El Concesionario de Lujo",
    tema: "helipuerto",
    aire: 1,
    pasadizos: [
      {"x":1,"y":5,"casa":"circuito"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     W                        W",
      "W     W   K                    W",
      "W     W          K          K  W",
      "W     Z                 P      W",
      "W h d Z                        W",
      "WWWWWWGGGGGGGG       FFFFFF   FW",
      "W       K                     WW",
      "W                        g    WW",
      "WFFFFFFFFFFFFFFFFFFFFFF  FF   WW",
      "W                      BBK    WW",
      "W           e                 WW",
      "WFFF    FFFFFF<<<<<FFFFFFFF   WW",
      "W@        o   o   o        K  WW",
      "W                             WW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,1,5,5]
    ],
    plataformas: [
      {"tipo":"coche","color":"#d4af37","x":32,"y":112,"ancho":3,"eje":"h","min":32,"max":32,"vel":2},
      {"tipo":"cocheAzul","x":72,"y":40,"ancho":3,"eje":"h","min":72,"max":152,"vel":2,"arranca":"objeto","al":[10,2]},
      {"tipo":"coche","color":"#c9ced6","x":112,"y":64,"ancho":3,"eje":"h","min":112,"max":144,"vel":2},
      {"tipo":"ascensor","x":216,"y":104,"ancho":3,"eje":"v","min":48,"max":104,"vel":2,"espera":36,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"furgoneta","x":8,"fila":14,"min":6,"max":21,"dir":1},
      {"tipo":"h","spr":"cocheRojo","x":12,"fila":11,"min":10,"max":17,"dir":-1},
      {"tipo":"h","spr":"vendedor","x":4,"fila":7,"min":2,"max":9,"dir":1,"voz":"extras"}
    ]
  },
  {
    id: "circuito",
    dobleSalto: true,
    nombre: "El Circuito de Karts",
    tema: "obra",
    aire: 0.7,
    objetos: [
      {"x":16,"y":14,"tipo":"cronometro"}
    ],
    meta: {"x":3,"y":5},
    trucos: [
      {"tipo":"cuadro","x":5,"y":13,"dibujo":"pilaRuedas","hace":"premio","premio":[4,13,"patinete"]}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     W                        W",
      "W     W    K         K         W",
      "W     W                        W",
      "W     Z       P         a      W",
      "W h g Z                        W",
      "WWWWWWFFFFFFFFFFFF  FFFFFFFFFFFW",
      "W                              W",
      "W      K          e            W",
      "WFFFFFFFFFFFFFFFFFFF  F>>>>TTFFW",
      "W    K   o   o   o  K          W",
      "W                              W",
      "WTT<<<<FFFFFFFFFFFFFFFFF  FFFFFW",
      "W @         K                  W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFF>>>>TTFFW"
    ],
    sombras: [
      [1,1,5,5]
    ],
    enemigos: [
      {"tipo":"h","spr":"cocheRojo","x":6,"fila":14,"min":6,"max":21,"dir":1},
      {"tipo":"h","spr":"furgoneta","x":15,"fila":11,"min":8,"max":15,"dir":-1},
      {"tipo":"h","spr":"cocheRojo","x":10,"fila":8,"min":10,"max":17,"dir":1}
    ]
  },
  {
    id: "parking",
    nombre: "El Parking de Cuatro Plantas",
    tema: "garaje",
    aire: 1,
    objetos: [
      {"x":13,"y":2,"tipo":"estatuilla","id":"urba"},
      {"x":30,"y":11,"tipo":"muelle"},
      {"x":20,"y":4,"tipo":"mando"}
    ],
    maletero: {"coche":[15,14],"premio":[16,13,"diamante"]},
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W           W  W               W",
      "W           W  W      K        W",
      "W         K WUUW               W",
      "W   @                   e      W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFHHHFFFFFF  FW",
      "W     K                   K BB W",
      "W                              W",
      "W  FFHHHHFFFFFFFFFFFFFFFFWWWWWWW",
      "WBB       K              Z     W",
      "W                    K   Z h b W",
      "WFFFFFFFFFFFFFFFFFFFHHH  FWWWWWW",
      "WP a         K         BB      W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFHHHHFFFFFFFFW"
    ],
    sombras: [
      [26,10,30,11]
    ],
    plataformas: [
      {"tipo":"coche","color":"#2f97a8","x":208,"y":112,"ancho":3,"eje":"h","min":208,"max":208,"vel":2},
      {"tipo":"coche","color":"#8a8f98","x":8,"y":40,"ancho":3,"eje":"h","min":8,"max":8,"vel":2}
    ],
    barras: [
      {"x":5,"y1":13,"y2":14,"periodo":80,"cerrada":40,"fase":0},
      {"x":11,"y1":7,"y2":8,"periodo":80,"cerrada":40,"fase":40}
    ],
    rayos: [
      {"x1":17,"x2":17,"y1":10,"y2":11,"periodo":80,"encendido":40,"fase":20},
      {"x1":16,"x2":16,"y1":4,"y2":5,"periodo":80,"encendido":40,"fase":60}
    ],
    enemigos: [
      {"tipo":"h","spr":"furgoneta","x":9,"fila":14,"min":8,"max":17,"dir":1},
      {"tipo":"h","spr":"moroso","x":6,"fila":4,"min":6,"max":11,"dir":1,"lento":true,"roba":150},
      {"tipo":"r","spr":"cocheRojo","vel":2,"ciclo":320,"tramos":[[208,40,224,40],[224,40,224,64],[224,64,8,64],[8,64,8,88],[8,88,184,88],[184,88,184,112],[184,112,40,112]]}
    ]
  },
  {
    id: "rec-pinball",
    nombre: "La Máquina de Pinball",
    tema: "casino",
    aire: 0.75,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     W                        W",
      "W     W B K               K    W",
      "W     W                        W",
      "W     Z           P            W",
      "W h g Z                        W",
      "WWWWWWFFFFFFFFFFFFFFFFF    FFFFW",
      "W                              W",
      "W   K        e       s  K      W",
      "WFFFFFFFFFFFFFFF    FFFFFFFFTTFW",
      "W                              W",
      "W       K               K      W",
      "WFTTFFFFFF    FFFFFFFFFFFFF    W",
      "W@                           BBW",
      "W                           K  W",
      "WFFFFFFFTTFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,1,5,5]
    ],
    trucos: [
      {"tipo":"golpes","x":8,"y":2,"n":5,"hace":"monedas","celdas":[[7,5],[9,5],[10,5],[11,5],[12,5]]}
    ],
    pasadizos: [
      {"x":1,"y":2,"casa":"rec-premios"}
    ],
    rayos: [
      {"x1":8,"x2":9,"y1":7,"y2":8,"periodo":80,"encendido":24,"fase":12}
    ],
    enemigos: [
      {"tipo":"h","spr":"kaboomKitty","x":12,"fila":13,"min":12,"max":21,"dir":1,"lento":true},
      {"tipo":"p","spr":"pelota","x":120,"y":88,"min":120,"max":160,"vel":2,"bote":20,"alto":8},
      {"tipo":"p","spr":"pelota","x":96,"y":40,"min":96,"max":128,"vel":1,"bote":24,"alto":12,"despierta":"final"},
      {"tipo":"v","spr":"pixelPhoenix","x":136,"y":36,"min":36,"max":76,"dy":2},
      {"tipo":"v","spr":"screenSpider","x":112,"y":8,"min":8,"max":48,"dy":2}
    ]
  },
  {
    dibujos: {"S":"sueloBunker"},
    id: "rec-marcianos",
    nombre: "La Máquina de Marcianitos",
    tema: "portales",
    aire: 0.85,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                   W  W W     W",
      "W   K           K   W  W W     W",
      "W                   WUUW W     W",
      "W     P             E    Z     W",
      "W                   E    Z h z W",
      "WFFFFFFF   FFFFFFFFFEFFFFWWWWWWW",
      "W                   E          W",
      "W   K               E    K     W",
      "WFFFFFFFFFSSFXXFSSFFFFFFFFF    W",
      "W   E                       BB W",
      "W   E    K     e         K     W",
      "WFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFW",
      "W@  E                          W",
      "W   E             K            W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [26,1,30,5]
    ],
    objetos: [
      {"x":22,"y":2,"tipo":"carta","id":7}
    ],
    barras: [
      {"x":8,"y1":13,"y2":14,"periodo":80,"cerrada":40,"fase":30}
    ],
    rayos: [
      {"x1":21,"x2":21,"y1":10,"y2":11,"periodo":80,"encendido":24,"fase":20},
      {"x1":23,"x2":23,"y1":4,"y2":5,"periodo":80,"encendido":24,"fase":60}
    ],
    enemigos: [
      {"tipo":"h","spr":"vectorBeast","x":11,"fila":13,"min":11,"max":20,"dir":1,"lento":true},
      {"tipo":"v","spr":"gameGriffin","x":104,"y":48,"min":48,"max":88,"dy":1},
      {"tipo":"v","spr":"glitchGhoul","x":96,"y":8,"min":8,"max":48,"dy":1},
      {"tipo":"h","spr":"vectorViper","x":11,"fila":5,"min":11,"max":15,"dir":1}
    ]
  },
  {
    id: "rec-karts",
    nombre: "El Simulador de Karts",
    paleta: "refineria",
    aire: 0.7,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K                  K        W",
      "W                              W",
      "W    P                         W",
      "W                              W",
      "WFFFFFFFFFFFF      FFFFFFFFFFFFW",
      "W                              W",
      "W       K        e       K     W",
      "WFFFFF>>>>>>>>FFFFFFFFFFFFFTTFFW",
      "W                              W",
      "W      K      f            K   W",
      "WFFTTFFFF<<<<<<<<HHH   WWWWWWWWW",
      "W@                     Z  d h  W",
      "W           K          Z       W",
      "WFFFFFFFFFFFFFFFFFTTFFFWWWWWWWWW"
    ],
    sombras: [
      [24,13,30,14]
    ],
    objetos: [
      {"x":30,"y":14,"tipo":"cronometro"}
    ],
    meta: {"x":1,"y":2},
    plataformas: [
      {"tipo":"coche","color":"#d4af37","x":104,"y":48,"ancho":3,"eje":"h","min":104,"max":136,"vel":2}
    ],
    enemigos: [
      {"tipo":"h","spr":"cocheRojo","x":5,"fila":14,"min":5,"max":14,"dir":1},
      {"tipo":"h","spr":"furgoneta","x":14,"fila":8,"min":14,"max":23,"dir":-1},
      {"tipo":"v","spr":"pixelPegasus","x":120,"y":16,"min":16,"max":56,"dy":2},
      {"tipo":"v","spr":"chronoClockwork","x":160,"y":72,"min":72,"max":112,"dy":1}
    ]
  },
  {
    id: "rec-baile",
    nombre: "La Pista de Baile",
    tema: "disco",
    aire: 0.9,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W    K      K           K      W",
      "W                              W",
      "W  P                           W",
      "W                              W",
      "WWWWWWFFFFFFFFFFF    FFFFFFFFFFW",
      "W    Z                         W",
      "Wh d Z     K         t         W",
      "WWWWWWFFFFFFSSSSFFFFFFFFTTF    W",
      "W                              W",
      "W        K        e      K     W",
      "WFF   FFFFFFFFFFFFFFFFFFFFF    W",
      "W@  BB                         W",
      "W             K            K   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,7,4,8]
    ],
    trucos: [
      {"tipo":"paciente","x":4,"y":11,"hace":"premio","premio":[2,11,"vida"]},
      {"tipo":"todas","celdas":[[2,15],[5,15],[10,15],[13,15],[17,15],[20,15],[25,15],[28,15]],"hace":"premio","premio":[15,13,"diamante"]}
    ],
    barras: [
      {"x":7,"y1":13,"y2":14,"periodo":80,"cerrada":40,"fase":0},
      {"x":23,"y1":13,"y2":14,"periodo":80,"cerrada":40,"fase":40}
    ],
    rayos: [
      {"x1":15,"x2":16,"y1":10,"y2":11,"periodo":80,"encendido":40,"fase":0},
      {"x1":9,"x2":9,"y1":4,"y2":5,"periodo":80,"encendido":40,"fase":40}
    ],
    plataformas: [
      {"tipo":"ascensor","x":216,"y":104,"ancho":3,"eje":"v","min":72,"max":104,"vel":2,"espera":24,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"chronoClown","x":9,"fila":13,"min":9,"max":18,"dir":1,"lento":true},
      {"tipo":"v","spr":"polterStick","x":140,"y":24,"min":24,"max":64,"dy":1},
      {"tipo":"v","spr":"gridGargoyle","x":160,"y":48,"min":48,"max":88,"dy":1},
      {"tipo":"h","spr":"vectorViper","x":16,"fila":8,"min":16,"max":20,"dir":1},
      {"tipo":"m","spr":"agente","x":8,"y":-99,"tecla":true}
    ]
  },
  {
    id: "rec-premios",
    nombre: "La Máquina de Premios",
    paleta: "cajafuerte",
    aire: 0.8,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K        K                  W",
      "W                              W",
      "W                         P    W",
      "W                              W",
      "WFFFFFFFFFFFFFFF    FFFFFFFFFFFW",
      "W                              W",
      "W     K               K        W",
      "W    FFFFFFFFFFFFFFFFFFFFFFTTFFW",
      "W BB                           W",
      "W        K  o o o o y         bW",
      "WFFFFFFFFFFFFFFFFFF    WWWWWWWWW",
      "W@                 BB  Z  k h  W",
      "W         K            Z       W",
      "WFFTTFFFFFFFFFFFFFFFFFFWWWWWWWWW"
    ],
    sombras: [
      [24,13,30,14]
    ],
    llavesFalsas: [
      [17,2]
    ],
    fantasmas: [
      [22,8]
    ],
    prensas: [
      {"x":9,"arriba":1,"abajo":5,"periodo":80,"fase":0},
      {"x":23,"arriba":1,"abajo":5,"periodo":80,"fase":40}
    ],
    palancas: [
      {"x":30,"y":8,"hace":"cae","celdas":[],"dibujo":"botonSoltar"}
    ],
    enemigos: [
      {"tipo":"h","spr":"coinGnome","x":5,"fila":13,"min":5,"max":14,"dir":1,"lento":true},
      {"tipo":"v","spr":"powerPuck","x":80,"y":64,"min":64,"max":104,"dy":1},
      {"tipo":"h","spr":"vectorViper","x":12,"fila":8,"min":12,"max":21,"dir":1},
      {"tipo":"v","spr":"controllerCrab","x":136,"y":16,"min":16,"max":56,"dy":1},
      {"tipo":"h","spr":"aspiradora","x":12,"fila":11,"min":12,"max":16,"dir":1,"lento":true,"come":"monedas","espera":48,"fase":0,"aviso":16},
      {"tipo":"g","spr":"gigante","x":232,"y":80}
    ]
  },
  {
    dibujos: {"tele":"ranuraMonedas"},
    pinta: [
      [22,12,"cajetin"]
    ],
    id: "rec-jefe",
    nombre: "El Gran Salón",
    tema: "casino",
    aire: 0.7,
    cuentaAtras: {"pasos":150,"premio":2000},
    pideSaltar: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     W                        W",
      "W     W K                  K   W",
      "W     W                        W",
      "W     Z1                       W",
      "W h d Z                        W",
      "WWWWWWFFFFFFFFFFFFFFFFF    HHHFW",
      "W                              W",
      "W   K       z       K          W",
      "WF  FFFFFFFFFFFFFFFFFFFFFFF  TTW",
      "WE                    1     P  W",
      "WE  K                      K   W",
      "WEFFFFTT              B   FFFFFW",
      "WE@                            W",
      "WE          K            K     W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFTTW"
    ],
    sombras: [
      [1,1,5,5]
    ],
    premioFinal: [
      15,
      5,
      "diamante"
    ],
    objetos: [
      {"x":3,"y":2,"tipo":"estatuilla","id":"recreativos"}
    ],
    prensas: [
      {"x":11,"arriba":1,"abajo":5,"periodo":80,"fase":0},
      {"x":20,"arriba":1,"abajo":5,"periodo":80,"fase":40}
    ],
    rayos: [
      {"x1":16,"x2":16,"y1":7,"y2":8,"periodo":80,"encendido":24,"fase":70}
    ],
    enemigos: [
      {"tipo":"h","spr":"tokenTank","x":8,"fila":12,"min":8,"max":17,"dir":1},
      {"tipo":"c","spr":"trackballTitan","x":8,"y":8,"vel":1},
      {"tipo":"v","spr":"circuitSpectre","x":192,"y":8,"min":8,"max":48,"dy":1},
      {"tipo":"h","spr":"vectorViper","x":7,"fila":8,"min":7,"max":11,"dir":1}
    ]
  },
  {
    id: "mus-sabana",
    dobleSalto: true,
    nombre: "La Sala de la Sabana",
    tema: "sierra",
    aire: 0.75,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K          e            K   W",
      "W BBBB                    BBBB W",
      "W                              W",
      "W                              W",
      "WWWWWFFF    FFFFFFFFF   FFFFFFFW",
      "W h Z    FF          FF        W",
      "Wg  Z     K                  K W",
      "WFFFF   FFFFFFFFFFFFFFFFF   FFFW",
      "W    FF                FF      W",
      "W p           K                W",
      "WFFFFFFFFFF   FF<<<<<<FFFFFFFFFW",
      "W@          FF           P     W",
      "W                     K        W",
      "WFFFFFFFFFFFFFFYYYYYYFFFFFFFFFTW"
    ],
    sombras: [
      [1,7,3,8]
    ],
    huellasPista: [
      [8,8],
      [9,8],
      [11,8],
      [12,8]
    ],
    objetos: [
      {"x":1,"y":7,"tipo":"carta","id":8}
    ],
    enemigos: [
      {"tipo":"h","spr":"rompo","x":20,"fila":13.5,"min":20,"max":25,"dir":1},
      {"tipo":"h","spr":"nandiBear","x":18,"fila":7.5,"min":13,"max":18,"dir":-1},
      {"tipo":"v","spr":"adze","x":184,"y":16,"min":16,"max":40,"dy":1},
      {"tipo":"h","spr":"hormigaTerciopelo","x":12,"fila":5.125,"min":12,"max":17,"dir":1}
    ]
  },
  {
    id: "mus-rio",
    dobleSalto: true,
    nombre: "La Sala del Río",
    tema: "cristal",
    aire: 0.7,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                W  W          W",
      "W                W  W          W",
      "W K            b WUUW      K   W",
      "W          u                   W",
      "W                              W",
      "WFFFFFF   FFFFFFFFFFFFFF  WWWWWW",
      "W       SS                Z  h W",
      "W    K                    Z   gW",
      "WFFFFFFFFFFFF   FFFFFFFF  FFFFFW",
      "W P          SS             @  W",
      "W         K                    W",
      "WFFFF   FFFFFFFF    FFFF  FFFFFW",
      "W     SS                       W",
      "W a         K              K   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [27,7,30,8]
    ],
    reflejo: {"x0":4,"y0":1,"x1":7,"y1":2,"px":26,"py":7},
    objetos: [
      {"x":19,"y":2,"tipo":"carta","id":9}
    ],
    cascada: [
      [24,1,25,14]
    ],
    enemigos: [
      {"tipo":"v","spr":"inkanyamba","x":128,"y":72,"min":72,"max":96,"dy":1},
      {"tipo":"h","spr":"mbieluMbielu","x":7,"fila":13.5,"min":7,"max":12,"dir":1},
      {"tipo":"h","spr":"aigamuxa","x":16,"fila":7,"min":16,"max":21,"dir":1},
      {"tipo":"v","spr":"kongamato","x":104,"y":8,"min":8,"max":32,"dy":2}
    ]
  },
  {
    id: "mus-selva",
    dobleSalto: true,
    nombre: "La Sala de la Selva",
    paleta: "bosque",
    aire: 0.85,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W  K                 EE     K  W",
      "W    e               EE      y W",
      "WFFFFFFFSSSSSSSSSSSSSEEFFFFFFFFW",
      "W                    EE        W",
      "W          K         EE   K    W",
      "WFFFFFFFFFFFFFF   FFFFFFFFFFFFFW",
      "W      @                     P W",
      "W                  K           W",
      "WFFFFFFFFFF   FFFFFFFFFFFFFFFFFW",
      "W                           WWWW",
      "W                           Z gW",
      "W    K                   K  Zh W",
      "WFFFFFFFFFFFFFFFXXXXXXXFFFFFFFFW"
    ],
    vapor: [
      [9,4,10,7]
    ],
    trucos: [
      {"tipo":"baldosa","x":6,"y":15,"n":3,"hace":"premio","premio":[6,12,"gema"]}
    ],
    sombras: [
      [29,13,30,14]
    ],
    enemigos: [
      {"tipo":"h","spr":"grootslang","x":2,"fila":12,"min":2,"max":7,"dir":1,"lento":true},
      {"tipo":"h","spr":"mantis","x":1,"fila":6.75,"min":1,"max":6,"dir":1},
      {"tipo":"h","spr":"hormigaCortadora","x":18,"fila":7,"min":18,"max":23,"dir":1},
      {"tipo":"h","spr":"tokoloshe","x":22,"fila":9.5,"min":17,"max":22,"dir":-1,"lento":true},
      {"tipo":"v","spr":"adze","x":200,"y":8,"min":8,"max":32,"dy":1}
    ]
  },
  {
    id: "mus-desierto",
    dobleSalto: true,
    nombre: "La Sala del Desierto",
    tema: "acueducto",
    aire: 0.7,
    rachas: [
      {"zona":[5,1,26,5],"sentido":1,"periodo":96,"on":32,"fase":0,"polvo":"arena"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W K                          K W",
      "W                w             W",
      "W                              W",
      "WFFFFFFSSS   FFFFFFFF   FFFFFFFW",
      "W          FF         FF       W",
      "W K                     K      W",
      "WFFF   FFFFFFFFFFSSSSFFFFFF   FW",
      "W P  FF                    FF  W",
      "W                K             W",
      "WFFFFFFFFF   FFSSSSFFFFFF  WWWWW",
      "W@          F              Z  gW",
      "W               Y  K       Z h W",
      "WFFFFFFFFFFFFFFFFFFFFFTTFFFFFFFW"
    ],
    sombras: [
      [28,13,30,14]
    ],
    palancas: [
      {"x":30,"y":14,"hace":"apaga"}
    ],
    pintadas: [
      {"x":3,"y":1,"k":14},
      {"x":2,"y":11,"k":15},
      {"x":13,"y":13,"k":16}
    ],
    premioFinal: [
      4,
      4,
      "diamante"
    ],
    llavesFalsas: [
      [15,3]
    ],
    enemigos: [
      {"tipo":"h","spr":"catoblepas","x":4,"fila":13.5,"min":4,"max":9,"dir":1},
      {"tipo":"h","spr":"hombreHiena","x":13,"fila":7,"min":13,"max":15,"dir":1},
      {"tipo":"h","spr":"bonnacon","x":13,"fila":4.5,"min":13,"max":18,"dir":1},
      {"tipo":"h","spr":"arañaPavo","x":24,"fila":5,"min":24,"max":26,"dir":1}
    ]
  },
  {
    id: "mus-cripta",
    nombre: "La Cripta",
    tema: "cueva",
    aire: 0.8,
    oscuro: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "WWWWW K                      K W",
      "W h Z              K           W",
      "Wg  Z                          W",
      "WFFFFF   FFFFFFFFFFFF   FFFFFFFW",
      "W       F             F        W",
      "W        K              K      W",
      "WF   FFFFFFFFFFFFFFFFFFFFFF   FW",
      "W@ FF                      FFP W",
      "W   l                          W",
      "WFFFFFFF                  FFFFFW",
      "W    W    F             F      W",
      "W    W        K                W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,4,3,5]
    ],
    lamparas: [
      [3,10],
      [16,3],
      [27,7],
      [16,11]
    ],
    palancas: [
      {"x":6,"y":11,"hace":"luz"}
    ],
    frenos: [
      {"x":22,"y":14,"a":"ammit","pasos":99999,"modo":"duerme","sinMorir":true,"dibujo":"balanza"}
    ],
    objetos: [
      {"x":1,"y":4,"tipo":"reliquia"},
      {"x":1,"y":13,"tipo":"estatuilla","id":"museo"}
    ],
    trucos: [
      {"tipo":"objeto","x":7,"y":14,"obj":"reliquia","hace":"abre","celdas":[[5,13],[5,14]]},
      {"tipo":"cuadro","x":3,"y":13,"hace":"monedas","celdas":[[1,14],[2,14],[4,13],[4,14]]}
    ],
    rayos: [
      {"x1":13,"x2":14,"y1":1,"y2":5,"periodo":48,"encendido":20,"fase":0},
      {"x1":27,"x2":28,"y1":10,"y2":11,"periodo":48,"encendido":20,"fase":24}
    ],
    enemigos: [
      {"tipo":"h","spr":"ammit","x":12,"fila":12,"min":12,"max":17,"dir":1},
      {"tipo":"h","spr":"yalunkaBa","x":13,"fila":7,"min":13,"max":18,"dir":1},
      {"tipo":"h","spr":"sabaLeiba","x":10,"fila":4.5,"min":10,"max":15,"dir":1},
      {"tipo":"v","spr":"kongamato","x":200,"y":8,"min":8,"max":32,"dy":1,"duerme":true},
      {"tipo":"dueno","spr":"fantasmaDueno","x":152,"y":84,"k":1},
      {"tipo":"cofre","spr":"cofreTrampa","x":232,"y":104,"min":208,"max":232}
    ]
  },
  {
    id: "mus-esfinge",
    nombre: "La Sala de la Esfinge",
    paleta: "cajafuerte",
    aire: 0.75,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWW                          W",
      "WWWWW    K                K    W",
      "W h Z                          W",
      "Wg  Z                  b       W",
      "WFFFFFFFFFF          FFFFFFFFFFW",
      "W           F      F           W",
      "W         K                    W",
      "WFF  FFFFFFFFFFFFFFFFFFFFF   FFW",
      "W@ FF                      FFP W",
      "W    K             K           W",
      "WFFFF   FFFFFFFFFFFFFFFF   FFFFW",
      "W                              W",
      "W      F                F      W",
      "W K z                   K    K W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,3,3,4]
    ],
    premioFinal: [
      29,
      3,
      "diamante"
    ],
    trucos: [
      {"tipo":"esfinge","x":5,"y":4,"hace":"premio","premio":[1,3,"vida"]}
    ],
    prensas: [
      {"x":7,"arriba":1,"abajo":3,"periodo":48,"fase":0}
    ],
    barras: [
      {"x":22,"y1":9,"y2":10,"periodo":48,"cerrada":24,"fase":0},
      {"x":7,"y1":6,"y2":7,"periodo":48,"cerrada":20,"fase":24}
    ],
    rayos: [
      {"x1":17,"x2":21,"y1":3,"y2":4,"periodo":48,"encendido":12,"fase":6}
    ],
    enemigos: [
      {"tipo":"h","spr":"esfinge","x":13,"fila":12,"min":11,"max":16,"dir":1,"lento":true},
      {"tipo":"v","spr":"basilisco","x":112,"y":16,"min":16,"max":40,"dy":1},
      {"tipo":"h","spr":"tokoloshe","x":10,"fila":9.5,"min":10,"max":15,"dir":1},
      {"tipo":"h","spr":"biloko","x":18,"fila":6,"min":18,"max":23,"dir":1},
      {"tipo":"v","spr":"adze","x":200,"y":8,"min":8,"max":32,"dy":1}
    ]
  },
  {
    id: "nerja-vecino",
    nombre: "La Casa del Jardinero",
    tema: "jardin",
    aire: 1.1,
    objetos: [
      {"x":28,"y":13,"tipo":"pieza","id":"casco"}
    ],
    deseo: "gafas",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  d    K    o o o o     K     W",
      "W                     e        W",
      "W P                            W",
      "W                  K           W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFF    W",
      "W                              W",
      "W    o o o    K    b        BB W",
      "W    FFFFFFFFFFF>>>>FFFFFFFFFFFW",
      "W                              W",
      "WBB K  e   o o o  K       d   KW",
      "WFFFFFFFFFFFFFFFFFF      WWWWWWW",
      "W@                       Z     W",
      "W      h     K       BB  Z v a W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [26,13,30,14]
    ],
    trucos: [
      {"tipo":"cuadro","x":13,"y":10,"hace":"premio","premio":[16,10,"diamante"]}
    ],
    enemigos: [
      {"tipo":"h","spr":"hormigaCortadora","x":12,"fila":13,"min":12,"max":14,"dir":1,"lento":true},
      {"tipo":"h","spr":"gato","x":8,"fila":10,"min":3,"max":8,"dir":-1},
      {"tipo":"h","spr":"pato","x":17,"fila":7,"min":12,"max":17,"dir":-1},
      {"tipo":"v","spr":"polillaColibri","x":184,"y":80,"min":80,"max":104,"dy":1},
      {"tipo":"v","spr":"gaviota","x":224,"y":16,"min":16,"max":56,"dy":1}
    ]
  },
  {
    id: "nerja-extra",
    nombre: "La Casa sin Número",
    tema: "cala",
    aire: 0.9,
    objetos: [
      {"x":30,"y":2,"tipo":"llaveRara","id":"nerja"}
    ],
    deseo: "regadera",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W       K      g     K  P  Z v W",
      "W                          Z d W",
      "W    FFFFFCCCCFFFFFF  FFFFFFFFFW",
      "W           K           a      W",
      "WBB                 BB         W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFF    W",
      "W        K               K     W",
      "W                            BBW",
      "W    FFFFFFFFF       FFFFFFFFFFW",
      "W           K       K          W",
      "WBB             XX             W",
      "WFFFFFFF<<<<FFFFFFFFFFFFFFF    W",
      "W@                             W",
      "W    r      K        K       BBW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [28,1,30,2]
    ],
    fantasmas: [
      [25,7]
    ],
    plataformas: [
      {"tipo":"nube","x":112,"y":72,"ancho":2,"eje":"h","min":112,"max":152,"vel":1,"fase":0}
    ],
    barras: [
      {"x":17,"y1":4,"y2":5,"periodo":80,"cerrada":40,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":9,"fila":13,"min":9,"max":14,"dir":1},
      {"tipo":"h","spr":"rata","x":22,"fila":10,"min":20,"max":24,"dir":-1,"lento":true},
      {"tipo":"h","spr":"pato","x":22,"fila":7,"min":21,"max":26,"dir":1},
      {"tipo":"v","spr":"medusa","x":224,"y":72,"min":72,"max":96,"dy":1},
      {"tipo":"v","spr":"gaviota","x":104,"y":32,"min":32,"max":72,"dy":1},
      {"tipo":"v","spr":"murcielago","x":208,"y":8,"min":8,"max":32,"dy":1}
    ]
  },
  {
    id: "edificio-extra",
    nombre: "El Piso 13 B",
    tema: "jardin",
    paleta: "ameba2",
    aire: 0.72,
    objetos: [
      {"x":28,"y":10,"tipo":"pieza","id":"peto"},
      {"x":29,"y":11,"tipo":"postal","id":"edificio"}
    ],
    mundo: "edificio",
    sombras: [
      [27,10,30,11]
    ],
    plataformas: [
      {"tipo":"ascensor","x":184,"y":48,"ancho":2,"eje":"v","min":48,"max":96,"vel":2,"espera":24,"fase":0},
      {"tipo":"sofa","x":152,"y":40,"ancho":3,"eje":"h","min":152,"max":200,"vel":2,"espera":24,"fase":0}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     K        K      b    P   W",
      "W                              W",
      "WFFFFFFFFFFFFFFFCCCFFFFFFFFFFFFW",
      "Wa                   K         W",
      "W B        K                   W",
      "WFFFFFFFFFFBFFFFFFFFFFF  FFFFFFW",
      "W                              W",
      "W    K         K            B  W",
      "WFFFFFFFFCCCCFFFFFFFFFF  FFFFFFW",
      "W                         Z  a W",
      "W B     K          K      Z g dW",
      "WFFFFFFFFF>>FFFFFFFFFFFFFFFFFFFW",
      "W@          K                  W",
      "W    XX           XX  B   K    W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":20,"y":8,"hace":"cae","celdas":[[13,6],[14,6]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":10,"fila":13,"min":10,"max":15,"dir":1},
      {"tipo":"v","spr":"presidente","x":160,"y":56,"min":56,"max":104,"dy":1,"vecino":true,"minFinal":8,"dyFinal":2},
      {"tipo":"g","spr":"gigante","x":104,"y":32},
      {"tipo":"h","spr":"pinguino","x":22,"fila":4,"min":21,"max":26,"dir":-1},
      {"tipo":"v","spr":"murcielago","x":48,"y":56,"min":56,"max":88,"dy":2},
      {"tipo":"f","spr":"satelite","cols":[96,200],"y0":8,"yFin":104,"vel":3,"espera":16,"fase":0}
    ]
  },
  {
    id: "urba-extra",
    nombre: "El Chalet del Promotor",
    tema: "notaria",
    aire: 1.2,
    objetos: [
      {"x":29,"y":14,"tipo":"pieza","id":"guanteletes"},
      {"x":25,"y":13,"tipo":"postal","id":"urba"}
    ],
    deseo: "muelle",
    famoso: "futbolista",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K       h             K     W",
      "W                              W",
      "W P     LL                     W",
      "W   e   LL                     W",
      "WFFFFFFFFFFFFCCCCFFFFF  FFFFFFFW",
      "W                     BB       W",
      "W        K         r       K   W",
      "WFFFFFFFFFF  FFMFFFFFFF>>>>FFFFW",
      "W          BB  M               W",
      "W   K          M      g     K  W",
      "WFFF  FFFFFFFFFFFFFFFFFFFFFFFFFW",
      "W@  BB   m      K      Z   v   W",
      "W                      Z       W",
      "WFFFFFFFFFFFXXFFFFFFFFFFFFFFFFFW"
    ],
    fantasmas: [
      [9,8]
    ],
    premioFinal: [
      5,
      4,
      "vida"
    ],
    frenos: [
      {"x":8,"y":14,"a":"c","pasos":45,"recarga":150,"dibujo":"trituradora"}
    ],
    palancas: [
      {"x":25,"y":11,"hace":"abre","celdas":[[8,4],[9,4],[8,5],[9,5]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":16,"fila":13,"min":16,"max":21,"dir":1},
      {"tipo":"h","spr":"gato","x":5,"fila":10,"min":5,"max":10,"dir":1},
      {"tipo":"v","spr":"murcielago","x":144,"y":40,"min":40,"max":64,"dy":1},
      {"tipo":"v","spr":"gaviota","x":136,"y":8,"min":8,"max":32,"dy":1},
      {"tipo":"c","spr":"inspector","x":16,"y":104,"vel":1},
      {"tipo":"t","spr":"timido","x":232,"y":16,"vel":1}
    ]
  },
  {
    id: "rec-extra",
    nombre: "La Máquina Prohibida",
    tema: "portales",
    aire: 1.5,
    objetos: [
      {"x":29,"y":4,"tipo":"pieza","id":"grebas"},
      {"x":27,"y":2,"tipo":"postal","id":"recreativos"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         W    W",
      "W   K       K        K    W  v W",
      "W                         W    W",
      "W  P                      Z    W",
      "W                         Z h  W",
      "WFFFFFFFFFFCCCCFFFFF   FFFFFFFFW",
      "W                              W",
      "W   K         e        K       W",
      "WFFTTFFFF<<<<<<FFFFF   FFFFFFFFW",
      "W                              W",
      "W       K        K          K  W",
      "WFFFFFFFFFFHHHH    FFFFFFFFTTFFW",
      "W@                             W",
      "W            K             K   W",
      "WFFFFFFFTTFFFFFXXFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [27,1,30,5]
    ],
    prensas: [
      {"x":17,"arriba":1,"abajo":5,"periodo":80,"fase":0}
    ],
    rayos: [
      {"x1":18,"x2":18,"y1":7,"y2":8,"periodo":80,"encendido":40,"fase":40}
    ],
    barras: [
      {"x":22,"y1":10,"y2":11,"periodo":80,"cerrada":40,"fase":20}
    ],
    enemigos: [
      {"tipo":"h","spr":"vectorViper","x":18,"fila":14,"min":18,"max":27,"dir":1},
      {"tipo":"h","spr":"vectorViper","x":5,"fila":8,"min":5,"max":14,"dir":1},
      {"tipo":"v","spr":"pixelPhoenix","x":128,"y":72,"min":72,"max":112,"dy":1},
      {"tipo":"v","spr":"screenSpider","x":64,"y":8,"min":8,"max":48,"dy":1},
      {"tipo":"f","spr":"glitchGhoul","x":122,"y":0,"cols":[122,48,156,88,196],"y0":0,"yFin":32,"vel":4,"espera":8}
    ]
  },
  {
    id: "mus-extra",
    nombre: "La Cámara de las Leyendas Perdidas",
    tema: "cueva",
    aire: 1.5,
    objetos: [
      {"x":3,"y":14,"tipo":"pieza","id":"escudo"},
      {"x":1,"y":13,"tipo":"llaveRara","id":"museo"}
    ],
    famoso: "actriz",
    leyendaDorada: {"x":20,"y":5,"n":5},
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W   K         K          K     W",
      "W                              W",
      "W@                         E   W",
      "W                          E   W",
      "WFFFFFFSSSFFFF    FFFFFFFFFEFFFW",
      "W                          E   W",
      "W  K        K        z     E K W",
      "WFFFFFFFFF   FFFFSSSSFFFFFFEFFFW",
      "W                          E   W",
      "W K                  K     E   W",
      "WFFFFFFF    FFFFFFFFFFFFFFFEFFFW",
      "W h Z                      E P W",
      "Wr  Z K               K    E   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,13,3,14]
    ],
    prensas: [
      {"x":11,"arriba":1,"abajo":5,"periodo":48,"fase":0}
    ],
    rayos: [
      {"x1":27,"x2":27,"y1":7,"y2":8,"periodo":48,"encendido":20,"fase":0},
      {"x1":24,"x2":25,"y1":13,"y2":14,"periodo":48,"encendido":20,"fase":24}
    ],
    barras: [
      {"x":17,"y1":10,"y2":11,"periodo":48,"cerrada":24,"fase":12}
    ],
    enemigos: [
      {"tipo":"h","spr":"arañaPavo","x":18,"fila":5,"min":18,"max":23,"dir":1},
      {"tipo":"h","spr":"tokoloshe","x":13,"fila":7.5,"min":13,"max":24,"dir":1},
      {"tipo":"h","spr":"sabaLeiba","x":12,"fila":10.5,"min":12,"max":17,"dir":1},
      {"tipo":"h","spr":"rompo","x":8,"fila":13.5,"min":8,"max":19,"dir":1},
      {"tipo":"v","spr":"kongamato","x":120,"y":56,"min":56,"max":104,"dy":1}
    ]
  },
  {
    id: "galaxia-extra",
    dobleSalto: true,
    nombre: "La Nave Nodriza",
    tema: "nave",
    gravedad: "baja",
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K          b          K     W",
      "W                              W",
      "W                              W",
      "W                              W",
      "WFFFF   CCCC   FFFF   CCCC  FFFW",
      "W                   L          W",
      "W  K       K        L     K    W",
      "WFFFFFF>>>>   XXXX  <<<<FFFFFFFW",
      "W                              W",
      "W     a      K         K       W",
      "WFFFFF   WWWWWWFF   FFFFF  WWWWW",
      "W@                   P   Z  d  W",
      "W     K                  Z  g  W",
      "WFFFFFFFFFYYYYFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [26,13,30,14]
    ],
    viento: [
      [1,1,30,3,1]
    ],
    vapor: [
      {"zona":[10,14,13,14],"periodo":80,"on":48,"fase":0,"dibujo":"tobera"}
    ],
    palancas: [
      {"x":29,"y":4,"hace":"abre","celdas":[[20,7],[20,8]]}
    ],
    enemigos: [
      {"tipo":"c","spr":"ameba","x":128,"y":8,"vel":1},
      {"tipo":"f","spr":"satelite","cols":[104,136],"y0":8,"yFin":80,"vel":2,"espera":12,"fase":0},
      {"tipo":"h","spr":"robot","x":9,"fila":10,"min":9,"max":14,"dir":1},
      {"tipo":"h","spr":"robot","x":15,"fila":4,"min":15,"max":17,"dir":1,"lento":true},
      {"tipo":"v","spr":"ameba","x":144,"y":56,"min":56,"max":80,"dy":1}
    ]
  },
  {
    id: "planeta-x",
    dobleSalto: true,
    nombre: "El Planeta Secreto",
    tema: "luna",
    gravedad: "baja",
    aire: 1.4,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K  o o o     b    o o o  K  W",
      "W                              W",
      "W                 K            W",
      "WFFFFFF      BBBBBB      FFFFFFW",
      "W           BBBBBBBB           W",
      "W   e      BBBBBBBBBB      g   W",
      "WFFFFFF    BBBBBBBBBB    FFFFFFW",
      "W           BBBBBBBB           W",
      "W  K         BBBBBB         K  W",
      "WFFFFFFF     o o o     FFF     W",
      "W                         WWWWWW",
      "W@         K        P     Z  d W",
      "W                         Z  h W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [26,13,30,14]
    ],
    trucos: [
      {"tipo":"paciente","x":14,"y":4,"hace":"premio","premio":[15,4,"vida"]}
    ],
    fantasmas: [
      [28,2]
    ],
    plataformas: [
      {"tipo":"luna","x":120,"y":60,"ancho":2,"eje":"e","cx":128,"cy":60,"radioX":80,"radioY":44,"periodo":96,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":8,"fila":13,"min":8,"max":13,"dir":1},
      {"tipo":"v","spr":"ameba","x":168,"y":72,"min":72,"max":96,"dy":1},
      {"tipo":"v","spr":"satelite","x":72,"y":8,"min":8,"max":32,"dy":1}
    ]
  },
  {
    id: "camara-acorazada",
    dobleSalto: true,
    nombre: "La Cámara Acorazada",
    tema: "tesoro",
    acorazada: true,
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                        WWWWWWW",
      "W   b   o o o o o o o o  Z dd  W",
      "W  K                  K  Z     W",
      "WFFFFFFFFFFFF      FFFFFFFFFFFFW",
      "W                              W",
      "W        l BB   K  BB          W",
      "WFFFFF   FFFFFFFFFFFFFF   FFFFFW",
      "W                              W",
      "W  e  BB   K  o o  K   BB  e   W",
      "WFFFFFFFFF            FFFFFFFFFW",
      "W@   o o o     d      o o o P  W",
      "W         BB      BB           W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [26,4,30,5]
    ],
    objetos: [
      {"x":28,"y":5,"tipo":"carta","id":11}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":13,"fila":7,"min":13,"max":17,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":120,"y":16,"min":16,"max":40,"dy":1},
      {"tipo":"dueno","spr":"fantasmaDueno","x":176,"y":16,"k":1}
    ]
  },
  {
    id: "jefe-nerja",
    nombre: "El Puerto del Pulpo",
    tema: "puerto",
    mundo: "nerja",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                         a    W",
      "W                           Z  W",
      "W     g                     Z dW",
      "W                        FFFFFFW",
      "W @                 P          W",
      "W                      BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"pulpo","vida":3,"fases":3,"cols":[9,15,21],"cuerpo":[112,8,32],"an":32,"al":24,"charco":[13,18]},
    plataformas: [
      {"tipo":"cajaPescado","x":32,"y":112,"ancho":2,"eje":"v","min":80,"max":112,"vel":1,"espera":16,"fase":0},
      {"tipo":"cajaPescado","x":88,"y":112,"ancho":2,"eje":"v","min":80,"max":112,"vel":1,"espera":16,"fase":48}
    ],
    enemigos: [
      {"tipo":"cofre","spr":"cofreTrampa","x":232,"y":80,"min":200,"max":232}
    ]
  },
  {
    id: "jefe-edificio",
    nombre: "El Ático del Gorila",
    tema: "obra",
    mundo: "edificio",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W      E                       W",
      "W      E                       W",
      "W      EOOOOOOOO               W",
      "W      E                    Z  W",
      "W    g E                    Z dW",
      "W      E                 FFFFFFW",
      "W @    E            P          W",
      "W      E               BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"gorila","vida":3,"fases":2,"an":24,"al":24,"min":96,"max":160,"escalon":45,"caen":{"cols":[5,9,13,17,21],"periodo":48,"dobleEn":2},"rompe":[[8,9],[9,9],[14,9],[15,9]]},
    enemigos: [
      {"tipo":"h","spr":"termitas","x":9,"fila":8,"min":8,"max":13,"dir":1,"lento":true,"come":"madera"}
    ]
  },
  {
    id: "jefe-urba",
    nombre: "Las Grúas del Promotor",
    tema: "golf",
    mundo: "urba",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                         B    W",
      "W                              W",
      "W                              W",
      "W                           Z  W",
      "W   g                     K Z dW",
      "W                        FFFFFFW",
      "W @                 P          W",
      "W                      BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"promotor","vida":3,"fases":3,"an":16,"al":16,"y":24,"min":16,"max":208},
    palancas: [
      {"x":6,"y":14,"hace":"jefe"},
      {"x":13,"y":14,"hace":"jefe"},
      {"x":18,"y":14,"hace":"jefe"}
    ],
    barras: [
      {"x":10,"y1":12,"y2":14,"periodo":96,"cerrada":32,"fase":0},
      {"x":16,"y1":12,"y2":14,"periodo":96,"cerrada":32,"fase":48}
    ],
    enemigos: [
      {"tipo":"okupa","spr":"okupa","x":200,"y":80,"llave":[26,11],"techo":[26,7],"salida":-1},
      {"tipo":"suegra","spr":"suegra","x":40,"y":104,"min":8,"max":64}
    ]
  },
  {
    id: "jefe-recreativos",
    dobleSalto: true,
    nombre: "El Salón del Rey de las Fichas",
    tema: "casino",
    mundo: "recreativos",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                           Z  W",
      "W    g                   o oZ dW",
      "W                        FFFFFFW",
      "W @         P                  W",
      "W                      BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"reyFichas","vida":3,"fases":3,"an":24,"al":16,"x":152,"sentido":-1,"fichasQuedan":45,"garra":{"x":120,"suelta":16},"lluvia":{"cols":[4,6,8,10,12,14,16],"periodo":32,"dobleEn":2}},
    enemigos: [
      {"tipo":"h","spr":"aspiradora","x":25,"fila":11,"min":25,"max":28,"dir":1,"lento":true,"come":"monedas"},
      {"tipo":"h","spr":"moroso","x":1,"fila":13,"min":1,"max":6,"dir":1,"lento":true,"roba":150}
    ]
  },
  {
    id: "jefe-museo",
    dobleSalto: true,
    nombre: "La Sala de la Momia",
    tema: "biblioteca",
    mundo: "museo",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                           Z  W",
      "W   l                       Z dW",
      "WFFFFFFFF                FFFFFFW",
      "W @                 P          W",
      "W         BB           BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"momia","vida":3,"fases":3,"an":16,"al":16,"x":144,"suelo":15,"min":96,"max":168,"venda":96,"vitrinas":[[104,15,96,168,[{"tipo":"h","spr":"hormigaCortadora","x":11,"fila":13,"min":9,"max":11,"dir":-1,"lento":true,"pisable":true},{"tipo":"h","spr":"hormigaCortadora","x":15,"fila":13,"min":15,"max":17,"dir":1,"lento":true,"pisable":true}]],[136,15,96,168,[{"tipo":"h","spr":"hormigaCortadora","x":15,"fila":13,"min":13,"max":15,"dir":-1,"lento":true,"pisable":true},{"tipo":"h","spr":"hormigaCortadora","x":19,"fila":13,"min":19,"max":21,"dir":1,"lento":true,"pisable":true}]],[8,12,8,48]]},
    enemigos: [
      {"tipo":"dueno","spr":"fantasmaDueno","x":44,"y":76,"k":0},
      {"tipo":"perro","spr":"perroGuardian","x":216,"y":88,"min":200,"max":224}
    ]
  },
  {
    id: "jefe-galaxia",
    dobleSalto: true,
    nombre: "La Órbita del Cometa Rey",
    tema: "luna",
    mundo: "galaxia",
    gravedad: "baja",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                          a   W",
      "W     g                     Z  W",
      "W                           Z dW",
      "W                        FFFFFFW",
      "W @                 P          W",
      "W                      BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"cometa","vida":3,"fases":2,"an":16,"al":16,"cx":120,"cy":40,"radio":30,"onda":3},
    enemigos: [

    ]
  },
  {
    id: "jefe-final",
    dobleSalto: true,
    nombre: "La Azotea del Gran Tasador",
    tema: "azotea",
    mundo: "final",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                         v    W",
      "W                           Z  W",
      "W    g                      Z dW",
      "W                        FFFFFFW",
      "W @                 P          W",
      "W                      BB      W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    jefe: {"tipo":"granTasador","vida":6,"fases":3,"an":16,"al":24,"min":64,"max":128,"yGrua":16,"caen":{"cols":[5,8,11,14,17,20],"periodo":48},"ayudantes":[{"tipo":"h","spr":"cangrejo","x":3,"fila":13,"min":3,"max":7,"dir":1,"lento":true},{"tipo":"h","spr":"rata","x":17,"fila":13,"min":16,"max":21,"dir":-1,"lento":true},{"tipo":"h","spr":"pinguino","x":26,"fila":10,"min":25,"max":27,"dir":1,"lento":true}]},
    enemigos: [

    ]
  },
  {
    id: "sorpresas",
    nombre: "El Chalet de las Sorpresas",
    tema: "villa",
    mundo: "urba",
    aire: 1,
    ancho: 48,
    dobleSalto: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWW                               W     Z     W",
      "WWWW      K                        W d   Z     W",
      "WWWW    FFFFFF                     WWWWWWFFFF  W",
      "WWWW                                           W",
      "WWWW K                  KXX                    W",
      "WWWWFFFFFFFFFFFFF   FFFFFFFFFFF             FFFW",
      "W  W                                           W",
      "W  W        K   X                     K g      W",
      "W  WFFF$$$FFFFFFFFFFF        FFFFFFFFFFFFFFFFFFW",
      "W  W                                           W",
      "W  W  K              ooo           K           W",
      "W  WFFFFFFFFFFFFFFFF       FFFFFFFFFFFF        W",
      "W@      K                                    P W",
      "W                                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFXXXFFFFFFFFFFFFFFFFFFFW"
    ],
    palancas: [
      {"x":14,"y":14,"hace":"monedas"}
    ],
    medallas: [
      [16,13],
      [44,7]
    ],
    salidaSecreta: {"x":42,"y":1,"calle":"urba-circuito","px":8,"py":13},
    muelle: [
      [1,7,"diamante"]
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":20,"fila":13,"min":18,"max":24,"dir":1},
      {"tipo":"h","spr":"pato","x":38,"fila":7,"min":35,"max":41,"dir":-1},
      {"tipo":"h","spr":"robot","x":8,"fila":4,"min":6,"max":12,"dir":1},
      {"tipo":"h","spr":"robot","x":29,"fila":10,"min":27,"max":30,"dir":1},
      {"tipo":"v","spr":"murcielago","x":192,"y":40,"min":40,"max":88,"dy":2}
    ]
  },
  {
    id: "club-playa",
    nombre: "El Club de Playa",
    tema: "marina",
    mundo: "nerja",
    dobleSalto: true,
    aire: 1.2,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWWWWWWWWWWWW           P   W",
      "WWWWWWWWWWWWWWWW   K           W",
      "WWWWWWWWWWWWWWWWFFFFF   FFFFFFFW",
      "WWWWWW  Z      K               W",
      "WWWWWWd Z K         x        K W",
      "WWWWWWWWWFFF        FFXXXXXXFFFW",
      "WWWWW                          W",
      "WWWWW                      K   W",
      "WWWWWFFFFF            FFFFFFFFFW",
      "W@                             W",
      "W                  K           W",
      "WFFFFFFFF   FFF<<<<FF   FFFFFFFW",
      "W                              W",
      "W      K      g            K   W",
      "WFFFFFFFFXXFFFFFFFFFFFXXFFFFFFFW"
    ],
    agua: {"arriba":13,"abajo":16,"periodo":192,"fase":0},
    burbujas: [
      [3,14,10,96,0],
      [13,14,10,96,32],
      [23,14,10,96,64]
    ],
    baile: [
      {"x1":11,"x2":15,"y":9,"periodo":48,"on":24,"fase":0},
      {"x1":16,"x2":20,"y":9,"periodo":48,"on":24,"fase":24}
    ],
    lianas: [
      {"x":128,"y":8,"largo":32,"amp":30,"periodo":96,"fase":0}
    ],
    viento: [
      [19,1,30,2,-1]
    ],
    perroCliente: [
      6,
      8
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":13,"fila":13,"min":13,"max":15,"dir":1},
      {"tipo":"h","spr":"pato","x":26,"fila":10,"min":26,"max":28,"dir":1},
      {"tipo":"v","spr":"gaviota","x":120,"y":32,"min":32,"max":56,"dy":2},
      {"tipo":"gente","spr":"camarero","x":16,"y":80,"min":8,"max":56,"dir":1,"hace":"ayuda","regalo":"aire"}
    ]
  },
  {
    id: "obra-ascensor",
    nombre: "La Obra con Ascensor",
    tema: "obra",
    mundo: "nerja",
    dobleSalto: true,
    aire: 1.2,
    obras: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWWWW             K      P WWW",
      "WWWWWWW  K               K   WWW",
      "WWWWWWWFFFFFF   FFFFFFFFCCCFFWWW",
      "WWWWWWW             b        WWW",
      "WWWWWWW  K               K   WWW",
      "WWWWWWWFFFFFF   FFXXXXXXFCCCFWWW",
      "WWWWWW                       WWW",
      "WWWWWW     K              K  WWW",
      "WWWWWWFFFFFFF   FF>>>>FFFFFFWWWW",
      "W@                          Z  W",
      "W      K                    Zg W",
      "WFFFFFFFFFFFFFFFFFFFFXXXFFFFFFFW"
    ],
    bonus: [
      [8,11,"ladrillos"]
    ],
    plataformas: [
      {"tipo":"ascensorCristal","x":104,"y":120,"ancho":3,"eje":"v","min":48,"max":120,"vel":1,"espera":24,"fase":0}
    ],
    notario: {"x":8,"y":5,"periodo":96,"esta":48,"fase":0},
    palancas: [
      {"x":28,"y":8,"hace":"bocaAbajo","dura":480},
      {"x":11,"y":14,"hace":"cambia","celdas":[[13,12,"O"],[14,12,"O"],[15,12,"O"],[13,9,"O"],[14,9,"O"],[15,9,"O"]]}
    ],
    enemigos: [
      {"tipo":"f","spr":"cascote","cols":[136,168],"y0":16,"yFin":32,"vel":2,"espera":4,"fase":0},
      {"tipo":"h","spr":"robot","x":8,"fila":7,"min":8,"max":10,"dir":1},
      {"tipo":"h","spr":"rata","x":9,"fila":13,"min":9,"max":11,"dir":-1},
      {"tipo":"gente","spr":"vecina","x":64,"y":80,"min":56,"max":96,"dir":1,"hace":"molesta"}
    ]
  },
  {
    id: "superbonus-1",
    nombre: "La Cueva del Oro",
    tema: "cueva",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWW                          W",
      "WWWWW               e          W",
      "W  dZ   o o o o o o o o        W",
      "W v Z        K      P          W",
      "Wg  Z                          W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF      W",
      "W           b     o o o o   K  W",
      "W       K                  BB  W",
      "W      FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W     o o                      W",
      "W  BB     g    K   o o o       W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF      W",
      "W@   o o o o o o o o o o   K   W",
      "W                          BB  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"generoso","spr":"generoso","x":64,"y":104,"min":40,"max":176},
      {"tipo":"v","spr":"murcielago","x":112,"y":8,"min":8,"max":32,"dy":1}
    ]
  },
  {
    id: "superbonus-2",
    nombre: "El Ascensor del Tesoro",
    tema: "tesoro",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W     P     K   o o o o o      W",
      "W                              W",
      "W     FFFFFFFFFFFFFFFFFFFFF    W",
      "W  o o o o o o      K g     o  W",
      "W BB                           W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFF    W",
      "W  K    o o o e o o o o o   o  W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFF    W",
      "W d Z  o o o o  K  o o o o  o  W",
      "W v Z                          W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFF    W",
      "W@  o o o o o o  K  o o o   o  W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    plataformas: [
      {"tipo":"ascensor","x":216,"y":112,"ancho":3,"eje":"v","min":48,"max":112,"vel":2,"espera":16,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":8,"fila":7,"min":8,"max":13,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":96,"y":16,"min":16,"max":40,"dy":1}
    ]
  },
  {
    id: "superbonus-3",
    dobleSalto: true,
    nombre: "La Tubería Gigante",
    tema: "obra",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W         o o o o o o o o      W",
      "W             K     P   e    1 W",
      "W                              W",
      "W       FFFFFFFFFFFFFFFFFFFFFFFW",
      "W     o o K o o o o o          W",
      "W   BB                         W",
      "WFFFFFFFFFFFFFFFFFFFFFF        W",
      "W            o o oKo o o       W",
      "W                         BB   W",
      "W          BBBBBBBBBBBBBBBBBBBBW",
      "Wd Z@    K  o o o o o o o  1 BBW",
      "W vZ   BB    o ogo oKo o o   BBW",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":13,"fila":10,"min":13,"max":17,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":128,"y":48,"min":48,"max":72,"dy":1}
    ]
  },
  {
    id: "superbonus-4",
    dobleSalto: true,
    nombre: "La Sala de los Espejos de Oro",
    tema: "feria",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W      o                o      W",
      "W                              W",
      "W        oKo o P  o ogo        W",
      "W                              W",
      "W     FFFFFFFFFFFFFFFFFFFF     W",
      "W   Ko o o            o o oK   W",
      "W BB                        BB W",
      "WFFFFFFFFFF          FFFFFFFFFFW",
      "W       o o o e  e o o o       W",
      "W          BB      BB          W",
      "W     FFFFFFFFFFFFFFFFFFFF     W",
      "W@    K o o  Z d  Z  o o K     W",
      "W  BB        Z  v Z        BB  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"generoso","spr":"generoso","x":88,"y":32,"min":48,"max":176},
      {"tipo":"v","spr":"murcielago","x":120,"y":64,"min":64,"max":88,"dy":1}
    ]
  },
  {
    id: "superbonus-5",
    dobleSalto: true,
    nombre: "La Bodega del Galeón",
    tema: "bodega",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         WWWWWW",
      "W                         WWWWWW",
      "W         o o o o o o o   Z d  W",
      "W            K  b     P   Z  v W",
      "W                         Zb   W",
      "W     FFFFFFFFFFFFFFFFFFFFFFFFFW",
      "W    K go o o o o o o          W",
      "W BB                           W",
      "WFFFFFFF<<<<<<<<<<<<<<<        W",
      "W           o o o o b o K      W",
      "W                         BB   W",
      "W         FFFFFFFFFFFFFFFFFFFFFW",
      "W@o o     o o oKo o o o o   K  W",
      "W     BB                       W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"generoso","spr":"generoso","x":128,"y":80,"min":88,"max":176},
      {"tipo":"h","spr":"cangrejo","x":10,"fila":13,"min":10,"max":15,"dir":1}
    ]
  },
  {
    id: "superbonus-6",
    dobleSalto: true,
    nombre: "La Cámara de Cristal",
    tema: "cristal",
    aire: 2,
    gravedad: "baja",
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         WWWWWW",
      "W       eK e      e  eP   Z d  W",
      "W                         Z  v W",
      "W      GGGGGG    GGGGGGGGGGGGGGW",
      "W                              W",
      "W g  g        gK g         g K W",
      "W                              W",
      "WGGGGGG      GGGGGG      GGGGGGW",
      "W                              W",
      "W     bK b           b  b      W",
      "W                              W",
      "W    GGGGGG         GGGGGG     W",
      "W@  e o   o e o K o e o   o e  W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"v","spr":"medusa","x":88,"y":64,"min":64,"max":88,"dy":1},
      {"tipo":"v","spr":"medusa","x":176,"y":24,"min":24,"max":64,"dy":1}
    ]
  },
  {
    id: "superbonus-7",
    dobleSalto: true,
    nombre: "La Mina de Diamantes",
    tema: "luna",
    aire: 2,
    gravedad: "baja",
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W Pg  g K             d   WWWWWW",
      "W                         WWWWWW",
      "WFFFFFFFFFF         FFFFF WWWWWW",
      "W                         WWWWWW",
      "W     K d          o o o KZ d  W",
      "W                         Zd v W",
      "W   FFFFFFFFF  CC  FFFFFFFFFFFFW",
      "W                              W",
      "W o o o   d          K   d     W",
      "W                              W",
      "WFFFFFFFFCCC  WW  FFFFFFCCC    W",
      "W             WW               W",
      "W@ o o o o oK WW o  o  o  o  o W",
      "W             WW               W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"generoso","spr":"generoso","x":144,"y":104,"min":136,"max":200},
      {"tipo":"v","spr":"murcielago","x":72,"y":40,"min":40,"max":64,"dy":1}
    ]
  },
  {
    id: "superbonus-8",
    nombre: "La Sala de las Monedas que Llueven",
    tema: "tesoro",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWW      o        o          W",
      "WWWWW      o        o          W",
      "W d Z      o        o          W",
      "W   Z  Po  o   o K  o  o       W",
      "W v Z      o        o          W",
      "WFFFFFFFFFFo FFFFFF oFFFF      W",
      "W        o o    o   o g o   K  W",
      "W          o        o      BB  W",
      "W      FFFFo FFFFFF oFFFFFFFFFFW",
      "W     o    o   go   o K        W",
      "W  BB      o        o          W",
      "WFFFFFFFFFFo FFFFFF oFFFF      W",
      "W@    o oK o   o    o  o o K   W",
      "W          o        o      BB  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    cascada: [
      [11,1,12,14],
      [19,1,20,14]
    ],
    enemigos: [
      {"tipo":"generoso","spr":"generoso","x":104,"y":104,"min":48,"max":176},
      {"tipo":"v","spr":"murcielago","x":208,"y":16,"min":16,"max":40,"dy":1}
    ]
  },
  {
    id: "superbonus-9",
    dobleSalto: true,
    nombre: "El Congelador de los Helados",
    tema: "piscina",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "WWWWW                          W",
      "WWWWW                          W",
      "W d Z   o o o o o o o o        W",
      "W v Z         K     P          W",
      "W   Z                          W",
      "WHHHHHHHHHHHHHHHHHHHHHHHH      W",
      "W         g   g   g   g     K  W",
      "W       K                  BB  W",
      "W      FFFFFFHHHHHHHHHHHHFFFFFFW",
      "W       b o b o b o b K        W",
      "W  BB                          W",
      "WHHHHHHHHHHHHHHHHHHHHHHHH      W",
      "W@    e o e K e o e o e o      W",
      "W                          BB  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"h","spr":"pinguino","x":14,"fila":13,"min":14,"max":18,"dir":1,"lento":true},
      {"tipo":"h","spr":"pinguino","x":20,"fila":7,"min":16,"max":20,"dir":-1,"lento":true}
    ]
  },
  {
    id: "superbonus-10",
    nombre: "El Sótano de las Huchas",
    tema: "trastero",
    aire: 2,
    superbonus: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         WWWWWW",
      "W                         WWWWWW",
      "W      o o o o o o o o o  Z d  W",
      "W     P   b       e  K    Z  v W",
      "W                         Z g  W",
      "WFF  FFFFFFFFF  FFFFFFFFFFFFFFFW",
      "W  oo  o      oo o      o K    W",
      "W  BB         BB               W",
      "WFFFFFFFFF  FFFFFFF  FFFFFFF   W",
      "W o       oo o   K oo o     oo W",
      "W         BB       BB       BB W",
      "WFFFFF  FFFFFFF  FFFFFFF  FFFFFW",
      "W@ o  oo   oK  oo   o   oo  oK W",
      "W     BB       BB       BB     W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    enemigos: [
      {"tipo":"generoso","spr":"generoso","x":136,"y":32,"min":128,"max":176},
      {"tipo":"h","spr":"rata","x":17,"fila":13,"min":17,"max":21,"dir":1,"lento":true}
    ]
  },
  {
    id: "casa-encantada",
    nombre: "La Casa Encantada",
    tema: "bodega",
    aire: 0.8,
    soloFecha: [
      "10-25",
      "11-02"
    ],
    sombras: [
      [1,1,3,2]
    ],
    oscuro: true,
    llavesFalsas: [
      [24,11]
    ],
    pinta: [
      [2,13,"calabaza"],
      [29,1,"telarana"],
      [1,1,"telarana"],
      [20,13,"lapida"],
      [11,7,"calabaza"]
    ],
    enemigos: [
      {"tipo":"h","spr":"glitchGhoul","x":12,"fila":10,"min":10,"max":21,"dir":1},
      {"tipo":"h","spr":"polterStick","x":15,"fila":4,"min":12,"max":17,"dir":-1,"lento":true},
      {"tipo":"h","spr":"murcielago","x":16,"fila":7,"min":10,"max":21,"dir":1},
      {"tipo":"h","spr":"gato","x":22,"fila":13,"min":17,"max":22,"dir":-1}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W   Z    P                     W",
      "W g Z K                        W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF    FFW",
      "W               d     K   BB   W",
      "W                              W",
      "WFF    FFFFFFFFFFFCCCFFFFFFFFFFW",
      "W   BB  K                      W",
      "W               Y              W",
      "WFFFFFFFFFFFCCCCFFFFFFFFF    FFW",
      "W b              K        BB   W",
      "W                   Y          W",
      "WFF    FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB      l @              e W",
      "W         Y                 K  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "casa-navidad",
    nombre: "La Casa de Navidad",
    tema: "villa",
    aire: 0.6,
    soloFecha: [
      "12-20",
      "01-06"
    ],
    sombras: [
      [28,1,30,2]
    ],
    llavesFalsas: [
      [5,5],
      [22,13]
    ],
    pinta: [
      [28,13,"arbolNavidad"],
      [8,13,"regalo"],
      [12,7,"munecoNieve"],
      [5,1,"guirnalda"],
      [17,1,"guirnalda"]
    ],
    enemigos: [
      {"tipo":"h","spr":"pinguino","x":12,"fila":10,"min":9,"max":20,"dir":1},
      {"tipo":"h","spr":"pato","x":14,"fila":4,"min":11,"max":16,"dir":-1,"lento":true},
      {"tipo":"h","spr":"pinguino","x":15,"fila":13,"min":12,"max":17,"dir":-1,"lento":true},
      {"tipo":"h","spr":"pinguino","x":19,"fila":4,"min":17,"max":22,"dir":1}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W             d   P        Z   W",
      "W                       K  Z g W",
      "WFF    FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB   K                     W",
      "W                              W",
      "WFFFFFFFFFFFCCCFFFFFFFFFF    FFW",
      "W                   K     BB e W",
      "W          Y                   W",
      "WFF    FFFFFFFFFCCCCFFFFFFFFFFFW",
      "W g BB    K                    W",
      "W                              W",
      "WFFFFFFFFFFFFFFHHHFFFFFFF    FFW",
      "W  @                      BB   W",
      "W       Y       K              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "sotano-programador",
    nombre: "El Sótano del Programador",
    tema: "jardin",
    paleta: "almacen",
    aire: 0.7,
    sombras: [
      [1,1,3,2]
    ],
    oscuro: true,
    llavesFalsas: [
      [24,11],
      [6,5]
    ],
    pinta: [
      [6,13,"ordenadorViejo"],
      [8,13,"tazaCafe"],
      [18,10,"bocetoAgente"],
      [12,4,"bocetoMapa"],
      [24,7,"bocetoAgente"]
    ],
    enemigos: [
      {"tipo":"h","spr":"retroBit","x":12,"fila":10,"min":10,"max":21,"dir":1},
      {"tipo":"h","spr":"joyBot","x":16,"fila":7,"min":10,"max":21,"dir":-1},
      {"tipo":"h","spr":"retroBit","x":15,"fila":4,"min":12,"max":17,"dir":1,"lento":true},
      {"tipo":"h","spr":"robot","x":22,"fila":13,"min":18,"max":23,"dir":-1}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W   Z   d    P                 W",
      "W g Z K                        W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF    FFW",
      "W                    K    BB   W",
      "W                              W",
      "WFF    FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB   K                     W",
      "W                              W",
      "WFFFFFFFFFFFFFCCCCFFFFFFF    FFW",
      "W              K          BB b W",
      "W         Y                    W",
      "WFF    FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB     l  @                W",
      "W                   Y      K   W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "espejo-total",
    nombre: "La Casa del Espejo",
    tema: "cristal",
    aire: 0.7,
    espejoTotal: true,
    sombras: [
      [1,1,3,2],
      [28,1,30,2]
    ],
    oscuro: true,
    llavesFalsas: [
      [24,13],
      [23,7]
    ],
    pinta: [
      [15,13,"marcoEspejo"]
    ],
    enemigos: [
      {"tipo":"h","spr":"satelite","x":9,"fila":10,"min":8,"max":13,"dir":1},
      {"tipo":"h","spr":"satelite","x":21,"fila":10,"min":17,"max":22,"dir":-1,"espejo":true},
      {"tipo":"h","spr":"satelite","x":10,"fila":4,"min":8,"max":13,"dir":-1},
      {"tipo":"h","spr":"satelite","x":20,"fila":4,"min":17,"max":22,"dir":1,"espejo":true}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W   Z   P            K e   Z   W",
      "W   Z                      Z g W",
      "WFFFFFFFFFFFFF    FFFFFFFFFFFFFW",
      "W              BB       K      W",
      "W                              W",
      "WFF    FFFFFFFFFFFFFFFFFF    FFW",
      "W   BB              K     BB   W",
      "W                              W",
      "WFFFFFFFFFCCCF    FCCCFFFFFFFFFW",
      "W              BB     K        W",
      "W                              W",
      "WFF    FFFFFFFFFFFFFFFFFF    FFW",
      "W @ BBl                   BBK  W",
      "W         Y          Y         W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "casa-miniatura",
    nombre: "La Casa de Muñecas",
    tema: "villa",
    aire: 0.35,
    ancho: 16,
    alto: 8,
    mini: true,
    bonusSala: "mudanza",
    sombras: [
      [1,2,2,3]
    ],
    oscuro: true,
    llavesFalsas: [
      [12,3],
      [10,6]
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":6,"fila":5,"min":4,"max":9,"dir":1,"lento":true},
      {"tipo":"h","spr":"pato","x":5,"fila":2,"min":4,"max":6,"dir":-1,"lento":true}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWW",
      "W    K       e W",
      "W  Z  P       KW",
      "Wg Z     K     W",
      "WFFFFFFFFF   FFW",
      "W@ l       BB  W",
      "W    Y K      KW",
      "WFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "sin-gravedad",
    nombre: "La Sala sin Gravedad",
    tema: "nave",
    gravedad: "baja",
    aire: 0.65,
    sombras: [
      [1,1,3,2]
    ],
    vapor: [
      [18,7,19,11],
      [26,1,27,5]
    ],
    oscuro: true,
    llavesFalsas: [
      [24,11],
      [6,5]
    ],
    pinta: [
      [22,13,"cartelGravedad"],
      [6,10,"particulaFlota"],
      [24,4,"particulaFlota"]
    ],
    enemigos: [
      {"tipo":"h","spr":"astronauta","x":10,"fila":10,"min":8,"max":13,"dir":1},
      {"tipo":"h","spr":"satelite","x":20,"fila":4,"min":17,"max":22,"dir":-1,"lento":true},
      {"tipo":"h","spr":"astronauta","x":18,"fila":7,"min":15,"max":20,"dir":-1},
      {"tipo":"h","spr":"satelite","x":16,"fila":1,"min":14,"max":19,"dir":1}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W   Z     P                    W",
      "W g Z  K             Y         W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF    FFW",
      "W                   K     BB   W",
      "W b                     Y      W",
      "WFF    FFFFFFFFFFFCCCFFFFFFFFFFW",
      "W   BB   K                     W",
      "W             Y              d W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF    FFW",
      "W               K         BB   W",
      "W          Y                   W",
      "WFF    FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB     l  @                W",
      "W                           K  W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  },
  {
    id: "tunel-1983",
    nombre: "El Túnel del Tiempo",
    tema: "jardin",
    paleta: "satelites",
    aire: 0.7,
    bonusSala: "subasta",
    sombras: [
      [28,1,30,2]
    ],
    oscuro: true,
    llavesFalsas: [
      [24,11]
    ],
    pinta: [
      [28,13,"tunelTiempo"],
      [7,10,"cassette"]
    ],
    enemigos: [
      {"tipo":"h","spr":"retroBit","x":14,"fila":10,"min":10,"max":21,"dir":1},
      {"tipo":"h","spr":"satelite","x":12,"fila":4,"min":9,"max":14,"dir":1,"lento":true},
      {"tipo":"h","spr":"joyBot","x":15,"fila":13,"min":12,"max":17,"dir":-1,"lento":true},
      {"tipo":"h","spr":"joyBot","x":14,"fila":7,"min":12,"max":17,"dir":1}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W             e  P         Z   W",
      "W                     K    Z g W",
      "WFF    FFFFFFFFFFFFFFFFFFFFFFFFW",
      "W   BB    K                    W",
      "W                              W",
      "WFFFFFFFFFFFFF<<<<FFFFFFF    FFW",
      "W                  K      BB   W",
      "W             Y                W",
      "WFF    FFFFFFFFFFFFFCCCCFFFFFFFW",
      "W   BB      K                b W",
      "W                 Y            W",
      "WFFFFFFFFFFFFFFFFFFFFFFFF    FFW",
      "W @  l                    BB   W",
      "W        Y     K               W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ]
  }
];
/* Las casas de LA GALAXIA (gravedad baja) */
var LLAVES_GALAXIA = [
  {
    id: "estacion-orbital",
    dobleSalto: true,
    nombre: "La Estación Orbital",
    tema: "espacio",
    gravedad: "baja",
    aire: 0.95,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W   K             h        K   W",
      "W  BBBB                  BBBB  W",
      "W        o                     W",
      "W      o   o                   W",
      "W     o     o                  W",
      "W                              W",
      "WFFFFF      FFFFFFF      FFFFFFW",
      "W                         WWWWWW",
      "W                         Z    W",
      "W  a        K       K     Zg   W",
      "WFFFFFFF>>>>>     FFFFFFFFWWWWWW",
      "W@                          P  W",
      "W             K         K      W",
      "WFFFFFFFFFFFXXXXXXXXXXFFFFFFFFFW"
    ],
    sombras: [
      [26,10,30,11]
    ],
    pasadizos: [
      {"x":30,"y":11,"casa":"hotel-orbital"}
    ],
    huellasPista: [
      [28,11],
      [29,11]
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":12,"fila":6,"min":12,"max":17,"dir":1,"lento":true},
      {"tipo":"v","spr":"ameba","x":136,"y":72,"min":72,"max":96,"dy":1},
      {"tipo":"f","spr":"satelite","cols":[64,176],"y0":8,"yFin":80,"vel":2,"espera":12,"fase":0}
    ]
  },
  {
    dibujos: {"E":"escTallo","punta":{"E":"escTalloPunta"}},
    id: "invernadero-lunar",
    dobleSalto: true,
    nombre: "El Invernadero Lunar",
    tema: "luna",
    gravedad: "baja",
    aire: 0.75,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K          e            K   W",
      "W                              W",
      "W          GGG    GGG          W",
      "W                              W",
      "WWWWWW    WWWW    WWWW   FFFFFFW",
      "W   Z                          W",
      "Wvh Z   K                K     W",
      "WWWWWFFFF   CCCCCCCC   FFFFFFFFW",
      "W                              W",
      "W       K            a         W",
      "WFFFFF    GGGG    GGGG    FFFFFW",
      "W@                       K  P  W",
      "W           b                  W",
      "WFFFFFFYYYFFFFFFFFFFFFFFFFFFFFFW"
    ],
    vapor: [
      [14,3,17,14]
    ],
    sombras: [
      [1,7,4,8]
    ],
    palancas: [
      {"x":10,"y":6,"golpe":true,"dibujo":"macetaDorada","hace":"crea","pone":"E","celdas":[[10,7],[10,8],[10,9],[10,10],[10,11],[10,12],[10,13],[10,14]]}
    ],
    objetos: [
      {"x":3,"y":7,"tipo":"carta","id":10}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":24,"fila":7,"min":23,"max":28,"dir":1},
      {"tipo":"v","spr":"ameba","x":64,"y":72,"min":72,"max":104,"dy":1},
      {"tipo":"v","spr":"polillaColibri","x":200,"y":16,"min":16,"max":40,"dy":1}
    ]
  },
  {
    id: "hotel-orbital",
    dobleSalto: true,
    nombre: "El Hotel Orbital",
    tema: "nave",
    gravedad: "baja",
    aire: 1.1,
    objetos: [
      {"x":30,"y":4,"tipo":"pieza","id":"pluma"}
    ],
    velos: [
      {"zona":[22,10,25,12],"tipo":"bola"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W        W     W               W",
      "W h      W  K  W   K         e W",
      "W        W  BB W         WWWWWWW",
      "W@ 1     W     W          Z    W",
      "W     m  W     W     K    Z g  W",
      "WWWWWWWWWW     W   FFFFFFFWWWWWW",
      "W              W            K  W",
      "W  K           W               W",
      "WFFFFFF   FFFFFW          FFFFFW",
      "W       a      WFFFF           W",
      "W              W               W",
      "W>>>>>>FFF     W               W",
      "W    1     K   M          b P  W",
      "W              M       K       W",
      "WFFFFFFFFFFFFFFFFFFFFXXXXXFFFFFW"
    ],
    sombras: [
      [26,4,30,5]
    ],
    vapor: [
      [23,1,24,5]
    ],
    premioFinal: [
      22,
      2,
      "diamante"
    ],
    palancas: [
      {"x":8,"y":1,"hace":"apaga"}
    ],
    pintadas: [
      {"x":2,"y":7,"k":10},
      {"x":2,"y":10,"k":11},
      {"x":17,"y":7,"k":12},
      {"x":17,"y":12,"k":13}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":16,"fila":13,"min":16,"max":21,"dir":1},
      {"tipo":"v","spr":"ameba","x":136,"y":20,"min":20,"max":68,"dy":2},
      {"tipo":"h","spr":"gato","x":2,"fila":7,"min":2,"max":4,"dir":1,"lento":true},
      {"tipo":"h","spr":"robot","x":19,"fila":4,"min":19,"max":24,"dir":-1}
    ]
  },
  {
    id: "mina-asteroides",
    dobleSalto: true,
    nombre: "La Mina de Asteroides",
    tema: "luna",
    gravedad: "baja",
    aire: 1.3,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K        e      h      K    W",
      "W                              W",
      "W                              W",
      "W                              W",
      "WFFFFFFFFF    GGGGGG    FFFFFFFW",
      "W                         L    W",
      "W      K                  L  K W",
      "WFFFFFCCCC          FF   FFFFFFW",
      "W                              W",
      "W   a            K             W",
      "WFFFFFFFFF   XXXXXXXXX   FFFWWWW",
      "W@    P                    Z   W",
      "W        K                 Z g W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [27,13,30,14]
    ],
    viento: [
      [1,1,30,5,1]
    ],
    palancas: [
      {"x":2,"y":8,"hace":"abre","celdas":[[26,7],[26,8]]}
    ],
    objetos: [
      {"x":30,"y":5,"tipo":"cronometro"}
    ],
    meta: {"x":1,"y":1},
    plataformas: [
      {"tipo":"vagoneta","x":80,"y":96,"ancho":3,"eje":"h","min":80,"max":176,"vel":2,"espera":48,"fase":0}
    ],
    haz: [
      [13,1,18,4]
    ],
    enemigos: [
      {"tipo":"f","spr":"satelite","cols":[88,104,160],"y0":8,"yFin":80,"vel":2,"espera":28,"fase":156},
      {"tipo":"h","spr":"robot","x":13,"fila":13,"min":13,"max":16,"dir":1},
      {"tipo":"v","spr":"ameba","x":128,"y":24,"min":24,"max":56,"dy":1},
      {"tipo":"h","spr":"rata","x":25,"fila":4,"min":25,"max":28,"dir":-1,"lento":true}
    ]
  },
  {
    id: "observatorio",
    dobleSalto: true,
    nombre: "El Observatorio",
    tema: "espacio",
    gravedad: "baja",
    aire: 1,
    oscuro: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W              K          hK   W",
      "WWWWWW        BBB              W",
      "W   Z                          W",
      "W g Z                   RRRR   W",
      "WWWWWFFFF               FFFFFFFW",
      "W                              W",
      "W  K       AAAA         K      W",
      "WFFFFFFF   FFFFFF   FFFFFFFFFFFW",
      "W  1                           W",
      "W           *  K     K       a W",
      "WFFFFFFFF    FFFFFFFFFF   FFFFFW",
      "W@ l                    1   P  W",
      "W                              W",
      "WFFFFFFFFFXXXXXXXXFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,4,4,5]
    ],
    trucos: [
      {"tipo":"alReves","hace":"monedas","celdas":[[6,2],[8,2],[10,2],[12,2],[16,2],[18,2],[24,2],[28,2]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":14,"fila":10,"min":14,"max":19,"dir":1},
      {"tipo":"v","spr":"satelite","x":72,"y":8,"min":8,"max":32,"dy":1},
      {"tipo":"v","spr":"ameba","x":136,"y":56,"min":56,"max":80,"dy":1},
      {"tipo":"h","spr":"robot","x":24,"fila":7,"min":22,"max":27,"dir":-1}
    ]
  },
  {
    id: "rey-meteoritos",
    dobleSalto: true,
    nombre: "La Lluvia de Meteoritos",
    tema: "nave",
    gravedad: "baja",
    aire: 0.9,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W  K          GGGG         K   W",
      "W                              W",
      "W    a  K                      W",
      "W                    b         W",
      "WFFFFF    FFFFFF    FFFFFF   FFW",
      "W                 L            W",
      "W     K           L        K   W",
      "WWWWWFFFF    FFFFFFF   FFFFFWWWW",
      "W   Z                       W  W",
      "Wgh Z   K                 K W  W",
      "WWWWWFFFFF   XXXXXXX   FFFFFWUUW",
      "W@                      P      W",
      "W   r                          W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    sombras: [
      [1,10,4,11]
    ],
    objetos: [
      {"x":29,"y":11,"tipo":"estatuilla","id":"galaxia"}
    ],
    viento: [
      [1,1,30,4,1]
    ],
    vapor: [
      [14,3,17,5]
    ],
    palancas: [
      {"x":29,"y":13,"hace":"abre","celdas":[[18,7],[18,8]]}
    ],
    enemigos: [
      {"tipo":"c","spr":"ameba","x":128,"y":8,"vel":1},
      {"tipo":"f","spr":"satelite","cols":[56,88],"y0":8,"yFin":80,"vel":2,"espera":28,"fase":0},
      {"tipo":"f","spr":"satelite","cols":[168,200],"y0":8,"yFin":56,"vel":2,"espera":8,"fase":20},
      {"tipo":"h","spr":"robot","x":10,"fila":13,"min":8,"max":19,"dir":1},
      {"tipo":"v","spr":"ameba","x":232,"y":64,"min":64,"max":96,"dy":1}
    ]
  }
];
/* Las CALLES del juego seguido (de Nerja a la Galaxia) */
var LLAVES_CALLES = [
  {
    dibujos: {"T":"trampParaguas"},
    adornos: [
      [8,5,"paraguasColgado"],
      [10,5,"paraguasColgado"],
      [12,5,"paraguasColgado"],
      [14,5,"paraguasColgado"],
      [16,5,"paraguasColgado"],
      [2,12,"portalPintado"]
    ],
    id: "paseo",
    nombre: "El Paseo · la Calle Pintada",
    mundo: "nerja",
    tema: "pueblo",
    calle: true,
    mapa: [
      "                                ",
      "W                               ",
      "W                               ",
      "W                               ",
      "W                               ",
      "W                               ",
      "W                               ",
      "W            e         oooo     ",
      "W                               ",
      "W                               ",
      "WWWW                            ",
      "W  Z      oo         oo         ",
      "W  Z                            ",
      "WooZ@     BB         BB         ",
      "W  Z      BB T       BB T   oo  ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"der":"balcon-europa"},
    puertas: [
      {"x":6,"y":13,"casa":"jardin"},
      {"x":15,"y":13,"casa":"bodega"},
      {"x":26,"y":13,"casa":"azotea"}
    ],
    trucos: [
      {"tipo":"cuadro","x":18,"y":13,"hace":"monedas","celdas":[[17,11],[18,11],[19,11]]}
    ],
    sombras: [
      [1,11,2,14]
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":120,"y":16,"min":16,"max":40,"dy":1},
      {"tipo":"gente","spr":"agenta","x":120,"y":104,"min":104,"max":136,"dir":1,"hace":"ayuda","regalo":"monedas","cafe":true}
    ]
  },
  {
    dibujos: {"E":"escPalmera","punta":{"E":"palmeraCopa"},"moneda":"datil"},
    id: "balcon-europa",
    nombre: "La Plaza del Balcón de Europa",
    mundo: "nerja",
    tema: "balcon",
    calle: true,
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                 ooo            ",
      "                                ",
      "                  Ee            ",
      "                  E             ",
      "                  E  oooo       ",
      "                  E             ",
      "  @         BBBBBBBBBBBBBBBB    ",
      "            BBBBBBBBBBBBBBBB o  ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"paseo","der":"carretera-cuevas"},
    puertas: [
      {"x":7,"y":13,"casa":"cala"},
      {"x":15,"y":11,"casa":"garaje"}
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":22,"fila":11,"min":21,"max":25,"dir":1,"lento":true},
      {"tipo":"v","spr":"gaviota","x":72,"y":16,"min":16,"max":48,"dy":1},
      {"tipo":"manso","hace":"timido","spr":"turista","x":120,"y":88,"min":112,"max":136,"premio":"diamante","reverencia":true}
    ]
  },
  {
    id: "carretera-cuevas",
    nombre: "La Carretera de las Cuevas",
    mundo: "nerja",
    tema: "cueva",
    calle: true,
    rachas: [
      {"zona":[20,5,26,9],"sentido":-1,"periodo":96,"on":16,"fase":0,"alterna":true}
    ],
    bajadas: [
      {"x":21,"y":11,"casa":"superbonus-1","pista":"grieta"}
    ],
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                        WWWWW   ",
      "                        Z   W   ",
      "                        Zov W   ",
      "                        Z   W   ",
      "                        ZdooW   ",
      "                  o  o  WWWWW   ",
      "                  BBBB          ",
      "             ooo  BBBB          ",
      "  @         BBBBBBBBBBBBBBBB    ",
      "            BBBBBBBBBBBBBBBB    ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"balcon-europa","der":"puerto"},
    puertas: [
      {"x":8,"y":13,"casa":"frigiliana"},
      {"x":19,"y":9,"casa":"cuevas"}
    ],
    tuberias: [
      {"x":25,"y":11,"a":"cristal"}
    ],
    enemigos: [
      {"tipo":"v","spr":"murcielago","x":112,"y":16,"min":16,"max":48,"dy":1,"duerme":true}
    ]
  },
  {
    id: "puerto",
    nombre: "El Puerto Deportivo",
    mundo: "nerja",
    tema: "puerto",
    calle: true,
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                        II      ",
      "                         e      ",
      "                        II      ",
      "                                ",
      "                     FFFFFF     ",
      "                                ",
      "             o             oo   ",
      "  @       BBBBB  BBTBBBBBBBBBB  ",
      "          BBBBB  BBBBBBBBBBBBB  ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"carretera-cuevas","der":"barrio-nuevo"},
    puertas: [
      {"x":6,"y":13,"casa":"puerto"},
      {"x":11,"y":11,"casa":"cocina"},
      {"x":23,"y":8,"casa":"faro"}
    ],
    trucos: [
      {"tipo":"baldosa","x":25,"y":13,"hace":"premio","premio":[29,11,"rubi"]},
      {"tipo":"baldosa","x":24,"y":6,"n":1,"dibujo":"cofreFaro","hace":"premio","premio":[24,4,"diamante"]}
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":88,"y":16,"min":16,"max":48,"dy":1},
      {"tipo":"v","spr":"gaviota","x":232,"y":8,"min":8,"max":40,"dy":1}
    ]
  },
  {
    id: "barrio-nuevo",
    nombre: "Las Obras del Barrio Nuevo",
    mundo: "nerja",
    tema: "obra",
    calle: true,
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                    oo          ",
      "                            b   ",
      "                             B  ",
      "                       FFFFCCF  ",
      "                                ",
      "      oo                        ",
      "  @   BBBBBB        BBBBBBBBBBB ",
      "      BBBBBB        BBBBBBBBBBB ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"puerto","der":"burriana"},
    puertas: [
      {"x":8,"y":11,"casa":"piscina"},
      {"x":24,"y":8,"casa":"obra","acto":"vuelta"},
      {"x":29,"y":11,"casa":"obra-ascensor","acto":"vuelta"},
      {"x":12,"y":13,"casa":"nerja-vecino","pide":"gafas","vecino":"jardinero"}
    ],
    plataformas: [
      {"tipo":"ascensor","x":128,"y":112,"ancho":3,"eje":"v","min":80,"max":112,"vel":1,"espera":40}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":26,"fila":11,"min":25,"max":27,"dir":1,"lento":true},
      {"tipo":"v","spr":"gaviota","x":168,"y":16,"min":16,"max":56,"dy":1}
    ]
  },
  {
    especiales: [
      {"x":24,"y":13,"casa":"casa-navidad","dibujo":"arbolNavidad","soloFecha":["12-20","01-06"]}
    ],
    id: "burriana",
    nombre: "La Playa de Burriana y su mercadillo",
    mundo: "nerja",
    tema: "mercado",
    calle: true,
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "              e                 ",
      "          oo                    ",
      "          FFFFF              o  ",
      "                         FFFFF  ",
      "                                ",
      "  @     BBBTBBBBBBBT            ",
      "        BBBBBBBBBBBB            ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"barrio-nuevo","der":"sierra"},
    puertas: [
      {"x":12,"y":8,"casa":"mercadillo"},
      {"x":26,"y":9,"casa":"yate","acto":"vuelta"},
      {"x":29,"y":13,"casa":"club-playa","acto":"vuelta"}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":26,"fila":13,"min":24,"max":27,"dir":1,"lento":true},
      {"tipo":"v","spr":"gaviota","x":168,"y":8,"min":8,"max":40,"dy":1},
      {"tipo":"h","spr":"moroso","x":13,"fila":11,"min":13,"max":17,"dir":1,"lento":true,"roba":150}
    ]
  },
  {
    id: "sierra",
    nombre: "La Sierra Almijara",
    mundo: "nerja",
    tema: "sierra",
    calle: true,
    velos: [
      {"zona":[21,14,31,14],"tipo":"rio"},
      {"zona":[16,1,31,9],"tipo":"niebla","periodo":96,"on":48,"fase":0}
    ],
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "        WWWWW                   ",
      "        W   ZE                  ",
      "        WodoZE                  ",
      "        Wh  ZE                  ",
      "        WWWWWE                  ",
      "             E     o            ",
      "             E        ooo       ",
      "             EFFFFFFF SSS  FFFF ",
      "                                ",
      "  @  BBBB                       ",
      "     BBBB                       ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"burriana","der":"carabeo"},
    puertas: [
      {"x":6,"y":11,"casa":"sierra","acto":"vuelta"},
      {"x":16,"y":9,"casa":"acueducto","acto":"vuelta"},
      {"x":27,"y":9,"casa":"invernadero"}
    ],
    viento: [
      [15,13,20,14,1]
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":192,"y":8,"min":8,"max":40,"dy":1},
      {"tipo":"p","spr":"cabra","x":64,"y":16,"min":64,"max":88,"vel":1,"bote":24,"alto":16}
    ]
  },
  {
    especiales: [
      {"x":18,"y":13,"casa":"casa-encantada","dibujo":"calabaza","soloFecha":["10-25","11-02"]}
    ],
    id: "carabeo",
    nombre: "La Calle Carabeo · noche de San Juan",
    mundo: "nerja",
    tema: "sanjuan",
    calle: true,
    trucos: [
      {"tipo":"encima","x":8,"y":14,"n":3,"hace":"monedas","celdas":[[10,14],[11,14],[12,14]]}
    ],
    bajadas: [
      {"x":18,"y":5,"calle":"urba-entrada","atajo":true,"pista":"moneda"}
    ],
    clima: "fuegos",
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                 dB             ",
      "          FFFFFFFFF             ",
      "                     E          ",
      "                 ooo E          ",
      "         FFTFFFFFFFFFE          ",
      "        E            E          ",
      "        E   oo       E          ",
      "         FFFFFFFFFFFFFFFFFFFFF  ",
      "  @                             ",
      "                                ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"sierra","der":"estacion"},
    puertas: [
      {"x":15,"y":4,"casa":"balcon","acto":"vuelta"},
      {"x":26,"y":10,"casa":"sanjuan","acto":"vuelta"}
    ],
    rayos: [
      {"x1":15,"x2":16,"y1":7,"y2":8,"periodo":80,"encendido":32,"fase":0}
    ],
    barras: [
      {"x":13,"y1":4,"y2":5,"periodo":80,"cerrada":40,"fase":20},
      {"x":24,"y1":10,"y2":11,"periodo":80,"cerrada":40,"fase":60}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":15,"fila":13,"min":13,"max":18,"dir":1,"lento":true},
      {"tipo":"v","spr":"gaviota","x":224,"y":8,"min":8,"max":40,"dy":1}
    ]
  },
  {
    id: "estacion",
    nombre: "La Parada del Autobús",
    mundo: "nerja",
    tema: "pueblo",
    calle: true,
    tienda: {"x":8,"y":13},
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                  o o o         ",
      "                            V   ",
      "  @         oooo        v   V   ",
      "            BBBB            V   ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"carabeo","der":"edificio-portal"},
    valla: {"mundo":"nerja","jefe":"jefe-nerja"},
    puertas: [
      {"x":4,"y":13,"casa":"jefe-nerja","pideVendidas":9},
      {"x":20,"y":13,"calle":"nerja-noche","soloNoche":true},
      {"x":25,"y":13,"casa":"nerja-extra","extra":true},
      {"x":29,"y":13,"calle":"villa-camino","acto":"vuelta"}
    ],
    trucos: [
      {"tipo":"paciente","x":10,"y":14,"hace":"premio","premio":[6,13,"diamante"]}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":18,"fila":13,"min":17,"max":22,"dir":1,"lento":true}
    ]
  },
  {
    id: "edificio-portal",
    nombre: "El Portal del Edificio Viejo",
    mundo: "edificio",
    paleta: "ladrillo",
    calle: true,
    carteles: [
      [7,13,"dTablonPortal"]
    ],
    charcos: [
      {"x1":14,"x2":22,"y":15,"periodo":96,"mojado":48,"fase":0,"portera":[23,13],"cartel":[13,14]}
    ],
    bajadas: [
      {"x":25,"y":8,"casa":"superbonus-2","pista":"brillo"}
    ],
    tienda: {"x":20,"y":13},
    mapa: [
      "WWWWWWWWWWWWWW    WWWWWWWWWWWWWW",
      "W                              W",
      "W               FF             W",
      "W                              W",
      "W             FF               W",
      "W                         WWWWWW",
      "W        FFF              Z    W",
      "W                      oo Z g oW",
      "W            FFF       FFFFFFFFW",
      "W                              W",
      "W        FFF                   W",
      "W                              W",
      "             FFF              V ",
      "   @                          V ",
      "     o   FFF                  V ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"estacion","der":"urba-entrada","arr":"edificio-p1"},
    valla: {"mundo":"edificio","jefe":"jefe-edificio"},
    puertas: [

    ],
    tuberias: [
      {"x":6,"y":13,"a":"portales"}
    ],
    plataformas: [
      {"tipo":"ascensor","x":160,"y":112,"ancho":3,"eje":"v","min":64,"max":112,"vel":1,"espera":40}
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":24,"fila":13,"min":23,"max":27,"dir":1,"lento":true}
    ]
  },
  {
    id: "edificio-p1",
    nombre: "Primera planta",
    mundo: "edificio",
    paleta: "sotano",
    calle: true,
    mapa: [
      "WWWWWWWWWWWWWW    WWWWWWWWWWWWWW",
      "W                              W",
      "W               FF             W",
      "WWWWWWW                        W",
      "W     Z       FF               W",
      "W g o Z                        W",
      "WFFFFFFFFFFF                   W",
      "W                              W",
      "W            FFF               W",
      "W                              W",
      "W        FFF                  oW",
      "W                  FFFFFFFFFFFFW",
      "W            FFF               W",
      "W           @                  W",
      "W       oFFF                 o W",
      "FFFFFFFFFFFFFF    FFFFFFFFFFFFFF"
    ],
    salidas: {"aba":"edificio-portal","arr":"edificio-p2"},
    trucos: [
      {"tipo":"baldosa","x":2,"y":15,"n":3,"hace":"monedas","celdas":[[1,11],[2,11],[3,11]]}
    ],
    puertas: [
      {"x":4,"y":13,"casa":"r01"},
      {"x":21,"y":13,"casa":"r02"},
      {"x":26,"y":13,"casa":"r03"},
      {"x":24,"y":9,"casa":"r17"}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":24,"fila":13,"min":22,"max":29,"dir":1,"lento":true}
    ]
  },
  {
    id: "edificio-p2",
    nombre: "Segunda planta",
    mundo: "edificio",
    paleta: "almacen",
    calle: true,
    mapa: [
      "WWWWWWWWWWWWWW    WWWWWWWWWWWWWW",
      "W                   W   W      W",
      "W               FF  W   W      W",
      "W                   WoeoW      W",
      "W             FF    WZZZW      W",
      "W  o                           W",
      "WFFFFFFFFFFF                   W",
      "W                         e    W",
      "W            FFF      FFFFF   oW",
      "W                            BBW",
      "W        FFF                   W",
      "W                  FFFFFFFFFFFFW",
      "W            FFF               W",
      "W           @                  W",
      "W  o     FFF                 o W",
      "FFFFFFFFFFFFFF    FFFFFFFFFFFFFF"
    ],
    salidas: {"aba":"edificio-p1","arr":"edificio-p3"},
    sombras: [
      [21,1,23,3]
    ],
    puertas: [
      {"x":4,"y":13,"casa":"r11"},
      {"x":24,"y":13,"casa":"r06"},
      {"x":21,"y":9,"casa":"r15"},
      {"x":23,"y":6,"casa":"r08"}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":27,"fila":13,"min":26,"max":29,"dir":-1,"lento":true},
      {"tipo":"h","spr":"gato","x":25,"fila":9,"min":24,"max":26,"dir":1,"lento":true}
    ]
  },
  {
    id: "edificio-p3",
    nombre: "Tercera planta",
    mundo: "edificio",
    paleta: "centralita",
    calle: true,
    reto: {"en":[29,10],"x":23,"y":10,"pasos":45,"premio":500},
    mapa: [
      "WWWWWWWWWWWWWW    WWWWWWWWWWWWWW",
      "W                              W",
      "W               FF             W",
      "WWWWWWW                        W",
      "W     Z       FF               W",
      "W b o Z                        W",
      "WFFFFFFFFFFF          E        W",
      "W                     E       bW",
      "W            FFF      EFF      W",
      "W                     E        W",
      "W        FFF          E        W",
      "W                     EFFFFFFFFW",
      "W            FFF               W",
      "W           @                  W",
      "W       oFFF                 o W",
      "FFFFFFFFFFFFFF    FFFFFFFFFFFFFF"
    ],
    salidas: {"aba":"edificio-p2","arr":"edificio-p4"},
    trucos: [
      {"tipo":"paciente","x":9,"y":4,"hace":"monedas","celdas":[[7,5],[11,5],[9,2]]}
    ],
    puertas: [
      {"x":4,"y":13,"casa":"r09"},
      {"x":25,"y":13,"casa":"r10"},
      {"x":27,"y":9,"casa":"r05"},
      {"x":23,"y":6,"casa":"r12"}
    ],
    prensas: [
      {"x":25,"arriba":1,"abajo":10,"periodo":80,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":23,"fila":13,"min":22,"max":29,"dir":1,"lento":true}
    ]
  },
  {
    id: "edificio-p4",
    nombre: "Cuarta planta",
    mundo: "edificio",
    paleta: "cajafuerte",
    calle: true,
    bonus: [
      [24,4,"moneda"],
      [25,4,"moneda"]
    ],
    mapa: [
      "WWWWWWWWWWWWWW    WWWWWWWWWWWWWW",
      "W                              W",
      "W               FF     WWWW    W",
      "W                      WdoW    W",
      "W             FF       WZZW    W",
      "W  o                   WUUW    W",
      "WFFFFFFFFFFF                   W",
      "W                             dW",
      "W            FFF       FFFFFFFFW",
      "W                              W",
      "W        FFF                   W",
      "W                     FFFFFFFFFW",
      "W            FFF               W",
      "W           @                  W",
      "W  o     FFF                 o W",
      "FFFFFFFFFFFFFF    FFFFFFFFFFFFFF"
    ],
    salidas: {"aba":"edificio-p3","arr":"edificio-p5"},
    sombras: [
      [24,3,25,4]
    ],
    puertas: [
      {"x":4,"y":13,"casa":"r13"},
      {"x":22,"y":13,"casa":"r14"},
      {"x":24,"y":9,"casa":"r07"},
      {"x":28,"y":6,"casa":"r18"}
    ],
    plataformas: [
      {"tipo":"ascensor","x":152,"y":112,"ancho":3,"eje":"v","min":64,"max":112,"vel":1,"espera":32}
    ],
    barras: [
      {"x":27,"y1":6,"y2":7,"periodo":80,"cerrada":40,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":27,"fila":13,"min":25,"max":29,"dir":-1,"lento":true},
      {"tipo":"h","spr":"gato","x":28,"fila":9,"min":27,"max":29,"dir":1,"lento":true}
    ]
  },
  {
    id: "edificio-p5",
    nombre: "Quinta planta · el ático",
    mundo: "edificio",
    paleta: "final",
    calle: true,
    bajadas: [
      {"x":26,"y":6,"calle":"rec-entrada","atajo":true,"pista":"moneda"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                  W           W",
      "W                  W           W",
      "WWWWWWW            W           W",
      "W     Z            W           W",
      "W e h Z            W oo   v    W",
      "WFFFFFFFFFFF       WFFFFFFF    W",
      "W                  W         E W",
      "W            FFF   W  o    o E W",
      "W                  WFTFFFFFFF  W",
      "W        FFF                   W",
      "W                      o o     W",
      "W            FFF        FFFFFFFW",
      "W           @                  W",
      "W       oFFF                   W",
      "FFFFFFFFFFFFFF    FFFFFFFFFTFFFF"
    ],
    salidas: {"aba":"edificio-p4"},
    trucos: [
      {"tipo":"cuadro","x":10,"y":4,"hace":"abre","celdas":[]}
    ],
    puertas: [
      {"x":20,"y":13,"casa":"r20"},
      {"x":4,"y":13,"casa":"r04"},
      {"x":24,"y":13,"casa":"r16"},
      {"x":27,"y":10,"casa":"r19"},
      {"x":24,"y":4,"casa":"jefe-edificio","pideVendidas":12,"da":"dobleSalto","sale":{"calle":"edificio-portal","x":29,"y":13}},
      {"x":7,"y":4,"calle":"edificio-p13","truco":0}
    ],
    prensas: [
      {"x":21,"arriba":10,"abajo":14,"periodo":80,"fase":0}
    ],
    rayos: [
      {"x1":24,"x2":25,"y1":7,"y2":8,"periodo":80,"encendido":32,"fase":0}
    ],
    barras: [
      {"x":23,"y1":4,"y2":5,"periodo":80,"cerrada":40,"fase":20}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":29,"fila":13,"min":28,"max":29,"dir":1,"lento":true}
    ]
  },
  {
    adornos: [
      [6,4,"letraB"],
      [8,4,"letraI"],
      [10,4,"letraE"],
      [12,4,"letraN"],
      [14,4,"letraV"],
      [16,4,"letraE"],
      [18,4,"letraN"],
      [20,4,"letraI"],
      [22,4,"letraD"],
      [24,4,"letraO"],
      [26,4,"letraS"]
    ],
    id: "urba-entrada",
    nombre: "La Entrada de la Urbanización",
    mundo: "urba",
    tema: "caminito",
    calle: true,
    dobleSalto: true,
    bajadas: [
      {"x":16,"y":14,"calle":"carabeo","atajo":true,"pista":"moneda"}
    ],
    tienda: {"x":29,"y":13},
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "  ooo              oooZZZ       ",
      "                      ZgZ       ",
      "  FFFF                ZZZ       ",
      "                  FFFFF         ",
      "  @                             ",
      "                B               ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"edificio-portal","der":"urba-avenida"},
    sombras: [
      [23,10,23,10]
    ],
    letreros: [
      {"x":1,"y":7,"k":"dobleSalto"}
    ],
    puertas: [
      {"x":6,"y":13,"casa":"biblioteca"},
      {"x":11,"y":13,"casa":"caminito"},
      {"x":25,"y":13,"casa":"concesionario"}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":18,"fila":13,"min":18,"max":22,"dir":1,"lento":true}
    ]
  },
  {
    id: "urba-avenida",
    nombre: "La Avenida de los Jacarandás",
    mundo: "urba",
    tema: "notaria",
    calle: true,
    dobleSalto: true,
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "              oooo           B  ",
      "                                ",
      "                                ",
      "  @          BBBBBB             ",
      "           BBBBBBBBBB           ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"urba-entrada","der":"urba-rotonda"},
    puertas: [
      {"x":6,"y":13,"casa":"trastero"},
      {"x":24,"y":13,"casa":"parking"}
    ],
    trucos: [
      {"tipo":"golpes","x":29,"y":10,"n":5,"hace":"monedas","celdas":[[26,12],[27,12],[31,12]]}
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":120,"y":24,"min":16,"max":56,"dy":1}
    ]
  },
  {
    id: "urba-rotonda",
    nombre: "La Rotonda de la Fuente",
    mundo: "urba",
    tema: "feria",
    calle: true,
    dobleSalto: true,
    fuente: {"x":10,"y":15},
    bajadas: [
      {"x":11,"y":14,"casa":"superbonus-3","pista":"grieta"}
    ],
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                WWWWW           ",
      "             oooW   W           ",
      "                Z   W           ",
      "                Z g W           ",
      "             FFFFFFFFF          ",
      "  @                             ",
      "           B                    ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"urba-avenida","der":"urba-golf"},
    puertas: [
      {"x":5,"y":13,"casa":"feria"},
      {"x":25,"y":13,"casa":"helipuerto"}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":14,"fila":13,"min":14,"max":20,"dir":1,"lento":true}
    ]
  },
  {
    id: "urba-golf",
    nombre: "El Club de Golf",
    mundo: "urba",
    tema: "golf",
    calle: true,
    dobleSalto: true,
    clima: "lluvia",
    velos: [
      {"zona":[15,1,28,10],"tipo":"lluvia","periodo":96,"on":48,"fase":0}
    ],
    trucos: [
      {"tipo":"hoyo","x":20,"y":15,"puntos":1000}
    ],
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "               e                ",
      "              oooo              ",
      "                                ",
      "              FFHHFFFFHHFF      ",
      "                                ",
      "  @       FFF      ooo      FFF ",
      "                                ",
      "FFFFFFFFFFFFFFFFF<<   >>FFFFFFFF"
    ],
    salidas: {"izq":"urba-rotonda","der":"urba-marina","aba":"golf-cueva"},
    banderaHoyo: {"x":20,"y":15},
    puertas: [
      {"x":6,"y":13,"casa":"golf"},
      {"x":24,"y":13,"casa":"spa"}
    ],
    enemigos: [
      {"tipo":"v","spr":"gaviota","x":160,"y":16,"min":16,"max":40,"dy":1},
      {"tipo":"manso","hace":"empuja","spr":"pelota","x":16,"y":112,"min":16,"max":104,"vel":2,"dir":1,"fuerza":3,"voz":"fore","vozDist":64}
    ]
  },
  {
    especiales: [
      {"x":12,"y":13,"casa":"casa-miniatura","dibujo":"casaMunecas"}
    ],
    id: "urba-marina",
    nombre: "La Marina",
    mundo: "urba",
    tema: "marina",
    calle: true,
    dobleSalto: true,
    mapa: [
      "                                ",
      "                                ",
      "                                ",
      "                                ",
      "                W               ",
      "                W               ",
      "                W               ",
      "                W               ",
      "              WWWWW             ",
      "          ooo W   W             ",
      "              Z   W             ",
      "              Z d W  ooo        ",
      "          FFFFFFFFFF            ",
      "  @                             ",
      "        B                       ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"urba-golf","der":"urba-circuito"},
    puertas: [
      {"x":20,"y":13,"casa":"sorpresas"},
      {"x":24,"y":13,"casa":"marina"}
    ],
    tuberias: [
      {"x":28,"y":13,"a":"disco"}
    ],
    trucos: [
      {"tipo":"baldosa","x":5,"y":15,"n":3,"hace":"premio","premio":[6,12,"rubi"]}
    ],
    plataformas: [
      {"tipo":"delfin","x":16,"y":112,"ancho":2,"eje":"arco","min":16,"max":64,"alto":24,"vuelo":24,"espera":24,"fase":0}
    ],
    enemigos: [
      {"tipo":"h","spr":"cangrejo","x":11,"fila":13,"min":11,"max":18,"dir":1,"lento":true}
    ]
  },
  {
    id: "urba-circuito",
    nombre: "La Avenida del Circuito",
    mundo: "urba",
    tema: "helipuerto",
    calle: true,
    dobleSalto: true,
    mapa: [
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "                             W  ",
      "               ooo           W  ",
      "                             W  ",
      "                             W  ",
      "              FFFFF          V  ",
      "  @                          V  ",
      "                             V  ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"urba-marina","der":"rec-entrada"},
    valla: {"mundo":"urba","jefe":"jefe-urba"},
    puertas: [
      {"x":12,"y":13,"casa":"notaria"},
      {"x":6,"y":13,"casa":"dosplantas"},
      {"x":21,"y":13,"casa":"circuito"},
      {"x":26,"y":13,"casa":"jefe-urba","pideVendidas":9}
    ],
    plataformas: [
      {"tipo":"coche","color":"#c0392b","x":80,"y":112,"ancho":3,"eje":"h","min":80,"max":80,"vel":2}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":12,"fila":13,"min":12,"max":17,"dir":1,"lento":true}
    ]
  },
  {
    especiales: [
      {"x":20,"y":13,"casa":"tunel-1983","dibujo":"tunelTiempo"}
    ],
    id: "rec-entrada",
    nombre: "La Entrada de los Recreativos",
    mundo: "recreativos",
    tema: "disco",
    calle: true,
    dobleSalto: true,
    bajadas: [
      {"x":15,"y":11,"calle":"edificio-p5","atajo":true,"pista":"moneda"}
    ],
    tienda: {"x":28,"y":13},
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                       WWWWWWWW",
      "W                  o o  Z  e   W",
      "W                       Z      W",
      "W                FFFFFFFWWWWWWWW",
      "W                              W",
      "W        o o  BB               W",
      "        FFFFF                   ",
      "  @                             ",
      "             B                  ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"urba-circuito","der":"rec-galeria"},
    puertas: [
      {"x":5,"y":13,"casa":"rec-pinball"},
      {"x":24,"y":13,"casa":"rec-marcianos"}
    ],
    sombras: [
      [25,7,30,8]
    ],
    trucos: [
      {"tipo":"baldosa","x":27,"y":15,"n":3,"hace":"premio","premio":[27,11,"rubi"]}
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":16,"fila":13,"min":16,"max":21,"dir":1,"lento":true}
    ]
  },
  {
    id: "rec-galeria",
    nombre: "La Galería de las Máquinas",
    mundo: "recreativos",
    tema: "casino",
    calle: true,
    dobleSalto: true,
    bajadas: [
      {"x":21,"y":8,"casa":"superbonus-4","pista":"brillo"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W   WWWWWW                     W",
      "W   W    Z                     W",
      "W   W d  Z  o o o o            W",
      "W   WWWWWWFFFFFFFFFF           W",
      "W                              W",
      "W                   BB         W",
      "W                  FFFFF       W",
      "W                           B  W",
      "W            o o BB            W",
      "            FFFFF               ",
      "  @                             ",
      "         B                      ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"rec-entrada","der":"rec-salida"},
    tuberias: [
      {"x":7,"y":4,"a":"casino"}
    ],
    puertas: [
      {"x":6,"y":13,"casa":"rec-karts"},
      {"x":24,"y":13,"casa":"rec-baile"},
      {"x":21,"y":13,"casa":"rec-extra","extra":true}
    ],
    sombras: [
      [5,4,8,5]
    ],
    garras: [
      {"x":23,"y":13,"suelta":[22,7]}
    ],
    trucos: [
      {"tipo":"golpes","x":28,"y":10,"n":5,"hace":"monedas","celdas":[[25,14],[26,14],[29,14],[30,14]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":13,"fila":13,"min":13,"max":19,"dir":1,"lento":true}
    ]
  },
  {
    id: "rec-salida",
    nombre: "La Salida de los Recreativos",
    mundo: "recreativos",
    tema: "disco",
    calle: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "WWWWWWW                   W    W",
      "W b   Z                   W    W",
      "W     Z   o o o           W    W",
      "WWWWWWWFFFFFFFF           W    W",
      "W                         W    W",
      "W                         W    W",
      "                  FFFFF   V     ",
      "  @                       V     ",
      "                B         V     ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"rec-galeria","der":"museo-entrada"},
    puertas: [
      {"x":24,"y":13,"casa":"jefe-recreativos","pideVendidas":5},
      {"x":6,"y":13,"casa":"rec-premios"},
      {"x":20,"y":13,"casa":"rec-jefe"}
    ],
    valla: {"mundo":"recreativos","jefe":"jefe-recreativos"},
    sombras: [
      [1,7,5,8]
    ],
    barras: [
      {"x":17,"y1":11,"y2":11,"periodo":48,"cerrada":24,"fase":0,"neon":"S"},
      {"x":16,"y1":11,"y2":11,"periodo":48,"cerrada":24,"fase":32,"neon":"A"},
      {"x":15,"y1":11,"y2":11,"periodo":48,"cerrada":24,"fase":16,"neon":"L"}
    ],
    enemigos: [
      {"tipo":"h","spr":"pato","x":9,"fila":13,"min":9,"max":13,"dir":1,"lento":true}
    ]
  },
  {
    adornos: [
      [8,12,"esqueleto"]
    ],
    especiales: [
      {"x":15,"y":13,"casa":"espejo-total","dibujo":"marcoEspejo"}
    ],
    id: "museo-entrada",
    nombre: "La Entrada del Museo",
    mundo: "museo",
    tema: "acueducto",
    calle: true,
    dobleSalto: true,
    bajadas: [
      {"x":19,"y":13,"casa":"superbonus-5","pista":"grieta"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                        WWWWWWW",
      "W       o o o o          Z  e  W",
      "W                        Z     W",
      "W      FFFFFFFFF     FFFFFFFFFFW",
      "                                ",
      "  @ FF            FF            ",
      "                                ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"rec-salida","der":"museo-galeria"},
    puertas: [
      {"x":10,"y":13,"casa":"mus-sabana"},
      {"x":24,"y":13,"casa":"mus-selva"}
    ],
    sombras: [
      [26,9,30,10]
    ],
    trucos: [
      {"tipo":"cuadro","x":15,"y":10,"hace":"premio","premio":[13,10,"gema"]}
    ],
    tienda: {"x":28,"y":13},
    enemigos: [
      {"tipo":"h","spr":"rata","x":13,"fila":13,"min":13,"max":16,"dir":1,"lento":true},
      {"tipo":"manso","hace":"vigila","spr":"turista","x":80,"y":72,"min":56,"max":104,"luz":5,"espera":32}
    ]
  },
  {
    id: "museo-galeria",
    nombre: "La Galería de las Leyendas",
    mundo: "museo",
    tema: "cueva",
    calle: true,
    dobleSalto: true,
    bajadas: [
      {"x":1,"y":11,"calle":"cohete","atajo":true,"pista":"moneda"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W           WWWWWW             W",
      "W           Z d  W             W",
      "W     o o o Z    W             W",
      "W    FFFFFFFFFFFFF             W",
      "W                        o o o W",
      "WFFF                    FFFFFF W",
      "                                ",
      "    FF        @     FF          ",
      "                                ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"museo-entrada","der":"museo-salida"},
    puertas: [
      {"x":8,"y":13,"casa":"mus-rio"},
      {"x":26,"y":13,"casa":"mus-desierto"},
      {"x":11,"y":13,"casa":"mus-extra","extra":true}
    ],
    sombras: [
      [13,7,16,8]
    ],
    trucos: [
      {"tipo":"baldosa","x":23,"y":15,"n":3,"hace":"monedas","celdas":[[22,12],[23,12],[24,12]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"arañita","x":16,"fila":14,"min":16,"max":18,"dir":1,"lento":true}
    ]
  },
  {
    id: "museo-salida",
    nombre: "La Salida del Museo",
    mundo: "museo",
    tema: "acueducto",
    calle: true,
    dobleSalto: true,
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "WWWWWW                    W    W",
      "W g  Z                    W    W",
      "W    Z o o                W    W",
      "WFFFFFFFFF                W    W",
      "                          V     ",
      "  @       FF              V     ",
      "                          V     ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"museo-galeria","der":"cohete"},
    puertas: [
      {"x":23,"y":13,"casa":"jefe-museo","pideVendidas":5},
      {"x":6,"y":13,"casa":"mus-cripta"},
      {"x":18,"y":13,"casa":"mus-esfinge"}
    ],
    valla: {"mundo":"museo","jefe":"jefe-museo"},
    sombras: [
      [1,9,4,10]
    ],
    enemigos: [
      {"tipo":"h","spr":"rata","x":13,"fila":13,"min":13,"max":15,"dir":1,"lento":true}
    ]
  },
  {
    tuberias: [
      {"x":25,"y":13,"a":"anillos"}
    ],
    id: "cohete",
    nombre: "La Rampa de Lanzamiento",
    mundo: "galaxia",
    tema: "espacio",
    calle: true,
    dobleSalto: true,
    gravedad: "baja",
    bajadas: [
      {"x":5,"y":4,"casa":"superbonus-6","pista":"brillo"},
      {"x":3,"y":12,"calle":"museo-galeria","atajo":true,"pista":"moneda"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                              W",
      "W    BB                        W",
      "W   BBBB                       W",
      "W   BBBB                       W",
      "W   BBBB         o o o         W",
      "W   BBBB FF                    W",
      "W   BBBB       FFFFFFF   WWWWWWW",
      "W   BBBB                 Z    WW",
      "W   BBBB                 Z e  WW",
      "   BBBBBB FFFFF     FFFFFWWWWWW ",
      " @                              ",
      "                                ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"museo-salida","der":"muelle-espacial"},
    puertas: [
      {"x":16,"y":13,"casa":"estacion-orbital"}
    ],
    sombras: [
      [25,10,29,11]
    ],
    trucos: [
      {"tipo":"baldosa","x":6,"y":4,"n":1,"dibujo":"botonRojo","hace":"monedas","celdas":[[8,4],[8,3],[10,2],[12,2],[14,2],[16,2]]}
    ],
    tienda: {"x":11,"y":13},
    enemigos: [
      {"tipo":"h","spr":"robot","x":17,"fila":7,"min":15,"max":20,"dir":1,"lento":true}
    ]
  },
  {
    especiales: [
      {"x":21,"y":13,"casa":"sin-gravedad","dibujo":"cartelGravedad"}
    ],
    id: "muelle-espacial",
    nombre: "El Muelle Espacial",
    mundo: "galaxia",
    tema: "nave",
    calle: true,
    dobleSalto: true,
    gravedad: "baja",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W   WWWWWW                     W",
      "W   W    Z                     W",
      "W   W d  Z o o o o o           W",
      "W   WWWWWWGGGGGGGGGGGG         W",
      "W                              W",
      "W                              W",
      "W   FFFFF              FFFFF   W",
      "W                              W",
      "W             o o o            W",
      "             FFFFFF             ",
      "              @                 ",
      "                                ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"cohete","der":"superficie-lunar"},
    puertas: [
      {"x":5,"y":13,"casa":"hotel-orbital"},
      {"x":24,"y":13,"casa":"observatorio"}
    ],
    sombras: [
      [4,4,9,5]
    ],
    trucos: [
      {"tipo":"cuadro","x":28,"y":13,"hace":"monedas","celdas":[[26,11],[27,11],[28,11],[29,11]]}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":11,"fila":13,"min":11,"max":18,"dir":1,"lento":true}
    ]
  },
  {
    id: "superficie-lunar",
    nombre: "La Superficie Lunar",
    mundo: "galaxia",
    tema: "luna",
    calle: true,
    dobleSalto: true,
    gravedad: "baja",
    bajadas: [
      {"x":28,"y":6,"casa":"superbonus-7","pista":"moneda"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W            o o o o           W",
      "W           GGGGGGGGG          W",
      "W                              W",
      "W                          FF  W",
      "W                              W",
      "W                              W",
      "W                       WWWWWWWW",
      "W                       Z  e   W",
      "W                       Z      W",
      "                   FFFFFWWWWWWW ",
      "         @                      ",
      "                                ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"muelle-espacial","der":"galaxia-regreso"},
    puertas: [
      {"x":5,"y":13,"casa":"invernadero-lunar"},
      {"x":13,"y":13,"casa":"mina-asteroides"}
    ],
    vapor: [
      [21,2,22,11]
    ],
    plataformas: [
      {"tipo":"roca","x":64,"y":80,"ancho":3,"eje":"v","min":32,"max":80,"vel":1,"fase":48,"arranca":"pisar"}
    ],
    sombras: [
      [24,10,30,11]
    ],
    zonas: [
      {"x0":26,"y0":1,"x1":30,"y1":1,"casa":"planeta-x"}
    ],
    tuberias: [
      {"x":28,"y":13,"a":"cielo"}
    ],
    enemigos: [
      {"tipo":"h","spr":"robot","x":18,"fila":13,"min":18,"max":25,"dir":1,"lento":true}
    ]
  },
  {
    id: "galaxia-regreso",
    nombre: "El Cohete de Regreso",
    mundo: "galaxia",
    tema: "espacio",
    calle: true,
    dobleSalto: true,
    gravedad: "baja",
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W                         W    W",
      "W   o o o d               W    W",
      "W  GGGGGGGG               W    W",
      "W                         W    W",
      "W                         W    W",
      "W         FFFFF           W    W",
      "W                         W    W",
      "W                         W    W",
      "               FFFFF      V     ",
      "  @                       V     ",
      "                          V     ",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"superficie-lunar","der":"villa-camino"},
    puertas: [
      {"x":24,"y":13,"casa":"jefe-galaxia","pideVendidas":5,"abreActo":"vuelta","sale":{"calle":"paseo","x":4,"y":13}},
      {"x":8,"y":13,"casa":"rey-meteoritos"},
      {"x":20,"y":13,"casa":"galaxia-extra","extra":true}
    ],
    valla: {"mundo":"galaxia","jefe":"jefe-galaxia"},
    enemigos: [
      {"tipo":"h","spr":"robot","x":14,"fila":13,"min":14,"max":21,"dir":1,"lento":true}
    ]
  },
  {
    id: "villa-camino",
    nombre: "El Camino a la Gran Villa",
    mundo: "final",
    tema: "villa",
    calle: true,
    dobleSalto: true,
    mapa: [
      "                                ",
      "                    B          W",
      "                    B          W",
      "                    B          W",
      "                    B          W",
      "                  BBBBB        W",
      "                    B          W",
      "                    B          W",
      "                    B          W",
      "           ooo WWWWWB          W",
      "               Z    B          W",
      "               Z    B          W",
      "          FFFFFWWWWWV oo       W",
      "  @                 V         vW",
      "        B           V          W",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {"izq":"galaxia-regreso"},
    valla: {"pideVendidas":60},
    sombras: [
      [16,10,19,11]
    ],
    objetos: [
      {"x":18,"y":11,"tipo":"estatuilla","id":"final"}
    ],
    puertas: [
      {"x":5,"y":13,"casa":"jefe-final","extra":true},
      {"x":25,"y":13,"casa":"granvilla"},
      {"x":28,"y":13,"casa":"camara-acorazada","pideEstatuillas":7},
      {"x":15,"y":13,"calle":"estacion","acto":"vuelta"}
    ],
    tienda: {"x":17,"y":13},
    enemigos: [
      {"tipo":"h","spr":"gato","x":12,"fila":13,"min":10,"max":13,"dir":1,"lento":true}
    ]
  },
  {
    id: "nerja-noche",
    nombre: "Nerja de noche · el Balcón bajo la luna",
    mundo: "nerja",
    tema: "balcon",
    calle: true,
    bajadas: [
      {"x":17,"y":9,"casa":"superbonus-8","pista":"moneda"}
    ],
    secreta: true,
    mapa: [
      "                                ",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                              W",
      "W                o o o         W",
      "W                       WWWWWW W",
      "W                       Z  o W W",
      "W          o o o        Zdv  W W",
      "W                BBBBBBBWWWWWW W",
      "W                BBBBBB        W",
      "W      o o o  BBBBBBBBBB  o o  W",
      "W             BBBBBBBBBB       W",
      "W @      BBBBBBBBBBBBBBBBBBBB  W",
      "W        BBBBBBBBBBBBBBBBBBBB  W",
      "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ],
    salidas: {},
    puertas: [
      {"x":4,"y":13,"calle":"estacion"}
    ],
    trucos: [
      {"tipo":"cuadro","x":20,"y":7,"hace":"monedas","celdas":[[17,6],[19,6],[21,6]]}
    ],
    sombras: [
      [25,7,28,8]
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":9,"fila":11,"min":9,"max":11,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":48,"y":40,"min":40,"max":64,"dy":1}
    ]
  },
  {
    especiales: [
      {"x":15,"y":13,"casa":"sotano-programador","dibujo":"ordenadorViejo"}
    ],
    id: "edificio-p13",
    nombre: "La planta 13",
    mundo: "edificio",
    paleta: "ameba2",
    calle: true,
    secreta: true,
    bajadas: [
      {"x":30,"y":5,"casa":"superbonus-10","pista":"grieta"}
    ],
    oscuro: true,
    lamparas: [
      [2,10],
      [13,6],
      [27,1]
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W                            g W",
      "W                              W",
      "W                  o  FFFFFFFFFW",
      "W                              W",
      "W              o  FFF          W",
      "W                              W",
      "W          o  FFF              W",
      "W   B                          W",
      "W      o  FFF                  W",
      "W                              W",
      "W@    FFF                      W",
      "W                              W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    salidas: {},
    puertas: [
      {"x":1,"y":13,"calle":"edificio-p5"},
      {"x":27,"y":3,"casa":"edificio-extra","extra":true}
    ],
    trucos: [
      {"tipo":"golpes","x":4,"y":10,"n":13,"hace":"premio","premio":[2,12,"vida"]}
    ],
    huellasPista: [
      [30,14],
      [30,12],
      [30,10],
      [30,8],
      [30,6],
      [30,4],
      [29,4]
    ],
    enemigos: [
      {"tipo":"h","spr":"gato","x":12,"fila":13,"min":10,"max":26,"dir":1,"lento":true},
      {"tipo":"v","spr":"murcielago","x":184,"y":24,"min":8,"max":72,"dy":2}
    ]
  },
  {
    dibujos: {"moneda":"monedaGolf"},
    id: "golf-cueva",
    nombre: "La Cueva bajo el Green",
    mundo: "urba",
    tema: "cueva",
    calle: true,
    dobleSalto: true,
    secreta: true,
    premioTodas: 5000,
    bajadas: [
      {"x":28,"y":12,"casa":"superbonus-9","pista":"brillo"}
    ],
    mapa: [
      "WWWWWWWWWWWWWWWWWWW   WWWWWWWWWW",
      "W                              W",
      "W                              W",
      "W   o o o                      W",
      "W                  @      o o  W",
      "W                o             W",
      "WFFFFFFFF     FFFFFFFFFF   FFFFW",
      "W                              W",
      "W        o o            o o    W",
      "W       FFFFFF        FFFFFF   W",
      "W                              W",
      "W   o o                ooo     W",
      "WFFFFFFFFF    FFFFFFFFFF  WWWWWW",
      "W                         Z    W",
      "W     o   o    o          Z  d W",
      "WFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFW"
    ],
    salidas: {},
    puertas: [
      {"x":2,"y":13,"calle":"urba-golf"},
      {"x":20,"y":13,"casa":"urba-extra","extra":true}
    ],
    trucos: [
      {"tipo":"cuadro","x":6,"y":4,"hace":"monedas","celdas":[[3,2],[5,2],[7,2]]}
    ],
    enemigos: [
      {"tipo":"v","spr":"murcielago","x":96,"y":56,"min":56,"max":80,"dy":1,"duerme":true},
      {"tipo":"h","spr":"rata","x":12,"fila":13,"min":12,"max":17,"dir":1,"lento":true},
      {"tipo":"topo","spr":"rata","agujeros":[[40,80],[112,80],[160,80]],"asoma":24,"periodo":48}
    ]
  }
];
if (typeof module !== 'undefined') { module.exports = LLAVES_CASAS; module.exports.tesoros = LLAVES_TESOROS; module.exports.retro = LLAVES_RETRO; module.exports.nuevas = LLAVES_NUEVAS; module.exports.calles = LLAVES_CALLES; module.exports.galaxia = LLAVES_GALAXIA; }
