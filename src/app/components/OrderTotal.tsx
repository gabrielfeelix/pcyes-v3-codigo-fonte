import type { ReactNode } from "react";
import { formatBRL, formatBRLSpoken } from "../../utils/format";
import { cardTotalLine, pixTotalLine } from "./section/PriceBlock";
import { EarnPreview } from "./points/EarnPreview";

/**
 * O card do total do pedido. Um componente só para carrinho lateral, página do
 * carrinho e checkout: antes cada tela tinha o seu, com rótulo, ordem e texto
 * diferentes, e a loja nova copiou a bagunça (três formatos e uma frase do PIX
 * que não mudava ao escolher cartão).
 *
 * A regra é uma: o número grande é o que a pessoa paga com a forma escolhida,
 * e a linha de baixo é a outra opção. Antes de escolher, vale o PIX. Com PIX,
 * o rótulo diz "Total no PIX" e o preço fica sozinho (pedido do chefe do
 * Gabriel, 15/10); o "no PIX" ao lado do número sairia repetido.
 *
 *   PIX (padrão)     TOTAL NO PIX  R$ 427,40
 *                    ou R$ 449,90 em até 8× de R$ 56,24 sem juros
 *   Cartão/boleto    TOTAL  R$ 449,90
 *                    ou R$ 427,40 no PIX, com 5% de desconto
 *
 * Os PC Points ficam fora do card, colados embaixo e centralizados, e saem do
 * valor que a pessoa paga: o mesmo pedido não pode render um número no
 * carrinho e outro no checkout.
 */

export function OrderTotal({
  cardTotal,
  pixTotal,
  method = "pix",
  note,
  className = "",
}: {
  /** Total sem o desconto do PIX (cartão e boleto). */
  cardTotal: number;
  /** Total com o desconto do PIX. */
  pixTotal: number;
  /** Forma escolhida; qualquer coisa que não seja "pix" usa o preço cheio. */
  method?: string;
  /** Recado curto entre o valor e a linha de baixo (ex.: frete estimado). */
  note?: ReactNode;
  className?: string;
}) {
  const isPix = method === "pix";
  const payable = isPix ? pixTotal : cardTotal;
  const caption = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

  return (
    <div className={className}>
      <div
        className="rounded-[var(--radius-card-sm)] p-4"
        style={{ background: "rgba(var(--foreground-rgb), 0.03)", border: "1px solid rgba(var(--foreground-rgb), 0.06)" }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <span
            className={isPix ? "" : "text-ink-muted"}
            style={{ ...caption, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: isPix ? "#22c55e" : undefined }}
          >
            {isPix ? "Total no PIX" : "Total"}
          </span>
          <span className="flex items-baseline gap-1.5">
            <span
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "var(--text-xl)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: isPix ? "#22c55e" : "rgba(var(--foreground-rgb), 1)",
              }}
            >
              <span aria-hidden="true">{formatBRL(payable)}</span>
              <span className="sr-only">
                Total{isPix ? " no PIX" : ""}, {formatBRLSpoken(payable)}
              </span>
            </span>
          </span>
        </div>
        {note && (
          <p className="mt-1 text-right text-ink-subtle" style={caption}>
            {note}
          </p>
        )}
        <p className="mt-1 text-right text-ink-muted" style={caption}>
          {isPix ? pixTotalLine(cardTotal) : cardTotalLine(pixTotal)}
        </p>
      </div>
      <EarnPreview amount={payable} className="mt-3 justify-center" />
    </div>
  );
}
