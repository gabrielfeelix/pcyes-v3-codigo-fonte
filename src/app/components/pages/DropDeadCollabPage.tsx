import { useEffect, useRef, useState } from "react";
import { useCart } from "../CartContext";

/**
 * Collab Drop Dead × PCYES — página da collab DENTRO da loja (faixa, Navbar e Footer reais).
 *
 * O conteúdo (hero, história, vídeo, A LINHA, monte o kit, jogos, muro) é estático e mora em
 * public/collab/dropdead/lp/ (fonte: ux/empresas/pcyes/collab-dropdead-lp; publicar com
 * projetos/collab-dropdead/lp/publicar_v3.sh, que também gera o CSS escopado em .lp-dd).
 * Aqui a gente só carrega CSS + script, monta em <div class="lp-dd"> e entrega o carrinho da loja.
 */
const BASE = "/collab/dropdead/lp/";
const LP_VERSAO = "1795620989";
const FONTES = "https://fonts.googleapis.com/css2?family=Anton&family=Graduate&family=Inter+Tight:wght@400;500;700;800&family=Permanent+Marker&family=Space+Mono:wght@400;700&display=swap";

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

  // o carrinho da loja fica disponível pra página (levar o kit / comprar)
  useEffect(() => {
    window.pcyesCarrinho = (itens) => itens.forEach((i) => addItem(i));
    return () => { delete window.pcyesCarrinho; };
  }, [addItem]);

  // o cabeçalho da loja é fixo: mede a base dele pra os trechos "sticky" da página não ficarem por baixo
  useEffect(() => {
    const mede = () => {
      let base = 0;
      for (let y = 4; y < 260; y += 24) {
        let el = document.elementFromPoint(window.innerWidth / 2, y) as HTMLElement | null;
        while (el && el !== document.body && !["fixed", "sticky"].includes(getComputedStyle(el).position)) el = el.parentElement;
        if (el && el !== document.body) base = Math.max(base, el.getBoundingClientRect().bottom);
      }
      setTopo(Math.round(base));
    };
    mede(); const t = setTimeout(mede, 400);
    window.addEventListener("resize", mede);
    return () => { clearTimeout(t); window.removeEventListener("resize", mede); };
  }, []);

  useEffect(() => {
    anexa("lp-dd-fontes", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: FONTES }));
    anexa("lp-dd-css", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: `${BASE}css/lp.scoped.css?v=${LP_VERSAO}` }));
    let desmonta: (() => void) | undefined, vivo = true;
    const monta = () => { if (vivo && raiz.current && window.montaLP) desmonta = window.montaLP(raiz.current, { site: true, secoes: ["hero", "historia", "parede", "kit", "jogos", "muro"] }); };
    if (window.montaLP) monta();
    else {
      const sc = anexa("lp-dd-js", () => Object.assign(document.createElement("script"), { src: `${BASE}js/lp.js?v=${LP_VERSAO}` }));
      sc.addEventListener("load", monta, { once: true });
    }
    return () => { vivo = false; desmonta?.(); };
  }, []);

  return <div ref={raiz} className="lp-dd site" style={{ ["--hdr" as string]: `${topo}px`, paddingTop: topo }} />;
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
