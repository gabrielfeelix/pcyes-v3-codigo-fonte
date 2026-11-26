/* Opção A (v3, 25/11) — curta: 4 seções, pouca rolagem, nada preso.
   1 hero (aprovada) · 2 história numa tela só (escolhe o ano, troca foto e texto) · 3 parceria LOUD × PCYES · 4 vitrine (aprovada).
   Fotos: Flickr oficial valorantesports (Riot Games), ver img/hist/CREDITOS.txt. Versão longa (reprovada): _antiga/a-filme/. */
(function () {
  const { BASE, LOUD_WORD, LOUD_SIMB, PCYES, SETA, CAPS, HOJE, brl, selo, pad2, montaVitrine, faixa } = window.LD;
  // A: aprovada (termina na parceria + vídeo). B (27/11): igual à A + fechamento "Da casa dos campeões pra sua" com o setup.
  let B = window.LP_VARIANTE === "B";   // a v3 passa { variante } no montaLoud (mesma SPA serve /loud e /loud/b)
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

  // player do vídeo (A e B): play/pausa e som; começa do início com som ao chegar na seção
  const player = () => `
    <div class="g-tela"><video class="v-vid" src="${BASE}video/b-taca.mp4" muted loop playsinline preload="metadata"></video>
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
        </div>
    </div>`;

  // B (27/11): o CTA da parceria desce pro fechamento "setup"; A mantém o que sobe pra vitrine
  const parceria = () => `
    <section class="p-sec p-lado">
      <div class="p-txt">
        <div class="p-lock" aria-hidden="true"><span class="p-loud">${LOUD_SIMB}</span><span class="p-x">×</span><img src="${BASE}img/loud/pcyes-robo.png" alt=""></div>
        <h2 class="p-tit">${HOJE.tit.replace(" do mundo", "<br>do mundo")} <em>${HOJE.dest}</em></h2>
        <p class="corpo">${HOJE.txt}</p>
        ${B ? `<a class="cta cta-desce" href="#setup">Montar o setup ${SETA}</a>` : `<a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>`}
      </div>
      ${player()}
    </section>`;

  // B: fechamento. Ecoa a hero ("a casa dos campeões") e entrega a promessa da parceria ("o mesmo que você leva pra casa").
  // Um produto por categoria, linha Black Vulcan + mousepad Red Magma (vermelho PCYES).
  const SETUP = [["317930", "Teclado"], ["328632", "Mouse"], ["307806", "Headset"], ["268161", "Mousepad"]];
  const setupHTML = (prods) => {
    const itens = SETUP.map(([sku, cat]) => ({ ...prods.find((p) => p.sku === sku), cat })).filter((p) => p.url);
    const total = itens.reduce((t, p) => t + p.preco, 0);
    return `
    <section class="s-sec" id="setup" aria-labelledby="s-tit" data-total="${total}">
      <header class="s-topo">
        <div class="s-tit-wrap">
          <h2 class="s-tit" id="s-tit"><span>Da casa dos campeões</span> <em>pra sua.</em></h2>
          ${selo("s-selo")}
        </div>
        <div class="s-lado">
          <p class="corpo">Teclado, mouse, headset e mousepad aprovados pela LOUD. Leve o setup inteiro ou só a peça que falta na sua mesa.</p>
          <p class="s-total"><span>Setup completo<br>${itens.length} peças</span><b class="estreita s-soma">${brl(total)}</b></p>
        </div>
      </header>
      <div class="s-bancada">
        <ol class="s-lista">${itens.map((p, i) => `
          <li class="s-item" style="--i:${i}" data-preco="${p.preco}">
            <a class="s-link" href="${p.url}" target="_blank" rel="noopener" aria-label="Comprar ${p.nomeCompleto}">
              <span class="estreita s-cat" aria-hidden="true">${p.cat}</span>
              <img src="${BASE}${p.img}" alt="" loading="lazy">
              <span class="s-info">
                <span class="s-nome">${p.nome}</span>
                <span class="s-linha">${p.linha}</span>
                <span class="s-preco">${p.de > p.preco ? `<s>${brl(p.de)}</s>` : ""}<b>${brl(p.preco)}</b></span>
              </span>
              <span class="s-comprar">Comprar ${SETA}</span>
            </a>
          </li>`).join("")}
        </ol>
      </div>
    </section>`;
  };

  // nome próprio pra morar dentro da v3 sem brigar com o montaLP da Drop Dead (mesma SPA)
  window.montaLoud = window.montaLP = function (raiz, opts) {
    B = opts && opts.variante ? opts.variante === "B" : window.LP_VARIANTE === "B";
    const ac = new AbortController(), on = (el, ev, fn, o = {}) => el.addEventListener(ev, fn, { ...o, signal: ac.signal });
    raiz.className = "lp-ld op-a op-a3" + (B ? " op-b4" : "");
    raiz.innerHTML = hero() + `<div class="vit-slot"></div>` + historia() + faixa() + parceria() + (B ? `<div class="setup-slot"></div>` : "");
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
    const vid = raiz.querySelector(".v-vid");
    // som ligado por padrão. O navegador só libera som depois de um clique/toque na página;
    // sem isso toca mudo e o som liga no primeiro clique/toque. Ao chegar na seção, começa do início.
    let chegou = false;
    const tocar = () => {
      if (!chegou) { chegou = true; vid.currentTime = 0; }
      if (!vid.dataset.mutou) vid.muted = false;
      vid.play().catch(() => { vid.muted = true; vid.play().catch(() => {}); });
    };
    {
      const libera = (e) => { if (e && e.target === vid) return; if (!vid.dataset.mutou && vid.muted && !vid.paused) vid.muted = false; };
      on(document, "pointerdown", libera); on(document, "keydown", libera);
    }
    const iov = new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (!vid.dataset.pausou) tocar(); } else vid.pause(); }, { threshold: .3 });
    iov.observe(vid);
    // controles do vídeo (play/pausa e som). Pausa do usuário vale: sair e voltar não retoma sozinho.
    {
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

    raiz.addEventListener("click", (e) => {
      const a = e.target.closest('a[href="#aprovados"], a[href="#setup"]'); if (!a) return;
      const v = raiz.querySelector(a.getAttribute("href")); if (!v) return; e.preventDefault(); v.scrollIntoView({ behavior: "smooth" });
    }, { signal: ac.signal });
    // B: fechamento com o setup. Ao entrar na tela, as 4 peças chegam em sequência e o total soma junto (uma vez, ~1 s, sem prender o scroll).
    let ios = null;
    if (B) fetch(`${BASE}js/produtos.json`).then((r) => r.json()).then((prods) => {
      const slot = raiz.querySelector(".setup-slot"); if (!slot) return;
      slot.outerHTML = setupHTML(prods);
      const sec = raiz.querySelector("#setup"), soma = sec.querySelector(".s-soma"), alvo = +sec.dataset.total;
      const parado = matchMedia("(prefers-reduced-motion: reduce)").matches;
      ios = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return; ios.disconnect(); sec.classList.add("vis");
        if (parado) return;
        const t0 = performance.now(), dur = 1100;
        const passo = (t) => { const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3); soma.textContent = brl(Math.round(alvo * ease * 100) / 100); if (k < 1) requestAnimationFrame(passo); };
        requestAnimationFrame(passo);
      }, { threshold: .35 });
      ios.observe(sec);
    });
    // vitrine logo depois da hero (aprovado 26/11); a faixa dos bordões fica entre a história e o vídeo; a que a vitrine traz sai
    montaVitrine(raiz.querySelector(".vit-slot"), on).then(() => { const f = raiz.querySelector("#aprovados + .faixa"); if (f) f.remove(); });
    return () => { ac.abort(); io.disconnect(); iov.disconnect(); if (ios) ios.disconnect(); raiz.innerHTML = ""; };
  };
})();
