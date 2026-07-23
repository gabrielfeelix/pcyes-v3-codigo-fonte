import { useState, useRef, useEffect } from "react";
import { BellRing, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

/**
 * "Avise-me quando chegar" — substitui o CTA de compra em produtos esgotados.
 *
 * Decisões de UX (pesquisa Baymard sobre produtos fora de estoque):
 *  - O slot primário NÃO fica com um botão morto "Comprar agora" desabilitado.
 *    O status "Sem estoque" já aparece acima; repetir no botão só mata a única
 *    ação possível.
 *  - Login NUNCA é obrigatório. Exigir conta é apontado como o motivo principal
 *    de praticamente ninguém concluir esse fluxo. Deslogado digita o e-mail
 *    inline (sem modal, sem cadastro); a oferta de criar conta vem depois,
 *    discreta e opcional.
 *  - Logado: 1 clique, o e-mail da conta é usado direto.
 *
 * Protótipo: não há backend, então o cadastro apenas confirma na interface.
 */
export function RestockNotify({
  productName,
  restockDate,
}: {
  productName: string;
  /** Previsão de retorno (ISO `YYYY-MM-DD`), quando conhecida. */
  restockDate?: string;
}) {
  const { isLoggedIn, user, promptLogin } = useAuth();
  const [stage, setStage] = useState<"idle" | "form" | "sending" | "done">("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === "form") inputRef.current?.focus();
  }, [stage]);

  const confirm = (target: string) => {
    setStage("sending");
    // Protótipo: sem backend. Simula o registro do interesse.
    setTimeout(() => {
      setStage("done");
      toast.success("Pronto! Avisaremos assim que chegar.", {
        description: `${productName.slice(0, 42)}… → ${target}`,
      });
    }, 700);
  };

  const handlePrimary = () => {
    if (isLoggedIn && user?.email) return confirm(user.email);
    setStage("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("Digite um e-mail válido.");
      return;
    }
    setError("");
    confirm(value);
  };

  if (stage === "done") {
    return (
      <div
        className="flex items-start gap-3 px-4 py-3.5"
        style={{
          borderRadius: "var(--radius-card-sm)",
          border: "1px solid rgba(34,197,94,0.28)",
          background: "rgba(34,197,94,0.07)",
        }}
        role="status"
      >
        <Check size={16} className="mt-0.5 flex-shrink-0 text-green-500" strokeWidth={2.4} />
        <div>
          <p
            className="text-green-400"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
          >
            Avisaremos você quando chegar
          </p>
          {!isLoggedIn && (
            <button
              onClick={() => promptLogin()}
              className="mt-1 cursor-pointer text-foreground/50 underline underline-offset-4 transition-colors hover:text-foreground/80"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
            >
              Criar conta para acompanhar seus avisos
            </button>
          )}
        </div>
      </div>
    );
  }

  if (stage === "form" || stage === "sending") {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <label
          htmlFor="restock-email"
          className="block text-foreground/60"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
        >
          Seu e-mail para o aviso
        </label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            id="restock-email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            aria-invalid={!!error}
            aria-describedby={error ? "restock-email-error" : undefined}
            className="min-w-0 flex-1 px-4 py-3 text-foreground placeholder-foreground/30 transition-colors focus:outline-none"
            style={{
              borderRadius: "var(--radius-card-sm)",
              border: `1px solid ${error ? "var(--ring)" : "rgba(var(--foreground-rgb), 0.10)"}`,
              background: "rgba(var(--foreground-rgb), 0.04)",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-sm)",
            }}
          />
          <button
            type="submit"
            disabled={stage === "sending"}
            className="flex-shrink-0 cursor-pointer px-5 text-ink-strong transition-transform hover:scale-[1.02] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              borderRadius: "var(--radius-card-sm)",
              background: "var(--gradient-brand)",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
            }}
          >
            {stage === "sending" ? <Loader2 size={15} className="animate-spin" /> : "Avisar"}
          </button>
        </div>
        {error && (
          <p
            id="restock-email-error"
            className="text-primary"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handlePrimary}
        className="flex w-full cursor-pointer items-center justify-center gap-2 py-4 text-foreground transition-colors hover:border-foreground/35 hover:bg-foreground/[0.06]"
        style={{
          borderRadius: "var(--radius-pill)",
          border: "1px solid rgba(var(--foreground-rgb), 0.22)",
          background: "rgba(var(--foreground-rgb), 0.04)",
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-sm)",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        <BellRing size={15} strokeWidth={2.2} />
        Avise-me quando chegar
      </button>
      {restockDate && (
        <p
          className="text-center text-foreground/50"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
        >
          Previsão de retorno: {formatRestockDate(restockDate)}
        </p>
      )}
    </div>
  );
}

/** "2026-08-14" → "14 de agosto". Sem ano quando é o ano corrente. */
function formatRestockDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  const sameYear = y === new Date().getFullYear();
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}
