import { Link } from "react-router";
import { PackageX, ArrowRight } from "lucide-react";
import { getCatalogHref } from "./productPresentation";

/**
 * Produto descontinuado — não volta ao estoque.
 *
 * Diferente de "sem estoque", aqui NÃO se oferece aviso de reposição: prometer
 * avisar sobre algo que nunca retorna é uma promessa falsa. O slot primário
 * vira o próximo passo útil — ver os similares da mesma categoria.
 */
export function DiscontinuedNotice({ category }: { category: string }) {
  return (
    <div className="space-y-3">
      <div
        className="flex items-start gap-3 px-4 py-3.5"
        style={{
          borderRadius: "var(--radius-card-sm)",
          border: "1px solid rgba(var(--foreground-rgb), 0.12)",
          background: "rgba(var(--foreground-rgb), 0.04)",
        }}
        role="status"
      >
        <PackageX size={16} className="mt-0.5 flex-shrink-0 text-foreground/45" strokeWidth={1.9} />
        <div>
          <p
            className="text-foreground/85"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
          >
            Produto fora de linha
          </p>
          <p
            className="mt-0.5 text-foreground/50"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}
          >
            Este item foi descontinuado e não retorna ao estoque.
          </p>
        </div>
      </div>

      <Link
        to={getCatalogHref({ category })}
        className="flex w-full items-center justify-center gap-2 py-4 text-ink-strong transition-transform hover:scale-[1.01] active:scale-[0.99]"
        style={{
          borderRadius: "var(--radius-pill)",
          background: "var(--gradient-brand)",
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-sm)",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        Ver alternativas em {category}
        <ArrowRight size={15} strokeWidth={2.2} />
      </Link>
    </div>
  );
}
