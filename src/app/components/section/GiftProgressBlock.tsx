import { Link } from "react-router";
import { motion } from "motion/react";
import { Check, Gift, Plus, Sparkles } from "lucide-react";
import type { GiftProgress } from "../../lib/giftCampaign";
import type { CartItem } from "../CartContext";
import { useCart } from "../CartContext";
import { artFitClass } from "../../lib/setupImages";
import { getPrimaryProductImage } from "../productPresentation";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/**
 * Progresso da campanha de brinde.
 *
 * Três das quatro metas são a MESMA leitura — "quanto do caminho eu já
 * andei" — e por isso usam a mesma régua, mudando só o rótulo do fim:
 *
 * - valor      → 0 ────── R$ 1.500
 * - quantidade → 0 ────── 3 produtos
 * - categoria  → 0 ────── 3 periféricos
 *
 * A quarta é diferente de verdade. Quando a campanha exige SKUs nomeados
 * ("leve ESTE headset e ESTE teclado"), a régua responde a pergunta errada:
 * ela diz quanto falta, e o que a pessoa precisa saber é O QUÊ falta. Ali a
 * lista dos produtos vira o progresso — cada linha marcada é um passo — e não
 * existe régua nenhuma.
 */

type GiftProgressBlockProps = {
  progress: GiftProgress;
  giftItem: CartItem | null;
  variant?: "drawer" | "page";
  /** `false` quando a campanha tem brinde único — não há o que escolher. */
  canChoose?: boolean;
  onChoose: () => void;
  /** Fecha o drawer ao sair para a listagem. */
  onNavigate?: () => void;
  /** `true` na própria listagem da campanha: lá o link levaria de volta pra cá. */
  staticSlots?: boolean;
  /** Protótipo: troca de campanha ao vivo. Ver `CampaignSwitcher`. */
  campaignId?: string;
  onCampaignChange?: (id: string) => void;
};

