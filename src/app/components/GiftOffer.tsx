import { Gift } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts, type Product } from "./productsData";
import type { GiftDef } from "./PreOrderData";

type GiftInfo = { gift?: GiftDef } | null | undefined;

/**
 * Compre e ganhe — o brinde aparece com FOTO e nome, não só "ganhe brinde".
 *
 *   GiftBand       — faixa verde colada na base da imagem do card (opção C)
 *   GiftInline     — a mesma faixa, solta, para o card em lista
 *   GiftOfferBlock — bloco na PDP, um brinde por linha
 *
 * Aceita mais de um brinde (ex.: 2 fones + 1 mouse): as fotos empilham com
 * a quantidade em cada uma, o texto vira "N brindes" e o valor é o total.
 * O carrinho já adiciona os brindes; aqui é só comunicação.
 */

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

type ResolvedItem = { product: Product; qty: number };

function useGift(info: GiftInfo) {
  const items: ResolvedItem[] = (info?.gift?.items ?? [])
    .map((it) => ({ product: allProducts.find((p) => p.id === it.productId)!, qty: it.qty ?? 1 }))
    .filter((it) => it.product);
  if (!items.length) return null;
  const count = items.reduce((n, it) => n + it.qty, 0);
  const value = items.reduce((n, it) => n + it.product.priceNum * it.qty, 0);
  const multi = items.length > 1 || count > 1;
  const label = items.map((it) => `${it.qty > 1 ? `${it.qty}× ` : ""}${it.product.name}`).join(" + ");
  return { items, count, value, multi, label };
}

