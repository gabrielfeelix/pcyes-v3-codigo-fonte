import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { AlertCircle, Check, Copy, Gift, Receipt, Send, Sparkles, Trash2 } from "lucide-react";
import type { PcyesPointsTx } from "../AuthContext";
import { PcyesCoin } from "../PcyesCoin";
import { RarityLadder } from "./RarityLadder";
import {
  EARN_RULES,
  EXPIRY_DAYS,
  daysUntil,
  expiringSoon,
  getTierProgress,
  pointsToBRL,
  referralUrl,
} from "../../lib/pcyesPoints";
import { formatBRL } from "../../../utils/format";

/**
 * Peças do programa de pontos, compartilhadas pelas três versões de tela.
 *
 * Elas existem separadas porque as versões diferem no ARRANJO, não no
 * conteúdo: a mesma carteira aparece inteira numa página só, dividida entre
 * hub e extrato, ou dentro de uma página de programa. Escrever cada peça três
 * vezes garantiria que as três divergissem na primeira correção.
 */

const surface = "rounded-card-sm border border-foreground/8 bg-foreground/[0.02]";

/* ══ Carteira: quem você é + quanto você tem, num objeto só ═════════════ */

/**
 * O hero da aba.
 *
 * Antes eram DOIS cards lado a lado: o da escada, na cor do degrau, e o do
 * saldo, sempre dourado. Dourado é a cor do Lendário — um Raro via um card
 * dourado que não queria dizer nada, e as duas cores disputavam a primeira
 * olhada sem que nenhuma vencesse.
 *
 * Viraram um objeto. A escada é a faixa de cima (rank), o saldo é o corpo
 * (moeda). O ouro fica só na moeda, onde ele significa "ponto"; a cor do
 * degrau governa o resto do card. Uma leitura de cima para baixo: quem eu
 * sou → quanto eu tenho → o que dá para fazer com isso.
 */
export function PointsWallet({
  points,
  history,
  lifetime,
  children,
}: {
  points: number;
  history: PcyesPointsTx[];
  lifetime: number;
  /** Ação principal — o que fazer com o saldo. */
  children?: ReactNode;
}) {
  const next = expiringSoon(history)[0];

  return (
    <div
      className="mb-4 overflow-hidden"
      style={{
        borderRadius: "var(--radius-card-md)",
        background: "rgba(var(--foreground-rgb), 0.02)",
        border: "1px solid rgba(var(--foreground-rgb), 0.08)",
      }}
    >
      {/* faixa 1 — rank */}
      <div className="px-5 pt-5 md:px-6 md:pt-6">
        <RarityLadder lifetimePoints={lifetime} />
      </div>

      <div className="mx-5 my-5 border-t border-foreground/8 md:mx-6" />

      {/* faixa 2 — moeda */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-5 pb-5 md:px-6 md:pb-6">
        <div className="flex items-center gap-3.5">
          <PcyesCoin size={44} />
          <div>
            <p
              className="text-foreground/50"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Disponível
            </p>
            <p
              className="flex items-baseline gap-2 tabular-nums"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "var(--text-h3)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#facc15",
                textShadow: "0 0 24px rgba(250,204,21,0.35)",
              }}
            >
              {points.toLocaleString("pt-BR")}
              <span
                className="text-foreground/60"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", fontWeight: 500 }}
              >
                = {formatBRL(pointsToBRL(points))}
              </span>
            </p>
            <p
              className="mt-1 text-foreground/50"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
            >
              Abate até 30% do valor do pedido
            </p>
          </div>
        </div>
        {children}
      </div>

      {/* Vencimento: a única informação urgente da tela, então tem faixa
          própria no fim do card, não um chip dentro de outro bloco. */}
      {next && (
        <div className="flex items-center gap-2 border-t border-foreground/8 px-5 py-2.5 md:px-6">
          {/* Tarja amarela de largura cheia para 100 pts era alarme de incêndio
              para um aviso de geladeira. O ícone marca a urgência; o texto não
              precisa gritar junto. */}
          <AlertCircle size={13} className="flex-shrink-0 text-yellow-500" />
          <p
            className="text-foreground/60"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            {next.tx.amount.toLocaleString("pt-BR")} pts vencem em {next.days} {next.days === 1 ? "dia" : "dias"}
            {" · "}
            {new Date(next.tx.expiresAt!).toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}
    </div>
  );
}

/* ══ Saldo (V1 e V2) ════════════════════════════════════════════════════ */

export function BalanceCard({
  points,
  history,
  className = "",
}: {
  points: number;
  history: PcyesPointsTx[];
  className?: string;
}) {
  const expiring = expiringSoon(history);
  const next = expiring[0];

  return (
    <div
      className={`relative overflow-hidden p-5 md:p-6 ${className}`}
      style={{
        borderRadius: "var(--radius-card-md)",
        background: "linear-gradient(135deg, rgba(250,204,21,0.10) 0%, rgba(180,83,9,0.05) 50%, rgba(255,43,46,0.03) 100%)",
        border: "1px solid rgba(250,204,21,0.28)",
      }}
    >
      <div className="flex items-center gap-4">
        <PcyesCoin size={52} />
        <div className="min-w-0 flex-1">
          <p
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#facc15",
            }}
          >
            Saldo disponível
          </p>
          <p
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "var(--text-h3)",
              fontWeight: 700,
              lineHeight: 1,
              color: "#facc15",
              textShadow: "0 0 24px rgba(250,204,21,0.4)",
            }}
          >
            {points.toLocaleString("pt-BR")}
          </p>
          <p
            className="mt-1 text-foreground/65"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            Vale <span className="font-semibold text-foreground">{formatBRL(pointsToBRL(points))}</span> de desconto ·
            até 30% por pedido
          </p>
        </div>
      </div>

      {/* O vencimento é a informação que a pessoa mais perde e mais dói perder:
          fica ao lado do saldo, não no fim do extrato. */}
      {next && (
        <div
          className="mt-4 flex items-center gap-2 p-3"
          style={{
            borderRadius: "var(--radius-card-sm)",
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.22)",
          }}
        >
          <AlertCircle size={14} className="flex-shrink-0 text-yellow-500" />
          <p
            className="text-yellow-500"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
          >
            {next.tx.amount.toLocaleString("pt-BR")} pts vencem em {next.days}{" "}
            {next.days === 1 ? "dia" : "dias"} · {new Date(next.tx.expiresAt!).toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}
    </div>
  );
}

