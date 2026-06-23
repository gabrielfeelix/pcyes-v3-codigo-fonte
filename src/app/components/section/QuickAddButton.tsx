import { ShoppingBag } from "lucide-react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

type QuickAddButtonProps = ComponentProps<"button"> & { label?: ReactNode };

const BASE_STYLE: CSSProperties = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-caption)",
  fontWeight: "var(--font-weight-medium)",
  background: "var(--gradient-buy)",
  boxShadow: "var(--shadow-buy-cta-sm)",
};

export function QuickAddButton({ label = "Adicionar", className = "", style, ...props }: QuickAddButtonProps) {
  return (
    <button
      {...props}
      className={`w-full py-2.5 text-white flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${className}`}
      style={{ ...BASE_STYLE, ...style }}
    >
      <ShoppingBag size={13} strokeWidth={1.5} />
      {label}
    </button>
  );
}
