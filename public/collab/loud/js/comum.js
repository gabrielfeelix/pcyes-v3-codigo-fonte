/* PCYES × LOUD — peças comuns às opções A, B e C: logos, fatos, vídeo, vitrine "Aprovado pela LOUD".
   Fatos: projetos/collab-loud/docs/FATOS-LOUD.md (cada um com fonte). */
(function () {
  const BASE = (document.currentScript && document.currentScript.src.replace(/js\/comum\.js.*$/, "")) || "";

  // logos oficiais: SVG inline de loud.gg (1 cor, currentColor)
  const LOUD_WORD = '<svg class="loud-word" viewBox="0 0 1984 417" role="img" aria-label="LOUD"><path fill="currentColor" d="M106.32,40.71H32v335.57h365.28v-70.82H106.32V40.71Z"/><path fill="currentColor" d="M1583.33,40.71h-74.88v335.57h74.88l368.67-123.09v-89.38l-368.67-123.09ZM1873.77,211.01l-290.44,86.01V119.99l290.44,86.01v5.06-.04Z"/><path fill="currentColor" d="M1358.64,40.71v247.02l-87.97,30.25-115.06.78-90.28-31.03V40.71h-75.1v293.52l146.89,50.77h149.76l146.9-50.77V40.71h-75.15Z"/><path fill="currentColor" d="M768.6,32h-149.76l-146.89,50.77v251.42l146.89,50.77h149.76l146.9-50.77V82.77l-146.9-50.77ZM752.42,317.97l-115.06.78-90.28-31.03v-158.46l87.97-30.24,115.06-.78,90.28,31.03v158.5l-87.97,30.24v-.04Z"/></svg>';
  const SIMB_D = "M356.13,32.2H32v1452.59h324.13l1595.87-532.84v-386.92L356.13,32.2ZM1613.35,769.35l-1257.22,372.3V375.36l1257.22,372.3v21.88-.19Z";
  const LOUD_SIMB = `<svg class="loud-simb" viewBox="0 0 1984 1517" aria-hidden="true"><path fill="currentColor" d="${SIMB_D}"/></svg>`;
  // logo PCYES: símbolo+palavra (negativo) ou só a palavra; cor vem do CSS (máscara)
  const PCYES = () => `<span class="pcyes-logo" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-negativo.png')"></span>`;
  const PCYES_PALAVRA = () => `<span class="pcyes-palavra" role="img" aria-label="PCYES" style="--src:url('${BASE}img/loud/pcyes-palavra-vermelho.png')"></span>`;
  const SETA = '<svg class="seta" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';

  const CAPS = [
    { ano: "2019", tit: "Nasceu fazendo barulho.", txt: "28 de fevereiro de 2019, São Paulo. A LOUD começou criando conteúdo e virou a primeira organização brasileira a passar de 1 bilhão de visualizações.", n: "1 bi", nl: "de visualizações", lugar: "São Paulo" },
    { ano: "2020", tit: "Do conteúdo pro campeonato.", txt: "Virou time e começou a levantar taça. Entre 2020 e 2026 foram 10 títulos, em três modalidades diferentes.", n: "10", nl: "títulos", lugar: "Brasil" },
    { ano: "2022", tit: "Campeã do mundo.", txt: "Istambul, 2022: o primeiro título mundial. No mesmo ano, a LOUD foi eleita o melhor time de esports do mundo.", n: "1º", nl: "título mundial", lugar: "Istambul" },
    { ano: "2026", tit: "De volta ao topo.", txt: "18 de outubro de 2026, Xangai. Final 3×1 e o segundo título mundial: a primeira organização bicampeã do torneio.", n: "2×", nl: "campeã mundial", lugar: "Xangai" },
  ];
  const HOJE = { tit: "O próximo capítulo tem", txt: "A LOUD agora joga com PCYES. O setup que vai pra mesa dos campeões é o mesmo que você leva pra casa." };
  // vídeo oficial do canal @LOUDgg (time, não creator). Trocar pelo vídeo que a LOUD mandar.
  const VIDEO = { id: "fOZBh22mbuA", titulo: "LOUD: a nova era chegou" };

  const GRUPOS = [["todos", "Todos"], ["teclado", "Teclados"], ["mouse", "Mouses"], ["audio", "Áudio"], ["mousepad", "Mousepads"], ["stream", "Stream"], ["pc", "PC"], ["extra", "Extras"]];
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const pad2 = (n) => String(n).padStart(2, "0");
  const clamp01 = (x) => Math.min(1, Math.max(0, x));

  const selo = (cls = "") => `
    <div class="selo ${cls}" aria-label="Aprovado pela LOUD">
      <svg class="selo-anel" viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id="selo-c-${cls}" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs>
        <text><textPath href="#selo-c-${cls}" textLength="488">APROVADO PELA LOUD • APROVADO PELA LOUD •</textPath></text>
      </svg>
      <div class="selo-miolo">${LOUD_SIMB}</div>
    </div>`;

  // bordões da própria LOUD (faixa da home de loud.gg)
  const BORDOES = ["Follow the noise", "Faz o L", "Casa dos campeões", "#GoLOUD", "Home of Champions", "Make it louder"];
  const faixa = () => `<div class="faixa" aria-hidden="true"><div class="faixa-trilho">${[...BORDOES, ...BORDOES, ...BORDOES, ...BORDOES].map((t) => `<span>${t}</span>${LOUD_SIMB}`).join("")}</div></div>`;

  // vídeo: capa própria; o player do YouTube só carrega no clique
  const video = (cls = "") => `
    <figure class="video ${cls}">
      <img src="${BASE}img/loud/textura-camisa.jpg" alt="">
      <button class="play" aria-label="Assistir: ${VIDEO.titulo}">${LOUD_SIMB}</button>
      <figcaption>Assista · ${VIDEO.titulo}</figcaption>
    </figure>`;
  function ligaVideo(raiz, on) {
    raiz.querySelectorAll(".video").forEach((fig) => on(fig.querySelector(".play"), "click", () => {
      fig.classList.add("tocando");
      fig.insertAdjacentHTML("beforeend", `<iframe src="https://www.youtube-nocookie.com/embed/${VIDEO.id}?autoplay=1&rel=0" title="${VIDEO.titulo}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`);
    }));
  }

  // ---------- vitrine APROVADO PELA LOUD (a aprovada pelo Gabriel: preta, 1 fileira, abas, cantoneiras no hover) ----------
  const card = (p, i) => `
    <article class="card" data-g="${p.grupo}" title="${p.nomeCompleto}">
      <a class="card-img" href="${p.url}" target="_blank" rel="noopener">
        <span class="num">Nº ${pad2(i + 1)}</span>
        <span class="tag">${LOUD_SIMB}Aprovado</span>
        <img src="${BASE}${p.img}" alt="${p.nomeCompleto}" loading="lazy">
        <span class="card-full">${p.nomeCompleto}</span>
      </a>
      <div class="card-info">
        <h3>${p.nome}</h3>
        <p class="linha">${p.linha}</p>
        <p class="preco">${p.de > p.preco ? `<s>${brl(p.de)}</s>` : ""}<b>${brl(p.preco)}</b></p>
      </div>
      <a class="add" href="${p.url}" target="_blank" rel="noopener">Ver produto →</a>
    </article>`;
  const vitrineHTML = (prods) => `
    <section class="sec vitrine" id="aprovados">
      <header class="vit-topo">
        <div class="vit-tit">
          <p class="kicker-loud">${LOUD_SIMB}Setup oficial</p>
          <h2 class="titulo-loud">Aprovado <em>pela LOUD</em></h2>
        </div>
        <div class="vit-ctrl">
          <p class="vit-sub">O equipamento PCYES que a LOUD usa e recomenda.</p>
          <nav class="abas" role="tablist">${GRUPOS.map(([k, n], i) =>
            `<button role="tab" data-g="${k}" aria-selected="${i === 0}">${n}<sup>${k === "todos" ? prods.length : prods.filter((p) => p.grupo === k).length}</sup></button>`).join("")}</nav>
        </div>
      </header>
      <div class="trilho-wrap">
        <button class="nav prev" aria-label="Anterior">${SETA}</button>
        <div class="trilho">${prods.map(card).join("")}</div>
        <button class="nav next" aria-label="Próximo">${SETA}</button>
      </div>
    </section>
    ${faixa()}`;

  function montaVitrine(slot, on) {
    return fetch(`${BASE}js/produtos.json`).then((r) => r.json()).then((prods) => {
      slot.outerHTML = vitrineHTML(prods);
      const raiz = document.getElementById("aprovados"), trilho = raiz.querySelector(".trilho");
      const prev = raiz.querySelector(".prev"), next = raiz.querySelector(".next");
      const atualiza = () => { prev.disabled = trilho.scrollLeft < 4; next.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4; };
      raiz.querySelectorAll(".abas button").forEach((b) => on(b, "click", () => {
        raiz.querySelectorAll(".abas button").forEach((x) => x.setAttribute("aria-selected", x === b));
        raiz.querySelectorAll(".card").forEach((c) => { c.hidden = b.dataset.g !== "todos" && c.dataset.g !== b.dataset.g; });
        trilho.scrollTo({ left: 0 }); atualiza();
      }));
      const passo = () => trilho.clientWidth * 0.8;
      on(prev, "click", () => trilho.scrollBy({ left: -passo(), behavior: "smooth" }));
      on(next, "click", () => trilho.scrollBy({ left: passo(), behavior: "smooth" }));
      on(trilho, "scroll", atualiza); atualiza();
    });
  }

  // progresso 0–1 de uma seção alta com palco preso (sticky)
  const progresso = (el) => { const r = el.getBoundingClientRect(); return clamp01(-r.top / Math.max(1, el.offsetHeight - innerHeight)); };

  // um laço só de rAF por página, chamado no scroll/resize
  function laco(fn, on) {
    let pend = false;
    const roda = () => { pend = false; fn(); };
    const pede = () => { if (!pend) { pend = true; requestAnimationFrame(roda); } };
    on(window, "scroll", pede, { passive: true }); on(window, "resize", pede); pede();
  }

  window.LD = { BASE, LOUD_WORD, LOUD_SIMB, SIMB_D, PCYES, PCYES_PALAVRA, SETA, CAPS, HOJE, VIDEO, brl, pad2, clamp01, selo, faixa, video, ligaVideo, montaVitrine, progresso, laco };
})();
