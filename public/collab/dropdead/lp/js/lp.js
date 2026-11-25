/* PCYES × Drop Dead — LP da collab (protótipo estático, sem build).
 * Cada página (a.html, b.html, ab.html) declara as seções em <main data-secoes="...">.
 * Fotos: v2/v3 do GPT (recebidos/ em produtos-collab-v2), recortadas com rembg; foto inteira em assets/produtos/foto/.
 * PLACEHOLDERS: preços, faixas do kit e cupom são provisórios. */

const PRODUTOS = [
  { id:"teclado",  nome:"Teclado Arkeum 75%",  img:"1-teclado",  preco:549.90, obst:"rampa",    pico:"A rampa",
    det:["Gabinete em lâminas de maple tingidas, como a borda de um shape","Teclas off-white, modificadores amarelos e setas azuis","Knob de uretano amarelo, como roda de skate","Cabo espiral com conector amarelo"] },
  { id:"mouse",    nome:"Mouse Fenner",        img:"2-mouse",    preco:299.90, obst:"caixotes", pico:"Os caixotes",
    det:["Dorso inteiro em lixa preta","Logo Drop Dead recortado na lixa, com amarelo por baixo","Laterais translúcidas","Scroll de uretano amarelo"] },
  { id:"mousepad", nome:"Mousepad Extended",   img:"3-mousepad", preco:129.90, obst:"banca",    pico:"A banca",
    det:["Azul Drop Dead com blueprint de truck","Borda costurada com faixa amarela","Logos Drop Dead e PCYES"] },
  { id:"headset",  nome:"Headset Kamar",       img:"4-headset",  preco:349.90, obst:"orelhao",  pico:"O orelhão",
    det:["Conchas amarelas translúcidas, como roda nova","Arco revestido de lixa","Garfos de alumínio, como truck"] },
  { id:"shape",    nome:"Shape PCYES × Drop Dead", img:"5-shape", preco:399.90, obst:"poste",   pico:"O poste",
    det:["Fundo em placa de circuito com o mascote da PCYES","Lixa com setas de teclado recortadas","Maple, formato popsicle"] },
  { id:"camiseta", nome:"Camiseta Oversized",  img:"6-camiseta", preco:189.90, obst:"cone",     pico:"O cone",
    det:["Oversized preta lavada, malha pesada","Costas: truck carregando uma keycap vermelha","PCYES / Drop Dead no peito"] },
  { id:"meia",     nome:"Meia Cano Médio",      img:"7-meia",     preco:59.90,  obst:"luminaria",pico:"A luminária",
    det:["Preta com punho e ponta vermelhos","Sola que imita lixa de skate","W A S D divididas entre os pés","Mascote da PCYES e logo Drop Dead"] },
];
const BB = {"1-teclado":[0.0409,0.2536,0.9527,0.8736],"2-mouse":[0.0709,0.2545,0.8991,0.7355],"3-mousepad":[0.0155,0.1864,0.9891,0.8127],"4-headset":[0.1136,0.1082,0.7991,0.9464],"5-shape":[0.2382,0.0245,0.7536,0.9718],"6-camiseta":[0.0045,0.0836,1.0,0.8191],"7-meia":[0.1064,0.0555,0.8818,0.9364]}; // onde o produto está em cada foto (fração)
const FAIXAS = [ {n:1,off:0}, {n:2,off:10}, {n:3,off:15}, {n:4,off:20} ]; // PROVISÓRIO
const CUPOM = "DROPDEAD35";                                               // PROVISÓRIO — não existe no Magento
const JOGOS_IFRAME = { linha:"https://pcyes-v3-codigo-fonte.vercel.app/collab/dropdead/jogo/index.html", sessao:"https://pcyes-v3-codigo-fonte.vercel.app/collab/dropdead/jogo2/index.html" };
const JOGOS = { linha:"https://pcyes-v3-codigo-fonte.vercel.app/drop-dead", sessao:"https://pcyes-v3-codigo-fonte.vercel.app/drop-session" };

const A = "assets/";
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
const brl = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $ = (s,r=document) => r.querySelector(s), $$ = (s,r=document) => [...r.querySelectorAll(s)];
const img = p => `${A}produtos/${p.img}.webp`;
const kit = new Set();

/* ------------------------------------------------------------------ topo */
function topo(){
  const v = document.body.dataset.v;
  const nav = [["Novidades","/produtos?novidades=1"],["Hardware","/produtos"],["Periféricos","/produtos"],["Cadeiras","/produtos"],["Computadores","/produtos"],["PC Gamer","/produtos"],["Collab","#topo"]];
  return `<div class="faixa-collab"><img src="${A}logo-dropdead.png" alt=""><b>PCYES × DROP DEAD</b><span>35% OFF em toda a collab com o cupom</span><em>${CUPOM}</em></div>
  <header class="site-top">
    <div class="linha1">
      <a href="/" aria-label="PCYES, página inicial"><img class="logo" src="${A}logo-pcyes.png" alt="PCYES"></a>
      <div class="cep"><small>Entrega</small><b>Informar CEP</b></div>
      <div class="busca"><b>Todas</b><span>O que você está procurando?</span></div>
      <div class="conta"><small>Entre ou</small><b>Cadastre-se</b></div>
      <button class="carrinho" onclick="location.hash='kit'" aria-label="Carrinho">🛒<b id="kitN">0</b></button>
    </div>
    <nav class="linha2">${nav.map(([n,h])=>`<a href="${h}"${n==="Collab"?' class="on"':""}>${n}</a>`).join("")}<a href="/monte-seu-pc" class="red">Monte seu PC</a></nav>
  </header>
  <div class="versoes"${/^(localhost|127\.)/.test(location.hostname)?"":" hidden"}><span>protótipo</span>
    ${[["a","A"],["b","B"],["ab","A+B"]].map(([k,t])=>`<a href="${k}.html" class="${k===v?"on":""}">${t}</a>`).join("")}
  </div>`;
}

