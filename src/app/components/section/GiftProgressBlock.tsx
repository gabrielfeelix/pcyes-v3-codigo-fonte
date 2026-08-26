import { Link } from "react-router";
import { motion } from "motion/react";
import { Check, Gift, Plus, Sparkles } from "lucide-react";
import type { GiftProgress } from "../../lib/giftCampaign";
import type { CartItem } from "../CartContext";
import { artFitClass } from "../../lib/setupImages";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { formatBRL } from "../../../utils/format";

/**
 * Progresso da campanha de brinde. Uma primitiva por GRANDEZA, não por
 * campanha:
 *
 * - meta de valor      → barra contínua (dinheiro não tem casas)
 * - meta de quantidade → vagas (produto distinto é contável, e a vaga mostra
 *                        QUEM a ocupou — sem isso, subir o stepper parece bug)
 * - meta com lista     → as mesmas vagas + um link para a listagem recortada
 *
 * O bloco NÃO recomenda produto. Uma campanha pode ter mais de cem peças
 * elegíveis, e escolher seis para mostrar no carrinho é vitrine disfarçada de
 * progresso: ocupa a altura que os itens do carrinho precisam e empurra
 * escolha onde a pessoa já escolheu. Quem quer navegar catálogo vai para a
 * listagem, que é a tela feita para isso.
 *
 * `variant` só muda densidade: `drawer` cabe em 462px de sidebar, `page` tem a
 * coluna larga do carrinho.
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
  /** `true` na própria listagem da campanha: lá a vaga levaria de volta pra cá. */
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
  const { campaign, unlocked, ratio, remainingLabel, slots, missing } = progress;

  const title = unlocked
    ? giftItem
      ? "Brinde adicionado ao carrinho"
      : "Você liberou um brinde"
    : remainingLabel;

  const slotSize = compact ? "h-[52px] w-[52px]" : "h-16 w-16";

  /* A vaga vazia É o caminho para preenchê-la — por isso não existe botão
     "ver os N" separado: seria um segundo alvo para a mesma intenção, e o
     primeiro alvo que a pessoa tenta é o buraco. Lista fechada leva à listagem
     recortada pela campanha; meta de quantidade qualquer leva ao catálogo
     inteiro, que é o conjunto elegível dela. */
  const slotHref = staticSlots
    ? null
    : campaign.goal.kind === "eligible"
      ? `/produtos?campanha=${campaign.id}`
      : "/produtos";

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
              {/* A frase da campanha some quando a meta é valor: lá a régua já
                  diz o limite, e repetir inchava o bloco. Nas metas discretas
                  ela é a única coisa que explica a conta. */}
              {!unlocked && slots && (
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

        {slots ? (
          <SlotRow slots={slots} size={slotSize} href={slotHref} onNavigate={onNavigate} />
        ) : (
          <ValueRuler ratio={ratio} unlocked={unlocked} target={campaign.goal.kind === "subtotal" ? campaign.goal.target : 0} />
        )}

      </div>
    </div>
  );
}

/**
 * Seletor de campanha — ANDAIME DE PROTÓTIPO, não faz parte da loja.
 *
 * Existe porque as três campanhas não podem rodar juntas e o cliente precisa
 * ver as três. Não usa `?brinde=` sozinho porque o carrinho vive só em memória:
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
  { id: "itens", label: "ITENS DA LISTA" },
];

function CampaignSwitcher({ current, onChange }: { current: string; onChange: (id: string) => void }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex items-center gap-1 border-b border-dashed border-foreground/10 bg-foreground/[0.02] px-3 py-2">
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

/** Meta de valor: a régua contínua que já existia, sem mudança de desenho. */
function ValueRuler({ ratio, unlocked, target }: { ratio: number; unlocked: boolean; target: number }) {
  return (
    <div className="mt-3">
      <div className="h-1.5 overflow-hidden rounded-full bg-foreground/6">
        <motion.div
          initial={false}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-linear-to-r from-primary to-primary/65"
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span
          className="text-foreground/25"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "600", letterSpacing: "0.12em" }}
        >
          0
        </span>
        <span
          className={`flex items-center gap-1.5 ${unlocked ? "text-primary" : "text-foreground/35"}`}
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "700", letterSpacing: "0.12em" }}
        >
          <Sparkles size={11} />
          BRINDE
        </span>
        <span
          className="text-foreground/25"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "600", letterSpacing: "0.12em" }}
        >
          {formatBRL(target)}
        </span>
      </div>
    </div>
  );
}

/**
 * Meta discreta: uma vaga por unidade da meta.
 *
 * A vaga cheia mostra a foto do produto que a ocupou. É o que impede a leitura
 * errada de "aumentei a quantidade e não andou": a pessoa vê que aquele mouse
 * já tem vaga, e que o que falta é peça DIFERENTE.
 */
function SlotRow({
  slots,
  size,
  href,
  onNavigate,
}: {
  slots: GiftProgress["slots"];
  size: string;
  href?: string | null;
  onNavigate?: () => void;
}) {
  if (!slots) return null;
  const filled = slots.filter((slot) => slot.filled).length;

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        {slots.map((slot, index) => {
          const key = `gift-slot-${index}`;
          if (!slot.filled) {
            const label = `Vaga ${index + 1} de ${slots.length}, vazia`;
            const shape = `${size} flex flex-shrink-0 items-center justify-center rounded-xl border border-dashed border-foreground/15 text-foreground/25`;
            if (!href) {
              return (
                <div key={key} aria-label={label} className={shape} >
                  <Plus size={14} />
                </div>
              );
            }
            return (
              <Link
                key={key}
                to={href}
                onClick={onNavigate}
                aria-label={`${label} — escolher uma peça`}
                className={`${shape} transition-colors hover:border-primary/40 hover:text-primary`}
              >
                <Plus size={14} />
              </Link>
            );
          }
          return (
            <motion.div
              key={key}
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              title={slot.item.name}
              aria-label={`Vaga ${index + 1} de ${slots.length}, ocupada por ${slot.item.name}`}
              className={`${size} relative flex-shrink-0 overflow-hidden rounded-xl border border-primary/30 bg-foreground/[0.04]`}
            >
              <ImageWithFallback
                src={slot.item.image}
                alt=""
                className={`h-full w-full ${artFitClass(slot.item.image, "p-1")}`}
              />
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                <Check size={9} strokeWidth={3} />
              </span>
            </motion.div>
          );
        })}

        <span
          className="ml-1 flex-shrink-0 text-foreground/35"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          {filled}/{slots.length}
        </span>
      </div>
    </div>
  );
}
