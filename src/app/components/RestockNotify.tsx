import { useState, useEffect } from "react";
import { BellRing, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

/**
 * "Avise-me quando chegar" — substitui o CTA de compra em produtos esgotados.
 *
 * Decisões de UX:
 *  - O slot primário NÃO fica com um botão morto "Comprar agora" desabilitado.
 *    O status "Sem estoque" já aparece acima; repetir no botão só mata a única
 *    ação possível.
 *  - Segue o alerta nativo do Magento (Magento_ProductAlert), que só inscreve
 *    cliente logado e manda o e-mail pelo cron quando o estoque volta. Não há
 *    inscrição só com e-mail: deslogado vê "Entre para ser avisado", faz login
 *    e volta já inscrito, sem clicar de novo.
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
  const { isLoggedIn, user, promptLogin, authModalOpen } = useAuth();
  const [stage, setStage] = useState<"idle" | "sending" | "done">("idle");
  // Clicou deslogado: a inscrição fica pendente até o login terminar.
  const [pending, setPending] = useState(false);

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

  useEffect(() => {
    if (pending && isLoggedIn && user?.email) {
      setPending(false);
      confirm(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending, isLoggedIn, user?.email]);

  // Fechou o login sem entrar: desiste, senão um login qualquer depois
  // inscreveria o cliente sem ele pedir de novo.
  useEffect(() => {
    if (pending && !authModalOpen && !isLoggedIn) setPending(false);
  }, [pending, authModalOpen, isLoggedIn]);

  const handlePrimary = () => {
    if (isLoggedIn && user?.email) return confirm(user.email);
    setPending(true);
    promptLogin();
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
          {user?.email && (
            <p
              className="mt-0.5 text-foreground/50"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
            >
              O aviso vai para {user.email}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-avise-me>
      {/* Vermelho da marca, não verde: verde é "pode comprar". Esgotado, o
          aviso é a única ação da página e ocupa o lugar do botão de compra. */}
      <button
        onClick={handlePrimary}
        disabled={stage === "sending"}
        className="flex w-full cursor-pointer items-center justify-center gap-2 py-4 text-white transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
        style={{
          borderRadius: "var(--radius-pill)",
          background: "var(--gradient-brand)",
          boxShadow: "var(--shadow-brand-cta)",
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-sm)",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        {stage === "sending" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <BellRing size={15} strokeWidth={2.2} />
        )}
        {isLoggedIn ? "Avise-me quando chegar" : "Entre para ser avisado"}
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
