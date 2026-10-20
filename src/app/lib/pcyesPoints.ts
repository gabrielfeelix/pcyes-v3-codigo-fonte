import type { PcyesPointsTx } from "../components/AuthContext";

/**
 * Programa PC Points — escada, regras e contas, em um lugar só.
 *
 * O perfil tinha DUAS escadas de nível que não conversavam: `TIERS` em
 * ProfilePage (Recruta → Lendário, movida por número de pedidos, na Visão
 * geral) e a do módulo do /dev (Comum → Mítico, movida por pontos, na aba de
 * pontos). Duas barras, dois "Lendário", nenhuma resposta sobre qual vale.
 *
 * Ficou uma só, movida por PONTOS ACUMULADOS. O nome é raridade porque é a
 * linguagem que o público já lê sem legenda — e porque ela traz a paleta
 * pronta: cinza, azul, roxo, dourado, vermelho. Nível por pedidos dizia
 * "compre mais vezes"; nível por pontos dá motivo pra juntar, e ponto que só
 * serve de moeda não sustenta programa.
 *
 * Níveis, taxas e tetos de resgate seguem o "Regulamento do Programa de
 * Fidelidade PCYES, versão para o consumidor final", o mesmo da página
 * /pc-points. O regulamento NÃO diz quantos pontos sobem cada nível: o `min`
 * de cada degrau é do protótipo. O primeiro (Indique e Ganhe) vai até 500
 * porque o cadastro rende 500 e já leva a conta para o Comum.
 */

export interface PointsTier {
  id: string;
  name: string;
  /** Pontos ACUMULADOS na vida (não o saldo) para entrar no degrau. */
  min: number;
  /** Cor da raridade: medalhão, régua e halo saem daqui. */
  color: string;
  /** Quanto rende comprando neste degrau, escrito. Sai na lista de regras. */
  rate: string;
  /** O mesmo, em número: pontos por R$ 1,00 em compras. */
  perReal: number;
  /** Teto do pedido que pode ser pago com pontos, em %. Não é desconto automático. */
  cap: number;
  /** O que o degrau entrega ALÉM da taxa, escrito. Hoje só o teto de resgate:
   *  o regulamento não promete outro benefício por nível. */
  perks: string[];
}

export const POINT_TIERS: PointsTier[] = [
  {
    id: "indique",
    name: "Indique e Ganhe",
    min: 0,
    color: "#64748b",
    rate: "1 pt a cada R$ 1",
    perReal: 1,
    cap: 5,
    perks: ["paga até 5% do pedido com pontos"],
  },
  {
    id: "comum",
    name: "Comum",
    min: 500,
    color: "#94a3b8",
    rate: "1,2 pt a cada R$ 1",
    perReal: 1.2,
    cap: 8,
    perks: ["paga até 8% do pedido com pontos"],
  },
  {
    id: "raro",
    name: "Raro",
    min: 1000,
    color: "#38bdf8",
    rate: "1,5 pt a cada R$ 1",
    perReal: 1.5,
    cap: 10,
    perks: ["paga até 10% do pedido com pontos"],
  },
  {
    id: "epico",
    name: "Épico",
    min: 5000,
    color: "#a855f7",
    rate: "2 pts a cada R$ 1",
    perReal: 2,
    cap: 12,
    perks: ["paga até 12% do pedido com pontos"],
  },
  {
    id: "lendario",
    name: "Lendário",
    min: 10000,
    color: "#facc15",
    rate: "2,3 pts a cada R$ 1",
    perReal: 2.3,
    cap: 15,
    perks: ["paga até 15% do pedido com pontos"],
  },
  {
    id: "mitico",
    name: "Mítico",
    min: 20000,
    color: "#e10600",
    rate: "2,5 pts a cada R$ 1",
    perReal: 2.5,
    cap: 20,
    perks: ["paga até 20% do pedido com pontos"],
  },
];

export interface TierProgress {
  current: PointsTier;
  next: PointsTier | null;
  /** 0..1 dentro do degrau atual. */
  ratio: number;
  /** Pontos que faltam para o próximo degrau. */
  toNext: number;
  /** Posição na régua inteira, 0..1 — usada pelo marcador que anda. */
  overall: number;
}

export function getTierProgress(lifetimePoints: number): TierProgress {
  const current = [...POINT_TIERS].reverse().find((t) => lifetimePoints >= t.min) ?? POINT_TIERS[0];
  const next = POINT_TIERS.find((t) => t.min > lifetimePoints) ?? null;
  const ratio = next ? (lifetimePoints - current.min) / (next.min - current.min) : 1;

  /* A régua distribui os degraus em espaço IGUAL, não proporcional aos pontos.
     Proporcional, o salto de 10 mil para 20 mil comeria metade da barra e os
     três primeiros degraus virariam um amontoado ilegível no canto. */
  const index = POINT_TIERS.indexOf(current);
  const step = 1 / (POINT_TIERS.length - 1);
  const overall = Math.min(1, index * step + (next ? ratio * step : 0));

  return { current, next, ratio, toNext: next ? next.min - lifetimePoints : 0, overall };
}

