import { useEffect, useRef, useState } from "react";
import { useCart } from "../CartContext";
import { Footer } from "../Footer";

/**
 * Collab Drop Dead × PCYES — página da collab DENTRO da loja (faixa, Navbar e Footer reais).
 *
 * O conteúdo (hero, história, vídeo, A LINHA, monte o kit, jogos, muro) é estático e mora em
 * public/collab/dropdead/lp/ (fonte: ux/empresas/pcyes/collab-dropdead-lp; publicar com
 * projetos/collab-dropdead/lp/publicar_v3.sh, que também gera o CSS escopado em .lp-dd).
 * Aqui a gente só carrega CSS + script, monta em <div class="lp-dd"> e entrega o carrinho da loja.
 */
const BASE = "/collab/dropdead/lp/";
const LP_VERSAO = "1795622750";
const FONTES = "https://fonts.googleapis.com/css2?family=Anton&family=Sedgwick+Ave+Display&family=Graduate&family=Inter+Tight:wght@400;500;700;800&family=Permanent+Marker&family=Space+Mono:wght@400;700&display=swap";

declare global {
  interface Window {
    montaLP?: (raiz: HTMLElement, opt: { secoes: string[]; site?: boolean }) => () => void;
    pcyesCarrinho?: (itens: { id: number; name: string; price: string; image: string }[]) => void;
  }
}

function anexa<T extends HTMLElement>(id: string, cria: () => T): T {
  const ja = document.getElementById(id) as T | null;
  if (ja) return ja;
  const el = cria(); el.id = id; document.head.appendChild(el); return el;
}

export function DropDeadCollabPage() {
  const raiz = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [topo, setTopo] = useState(0);
  const [pad, setPad] = useState(0);
  const [progresso, setProgresso] = useState(0);   // 0–100, carga real (script, CSS, imagens do hero)
  const [fase, setFase] = useState<"carregando" | "saindo" | "pronto">("carregando");

  // o carrinho da loja fica disponível pra página (levar o kit / comprar)
  useEffect(() => {
    window.pcyesCarrinho = (itens) => itens.forEach((i) => addItem(i));
    return () => { delete window.pcyesCarrinho; };
  }, [addItem]);

  // o cabeçalho da loja pode ser fixo: mede a base dele pra os trechos "sticky" não ficarem por baixo
  useEffect(() => {
    const mede = () => {
      let base = 0;
      for (let y = 4; y < 260; y += 24) {
        let el = document.elementFromPoint(window.innerWidth / 2, y) as HTMLElement | null;
        if (el && raiz.current?.parentElement?.contains(el)) continue;
        while (el && el !== document.body && !["fixed", "sticky"].includes(getComputedStyle(el).position)) el = el.parentElement;
        if (el && el !== document.body) base = Math.max(base, el.getBoundingClientRect().bottom);
      }
      const r = raiz.current?.parentElement?.getBoundingClientRect();
      setTopo(Math.round(base));
      setPad(Math.max(0, Math.round(base - (r ? r.top : 0))));
    };
    mede(); const t = setTimeout(mede, 400);
    window.addEventListener("resize", mede);
    return () => { clearTimeout(t); window.removeEventListener("resize", mede); };
  }, []);

  useEffect(() => {
    let desmonta: (() => void) | undefined, vivo = true, feito = 0;
    const soma = (n: number) => { feito += n; if (vivo) setProgresso(Math.min(100, Math.round(feito))); };
    anexa("lp-dd-fontes", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: FONTES }));
    const css = anexa("lp-dd-css", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: `${BASE}css/lp.scoped.css?v=${LP_VERSAO}` }));
    if (css.sheet) soma(15); else css.addEventListener("load", () => soma(15), { once: true });
    const monta = () => {
      if (!vivo || !raiz.current || !window.montaLP) return;
      soma(35);
      desmonta = window.montaLP(raiz.current, { site: true, secoes: ["hero", "historia", "parede", "kit", "jogos", "muro"] });
      const imgs = Array.from(raiz.current.querySelectorAll<HTMLImageElement>(".hero img"));
      const carregou = (i: HTMLImageElement) => new Promise<void>((r) => {
        const ok = () => { soma(50 / Math.max(1, imgs.length)); r(); };
        if (i.complete) ok(); else { i.addEventListener("load", ok, { once: true }); i.addEventListener("error", ok, { once: true }); }
      });
      // entra quando o hero está pronto (no máximo 4 s); a tela de carregamento some por cima, sem pulo
      Promise.race([Promise.all(imgs.map(carregou)), new Promise((r) => setTimeout(r, 4000))]).then(() => {
        if (!vivo) return; setProgresso(100);
        setTimeout(() => vivo && setFase("saindo"), 250);
        setTimeout(() => vivo && setFase("pronto"), 750);
      });
    };
    if (window.montaLP) monta();
    else {
      anexa("lp-dd-js", () => Object.assign(document.createElement("script"), { src: `${BASE}js/lp.js?v=${LP_VERSAO}` }))
        .addEventListener("load", monta, { once: true });
    }
    return () => { vivo = false; desmonta?.(); };
  }, []);

  const carregando = fase !== "pronto";
  return (
    <div style={{ position: "relative", paddingTop: pad }}>
      <div ref={raiz} className="lp-dd site"
        style={{ ["--hdr" as string]: `${topo}px`, ...(fase === "carregando" ? { height: `calc(100vh - ${topo}px)`, overflow: "hidden", visibility: "hidden" } : {}) }} />
      {carregando && <TelaCarregando progresso={progresso} saindo={fase === "saindo"} topo={topo} pad={pad} />}
      {fase === "pronto" && <Footer />}
    </div>
  );
}

