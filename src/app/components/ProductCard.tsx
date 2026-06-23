"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "./AuthContext";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage, getProductSwatches } from "./productPresentation";
import { getPreOrderInfo } from "./PreOrderData";
import { CTAButton, DiscountBadge, PreOrderPill } from "./section";

/**
 * ProductCard — organismo do catalogo (composto a partir dos primitivos do DS).
 *
 * Vive em components/ (nao em section/) porque depende de contexto/dados do app
 * (auth, swatches, pre-venda) — nao e um atomo puro como CTAButton.
 *
 * Variantes (Figma 1:1):
 *   variant="shelf" — card de prateleira: imagem 5/6, titulo 1 linha, quick-add "Comprar"
 *   variant="grid"  — card de grade compacto: imagem quadrada, titulo 2 linhas, quick-add "Adicionar"
 *
 * Toggles: rank (medalhao Top N), swatches (cores), favorite (coracao, gated por login),
 * hoverMedia (slot de video/2a imagem no hover), emphasizeDiscount (deriva oldPrice).
 */

type ProductCardVariant = "shelf" | "grid";

const VARIANT = {
  shelf: {
    aspect: "aspect-[5/6]",
    pad: "p-2 md:p-8",
    clamp: "line-clamp-1",
    quickAddSize: "lg" as const,
    quickAddLabel: "Comprar",
  },
  grid: {
    aspect: "aspect-square",
    pad: "p-2 md:p-6",
    clamp: "line-clamp-2",
    quickAddSize: "sm" as const,
    quickAddLabel: "Adicionar",
  },
};

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  href?: string;
  rank?: number;
  swatches?: boolean;
  favorite?: boolean;
  hoverMedia?: ReactNode;
  emphasizeDiscount?: boolean;
  onAdd?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
  className?: string;
  style?: CSSProperties;
}

