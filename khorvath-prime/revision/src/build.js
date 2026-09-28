// Construye la página de revisión de Khorvath-Prime: el juego entero + un panel a la derecha
// (informe de la sala, visto bueno / cambiar algo, notas que se guardan solas, secretos).
// Uso: node build.js <index.html del juego> <salida index.html>
'use strict';
const fs=require('fs'), path=require('path');
const SRC=process.argv[2]||path.join(__dirname,'..','index.html');
const OUT=process.argv[3]||path.join(__dirname,'index.html');
const salas=JSON.parse(fs.readFileSync(path.join(__dirname,'salas.json'),'utf8'));

// ── Limpieza del informe del operario (fuera rutas, ficheros y salidas de consola) ──
const RUIDO=/\/tmp\/|resultado\.json|room-\d+\.js|checksol|smoke|Entregables|Ficheros|Archivos|index\.html|SUPERADA|semilla|frames|agentes\/|No he tocado|no he tocado|mk\.js|neg\.js|secreto\.js|hint\.txt|notas\.txt|aplicar-sala|noDecor|flag|0\/0|\.md\b/i;
function limpia(md){
  const out=[]; let fence=false;
  for(let l of md.split('\n')){
    if(/^\s*```/.test(l)){ fence=!fence; continue; } if(fence) continue;
    if(RUIDO.test(l) && !/Secreto|secreto|\$/.test(l)) continue;
    l=l.replace(/`/g,'');
    out.push(l);
  }
  return out.join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function inline(s){ return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/«(.+?)»/g,'«<i>$1</i>»'); }
