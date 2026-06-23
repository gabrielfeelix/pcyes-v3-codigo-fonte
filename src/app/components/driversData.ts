import { allProducts, type Product } from "./productsData";

/* ═══════════════════════════════════════════════════════
   DRIVERS & MANUAIS — mock catalog
   Products that plausibly ship downloadable drivers/firmware
   and a printable manual. Generated deterministically from
   the real product catalog so slugs/models stay stable.
   ═══════════════════════════════════════════════════════ */

export interface DriverFile {
  format: "ZIP" | "PDF" | "EXE";
  sizeLabel: string;
  /** ISO yyyy-mm-dd */
  updatedAt: string;
}

export interface DriverEntry {
  slug: string;
  productId: number;
  name: string;
  category: string;
  model: string;
  image: string;
  shortDescription: string;
  driver: DriverFile;
  manual: DriverFile;
}

/* ── Keywords that flag a product as needing drivers/firmware ── */
const DRIVER_KEYWORDS = [
  "mouse",
  "teclado",
  "keyboard",
  "headset",
  "fone",
  "controle",
  "volante",
  "webcam",
  "placa de captura",
  "placa de vídeo",
  "placa de video",
  "controlador",
  "fan",
  "microfone",
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function kebabCase(value: string) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/* ── Deterministic pseudo-random from a seed (no Math.random) ── */
function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/* ── File-size label, kept inside the requested ranges ── */
function sizeLabel(seed: number, minKb: number, maxKb: number) {
  const span = maxKb - minKb;
  const kb = Math.round(minKb + seeded(seed) * span);
  return `${kb} KB`;
}

/* ── Spread updates across recent 2026 dates ── */
const UPDATE_DATES = [
  "2026-01-09",
  "2026-01-23",
  "2026-02-04",
  "2026-02-18",
  "2026-03-02",
  "2026-03-14",
  "2026-03-27",
  "2026-04-08",
  "2026-04-21",
  "2026-05-05",
];

function pickDate(seed: number) {
  return UPDATE_DATES[Math.floor(seeded(seed) * UPDATE_DATES.length) % UPDATE_DATES.length];
}

/* ── One-line description per product family ── */
function buildShortDescription(product: Product) {
  const name = normalize(product.name);
  if (name.includes("mouse")) {
    return "Pacote de software para configurar DPI, macros e iluminação RGB do mouse.";
  }
  if (name.includes("teclado") || name.includes("keyboard")) {
    return "Driver para personalizar perfis, teclas de macro e efeitos de iluminação do teclado.";
  }
  if (name.includes("headset") || name.includes("fone")) {
    return "Software de áudio com equalização, surround virtual e ajuste de microfone.";
  }
  if (name.includes("controle")) {
    return "Firmware e utilitário de calibração para o controle.";
  }
  if (name.includes("volante")) {
    return "Driver de force feedback e calibração de pedais para o volante.";
  }
  if (name.includes("webcam")) {
    return "Driver de captura e painel de ajuste de imagem para a webcam.";
  }
  if (name.includes("captura")) {
    return "Driver e software de gravação para a placa de captura.";
  }
  if (name.includes("placa de video") || name.includes("placa de vídeo")) {
    return "Driver gráfico atualizado para máximo desempenho e estabilidade.";
  }
  if (name.includes("microfone")) {
    return "Painel de controle de ganho e monitoramento para o microfone.";
  }
  if (name.includes("fan") || name.includes("controlador")) {
    return "Software de controle de curvas de ventilação e sincronização de LED.";
  }
  return "Driver e manual oficiais para instalação e configuração do produto.";
}

function isDriverCandidate(product: Product) {
  const haystack = normalize(`${product.name} ${product.category} ${product.subcategory ?? ""}`);
  return DRIVER_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

/* ── Pick ~18-24 distinct candidate products, deduped by name ── */
function buildEntries(): DriverEntry[] {
  const seen = new Set<string>();
  const candidates: Product[] = [];

  for (const product of allProducts) {
    if (candidates.length >= 24) break;
    if (!isDriverCandidate(product)) continue;
    const key = normalize(product.name);
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(product);
  }

  return candidates.map((product, index) => {
    const seed = product.id + index * 17 + 3;
    const slug = product.seoSlug && product.seoSlug.length > 0 ? product.seoSlug : kebabCase(product.name);
    const model = product.sku ?? `PCY-${String(1000 + product.id).slice(-4)}`;

    const driver: DriverFile = {
      format: "ZIP",
      sizeLabel: sizeLabel(seed, 300, 900),
      updatedAt: pickDate(seed),
    };
    const manual: DriverFile = {
      format: "PDF",
      sizeLabel: sizeLabel(seed + 91, 150, 600),
      updatedAt: pickDate(seed + 91),
    };

    return {
      slug,
      productId: product.id,
      name: product.name,
      category: product.category,
      model,
      image: product.image,
      shortDescription: buildShortDescription(product),
      driver,
      manual,
    };
  });
}

export const driverEntries: DriverEntry[] = buildEntries();

export function getDriverBySlug(slug: string): DriverEntry | undefined {
  return driverEntries.find((entry) => entry.slug === slug);
}

export const driverCategories: string[] = Array.from(
  new Set(driverEntries.map((entry) => entry.category)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));