const GREEN = "#5fd068";
const bandBg = "linear-gradient(90deg, rgba(22,101,52,0.96) 0%, rgba(21,128,61,0.92) 100%)";
const eyebrow = {
  fontFamily: "var(--font-family-inter)",
  fontSize: "9.5px",
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

/** Fotos dos brindes empilhadas, com a quantidade quando passa de 1.
    No card cabem 2 fotos (1 no celular); o resto vira um quadrado "+N". */
function GiftThumbs({ items, size }: { items: ResolvedItem[]; size: string }) {
  const shown = items.slice(0, 2);
  const tile = (n: number, cls: string) => (
    <span
      className={`relative ${size} -ml-3 flex-shrink-0 items-center justify-center rounded-[9px] text-white ${cls}`}
      style={{ background: "#0f3d22", boxShadow: "-3px 0 0 0 rgba(21,110,55,1)", fontFamily: "var(--font-family-inter)", fontSize: "12px", fontWeight: 900 }}
    >
      +{n}
    </span>
  );
  return (
    <span className="flex flex-shrink-0 items-center">
      {shown.map((it, i) => (
        <span
          key={it.product.id}
          className={`relative ${size} flex-shrink-0 rounded-[9px] ${i > 0 ? "-ml-3 hidden sm:block" : ""}`}
          style={{ background: "#fff", boxShadow: i > 0 ? "-3px 0 0 0 rgba(21,110,55,1)" : undefined, zIndex: shown.length - i + 1 }}
        >
          <ImageWithFallback src={it.product.image} alt={it.product.name} className="h-full w-full rounded-[9px] object-contain p-1" />
          {it.qty > 1 && (
            <span
              className="absolute -bottom-1 -right-1 rounded-full px-1 text-white"
              style={{ background: "#111", border: "1.5px solid #16a34a", fontFamily: "var(--font-family-inter)", fontSize: "9px", fontWeight: 900, lineHeight: "14px" }}
            >
              {it.qty}×
            </span>
          )}
        </span>
      ))}
      {items.length > 1 && tile(items.length - 1, "flex sm:hidden")}
      {items.length > 2 && tile(items.length - 2, "hidden sm:flex")}
    </span>
  );
}

function BandContent({ gift }: { gift: NonNullable<ReturnType<typeof useGift>> }) {
  /* Duas linhas. Um brinde: chamada + valor, e o nome. Vários: as fotos
     contam o que é; o texto só diz quantos (nomes e valor total na PDP —
     no card o valor não cabia ao lado das fotos). */
  const strike = (
    <span className="hidden sm:inline min-w-0 truncate text-white/60 line-through" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10.5px" }}>
      {BRL.format(gift.value)}
    </span>
  );
  return (
    <>
      <GiftThumbs items={gift.items} size="h-9 w-9" />
      {gift.multi ? (
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-baseline gap-2">
            <span className="whitespace-nowrap text-white/75" style={eyebrow}>
              <span className="sm:hidden">Ganhe</span>
              <span className="hidden sm:inline">Compre e ganhe</span>
            </span>
          </span>
          <span className="mt-0.5 block whitespace-nowrap text-white text-[12px] md:text-[13px]" style={{ fontFamily: "var(--font-family-inter)", fontWeight: 800 }}>
            {gift.count} brindes<span className="hidden sm:inline"> grátis</span>
          </span>
        </span>
      ) : (
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-baseline gap-2">
            <span className="whitespace-nowrap text-white" style={{ ...eyebrow, fontWeight: 900 }}>Brinde grátis</span>
            {strike}
          </span>
          <span
            className="mt-0.5 block truncate text-white text-[12px] md:text-[13px]"
            title={gift.label}
            style={{ fontFamily: "var(--font-family-inter)", fontWeight: 700 }}
          >
            {gift.label}
          </span>
        </span>
      )}
    </>
  );
}

/** Faixa no pé da imagem do card, de borda a borda. */
export function GiftBand({ info, className = "" }: { info: GiftInfo; className?: string }) {
  const gift = useGift(info);
  if (!gift) return null;
  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 px-3 py-2 ${className}`}
      style={{ background: bandBg, borderTop: "1px solid rgba(134,239,172,0.35)" }}
    >
      <BandContent gift={gift} />
    </div>
  );
}

/** A mesma faixa, solta, para o card em lista (foto pequena demais pra sobrepor). */
export function GiftInline({ info, className = "" }: { info: GiftInfo; className?: string }) {
  const gift = useGift(info);
  if (!gift) return null;
  return (
    <div
      className={`flex max-w-[520px] items-center gap-2.5 rounded-[12px] px-2.5 py-2 ${className}`}
      style={{ background: bandBg, border: "1px solid rgba(134,239,172,0.35)" }}
    >
      <BandContent gift={gift} />
    </div>
  );
}

/** Bloco da PDP: cabeçalho com o total e um brinde por linha. */
export function GiftOfferBlock({ info, className = "" }: { info: GiftInfo; className?: string }) {
  const gift = useGift(info);
  if (!gift) return null;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ borderRadius: "var(--radius-card-md)", border: "1px solid rgba(95,208,104,0.35)", background: "rgba(22,163,74,0.06)" }}
    >
      <div className="flex items-center justify-between gap-3 px-3.5 py-2.5" style={{ background: bandBg }}>
        <span className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-white" style={{ ...eyebrow, fontSize: "11px", fontWeight: 900, letterSpacing: "0.08em" }}>
          <Gift size={13} strokeWidth={2.4} className="flex-shrink-0" /> {gift.multi ? `Compre e ganhe ${gift.count} brindes` : "Compre e ganhe"}
        </span>
        <span className="flex items-baseline gap-2 whitespace-nowrap" style={{ fontFamily: "var(--font-family-inter)" }}>
          <span className="text-white/60 line-through" style={{ fontSize: "11px" }}>{BRL.format(gift.value)}</span>
          <span className="text-white" style={{ fontSize: "12px", fontWeight: 900, letterSpacing: "0.08em" }}>GRÁTIS</span>
        </span>
      </div>

      <ul className="divide-y divide-white/[0.06]">
        {gift.items.map((it) => (
          <li key={it.product.id} className="flex items-center gap-3 px-3 py-2.5">
            <span className="relative h-14 w-14 flex-shrink-0 rounded-[12px]" style={{ background: "#fff" }}>
              <ImageWithFallback src={it.product.image} alt={it.product.name} className="h-full w-full rounded-[12px] object-contain p-1" />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className="line-clamp-2 text-ink-strong"
                title={it.product.name}
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, lineHeight: 1.3 }}
              >
                {it.qty > 1 && <span style={{ color: GREEN, fontWeight: 900 }}>{it.qty}× </span>}
                {it.product.name}
              </span>
              <span className="mt-0.5 block text-ink-subtle line-through" style={{ fontFamily: "var(--font-family-inter)", fontSize: "11px" }}>
                {BRL.format(it.product.priceNum * it.qty)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
