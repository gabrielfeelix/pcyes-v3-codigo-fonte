import { useEffect, useRef, useState } from "react";
import { Footer } from "../Footer";

/**
 * Collab PCYES × LOUD — página DA LOJA (rota /loud), com o header, o mega menu e o footer da v3.
 * Regra do repo (marcas/pcyes/CLAUDE.md): collab é página montada dentro do layout, nunca redirect
 * pra .html solto.
 *
 * O conteúdo (hero, vitrine + faixa, história, parceria + vídeo, assinatura da parceria) é estático e mora em
 * public/collab/loud/ (fonte: ux/empresas/pcyes/collab-loud-lp; a versão B virou a oficial em 27/11/2026).
 * Aqui a gente só carrega CSS + scripts e monta em <div class="lp-ld">, logo abaixo do header.
 * O CSS da página já é escopado (.lp-ld / .op-a), então não vaza pro resto da loja.
 */
const BASE = "/collab/loud/";
const LP_VERSAO = "1795698857";
const FONTES = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Big+Shoulders+Display:wght@900&family=JetBrains+Mono:wght@400;600&display=swap";

declare global {
  interface Window {
    montaLoud?: (raiz: HTMLElement) => () => void;
    LD?: unknown;
  }
}

function anexa<T extends HTMLElement>(id: string, cria: () => T): T {
  const ja = document.getElementById(id) as T | null;
  if (ja) return ja;
  const el = cria(); el.id = id; document.head.appendChild(el); return el;
}

export function LoudCollabPage() {
  const raiz = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let desmonta: (() => void) | undefined, vivo = true;
    anexa("lp-loud-fontes", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: FONTES }));
    anexa("lp-loud-css-comum", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: `${BASE}css/comum.css?v=${LP_VERSAO}` }));
    anexa("lp-loud-css-a", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: `${BASE}css/a.css?v=${LP_VERSAO}` }));
    const monta = () => {
      if (!vivo || !raiz.current || !window.montaLoud) return;
      desmonta = window.montaLoud(raiz.current);
      setPronto(true);
    };
    // comum.js (logos, fatos, vitrine) antes de a.js (a página)
    const carregaA = () => {
      if (window.montaLoud) return monta();
      anexa("lp-loud-js-a", () => Object.assign(document.createElement("script"), { src: `${BASE}js/a.js?v=${LP_VERSAO}` }))
        .addEventListener("load", monta, { once: true });
    };
    if (window.LD) carregaA();
    else anexa("lp-loud-js-comum", () => Object.assign(document.createElement("script"), { src: `${BASE}js/comum.js?v=${LP_VERSAO}` }))
      .addEventListener("load", carregaA, { once: true });
    return () => { vivo = false; desmonta?.(); };
  }, []);

  return (
    <div style={{ background: "#000", paddingTop: "var(--header-h, 156px)", minHeight: "100vh" }}>
      {/* --topo: a hero ocupa a tela menos o header da loja */}
      <div ref={raiz} className="lp-ld" style={{ ["--topo" as string]: "var(--header-h, 156px)" }} />
      {pronto && <Footer />}
    </div>
  );
}