/** Mesma tela de carregamento do jogo DROP LINE: sol de retícula, shape dando kickflip,
 *  CARREGANDO em letras recortadas e barra de lixa com o progresso real. Fica embaixo do header. */
function TelaCarregando({ progresso, saindo, topo, pad }: { progresso: number; saindo: boolean; topo: number; pad: number }) {
  const chips = [["#F0C018", "#111"], ["#111", "#F3EEE2"], ["#304890", "#F3EEE2"], ["#F3EEE2", "#111"], ["#D8322A", "#F3EEE2"]];
  const fontes = ["Anton", "Graduate", "'Permanent Marker'", "'Space Mono'"];
  return (
    <div className="lpc" role="status" aria-label={`Carregando a collab, ${progresso}%`}
      style={{ position: "absolute", left: 0, right: 0, top: pad, height: `calc(100vh - ${topo}px)`, opacity: saindo ? 0 : 1 }}>
      <style>{`
        .lpc{background:#F0C018;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;overflow:hidden;z-index:5;transition:opacity .45s ease}
        .lpc .sol{position:absolute;left:50%;top:40%;width:380px;height:380px;transform:translate(-50%,-50%);
          background:radial-gradient(#D8322A 36%,transparent 40%) 0 0/12px 12px;-webkit-mask:radial-gradient(circle,#000 30%,transparent 70%);mask:radial-gradient(circle,#000 30%,transparent 70%)}
        .lpc .sk{position:relative;width:min(330px,62vw);height:150px;perspective:600px}
        .lpc .sk img{position:absolute;left:0;top:60%;width:100%;animation:lpcKf 1.2s steps(15,end) infinite}
        .lpc .sombra{position:absolute;left:12%;right:12%;bottom:-6px;height:16px;border-radius:50%;background:rgba(17,17,17,.3);animation:lpcSb 1.2s steps(15,end) infinite}
        @keyframes lpcKf{0%{transform:translateY(-50%) rotateX(0)}12%{transform:translateY(-40%) rotateX(0) rotate(4deg)}
          40%{transform:translateY(-150%) rotateX(180deg) rotate(-8deg)}68%{transform:translateY(-55%) rotateX(360deg) rotate(0)}100%{transform:translateY(-50%) rotateX(360deg)}}
        @keyframes lpcSb{0%,100%{transform:scaleX(1);opacity:1}40%{transform:scaleX(.55);opacity:.5}}
        .lpc .letras{display:flex;gap:5px;position:relative}
        .lpc .letras span{display:grid;place-items:center;width:30px;height:40px;font-size:28px;box-shadow:3px 3px 0 #111;animation:lpcOnda 1s ease-in-out infinite}
        @keyframes lpcOnda{0%,100%{transform:translateY(0) rotate(var(--r))}50%{transform:translateY(-12px) rotate(var(--r))}}
        .lpc .barra{position:relative;width:min(440px,80vw);height:30px;border:3px solid #111;background:#F3EEE2;box-shadow:5px 5px 0 #111}
        .lpc .barra i{position:absolute;inset:0 auto 0 0;background:#111;transition:width .3s ease;
          background-image:radial-gradient(rgba(243,238,226,.55) 1px,transparent 1.3px);background-size:5px 5px}
        .lpc p{font:16px Graduate,ui-monospace,monospace;color:#111;margin-top:-18px}
        @media (prefers-reduced-motion:reduce){.lpc .sk img,.lpc .sombra,.lpc .letras span{animation:none}}
      `}</style>
      <div className="sol" />
      <div className="sk"><img src={`${BASE}assets/robo/skate-lateral.webp`} alt="" /><span className="sombra" /></div>
      <div className="letras" aria-hidden="true">
        {[..."CARREGANDO"].map((c, i) => {
          const [bg, fg] = chips[(i * 3) % chips.length];
          return <span key={i} style={{ background: bg, color: fg, fontFamily: fontes[i % 4], animationDelay: `${i * 0.07}s`, ["--r" as string]: `${((i * 37) % 11 - 5) * 1.4}deg` }}>{c}</span>;
        })}
      </div>
      <div className="barra"><i style={{ width: `${progresso}%` }} /></div>
      <p>dropando a collab… {progresso}%</p>
    </div>
  );
}

