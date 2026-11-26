/* Opção A (v3, 25/11) — curta: 4 seções, pouca rolagem, nada preso.
   1 hero (aprovada) · 2 história numa tela só (escolhe o ano, troca foto e texto) · 3 parceria LOUD × PCYES · 4 vitrine (aprovada).
   Fotos: Flickr oficial valorantesports (Riot Games), ver img/hist/CREDITOS.txt. Versão longa (reprovada): _antiga/a-filme/. */
(function () {
  const { BASE, LOUD_WORD, LOUD_SIMB, PCYES, SETA, CAPS, HOJE, pad2, montaVitrine, faixa, progresso, laco, clamp01 } = window.LD;
  // A: vídeo à direita da frase da parceria. B: frase centrada sem vídeo; o vídeo vem na dobra de baixo e cresce até a tela cheia.
  const B = window.LP_VARIANTE === "B";
  const FOTO = ["h-2019", "c1-c", "c3", "c4"];   // 2019, 2020, 2022, 2026

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
          <span class="ln"><span>joga de&nbsp;<span class="pcyes-completo so-palavra" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-palavra-vermelho.png')"></span><i>.</i></span></span>
        </h1>
        <div class="a-hero-pe">
          <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
        </div>
      </div>
    </section>`;

  const historia = () => `
    <section class="h-sec" id="historia">
      <div class="h-fotos" aria-hidden="true">
        ${CAPS.map((c, i) => `<img src="${BASE}img/hist/${FOTO[i]}.jpg?v=3" alt="" class="${i === 0 ? "on" : ""}" data-i="${i}" loading="${i ? "lazy" : "eager"}">`).join("")}
        <b class="h-ano-grande">${CAPS[0].ano}</b>
      </div>
      <div class="h-lado">
        <p class="kicker">A história <b>·</b> 2019–2026</p>
        <h2 class="h-tit">De São Paulo para o topo do mundo.</h2>
        <ol class="h-lista" role="tablist">
          ${CAPS.map((c, i) => `
          <li><button role="tab" aria-selected="${i === 0}" data-i="${i}">
            <span class="h-l-ano">${c.ano}</span><span class="h-l-tit">${c.tit}</span>
          </button>
          <div class="h-l-txt"><p class="corpo">${c.txt}</p><p class="h-dado"><b>${c.n}</b>${c.nl}</p></div></li>`).join("")}
        </ol>
      </div>
    </section>`;

  const parceria = () => `
    <section class="p-sec ${B ? "p-centro" : "v-sec"}">
      ${B ? "" : `<video class="v-vid" src="${BASE}video/b-taca.mp4" muted loop playsinline preload="metadata" aria-hidden="true"></video>`}
      <div class="p-lock" aria-hidden="true"><span class="p-loud">${LOUD_SIMB}</span><span class="p-x">×</span><img src="${BASE}img/loud/pcyes-robo.png" alt=""></div>
      <h2 class="p-tit">${HOJE.tit} <em>${HOJE.dest}</em></h2>
      <p class="corpo">${HOJE.txt}</p>
      <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
    </section>`;

  window.montaLP = function (raiz) {
    const ac = new AbortController(), on = (el, ev, fn, o = {}) => el.addEventListener(ev, fn, { ...o, signal: ac.signal });
    raiz.className = "lp-ld op-a op-a3" + (B ? " op-b3" : "");
    const cresce = () => `
    <section class="g-sec" aria-label="Vídeo da LOUD">
      <div class="g-palco"><div class="g-tela"><video class="v-vid" src="${BASE}video/b-taca.mp4" muted loop playsinline preload="metadata"></video>
        <div class="g-ctrl">
          <button class="g-b g-play" type="button" aria-label="Pausar o vídeo" data-on="1">
            <svg viewBox="0 0 24 24" class="i-pausa" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>
            <svg viewBox="0 0 24 24" class="i-play" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>
          </button>
          <button class="g-b g-som" type="button" aria-label="Ligar o som" data-on="0">
            <svg viewBox="0 0 24 24" class="i-mudo" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>
            <svg viewBox="0 0 24 24" class="i-som" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/></svg>
            <span class="g-som-txt">Som</span>
          </button>
        </div></div></div>
    </section>`;
    raiz.innerHTML = hero() + historia() + faixa() + parceria() + (B ? cresce() : "") + `<div class="vit-slot"></div>`;
    // B: a tela do vídeo cresce do centro até ocupar a viewport conforme o scroll (scrub, sem espera)
    if (B) { const g = raiz.querySelector(".g-sec"); laco(() => { const k = clamp01(progresso(g) / .7); g.style.setProperty("--g", (k * k * (3 - 2 * k)).toFixed(4)); }, on); }
    requestAnimationFrame(() => raiz.querySelector(".a-hero").classList.add("entra"));

    // história: passar o mouse, focar ou clicar num ano troca foto e texto (sem rolar)
    const fotos = [...raiz.querySelectorAll(".h-fotos img")], abas = [...raiz.querySelectorAll(".h-lista button")], anoG = raiz.querySelector(".h-ano-grande");
    const ativa = (i) => {
      abas.forEach((b, k) => b.setAttribute("aria-selected", k === i));
      fotos.forEach((f, k) => f.classList.toggle("on", k === i));
      anoG.textContent = CAPS[i].ano;
    };
    abas.forEach((b, i) => { on(b, "click", () => ativa(i)); on(b, "mouseenter", () => ativa(i)); on(b, "focus", () => ativa(i)); });

    // entrada suave das seções, uma vez
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { threshold: .25 });
    raiz.querySelectorAll(".h-sec, .p-sec").forEach((el) => io.observe(el));
    // vídeo: toca só enquanto está na tela
    const vid = raiz.querySelector(".v-vid");   // A: o da parceria · B: o que cresce
    // B: som ligado por padrão. O navegador só libera som depois de um clique/toque na página;
    // sem isso toca mudo e o som liga no primeiro clique/toque. Ao chegar na seção, começa do início.
    let chegou = false;
    const tocar = () => {
      if (!B) { vid.play().catch(() => {}); return; }
      if (!chegou) { chegou = true; vid.currentTime = 0; }
      if (!vid.dataset.mutou) vid.muted = false;
      vid.play().catch(() => { vid.muted = true; vid.play().catch(() => {}); });
    };
    if (B) {
      const libera = (e) => { if (e && e.target === vid) return; if (!vid.dataset.mutou && vid.muted && !vid.paused) vid.muted = false; };
      on(document, "pointerdown", libera); on(document, "keydown", libera);
    }
    const iov = new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (!vid.dataset.pausou) tocar(); } else vid.pause(); }, { threshold: .3 });
    iov.observe(vid);
    // B: controles do vídeo (play/pausa e som). Pausa do usuário vale: sair e voltar não retoma sozinho.
    if (B) {
      const bp = raiz.querySelector(".g-play"), bs = raiz.querySelector(".g-som");
      const syncP = () => { const t = !vid.paused; bp.dataset.on = t ? "1" : "0"; bp.setAttribute("aria-label", t ? "Pausar o vídeo" : "Tocar o vídeo"); };
      const syncS = () => { const t = !vid.muted; bs.dataset.on = t ? "1" : "0"; bs.setAttribute("aria-label", t ? "Desligar o som" : "Ligar o som"); };
      const alterna = () => { if (vid.paused) { vid.dataset.pausou = ""; vid.play().catch(() => {}); } else { vid.dataset.pausou = "1"; vid.pause(); } };
      on(bp, "click", alterna);
      // clique no vídeo mudo pelo navegador = ligar o som (não pausar)
      on(vid, "click", () => { if (vid.muted && !vid.dataset.mutou && !vid.paused) { vid.muted = false; return; } alterna(); });
      on(bs, "click", (ev) => { ev.stopPropagation(); vid.muted = !vid.muted; vid.dataset.mutou = vid.muted ? "1" : ""; if (!vid.muted && vid.paused) { vid.dataset.pausou = ""; vid.play().catch(() => {}); } syncS(); });
      ["play", "pause"].forEach((ev) => on(vid, ev, syncP)); on(vid, "volumechange", syncS);
    }

    raiz.querySelectorAll('a[href="#aprovados"]').forEach((a) => on(a, "click", (e) => {
      const v = raiz.querySelector("#aprovados"); if (!v) return; e.preventDefault(); v.scrollIntoView({ behavior: "smooth" });
    }));
    // a faixa dos bordões fica entre a história e o vídeo; a que a vitrine traz embaixo sai
    montaVitrine(raiz.querySelector(".vit-slot"), on).then(() => { const fs = raiz.querySelectorAll(".faixa"); if (fs.length > 1) fs[fs.length - 1].remove(); });
    return () => { ac.abort(); io.disconnect(); iov.disconnect(); raiz.innerHTML = ""; };
  };
})();