/* ══ Números do programa ════════════════════════════════════════════════ */

/**
 * Os números do programa em UMA LINHA, não em quatro cards.
 *
 * Em card, "Acumulado na vida", "Já resgatado", "Perdido por validade" e
 * "Disponível agora" recebem o mesmo peso — e três deles não levam a decisão
 * nenhuma: dois são história e o quarto é o saldo, que já está gritando no
 * hero ao lado. Quatro vozes iguais não são hierarquia, são uma lista.
 *
 * Aqui viram rodapé do extrato, que é onde a pergunta "de onde veio isso?"
 * nasce. O saldo saiu: ele mora no hero, uma vez só.
 */
export function PointsSummaryLine({ history }: { history: PcyesPointsTx[] }) {
  const earned = history.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  /* `-0` é um número real em JS e imprimiria "-0" quando não há transação da
     categoria. O `|| 0` normaliza. */
  const spent = -history.filter((t) => t.type === "spend").reduce((s, t) => s + t.amount, 0) || 0;
  const expired = -history.filter((t) => t.type === "expire").reduce((s, t) => s + t.amount, 0) || 0;

  const parts: { label: string; value: number; tone?: string }[] = [
    { label: "ganhos", value: earned },
    { label: "resgatados", value: spent },
    { label: "vencidos", value: expired, tone: expired > 0 ? "#f59e0b" : undefined },
  ];

  return (
    <p
      className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-foreground/45"
      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
    >
      {parts.map((part, index) => (
        <span key={part.label} className="flex items-baseline gap-1.5">
          {index > 0 && <span className="text-foreground/20">·</span>}
          <span className="tabular-nums text-foreground/75" style={{ fontWeight: 700, color: part.tone }}>
            {part.value.toLocaleString("pt-BR")}
          </span>
          {part.label}
        </span>
      ))}
      <span className="text-foreground/20">·</span>
      <span>o acumulado é o que define seu degrau</span>
    </p>
  );
}

/* ══ Como ganhar ════════════════════════════════════════════════════════ */