export function ProductCard({
  product,
  variant = "shelf",
  href = `/produto/${product.id}`,
  rank,
  swatches = false,
  favorite = false,
  hoverMedia,
  emphasizeDiscount = false,
  onAdd,
  onFavorite,
  className = "",
  style,
}: ProductCardProps) {
  const cfg = VARIANT[variant];
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedSwatchId, setSelectedSwatchId] = useState<number | null>(null);
  const { isLoggedIn } = useAuth();

  const swatchList = swatches ? getProductSwatches(product) : [];
  const selectedProduct = selectedSwatchId
    ? allProducts.find((p) => p.id === selectedSwatchId)
    : product;
  const image = getPrimaryProductImage(selectedProduct);

  const oldPriceNum =
    product.oldPriceNum ?? (emphasizeDiscount ? product.priceNum * 1.18 : 0);
  const discount =
    oldPriceNum > product.priceNum
      ? Math.round(((oldPriceNum - product.priceNum) / oldPriceNum) * 100)
      : 0;
  const preOrderInfo = getPreOrderInfo(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    onFavorite?.(product);
  };

  const well = (
    <>
      <div
        className={`deal-card-img relative ${cfg.aspect} overflow-hidden transition-all duration-300`}
        style={{
          background:
            "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.10) 0%, rgba(var(--foreground-rgb), 0.03) 100%)",
          borderRadius: "var(--radius-card-lg)",
          border: "1px solid rgba(var(--foreground-rgb), 0.08)",
        }}
      >
        {/* Subtle inner shine */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(var(--foreground-rgb), 0.06) 0%, transparent 55%)",
            borderRadius: "var(--radius-card-lg)",
          }}
        />

        <ImageWithFallback
          src={image}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-contain ${cfg.pad} transition-transform duration-500 group-hover:scale-[1.05]`}
        />

        {hoverMedia}

        {rank !== undefined && (
          <span
            className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full text-ink-strong"
            style={{
              background: "var(--gradient-brand)",
              fontFamily: "var(--font-family-figtree)",
              fontSize: "var(--text-base)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              boxShadow:
                "0 6px 18px -4px rgba(225,6,0,0.55), inset 0 1px 0 rgba(var(--foreground-rgb), 0.18)",
            }}
          >
            {rank}
          </span>
        )}

        {discount > 0 && !preOrderInfo && (
          <DiscountBadge
            percent={discount}
            className="absolute z-20"
            style={{ left: rank !== undefined ? "60px" : "12px", top: "12px" }}
          />
        )}

        {preOrderInfo && (
          <span className="absolute z-20" style={{ left: rank !== undefined ? "60px" : "12px", top: "12px" }}>
            <PreOrderPill info={preOrderInfo} />
          </span>
        )}

        {favorite && isLoggedIn && (
          <button
            onClick={handleFavorite}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full border opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 cursor-pointer"
            style={{
              background: isFavorited ? "rgba(225, 6, 0, 0.2)" : "rgba(0, 0, 0, 0.55)",
              border: isFavorited
                ? "1px solid rgba(225, 6, 0, 0.8)"
                : "1px solid rgba(var(--foreground-rgb), 0.15)",
              color: isFavorited ? "#ff2419" : "rgba(var(--foreground-rgb), 0.85)",
              backdropFilter: "blur(8px)",
            }}
            aria-label="Favoritar"
          >
            <Heart size={13} strokeWidth={isFavorited ? 0 : 1.8} fill={isFavorited ? "#ff2419" : "none"} />
          </button>
        )}

        {onAdd && (
          <CTAButton
            variant="buy"
            size={cfg.quickAddSize}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAdd(product);
            }}
            className="hidden md:inline-flex absolute bottom-4 left-1/2 z-20 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer shadow-[var(--shadow-buy-cta-sm)]"
          >
            <ShoppingBag size={14} strokeWidth={2} /> {cfg.quickAddLabel}
          </CTAButton>
        )}
      </div>

      <div className="mt-4 px-1">
        <h3
          className={`${cfg.clamp} text-ink-strong`}
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "var(--text-base)",
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {product.name}
        </h3>

        <div className="mt-3">
          {oldPriceNum > product.priceNum && (
            <p
              className="line-through leading-none mb-1"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-sm)",
                color: "rgba(var(--foreground-rgb), 0.38)",
              }}
            >
              {product.oldPrice ?? `R$ ${oldPriceNum.toFixed(2).replace(".", ",")}`}
            </p>
          )}
          <p
            className="text-ink-strong leading-none"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              letterSpacing: "-0.015em",
            }}
          >
            {product.price}
          </p>
          <p
            className="mt-1.5 leading-tight"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "rgba(var(--foreground-rgb), 0.55)" }}
          >
            No PIX ou 10x de R$ {(product.priceNum / 10).toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className={`group ${className}`} style={style}>
      {href ? (
        <Link to={href} className="block">
          {well}
        </Link>
      ) : (
        well
      )}

      {swatchList.length > 0 && (
        <div className="mt-2.5 px-1 flex items-center gap-1.5">
          {swatchList.slice(0, 5).map((s) => (
            <button
              key={s.productId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedSwatchId(s.productId === selectedSwatchId ? null : s.productId);
              }}
              className="inline-flex items-center justify-center p-4 -m-4 md:p-0 md:m-0 cursor-pointer transition-all hover:scale-110"
              aria-label={s.label}
              type="button"
            >
              <span
                className="block h-3 w-3 rounded-full"
                style={{
                  background: s.color,
                  border:
                    selectedSwatchId === s.productId
                      ? "2px solid rgba(225, 6, 0, 0.9)"
                      : "1px solid rgba(var(--foreground-rgb), 0.18)",
                  boxShadow: selectedSwatchId === s.productId ? "0 0 8px rgba(225, 6, 0, 0.5)" : "none",
                }}
              />
            </button>
          ))}
          {swatchList.length > 5 && (
            <span
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                color: "rgba(var(--foreground-rgb), 0.45)",
              }}
            >
              +{swatchList.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Mobile buy button — below info so the image stays clean.
          Desktop uses the floating hover pill inside the image instead. */}
      {onAdd && (
        <CTAButton
          variant="buy"
          size="sm"
          block
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd(product);
          }}
          className="md:hidden mt-3"
        >
          <ShoppingBag size={14} strokeWidth={2} /> {cfg.quickAddLabel}
        </CTAButton>
      )}
    </div>
  );
}
