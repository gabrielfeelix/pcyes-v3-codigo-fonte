import type { CSSProperties, ReactNode } from "react";

type Size = "sm" | "lg";

type DiscountBadgeProps = {
  /** When set, renders "-X%". Ignored if `children` is provided. */
  percent?: number;
  /** Override label (e.g. custom badge string from product data). */
  children?: ReactNode;
  size?: Size;
  className?: string;
  style?: CSSProperties;
};

const RECIPES: Record<Size, CSSProperties> = {
  lg: {
    padding: "6px 12px",
    borderRadius: "var(--radius-card-sm)",
    background: "var(--gradient-discount)",
    fontFamily: "var(--font-family-figtree)",
    fontSize: "var(--text-base)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    boxShadow: "var(--shadow-discount-badge)",
  },
  sm: {
    padding: "2px 6px",
    borderRadius: "var(--radius-md)",
    background: "var(--gradient-discount)",
    fontFamily: "var(--font-family-inter)",
    fontSize: "var(--text-caption)",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    boxShadow: "var(--shadow-discount-sm)",
    lineHeight: 1,
  },
};

export function DiscountBadge({ percent, children, size = "lg", className = "", style }: DiscountBadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-white ${className}`}
      style={{ ...RECIPES[size], ...style }}
    >
      {children ?? (percent !== undefined ? `-${percent}%` : null)}
    </span>
  );
}
