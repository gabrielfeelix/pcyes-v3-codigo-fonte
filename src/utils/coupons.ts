import { COUPONS } from "./commerce";
import { formatBRL } from "./format";

/**
 * Validação de cupom com o motivo da recusa. A loja dizia só "Cupom inválido."
 * para tudo, e quem errava ficava clicando em Aplicar até desistir (5 de 6
 * clientes que mexeram no cupom em 21-22/10 não foram ao checkout). Cada frase
 * diz o motivo em uma frase só, sem dois-pontos, como o Mercado Livre faz.
 *
 * No protótipo, cada recusa tem um código de exemplo para testar a frase:
 *   EXPIRADO, EMBREVE, ESGOTADO, JAUSEI, BEMVINDO (1ª compra), MIN299,
 *   CADEIRA15 (só cadeiras). Válidos: PCYES10, PROMO20.
 * Na loja, os motivos vêm da regra do cupom no Magento (validade, usos,
 * grupo de cliente, valor mínimo, produtos); sem motivo conhecido, vale a
 * frase de cupom não encontrado.
 */

type CouponRule =
  | { kind: "expired" }
  | { kind: "notStarted" }
  | { kind: "soldOut" }
  | { kind: "usedByYou" }
  | { kind: "firstPurchase"; pct: number }
  | { kind: "minimum"; pct: number; min: number }
  | { kind: "products"; pct: number; match: RegExp };

const DEMO_RULES: Record<string, CouponRule> = {
  EXPIRADO: { kind: "expired" },
  EMBREVE: { kind: "notStarted" },
  ESGOTADO: { kind: "soldOut" },
  JAUSEI: { kind: "usedByYou" },
  BEMVINDO: { kind: "firstPurchase", pct: COUPONS.BEMVINDO },
  MIN299: { kind: "minimum", pct: 10, min: 299 },
  CADEIRA15: { kind: "products", pct: 15, match: /cadeira/i },
};

export type CouponResult = { ok: true; code: string; pct: number } | { ok: false; message: string };

export function validateCoupon(
  raw: string,
  ctx: { subtotal: number; isLoggedIn: boolean; hasOrders: boolean; itemNames: string[] },
): CouponResult {
  const code = raw.trim().toUpperCase();
  if (!code) return { ok: false, message: "Digite o código do cupom." };

  const rule = DEMO_RULES[code];
  if (!rule) {
    return COUPONS[code]
      ? { ok: true, code, pct: COUPONS[code] }
      : { ok: false, message: `Cupom ${code} não foi encontrado, verifique o código digitado.` };
  }

  switch (rule.kind) {
    case "expired":
      return { ok: false, message: `O cupom ${code} expirou.` };
    case "notStarted":
      return { ok: false, message: `O cupom ${code} ainda não está ativo.` };
    case "soldOut":
      return { ok: false, message: `O cupom ${code} atingiu o limite de usos.` };
    case "usedByYou":
      return { ok: false, message: `Você já usou o cupom ${code} na sua conta.` };
    case "firstPurchase":
      if (!ctx.isLoggedIn) return { ok: false, message: `Entre na sua conta para usar o cupom ${code}.` };
      if (ctx.hasOrders) return { ok: false, message: `O cupom ${code} é só para a primeira compra, e sua conta já tem pedidos.` };
      return { ok: true, code, pct: rule.pct };
    case "minimum":
      if (ctx.subtotal < rule.min) {
        return {
          ok: false,
          message: `O cupom ${code} vale para compras acima de ${formatBRL(rule.min)}, faltam ${formatBRL(rule.min - ctx.subtotal)}.`,
        };
      }
      return { ok: true, code, pct: rule.pct };
    case "products":
      if (!ctx.itemNames.some((n) => rule.match.test(n))) {
        return { ok: false, message: `O cupom ${code} não vale para os produtos do seu carrinho.` };
      }
      return { ok: true, code, pct: rule.pct };
  }
}

/** Percentual de um cupom já aplicado (válidos e os de exemplo que passaram). */
export function couponPct(code: string | null): number {
  if (!code) return 0;
  if (COUPONS[code]) return COUPONS[code];
  const rule = DEMO_RULES[code];
  return rule && "pct" in rule ? rule.pct : 0;
}
