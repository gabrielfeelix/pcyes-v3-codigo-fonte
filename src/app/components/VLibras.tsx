import { useEffect } from "react";

/**
 * VLibras — tradutor de Libras (Língua Brasileira de Sinais) do governo federal
 * (gov.br), gratuito. Injeta o widget oficial: um botão flutuante à direita que
 * abre o avatar 3D e traduz o conteúdo da página para Libras.
 *
 * Doc: https://www.gov.br/governodigital/pt-br/vlibras
 *
 * A partir da v7.8 o plugin mudou de arquitetura: ele não lê mais a marcação
 * `[vw]` / `[vw-access-button]` no DOM (isso era a v4/v5). O loader agora
 * monta sozinho um `#vlibras-access-wrapper` com shadow root, e só baixa o
 * app pesado (`vlibras-plugin-app.js`) quando o usuário pede — via clique no
 * botão ou via `window.VLibrasWidget.open()`.
 *
 * Consequência prática: a marcação manual antiga era ignorada (o botão que
 * `openVLibras` procurava nunca existia, então o tradutor não abria) e o
 * `new VLibras.Widget(...)` renderizava um segundo botão. Aqui apenas
 * carregamos o loader e escondemos o botão padrão — o gatilho é o ícone de
 * acessibilidade do header, que chama `openVLibras`.
 */

const PLUGIN_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const SCRIPT_ID = "vlibras-plugin";

declare global {
  interface Window {
    VLibrasWidget?: {
      /** Baixa (na 1ª vez) e abre o tradutor. */
      open?: () => void;
      /** Botão flutuante padrão criado pelo loader. */
      initBtn?: HTMLElement;
    };
  }
}

/**
 * Abre/ativa o tradutor de Libras.
 *
 * O app do VLibras só é baixado no primeiro `open()`, então o widget pode
 * levar um instante para aparecer — é o comportamento oficial (lazy).
 */
export function openVLibras() {
  window.VLibrasWidget?.open?.();
}

export function VLibras() {
  useEffect(() => {
    // Evita injeção dupla (StrictMode / re-montagem do layout).
    if (document.getElementById(SCRIPT_ID)) return;

    /* O botão flutuante do plugin vive dentro de um shadow root, fora do
       alcance do CSS da página. Escondemos o host: o wrapper inteiro sai de
       cena, mas continua no DOM e clicável via `VLibrasWidget.open()`. */
    const style = document.createElement("style");
    style.id = "vlibras-style";
    style.textContent = `
      #vlibras-access-wrapper {
        position: fixed !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }`;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = PLUGIN_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