export function GiftProgressBlock({
  progress,
  giftItem,
  variant = "drawer",
  canChoose = true,
  onChoose,
  onNavigate,
  staticSlots = false,
  campaignId,
  onCampaignChange,
}: GiftProgressBlockProps) {
  const compact = variant === "drawer";
  const { campaign, unlocked, ratio, remainingLabel, counted, goalLabel, required } = progress;

  const title = unlocked
    ? giftItem
      ? "Brinde adicionado ao carrinho"
      : "Você liberou um brinde"
    : remainingLabel;

  const listingHref = staticSlots ? null : `/produtos?campanha=${campaign.id}`;

  return (
    <div
      className={`overflow-hidden rounded-card-md border ${
        unlocked ? "border-primary/18 bg-primary/[0.06]" : "border-foreground/8 bg-foreground/[0.03]"
      }`}
    >
      {campaignId && onCampaignChange && (
        <CampaignSwitcher current={campaignId} onChange={onCampaignChange} />
      )}
      <div className={compact ? "px-4 py-3.5" : "px-5 py-4"}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary">
              <Gift size={15} />
            </div>
            <div className="min-w-0">
              <p
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "var(--text-base)",
                  fontWeight: "600",
                  lineHeight: 1.25,
                }}
              >
                {title}
              </p>
              {/* Só na campanha de SKUs nomeados. Nas metas de régua o rótulo
                  do fim já diz a meta ("3 produtos"), e a frase repetia o
                  título com outras palavras. */}
              {!unlocked && required && (
                <p
                  className="mt-0.5 text-foreground/40"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                >
                  {campaign.headline}
                </p>
              )}
            </div>
          </div>
          {unlocked && canChoose && (
            <button
              onClick={onChoose}
              className="flex-shrink-0 cursor-pointer text-primary transition-opacity hover:opacity-80"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: "700",
                letterSpacing: "0.08em",
              }}
            >
              {giftItem ? "TROCAR" : "ESCOLHER"}
            </button>
          )}
        </div>

        {required ? (
          <RequiredList items={required} compact={compact} />
        ) : (
          <>
            <ProgressRuler ratio={ratio} unlocked={unlocked} goalLabel={goalLabel} counted={counted} />
            {campaign.goal.kind !== "subtotal" && listingHref && !unlocked && (
              <Link
                to={listingHref}
                onClick={onNavigate}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-pill border border-foreground/10 py-2 text-foreground/60 transition-colors hover:border-primary/30 hover:text-primary"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                {campaign.goal.kind === "eligible"
                  ? `VER OS ${(campaign.catalogNoun ?? "produtos").toUpperCase()} QUE VALEM`
                  : "ESCOLHER MAIS UM PRODUTO"}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * A régua. Uma só para valor, quantidade e categoria — o que muda é o rótulo
 * do fim e, nas metas contáveis, o marcador `2/3` no lugar do zero à esquerda.
 */
function ProgressRuler({
  ratio,
  unlocked,
  goalLabel,
  counted,
}: {
  ratio: number;
  unlocked: boolean;
  goalLabel: string;
  counted: GiftProgress["counted"];
}) {
  return (
    <div className="mt-3">
      <div className="h-1.5 overflow-hidden rounded-full bg-foreground/6">
        <motion.div
          initial={false}
          animate={{ width: `${Math.min(1, ratio) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-linear-to-r from-primary to-primary/65"
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span
          className={counted && counted.done > 0 ? "text-foreground/60" : "text-foreground/25"}
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: "600",
            letterSpacing: "0.12em",
          }}
        >
          {/* Na meta contável o começo da régua carrega o placar, que é a
              informação que a barra sozinha não dá com precisão. */}
          {counted ? `${counted.done}/${counted.target}` : "0"}
        </span>
        <span
          className={`flex items-center gap-1.5 ${unlocked ? "text-primary" : "text-foreground/35"}`}
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: "700",
            letterSpacing: "0.12em",
          }}
        >
          <Sparkles size={11} />
          BRINDE
        </span>
        <span
          className="text-foreground/25"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: "600",
            letterSpacing: "0.12em",
          }}
        >
          {goalLabel}
        </span>
      </div>
    </div>
  );
}

/**
 * Campanha de SKUs nomeados: a lista É o progresso.
 *
 * Régua aqui responderia "quanto falta" quando a pergunta é "o quê falta".
 * Cada linha diz o produto, o preço, e o estado: no carrinho (marcado) ou um
 * botão que resolve na hora. A pessoa cumpre a campanha sem sair do carrinho.
 */
function RequiredList({
  items,
  compact,
}: {
  items: NonNullable<GiftProgress["required"]>;
  compact: boolean;
}) {
  const { addItem } = useCart();

  return (
    <div className={`mt-3 grid gap-2 ${compact ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
      {items.map(({ product, inCart }) => (
        <div
          key={`req-${product.id}`}
          className={`flex items-center gap-2.5 rounded-card-sm border p-2 transition-colors ${
            inCart ? "border-primary/25 bg-primary/[0.05]" : "border-foreground/8 bg-foreground/[0.02]"
          }`}
        >
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-foreground/[0.04]">
            <ImageWithFallback
              src={getPrimaryProductImage(product)}
              alt=""
              className={`h-full w-full ${artFitClass(getPrimaryProductImage(product), "p-1")}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`line-clamp-2 ${inCart ? "text-foreground/75" : "text-foreground/70"}`}
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
            >
              {product.name}
            </p>
            <p
              className="text-foreground/40"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
            >
              {product.price}
            </p>
          </div>

          {inCart ? (
            <span
              aria-label="Já está no carrinho"
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white"
            >
              <Check size={13} strokeWidth={3} />
            </span>
          ) : (
            <button
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: getPrimaryProductImage(product),
                })
              }
              aria-label={`Adicionar ${product.name} ao carrinho`}
              className="flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/12 text-foreground/45 transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Plus size={13} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Seletor de campanha — ANDAIME DE PROTÓTIPO, não faz parte da loja.
 *
 * Existe porque as campanhas não podem rodar juntas e o cliente precisa ver
 * todas. Não usa `?brinde=` sozinho porque o carrinho vive só em memória:
 * recarregar para trocar de regra esvaziava a cesta e a campanha não tinha
 * sobre o que agir. Trocar aqui é troca de estado, o carrinho fica de pé.
 *
 * Some sozinho no build de produção (`import.meta.env.DEV`). Ao levar para o
 * Magento, apagar este componente e o store por trás dele: lá a campanha é a
 * regra de carrinho ativa, e não há o que escolher na tela.
 */
const CAMPAIGN_TABS = [
  { id: "valor", label: "VALOR" },
  { id: "qtd", label: "QUANTIDADE" },
  { id: "categoria", label: "CATEGORIA" },
  { id: "itens", label: "PRODUTOS" },
];

function CampaignSwitcher({ current, onChange }: { current: string; onChange: (id: string) => void }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-dashed border-foreground/10 bg-foreground/[0.02] px-3 py-2">
      <span
        className="mr-1 text-foreground/25"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em" }}
      >
        TESTE
      </span>
      {CAMPAIGN_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          aria-pressed={current === tab.id}
          className={`cursor-pointer rounded-pill px-2.5 py-1 transition-colors ${
            current === tab.id
              ? "bg-primary/15 text-primary"
              : "text-foreground/35 hover:bg-foreground/[0.05] hover:text-foreground/70"
          }`}
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em" }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
