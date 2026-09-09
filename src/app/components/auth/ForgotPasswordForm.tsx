import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Loader2, ArrowRight, ArrowLeft, AlertCircle, Check } from "lucide-react";

const inputClass =
  "w-full pl-10 pr-4 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors";
const inputStyle = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
} as const;
const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20";
const captionStyle = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

/* Duas telas: pede o e-mail e confirma que o link saiu. A senha nova não é
   definida aqui — o link do e-mail leva pra /redefinir-senha, que é onde o
   token é conferido. Quem redefine sem token só precisaria adivinhar o e-mail
   de alguém, então a etapa fora do navegador é a segurança do fluxo. */
export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
    } catch {
      setError("Não deu pra enviar agora. Tenta de novo em instantes.");
    } finally {
      setLoading(false);
    }
  };

  /* Confirma o envio sem confirmar a conta. Dizer "e-mail não cadastrado"
     transformaria esta tela num verificador de quem compra na PCYES: bastaria
     enfileirar endereços e ler a resposta. O "se existir" custa uma linha e
     fecha isso. */
  if (sent) {
    return (
      <div className="px-8 pb-8 pt-2 text-center">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"
        ><Check size={22} aria-hidden="true" /></motion.span>
        <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}>
          E-mail enviado
        </p>
        <p className="px-2 pt-1 text-foreground/40" style={{ ...captionStyle, lineHeight: 1.65 }}>
          Se existir uma conta em {email}, o link para definir uma nova senha está a caminho.
          Confira também o spam.
        </p>
        <button type="button" onClick={onBackToLogin}
          className="mx-auto mt-5 flex items-center justify-center gap-1.5 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
          style={captionStyle}
        ><ArrowLeft size={13} aria-hidden="true" />Voltar pro login</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-3">
      <p className="pb-1 text-foreground/40" style={captionStyle}>
        Digite o e-mail da sua conta. Enviamos um link para você definir uma nova senha.
      </p>

      <div className="relative">
        <Mail size={15} className={iconClass} aria-hidden="true" />
        <input type="email" placeholder="E-mail" value={email} required autoFocus
          onChange={(e) => { setEmail(e.target.value); setError(null); }}
          className={inputClass} style={inputStyle} />
      </div>

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
          <>Enviar link<ArrowRight size={15} aria-hidden="true" /></>
        )}
      </button>

      <button type="button" onClick={onBackToLogin}
        className="flex w-full items-center justify-center gap-1.5 pt-1 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
        style={captionStyle}
      ><ArrowLeft size={13} aria-hidden="true" />Voltar pro login</button>
    </form>
  );
}
