"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts, type Product } from "./productsData";
import {
  getPrimaryProductImage,
  getVisibleCatalogProducts,
} from "./productPresentation";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader, CarouselNavButton } from "./section";
import { ProductCard } from "./ProductCard";

interface ProductShelfProps {
  label: string;
  title: string;
  productIds: number[];
  showRanking?: boolean;
  emphasizeDiscount?: boolean;
}

function getSubtitle(product: Product): string | null {
  if (product.tags && product.tags.length > 0) {
    const filtered = product.tags.filter(
      (t) => t.toLowerCase() !== product.category.toLowerCase() && t.length > 1,
    );
    if (filtered.length >= 2) return `${filtered[0]}  |  ${filtered[1]}`;
    if (filtered.length === 1) return filtered[0];
  }
  if (product.brand && product.category) {
    return `${product.brand}  |  ${product.category}`;
  }
  return product.category ?? null;
}


export function ProductShelf({
  label,
  title,
  productIds,
  showRanking = false,
  emphasizeDiscount = false,
}: ProductShelfProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();

  const products = useMemo(() => {
    const visible = getVisibleCatalogProducts(allProducts);
    const resolved = productIds
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean) as Product[];
    return resolved.length > 0 ? resolved : visible.slice(0, 8);
  }, [productIds]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [products]);

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstElementChild as HTMLElement)?.getBoundingClientRect().width ?? 380;
    const cardWithGap = cardWidth + 24;
    el.scrollBy({ left: dir * cardWithGap * 2, behavior: "smooth" });
  };

  const navBtn = (onClick: () => void, disabled: boolean, label: string, side: "left" | "right") => (
    <CarouselNavButton
      direction={side}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-[228px] -translate-y-1/2 ${side === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}`}
    />
  );

  return (
    <section
      ref={ref}
      className="px-5 py-16 md:px-[72px] md:py-20"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeader eyebrow={label} title={title} size="sm" weight={600} />
        </div>

        <div className="relative">
          {navBtn(() => scrollByCards(-1), !canPrev, "Anterior", "left")}
          {navBtn(() => scrollByCards(1), !canNext, "Próximo", "right")}
          <div
            ref={scrollRef}
            className="shelf-track flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.04 * i }}
              >
                <ProductCard
                  product={product}
                  variant="shelf"
                  swatches
                  favorite
                  rank={showRanking ? i + 1 : undefined}
                  emphasizeDiscount={emphasizeDiscount}
                  className="snap-start flex-shrink-0"
                  style={{ width: "clamp(264px, 78vw, 380px)" }}
                  onAdd={(p) =>
                    addItem({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: getPrimaryProductImage(p),
                    })
                  }
                  onFavorite={(p) =>
                    addFavorite({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: getPrimaryProductImage(p),
                    })
                  }
                />
              </motion.div>
            ))}
          </div>
          <CarouselDots trackRef={scrollRef} />
        </div>
      </div>
    </section>
  );
}
