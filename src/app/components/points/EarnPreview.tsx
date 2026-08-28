import { useAuth } from "../AuthContext";
import { PcyesCoin } from "../PcyesCoin";
import { pointsForOrder, pointsToBRL, tierFor } from "../../lib/pcyesPoints";
import { formatBRL } from "../../../utils/format";

/**
 * Quanto este pedido vai render em pontos.
 *
 * Vive no rodapé do carrinho, colado no total, porque é sobre ESTE pedido —
 * o saldo que a pessoa já tem aparece no topo e responde outra pergunta. Uma
 * linha só: o número, e o que ele vale. Sem card, sem borda, sem CTA: é uma
 * informação agradável, não uma tarefa.
 *
 * A taxa vem do degrau de quem está comprando (Raro rende 1,5 pt a cada R$ 10,
 * Mítico rende 3). Sem sessão, calcula como Comum — é a taxa que a pessoa
 * teria ao criar a conta agora, então o número nunca promete a mais.
 *
 * `label` existe porque a PDP usa a MESMA linha antes de existir pedido: lá o
 * sujeito é o produto, não o pedido. Só a palavra muda — desenho, cor, câmbio
 * e conta continuam vindo daqui, que é o que mantém carrinho e PDP idênticos.
 */
export function EarnPreview({ amount, label = "Este pedido rende", className = "" }: {
  amount: number;
  label?: string;
  className?: string;
}) {
  const { user } = useAuth();
  const tier = tierFor(user?.pcyesPointsHistory);
  const points = pointsForOrder(amount, tier);

  if (points <= 0) return null;

  return (
    <p className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 ${className}`}>
      <PcyesCoin size={15} />
      <span
        className="text-foreground/60"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
      >
        {label}
      </span>
      <span
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-caption)",
          fontWeight: 700,
          color: "#facc15",
        }}
      >
        {points.toLocaleString("pt-BR")} PC Points
      </span>
      <span
        className="text-foreground/35"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
      >
        · {formatBRL(pointsToBRL(points))} na próxima compra
      </span>
    </p>
  );
}