/* ------------------------------------------------------------------ hero (A): remada → ollie com kickflip → pouso → sai rolando */
function hero(){
  return `<section class="sec hero" id="topo">
    <div class="stage">
      <div class="sol halftone"></div>
      <div class="skyline"></div>
      <img class="poste l" src="${A}obj/poste.webp" alt="">
      <img class="poste r" src="${A}obj/poste.webp" alt="">
      <div class="rua"><div class="plano"><div class="faixas"></div></div></div>
      <h1 class="nome"><span class="t" data-lado="-1">PCYES</span><span class="x">×</span><span class="t" data-lado="1">DROP DEAD</span></h1>
      <div class="vel"></div>
      <div class="sombra"></div>
      <div class="poeira">${[[-90,-30],[-60,-60],[70,-50],[100,-20],[-20,-80],[30,-70]].map(([x,y])=>`<i style="--dx:${x}px;--dy:${y}px"></i>`).join("")}</div>
      <div class="rider"><img class="shape" src="${A}robo/tras-lixa.webp" alt=""><img class="robo" src="${A}robo/remada1.webp" alt="Robô da collab andando de skate"></div>
      <div class="carimbo">DA PISTA PRO SETUP</div>
      <div class="dica">rola pra dropar <b>↓</b></div>
    </div>
  </section>`;
}
function initHero(){
  const h = $(".hero"); if(!h) return;
  const stage=$(".stage",h), carimbo=$(".carimbo",h), rider=$(".rider",h), robo=$(".robo",h), shape=$(".shape",h), sombra=$(".sombra",h), dica=$(".dica",h), nomes=$$(".nome .t",h), faixas=$(".faixas",h), vel=$(".vel",h);
  const pre = n => { const i=new Image(); i.src=`${A}robo/${n}.webp`; return i.src; };
  const F = Object.fromEntries(["remada1","remada2","remada3","remada4","agachado","ollie2","ollie4","no-ar","ollie5","rolando","rolando2","tras-lixa","tras-fundo"].map(n=>[n,pre(n)]));
  const set = (el,n) => { if(el.dataset.f!==n){ el.src=F[n]; el.dataset.f=n; } };
  if(reduz){ set(robo,"rolando"); h.classList.add("pousou"); dica.style.opacity=0; return; }
  let pousou=false;
  const ease = t => 1-Math.pow(1-t,3), lerp=(a,b,t)=>a+(b-a)*t, cl=t=>Math.max(0,Math.min(1,t));
  function quadro(p){
    const vh=innerHeight, vw=innerWidth;
    let x=0, y=0, s=1, rot=0, fr, gap=0, roll=0, sq=1, v=0, hz=24, op=1;
    if(p<.30){            // REMADA: entra de perto, cada vez mais rápido
      const t=p/.30; s=lerp(1.45,1,ease(t)); x=lerp(-vw*.12,0,ease(t)); y=lerp(vh*.06,0,ease(t));
      fr="remada"+(1+Math.floor(Math.pow(t,.8)*14)%4); v=t;
    } else if(p<.36){     // AGACHA pro pop
      fr="agachado"; sq=.94; v=1;
    } else if(p<.62){     // OLLIE + KICKFLIP
      const t=(p-.36)/.26; y=-vh*.32*Math.sin(t*Math.PI); rot=Math.sin(t*Math.PI*2)*-6;
      fr=t<.15?"ollie2":t<.35?"ollie4":t<.7?"no-ar":"ollie5";
      gap=Math.sin(t*Math.PI)*vh*.05;                        // shape descola dos pés no meio do pulo
      roll=t<.2?0:t>.8?360:(t-.2)/.6*360;                     // uma volta no eixo longo
      v=1;
    } else if(p<.68){     // POUSO
      const t=(p-.62)/.06; fr="agachado"; sq=1-Math.sin(t*Math.PI)*.1; v=.8;
    } else {              // SAI ROLANDO pro horizonte
      const u=(p-.68)/.32, t=u*u*(3-2*u); hz=24+26*t;                       // a rua sobe: o horizonte vai de 24vh a 50vh
      y=-vh*((hz-7)/100)*.93*t; s=1-t*.52; fr=Math.floor(p*50)%2?"rolando":"rolando2"; v=.8*(1-t);
      op=t>.82?Math.max(0,1-(t-.82)/.18):1;                        // entra no carimbo
    }
    rider.style.transform=`translate(${x}px,${y}px) rotate(${rot}deg) scale(${s})`;
    rider.style.opacity=op; stage.style.setProperty("--hz",hz+"vh"); carimbo.style.setProperty("--cz",1+Math.max(0,(p-.9)*1.2));
    robo.style.transform=`translateX(-50%) scaleY(${sq})`;
    set(robo,fr);
    const r=((roll%360)+360)%360, fundo=r>90&&r<270;           // de costas, o kickflip gira no plano da tela
    set(shape, fundo?"tras-fundo":"tras-lixa");
    shape.style.transform=`translate(-50%,${-gap}px) rotate(${roll+(fundo?180:0)}deg)`;
    const alt=cl(-y/(vh*.32));
    sombra.style.transform=`translateX(${x}px) scale(${(1-alt*.6)*s})`; sombra.style.opacity=1-alt*.7;
    faixas.style.backgroundPositionY=`${p*vh*14}px`;               // a rua corre embaixo
    vel.style.opacity=v*.9;
    if(p>=.62 && !pousou){ pousou=true; h.classList.add("pousou"); }
    if(p<.58 && pousou){ pousou=false; h.classList.remove("pousou"); }
    const abre=cl((p-.3)/.3);
    nomes.forEach(n=>n.style.transform=`translateX(${n.dataset.lado*abre*vw*.12}px)`);
    dica.style.opacity = p<.04?1:0;
  }
  onScroll(()=>{ const r=h.getBoundingClientRect(); quadro(cl(-r.top/(r.height-innerHeight))); });
}

