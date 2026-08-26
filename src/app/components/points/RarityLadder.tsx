import { useState } from "react";
import { motion } from "motion/react";
import { Check, Lock } from "lucide-react";
import { POINT_TIERS, getTierProgress, type PointsTier } from "../../lib/pcyesPoints";

/**
 * A escada de raridade — o gráfico que abre a aba de pontos.
 *
 * A régua do /dev é uma linha reta com bolinhas cinzas iguais: ela informa o
 * degrau e não faz mais nada. Três coisas mudam aqui, e nenhuma é enfeite:
 *
 * 1. **Cada degrau tem a cor da sua raridade.** Cinza, azul, roxo, dourado,
 *    vermelho. A pessoa lê a distância pela cor antes de ler o número.
 * 2. **O degrau é clicável e diz o que entrega.** Um número solto ("5000") não
 *    dá motivo pra subir; "2 pt a cada R$ 10 + acesso antecipado" dá. Essa
 *    informação existe no programa e não aparecia em lugar nenhum.
 * 3. **O marcador fica ENTRE degraus, na posição real.** A régua do /dev
 *    acende a bolinha do degrau atual e some com o resto do caminho; aqui o
 *    trilho preenchido mostra o quanto do próximo degrau já foi andado.
 *
 * Os degraus ocupam espaço igual na régua, não proporcional aos pontos: de
 * 10 mil a 20 mil vale metade da escala real, e proporcional espremeria os três
 * primeiros num canto ilegível. O texto abaixo carrega o número exato.
 */

type RarityLadderProps = {
  lifetimePoints: number;
  /** `compact` corta os perks e encolhe os medalhões — serve de resumo. */
  variant?: "full" | "compact";
  className?: string;
};

