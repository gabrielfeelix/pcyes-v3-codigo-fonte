import { useEffect } from "react";

/**
 * VLibras — tradutor de Libras (Língua Brasileira de Sinais) do governo federal
 * (gov.br), gratuito. Injeta o widget oficial: um botão flutuante à direita que
 * abre o avatar 3D (Ícaro) e traduz texto/imagens da página para Libras.
 *
 * Doc: https://www.gov.br/governodigital/pt-br/vlibras
 * O plugin adiciona sua própria marcação `[vw]` no <body> e um botão fixo.
 */

const PLUGIN_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const PLUGIN_APP = "https://vlibras.gov.br/app";

declare global {
  interface Window {
    VLibras?: { Widget: new (app: string) => unknown };
  }
}

/** Abre/ativa o tradutor de Libras (dispara o botão de acesso do widget). */
export function openVLibras() {
  const btn = document.querySelector<HTMLElement>(
    "#vlibras-root [vw-access-button]",
  );
  btn?.click();
}

export function VLibras() {
  useEffect(() => {
    // Evita injeção dupla (StrictMode / re-montagem do layout).
    if (document.getElementById("vlibras-root")) return;

    // Esconde o botão flutuante padrão (fica fora da tela, mas ainda clicável
    // via JS) — o gatilho fica no ícone de acessibilidade do header.
    const style = document.createElement("style");
    style.id = "vlibras-style";
    style.textContent = `
      #vlibras-root [vw-access-button] {
        position: fixed !important;
        left: -9999px !important;
        top: -9999px !important;
        opacity: 0 !important;
      }`;
    document.head.appendChild(style);

    const root = document.createElement("div");
    root.id = "vlibras-root";
    root.setAttribute("vw", "");
    root.className = "enabled";
    root.innerHTML = `
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>`;
    document.body.appendChild(root);

    const script = document.createElement("script");
    script.src = PLUGIN_SRC;
    script.async = true;
    script.onload = () => {
      if (window.VLibras) new window.VLibras.Widget(PLUGIN_APP);
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