/* ------------------------------------------------------------------ história (A+B): rua → setup → encontro + vídeo */
const VIDEO = "yt:Xh2S_T-SQtw";   // PLACEHOLDER: vídeo da collab Maringá FC. Trocar pelo da Drop Dead: "assets/video.mp4" ou "yt:<id>"
const YT = VIDEO.startsWith("yt:") ? VIDEO.slice(3) : "";
function historia(){
  const cap=(n,t,txt,arte,lado)=>`<div class="cap ${lado}">
    <div class="cap-txt"><p class="kicker">cap. ${n}</p><h2 class="titulo">${t}</h2><p class="corpo">${txt}</p></div>
    <div class="cap-arte">${arte}</div></div>`;
  return `<section class="sec historia" id="historia">
    <svg class="trilha-h" aria-hidden="true"><defs><mask id="mascaraH" maskUnits="userSpaceOnUse"><path class="m"/></mask></defs><path class="d" mask="url(#mascaraH)"/></svg>
    <div class="rider-h" aria-hidden="true"><img class="rb" src="${A}lado/kf1.webp" alt=""><img class="rr" src="${A}lado/base-rodando.webp" alt=""></div><div class="truques" aria-hidden="true"></div>
    <p class="manifesto"><span>Uma vive na rua.</span> <span>A outra vive no setup.</span> <span class="am">As duas são do Paraná.</span></p>
    ${cap("01","A RUA",`Curitiba. Eduardo Dias tinha 15 anos quando abriu a Drop Dead. A loja virou ponto de encontro e, em 1998, abriu pista própria na Travessa da Lapa: o Drop Dead Skate Park, que em 2007 recebeu um campeonato amador grande. Mais de 35 anos depois, o moleque da skateshop preside a Confederação Brasileira de Skate.`,
      `<figure class="print xerox" style="--r:-5deg;width:54%;left:2%;top:0"><img src="${A}historia/dd-skatista.webp" alt="Skatista da Drop Dead"></figure>
      <figure class="print" style="--r:4deg;width:56%;right:0;bottom:0"><img src="${A}historia/dd-rua.webp" alt="Skatista na rua, foto Drop Dead"><span class="data">'26 11 25</span></figure>
      <img src="${A}logo-dropdead.png" alt="Drop Dead" class="selo">`,"esq")}
    ${cap("02","O SETUP",`Maringá, 2010. A PCYES nasceu pra quem passa a noite no setup: teclado, mouse, headset, cadeira, PC inteiro. Hardware e periférico pensados no Brasil, pra quem joga, edita e cria sem trava.`,
      `<figure class="print" style="--r:3deg;width:62%;right:0;top:0"><img src="${A}historia/pcyes-estande.webp" alt="Estande PCYES Store"><span class="data">'26 11 25</span></figure>
      <figure class="print xerox" style="--r:-6deg;width:46%;left:0;bottom:0"><img src="${A}historia/pcyes-time.webp" alt="Time PCYES"></figure>`,"dir")}
    <div class="cap encontro">
      <div class="cap-txt"><p class="kicker">cap. 03</p><h2 class="titulo">O ENCONTRO</h2>
        <p class="corpo">Uns 400 km de estrada separam Curitiba de Maringá. A collab junta os dois lados trocando o material: o setup ganha lixa, maple e uretano. O shape, a camiseta e a meia ganham tecla, circuito e o mascote da PCYES.</p></div>
      <div class="cap-arte"><figure class="print" style="--r:-3deg;width:54%;left:0;top:0"><img src="${A}produtos/foto/4-headset.webp" alt="Headset da collab"><span class="data">'26 11 25</span></figure>
      <figure class="print xerox" style="--r:5deg;width:50%;right:0;bottom:0"><img src="${A}produtos/foto/7-meia.webp" alt="Meia da collab"></figure></div></div>
    </div>
      </section>
  <section class="sec expande" id="video"><div class="palco">
    <p class="exp-t" data-lado="-1">PCYES</p><p class="exp-t" data-lado="1">DROP DEAD</p>
    <div class="midia">${YT?`<iframe class="yt" src="https://www.youtube.com/embed/${YT}?enablejsapi=1&mute=1&loop=1&playlist=${YT}&controls=0&rel=0&modestbranding=1&playsinline=1" title="Vídeo da collab" allow="autoplay; encrypted-media" tabindex="-1"></iframe>`
      :VIDEO?`<video src="${VIDEO}" muted playsinline loop preload="metadata"></video>`
      :["2-mouse","1-teclado","5-shape","4-headset","6-camiseta"].map((f,i)=>`<img src="${A}produtos/foto/${f}.webp" alt="" class="${i?"":"on"}">`).join("")}
      <span class="data">'26 11 25</span>
      <p class="leg"><span></span><span>${YT?"vídeo provisório: collab Maringá FC":""}</span></p>
      <button class="som" aria-label="Ligar som" ${VIDEO?"":"hidden"}>som off</button>
    </div></section>`;
}
function initExpande(){
  const s=$(".expande"); if(!s) return;
  const m=$(".midia",s), ts=$$(".exp-t",s), v=$("video",m), yt=$("iframe.yt",m), imgs=$$("img",m), som=$(".som",m);
  const ytCmd=(f,a=[])=>yt&&yt.contentWindow.postMessage(JSON.stringify({event:"command",func:f,args:a}),"*");
  let mudo=true;
  let tocando=false, slide=0, timer=null;
  const toca=on=>{ if(on===tocando) return; tocando=on;
    if(yt){ ytCmd(on?"playVideo":"pauseVideo"); }
    else if(v){ on? v.play().catch(()=>{}) : v.pause(); }
    else if(on){ timer=setInterval(()=>{ imgs[slide].classList.remove("on"); slide=(slide+1)%imgs.length; imgs[slide].classList.add("on"); },2400); }
    else clearInterval(timer);
    m.classList.toggle("tocando",on); };
  if(som) som.onclick=()=>{ mudo=!mudo; if(v) v.muted=mudo; if(yt) ytCmd(mudo?"mute":"unMute"); som.textContent=mudo?"som off":"som on"; };
  if(reduz){ m.style.clipPath="none"; m.classList.add("cheio"); return; }
  onScroll(()=>{
    const r=s.getBoundingClientRect(), p=Math.max(0,Math.min(1,-r.top/(r.height-innerHeight)));
    const e=Math.min(1,p/.7), k=1-Math.pow(1-e,2);                // 0→.7 expande, .7→1 fica cheio
    const ix=(1-k)*innerWidth*.31, iy=(1-k)*innerHeight*.26, rr=(1-k)*18;
    m.style.clipPath=`inset(${iy}px ${ix}px ${iy}px ${ix}px round ${rr}px)`;
    m.style.setProperty("--z",1.18-k*.18);
    ts.forEach(t=>{ t.style.transform=`translateX(${t.dataset.lado*k*innerWidth*.35}px)`; t.style.opacity=1-k; });
    m.classList.toggle("cheio",k>.97);
    toca(r.top<innerHeight*.7 && r.bottom>innerHeight*.4);
  });
}
function initHistoria(){
  const s=$(".historia"); if(!s) return;
  // LINE PELAS FOTOS: as fotos são os obstáculos (borda = corrimão/caixote), com manobra anotada onde acontece
  const svg=$(".trilha-h",s), d=$(".d",s), m=$(".m",s), rid=$(".rider-h",s), rr=$(".rr",rid), rb=$(".rb",rid), tq=$(".truques",s);
  const F=n=>`${A}lado/${n}.webp`;
  ["base-rodando","base-agachado","ar-ollie","ar-flip","borda-grind1","borda-grind2","borda-nose","kf1","kf2","kf3","kf4","kf5","kf6"].forEach(n=>{ const i=new Image(); i.src=F(n); });
  const setSrc=(el,n)=>{ if(el.dataset.f!==n){ el.src=F(n); el.dataset.f=n; } };
  const NOMES=[["50-50 NO CORRIMÃO","OLLIE NO GAP","KICKFLIP DE SAÍDA"],["BOARDSLIDE","OLLIE NO GAP","KICKFLIP DE SAÍDA"],["NOSEGRIND","OLLIE NO GAP","KICKFLIP DE SAÍDA"]];
  const GRIND=["borda-grind1","borda-grind1","borda-nose"];
  let len=0, amostras=[];
  const off=el=>{ let x=0,y=0,e=el; while(e&&e!==s){ x+=e.offsetLeft; y+=e.offsetTop; e=e.offsetParent; } return {l:x,t:y,r:x+el.offsetWidth,b:y+el.offsetHeight,w:el.offsetWidth}; };
  function traca(){
    if(innerWidth<900||reduz){ svg.style.display="none"; rid.style.display="none"; tq.innerHTML=""; len=0; return; }
    svg.style.display=""; rid.style.display="";
    const W=s.offsetWidth, caps=$$(".cap",s), man=$(".manifesto",s); if(caps.length<3) return;
    const ob=off(man), oc=caps.map(off);
    const gy=[(ob.b+oc[0].t)/2,(oc[0].b+oc[1].t)/2,(oc[1].b+oc[2].t)/2];
    const lado=W*.035+30;
    const segs=[]; let x=lado, y=gy[0], dir=1, dd=`M${x},${y}`;
    const add=(tipo,dstr,nx,ny,extra={})=>{ segs.push({tipo,d:dstr,x0:x,y0:y,x1:nx,y1:ny,...extra}); dd+=dstr; x=nx; y=ny; };
    for(let c=0;c<3;c++){
      const pr=$$(".print",caps[c]).map(off).sort((a,b)=>dir*(a.l-b.l)), [A_,B_]=pr;
      const ent=o=>dir>0?o.l+14:o.r-14, sai=o=>dir>0?o.r-14:o.l+14, ya=A_.t+4, yb=B_.t+4;
      const ax=ent(A_);
      add("chao",` L${ax-dir*170},${y}`,ax-dir*170,y);
      add("salto",` Q${ax-dir*60},${Math.min(y,ya)-70} ${ax},${ya}`,ax,ya,{truque:"drop"});
      add("grind",` L${sai(A_)},${ya}`,sai(A_),ya,{nome:NOMES[c][0],sprite:GRIND[c]});
      const bx=ent(B_);
      add("salto",` Q${(x+bx)/2},${Math.min(ya,yb)-110} ${bx},${yb}`,bx,yb,{truque:"ollie",nome:NOMES[c][1]});
      add("grind",` L${sai(B_)},${yb}`,sai(B_),yb,{sprite:GRIND[c]});
      const lx=sai(B_)+dir*150, ly=yb+80;
      add("salto",` Q${sai(B_)+dir*80},${yb-90} ${lx},${ly}`,lx,ly,{truque:"kickflip",nome:NOMES[c][2]});
      if(c<2){ const sx=dir>0?W-lado:lado, ny=gy[c+1];
        add("parede",` C${sx},${ly} ${sx},${ly} ${sx},${(ly+ny)/2} S${sx},${ny} ${sx-dir*80},${ny}`,sx-dir*80,ny,{nome:"WALLRIDE"});
        dir=-dir; }
      else add("chao",` L${lx+dir*120},${ly}`,lx+dir*120,ly);
    }
    d.setAttribute("d",dd); m.setAttribute("d",dd); len=m.getTotalLength();
    const tmp=document.createElementNS("http://www.w3.org/2000/svg","path"); svg.appendChild(tmp);
    let pref=`M${lado},${gy[0]}`; segs.forEach(g=>{ tmp.setAttribute("d",pref); g.L0=pref.length>12?tmp.getTotalLength():0; pref+=g.d; tmp.setAttribute("d",pref); g.L1=tmp.getTotalLength(); }); tmp.remove();
    // chave de scroll: trecho plano ganha janela de 300px em volta do seu y; trecho que desce acompanha o y real
    let kAnt=-1e9; segs.forEach(g=>{ const plano=Math.abs(g.y1-g.y0)<.5*Math.abs(g.x1-g.x0), ym=(g.y0+g.y1)/2;
      let k0=plano?ym-150:Math.min(g.y0,g.y1), k1=plano?ym+150:Math.max(g.y0,g.y1); k0=Math.max(k0,kAnt); if(k1<k0+40) k1=k0+40; g.k0=k0; g.k1=k1; kAnt=k1; });
    amostras=[]; for(let l=0;l<=len;l+=4){ const pt=m.getPointAtLength(l), g=segs.find(g=>l>=g.L0&&l<=g.L1)||segs[segs.length-1], f=Math.min(1,Math.max(0,(l-g.L0)/Math.max(1,g.L1-g.L0)));
      amostras.push({l,x:pt.x,y:pt.y,g,f,k:g.k0+(g.k1-g.k0)*f}); }
    m.style.strokeDasharray=len;
    tq.innerHTML=segs.filter(g=>g.nome).map(g=>{ const mx=(g.x0+g.x1)/2, my=g.tipo==="parede"?(g.y0+g.y1)/2:Math.min(g.y0,g.y1)-(g.tipo==="salto"?64:46);
      return `<span class="truque${g.tipo==="parede"?" vert":""}" style="left:${g.tipo==="parede"?g.x0+(g.x0>W/2?-46:46):mx}px;top:${my}px">${g.nome} <i>↷</i></span>`; }).join("");
  }
  traca(); addEventListener("resize",traca); addEventListener("load",traca); $$(".print img",s).forEach(i=>i.addEventListener("load",traca));
  onScroll(()=>{ if(!len||!amostras.length) return;
    const r=s.getBoundingClientRect(), kt=innerHeight*.58-r.top;
    let lo=0,hi=amostras.length-1; while(lo<hi){ const mi=(lo+hi)>>1; if(amostras[mi].k<kt) lo=mi+1; else hi=mi; }
    const a=amostras[lo], b=amostras[Math.min(amostras.length-1,lo+2)], g=a.g;
    m.style.strokeDashoffset=len-a.l;
    rid.style.opacity = kt>amostras[0].k-250 && lo<amostras.length-1 ? 1 : 0;
    const vai=(b.x-a.x)>=0?1:-1; let ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI; if(vai<0) ang=ang>0?ang-180:ang+180;
    let robo="base-rodando", shape="kf1", mostraShape=true;
    if(g.tipo==="grind"){ robo=g.sprite==="borda-nose"?"borda-nose":(Math.floor(a.l/40)%2?"borda-grind2":"borda-grind1"); mostraShape=false; ang=0; }
    else if(g.tipo==="salto"){ ang=Math.max(-18,Math.min(18,ang*.4));
      if(g.truque==="kickflip"){ robo="ar-flip"; shape="kf"+(1+Math.min(5,Math.floor(a.f*7))); } else robo=g.truque==="drop"?"base-agachado":"ar-ollie"; }
    else if(g.tipo==="parede"){ robo="base-agachado"; }
    else ang=Math.max(-20,Math.min(20,ang));
    setSrc(rr,robo); if(mostraShape) setSrc(rb,shape); rb.style.display=mostraShape?"":"none";
    rr.classList.toggle("grind",!mostraShape);
    rid.style.transform=`translate(${a.x}px,${a.y}px) rotate(${ang}deg) scaleX(${vai})`;
    rr.style.transform="translateX(-50%)"; rb.style.transform="translateX(-50%)";
  });
  const els=$$(".cap,.manifesto,.ponte",s);
  if(reduz){ els.forEach(e=>e.classList.add("vis")); return; }
  const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("vis")),{threshold:.2});
  els.forEach(el=>io.observe(el));
  const tc=$("#tc"); if(tc){ let f=0; setInterval(()=>{ f++; const ss=Math.floor(f/25); tc.textContent=`00:${String(Math.floor(ss/60)).padStart(2,"0")}:${String(ss%60).padStart(2,"0")}`; },40); }
}

