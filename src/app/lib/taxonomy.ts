/**
 * Taxonomia do catálogo — vocabulário controlado, fonte única de verdade.
 *
 * Antes a subcategoria era derivada por regras soltas sobre o nome, com
 * fallback no campo bruto do fornecedor. Isso não é taxonomia, é palpite, e o
 * catálogo mostrava o preço disso: 55 subcategorias, 27 delas com um ou dois
 * produtos, "Memória" e "Memoria" gerando a MESMA URL (metade dos produtos
 * sumia da listagem), "Monitores"/"Monitor"/"Monitor Gamer" competindo entre
 * si, 120 produtos espalhados por dez baldes de cabo, e suporte de monitor
 * classificado como monitor.
 *
 * Três decisões sustentam este módulo:
 *
 * 1. SLUG É IDENTIDADE, não consequência do rótulo. Antes o slug nascia de
 *    slugify(label), então corrigir um acento no rótulo mudava a URL em
 *    silêncio — foi exatamente o que produziu a colisão Memória/Memoria. Aqui
 *    o slug é declarado e imutável; o label pode ser reescrito à vontade.
 *
 * 2. UM PRODUTO, UMA CASA. Cada produto resolve para exatamente um par
 *    categoria+subcategoria, que define sua URL canônica. Aparecer em outras
 *    listagens é papel de filtro/atributo, não de segunda URL.
 *
 * 3. ACESSÓRIO NÃO HERDA O QUE ELE SEGURA. Suporte de monitor é suporte;
 *    "para monitor" é compatibilidade, não identidade. Por isso os nós de
 *    acessório vêm ANTES na ordem de resolução.
 *
 * `legacySlugs` alimenta os redirecionamentos 301 — toda URL que existiu
 * continua levando a algum lugar.
 */
import type { Product } from "../components/productsData";

export interface TaxonomyNode {
  /** Contrato de URL. Imutável — mudar aqui exige 301. */
  slug: string;
  /** Rótulo exibido. Livre para reescrita. */
  label: string;
  /** Categoria canônica (o produto é re-alojado se vier em outra). */
  category: string;
  /** Termos no nome do produto (ou na subcategoria bruta) que resolvem aqui. */
  keywords: string[];
  /**
   * Casa apenas se o nome COMEÇAR com um destes termos.
   *
   * Acessório precisa disso: "cabo" solto casava dentro de "Fone de Ouvido ...
   * 3,5mm Cabo 2m" e "Mouse ... Cabo 2 Metros", que mencionam o cabo como
   * característica, não como identidade. O substantivo-cabeça do nome é o que
   * diz o que a coisa é.
   */
  headNouns?: string[];
  /** Slugs que já apontaram para este conteúdo. */
  legacySlugs?: string[];
  /**
   * Título e descrição editoriais da listagem.
   *
   * Opcionais de propósito: o template de `lib/listingSeo` já produz texto
   * único e correto para toda listagem, então nenhuma página nasce sem SEO.
   * Estes campos existem para quando marketing quiser sobrescrever uma
   * listagem específica sem tocar em código de renderização.
   */
  seoTitle?: string;
  seoDescription?: string;
}

export const CATEGORIES = [
  "Periféricos",
  "Refrigeração",
  "Computadores",
  "Hardware",
  "Fontes",
  "SSD e HD",
  "Streaming",
  "Monitores",
  "Placas de Vídeo",
  "Gabinetes",
  "Cadeiras",
] as const;

/**
 * ORDEM IMPORTA — vence o primeiro nó que casar.
 *
 * Acessório antes do produto principal ("Suporte para Monitor" antes de
 * "Monitores"), específico antes de genérico ("Mousepad" antes de "Mouse",
 * "Cartão de Memória" antes de "Memória"). Trocar a ordem troca a taxonomia.
 */
