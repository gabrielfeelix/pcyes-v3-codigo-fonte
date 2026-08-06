/**
 * BLOCO GLOBAL — "O que roda nessa máquina"
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Esta seção NÃO é conteúdo de produto. É o mesmo bloco em todas as páginas de
 * setup, e a única coisa que ele recebe da página é o IDENTIFICADOR da máquina
 * (`productId`, que no Magento é o SKU). Tudo o que aparece — biblioteca de
 * títulos, veredito, ordem da vitrine — vem de `lib/setups` + `lib/gameLibrary`.
 *
 * Por que essa fronteira importa: no Magento a descrição do produto é HTML
 * digitado por pessoa, uma vez por SKU. Se esta seção morasse lá, seriam nove
 * cópias divergindo a cada edição — jogo novo em três builds e faltando em
 * seis. Aqui ela é um bloco só, com um ponto de manutenção.
 *
 * Mapa de implantação (ver docs/magento/setup-pdp-blocos.md):
 *   · Este componente  → CMS Block único, colocado por Widget Instance nas
 *                        páginas de produto da categoria "Setups".
 *   · productId/SKU    → já existe na página; o script lê e resolve o tier.
 *   · Biblioteca       → JSON dentro do próprio bloco, atualizável por
 *                        `PUT /V1/cmsBlock/:id`.
 *   · Descrição do SKU → não contém NADA desta seção.
 *
 * Regra para quem mexer aqui: nada neste arquivo pode depender de campo escrito
 * à mão por SKU. Se precisar de um dado novo por máquina, ele entra como
 * atributo do produto (derivável), nunca como texto na descrição.
 */

