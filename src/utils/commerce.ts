/** Discount coupon codes and their percentage values. */
export const COUPONS: Record<string, number> = {
  PCYES10: 10,
  PROMO20: 20,
  BEMVINDO: 15,
};

/** Cart total threshold (R$) above which a free gift is offered. */
export const GIFT_THRESHOLD = 1500;

/** PCYES Points conversion: 100 points = R$ 1,00 of discount. */
export const POINTS_PER_BRL = 100;

/** Convert a PCYES Points balance into its BRL discount value. */
export const pointsToBRL = (points: number) => points / POINTS_PER_BRL;

/** Max points redeemable: capped by balance and by 30% of the eligible amount. */
export const maxRedeemablePoints = (balance: number, eligibleAmount: number) =>
  Math.max(0, Math.min(balance, Math.floor(eligibleAmount * 0.3 * POINTS_PER_BRL)));
