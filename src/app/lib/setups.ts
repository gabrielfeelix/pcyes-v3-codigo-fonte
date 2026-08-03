import type { Product } from "../components/productsData";

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
    price: 3499, oldPrice: 3899, rating: 4.7, reviews: 142, heroImage: "/setups/setup-pulse.png", tier: "Entrada",
    specs: { cpu: "Intel Core i5-12400F", gpu: "GeForce RTX 4060", ram: "16GB DDR4 3200MHz", storage: "SSD NVMe 1TB", psu: "550W 80+ Bronze" },
    monitor: "Monitor Gamer PCYES 24\" 165Hz Full HD",
  },
  {
    key: "strike", persona: "gamer", name: "PCYES Strike", tagline: "Gamer · 2K 144Hz · AAA",
    description: "Sweet spot do gamer BR. AAA em 2K com folga, stream sem travar, ranked sério.",
    price: 7499, oldPrice: 8299, rating: 4.9, reviews: 387, badge: "MAIS PEDIDA", heroImage: "/setups/setup-strike.png", tier: "Performance",
    specs: { cpu: "Intel Core i7-12700K", gpu: "GeForce RTX 4070 Super", ram: "32GB DDR5 5600MHz", storage: "SSD NVMe 2TB", psu: "850W 80+ Gold" },
    monitor: "Monitor Gamer PCYES 27\" 2K 165Hz",
  },
  {
    key: "apex", persona: "gamer", name: "PCYES Apex", tagline: "Gamer · 4K alto FPS",
    description: "Topo absoluto pra gaming. 4K com Path Tracing, dual-PC stream, sem comprometer nada.",
    price: 14999, oldPrice: 16499, rating: 5.0, reviews: 89, heroImage: "/setups/setup-apex.png", tier: "Extremo",
    specs: { cpu: "AMD Ryzen 7 7800X3D", gpu: "GeForce RTX 4090", ram: "32GB DDR5 6000MHz", storage: "SSD NVMe 4TB Gen4", psu: "1000W 80+ Gold Full Modular" },
    monitor: "Monitor Gamer PCYES 27\" 4K 144Hz",
  },
  {
    key: "sketch", persona: "creator", name: "PCYES Sketch", tagline: "Creator · Foto + UI design",
    description: "Primeiro passo no design e edição leve. Photoshop, Figma e Lightroom rodam sem suar.",
    price: 4299, oldPrice: 4799, rating: 4.8, reviews: 96, heroImage: "/setups/setup-sketch.png", tier: "Entrada",
    specs: { cpu: "Intel Core i5-12400", gpu: "GeForce RTX 4060", ram: "32GB DDR4 3200MHz", storage: "SSD NVMe 1TB", psu: "550W 80+ Bronze" },
    monitor: "Monitor PCYES 24\" Full HD IPS 100% sRGB",
  },
  {
    key: "render", persona: "creator", name: "PCYES Render", tagline: "Creator · Vídeo 4K + Motion",
    description: "Cavalo de batalha pra editor. Premiere/DaVinci 4K real-time, After Effects sem dor, Blender médio.",
    price: 8999, oldPrice: 9999, rating: 4.9, reviews: 218, heroImage: "/setups/setup-render.png", tier: "Performance",
    specs: { cpu: "AMD Ryzen 7 7700", gpu: "GeForce RTX 4070 Ti", ram: "64GB DDR5 6000MHz", storage: "SSD NVMe 2TB Gen4", psu: "850W 80+ Gold" },
    monitor: "Monitor PCYES 27\" 4K IPS 99% AdobeRGB",
  },
  {
    key: "studio", persona: "creator", name: "PCYES Studio", tagline: "Creator · 8K · 3D · AI",
    description: "Workstation sem teto. 8K + Fusion sem proxy, 3D pesado, IA generativa local.",
    price: 18499, oldPrice: 20499, rating: 5.0, reviews: 47, badge: "WORKSTATION", heroImage: "/setups/setup-studio.png", tier: "Extremo",
    specs: { cpu: "AMD Ryzen 9 7950X", gpu: "GeForce RTX 4090", ram: "128GB DDR5 6400MHz", storage: "SSD NVMe 4TB Gen4 + 8TB HD", psu: "1200W 80+ Platinum" },
    monitor: "Monitor PCYES 32\" 4K IPS 100% AdobeRGB",
  },
  {
    key: "base", persona: "daily", name: "PCYES Base", tagline: "Dia-a-dia · Office + streaming",
    description: "PC honesto pra estudo, trabalho remoto e streaming. Custo-benefício de verdade.",
    price: 2299, oldPrice: 2599, rating: 4.6, reviews: 312, heroImage: "/setups/setup-base.png", tier: "Entrada",
    specs: { cpu: "Intel Core i3-12100F", gpu: "Vídeo integrado UHD 730", ram: "16GB DDR4 3200MHz", storage: "SSD NVMe 480GB", psu: "400W 80+" },
    monitor: "Monitor PCYES 21,5\" Full HD 75Hz",
  },
  {
    key: "hub", persona: "daily", name: "PCYES Hub", tagline: "Dia-a-dia · Multitarefa séria",
    description: "Pra quem usa pesado sem ser gamer/editor pro. 30+ abas, planilhas grandes, dual-monitor 4K.",
    price: 4499, oldPrice: 4999, rating: 4.7, reviews: 198, heroImage: "/setups/setup-hub.png", tier: "Performance",
    specs: { cpu: "Intel Core i5-12400F", gpu: "GeForce RTX 4060", ram: "32GB DDR4 3200MHz", storage: "SSD NVMe 1TB", psu: "550W 80+ Bronze" },
    monitor: "Monitor PCYES 24\" Full HD 75Hz",
  },
  {
    key: "cockpit", persona: "daily", name: "PCYES Cockpit", tagline: "Dia-a-dia · Pesado sem freio",
    description: "Pra quem nunca fecha aba. Triple monitor, dev pesado, edição casual, tudo simultâneo.",
    price: 9999, oldPrice: 10999, rating: 4.9, reviews: 64, heroImage: "/setups/setup-cockpit.png", tier: "Extremo",
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
    tags: ["Setup", personaWord, "Computadores"],
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
