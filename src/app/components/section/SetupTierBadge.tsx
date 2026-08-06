import type { Product } from "../productsData";
import { getSetupTier, TIER_STYLE } from "../../lib/setups";

/**
 * Selo de degrau do setup — Entrada · Intermediário · Avançado.
 *
 * Nome de linha ("Apex", "Cockpit") não diz se a máquina é de entrada ou de
 * topo, e o rótulo é o mesmo nas três personas — é o que torna a escada
 * aprendível de uma olhada.
 *
 * Vive num primitivo porque o card de produto tem duas implementações (o
 * `ProductCard` das vitrines e o markup inline da listagem) e o selo precisou
 * ser escrito duas vezes quando entrou. Enquanto os dois cards existirem, o
 * selo é escrito aqui uma vez só.
 *
 * Nada renderiza se o produto não for setup.
 */
export function SetupTierBadge({
  product,
  className = "mb-1.5",
}: {
  product: Pick<Product, "id" | "subcategory" | "tags">;
  className?: string;
}) {
  const tier = getSetupTier(product);
  if (!tier) return null;

  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 ${className}`}
      style={{
        ...TIER_STYLE[tier],
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {tier}
    </span>
  );
}