export function RarityLadder({ lifetimePoints, variant = "full", className = "" }: RarityLadderProps) {
  const progress = getTierProgress(lifetimePoints);
  const [openTier, setOpenTier] = useState<string | null>(null);
  const compact = variant === "compact";

  const currentIndex = POINT_TIERS.indexOf(progress.current);
  /* Nasce fechado. Antes ele abria no PRÓXIMO degrau por padrão: uma tarja
     colorida de largura cheia anunciando um degrau que a pessoa não tem,
     entre "você é Raro" e o saldo. Interrompia a leitura para vender algo que
     ninguém pediu naquele segundo. Agora é resposta a um clique. */
  const detail = openTier ? POINT_TIERS.find((t) => t.id === openTier) : null;

  return (
    <div className={className}>
      {/* ── Régua: horizontal no desktop, empilhada no celular ────────────── */}
      <div className="hidden md:block">
        <div className="relative" style={{ paddingTop: compact ? 26 : 30, paddingBottom: compact ? 30 : 34 }}>
          {/* trilho */}
          <div
            className="absolute left-0 right-0 rounded-full"
            style={{ top: "50%", height: 4, marginTop: -2, background: "rgba(var(--foreground-rgb), 0.08)" }}
          />
          {/* trilho percorrido — gradiente pelas cores já conquistadas */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.overall * 100}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 rounded-full"
            style={{
              top: "50%",
              height: 4,
              marginTop: -2,
              background: progress.current.color,
            }}
          />

          <div className="relative flex items-center justify-between">
            {POINT_TIERS.map((tier, index) => (
              <TierNode
                key={tier.id}
                tier={tier}
                state={index < currentIndex ? "done" : index === currentIndex ? "current" : "locked"}
                compact={compact}
                open={openTier === tier.id}
                onToggle={() => setOpenTier(openTier === tier.id ? null : tier.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:hidden">
        {POINT_TIERS.map((tier, index) => (
          <TierRow
            key={tier.id}
            tier={tier}
            state={index < currentIndex ? "done" : index === currentIndex ? "current" : "locked"}
            ratio={index === currentIndex ? progress.ratio : index < currentIndex ? 1 : 0}
            showPerks={!compact}
          />
        ))}
      </div>

      {/* A régua mostra a distância; esta linha dá o número e o motivo. Antes o
          motivo morava numa tarja colorida — aqui é a mesma frase, sem caixa. */}
      <p
        className="mt-4 text-foreground/55"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.5 }}
      >
        Você é{" "}
        <span style={{ color: progress.current.color, fontWeight: 700 }}>{progress.current.name}</span>
        {progress.next ? (
          <>
            {" · faltam "}
            <span className="text-foreground" style={{ fontWeight: 700 }}>
              {progress.toNext.toLocaleString("pt-BR")} pts
            </span>{" "}
            para {progress.next.name}, que rende {progress.next.rate}.
            {!compact && (
              <span className="text-foreground/35"> Toque num degrau para ver o que ele dá.</span>
            )}
          </>
        ) : (
          " · topo da escada."
        )}
      </p>

      {!compact && detail && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-card-sm border border-foreground/8 bg-foreground/[0.02] px-3 py-2.5">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: detail.color }} />
            <span
              className="text-foreground"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {detail.name}
              {detail.min > 0 && ` · ${detail.min.toLocaleString("pt-BR")} pts`}
            </span>
          </span>
          <span
            className="text-foreground/60"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            {[detail.rate, ...detail.perks].join(" · ")}
          </span>
        </div>
      )}
    </div>
  );
}

type NodeState = "done" | "current" | "locked";

/** Medalhão hexagonal. Hexágono porque é a forma que o público já lê como selo de raridade. */
function TierNode({
  tier,
  state,
  compact,
  open,
  onToggle,
}: {
  tier: PointsTier;
  state: NodeState;
  compact: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const size = compact ? 30 : state === "current" ? 46 : 38;
  const reached = state !== "locked";

  return (
    <button
      onClick={onToggle}
      aria-pressed={open}
      aria-label={`${tier.name}, ${tier.min.toLocaleString("pt-BR")} pontos${state === "locked" ? ", bloqueado" : ""}`}
      className="group relative flex cursor-pointer flex-col items-center"
      style={{ width: size }}
    >
      <span
        className="absolute whitespace-nowrap"
        style={{
          bottom: `calc(100% + ${compact ? 6 : 9}px)`,
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-caption)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: reached ? tier.color : "rgba(var(--foreground-rgb), 0.35)",
        }}
      >
        {tier.name}
      </span>

      <span
        className="relative flex items-center justify-center transition-transform group-hover:scale-110"
        style={{
          width: size,
          height: size,
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          background: reached
            ? `linear-gradient(150deg, ${tier.color} 0%, ${tier.color}aa 100%)`
            : "rgba(var(--foreground-rgb), 0.10)",
        }}
      >
        {state === "done" && <Check size={compact ? 12 : 15} strokeWidth={3} className="text-black/70" />}
        {state === "locked" && <Lock size={compact ? 10 : 13} className="text-foreground/30" />}
      </span>

      <span
        className="absolute whitespace-nowrap"
        style={{
          top: `calc(100% + ${compact ? 6 : 9}px)`,
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: reached ? "rgba(var(--foreground-rgb), 0.75)" : "rgba(var(--foreground-rgb), 0.3)",
        }}
      >
        {tier.min === 0 ? "0" : tier.min.toLocaleString("pt-BR")}
      </span>
    </button>
  );
}

/**
 * Versão do celular: a régua deitada não cabe em 390px sem espremer os nomes,
 * então a escada fica em pé e cada degrau vira uma linha com barra própria.
 */
function TierRow({
  tier,
  state,
  ratio,
  showPerks,
}: {
  tier: PointsTier;
  state: NodeState;
  ratio: number;
  showPerks: boolean;
}) {
  const reached = state !== "locked";
  return (
    <div
      className="flex items-center gap-3 rounded-card-sm p-2.5"
      style={{
        background: state === "current" ? `${tier.color}0f` : "rgba(var(--foreground-rgb), 0.02)",
        border: state === "current" ? `1px solid ${tier.color}44` : "1px solid rgba(var(--foreground-rgb), 0.06)",
      }}
    >
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
        style={{
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          background: reached ? `linear-gradient(150deg, ${tier.color} 0%, ${tier.color}aa 100%)` : "rgba(var(--foreground-rgb), 0.10)",
        }}
      >
        {state === "done" && <Check size={12} strokeWidth={3} className="text-black/70" />}
        {state === "locked" && <Lock size={10} className="text-foreground/30" />}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: reached ? tier.color : "rgba(var(--foreground-rgb), 0.35)",
            }}
          >
            {tier.name}
          </span>
          <span
            className="text-foreground/45"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
          >
            {tier.min.toLocaleString("pt-BR")} pts
          </span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full" style={{ background: "rgba(var(--foreground-rgb), 0.08)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ratio * 100}%` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{ background: tier.color }}
          />
        </div>
        {showPerks && state === "current" && (
          <p
            className="mt-1.5 text-foreground/60"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            {[tier.rate, ...tier.perks].join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
