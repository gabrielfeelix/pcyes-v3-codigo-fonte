import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, Check, AlertCircle } from "lucide-react";

const inputClass =
  "w-full pl-10 pr-4 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors";
const inputStyle = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
} as const;
const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20";
const captionStyle = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

/* Protótipo: qualquer código de 6 dígitos passa, menos este, que existe pra
   dar pra testar a tela de erro. */
const REJECTED_CODE = "000000";
const RESEND_SECONDS = 30;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

/* Três telas: pede o e-mail, confirma o código, define a senha nova. O código
   por e-mail mantém a redefinição dentro do modal — link por e-mail jogaria a
   pessoa pra outra aba e ela não voltaria pro carrinho. */
export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<"email" | "code" | "password" | "done">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  /* Contagem pro reenvio: sem ela a pessoa clica em "reenviar" três vezes
     seguidas e recebe três códigos, aí não sabe qual vale. */
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const sendCode = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setCooldown(RESEND_SECONDS);
      setStep("code");
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === "email") { await sendCode(); return; }

    if (step === "code") {
      if (code === REJECTED_CODE) { setError("Código incorreto. Confira o e-mail e tente de novo."); return; }
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 700));
        setStep("password");
      } finally { setLoading(false); }
      return;
    }

    if (step === "password") {
      if (password !== confirmation) { setError("As senhas não são iguais."); return; }
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 800));
        setStep("done");
        closeTimer.current = setTimeout(onBackToLogin, 2200);
      } finally { setLoading(false); }
    }
  };

  if (step === "done") {
    return (
      <div className="px-8 pb-8 pt-2 text-center">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"
        ><Check size={22} aria-hidden="true" /></motion.span>
        <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}>
          Senha alterada
        </p>
        <p className="pt-1 text-foreground/40" style={captionStyle}>Levando você pro login…</p>
      </div>
    );
  }

  const heading = step === "email"
    ? "Digite o e-mail da sua conta. Enviamos um código de 6 dígitos pra ele."
    : step === "code"
      ? `Código enviado para ${email}.`
      : "Escolha a senha nova.";

  return (
    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-3">
      <p className="pb-1 text-foreground/40" style={captionStyle}>{heading}</p>

      {step === "email" && (
        <div className="relative">
          <Mail size={15} className={iconClass} aria-hidden="true" />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus
            className={inputClass} style={inputStyle} />
        </div>
      )}

      {step === "code" && (
        <>
          <input
            type="text" inputMode="numeric" autoComplete="one-time-code" placeholder="000000" required autoFocus
            aria-label="Código de 6 dígitos" aria-invalid={!!error}
            value={code} onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(null); }}
            className="w-full py-3 text-center bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/15 focus:border-foreground/20 focus:outline-none transition-colors"
            style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-lg, 20px)", letterSpacing: "0.4em", textIndent: "0.4em" }}
          />
          <div className="text-center">
            <button type="button" disabled={cooldown > 0 || loading} onClick={() => void sendCode()}
              className="text-foreground/30 hover:text-primary transition-colors cursor-pointer disabled:cursor-default disabled:hover:text-foreground/30"
              style={captionStyle}
            >{cooldown > 0 ? `Reenviar em ${cooldown}s` : "Reenviar código"}</button>
          </div>
        </>
      )}

      {step === "password" && (
        <>
          <div className="relative">
            <Lock size={15} className={iconClass} aria-hidden="true" />
            <input type={showPassword ? "text" : "password"} placeholder="Nova senha" value={password} required minLength={8} autoFocus
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              className={`${inputClass} pr-10`} style={inputStyle} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-foreground/20 hover:text-foreground/50 transition-colors cursor-pointer"
            >{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button>
          </div>
          <div className="relative">
            <Lock size={15} className={iconClass} aria-hidden="true" />
            <input type={showPassword ? "text" : "password"} placeholder="Repita a nova senha" value={confirmation} required
              onChange={(e) => { setConfirmation(e.target.value); setError(null); }}
              className={inputClass} style={inputStyle} />
          </div>
          <p className="text-foreground/30" style={captionStyle}>Mínimo de 8 caracteres.</p>
        </>
      )}

      {error && (
        <p role="alert" className="flex items-start gap-2 text-primary" style={captionStyle}>
          <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />{error}
        </p>
      )}

      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : (
          <>{step === "email" ? "Enviar código" : step === "code" ? "Confirmar" : "Salvar senha"}<ArrowRight size={15} aria-hidden="true" /></>
        )}
      </button>

      <button type="button" onClick={onBackToLogin}
        className="flex w-full items-center justify-center gap-1.5 pt-1 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
        style={captionStyle}
      ><ArrowLeft size={13} aria-hidden="true" />Voltar pro login</button>
    </form>
  );
}
