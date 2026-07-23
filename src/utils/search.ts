/**
 * Busca de produtos no padrão de e-commerce moderno (client-side).
 *
 * Escrito para como o cliente DIGITA, não para como o catálogo nomeia:
 *  - Acento e caixa: "mecanico" acha "Mecânico".
 *  - Erro de tecla: "cfdeira" acha "cadeira" (distância de edição por palavra).
 *  - Grafia fonética: "teklado", "arqueum", "museped" — corrigidos contra o
 *    vocabulário do catálogo antes de buscar (ver `correctToken`).
 *  - Espaço a mais ou a menos: "tec lado", "placadevideo".
 *  - Plural: "cadeiras" acha "cadeira", nos dois sentidos.
 *  - Vocabulário do cliente: sinônimos PT-BR, cores PT↔EN ("gabinete branco"
 *    acha "Forcefield White") e apelidos de loja ("cpu" = gabinete).
 *  - Ranking por campo: casar no nome ou no tipo do produto vale mais que
 *    casar numa tag, e popularidade só desempata.
 *
 * Sem dependência externa; opera sobre o catálogo em memória.
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
  // Cores PT↔EN: o catálogo nomeia em inglês ("Forcefield Dome White Ghost"),
  // o cliente digita em português. Sem isso "gabinete branco" dava zero.
  ["branco", "white"],
  ["preto", "black"],
  ["vermelho", "red"],
  ["azul", "blue"],
  ["verde", "green"],
  ["amarelo", "yellow"],
  ["rosa", "pink"],
  ["roxo", "purple", "lilas"],
  ["cinza", "gray", "grey"],
  ["prata", "silver"],
  ["marrom", "brown"],
  ["laranja", "orange"],
  // Conectividade e formato — vocabulário de vitrine vs. vocabulário de ficha.
  ["wireless", "wifi"],
  ["bluetooth", "bt"],
  ["mecanico", "mechanical"],
  ["ergonomico", "ergonomic"],
  ["suporte", "stand"],
  /* Apelidos de loja física — como o cliente CHAMA, não como o catálogo
     nomeia. "cpu" apontando para gabinete é o caso clássico: metade do país
     chama o gabinete de CPU. Fica nos dois grupos de propósito. */
  ["gabinete", "case", "cpu", "torre", "gabinet"],
  ["processador", "cpu"],
  ["kit", "combo"],
  ["mousepad", "padmouse", "tapete"],
  ["cabo", "fio"],
  ["controle", "manete"],
  ["fone", "fones"],
  ["notebook", "note"],
  ["headset", "hedset", "redset", "edset"],
  ["teclado", "teklado", "tecaldo"],
  ["mouse", "mousi", "maus"],
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

/**
 * Plural PT-BR simplificado: "cadeiras"→"cadeira", "canais"→"canal".
 *
 * Não é stemmer completo de propósito — o objetivo é só não perder o produto
 * porque o cliente digitou no plural. Reduções agressivas (radicalização real)
 * misturariam palavras distintas e sujariam o resultado.
 */
function singularCandidates(token: string): string[] {
  if (token.length < 4 || !token.endsWith("s")) return [];
  if (token.endsWith("oes") || token.endsWith("aes")) return [`${token.slice(0, -3)}ao`];
  if (token.endsWith("ais") || token.endsWith("eis") || token.endsWith("ois")) return [`${token.slice(0, -2)}l`];
  /* "-res/-ses/-zes" é ambíguo: "meses"→"mes" corta dois, mas "mouses"→"mouse"
     corta um. Devolver os dois candidatos e deixar o casamento escolher é mais
     barato que acertar a morfologia — e o erro de cortar demais era caro:
     "mouses" virava "mous", que só casava por prefixo, e aí mouse pad passava
     na frente de mouse. */
  if (token.endsWith("res") || token.endsWith("ses") || token.endsWith("zes")) {
    return [token.slice(0, -1), token.slice(0, -2)];
  }
  if (token.endsWith("ns")) return [`${token.slice(0, -2)}m`];
  return [token.slice(0, -1)];
}

