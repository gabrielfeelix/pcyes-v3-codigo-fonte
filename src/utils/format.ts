/** Format a number as BRL currency string: "R$ 1.234,56" */
export function formatBRL(n: number): string {
  return `R$ ${n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/** Parse a BRL currency string back to a number. */
export function parseBRL(s: string): number {
  return Number(s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".")) || 0;
}

/** Format a string as a masked CEP: "12345-678" */
export function formatCep(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}
