import type { ComponentProps } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../ui/utils";

/**
 * CarouselNavButton — seta de navegacao dos shelves horizontais.
 *
 * Renderiza o chrome canonico (h-12 pilha, border, glass escuro, hover vermelho,
 * some quando disabled) + o chevron pelo `direction`. O posicionamento absoluto
 * (top, left/right, translate) fica por conta do consumidor via className, porque
 * varia por shelf (top-[228px], top-[264px], etc).
 *
 * Desktop-only por padrao (hidden md:flex), como todos os consumidores usam.
 */
const NAV_CHROME =
  "z-30 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 backdrop-blur-md transition-all hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/15 hover:text-white hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer md:flex";

type CarouselNavButtonProps = ComponentProps<"button"> & {
  direction: "left" | "right";
};

export function CarouselNavButton({ direction, className, ...props }: CarouselNavButtonProps) {
  return (
    <button
      {...props}
      aria-label={props["aria-label"] ?? (direction === "left" ? "Anterior" : "Próximo")}
      className={cn(NAV_CHROME, className)}
    >
      {direction === "left" ? (
        <ChevronLeft size={20} strokeWidth={2.2} />
      ) : (
        <ChevronRight size={20} strokeWidth={2.2} />
      )}
    </button>
  );
}
