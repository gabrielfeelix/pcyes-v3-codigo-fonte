import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, AlertCircle, Check } from "lucide-react";
import { useAuth } from "../components/AuthContext";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { PASSWORD_HINT, passwordIssue } from "../lib/password";

const inputClass =
  "w-full pl-10 pr-10 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors";
const inputStyle = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
} as const;
const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20";
const captionStyle = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;
const bodyStyle = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" } as const;
const buttonStyle = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-medium)",
} as const;

/* Protótipo: qualquer token serve, menos este, que existe pra dar como testar a
   tela de link vencido. No Magento quem responde é createPassword, que devolve
   erro quando o token passou dos 30 minutos do e-mail. */
const EXPIRED_TOKEN = "expirado";

/* Também só no protótipo: ?estado=ok abre direto a tela de conclusão, que no
   fluxo real só existe depois do submit. Serve pra revisar o desenho dos três
   estados sem preencher formulário três vezes. Sai junto com os mocks. */
const PREVIEW_DONE = "ok";

/* Página de verdade, com navbar e rodapé: o link chega por e-mail e abre numa
   aba limpa, às vezes noutro aparelho, e uma tela solta ali não prova que é a
   PCYES. Nada de card com borda e raio — isso é vocabulário do modal, e repetir
   aqui faria a página parecer um diálogo que esqueceu o fundo. O que segura o
   conteúdo é a coluna estreita e o título, como nas páginas institucionais. */
