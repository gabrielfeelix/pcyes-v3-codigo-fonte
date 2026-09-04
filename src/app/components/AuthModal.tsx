import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFocusTrap } from "../lib/useFocusTrap";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useAuth, type AccountType, type CompanyRegistration } from "./AuthContext";
import { SocialButtons } from "./auth/SocialButtons";
import { RegisterCompanyForm } from "./auth/RegisterCompanyForm";
import { ForgotPasswordForm } from "./auth/ForgotPasswordForm";

const ACCOUNT_TABS: { kind: AccountType; label: string }[] = [
  { kind: "pf", label: "Pessoa Física" },
  { kind: "pj", label: "Pessoa Jurídica" },
];

export function AuthModal() {
  const {
    authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab,
    authModalKind, setAuthModalKind,
    login, socialLogin, register, registerCompany, authRedirect, setAuthRedirect,
  } = useAuth();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = useState(false);

  /* O tipo de conta só existe no cadastro. Login é por e-mail e senha — a conta
     já sabe se é PF ou PJ, e perguntar aqui só faria o usuário errar. */
  const isCompanyRegister = authModalTab === "register" && authModalKind === "pj";

  const closeModal = useCallback(() => {
    setAuthModalOpen(false);
    setAuthRedirect(null);
  }, [setAuthModalOpen, setAuthRedirect]);
  const dialogRef = useFocusTrap<HTMLDivElement>(authModalOpen, closeModal);

  useEffect(() => {
    if (!authModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [authModalOpen]);

  const afterAuth = useCallback(() => {
    if (authRedirect) { const dest = authRedirect; setAuthRedirect(null); navigate(dest); }
  }, [authRedirect, setAuthRedirect, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (authModalTab === "login") await login(email, password);
      else await register(name, email, password);
      afterAuth();
    } finally { setLoading(false); }
  };

  const handleCompanySubmit = async (data: CompanyRegistration) => {
    setLoading(true);
    try {
      await registerCompany(data);
      afterAuth();
    } finally { setLoading(false); }
  };

  const handleSocial = async (provider: string) => {
    setSocialLoading(provider);
    try {
      await socialLogin(provider);
      afterAuth();
    }
    finally { setSocialLoading(null); }
  };

  const reset = () => { setEmail(""); setPassword(""); setName(""); setShowPassword(false); setForgotPassword(false); };
  const dismiss = () => { setAuthModalOpen(false); setAuthRedirect(null); reset(); };

  /* Genérico nas duas abas do cadastro: a tab ativa já diz qual é, e trocar o
     subtítulo junto fazia o header pular a cada clique. */
  const subtitle = forgotPassword ? "Recuperar senha" : authModalTab === "login" ? "Bem-vindo de volta" : "Crie sua conta";

  return (
    <AnimatePresence>
      {authModalOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md" onClick={dismiss} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Entrar ou criar conta"
              className="w-full max-w-[420px] max-h-[92vh] overflow-y-auto"
              style={{ borderRadius: "var(--radius-card-md)", background: isDark ? "#161617" : "white", border: isDark ? "1px solid rgba(var(--foreground-rgb), 0.06)" : "1px solid rgba(0,0,0,0.08)" }}
            >
              {/* Header */}
              <div className="relative px-8 pt-8 pb-6 text-center">
                <button onClick={dismiss}
                  aria-label="Fechar"
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer"
                ><X size={16} aria-hidden="true" /></button>

                <div className="mb-5">
                  <img src="https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png" alt="PCYES" className="h-[28px] w-auto mx-auto object-contain" />
                </div>
                <p className="text-foreground/40" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                  {subtitle}
                </p>
              </div>

              {/* Tipo de conta — só no cadastro. Fica visível em vez de escondido
                  atrás de um link porque a escolha muda o preço da loja inteira.
                  Sublinhado em vez de pílula preenchida: com fill e canto
                  arredondado ele virava sósia do par Apple|Discord logo abaixo,
                  e um é modo, o outro é ação. Tab sublinhada lê como navegação. */}
              {authModalTab === "register" && !forgotPassword && (
                <div className="border-b border-foreground/8">
                  <div role="tablist" aria-label="Tipo de conta" className="flex items-center justify-center gap-8">
                    {ACCOUNT_TABS.map(({ kind, label }) => {
                      const active = authModalKind === kind;
                      return (
                        <button key={kind} type="button" role="tab" aria-selected={active}
                          onClick={() => { setAuthModalKind(kind); reset(); }}
                          className={`relative pb-3 transition-colors duration-200 cursor-pointer ${active ? "text-foreground" : "text-foreground/35 hover:text-foreground/70"}`}
                          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
                        >
                          {label}
                          {active && (
                            <motion.span layoutId="account-kind-underline"
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute -bottom-px left-0 right-0 h-[2px] bg-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}


              {/* No login o header já dá o respiro; no cadastro quem separa é a
                  régua das tabs, então o corpo precisa do próprio topo. */}
              <div className={authModalTab === "register" ? "pt-6" : ""}>
              {forgotPassword ? (
                <ForgotPasswordForm onBackToLogin={() => setForgotPassword(false)} />
              ) : isCompanyRegister ? (
                <RegisterCompanyForm submitting={loading} onSubmit={handleCompanySubmit} onGoToLogin={() => { setAuthModalTab("login"); reset(); }} />
              ) : (
                <>
                  <SocialButtons isDark={isDark} loadingProvider={socialLoading} onSelect={handleSocial} />

                  {/* Divider */}
                  <div className="px-8 py-5 flex items-center gap-4">
                    <div className="flex-1 h-px bg-foreground/5" />
                    <span className="text-foreground/20" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>ou</span>
                    <div className="flex-1 h-px bg-foreground/5" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-3">
                    {authModalTab === "register" && (
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20" />
                        <input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required
                          className="w-full pl-10 pr-4 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors"
                          style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }} />
                      </div>
                    )}
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20" />
                      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className="w-full pl-10 pr-4 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors"
                        style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }} />
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20" />
                      <input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required
                        className="w-full pl-10 pr-10 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors"
                        style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-foreground/20 hover:text-foreground/50 transition-colors cursor-pointer"
                      >{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                    </div>

                    {authModalTab === "login" && (
                      <div className="text-right">
                        <button type="button" onClick={() => setForgotPassword(true)}
                          className="text-foreground/30 hover:text-primary transition-colors cursor-pointer"
                          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                        >Esqueceu a senha?</button>
                      </div>
                    )}

                    <button type="submit" disabled={loading}
                      className="w-full py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : (
                        <>{authModalTab === "login" ? "Entrar" : "Criar conta"}<ArrowRight size={15} /></>
                      )}
                    </button>

                    {authModalTab === "register" && (
                      <p className="pt-1 text-center text-foreground/25" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                        Ao criar a conta você aceita os{" "}
                        <a href="/termos-de-uso" target="_blank" className="underline hover:text-foreground/50 transition-colors">Termos de Uso</a>{" "}
                        e a{" "}
                        <a href="/politica-de-privacidade" target="_blank" className="underline hover:text-foreground/50 transition-colors">Política de Privacidade</a>.
                      </p>
                    )}
                  </form>
                </>
              )}
              </div>

              {!forgotPassword && (
              <p className="px-8 pb-8 text-center text-foreground/30" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                {authModalTab === "login" ? "Não tem conta? " : "Já tem conta? "}
                <button type="button" onClick={() => { setAuthModalTab(authModalTab === "login" ? "register" : "login"); reset(); }}
                  className="text-primary hover:underline cursor-pointer"
                >{authModalTab === "login" ? "Cadastre-se" : "Faça login"}</button>
              </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
