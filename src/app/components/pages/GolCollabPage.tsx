import { useEffect, useRef, useState } from "react";
import { Footer } from "../Footer";
import { SEO } from "../SEO";

/**
 * Collab PCYES × GOL — página DA LOJA (rota /gol), com o header, o mega menu e o footer da v3.
 * Regra do repo (marcas/pcyes/CLAUDE.md): collab é página montada dentro do layout, nunca redirect pra .html solto.
 *
 * PROTÓTIPO de proposta (a GOL ainda não fechou): cockpit 3D (Three.js) que sai da cabine, explode peça por peça e
 * volta pra dentro na decolagem. Fonte: ux/empresas/pcyes/collab-gol-lp; publicar com
 * marcas/pcyes/projetos/collab-gol/publicar_v3.sh (gera public/collab/gol/js/gol.js com o three embutido).
 * O CSS é escopado em .lp-gol.
 */
const BASE = "/collab/gol/";
const LP_VERSAO = "1795724771";
const FONTES = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap";

declare global {
  interface Window {
    montaGol?: (raiz: HTMLElement, opt: { base: string }) => () => void;   // nunca montaLP/montaLoud: são das outras collabs
  }
}

function anexa<T extends HTMLElement>(id: string, cria: () => T): T {
  const ja = document.getElementById(id) as T | null;
  if (ja) return ja;
  const el = cria(); el.id = id; document.head.appendChild(el); return el;
}

export function GolCollabPage() {
  const raiz = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let desmonta: (() => void) | undefined, vivo = true;
    anexa("lp-gol-fontes", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: FONTES }));
    anexa("lp-gol-css", () => Object.assign(document.createElement("link"), { rel: "stylesheet", href: `${BASE}css/lp.css?v=${LP_VERSAO}` }));
    const monta = () => {
      if (!vivo || !raiz.current || !window.montaGol) return;
      desmonta = window.montaGol(raiz.current, { base: BASE });
      setPronto(true);
    };
    if (window.montaGol) monta();
    else anexa("lp-gol-js", () => Object.assign(document.createElement("script"), { src: `${BASE}js/gol.js?v=${LP_VERSAO}` }))
      .addEventListener("load", monta, { once: true });
    return () => { vivo = false; desmonta?.(); };
  }, []);

  return (
    <>
      <SEO
        title="PCYES × GOL · Cockpit 737"
        description="O cockpit do 737 na sua casa. Simulador de voo PCYES em parceria com a GOL."
        canonicalPath="/gol/"
      />
      <div style={{ background: "#100d0a", paddingTop: "var(--header-h, 156px)", minHeight: "100vh" }}>
        {/* --topo: o palco 3D fica preso logo abaixo do header fixo da loja */}
        <div ref={raiz} className="lp-gol" style={{ ["--topo" as string]: "var(--header-h, 156px)" }} />
        {pronto && <Footer />}
      </div>
    </>
  );
}
