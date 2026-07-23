import { Star } from "lucide-react";

type RatingChipProps = {
  rating?: number;
  reviews?: number;
  className?: string;
};

/**
 * Nota do produto no bloco de texto do card — não sobre a imagem.
 *
 * Por quê: sobreposição na imagem é território de badge promocional, e a
 * recomendação de UX de listagem é 1–2 badges no máximo por card, sempre no
 * mesmo canto. Nota é informação de avaliação, não promoção: empilhá-la sob a
 * pill de pré-venda/desconto virava uma coluna de três selos que competia com
 * o produto e mudava de altura card a card. Aqui ela fica na linha de meta,
 * junto do título, onde o olho já procura preço/avaliação.
 */
export function RatingChip({ rating, reviews, className = "" }: RatingChipProps) {
  if (!rating) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap ${className}`}
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
      }}
      aria-label={`Nota ${rating.toFixed(1)} de 5${reviews ? `, ${reviews} avaliações` : ""}`}
    >
      <Star size={12} className="fill-[#FFB800] text-[#FFB800]" aria-hidden="true" />
      <span style={{ fontWeight: 700, color: "rgba(var(--foreground-rgb), 0.9)" }}>
        {rating.toFixed(1)}
      </span>
      {reviews ? (
        <span style={{ color: "rgba(var(--foreground-rgb), 0.45)" }}>({reviews})</span>
      ) : null}
    </span>
  );
}