/** Jogo em tela cheia dentro da loja (usado por /drop-session). */
export function JogoCollabPage({ src = "/collab/dropdead/jogo/index.html", title = "DROP LINE — PCYES × Drop Dead" }: { src?: string; title?: string } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [box, setBox] = useState({ pad: 0, h: 640 });

  // O cabeçalho da loja é fixo e fica por cima do conteúdo: mede a base dele
  // e faz o jogo ocupar exatamente o resto da janela.
  useEffect(() => {
    const fit = () => {
      let headerBottom = 0; // faixa promocional + cabeçalho podem ser blocos fixos separados
      for (let y = 4; y < 260; y += 24) {
        let el = document.elementFromPoint(window.innerWidth / 2, y) as HTMLElement | null;
        while (el && el !== document.body && !["fixed", "sticky"].includes(getComputedStyle(el).position)) el = el.parentElement;
        if (el && el !== document.body) headerBottom = Math.max(headerBottom, el.getBoundingClientRect().bottom);
      }
      const top = ref.current?.getBoundingClientRect().top ?? 0;
      const pad = Math.max(0, headerBottom - top);
      setBox({ pad, h: Math.max(480, window.innerHeight - Math.max(top + pad, 0)) });
    };
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 400); // cabeçalho termina de montar
    return () => { window.removeEventListener("resize", fit); clearTimeout(t); };
  }, []);

  return (
    <section ref={ref} aria-label={title}
      style={{ background: "#111", width: "100%", paddingTop: box.pad }}>
      <div style={{ height: box.h }}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ border: 0, width: "100%", height: "100%", display: "block" }}
      />
      </div>
    </section>
  );
}

/** Jogo 2 — DROP SESSION (half-pipe). Fonte: projetos/collab-dropdead/jogo-2 (tools/publicar_v3.sh). */
export function DropSessionCollabPage() {
  return <JogoCollabPage src="/collab/dropdead/jogo2/index.html" title="DROP SESSION — PCYES × Drop Dead" />;
}
