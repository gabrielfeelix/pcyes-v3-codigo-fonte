import { Gift } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts } from "./productsData";
import type { GiftDef } from "./PreOrderData";

type GiftInfo = { gift?: GiftDef } | null | undefined;

/**
 * Compre e ganhe — o brinde aparece com FOTO, não só escrito.
 *
 * "Ganhe um brinde" em texto ninguém lê; a cadeira ao lado do monitor
 * se vê de relance. Dois formatos:
 *   GiftCardChip  — selo no pé da imagem do ProductCard (vitrine, categoria)
 *   GiftOfferBlock — bloco na PDP, acima do botão de reservar
 * O carrinho já adiciona o brinde sozinho; aqui é só comunicação.
 */

function useGift(info: GiftInfo) {
  if (!info?.gift) return null;
  const product = allProducts.find((p) => p.id === info.gift!.productId);
  if (!product) return null;
  return { product, name: product.name, cardLabel: info.gift.cardLabel };
}

const thumbStyle = {
  background: "#fff",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 6px 14px -6px rgba(0,0,0,0.6)",
};

export function GiftCardRow({ info, className = "" }: { info: GiftInfo; className?: string }) {
  const gift = useGift(info);
  if (!gift) return null;

  /* Fica no pé da imagem do card, com o mesmo respiro da pill de pré-venda
     no topo. Foto grande o bastante para reconhecer a cadeira e o nome
     inteiro legível. */
  return (
    <div
      className={`flex items-center gap-2 md:gap-2.5 p-1 pr-2 md:p-1.5 md:pr-3 ${className}`}
      style={{
        borderRadius: "14px",
        background: "linear-gradient(rgba(76,175,80,0.10), rgba(76,175,80,0.10)), rgba(10,10,12,0.78)",
        border: "1px solid rgba(76,175,80,0.30)",
        backdropFilter: "blur(10px)",
      }}
    >
      <span className="h-9 w-9 md:h-11 md:w-11 flex-shrink-0 overflow-hidden rounded-[10px]" style={{ background: "#fff" }}>
        <ImageWithFallback src={gift.product.image} alt={gift.product.name} className="h-full w-full object-contain p-1" />
      </span>
      <span className="min-w-0">
        <span
          className="flex items-center gap-1 whitespace-nowrap"
          style={{ color: "#5fd068", fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.2 }}
        >
          <Gift size={11} strokeWidth={2.4} />
          <span className="md:hidden">Brinde</span>
          <span className="hidden md:inline">Ganhe de brinde</span>
        </span>
        <span
          className="mt-0.5 line-clamp-2 text-white text-[11.5px] md:text-[13px]" title={gift.name}
          style={{ fontFamily: "var(--font-family-inter)", fontWeight: 600, lineHeight: 1.25 }}
        >
          {gift.name}
        </span>
      </span>
    </div>
  );
}

export function GiftOfferBlock({ info, className = "" }: { info: GiftInfo; className?: string }) {
  const gift = useGift(info);
  if (!gift) return null;

  return (
    <div
      className={`relative flex items-center gap-3.5 overflow-hidden p-3 ${className}`}
      style={{
        borderRadius: "var(--radius-card-md)",
        background: "linear-gradient(120deg, rgba(255,36,25,0.16) 0%, rgba(255,36,25,0.04) 70%)",
        border: "1px solid rgba(255,36,25,0.35)",
      }}
    >
      <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-[14px]" style={thumbStyle}>
        <ImageWithFallback src={gift.product.image} alt={gift.product.name} className="h-full w-full object-contain p-1" />
      </span>

      <div className="min-w-0 flex-1">
        <p
          className="flex items-center gap-1.5 text-[#ff4a3d]"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          <Gift size={12} strokeWidth={2.4} /> Compre e ganhe
        </p>
        <p
          className="mt-1 line-clamp-2 text-ink-strong"
          title={gift.name}
          style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 650, lineHeight: 1.2 }}
        >
          {gift.name}
        </p>
        <p className="mt-1 flex items-baseline gap-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
          <span className="line-through text-ink-subtle">{gift.product.price}</span>
          <span className="text-[#4CAF50]" style={{ fontWeight: 800, letterSpacing: "0.06em" }}>GRÁTIS</span>
          <span className="text-ink-muted">· vai junto no pedido</span>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTE DE SELOS (?selos=1 na categoria): 4 jeitos de mostrar o brinde
   no card, lado a lado, para escolher um.
     float  — A: linha flutuante no pé da imagem (atual)
     bundle — B: combo, foto grande da cadeira no canto com "+"
     band   — C: faixa colada na base, de borda a borda, com o valor
     seal   — D: selo redondo girando "compre e ganhe", como no banner
   ═══════════════════════════════════════════════════════ */

