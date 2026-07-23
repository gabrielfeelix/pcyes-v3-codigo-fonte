import { allProducts, type Product } from "./productsData";
import { getCategoryUrl } from "../lib/slug";
import { getTaxonomyNodeBySlug, resolveTaxonomyNode } from "../lib/taxonomy";

export interface CatalogHrefParams {
  category?: string;
  subcategory?: string;
  search?: string;
}

export interface ProductSwatch {
  color: string;
  label: string;
  productId: number;
  image: string;
  name: string;
}

export interface ProductHoverMedia {
  type: "video" | "image";
  src: string;
}

const COLOR_RULES = [
  { keywords: ["black", "preto", "vulcan"], color: "#18181b", label: "Preto" },
  { keywords: ["white", "branco", "ghost"], color: "#f4f4f5", label: "Branco" },
  { keywords: ["red", "vermelho", "magma"], color: "#dc2626", label: "Vermelho" },
  { keywords: ["blue", "azul", "cobalt", "colbat"], color: "#2563eb", label: "Azul" },
  { keywords: ["green", "verde", "mint"], color: "#65a30d", label: "Verde" },
  { keywords: ["purple", "roxo"], color: "#9333ea", label: "Roxo" },
  { keywords: ["yellow", "amarela", "amarelo"], color: "#eab308", label: "Amarelo" },
  { keywords: ["brown", "marrom"], color: "#92400e", label: "Marrom" },
  { keywords: ["pink", "rosa"], color: "#ec4899", label: "Rosa" },
  { keywords: ["silver", "prata"], color: "#a1a1aa", label: "Prata" },
];

const GENERIC_TOKENS = new Set([
  "pcyes",
  "gamer",
  "gaming",
  "ergonomica",
  "ergonômica",
  "vidro",
  "temperado",
  "lateral",
  "pc",
  "yes",
  "mm",
  "rgb",
  "argb",
  "wireless",
  "sem",
  "fio",
  "usb",
  "series",
]);

const hoverVideos: Partial<Record<number, string>> = {};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function includesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

/**
 * Subcategoria canônica do produto — hoje um lookup na taxonomia.
 *
 * Era uma escada de regras sobre o nome com fallback no campo bruto do
 * fornecedor, e é por isso que o catálogo tinha 55 subcategorias, "Memória" e
 * "Memoria" na mesma URL e suporte de monitor classificado como monitor. A
 * decisão de o que é cada coisa mora em `lib/taxonomy`; aqui ficou só a
 * tradução para rótulo.
 */
export function getProductSubcategory(product: Pick<Product, "name" | "category" | "subcategory">) {
  const node = resolveTaxonomyNode(product);
  if (node) return node.label;
  // Sem nó a taxonomia está incompleta — o build acusa (validateTaxonomy).
  // Em runtime, degradar para a categoria é melhor que quebrar a listagem.
  return product.subcategory || product.category || "Produtos";
}

/**
 * Categoria canônica — pode diferir da que veio na planilha.
 *
 * Cabo classificado em "SSD e HD" e microfone em "Streaming/Headsets" são erro
 * de origem, não taxonomia. O nó declara onde a coisa mora, e a URL segue daí.
 */
export function getProductCategory(product: Pick<Product, "name" | "category" | "subcategory">) {
  return resolveTaxonomyNode(product)?.category ?? product.category;
}

/**
 * Slug de subcategoria → rótulo ("cadeiras-gamer" → "Cadeiras Gamer").
 *
 * Aceita slug legado: URL que já existiu continua abrindo a listagem certa,
 * mesmo antes do 301 do CDN responder.
 */
export function getSubcategoryFromSlug(slug: string, _category?: string): string | null {
  if (!slug) return null;
  return getTaxonomyNodeBySlug(slug)?.label ?? null;
}

export function isPlaceholderProductImage(image?: string) {
  if (!image) return true;

  const normalized = image.toLowerCase();
  return (
    normalized.startsWith("/home/") ||
    normalized.includes("category-") ||
    normalized.includes("release-keyboard-context")
  );
}

