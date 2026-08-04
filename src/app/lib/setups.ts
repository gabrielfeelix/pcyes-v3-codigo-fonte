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

export interface SetupPlaybook {
  games: SetupWorkload[];
  programs: SetupWorkload[];
  /** Aba que abre primeiro — só a ordem muda por persona, nunca o conteúdo. */
  initialTab: WorkloadKind;
}

const playbookById: Record<number, SetupPlaybook> = {};
SETUP_SEED.forEach((seed, i) => {
  const integratedGpu = /integrad/i.test(seed.specs.gpu);
  playbookById[SETUP_ID_BASE + i + 1] = {
    games: quizGames.map((game) => gameWorkload(game, seed.tier, integratedGpu)),
    programs: quizPrograms.map((program) => programWorkload(program, seed.tier, integratedGpu)),
    initialTab: seed.persona === "gamer" ? "game" : "program",
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

const WEIGHT_ORDER: Record<SetupWorkload["weight"], number> = { light: 0, medium: 1, heavy: 2 };

/** Os títulos mais exigentes que a máquina ainda entrega — a régua do vazio. */
export function getHeaviestSupported(items: SetupWorkload[], limit = 3): SetupWorkload[] {
  return items
    .filter((item) => item.supported)
    .sort((a, b) => WEIGHT_ORDER[b.weight] - WEIGHT_ORDER[a.weight])
    .slice(0, limit);
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
}

export interface SetupPitch {
  audience: { title: string; text: string };
  highlights: SetupHighlight[];
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

/* Benefício por slot e tier: o que a peça FAZ, não o que ela é. A ficha e a
   sidebar já dizem o modelo; aqui ele vira consequência prática. */
const BENEFIT_COPY: Record<string, Record<Tier, string>> = {
  "Placa de Vídeo": {
    Entrada: "Segura 1080p com folga: passa de 200fps nos competitivos e roda os AAA no alto, no ritmo que um monitor de 165Hz pede.",
    Performance: "Feita para 1440p: AAA no ultra com ray tracing ligado e competitivo acima de 300fps, sobrando quadro para transmitir.",
    Extremo: "Topo de linha sem asterisco: 4K com path tracing, IA local e render por GPU — o que hoje é exagero, daqui a três anos ainda é confortável.",
  },
  Processador: {
    Entrada: "Núcleos suficientes para o jogo não esperar a CPU: nada de engasgo enquanto o Discord, o navegador e a live rodam no fundo.",
    Performance: "Multitarefa pesada sem revezamento: jogar, gravar e converter ao mesmo tempo sem que uma coisa roube desempenho da outra.",
    Extremo: "Todos os núcleos trabalhando: render, compilação e simulação que levavam café inteiro passam a caber num intervalo curto.",
  },
  "Memória RAM": {
    Entrada: "O bastante para jogo e navegador cheio conviverem: o sistema para de recorrer ao disco, que é o que causa aquele travamento seco.",
    Performance: "Espaço para abrir tudo sem pensar: projeto grande, dezenas de abas e o jogo aberto, ao mesmo tempo.",
    Extremo: "Capacidade de estação de trabalho: cenas 3D, timelines 8K e modelos de IA cabem na memória em vez de irem para o disco.",
  },
  Armazenamento: {
    Entrada: "SSD NVMe do sistema aos jogos: liga em segundos e o mapa carrega antes do pessoal do lobby.",
    Performance: "Espaço e velocidade juntos: biblioteca grande instalada sem escolher o que apagar para caber o lançamento da semana.",
    Extremo: "Leitura de projeto pesado sem espera: arquivos grandes abrem direto, sem etapa de cópia para outro disco.",
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
      const benefit = BENEFIT_COPY[slot]?.[seed.tier];
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
    };
  };

  const up = sameLine.find(({ candidate }) => TIER_STEP[candidate.tier] === TIER_STEP[seed.tier] + 1);
  const down = sameLine.find(({ candidate }) => TIER_STEP[candidate.tier] === TIER_STEP[seed.tier] - 1);

  pitchById[id] = {
    audience: AUDIENCE_COPY[seed.persona][seed.tier],
    highlights,
    upgrade: up ? toNeighbor(up.index) : undefined,
    downgrade: down ? toNeighbor(down.index) : undefined,
  };
});

/** Argumento de venda do setup: para quem é, o que cada peça faz, vizinhos. */
export function getSetupPitch(id: number): SetupPitch | undefined {
  return pitchById[id];
}
