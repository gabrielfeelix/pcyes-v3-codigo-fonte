/* PCYES × LOUD — página oficial (/loud na v3). A "B" de 27/11 virou a única versão; a A saiu.
   Ordem: hero → vitrine Aprovado pela LOUD + faixa dos bordões → história numa tela só → parceria + vídeo (embed YouTube)
   → assinatura da parceria (fechamento institucional, sem venda). Fotos: Flickr oficial valorantesports (Riot), ver img/riot/CREDITOS.txt. */
(function () {
  const { BASE, LOUD_WORD, LOUD_SIMB, PCYES, SETA, CAPS, HOJE, montaVitrine, faixa } = window.LD;
  const FOTO = ["2019", "2020", "2022", "2026"];   // fotos liberadas pela LOUD (img/riot/CREDITOS.txt): 2019, 2020, 2022, 2026

  const hero = () => `
    <section class="sec a-hero">
      <div class="a-foto"><img src="${BASE}img/riot/hero.jpg" alt="" fetchpriority="high"></div>
      <header class="a-creditos">
        <div class="lockup">${PCYES()}<span class="x">×</span>${LOUD_WORD}</div>
      </header>
      <div class="a-hero-txt">
        <h1 class="larga a-titulo">
          <span class="ln"><span>A casa dos</span></span>
          <span class="ln"><span>campeões agora</span></span>
          <span class="ln"><span>joga de&nbsp;<span class="a-pcyes-txt">PCYES.</span></span></span>
        </h1>
        <div class="a-hero-pe">
          <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
        </div>
      </div>
    </section>`;

  const historia = () => `
    <section class="h-sec" id="historia">
      <div class="h-fotos" aria-hidden="true">
        ${CAPS.map((c, i) => `<img src="${BASE}img/riot/${FOTO[i]}.jpg" alt="" class="${i === 0 ? "on" : ""}" data-i="${i}" loading="${i ? "lazy" : "eager"}">`).join("")}
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

  // vídeo: embed normal do YouTube, toca só no clique (27/11, a pedido; saiu o player próprio com autoplay).
  // Placeholder até a LOUD mandar o vídeo final: "LOUD LOL: O caminho até o título" (canal oficial @LOUDgg).
  const YT = "aYETxDVM9Nw";   // LOUD VALORANT: "E foi assim que nos tornamos campeões do mundo!" (indicado pela LOUD 27/11)
  const player = () => `
    <div class="g-tela g-yt"><iframe src="https://www.youtube-nocookie.com/embed/${YT}?rel=0&modestbranding=1" title="Vídeo da LOUD no YouTube" loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;

  // a parceria não vende (a vitrine já vende lá em cima)
  const parceria = () => `
    <section class="p-sec p-lado">
      <div class="p-txt">
        <div class="p-lock" aria-hidden="true"><span class="p-loud">${LOUD_SIMB}</span><span class="p-x">×</span><img src="${BASE}img/loud/pcyes-robo.png" alt=""></div>
        <h2 class="p-tit">${HOJE.tit.replace(" do mundo", "<br>do mundo")} <em>${HOJE.dest}</em></h2>
        <p class="corpo">${HOJE.txt}</p>
      </div>
      ${player()}
    </section>`;

  // fechamento institucional (27/11, o setup com preço foi reprovado: "já vendemos ali em cima").
  // A assinatura da parceria: a arena (Riot, 2022) partida em duas, verde LOUD e vermelho PCYES; cada marca com o próprio lema.
  // Lemas: "Home of Champions" (rodapé de loud.gg) e "Built for Performance" (assinatura da PCYES no site).
  const assinatura = () => `
    <section class="as-sec" id="parceria-oficial" aria-label="LOUD e PCYES, parceria oficial">
      <div class="as-foto" aria-hidden="true"><img src="${BASE}img/riot/arena.jpg" alt="" loading="lazy"><img src="${BASE}img/riot/arena.jpg" alt="" loading="lazy"></div>
      <div class="as-palco">
        <div class="as-lado as-loud">${LOUD_WORD}<p class="as-lema">Home of Champions</p></div>
        <span class="as-x" aria-hidden="true">×</span>
        <div class="as-lado as-pcyes"><span class="pcyes-palavra as-pcyes-logo" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-palavra-vermelho.png')"></span><p class="as-lema">Built for Performance</p></div>
      </div>
      <p class="as-assina">Parceria oficial</p>
    </section>`;

  // só montaLoud: window.montaLP é da Drop Dead (mesma SPA). Ocupar esse nome fazia /drop-dead abrir a LOUD (bug 27/11)
  window.montaLoud = function (raiz) {
    const ac = new AbortController(), on = (el, ev, fn, o = {}) => el.addEventListener(ev, fn, { ...o, signal: ac.signal });
    raiz.className = "lp-ld op-a op-a3 op-b4";
    raiz.innerHTML = hero() + `<div class="vit-slot"></div>` + historia() + parceria() + assinatura();
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


    raiz.addEventListener("click", (e) => {
      const a = e.target.closest('a[href="#aprovados"]'); if (!a) return;
      const v = raiz.querySelector(a.getAttribute("href")); if (!v) return; e.preventDefault(); v.scrollIntoView({ behavior: "smooth" });
    }, { signal: ac.signal });
    // a assinatura monta uma vez ao entrar na tela (~1 s, sem prender o scroll)
    let ios = null;
    {
      const f = raiz.querySelector(".as-sec");
      ios = new IntersectionObserver(([e]) => { if (e.isIntersecting) { f.classList.add("vis"); ios.disconnect(); } }, { threshold: .4 });
      ios.observe(f);
    }
    // vitrine logo depois da hero (aprovado 26/11); a faixa dos bordões fica entre a história e o vídeo; a que a vitrine traz sai
    montaVitrine(raiz.querySelector(".vit-slot"), on);   // a faixa dos bordões vem junto, logo abaixo da vitrine
    return () => { ac.abort(); io.disconnect(); if (ios) ios.disconnect(); raiz.innerHTML = ""; };
  };
})();