function synonymsOf(token: string): Set<string> {
  const set = new Set<string>([token]);
  const syns = SYNONYM_INDEX.get(token);
  if (syns) for (const s of syns) set.add(s);

  // Singular entra como variante, e os sinônimos DELE também: quem busca
  // "cadeiras" merece o mesmo alcance de quem busca "cadeira".
  for (const singular of singularCandidates(token)) {
    set.add(singular);
    const singularSyns = SYNONYM_INDEX.get(singular);
    if (singularSyns) for (const s of singularSyns) set.add(s);
  }

  return set;
}

/**
 * Chave fonética PT-BR (metaphone enxuto).
 *
 * Quem escreve "teklado", "arqueum" ou "museped" não errou a tecla: escreveu o
 * som. Distância de edição não alcança isso — "museped"→"mousepad" são 3
 * edições, acima de qualquer orçamento seguro. Já a chave fonética iguala as
 * duas, porque o que muda é grafia de vogal e de consoante equivalente.
 *
 * Regras: dígrafos primeiro (ph→f, ch→x, qu→k), consoantes de mesmo som
 * colapsadas (k/q/c→k, z/ç→s, w→v, y→i), h mudo cai, letras repetidas viram
 * uma, e vogais só contam na primeira posição — vogal é justamente onde o erro
 * de grafia mora.
 *
 * É sinal de ÚLTIMO recurso: colide com facilidade ("mouse" e "mesa" viram
 * "ms"), por isso pontua baixo e exige chave de 3+ caracteres.
 */
export function phoneticKey(word: string): string {
  if (!word) return "";

  let s = word
    .replace(/ph/g, "f")
    .replace(/[cs]h/g, "x")
    .replace(/lh/g, "l")
    .replace(/nh/g, "n")
    .replace(/qu/g, "k")
    .replace(/gu([ei])/g, "g$1")
    .replace(/c([ei])/g, "s$1")
    .replace(/[cqk]/g, "k")
    .replace(/[zç]/g, "s")
    .replace(/w/g, "v")
    .replace(/y/g, "i")
    .replace(/h/g, "");

  // "ss"/"rr"/"tt" e afins: repetição é ruído de grafia, não som.
  s = s.replace(/(.)\1+/g, "$1");

  const first = s[0] ?? "";
  const rest = s.slice(1).replace(/[aeiou]/g, "");
  return first + rest;
}