export function hasUsableProductImage(product: Pick<Product, "image" | "images">) {
  if (!isPlaceholderProductImage(product.image)) return true;
  return Boolean(product.images?.some((image) => !isPlaceholderProductImage(image)));
}

export function getPrimaryProductImage(product: Pick<Product, "image" | "images">) {
  return product.images?.find((image) => !isPlaceholderProductImage(image)) ?? product.image;
}

export function getProductImages(product: Pick<Product, "image" | "images">) {
  const images = product.images?.filter((image) => !isPlaceholderProductImage(image)) ?? [];
  if (!isPlaceholderProductImage(product.image) && !images.includes(product.image)) {
    images.unshift(product.image);
  }
  return images.length > 0 ? images : [product.image];
}

export function getVisibleCatalogProducts(catalog: Product[] = allProducts) {
  return catalog.filter(hasUsableProductImage);
}

/**
 * Disponibilidade do produto — fonte única de verdade para toda a UI.
 *
 *   "in-stock"     → tem unidade, compra liberada
 *   "restocking"   → ativo mas sem estoque: volta, aceita aviso de reposição
 *   "discontinued" → inativo: não volta, sem aviso, oferecer alternativas
 *
 * A distinção importa porque "avise-me quando chegar" só faz sentido se o
 * produto de fato retorna. Prometer aviso de algo descontinuado é mentira.
 */
export type StockStatus = "in-stock" | "restocking" | "discontinued";

export function getStockStatus(
  product: Pick<Product, "inStock" | "active">,
): StockStatus {
  if (product.active === false) return "discontinued";
  if (product.inStock === false) return "restocking";
  return "in-stock";
}

/** Conveniência: o produto pode ser comprado agora? */
export function isPurchasable(product: Pick<Product, "inStock" | "active">) {
  return getStockStatus(product) === "in-stock";
}

/**
 * Catálogo para vitrines (home, carrosséis, "você também pode gostar").
 *
 * Igual a `getVisibleCatalogProducts`, mas remove produtos esgotados
 * (`inStock: false`). A regra é: esgotado nunca é *empurrado* pro usuário —
 * só aparece se ele procurar (busca, filtro, link direto). Por isso a busca e
 * a listagem de catálogo continuam usando `getVisibleCatalogProducts`.
 */
export function getShowcaseProducts(catalog: Product[] = allProducts) {
  return getVisibleCatalogProducts(catalog).filter(isPurchasable);
}

/**
 * Catalog URL builder (A1 stage 3).
 *
 * When a `category` is provided, emits the semantic slug form:
 *   /perifericos/
 *   /perifericos/mouses/
 *   /perifericos/mouses/?search=razer
 *
 * When only `search` (or nothing) is provided, falls back to the
 * legacy /produtos surface — there is no slug for "all products".
 */
export function getCatalogHref({ category, subcategory, search }: CatalogHrefParams) {
  if (category) {
    const path = getCategoryUrl(category, subcategory);
    if (search) {
      const sp = new URLSearchParams();
      sp.set("search", search);
      return `${path}?${sp.toString()}`;
    }
    return path;
  }

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  const query = params.toString();
  return query ? `/produtos?${query}` : "/produtos";
}

function getColorRule(name: string) {
  const normalized = normalizeText(name);
  return COLOR_RULES.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));
}

function tokenizeName(value: string) {
  return normalizeText(value)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function isSwitchContext(tokens: string[], index: number) {
  return tokens[index - 1] === "switch" || tokens[index + 1] === "switch";
}

function getBodyColorLabels(name: string) {
  const tokens = tokenizeName(name);
  const labels = new Set<string>();

  COLOR_RULES.forEach((rule) => {
    tokens.forEach((token, index) => {
      if (!rule.keywords.includes(token)) return;
      if (isSwitchContext(tokens, index)) return;
      labels.add(rule.label);
    });
  });

  return Array.from(labels);
}

export function getProductColorLabels(product: Pick<Product, "name">) {
  return getBodyColorLabels(product.name);
}

function getFamilySignature(product: Pick<Product, "name" | "category">) {
  const normalized = normalizeText(product.name)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => token.length > 2)
    .filter((token) => !GENERIC_TOKENS.has(token))
    .filter((token) => !COLOR_RULES.some((rule) => rule.keywords.includes(token)));

  const familyTokens = normalized.slice(0, 2);
  return `${normalizeText(product.category)}::${familyTokens.join("-")}`;
}

