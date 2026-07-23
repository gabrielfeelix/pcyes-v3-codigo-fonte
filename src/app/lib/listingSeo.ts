/**
 * Título e descrição das páginas de listagem — fonte única.
 *
 * Existem dois lugares que precisam desse texto: o HTML cru gerado no build
 * (o que crawler, scraper social e LLM leem antes de qualquer JavaScript) e a
 * SPA em runtime. Antes só a SPA tinha, e genérico: o HTML cru herdava o
 * título institucional do site, então 40 listagens chegavam ao buscador com o
 * mesmo `<title>` — que é a definição de conteúdo duplicado.
 *
 * Escrever nos dois lugares convida divergência: o crawler lê um título, o
 * usuário vê outro. Por isso o texto nasce aqui e os dois consomem.
 *
 * A regra de composição é intenção de busca primeiro, marca depois: quem
 * procura digita "cadeira gamer", não "PCYES cadeira". O sufixo " | PCYES" é
 * aplicado por quem renderiza, não aqui.
 */
import { TAXONOMY } from "./taxonomy";

/** Limites práticos antes do Google truncar no resultado. */
export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 160;

export interface ListingSeoInput {
  category: string;
  subcategoryLabel?: string;
  /** Produtos JÁ visíveis na listagem — contagem e preço saem daqui. */
  products: Array<{ priceNum?: number }>;
}

export interface ListingSeo {
  title: string;
  description: string;
}

function formatBRL(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function trimTo(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export function getListingSeo({ category, subcategoryLabel, products }: ListingSeoInput): ListingSeo {
  const label = subcategoryLabel || category;
  const node = subcategoryLabel
    ? TAXONOMY.find((candidate) => candidate.label === subcategoryLabel && candidate.category === category)
    : undefined;

  const count = products.length;
  const prices = products.map((p) => p.priceNum ?? 0).filter((v) => v > 0);
  const from = prices.length > 0 ? Math.min(...prices) : 0;

  const title = node?.seoTitle ?? label;

  /* Descrição precisa ser ÚNICA por listagem, senão o buscador trata como
     boilerplate e ignora. Contagem e preço inicial vêm do catálogo, então cada
     página descreve o próprio estoque em vez de repetir a mesma frase. */
  const parts: string[] = [];
  if (count > 0) {
    parts.push(
      `${count} ${count === 1 ? "modelo" : "modelos"} de ${label.toLowerCase()} PCYES${from > 0 ? ` a partir de ${formatBRL(from)}` : ""}.`,
    );
  } else {
    parts.push(`${label} PCYES.`);
  }
  parts.push("Garantia oficial, frete grátis acima de R$ 299 e até 12x sem juros.");

  return {
    title: trimTo(title, SEO_TITLE_MAX),
    description: trimTo(node?.seoDescription ?? parts.join(" "), SEO_DESCRIPTION_MAX),
  };
}
