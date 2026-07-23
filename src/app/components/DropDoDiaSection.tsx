"use client";

import { useMemo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Flame, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage, getShowcaseProducts } from "./productPresentation";
import { getPixPrice, formatBRL } from "./productEnhancements";
import { SectionHeader, CTAButton, DiscountBadge } from "./section";

const DROP_IDS = [446, 433, 30];

function withGuaranteedDiscount(p: Product): Product {
  if (p.oldPriceNum && p.oldPriceNum > p.priceNum) return p;
  const pct = 15 + (p.id % 10);
  const oldPriceNum = Math.round((p.priceNum / (1 - pct / 100)) * 100) / 100;
  return {
    ...p,
    oldPriceNum,
    oldPrice: `R$ ${oldPriceNum.toFixed(2).replace(".", ",")}`,
  };
}

export function DropDoDiaSection() {
  const { addItem } = useCart();
  const picks = useMemo(() => {
    const visible = getShowcaseProducts(allProducts);
    return DROP_IDS
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean)
      .map(withGuaranteedDiscount) as Product[];
  }, []);

  if (picks.length === 0) return null;

  return (
    <section className="px-5 pt-2 pb-14 md:px-[72px] md:py-16" style={{ background: "var(--surface-0)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="// DROP DO DIA"
            eyebrowIcon={<Flame size={12} strokeWidth={2.4} />}
            title="3 deals selecionados só pra hoje"
            size="md"
            weight={700}
            animated={false}
            titleStyle={{ lineHeight: 1.04 }}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {picks.map((product, i) => {
            const discount =
              product.oldPriceNum && product.oldPriceNum > product.priceNum
                ? Math.round(((product.oldPriceNum - product.priceNum) / product.oldPriceNum) * 100)
                : 0;
            const economy =
              product.oldPriceNum && product.oldPriceNum > product.priceNum
                ? Math.round((product.oldPriceNum - product.priceNum) * 100) / 100
                : 0;
            const pix = getPixPrice(product);
            const handleAdd = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: getPrimaryProductImage(product),
              });
            };
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex"
              >
                <div
                  className="deal-card-img group relative flex w-full flex-col overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-card-xl)",
                    background:
                      "radial-gradient(circle at 18% 20%, rgba(255,90,80,0.18) 0%, transparent 55%), linear-gradient(135deg, rgba(var(--foreground-rgb), 0.08) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                    border: "1px solid rgba(255,90,80,0.25)",
                  }}
                >
                  <Link to={`/produto/${product.id}`} className="block">
                    <div className="relative h-[260px] overflow-hidden md:h-[280px]">
                      <ImageWithFallback
                        src={getPrimaryProductImage(product)}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-contain p-4 md:p-8 transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      {discount > 0 && (
                        <DiscountBadge
                          percent={discount}
                          className="absolute z-20"
                          style={{ top: "16px", left: "16px" }}
                        />
                      )}
                      <span
                        className="absolute z-20 inline-flex items-center gap-1 text-ink-strong"
                        style={{
                          top: "16px",
                          right: "16px",
                          padding: "5px 10px",
                          borderRadius: "var(--radius-pill)",
                          background: "rgba(0,0,0,0.55)",
                          border: "1px solid rgba(255,90,80,0.5)",
                          backdropFilter: "blur(6px)",
                          fontFamily: "var(--font-family-inter)",
                          fontSize: "var(--text-caption)",
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        <Flame size={11} strokeWidth={2.4} className="text-primary" />
                        Prêmio do dia
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
                    <Link to={`/produto/${product.id}`} className="block">
                      <h3
                        className="line-clamp-2 text-ink-strong"
                        style={{
                          fontFamily: "var(--font-family-figtree)",
                          fontSize: "var(--text-base)",
                          fontWeight: 700,
                          lineHeight: 1.18,
                          letterSpacing: "-0.015em",
                          minHeight: "44px",
                        }}
                      >
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-4 flex-1">
                      {product.oldPrice && (
                        <p
                          className="line-through leading-none mb-1"
                          style={{
                            fontFamily: "var(--font-family-inter)",
                            fontSize: "var(--text-sm)",
                            color: "rgba(var(--foreground-rgb), 0.38)",
                          }}
                        >
                          {product.oldPrice}
                        </p>
                      )}
                      <p
                        className="text-ink-strong"
                        style={{
                          fontFamily: "var(--font-family-figtree)",
                          fontSize: "var(--text-2xl)",
                          fontWeight: 800,
                          lineHeight: 1,
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {formatBRL(pix)}{" "}
                        <span
                          style={{
                            fontFamily: "var(--font-family-inter)",
                            fontSize: "var(--text-caption)",
                            fontWeight: 700,
                            color: "rgba(var(--foreground-rgb), 0.55)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          NO PIX
                        </span>
                      </p>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: "var(--font-family-inter)",
                          fontSize: "var(--text-caption)",
                          color: "rgba(var(--foreground-rgb), 0.55)",
                        }}
                      >
                        ou {product.price} em 10x sem juros
                      </p>
                      {economy > 0 && (
                        <p
                          className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1"
                          style={{
                            background: "rgba(34,197,94,0.12)",
                            border: "1px solid rgba(34,197,94,0.3)",
                            fontFamily: "var(--font-family-inter)",
                            fontSize: "var(--text-caption)",
                            fontWeight: 700,
                            color: "#22c55e",
                            letterSpacing: "0.02em",
                          }}
                        >
                          ↓ Economize {formatBRL(economy)}
                        </p>
                      )}
                    </div>

                    <CTAButton
                      variant="buy"
                      size="lg"
                      block
                      onClick={handleAdd}
                      className="mt-5 cursor-pointer"
                    >
                      <ShoppingCart size={14} strokeWidth={2.2} />
                      Comprar
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
