import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown, Search } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  /** Texto secundário, ex.: o código do CNAE. */
  hint?: string;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  searchPlaceholder?: string;
  ariaLabel: string;
  /** Abaixo disso a busca não aparece: filtrar 7 itens curtos custa mais
   *  tempo que ler os 7, e o campo ainda rouba 40px de altura. */
  searchThreshold?: number;
}

const fieldStyle = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
} as const;
const captionStyle = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

/* Escrito à mão em vez do Select do DS por três motivos concretos: o do DS
   renderiza num portal com z-50 e sumia atrás do modal; virava pra cima quando
   faltava espaço embaixo; e pinta o item ativo com `--accent`, que no tema
   escuro é #FF5558, um coral que não existe em nenhum outro lugar do modal.
   Este abre embutido, empurrando o conteúdo — sem portal não há z-index pra
   brigar nem clipping do `overflow-y-auto` do modal. */
export function SearchableSelect({
  value, onChange, options, placeholder, searchPlaceholder = "Pesquisar…", ariaLabel, searchThreshold = 8,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const showSearch = options.length >= searchThreshold;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => `${o.label} ${o.hint ?? ""}`.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => { setHighlight(0); }, [query, open]);

  useEffect(() => {
    if (!open) return;
    if (showSearch) searchRef.current?.focus();

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, showSearch]);

  const choose = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      /* Sem isto o Escape sobe até o focus trap do modal e fecha o modal
         inteiro, em vez de só a lista. */
      e.stopPropagation();
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setHighlight((i) => {
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        return (next + filtered.length) % Math.max(filtered.length, 1);
      });
      return;
    }
    if (e.key === "Enter" && open) {
      e.preventDefault();
      const option = filtered[highlight];
      if (option) choose(option);
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button" role="combobox" aria-expanded={open} aria-controls={listId} aria-label={ariaLabel}
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center gap-2 py-3 pl-4 pr-3 text-left bg-foreground/[0.03] border transition-colors cursor-pointer ${open ? "border-foreground/20" : "border-foreground/8 hover:border-foreground/15"}`}
        style={fieldStyle}
      >
        {/* Mesmas cores dos inputs ao lado: placeholder em foreground/20,
            valor escolhido em foreground cheio. O campo preenchido tem que
            parecer preenchido — é assim que o telefone e o e-mail se comportam. */}
        <span className={`flex-1 truncate ${selected ? "text-foreground" : "text-foreground/20"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={15} aria-hidden="true"
          className={`shrink-0 text-foreground/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {/* Flutua sobre os campos de baixo em vez de empurrá-los: expandindo
            embutido, abrir a lista esticava o modal inteiro e o botão de
            continuar saía da tela. Fica dentro do modal, sem portal, então
            continua imune ao z-index e ao clipping. */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-30 mt-1.5"
          >
            <div className="border border-foreground/10 overflow-hidden shadow-xl shadow-black/40" style={{ borderRadius: "var(--radius-button)", background: "var(--surface-1)" }}>
              {showSearch && (
                <div className="relative border-b border-foreground/8">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/25" aria-hidden="true" />
                  <input
                    ref={searchRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder} aria-label={`Pesquisar em ${ariaLabel}`}
                    className="w-full bg-transparent py-2.5 pl-9 pr-3 text-foreground placeholder:text-foreground/25 focus:outline-none"
                    style={captionStyle}
                  />
                </div>
              )}

              {/* Teto de 132px: ~3 itens visíveis, com o quarto cortado no meio
                  pra deixar claro que rola. A lista é absoluta, mas continua
                  dentro do container que rola — então altura demais aqui faz o
                  modal ganhar barra de rolagem mesmo sem empurrar nada. */}
              <ul id={listId} role="listbox" aria-label={ariaLabel} className="max-h-[132px] overflow-y-auto py-1">
                {filtered.length === 0 && (
                  <li className="px-4 py-3 text-foreground/30" style={captionStyle}>Nada encontrado.</li>
                )}
                {filtered.map((option, i) => {
                  const active = option.value === value;
                  return (
                    <li key={option.value} role="option" aria-selected={active}>
                      <button type="button" onClick={() => choose(option)} onMouseEnter={() => setHighlight(i)}
                        className={`flex w-full items-start gap-2 px-4 py-2 text-left transition-colors cursor-pointer ${i === highlight ? "bg-foreground/[0.06]" : ""}`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className={`block ${active ? "text-foreground" : "text-foreground/70"}`}
                            style={{ ...captionStyle, fontWeight: active ? "var(--font-weight-medium)" : undefined }}>
                            {option.label}
                          </span>
                          {option.hint && (
                            <span className="block pt-0.5 text-foreground/30" style={captionStyle}>{option.hint}</span>
                          )}
                        </span>
                        {active && <Check size={14} className="mt-px shrink-0 text-primary" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
