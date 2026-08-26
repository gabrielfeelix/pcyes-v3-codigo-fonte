/**
 * Qual das três versões da tela de pontos está no ar — ANDAIME DE PROTÓTIPO.
 *
 * As três desenham o MESMO programa em arranjos diferentes, e comparar exige
 * trocar sem recarregar — a sessão do protótipo vive em memória. Store vivo
 * em vez de ler a URL uma vez só.
 *
 * Sai junto com o seletor quando uma das três for escolhida.
 */

export type PointsVersion = "1" | "2" | "3";

export const POINTS_VERSIONS: { id: PointsVersion; label: string; hint: string }[] = [
  { id: "1", label: "V1 · PÁGINA ÚNICA", hint: "Tudo empilhado, um scroll só, sem navegação." },
  { id: "2", label: "V2 · ABAS POR ASSUNTO", hint: "Saldo · Como ganhar · Indique · Extrato — o recorte do /dev, limpo." },
  { id: "3", label: "V3 · CARTEIRA + ABAS", hint: "Saldo e rank no hero; só Ganhar e Extrato ficam atrás de aba." },
];

const KEY = "pcyes-points-v";
const isValid = (v: string | null): v is PointsVersion => v === "1" || v === "2" || v === "3";

function initial(): PointsVersion {
  if (typeof window === "undefined") return "1";
  const fromUrl = new URLSearchParams(window.location.search).get("pv");
  if (isValid(fromUrl)) {
    window.sessionStorage.setItem(KEY, fromUrl);
    return fromUrl;
  }
  const stored = window.sessionStorage.getItem(KEY);
  return isValid(stored) ? stored : "1";
}

let current = initial();
const listeners = new Set<() => void>();

export const pointsVersionStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => current,
  set(version: PointsVersion) {
    if (version === current) return;
    current = version;
    if (typeof window !== "undefined") window.sessionStorage.setItem(KEY, version);
    listeners.forEach((listener) => listener());
  },
};
