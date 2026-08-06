import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";
import { updateConsent } from "../../utils/analytics";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const accepted = localStorage.getItem("pcyes-cookies");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  /**
   * Publica a altura do aviso em `--cookie-h`.
   *
   * As páginas de compra têm barra fixa embaixo (PDP, carrinho, checkout,
   * Monte seu PC) e o aviso vinha por cima delas: no celular ele cobria o
   * "Comprar agora" inteiro. Quem ancora embaixo lê esta variável, e o `main`
   * usa o mesmo valor como padding para nada ficar escondido.
   *
   * O texto quebra em mais linhas conforme a largura, então a altura é medida
   * de verdade em vez de chutada — e reobservada quando a janela muda.
   *
   * O elemento é achado por `[data-cookie-bar]`, não por `ref`: ver o porquê no
   * comentário do `motion.div` lá embaixo.
   */
  useEffect(() => {
    const raiz = document.documentElement;
    const zerar = () => raiz.style.setProperty("--cookie-h", "0px");

    if (!visible) { zerar(); return; }

    const barra = document.querySelector<HTMLElement>("[data-cookie-bar]");
    if (!barra) { zerar(); return; }

    const medir = () => {
      if (barra.offsetHeight) raiz.style.setProperty("--cookie-h", `${barra.offsetHeight}px`);
    };
    medir();

    const observer = new ResizeObserver(medir);
    observer.observe(barra);
    window.addEventListener("resize", medir);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", medir);
      zerar();
    };
  }, [visible]);

  const accept = () => { localStorage.setItem("pcyes-cookies", "accepted"); updateConsent(true); setVisible(false); };
  const reject = () => { localStorage.setItem("pcyes-cookies", "rejected"); updateConsent(false); setVisible(false); };
  const dismiss = () => { localStorage.setItem("pcyes-cookies", "dismissed"); updateConsent(false); setVisible(false); };

  return (
    <AnimatePresence>
      {mounted && visible && (
        <motion.div
          /* Marcado por atributo em vez de `ref`: em React 18 `ref` não é prop,
             e o `PopChild` do `AnimatePresence` tenta lê-lo como prop de
             qualquer filho direto — dava aviso no console em toda página com o
             aviso aberto, com ou sem `motion` no meio. O efeito que mede a
             altura acha o elemento por este atributo. */
          data-cookie-bar
          initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[80] p-4 md:p-6"
        >
          <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-6 py-5 border bg-card border-border"
            style={{
              borderRadius: "var(--radius-card)",
              backdropFilter: "blur(40px)",
            }}
          >
            <Cookie size={20} className="text-foreground/35 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-foreground mb-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}>
                Nós usamos cookies
              </p>
              <p className="text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: "1.6" }}>
                Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, você concorda com nossa{" "}
                <a href="#" className="text-primary/70 hover:text-primary underline transition-colors">Política de Privacidade</a>.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={reject}
                className="px-4 py-2 border text-foreground/60 hover:text-foreground border-foreground/15 hover:border-foreground/30 transition-all duration-300 cursor-pointer"
                style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
              >Rejeitar</button>
              <button onClick={accept}
                className="px-5 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 cursor-pointer"
                style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)" }}
              >Aceitar</button>
              <button onClick={dismiss}
                aria-label="Fechar aviso de cookies"
                className="w-8 h-8 flex items-center justify-center text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
              ><X size={14} aria-hidden="true" /></button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
