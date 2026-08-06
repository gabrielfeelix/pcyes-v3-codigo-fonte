import type { Product } from "../components/productsData";
import { getProductUrl } from "./slug";

/**
 * Setups PCYES ("builds prontas") como PRODUTOS de catálogo.
 *
 * Antes viviam só dentro de MonteSeuPcPage, num grid próprio, e "comprar"
 * explodia o setup em N itens de carrinho. Agora cada setup é um Product de
 * verdade: entra na listagem (/computadores/setups/), tem página de produto e
 * é comprado num clique como qualquer item — o padrão da Pichau.
 *
 * A descrição da página é montada a partir de `setupComponents`: uma lista de
 * peças (processador, placa de vídeo, memória…) onde a CÓPIA de cada slot é
 * padrão e só o MODELO muda por build. Trocar o modelo da memória de um setup
 * é editar uma string aqui — o design do card não se repete no código.
 */

export interface SetupComponent {
  /** Rótulo do slot: "Processador", "Placa de Vídeo"… */
  slot: string;
  /** Modelo específico deste build. */
  model: string;
  /** Cópia padrão do slot (mesma entre builds; só o modelo muda). */
  description: string;
}

type Persona = "gamer" | "creator" | "daily";
type Tier = "Entrada" | "Performance" | "Extremo";

interface SetupSeed {
  key: string;
  persona: Persona;
  name: string;
  tagline: string;
  description: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  badge?: string;
  heroImage: string;
  tier: Tier;
  specs: { cpu: string; gpu: string; ram: string; storage: string; psu: string };
  monitor: string;
}

/* Espelha os presets de MonteSeuPcPage (só os campos que viram produto). Copiado
   de propósito: importar daquele arquivo de 6k linhas com JSX puxaria peso morto
   para o catálogo. */
const SETUP_SEED: SetupSeed[] = [
  {
    key: "pulse", persona: "gamer", name: "PCYES Pulse", tagline: "Gamer · 1080p · esports",
    description: "Primeiro setup pra entrar no competitivo. 144Hz tranquilo em CS2, Valorant e Fortnite. eSports sem desculpa.",
    price: 3499, oldPrice: 3899, rating: 4.7, reviews: 142, heroImage: "/setups/setup-pulse.webp", tier: "Entrada",
    specs: { cpu: "Intel Core i5-12400F", gpu: "GeForce RTX 4060", ram: "16GB DDR4 3200MHz", storage: "SSD NVMe 1TB", psu: "550W 80+ Bronze" },
    monitor: "Monitor Gamer PCYES 24\" 165Hz Full HD",
  },
  {
    key: "strike", persona: "gamer", name: "PCYES Strike", tagline: "Gamer · 2K 144Hz · AAA",
    description: "Sweet spot do gamer BR. AAA em 2K com folga, stream sem travar, ranked sério.",
    price: 7499, oldPrice: 8299, rating: 4.9, reviews: 387, badge: "MAIS PEDIDA", heroImage: "/setups/setup-strike.webp", tier: "Performance",
    specs: { cpu: "Intel Core i7-12700K", gpu: "GeForce RTX 4070 Super", ram: "32GB DDR5 5600MHz", storage: "SSD NVMe 2TB", psu: "850W 80+ Gold" },
    monitor: "Monitor Gamer PCYES 27\" 2K 165Hz",
  },
  {
    key: "apex", persona: "gamer", name: "PCYES Apex", tagline: "Gamer · 4K alto FPS",
    description: "Topo absoluto pra gaming. 4K com Path Tracing, dual-PC stream, sem comprometer nada.",
    price: 14999, oldPrice: 16499, rating: 5.0, reviews: 89, heroImage: "/setups/setup-apex.webp", tier: "Extremo",
    specs: { cpu: "AMD Ryzen 7 7800X3D", gpu: "GeForce RTX 4090", ram: "32GB DDR5 6000MHz", storage: "SSD NVMe 4TB Gen4", psu: "1000W 80+ Gold Full Modular" },
    monitor: "Monitor Gamer PCYES 27\" 4K 144Hz",
  },
  {
    key: "sketch", persona: "creator", name: "PCYES Sketch", tagline: "Creator · Foto + UI design",
    description: "Primeiro passo no design e edição leve. Photoshop, Figma e Lightroom rodam sem suar.",
    price: 4299, oldPrice: 4799, rating: 4.8, reviews: 96, heroImage: "/setups/setup-sketch.webp", tier: "Entrada",
    specs: { cpu: "Intel Core i5-12400", gpu: "GeForce RTX 4060", ram: "32GB DDR4 3200MHz", storage: "SSD NVMe 1TB", psu: "550W 80+ Bronze" },
    monitor: "Monitor PCYES 24\" Full HD IPS 100% sRGB",
  },
  {
    key: "render", persona: "creator", name: "PCYES Render", tagline: "Creator · Vídeo 4K + Motion",
    description: "Cavalo de batalha pra editor. Premiere/DaVinci 4K real-time, After Effects sem dor, Blender médio.",
    price: 8999, oldPrice: 9999, rating: 4.9, reviews: 218, heroImage: "/setups/setup-render.webp", tier: "Performance",
    specs: { cpu: "AMD Ryzen 7 7700", gpu: "GeForce RTX 4070 Ti", ram: "64GB DDR5 6000MHz", storage: "SSD NVMe 2TB Gen4", psu: "850W 80+ Gold" },
    monitor: "Monitor PCYES 27\" 4K IPS 99% AdobeRGB",
  },
  {
    key: "studio", persona: "creator", name: "PCYES Studio", tagline: "Creator · 8K · 3D · AI",
    description: "Workstation sem teto. 8K + Fusion sem proxy, 3D pesado, IA generativa local.",
    price: 18499, oldPrice: 20499, rating: 5.0, reviews: 47, badge: "WORKSTATION", heroImage: "/setups/setup-studio.webp", tier: "Extremo",
    specs: { cpu: "AMD Ryzen 9 7950X", gpu: "GeForce RTX 4090", ram: "128GB DDR5 6400MHz", storage: "SSD NVMe 4TB Gen4 + 8TB HD", psu: "1200W 80+ Platinum" },
    monitor: "Monitor PCYES 32\" 4K IPS 100% AdobeRGB",
  },
  {
    key: "base", persona: "daily", name: "PCYES Base", tagline: "Dia-a-dia · Office + streaming",
    description: "PC honesto pra estudo, trabalho remoto e streaming. Custo-benefício de verdade.",
    price: 2299, oldPrice: 2599, rating: 4.6, reviews: 312, heroImage: "/setups/setup-base.webp", tier: "Entrada",
    specs: { cpu: "Intel Core i3-12100F", gpu: "Vídeo integrado UHD 730", ram: "16GB DDR4 3200MHz", storage: "SSD NVMe 480GB", psu: "400W 80+" },
    monitor: "Monitor PCYES 21,5\" Full HD 75Hz",
  },
  {
    key: "hub", persona: "daily", name: "PCYES Hub", tagline: "Dia-a-dia · Multitarefa séria",
    description: "Pra quem usa pesado sem ser gamer/editor pro. 30+ abas, planilhas grandes, dual-monitor 4K.",
    price: 4499, oldPrice: 4999, rating: 4.7, reviews: 198, heroImage: "/setups/setup-hub.webp", tier: "Performance",
    specs: { cpu: "Intel Core i5-12400F", gpu: "GeForce RTX 4060", ram: "32GB DDR4 3200MHz", storage: "SSD NVMe 1TB", psu: "550W 80+ Bronze" },
    monitor: "Monitor PCYES 24\" Full HD 75Hz",
  },
  {
    key: "cockpit", persona: "daily", name: "PCYES Cockpit", tagline: "Dia-a-dia · Pesado sem freio",
    description: "Pra quem nunca fecha aba. Triple monitor, dev pesado, edição casual, tudo simultâneo.",
    price: 9999, oldPrice: 10999, rating: 4.9, reviews: 64, heroImage: "/setups/setup-cockpit.webp", tier: "Extremo",
    specs: { cpu: "Intel Core i7-12700K", gpu: "GeForce RTX 4070", ram: "64GB DDR5 5600MHz", storage: "SSD NVMe 2TB + 4TB HD", psu: "750W 80+ Gold" },
    monitor: "Monitor PCYES 27\" 2K 100Hz",
  },
];

