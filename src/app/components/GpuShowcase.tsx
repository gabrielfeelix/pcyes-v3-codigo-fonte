"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, GripVertical } from "lucide-react";
import { CTAButton } from "./section";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage } from "./productPresentation";
import { artFitClass } from "../lib/setupImages";

interface Comparison {
  id: string;
  /** Produto do card abaixo do comparador. Sem ele, o card não aparece —
      2060 Super e 5060 não estão no catálogo. */
  productId?: number;
  newName: string;
  previousName: string;
  /** Artes finais do design (Site V2): antes e depois são fotos distintas,
      21:9 no desktop (2560×1097) e 4:3 no celular (1200×900). */
  before: { desktop: string; mobile: string };
  after: { desktop: string; mobile: string };
}

const gpuArt = (slug: string, side: "antes" | "depois") => ({
  desktop: `/gpu/${slug}-${side}-desktop.webp`,
  mobile: `/gpu/${slug}-${side}-mobile.webp`,
});

/* Sem métrica de FPS: não há número medido para esses pares, e percentual
   inventado numa vitrine de venda vira promessa. Entra quando houver teste. */
const COMPARISONS: Comparison[] = [
  {
    id: "rtx-2060-super",
    newName: "RTX 2060 Super",
    previousName: "GTX 1660 Super",
    before: gpuArt("gtx1660s-rtx2060s", "antes"),
    after: gpuArt("gtx1660s-rtx2060s", "depois"),
  },
  {
    id: "rtx-3060",
    productId: 433,
    newName: "RTX 3060",
    previousName: "RTX 2060",
    before: gpuArt("rtx2060-rtx3060", "antes"),
    after: gpuArt("rtx2060-rtx3060", "depois"),
  },
  {
    id: "rtx-5060",
    newName: "RTX 5060",
    previousName: "RTX 4060",
    before: gpuArt("rtx4060-rtx5060", "antes"),
    after: gpuArt("rtx4060-rtx5060", "depois"),
  },
];

const ACCENT = "#ff2419";
const ACCENT_GLOW = "rgba(225, 6, 0, 0.55)";
const ACCENT_BG = "var(--gradient-brand)";

