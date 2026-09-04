import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Building2, Mail, Lock, User, Phone, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, AlertCircle, RotateCw, Check } from "lucide-react";
import { SearchableSelect } from "./SearchableSelect";
import { CnpjLookupError, formatCnpj, lookupCnpj, stripCnpj, toTitleCase, type CnpjLookupResult } from "../../lib/cnpj";
import { useAuth, type CompanyRegistration } from "../AuthContext";

const inputClass =
  "w-full pl-10 pr-4 py-3 bg-foreground/[0.03] border border-foreground/8 text-foreground placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none transition-colors";
const inputStyle = {
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
} as const;
const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/20";
const captionStyle = { fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" } as const;

const STEP_LABELS = ["Sua empresa", "Dados da empresa", "Seus dados", "Seu acesso"];

/* Segmentação nossa. O CNAE diz o que a empresa declara à Receita; isto diz o
   que ela faz com o produto PCYES, que é o que decide a condição comercial. */
const RAMOS = [
  "Revenda / loja de informática",
  "Assistência técnica",
  "Montagem de PC / integrador",
  "Lan house / centro de games",
  "Distribuidor",
  "Uso interno da empresa",
  "Outro",
];

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return d;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="block pb-1.5 text-foreground/45" style={captionStyle}>{children}</span>;
}

interface RegisterCompanyFormProps {
  submitting: boolean;
  onSubmit: (data: CompanyRegistration) => void;
  onGoToLogin: () => void;
}

/* Quatro passos: o CNPJ, o que a Receita respondeu sobre ele, quem é a pessoa,
   e o acesso. Nada do que vem da Receita é editável — razão social, endereço,
   IE e CNAE são dado fiscal, não preferência do usuário. */
