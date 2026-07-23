import type { ReactNode } from "react";

type SpecChipProps = {
  label: string;
  icon?: ReactNode;
  className?: string;
};

/**
 * Atributo de variação do produto (tipo de switch, driver, conexão) no bloco
 * de texto — mesma faixa das swatches de cor.
 *
 * Switch é spec de variante, não promoção: como badge flutuante na imagem ele
 * disputava espaço com desconto/pré-venda e não dizia o que era. Como chip com
 * rótulo, ao lado das cores, o usuário lê "Blue" e entende que é a variação
 * daquele item.
 */
export function SpecChip({ label, icon, className = "" }: SpecChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 ${className}`}
      style={{
        background: "rgba(var(--foreground-rgb), 0.06)",
        border: "1px solid rgba(var(--foreground-rgb), 0.10)",
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 500,
        color: "rgba(var(--foreground-rgb), 0.72)",
      }}
    >
      {icon}
      {label}
    </span>
  );
}
