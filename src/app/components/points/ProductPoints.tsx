import { Link } from "react-router";
import { useAuth } from "../AuthContext";
import { PcyesCoin } from "../PcyesCoin";
import { pointsForOrder, pointsToBRL, tierFor } from "../../lib/pcyesPoints";
import { formatBRL } from "../../../utils/format";

/**
 * PC Points na PDP — as duas aparições.
 *
 * O programa existia no perfil, no carrinho e no checkout: só era visto DEPOIS
 * da decisão de compra. A PDP é onde a decisão acontece, então o ponto precisa
 * aparecer aqui — duas vezes, respondendo perguntas diferentes:
 *
 *   `PointsChip`     — linha das avaliações, junto do que a página já usa para
 *                      qualificar o produto. Responde "quanto este produto me
 *                      rende?" enquanto a pessoa ainda está lendo o cabeçalho.
 *   `PointsEarnLine` — bloco de compra, colado no preço. Responde a mesma
 *                      pergunta na hora de apertar o botão, já com a quantidade
 *                      escolhida e com o valor que os pontos viram em reais.
 *
 * A taxa vem do degrau de quem está comprando (Raro rende 1,5 pt a cada R$ 10,
 * Mítico rende 3). Sem sessão, calcula como Comum — a taxa que a pessoa teria
 * ao criar a conta agora, então o número nunca promete a mais.
 *
 * Ouro (`#facc15`) é a cor do programa em todo o site (perfil, carrinho,
 * checkout). Na PDP ele divide a linha com as estrelas (#FFB800), então o chip
 * segura o ouro só no número e na moeda: fundo e borda ficam em alfa baixo,
 * senão duas pílulas douradas brigam a dois centímetros uma da outra.
 */

/** Rota do programa. Mesma aba do perfil que explica a escada e as regras. */
const POINTS_HREF = "/perfil?tab=points";

function usePoints(amount: number) {
  const { user } = useAuth();
  const tier = tierFor(user?.pcyesPointsHistory);
  return pointsForOrder(amount, tier);
}

/** Chip da linha de avaliações: "+124 PC Points". */
export function PointsChip({ amount, className = "" }: { amount: number; className?: string }) {
  const points = usePoints(amount);
  if (points <= 0) return null;

  const label = points.toLocaleString("pt-BR");

  return (
    <Link
      to={POINTS_HREF}
      className={`inline-flex items-center gap-1.5 rounded-full transition-colors hover:bg-[rgba(250,204,21,0.18)] ${className}`}
      style={{
        padding: "3px 9px 3px 6px",
        background: "rgba(250,204,21,0.10)",
        border: "1px solid rgba(250,204,21,0.24)",
      }}
      title={`Este produto rende ${label} PC Points — vale ${formatBRL(pointsToBRL(points))} na próxima compra`}
    >
      <PcyesCoin size={13} />
      <span
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-caption)",
          fontWeight: 700,
          color: "#facc15",
          letterSpacing: "0.01em",
        }}
      >
        <span aria-hidden="true">+{label} PC Points</span>
        <span className="sr-only">Este produto rende {label} PC Points</span>
      </span>
    </Link>
  );
}

/**
 * Linha do bloco de compra: "Este produto rende 124 PC Points · R$ 1,24 de
 * volta". O valor em reais vai junto porque ponto sem câmbio é número solto —
 * 100 pts = R$ 1,00, e ninguém tem obrigação de saber disso.
 */
export function PointsEarnLine({ amount, className = "" }: { amount: number; className?: string }) {
  const points = usePoints(amount);
  if (points <= 0) return null;

  const label = points.toLocaleString("pt-BR");

  return (
    <Link
      to={POINTS_HREF}
      className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 group ${className}`}
    >
      <PcyesCoin size={15} />
      <span
        className="text-foreground/60"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
      >
        Este produto rende
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
        {label} PC Points
      </span>
      <span
        className="text-foreground/35 group-hover:text-foreground/55 transition-colors"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
      >
        · {formatBRL(pointsToBRL(points))} de volta na próxima compra
      </span>
    </Link>
  );
}
