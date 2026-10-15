import { Price } from "./Price";
import { pixPriceOf } from "./PriceBlock";

/**
 * Preço do item no carrinho, no carrinho lateral e no resumo do checkout.
 *
 * O NÚMERO É O MESMO DA VITRINE: o do PIX. O card e a PDP mostravam "R$ 157,61
 * no PIX"; no carrinho o mesmo produto aparecia por R$ 165,90, e só o total lá
 * embaixo voltava para o PIX. Quem compara o carrinho com o card acha que o
 * preço subiu. A Kabum faz assim: o item mostra o preço no PIX, e o total
 * segue a mesma lógica (`OrderTotal`).
 *
 *   carrinho   R$ 157,61 no PIX       (grande, "no PIX" em verde)
 *   lateral    R$ 157,61 no PIX       (menor)
 *   checkout   1× R$ 157,61 no PIX    (segue a forma de pagamento escolhida;
 *                                      com cartão ou boleto, o preço cheio)
 *
 * O valor no cartão fica só no total ("ou R$ X em até N× sem juros"). Repetido
 * em cada item, era uma linha a mais por produto dizendo o que o total já diz.
 *
 * O PIX é por unidade arredondada (`pixPriceOf`), a mesma conta da PDP: 2
 * unidades de R$ 157,61 dão R$ 315,22, não 95% de R$ 331,80.
 */

type Variant = "cart" | "drawer" | "summary";

interface LineItemPriceProps {
  /** Preço cheio de uma unidade (cartão). */
  unit: number;
  quantity?: number;
  variant: Variant;
  /** No checkout, a forma escolhida. Antes de escolher, vale o PIX. */
  method?: "pix" | "card";
}

const caption = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

function NoPix() {
  return (
    <span
      className="whitespace-nowrap"
      style={{ ...caption, fontWeight: 700, color: "#16a34a", letterSpacing: "0.01em", marginLeft: "0.4em" }}
    >
      no PIX
    </span>
  );
}

export function LineItemPrice({ unit, quantity = 1, variant, method = "pix" }: LineItemPriceProps) {
  const pixUnit = pixPriceOf(unit);
  const pixLine = pixUnit * quantity;

  if (variant === "summary") {
    const isPix = method === "pix";
    return (
      <span className="tabular-nums">
        {quantity}×{" "}
        <Price value={isPix ? pixUnit : unit} label={isPix ? "no PIX" : undefined} suffix={isPix ? <NoPix /> : undefined} />
      </span>
    );
  }

  const big = variant === "cart";
  return (
    <>
      <p className="tabular-nums whitespace-nowrap">
        <Price
          value={pixLine}
          label="no PIX"
          suffix={<NoPix />}
          className="text-ink-strong"
          style={{
            fontFamily: big ? "var(--font-family-figtree)" : "var(--font-family-inter)",
            fontSize: big ? "var(--text-lg)" : "var(--text-sm)",
            fontWeight: big ? 800 : 700,
            letterSpacing: big ? "-0.015em" : undefined,
          }}
        />
      </p>
      {big && quantity > 1 && (
        <p className="text-ink-subtle tabular-nums" style={caption}>
          {quantity}× <Price value={pixUnit} />
        </p>
      )}
    </>
  );
}