export type GiftLook = "float" | "bundle" | "band" | "seal" | "ribbon" | "tag" | "ticket" | "value";
export const GIFT_LOOKS: GiftLook[] = ["float", "bundle", "band", "seal", "ribbon", "tag", "ticket", "value"];

export function GiftBadge({ info, look = "float", hoverHide = "" }: { info: GiftInfo; look?: GiftLook; hoverHide?: string }) {
  const gift = useGift(info);
  if (!gift) return null;
  const fade = `transition-opacity duration-200 ${hoverHide}`;

  if (look === "float") {
    return <GiftCardRow info={info} className={`absolute bottom-3 left-3 right-3 z-10 ${fade}`} />;
  }

  if (look === "bundle") {
    return (
      <div className={`absolute bottom-3 right-3 z-10 flex flex-col items-center ${fade}`}>
        <div className="relative">
          <span
            className="absolute -left-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white"
            style={{ background: "#16a34a", boxShadow: "0 0 0 3px rgba(12,12,14,0.9)", fontFamily: "var(--font-family-figtree)", fontSize: "18px", fontWeight: 800, lineHeight: 1 }}
          >
            +
          </span>
          <span className="block h-16 w-16 md:h-24 md:w-24 overflow-hidden rounded-[16px]" style={{ background: "#fff", boxShadow: "0 12px 28px -10px rgba(0,0,0,0.7)" }}>
            <ImageWithFallback src={gift.product.image} alt={gift.product.name} className="h-full w-full object-contain p-1.5" />
          </span>
        </div>
        <span
          className="-mt-2.5 relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-white"
          style={{ background: "#16a34a", fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1 }}
        >
          <Gift size={10} strokeWidth={2.6} /> Grátis
        </span>
      </div>
    );
  }

  if (look === "band") {
    return (
      <div
        className={`absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 px-3 py-2.5 ${fade}`}
        style={{
          background: "linear-gradient(90deg, rgba(22,101,52,0.96) 0%, rgba(21,128,61,0.92) 100%)",
          borderTop: "1px solid rgba(134,239,172,0.35)",
        }}
      >
        <span className="h-9 w-9 md:h-10 md:w-10 flex-shrink-0 overflow-hidden rounded-[9px]" style={{ background: "#fff" }}>
          <ImageWithFallback src={gift.product.image} alt={gift.product.name} className="h-full w-full object-contain p-1" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block whitespace-nowrap text-white/75" style={{ fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Compre e ganhe
          </span>
          <span className="mt-0.5 line-clamp-2 text-white text-[12px] md:text-[13px]" title={gift.name} style={{ fontFamily: "var(--font-family-inter)", fontWeight: 700 }}>
            {gift.name}
          </span>
        </span>
        <span className="hidden md:block flex-shrink-0 text-right leading-tight">
          <span className="block text-white/60 line-through" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px" }}>{gift.product.price}</span>
          <span className="block text-white" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11px", fontWeight: 900, letterSpacing: "0.1em" }}>GRÁTIS</span>
        </span>
      </div>
    );
  }

  const thumb = (cls: string, pad = "p-1") => (
    <span className={`flex-shrink-0 overflow-hidden ${cls}`} style={{ background: "#fff" }}>
      <ImageWithFallback src={gift.product.image} alt={gift.product.name} className={`h-full w-full object-contain ${pad}`} />
    </span>
  );
  const valueShort = gift.product.price.replace(/,\d{2}$/, "");

  if (look === "ribbon") {
    /* Fita diagonal no canto: clássica de varejo, lida de longe. */
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${fade}`} style={{ borderRadius: "var(--radius-card-lg)" }}>
        <div
          className="absolute flex items-center justify-center gap-1.5 text-white"
          style={{
            width: "240px", right: "-64px", top: "46px", transform: "rotate(45deg)", padding: "6px 0",
            background: "linear-gradient(90deg, #15803d, #16a34a)",
            boxShadow: "0 6px 16px -6px rgba(0,0,0,0.6)",
            fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
          }}
        >
          <Gift size={11} strokeWidth={2.6} /> + Cadeira grátis
        </div>
        <div className="absolute bottom-3 right-3 pointer-events-auto">
          {thumb("block h-12 w-12 md:h-14 md:w-14 rounded-[12px]")}
        </div>
      </div>
    );
  }

  if (look === "tag") {
    /* Tag empilhada sob a pill de pré-venda: um sistema só de etiquetas
       no canto superior esquerdo. */
    return (
      <span
        className={`absolute left-3 top-[44px] z-10 inline-flex items-center gap-1.5 rounded-full py-[3px] pl-[3px] pr-2.5 text-white ${fade}`}
        style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", boxShadow: "0 6px 16px -4px rgba(22,163,74,0.55)" }}
      >
        {thumb("block h-6 w-6 rounded-full", "p-[2px]")}
        <span className="whitespace-nowrap" style={{ fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          + Cadeira grátis
        </span>
      </span>
    );
  }

  if (look === "ticket") {
    /* Cupom: recortes nas laterais e divisória tracejada. */
    const notch = { background: "var(--background)", border: "1px solid rgba(95,208,104,0.45)" };
    return (
      <div className={`absolute bottom-3 left-3 right-3 z-10 ${fade}`}>
        <div className="relative flex items-stretch overflow-hidden rounded-[12px]" style={{ background: "rgba(10,10,12,0.85)", border: "1px dashed rgba(95,208,104,0.55)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center p-2">{thumb("block h-10 w-10 md:h-11 md:w-11 rounded-[8px]")}</div>
          <div className="my-2 border-l border-dashed" style={{ borderColor: "rgba(95,208,104,0.45)" }} />
          <div className="min-w-0 flex-1 px-3 py-2 leading-tight">
            <span className="block" style={{ color: "#5fd068", fontFamily: "var(--font-family-inter)", fontSize: "9.5px", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Vale-brinde
            </span>
            <span className="mt-0.5 line-clamp-2 text-white text-[11.5px] md:text-[13px]" title={gift.name} style={{ fontFamily: "var(--font-family-inter)", fontWeight: 700 }}>
              {gift.name}
            </span>
          </div>
        </div>
        <span className="absolute -left-[7px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full" style={notch} />
        <span className="absolute -right-[7px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full" style={notch} />
      </div>
    );
  }

  if (look === "value") {
    /* Valor em primeiro plano: o número é o que prende. */
    return (
      <div className={`absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2 ${fade}`}>
        <div className="leading-none">
          <span className="block text-white/70" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Leve junto
          </span>
          <span className="mt-1 block text-[26px] md:text-[34px]" style={{ color: "#5fd068", fontFamily: "var(--font-family-figtree)", fontWeight: 800, letterSpacing: "-0.03em", textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
            +{valueShort}
          </span>
          <span className="mt-1 block text-white" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11.5px", fontWeight: 700 }}>
            em brinde · {gift.cardLabel}
          </span>
        </div>
        {thumb("block h-12 w-12 md:h-16 md:w-16 rounded-[12px]")}
      </div>
    );
  }

  // seal
  const ring = "COMPRE E GANHE • COMPRE E GANHE • ";
  return (
    <div className={`absolute bottom-3 right-3 z-10 h-20 w-20 md:h-[104px] md:w-[104px] ${fade}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ animation: "spin 18s linear infinite" }} aria-hidden="true">
        <defs>
          <path id="gift-seal-ring" d="M50,50 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" />
        </defs>
        <circle cx="50" cy="50" r="49" fill="rgba(10,10,12,0.85)" stroke="rgba(95,208,104,0.55)" strokeWidth="1" />
        <text fill="#5fd068" style={{ fontFamily: "var(--font-family-inter)", fontSize: "9.2px", fontWeight: 900, letterSpacing: "1.6px" }}>
          <textPath href="#gift-seal-ring">{ring}</textPath>
        </text>
      </svg>
      <span className="absolute inset-[22%] overflow-hidden rounded-full" style={{ background: "#fff" }}>
        <ImageWithFallback src={gift.product.image} alt={gift.product.name} className="h-full w-full object-contain p-1" />
      </span>
    </div>
  );
}