export function EarnRules({ lifetimePoints }: { lifetimePoints: number }) {
  const tier = getTierProgress(lifetimePoints).current;

  return (
    <div className={`${surface} overflow-hidden`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/6 px-5 py-3">
        <p
          className="text-foreground"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Como ganhar
        </p>
        {/* O multiplicador é do degrau, então dizer "1 pt / R$ 10" fixo mentiria
            para quem já subiu. A taxa vigente aparece aqui. */}
        <p
          className="text-foreground/55"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
        >
          Sua taxa como <span style={{ color: tier.color, fontWeight: 700 }}>{tier.name}</span>: {tier.rate}
        </p>
      </div>

      <div className="divide-y divide-foreground/5">
        {EARN_RULES.map((rule) => (
          <div key={rule.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(250,204,21,0.12)" }}
            >
              <Sparkles size={13} style={{ color: "#facc15" }} />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="text-foreground"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
              >
                {rule.title}
              </p>
              <p
                className="text-foreground/55"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
              >
                {rule.detail}
              </p>
            </div>
            <span
              className="flex-shrink-0"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "var(--text-base)",
                fontWeight: 700,
                color: "#facc15",
              }}
            >
              {rule.fromTier ? tier.rate : rule.reward}
            </span>
            {rule.action && (
              <Link
                to={rule.action.to}
                className="flex-shrink-0 rounded-pill border border-foreground/12 px-3 py-1.5 text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {rule.action.label.toUpperCase()}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ Indicação ══════════════════════════════════════════════════════════ */

/**
 * O /dev separa isto em duas abas — "Compartilhar" (link) e "Minhas
 * recomendações" (formulário de convites). São a mesma tarefa vista de dois
 * ângulos, e separadas obrigam a pessoa a descobrir as duas. Aqui é um bloco
 * só: o link para quem vai colar no WhatsApp, o formulário para quem prefere
 * que a loja mande.
 */
export function ReferralPanel({ email }: { email: string }) {
  const url = referralUrl(email);
  const [copied, setCopied] = useState(false);
  const [invites, setInvites] = useState<{ name: string; email: string }[]>([{ name: "", email: "" }]);
  const [sent, setSent] = useState(0);

  const copy = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const update = (index: number, field: "name" | "email", value: string) =>
    setInvites((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));

  const filled = invites.filter((row) => row.name.trim() && row.email.trim());

  return (
    <div className={`${surface} overflow-hidden`}>
      <div className="border-b border-foreground/6 px-5 py-3">
        <p
          className="text-foreground"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Indique e ganhe
        </p>
        <p
          className="mt-0.5 text-foreground/55"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
        >
          +500 pts quando seu amigo fecha o primeiro pedido. Ele ganha 10% de desconto.
        </p>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <code
            className="min-w-0 flex-1 truncate rounded-card-sm border border-foreground/10 bg-foreground/[0.03] px-3 py-2.5 text-foreground/80"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
          >
            {url}
          </code>
          <button
            onClick={copy}
            className="flex cursor-pointer items-center gap-1.5 rounded-pill px-4 py-2.5 text-ink-strong transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "var(--gradient-brand)",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 800,
              letterSpacing: "0.06em",
              boxShadow: "var(--shadow-brand-pill)",
            }}
          >
            {copied ? <Check size={13} strokeWidth={3} /> : <Copy size={13} />}
            {copied ? "COPIADO" : "COPIAR"}
          </button>
        </div>
        <span aria-live="polite" role="status" className="sr-only">
          {copied ? "Link de indicação copiado" : ""}
        </span>

        <div className="mt-5">
          <p
            className="mb-2 text-foreground/70"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
          >
            Ou deixa que a gente convida
          </p>
          <div className="flex flex-col gap-2">
            {invites.map((row, index) => (
              <div key={index} className="flex flex-wrap items-center gap-2">
                <input
                  value={row.name}
                  onChange={(e) => update(index, "name", e.target.value)}
                  placeholder="Nome"
                  aria-label={`Nome do convidado ${index + 1}`}
                  className="min-w-0 flex-1 rounded-card-sm border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-foreground outline-none transition-colors focus:border-primary/50"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
                />
                <input
                  value={row.email}
                  onChange={(e) => update(index, "email", e.target.value)}
                  placeholder="E-mail"
                  type="email"
                  aria-label={`E-mail do convidado ${index + 1}`}
                  className="min-w-0 flex-[1.4] rounded-card-sm border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-foreground outline-none transition-colors focus:border-primary/50"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
                />
                {invites.length > 1 && (
                  <button
                    onClick={() => setInvites((prev) => prev.filter((_, i) => i !== index))}
                    aria-label={`Remover convidado ${index + 1}`}
                    className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/30 transition-colors hover:bg-foreground/5 hover:text-primary"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* O /dev abre dez linhas vazias de uma vez, e nove ficam encalhadas
                na tela. Aqui a linha nasce quando a pessoa pede. */}
            <button
              onClick={() => setInvites((prev) => [...prev, { name: "", email: "" }])}
              className="cursor-pointer rounded-pill border border-foreground/12 px-3.5 py-2 text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              + OUTRO AMIGO
            </button>
            <button
              disabled={filled.length === 0}
              onClick={() => {
                setSent(filled.length);
                setInvites([{ name: "", email: "" }]);
                setTimeout(() => setSent(0), 3000);
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-pill px-4 py-2 text-ink-strong transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
              style={{
                background: "var(--gradient-buy)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 800,
                letterSpacing: "0.06em",
              }}
            >
              <Send size={12} />
              ENVIAR {filled.length > 0 ? `(${filled.length})` : ""}
            </button>
          </div>

          {sent > 0 && (
            <p
              role="status"
              className="mt-2 text-green-500"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
            >
              {sent} {sent === 1 ? "convite enviado" : "convites enviados"}. Os pontos entram quando o pedido fechar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══ Extrato ════════════════════════════════════════════════════════════ */

const TX_STYLE = {
  earn: { label: "Ganhou", color: "text-green-500" },
  bonus: { label: "Bônus", color: "text-yellow-500" },
  spend: { label: "Resgatou", color: "text-foreground/65" },
  expire: { label: "Expirou", color: "text-red-400" },
} as const;

type LedgerFilter = "all" | "in" | "out";

export function PointsLedger({
  history,
  limit,
  onSeeAll,
}: {
  history: PcyesPointsTx[];
  /** Corta a lista e mostra o rodapé que leva à aba do extrato. */
  limit?: number;
  onSeeAll?: () => void;
}) {
  const [filter, setFilter] = useState<LedgerFilter>("all");

  const filtered = history.filter((tx) =>
    filter === "all" ? true : filter === "in" ? tx.amount > 0 : tx.amount < 0,
  );
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className={`${surface} overflow-hidden`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/6 px-5 py-3">
        <p
          className="text-foreground"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Extrato
        </p>
        {!limit && (
          <div className="flex items-center gap-1">
            {(
              [
                ["all", "Tudo"],
                ["in", "Entradas"],
                ["out", "Saídas"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={`cursor-pointer rounded-pill px-2.5 py-1 transition-colors ${
                  filter === key ? "bg-primary/15 text-primary" : "text-foreground/45 hover:text-foreground/75"
                }`}
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {label.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <PcyesCoin size={40} />
          <p
            className="mt-3 text-foreground/55"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
          >
            Nada por aqui ainda
          </p>
        </div>
      ) : (
        <div className="divide-y divide-foreground/5">
          {shown.map((tx) => {
            const positive = tx.amount > 0;
            const style = TX_STYLE[tx.type];
            const date = new Date(tx.date);
            const days = tx.expiresAt ? daysUntil(tx.expiresAt) : null;
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 px-5 py-3"
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: positive ? "rgba(34,197,94,0.10)" : "rgba(239,68,68,0.08)" }}
                >
                  {positive ? (
                    <Sparkles size={13} className="text-green-500" />
                  ) : (
                    <Receipt size={13} className="text-foreground/70" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <p
                      className="truncate text-foreground"
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 500 }}
                    >
                      {tx.description}
                    </p>
                    <span
                      className={`flex-shrink-0 ${style.color}`}
                      style={{
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p
                    className="text-foreground/55"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                  >
                    {date.toLocaleDateString("pt-BR")}
                    {/* "vence em 12/04/2027" faz a pessoa calcular; a contagem
                        em dias é a informação que ela queria. */}
                    {days !== null && days > 0 && ` · vence em ${days} dias`}
                    {days !== null && days <= 0 && " · vencido"}
                  </p>
                </div>
                <p
                  className={`flex-shrink-0 ${positive ? "text-green-500" : "text-foreground/65"}`}
                  style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700 }}
                >
                  {positive ? "+" : ""}
                  {tx.amount.toLocaleString("pt-BR")}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {limit && onSeeAll && filtered.length > limit && (
        <button
          onClick={onSeeAll}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-t border-foreground/6 py-3 text-foreground/60 transition-colors hover:text-primary"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          VER O EXTRATO COMPLETO ({filtered.length})
        </button>
      )}
    </div>
  );
}

/* ══ Regra de validade ══════════════════════════════════════════════════ */

export function ExpiryNote() {
  return (
    <p
      className="text-foreground/45"
      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
    >
      <Gift size={11} className="mr-1 inline" />
      Pontos valem {EXPIRY_DAYS} dias a partir do crédito. 100 pts = {formatBRL(1)} · resgate até 30% do valor do
      pedido.
    </p>
  );
}
