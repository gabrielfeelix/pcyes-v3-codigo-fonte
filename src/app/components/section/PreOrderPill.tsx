import { Rocket } from "lucide-react";
import type { PreOrderInfo } from "../PreOrderData";

type PreOrderPillProps = {
  info: PreOrderInfo;
  compact?: boolean;
  className?: string;
};

export function PreOrderPill({ info, compact = false, className = "" }: PreOrderPillProps) {
  const release = new Date(info.releaseDate);
  const label = release.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  return (
    <span
      /* nowrap + shrink-0: em linhas estreitas (item do carrinho, ao lado de um
         título que trunca) a pill era espremida e quebrava em três linhas. Ela
         é curta e de tamanho fixo — quem cede espaço é o título. */
      className={`inline-flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-pill ${className}`}
      style={{
        background: "var(--gradient-preorder-orange)",
        color: "#fff",
        fontFamily: "var(--font-family-inter)",
        fontSize: compact ? "8.5px" : "9.5px",
        fontWeight: 900,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: compact ? "3px 7px" : "4px 9px",
        boxShadow: "var(--shadow-preorder-pill)",
      }}
    >
      <Rocket size={compact ? 8 : 9} strokeWidth={2.6} />
      Pré-venda · {label}
    </span>
  );
}
