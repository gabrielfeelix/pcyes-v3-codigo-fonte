import { useAuth } from "../AuthContext";
import { PointsPill } from "./PointsPill";
import { pointsForOrder, tierFor } from "../../lib/pcyesPoints";

/**
 * Quanto este produto rende, na linha das avaliações da PDP.
 *
 * É a pílula do topo do drawer do carrinho, o mesmo componente (`PointsPill`),
 * não uma releitura: a primeira versão inventou borda e ouro próprios e ficou
 * sendo um elemento que não existia em nenhuma outra tela.
 *
 * A taxa vem do degrau de quem está comprando (Raro rende 1,5 pt a cada R$ 1,
 * Mítico rende 2,5). Sem sessão, calcula pelo primeiro degrau (Indique e
 * Ganhe, 1 pt por real), o número que a loja mostra a quem não está logado.
 */
export function PointsChip({ amount, className = "" }: { amount: number; className?: string }) {
  const { user } = useAuth();
  const points = pointsForOrder(amount, tierFor(user?.pcyesPointsHistory));
  if (points <= 0) return null;

  const label = points.toLocaleString("pt-BR");

  return (
    <PointsPill
      className={className}
      title={`Este produto rende ${label} PC Points`}
    >
      <span aria-hidden="true" className="tabular-nums">{label} PC Points</span>
      <span className="sr-only">Este produto rende {label} PC Points</span>
    </PointsPill>
  );
}