/** Pontos acumulados na vida: soma de tudo que entrou, sem descontar resgates. */
export const lifetimeFrom = (history: PcyesPointsTx[]) =>
  history.filter((tx) => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);

/** 100 pts = R$ 1,00. Mesmo câmbio de `utils/commerce`. */
export const POINTS_PER_BRL = 100;
export const pointsToBRL = (points: number) => points / POINTS_PER_BRL;

export interface EarnRule {
  id: string;
  title: string;
  detail: string;
  /** Quanto rende, já formatado. */
  reward: string;
  /** `true` quando o valor vem do degrau, não da regra. */
  fromTier?: boolean;
  /** Rota que executa a ação. Sem rota, é regra passiva (acontece sozinha). */
  action?: { label: string; to: string };
}

/**
 * Quanto rende avaliar um produto. Vive aqui porque a mesma promessa aparece
 * em três lugares (regra do programa, vazio de avaliações da PDP e o modal de
 * escrever avaliação); com o número solto em cada tela, um dia eles divergem e
 * a loja promete valores diferentes pela mesma ação.
 */
export const REVIEW_POINTS = 250;

/** Regras do regulamento, seção 3. Seguir e curtir são ações de campanha. */
export const EARN_RULES: EarnRule[] = [
  {
    id: "cadastro",
    title: "Criar a conta",
    detail: "Uma vez, ao se cadastrar.",
    reward: "+500 pts",
  },
  {
    id: "compra",
    title: "Comprar",
    detail: "Os pontos entram quando o pedido é entregue.",
    reward: "",
    fromTier: true,
    action: { label: "Ver ofertas", to: "/produtos?promo=1" },
  },
  {
    id: "avaliacao",
    title: "Avaliar o que comprou",
    detail: "Até 3 avaliações por mês, de produtos diferentes.",
    reward: `+${REVIEW_POINTS} pts`,
    action: { label: "Avaliar", to: "/perfil?tab=orders" },
  },
  {
    id: "experiencia",
    title: "Responder a pesquisa da compra",
    detail: "Enviada depois que o pedido chega.",
    reward: "+250 pts",
  },
  {
    id: "redes",
    title: "Seguir a PCYES nas redes",
    detail: "Quando houver campanha ativa.",
    reward: "+100 pts",
  },
  {
    id: "indicacao",
    title: "Indicar um amigo",
    detail: "Quando houver campanha de indicação, você ganha 100 pontos depois da primeira compra do amigo.",
    reward: "+100 pts",
  },
];

/** Prazo de validade dos pontos, em dias. */
export const EXPIRY_DAYS = 365;

/**
 * "Hoje" do protótipo. O catálogo e o histórico são estáticos e datados em
 * 2026 — usar a data real do navegador faria tudo aparecer como vencido.
 */
export const TODAY = new Date(2026, 4, 18);

export const daysUntil = (iso: string) =>
  Math.ceil((new Date(iso).getTime() - TODAY.getTime()) / 86_400_000);

/** Pontos que vencem dentro da janela, agrupados por transação. */
export const expiringSoon = (history: PcyesPointsTx[], withinDays = 60) =>
  history
    .filter((tx) => tx.amount > 0 && tx.expiresAt)
    .map((tx) => ({ tx, days: daysUntil(tx.expiresAt!) }))
    .filter(({ days }) => days > 0 && days <= withinDays)
    .sort((a, b) => a.days - b.days);

/** Link de indicação. No Magento vem do módulo; aqui é derivado do e-mail. */
export const referralCode = (email: string) =>
  email.split("@")[0].replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase() || "PCYES";

export const referralUrl = (email: string) => `https://pcyes.com.br/r/${referralCode(email)}`;

/**
 * Pontos que um pedido de `amount` reais rende no degrau informado. Conta por
 * dezena de reais inteira, como a loja (Magento) mostra: R$ 1.499,00 no
 * primeiro degrau rende 1.490, R$ 16,57 rende 10.
 */
export const pointsForOrder = (amount: number, tier: PointsTier) =>
  Math.floor(Math.floor(amount / 10) * 10 * tier.perReal);

/**
 * O degrau de quem está comprando. Sem sessão, entra no primeiro degrau
 * (Indique e Ganhe, 1 pt por real), que é o número que a loja mostra para quem
 * não está logado — então o card nunca promete a mais.
 */
export const tierFor = (history: PcyesPointsTx[] | undefined) =>
  getTierProgress(lifetimeFrom(history ?? [])).current;
