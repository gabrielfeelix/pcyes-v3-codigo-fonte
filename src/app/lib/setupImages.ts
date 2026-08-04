/**
 * Foto real do catálogo por slot de componente.
 *
 * Cada slot aponta para a categoria/subcategoria correspondente e pega a
 * primeira foto utilizável — assim "Placa de Vídeo" mostra uma GPU de verdade
 * da loja, "Monitor" mostra um monitor da loja, e assim por diante.
 *
 * Vive numa lib, e não dentro da ProductPage, porque três blocos de setup
 * precisam da mesma foto (drawer de peças, cards de destaque e a seção "chega
 * tudo junto"). Duplicar o mapa faria a foto divergir entre eles.
 *
 * LIMITE CONHECIDO: a busca é por SLOT, não por modelo — a foto é "uma memória
 * da loja", não o pente exato daquela build. No Magento isso vira a imagem do
 * próprio SKU do componente; aqui o catálogo do protótipo não tem SKU avulso
 * para tudo.
 */

import { allProducts } from "../components/productsData";
import {
  getPrimaryProductImage, getProductCategory, getProductSubcategory, getVisibleCatalogProducts,
} from "../components/productPresentation";

/**
 * Arte de campanha de setup × foto de produto — tratamentos opostos.
 *
 * Foto de produto é recorte sobre fundo transparente: precisa de `contain` e de
 * padding, senão encosta na moldura e sufoca. Arte de setup é uma cena inteira,
 * com fundo próprio e assunto centralizado: `contain` + padding a transforma num
 * selo pequeno flutuando no meio do card, com faixa vazia em volta.
 *
 * Toda arte de setup mora em `/setups/`, então o próprio caminho decide o
 * tratamento — não precisa passar flag por cinco níveis de componente.
 */
export function isSetupArt(src?: string | null): boolean {
  return Boolean(src && src.includes("/setups/setup-"));
}

/**
 * Encaixe da imagem: arte de setup encosta na borda, foto de produto respira.
 *
 * `contain` sem padding, e não `cover`: em quadro que não é quadrado (o card da
 * listagem é 5:6) o `cover` cortava as laterais e comia o logo "PCYES" do canto
 * da arte. Assim ela preenche a largura inteira e, quando a proporção não bate,
 * sobra uma faixa do fundo do card — que é escuro, igual ao fundo da arte.
 */
export function artFitClass(src: string | undefined | null, padding: string): string {
  return isSetupArt(src) ? "object-contain" : `object-contain ${padding}`;
}

/**
 * A mesma build tem três artes, uma por formato de quadro:
 *
 *   `/setups/setup-x.webp`       2048×2048 · 1:1   — palco da PDP, painéis, escada
 *   `/setups/tall/setup-x.webp`  1000×1200 · 5:6   — card de listagem e relacionados
 *   `/setups/wide/setup-x.webp`  1216×760  · 16:10 — miniatura do megamenu
 *
 * O produto guarda só a quadrada; quem desenha um quadro alto ou largo pede a
 * variante aqui. Assim a arte encosta na borda em qualquer proporção, sem corte
 * e sem faixa vazia — e o dado do produto continua com uma imagem só.
 */
export function setupArtVariant(src: string | undefined | null, formato: "tall" | "wide"): string {
  if (!src || !isSetupArt(src)) return src ?? "";
  return src.replace("/setups/setup-", `/setups/${formato}/setup-`);
}

const COMPONENT_IMAGE_QUERY: Record<string, { category?: string; subcategory?: string }> = {
  "Placa de Vídeo": { category: "Placas de Vídeo" },
  "Memória RAM": { subcategory: "Memórias" },
  Armazenamento: { subcategory: "SSDs" },
  "Placa-mãe": { subcategory: "Placas-mãe" },
  Fonte: { category: "Fontes" },
  Cooler: { subcategory: "Water Coolers" },
  Gabinete: { category: "Gabinetes" },
  Monitor: { category: "Monitores" },
  "Kit Periféricos": { subcategory: "Kits Teclado e Mouse" },
};

/* Processador não tem SKU avulso no catálogo, então usamos a caixa do Intel
   Core i5 12ª gen (do oderco) com o FUNDO já removido e servida localmente —
   cai limpa sobre fundo escuro, como as demais. */
const COMPONENT_IMAGE_FALLBACK: Record<string, string> = {
  Processador: "/setups/cpu-intel-i5.png",
};

const componentImageCache = new Map<string, string | null>();

export function getComponentImage(slot: string): string | null {
  if (componentImageCache.has(slot)) return componentImageCache.get(slot)!;
  const query = COMPONENT_IMAGE_QUERY[slot];
  let image: string | null = COMPONENT_IMAGE_FALLBACK[slot] ?? null;
  if (!image && query) {
    const match = getVisibleCatalogProducts(allProducts).find(
      (p) =>
        (!query.category || getProductCategory(p) === query.category) &&
        (!query.subcategory || getProductSubcategory(p) === query.subcategory),
    );
    if (match) image = getPrimaryProductImage(match);
  }
  componentImageCache.set(slot, image);
  return image;
}
