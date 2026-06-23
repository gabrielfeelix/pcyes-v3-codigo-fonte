import type { ComponentProps, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

/**
 * CTAButton — botao de acao principal do DS.
 *
 * Taxonomia (Figma 1:1):
 *   variant = cor/intencao:  buy (verde) · preorder (laranja) · brand (vermelho)
 *   size    = dimensao:      sm (cards pequenos) · md (cards normais) · lg (blocos de compra)
 *   block   = largura total
 *   as      = "button" (default) | "link" (navega via react-router, visual identico)
 *
 * Forma unica: pilha (rounded-pill). A sombra deriva de variant+size.
 * Onde um consumidor precisa de sombra fora do padrao do tamanho, sobrescreva via className.
 */
const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill text-white whitespace-nowrap font-bold transition-transform disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.97] outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        buy: "[background-image:var(--gradient-buy)] tracking-[0.04em]",
        preorder: "[background-image:var(--gradient-preorder-orange)] tracking-[0.04em]",
        brand: "[background-image:var(--gradient-brand)] tracking-[0.05em] uppercase",
      },
      size: {
        sm: "h-10 px-6 text-[var(--text-caption)]",
        md: "h-11 px-8 text-[var(--text-caption)]",
        lg: "h-12 px-10 text-[var(--text-sm)]",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // buy (verde)
      { variant: "buy", size: ["sm", "md"], class: "shadow-[var(--shadow-buy-cta-sm)]" },
      { variant: "buy", size: "lg", class: "shadow-[var(--shadow-buy-cta)]" },
      // preorder (laranja)
      { variant: "preorder", size: ["sm", "md"], class: "shadow-[var(--shadow-preorder-pill)]" },
      { variant: "preorder", size: "lg", class: "shadow-[var(--shadow-preorder-cta)]" },
      // brand (vermelho)
      { variant: "brand", size: ["sm", "md"], class: "shadow-[var(--shadow-brand-pill)]" },
      { variant: "brand", size: "lg", class: "shadow-[var(--shadow-brand-cta)]" },
    ],
    defaultVariants: { variant: "buy", size: "md", block: false },
  }
);

type CTAVariantProps = VariantProps<typeof ctaVariants>;

type CTAButtonAsButton = CTAVariantProps &
  ComponentProps<"button"> & { as?: "button"; children?: ReactNode };

type CTAButtonAsLink = CTAVariantProps &
  Omit<LinkProps, "className"> & { as: "link"; className?: string; children?: ReactNode };

type CTAButtonProps = CTAButtonAsButton | CTAButtonAsLink;

export function CTAButton(props: CTAButtonProps) {
  if (props.as === "link") {
    const { as: _as, variant, size, block, className, ...rest } = props;
    return <Link {...rest} className={cn(ctaVariants({ variant, size, block, className }))} />;
  }
  const { as: _as, variant, size, block, className, ...rest } = props;
  return <button {...rest} className={cn(ctaVariants({ variant, size, block, className }))} />;
}

export { ctaVariants };