import { useState } from "react";
import { Search, X, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import {
  getSetupPlaybook, matchesWorkloadSearch, getHeaviestSupported, groupWorkloadsByVerdict,
  type SetupWorkload, type WorkloadKind, type WorkloadGroup,
} from "../lib/setups";

export const WORKLOADS_ANCHOR_ID = "o-que-roda";

const TAB_LABEL: Record<WorkloadKind, string> = { game: "Jogos", program: "Programas" };
const TAB_NOUN: Record<WorkloadKind, string> = { game: "jogos", program: "programas" };

/* O catálogo teve três layouts em protótipo — grid de capas, destaque + faixa
   e lista compacta — trocáveis dentro do modal para comparar lado a lado. O
   cliente escolheu o grid de capas; os outros dois e o seletor foram apagados.
   Não reintroduzir: a comparação já aconteceu. */

/* ═══════════════════════════════════════════════════════
   PEÇAS VISUAIS
   ═══════════════════════════════════════════════════════ */

/** Capa (jogo) ou logo (programa). Logo ganha fundo de marca e respiro. */
export function WorkloadArt({ item, className = "", contain }: { item: SetupWorkload; className?: string; contain?: boolean }) {
  const fitsInside = contain ?? Boolean(item.bg1);
  const background = item.bg1 ? `linear-gradient(135deg, ${item.bg1} 0%, ${item.bg2 ?? item.bg1} 100%)` : "rgba(var(--foreground-rgb), 0.06)";

  return (
    <div className={`overflow-hidden ${className}`} style={{ background }} aria-hidden="true">
      {item.image ? (
        <ImageWithFallback
          src={item.image}
          alt=""
          /* Padding proporcional: `p-4` fixo sufocava o logo na miniatura de
             80×44 e sobrava no card grande. */
          className={`h-full w-full ${fitsInside ? "object-contain p-[9%]" : "object-cover"}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-foreground/30" style={{ fontFamily: "var(--font-family-figtree)", fontWeight: 800 }}>
          {item.name.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}

/** Selo de qualidade — apagado no item que a máquina não dá conta. */
function WorkloadBadge({ item }: { item: SetupWorkload }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 uppercase tracking-[0.1em] ${item.supported ? "bg-primary/15 text-primary" : "bg-foreground/10 text-foreground/50"}`}
      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700 }}
    >
      {item.quality}
    </span>
  );
}

/**
 * Cabeçalho do grupo: o veredito dito UMA vez, com a contagem do que cai nele.
 * É o que substitui sete cards repetindo "Instantâneo · arquivos grandes sem
 * pensar no peso" — mesma informação, lida como dado em vez de enchimento.
 */
function VerdictHeader({ group, kind }: { group: WorkloadGroup; kind: WorkloadKind }) {
  return (
    <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span
        className={group.supported ? "text-primary" : "text-foreground/50"}
        style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em" }}
      >
        {group.value}
      </span>
      <span className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
        {group.detail}
      </span>
      <span className="tabular-nums text-foreground/35" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
        · {group.items.length} {group.items.length === 1 ? TAB_NOUN[kind].replace(/s$/, "") : TAB_NOUN[kind]}
      </span>
    </div>
  );
}

/* Grid de capas — o layout escolhido para o catálogo. */
function WorkloadsGrid({ items, showVerdict }: { items: SetupWorkload[]; showVerdict: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="group overflow-hidden border border-foreground/8 transition-colors hover:border-foreground/20"
          style={{ borderRadius: "var(--radius-card)", background: "rgba(var(--foreground-rgb), 0.03)", opacity: item.supported ? 1 : 0.6 }}
        >
          <WorkloadArt item={item} className="h-[130px] w-full" />
          <div className="p-4">
            <p className="truncate text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              {item.name}
            </p>
            <p className="truncate text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
              {item.tag}
            </p>
            {/* Agrupado, o veredito já está no cabeçalho: repetir aqui era o
                que fazia seis cards dizerem a mesma frase. */}
            {showVerdict && (
              <>
                <p className={`mt-2 ${item.supported ? "text-primary" : "text-foreground/50"}`} style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {item.value}
                </p>
                <p className="text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.35 }}>
                  {item.detail}
                </p>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Lista de títulos — agrupada por veredito quando isso ajuda, flat quando não.
 *
 * Agrupar resolve a repetição (sete programas dizendo "Instantâneo · arquivos
 * grandes sem pensar no peso"), mas atrapalha quando o veredito varia: em jogo
 * o número muda de título para título, e grupos de um item deixavam uma capa
 * sozinha ocupando a fileira inteira.
 *
 * A régua é o tamanho médio do grupo: veredito que se repete bastante vira
 * cabeçalho; veredito quase único é dado do card. Sem lista de exceção — a
 * mesma conta serve para jogo, programa, vitrine e catálogo.
 */
const MIN_GROUP_AVG = 3;

function GroupedWorkloads({ items, kind }: { items: SetupWorkload[]; kind: WorkloadKind }) {
  const groups = groupWorkloadsByVerdict(items);
  if (items.length / groups.length < MIN_GROUP_AVG) {
    return <WorkloadsGrid items={items} showVerdict />;
  }

  return (
    <div className="space-y-7">
      {groups.map((group) => (
        <section key={`${group.value}-${group.detail}`}>
          <VerdictHeader group={group} kind={kind} />
          <WorkloadsGrid items={group.items} showVerdict={false} />
        </section>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FICHA — atalho de duas linhas na sidebar
   ═══════════════════════════════════════════════════════ */

/**
 * Linha da ficha que resume jogos ou programas: três capas em bolinha, o
 * quanto sobra e o atalho para o catálogo. Cabe onde antes havia uma pilha de
 * chips, e mantém o alinhamento das outras linhas de spec.
 */
export function WorkloadFichaRow({
  label, items, actionLabel, onClick,
}: {
  label: string;
  items: SetupWorkload[];
  actionLabel: string;
  onClick: () => void;
}) {
  if (!items.length) return null;
  const preview = items.slice(0, 3);
  const rest = items.length - preview.length;

  return (
    <li className="flex items-center justify-between gap-4 py-2.5" style={{ borderTop: "1px solid rgba(var(--foreground-rgb), 0.07)" }}>
      <span className="text-foreground/45 uppercase tracking-[0.08em] leading-tight" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700 }}>
        {label}
      </span>
      {/* nowrap: com a linha quebrando, "Ver programas" descia e desalinhava
          das outras linhas da ficha. */}
      <button
        type="button"
        onClick={onClick}
        className="group flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap text-primary transition-colors hover:text-primary/80"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
      >
        {/* Capas sobrepostas: a borda na cor do fundo separa uma da outra. */}
        <span className="flex -space-x-1.5">
          {preview.map((item) => (
            <WorkloadArt key={item.id} item={item} className="h-5 w-5 shrink-0 rounded-full ring-2 ring-[var(--surface-0)]" />
          ))}
        </span>
        {rest > 0 && (
          <span className="text-foreground/55 tabular-nums" style={{ fontWeight: 700 }}>
            +{rest}
          </span>
        )}
        {actionLabel}
        <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════
   VITRINE — o que fica na página
   ═══════════════════════════════════════════════════════ */

/**
 * A página mostra só a vitrine: os títulos mais relevantes para a persona, com
 * o veredito agrupado. O catálogo inteiro (com busca) abre no modal.
 *
 * Antes a seção despejava 28 jogos e 22 programas inline — 15 telas de rolagem
 * no mobile para um conteúdo que o comprador consulta, não lê.
 */
export function SetupWorkloadsBlock({
  productId, tab, onTabChange, onOpenCatalog,
}: {
  productId: number;
  /* Aba controlada de fora: "Ver jogos" na ficha precisa abrir JÁ na aba certa
     — com estado interno, caía na aba da persona e o usuário via programas
     depois de pedir jogos. */
  tab: WorkloadKind;
  onTabChange: (kind: WorkloadKind) => void;
  onOpenCatalog: (kind: WorkloadKind) => void;
}) {
  const playbook = getSetupPlaybook(productId);
  if (!playbook) return null;

  const featured = playbook.featured[tab];
  const summary = playbook.summary[tab];
  const rest = summary.total - featured.length;

  return (
    <section id={WORKLOADS_ANCHOR_ID} className="scroll-mt-32 border-t border-edge-subtle px-6 py-10 md:px-10">
      <p className="mb-3 text-primary tracking-[0.24em]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}>
        // O QUE RODA NESSA MÁQUINA
      </p>
      <h3
        className="max-w-[720px] text-foreground"
        style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(20px, 3.2vw, 32px)", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        Jogos e programas, com o desempenho que você pode esperar
      </h3>
      <p className="mt-3 max-w-[720px] text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
        Estimativas com a configuração de fábrica deste setup, na resolução do monitor que acompanha.
      </p>

      {/* Abas Jogos | Programas */}
      <div className="mt-6 flex items-center gap-6 border-b border-foreground/8" role="tablist">
        {(["game", "program"] as WorkloadKind[]).map((kind) => {
          const active = tab === kind;
          return (
            <button
              key={kind}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(kind)}
              className={`-mb-px cursor-pointer border-b-2 pb-3 transition-colors ${active ? "border-primary text-foreground" : "border-transparent text-foreground/45 hover:text-foreground/70"}`}
              style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {TAB_LABEL[kind]} <span className="text-foreground/35">({playbook.summary[kind].total})</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <GroupedWorkloads items={featured} kind={tab} />
      </div>

      {/* Rodapé: o que ficou de fora, com o número na frente do convite. */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => onOpenCatalog(tab)}
          className="group inline-flex cursor-pointer items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
        >
          <Search size={14} className="shrink-0" />
          Ver os {summary.total} {TAB_NOUN[tab]} e buscar o seu
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
        {rest > 0 && (
          <span className="text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
            {/* Nem toda máquina roda tudo: o Base com vídeo integrado precisa
                dizer isso no rodapé, não esconder no fim da lista. */}
            mais {rest} medido{rest > 1 ? "s" : ""}
            {summary.supported < summary.total && ` · ${summary.supported} de ${summary.total} rodam bem nesta máquina`}
          </span>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CATÁLOGO — o que abre no modal
   ═══════════════════════════════════════════════════════ */

/**
 * Catálogo completo com busca, na mesma sidebar que a página já usa para a
 * configuração do setup. Sai da página (que fica curta) sem sair do produto.
 */
export function WorkloadsCatalogSheet({
  productId, productName, open, onOpenChange, tab, onTabChange,
}: {
  productId: number;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tab: WorkloadKind;
  onTabChange: (kind: WorkloadKind) => void;
}) {
  const playbook = getSetupPlaybook(productId);
  const [query, setQuery] = useState("");
  if (!playbook) return null;

  const searching = query.trim().length > 0;
  const all = tab === "game" ? playbook.games : playbook.programs;
  const other = tab === "game" ? playbook.programs : playbook.games;
  const matches = searching ? all.filter((item) => matchesWorkloadSearch(item, query)) : all;
  /* Busca atravessa as abas: quem digita "premiere" na aba Jogos não pode ver
     "nada encontrado" com o resultado esperando na aba do lado. */
  const matchesElsewhere = searching ? other.filter((item) => matchesWorkloadSearch(item, query)) : [];
  const otherTab: WorkloadKind = tab === "game" ? "program" : "game";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex h-full w-full flex-col gap-0 border-l border-foreground/10 bg-background p-0 sm:max-w-[760px]">
        <SheetHeader className="shrink-0 border-b border-foreground/8 p-5 pr-14">
          <p className="text-primary tracking-[0.24em]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}>
            // O QUE RODA NESSA MÁQUINA
          </p>
          <SheetTitle
            className="text-foreground"
            style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            {productName}
          </SheetTitle>
          <SheetDescription className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
            Estimativas com a configuração de fábrica, na resolução do monitor que acompanha.
          </SheetDescription>

          {/* Busca sobre o que está medido. Não estima título fora da lista. */}
          <div className="pcyes-inline-search mt-3 flex items-center gap-2 rounded-[var(--radius-button)] border border-foreground/12 px-3 py-2 transition-colors">
            <Search size={15} className="shrink-0 text-foreground/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busque o jogo ou programa que você usa"
              aria-label="Buscar jogo ou programa"
              className="w-full bg-transparent text-foreground outline-none placeholder:text-foreground/35"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
            />
            {searching && (
              <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca" className="shrink-0 cursor-pointer text-foreground/40 transition-colors hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center gap-6 border-b border-foreground/8" role="tablist">
            {(["game", "program"] as WorkloadKind[]).map((kind) => {
              const list = kind === "game" ? playbook.games : playbook.programs;
              // Com busca ativa, a aba mostra quantos resultados tem — é o que
              // diz para qual lado ir quando o título está na outra.
              const count = searching ? list.filter((item) => matchesWorkloadSearch(item, query)).length : list.length;
              return (
                <button
                  key={kind}
                  type="button"
                  role="tab"
                  aria-selected={tab === kind}
                  onClick={() => onTabChange(kind)}
                  className={`-mb-px cursor-pointer border-b-2 pb-2.5 transition-colors ${tab === kind ? "border-primary text-foreground" : "border-transparent text-foreground/45 hover:text-foreground/70"}`}
                  style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}
                >
                  {TAB_LABEL[kind]} <span className="text-foreground/35">({count})</span>
                </button>
              );
            })}
          </div>
        </SheetHeader>

        {/* min-h-0: sem isso o flex-1 estica além da altura do sheet e a lista
            fica cortada em vez de rolar. */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="p-5">
            {matches.length > 0 ? (
              <GroupedWorkloads key={`${tab}-${query}`} items={matches} kind={tab} />
            ) : (
              /* Vazio útil: não medimos aquele título, mas a régua responde. Quem
                 vê que a máquina roda os mais pesados da lista conclui sozinho. */
              <div className="p-6" style={{ borderRadius: "var(--radius-card)", background: "rgba(var(--foreground-rgb), 0.03)", border: "1px solid rgba(var(--foreground-rgb), 0.07)" }}>
                <p className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700 }}>
                  Não temos “{query.trim()}” medido nesta lista.
                </p>
                {matchesElsewhere.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => onTabChange(otherTab)}
                    className="mt-2 inline-flex cursor-pointer items-center gap-1 text-primary transition-colors hover:text-primary/80"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
                  >
                    Mas achamos {matchesElsewhere.length} em {TAB_LABEL[otherTab]}
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <>
                    <p className="mt-2 max-w-[560px] text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
                      Use como régua o mais pesado que esta máquina entrega — se roda isso, roda o que exige menos.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {getHeaviestSupported(all).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <WorkloadArt item={item} className="h-11 w-20 shrink-0 rounded-[var(--radius-card-sm)]" />
                          <div className="min-w-0">
                            <p className="truncate text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
                              {item.name}
                            </p>
                            <p className="text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-sm)", fontWeight: 800 }}>
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {searching && matchesElsewhere.length > 0 && matches.length > 0 && (
              <button
                type="button"
                onClick={() => onTabChange(otherTab)}
                className="mt-5 inline-flex cursor-pointer items-center gap-1 text-foreground/50 transition-colors hover:text-foreground"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
              >
                Também há {matchesElsewhere.length} resultado{matchesElsewhere.length > 1 ? "s" : ""} em {TAB_LABEL[otherTab]}
                <ChevronRight size={13} />
              </button>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
