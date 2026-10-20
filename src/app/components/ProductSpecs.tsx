import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { productSpecs, type SpecRow } from "./productSpecs";

/* ═══════════════════════════════════════════════════════
   ESPECIFICAÇÕES TÉCNICAS — vem do CRM, não da descrição.
   No Magento são os atributos do produto com "Visível no front"
   = Sim, na ordem do attribute set. Nada aqui é digitado à mão:
   a seção só formata o que o cadastro manda.
   ═══════════════════════════════════════════════════════ */

const COLLAPSED = 10;
// Identificadores vão para o rodapé da ficha, não para a grade.
const FOOTER_LABELS = ["Número do modelo", "Cód. Barras(EAN)"];
const FOOTER_NAMES: Record<string, string> = { "Número do modelo": "Modelo", "Cód. Barras(EAN)": "EAN" };

function clean(rows: SpecRow[]) {
  return rows
    .map((row) => ({ ...row, values: row.values.filter((v) => v.toLowerCase() !== "não aplicável") }))
    .filter((row) => row.values.length > 0);
}

export function ProductSpecs({ sku }: { sku?: string }) {
  const [expanded, setExpanded] = useState(false);
  const rows = sku ? clean(productSpecs[sku] ?? []) : [];
  const grid = rows.filter((row) => !FOOTER_LABELS.includes(row.label));
  const footer = rows.filter((row) => FOOTER_LABELS.includes(row.label));
  if (!grid.length) return null;

  const canCollapse = grid.length > COLLAPSED + 2;
  const visible = canCollapse && !expanded ? grid.slice(0, COLLAPSED) : grid;

  return (
    <section className="py-14 md:py-16 border-t border-foreground/5">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8">
          <p className="mb-3 text-primary tracking-[0.22em]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}>
            // FICHA TÉCNICA
          </p>
          <h2 className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(24px, 3.4vw, 32px)", lineHeight: 1.08, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Especificações técnicas
          </h2>
        </div>

        <div className="overflow-hidden border border-foreground/10 bg-foreground/[0.03]" style={{ borderRadius: "var(--radius-card-lg)" }}>
          <dl className="grid sm:grid-cols-2">
            {visible.map((row, i) => (
              <div
                key={row.label}
                className={`border-b border-edge-subtle px-6 py-4 ${i % 2 === 0 ? "sm:border-r" : ""}`}
              >
                <dt className="uppercase text-foreground/48 tracking-[0.12em]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}>
                  {row.label}
                </dt>
                {row.values.length === 1 ? (
                  <dd className="mt-1.5 text-foreground/85" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, lineHeight: 1.5 }}>
                    {row.values[0]}
                  </dd>
                ) : (
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-1.5">
                      {row.values.map((value) => (
                        <li
                          key={value}
                          className="border border-foreground/10 bg-foreground/[0.05] px-2.5 py-1 text-foreground/85"
                          style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-xs)", fontWeight: 600, lineHeight: 1.4 }}
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </dd>
                )}
              </div>
            ))}
          </dl>

          {(canCollapse || footer.length > 0) && (
            <div className="-mt-px flex flex-wrap items-center justify-between gap-3 border-t border-edge-subtle px-6 py-4">
              <p className="text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                {footer.map((row, i) => (
                  <span key={row.label}>
                    {i > 0 && " · "}
                    {FOOTER_NAMES[row.label]} <span className="text-foreground/70" style={{ fontWeight: 700 }}>{row.values.join(", ")}</span>
                  </span>
                ))}
              </p>
              {canCollapse && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="inline-flex items-center gap-1.5 text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700 }}
                >
                  {expanded ? "Ver menos" : `Ver todas as ${grid.length} especificações`}
                  <ChevronDown size={15} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
