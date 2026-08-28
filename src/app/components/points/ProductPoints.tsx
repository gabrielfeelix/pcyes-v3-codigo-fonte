import { useAuth } from "../AuthContext";
import { PointsPill } from "./PointsPill";
import { pointsForOrder, pointsToBRL, tierFor } from "../../lib/pcyesPoints";
import { formatBRL } from "../../../utils/format";

/**
 * Quanto este produto rende, na linha das avaliações da PDP.
 *
 * É a pílula do topo do drawer do carrinho, o mesmo componente (`PointsPill`),
 * não uma releitura: a primeira versão inventou borda e ouro próprios e ficou
 * sendo um elemento que não existia em nenhuma outra tela.
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
    <PointsPill
      className={className}
      title={`Este produto rende ${label} PC Points — vale ${formatBRL(pointsToBRL(points))} na próxima compra`}
    >
      <span aria-hidden="true" className="tabular-nums">{label} PC Points</span>
      <span className="sr-only">Este produto rende {label} PC Points</span>
    </PointsPill>
  );
}