export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { promptLogin } = useAuth();

  const token = params.get("token") ?? "";

  /* Cinco paradas de um caminho só. Pedir link novo mora aqui e não no modal:
     quem está nesta página já está no meio da recuperação, e abrir um diálogo
     por cima seria trocar de suporte no meio da tarefa. */
  const [stage, setStage] = useState<"form" | "expired" | "request" | "sent" | "done">(() =>
    params.get("estado") === PREVIEW_DONE ? "done"
      : !token || token === EXPIRED_TOKEN ? "expired"
      : "form"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const weak = passwordIssue(password);
    if (weak) { setError(weak); return; }
    if (password !== confirmation) { setError("As senhas não são iguais."); return; }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStage("done");
    } finally { setLoading(false); }
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setStage("sent");
    } finally { setLoading(false); }
  };

  const goToLogin = () => { navigate("/"); promptLogin(); };

  const backToLogin = (
    <button type="button" onClick={goToLogin}
      className="mx-auto mt-4 flex items-center justify-center gap-1.5 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
      style={captionStyle}
    ><ArrowLeft size={13} aria-hidden="true" />Voltar pro login</button>
  );

  const TITLES = {
    form: "Definir uma nova senha",
    expired: "Link expirado",
    request: "Pedir um link novo",
    sent: "E-mail enviado",
    done: "Senha alterada com sucesso",
  } as const;

  const SUPPORT = {
    form: "Escolha a senha que você vai usar pra entrar na PCYES.",
    expired: "O link para definir uma nova senha vale por 30 minutos. Peça outro e a gente manda na hora.",
    request: "Digite o e-mail da sua conta. Enviamos um link para você definir uma nova senha.",
    /* Confirma o envio sem confirmar a conta. Dizer "e-mail não cadastrado"
       transformaria a tela num verificador de quem compra na PCYES. */
    sent: `Se existir uma conta em ${email}, o link para definir uma nova senha está a caminho. Confira também o spam.`,
    done: "Use a senha nova para entrar na sua conta.",
  } as const;

  const title = TITLES[stage];
  const support = SUPPORT[stage];

  return (
    <>
      <SEO title="Definir uma nova senha" description="Defina uma nova senha para sua conta PCYES." />
      {/* A navbar é fixa e se posiciona pela --announce-h. Sem reservar a
          altura dela aqui, o título fica atrás do cabeçalho e a página abre
          direto no primeiro campo. 152/182px é a medida que o resto do site
          usa. */}
      <section className="relative overflow-hidden pt-[152px] md:pt-[182px]">
        {/* Mesmo brilho de topo das páginas institucionais: sem ele o conteúdo
            centralizado boia num retângulo preto grande demais. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[460px]"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,43,46,0.12) 0%, transparent 60%)" }}
        />

        {/* O pt- da section só livra a navbar fixa. Este é o respiro do
            conteúdo: coluna estreita e centrada encostada no cabeçalho lê como
            erro de layout, não como página. */}
        <div className="relative mx-auto w-full max-w-[520px] px-5 pt-12 pb-24 md:pt-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {stage !== "form" && stage !== "request" && (
              <span className={`mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full ${
                stage === "expired" ? "bg-primary/10 text-primary" : "bg-emerald-500/15 text-emerald-500"
              }`}>
                {stage === "expired"
                  ? <AlertCircle size={22} aria-hidden="true" />
                  : <Check size={22} aria-hidden="true" />}
              </span>
            )}

            {/* Um degrau abaixo do hero institucional (52px): esta página tem
                uma tarefa curta, não é capa de seção. A coluna do cabeçalho
                ainda é mais larga que a do formulário pro título não picotar. */}
            <h1
              className="text-center text-[28px] leading-[1.15] tracking-tight text-foreground md:text-[40px]"
              style={{ fontFamily: "var(--font-family-figtree)", fontWeight: 500 }}
            >
              {title}
            </h1>
            {/* Apoio em 16px, não 14: com o título em 52px o salto pro tamanho
                de legenda deixava a linha órfã. */}
            <p className="mx-auto mt-4 max-w-[42ch] text-center text-foreground/45"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", lineHeight: 1.6 }}
            >
              {support}
            </p>

            <div className="mx-auto mt-10 w-full max-w-[420px]">
              {stage === "expired" ? (
                /* Link vencido não é erro de quem clicou: os 30 minutos são
                   regra nossa. Por isso a tela não acusa nada, só troca de
                   parada — sem sair da página e sem abrir diálogo por cima. */
                <>
                  <button type="button" onClick={() => { setStage("request"); setError(null); }}
                    className="w-full py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    style={buttonStyle}
                  >Pedir um link novo<ArrowRight size={15} aria-hidden="true" /></button>
                  {backToLogin}
                </>
              ) : stage === "request" ? (
                <form onSubmit={handleRequest} className="space-y-3">
                  <div className="relative">
                    <Mail size={15} className={iconClass} aria-hidden="true" />
                    <input type="email" placeholder="E-mail" value={email} required
                      aria-label="E-mail"
                      onChange={(e) => { setEmail(e.target.value); setError(null); }}
                      className={`${inputClass} pr-4`} style={inputStyle} />
                  </div>

                  {error && (
                    <p role="alert" className="flex items-start gap-2 text-primary" style={captionStyle}>
                      <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />{error}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    style={buttonStyle}
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (
                      <>Enviar link<ArrowRight size={15} aria-hidden="true" /></>
                    )}
                  </button>
                  {backToLogin}
                </form>
              ) : stage === "sent" ? (
                /* Sem botão: o próximo passo está na caixa de entrada, não
                   nesta tela. Só a saída pro login. */
                backToLogin
              ) : stage === "done" ? (
                /* O botão fica, ao contrário da confirmação de cadastro: a
                   pessoa chegou de fora, não estava no meio de nada, e não há
                   destino pra retomar sozinho. */
                <button type="button" onClick={goToLogin}
                  className="w-full py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  style={buttonStyle}
                >Entrar<ArrowRight size={15} aria-hidden="true" /></button>
              ) : (
                /* Sem autoFocus: numa página o navegador rola até o campo
                   focado, e o título some atrás da navbar fixa. Quem chega aqui
                   vindo do e-mail precisa ler onde caiu antes de digitar. */
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Lock size={15} className={iconClass} aria-hidden="true" />
                    <input type={showPassword ? "text" : "password"} placeholder="Nova senha" value={password} required
                      aria-label="Nova senha"
                      onChange={(e) => { setPassword(e.target.value); setError(null); }}
                      className={inputClass} style={inputStyle} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-foreground/20 hover:text-foreground/50 transition-colors cursor-pointer"
                    >{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  </div>

                  <div className="relative">
                    <Lock size={15} className={iconClass} aria-hidden="true" />
                    <input type={showPassword ? "text" : "password"} placeholder="Repita a nova senha" value={confirmation} required
                      aria-label="Repita a nova senha"
                      onChange={(e) => { setConfirmation(e.target.value); setError(null); }}
                      className={inputClass} style={inputStyle} />
                  </div>

                  {!error && <p className="text-foreground/40" style={captionStyle}>{PASSWORD_HINT}</p>}

                  {error && (
                    <p role="alert" className="flex items-start gap-2 text-primary" style={captionStyle}>
                      <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />{error}
                    </p>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    style={buttonStyle}
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (
                      <>Salvar senha<ArrowRight size={15} aria-hidden="true" /></>
                    )}
                  </button>
                  {backToLogin}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
