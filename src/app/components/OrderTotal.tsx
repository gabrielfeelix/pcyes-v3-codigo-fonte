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
 * `loading`: a forma acabou de mudar e o total novo ainda não chegou. O rótulo
 * já segue a forma clicada, mas valor, linha de baixo e PC Points viram
 * skeleton: mostrar o número antigo fazia parecer que ele já era o novo.
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
  loading = false,
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
  /** Total da forma escolhida ainda sendo calculado. */
  loading?: boolean;
  className?: string;
}) {
  const isPix = method === "pix";
  const payable = isPix ? pixTotal : cardTotal;
  const caption = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

  return (
    <div className={className} aria-busy={loading || undefined}>
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
            {loading ? (
              <>
                {/* Dentro de um span com a fonte do valor: a linha fica com a
                    mesma altura e o card não encolhe enquanto carrega. */}
                <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 800 }}>
                  <SkeletonBar width={148} height={24} className="align-middle" />
                </span>
                <span className="sr-only" role="status">Calculando o total</span>
              </>
            ) : (
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
            )}
          </span>
        </div>
        {note && (
          <p className="mt-1 text-right text-ink-subtle" style={caption}>
            {note}
          </p>
        )}
        {loading ? (
          <p className="mt-1 text-right" style={caption}>
            <SkeletonBar width={232} height={12} className="align-middle" />
          </p>
        ) : (
          <p className="mt-1 text-right text-ink-muted" style={caption}>
            {isPix ? pixTotalLine(cardTotal) : cardTotalLine(pixTotal)}
          </p>
        )}
      </div>
      {loading ? (
        <p className="mt-3 flex items-center justify-center">
          <span style={caption}>
            <SkeletonBar width={176} height={14} className="align-middle" />
          </span>
        </p>
      ) : (
        <EarnPreview amount={payable} className="mt-3 justify-center" />
      )}
    </div>
  );
}

/** Barra cinza pulsando no lugar de um valor que ainda vai chegar. */
export function SkeletonBar({ width, height, className = "" }: { width: number; height: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block max-w-full rounded-md motion-safe:animate-pulse ${className}`}
      style={{ width, height, background: "rgba(var(--foreground-rgb), 0.1)" }}
    />
  );
}