export function GpuShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pos, setPos] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const active = COMPARISONS[activeIdx];
  const productById = useMemo(() => new Map(allProducts.map((p) => [p.id, p])), []);
  const product = (active.productId ? productById.get(active.productId) : undefined) as Product | undefined;

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      if ("touches" in e) e.preventDefault();
      const x = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      if (typeof x === "number") updatePosition(x);
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const startDrag = () => {
    draggingRef.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingRef.current) return;
    updatePosition(e.clientX);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section-lg)",
        paddingBottom: "var(--space-section-lg)",
        background: "var(--surface-0)",
      }}
    >


      <div className="relative w-full">
        {/* Header (contained) */}
        <div className="mb-10 md:mb-14 text-center px-5 md:px-[72px] mx-auto" style={{ maxWidth: "1600px" }}>
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "var(--primary)",
            }}
          >
            BEFORE / AFTER
          </p>
          <h2
            className="text-ink-strong mx-auto"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              maxWidth: "900px",
            }}
          >
            Sinta o salto visual com a{" "}
            <span style={{ color: ACCENT }}>nova geração</span>
          </h2>
          <p
            className="mx-auto mt-4"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-base)",
              color: "rgba(var(--foreground-rgb), 0.55)",
              maxWidth: "560px",
              lineHeight: 1.5,
            }}
          >
            Escolha uma placa e arraste para comparar a renderização entre gerações.
          </p>
        </div>

        {/* GPU pill selector (contained) */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 md:gap-3 px-5 md:px-[72px]">
          {COMPARISONS.map((c, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveIdx(i);
                  setPos(52);
                }}
                /* Respiro menor no celular: com `px-5` as três placas não cabem
                   numa linha só de 350px e a última cai sozinha embaixo. */
                className="relative rounded-full px-3.5 md:px-5 py-2.5 min-h-[44px] whitespace-nowrap transition-all duration-300 cursor-pointer"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(225,6,0,0.18) 0%, rgba(225,6,0,0.06) 100%)"
                    : "rgba(var(--foreground-rgb), 0.04)",
                  border: isActive
                    ? "1px solid rgba(225,6,0,0.65)"
                    : "1px solid rgba(var(--foreground-rgb), 0.10)",
                  boxShadow: isActive
                    ? "0 0 0 4px rgba(225,6,0,0.06), 0 8px 24px -8px rgba(225,6,0,0.5)"
                    : "none",
                  color: isActive ? "#ffffff" : "rgba(var(--foreground-rgb), 0.65)",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.02em",
                }}
              >
                {c.newName}
              </button>
            );
          })}
        </div>

        {/* Comparação contida (não mais full-bleed): a imagem nítida fica num
            cartão sobre o fundo escurecido, em vez de sangrar a tela inteira. */}
        <div className="mx-auto px-5 md:px-[72px]" style={{ maxWidth: "1600px" }}>
        <div
          ref={containerRef}
          onClick={handleAreaClick}
          className="relative w-full select-none overflow-hidden cursor-ew-resize [aspect-ratio:4/3] md:[aspect-ratio:21/9]"
          style={{
            touchAction: "none",
            borderRadius: "var(--radius-card-xl)",
            border: "1px solid rgba(var(--foreground-rgb), 0.10)",
            boxShadow: "0 30px 90px -20px rgba(0,0,0,0.75)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              {/* "Antes" — foto da placa anterior, inteira por baixo */}
              <div className="absolute inset-0">
                <picture>
                  <source media="(min-width: 768px)" srcSet={active.before.desktop} />
                  <img src={active.before.mobile} alt={`Cena com ${active.previousName}`} draggable={false} className="h-full w-full object-cover" />
                </picture>
              </div>

              {/* "After" — clipped from slider to right edge */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              >
                <picture>
                  <source media="(min-width: 768px)" srcSet={active.after.desktop} />
                  <img src={active.after.mobile} alt={`Cena com ${active.newName}`} draggable={false} className="h-full w-full object-cover" />
                </picture>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          <div className="pointer-events-none absolute left-2 bottom-2 md:left-6 md:bottom-6 z-20">
            <div
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full px-2.5 md:px-3.5 py-1.5 md:py-2 backdrop-blur-md"
              style={{
                background: "rgba(20, 20, 22, 0.65)",
                border: "1px solid rgba(var(--foreground-rgb), 0.1)",
              }}
            >
              {/* O rótulo some no celular: com ele os dois selos de baixo se
                  encontram no meio do card e o texto de um passa por cima do
                  outro. O nome da placa sozinho já diz de que lado é. */}
              <span
                className="hidden md:inline text-[var(--text-caption)]"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(var(--foreground-rgb), 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Geração anterior
              </span>
              <span
                className="text-ink-strong text-[10px] md:text-[var(--text-sm)]"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontWeight: 700,
                }}
              >
                {active.previousName}
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute right-2 bottom-2 md:right-6 md:bottom-6 z-20">
            <div
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full px-2.5 md:px-3.5 py-1.5 md:py-2 backdrop-blur-md"
              style={{
                background: "rgba(20, 20, 22, 0.7)",
                border: "1px solid rgba(225, 6, 0, 0.45)",
                boxShadow: "0 0 24px -6px rgba(225, 6, 0, 0.5)",
              }}
            >
              <span
                className="hidden md:inline text-[var(--text-caption)]"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(var(--foreground-rgb), 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Nova geração
              </span>
              <span
                className="text-[10px] md:text-[var(--text-sm)]"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontWeight: 700,
                  color: ACCENT,
                }}
              >
                {active.newName}
              </span>
            </div>
          </div>

          {/* Slider line + handle */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-30"
            style={{
              left: `${pos}%`,
              width: "2px",
              transform: "translateX(-50%)",
              background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 12%, ${ACCENT} 88%, transparent 100%)`,
              boxShadow: `0 0 24px ${ACCENT}, 0 0 60px ${ACCENT_GLOW}`,
            }}
          />
          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              startDrag();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              startDrag();
            }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1/2 z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
            style={{
              left: `${pos}%`,
              background: ACCENT_BG,
              boxShadow: `0 0 0 6px rgba(225, 6, 0, 0.18), 0 14px 32px -8px ${ACCENT_GLOW}`,
              cursor: "ew-resize",
            }}
            aria-label="Arrastar para comparar"
          >
            <GripVertical size={20} strokeWidth={2.6} color="#ffffff" />
          </button>
        </div>
        </div>

        {/* Featured product card */}
        {product && (
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-8 md:mt-10 max-w-[680px] px-5 md:px-8"
            >
              <div
                className="flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center md:gap-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.06) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                  border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                  boxShadow: "var(--shadow-card-hairline)",
                }}
              >
                <div className="flex flex-row items-center gap-4 md:contents">
                  <div
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden md:h-20 md:w-20"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      borderRadius: "var(--radius-card-sm)",
                      border: "1px solid rgba(var(--foreground-rgb), 0.05)",
                    }}
                  >
                    <ImageWithFallback
                      src={getPrimaryProductImage(product)}
                      alt={product.name}
                      /* Arte de setup sangra; foto de produto mantém contain + padding. */
                      className={`h-full w-full ${artFitClass(getPrimaryProductImage(product), "p-2")}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        color: "rgba(var(--foreground-rgb), 0.45)",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Featured Build
                    </p>
                    <h3
                      className="line-clamp-2 text-ink-strong md:line-clamp-1"
                      style={{
                        fontFamily: "var(--font-family-figtree)",
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="mt-1 text-ink-strong"
                      style={{
                        fontFamily: "var(--font-family-figtree)",
                        fontSize: "var(--text-base)",
                        fontWeight: 700,
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </div>

                <CTAButton
                  as="link"
                  to={`/produto/${product.id}`}
                  variant="buy"
                  size="md"
                  block
                  className="flex-shrink-0 md:w-auto"
                >
                  Comprar <ArrowRight size={15} strokeWidth={2.4} />
                </CTAButton>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
