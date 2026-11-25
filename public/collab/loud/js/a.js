/* Opção A (v3, 25/11) — curta: 4 seções, pouca rolagem, nada preso.
   1 hero (aprovada) · 2 história numa tela só (escolhe o ano, troca foto e texto) · 3 parceria LOUD × PCYES · 4 vitrine (aprovada).
   Fotos: Flickr oficial valorantesports (Riot Games), ver img/hist/CREDITOS.txt. Versão longa (reprovada): _antiga/a-filme/. */
(function () {
  const { BASE, LOUD_WORD, LOUD_SIMB, PCYES, SETA, CAPS, HOJE, pad2, montaVitrine, faixa } = window.LD;
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
    <section class="p-sec v-sec">
      <video class="v-vid" src="${BASE}video/b-taca.mp4" muted loop playsinline preload="metadata" aria-hidden="true"></video>
      <div class="p-lock" aria-hidden="true"><span class="p-loud">${LOUD_SIMB}</span><span class="p-x">×</span><img src="${BASE}img/loud/pcyes-robo.png" alt=""></div>
      <h2 class="p-tit">${HOJE.tit} <em>PCYES.</em></h2>
      <p class="corpo">${HOJE.txt}</p>
      <a class="cta" href="#aprovados">Ver os aprovados ${SETA}</a>
    </section>`;

  window.montaLP = function (raiz) {
    const ac = new AbortController(), on = (el, ev, fn, o = {}) => el.addEventListener(ev, fn, { ...o, signal: ac.signal });
    raiz.className = "lp-ld op-a op-a3";
    raiz.innerHTML = hero() + historia() + faixa() + parceria() + `<div class="vit-slot"></div>`;
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
    const iov = new IntersectionObserver(([e]) => { if (e.isIntersecting) vid.play().catch(() => {}); else vid.pause(); }, { threshold: .3 });
    iov.observe(vid);

    raiz.querySelectorAll('a[href="#aprovados"]').forEach((a) => on(a, "click", (e) => {
      const v = raiz.querySelector("#aprovados"); if (!v) return; e.preventDefault(); v.scrollIntoView({ behavior: "smooth" });
    }));
    // a faixa dos bordões fica entre a história e o vídeo; a que a vitrine traz embaixo sai
    montaVitrine(raiz.querySelector(".vit-slot"), on).then(() => { const fs = raiz.querySelectorAll(".faixa"); if (fs.length > 1) fs[fs.length - 1].remove(); });
    return () => { ac.abort(); io.disconnect(); iov.disconnect(); raiz.innerHTML = ""; };
  };
})();
