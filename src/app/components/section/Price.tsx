import type { CSSProperties, ReactNode } from "react";
import { formatBRL, formatBRLSpoken } from "../../../utils/format";

interface PriceProps {
  /** Valor em reais. */
  value: number;
  className?: string;
  style?: CSSProperties;
  /** Rótulo lido antes do valor, ex.: "Preço no PIX". Só para leitor de tela. */
  label?: string;
  /** Sufixo visual opcional (ex.: "no PIX"), incluído também na fala. */
  suffix?: ReactNode;
}

/**
 * Preço acessível.
 *
 * O texto visual (`R$ 1.234,56`) fica com `aria-hidden`, e uma versão falada
 * ("1234 reais e 56 centavos") é exposta em `sr-only`. Isso existe porque o
 * NVDA não fala o "$" na configuração padrão (símbolo definido em nível `all`,
 * default `some`) — sem isso, o preço é anunciado como "R 1234 vírgula 56",
 * sem moeda alguma. Ver `formatBRLSpoken`.
 */
export function Price({ value, className, style, label, suffix }: PriceProps) {
  const spoken = [label, formatBRLSpoken(value)].filter(Boolean).join(", ");

  return (
    <span className={className} style={style}>
      <span aria-hidden="true">
        {formatBRL(value)}
        {suffix}
      </span>
      <span className="sr-only">{spoken}</span>
    </span>
  );
}
