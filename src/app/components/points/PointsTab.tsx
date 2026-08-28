import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Receipt, Send, Sparkles, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserData } from "../AuthContext";
import { PcyesCoin } from "../PcyesCoin";
import { RarityLadder } from "./RarityLadder";
import { BalanceCard, EarnRules, ExpiryNote, PointsLedger, PointsSummaryLine, ReferralPanel } from "./PointsPieces";
import { getTierProgress, lifetimeFrom, pointsToBRL } from "../../lib/pcyesPoints";
import { formatBRL } from "../../../utils/format";

/**
 * A aba PC Points do perfil.
 *
 * A escada de raridade abre a aba e fica fixa acima das sub-abas — é a
 * resposta para "onde estou e o que falta", e ela não sai de vista quando a
 * aba troca. Abaixo, o programa é recortado por assunto: Saldo, Como ganhar,
 * Indique e Extrato.
 *
 * O recorte por assunto veio do módulo do /dev, que separava as mesmas quatro
 * coisas em abas de navegador antigo. O que mudou aqui é a gramática: as
 * sub-abas usam o padrão que já existe em Favoritos, e a régua de degraus
 * ganhou cor de raridade, medalhão e o que cada degrau entrega.
 */

/* ══ Sub-abas — padrão do design system ═════════════════════════════════ */

type SubTab = { id: string; label: string; icon: LucideIcon; count?: string; render: () => ReactNode };

/**
 * Mesmo desenho das sub-abas de Favoritos: sublinhado vermelho sobre trilho,
 * ícone, rótulo em sentence case e a contagem numa pílula discreta. Não é
 * lugar de inventar componente — sub-aba dentro do perfil já existe, e duas
 * gramáticas diferentes na mesma página ensinariam a pessoa duas vezes.
 */
function SubTabs({ tabs, label }: { tabs: SubTab[]; label: string }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <>
      <div className="mb-5 flex items-center gap-1.5 border-b border-foreground/8" role="tablist" aria-label={label}>
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`flex cursor-pointer items-center gap-1.5 px-3 py-2 transition-all ${
                isActive
                  ? "border-b-2 border-primary text-primary"
                  : "border-b-2 border-transparent text-foreground/50 hover:text-foreground/80"
              }`}
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                marginBottom: "-1px",
              }}
            >
              <tab.icon size={13} />
              {tab.label}
              {tab.count && (
                <span
                  className={`ml-1 rounded-full px-1.5 tabular-nums ${
                    isActive ? "bg-primary/15 text-primary" : "bg-foreground/10 text-foreground/60"
                  }`}
                  style={{ fontSize: "var(--text-caption)", fontWeight: 700 }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {current.render()}
      </motion.div>
    </>
  );
}

/* ══ A escada como cabeçalho (V1 e V2) ══════════════════════════════════ */

function LadderHeader({ lifetime }: { lifetime: number }) {
  const tier = getTierProgress(lifetime).current;
  return (
    <div
      className="mb-4 overflow-hidden p-5 md:p-6"
      style={{
        borderRadius: "var(--radius-card-md)",
        background: `linear-gradient(135deg, ${tier.color}14 0%, rgba(var(--foreground-rgb), 0.02) 60%)`,
        border: `1px solid ${tier.color}2e`,
      }}
    >
      <div className="mb-1 flex items-center gap-2">
        <Sparkles size={13} style={{ color: tier.color }} />
        <p
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: tier.color,
          }}
        >
          Sua escada
        </p>
      </div>
      <RarityLadder lifetimePoints={lifetime} />
    </div>
  );
}

/* ══ Entrada ══════════════════════════════════════════════════════════ */

export function PointsTab({ user }: { user: UserData }) {
  const history = user.pcyesPointsHistory ?? [];
  const lifetime = lifetimeFrom(history);
  const points = user.pcyesPoints ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2
          className="flex items-center gap-2 text-foreground"
          style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 500 }}
        >
          <PcyesCoin size={20} />
          PC Points
        </h2>
        <p
          className="text-foreground/55"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
        >
          {points.toLocaleString("pt-BR")} pts · {formatBRL(pointsToBRL(points))}
        </p>
      </div>

      <LadderHeader lifetime={lifetime} />

      <SubTabs
        label="Seções do PC Points"
        tabs={[
          {
            id: "saldo",
            label: "Saldo",
            icon: Wallet,
            render: () => (
              <>
                <div className="mb-3">
                  <BalanceCard points={points} history={history} />
                </div>
                <ExpiryNote />
              </>
            ),
          },
          {
            id: "ganhar",
            label: "Como ganhar",
            icon: Sparkles,
            render: () => <EarnRules lifetimePoints={lifetime} />,
          },
          {
            id: "indique",
            label: "Indique",
            icon: Send,
            render: () => <ReferralPanel email={user.email} />,
          },
          {
            id: "extrato",
            label: "Extrato",
            icon: Receipt,
            count: String(history.length),
            render: () => (
              <>
                <div className="mb-3">
                  <PointsLedger history={history} />
                </div>
                <PointsSummaryLine history={history} />
              </>
            ),
          },
        ]}
      />
    </motion.div>
  );
}
