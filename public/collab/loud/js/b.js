/* Opção B (v3, 25/11) — LP normal, scroll livre: nada preso, nada andando de lado.
   Movimento só "dentro" das peças: foto que desliza na própria moldura (parallax), moldura que abre ao entrar,
   manifesto que acende palavra por palavra conforme a leitura. Imagens: frames do documentário oficial
   "LOUD LOL: o caminho até o título" (@LOUDgg). Fatos: CAPS (comum.js), todos com fonte em FATOS-LOUD.md.
   Versão anterior (reprovada): _antiga/b-nova-reprovada/. */
(function () {
  const { BASE, LOUD_WORD, LOUD_SIMB, PCYES, SETA, CAPS, HOJE, pad2, clamp01, montaVitrine, laco } = window.LD;
  const H = (n) => `${BASE}img/hist/${n}.jpg?v=3`;
  const logoCompleto = () => `<span class="pcyes-completo" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-vermelho.png')"></span>`;
  const foto = (n, cls = "") => `<figure class="b-f ${cls}"><div class="b-f-in"><img src="${H(n)}" alt="" loading="lazy"></div></figure>`;
  const [c1, c2, c3, c4] = CAPS;

  const hero = () => `
    <section class="b-hero">
      <div class="b-hero-vid" aria-hidden="true">
        <img src="${H("b-capa")}" alt="" fetchpriority="high">
      </div>
      <header class="b-topo">
        <div class="lockup">${PCYES()}<span class="x">×</span>${LOUD_WORD}</div>
        <nav><a href="#b-historia">A história</a><a href="#b-parceria">A parceria</a><a class="b-topo-cta" href="#aprovados">Aprovados pela LOUD</a></nav>
      </header>
      <div class="b-hero-txt">
        <p class="kicker">Parceria oficial <b>·</b> 2026</p>
        <h1 class="b-h1"><span>A casa dos campeões</span><span>agora joga de ${logoCompleto()}</span></h1>
      </div>
      <footer class="b-hero-pe">
        <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
        <p class="b-hero-fato"><b>2×</b> campeã mundial <i>·</i> <b>10</b> títulos <i>·</i> desde <b>2019</b></p>
      </footer>
    </section>`;

  // manifesto: lido em ritmo de scroll; cada palavra acende quando passa da linha de leitura
  const MANIFESTO = "Nasceu em 2019 fazendo barulho na internet. Virou time, levantou taça e foi duas vezes campeã do mundo. Agora a casa dos campeões joga de PCYES.";
  const DESTAQUES = ["barulho", "duas", "campeã", "mundo.", "PCYES."];
  const manifesto = () => `
    <section class="b-manif">
      <p class="kicker">${LOUD_SIMB}Home of Champions</p>
      <p class="b-manif-txt">${MANIFESTO.split(" ").map((w) => `<span class="w${DESTAQUES.includes(w) ? " d" : ""}">${w}</span>`).join(" ")}</p>
    </section>`;

  // história: 4 capítulos, 4 composições diferentes (nada de molde repetido)
  const kick = (c, i) => `<p class="kicker">Capítulo ${pad2(i + 1)} <b>·</b> ${c.lugar}</p>`;
  const historia = () => `
    <section class="b-hist" id="b-historia">
      <article class="b-cap b-cap1">
        <b class="b-ano" aria-hidden="true">${c1.ano}</b>
        ${foto("c1-a", "b-f1a")}${foto("c1-b", "b-f1b")}
        <div class="b-cap-txt">${kick(c1, 0)}<h2 class="b-h2">${c1.tit}</h2><p class="corpo">${c1.txt}</p>
          <p class="b-dado"><b>${c1.n}</b>${c1.nl}</p></div>
      </article>

      <article class="b-cap b-cap2">
        <div class="b-cap-txt">${kick(c2, 1)}<h2 class="b-h2">${c2.tit}</h2><p class="corpo">${c2.txt}</p></div>
        <b class="b-dez" aria-hidden="true">10<span>títulos</span></b>
        ${foto("c2-7", "b-f2a")}${foto("c2-1", "b-f2b")}${foto("c2-2", "b-f2c")}
      </article>

      <article class="b-cap b-cap3">
        ${foto("c3", "b-f3")}
        <div class="b-cap3-pe">
          <div>${kick(c3, 2)}<h2 class="b-h2">${c3.tit}</h2></div>
          <p class="corpo">${c3.txt}</p>
        </div>
      </article>

      <article class="b-cap b-cap4">
        ${foto("c4", "b-f4")}
        <b class="b-dois" aria-hidden="true">2×</b>
        <div class="b-cap-txt">${kick(c4, 3)}<h2 class="b-h2">${c4.tit}</h2><p class="corpo">${c4.txt}</p></div>
      </article>
    </section>`;

  // a parceria: os dois lados, frente a frente; depois o setup em grade com os produtos de destaque
  const DEST = [["317933", "Teclado Gamma", "Teclado"], ["260894", "Mouse Fenner 8K", "Mouse"], ["307806", "Headset Kamar", "Áudio"], ["37611", "Mousepad Tiger Extended", "Mousepad"], ["111739", "Microfone Vocalizer Pro", "Stream"]];
  const parceria = () => `
    <section class="b-parc" id="b-parceria">
      <div class="b-parc-topo">
        <div class="b-parc-lock" aria-hidden="true">
          <span class="b-parc-loud">${LOUD_SIMB}</span><span class="b-parc-x">×</span><img src="${BASE}img/loud/pcyes-robo.png" alt="">
        </div>
        <h2 class="b-h2 b-parc-tit">${HOJE.tit} <em>PCYES.</em></h2>
        <p class="corpo">${HOJE.txt}</p>
      </div>
      <div class="b-bento">
        ${DEST.map(([id, nome, cat], i) => `
        <a class="b-b b-b${i}" href="#aprovados">
          <span class="b-b-cat">${cat}</span>
          <img src="${BASE}img/produtos/${id}.png" alt="${nome}" loading="lazy">
          <span class="b-b-nome">${nome} ${SETA}</span>
        </a>`).join("")}
      </div>
    </section>`;

  window.montaLP = function (raiz) {
    const ac = new AbortController(), on = (el, ev, fn, o = {}) => el.addEventListener(ev, fn, { ...o, signal: ac.signal });
    raiz.className = "lp-ld op-b";
    raiz.innerHTML = hero() + manifesto() + historia() + parceria() + `<div class="vit-slot"></div>`;
    requestAnimationFrame(() => raiz.querySelector(".b-hero").classList.add("entra"));

    // entrada: cada peça abre uma vez quando chega na tela (não volta)
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    raiz.querySelectorAll(".b-f, .b-cap-txt, .b-cap3-pe, .b-ano, .b-dez, .b-dois, .b-parc-topo > *, .b-b").forEach((el) => io.observe(el));

    const fotos = [...raiz.querySelectorAll(".b-f")], palavras = [...raiz.querySelectorAll(".b-manif .w")];
    const heroEl = raiz.querySelector(".b-hero"), grandes = [...raiz.querySelectorAll(".b-ano, .b-dez, .b-dois")];
    laco(() => {
      const vh = innerHeight;
      // hero: vídeo afunda e escurece ao sair
      const r = heroEl.getBoundingClientRect();
      heroEl.style.setProperty("--s", clamp01(-r.top / r.height).toFixed(3));
      // foto desliza dentro da moldura (a moldura fica parada no fluxo)
      fotos.forEach((f) => {
        const b = f.getBoundingClientRect(); if (b.bottom < 0 || b.top > vh) return;
        f.style.setProperty("--y", (((b.top + b.height / 2) / vh - .5) * -1).toFixed(3));
      });
      // números grandes andam um pouco mais devagar que a página
      grandes.forEach((g) => {
        const b = g.getBoundingClientRect(); if (b.bottom < -200 || b.top > vh + 200) return;
        g.style.setProperty("--y", ((b.top + b.height / 2) / vh - .5).toFixed(3));
      });
      // manifesto: acende até a linha de leitura
      const linha = vh * .62;
      palavras.forEach((w) => w.classList.toggle("on", w.getBoundingClientRect().top < linha));
    }, on);

    // âncoras com rolagem suave nativa
    raiz.querySelectorAll('a[href^="#"]').forEach((a) => on(a, "click", (e) => {
      const alvo = raiz.querySelector(a.getAttribute("href")); if (!alvo) return;
      e.preventDefault(); alvo.scrollIntoView({ behavior: "smooth" });
    }));
    montaVitrine(raiz.querySelector(".vit-slot"), on);
    return () => { ac.abort(); io.disconnect(); raiz.innerHTML = ""; };
  };
})();