export function RegisterCompanyForm({ submitting, onSubmit, onGoToLogin }: RegisterCompanyFormProps) {
  const { isCnpjRegistered } = useAuth();
  const [step, setStep] = useState(1);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const [cnpj, setCnpj] = useState("");
  const [company, setCompany] = useState<CnpjLookupResult | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<CnpjLookupError | null>(null);

  const [atividade, setAtividade] = useState("");
  const [ramo, setRamo] = useState("");
  const [phone, setPhone] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* A atividade da Receita já vem escolhida — na maioria das empresas ela é a
     certa, e quem tiver CNAE secundário mais relevante troca no select. */
  useEffect(() => {
    if (company) setAtividade(company.atividadePrincipal.codigo);
  }, [company]);

  const runLookup = async (value: string) => {
    setLookupLoading(true);
    setLookupError(null);
    setAlreadyRegistered(false);
    try {
      const found = await lookupCnpj(value);
      /* Só depois de existir na Receita é que faz sentido perguntar se já tem
         conta — CNPJ inválido nem chega aqui. */
      if (await isCnpjRegistered(found.cnpj)) {
        setAlreadyRegistered(true);
        setCompany(null);
        return;
      }
      setCompany(found);
    } catch (err) {
      setCompany(null);
      setLookupError(err instanceof CnpjLookupError ? err : new CnpjLookupError("Não foi possível consultar esse CNPJ agora.", true));
    } finally {
      setLookupLoading(false);
    }
  };

  const handleCnpjChange = (value: string) => {
    setCnpj(formatCnpj(value));
    setLookupError(null);
    setAlreadyRegistered(false);
    if (company) setCompany(null);
    if (stripCnpj(value).length === 14) void runLookup(value);
  };

  const atividades = company ? [company.atividadePrincipal, ...company.atividadesSecundarias] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) { if (company) setStep(2); return; }
    if (step === 2) {
      if (!ramo) { setError("Escolha o ramo de atividade."); return; }
      setStep(3); return;
    }
    if (step === 3) { setStep(4); return; }

    if (password !== confirmation) { setError("As senhas não são iguais."); return; }
    if (!company) return;

    const escolhida = atividades.find((a) => a.codigo === atividade) ?? company.atividadePrincipal;
    onSubmit({
      firstName, lastName, email, phone, password,
      company: {
        cnpj: formatCnpj(company.cnpj),
        razaoSocial: company.razaoSocial,
        nomeFantasia: company.nomeFantasia,
        endereco: company.endereco,
        inscricaoEstadual: company.inscricoesEstaduais[0],
        atividadePrincipal: escolhida,
        ramoAtividade: ramo,
      },
    });
  };


  return (
    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className="text-foreground/50" style={{ ...captionStyle, fontWeight: "var(--font-weight-medium)" }}>
          {STEP_LABELS[step - 1]}
        </span>
        <span className="flex items-center gap-1.5" role="presentation">
          {STEP_LABELS.map((_, i) => (
            <span key={i} className={`h-[3px] rounded-full transition-all duration-300 ${i + 1 === step ? "w-5 bg-primary" : i + 1 < step ? "w-2.5 bg-primary/40" : "w-2.5 bg-foreground/10"}`} />
          ))}
        </span>
      </div>

      {step === 1 && (
        <>
          <div className="relative">
            <Building2 size={15} className={iconClass} aria-hidden="true" />
            <input
              type="text" inputMode="numeric" placeholder="CNPJ" value={cnpj} required autoFocus
              aria-label="CNPJ" aria-invalid={!!lookupError}
              onChange={(e) => handleCnpjChange(e.target.value)}
              className={inputClass} style={inputStyle}
            />
            {lookupLoading && <Loader2 size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-foreground/30" />}
          </div>

          {lookupError && (
            <div role="alert" className="flex items-start gap-2 text-primary" style={captionStyle}>
              <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />
              <span className="flex-1">
                {lookupError.message}
                {lookupError.retryable && (
                  <button type="button" onClick={() => void runLookup(cnpj)}
                    className="ml-1.5 inline-flex items-center gap-1 underline hover:no-underline cursor-pointer">
                    <RotateCw size={11} aria-hidden="true" />tentar de novo
                  </button>
                )}
              </span>
            </div>
          )}

          {/* Beco sem saída se não oferecer a saída: quem já tem conta veio
              cadastrar por engano e o que ele precisa é entrar. */}
          {alreadyRegistered && (
            <div role="alert" className="flex items-start gap-2 text-primary" style={captionStyle}>
              <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />
              <span className="flex-1">
                Esse CNPJ já tem conta na PCYES.
                <button type="button" onClick={onGoToLogin} className="ml-1.5 underline hover:no-underline cursor-pointer">
                  Faça login
                </button>
              </span>
            </div>
          )}

          {company && (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3.5 bg-foreground/[0.03] border border-foreground/8"
              style={{ borderRadius: "var(--radius-button)" }}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <Check size={12} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}>
                  {toTitleCase(company.razaoSocial)}
                </p>
                <p className="text-foreground/40" style={captionStyle}>
                  {company.situacao} · {company.endereco.municipio}/{company.endereco.uf}
                </p>
              </div>
              <button type="button" onClick={() => { setCompany(null); setCnpj(""); }}
                className="shrink-0 text-foreground/30 hover:text-primary transition-colors cursor-pointer"
                style={captionStyle}
              >trocar</button>
            </motion.div>
          )}
        </>
      )}

      {step === 2 && company && (
        <>
          {/* Sem caixa cinza: o modal já tem três retângulos arredondados de
              campo, e mais um faria isto parecer formulário. Régua vermelha à
              esquerda + hierarquia tipográfica lê como identidade confirmada.
              Razão social é o único dado que a pessoa realmente confere — o
              resto é prova, e vai no rodapé em corpo menor. */}
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="border-l-2 border-primary/40 pl-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 flex-1 text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "15px", fontWeight: "var(--font-weight-medium)", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
                {toTitleCase(company.razaoSocial)}
              </p>
              <span className="mt-1 flex shrink-0 items-center gap-1.5 text-emerald-500" style={captionStyle}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {company.situacao}
              </span>
            </div>

            {/* Tabular-nums alinha os dígitos: CNPJ é conferido número a número,
                não lido como palavra. */}
            <p className="pt-1 text-foreground/50" style={{ ...captionStyle, fontVariantNumeric: "tabular-nums", letterSpacing: "0.02em" }}>
              {formatCnpj(company.cnpj)}
              {company.inscricoesEstaduais[0] && <> · IE {company.inscricoesEstaduais[0]}</>}
            </p>

            <div className="mt-3 border-t border-foreground/8 pt-2.5 text-foreground/40" style={{ ...captionStyle, lineHeight: 1.65 }}>
              {/* Endereço corre como uma frase só. O travessão separa o local
                  (rua, bairro) da localização (CEP, cidade) — hierarquia maior
                  que a do ponto médio, sem precisar quebrar linha. */}
              <p style={{ fontVariantNumeric: "tabular-nums" }}>
                {toTitleCase(company.endereco.logradouro)}
                {company.endereco.complemento ? `, ${toTitleCase(company.endereco.complemento)}` : ""} · {toTitleCase(company.endereco.bairro)} — {company.endereco.cep} · {company.endereco.municipio}/{company.endereco.uf}
              </p>

            </div>
          </motion.div>

          <div>
            <FieldLabel>Atividade principal</FieldLabel>
            <SearchableSelect
              ariaLabel="Atividade principal"
              value={atividade}
              onChange={setAtividade}
              placeholder="Selecione"
              searchPlaceholder="Pesquisar CNAE…"
              options={atividades.map((a) => ({ value: a.codigo, label: a.descricao, hint: a.codigo }))}
            />
          </div>

          <div>
            <FieldLabel>Ramo de atividade</FieldLabel>
            <SearchableSelect
              ariaLabel="Ramo de atividade"
              value={ramo}
              onChange={(v) => { setRamo(v); setError(null); }}
              placeholder="O que sua empresa faz com o produto?"
              options={RAMOS.map((r) => ({ value: r, label: r }))}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative">
              <User size={15} className={iconClass} aria-hidden="true" />
              <input type="text" placeholder="Nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoFocus
                className={inputClass} style={inputStyle} />
            </div>
            <input type="text" placeholder="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} required
              className={`${inputClass} pl-4`} style={inputStyle} />
          </div>
          {/* Telefone é contato da pessoa, não da empresa — fica junto do nome
              dela, não no bloco de dados do CNPJ. */}
          <div className="relative">
            <Phone size={15} className={iconClass} aria-hidden="true" />
            <input type="tel" inputMode="numeric" placeholder="Celular" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} required
              className={inputClass} style={inputStyle} />
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="relative">
            <Mail size={15} className={iconClass} aria-hidden="true" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus
              className={inputClass} style={inputStyle} />
          </div>
          <div className="relative">
            <Lock size={15} className={iconClass} aria-hidden="true" />
            <input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} required minLength={8}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              className={`${inputClass} pr-10`} style={inputStyle} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-foreground/20 hover:text-foreground/50 transition-colors cursor-pointer"
            >{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button>
          </div>
          <div className="relative">
            <Lock size={15} className={iconClass} aria-hidden="true" />
            <input type={showPassword ? "text" : "password"} placeholder="Confirmar senha" value={confirmation} required
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

      <div className="flex items-center gap-2.5 pt-1">
        {step > 1 && (
          <button type="button" onClick={() => { setStep(step - 1); setError(null); }}
            aria-label="Voltar"
            className="flex items-center justify-center px-4 py-3.5 bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground transition-all cursor-pointer"
            style={{ borderRadius: "var(--radius-button)" }}
          ><ArrowLeft size={15} aria-hidden="true" /></button>
        )}
        <button type="submit" disabled={submitting || (step === 1 && !company)}
          className="flex-1 py-3.5 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          style={{ borderRadius: "var(--radius-button)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : (
            <>{step === 4 ? "Criar conta" : "Continuar"}<ArrowRight size={15} aria-hidden="true" /></>
          )}
        </button>
      </div>

      {step === 4 && (
        <p className="pt-1 text-center text-foreground/25" style={captionStyle}>
          Ao criar a conta você aceita os{" "}
          <a href="/termos-de-uso" target="_blank" className="underline hover:text-foreground/50 transition-colors">Termos de Uso</a>{" "}
          e a{" "}
          <a href="/politica-de-privacidade" target="_blank" className="underline hover:text-foreground/50 transition-colors">Política de Privacidade</a>.
        </p>
      )}
    </form>
  );
}
