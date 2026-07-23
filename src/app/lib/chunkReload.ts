/**
 * Recuperação de chunk obsoleto — estado compartilhado entre o carregador de
 * rotas (routes.tsx) e a tela de erro (GlobalErrorBoundary).
 *
 * Contexto: cada build gera nomes com hash novo. A aba que ficou aberta durante
 * um deploy segue com o index.html antigo em memória e pede um arquivo que já
 * não existe — "Failed to fetch dynamically imported module". Recarregar busca
 * o índice atual e resolve.
 *
 * A trava existe só para não entrar em laço quando a falha for real (rede fora,
 * arquivo de fato ausente). Ela é DATADA de propósito: a versão anterior
 * gravava "1" sem prazo e só limpava ao carregar uma rota lazy com sucesso —
 * quem falhasse uma vez e depois navegasse apenas pela home carregava a trava
 * presa pelo resto da sessão, e no deploy seguinte a primeira falha ia direto
 * para a tela de erro sem sequer tentar recarregar. Com prazo, duas falhas
 * seguidas em poucos segundos ainda param o laço, mas uma falha de meia hora
 * atrás não bloqueia a recuperação de agora.
 */

const CHUNK_RELOAD_KEY = "pcyes:chunk-reloaded";

/** Janela em que um reload anterior ainda conta como "acabei de tentar". */
const RELOAD_LOCK_MS = 30_000;

function readTimestamp() {
  try {
    const raw = sessionStorage.getItem(CHUNK_RELOAD_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null; // modo privado / storage bloqueado
  }
}

/** Já tentamos recarregar há pouco? Se sim, o erro deve subir. */
export function hasRecentChunkReload(now = Date.now()) {
  const stamp = readTimestamp();
  return stamp !== null && now - stamp < RELOAD_LOCK_MS;
}

export function markChunkReload(now = Date.now()) {
  try {
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(now));
  } catch {
    /* sem storage: seguimos sem trava */
  }
}

export function clearChunkReload() {
  try {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
  } catch {
    /* nada a limpar */
  }
}

/**
 * O erro é de chunk que sumiu (deploy novo) e não de código quebrado?
 *
 * Cada navegador escreve essa falha de um jeito, então a checagem é por
 * fragmento de mensagem em vez de tipo.
 */
export function isChunkLoadError(error: unknown) {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "";

  return /dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk \d+ failed/i.test(
    message,
  );
}

/**
 * Recarrega buscando o índice na rede.
 *
 * `location.reload()` sozinho pode ser servido do cache de memória da aba —
 * justamente o índice velho que causou o problema. Limpar o Cache Storage antes
 * (quando existir) tira a cópia que um service worker eventualmente guardou.
 */
export function reloadForFreshChunks() {
  const go = () => window.location.reload();

  if (typeof caches === "undefined") {
    go();
    return;
  }

  caches
    .keys()
    .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    .catch(() => undefined)
    .then(go);
}