/** "ark1"/"z10" → "ark"/"z": modelo digitado com número no lugar do sufixo. */
function stripTrailingDigits(token: string): string | null {
  const stripped = token.replace(/\d+$/, "");
  return stripped.length >= 3 && stripped !== token ? stripped : null;
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

/** Chave fonética memoizada — a mesma palavra reaparece em todo produto. */
const phoneticCache = new Map<string, string>();
function cachedPhonetic(word: string): string {
  let key = phoneticCache.get(word);
  if (key === undefined) {
    key = phoneticKey(word);
    phoneticCache.set(word, key);
  }
  return key;
}

/** Chave fonética curta demais colide com meio catálogo. */
const MIN_PHONETIC_KEY = 3;

/** Melhor pontuação de casamento de UM termo da query contra as palavras de UM campo. 0 = não casou. */
function scoreToken(token: string, words: string[]): number {
  const variants = synonymsOf(token);
  const stripped = stripTrailingDigits(token);
  if (stripped) variants.add(stripped);

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

/**
 * Peso por campo. Antes tudo virava um saco de palavras único, então casar no
 * nome valia o mesmo que casar numa tag — e "Volante Gamer ... para PC" subia
 * na frente de "Computador PCYES One" na busca por "pc", porque as duas eram
 * "casamento exato" e o desempate ia pra popularidade.
 *
 * `type` (categoria/subcategoria) pesa quase como nome de propósito: quando o
 * termo do cliente É o tipo do produto, esse produto é o alvo — menção de
 * passagem no nome de um acessório não é.
 */
const FIELD_WEIGHT = {
  name: 1,
  type: 0.95,
  sku: 0.9,
  brand: 0.6,
  tags: 0.45,
} as const;

/** Termo que casa com o TIPO do produto ganha um empurrão extra no ranking. */
const TYPE_MATCH_BONUS = 3;

interface ProductFields {
  name: string[];
  type: string[];
  sku: string[];
  brand: string[];
  tags: string[];
  nameJoined: string;
}

/* Índices por produto e por catálogo são caros e imutáveis — o mesmo produto
   é renormalizado a cada tecla digitada. WeakMap porque a chave é o próprio
   objeto: catálogo trocado é catálogo coletado, sem vazamento. */
const fieldsCache = new WeakMap<SearchableProduct, ProductFields>();
const vocabularyCache = new WeakMap<object, Vocabulary>();

function getFields(p: SearchableProduct): ProductFields {
  let fields = fieldsCache.get(p);
  if (!fields) {
    fields = buildFields(p);
    fieldsCache.set(p, fields);
  }
  return fields;
}

function getVocabulary(products: SearchableProduct[]): Vocabulary {
  let vocab = vocabularyCache.get(products);
  if (!vocab) {
    vocab = buildVocabulary(products);
    vocabularyCache.set(products, vocab);
  }
  return vocab;
}

function buildFields(p: SearchableProduct): ProductFields {
  /* O singular de cada palavra do produto entra no índice junto com a forma
     original. Sem isso "mouse" só chegava a "Mouses" por prefixo (3), a mesma
     nota que chegava a "Mousepads" — e mouse pad subia na frente de mouse.
     Com "mouses" indexado também como "mouse", o produto certo casa exato (4)
     e o acessório fica com o prefixo. */
  const split = (value: string) => {
    const words = new Set<string>();
    for (const w of normalize(value).split(" ")) {
      if (!w) continue;
      words.add(w);
      for (const singular of singularCandidates(w)) words.add(singular);
    }
    return Array.from(words);
  };
  const nameJoined = normalize(p.name);
  return {
    name: split(p.name),
    type: split(`${p.category || ""} ${p.subcategory || ""}`),
    sku: split(p.sku || ""),
    brand: split(p.brand || ""),
    tags: split((p.tags || []).join(" ")),
    nameJoined,
  };
}

/** Pontuação de um termo contra o produto inteiro, já ponderada por campo. */
function scoreTokenAgainstProduct(token: string, fields: ProductFields): number {
  const nameScore = scoreToken(token, fields.name) * FIELD_WEIGHT.name;
  const typeRaw = scoreToken(token, fields.type);
  const typeScore = typeRaw * FIELD_WEIGHT.type + (typeRaw >= 2.4 ? TYPE_MATCH_BONUS : 0);
  const skuScore = scoreToken(token, fields.sku) * FIELD_WEIGHT.sku;
  const brandScore = scoreToken(token, fields.brand) * FIELD_WEIGHT.brand;
  const tagScore = scoreToken(token, fields.tags) * FIELD_WEIGHT.tags;

  return Math.max(nameScore, typeScore, skuScore, brandScore, tagScore);
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
/**
 * Vocabulário do catálogo — todas as palavras que existem nos produtos.
 *
 * Serve para decidir se juntar ou dividir termos faz sentido: "tec lado" só
 * vira "teclado" porque "teclado" existe; "mousepad" só vira "mouse pad" pelo
 * mesmo motivo. Sem essa checagem, juntar/dividir criaria palavras inventadas
 * e traria lixo.
 */
interface Vocabulary {
  words: Set<string>;
  /** chave fonética → palavras reais com aquele som */
  byPhonetic: Map<string, string[]>;
}

function buildVocabulary(products: SearchableProduct[]): Vocabulary {
  const words = new Set<string>();
  for (const p of products) {
    const source = `${p.name} ${p.category} ${p.subcategory || ""} ${p.brand || ""} ${(p.tags || []).join(" ")}`;
    for (const w of normalize(source).split(" ")) if (w.length > 2) words.add(w);
  }

  const byPhonetic = new Map<string, string[]>();
  for (const w of words) {
    const key = cachedPhonetic(w);
    if (key.length < MIN_PHONETIC_KEY) continue;
    const bucket = byPhonetic.get(key);
    if (bucket) bucket.push(w);
    else byPhonetic.set(key, [w]);
  }

  return { words, byPhonetic };
}

/**
 * Corrige o termo para a palavra que o catálogo de fato usa — o "você quis
 * dizer" resolvido antes de buscar, não depois.
 *
 * Foi a segunda tentativa de resolver grafia fonética. A primeira pontuava o
 * som direto no ranking, e isso contaminava quem escreveu certo: "cooler"
 * saltava de 50 para 105 resultados porque meia dúzia de palavras colide na
 * chave fonética. Corrigindo o termo e refazendo a busca normal, "kuler" passa
 * a devolver exatamente o mesmo que "cooler" — nem mais, nem menos.
 *
 * Ordem de tentativa: som idêntico (mais confiável) → som a uma edição →
 * grafia a uma/duas edições. Entre candidatos, vence o de menor distância de
 * grafia, e o mais curto no empate.
 */
function correctToken(token: string, vocab: Vocabulary): string {
  if (vocab.words.has(token) || SYNONYM_INDEX.has(token)) return token;

  const key = cachedPhonetic(token);
  if (key.length < MIN_PHONETIC_KEY) return token;

  const candidates = new Set<string>(vocab.byPhonetic.get(key) ?? []);

  if (candidates.size === 0) {
    for (const [otherKey, otherWords] of vocab.byPhonetic) {
      if (otherKey[0] !== key[0]) continue; // primeira letra ancora
      if (Math.abs(otherKey.length - key.length) > 1) continue;
      if (editDistance(key, otherKey, 1) <= 1) for (const w of otherWords) candidates.add(w);
    }
  }

  if (candidates.size === 0) return token;

  let bestWord = token;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of candidates) {
    const budget = fuzzyBudget(Math.max(candidate.length, token.length));
    const distance = editDistance(token, candidate, budget + 1);
    if (distance > budget + 1) continue;
    if (distance < bestDistance || (distance === bestDistance && candidate.length < bestWord.length)) {
      bestDistance = distance;
      bestWord = candidate;
    }
  }

  return bestWord;
}

/**
 * Corrige espaço a mais ou a menos.
 *
 * Espaço no meio da palavra ("tec lado", "head set") e palavra grudada
 * ("mousepad", "placadevideo") são erro de escrita comum — e nenhum dos dois é
 * alcançável por distância de edição por palavra, porque a unidade errada é a
 * fronteira, não a letra.
 */
function repairTokenBoundaries(tokens: string[], vocab: Set<string>): string[] {
  const joined: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const pair = i + 1 < tokens.length ? tokens[i] + tokens[i + 1] : "";
    // Junta só quando o resultado existe no catálogo e as partes soltas não
    // valem por si ("mouse" + "pad" continuam separados; "tec" + "lado" não).
    if (pair && vocab.has(pair) && !(vocab.has(tokens[i]) && vocab.has(tokens[i + 1]))) {
      joined.push(pair);
      i++;
    } else {
      joined.push(tokens[i]);
    }
  }

  const out: string[] = [];
  for (const token of joined) {
    if (vocab.has(token) || SYNONYM_INDEX.has(token) || token.length < 6) {
      out.push(token);
      continue;
    }
    // Palavra desconhecida e longa: tenta partir em pedaços que existam.
    // Recursivo porque grudado costuma vir com mais de uma emenda
    // ("placadevideo" = placa + de + video).
    const split = splitIntoKnownWords(token, vocab, 3);
    if (split) out.push(...split);
    else out.push(token);
  }

  return out;
}

/** Parte a palavra grudada em até `maxParts` palavras que o catálogo conheça. */
function splitIntoKnownWords(token: string, vocab: Set<string>, maxParts: number): string[] | null {
  if (vocab.has(token)) return [token];
  if (maxParts <= 1 || token.length < 6) return null;

  for (let cut = 2; cut <= token.length - 2; cut++) {
    const left = token.slice(0, cut);
    if (!vocab.has(left) && !STOPWORDS.has(left)) continue;
    const rest = splitIntoKnownWords(token.slice(cut), vocab, maxParts - 1);
    if (rest) return STOPWORDS.has(left) ? rest : [left, ...rest];
  }
  return null;
}

export function searchProducts<T extends SearchableProduct>(query: string, products: T[], limit = 0): T[] {
  const qn = normalize(query);
  if (!qn) return [];
  const rawTokens = qn.split(" ").filter((t) => t && !STOPWORDS.has(t));
  if (rawTokens.length === 0) return [];

  const vocab = getVocabulary(products);
  const tokens = repairTokenBoundaries(rawTokens, vocab.words);
  if (tokens.length === 0) return [];

  const strict = rankProducts(qn, tokens, products);
  if (strict.length >= SPELLING_RESCUE_THRESHOLD) {
    return limit > 0 ? strict.slice(0, limit) : strict;
  }

  /* Poucos resultados: assume grafia fonética e corrige os termos contra o
     vocabulário do catálogo antes de repetir a MESMA busca. Quem escreveu
     certo nunca passa por aqui, então a correção não tem como sujar o
     resultado de ninguém. */
  const corrected = tokens.map((token) => correctToken(token, vocab));
  const changed = corrected.some((token, i) => token !== tokens[i]);
  const result = changed ? rankProducts(normalize(corrected.join(" ")), corrected, products) : strict;

  return limit > 0 ? result.slice(0, limit) : result;
}

/** Abaixo disso, vale tentar de novo assumindo que a grafia é fonética. */
const SPELLING_RESCUE_THRESHOLD = 3;

function rankProducts<T extends SearchableProduct>(
  qn: string,
  tokens: string[],
  products: T[],
): T[] {

  const full: Ranked<T>[] = [];
  const partial: Ranked<T>[] = [];

  for (const p of products) {
    const fields = getFields(p);

    let total = 0;
    let matched = 0;
    for (const token of tokens) {
      const s = scoreTokenAgainstProduct(token, fields);
      if (s > 0) {
        matched += 1;
        total += s;
      }
    }
    if (matched === 0) continue;

    // Bônus de relevância: nome inteiro contém a query, ou começa com ela.
    if (fields.nameJoined.includes(qn)) total += 2.5;
    if (fields.nameJoined.startsWith(qn)) total += 3;
    /* Desempate por popularidade — TETO BAIXO de propósito. Valendo até 1.0
       ponto ele deixava de ser desempate e virava critério: a diferença entre
       casar no tipo certo e casar por prefixo é menor que isso, então "mouse"
       devolvia Mouse Pad (474 avaliações) antes de Mouse (56). Popularidade só
       decide entre produtos que a busca já considera equivalentes. */
    total += Math.min(0.35, ((p.rating || 0) * (p.reviews || 0)) / 15000);

    if (matched === tokens.length) full.push({ item: p, score: total });
    // Casamento parcial só vale a partir de metade dos termos — abaixo disso
    // vira ruído ("cadeira gamer branca" não deve devolver todo item branco).
    else if (matched * 2 >= tokens.length) partial.push({ item: p, score: total * (matched / tokens.length) });
  }

  const byScore = (a: Ranked<T>, b: Ranked<T>) => b.score - a.score;
  full.sort(byScore);
  partial.sort(byScore);

  /* Resultado exato primeiro; parcial ENTRA ABAIXO quando o exato é magro.
     Zero resultado é o momento de maior abandono da sessão — e a busca em AND
     puro produzia zero em consultas legítimas ("fone de ouvido" excluía todo
     Headset, que não tem "ouvido" no nome). A precisão do topo continua: o
     parcial nunca ultrapassa um casamento completo. */
  const out = full.map((r) => r.item);
  if (out.length < PARTIAL_FALLBACK_THRESHOLD) {
    for (const r of partial) out.push(r.item);
  }

  return out;
}

/** Abaixo disso, resultados parciais complementam a lista. */
const PARTIAL_FALLBACK_THRESHOLD = 8;
