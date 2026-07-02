import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Home, Compass } from "lucide-react";

const POPULAR = [
  { label: "Periféricos", href: "/perifericos" },
  { label: "Computadores", href: "/computadores" },
  { label: "Cadeiras", href: "/cadeiras" },
  { label: "Hardware", href: "/hardware" },
  { label: "Placas de Vídeo", href: "/placas-de-video" },
];

export function NotFoundPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    navigate(v ? `/produtos?search=${encodeURIComponent(v)}` : "/produtos");
  };

  return (
    <main className="min-h-[70vh] pt-[calc(56px+var(--announce-h))] md:pt-[calc(120px+var(--announce-h))]">
      <div className="mx-auto flex max-w-[560px] flex-col items-center px-5 py-16 text-center md:py-24">
        <p className="text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}>
          // ERRO 404
        </p>
        <h1 className="mt-3 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-md text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", lineHeight: 1.6 }}>
          O endereço que você tentou acessar não existe ou foi movido. Busque o que precisa ou volte para a loja.
        </p>

        <form onSubmit={submit} className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-edge bg-surface-glass px-4 py-1 focus-within:border-foreground/30 transition-colors">
          <Search size={18} className="flex-shrink-0 text-ink-muted" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar produtos…"
            aria-label="Buscar produtos"
            className="h-11 min-w-0 flex-1 bg-transparent text-ink-strong outline-none placeholder:text-ink-subtle"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
          />
          <button type="submit" className="flex-shrink-0 rounded-full bg-primary px-5 py-2 text-primary-foreground transition-transform hover:scale-[1.03]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
            Buscar
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Link to="/" className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-edge px-4 text-ink-strong transition-colors hover:border-foreground/30" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
            <Home size={16} aria-hidden="true" /> Ir para a Home
          </Link>
          <Link to="/produtos" className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-edge px-4 text-ink-strong transition-colors hover:border-foreground/30" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
            <Compass size={16} aria-hidden="true" /> Ver todos os produtos
          </Link>
        </div>

        <div className="mt-10 w-full">
          <p className="text-ink-subtle" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", letterSpacing: "0.06em" }}>
            CATEGORIAS POPULARES
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {POPULAR.map((c) => (
              <Link key={c.href} to={c.href} className="inline-flex min-h-[40px] items-center rounded-full bg-surface-glass px-4 text-ink-muted transition-colors hover:text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
