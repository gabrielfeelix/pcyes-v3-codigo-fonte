export interface PreOrderInfo {
  productId: number;
  releaseDate: string; // ISO date
  preOrderPrice?: string;
  reservedUnits: number;
  totalUnits: number;
  highlight: string;
}

/**
 * ATENÇÃO: `releaseDate` no PASSADO mata o contador.
 *
 * O card de pré-venda troca a contagem regressiva por "Já disponível" assim que
 * a data vence (`countdown.isLive`). Com datas fixas isso acontece sozinho com
 * o tempo: em agosto/2026 dez dos quinze itens já tinham vencido e só um punhado
 * ainda contava. Ao revisar o protótipo, empurre as datas vencidas para frente.
 */
export const PRE_ORDER_ITEMS: PreOrderInfo[] = [
  {
    productId: 500,
    releaseDate: "2026-10-08T20:00:00",
    preOrderPrice: "R$ 8.999,00",
    reservedUnits: 1247,
    totalUnits: 3000,
    highlight: "Ray Tracing + DLSS 3 · entrega no lançamento",
  },
  {
    productId: 433,
    releaseDate: "2026-09-12T19:00:00",
    preOrderPrice: "R$ 2.499,00",
    reservedUnits: 642,
    totalUnits: 1500,
    highlight: "Edição limitada PCYES",
  },
  {
    productId: 446,
    releaseDate: "2026-09-18T18:00:00",
    preOrderPrice: "R$ 1.099,00",
    reservedUnits: 312,
    totalUnits: 800,
    highlight: "Maringá FC Limited Edition",
  },
  {
    productId: 164,
    releaseDate: "2026-09-08T19:00:00",
    preOrderPrice: "R$ 2.199,00",
    reservedUnits: 720,
    totalUnits: 800,
    highlight: "Monitor 240Hz QHD · cores 100% sRGB",
  },
  {
    productId: 509,
    releaseDate: "2026-09-20T19:00:00",
    preOrderPrice: "R$ 3.499,00",
    reservedUnits: 180,
    totalUnits: 600,
    highlight: "Monitor curvo 34\" UltraWide HDR",
  },
  {
    productId: 30,
    releaseDate: "2026-10-28T20:00:00",
    preOrderPrice: "R$ 5.499,00",
    reservedUnits: 410,
    totalUnits: 500,
    highlight: "PC Gamer pronto · i7 + RTX 4070 + 32GB",
  },
  {
    productId: 35,
    releaseDate: "2026-11-15T20:00:00",
    preOrderPrice: "R$ 9.799,00",
    reservedUnits: 95,
    totalUnits: 400,
    highlight: "PC Workstation · Ryzen 9 + 64GB RAM",
  },
  {
    productId: 43,
    releaseDate: "2026-09-25T19:00:00",
    preOrderPrice: "R$ 4.299,00",
    reservedUnits: 188,
    totalUnits: 250,
    highlight: "Build streamer · entrega expressa",
  },
  {
    productId: 233,
    releaseDate: "2026-10-02T18:00:00",
    preOrderPrice: "R$ 799,00",
    reservedUnits: 540,
    totalUnits: 1200,
    highlight: "Gabinete RGB · vidro temperado",
  },
  {
    productId: 250,
    releaseDate: "2026-11-20T20:00:00",
    preOrderPrice: "R$ 1.299,00",
    reservedUnits: 220,
    totalUnits: 700,
    highlight: "Gabinete dual-chamber premium",
  },
  {
    productId: 260,
    releaseDate: "2026-10-12T19:00:00",
    preOrderPrice: "R$ 1.899,00",
    reservedUnits: 76,
    totalUnits: 500,
    highlight: "Monitor 4K 144Hz · IPS Nano",
  },
  {
    productId: 262,
    releaseDate: "2026-10-16T19:00:00",
    preOrderPrice: "R$ 1.499,00",
    reservedUnits: 612,
    totalUnits: 700,
    highlight: "Monitor 27\" 240Hz · resposta 0.5ms",
  },
  {
    productId: 31,
    releaseDate: "2026-09-05T20:00:00",
    preOrderPrice: "R$ 6.999,00",
    reservedUnits: 152,
    totalUnits: 350,
    highlight: "PC Gamer high-end · RTX 4080 SUPER",
  },
  {
    productId: 32,
    releaseDate: "2026-12-02T20:00:00",
    preOrderPrice: "R$ 12.499,00",
    reservedUnits: 41,
    totalUnits: 200,
    highlight: "Build flagship · RTX 5090 + i9 14ª gen",
  },
  {
    productId: 38,
    releaseDate: "2026-11-06T19:00:00",
    preOrderPrice: "R$ 3.799,00",
    reservedUnits: 268,
    totalUnits: 400,
    highlight: "PC compacto ITX · perfeito pra office",
  },
];

export function getPreOrderInfo(productId: number): PreOrderInfo | null {
  return PRE_ORDER_ITEMS.find((p) => p.productId === productId) ?? null;
}
