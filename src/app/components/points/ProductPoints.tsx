import { useAuth } from "../AuthContext";
import { PcyesCoin } from "../PcyesCoin";
import { pointsForOrder, pointsToBRL, tierFor } from "../../lib/pcyesPoints";
import { formatBRL } from "../../../utils/format";

/**
 * O chip de PC Points da PDP — "quanto este produto rende", na linha das
 * avaliações.
 *
 * MESMA PÍLULA DO CARRINHO. O saldo no topo do drawer já é uma pílula amarela
 * (`bg-yellow-500/10` + `text-yellow-500/70`, `--radius-pill`, caption 600, sem
 * borda) e é assim que o programa se apresenta no site inteiro. A primeira
 * versão deste chip inventou fundo e borda douradas próprias e ouro forte no
 * texto: virou um elemento que não existia em nenhuma outra tela.
 *
 * A segunda aparição do programa na PDP, no bloco de compra, é o `EarnPreview`
 * do carrinho reaproveitado — só troca a palavra "pedido" por "produto".
 *
 * A taxa vem do degrau de quem está comprando (Raro rende 1,5 pt a cada R$ 10,
 * Mítico rende 3). Sem sessão, calcula como Comum — a taxa que a pessoa teria
 * ao criar a conta agora, então o número nunca promete a mais.
 */
export function PointsChip({ amount, className = "" }: { amount: number; className?: string }) {
  const { user } = useAuth();
  const points = pointsForOrder(amount, tierFor(user?.pcyesPointsHistory));
  if (points <= 0) return null;

  const label = points.toLocaleString("pt-BR");

  return (
    <span
      className={`flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-500/70 ${className}`}
      style={{
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 600,
      }}
      title={`Este produto rende ${label} PC Points — vale ${formatBRL(pointsToBRL(points))} na próxima compra`}
    >
      <PcyesCoin size={14} />
      <span aria-hidden="true" className="tabular-nums">{label} PC Points</span>
      <span className="sr-only">Este produto rende {label} PC Points</span>
    </span>
  );
}
