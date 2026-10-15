/**
 * Balão do chat (AutoFluxos, carregado em index.html) acima das barras fixas
 * do rodapé.
 *
 * O widget vive num Shadow DOM: o CSS da página não alcança o balão, que é
 * `position: fixed; bottom: 14px` lá dentro. No celular ele caía em cima do
 * botão "Comprar" da barra fixa da PDP. A raiz da sombra é aberta, então
 * injetamos uma regra que soma `--chat-offset` ao `bottom`. Variável CSS
 * atravessa a fronteira da sombra (o `all: initial` do :host não zera
 * custom properties), então quem tem barra fixa só publica a altura dela.
 *
 * Aberto (`.aberto`), o chat ocupa a tela inteira e fica como está.
 *
 * Fechado, o balão some enquanto um painel ocupa o pé da tela (o resumo do
 * checkout no celular): ele ficava em cima do "Total no PIX". Mesma técnica,
 * via `--chat-visibility`.
 */
const STYLE_ID = "pcyes-chat-offset";
const CSS = `
.raiz:not(.aberto) {
  visibility: var(--chat-visibility, visible) !important;
}
@media (max-width: 1023px) {
  .raiz:not(.aberto) {
    bottom: calc(14px + var(--chat-offset, 0px)) !important;
    transition: bottom .3s ease;
  }
}`;

function patch(root: ShadowRoot) {
  if (!root.querySelector(".raiz") || root.getElementById(STYLE_ID)) return false;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  root.appendChild(style);
  return true;
}

function tryPatch() {
  for (const el of Array.from(document.body.children)) {
    const root = (el as HTMLElement).shadowRoot;
    if (root && patch(root)) return true;
  }
  return false;
}

/** Chamar uma vez no boot. O script do chat é async: espera ele montar. */
export function installChatOffset() {
  if (typeof document === "undefined" || tryPatch()) return;
  const mo = new MutationObserver(() => { if (tryPatch()) mo.disconnect(); });
  mo.observe(document.body, { childList: true, subtree: true });
  // O widget monta a `.raiz` logo depois do host; não vale observar para sempre.
  setTimeout(() => mo.disconnect(), 30_000);
}

/** Esconde o balão (fechado) enquanto um painel cobre o pé da tela. */
export function setChatHidden(hidden: boolean) {
  const root = document.documentElement.style;
  if (hidden) root.setProperty("--chat-visibility", "hidden");
  else root.removeProperty("--chat-visibility");
}

/** Publica (ou zera) quanto o balão precisa subir. */
export function setChatOffset(value: string | null) {
  const root = document.documentElement.style;
  if (value) root.setProperty("--chat-offset", value);
  else root.removeProperty("--chat-offset");
}
