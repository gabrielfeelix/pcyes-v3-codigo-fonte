import { TAXONOMY } from "./taxonomy";
import { getCategorySlug } from "./slug";

/**
 * Vitrines por USO — "PC Gamer", "Workstation".
 *
 * Não são nós da taxonomia, e a diferença importa. A taxonomia classifica o
 * produto (um setup É um Setup, e só pode estar num nó); a vitrine RECORTA o
 * catálogo por para-quem-serve, e o mesmo produto pode aparecer em mais de uma.
 * Se "PC Gamer" virasse nó, roubaria os setups gamer de Computadores › Setups e
 * a página de Setups ficaria com o resto — que é o oposto do que se quer.
 *
 * Cada vitrine tem URL própria (/computadores/pc-gamer/) porque é página de
 * intenção de busca: quem digita "pc gamer" não digita "setup". URL própria dá
 * título, descrição, canonical e entrada no sitemap — coisas que uma listagem
 * filtrada por querystring não tem (aquela sai `noindex`, e deve mesmo sair).
 *
 * O recorte é por TAG do produto, em interseção: `["Gamer"]` casa todo produto
 * com a tag Gamer. Publicar uma vitrine nova é acrescentar um item aqui — o
 * sitemap, o prerender e a listagem leem desta lista.
 */
export interface Showcase {
  /** Último segmento da URL: /computadores/{slug}/ */
  slug: string;
  /** Nome curto, usado no breadcrumb. */
  label: string;
  /** Categoria que a hospeda (primeiro segmento da URL). */
  category: string;
  /** Tags que o produto precisa ter TODAS para entrar na vitrine. */
  tags: string[];
  /** H1 da página. */
  h1: string;
  /** Parágrafo sob o H1. */
  intro: string;
  /** `<title>` (sem o sufixo da marca, aplicado por quem renderiza). */
  seoTitle: string;
  seoDescription: string;
}

export const SHOWCASES: Showcase[] = [
  {
    slug: "pc-gamer",
    label: "PC Gamer",
    category: "Computadores",
    tags: ["Gamer"],
    h1: "PC Gamer montado e testado",
    intro:
      "Máquinas prontas para jogar, montadas e testadas pela PCYES. Cada uma mostra na própria página quantos FPS entrega nos jogos que você joga — do esports competitivo ao 4K com ray tracing.",
    seoTitle: "PC Gamer Montado — Setups Prontos para Jogar",
    seoDescription:
      "PC gamer montado e testado pela PCYES: do 1080p competitivo ao 4K com ray tracing. FPS por jogo na página de cada setup, garantia por peça e frete grátis acima de R$ 299.",
  },
  {
    slug: "workstation",
    label: "Workstation",
    category: "Computadores",
    tags: ["Creator"],
    h1: "Workstation para quem cria",
    intro:
      "Computadores de trabalho pesado: edição de vídeo, design, render 3D e IA local. Memória de alta capacidade, armazenamento rápido e monitor com cobertura de cor de verdade.",
    seoTitle: "Workstation PCYES — PC para Edição, 3D e Design",
    seoDescription:
      "Workstation PCYES para edição de vídeo 4K/8K, render 3D, design e IA local. Montada, testada e com desempenho declarado por programa. Frete grátis acima de R$ 299.",
  },
];

/** Caminho canônico da vitrine. */
export function getShowcasePath(showcase: Showcase): string {
  return `/${getCategorySlug(showcase.category)}/${showcase.slug}/`;
}

/** Vitrine a partir dos segmentos da URL (rótulo OU slug da categoria). */
export function getShowcase(category: string, slug: string): Showcase | undefined {
  const wanted = slug.toLowerCase();
  return SHOWCASES.find(
    (showcase) =>
      showcase.slug === wanted &&
      (showcase.category === category || getCategorySlug(showcase.category) === category),
  );
}

/** O produto entra nesta vitrine? Precisa de TODAS as tags declaradas. */
export function matchesShowcase(showcase: Showcase, product: { tags?: string[] }): boolean {
  const tags = product.tags ?? [];
  return showcase.tags.every((tag) => tags.includes(tag));
}

/* Slug de vitrine não pode colidir com nó da taxonomia: as duas coisas moram no
   mesmo lugar da URL (/categoria/{slug}/) e a colisão faria uma esconder a
   outra silenciosamente. Falha no import, que é build-time. */
const taxonomySlugs = new Set(TAXONOMY.map((node) => node.slug));
for (const showcase of SHOWCASES) {
  if (taxonomySlugs.has(showcase.slug)) {
    throw new Error(
      `[showcases] slug "${showcase.slug}" já é um nó da taxonomia — escolha outro nome para a vitrine.`,
    );
  }
}