/** Cópia padrão por slot — reutilizada entre todos os builds. */
const SLOT_COPY: Record<string, string> = {
  Processador:
    "O cérebro da máquina: processa tudo o que roda no PC. Mais núcleos e clock significam mais fôlego em jogos, edição e multitarefa pesada.",
  "Placa de Vídeo":
    "Responsável por renderizar cada quadro. Define o teto de FPS nos jogos e acelera edição de vídeo, 3D e cargas de IA.",
  "Memória RAM":
    "Guarda o que está em uso agora. Mais memória é mais programas e abas abertos ao mesmo tempo sem o sistema engasgar.",
  Armazenamento:
    "Onde ficam sistema, jogos e arquivos. SSD NVMe entrega boot quase instantâneo e carregamentos sem espera.",
  "Placa-mãe":
    "A espinha dorsal que conecta todos os componentes. Garante estabilidade, portas e espaço para upgrades no futuro.",
  Fonte:
    "Fornece energia limpa e estável para todo o conjunto. O selo 80 Plus é eficiência e proteção contra picos e quedas.",
  Cooler:
    "Mantém as temperaturas sob controle mesmo sob carga máxima, preservando o desempenho e a vida útil das peças.",
  Gabinete:
    "A casa da build: fluxo de ar otimizado, espaço para os componentes e vidro temperado para o setup virar vitrine.",
  Monitor:
    "A tela onde tudo acontece. Alta taxa de atualização para jogos fluidos e cores fiéis para quem cria.",
  "Kit Periféricos":
    "Teclado, mouse, headset e mousepad no pacote — você liga o PC e já começa a usar, sem comprar nada à parte.",
};

const MOTHERBOARD_BY_TIER: Record<Tier, string> = {
  Entrada: "Placa-mãe PCYES A-Series DDR4 M.2 NVMe",
  Performance: "Placa-mãe PCYES B-Series DDR5 M.2 NVMe Wi-Fi",
  Extremo: "Placa-mãe PCYES X-Series DDR5 PCIe 5.0 Wi-Fi 6E",
};

const COOLER_BY_TIER: Record<Tier, string> = {
  Entrada: "Air Cooler PCYES 120mm ARGB",
  Performance: "Water Cooler PCYES Sangue Frio 240mm ARGB",
  Extremo: "Water Cooler PCYES Sangue Frio 360mm ARGB",
};

const PERIPHERALS_BY_PERSONA: Record<Persona, string> = {
  gamer: "Kit Gamer PCYES — Teclado Mecânico + Mouse RGB + Headset + Mousepad",
  creator: "Kit PCYES — Teclado + Mouse sem fio + Mousepad",
  daily: "Kit PCYES — Teclado + Mouse USB + Mousepad",
};

const PERSONA_LABEL: Record<Persona, string> = {
  gamer: "Gamer",
  creator: "Creator",
  daily: "Office",
};

/**
 * Tier interno → rótulo de vitrine.
 *
 * O tier do seed governa peça (placa-mãe, cooler); o rótulo governa navegação —
 * é a tag que o megamenu de PC Gamer usa para recortar a listagem, e "Performance"
 * não é palavra que o comprador procura. Um vira o outro aqui.
 */
const TIER_TAG: Record<Tier, string> = {
  Entrada: "Entrada",
  Performance: "Intermediário",
  Extremo: "Avançado",
};

