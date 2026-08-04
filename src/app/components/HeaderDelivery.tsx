'use client';

import { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCep } from "../../utils/format";
import { cepUf, isValidCep } from "../../utils/cep";

const STORAGE_KEY = "pcyes-cep";

/**
 * Bloco "Entregar em" do cabeçalho — o vizinho do logo.
 *
 * Existe por dois motivos, nessa ordem:
 *
 * 1. Utilidade. Saber o CEP antes da página de produto encurta a dúvida mais
 *    comum de quem compra hardware ("chega quando, e por quanto?"). É o padrão
 *    de Amazon e Mercado Livre, e o cálculo de frete da página de produto passa
 *    a começar preenchido.
 *
 * 2. Equilíbrio do cabeçalho. A busca é a coluna central da grade, então as
 *    duas colunas laterais dividem a sobra em partes iguais. Com o logo (142px)
 *    sozinho de um lado e o bloco de conta + ícones (301px) do outro, o vão
 *    visível ficava 318px à esquerda contra 159px à direita — 2:1 a 1920px, e
 *    4:1 a 1440px. Este bloco ocupa a diferença; os vãos empatam sem que a
 *    busca precise encolher nem sair do centro.
 *
 * Só aparece a partir de 1440px: abaixo disso a linha não tem folga para ele
 * sem espremer a busca, e aí o cabeçalho segue como era.
 */
export function HeaderDelivery({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [cep, setCep] = useState("");
  const [draft, setDraft] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isValidCep(stored)) setCep(stored);
  }, []);

  useEffect(() => {
    if (!open) return;
    setDraft(cep);
    setJustSaved(false);
    const focus = setTimeout(() => inputRef.current?.focus(), 60);
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focus);
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, cep]);

  const uf = cepUf(cep);
  const draftValid = isValidCep(draft);

  const save = () => {
    if (!draftValid) return;
    setCep(draft);
    localStorage.setItem(STORAGE_KEY, draft);
    setJustSaved(true);
    setTimeout(() => setOpen(false), 450);
  };

  const clear = () => {
    setCep("");
    setDraft("");
    localStorage.removeItem(STORAGE_KEY);
    inputRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={uf ? `Entregar em ${cep}, ${uf}. Alterar CEP` : "Informar CEP de entrega"}
        className="flex h-10 items-center gap-2 rounded-full pl-1 pr-1.5 text-ink transition-colors hover:text-ink-strong"
      >
        <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
        {/*
          A UF sobe para a linha de cima e a de baixo fica só com o CEP: juntas
          na mesma linha ("87050-000 · PR") o bloco passava de 300px e, a
          1440px, encostava na busca. `min-w` fixo evita que a largura pule
          quando o CEP é preenchido.
        */}
        <span
          className="flex min-w-[92px] flex-col whitespace-nowrap text-left leading-[1.15]"
          style={{ fontFamily: "var(--font-family-inter)" }}
        >
          <span className="opacity-55" style={{ fontSize: "var(--text-caption)" }}>
            {uf ? `Entregar em ${uf}` : "Entrega"}
          </span>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>
            {uf ? cep : "Informar CEP"}
          </span>
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14 }}
            role="dialog"
            aria-label="CEP de entrega"
            className="absolute left-0 top-[52px] z-[70] w-[288px] rounded-[var(--radius-card-sm)] border border-edge bg-surface-0 p-4 shadow-2xl"
          >
            <p
              className="text-ink-strong"
              style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-sm)", fontWeight: 700 }}
            >
              Onde você quer receber?
            </p>
            <p
              className="mt-1 text-ink-subtle"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}
            >
              Usamos seu CEP para mostrar prazo e frete já na página do produto.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); save(); }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                placeholder="00000-000"
                value={draft}
                onChange={(e) => setDraft(formatCep(e.target.value))}
                aria-label="CEP"
                className="pcyes-field-ring h-10 min-w-0 flex-1 px-3 text-ink-strong outline-none placeholder:text-ink-subtle"
                style={{
                  borderRadius: "var(--radius-card-sm)",
                  border: "1px solid rgba(var(--foreground-rgb), 0.10)",
                  background: "rgba(var(--foreground-rgb), 0.04)",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  letterSpacing: "0.02em",
                }}
              />
              <button
                type="submit"
                disabled={!draftValid}
                className="flex h-10 items-center gap-1.5 rounded-[var(--radius-card-sm)] bg-primary px-3.5 text-primary-foreground transition-opacity disabled:opacity-35"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
              >
                {justSaved ? <Check size={15} strokeWidth={2.5} /> : "Usar"}
              </button>
            </form>

            <div className="mt-2.5 flex items-center justify-between gap-3">
              <span
                className="text-ink-subtle"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
              >
                {draft.length > 0 && !draftValid ? "CEP incompleto ou inexistente" : " "}
              </span>
              {cep && (
                <button
                  type="button"
                  onClick={clear}
                  className="flex-shrink-0 text-ink-subtle underline underline-offset-2 transition-colors hover:text-ink"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                >
                  Limpar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