/* ------------------------------------------------------------------ zine (A) */
function zine(){
  const pal = "QUEM É QUEM".split(" ");
  const cores=[["var(--yellow)","var(--ink)"],["var(--ink)","var(--paper)"],["var(--blue)","var(--paper)"],["#fff","var(--ink)"]];
  return `<section class="sec zine drag-zone" data-adesivos="6">
    <div class="wrap">
      <div class="resgate">${pal.join(" ").split("").map((c,i)=>c===" "?`<span style="width:30px"></span>`:`<span style="--r:${(i%3-1)*4}deg;background:${cores[i%4][0]};color:${cores[i%4][1]}">${c}</span>`).join("")}</div>
      <div class="cols">
        <div class="folha" style="--r:-1.5deg"><i class="fita"></i>
          <h3>DROP DEAD</h3>
          <ul>
            <li><b>Onde</b>Skateshop de Curitiba.</li>
            <li><b>Quem</b>Fundada por Eduardo Dias, aos 15 anos.</li>
            <li><b>Pista</b>Teve o Drop Dead Skate Park, na Travessa da Lapa, com campeonato amador em 2007.</li>
            <li><b>Hoje</b>Grupo Drop Family, com mais de 15 marcas e 35+ anos de skate.</li>
          </ul>
          <p class="fonte">fontes: rio2c.com · tribunapr.com.br · dropdead.com.br</p>
        </div>
        <div class="folha" style="--r:1.2deg"><i class="fita"></i>
          <h3>PCYES</h3>
          <ul>
            <li><b>O quê</b>Periféricos e hardware gamer, marca brasileira.</li>
            <li><b>A collab</b>O setup ganha a rua: shape, lixa, nanquim e xerox nos periféricos.</li>
            <li><b>E mais</b>Dois jogos de navegador com o robô da collab.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------ linha (A) */
function linha(){
  return `<section class="sec linha" id="produtos">
    <svg class="trilha" aria-hidden="true"><path class="sombra"/><path class="tinta"/></svg>
    <img class="mini" src="${A}robo/rolando.webp" alt="">
    <div class="cab"><p class="kicker">a linha · 7 picos</p><h2 class="titulo">DA PISTA<br>PRO SETUP</h2>
      <p>clica no card pra mandar um kickflip →</p></div>
    ${PRODUTOS.map((p,i)=>`<div class="pico" data-i="${i}">
      ${cardKF(p,i)}
      <div class="obst"><img src="${A}obj/${p.obst}.webp" alt=""><small>PICO ${String(i+1).padStart(2,"0")} · ${p.pico}</small></div>
    </div>`).join("")}
  </section>`;
}
function cardKF(p,i){
  return `<div class="card-kf" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.nome}: ver ficha">
    <div class="kf">
      <div class="face frente"><div class="tag"><span>PICO ${String(i+1).padStart(2,"0")}</span><span>PCYES × DROP DEAD</span></div>
        <img src="${img(p)}" alt="${p.nome}" loading="lazy"><h4>${p.nome}</h4><div class="vira">kickflip pra ver a ficha ↻</div></div>
      <div class="face verso"><h4>${p.nome}</h4><ul>${p.det.map(d=>`<li>${d}</li>`).join("")}</ul>
        <div class="linha-btn"><div class="preco">${brl(p.preco)}</div>
        <button class="btn" data-kit="${p.id}">+ kit</button></div></div>
    </div></div>`;
}
function initLinha(){
  const s=$(".linha"); if(!s) return;
  $$(".card-kf",s).forEach(c=>{
    const vira=e=>{ if(e.target.closest("[data-kit]")) return;
      const v=c.classList.toggle("virado"); c.classList.remove("flip-on","flip-off");
      if(!reduz){ void c.offsetWidth; c.classList.add(v?"flip-on":"flip-off"); } };
    c.addEventListener("click",vira); c.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();vira(e);} });
  });
  const svg=$(".trilha",s), tinta=$(".tinta",s), sombra=$(".sombra",s), mini=$(".mini",s);
  let len=0;
  function traca(){
    const base=s.getBoundingClientRect(), pts=$$(".pico",s).map(el=>{ const o=$(".obst img",el).getBoundingClientRect(); return [o.left+o.width/2-base.left, o.top+o.height*.85-base.top]; });
    const ini=[base.width/2, $(".cab",s).offsetTop+$(".cab",s).offsetHeight+20];
    let d=`M${ini[0]},${ini[1]}`, prev=ini;
    pts.forEach(([x,y])=>{ const my=(prev[1]+y)/2; d+=` C${prev[0]},${my} ${x},${my} ${x},${y}`; prev=[x,y]; });
    d+=` C${prev[0]},${prev[1]+120} ${base.width/2},${s.offsetHeight-80} ${base.width/2},${s.offsetHeight-20}`;
    tinta.setAttribute("d",d); sombra.setAttribute("d",d); len=tinta.getTotalLength();
    [tinta,sombra].forEach(p=>{p.style.strokeDasharray=len; p.style.strokeDashoffset=reduz?0:len;});
  }
  traca(); addEventListener("resize",traca); $$(".obst img",s).forEach(i=>i.addEventListener("load",traca));
  if(reduz){ mini.remove(); return; }
  let lastX=0;
  onScroll(()=>{ const r=s.getBoundingClientRect(); const p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));
    const L=len*p; [tinta,sombra].forEach(x=>x.style.strokeDashoffset=len-L);
    if(!len) return; const pt=tinta.getPointAtLength(L), pt2=tinta.getPointAtLength(Math.min(len,L+4));
    const dir = pt2.x<pt.x?-1:1; if(Math.abs(pt2.x-pt.x)>.3) lastX=dir;
    mini.style.transform=`translate(${pt.x-37}px,${pt.y-100}px) scaleX(${lastX||1})`;
    mini.src=`${A}robo/${Math.floor(p*60)%2?"rolando2":"rolando"}.webp`;
  });
}

/* ------------------------------------------------------------------ parede (B) */
function parede(comTitulo){
  const rot=[-3,2,-1.5,3,-1,2.5,-2];
  return `<section class="sec parede drag-zone" id="produtos" data-adesivos="10">
    <div class="lampada" style="left:18%;--d:0s"></div><div class="lampada" style="left:78%;--d:-1.7s;--fio:150px"></div><div class="chao"></div>
    ${comTitulo?`<div class="pintura"><p class="kicker">PCYES × DROP DEAD · a collab</p>
      <h1 class="titulo">DA PISTA <em>PRO</em> SETUP</h1>
      <p>tudo na parede tá à venda · <b>arrasta os adesivos</b></p></div>`
     :`<div class="pintura"><h2 class="titulo">A LINHA</h2><p>Clica numa peça pra ver de perto. Os adesivos dá pra arrastar.</p></div>`}
    <div class="colagem">
      ${PRODUTOS.map((p,i)=>{ const r=[-5,3,-2,6,-4,2,-6][i], fita=["amarela","vermelha","azul"][i%3], fr=[4,-3,5,-6,3,-4,6][i];
        const H=[250,190,200,290,330,250,270][i], Y=[0,40,-10,20,-20,30,0][i];
        return `<div class="item" data-id="${p.id}" style="--r:${r}deg;--h:${H}px;--y:${Y}px" tabindex="0" role="button" aria-label="${p.nome}: ver ficha">
        <img src="${img(p)}" alt="${p.nome}" loading="${i<4?"eager":"lazy"}">
        <span class="gun" style="--gr:${-r*2}deg">${brl(p.preco)}</span>
        <p class="posca" style="--fr:${fr*.6}deg"><i>↖</i> ${p.nome}</p>
      </div>`; }).join("")}
    </div>
  </section>
  <div class="ficha" aria-hidden="true"><div class="box" role="dialog" aria-modal="true">
    <button class="fechar" aria-label="Fechar">×</button><div class="img"><img alt=""><span class="data">'26 11 25</span></div>
    <div class="txt"><h3></h3><ul></ul>
      <div class="preco"></div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-kit="">+ kit</button><button class="btn no-kit" onclick="toast('protótipo: aqui vai pro carrinho da loja')">comprar</button></div></div>
  </div></div>`;
}
function initParede(){
  const s=$(".parede"); if(!s) return;
  // fita crepe dos cantos cola na borda real do adesivo (a imagem usa object-fit: contain)
  const cola=im=>{ const w=im.clientWidth,h=im.clientHeight,r=im.naturalWidth/im.naturalHeight; if(!r) return;
    let cw=w,ch=h; if(w/h>r) cw=h*r; else ch=w/r;
    const it=im.parentElement; it.style.setProperty("--tt",((h-ch)/2)+"px"); it.style.setProperty("--tx",((w-cw)/2)+"px"); };
  $$(".colagem .item img",s).forEach(im=>{ im.complete?cola(im):im.addEventListener("load",()=>cola(im)); });
  addEventListener("resize",()=>$$(".colagem .item img",s).forEach(cola));
  const f=$(".ficha"), fi=$(".img img",f);
  let origem=null;
  function abre(el){
    const p=PRODUTOS.find(x=>x.id===el.dataset.id), src=$("img",el);
    $("h3",f).textContent=p.nome; $("ul",f).innerHTML=p.det.map(d=>`<li>${d}</li>`).join("");
    $(".preco",f).innerHTML=`<span class="gun-lg">${brl(p.preco)}</span>`; $("[data-kit]",f).dataset.kit=p.id; syncKitBtns();
    fi.src=`${A}produtos/foto/${p.img}.webp`; fi.alt=p.nome; origem=src;
    f.classList.add("on"); f.setAttribute("aria-hidden","false"); $(".fechar",f).focus({preventScroll:true});
    if(reduz) return;
    // o produto sai voando da parede até a ficha
    const a=src.getBoundingClientRect(); const v=src.cloneNode(); v.className="voando";
    Object.assign(v.style,{left:a.left+"px",top:a.top+"px",width:a.width+"px",height:a.height+"px"}); document.body.appendChild(v);
    fi.style.opacity=0; src.style.opacity=0;
    // pousa exatamente onde o produto está dentro da foto (BB medido com rembg), depois crossfade
    Promise.all([fi.decode().catch(()=>{}), new Promise(r=>setTimeout(r,380))]).then(()=>{
      const b=fi.getBoundingClientRect(), r=fi.naturalWidth/fi.naturalHeight||1; let cw=b.width,ch=b.height;
      if(b.width/b.height>r) cw=b.height*r; else ch=b.width/r;
      const ox=b.left+(b.width-cw)/2, oy=b.top+(b.height-ch)/2, bb=BB[p.img]||[0,0,1,1];
      Object.assign(v.style,{left:ox+bb[0]*cw+"px",top:oy+bb[1]*ch+"px",width:(bb[2]-bb[0])*cw+"px",height:(bb[3]-bb[1])*ch+"px"});
      setTimeout(()=>{ fi.style.transition="opacity .35s"; fi.style.opacity=1; v.style.transition="opacity .35s"; v.style.opacity=0; setTimeout(()=>v.remove(),380); },460);
    });
  }
  function fecha(){ f.classList.remove("on"); f.setAttribute("aria-hidden","true"); if(origem) origem.style.opacity=1; }
  $$(".item",s).forEach(el=>{ el.addEventListener("click",()=>abre(el)); el.addEventListener("keydown",e=>{ if(e.key==="Enter") abre(el); }); });
  $(".fechar",f).onclick=fecha; f.addEventListener("click",e=>{ if(e.target===f) fecha(); });
  addEventListener("keydown",e=>{ if(e.key==="Escape") fecha(); });
}

/* ------------------------------------------------------------------ adesivos */
const ADESIVOS = [
  {w:120, html:`<img src="${A}logo-dropdead.png" alt="Drop Dead">`, borda:1},
  {w:150, html:`<div class="in pt">DA PISTA PRO SETUP</div>`},
  {w:120, html:`<div class="in teclas"><span class="tecla">W</span><span class="tecla">A</span><span class="tecla">S</span><span class="tecla">D</span></div>`, borda:1},
  {w:90,  html:`<div class="in circ am">CWB</div>`, borda:1},
  {w:130, html:`<div class="in az">CTRL + OLLIE</div>`},
  {w:110, html:`<div class="in pt" style="background:var(--ink);padding:10px;border:3px solid #fff"><img src="${A}logo-pcyes-branco.png" alt="PCYES" style="height:22px;width:auto"></div>`},
  {w:70,  html:`<div class="in am" style="font-size:44px;padding:2px 14px">×</div>`},
  {w:150, html:`<div class="in teclas"><span class="tecla">←</span><span class="tecla">↑</span><span class="tecla">→</span><span class="tecla">↓</span></div>`, borda:1},
  {w:100, html:`<img src="${A}logo-dropdead.png" alt="Drop Dead">`, borda:1},
  {w:130, html:`<div class="in am">ESC = DROP</div>`},
];
function initAdesivos(){
  $$(".drag-zone[data-adesivos]").forEach(z=>{
    const W=z.offsetWidth, H=z.offsetHeight, n=W<700?0:Math.min(+z.dataset.adesivos,6);
    for(let i=0;i<n;i++){
      const a=ADESIVOS[i%ADESIVOS.length], el=document.createElement("div");
      el.className="adesivo"+(a.borda?" borda":""); el.innerHTML=a.html; el.style.width=a.w+"px";
      el.style.setProperty("--r",(Math.random()*30-15).toFixed(1)+"deg");
      // espalha pelas bordas para não cobrir produto
      const lado=i%2, x=lado? W-a.w-W*(.01+Math.random()*.04) : W*(.01+Math.random()*.04), y=W<700? H*(.02+i*.05) : H*(.1+(i/n)*.8);
      el.style.left=Math.min(W-a.w-6,x)+"px"; el.style.top=y+"px";
      z.appendChild(el); arrasta(el,z);
    }
  });
}
let zTopo=30;
function arrasta(el,z){
  el.addEventListener("pointerdown",e=>{
    e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add("pega"); el.style.zIndex=++zTopo;
    const ox=e.clientX-el.offsetLeft, oy=e.clientY-el.offsetTop;
    const move=ev=>{ el.style.left=Math.max(-20,Math.min(z.offsetWidth-el.offsetWidth+20,ev.clientX-ox))+"px"; el.style.top=Math.max(0,Math.min(z.offsetHeight-el.offsetHeight,ev.clientY-oy))+"px"; };
    const solta=()=>{ el.classList.remove("pega"); el.style.setProperty("--r",(Math.random()*16-8).toFixed(1)+"deg"); el.removeEventListener("pointermove",move); };
    el.addEventListener("pointermove",move); el.addEventListener("pointerup",solta,{once:true}); el.addEventListener("pointercancel",solta,{once:true});
  });
}

/* ------------------------------------------------------------------ kit */
const SLOTS = [[50,19,64,-8],[33,33,40,12],[63,44,56,-4],[36,57,36,9],[67,64,24,-12],[42,76,54,5],[66,85,32,-7]]; // x%, y%, largura% do shape, giro
function kitSec(){
  return `<section class="sec kit" id="kit"><div class="wrap">
    <div class="kit-cab"><h2 class="titulo">MONTE<br>O KIT</h2>
      <p class="sub">Descola da cartela e cola no fundo do shape. Quanto mais peça, maior o desconto.</p></div>
    <div class="kit-grade">
      <div class="cartela">
        ${PRODUTOS.map(p=>`<button class="cel" data-kit="${p.id}" aria-label="${p.nome}: colocar no kit">
          <span class="recorte"><img src="${img(p)}" alt="" loading="lazy" draggable="false"></span>
          <b>${p.nome}</b><span class="pr">${brl(p.preco)}</span></button>`).join("")}
      </div>
      <div class="kit-lado">
        <div class="shape-kit" id="shapeKit">
          <p class="vazio">cola aqui ↓</p>
          ${PRODUTOS.map((p,i)=>{ const [x,y,w,r]=SLOTS[i]; return `<button class="no-shape" data-kit="${p.id}" style="left:${x}%;top:${y}%;width:${w}%;--r:${r}deg" aria-label="Tirar ${p.nome} do kit"><img src="${img(p)}" alt=""></button>`; }).join("")}
        </div>
        <div class="carimbos">${FAIXAS.slice(1).map(f=>`<span data-n="${f.n}">${f.n}${f.n===4?"+":""} peças<b>−${f.off}%</b></span>`).join("")}</div>
        <div class="resumo">
          <div><small id="kitQtd">nenhuma peça</small><s id="kitDe"></s></div>
          <span class="gun-lg" id="kitTotal">${brl(0)}</span>
        </div>
        <button class="btn levar" onclick="toast(kit.size?'protótipo: aqui o kit vai pro carrinho':'cola pelo menos uma peça no shape')">levar o kit</button>
      </div>
    </div></div></section>`;
}
let antes = new Set();
function voa(de, para, ida){
  if(reduz || !de || !para) return;
  const a=de.getBoundingClientRect(), b=para.getBoundingClientRect(); if(!a.width||!b.width) return;
  const v=(de.tagName==="IMG"?de:de.querySelector("img")).cloneNode(); v.className="voando";
  Object.assign(v.style,{left:a.left+"px",top:a.top+"px",width:a.width+"px",height:a.height+"px"}); document.body.appendChild(v);
  para.style.visibility="hidden";
  requestAnimationFrame(()=>Object.assign(v.style,{left:b.left+"px",top:b.top+"px",width:b.width+"px",height:b.height+"px",transform:`rotate(${ida?getComputedStyle(para).getPropertyValue("--r"):"0deg"})`}));
  setTimeout(()=>{ para.style.visibility=""; if(ida) para.classList.add("bate"); v.remove(); setTimeout(()=>para.classList.remove("bate"),400); },470);
}
function atualizaKit(){
  const itens=PRODUTOS.filter(p=>kit.has(p.id)), n=itens.length, soma=itens.reduce((a,p)=>a+p.preco,0);
  const off=[...FAIXAS].reverse().find(f=>n>=f.n)?.off||0, total=soma*(1-off/100);
  const sk=$("#shapeKit");
  if(sk){
    PRODUTOS.forEach(p=>{
      const cel=$(`.cel[data-kit="${p.id}"] img`), no=$(`.no-shape[data-kit="${p.id}"]`);
      if(kit.has(p.id)&&!antes.has(p.id)) { syncKitBtns(); voa(cel,no,true); }
      if(!kit.has(p.id)&&antes.has(p.id)) { voa($("img",no),cel,false); }
    });
    sk.classList.toggle("tem",n>0);
    $$(".carimbos span").forEach(c=>c.classList.toggle("on",n>=+c.dataset.n));
    $("#kitQtd").textContent = n? `${n} peça${n>1?"s":""}${off?` · −${off}%`:""}` : "nenhuma peça";
    $("#kitDe").textContent = off?brl(soma):"";
    $("#kitTotal").textContent = brl(total);
  }
  antes=new Set(kit);
  const k=$("#kitN"); if(k){ k.textContent=n; k.parentElement.classList.remove("bump"); void k.offsetWidth; k.parentElement.classList.add("bump"); }
  syncKitBtns();
}
function syncKitBtns(){
  $$("[data-kit]").forEach(b=>{ const on=kit.has(b.dataset.kit); b.classList.toggle("on",on);
    if(b.classList.contains("btn")) b.textContent= on?"✓ no kit":"+ kit"; });
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-kit]"); if(!b||!b.dataset.kit||b.dataset.arrastou) return; e.stopPropagation();
  const id=b.dataset.kit; kit.has(id)?kit.delete(id):kit.add(id); atualizaKit();
  if(kit.has(id)) toast(`${PRODUTOS.find(p=>p.id===id).nome} no kit`);
});

function initKitDrag(){
  const sk=$("#shapeKit"); if(!sk) return;
  $$(".cartela .cel").forEach(c=>{
    c.addEventListener("pointerdown",e=>{
      if(kit.has(c.dataset.kit)) return;
      const x0=e.clientX,y0=e.clientY, im=$("img",c); let g=null;
      const move=ev=>{ if(!g&&Math.hypot(ev.clientX-x0,ev.clientY-y0)>8){ g=im.cloneNode(); g.className="arrastando"; document.body.appendChild(g); c.classList.add("descolando"); }
        if(g){ g.style.left=ev.clientX+"px"; g.style.top=ev.clientY+"px"; const r=sk.getBoundingClientRect();
          sk.classList.toggle("alvo",ev.clientX>r.left&&ev.clientX<r.right&&ev.clientY>r.top&&ev.clientY<r.bottom); } };
      const up=ev=>{ removeEventListener("pointermove",move); removeEventListener("pointerup",up);
        if(g){ const dentro=sk.classList.contains("alvo"); g.remove(); c.classList.remove("descolando"); sk.classList.remove("alvo");
          c.dataset.arrastou="1"; setTimeout(()=>delete c.dataset.arrastou,0);
          if(dentro){ kit.add(c.dataset.kit); antes.add(c.dataset.kit); atualizaKit(); const no=$(`.no-shape[data-kit="${c.dataset.kit}"]`); no.classList.add("bate"); setTimeout(()=>no.classList.remove("bate"),400); toast(`${PRODUTOS.find(p=>p.id===c.dataset.kit).nome} no shape`); } } };
      addEventListener("pointermove",move); addEventListener("pointerup",up);
    });
  });
}

/* ------------------------------------------------------------------ jogos: abrem num modal em tela cheia */
function jogos(){
  const card=(k,t,img,txt,meta)=>`<button class="fliper" data-jogo="${k}" aria-label="Jogar ${t}">
      <img src="${A}${img}" alt="" loading="lazy">
      <div class="info"><h3>${t}</h3><p>${txt}</p><p class="meta">${meta}</p></div>
      <span class="btn jogar">jogar ▶</span></button>`;
  return `<section class="sec jogos" id="jogos"><div class="wrap">
    <h2 class="titulo">JOGA A COLLAB</h2>
    <p class="sub-j">Dois jogos de skate no navegador, com o robô da collab. No DROP SESSION, quem completa a cartela leva o cupom.</p>
    <div class="par">
      ${card("linha","DROP LINE","keyart-jogo1.webp","Runner pela cidade: monta a linha, manda manobra e foge do tombo.","Meta: nota DROP DEAD, 150 mil pontos")}
      ${card("sessao","DROP SESSION","keyart-jogo2.webp","Half-pipe de 60 segundos, de noite, com a galera olhando.","Cartela: 540, 3 grabs seguidos e os 4 produtos. Completou, sai o cupom.")}
    </div>
  </div></section>
  <div class="jogo-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Jogo">
    <iframe title="Jogo da collab" allow="autoplay; fullscreen" allowfullscreen></iframe>
    <button class="fechar-jogo" aria-label="Fechar o jogo">fechar ✕</button>
  </div>`;
}
function initJogos(){
  const m=$(".jogo-modal"); if(!m) return;
  const f=$("iframe",m);
  const abre=k=>{ f.src=JOGOS_IFRAME[k]; m.classList.add("on"); m.setAttribute("aria-hidden","false"); document.documentElement.style.overflow="hidden"; setTimeout(()=>f.focus(),300); };
  const fecha=()=>{ m.classList.remove("on"); m.setAttribute("aria-hidden","true"); document.documentElement.style.overflow=""; setTimeout(()=>f.src="about:blank",250); };
  $$("[data-jogo]").forEach(b=>b.addEventListener("click",()=>abre(b.dataset.jogo)));
  $(".fechar-jogo",m).onclick=fecha;
  addEventListener("keydown",e=>{ if(e.key==="Escape"&&m.classList.contains("on")) fecha(); });
}

/* ------------------------------------------------------------------ muro de lambe-lambe */
const LAMBES = [
  ...PRODUTOS.map(p=>({ img:`${A}produtos/foto/${p.img}.webp`, t:p.nome.split(" ")[0] })),
  { t:"PCYES × DROP DEAD", txt:1 }, { t:"DA PISTA PRO SETUP", txt:1 }, { t:"CWB", txt:1 },
  { img:`${A}keyart.webp`, t:"A COLLAB" },
];
function muro(){
  return `<section class="sec muro" id="muro"><div class="cab"><h2 class="titulo">MURO</h2><p>Clica no muro pra colar um lambe.</p></div></section>
  <footer class="site-foot">
    <div class="cols">
      <div><h4>NOSSA MISSÃO</h4><p>A PCYES nasceu para impulsionar a performance dos gamers e profissionais, entregando produtos de alta qualidade, tecnologia e design.</p>
        <img src="${A}logo-pcyes.png" alt="PCYES" class="lg"></div>
      <div><h4>AJUDA E SUPORTE</h4>${["F.A.Q","Drivers e Manuais","Fale Conosco","Pedidos","Política de Garantia, Trocas e Devoluções","Política de Privacidade","Termos de uso"].map(t=>`<a href="#">${t}</a>`).join("")}</div>
      <div><h4>SOBRE A PCYES</h4>${["Quem somos","Onde Encontrar","PC Points","Seja um Influenciador","Seja um Revendedor","Maringá FC × PCYES","Drop Dead × PCYES"].map(t=>`<a href="#"${t.startsWith("Drop")?' class="on"':""}>${t}</a>`).join("")}</div>
      <div><h4>CERTIFICADOS</h4><p class="cert">selos de segurança</p></div>
    </div>
    <p class="legal">Oderço Distribuidora de Eletrônicos LTDA · 09.301.845/0001-91 · Av. Paranavaí, 1906, Parque Industrial Bandeirantes, Maringá - PR · Protótipo: preços, faixas do kit, cupom, metas dos jogos e vídeo são provisórios.</p>
  </footer>`;
}
function cola(m,x,y,novo){
  const l=LAMBES[Math.floor(Math.random()*LAMBES.length)], el=document.createElement("div"), sorte=Math.random();
  el.className="lambe"+(sorte<.25?" az":sorte<.45?" am":"")+(l.txt?" so-txt":"")+(novo?" novo":"");
  const w = l.txt? 200+Math.random()*80 : 150+Math.random()*90;
  el.style.cssText=`--w:${w}px;--r:${(Math.random()*12-6).toFixed(1)}deg;left:${x-w/2}px;top:${y-40}px`;
  el.innerHTML = (l.img?`<img src="${l.img}" alt="" loading="lazy">`:"")+`<b>${l.t}</b>`;
  m.appendChild(el);
}
function initMuro(){
  const m=$(".muro"); if(!m) return;
  const W=m.offsetWidth, H=m.offsetHeight, n=W<700?10:22;
  for(let i=0;i<n;i++) cola(m, (i%6+.5)*(W/6)+Math.random()*60-30, 140+Math.floor(i/6)*(H/4)+Math.random()*40, false);
  m.addEventListener("click",e=>{ const r=m.getBoundingClientRect(); cola(m,e.clientX-r.left,e.clientY-r.top,!reduz); });
}

/* ------------------------------------------------------------------ util */
const scrolls=[];
function onScroll(fn){ scrolls.push(fn); fn(); }
let tick=false;
addEventListener("scroll",()=>{ if(tick) return; tick=true; requestAnimationFrame(()=>{ scrolls.forEach(f=>f()); tick=false; }); },{passive:true});
addEventListener("resize",()=>scrolls.forEach(f=>f()));
let tt; function toast(t){ let el=$(".toast"); if(!el){ el=document.createElement("div"); el.className="toast"; document.body.appendChild(el); }
  el.textContent=t; el.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove("on"),1800); }
window.toast=toast; window.kit=kit;

/* ------------------------------------------------------------------ monta */
const SECOES = { hero, historia, zine, linha, parede:()=>parede(false), "parede-titulo":()=>parede(true), kit:kitSec, jogos, muro };
const main=$("main");
main.innerHTML = topo() + main.dataset.secoes.split(",").map(s=>SECOES[s.trim()]()).join("");
initHero(); initHistoria(); initExpande(); initJogos(); initKitDrag(); initLinha(); initParede(); atualizaKit();
addEventListener("load",()=>{ initAdesivos(); initMuro(); scrolls.forEach(f=>f()); });
