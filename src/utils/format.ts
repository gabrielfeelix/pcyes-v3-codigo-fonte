/** Format a number as BRL currency string: "R$ 1.234,56" */
export function formatBRL(n: number): string {
  return `R$ ${n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/**
 * Versão falada de um preço, para leitores de tela: "1234 reais e 56 centavos".
 *
 * Por que existe: o NVDA define "$" no nível `all` (300), mas seu padrão é
 * `SOME` (100) — ou seja, o cifrão NÃO é falado na configuração padrão. O preço
 * "R$ 359,91" sai como "R trezentos e cinquenta e nove vírgula noventa e um":
 * a moeda desaparece e sobra um "R" solto. Aqui a moeda é escrita por extenso
 * e exposta via texto sr-only (ver componente <Price>), enquanto o texto
 * visual fica com aria-hidden.
 */
export function formatBRLSpoken(n: number): string {
  const negative = n < 0;
  const cents = Math.round(Math.abs(n) * 100);
  const reais = Math.floor(cents / 100);
  const rest = cents % 100;

  const reaisPart = `${reais} ${reais === 1 ? "real" : "reais"}`;
  const centsPart = rest > 0 ? ` e ${rest} ${rest === 1 ? "centavo" : "centavos"}` : "";

  return `${negative ? "menos " : ""}${reaisPart}${centsPart}`;
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
