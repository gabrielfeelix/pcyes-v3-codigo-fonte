/**
 * Busca de produtos no padrão de e-commerce moderno (client-side).
 *
 * Cobre o que o `.includes()` cru não cobria:
 *  - Acentos/diacríticos: "mecanico" acha "Mecânico" (normalização NFD).
 *  - Typo tolerance: "cfdeira" acha "cadeira" (distância de edição por palavra).
 *  - Sinônimos PT-BR: "gpu"/"placa de vídeo", "fone"/"headset", "notebook"/"pc".
 *  - Multi-palavra: cada termo precisa casar (AND), em qualquer ordem/campo.
 *  - Ranking por relevância: exato > prefixo > substring > fuzzy, com desempate
 *    por avaliação/popularidade — exatos sempre acima de aproximados.
 *
 * Sem dependência externa; opera sobre o catálogo em memória do protótipo.
 */

export function normalize(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove acentos (marcas combinantes)
    .replace(/[^a-z0-9\s]/g, " ") // pontuação vira espaço
    .replace(/\s+/g, " ")
    .trim();
}

// Palavras vazias (não contam como termo obrigatório na busca)
const STOPWORDS = new Set(["de", "da", "do", "das", "dos", "para", "pra", "com", "e", "o", "a", "os", "as", "em", "no", "na"]);

// Grupos de sinônimos — SOMENTE termos de uma palavra. Termos com espaço
// poluiriam o índice (ex.: "gamer chair" faria "gamer" virar sinônimo de
// "cadeira" e casar todo produto Gamer). Multi-palavra o usuário resolve via
// AND dos tokens. Cada palavra do grupo casa com as demais.
const SYNONYM_GROUPS: string[][] = [
  ["cadeira", "poltrona", "assento"],
  ["gpu", "vga", "geforce", "rtx", "gtx", "radeon", "grafica"],
  ["motherboard", "mobo"],
  ["processador", "ryzen"],
  ["notebook", "laptop", "portatil"],
  ["computador", "pc", "desktop"],
  ["fone", "headset", "headphone", "earphone", "auricular"],
  ["teclado", "keyboard"],
  ["mouse", "ratinho"],
  ["mousepad"],
  ["monitor", "ultrawide"],
  ["ssd", "nvme"],
  ["hd", "hdd"],
  ["memoria", "ram"],
  ["fonte", "psu"],
  ["cooler", "ventoinha", "refrigeracao"],
  ["gabinete", "case"],
  ["webcam"],
  ["microfone"],
  ["controle", "gamepad", "joystick"],
  ["volante"],
  ["streaming", "captura"],
];

// Índice termo→conjunto de sinônimos do seu grupo
const SYNONYM_INDEX: Map<string, Set<string>> = (() => {
  const idx = new Map<string, Set<string>>();
  for (const group of SYNONYM_GROUPS) {
    const words = new Set<string>();
    for (const term of group) for (const w of normalize(term).split(" ")) if (w) words.add(w);
    for (const w of words) {
      if (!idx.has(w)) idx.set(w, new Set());
      for (const other of words) idx.get(w)!.add(other);
    }
  }
  return idx;
})();

function synonymsOf(token: string): Set<string> {
  const set = new Set<string>([token]);
  const syns = SYNONYM_INDEX.get(token);
  if (syns) for (const s of syns) set.add(s);
  return set;
}

// Distância de Levenshtein com teto (early-exit) para typo tolerance.
function editDistance(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1; // early exit
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

// Teto de erros tolerados conforme tamanho do termo (termos curtos = menos tolerância)
function fuzzyBudget(len: number): number {
  if (len <= 3) return 0;
  if (len <= 5) return 1;
  return 2;
}

/** Melhor pontuação de casamento de UM termo da query contra as palavras do produto. 0 = não casou. */
function scoreToken(token: string, words: string[]): number {
  const variants = synonymsOf(token);
  let best = 0;
  for (const variant of variants) {
    const isSynonym = variant !== token;
    for (const w of words) {
      if (w === variant) best = Math.max(best, isSynonym ? 3.2 : 4);
      else if (variant.length >= 3 && w.startsWith(variant)) best = Math.max(best, isSynonym ? 2.4 : 3);
      // substring só quando a palavra do produto contém o termo INTEIRO e o termo
      // tem ≥4 chars (evita "a"/"2" casarem meio catálogo).
      else if (variant.length >= 4 && w.includes(variant)) best = Math.max(best, isSynonym ? 1.6 : 2);
      else if (!isSynonym) {
        const budget = fuzzyBudget(variant.length);
        // fuzzy só entre palavras de tamanho parecido (evita casar palavra curta em termo longo)
        if (budget > 0 && Math.abs(w.length - variant.length) <= budget && editDistance(variant, w, budget) <= budget) {
          best = Math.max(best, 1.2);
        }
      }
      if (best >= 4) return best;
    }
  }
  return best;
}

export interface SearchableProduct {
  name: string;
  category: string;
  subcategory?: string;
  brand?: string;
  tags?: string[];
  sku?: string;
  rating?: number;
  reviews?: number;
}

interface Ranked<T> { item: T; score: number; }

/**
 * Busca + ranqueia produtos. Retorna itens que satisfazem TODOS os termos
 * (AND, com sinônimos/typo), ordenados por relevância.
 */
export function searchProducts<T extends SearchableProduct>(query: string, products: T[], limit = 0): T[] {
  const qn = normalize(query);
  if (!qn) return [];
  const tokens = qn.split(" ").filter((t) => t && !STOPWORDS.has(t));
  if (tokens.length === 0) return [];

  const ranked: Ranked<T>[] = [];
  for (const p of products) {
    const nameN = normalize(p.name);
    const haystack = [nameN, normalize(p.category), normalize(p.subcategory || ""), normalize(p.brand || ""), normalize((p.tags || []).join(" ")), normalize(p.sku || "")]
      .filter(Boolean)
      .join(" ");
    const words = Array.from(new Set(haystack.split(" ").filter(Boolean)));

    let total = 0;
    let allMatched = true;
    for (const token of tokens) {
      const s = scoreToken(token, words);
      if (s === 0) { allMatched = false; break; }
      total += s;
    }
    if (!allMatched) continue;

    // Bônus de relevância: nome inteiro contém a query, ou começa com ela.
    if (nameN.includes(qn)) total += 4;
    if (nameN.startsWith(qn)) total += 3;
    // Desempate leve por popularidade/avaliação.
    total += Math.min(1, ((p.rating || 0) * (p.reviews || 0)) / 5000);

    ranked.push({ item: p, score: total });
  }

  ranked.sort((a, b) => b.score - a.score);
  const out = ranked.map((r) => r.item);
  return limit > 0 ? out.slice(0, limit) : out;
}
