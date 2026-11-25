/* Opção A · Cinema — hero de pôster de filme; história numa faixa horizontal com fundo LOUD em camadas. */
(function () {
  const { BASE, LOUD_WORD, LOUD_SIMB, PCYES, PCYES_PALAVRA, SETA, CAPS, HOJE, pad2, clamp01, montaVitrine, progresso, laco } = window.LD;

  const hero = () => `
    <section class="sec a-hero">
      <div class="a-foto"><img src="${BASE}img/loud/campeoes-taca.jpg?v=2" alt="" fetchpriority="high"></div>
      <header class="a-creditos">
        <div class="lockup">${PCYES()}<span class="x">×</span>${LOUD_WORD}</div>
      </header>
      <div class="a-hero-txt">
        <h1 class="larga a-titulo">
          <span class="ln"><span>A casa dos</span></span>
          <span class="ln"><span>campeões agora</span></span>
          <span class="ln"><span>joga de&nbsp;<span class="pcyes-completo" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-vermelho.png')"></span><i>.</i></span></span>
        </h1>
        <div class="a-hero-pe">
          <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
        </div>
      </div>
    </section>`;

  // ---------- HISTÓRIA: filme rolável. Cada capítulo tem um movimento próprio, sempre com imagem real
  // (frames do documentário oficial "LOUD LOL: o caminho até o título", canal @LOUDgg). Scroll livre, tudo no scrub.
  const H = (n) => `${BASE}img/hist/${n}.jpg?v=2`;
  const [c1, c2, c3, c4] = CAPS;
  const quadro = (n, cls = "") => `<figure class="f-q ${cls}"><img src="${H(n)}" alt="" loading="lazy"></figure>`;
  const capTxt = (c, i, extra = "") => `
    <p class="kicker">Capítulo ${pad2(i + 1)} <b>·</b> ${c.lugar}, ${c.ano}</p>
    <h3 class="f-tit">${c.tit}</h3>
    <p class="corpo">${c.txt}</p>${extra}`;
  const historia = () => `
    <section class="f-cena f-abre" style="--h:220">
      <div class="f-palco">
        <div class="f-img"><img src="${H("abre")}" alt="" loading="lazy"></div>
        <div class="f-abre-txt">
          <p class="kicker">A história <b>·</b> 2019–2026</p>
          <h2 class="f-grande"><span class="f-l">De São Paulo</span><span class="f-l">para o topo</span><span class="f-l"><em>do mundo.</em></span></h2>
        </div>
      </div>
    </section>

    <section class="f-cena f-c1" style="--h:240">
      <div class="f-palco">
        <div class="f-c1-txt">${capTxt(c1, 0)}</div>
        <div class="f-c1-cont" aria-hidden="true"><b class="f-num" data-alvo="1000000000">0</b><span>visualizações</span></div>
        <div class="f-leque">${quadro("c1-a", "q1")}${quadro("c1-b", "q2")}${quadro("c1-c", "q3")}</div>
      </div>
    </section>

    <section class="f-cena f-c2" style="--h:230">
      <div class="f-palco">
        <div class="f-fita f-fita-a">${[1, 2, 3, 4, 5, 6].map((n) => quadro("c2-" + n)).join("")}</div>
        <div class="f-c2-meio">
          <b class="f-dez" aria-hidden="true">10</b>
          <div class="f-c2-txt">${capTxt(c2, 1)}</div>
        </div>
        <div class="f-fita f-fita-b">${[7, 8, 9, 10, 11, 12].map((n) => quadro("c2-" + n)).join("")}</div>
      </div>
    </section>

    <section class="f-cena f-c3" style="--h:240">
      <div class="f-palco">
        <div class="f-img"><img src="${H("c3")}" alt="" loading="lazy"></div>
        <div class="f-barra f-barra-t"><p class="kicker">Capítulo 03 <b>·</b> ${c3.lugar}, ${c3.ano}</p></div>
        <div class="f-barra f-barra-b">
          <h3 class="f-tit">${c3.tit}</h3>
          <p class="corpo">${c3.txt}</p>
        </div>
      </div>
    </section>

    <section class="f-cena f-c4" style="--h:240">
      <div class="f-palco">
        <div class="f-img"><img src="${H("c4")}" alt="" loading="lazy"></div>
        <div class="f-luz" aria-hidden="true"></div>
        <b class="f-dois" aria-hidden="true">2×</b>
        <div class="f-c4-txt">${capTxt(c4, 3)}</div>
      </div>
    </section>`;

  // ---------- SETUP: os produtos sobem em camadas (profundidades diferentes) e levam pra vitrine ----------
  const SETUP = [["317933", "Gamma", "Teclado"], ["260894", "Fenner 8K", "Mouse"], ["307806", "Kamar", "Headset"], ["37611", "Tiger Extended", "Mousepad"], ["111739", "Vocalizer Pro", "Microfone"]];
  const setup = () => `
    <section class="f-cena f-setup f-parc" style="--h:170">
      <div class="f-palco">
        <div class="f-parc-lock" aria-hidden="true">
          <span class="f-parc-loud">${LOUD_SIMB}</span><span class="f-parc-x">×</span><img src="${BASE}img/loud/pcyes-robo.png" alt="">
        </div>
        <h2 class="f-grande f-parc-tit">${HOJE.tit} <em>PCYES.</em></h2>
        <p class="corpo">${HOJE.txt}</p>
        <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
      </div>
    </section>`;

  // ---------- A VIRADA: "E agora, joga de PCYES." e o vídeo cresce do centro até a tela cheia ----------
  const virada = () => `
    <section class="a-virada">
      <div class="a-v-palco">
        <div class="a-tela">
          <img class="a-tela-capa" src="${BASE}img/loud/textura-camisa.jpg" alt="">
          <div class="a-tela-video"></div>
          <div class="a-tela-sombra"></div>
        </div>
        <h2 class="a-frase">
          <span class="lin" data-i="0">E agora,</span>
          <span class="lin" data-i="1">joga de</span>
          <span class="lin lin-logo" data-i="2"><span class="pcyes-completo" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-vermelho.png')"></span></span>
        </h2>
        <p class="kicker a-v-kicker">Capítulo 05 <b>·</b> Hoje</p>
        <div class="a-v-pe">
          <div class="a-v-botoes">
                        <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
          </div>
        </div>
      </div>
    </section>`;

  window.montaLP = function (raiz) {
    const ac = new AbortController(), on = (el, ev, fn, o = {}) => el.addEventListener(ev, fn, { ...o, signal: ac.signal });
    raiz.className = "lp-ld op-a";
    raiz.innerHTML = hero() + historia() + virada() + setup() + `<div class="vit-slot"></div>`;
    requestAnimationFrame(() => raiz.querySelector(".a-hero").classList.add("entra"));
    const trecho = (p, a, b) => clamp01((p - a) / (b - a)), suave = (t) => t * t * (3 - 2 * t);
    const heroEl = raiz.querySelector(".a-hero");
    // cada cena alta: progresso 0–1 do palco preso vira --p (o CSS faz o resto); o JS só faz o que o CSS não sabe
    const cenas = [...raiz.querySelectorAll(".f-cena")];
    const num = raiz.querySelector(".f-num"), alvo = +num.dataset.alvo;
    const fmt = (v) => v >= 1e9 ? "1 bilhão" : v >= 1e6 ? Math.floor(v / 1e6) + " milhões" : Math.floor(v / 1e3).toLocaleString("pt-BR") + " mil";
    laco(() => {
      const r = heroEl.getBoundingClientRect();
      heroEl.style.setProperty("--s", clamp01(-r.top / r.height).toFixed(3));
      cenas.forEach((c) => {
        const b = c.getBoundingClientRect();
        if (b.bottom < -innerHeight || b.top > innerHeight * 2) return;
        // --e: entrada (cena subindo pela tela, antes de prender) · --p: dentro do palco preso
        c.style.setProperty("--e", clamp01(1 - b.top / innerHeight).toFixed(4));
        c.style.setProperty("--p", progresso(c).toFixed(4));
      });
      // contador do capítulo 1: sobe com o scroll, curva acelerando (o barulho cresce)
      const p1 = trecho(progresso(raiz.querySelector(".f-c1")), .15, .8);
      num.textContent = p1 <= 0 ? "0" : fmt(alvo * Math.pow(p1, 2.2));
    }, on);
    // virada: frase entra palavra a palavra, depois a tela cresce do centro até ocupar tudo
    const vir = raiz.querySelector(".a-virada"), tela = vir.querySelector(".a-tela"), linhas = [...vir.querySelectorAll(".a-frase .lin")], palcoV = vir.querySelector(".a-v-palco");
    laco(() => {
      const p = progresso(vir);
      // cada linha "bate" quando o scroll passa do ponto dela (animação no tempo, não no scroll: impacto)
      // a virada sobrepõe o fim do cap. 4 (margem negativa) e só aparece já presa: nada sobe do pé da tela
      const presa = vir.getBoundingClientRect().top <= 1;
      vir.classList.toggle("presa", presa);
      linhas.forEach((l, i) => {
        const deve = presa && p >= [0, .09, .18][i];   // uma linha por trecho de scroll: a pausa é o próprio scroll
        if (deve && !l.classList.contains("bateu")) { l.classList.add("bateu"); palcoV.classList.remove("treme"); void palcoV.offsetWidth; palcoV.classList.add("treme"); }
        else if (!deve) l.classList.remove("bateu");
      });
      const g = suave(trecho(p, .3, .54));                       // 0 = tela pequena, 1 = tela cheia
      vir.style.setProperty("--g", g.toFixed(4));
      vir.style.setProperty("--f", suave(trecho(p, .32, .46)).toFixed(4));   // frase atravessa e some
      vir.classList.toggle("cheia", p > .56);
    }, on);
    // vídeo próprio: já carrega cedo; começa do zero no instante em que a tela fica cheia
    const vidBox = vir.querySelector(".a-tela-video");
    vidBox.innerHTML = `<video src="${BASE}video/loud-taca.mp4" muted loop playsinline preload="auto"></video>`;
    const vid = vidBox.querySelector("video");
    let tocando = false;
    laco(() => {
      const cheia = vir.classList.contains("cheia");
      if (cheia && !tocando) { tocando = true; vid.currentTime = 0; vid.play().catch(() => {}); }
      else if (!cheia && tocando) { tocando = false; vid.pause(); }
    }, on);

    let trava = 0, travou = false;
    laco(() => { const c = vir.classList.contains("cheia"); if (c && !travou) { travou = true; trava = performance.now() + 1200; } else if (!c && progresso(vir) < .4) travou = false; }, on);
    on(window, "wheel", (e) => { if (e.deltaY > 0 && performance.now() < trava) e.preventDefault(); }, { passive: false });
    on(window, "keydown", (e) => { if (["ArrowDown", "PageDown", " "].includes(e.key) && performance.now() < trava) e.preventDefault(); });
    // atalho fixo pros produtos
    const atalho = document.createElement("a");
    atalho.className = "a-atalho"; atalho.href = "#aprovados"; atalho.innerHTML = `Produtos ${SETA}`;
    raiz.appendChild(atalho);
    on(atalho, "click", (e) => { e.preventDefault(); const v = raiz.querySelector("#aprovados"); if (v) v.scrollIntoView({ behavior: "smooth" }); });
    raiz.querySelectorAll('a.cta[href="#aprovados"]').forEach((c) => on(c, "click", (e) => { e.preventDefault(); atalho.click(); }));
    laco(() => { const v = raiz.querySelector("#aprovados"); atalho.classList.toggle("some", !!v && v.getBoundingClientRect().top < innerHeight * .6); }, on);
    montaVitrine(raiz.querySelector(".vit-slot"), on);
    return () => { ac.abort(); raiz.innerHTML = ""; };
  };
})();