export function findProductBySwatch(swatch: ProductSwatch, catalog: Product[] = allProducts) {
  return catalog.find((product) => product.id === swatch.productId) ?? null;
}

export function getProductSwatches(
  product: Pick<Product, "id" | "name" | "category">,
  catalog: Product[] = allProducts,
): ProductSwatch[] {
  const signature = getFamilySignature(product);
  if (!signature.endsWith("::")) {
    const variants = catalog.filter((candidate) => getFamilySignature(candidate) === signature && hasUsableProductImage(candidate));
    const deduped = new Map<string, ProductSwatch>();

    variants.forEach((variant) => {
      const label = getBodyColorLabels(variant.name)[0];
      const rule = label ? COLOR_RULES.find((item) => item.label === label) : null;
      if (!rule) return;

      deduped.set(rule.label, {
        color: rule.color,
        label: rule.label,
        productId: variant.id,
        image: getPrimaryProductImage(variant),
        name: variant.name,
      });
    });

    if (deduped.size > 1) {
      return Array.from(deduped.values()).slice(0, 6);
    }
  }

  return [];
}

export interface ProductVariant {
  productId: number;
  label: string;
  image: string;
  name: string;
}

/**
 * Variações da mesma linha de produto — irmãos que compartilham a família
 * (`getFamilySignature`) mas se diferenciam por algo que não é cor: tipo de
 * switch, tamanho, conectividade, driver, etc.
 *
 * O rótulo é derivado dos tokens que *só* aquele irmão tem, então a UI mostra
 * exatamente o que muda entre eles ("Blue", "Red", "3,5mm", "Sem Fio") em vez
 * de repetir o nome inteiro. Cor fica com `getProductSwatches`.
 */
export function getProductVariants(
  product: Pick<Product, "id" | "name" | "category">,
  catalog: Product[] = allProducts,
): ProductVariant[] {
  const signature = getFamilySignature(product);
  if (signature.endsWith("::")) return [];

  const siblings = catalog.filter(
    (candidate) =>
      getFamilySignature(candidate) === signature && hasUsableProductImage(candidate),
  );
  if (siblings.length < 2) return [];

  const tokensById = new Map(siblings.map((s) => [s.id, tokenizeName(s.name)]));

  // Tokens presentes em todos os irmãos são o "tronco" comum — não diferenciam.
  const shared = new Set(
    (tokensById.get(siblings[0].id) ?? []).filter((token) =>
      siblings.every((s) => tokensById.get(s.id)?.includes(token)),
    ),
  );

  const variants: ProductVariant[] = [];
  const seen = new Set<string>();

  siblings.forEach((sibling) => {
    const distinct = Array.from(
      new Set(
        (tokensById.get(sibling.id) ?? [])
          .filter((token) => !shared.has(token))
          .filter((token) => !GENERIC_TOKENS.has(token))
          .filter((token) => token.length > 1),
      ),
    );

    if (distinct.length === 0) return;

    const label = distinct
      .slice(0, 2)
      // Códigos de modelo (CM300, P2) ficam em caixa alta; palavras, capitalizadas.
      .map((token) =>
        /\d/.test(token) ? token.toUpperCase() : token.charAt(0).toUpperCase() + token.slice(1),
      )
      .join(" ");

    if (label.length > 22 || seen.has(label)) return;
    seen.add(label);

    variants.push({
      productId: sibling.id,
      label,
      image: getPrimaryProductImage(sibling),
      name: sibling.name,
    });
  });

  return variants.length > 1 ? variants.slice(0, 4) : [];
}

export function getProductHoverMedia(
  product: Pick<Product, "id" | "image" | "images">,
): ProductHoverMedia | null {
  const video = hoverVideos[product.id];
  if (video) {
    return { type: "video", src: video };
  }

  if (product.images && product.images.length > 1) {
    return { type: "image", src: product.images[1] };
  }

  return null;
}