export const TAXONOMY: TaxonomyNode[] = [
  // ── Acessórios primeiro: são o que são, não o que acompanham ──
  {
    slug: "suportes-e-ergonomia",
    label: "Suportes e Ergonomia",
    category: "Periféricos",
    keywords: [],
    headNouns: ["suporte", "apoio", "organizador", "fita organizadora", "base para"],
    legacySlugs: [
      "suporte-para-tablet",
      "suporte-para-notebook",
      "suporte-para-cpu",
      "suporte-de-tv",
      "apoio-de-pulso",
      "organizador-de-mesa",
      "organizador-de-cabos",
    ],
  },
  {
    slug: "cabos-e-adaptadores",
    label: "Cabos e Adaptadores",
    category: "Periféricos",
    keywords: [],
    headNouns: ["cabo", "cabos", "adaptador", "splitter", "extensor", "hub"],
    legacySlugs: [
      "cabo",
      "cabo-hdmi",
      "cabo-c",
      "cabo-av",
      "cabo-de-audio",
      "cabo-de-video",
      "cabo-splitter",
      "cabo-adaptador",
      "adaptador",
      "adaptador-otg",
      "adaptador-de-audio",
    ],
  },

  // ── Periféricos de entrada ──
  {
    slug: "mousepads",
    label: "Mousepads",
    category: "Periféricos",
    keywords: ["mousepad", "mouse pad", "desk mat", "deskmat", "pad mouse"],
    legacySlugs: ["mousepad"],
  },
  {
    slug: "kits-teclado-e-mouse",
    label: "Kits Teclado e Mouse",
    category: "Periféricos",
    keywords: ["kit com teclado", "kit teclado", "combo teclado"],
  },
  {
    slug: "teclados",
    label: "Teclados",
    category: "Periféricos",
    keywords: ["teclado", "keyboard"],
  },
  {
    slug: "mouses",
    label: "Mouses",
    category: "Periféricos",
    keywords: ["mouse"],
  },
  {
    slug: "volantes-e-controles",
    label: "Volantes e Controles",
    category: "Periféricos",
    keywords: ["volante", "gamepad", "joystick", "controle gamer"],
    legacySlugs: ["volante-gamer"],
  },
  {
    slug: "iluminacao",
    label: "Iluminação",
    category: "Periféricos",
    keywords: ["fita led", "luminaria", "ring light", "iluminacao"],
  },

  // ── Áudio e streaming ──

  {
    slug: "placas-de-captura",
    label: "Placas de Captura",
    category: "Streaming",
    keywords: ["placa de captura", "captura de video"],
  },
  {
    slug: "webcams",
    label: "Webcams",
    category: "Streaming",
    keywords: ["webcam"],
  },
  {
    slug: "headsets",
    label: "Headsets e Fones",
    category: "Periféricos",
    keywords: ["headset", "headsets", "fone", "fones", "earbud"],
  },
  {
    slug: "microfones",
    label: "Microfones",
    category: "Streaming",
    keywords: ["microfone", "microfones"],
  },

  // ── Refrigeração ──
  {
    slug: "water-coolers",
    label: "Water Coolers",
    category: "Refrigeração",
    keywords: ["water cooler", "watercooler"],
  },
  {
    slug: "pasta-termica",
    label: "Pasta Térmica",
    category: "Refrigeração",
    keywords: ["pasta termica"],
  },
  {
    slug: "cooler-fans",
    label: "Cooler Fans",
    category: "Refrigeração",
    keywords: ["cooler fan", "cooler fans", "kit cooler"],
    headNouns: ["fan", "fans", "ventoinha"],
  },
  {
    slug: "acessorios-de-refrigeracao",
    label: "Acessórios de Refrigeração",
    category: "Refrigeração",
    keywords: ["controlador led", "controlador fan", "contact frame", "controlador"],
    legacySlugs: ["controlador-led", "controlador-fan", "contact-frame"],
  },
  {
    slug: "coolers",
    label: "Coolers",
    category: "Refrigeração",
    keywords: ["cooler"],
  },

  // ── Computadores ──
  {
    slug: "mini-computadores",
    label: "Mini Computadores",
    category: "Computadores",
    keywords: ["mini computador", "mini pc"],
    legacySlugs: ["mini-computador"],
  },
  {
    slug: "all-in-one",
    label: "All in One",
    category: "Computadores",
    keywords: ["all in one", "pcyes one"],
  },

  // ── Armazenamento e memória ──
  {
    slug: "cartoes-de-memoria",
    label: "Cartões de Memória",
    category: "SSD e HD",
    keywords: ["cartao de memoria", "cartao micro", "micro sd", "microsd"],
    legacySlugs: ["cartao-de-memoria", "cartao-micro-sd"],
  },
  {
    slug: "hds",
    label: "HDs",
    category: "SSD e HD",
    keywords: ["hd externo", "hdd", "disco rigido"],
  },
  {
    slug: "memorias",
    label: "Memórias",
    category: "Hardware",
    keywords: ["sodimm", "udimm"],
    headNouns: ["memoria", "memorias"],
    legacySlugs: ["memoria"],
  },
  {
    slug: "placas-mae",
    label: "Placas-mãe",
    category: "Hardware",
    keywords: ["placa mae", "placa-mae", "motherboard"],
    legacySlugs: ["placa-mae"],
  },
  {
    slug: "ssds",
    label: "SSDs",
    category: "SSD e HD",
    keywords: ["nvme"],
    headNouns: ["ssd", "ssds"],
    legacySlugs: ["ssd", "acessorio-para-ssd"],
  },
  {
    slug: "placas-de-rede",
    label: "Placas de Rede",
    category: "Hardware",
    keywords: ["placa de rede", "adaptador wireless", "wi fi"],
  },

  // ── Demais famílias ──
  {
    slug: "fontes",
    label: "Fontes",
    category: "Fontes",
    keywords: ["fonte"],
  },
  {
    slug: "monitores",
    label: "Monitores",
    category: "Monitores",
    keywords: ["monitor"],
    legacySlugs: ["monitor", "monitor-gamer"],
  },
  {
    slug: "placas-de-video",
    label: "Placas de Vídeo",
    category: "Placas de Vídeo",
    keywords: ["placa de video", "geforce", "radeon"],
  },
  {
    slug: "gabinetes",
    label: "Gabinetes",
    category: "Gabinetes",
    keywords: ["gabinete"],
  },
  {
    slug: "cadeiras-gamer",
    label: "Cadeiras Gamer",
    category: "Cadeiras",
    keywords: ["cadeira gamer"],
  },
  {
    slug: "cadeiras-ergonomicas",
    label: "Cadeiras Ergonômicas",
    category: "Cadeiras",
    keywords: ["cadeira", "poltrona"],
    legacySlugs: ["cadeiras-office"],
  },
];

