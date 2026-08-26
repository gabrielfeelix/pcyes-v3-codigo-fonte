import type { Product } from "../components/productsData";
import type { CartItem } from "../components/CartContext";
import { allProducts } from "../components/productsData";
import { formatBRL, parseBRL } from "../../utils/format";

/**
 * Campanha de brinde do carrinho.
 *
 * Antes existia uma constante só (`GIFT_THRESHOLD = 1500`) e a regra era
 * implícita: subtotal >= limite. Aqui a meta vira dado tipado, porque as três
 * campanhas que a loja roda não são a mesma conta:
 *
 * - `subtotal`  — gasta R$ X. Grandeza CONTÍNUA: a UI é barra.
 * - `distinct`  — leve N produtos DIFERENTES. Grandeza DISCRETA: a UI é vaga.
 * - `eligible`  — leve N diferentes de uma lista fechada. Vaga + vitrine.
 *
 * `distinct` conta produto distinto, não unidade: três do mesmo mouse valem
 * uma vaga. É por isso que a UI discreta mostra QUAL item ocupou a vaga — sem
 * isso, quem sobe o stepper de 1 para 3 espera o progresso andar e ele não
 * anda.
 */

export type GiftGoal =
  | { kind: "subtotal"; target: number }
  | { kind: "distinct"; target: number }
  | { kind: "eligible"; target: number; productIds: number[] };

export interface GiftCampaign {
  id: string;
  /** Frase da campanha, usada quando o brinde ainda não foi liberado. */
  headline: string;
  /** Como chamar os elegíveis no botão que leva à listagem: "periféricos". */
  catalogNoun?: string;
  goal: GiftGoal;
  /** Um id = brinde entra direto no carrinho; dois ou mais = modal de escolha. */
  giftIds: number[];
}

/** Vaga da meta discreta: vazia, ou preenchida pelo item que a ocupou. */
export type GiftSlot = { filled: false } | { filled: true; item: CartItem };

export interface GiftProgress {
  campaign: GiftCampaign;
  unlocked: boolean;
  /** 0..1. Só a barra contínua desenha isso; a UI de vagas ignora. */
  ratio: number;
  /** "Faltam R$ 300,20" / "Falta 1 produto diferente" / "Meta batida". */
  remainingLabel: string;
  /** `null` na meta de subtotal — lá o progresso não tem casas. */
  slots: GiftSlot[] | null;
  /** Elegíveis que ainda NÃO estão no carrinho. `null` fora da meta `eligible`. */
  missing: Product[] | null;
  /** Produtos que podem ser escolhidos como brinde. */
  gifts: Product[];
}

const byId = (id: number) => allProducts.find((p) => p.id === id);

/* Lista fechada montada por subcategoria em vez de ids digitados um a um.
   Uma campanha real de periféricos tem mais de cem peças elegíveis; digitar
   essa lista no arquivo seria mentira de protótipo, e o número é justamente o
   que faz a vitrine ter de ser amostra. No Magento isto vem da condição da
   regra de carrinho — aqui o catálogo é estático, então se deriva dele. */
const idsBySubcategory = (subcategories: string[]) => {
  const wanted = new Set(subcategories);
  return allProducts
    .filter((p) => p.subcategory && wanted.has(p.subcategory) && p.active !== false)
    .map((p) => p.id);
};
const resolve = (ids: number[]) => ids.map(byId).filter((p): p is Product => Boolean(p));

/**
 * As três campanhas do protótipo. Só uma roda por vez — `campaignStore` diz
 * qual, e o padrão é a de valor, que é a que já estava no ar.
 */
export const GIFT_CAMPAIGNS: Record<string, GiftCampaign> = {
  valor: {
    id: "valor",
    headline: "Gaste R$ 1.500 e ganhe um brinde",
    goal: { kind: "subtotal", target: 1500 },
    giftIds: [296, 27, 322],
  },
  qtd: {
    id: "qtd",
    headline: "Leve 3 produtos diferentes e ganhe um brinde",
    goal: { kind: "distinct", target: 3 },
    giftIds: [296, 27, 322],
  },
  itens: {
    id: "itens",
    // "destes" apontaria para as fotos na tela, mas a vitrine é AMOSTRA: a
    // campanha pode ter 138 elegíveis e mostrar 6. A contagem real mora no
    // botão que leva à listagem.
    headline: "Leve 3 periféricos da campanha e ganhe um brinde",
    catalogNoun: "periféricos",
    goal: {
      kind: "eligible",
      target: 3,
      productIds: idsBySubcategory([
        "Mouse",
        "Mouse Pad",
        "Mousepad",
        "Teclado Mecânico",
        "Teclado",
        "Kit Teclado e Mouse",
        "Headset",
        "Fone Gamer",
        "Apoio de Pulso",
      ]),
    },
    giftIds: [296],
  },
};

