import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Check, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const PCYES_LOGO = "https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png";

export function WelcomePopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const seen = sessionStorage.getItem("pcyes-welcome");
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    sessionStorage.setItem("pcyes-welcome", "seen");
    setTimeout(() => setVisible(false), 2500);
  };

  const dismiss = () => { sessionStorage.setItem("pcyes-welcome", "seen"); setVisible(false); };

  return (
    <AnimatePresence>
      {mounted && visible && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/65 backdrop-blur-md" onClick={dismiss} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[76] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-[920px] grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-card border border-border shadow-2xl"
              style={{ borderRadius: "var(--radius-card-lg)" }}
            >
              <button
                onClick={dismiss}
                aria-label="Fechar"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-black/30 text-ink-strong hover:bg-black/55 backdrop-blur-md transition-all cursor-pointer"
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              {/* ── Hero (left) ─────────────────────────────────────── */}
              <div
                className="relative hidden md:flex items-center justify-center min-h-[480px] overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at 28% 22%, rgba(255, 48, 48, 0.55) 0%, transparent 55%), radial-gradient(circle at 75% 78%, rgba(225, 6, 0, 0.4) 0%, transparent 50%), linear-gradient(135deg, #1d0404 0%, #0a0a0a 60%, #000 100%)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                <div className="pointer-events-none absolute -top-24 -left-24 w-[280px] h-[280px] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(255, 48, 48, 0.35) 0%, transparent 70%)" }} />
                <div className="pointer-events-none absolute -bottom-32 -right-20 w-[320px] h-[320px] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(225, 6, 0, 0.3) 0%, transparent 70%)" }} />

                <div className="relative z-10 flex flex-col items-center px-10 text-center">
                  <img src={PCYES_LOGO} alt="PCYES" className="w-[220px] mb-8 drop-shadow-[0_8px_24px_rgba(225,6,0,0.45)]" />
                  <p
                    className="text-ink leading-snug"
                    style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}
                  >
                    Built for<br />Performance
                  </p>
                  <p
                    className="mt-4 text-ink-muted max-w-[260px]"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.55 }}
                  >
                    Hardware, periféricos e setups feitos pra quem joga, edita e cria sem trava.
                  </p>
                </div>
              </div>

              {/* ── Form (right) ────────────────────────────────────── */}
              <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col justify-center">
                {!submitted ? (
                  <>
                    <h3
                      className="text-foreground mb-3"
                      style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-2xl)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}
                    >
                      Cadastre-se e ganhe <span className="text-primary">10% OFF</span><br />na primeira compra
                    </h3>
                    <p
                      className="text-foreground/55 mb-7"
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}
                    >
                      Lançamentos exclusivos, promos e cupons direto no seu inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-5 py-3.5 bg-background border border-border text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none transition-colors"
                        style={{ borderRadius: "var(--radius-pill)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
                      />
                      <button
                        type="submit"
                        className="w-full py-4 bg-neutral-950 text-ink-strong hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        style={{ borderRadius: "var(--radius-pill)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, letterSpacing: "0.02em" }}
                      >
                        QUERO MEU DESCONTO <ArrowRight size={16} strokeWidth={2} />
                      </button>
                    </form>

                    {/* Social */}
                    <div className="mt-7 flex items-center justify-center gap-3">
                      {[
                        { Icon: Facebook, label: "Facebook", href: "#" },
                        { Icon: Twitter, label: "X", href: "#" },
                        { Icon: Instagram, label: "Instagram", href: "#" },
                        { Icon: Youtube, label: "YouTube", href: "#" },
                      ].map(({ Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/65 hover:text-foreground hover:border-foreground/40 transition-colors"
                        >
                          <Icon size={16} strokeWidth={1.6} />
                        </a>
                      ))}
                    </div>

                    <button
                      onClick={dismiss}
                      className="mt-5 mx-auto block text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                    >
                      Não, obrigado
                    </button>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Check size={28} className="text-green-500" strokeWidth={2.2} />
                    </div>
                    <h3
                      className="text-foreground mb-3"
                      style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, lineHeight: 1.1 }}
                    >
                      Cadastro realizado!
                    </h3>
                    <p
                      className="text-foreground/60"
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}
                    >
                      Use o cupom <span className="text-primary font-medium">BEMVINDO</span> na sua primeira compra.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