function md2html(md){
  const lines=md.split('\n'); let html='', list=null;
  const close=()=>{ if(list){ html+='</'+list+'>'; list=null; } };
  for(const raw of lines){
    const l=raw.trim();
    if(!l){ close(); continue; }
    let m;
    if((m=l.match(/^[-•]\s+(.*)/))){ if(list!=='ul'){ close(); html+='<ul>'; list='ul'; } html+='<li>'+inline(m[1])+'</li>'; continue; }
    if((m=l.match(/^\d+[.)]\s+(.*)/))){ if(list!=='ol'){ close(); html+='<ol>'; list='ol'; } html+='<li>'+inline(m[1])+'</li>'; continue; }
    close();
    if(/^\*\*[^*]+\*\*:?$/.test(l)) html+='<h4>'+inline(l.replace(/\*\*/g,'').replace(/:$/,''))+'</h4>';
    else html+='<p>'+inline(l)+'</p>';
  }
  close(); return html;
}
function zonaSecreto(s){ if(!s) return ''; const v=s.r<=4?'arriba':s.r>=9?'abajo':'a media altura'; const h=s.c<=7?'a la izquierda':s.c>=16?'a la derecha':'en el centro'; return v+', '+h; }
function lineaSecreto(md){ const l=md.split('\n').find(x=>/secreto|\$/i.test(x)&&!/^#/.test(x)); return l?inline(l.replace(/^[-•\d.)\s]+/,'').replace(/\*\*Secreto[^*]*\*\*:?\s*/i,'').replace(/`/g,'')):''; }
const GUARDIAS={g:'Gólem de ronda',G:'Gólem de ronda',f:'Gólem fijo',F:'Gólem fijo',s:'Gólem dormido',i:'tirador',I:'tirador',j:'sargento',B:'Capataz Mayor',H:'sabueso',r:'perro rastreador'};

const DATA=salas.map(o=>{
  let inf=''; try{ inf=fs.readFileSync(path.join(__dirname,'informes',o.i+'.md'),'utf8'); }catch(e){}
  const limpio=inf?limpia(inf):'';
  const g={}; for(const [k,n] of Object.entries(o.guards||{})){ const nom=GUARDIAS[k]||k; g[nom]=(g[nom]||0)+n; }
  return { i:o.i, n:o.i+1, name:o.name, zone:o.zone, total:o.total, hint:o.hint,
    informe: limpio?md2html(limpio):'', secreto:{ donde:zonaSecreto(o.secret), como:limpio?lineaSecreto(limpio):'' },
    guardias:Object.entries(g).map(([k,v])=>v>1?v+' '+k+'s':'1 '+k).join(', ') };
});
// La sala 0 la rehíce yo (27-sep) a petición de Alejandro; no tiene informe de operario.
if(!DATA[0].informe) DATA[0].informe='<p>Rehecha el 27-sep a petición tuya: un sabueso, un Gólem, más plataformas hasta la puerta y un secreto escondido. La sala vieja no tenía nada.</p>';

// ── Inyección en el juego ──
let h=fs.readFileSync(SRC,'utf8');
h=h.split('\n').filter(l=>!/src="\.\.\/arcade-ranking\.js/.test(l)).join('\n');
const EXPOSE="'use strict'; window.__kp={go:function(i){ TR=null; ri=i; load(); ov.hidden=true; phase='card'; cardT=0; fade=1; try{audio();}catch(e){} }, retry:function(){ if(phase==='play'||phase==='dead'){ load(); fade=0; phase='play'; } }, lista:function(){ selector(); }, ri:function(){ return ri; }, phase:function(){ return phase; }, ROOMS:ROOMS, ST:ST };";
const n=h.split("'use strict';").length-1; if(n!==1) throw new Error("'use strict' aparece "+n+" veces");
h=h.replace("'use strict';",EXPOSE);

const PANEL=`
<style id="rv-css">
  body{padding-right:290px;}
  #rv{position:fixed;top:0;right:0;bottom:0;width:270px;overflow:auto;background:#0b0d11;border-left:1px solid #2a2e35;padding:12px 12px 24px;font:11px/1.45 'IBM Plex Mono',ui-monospace,monospace;color:#c9c3b4;z-index:50;}
  #rv h2{margin:0 0 2px;font:15px/1.2 'Special Elite',Georgia,serif;color:#c9a24a;} #rv .m{color:#8d887d;font-size:10px;margin:0 0 8px;}
  #rv h3{margin:14px 0 4px;font:11px/1.3 'Share Tech Mono',monospace;letter-spacing:.14em;color:#c9a24a;text-transform:uppercase;}
  #rv h4{margin:8px 0 2px;font-size:11px;color:#e8e2d3;}
  #rv .inf{max-height:34vh;overflow:auto;padding-right:4px;border:1px solid #1f2329;background:#0e1116;padding:6px 8px;}
  #rv .inf p{margin:0 0 6px;} #rv .inf ul,#rv .inf ol{margin:0 0 6px;padding-left:16px;} #rv .inf li{margin:0 0 3px;} #rv .inf b{color:#e8e2d3;}
  #rv .btns{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0;}
  #rv button{font:inherit;cursor:pointer;background:#1c1f24;color:#e8e2d3;border:1px solid #3a3f47;padding:6px 9px;}
  #rv button.ok{border-color:#7dffb0;color:#7dffb0;} #rv button.ok.on{background:#153d2a;} #rv button.no{border-color:#ff5a4a;color:#ff5a4a;} #rv button.no.on{background:#4a1b16;}
  #rv button.gold{background:#c9a24a;color:#1a1408;border-color:#c9a24a;font-weight:600;}
  #rv textarea{width:100%;box-sizing:border-box;min-height:150px;background:#0e1116;color:#e8e2d3;border:1px solid #3a3f47;padding:8px;font:inherit;resize:vertical;}
  #rv .aviso{color:#ffb84a;font-size:10px;margin:8px 0;} #rv .aviso button{margin-left:4px;padding:3px 7px;}
  #rv .sec{margin:0 0 6px;} #rv .sec b{color:#7dffb0;}
  #rv .pie{color:#5a5f66;font-size:10px;margin-top:12px;} #rv .pie a{color:#8d887d;}
  #rv .est{font-size:10px;color:#8d887d;margin:2px 0 0;} #rv .est.ok{color:#7dffb0;} #rv .est.no{color:#ff5a4a;}
  @media (max-width:1100px){ body{padding-right:0;} #rv{position:static;width:auto;border-left:0;border-top:1px solid #2a2e35;} }
</style>
<div id="rv">
  <h2 id="rv-t">📕 …</h2>
  <p class="m" id="rv-z">Escribe mientras juegas: se guarda solo</p>
  <p class="est" id="rv-est"></p>
  <h3>Qué se cambió el 27-sep</h3>
  <div class="inf" id="rv-inf"></div>
  <div class="btns"><button class="ok" id="rv-ok">✅ Visto bueno</button><button class="no" id="rv-no">✏️ Cambiar algo</button></div>
  <textarea id="rv-nota" placeholder="Apunta aquí lo que veas mientras juegas: qué falla, qué cambiarías, si es difícil o fácil… (se guarda solo)"></textarea>
  <div class="btns"><button class="gold" id="rv-sig">Siguiente ▶</button><button id="rv-rep">↻ Repetir</button><button id="rv-lista">☰ Lista</button></div>
  <div class="aviso" id="rv-aviso" hidden></div>
  <p class="m">Consejo: haz clic en el juego para volver a moverte; mientras escribes aquí, las teclas no llegan al juego.</p>
  <h3>🔑 Su secreto</h3>
  <div id="rv-sec"></div>
  <h3>Guardias de la sala</h3>
  <p id="rv-g" class="m"></p>
  <div class="pie">
    <button id="rv-fich">💾 Guardar en un fichero…</button> <button id="rv-desc">⬇ Descargar notas</button>
    <p id="rv-fichinfo" class="m"></p>
    <p>Lo que apuntes se guarda en este navegador y, si eliges un fichero, también ahí. Mándame el fichero cuando acabes.</p>
  </div>
</div>
<script>
(function(){
  var DATA=${JSON.stringify(DATA)};
  var KEY='kp_revision'; var db={rooms:{}}; try{ db=JSON.parse(localStorage.getItem(KEY)||'{"rooms":{}}'); }catch(e){}
  var cur=-1, handle=null, saveT=null;
  var $=function(id){ return document.getElementById(id); };
  function kp(){ return window.__kp; }
  function room(i){ return DATA[i]||null; }
  function estado(i){ return (db.rooms[i]||{}); }
  function guardar(){ try{ localStorage.setItem(KEY,JSON.stringify(db)); }catch(e){} clearTimeout(saveT); saveT=setTimeout(escribeFichero,800); pintaEstado(); }
  function fecha(){ return new Date().toLocaleString('es-ES'); }
  function md(){
    var s='# Khorvath-Prime · revisión de Alejandro\\nActualizado: '+fecha()+'\\n\\n';
    DATA.forEach(function(r){ var e=estado(r.i); if(!e.estado&&!(e.nota||'').trim()) return;
      s+='## '+r.n+'. '+r.name+' — '+(e.estado==='ok'?'✅ Visto bueno':e.estado==='no'?'✏️ Cambiar algo':'(sin marcar)')+'\\n'+((e.nota||'').trim()||'(sin notas)')+'\\n\\n'; });
    return s;
  }
  function pintaEstado(){ var e=estado(cur); var el=$('rv-est'); el.className='est '+(e.estado||''); el.textContent=e.estado==='ok'?'✅ Visto bueno ('+(e.fecha||'')+')':e.estado==='no'?'✏️ Pendiente de cambios ('+(e.fecha||'')+')':'Sin revisar todavía';
    $('rv-ok').classList.toggle('on',e.estado==='ok'); $('rv-no').classList.toggle('on',e.estado==='no'); }
  function pinta(i){
    var r=room(i); if(!r) return; cur=i;
    $('rv-t').textContent='📕 '+r.n+'. '+r.name;
    $('rv-z').textContent=(r.total?r.total+' hermano'+(r.total>1?'s':'')+' · ':'solo Talo · ')+'zona '+r.zone.replace('z','')+' · escribe mientras juegas: se guarda solo';
    $('rv-inf').innerHTML=r.informe||'<p class="m">Sin informe para esta sala.</p>';
    $('rv-inf').scrollTop=0;
    $('rv-nota').value=estado(i).nota||'';
    $('rv-sig').textContent='Siguiente ▶ '+(r.n+1); $('rv-sig').disabled=!DATA[i+1];
    $('rv-sec').innerHTML='<p class="sec"><b>Dónde:</b> '+(r.secreto.donde||'no hay')+'. Vale 2 tuercas y 250 puntos; solo se ve de cerca.</p>'+(r.secreto.como?'<p class="sec"><b>Cómo:</b> '+r.secreto.como+'</p>':'');
    $('rv-g').textContent=r.guardias||'ninguno';
    pintaEstado();
  }
  $('rv-ok').onclick=function(){ var e=db.rooms[cur]=db.rooms[cur]||{}; e.estado=e.estado==='ok'?'':'ok'; e.fecha=fecha(); guardar(); };
  $('rv-no').onclick=function(){ var e=db.rooms[cur]=db.rooms[cur]||{}; e.estado=e.estado==='no'?'':'no'; e.fecha=fecha(); guardar(); $('rv-nota').focus(); };
  $('rv-nota').addEventListener('input',function(){ var e=db.rooms[cur]=db.rooms[cur]||{}; e.nota=this.value; e.fecha=fecha(); guardar(); });
  $('rv-sig').onclick=function(){ if(kp()&&DATA[cur+1]) kp().go(cur+1); };
  $('rv-rep').onclick=function(){ if(kp()) kp().retry(); };
  $('rv-lista').onclick=function(){ if(kp()) kp().lista(); };
  $('rv-desc').onclick=function(){ var b=new Blob([md()],{type:'text/markdown'}); var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='khorvath-revision.md'; a.click(); };
  // ── Fichero: se guarda solo con la API de ficheros del navegador (Chrome/Edge) ──
  function idb(fn){ var rq=indexedDB.open('kp_rev',1); rq.onupgradeneeded=function(){ rq.result.createObjectStore('h'); }; rq.onsuccess=function(){ fn(rq.result); }; }
  function setHandle(h){ idb(function(d){ d.transaction('h','readwrite').objectStore('h').put(h,'f'); }); }
  function getHandle(fn){ try{ idb(function(d){ var g=d.transaction('h').objectStore('h').get('f'); g.onsuccess=function(){ fn(g.result||null); }; }); }catch(e){ fn(null); } }
  function escribeFichero(){ if(!handle) return; handle.queryPermission({mode:'readwrite'}).then(function(p){ if(p!=='granted'){ avisa(); return; } return handle.createWritable().then(function(w){ return w.write(md()).then(function(){ return w.close(); }); }).then(function(){ $('rv-fichinfo').textContent='Guardado en '+handle.name+' · '+fecha(); }); }).catch(function(e){ $('rv-fichinfo').textContent='No se pudo guardar: '+e.message; }); }
  function avisa(){ var a=$('rv-aviso'); a.hidden=false; a.innerHTML='⚠️ El navegador pide permiso otra vez para guardar en el fichero. <button class="gold" id="rv-perm">Dar permiso</button>';
    $('rv-perm').onclick=function(){ handle.requestPermission({mode:'readwrite'}).then(function(p){ if(p==='granted'){ a.hidden=true; escribeFichero(); } }); }; }
  $('rv-fich').onclick=function(){ if(!window.showSaveFilePicker){ $('rv-fichinfo').textContent='Tu navegador no deja guardar en fichero; usa «Descargar notas».'; return; }
    window.showSaveFilePicker({suggestedName:'khorvath-revision.md',types:[{description:'Notas',accept:{'text/markdown':['.md']}}]}).then(function(h){ handle=h; setHandle(h); $('rv-aviso').hidden=true; escribeFichero(); }).catch(function(){}); };
  if(window.showSaveFilePicker) getHandle(function(h){ if(h){ handle=h; h.queryPermission({mode:'readwrite'}).then(function(p){ if(p==='granted') $('rv-fichinfo').textContent='Se guarda en '+h.name; else avisa(); }); } });
  // ── Seguir la sala en la que está el juego ──
  setInterval(function(){ var k=kp(); if(!k) return; var i=k.ri(); if(i!==cur&&DATA[i]&&document.activeElement!==$('rv-nota')) pinta(i); },400);
  pinta(0);
})();
</script>
`;
h=h.includes('</body>')?h.replace('</body>',PANEL+'</body>'):h+PANEL;
fs.writeFileSync(OUT,h);
console.log('escrito',OUT,Math.round(h.length/1024)+' KB · salas con informe:',DATA.filter(d=>d.informe).length);
