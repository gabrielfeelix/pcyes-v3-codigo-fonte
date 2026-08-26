import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Receipt, Send, Sparkles, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UserData } from "../AuthContext";
import { PcyesCoin } from "../PcyesCoin";
import { RarityLadder } from "./RarityLadder";
import {
  BalanceCard,
  EarnRules,
  ExpiryNote,
  PointsLedger,
  PointsSummaryLine,
  PointsWallet,
  ReferralPanel,
} from "./PointsPieces";
import { getTierProgress, lifetimeFrom, pointsToBRL } from "../../lib/pcyesPoints";
import { POINTS_VERSIONS, pointsVersionStore } from "../../lib/pointsVersion";
import { formatBRL } from "../../../utils/format";

/**
 * A aba PCYES Points do perfil, em três arranjos.
 *
 * O que NÃO muda: ao abrir a aba, a escada de raridade aparece primeiro e
 * fica. É a resposta para "onde estou e o que falta".
 *
 * - **V1** — uma página. Tudo empilhado, um scroll, nenhuma navegação.
 * - **V2** — abas POR ASSUNTO, o recorte do /dev limpo: Saldo · Como ganhar ·
 *   Indique · Extrato.
 * - **V3** — carteira no topo (rank + saldo + ação) e duas abas embaixo:
 *   Ganhar · Extrato. A pergunta mais frequente ("quanto eu tenho?") não é
 *   uma aba, é a primeira coisa da tela; só o que exige leitura demorada fica
 *   atrás de navegação.
 */

export function usePointsVersion() {
  return useSyncExternalStore(
    pointsVersionStore.subscribe,
    pointsVersionStore.getSnapshot,
    pointsVersionStore.getSnapshot,
  );
}

/** Seletor de versão — some no build de produção junto com o store. */
export function VersionSwitcher() {
  const current = usePointsVersion();
  if (!import.meta.env.DEV) return null;

  return (
    <div className="mb-4 rounded-card-sm border border-dashed border-foreground/12 bg-foreground/[0.02] p-2">
      <div className="flex flex-wrap items-center gap-1">
        <span
          className="mr-1 text-foreground/25"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em" }}
        >
          TESTE
        </span>
        {POINTS_VERSIONS.map((version) => (
          <button
            key={version.id}
            onClick={() => pointsVersionStore.set(version.id)}
            aria-pressed={current === version.id}
            title={version.hint}
            className={`cursor-pointer rounded-pill px-2.5 py-1 transition-colors ${
              current === version.id
                ? "bg-primary/15 text-primary"
                : "text-foreground/35 hover:bg-foreground/[0.05] hover:text-foreground/70"
            }`}
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {version.label}
          </button>
        ))}
      </div>
      <p className="mt-1.5 px-1 text-foreground/35" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px" }}>
        {POINTS_VERSIONS.find((v) => v.id === current)?.hint}
      </p>
    </div>
  );
}

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

/* ══ V1 — tudo em uma página ════════════════════════════════════════════ */

function VersionOne({ user }: { user: UserData }) {
  const history = user.pcyesPointsHistory ?? [];
  const lifetime = lifetimeFrom(history);

  return (
    <>
      <LadderHeader lifetime={lifetime} />
      <div className="mb-3">
        <BalanceCard points={user.pcyesPoints ?? 0} history={history} />
      </div>
      <div className="mb-3">
        <EarnRules lifetimePoints={lifetime} />
      </div>
      <div className="mb-3">
        <ReferralPanel email={user.email} />
      </div>
      <div className="mb-3">
        <PointsLedger history={history} />
      </div>
      <div className="mb-3">
        <PointsSummaryLine history={history} />
      </div>
      <ExpiryNote />
    </>
  );
}

/* ══ V2 — abas por assunto ══════════════════════════════════════════════ */

function VersionTwo({ user }: { user: UserData }) {
  const history = user.pcyesPointsHistory ?? [];
  const lifetime = lifetimeFrom(history);
  const points = user.pcyesPoints ?? 0;

  return (
    <>
      <LadderHeader lifetime={lifetime} />
      <SubTabs
        label="Seções do PCYES Points"
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
    </>
  );
}

/* ══ V3 — carteira no topo, duas abas embaixo ═══════════════════════════ */

function VersionThree({ user }: { user: UserData }) {
  const history = user.pcyesPointsHistory ?? [];
  const lifetime = lifetimeFrom(history);
  const points = user.pcyesPoints ?? 0;

  return (
    <>
      {/* A pergunta que traz a pessoa aqui — "quanto eu tenho e dá pra usar
          em quê?" — é respondida antes de qualquer navegação, junto com o
          rank. Só o que exige leitura demorada fica atrás de aba. */}
      <PointsWallet points={points} history={history} lifetime={lifetime}>
        <Link
          to="/produtos?promo=1"
          /* Contorno, não preenchimento. O número dourado é o herói do card;
             uma pílula vermelha cheia do mesmo tamanho ao lado dele criava dois
             heróis e nenhum. Aqui a ação continua achável sem disputar. */
          className="inline-flex items-center gap-1.5 rounded-pill border border-primary/40 px-5 py-2.5 text-primary transition-colors hover:bg-primary/10"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          USAR NUMA COMPRA
          <ArrowRight size={13} />
        </Link>
      </PointsWallet>

      <SubTabs
        label="Seções do PCYES Points"
        tabs={[
          {
            id: "ganhar",
            label: "Ganhar mais",
            icon: Sparkles,
            render: () => (
              <>
                <div className="mb-3">
                  <EarnRules lifetimePoints={lifetime} />
                </div>
                <div className="mb-3">
                  <ReferralPanel email={user.email} />
                </div>
                <ExpiryNote />
              </>
            ),
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
    </>
  );
}

/* ══ Entrada ════════════════════════════════════════════════════════════ */

export function PointsTab({ user }: { user: UserData }) {
  const version = usePointsVersion();
  const points = user.pcyesPoints ?? 0;

  return (
    <motion.div
      key={`points-${version}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <VersionSwitcher />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2
          className="flex items-center gap-2 text-foreground"
          style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 500 }}
        >
          <PcyesCoin size={20} />
          PCYES Points
        </h2>
        {/* Na V3 o saldo é o hero: repetir aqui seria dizer o mesmo número
            duas vezes em 200px de distância. */}
        {version !== "3" && (
          <p
            className="text-foreground/55"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            {points.toLocaleString("pt-BR")} pts · {formatBRL(pointsToBRL(points))}
          </p>
        )}
      </div>

      {version === "1" && <VersionOne user={user} />}
      {version === "2" && <VersionTwo user={user} />}
      {version === "3" && <VersionThree user={user} />}
    </motion.div>
  );
}