const NODE_BY_SLUG = new Map(TAXONOMY.map((node) => [node.slug, node]));

/** slug legado → nó atual, para 301 e para URL antiga ainda resolver na SPA. */
export const LEGACY_SLUG_MAP: Map<string, TaxonomyNode> = (() => {
  const map = new Map<string, TaxonomyNode>();
  for (const node of TAXONOMY) {
    for (const legacy of node.legacySlugs ?? []) {
      if (!map.has(legacy) && !NODE_BY_SLUG.has(legacy)) map.set(legacy, node);
    }
  }
  return map;
})();

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const resolveCache = new WeakMap<object, TaxonomyNode | null>();

type Resolvable = Pick<Product, "name" | "category" | "subcategory">;

/**
 * Resolve o produto para um nó da taxonomia.
 *
 * Casa contra nome + subcategoria bruta juntos: o fornecedor às vezes só
 * classifica direito num dos dois. Retorna null quando nada casa — e nesse
 * caso o produto aparece no relatório de não mapeados (ver validateTaxonomy),
 * em vez de inventar uma subcategoria nova e fragmentar o catálogo de novo.
 */
export function resolveTaxonomyNode(product: Resolvable): TaxonomyNode | null {
  const cached = resolveCache.get(product as object);
  if (cached !== undefined) return cached;

  /* Casamento por PALAVRA, não por substring. Com substring, "fone" casava
     dentro de "microfone" e todo headset com microfone acoplado — a maioria —
     era classificado como microfone. Os espaços nas bordas fazem a fronteira,
     e frases ("mouse pad") continuam funcionando. */
  const haystack = ` ${normalizeText(`${product.name} ${product.subcategory ?? ""}`)} `;
  const head = `${normalizeText(product.name)} `;
  const node = TAXONOMY.find((candidate) =>
    candidate.headNouns?.some((noun) => head.startsWith(`${normalizeText(noun)} `)) ||
    candidate.keywords.some((keyword) => haystack.includes(` ${normalizeText(keyword)} `)),
  ) ?? null;

  resolveCache.set(product as object, node);
  return node;
}

/**
 * O nó apenas espelha a própria categoria? (Fontes/Fontes, Gabinetes/Gabinetes)
 *
 * Nessas famílias a categoria tem um filho só, com o mesmo nome, então
 * `/gabinetes/` e `/gabinetes/gabinetes/` listam exatamente os mesmos produtos.
 * São duas URLs para uma página — conteúdo duplicado, com as duas competindo
 * pelo mesmo termo e dividindo o sinal entre si.
 *
 * A listagem espelhada continua acessível (o segmento existe nas URLs de
 * produto), mas não é publicada no sitemap e aponta canonical para a
 * categoria: uma página indexável por conteúdo.
 */
export function isMirrorSubcategory(node: TaxonomyNode): boolean {
  return node.label === node.category;
}

export function getTaxonomyNodeBySlug(slug: string): TaxonomyNode | null {
  return NODE_BY_SLUG.get(slug) ?? LEGACY_SLUG_MAP.get(slug) ?? null;
}

export function getTaxonomyNodesByCategory(category: string): TaxonomyNode[] {
  return TAXONOMY.filter((node) => node.category === category);
}

export interface TaxonomyIssue {
  kind: "slug-collision" | "unmapped-product" | "unknown-category";
  detail: string;
}

/**
 * Invariantes da taxonomia, verificadas no build (ver validate-taxonomy no
 * vite.config). Sem isso, a próxima carga de dados do fornecedor recria a
 * fragmentação em silêncio — foi assim que se chegou às 55 subcategorias.
 */
export function validateTaxonomy(products: Resolvable[]): TaxonomyIssue[] {
  const issues: TaxonomyIssue[] = [];

  const seen = new Map<string, string>();
  for (const node of TAXONOMY) {
    const key = `${node.category}/${node.slug}`;
    const previous = seen.get(key);
    if (previous && previous !== node.label) {
      issues.push({ kind: "slug-collision", detail: `${key}: "${previous}" e "${node.label}"` });
    }
    seen.set(key, node.label);

    if (!CATEGORIES.includes(node.category as (typeof CATEGORIES)[number])) {
      issues.push({ kind: "unknown-category", detail: `${node.slug} aponta para "${node.category}"` });
    }
  }

  for (const product of products) {
    if (!resolveTaxonomyNode(product)) {
      issues.push({ kind: "unmapped-product", detail: product.name });
    }
  }

  return issues;
}
