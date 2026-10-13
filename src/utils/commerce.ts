/** Discount coupon codes and their percentage values. */
export const COUPONS: Record<string, number> = {
  PCYES10: 10,
  PROMO20: 20,
  BEMVINDO: 15,
};

/** Cart total threshold (R$) above which a free gift is offered. */
export const GIFT_THRESHOLD = 1500;

/** PC Points conversion: 100 points = R$ 1,00 of discount. */
export const POINTS_PER_BRL = 100;

/** Convert a PC Points balance into its BRL discount value. */
export const pointsToBRL = (points: number) => points / POINTS_PER_BRL;

/**
 * Max points redeemable: the smaller of the balance and the tier's cap
 * (`capPct`% of the eligible amount, 5% to 20% by tier, per the program rules).
 */
export const maxRedeemablePoints = (balance: number, eligibleAmount: number, capPct: number) =>
  Math.max(0, Math.min(balance, Math.floor(eligibleAmount * (capPct / 100) * POINTS_PER_BRL)));