/**
 * Qual campanha está no ar.
 *
 * Protótipo: a escolha é um store vivo, não uma leitura de URL feita uma vez.
 * O motivo é o carrinho — ele vive só em memória, então recarregar a página
 * para trocar de campanha esvaziava a cesta e não dava para ver a campanha
 * agindo sobre nada. Com store, o seletor troca a regra na hora e o carrinho
 * fica de pé.
 *
 * Continua aceitando `?brinde=valor|qtd|itens` na URL, e a escolha persiste em
 * `sessionStorage` para sobreviver ao F5. Em produção nada disto existe: a
 * campanha vem da regra de carrinho do Magento.
 */

export const DEFAULT_CAMPAIGN_ID = "valor";

const STORAGE_KEY = "pcyes-brinde";

function initialId(): string {
  if (typeof window === "undefined") return DEFAULT_CAMPAIGN_ID;
  const fromUrl = new URLSearchParams(window.location.search).get("brinde");
  if (fromUrl && GIFT_CAMPAIGNS[fromUrl]) {
    window.sessionStorage.setItem(STORAGE_KEY, fromUrl);
    return fromUrl;
  }
  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  return stored && GIFT_CAMPAIGNS[stored] ? stored : DEFAULT_CAMPAIGN_ID;
}

let currentId = initialId();
const listeners = new Set<() => void>();

export const campaignStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => currentId,
  set(id: string) {
    if (!GIFT_CAMPAIGNS[id] || id === currentId) return;
    currentId = id;
    if (typeof window !== "undefined") window.sessionStorage.setItem(STORAGE_KEY, id);
    listeners.forEach((listener) => listener());
  },
};

export const campaignById = (id: string): GiftCampaign | null => GIFT_CAMPAIGNS[id] ?? null;

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** Calcula o progresso da campanha contra os itens PAGOS do carrinho. */
export function computeGiftProgress(campaign: GiftCampaign, paidItems: CartItem[]): GiftProgress {
  const gifts = resolve(campaign.giftIds);
  const base = { campaign, gifts };

  if (campaign.goal.kind === "subtotal") {
    const { target } = campaign.goal;
    const subtotal = paidItems.reduce((sum, i) => sum + parseBRL(i.price) * i.quantity, 0);
    const missingValue = Math.max(0, target - subtotal);
    return {
      ...base,
      unlocked: subtotal >= target,
      ratio: Math.min(1, target > 0 ? subtotal / target : 1),
      remainingLabel:
        missingValue > 0 ? `Faltam ${formatBRL(missingValue)} para ganhar um brinde` : "Você liberou um brinde",
      slots: null,
      missing: null,
    };
  }

  const { target } = campaign.goal;
  const eligibleIds = campaign.goal.kind === "eligible" ? campaign.goal.productIds : null;

  // Um item por vaga, na ordem em que entrou no carrinho. Quantidade não conta:
  // o que preenche vaga é ser um produto que ainda não estava lá.
  const counted = paidItems.filter((item) => !eligibleIds || eligibleIds.includes(item.id));
  const seen = new Set<number>();
  const occupants: CartItem[] = [];
  for (const item of counted) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    occupants.push(item);
  }

  const slots: GiftSlot[] = Array.from({ length: target }, (_, i) => {
    const item = occupants[i];
    return item ? { filled: true, item } : { filled: false };
  });

  const filled = Math.min(occupants.length, target);
  const left = target - filled;

  /* Elegíveis que faltam, do mais barato para o mais caro. A vitrine mostra só
     o começo desta lista: no momento de fechar uma meta, o que serve é a peça
     que a fecha gastando menos — ordenar por popularidade otimizaria outra
     coisa. */
  const missing =
    eligibleIds !== null
      ? resolve(eligibleIds)
          .filter((product) => !seen.has(product.id))
          .sort((a, b) => a.priceNum - b.priceNum)
      : null;

  const noun = eligibleIds
    ? plural(left, "peça", "peças")
    : plural(left, "produto", "produtos");
  const verb = plural(left, "Falta", "Faltam");

  return {
    ...base,
    unlocked: filled >= target,
    ratio: target > 0 ? filled / target : 1,
    remainingLabel:
      left > 0
        ? `${verb} ${left} ${noun}${eligibleIds ? " da campanha" : " diferente" + (left === 1 ? "" : "s")}`
        : "Você liberou um brinde",
    slots,
    missing,
  };
}
