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
  /* Duas campanhas de "itens específicos" que parecem uma só e não são:
     - `categoria` — qualquer peça de um recorte grande (3 periféricos). A lista
       tem centenas de itens: mostrá-los é impossível, então a régua serve, e o
       que muda em relação à de quantidade é só qual produto conta.
     - `produtos`  — SKUs nomeados (leve ESTE headset e ESTE teclado). A lista é
       curta e é a informação principal: sem ver quais são, a pessoa não tem
       como cumprir. Aí a régua sobra e a lista vira o progresso. */
  | { kind: "eligible"; target: number; scope: "categoria" | "produtos"; productIds: number[] };

export interface GiftCampaign {
  id: string;
  /** Frase da campanha, usada quando o brinde ainda não foi liberado. */
  headline: string;
  /** Como chamar os elegíveis: "periféricos". Vira o rótulo da meta na régua. */
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
  /** `null` fora da meta `eligible` com escopo `produtos`. */
  slots: GiftSlot[] | null;
  /** Quanto já foi cumprido e o total da meta, para as metas contáveis. */
  counted: { done: number; target: number } | null;
  /** Rótulo do fim da régua: "R$ 1.500" / "3 produtos" / "3 periféricos". */
  goalLabel: string;
  /** Os produtos exigidos, na campanha de SKUs nomeados. */
  required: { product: Product; inCart: boolean }[] | null;
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
  categoria: {
    id: "categoria",
    headline: "Leve 3 periféricos e ganhe um brinde",
    catalogNoun: "periféricos",
    goal: {
      kind: "eligible",
      scope: "categoria",
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
  itens: {
    id: "itens",
    // Aqui "destes" aponta mesmo para as fotos na tela: são três SKUs
    // nomeados, e a lista cabe inteira.
    headline: "Leve estes 3 produtos e ganhe um brinde",
    catalogNoun: "produtos",
    goal: {
      kind: "eligible",
      scope: "produtos",
      target: 3,
      productIds: [333, 173, 72],
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
    const left = Math.max(0, target - subtotal);
    return {
      ...base,
      unlocked: subtotal >= target,
      ratio: Math.min(1, target > 0 ? subtotal / target : 1),
      remainingLabel:
        left > 0 ? `Faltam ${formatBRL(left)} para ganhar um brinde` : "Você liberou um brinde",
      slots: null,
      counted: null,
      goalLabel: formatBRL(target),
      missing: null,
      required: null,
    };
  }

  const { target } = campaign.goal;
  const eligibleIds = campaign.goal.kind === "eligible" ? campaign.goal.productIds : null;
  const scope = campaign.goal.kind === "eligible" ? campaign.goal.scope : null;

  /* Conta PRODUTO DIFERENTE, não unidade: três do mesmo mouse valem um. */
  const seen = new Set<number>();
  const occupants: CartItem[] = [];
  for (const item of paidItems) {
    if (eligibleIds && !eligibleIds.includes(item.id)) continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    occupants.push(item);
  }

  const done = Math.min(occupants.length, target);
  const left = target - done;
  const unlocked = done >= target;

  const noun = campaign.catalogNoun ?? "produtos";
  const singular = noun.replace(/s$/, "");
  const goalLabel = `${target} ${noun}`;

  /* Campanha de SKUs nomeados: a lista É o progresso. Sem ver quais são, não
     há como cumprir — então não existe régua aqui, existe checklist. */
  const required =
    scope === "produtos"
      ? resolve(eligibleIds ?? []).map((product) => ({ product, inCart: seen.has(product.id) }))
      : null;

  const slots: GiftSlot[] | null = null;

  const missing =
    scope === "categoria"
      ? resolve(eligibleIds ?? [])
          .filter((product) => !seen.has(product.id))
          .sort((a, b) => a.priceNum - b.priceNum)
      : null;

  const remainingLabel = unlocked
    ? "Você liberou um brinde"
    : scope === "produtos"
      ? `${plural(left, "Falta", "Faltam")} ${left} ${plural(left, "produto", "produtos")} da lista`
      : eligibleIds
        ? `${plural(left, "Falta", "Faltam")} ${left} ${plural(left, singular, noun)} para ganhar um brinde`
        : `${plural(left, "Falta", "Faltam")} ${left} ${plural(left, "produto diferente", "produtos diferentes")} para ganhar um brinde`;

  return {
    ...base,
    unlocked,
    ratio: target > 0 ? done / target : 1,
    remainingLabel,
    slots,
    counted: { done, target },
    goalLabel,
    missing,
    required,
  };
}
