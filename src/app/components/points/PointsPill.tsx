import type { ReactNode } from "react";
import { PcyesCoin } from "../PcyesCoin";

/**
 * A pílula de PC Points — moeda + valor, fundo âmbar, sem borda.
 *
 * Nasceu no topo do drawer do carrinho, ao lado do contador de itens, e é a
 * forma como o programa se apresenta em linha. Vive aqui porque a PDP passou a
 * usar a MESMA pílula na linha das avaliações: cópia colada divergiu em uma
 * tarde (a da PDP ganhou borda dourada e ouro mais forte, e virou outra coisa).
 *
 * O conteúdo muda com o lugar — no carrinho é o saldo, na PDP é quanto o
 * produto rende — mas moeda, fundo, raio, peso e cor saem daqui e de mais
 * lugar nenhum.
 */
export function PointsPill({
  children,
  title,
  className = "",
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-500/70 ${className}`}
      style={{
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 600,
      }}
      title={title}
    >
      <PcyesCoin size={14} />
      {children}
    </span>
  );
}