function brl(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/* IDs altos e isolados: catálogo real vai até ~509; os sintéticos de carrinho
   do builder começam em 900000. 90000+ não colide com nenhum dos dois. */
const SETUP_ID_BASE = 90000;

function buildComponents(seed: SetupSeed): SetupComponent[] {
  const c = (slot: string, model: string): SetupComponent => ({ slot, model, description: SLOT_COPY[slot] });
  return [
    c("Processador", seed.specs.cpu),
    c("Placa de Vídeo", seed.specs.gpu),
    c("Memória RAM", seed.specs.ram),
    c("Armazenamento", seed.specs.storage),
    c("Placa-mãe", MOTHERBOARD_BY_TIER[seed.tier]),
    c("Fonte", seed.specs.psu),
    c("Cooler", COOLER_BY_TIER[seed.tier]),
    c("Gabinete", "Gabinete Gamer PCYES Forcefield — vidro temperado e fluxo de ar otimizado"),
    c("Monitor", seed.monitor),
    c("Kit Periféricos", PERIPHERALS_BY_PERSONA[seed.persona]),
  ];
}

const SETUP_SUBCATEGORY = "Setups";

/** Componentes de cada setup, indexados pelo id do produto. */
export const setupComponents: Record<number, SetupComponent[]> = {};

/** Setups como produtos de catálogo. */
export const setupProducts: Product[] = SETUP_SEED.map((seed, i) => {
  const id = SETUP_ID_BASE + i + 1;
  const components = buildComponents(seed);
  setupComponents[id] = components;

  const personaWord = PERSONA_LABEL[seed.persona];
  return {
    id,
    sku: `SETUP-${seed.key.toUpperCase()}`,
    // "Setup" no início do nome faz o nó da taxonomia (headNoun) resolver.
    name: `Setup ${personaWord} ${seed.name}`,
    price: brl(seed.price),
    priceNum: seed.price,
    oldPrice: brl(seed.oldPrice),
    oldPriceNum: seed.oldPrice,
    rating: seed.rating,
    reviews: seed.reviews,
    category: "Computadores",
    subcategory: SETUP_SUBCATEGORY,
    tags: ["Setup", personaWord, TIER_TAG[seed.tier], "Computadores"],
    image: seed.heroImage,
    images: [seed.heroImage],
    badge: seed.badge,
    brand: "PCYES",
    inStock: true,
    active: true,
    description: `${seed.description}\n\n${seed.name} — ${seed.tagline}. Montado e testado pela PCYES, enviado com BIOS e drivers atualizados, cabos organizados e garantia por peça.`,
    specs: [
      { label: "Processador", value: seed.specs.cpu },
      { label: "Placa de Vídeo", value: seed.specs.gpu },
      { label: "Memória", value: seed.specs.ram },
      { label: "Armazenamento", value: seed.specs.storage },
      { label: "Fonte", value: seed.specs.psu },
      { label: "Monitor", value: seed.monitor },
      { label: "Categoria de uso", value: seed.tagline },
    ],
  };
});

const setupIds = new Set(setupProducts.map((p) => p.id));

/** É um setup ("build pronta")? */
/**
 * Id do produto de catálogo a partir da chave do setup ("pulse", "strike"…).
 *
 * O quiz do "Monte seu PC" trabalha com essas chaves e precisa mandar a pessoa
 * direto para a página do setup recomendado. Devolve `undefined` para chave
 * desconhecida, para o chamador decidir o fallback.
 */
export function getSetupProductId(key: string): number | undefined {
  const index = SETUP_SEED.findIndex((seed) => seed.key === key);
  return index === -1 ? undefined : SETUP_ID_BASE + index + 1;
}

/** Rótulos de degrau, na ordem da escada. */
const TIER_LABELS = Object.values(TIER_TAG);

/**
 * Cor de cada degrau — rampa fria → quente, que é como o olho lê "mais
 * potência" sem precisar de legenda.
 *
 * As cores livres são poucas, porque o card já usa: vermelho no selo de
 * desconto, verde no botão Comprar e laranja na pílula de pré-venda. Repetir
 * qualquer uma delas aqui faria dois selos de cor igual e significado
 * diferente no mesmo card.
 */
export const TIER_STYLE: Record<string, { color: string; borderColor: string; background: string }> = {
  Entrada: { color: "#38bdf8", borderColor: "rgba(56,189,248,0.42)", background: "rgba(56,189,248,0.12)" },
  Intermediário: { color: "#a78bfa", borderColor: "rgba(167,139,250,0.42)", background: "rgba(167,139,250,0.12)" },
  Avançado: { color: "#fbbf24", borderColor: "rgba(251,191,36,0.45)", background: "rgba(251,191,36,0.14)" },
};

/**
 * Degrau do setup — "Entrada", "Intermediário" ou "Avançado".
 *
 * Sai das tags porque é lá que o filtro da listagem já lê. Serve para o card
 * dizer o nível sem depender de a pessoa conhecer a linha: "Apex" não informa
 * nada, "Avançado" informa.
 */
export function getSetupTier(product: Pick<Product, "id" | "subcategory" | "tags">): string | undefined {
  if (!isSetupProduct(product)) return undefined;
  return product.tags?.find((tag) => TIER_LABELS.includes(tag));
}

export function isSetupProduct(product: Pick<Product, "id" | "subcategory">): boolean {
  return setupIds.has(product.id) || product.subcategory === SETUP_SUBCATEGORY;
}

export function getSetupComponents(id: number): SetupComponent[] | undefined {
  return setupComponents[id];
}

/* ═══════════════════════════════════════════════════════
   O QUE RODA NESSA MÁQUINA
   ═══════════════════════════════════════════════════════

   Jogo e programa convivem na mesma seção, e a lista aparece inteira em todo
   setup. Nada de "seção de jogos" que some no PC de escritório: quem compra um
   Office também joga à noite, e quem compra um gamer também abre planilha —
   esconder um dos lados só cria dúvida. O que muda por persona é a ORDEM (qual
   aba abre primeiro), nunca o conteúdo.

   O desempenho não é escrito título a título: sai do cruzamento entre o PESO do
   título (lib/gameLibrary) e o TIER do setup. Um jogo novo entra na biblioteca
   com o peso certo e já aparece em todas as builds com número coerente — sem
   tabela paralela para desencontrar. */

import { quizGames, quizPrograms, type QuizGame, type QuizProgram } from "./gameLibrary";

export type WorkloadKind = "game" | "program";

export interface SetupWorkload {
  id: string;
  name: string;
  /** Termos alternativos de busca ("cs2", "cod"). */
  alias?: string[];
  /** Exigência do título — ordena a régua do estado vazio. */
  weight: "light" | "medium" | "heavy";
  kind: WorkloadKind;
  /** Categoria do título: "FPS / Esports", "Edição de Vídeo". */
  tag: string;
  /** Capa (jogo) ou logo (programa). URL externa, pode falhar. */
  image: string;
  /** Cores de marca para o fundo quando a arte é logo/vetor. */
  bg1?: string;
  bg2?: string;
  /** Métrica em destaque: "220 fps", "4K em tempo real". */
  value: string;
  /** Condição do número: "1080p · Ultra", "sem proxy". */
  detail: string;
  /** Rótulo de qualidade para o selo: "Ultra", "Alto", "Não roda bem". */
  quality: string;
  /** false = a máquina não dá conta; a UI mostra apagado, não esconde. */
  supported: boolean;
}

/* FPS por peso do jogo × tier da build, na resolução que o tier entrega. Os
   números são a régua do protótipo: redondos de propósito, para leitura rápida
   e para deixar claro que é estimativa, não benchmark. */
const GAME_FPS: Record<QuizGame["weight"], Record<Tier, number>> = {
  light: { Entrada: 240, Performance: 380, Extremo: 500 },
  medium: { Entrada: 120, Performance: 165, Extremo: 200 },
  heavy: { Entrada: 60, Performance: 90, Extremo: 120 },
};

/* Sem placa dedicada o tier não vale: o Base é "Entrada", mas com UHD 730 não
   entrega nem perto do que uma RTX 4060 entrega na mesma faixa. */
const IGPU_FPS: Record<QuizGame["weight"], number | null> = {
  light: 80,
  medium: 35,
  heavy: null, // null = não roda bem
};

const TIER_TARGET: Record<Tier, { resolution: string; quality: string }> = {
  Entrada: { resolution: "1080p", quality: "Alto" },
  Performance: { resolution: "1440p", quality: "Ultra" },
  Extremo: { resolution: "4K", quality: "Ultra" },
};

/* Programa não tem FPS: tem teto de projeto. Cresce com o tier, e o peso do
   programa decide onde ele começa a pesar. */
const PROGRAM_LEVEL: Record<QuizProgram["weight"], Record<Tier, { value: string; detail: string; quality: string }>> = {
  light: {
    Entrada: { value: "Fluido", detail: "projetos do dia a dia sem espera", quality: "Recomendado" },
    Performance: { value: "Fluido", detail: "vários projetos abertos ao mesmo tempo", quality: "Ideal" },
    Extremo: { value: "Instantâneo", detail: "arquivos grandes sem pensar no peso", quality: "Ideal" },
  },
  heavy: {
    Entrada: { value: "Roda", detail: "projetos leves, exportação mais lenta", quality: "Dá conta" },
    Performance: { value: "Fluido", detail: "projeto pesado em tempo real", quality: "Recomendado" },
    Extremo: { value: "Sem gargalo", detail: "o programa não é mais o limite", quality: "Ideal" },
  },
};

/* Programa pesado depende de GPU: sem placa dedicada, cai um degrau e avisa. */
const IGPU_PROGRAM: Record<QuizProgram["weight"], { value: string; detail: string; quality: string; supported: boolean }> = {
  light: { value: "Fluido", detail: "roda no vídeo integrado", quality: "Dá conta", supported: true },
  heavy: { value: "Limitado", detail: "pede placa de vídeo dedicada", quality: "Não recomendado", supported: false },
};

function gameWorkload(game: QuizGame, tier: Tier, integratedGpu: boolean): SetupWorkload {
  const base = { id: game.id, name: game.name, alias: game.alias, weight: game.weight, kind: "game" as const, tag: game.tag, image: game.cover, bg1: game.bg1, bg2: game.bg2 };
  if (integratedGpu) {
    const fps = IGPU_FPS[game.weight];
    return fps === null
      ? { ...base, value: "Não roda bem", detail: "pede placa de vídeo dedicada", quality: "Não recomendado", supported: false }
      : { ...base, value: `${fps} fps`, detail: "1080p · Baixo", quality: "Baixo", supported: true };
  }
  const target = TIER_TARGET[tier];
  return {
    ...base,
    value: `${GAME_FPS[game.weight][tier]} fps`,
    detail: `${target.resolution} · ${target.quality}`,
    quality: target.quality,
    supported: true,
  };
}

function programWorkload(program: QuizProgram, tier: Tier, integratedGpu: boolean): SetupWorkload {
  const base = {
    id: program.id, name: program.name, alias: program.alias, weight: program.weight, kind: "program" as const, tag: program.category,
    /* Fundo sólido da marca: com bg→fg o card virava um degradê bicolor e o
       logo (que já é colorido) brigava com ele. */
    image: program.logo ?? "", bg1: program.bg, bg2: program.bg,
  };
  const level = integratedGpu ? IGPU_PROGRAM[program.weight] : PROGRAM_LEVEL[program.weight][tier];
  return { ...base, ...level, supported: "supported" in level ? level.supported : true };
}

/* ── Vitrine × catálogo ───────────────────────────────────

   A biblioteca é a MESMA em todo setup — isso é decisão de produto, não
   descuido (ver comentário no topo da seção). O que muda por persona é quem
   aparece primeiro: a página mostra uma vitrine curta e o catálogo completo
   abre no modal.

   A ordem sai de padrões de categoria, não de uma lista de IDs escolhida a
   dedo: título novo entra na gameLibrary e já cai no balde certo das 9 builds,
   sem ninguém revisar nove curadorias. */
const FEATURED_TAGS: Record<Persona, Record<WorkloadKind, RegExp[]>> = {
  gamer: {
    game: [/esports|fps|battle royale|moba|hero shooter/i, /aaa/i, /open world|mmorpg|rpg online/i],
    program: [/stream|live/i, /vídeo|video/i, /foto|design|imagem/i],
  },
  creator: {
    game: [/aaa|open world/i, /rpg|mmorpg/i, /esports|fps/i],
    program: [/vídeo|video|color/i, /motion|3d/i, /foto|imagem|tratamento/i, /ui|vetor|editorial|design/i],
  },
  daily: {
    game: [/esports|fps|moba|battle royale/i, /sandbox|esportes|multiplayer/i, /aaa/i],
    program: [/foto|imagem|design fácil|ui|vetor/i, /dev|código/i, /stream|live/i, /vídeo|video/i],
  },
};

const FEATURED_LIMIT = 6;

/* Declarado aqui, e não junto da busca: a vitrine é montada na carga do módulo
   e leria a constante antes da inicialização se ela ficasse lá embaixo. */
const WEIGHT_ORDER: Record<SetupWorkload["weight"], number> = { light: 0, medium: 1, heavy: 2 };

function rankForPersona(item: SetupWorkload, persona: Persona): number {
  const patterns = FEATURED_TAGS[persona][item.kind];
  const index = patterns.findIndex((pattern) => pattern.test(item.tag));
  return index === -1 ? patterns.length : index;
}

/* Vitrine = o que a máquina entrega de mais relevante para a persona. O que ela
   NÃO aguenta nunca abre a seção: some da vitrine e continua no catálogo, onde
   o "não roda bem" é informação, não vitrine. */
function featuredFor(items: SetupWorkload[], persona: Persona): SetupWorkload[] {
  return [...items]
    .filter((item) => item.supported)
    .sort((a, b) => {
      const rank = rankForPersona(a, persona) - rankForPersona(b, persona);
      if (rank !== 0) return rank;
      return WEIGHT_ORDER[b.weight] - WEIGHT_ORDER[a.weight];
    })
    .slice(0, FEATURED_LIMIT);
}

export interface WorkloadSummary {
  total: number;
  supported: number;
  featured: number;
}

export interface SetupPlaybook {
  games: SetupWorkload[];
  programs: SetupWorkload[];
  /** Aba que abre primeiro — só a ordem muda por persona, nunca o conteúdo. */
  initialTab: WorkloadKind;
  /** O recorte que a página mostra inline; o resto vive no catálogo. */
  featured: Record<WorkloadKind, SetupWorkload[]>;
  /** Números do rodapé da vitrine ("mais 22 medidos"). */
  summary: Record<WorkloadKind, WorkloadSummary>;
}

const playbookById: Record<number, SetupPlaybook> = {};
SETUP_SEED.forEach((seed, i) => {
  const integratedGpu = /integrad/i.test(seed.specs.gpu);
  const games = quizGames.map((game) => gameWorkload(game, seed.tier, integratedGpu));
  const programs = quizPrograms.map((program) => programWorkload(program, seed.tier, integratedGpu));
  const featuredGames = featuredFor(games, seed.persona);
  const featuredPrograms = featuredFor(programs, seed.persona);
  const summaryOf = (items: SetupWorkload[], featured: SetupWorkload[]): WorkloadSummary => ({
    total: items.length,
    supported: items.filter((item) => item.supported).length,
    featured: featured.length,
  });

  playbookById[SETUP_ID_BASE + i + 1] = {
    games,
    programs,
    initialTab: seed.persona === "gamer" ? "game" : "program",
    featured: { game: featuredGames, program: featuredPrograms },
    summary: { game: summaryOf(games, featuredGames), program: summaryOf(programs, featuredPrograms) },
  };
});

/** Jogos e programas do setup, com o desempenho já calculado. */
export function getSetupPlaybook(id: number): SetupPlaybook | undefined {
  return playbookById[id];
}

/* ── Busca dentro do "o que roda" ──────────────────────────

   Busca local sobre o que está MEDIDO: nome, apelido e categoria. Não existe
   estimativa para título fora da biblioteca — inventar um número seria pior
   que dizer que não temos. Quando nada casa, a UI usa `getHeaviestSupported`
   como régua: mostrando o mais pesado que a máquina aguenta, o comprador
   conclui sozinho sobre o jogo que procurou. */

function normalizeTerm(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function matchesWorkloadSearch(item: SetupWorkload, query: string): boolean {
  const term = normalizeTerm(query);
  if (!term) return true;
  const words = term.split(" ").filter(Boolean);
  const haystack = [item.name, item.tag, ...(item.alias ?? [])].map(normalizeTerm);
  /* Todas as palavras digitadas precisam caber no MESMO campo. Casar nos dois
     sentidos (campo dentro do termo) dava falso positivo com apelido curto:
     "flight simulator" contém "fl", e o FL Studio aparecia como resposta. */
  return haystack.some((value) => words.every((word) => value.includes(word)));
}

/** Os títulos mais exigentes que a máquina ainda entrega — a régua do vazio. */
export function getHeaviestSupported(items: SetupWorkload[], limit = 3): SetupWorkload[] {
  return items
    .filter((item) => item.supported)
    .sort((a, b) => WEIGHT_ORDER[b.weight] - WEIGHT_ORDER[a.weight])
    .slice(0, limit);
}

/* ── Veredito agrupado ────────────────────────────────────

   O veredito sai de peso × tier, então num Extremo quase todo programa cai no
   mesmo balde: a tela repetia "Instantâneo · arquivos grandes sem pensar no
   peso" sete vezes seguidas e o dado virava enchimento. Agrupado, a frase
   aparece uma vez e leva a contagem junto — mesma informação, lida como dado.

   A ordem dos grupos segue a primeira aparição na biblioteca, não uma régua de
   qualidade: título novo não reordena a tela de quem já conhece a página. */
export interface WorkloadGroup {
  value: string;
  detail: string;
  quality: string;
  supported: boolean;
  items: SetupWorkload[];
}

export function groupWorkloadsByVerdict(items: SetupWorkload[]): WorkloadGroup[] {
  const groups: WorkloadGroup[] = [];
  const byVerdict = new Map<string, WorkloadGroup>();

  items.forEach((item) => {
    const key = `${item.value}|${item.detail}`;
    let group = byVerdict.get(key);
    if (!group) {
      group = { value: item.value, detail: item.detail, quality: item.quality, supported: item.supported, items: [] };
      byVerdict.set(key, group);
      groups.push(group);
    }
    group.items.push(item);
  });

  return groups;
}

/* ═══════════════════════════════════════════════════════
   ARGUMENTO DE VENDA DO SETUP
   ═══════════════════════════════════════════════════════

   A descrição da página respondia "o que vem na caixa" — pergunta que a ficha
   e a sidebar de configuração já respondiam, cada uma do seu jeito. Três listas
   iguais na mesma página e nenhuma respondendo o que decide a compra: para quem
   serve, o que muda no dia a dia e por que esta build e não a vizinha.

   A copy abaixo é por PERSONA e por TIER, não por SKU: o modelo específico
   entra por interpolação. Build nova herda o texto certo sem ninguém escrever
   nada — mesma ideia do SLOT_COPY dos componentes. */

export interface SetupHighlight {
  slot: string;
  model: string;
  benefit: string;
}

export interface SetupNeighbor {
  id: number;
  name: string;
  /** URL canônica do setup vizinho. */
  url: string;
  price: string;
  /** Diferença de preço em relação ao setup atual, já formatada. */
  priceDiff: string;
  /** O que se ganha (ou se abre mão) ao trocar. */
  gain: string;
  /** Arte da build — a comparação precisa MOSTRAR a máquina, não citá-la. */
  image: string;
  /** Direção do degrau, para a UI ordenar e rotular sem reinterpretar preço. */
  direction: "up" | "down";
  /** Resolução-alvo do tier vizinho ("1440p"). */
  resolution: string;
  /** Specs que mudam de verdade entre os dois — comparação lado a lado. */
  specs: { cpu: string; gpu: string; ram: string };
}

export interface SetupPitch {
  audience: { title: string; text: string };
  highlights: SetupHighlight[];
  /** A própria máquina no mesmo formato do vizinho — para comparar lado a lado. */
  self: { name: string; image: string; resolution: string; specs: { cpu: string; gpu: string; ram: string } };
  /** Degrau acima na mesma linha, quando existe. */
  upgrade?: SetupNeighbor;
  /** Degrau abaixo — para quem quer gastar menos sem sair da linha. */
  downgrade?: SetupNeighbor;
}

const AUDIENCE_COPY: Record<Persona, Record<Tier, { title: string; text: string }>> = {
  gamer: {
    Entrada: {
      title: "Pra quem está entrando no competitivo",
      text: "Se o seu jogo é CS2, Valorant ou Fortnite e o que importa é FPS alto em 1080p, essa é a porta de entrada honesta: taxa de quadros acima do que o monitor de 165Hz pede, sem pagar por potência que o competitivo não usa.",
    },
    Performance: {
      title: "Pra quem joga sério e ainda transmite",
      text: "O ponto de equilíbrio do gamer brasileiro: AAA em 1440p com tudo no alto, competitivo passando de 300fps e sobra de CPU para transmitir na mesma máquina, sem escolher entre jogar bem e aparecer bem.",
    },
    Extremo: {
      title: "Pra quem não quer teto",
      text: "4K com ray tracing ligado, competitivo em taxa que só monitor de 240Hz acompanha e folga para os lançamentos dos próximos anos. É a build de quem não quer voltar a essa decisão tão cedo.",
    },
  },
  creator: {
    Entrada: {
      title: "Pra quem começou a viver de criar",
      text: "Photoshop com arquivo grande, Lightroom com catálogo cheio e edição em 1080p sem proxy. O monitor vem com cobertura de cor de verdade — o que você aprova na tela é o que sai no cliente.",
    },
    Performance: {
      title: "Pra quem entrega vídeo todo dia",
      text: "Timeline 4K rodando em tempo real, After Effects sem espera a cada preview e RAM suficiente para não fechar o navegador antes de renderizar. É a máquina de quem tem prazo, não hobby.",
    },
    Extremo: {
      title: "Pra quem o computador não pode ser o gargalo",
      text: "8K sem proxy, render 3D pesado e IA generativa rodando local, sem depender de nuvem nem de fila. Quando o prazo é curto, o tempo de máquina é dinheiro — essa build compra tempo.",
    },
  },
  daily: {
    Entrada: {
      title: "Pra estudar, trabalhar e assistir",
      text: "Aquele PC honesto: liga rápido, aguenta trinta abas com a reunião aberta e ainda roda os competitivos leves à noite. Sem gastar com potência que o dia a dia não cobra.",
    },
    Performance: {
      title: "Pra quem usa pesado sem ser gamer nem editor",
      text: "Planilha de um milhão de linhas, dois monitores, reunião e navegador cheio — tudo ao mesmo tempo, sem o sistema recorrer ao disco. E com placa dedicada, os jogos vêm de brinde.",
    },
    Extremo: {
      title: "Pra quem nunca fecha nada",
      text: "Três monitores, ambiente de desenvolvimento pesado, máquinas virtuais e edição casual convivendo sem disputa. É excesso proposital: a máquina nunca é o motivo da espera.",
    },
  },
};

/* Benefício por PERSONA, slot e tier: o que a peça FAZ, não o que ela é. A ficha
   e a sidebar já dizem o modelo; aqui ele vira consequência prática.

   Indexar só por tier fazia a build "Office" vender RAM com cena 3D e timeline
   8K — texto de creator num PC de planilha. A chave é a mesma do AUDIENCE_COPY:
   quem é o comprador vem antes de quanto ele gastou. */
const BENEFIT_COPY: Record<Persona, Record<string, Record<Tier, string>>> = {
  gamer: {
    "Placa de Vídeo": {
      Entrada: "Segura 1080p com folga: passa de 200fps nos competitivos e roda os AAA no alto, no ritmo que um monitor de 165Hz pede.",
      Performance: "Feita para 1440p: AAA no ultra com ray tracing ligado e competitivo acima de 300fps, sobrando quadro para transmitir.",
      Extremo: "4K com ray tracing sem baixar preset, e competitivo numa taxa que só monitor de 240Hz consegue acompanhar.",
    },
    Processador: {
      Entrada: "Núcleos suficientes para o jogo não esperar a CPU: nada de engasgo enquanto o Discord, o navegador e a live rodam no fundo.",
      Performance: "Jogar e gravar ao mesmo tempo sem uma coisa roubar fps da outra — sobra processador para o encoder da live.",
      Extremo: "Nenhum jogo esbarra na CPU: simulador pesado e mundo aberto com muita IA ficam limitados só pelo que a placa entrega.",
    },
    "Memória RAM": {
      Entrada: "O bastante para jogo e navegador cheio conviverem: o sistema para de recorrer ao disco, que é o que causa aquele travamento seco.",
      Performance: "Jogo, Discord, navegador e OBS abertos juntos sem o sistema começar a paginar no meio da partida.",
      Extremo: "Sobra para o jogo, a live e tudo que ficou aberto atrás — inclusive mods pesados e cache de shader de mundo aberto.",
    },
    Armazenamento: {
      Entrada: "SSD NVMe do sistema aos jogos: liga em segundos e o mapa carrega antes do pessoal do lobby.",
      Performance: "Espaço e velocidade juntos: biblioteca grande instalada sem escolher o que apagar para caber o lançamento da semana.",
      Extremo: "Biblioteca inteira instalada e ainda sobra espaço: mundo aberto com textura 4K carrega sem tela de espera.",
    },
  },
  creator: {
    Processador: {
      Entrada: "Dá conta de preview e exportação sem virar gargalo: edição em 1080p corre sem proxy e o render sai enquanto você segue trabalhando.",
      Performance: "Timeline 4K rodando em tempo real e exportação que cabe no intervalo do café, não no fim do expediente.",
      Extremo: "Todos os núcleos trabalhando: render, compilação e simulação que levavam café inteiro passam a caber num intervalo curto.",
    },
    "Memória RAM": {
      Entrada: "Catálogo do Lightroom e camadas do Photoshop cabem na memória — some o travamento ao pular de uma foto para outra.",
      Performance: "Projeto grande, pasta de referências e navegador cheio ao mesmo tempo: nada de fechar o After para abrir o Chrome.",
      Extremo: "Capacidade de estação de trabalho: cenas 3D, timelines 8K e modelos de IA cabem na memória em vez de irem para o disco.",
    },
    "Placa de Vídeo": {
      Entrada: "Acelera o que a CPU faria devagar: preview com efeito aplicado, exportação por GPU e visualizador 3D respondendo na hora.",
      Performance: "Efeito e color grading em tempo real, com exportação por GPU que corta o tempo de entrega pela metade.",
      Extremo: "Render 3D, IA generativa local e color em 8K sem fila — a placa deixa de ser o motivo do prazo.",
    },
    Armazenamento: {
      Entrada: "Projeto ativo no NVMe: importar cartão e abrir arquivo bruto sem esperar cópia terminar.",
      Performance: "Espaço para os projetos do mês inteiro no disco rápido, sem revezar HD externo no meio do trabalho.",
      Extremo: "Leitura de projeto pesado sem espera: arquivos grandes abrem direto, sem etapa de cópia para outro disco.",
    },
  },
  daily: {
    "Memória RAM": {
      Entrada: "Trinta abas, a reunião aberta e a planilha do trabalho convivendo sem o sistema recorrer ao disco.",
      Performance: "Dois monitores cheios, videochamada e planilha grande ao mesmo tempo, sem fechar nada antes de abrir o resto.",
      Extremo: "Nunca mais fechar nada: máquinas virtuais, dezenas de abas e o editor aberto o dia inteiro, tudo na memória.",
    },
    Processador: {
      Entrada: "Liga rápido e responde na hora no que o dia a dia cobra: navegador, pacote de escritório e chamada de vídeo ao mesmo tempo.",
      Performance: "Planilha de um milhão de linhas recalcula sem congelar, e a chamada de vídeo continua fluida enquanto isso.",
      Extremo: "Compilar, subir container e continuar usando a máquina no mesmo instante — a espera sai do fluxo de trabalho.",
    },
    Armazenamento: {
      Entrada: "SSD NVMe no sistema: liga em segundos e abrir arquivo grande deixa de ser pausa para o café.",
      Performance: "Espaço para o arquivo de trabalho inteiro no disco rápido, com backup local ainda sobrando.",
      Extremo: "NVMe para o que está em uso e HD grande para o histórico: nada precisa sair do computador para caber.",
    },
    "Placa de Vídeo": {
      Entrada: "O vídeo integrado dá conta do dia a dia: navegador, escritório e vídeo em Full HD sem placa dedicada no orçamento.",
      Performance: "Placa dedicada que o dia a dia não exige, mas agradece: três monitores, vídeo 4K e os jogos vêm de brinde.",
      Extremo: "Sobra de GPU para monitor extra, edição casual e IA local — a placa nunca é o motivo da lentidão.",
    },
  },
};

/* Ordem dos destaques: a peça que mais decide a compra vem primeiro. */
const HIGHLIGHT_ORDER: Record<Persona, string[]> = {
  gamer: ["Placa de Vídeo", "Processador", "Memória RAM"],
  creator: ["Processador", "Memória RAM", "Placa de Vídeo"],
  daily: ["Memória RAM", "Processador", "Armazenamento"],
};

const TIER_STEP: Record<Tier, number> = { Entrada: 0, Performance: 1, Extremo: 2 };

function neighborGain(from: Tier, to: Tier): string {
  const target = TIER_TARGET[to];
  const current = TIER_TARGET[from];
  return TIER_STEP[to] > TIER_STEP[from]
    ? `sobe de ${current.resolution} para ${target.resolution}, com mais folga para os próximos anos`
    : `entrega ${target.resolution} em vez de ${current.resolution} — menos máquina, menos preço`;
}

const pitchById: Record<number, SetupPitch> = {};
SETUP_SEED.forEach((seed, i) => {
  const id = SETUP_ID_BASE + i + 1;
  const components = setupComponents[id] ?? [];
  const modelBySlot = new Map(components.map((c) => [c.slot, c.model]));

  const highlights = HIGHLIGHT_ORDER[seed.persona]
    .map((slot) => {
      const model = modelBySlot.get(slot);
      const benefit = BENEFIT_COPY[seed.persona]?.[slot]?.[seed.tier];
      return model && benefit ? { slot, model, benefit } : null;
    })
    .filter((h): h is SetupHighlight => Boolean(h));

  /* Vizinho = mesma persona, degrau de tier ao lado. É a comparação que o
     comprador faz de qualquer jeito; melhor fazê-la na própria página, com o
     ganho explícito, do que deixá-lo abrir três abas para descobrir. */
  const sameLine = SETUP_SEED.map((candidate, index) => ({ candidate, index }))
    .filter(({ candidate }) => candidate.persona === seed.persona);

  const toNeighbor = (index: number): SetupNeighbor | undefined => {
    const target = SETUP_SEED[index];
    const targetId = SETUP_ID_BASE + index + 1;
    const product = setupProducts.find((p) => p.id === targetId);
    if (!product) return undefined;
    const diff = target.price - seed.price;
    return {
      id: targetId,
      name: product.name,
      url: getProductUrl(product),
      price: brl(target.price),
      priceDiff: `${diff > 0 ? "+" : "−"} ${brl(Math.abs(diff))}`,
      gain: neighborGain(seed.tier, target.tier),
      image: target.heroImage,
      direction: TIER_STEP[target.tier] > TIER_STEP[seed.tier] ? "up" : "down",
      resolution: TIER_TARGET[target.tier].resolution,
      specs: { cpu: target.specs.cpu, gpu: target.specs.gpu, ram: target.specs.ram },
    };
  };

  const up = sameLine.find(({ candidate }) => TIER_STEP[candidate.tier] === TIER_STEP[seed.tier] + 1);
  const down = sameLine.find(({ candidate }) => TIER_STEP[candidate.tier] === TIER_STEP[seed.tier] - 1);

  pitchById[id] = {
    audience: AUDIENCE_COPY[seed.persona][seed.tier],
    highlights,
    self: {
      name: `Setup ${PERSONA_LABEL[seed.persona]} ${seed.name}`,
      image: seed.heroImage,
      resolution: TIER_TARGET[seed.tier].resolution,
      specs: { cpu: seed.specs.cpu, gpu: seed.specs.gpu, ram: seed.specs.ram },
    },
    upgrade: up ? toNeighbor(up.index) : undefined,
    downgrade: down ? toNeighbor(down.index) : undefined,
  };
});

/** Argumento de venda do setup: para quem é, o que cada peça faz, vizinhos. */
export function getSetupPitch(id: number): SetupPitch | undefined {
  return pitchById[id];
}

/* ═══════════════════════════════════════════════════════
   A HISTÓRIA DO SETUP — seções editoriais
   ═══════════════════════════════════════════════════════

   Vídeo, cenas de uso, montagem, caixa, ruído, upgrade, garantia e FAQ. É o
   conteúdo que uma build pronta precisa contar e que ficha nenhuma conta: quem
   monta, o que acontece antes de enviar, como é conviver com a máquina.

   Vale a mesma disciplina do resto do arquivo: nada aqui é escrito por SKU. A
   copy é indexada por PERSONA e TIER, e o modelo específico entra por
   interpolação. Build nova herda a história inteira sem ninguém redigir nada.

   DADO VIVO: nenhuma destas seções carrega preço, estoque ou nome de outro
   produto — são texto e número de engenharia, seguros para viver num CMS block
   (ver docs/magento/setup-pdp-blocos.md). Se um dia entrar prazo de entrega
   real ou preço aqui, esse campo tem que virar consulta em runtime.
*/

const steamHero = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_hero.jpg`;

export interface SetupScene {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  metric: { value: string; label: string };
}

export interface SetupStory {
  video: {
    /** Protótipo: um vídeo só para todas as builds. */
    youtubeId: string;
    eyebrow: string;
    title: string;
    text: string;
    duration: string;
    stats: Array<{ value: string; label: string }>;
  };
  scenes: SetupScene[];
  assembly: Array<{ title: string; text: string }>;
  /** `slot` é o que permite puxar a foto real do catálogo (ver lib/setupImages). */
  box: Array<{ label: string; item: string; slot?: string }>;
  acoustics: {
    idle: string;
    load: string;
    cpuTemp: string;
    gpuTemp: string;
    cooler: string;
    note: string;
  };
  /** O que ainda cabe dentro — vira esquema desenhado, não lista de card. */
  expansion: {
    note: string;
    slots: Array<{ label: string; used: number; total: number; hint: string }>;
    /** Folga da fonte em watts: consumo típico × capacidade instalada. */
    power: { draw: number; psu: number; label: string };
  };
  /** Selo de montagem: o que a bancada assinou antes de fechar a caixa. */
  certificate: { by: string; checks: string[]; warranty: string; note: string };
  faq: Array<{ q: string; a: string }>;
}

const STORY_VIDEO_ID = "_Rab98LsIlw";

const VIDEO_COPY: Record<Persona, { eyebrow: string; title: string; text: string }> = {
  gamer: {
    eyebrow: "// VEJA RODANDO",
    title: "Sem gráfico de barrinha: a máquina jogando",
    text: "Gravamos a build de fábrica, sem overclock e sem tuning de driver, na mesma configuração que sai da nossa bancada. O contador de fps fica na tela o tempo todo — inclusive nas quedas.",
  },
  creator: {
    eyebrow: "// VEJA RODANDO",
    title: "O tempo que você economiza, medido no relógio",
    text: "Timeline real, projeto real, cronômetro na tela. Import, preview com efeito e export — o que a máquina faz enquanto você continua trabalhando, sem corte de edição escondendo espera.",
  },
  daily: {
    eyebrow: "// VEJA RODANDO",
    title: "Trinta abas, três telas e nada travando",
    text: "Rodamos o dia inteiro de trabalho em uma sessão só: reunião aberta, planilha pesada, ambiente de desenvolvimento e o navegador que ninguém fecha. Sem reiniciar entre os testes.",
  },
};

/* A cena é a persona em situação: o que a pessoa faz na máquina, com o número
   que prova. A arte é o hero do próprio título — larga, cinematográfica. */
const SCENE_COPY: Record<Persona, Array<Omit<SetupScene, "metric"> & { metric: Record<Tier, { value: string; label: string }> }>> = {
  gamer: [
    {
      eyebrow: "AAA no talo",
      title: "O jogo bonito, do jeito que ele foi feito para ser visto",
      text: "Ray tracing ligado, textura no máximo e nada de escolher entre bonito e jogável. A máquina segura o preset alto na resolução do monitor que vem junto — não numa resolução conveniente para o print da caixa.",
      image: steamHero(1091500),
      metric: {
        Entrada: { value: "60 fps", label: "1080p · Alto, ray tracing leve" },
        Performance: { value: "90 fps", label: "1440p · Ultra com ray tracing" },
        Extremo: { value: "120 fps", label: "4K · Ultra com ray tracing" },
      },
    },
    {
      eyebrow: "Competitivo",
      title: "Quadro sobrando para o monitor pedir arrego",
      text: "No esports o que decide é consistência, não pico. A CPU foi escolhida para o 1% low não cair no meio da troca de tiro — e ainda sobra processador para Discord, navegador e a live rodando atrás.",
      image: steamHero(730),
      metric: {
        Entrada: { value: "240 fps", label: "1080p · monitor de 165Hz saturado" },
        Performance: { value: "380 fps", label: "1440p · sobra para stream" },
        Extremo: { value: "500 fps", label: "4K · taxa de monitor 240Hz" },
      },
    },
  ],
  creator: [
    {
      eyebrow: "Edição",
      title: "Timeline correndo enquanto o export roda atrás",
      text: "Preview em tempo real com efeito aplicado, sem proxy e sem esperar cache. O export sai em segundo plano e você continua cortando — a máquina não pede exclusividade para trabalhar.",
      image: steamHero(1174180),
      metric: {
        Entrada: { value: "1080p", label: "preview em tempo real, sem proxy" },
        Performance: { value: "4K", label: "timeline em tempo real com efeito" },
        Extremo: { value: "8K", label: "sem proxy, com color aplicado" },
      },
    },
    {
      eyebrow: "3D e IA",
      title: "Render local, sem fila e sem nuvem",
      text: "Cena pesada, viewport respondendo enquanto você move a câmera, e modelo de IA rodando na sua máquina — sem assinatura por minuto de GPU e sem mandar material de cliente para fora.",
      image: steamHero(1245620),
      metric: {
        Entrada: { value: "Viewport fluida", label: "cena média, render por CPU" },
        Performance: { value: "Render por GPU", label: "cena pesada sem travar a viewport" },
        Extremo: { value: "IA local", label: "modelo grande na memória da placa" },
      },
    },
  ],
  daily: [
    {
      eyebrow: "Multitarefa",
      title: "Nada precisa fechar para outra coisa abrir",
      text: "Reunião de vídeo, planilha grande recalculando, ambiente de desenvolvimento e o navegador de trinta abas — tudo ao mesmo tempo. A memória foi dimensionada para o sistema nunca recorrer ao disco.",
      image: steamHero(271590),
      metric: {
        Entrada: { value: "30 abas", label: "com a reunião aberta" },
        Performance: { value: "2 monitores", label: "planilha e chamada sem engasgo" },
        Extremo: { value: "3 monitores", label: "com máquinas virtuais rodando" },
      },
    },
    {
      eyebrow: "Fim de expediente",
      title: "E à noite ela vira a máquina de jogar",
      text: "Máquina de trabalho não precisa ser sem graça. A mesma configuração que aguenta seu dia roda o que você quiser à noite — sem gambiarra, sem trocar de perfil, sem desligar nada.",
      image: steamHero(1172470),
      metric: {
        Entrada: { value: "Esports", label: "1080p com folga" },
        Performance: { value: "AAA em 1440p", label: "no alto, sem ajuste" },
        Extremo: { value: "AAA em 4K", label: "no ultra, sem pensar" },
      },
    },
  ],
};

/* Montagem e teste: o processo é o mesmo em toda build — é o que diferencia
   comprar pronto de comprar peça solta. Global de propósito. */
const ASSEMBLY: Array<{ title: string; text: string }> = [
  {
    title: "Bancada, não esteira",
    text: "Cada máquina é montada por uma pessoa, com pasta térmica aplicada na mão e fluxo de ar conferido peça a peça. Nada de linha automatizada apertando parafuso no escuro.",
  },
  {
    title: "Cabos organizados por trás",
    text: "Cabo passa pelo lado escondido do gabinete, com abraçadeira e folga certa. Você abre a tampa daqui a dois anos para trocar uma peça e não encontra um ninho.",
  },
  {
    title: "24 horas de estresse",
    text: "CPU e placa de vídeo em carga máxima por um dia inteiro, com leitura de temperatura e estabilidade registrada. Máquina que oscila não sai daqui.",
  },
  {
    title: "Sistema pronto para usar",
    text: "BIOS atualizada, perfil de memória ativado, drivers instalados e a máquina testada ligando do zero. Você tira da caixa, liga na tomada e já está no ambiente de trabalho.",
  },
];

const ACOUSTICS_BY_TIER: Record<Tier, SetupStory["acoustics"]> = {
  Entrada: {
    idle: "22 dB", load: "34 dB", cpuTemp: "62 °C", gpuTemp: "68 °C",
    cooler: "Air cooler 120mm ARGB",
    note: "Em repouso, mais silenciosa que uma conversa em voz baixa. Em carga, o que se ouve é o fluxo do gabinete, não o assobio da placa.",
  },
  Performance: {
    idle: "20 dB", load: "36 dB", cpuTemp: "58 °C", gpuTemp: "66 °C",
    cooler: "Water cooler 240mm ARGB",
    note: "O water cooler troca rotação por área de radiador: mesmo em partida longa o ventilador não precisa gritar para segurar a temperatura.",
  },
  Extremo: {
    idle: "19 dB", load: "38 dB", cpuTemp: "56 °C", gpuTemp: "64 °C",
    cooler: "Water cooler 360mm ARGB",
    note: "Três ventoinhas grandes girando devagar fazem menos barulho que duas pequenas girando rápido — e é por isso que a máquina mais potente da linha é também a mais silenciosa parada.",
  },
};

const EXPANSION_BY_TIER: Record<Tier, SetupStory["expansion"]> = {
  Entrada: {
    note: "Ela sai completa, mas não sai cheia: metade da placa-mãe continua livre para o dia em que você quiser mais.",
    slots: [
      { label: "Bancos de memória", used: 1, total: 4, hint: "sobe para 64GB sem descartar o pente que veio" },
      { label: "Slots M.2 NVMe", used: 1, total: 2, hint: "segundo SSD entra sem tirar o primeiro" },
      { label: "Baias de 2,5\"", used: 0, total: 2, hint: "para HD ou SSD de arquivo" },
      { label: "Slots PCIe livres", used: 1, total: 3, hint: "captura, rede ou placa de som" },
    ],
    power: { draw: 260, psu: 550, label: "fonte com folga para uma placa de vídeo maior" },
  },
  Performance: {
    note: "A base foi dimensionada acima do que a build atual pede — a próxima geração cabe sem trocar fonte nem gabinete.",
    slots: [
      { label: "Bancos de memória", used: 2, total: 4, hint: "até 128GB em DDR5" },
      { label: "Slots M.2 NVMe", used: 1, total: 3, hint: "separa sistema, projeto e arquivo" },
      { label: "Baias de 2,5\"", used: 0, total: 2, hint: "para backup local" },
      { label: "Slots PCIe livres", used: 1, total: 3, hint: "espaço para placa de captura" },
    ],
    power: { draw: 420, psu: 850, label: "metade da fonte ainda sobrando em carga máxima" },
  },
  Extremo: {
    note: "Nasce com folga em tudo: o upgrade daqui a dois anos é encaixar peça, não refazer a máquina.",
    slots: [
      { label: "Bancos de memória", used: 2, total: 4, hint: "até 192GB sem trocar o que veio" },
      { label: "Slots M.2 NVMe", used: 1, total: 4, hint: "PCIe 5.0 pronto para o que ainda vai lançar" },
      { label: "Baias de 3,5\"", used: 1, total: 4, hint: "arquivo cresce sem sair da máquina" },
      { label: "Slots PCIe livres", used: 1, total: 3, hint: "PCIe 5.0 na primeira, captura nas outras" },
    ],
    power: { draw: 520, psu: 1000, label: "quase o dobro do consumo típico, pronto para a próxima placa" },
  },
};

const CERTIFICATE: SetupStory["certificate"] = {
  by: "Bancada PCYES · Unidade Contagem/MG",
  checks: [
    "Pasta térmica aplicada e conferida",
    "Perfil de memória (XMP/EXPO) ativo",
    "BIOS e drivers atualizados",
    "24h de estresse em CPU e GPU",
    "Temperatura registrada sob carga",
    "Boot do zero validado antes de embalar",
  ],
  warranty: "Garantia por peça, intermediada pela PCYES",
  note: "Abrir, limpar e fazer upgrade não cancela nada. Máquina pronta não é caixa lacrada — é sua.",
};

const FAQ_BASE: Array<{ q: string; a: string }> = [
  {
    q: "Vem com Windows instalado?",
    a: "A máquina sai testada com o sistema instalado e drivers atualizados. A licença é ativada por você no primeiro acesso, com a chave enviada junto do pedido.",
  },
  {
    q: "Posso trocar uma peça antes do envio?",
    a: "Pode. Fale com a gente antes de fechar o pedido: trocas dentro da mesma família (mais memória, SSD maior, outra placa da linha) são feitas na bancada, sem virar outro produto.",
  },
  {
    q: "Abrir o gabinete cancela a garantia?",
    a: "Não. Você pode abrir, limpar e fazer upgrade. A garantia de cada peça segue a do fabricante e a intermediação continua sendo nossa.",
  },
  {
    q: "Vem com monitor e periféricos mesmo?",
    a: "Vem. Monitor, teclado, mouse e mousepad acompanham a build — é uma caixa só, e o que você tira dela já é o setup montado.",
  },
  {
    q: "Como ela chega?",
    a: "Embalada com o gabinete preso por espuma moldada e as peças pesadas travadas por dentro. Se chegar com qualquer avaria de transporte, a troca é nossa responsabilidade.",
  },
];

const FAQ_BY_PERSONA: Record<Persona, Array<{ q: string; a: string }>> = {
  gamer: [{
    q: "Os fps do anúncio são de qual configuração?",
    a: "Da configuração de fábrica, sem overclock, na resolução do monitor que acompanha. É a mesma máquina que você recebe — não uma bancada de teste com peça diferente.",
  }],
  creator: [{
    q: "Dá para usar dois monitores de referência de cor?",
    a: "Dá. A placa suporta múltiplas saídas em resolução alta, e o monitor que acompanha já vem com perfil de cor calibrado de fábrica.",
  }],
  daily: [{
    q: "Ela aguenta ficar ligada o dia inteiro?",
    a: "Foi montada para isso: fonte com selo de eficiência, refrigeração dimensionada acima do necessário e teste de 24 horas em carga antes de sair.",
  }],
};

const storyById: Record<number, SetupStory> = {};
SETUP_SEED.forEach((seed, i) => {
  const id = SETUP_ID_BASE + i + 1;
  const target = TIER_TARGET[seed.tier];
  const components = setupComponents[id] ?? [];
  const bySlot = new Map(components.map((c) => [c.slot, c.model]));

  storyById[id] = {
    video: {
      youtubeId: STORY_VIDEO_ID,
      ...VIDEO_COPY[seed.persona],
      duration: "4 min",
      stats: [
        { value: target.resolution, label: "resolução do monitor que vem junto" },
        { value: seed.specs.gpu.replace(/^GeForce\s+/, ""), label: "placa de vídeo de fábrica" },
        { value: "24 h", label: "de teste em carga antes de enviar" },
      ],
    },
    scenes: SCENE_COPY[seed.persona].map((scene) => ({ ...scene, metric: scene.metric[seed.tier] })),
    assembly: ASSEMBLY,
    box: [
      { label: "Gabinete montado", item: bySlot.get("Gabinete") ?? "Gabinete PCYES", slot: "Gabinete" },
      { label: "Monitor", item: seed.monitor, slot: "Monitor" },
      { label: "Kit de periféricos", item: bySlot.get("Kit Periféricos") ?? "Kit PCYES", slot: "Kit Periféricos" },
      { label: "Refrigeração", item: bySlot.get("Cooler") ?? ACOUSTICS_BY_TIER[seed.tier].cooler, slot: "Cooler" },
      { label: "Armazenamento", item: seed.specs.storage, slot: "Armazenamento" },
      { label: "Cabos, parafusos e documentação", item: "Cabo de força, HDMI/DP, parafusos sobressalentes e termo de garantia" },
    ],
    acoustics: ACOUSTICS_BY_TIER[seed.tier],
    expansion: EXPANSION_BY_TIER[seed.tier],
    certificate: CERTIFICATE,
    faq: [...FAQ_BY_PERSONA[seed.persona], ...FAQ_BASE],
  };
});

/** Seções editoriais do setup: vídeo, cenas de uso, montagem, caixa, FAQ. */
export function getSetupStory(id: number): SetupStory | undefined {
  return storyById[id];
}
