import { Link } from "react-router";
import { ChevronLeft, Hand, Lock } from "lucide-react";
import { openVLibras } from "./VLibras";

const PCYES_LOGO = "https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png";

/* Cabeçalho próprio do checkout. Sem busca, menu e faixa de anúncio: quem
   chegou aqui já decidiu comprar, e cada link do site inteiro é uma saída.
   A troca de cabeçalho também marca que a pessoa mudou de lugar, saiu da
   loja e entrou no caixa.

   No celular o "Voltar" mora aqui em cima, na mesma posição de qualquer app;
   a barra fixa de baixo fica só com o avanço. Sem `onBack` (pedido feito,
   Pix aguardando) não há para onde voltar e o botão some. */
export function CheckoutHeader({ onBack, backLabel = "Voltar" }: { onBack?: () => void; backLabel?: string }) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-edge"
      style={{ background: "rgba(14,14,14,0.95)", backdropFilter: "blur(20px)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <div className="flex items-center">
          {onBack && (
            <button
              onClick={onBack}
              className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full px-2 text-ink transition-colors hover:text-ink-strong md:hidden"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
            >
              <ChevronLeft size={18} strokeWidth={2.4} />
              {backLabel}
            </button>
          )}
          <Link to="/" className={`flex-shrink-0 ${onBack ? "hidden md:block" : ""}`} aria-label="PCYES, voltar pra loja">
            <img src={PCYES_LOGO} alt="PCYES" className="h-[24px] w-auto object-contain md:h-[30px]" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="hidden items-center gap-1.5 text-ink-muted md:inline-flex"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
          >
            <Lock size={13} strokeWidth={2.4} className="text-green-500" />
            Compra 100% segura
          </span>
          {/* Mesmo atalho do cabeçalho da loja: quem depende de Libras não
              pode perder o tradutor justo na hora de pagar. */}
          <button
            onClick={openVLibras}
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink-muted transition-colors hover:text-ink-strong"
            aria-label="Acessibilidade em Libras"
          >
            <Hand size={20} strokeWidth={1.5} />
          </button>
          {onBack && (
            <Link to="/" className="flex-shrink-0 md:hidden" aria-label="PCYES, voltar pra loja">
              <img src={PCYES_LOGO} alt="PCYES" className="h-[24px] w-auto object-contain" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
