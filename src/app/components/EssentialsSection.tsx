"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage, getProductSwatches, getProductVariants } from "./productPresentation";
import { CTAButton } from "./section";

const ESSENTIAL_IDS = [128, 173, 72, 436, 329] as const;

interface EssentialCardProps {
  product: Product;
}

function EssentialCard({ product }: EssentialCardProps) {
  const { addItem } = useCart();
  const [selectedSwatchId, setSelectedSwatchId] = useState<number | null>(null);

  const swatches = getProductSwatches(product);
  // Cor já é coberta pelas swatches; variações só aparecem quando o que muda
  // na linha é outra coisa (switch, driver, conectividade, tamanho).
  const variants = swatches.length > 0 ? [] : getProductVariants(product);
  const selectedProduct = selectedSwatchId
    ? allProducts.find((p) => p.id === selectedSwatchId) ?? product
    : product;
  const image = getPrimaryProductImage(selectedProduct);
  const productHref = `/produto/${product.id}`;

  const shortDescription = useMemo(() => {
    const raw = product.description ?? "";
    const firstParagraph = raw.split("\n").find((line) => line.trim().length > 0) ?? "";
    return firstParagraph.length > 160
      ? `${firstParagraph.slice(0, 157).trim()}...`
      : firstParagraph;
  }, [product.description]);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image,
    });
  };

  return (
    <article
      className="essential-card group relative grid grid-cols-1 md:grid-cols-[2fr_3fr] overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.10) 0%, rgba(var(--foreground-rgb), 0.03) 100%)",
        border: "1px solid rgba(var(--foreground-rgb), 0.08)",
        borderRadius: "var(--radius-card-lg)",
        minHeight: "460px",
      }}
    >
      {/* Inner shine */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 25% 15%, rgba(var(--foreground-rgb), 0.06) 0%, transparent 55%)",
          borderRadius: "var(--radius-card-lg)",
        }}
      />
      {/* Image side — painel com fundo próprio, distinto do card */}
      <Link
        to={productHref}
        className="relative flex items-center justify-center p-3 md:p-4 group"
      >
        <div
          className="pointer-events-none absolute inset-3 md:inset-4"
          style={{
            background: "var(--surface-0)",
            border: "1px solid rgba(var(--foreground-rgb), 0.06)",
            borderRadius: "calc(var(--radius-card-lg) - 6px)",
          }}
        />
        <ImageWithFallback
          src={image}
          alt={product.name}
          className="relative z-10 max-h-[200px] md:max-h-[280px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.55))" }}
        />
      </Link>

      {/* Info side */}
      <div className="relative flex flex-col pl-4 pr-7 py-7 md:pl-4 md:pr-8 md:py-8 gap-5">
        <div className="flex flex-col gap-2">
          <Link
            to={productHref}
            className="text-ink-strong"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(20px, 1.9vw, 24px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              maxWidth: "85%",
            }}
          >
            {product.name}
          </Link>
        </div>

        {shortDescription && (
          <p
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.55,
              color: "rgba(var(--foreground-rgb), 0.55)",
            }}
          >
            {shortDescription}
          </p>
        )}

        {swatches.length > 0 && (
          <div className="flex flex-col gap-2 mt-1">
            <span
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 500,
                color: "rgba(var(--foreground-rgb), 0.6)",
              }}
            >
              Cores:
            </span>
            <div className="flex items-center gap-2">
            {swatches.map((s) => (
              <button
                key={s.productId}
                type="button"
                onClick={() => setSelectedSwatchId(s.productId === selectedSwatchId ? null : s.productId)}
                className="p-3 md:p-1.5 -m-3 md:-m-1.5 cursor-pointer"
                aria-label={s.label}
              >
                <span
                  className="block h-4 w-4 rounded-full transition-all hover:scale-110"
                  style={{
                    background: s.color,
                    border: selectedSwatchId === s.productId
                      ? "2px solid rgba(225, 6, 0, 0.9)"
                      : "1px solid rgba(var(--foreground-rgb), 0.22)",
                    boxShadow: selectedSwatchId === s.productId
                      ? "0 0 10px rgba(225, 6, 0, 0.5)"
                      : "none",
                  }}
                />
              </button>
            ))}
            </div>
          </div>
        )}

        {variants.length > 0 && (
          <div className="flex flex-col gap-2 mt-1">
            <span
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 500,
                color: "rgba(var(--foreground-rgb), 0.6)",
              }}
            >
              Variações:
            </span>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => {
                const active = selectedSwatchId === variant.productId;
                return (
                  <button
                    key={variant.productId}
                    type="button"
                    onClick={() =>
                      setSelectedSwatchId(active ? null : variant.productId)
                    }
                    title={variant.name}
                    className="cursor-pointer rounded-full px-3 py-1.5 transition-all hover:scale-[1.03]"
                    style={{
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-caption)",
                      fontWeight: 500,
                      color: active
                        ? "var(--primary)"
                        : "rgba(var(--foreground-rgb), 0.7)",
                      background: active
                        ? "rgba(225, 6, 0, 0.12)"
                        : "rgba(var(--foreground-rgb), 0.05)",
                      border: active
                        ? "1px solid rgba(225, 6, 0, 0.55)"
                        : "1px solid rgba(var(--foreground-rgb), 0.10)",
                    }}
                  >
                    {variant.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price + qty + CTA */}
        <div
          data-keep-dark
          className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl px-5 py-3.5"
          style={{
            background: "rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(var(--foreground-rgb), 0.06)",
          }}
        >
          <span
            className="text-ink-strong whitespace-nowrap"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "var(--text-xl)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            {product.price}
          </span>

          <CTAButton
            onClick={handleAdd}
            variant="buy"
            size="md"
            className="min-h-[44px] cursor-pointer"
          >
            Comprar
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

export function EssentialsSection() {
  const products = useMemo(() => {
    const byId = new Map(allProducts.map((p) => [p.id, p]));
    return ESSENTIAL_IDS.map((id) => byId.get(id)).filter(
      (p): p is Product => Boolean(p),
    );
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [products]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-essential-card]");
    const cardW = card?.offsetWidth ?? 720;
    el.scrollBy({ left: dir * (cardW + 24), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section
      className="px-5 md:px-[72px]"
      style={{
        paddingTop: "var(--space-section-lg)",
        paddingBottom: "var(--space-section-sm)",
        background: "var(--surface-0)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-10">
          <p
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "var(--primary)",
              marginBottom: "10px",
            }}
          >
            // ITENS EM DESTAQUE
          </p>
          <h2
            className="text-ink-strong"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(28px, 3.4vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "640px",
            }}
          >
            Essenciais para começar seu setup
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="absolute left-3 md:left-6 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-edge bg-black/60 text-ink backdrop-blur-md transition-all hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/15 hover:text-ink-strong hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>

          <button
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Próximo"
            className="absolute right-3 md:right-6 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-edge bg-black/60 text-ink backdrop-blur-md transition-all hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/15 hover:text-ink-strong hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>

          <div
            ref={scrollRef}
            className="essentials-track flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                data-essential-card
                className="snap-start flex-shrink-0"
                style={{ width: "min(940px, 90vw)" }}
              >
                <EssentialCard product={product} />
              </div>
            ))}
          </div>

          {/* Gradient fade right */}
          {canNext && (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 md:w-40"
              style={{
                background:
                  "linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0) 100%)",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
