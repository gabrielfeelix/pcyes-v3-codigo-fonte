"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Truck,
  CreditCard,
  Loader2,
  Lock,
  ArrowRight,
  Zap,
  Wallet,
  Barcode,
  Apple,
  Fingerprint,
  X,
  Copy,
  Clock,
  RefreshCw,
  Ticket,
  ChevronUp,
  FileText,
  UserRound,
  AlertCircle,
} from "lucide-react";
import { artFitClass } from "../lib/setupImages";
import { formatCpf, isValidCpf } from "../lib/cpf";
import { isValidPhone } from "../lib/phone";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useCart } from "./CartContext";
import { useCheckoutPrefs } from "./CheckoutPrefsContext";
import { useAuth } from "./AuthContext";
import { tierFor } from "../lib/pcyesPoints";
import { AddressFormModal } from "./AddressFormModal";
import { CardFormModal } from "./CardFormModal";
import { Footer } from "./Footer";
import { CheckoutHeader } from "./CheckoutHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { formatBRL, formatBRLSpoken, parseBRL, formatCep } from "../../utils/format";
import { installmentCountFor, PIX_DISCOUNT, PIX_PERCENT } from "./section/PriceBlock";
import { LineItemPrice } from "./section/LineItemPrice";
import { setChatHidden } from "../lib/chatWidget";
import visaLogo from "./icons/visa-logo.svg";
import mastercardLogo from "./icons/mastercard-logo.svg";
import amexLogo from "./icons/amex-logo.svg";
import { trackBeginCheckout, trackPurchase } from "../../utils/analytics";
import { maxRedeemablePoints, pointsToBRL } from "../../utils/commerce";
import { couponPct, validateCoupon } from "../../utils/coupons";
import { EarnPreview } from "./points/EarnPreview";
import { OrderTotal, SkeletonBar } from "./OrderTotal";
import { toast } from "sonner";
import { PcyesCoin } from "./PcyesCoin";

type Step = 0 | 1 | 2 | 3;

/** Quanto a loja leva para devolver o total ao trocar a forma de pagamento. */
const PAYMENT_QUOTE_MS = 1000;
/** Quanto a loja leva para montar cada etapa (frete, formas de pagamento...). */
const STEP_LOAD_MS = 1200;

/* Título e texto de cada etapa: aparecem já no esqueleto, porque não dependem
   do que está carregando. */
const STEP_HEADINGS: Record<Step, { title: string; subtitle: string }> = {
  0: { title: "Endereço de entrega", subtitle: "Pra onde mandamos sua build?" },
  1: { title: "Como entregar?", subtitle: "" },
  2: { title: "Como vai pagar?", subtitle: `Escolha um método. À vista no PIX com ${PIX_PERCENT}% de desconto.` },
  3: { title: "Revisão final", subtitle: "Confirme se tá tudo certo antes de fechar." },
};

const STEPS = [
  { key: 0, label: "Endereço", icon: MapPin },
  { key: 1, label: "Entrega", icon: Truck },
  { key: 2, label: "Pagamento", icon: CreditCard },
  { key: 3, label: "Revisão", icon: ShieldCheck },
] as const;

const cardBg = "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.06) 0%, rgba(var(--foreground-rgb), 0.02) 100%)";
const cardBorder = "1px solid rgba(var(--foreground-rgb), 0.08)";
const inputBg = "rgba(var(--foreground-rgb), 0.03)";
const inputBorder = "1px solid rgba(var(--foreground-rgb), 0.1)";

interface Address {
  zip: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  recipient: string;
  phone: string;
}

interface ShippingOption {
  id: string;
  label: string;
  eta: string;
  /** Prazo em dias úteis (0 = hoje): desempata a escolha automática. */
  days: number;
  price: number;
  badge?: string;
}

type PaymentMethod = "pix" | "credit" | "apple" | "google" | "boleto" | "mercadopago";
type WalletSheet = "apple" | "google" | "mercadopago" | null;

const inputClass =
  "w-full text-ink-strong placeholder:text-ink-subtle focus:outline-none transition-all";
const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: "var(--radius-card-sm)",
  border: inputBorder,
  background: inputBg,
  fontFamily: "var(--font-family-inter)",
  fontWeight: 600,
  letterSpacing: "0.01em",
};

function Field({ label, children, required, className, error }: { label: string; children: React.ReactNode; required?: boolean; className?: string; error?: string }) {
  return (
    <div className={className}>
      <label
        className={`mb-1.5 block ${error ? "text-primary" : "text-ink-muted"}`}
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", letterSpacing: 0, textTransform: "none", fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function PixLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path
        d="M22.96 22.97a4.42 4.42 0 0 1-3.14-1.3l-4.54-4.54a.86.86 0 0 0-1.19 0l-4.55 4.55a4.42 4.42 0 0 1-3.14 1.3H5.5l5.74 5.73a4.74 4.74 0 0 0 6.71 0l5.75-5.74h-.74Zm-16.56-13.94a4.42 4.42 0 0 1 3.14 1.3l4.55 4.55a.84.84 0 0 0 1.19 0l4.54-4.53a4.42 4.42 0 0 1 3.14-1.3h.45l-5.75-5.75a4.74 4.74 0 0 0-6.71 0L5.21 9.03h1.19Zm21.27 4.62-3.48-3.48a.67.67 0 0 1-.24.05h-1.27c-.86 0-1.7.35-2.3.96l-4.54 4.54a2.17 2.17 0 0 1-3.07 0L8.22 11.18a3.26 3.26 0 0 0-2.3-.96H4.36a.66.66 0 0 1-.23-.04L.65 13.65a4.74 4.74 0 0 0 0 6.71l3.48 3.48a.66.66 0 0 1 .23-.04h1.56c.86 0 1.7-.35 2.3-.96l4.54-4.55a2.23 2.23 0 0 1 3.08 0l4.54 4.54c.6.61 1.44.96 2.3.96h1.27a.67.67 0 0 1 .24.04l3.48-3.47a4.74 4.74 0 0 0 0-6.71"
        fill="currentColor"
      />
    </svg>
  );
}

function PaymentOption({
  icon,
  label,
  description,
  badge,
  active,
  onClick,
  color,
  accentBg,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  badge?: string;
  active: boolean;
  onClick: () => void;
  color?: string;
  accentBg?: string;
}) {
  /* Selecionado é verde em todas as formas, não só no Pix: borda vermelha
     em volta de cartão ou boleto lia como erro de preenchimento. */
  const accent = color ?? "#22c55e";
  const activeBadgeBg = accentBg ?? "rgba(34,197,94,0.14)";
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-start gap-2 px-4 py-4 transition-all cursor-pointer text-left"
      style={{
        borderRadius: "var(--radius-card-sm)",
        background: active ? "rgba(var(--foreground-rgb), 0.06)" : "rgba(var(--foreground-rgb), 0.02)",
        border: active ? `1.5px solid ${accent}` : "1px solid rgba(var(--foreground-rgb), 0.08)",
        boxShadow: active ? `0 18px 40px -20px ${color ?? "rgba(34,197,94,0.5)"}, inset 0 1px 0 rgba(var(--foreground-rgb), 0.04)` : "none",
        color: active ? "#fff" : "rgba(var(--foreground-rgb), 0.65)",
        minHeight: 84,
      }}
    >
      <div className="flex w-full items-center gap-2.5">
        <span className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 9, background: active ? activeBadgeBg : "rgba(var(--foreground-rgb), 0.05)", color: active ? accent : "rgba(var(--foreground-rgb), 0.6)" }}>
          {icon}
        </span>
        <span className="flex-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700, letterSpacing: "0.01em", color: active ? "#fff" : "rgba(var(--foreground-rgb), 0.85)" }}>{label}</span>
        {badge && (
          <span
            className="inline-flex items-center"
            style={{
              padding: "3px 7px",
              borderRadius: "var(--radius-card)",
              background: "rgba(34,197,94,0.18)",
              color: "#22c55e",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 800,
              letterSpacing: "0.04em",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {description && (
        <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 500, color: active ? "rgba(var(--foreground-rgb), 0.7)" : "rgba(var(--foreground-rgb), 0.45)", lineHeight: 1.4 }}>
          {description}
        </p>
      )}
    </button>
  );
}

function ReviewCard({ icon, label, onEdit, children }: { icon: React.ReactNode; label: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div
      className="rounded-[var(--radius-card-sm)] p-4"
      style={{
        background: "rgba(var(--foreground-rgb), 0.02)",
        border: "1px solid rgba(var(--foreground-rgb), 0.06)",
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {icon}
          {label}
        </span>
        <button
          onClick={onEdit}
          className="text-primary transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          Alterar
        </button>
      </div>
      {children}
    </div>
  );
}

function FakeQrCode() {
  const N = 25;
  const cell = 100 / N;
  const grid: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

  const isFinder = (r: number, c: number, top: number, left: number) =>
    r >= top && r < top + 7 && c >= left && c < left + 7;

  const isFinderRing = (r: number, c: number, top: number, left: number) => {
    const dr = r - top, dc = c - left;
    if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
    if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
    return false;
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const corners = [[0, 0], [0, N - 7], [N - 7, 0]] as const;
      let inFinder = false;
      let fill = false;
      for (const [tr, tc] of corners) {
        if (isFinder(r, c, tr, tc)) {
          inFinder = true;
          if (isFinderRing(r, c, tr, tc)) fill = true;
          break;
        }
      }
      if (!inFinder) {
        const inFinderSep =
          (r < 8 && c < 8) ||
          (r < 8 && c >= N - 8) ||
          (r >= N - 8 && c < 8);
        if (inFinderSep) {
          grid[r][c] = 0;
          continue;
        }
        if (r === 6) {
          grid[r][c] = c % 2 === 0 ? 1 : 0;
          continue;
        }
        if (c === 6) {
          grid[r][c] = r % 2 === 0 ? 1 : 0;
          continue;
        }
        const ar = N - 5;
        const ac = N - 5;
        if (r >= ar && r < ar + 5 && c >= ac && c < ac + 5) {
          const dr = r - ar, dc = c - ac;
          const ring =
            dr === 0 || dr === 4 || dc === 0 || dc === 4 || (dr === 2 && dc === 2);
          grid[r][c] = ring ? 1 : 0;
          continue;
        }
        const h = (r * 928371 + c * 1234567 + 9176) ^ ((r << 5) + c);
        fill = ((h * 2654435761) >>> 0) % 100 < 48;
      }
      grid[r][c] = fill ? 1 : 0;
    }
  }

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-label="QR Code PIX" shapeRendering="crispEdges">
      <rect x="0" y="0" width="100" height="100" fill="#fff" />
      {grid.map((row, r) =>
        row.map((v, c) =>
          v === 1 ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell + 0.05}
              height={cell + 0.05}
              fill="#000"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

/* Esqueleto de cada etapa. Na loja, Continuar segurava a tela parada com o
   botão girando e, do nada, trocava de página: parecia travado. Agora o clique
   já abre a próxima etapa com título e texto (que não dependem de nada) e a
   forma do conteúdo em cinza, enquanto ele chega. Cada formato copia o da
   etapa real, para nada pular quando o conteúdo entra. */
const skeletonBox = {
  borderRadius: "var(--radius-card-sm)",
  background: "rgba(var(--foreground-rgb), 0.02)",
  border: "1px solid rgba(var(--foreground-rgb), 0.08)",
} as const;

function StepSkeleton({ step, hasSavedAddresses }: { step: Step; hasSavedAddresses: boolean }) {
  return (
    <div aria-hidden="true">
      {step === 0 && !hasSavedAddresses && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i}>
              <SkeletonBar width={90} height={12} className="mb-2 block" />
              <SkeletonBar width={400} height={44} className="block !rounded-[var(--radius-card-sm)]" />
            </div>
          ))}
        </div>
      )}
      {step === 0 && hasSavedAddresses && (
        <>
          <SkeletonBar width={130} height={12} className="mb-3 block" />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-start gap-3 p-4" style={skeletonBox}>
                <SkeletonBar width={16} height={16} className="mt-0.5 shrink-0 !rounded-full" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <SkeletonBar width={120} height={14} />
                  <SkeletonBar width={200} height={12} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-center p-4" style={{ ...skeletonBox, borderStyle: "dashed", minHeight: 52 }}>
            <SkeletonBar width={150} height={12} />
          </div>
        </>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2.5 p-4 md:gap-4" style={skeletonBox}>
              <SkeletonBar width={20} height={20} className="shrink-0 !rounded-full" />
              <SkeletonBar width={18} height={18} className="shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <SkeletonBar width={140} height={14} />
                <SkeletonBar width={90} height={12} />
              </div>
              <SkeletonBar width={64} height={18} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
      {step === 2 && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="p-4" style={{ ...skeletonBox, minHeight: 88 }}>
                <div className="flex items-center gap-3">
                  <SkeletonBar width={32} height={32} className="shrink-0 !rounded-lg" />
                  <SkeletonBar width={110} height={14} />
                </div>
                <SkeletonBar width={160} height={12} className="mt-3" />
              </div>
            ))}
          </div>
          <SkeletonBar width={170} height={12} className="mb-2.5 block" />
          <SkeletonBar width={352} height={44} className="block !rounded-[var(--radius-card-sm)]" />
        </>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="p-4" style={skeletonBox}>
              <div className="mb-3 flex items-center justify-between">
                <SkeletonBar width={90} height={12} />
                <SkeletonBar width={44} height={12} />
              </div>
              <SkeletonBar width={220} height={14} className="block" />
              <SkeletonBar width={160} height={12} className="mt-2 block" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Linha do resumo com o valor ainda chegando (troca de forma de pagamento). */
function SkeletonLine({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
        {label}
      </span>
      <SkeletonBar width={84} height={14} />
    </div>
  );
}

/* `amount` opcional: quando informado, o valor é lido por extenso ("mil e
   duzentos reais"). O texto visual traz "R$", que o NVDA não fala na
   configuração padrão — sem isso a linha sai sem moeda alguma. */
function Line({ label, value, positive, amount }: { label: string; value: string; positive?: boolean; amount?: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-family-inter)",
          fontSize: "var(--text-sm)",
          fontWeight: 700,
          color: positive ? "#22c55e" : "rgba(var(--foreground-rgb), 0.85)",
        }}
      >
        {amount === undefined ? value : (
          <>
            <span aria-hidden="true">{value}</span>
            <span className="sr-only">{formatBRLSpoken(amount)}</span>
          </>
        )}
      </span>
    </div>
  );
}

export function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const { user, isLoggedIn, addAddress, addCard, promptLogin, updateUser, findCpfOwner, logout } = useAuth();
  /* Guard: checkout exige login. Deslogado (URL/refresh) → carrinho + abre login.
     Após logar, authRedirect("/checkout") traz o usuário de volta. */
  useEffect(() => {
    if (!isLoggedIn) {
      promptLogin("/checkout");
      navigate("/carrinho", { replace: true });
    }
  }, [isLoggedIn, promptLogin, navigate]);

  const [step, setStep] = useState<Step>(0);
  // A etapa nova abre na hora em esqueleto e o conteúdo entra quando chega.
  // Começa carregando: vindo do carrinho, a primeira etapa também monta.
  // "Seus dados" é exceção: não busca nada, só mostra o que a conta já tem.
  const [stepLoading, setStepLoading] = useState(() => !!(user?.cpf && user?.phone));
  useEffect(() => {
    if (!stepLoading) return;
    const t = setTimeout(() => setStepLoading(false), STEP_LOAD_MS);
    return () => clearTimeout(t);
  }, [stepLoading, step]);
  /* Picker state — quando logged in c/ endereços/cartões salvos, preenche o form
     da etapa correspondente automaticamente quando o usuário seleciona um. */
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const savedCards = user?.cards ?? [];
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [address, setAddress] = useState<Address>({
    zip: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    recipient: "",
    phone: "",
  });
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");
  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [payerDoc, setPayerDoc] = useState("");
  /* Login social (Google, Facebook) cria a conta só com nome e e-mail: sem CPF
     não sai nota fiscal, sem celular a transportadora não tem com quem falar.
     Quem tem dado faltando ganha a etapa "Seus dados" antes do endereço; quem
     tem tudo nem vê. A decisão congela ao abrir o checkout, senão a etapa
     sumiria da barra assim que os dados fossem salvos. */
  const [needsData] = useState(() => !user?.cpf || !user?.phone);
  const [identityOpen, setIdentityOpen] = useState(needsData);
  const [identitySaved, setIdentitySaved] = useState(!needsData);
  const [identity, setIdentity] = useState(() => ({ name: user?.name ?? "", cpf: user?.cpf ?? "", phone: user?.phone ?? "" }));
  /* CPF é um por conta: se já está em outra, a nota e o histórico ficariam
     divididos. Confere assim que o número fecha válido. Celular não entra na
     regra: família divide número e linha troca de dono. */
  const [cpfOwner, setCpfOwner] = useState<string | null>(null);
  const [cpfChecking, setCpfChecking] = useState(false);
  useEffect(() => {
    setCpfOwner(null);
    if (!isValidCpf(identity.cpf) || identity.cpf === user?.cpf) return;
    let alive = true;
    setCpfChecking(true);
    findCpfOwner(identity.cpf).then((owner) => { if (alive) { setCpfOwner(owner); setCpfChecking(false); } });
    return () => { alive = false; };
  }, [identity.cpf, user?.cpf, findCpfOwner]);
  const [installments, setInstallments] = useState(1);
  const { appliedCoupon, setAppliedCoupon, pointsApplied, setPointsApplied, pointsToUse, setPointsToUse } = useCheckoutPrefs();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [pointsOpen, setPointsOpen] = useState(false);
  // Resumo do pedido no mobile: fica escondido atrás de "Ver detalhes" na barra
  // fixa, para a pessoa focar só na etapa atual. No desktop segue na coluna.
  const [detailsOpen, setDetailsOpen] = useState(false);
  /* O balão do chat ficava em cima do total do resumo aberto. */
  useEffect(() => {
    setChatHidden(detailsOpen);
    return () => setChatHidden(false);
  }, [detailsOpen]);
  const detailsSheetRef = useRef<HTMLDivElement>(null);

  // Abre o resumo e, quando vem de um atalho da barra, rola até a seção pedida.
  // A busca é feita dentro do sheet porque a coluna do desktop segue no DOM.
  const openDetails = (section?: "coupon" | "points") => {
    setDetailsOpen(true);
    if (section === "coupon") setCouponOpen(true);
    if (!section) return;
    window.setTimeout(() => {
      detailsSheetRef.current
        ?.querySelector(`[data-section="${section}"]`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 260);
  };
  const userPoints = 1479;
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedSnapshot, setConfirmedSnapshot] = useState<{
    items: typeof items;
    total: number;
    paymentLabel: string;
  } | null>(null);
  const [walletSheet, setWalletSheet] = useState<WalletSheet>(null);
  const [walletConfirming, setWalletConfirming] = useState(false);
  const [pixWaiting, setPixWaiting] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [pixTimer, setPixTimer] = useState(600);
  const [pixExpired, setPixExpired] = useState(false);
  const [pixNonce, setPixNonce] = useState(0); // regenera o QR/timer

  const subtotal = useMemo(
    () => items.reduce((sum, item) => (item.isGift ? sum : sum + parseBRL(item.price) * item.quantity), 0),
    [items],
  );

  const shippingOptions: ShippingOption[] = useMemo(() => {
    if (subtotal === 0) return [];
    const free = subtotal >= 299;
    return [
      {
        id: "sedex",
        label: "Sedex Expresso",
        eta: "2 dias úteis",
        days: 2,
        price: free ? 0 : 35.9,
      },
      {
        id: "pac",
        label: "PAC Econômico",
        eta: "7 dias úteis",
        days: 7,
        price: free ? 0 : 14.9,
      },
      {
        id: "today",
        label: "Entrega no mesmo dia",
        eta: "Hoje · só capitais",
        days: 0,
        price: 59.9,
        badge: "EXPRESS",
      },
    ];
  }, [subtotal]);

  // A entrega mais barata já vem marcada (empate: a mais rápida). Quem chega
  // na etapa só confirma; trocar continua a um clique.
  useEffect(() => {
    if (shippingOptions.some((o) => o.id === selectedShipping)) return;
    const cheapest = [...shippingOptions].sort((a, b) => a.price - b.price || a.days - b.days)[0];
    if (cheapest) setSelectedShipping(cheapest.id);
  }, [shippingOptions, selectedShipping]);

  const shippingPrice = shippingOptions.find((o) => o.id === selectedShipping)?.price ?? 0;
  const discountPct = couponPct(appliedCoupon);
  const discountValue = (subtotal * discountPct) / 100;
  const maxPointsRedeem = maxRedeemablePoints(userPoints, subtotal - discountValue, tierFor(user?.pcyesPointsHistory).cap);
  const pointsUsed = pointsApplied ? Math.min(pointsToUse, maxPointsRedeem) : 0;
  const pointsValue = pointsToBRL(pointsUsed);
  const baseTotal = subtotal - discountValue + shippingPrice - pointsValue;
  // Na loja, trocar a forma de pagamento recalcula o carrinho no Magento e leva
  // ~1 s. Três cliques seguidos enfileiravam três respostas e o total passava
  // por cada uma devagar, parecendo já ser o do último card. Aqui o card
  // escolhido acende na hora, o total vira skeleton e só a última escolha vale:
  // o cleanup do efeito cancela a espera da anterior (na loja, abortar a
  // requisição antiga).
  const [quotedPayment, setQuotedPayment] = useState<PaymentMethod>(payment);
  const quoting = quotedPayment !== payment;
  // Frete só existe depois que a etapa de entrega carrega: até lá, frete e
  // total do resumo ficam em esqueleto em vez de mostrar um valor provisório.
  const shippingLoading = stepLoading && step === 1;
  const totalLoading = quoting || shippingLoading;
  useEffect(() => {
    if (payment === quotedPayment) return;
    const t = setTimeout(() => setQuotedPayment(payment), PAYMENT_QUOTE_MS);
    return () => clearTimeout(t);
  }, [payment, quotedPayment]);
  const pixDiscount = quotedPayment === "pix" ? Math.max(0, (subtotal - discountValue - pointsValue)) * PIX_DISCOUNT : 0;
  const total = baseTotal - pixDiscount;
  // Parcela mínima de R$ 50: o select só oferece o que o total comporta, e se o
  // total cair (cupom, pontos) a escolha anterior desce junto.
  const maxInstallments = installmentCountFor(baseTotal);
  useEffect(() => {
    if (installments > maxInstallments) setInstallments(maxInstallments);
  }, [installments, maxInstallments]);
  // Mesmo total com o desconto do Pix, calculado à parte: é o preço que a
  // vitrine mostra, e aparece como alternativa quando outra forma está escolhida.
  const pixTotal = baseTotal - Math.max(0, subtotal - discountValue - pointsValue) * PIX_DISCOUNT;

  const handleApplyCoupon = () => {
    // Recusa com o motivo (expirado, mínimo, 1ª compra...): ver utils/coupons.
    const result = validateCoupon(coupon, {
      subtotal,
      isLoggedIn,
      hasOrders: !!user && user.orders.length > 0,
      itemNames: items.map((i) => i.name),
    });
    if (result.ok) {
      setAppliedCoupon(result.code);
      setCouponError("");
      setCouponOpen(false);
    } else {
      setCouponError(result.message);
      setAppliedCoupon(null);
    }
  };

  const identityValid = identity.name.trim().split(/\s+/).length >= 2 && isValidCpf(identity.cpf) && !cpfOwner && !cpfChecking && isValidPhone(identity.phone);
  const step0Valid = address.zip.length >= 9 && !!address.street && !!address.number && !!address.city && !!address.recipient;
  const step1Valid = !!selectedShipping;
  const step2Valid =
    isValidDoc(payerDoc) && (
    payment === "pix" ||
    payment === "boleto" ||
    // Cartão salvo selecionado já é válido (CVV é mock, sem campo). Cartão NOVO
    // exige o formulário completo. Antes o cartão salvo travava o "Continuar".
    (payment === "credit" && selectedCardId !== null) ||
    (payment === "mercadopago" && !!cardName && cardNumber.length >= 15 && cardExp.length === 5 && cardCvc.length >= 3));

  const canAdvance = (identityOpen ? identityValid : step === 0 ? step0Valid : step === 1 ? step1Valid : step === 2 ? step2Valid && !quoting : true) && !stepLoading;

  // Botão "Continuar" clicável sempre (em vez de disabled mudo): se o passo está
  // incompleto, marca os campos vazios (erro por campo + role=alert) em vez de
  // só travar. Melhor p/ Nielsen (prevenção de erro) e p/ leitor de tela.
  const [attempted, setAttempted] = useState(false);
  const err = (cond: boolean, msg: string) => (attempted && cond ? msg : undefined);
  // Voltar não carrega: a etapa anterior já estava pronta.
  const goBack = () => {
    // Editando os dados a partir de outra etapa: Voltar devolve pra ela.
    if (identityOpen) return identitySaved ? setIdentityOpen(false) : navigate("/carrinho");
    if (step === 0 && needsData) return setIdentityOpen(true);
    if (step === 0) return navigate("/carrinho");
    setStepLoading(false);
    setStep((s) => (s - 1) as Step);
  };

  const atStart = identityOpen ? !identitySaved : step === 0 && !needsData;

  const tryAdvance = () => {
    // Total ou etapa ainda chegando: não avança nem acusa erro, só espera.
    if (quoting || stepLoading) return;
    if (canAdvance && identityOpen) {
      setAttempted(false);
      updateUser({ name: identity.name.trim(), cpf: identity.cpf, phone: identity.phone });
      // Quase sempre quem paga é quem compra, e quem recebe também: já deixa
      // o CPF do pagador e o contato da entrega prontos.
      if (!payerDoc) setPayerDoc(identity.cpf);
      setAddress((a) => ({ ...a, recipient: a.recipient || identity.name.trim(), phone: a.phone || identity.phone }));
      setIdentitySaved(true);
      setIdentityOpen(false);
      setStepLoading(true);
      return;
    }
    if (canAdvance) {
      setAttempted(false);
      setStepLoading(true);
      setStep((s) => (s + 1) as Step);
    } else {
      setAttempted(true);
      toast.error(identityOpen ? (cpfOwner ? "Esse CPF já tem conta na PCYES." : "Confira seus dados destacados.") : step === 0 ? "Preencha os campos de endereço destacados." : step === 2 ? "Confira os dados do cartão." : "Complete este passo para continuar.");
      // Foca o 1º campo inválido (a11y 3.3.1/2.4.3) após o re-render marcar aria-invalid.
      setTimeout(() => {
        document.querySelector<HTMLElement>('.checkout-field[aria-invalid="true"]')?.focus();
      }, 0);
    }
  };

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };
  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return d;
  };

  const handleCepLookup = async (zip: string) => {
    const digits = zip.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setLoadingCep(true);
    setCepError("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data && !data.erro) {
        setAddress((a) => ({
          ...a,
          street: data.logradouro || a.street,
          district: data.bairro || a.district,
          city: data.localidade || a.city,
          state: data.uf || a.state,
        }));
      } else {
        // CEP não existe na base dos Correios — avisar em vez de falhar em silêncio.
        setCepError("CEP não encontrado. Confira o número.");
        toast.error("CEP não encontrado. Confira o número digitado.");
      }
    } catch {
      // Erro de rede — não trava o checkout, mas avisa e deixa preencher à mão.
      setCepError("Não foi possível buscar o CEP. Preencha o endereço manualmente.");
      toast.error("Não foi possível buscar o CEP agora. Preencha manualmente.");
    } finally {
      setLoadingCep(false);
    }
  };

  const paymentLabel = (() => {
    switch (payment) {
      case "pix": return `PIX · ${PIX_PERCENT}% OFF`;
      case "credit": return `Cartão · ${installments}× sem juros`;
      case "apple": return "Apple Pay";
      case "google": return "Google Pay";
      case "mercadopago": return "Mercado Pago";
      case "boleto": return "Boleto";
    }
  })();

  const snapshot = () => ({ items: [...items], total, paymentLabel });

  // GA4 begin_checkout (1x ao entrar com itens) e purchase (1x ao confirmar).
  const beginFired = useRef(false);
  useEffect(() => {
    if (beginFired.current || items.length === 0) return;
    beginFired.current = true;
    trackBeginCheckout(items, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const purchaseFired = useRef(false);
  useEffect(() => {
    if (!orderConfirmed || purchaseFired.current || !confirmedSnapshot) return;
    purchaseFired.current = true;
    trackPurchase({
      id: `PCYES-${Date.now()}`,
      value: confirmedSnapshot.total,
      items: confirmedSnapshot.items,
    });
  }, [orderConfirmed, confirmedSnapshot]);

  const handleFinish = () => {
    if (payment === "pix") {
      setPixWaiting(true);
      return;
    }
    setConfirmedSnapshot(snapshot());
    setOrderConfirmed(true);
    clearCart();
  };

  const handleWalletConfirm = () => {
    setWalletConfirming(true);
    setTimeout(() => {
      setWalletConfirming(false);
      setWalletSheet(null);
      setConfirmedSnapshot(snapshot());
      setOrderConfirmed(true);
      clearCart();
    }, 1600);
  };

  // PIX waiting countdown + auto-confirm after ~8s
  useEffect(() => {
    if (!pixWaiting || pixExpired) return;
    // Auto-confirma (simula "pagamento detectado") a menos que o código expire antes.
    const confirmTimer = setTimeout(() => {
      setConfirmedSnapshot(snapshot());
      setOrderConfirmed(true);
      clearCart();
    }, 8000);
    const tick = setInterval(() => setPixTimer((t) => {
      if (t <= 1) {
        clearInterval(tick);
        clearTimeout(confirmTimer);
        setPixExpired(true); // código expirou → oferece gerar um novo
        return 0;
      }
      return t - 1;
    }), 1000);
    return () => {
      clearTimeout(confirmTimer);
      clearInterval(tick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixWaiting, pixNonce]);

  const regeneratePix = () => {
    setPixExpired(false);
    setPixTimer(600);
    setPixNonce((n) => n + 1);
  };

  useEffect(() => {
    if (pointsToUse > maxPointsRedeem) setPointsToUse(maxPointsRedeem);
  }, [maxPointsRedeem, pointsToUse]);

  /* Auto-seleciona endereço default na primeira renderização quando logado. */
  useEffect(() => {
    if (!isLoggedIn || !user || selectedAddressId !== null) return;
    const def = user.addresses.find((a) => a.isDefault) || user.addresses[0];
    if (def) setSelectedAddressId(def.id);
  }, [isLoggedIn, user, selectedAddressId]);

  /* Sincroniza form de endereço com o saved selecionado. */
  useEffect(() => {
    if (!user || !selectedAddressId) return;
    const a = user.addresses.find((x) => x.id === selectedAddressId);
    if (!a) return;
    setAddress({
      zip: a.cep,
      street: a.street,
      number: a.number,
      complement: a.complement || "",
      district: a.neighborhood,
      city: a.city,
      state: a.state,
      recipient: user.name,
      phone: user.phone,
    });
  }, [selectedAddressId, user]);

  /* Auto-seleciona cartão default ao escolher pagamento crédito. */
  useEffect(() => {
    if (payment !== "credit" || !isLoggedIn || !user || selectedCardId !== null) return;
    const def = savedCards.find((c) => c.isDefault) || savedCards[0];
    if (def) setSelectedCardId(def.id);
  }, [payment, isLoggedIn, user, selectedCardId, savedCards]);

  /* Sincroniza form de cartão com o saved selecionado (CVV continua vazio — usuário digita toda vez). */
  useEffect(() => {
    if (!user || !selectedCardId) return;
    const c = user.cards.find((x) => x.id === selectedCardId);
    if (!c) return;
    setCardName(c.name);
    setCardNumber(`•••• •••• •••• ${c.last4}`);
    setCardExp(c.expiry);
  }, [selectedCardId, user]);

  const copyPix = () => {
    const code = "00020126360014BR.GOV.BCB.PIX0114pcyes@pcyes.com5204000053039865802BR5913PCYES Gamer6009Maringa62070503***6304ABCD";
    navigator.clipboard?.writeText(code);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  if (items.length === 0 && !orderConfirmed) {
    return (
      <>
        <CheckoutHeader onBack={() => navigate("/carrinho")} backLabel="Voltar ao carrinho" />
        <div className="pt-16 md:pt-[72px]" style={{ background: "var(--surface-0)", minHeight: "calc(100vh - 200px)" }}>
          <div className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-24 text-center">
            <p
              className="mb-3 text-primary"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
            >
              // CHECKOUT VAZIO
            </p>
            <h1
              className="mb-6 text-ink-strong"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              Adicione itens ao carrinho primeiro
            </h1>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-ink-strong transition-transform hover:scale-[1.03]"
              style={{
                background: "var(--gradient-brand)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "var(--shadow-brand-cta)",
              }}
            >
              Explorar produtos
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      <Footer />
      </>
    );
  }

  if (pixWaiting && !orderConfirmed) {
    const pixCode = "00020126360014BR.GOV.BCB.PIX0114pcyes@pcyes.com5204000053039865802BR5913PCYES Gamer6009Maringa62070503***6304ABCD";
    const m = Math.floor(pixTimer / 60).toString().padStart(2, "0");
    const s = (pixTimer % 60).toString().padStart(2, "0");
    return (
      <>
        <CheckoutHeader />
        <div className="pt-16 md:pt-[72px]" style={{ background: "var(--surface-0)", minHeight: "calc(100vh - 120px)" }}>
          <div className="mx-auto max-w-[720px] px-5 py-10 md:px-8">
            <p
              className="mb-3 text-primary"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
            >
              // PEDIDO #{Math.floor(Math.random() * 90000 + 10000)}
            </p>
            <h1
              className="mb-2 text-ink-strong"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
              }}
            >
              Pague com PIX
            </h1>
            <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.55 }}>
              Escaneie o QR Code ou copie o código. Liberação instantânea.
            </p>

            <div
              className="overflow-hidden p-6 md:p-8"
              style={{
                borderRadius: "var(--radius-card-lg)",
                background: cardBg,
                border: cardBorder,
                boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.05), 0 24px 60px -20px rgba(0,0,0,0.5)",
              }}
            >
              {/* Status pill */}
              <div
                aria-live="polite"
                role="status"
                className="mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                style={{
                  background: "rgba(255,193,7,0.1)",
                  border: "1px solid rgba(255,193,7,0.3)",
                  color: "#facc15",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-65 ${pixExpired ? "bg-primary" : "animate-ping bg-yellow-400"}`} />
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${pixExpired ? "bg-primary" : "bg-yellow-400"}`} />
                </span>
                {pixExpired ? "Código expirado" : "Aguardando pagamento"}
              </div>

              {/* Timer / expirado */}
              {pixExpired ? (
                <div className="mb-6 flex flex-col items-start gap-3">
                  <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.5 }}>
                    O código PIX expirou. Gere um novo para concluir o pagamento.
                  </p>
                  <button
                    onClick={regeneratePix}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
                  >
                    <RefreshCw size={15} strokeWidth={2.4} aria-hidden="true" /> Gerar novo código PIX
                  </button>
                </div>
              ) : (
                <div className="mb-6 flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 text-ink">
                    <Clock size={15} strokeWidth={2.2} />
                    <span
                      className="tabular-nums"
                      style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "0.04em" }}
                    >
                      {m}:{s}
                    </span>
                    <span className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                      pra expirar
                    </span>
                  </div>
                  <button
                    onClick={regeneratePix}
                    className="text-ink-subtle underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                  >
                    Gerar novo código
                  </button>
                </div>
              )}

              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                {/* QR Code */}
                <div
                  className="flex h-[220px] w-[220px] flex-shrink-0 items-center justify-center"
                  style={{
                    borderRadius: "var(--radius-card-md)",
                    background: "#fff",
                    border: "1px solid rgba(var(--foreground-rgb), 0.1)",
                    padding: "12px",
                  }}
                >
                  <FakeQrCode />
                </div>

                {/* Right side */}
                <div className="flex-1 min-w-0">
                  <p className="mb-2 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    Valor a pagar
                  </p>
                  <p className="mb-5" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "#22c55e", letterSpacing: "-0.025em", lineHeight: 1 }}>
                    <span aria-hidden="true">{formatBRL(total)}</span>
                    <span className="sr-only">Valor a pagar, {formatBRLSpoken(total)}</span>
                  </p>

                  <p className="mb-2 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    PIX copia e cola
                  </p>
                  <div
                    className="mb-3 break-all rounded-[var(--radius-card-sm)] p-3 text-ink-muted"
                    style={{
                      background: "rgba(var(--foreground-rgb), 0.03)",
                      border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: "var(--text-caption)",
                      lineHeight: 1.5,
                    }}
                  >
                    {pixCode.slice(0, 70)}…
                  </div>
                  <button
                    onClick={copyPix}
                    aria-label="Copiar código PIX"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-ink-strong transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60"
                    style={{
                      background: pixCopied
                        ? "var(--gradient-buy)"
                        : "var(--gradient-brand)",
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      boxShadow: pixCopied ? "var(--shadow-buy-cta)" : "var(--shadow-brand-cta)",
                    }}
                  >
                    {pixCopied ? <Check size={14} strokeWidth={2.6} /> : <Copy size={13} strokeWidth={2.4} />}
                    {pixCopied ? "Código copiado" : "Copiar código PIX"}
                  </button>
                </div>
              </div>

              <div
                className="mt-6 flex items-start gap-3 rounded-card-sm p-3.5"
                style={{ background: "rgba(var(--foreground-rgb), 0.02)", border: "1px solid rgba(var(--foreground-rgb), 0.06)" }}
              >
                <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-green-500" />
                <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.55 }}>
                  Abra o app do seu banco, escolha PIX, escaneie o QR ou cole o código. A confirmação chega em segundos e atualizamos sua tela.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orderConfirmed) {
    const snap = confirmedSnapshot;
    return (
      <>
        <CheckoutHeader />
        <div className="pt-16 md:pt-[72px]" style={{ background: "var(--surface-0)", minHeight: "calc(100vh - 200px)" }}>
          <div className="mx-auto max-w-[720px] px-5 py-12 md:px-8">
            <div className="mb-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7 flex h-24 w-24 items-center justify-center rounded-full text-ink-strong"
                style={{
                  background: "var(--gradient-buy)",
                  boxShadow: "0 30px 80px -16px rgba(34,197,94,0.55), 0 0 0 6px rgba(34,197,94,0.12)",
                }}
              >
                <Check size={42} strokeWidth={3} />
              </motion.div>
              <p
                className="mb-3 text-primary"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
              >
                // GG PURCHASE · PEDIDO #{Math.floor(Math.random() * 90000 + 10000)}
              </p>
              <h1
                className="mb-4 text-ink-strong"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                }}
              >
                Pedido confirmado!
              </h1>
              <p
                className="max-w-md text-ink-muted"
                style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", lineHeight: 1.55 }}
              >
                Sua build tá a caminho. Os detalhes foram pro seu email.
              </p>
            </div>

            {snap && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="overflow-hidden p-6 md:p-7"
                style={{
                  borderRadius: "var(--radius-card-lg)",
                  background: cardBg,
                  border: cardBorder,
                  boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.05), 0 24px 60px -20px rgba(0,0,0,0.5)",
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <p
                    className="text-primary"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
                  >
                    // SUA BUILD
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "#22c55e",
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-caption)",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Truck size={11} strokeWidth={2.4} />
                    Em separação
                  </span>
                </div>

                <div className="space-y-3">
                  {snap.items.map((item, i) => (
                    <motion.div
                      key={item.cartKey}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                      className="flex items-center gap-3 rounded-[var(--radius-card-sm)] p-3"
                      style={{
                        background: "rgba(var(--foreground-rgb), 0.02)",
                        border: "1px solid rgba(var(--foreground-rgb), 0.06)",
                      }}
                    >
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <div
                          className="h-full w-full overflow-hidden"
                          style={{
                            borderRadius: "var(--radius-card-sm)",
                            background: "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.08) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                            border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                          }}
                        >
                          <ImageWithFallback src={item.image} alt={item.name} className={`h-full w-full ${artFitClass(item.image, "p-1.5")}`} />
                        </div>
                        {item.quantity > 1 && (
                          <span
                            className="absolute -right-1.5 -top-1.5 z-10 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-ink-strong"
                            style={{
                              background: "var(--gradient-brand)",
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "var(--text-caption)",
                              fontWeight: 800,
                              boxShadow: "0 4px 12px -4px rgba(225,6,0,0.55)",
                            }}
                          >
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, lineHeight: 1.3 }}>
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-family-inter)",
                            fontSize: "var(--text-caption)",
                            fontWeight: 700,
                            color: item.isGift ? "#22c55e" : "rgba(var(--foreground-rgb), 0.55)",
                            marginTop: "3px",
                          }}
                        >
                          {item.isGift ? "Brinde · Cortesia PCYES" : <LineItemPrice unit={parseBRL(item.price)} quantity={item.quantity} variant="summary" method={payment === "pix" ? "pix" : "card"} />}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="my-5 h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                      {snap.paymentLabel}
                    </p>
                    <p className="mt-1" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 800, color: "#22c55e", letterSpacing: "-0.02em" }}>
                      {formatBRL(snap.total)}
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-ink-strong transition-transform hover:scale-[1.03]"
                    style={{
                      background: "var(--gradient-brand)",
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-caption)",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      boxShadow: "var(--shadow-brand-cta)",
                    }}
                  >
                    Voltar pra home
                    <ArrowRight size={13} strokeWidth={2.4} />
                  </Link>
                </div>

                {/* O ponto não cai junto com a compra: cai 24h depois da
                    entrega (`EARN_RULES` em lib/pcyesPoints). Sem essa linha,
                    quem compra abre o perfil no mesmo dia, não acha o saldo e
                    acha que o programa não pagou. O prazo é dito inteiro —
                    "na entrega" sozinho gera o mesmo suporte um dia depois.
                    Fica DEPOIS do total porque é consequência dele, e apagado
                    porque é recado, não conquista. */}
                <EarnPreview
                  amount={snap.total}
                  note="creditados 24h após a entrega"
                  className="mt-5 border-t border-white/5 pt-5"
                />
              </motion.div>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const orderSummary = (
    <>
                {/* pt/pr dão respiro para o badge de qtd (-top/-right) não ser
                    cortado pelo overflow do scroll (overflow-y-auto clipa X também). */}
                <div className="mb-4 max-h-[280px] space-y-3 overflow-y-auto pl-0.5 pr-2 pt-2">
                  {items.map((item) => (
                    <div key={item.cartKey} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 flex-shrink-0">
                        <div
                          className="h-full w-full overflow-hidden"
                          style={{
                            borderRadius: "var(--radius-card-sm)",
                            background: "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.08) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                            border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                            boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.04)",
                          }}
                        >
                          <ImageWithFallback src={item.image} alt={item.name} className={`h-full w-full ${artFitClass(item.image, "p-1.5")}`} />
                        </div>
                        {item.quantity > 1 && (
                          <span
                            aria-label={`Quantidade ${item.quantity}`}
                            className="absolute -right-1.5 -top-1.5 z-10 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-ink-strong"
                            style={{
                              background: "var(--gradient-brand)",
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "var(--text-caption)",
                              fontWeight: 800,
                              boxShadow: "0 4px 12px -4px rgba(225,6,0,0.55)",
                            }}
                          >
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-ink" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600, lineHeight: 1.3 }}>
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-family-inter)",
                            fontSize: "var(--text-caption)",
                            fontWeight: 700,
                            color: item.isGift ? "#22c55e" : "rgba(var(--foreground-rgb), 0.85)",
                            marginTop: "2px",
                          }}
                        >
                          {item.isGift ? "Brinde · Grátis" : <LineItemPrice unit={parseBRL(item.price)} quantity={item.quantity} variant="summary" method={payment === "pix" ? "pix" : "card"} />}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/5 mb-4" />

                {/* Cupom inline (CheckoutPage) */}
                <div className="mb-3" data-section="coupon">
                  <button
                    onClick={() => setCouponOpen((v) => !v)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2.5 min-h-[44px] md:min-h-[24px] transition-colors ${
                      appliedCoupon ? "rounded-card-sm border border-green-500/25 bg-green-500/[0.06]" : "rounded-card-sm border border-edge-subtle hover:border-edge hover:bg-white/[0.03]"
                    }`}
                    aria-expanded={couponOpen}
                  >
                    <span className="flex items-center gap-2">
                      {appliedCoupon ? <Check size={13} className="text-green-500" strokeWidth={2.4} /> : <Ticket size={13} className="text-ink-muted" strokeWidth={2} />}
                      <span
                        className={appliedCoupon ? "text-green-400" : "text-ink-muted"}
                        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: appliedCoupon ? 700 : 600 }}
                      >
                        {appliedCoupon ? `${appliedCoupon} aplicado` : "Tenho um cupom"}
                      </span>
                      {appliedCoupon && (
                        <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, color: "rgba(34,197,94,0.75)" }}>
                          −{discountPct}%
                        </span>
                      )}
                    </span>
                    <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, color: appliedCoupon ? "rgba(34,197,94,0.75)" : "rgba(var(--foreground-rgb), 0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {appliedCoupon ? "Alterar" : "Adicionar"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {couponOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        // clip, não hidden: hidden deixa o navegador rolar a caixa
                        // de lado ao focar o campo, cortando borda e mensagem.
                        style={{ overflow: "clip" }}
                      >
                        {/* p-[2px]: folga para o anel de foco não encostar na
                            borda do container recortado. */}
                        <div className="mt-2 flex gap-2 p-[2px]">
                          <input
                            type="text"
                            placeholder="Ex: PCYES10"
                            value={coupon}
                            onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                            aria-label="Código do cupom"
                            className="pcyes-coupon-input min-w-0 flex-1 rounded-[var(--radius-card-sm)] px-3 py-2 text-ink-strong placeholder:text-ink-subtle focus:outline-none"
                            style={{
                              background: "rgba(var(--foreground-rgb), 0.03)",
                              border: "1px solid rgba(var(--foreground-rgb), 0.1)",
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "var(--text-caption)",
                              fontWeight: 600,
                            }}
                          />
                          <button
                            onClick={handleApplyCoupon}
                            disabled={!coupon.trim()}
                            className="cursor-pointer rounded-[var(--radius-card-sm)] px-4 py-2 min-h-[44px] md:min-h-[24px] text-ink-strong transition-transform hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{
                              background: "var(--gradient-brand)",
                              fontFamily: "var(--font-family-inter)",
                              fontSize: "var(--text-caption)",
                              fontWeight: 800,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              boxShadow: "var(--shadow-brand-cta-sm)",
                            }}
                          >
                            Aplicar
                          </button>
                        </div>
                        {couponError && (
                          <p className="mt-2 text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
                            {couponError}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* PC Points inline (CheckoutPage) */}
                <div
                  data-section="points"
                  className={`mb-4 overflow-hidden rounded-card-sm transition-colors ${
                    pointsApplied
                      ? "border border-yellow-300/40 bg-yellow-300/[0.05]"
                      : "border border-edge-subtle hover:border-yellow-300/35 hover:bg-yellow-300/[0.05]"
                  }`}
                >
                  <button
                    onClick={() => { setPointsApplied((v) => !v); setPointsOpen((v) => !v); }}
                    className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2.5 min-h-[44px] md:min-h-[24px]"
                    aria-expanded={pointsApplied}
                  >
                    <span className="flex items-center gap-2">
                      <PcyesCoin />
                      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, color: pointsApplied ? "#facc15" : "rgba(var(--foreground-rgb), 0.78)" }}>
                        PC Points
                      </span>
                      {/* Saldo no amarelo dos PC Points, não em cinza: é o número que
                          decide se vale usar, e apagado ele lia como rótulo
                          desativado. O "pts" fica mais fraco — a unidade não
                          precisa do mesmo peso do valor. */}
                      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, color: "#facc15", fontVariantNumeric: "tabular-nums" }}>
                        {userPoints.toLocaleString("pt-BR")}
                        <span style={{ fontWeight: 600, opacity: 0.65 }}> pts</span>
                      </span>
                    </span>
                    <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800, letterSpacing: "0.1em", color: pointsApplied ? "#facc15" : "rgba(var(--foreground-rgb), 0.45)", textTransform: "uppercase" }}>
                      {pointsApplied ? "Aplicado" : "Usar"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {pointsApplied && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t px-3 pb-3 pt-3" style={{ borderColor: "rgba(250,204,21,0.2)" }}>
                          <div className="mb-2.5 flex items-center justify-between gap-3">
                            <NumberStepperRed
                              value={pointsToUse}
                              onChange={setPointsToUse}
                              max={maxPointsRedeem}
                              step={10}
                            />
                            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "rgba(var(--foreground-rgb), 0.5)", fontWeight: 600 }}>
                              de {maxPointsRedeem}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={maxPointsRedeem}
                            step={10}
                            value={pointsToUse}
                            onChange={(e) => setPointsToUse(Number(e.target.value))}
                            aria-label="Slider de pontos PCYES"
                            className="w-full"
                            style={{ accentColor: "#facc15" }}
                          />
                          <p className="mt-2 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                            Economia: <span style={{ color: "#facc15", fontWeight: 800 }}>{formatBRL(pointsValue)}</span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-4 space-y-2">
                  <Line label="Subtotal" value={formatBRL(subtotal)} amount={subtotal} />
                  {discountValue > 0 && <Line label={`Cupom ${appliedCoupon}`} value={`−${formatBRL(discountValue)}`} amount={discountValue} positive />}
                  {shippingLoading ? (
                    <SkeletonLine label="Frete" />
                  ) : (
                    <Line label="Frete" value={shippingPrice === 0 ? "Grátis" : formatBRL(shippingPrice)} positive={shippingPrice === 0} />
                  )}
                  {pointsValue > 0 && (
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", color: "#facc15", fontWeight: 600 }}>
                        PC Points
                      </span>
                      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", color: "#facc15", fontWeight: 700 }}>
                        −{formatBRL(pointsValue)}
                      </span>
                    </div>
                  )}
                  {quoting ? (
                    payment === "pix" && <SkeletonLine label={`Desconto PIX (${PIX_PERCENT}%)`} />
                  ) : (
                    pixDiscount > 0 && <Line label={`Desconto PIX (${PIX_PERCENT}%)`} value={`−${formatBRL(pixDiscount)}`} amount={pixDiscount} positive />
                  )}
                </div>

                {/* Total: o mesmo card do carrinho e do carrinho lateral. */}
                <OrderTotal cardTotal={baseTotal} pixTotal={pixTotal} method={payment} loading={totalLoading} />

    </>
  );

  return (
    <>
      <CheckoutHeader onBack={goBack} backLabel={atStart ? "Voltar ao carrinho" : "Voltar"} />

      <div className="pt-16 md:pt-[72px] pb-44 lg:pb-0" style={{ background: "var(--surface-0)", minHeight: "100vh" }}>
        <div className="mx-auto max-w-[1320px] px-5 py-4 md:px-8 md:py-6">
          <div className="mb-6">
            <p
              className="mb-2 text-primary"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
            >
              // CHECKOUT
            </p>
            <h1
              className="text-ink-strong"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Finalize seu pedido
            </h1>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
              {/* O carrinho entra como etapa já concluída, como fazem KaBuM e
                  outros grandes e-commerces: a pessoa chega no checkout vendo
                  que já andou um passo, não que está começando do zero. É o
                  único passo concluído que sai do checkout ao ser clicado. */}
              <button
                onClick={() => navigate("/carrinho")}
                aria-label="Carrinho, etapa concluída. Voltar ao carrinho"
                className="flex flex-1 cursor-pointer items-center gap-2 min-h-[44px] md:min-h-[24px]"
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--gradient-buy)", color: "#fff", boxShadow: "0 8px 22px -6px rgba(34,197,94,0.45)" }}
                >
                  <Check size={14} strokeWidth={2.6} />
                </div>
                <span
                  className="hidden text-ink md:inline"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.04em" }}
                >
                  Carrinho
                </span>
                <div className="hidden h-px flex-1 md:block" style={{ background: "rgba(34,197,94,0.4)" }} />
              </button>
              {(needsData || identityOpen) && (
                <button
                  onClick={() => identitySaved && setIdentityOpen(true)}
                  disabled={!identitySaved || identityOpen}
                  className="flex flex-1 items-center gap-2 min-h-[44px] md:min-h-[24px] disabled:cursor-not-allowed"
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all"
                    style={{
                      background: identityOpen ? "var(--gradient-brand)" : "var(--gradient-buy)",
                      color: "#fff",
                      boxShadow: identityOpen ? "0 8px 22px -6px rgba(225,6,0,0.5)" : "0 8px 22px -6px rgba(34,197,94,0.45)",
                    }}
                  >
                    {identityOpen ? <UserRound size={14} strokeWidth={2.2} /> : <Check size={14} strokeWidth={2.6} />}
                  </div>
                  <span
                    className={`hidden md:inline ${identityOpen ? "text-ink-strong" : "text-ink"}`}
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.04em" }}
                  >
                    Seus dados
                  </span>
                  <div className="hidden h-px flex-1 md:block" style={{ background: identityOpen ? "rgba(var(--foreground-rgb), 0.08)" : "rgba(34,197,94,0.4)" }} />
                </button>
              )}
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = !identityOpen && step === s.key;
                const done = step > s.key;
                return (
                  <button
                    key={s.key}
                    onClick={() => { if (!done || (identityOpen && !identitySaved)) return; setIdentityOpen(false); setStep(s.key as Step); }}
                    disabled={!done}
                    // No mobile só o ícone aparece: o último passo não pode esticar,
                    // senão sobra um vão à direita e os ícones deixam de ficar
                    // igualmente espaçados. No desktop todos esticam, como antes.
                    className={`flex items-center gap-2 min-h-[44px] md:min-h-[24px] disabled:cursor-not-allowed ${
                      i < STEPS.length - 1 ? "flex-1" : "flex-none"
                    }`}
                  >
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all"
                      style={{
                        background: active
                          ? "var(--gradient-brand)"
                          : done
                          ? "var(--gradient-buy)"
                          : "rgba(var(--foreground-rgb), 0.06)",
                        border: active || done ? "none" : "1px solid rgba(var(--foreground-rgb), 0.1)",
                        color: active || done ? "#fff" : "rgba(var(--foreground-rgb), 0.4)",
                        boxShadow: active
                          ? "0 8px 22px -6px rgba(225,6,0,0.5)"
                          : done
                          ? "0 8px 22px -6px rgba(34,197,94,0.45)"
                          : "none",
                      }}
                    >
                      {done ? <Check size={14} strokeWidth={2.6} /> : <Icon size={14} strokeWidth={2.2} />}
                    </div>
                    <span
                      className={`hidden md:inline ${active ? "text-ink-strong" : done ? "text-ink" : "text-ink-subtle"}`}
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.04em" }}
                    >
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="hidden h-px flex-1 md:block" style={{ background: done ? "rgba(34,197,94,0.4)" : "rgba(var(--foreground-rgb), 0.08)" }} />
                    )}
                  </button>
                );
              })}
            </div>
            <p
              className="md:hidden mt-2 text-ink-muted"
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.04em" }}
            >
              {identityOpen
                ? `Etapa 2 de 6 · Seus dados`
                : `Etapa ${step + (needsData ? 3 : 2)} de ${needsData ? 6 : 5} · ${STEPS[step].label}`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={identityOpen ? "dados" : step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden p-6 md:p-8"
                  style={{
                    borderRadius: "var(--radius-card-lg)",
                    background: cardBg,
                    border: cardBorder,
                    boxShadow: "var(--shadow-card-hairline)",
                  }}
                >
                  {stepLoading && !identityOpen && (
                    <>
                      <h2 className="mb-2 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {STEP_HEADINGS[step].title}
                      </h2>
                      <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        {step === 1 ? `Para ${address.city || "—"}/${address.state || "—"}` : STEP_HEADINGS[step].subtitle}
                      </p>
                      <span className="sr-only" role="status">Carregando {STEPS[step].label.toLowerCase()}</span>
                      <StepSkeleton step={step} hasSavedAddresses={!!(isLoggedIn && user && user.addresses.length > 0)} />
                    </>
                  )}

                  {identityOpen && (
                    <>
                      <h2 className="mb-2 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        Seus dados
                      </h2>
                      <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        Sua conta veio sem alguns dados. Você preenche só desta vez: fica tudo salvo.
                      </p>

                      {/* Conta conectada: lembra com qual e-mail a nota e os avisos vão sair. */}
                      <div className="mb-6 flex items-center gap-3 p-3" style={{ borderRadius: 12, background: "rgba(var(--foreground-rgb), 0.02)", border: "1px solid rgba(var(--foreground-rgb), 0.08)" }}>
                        <span className="flex items-center justify-center shrink-0 text-ink" style={{ width: 32, height: 32, borderRadius: 9999, background: "rgba(var(--foreground-rgb), 0.06)" }}>
                          <UserRound size={16} strokeWidth={2} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>Conta conectada</p>
                          <p className="text-ink-strong truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>{user?.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="Nome completo"
                          required
                          className="sm:col-span-2"
                          error={err(identity.name.trim().split(/\s+/).length < 2, "Informe nome e sobrenome, como no documento.")}
                        >
                          <input
                            autoComplete="name"
                            value={identity.name}
                            placeholder="Como está no seu documento"
                            aria-invalid={attempted && identity.name.trim().split(/\s+/).length < 2}
                            onChange={(e) => setIdentity((d) => ({ ...d, name: e.target.value }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                          <p className="mt-1.5 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
                            Veio da sua conta. A nota fiscal sai com este nome.
                          </p>
                        </Field>
                        <Field
                          label="CPF"
                          required
                          error={
                            identity.cpf.length === 14 && !isValidCpf(identity.cpf) ? "CPF inválido. Confira os números."
                            : err(!isValidCpf(identity.cpf), "Informe o CPF para a nota fiscal.")
                          }
                        >
                          {/* Tabular-nums porque CPF é conferido dígito a dígito. */}
                          <input
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="000.000.000-00"
                            value={identity.cpf}
                            aria-invalid={!!cpfOwner || (identity.cpf.length === 14 && !isValidCpf(identity.cpf)) || (attempted && !isValidCpf(identity.cpf))}
                            onChange={(e) => setIdentity((d) => ({ ...d, cpf: formatCpf(e.target.value) }))}
                            className={`${inputClass} checkout-field`}
                            style={{ ...inputStyle, fontVariantNumeric: "tabular-nums" }}
                          />
                          {cpfOwner ? (
                            /* Beco sem saída se não oferecer a saída: quase sempre é a
                               própria pessoa com outra conta, e o que ela precisa é entrar
                               nela. Sair desta conta devolve ao carrinho com o login aberto. */
                            <div
                              role="alert"
                              className="mt-2 p-3"
                              style={{ borderRadius: 10, background: "rgba(255,43,46,0.06)", border: "1px solid rgba(255,43,46,0.22)" }}
                            >
                              {/* Estilo em cada texto, não no wrapper: o p global do tema impõe o próprio tamanho. */}
                              <div className="flex items-start gap-2">
                                <AlertCircle size={14} strokeWidth={2.2} className="mt-[2px] shrink-0 text-primary" aria-hidden="true" />
                                <div className="min-w-0">
                                  <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600, lineHeight: 1.4 }}>
                                    Esse CPF já tem uma conta
                                  </p>
                                  <p className="mt-0.5 truncate text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.4 }}>
                                    {cpfOwner}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pl-[22px]">
                                {/* outline do DS usa --input no escuro (preto 50%): some no painel.
                                    Tokens de superfície e borda do tema no lugar. */}
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={logout}
                                  className="border-edge bg-surface-glass text-ink-strong hover:border-edge-strong hover:bg-foreground/10 hover:text-ink-strong dark:border-edge dark:bg-surface-glass dark:hover:bg-foreground/10"
                                >
                                  Entrar nessa conta
                                </Button>
                                {/* link do DS vem em --primary; aqui fica neutro pra não somar
                                    vermelho ao aviso, que já é vermelho. */}
                                <Button variant="link" size="sm" asChild className="h-auto px-0 text-ink-muted hover:text-ink">
                                  <a href="https://wa.me/554421011387" target="_blank" rel="noreferrer">Esse e-mail não é meu</a>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="mt-1.5 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
                              {cpfChecking ? "Conferindo…" : "Vai na nota fiscal."}
                            </p>
                          )}
                        </Field>
                        <Field
                          label="Celular"
                          required
                          error={err(!isValidPhone(identity.phone), "Informe o celular com DDD.")}
                        >
                          <input
                            inputMode="numeric"
                            autoComplete="tel-national"
                            placeholder="(00) 00000-0000"
                            value={identity.phone}
                            aria-invalid={attempted && !isValidPhone(identity.phone)}
                            onChange={(e) => setIdentity((d) => ({ ...d, phone: formatPhone(e.target.value) }))}
                            className={`${inputClass} checkout-field`}
                            style={{ ...inputStyle, fontVariantNumeric: "tabular-nums" }}
                          />
                          <p className="mt-1.5 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
                            Pra transportadora e pros avisos do pedido.
                          </p>
                        </Field>
                      </div>
                    </>
                  )}

                  {!stepLoading && !identityOpen && step === 0 && (
                    <>
                      <h2
                        className="mb-2 text-ink-strong"
                        style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}
                      >
                        Endereço de entrega
                      </h2>
                      <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        Pra onde mandamos sua build?
                      </p>

                      {/* Saved addresses picker — só renderiza se logado com endereços salvos. */}
                      {isLoggedIn && user && user.addresses.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2.5">
                            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(var(--foreground-rgb), 0.55)" }}>
                              Endereços salvos
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {user.addresses.map((a) => {
                              const sel = selectedAddressId === a.id;
                              return (
                                <div
                                  key={a.id}
                                  className="relative text-left p-3 min-h-[44px] transition-all cursor-pointer"
                                  onClick={() => setSelectedAddressId(a.id)}
                                  style={{
                                    borderRadius: 12,
                                    background: sel ? "rgba(255,43,46,0.08)" : "rgba(var(--foreground-rgb), 0.02)",
                                    border: sel ? "1.5px solid rgba(255,43,46,0.45)" : "1px solid rgba(var(--foreground-rgb), 0.08)",
                                  }}
                                >
                                  <div className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex items-center justify-center shrink-0" style={{ width: 16, height: 16, borderRadius: 9999, border: sel ? "5px solid var(--primary)" : "1.5px solid rgba(var(--foreground-rgb), 0.4)", background: sel ? "var(--primary)" : "transparent", boxShadow: sel ? "inset 0 0 0 2px #161617" : "none" }} />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-ink-strong truncate" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>{a.label}</span>
                                        {a.isDefault && <span className="px-1.5 py-0.5 bg-primary/12 text-primary" style={{ borderRadius: 999, fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.08em" }}>PADRÃO</span>}
                                      </div>
                                      <p className="text-ink-muted truncate mt-0.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                                        {a.street}, {a.number} · {a.city}/{a.state}
                                      </p>
                                    </div>
                                    {sel && (
                                      <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setSelectedAddressId(null); }}
                                        className="flex-shrink-0 inline-flex items-center px-3 py-1 min-h-[44px] md:min-h-[24px] md:px-2 text-ink hover:text-ink-strong transition-all cursor-pointer"
                                        style={{ borderRadius: 6, background: "rgba(var(--foreground-rgb), 0.06)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
                                      >
                                        Editar
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            {/* Card 'Adicionar novo' — mesmo tamanho dos demais */}
                            <button
                              type="button"
                              onClick={() => setAddressModalOpen(true)}
                              className="flex items-center gap-2 justify-center p-3 transition-all cursor-pointer hover:brightness-110"
                              style={{
                                borderRadius: 12,
                                background: "rgba(255,43,46,0.04)",
                                border: "1.5px dashed rgba(255,43,46,0.35)",
                                minHeight: 60,
                              }}
                            >
                              <span style={{ width: 24, height: 24, borderRadius: 9999, background: "rgba(255,43,46,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700, lineHeight: 1 }}>+</span>
                              <span className="text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>Adicionar novo endereço</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Form só aparece se: não logado / sem endereços salvos / clicou em 'Editar manualmente' (selectedAddressId === null) */}
                      {(!isLoggedIn || !user || user.addresses.length === 0 || selectedAddressId === null) && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="CEP" required error={err(address.zip.replace(/\D/g, "").length < 8, "Informe um CEP válido")}>
                          <div className="relative">
                            <input
                              inputMode="numeric"
                              value={address.zip}
                              placeholder="00000-000"
                              aria-invalid={!!cepError || (attempted && address.zip.replace(/\D/g, "").length < 8)}
                              aria-describedby={cepError ? "cep-error" : undefined}
                              onChange={(e) => {
                                const v = formatCep(e.target.value);
                                setAddress((a) => ({ ...a, zip: v }));
                                if (cepError) setCepError("");
                                if (v.replace(/\D/g, "").length === 8) handleCepLookup(v);
                              }}
                              className={`${inputClass} checkout-field`}
                              style={inputStyle}
                            />
                            {loadingCep && <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-ink-muted" />}
                          </div>
                          {cepError && (
                            <p id="cep-error" role="alert" className="mt-1.5 text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                              {cepError}
                            </p>
                          )}
                        </Field>
                        <Field label="Destinatário" required error={err(!address.recipient, "Informe o destinatário")}>
                          <input
                            value={address.recipient}
                            placeholder="Quem vai receber?"
                            aria-invalid={attempted && !address.recipient}
                            onChange={(e) => setAddress((a) => ({ ...a, recipient: e.target.value }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Rua / Avenida" required className="md:col-span-2" error={err(!address.street, "Informe a rua")}>
                          <input
                            value={address.street}
                            placeholder="Nome da rua"
                            aria-invalid={attempted && !address.street}
                            onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Número" required error={err(!address.number, "Informe o número")}>
                          <input
                            inputMode="numeric"
                            value={address.number}
                            placeholder="123"
                            aria-invalid={attempted && !address.number}
                            onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value.replace(/\D/g, "") }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Complemento (opcional)">
                          <input
                            value={address.complement}
                            placeholder="Apto, bloco, etc."
                            onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Bairro">
                          <input
                            value={address.district}
                            placeholder="Bairro"
                            onChange={(e) => setAddress((a) => ({ ...a, district: e.target.value }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Cidade" required error={err(!address.city, "Informe a cidade")}>
                          <input
                            value={address.city}
                            placeholder="Cidade"
                            aria-invalid={attempted && !address.city}
                            onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Estado">
                          <input
                            value={address.state}
                            placeholder="UF"
                            maxLength={2}
                            onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value.toUpperCase() }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                        <Field label="Telefone">
                          <input
                            inputMode="numeric"
                            value={address.phone}
                            placeholder="(00) 00000-0000"
                            onChange={(e) => setAddress((a) => ({ ...a, phone: formatPhone(e.target.value) }))}
                            className={`${inputClass} checkout-field`}
                            style={inputStyle}
                          />
                        </Field>
                      </div>
                      )}
                    </>
                  )}

                  {!stepLoading && !identityOpen && step === 1 && (
                    <>
                      <h2 className="mb-2 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        Como entregar?
                      </h2>
                      <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        Para {address.city || "—"}/{address.state || "—"}
                      </p>
                      <div className="flex flex-col gap-3">
                        {shippingOptions.map((opt) => {
                          const active = selectedShipping === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedShipping(opt.id)}
                              className="flex items-center gap-2.5 md:gap-4 p-4 text-left transition-all"
                              style={{
                                borderRadius: "var(--radius-card-sm)",
                                background: active ? "rgba(34,197,94,0.06)" : "rgba(var(--foreground-rgb), 0.02)",
                                border: active ? "1.5px solid rgba(34,197,94,0.5)" : "1px solid rgba(var(--foreground-rgb), 0.08)",
                                boxShadow: active ? "0 16px 36px -16px rgba(34,197,94,0.35)" : "none",
                              }}
                            >
                              <div
                                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                  background: active ? "var(--gradient-buy)" : "transparent",
                                  border: active ? "none" : "1.5px solid rgba(var(--foreground-rgb), 0.25)",
                                }}
                              >
                                {active && <Check size={11} strokeWidth={3} className="text-ink-strong" />}
                              </div>
                              <Truck size={18} strokeWidth={1.8} className={active ? "text-green-400" : "text-ink-muted"} />
                              <div className="min-w-0 flex-1">
                                <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700 }}>
                                  {opt.label}
                                </p>
                                <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", marginTop: 2 }}>
                                  {opt.eta}
                                </p>
                              </div>
                              {/* badge fica empilhado sobre o preço: o nome da opção mantém
                                  a largura inteira e não quebra em três linhas no mobile */}
                              <div className="flex flex-shrink-0 flex-col items-end gap-1">
                                {opt.badge && (
                                  <span
                                    className="inline-flex items-center whitespace-nowrap text-ink-strong"
                                    style={{
                                      padding: "2px 8px",
                                      borderRadius: "var(--radius-pill)",
                                      background: "var(--gradient-brand)",
                                      fontFamily: "var(--font-family-inter)",
                                      fontSize: "var(--text-caption)",
                                      fontWeight: 800,
                                      letterSpacing: "0.1em",
                                    }}
                                  >
                                    {opt.badge}
                                  </span>
                                )}
                                <p
                                  className="whitespace-nowrap"
                                  style={{
                                    fontFamily: "var(--font-family-figtree)",
                                    fontSize: "var(--text-base)",
                                    fontWeight: 800,
                                    color: opt.price === 0 ? "#22c55e" : "#fff",
                                    letterSpacing: "-0.015em",
                                  }}
                                >
                                  {opt.price === 0 ? "Grátis" : formatBRL(opt.price)}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {!stepLoading && !identityOpen && step === 2 && (
                    <>
                      <h2 className="mb-2 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        Como vai pagar?
                      </h2>
                      <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        Escolha um método. À vista no PIX com {PIX_PERCENT}% de desconto.
                      </p>

                      {/* As quatro formas da loja: uma por linha no celular (como na loja),
                          2×2 a partir de sm (em 3+1 o Mercado Pago sobrava sozinho numa
                          linha). Pix primeiro pelo desconto. Apple/Google Pay não existem na
                          loja e saíram daqui. */}
                      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
                        <PaymentOption icon={<PixLogo size={18} />} label="Pix" description="Aprovação instantânea" badge={`-${PIX_PERCENT}%`} active={payment === "pix"} onClick={() => setPayment("pix")} color="#22c55e" accentBg="rgba(34,197,94,0.14)" />
                        <PaymentOption icon={<CreditCard size={18} strokeWidth={2} />} label="Cartão de crédito" description={`Em até ${maxInstallments}×, direto no site`} active={payment === "credit"} onClick={() => setPayment("credit")} />
                        <PaymentOption icon={<Barcode size={18} strokeWidth={2} />} label="Boleto" description="Compensa em até 2 dias úteis" active={payment === "boleto"} onClick={() => setPayment("boleto")} />
                        <PaymentOption icon={<CreditCard size={18} strokeWidth={2} />} label="Mercado Pago" description="Cartão processado pelo Mercado Pago" active={payment === "mercadopago"} onClick={() => { setPayment("mercadopago"); setSelectedCardId(null); setCardName(""); setCardNumber(""); setCardExp(""); setCardCvc(""); }} />
                      </div>

                      <AnimatePresence mode="wait">
                        {(payment === "credit" || payment === "mercadopago") && (
                          <motion.div
                            key="credit"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            /* -m-1/p-1: folga para o anel de foco (4px para fora) não
                               ser cortado pelo overflow-hidden da animação de altura. */
                            className="-m-1 overflow-hidden p-1"
                          >
                            {/* Cartão de crédito (Asaas), como na loja: cartões salvos + "Adicionar
                                novo cartão", que abre a janela. Nunca formulário aberto aqui. */}
                            {payment === "credit" && isLoggedIn && user && (
                              <div className="mt-3 mb-5">
                                <div className="flex items-center justify-between mb-2.5">
                                  <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(var(--foreground-rgb), 0.55)" }}>
                                    {savedCards.length > 0 ? "Cartões salvos" : "Seu cartão"}
                                  </span>
                                  <AcceptedBrands active={null} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  {savedCards.map((c) => {
                                    const sel = selectedCardId === c.id;
                                    return (
                                      <div
                                        key={c.id}
                                        onClick={() => setSelectedCardId(c.id)}
                                        className="text-left p-3 transition-all cursor-pointer flex items-center gap-2.5 relative"
                                        style={{
                                          borderRadius: 12,
                                          background: sel ? "rgba(34,197,94,0.08)" : "rgba(var(--foreground-rgb), 0.02)",
                                          border: sel ? "1.5px solid rgba(34,197,94,0.45)" : "1px solid rgba(var(--foreground-rgb), 0.08)",
                                        }}
                                      >
                                        <span className="flex items-center justify-center shrink-0" style={{ width: 16, height: 16, borderRadius: 9999, border: sel ? "5px solid #22c55e" : "1.5px solid rgba(var(--foreground-rgb), 0.4)", background: sel ? "#22c55e" : "transparent", boxShadow: sel ? "inset 0 0 0 2px #161617" : "none" }} />
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{c.brand}</span>
                                            {c.isDefault && <span className="px-1.5 py-0.5 bg-primary/12 text-primary" style={{ borderRadius: 999, fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.08em" }}>PADRÃO</span>}
                                          </div>
                                          <p className="text-ink font-mono mt-0.5" style={{ fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.05em" }}>•••• {c.last4}</p>
                                          <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>Validade {c.expiry}</p>
                                        </div>
                                        {sel && (
                                          <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setSelectedCardId(null); }}
                                            className="flex-shrink-0 inline-flex items-center px-3 py-1 min-h-[44px] md:min-h-[24px] md:px-2 text-ink hover:text-ink-strong transition-all cursor-pointer"
                                            style={{ borderRadius: 6, background: "rgba(var(--foreground-rgb), 0.06)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
                                          >
                                            Editar
                                          </button>
                                        )}
                                      </div>
                                    );
                                  })}
                                  {/* Card 'Adicionar novo' — sem cartão salvo, ocupa a linha toda. */}
                                  <button
                                    type="button"
                                    onClick={() => setCardModalOpen(true)}
                                    className={`flex items-center gap-2 justify-center p-3 transition-all cursor-pointer hover:brightness-110 ${savedCards.length === 0 ? "sm:col-span-2" : ""}`}
                                    style={{
                                      borderRadius: 12,
                                      background: "rgba(255,43,46,0.04)",
                                      border: "1.5px dashed rgba(255,43,46,0.35)",
                                      minHeight: 60,
                                    }}
                                  >
                                    <span style={{ width: 24, height: 24, borderRadius: 9999, background: "rgba(255,43,46,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700, lineHeight: 1 }}>+</span>
                                    <span className="text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>Adicionar novo cartão</span>
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Form de novo cartão só aparece se: não logado / sem cartões / clicou em 'Usar outro cartão' */}
                            {payment === "mercadopago" && (
                            <div
                              className="mt-1 mb-4 grid grid-cols-1 gap-4 p-5 md:grid-cols-2"
                              style={{ borderRadius: "var(--radius-card-sm)", border: "1px solid rgba(var(--foreground-rgb), 0.08)", background: "rgba(var(--foreground-rgb), 0.02)" }}
                            >
                              {/* Mesmas bandeiras do cartão de crédito (Elo aceito, mas sem logo). */}
                              <div className="md:col-span-2 flex items-center justify-between">
                                <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(var(--foreground-rgb), 0.55)" }}>
                                  Dados do cartão
                                </span>
                                <AcceptedBrands active={detectCardBrand(cardNumber.replace(/\D/g, ""))} />
                              </div>
                              <Field label="Nome no cartão" required className="md:col-span-2">
                                <input
                                  value={cardName}
                                  placeholder="Como está impresso"
                                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                  className={`${inputClass} checkout-field`}
                                  style={inputStyle}
                                />
                              </Field>
                              <Field label="Número do cartão" required className="md:col-span-2">
                                <div className="relative">
                                  <input
                                    inputMode="numeric"
                                    value={cardNumber}
                                    placeholder="0000 0000 0000 0000"
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    className={`${inputClass} checkout-field`}
                                    style={{ ...inputStyle, paddingRight: "60px" }}
                                  />
                                  <CardBrand digits={cardNumber.replace(/\D/g, "")} />
                                </div>
                              </Field>
                              <Field label="Validade" required>
                                <input
                                  inputMode="numeric"
                                  value={cardExp}
                                  placeholder="MM/AA"
                                  onChange={(e) => setCardExp(formatExp(e.target.value))}
                                  className={`${inputClass} checkout-field`}
                                  style={inputStyle}
                                />
                              </Field>
                              <Field label="CVC" required>
                                <input
                                  inputMode="numeric"
                                  value={cardCvc}
                                  placeholder="000"
                                  maxLength={3}
                                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                  className={`${inputClass} checkout-field`}
                                  style={inputStyle}
                                />
                              </Field>
                            </div>
                            )}

                            {/* Parcelas e CPF/CNPJ do titular lado a lado a partir de md; um embaixo do outro no celular. */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
                              <Field label="Parcelas">
                                {/*
                                  Select do DS, não `<select>` nativo. O nativo tinha três
                                  problemas aqui, todos fora do alcance de CSS:

                                  · a lista aberta é desenhada pelo SISTEMA — `<option>` quase
                                    não aceita estilo, então vinha o menu do sistema operacional,
                                    com o item ativo em azul, no meio de um checkout escuro;
                                  · a seta é do navegador e fica colada na borda direita,
                                    ignorando o padding do campo;
                                  · o campo vive no `motion.div` de altura animada logo acima,
                                    que é `overflow-hidden` — o anel de foco global, desenhado
                                    2px para fora, saía cortado (mesma armadilha do cupom).

                                  O Radix resolve os três: a lista vai para um portal (não é
                                  recortada nem pelo `overflow-hidden` nem pelo sistema), o
                                  chevron é nosso e respeita o padding, e o foco é `box-shadow`,
                                  que não precisa de espaço fora do campo.
                                */}
                                <Select
                                  value={String(installments)}
                                  onValueChange={(v) => setInstallments(Number(v))}
                                >
                                  <SelectTrigger
                                    aria-label="Parcelas"
                                    /*
                                      `!h-auto` — o trigger do DS chega com `h-9` fixo, que
                                      encolheria o campo perto dos vizinhos do checkout.

                                      `pcyes-field-ring` + `focus-visible:ring-0` — o foco
                                      vinha com DOIS anéis: o `ring` de 3px do DS, colado, e o
                                      anel global de 1px a 2px de distância. O de fora é o que
                                      o `overflow-hidden` do bloco animado cortava. A classe
                                      zera o outline global e desenha um anel só, colado na
                                      borda; o `ring-0` tira o do DS para não somarem.
                                    */
                                    className="pcyes-field-ring checkout-field w-full !h-auto justify-between text-ink-strong transition-all focus-visible:ring-0 data-[state=open]:border-primary/45 [&_svg]:text-ink-muted [&_svg]:opacity-100"
                                    style={inputStyle}
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent
                                    /* Largura do gatilho: a lista alinhada com o campo lê como
                                       continuação dele, não como caixa solta. */
                                    className="w-[var(--radix-select-trigger-width)] border-edge bg-surface-1 text-ink-strong shadow-2xl shadow-black/60"
                                    style={{ borderRadius: "var(--radius-card-sm)" }}
                                  >
                                    {Array.from({ length: maxInstallments }, (_, i) => i + 1).map((n) => (
                                      <SelectItem
                                        key={n}
                                        value={String(n)}
                                        className="cursor-pointer rounded-[var(--radius)] focus:bg-primary/15 focus:text-ink-strong data-[state=checked]:text-primary"
                                        style={{ fontFamily: "var(--font-family-inter)", fontWeight: 600 }}
                                      >
                                        {n}× {formatBRL(baseTotal / n)} sem juros
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </Field>
                              <PayerDocField label="CPF/CNPJ do titular do cartão" value={payerDoc} onChange={setPayerDoc} />
                            </div>
                          </motion.div>
                        )}

                        {payment === "pix" && (
                          <motion.div
                            key="pix"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="-m-1 overflow-hidden p-1"
                          >
                            <PayerDocField label="CPF/CNPJ do pagador" value={payerDoc} onChange={setPayerDoc} className="mb-4 mt-1" />
                            <div
                              className="flex items-start gap-3 rounded-[var(--radius-card-sm)] p-4"
                              style={{
                                background: "rgba(34,197,94,0.06)",
                                border: "1px solid rgba(34,197,94,0.25)",
                              }}
                            >
                              <Zap size={18} strokeWidth={2.4} className="mt-0.5 text-green-400 flex-shrink-0" fill="currentColor" />
                              <div>
                                <p className="text-green-300" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700 }}>
                                  {PIX_PERCENT}% OFF automático no PIX
                                </p>
                                <p className="mt-1 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
                                  O QR Code e o Pix copia e cola aparecem na tela assim que o pedido for fechado.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}


                        {payment === "boleto" && (
                          <motion.div key="boleto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <PayerDocField label="CPF/CNPJ do pagador" value={payerDoc} onChange={setPayerDoc} className="mb-4 mt-1" />
                            <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.5 }}>
                              O link do boleto aparece na tela ao fechar o pedido e chega por e-mail. Vence em 3 dias úteis; o estoque só é reservado depois da compensação (até 2 dias úteis).
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* No lugar do botão flutuante do WhatsApp, que no checkout
                          cobria total e resumo: uma frase, onde a dúvida de
                          pagamento aparece. Vermelho de link, como "Adicionar
                          novo cartão". */}
                      <p className="mt-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        Dúvida no pagamento?{" "}
                        <a
                          href="https://wa.me/554421011387"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-primary underline-offset-2 hover:underline"
                        >
                          Fale com a gente no WhatsApp
                        </a>
                      </p>
                    </>
                  )}

                  {!stepLoading && !identityOpen && step === 3 && (
                    <>
                      <h2 className="mb-2 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        Revisão final
                      </h2>
                      <p className="mb-6 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                        Confirme se tá tudo certo antes de fechar.
                      </p>

                      <div className="space-y-4">
                        <ReviewCard icon={<FileText size={14} strokeWidth={2} />} label="Nota fiscal" onEdit={() => { setAttempted(false); setIdentityOpen(true); }}>
                          <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                            {user?.name}
                          </p>
                          <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontVariantNumeric: "tabular-nums" }}>
                            CPF {user?.cpf}{user?.phone ? ` · ${user.phone}` : ""}
                          </p>
                        </ReviewCard>

                        <ReviewCard icon={<MapPin size={14} strokeWidth={2} />} label="Endereço" onEdit={() => setStep(0)}>
                          <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                            {address.recipient}
                          </p>
                          <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
                            {address.street}, {address.number}
                            {address.complement ? ` · ${address.complement}` : ""}
                          </p>
                          <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                            {address.district} · {address.city}/{address.state} · {address.zip}
                          </p>
                        </ReviewCard>

                        <ReviewCard icon={<Truck size={14} strokeWidth={2} />} label="Entrega" onEdit={() => setStep(1)}>
                          {shippingOptions.find((o) => o.id === selectedShipping) && (
                            <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                              {shippingOptions.find((o) => o.id === selectedShipping)!.label}{" "}
                              <span className="text-ink-muted font-normal">· {shippingOptions.find((o) => o.id === selectedShipping)!.eta}</span>
                            </p>
                          )}
                        </ReviewCard>

                        <ReviewCard icon={<CreditCard size={14} strokeWidth={2} />} label="Pagamento" onEdit={() => setStep(2)}>
                          <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                            {payment === "pix" && `PIX · ${PIX_PERCENT}% OFF automático`}
                            {payment === "credit" && `Cartão de crédito · ${installments}× sem juros`}
                            {payment === "apple" && "Apple Pay"}
                            {payment === "google" && "Google Pay"}
                            {payment === "boleto" && "Boleto bancário"}
                          </p>
                        </ReviewCard>

                        <div
                          className="rounded-[var(--radius-card-sm)] p-4"
                          style={{ background: "rgba(var(--foreground-rgb), 0.02)", border: "1px solid rgba(var(--foreground-rgb), 0.06)" }}
                        >
                          <p
                            className="mb-3 text-ink-muted"
                            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}
                          >
                            Itens ({items.length})
                          </p>
                          <div className="space-y-3">
                            {items.map((item) => (
                              <div key={item.cartKey} className="flex items-center gap-3">
                                <div
                                  className="h-12 w-12 flex-shrink-0 overflow-hidden"
                                  style={{
                                    borderRadius: "var(--radius-card-sm)",
                                    background: "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.08) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                                    border: "1px solid rgba(var(--foreground-rgb), 0.06)",
                                  }}
                                >
                                  <ImageWithFallback src={item.image} alt={item.name} className={`h-full w-full ${artFitClass(item.image, "p-1.5")}`} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="line-clamp-1 text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
                                    {item.name}
                                  </p>
                                  <p className="text-ink-subtle" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                                    {item.isGift ? `${item.quantity}× Brinde` : <LineItemPrice unit={parseBRL(item.price)} quantity={item.quantity} variant="summary" method={payment === "pix" ? "pix" : "card"} />}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>

            <div className="hidden lg:block lg:sticky lg:top-[96px] lg:self-start">
              <div
                className="overflow-hidden p-6"
                style={{
                  borderRadius: "var(--radius-card-lg)",
                  background: cardBg,
                  border: cardBorder,
                  boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.05), 0 24px 60px -20px rgba(0,0,0,0.5)",
                }}
              >
                <p
                  className="mb-5 text-primary"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
                >
                  // RESUMO
                </p>

                {orderSummary}

                {/* Avançar e voltar ficam presos ao resumo, que é sticky: com o
                    formulário de endereço ou a lista de cartões aberta, a coluna
                    da esquerda cresce e os botões iam parar lá embaixo. Aqui eles
                    seguem a rolagem e ficam sempre à vista. */}
                <div className="mt-5 flex flex-col gap-2.5">
                  {step < 3 ? (
                    <button
                      onClick={tryAdvance}
                      aria-disabled={!canAdvance}
                      className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-ink-strong transition-transform hover:scale-[1.02] active:scale-[0.98] ${!canAdvance ? "opacity-60" : ""}`}
                      style={{
                        background: "var(--gradient-brand)",
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        boxShadow: "var(--shadow-brand-cta)",
                      }}
                    >
                      Continuar
                      <ChevronRight size={14} strokeWidth={2.6} />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-ink-strong transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "var(--gradient-buy)",
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        boxShadow: "var(--shadow-buy-cta)",
                      }}
                    >
                      <Lock size={13} strokeWidth={2.6} />
                      Finalizar pedido
                    </button>
                  )}
                  <button
                    onClick={goBack}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border border-edge px-7 py-3 text-ink-muted transition-colors hover:border-white/25 hover:text-ink-strong"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    <ChevronLeft size={14} strokeWidth={2.4} />
                    {atStart ? "Voltar ao carrinho" : "Voltar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom action bar — total + step CTA. lg:hidden, abaixo dos modais (z-[120]).
          Ancorada acima do aviso de cookies, que é fixed num z maior. Ver `--cookie-h`. */}
      <div style={{ bottom: "var(--cookie-h, 0px)" }} className="fixed left-0 right-0 z-40 lg:hidden">
        {/* Cupom e PC Points saíram daqui: os dois já existem dentro do
            resumo, que é o mesmo bloco do desktop. A barra repetia as duas
            linhas e empurrava o botão de avançar pra baixo, comendo tela num
            lugar onde ela é escassa. Sobrou um convite só. */}
        <button
          onClick={() => openDetails()}
          aria-expanded={detailsOpen}
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 border-t border-edge px-4 py-2 transition-colors hover:bg-white/[0.04] active:bg-white/[0.06]"
          style={{ minHeight: 48, background: "rgba(14,14,14,0.95)", backdropFilter: "blur(20px)" }}
        >
          {/* Puxador: é o sinal que o celular inteiro usa pra dizer que algo
              sobe daqui. Sem ele, texto miúdo na barra não lê como controle. */}
          <span aria-hidden="true" className="h-[3px] w-9 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5 text-ink">
            {/* Caixa normal e não versalete: "VER DETALHES" com tracking largo
                lê como rótulo de seção, não como algo em que se toca. */}
            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
              Ver detalhes
            </span>
            <ChevronUp size={14} strokeWidth={2.6} />
          </span>
        </button>
        <div
          className="flex items-center gap-3 border-t border-edge px-4 py-3"
          style={{ background: "rgba(14,14,14,0.95)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex-1 min-w-0">
            {/* Texto, não botão: a linha "Ver detalhes" logo acima já é a
                afordância de expandir, e dois alvos para a mesma ação viram
                ruído. */}
            <span
              className={payment === "pix" ? "block" : "block text-ink-muted"}
              style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: payment === "pix" ? "#22c55e" : undefined }}
            >
              {payment === "pix" ? "Total no PIX" : "Total"}
            </span>
            <span
              className="block text-ink-strong"
              style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: payment === "pix" ? "#22c55e" : undefined }}
            >
              {totalLoading ? <SkeletonBar width={112} height={20} className="mt-0.5 align-middle" /> : formatBRL(total)}
            </span>
          </div>
          {step < 3 ? (
            <button
              onClick={tryAdvance}
              aria-disabled={!canAdvance}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-6 text-ink-strong transition-transform active:scale-[0.97] ${!canAdvance ? "opacity-60" : ""}`}
              style={{
                minHeight: 46,
                background: "var(--gradient-brand)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "var(--shadow-brand-cta)",
              }}
            >
              Continuar
              <ChevronRight size={14} strokeWidth={2.6} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-6 text-ink-strong transition-transform active:scale-[0.97]"
              style={{
                minHeight: 46,
                background: "var(--gradient-buy)",
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "var(--shadow-buy-cta)",
              }}
            >
              <Lock size={13} strokeWidth={2.6} />
              Finalizar pedido
            </button>
          )}
        </div>
      </div>
      {/* Resumo do pedido no mobile — abre de baixo para cima a partir da barra
          fixa. z abaixo dos modais (z-[120]) e acima da barra (z-40). */}
      <AnimatePresence>
        {detailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetailsOpen(false)}
            className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 backdrop-blur-sm lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Resumo do pedido"
          >
            <motion.div
              ref={detailsSheetRef}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[520px] max-h-[86vh] overflow-y-auto"
              style={{
                background: "var(--surface-1)",
                borderRadius: "20px 20px 0 0",
                borderTop: "1px solid rgba(var(--foreground-rgb), 0.08)",
                boxShadow: "0 -40px 100px rgba(0,0,0,0.55)",
              }}
            >
              <div
                className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 pb-3 pt-4"
                style={{ background: "var(--surface-1)" }}
              >
                <span
                  className="text-primary"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}
                >
                  // RESUMO
                </span>
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-white/[0.06] hover:text-ink-strong"
                  aria-label="Ver menos"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
              <div className="px-5 pb-6">{orderSummary}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />

      {/* Apple Pay sheet */}
      <AnimatePresence>
        {walletSheet === "apple" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !walletConfirming && setWalletSheet(null)}
            className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 backdrop-blur-md md:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Apple Pay"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
              style={{
                background: "var(--surface-1)",
                color: "#fff",
                borderRadius: "20px 20px 0 0",
                boxShadow: "0 -40px 100px rgba(0,0,0,0.55)",
              }}
            >
              <div className="flex items-center justify-between px-5 pb-3 pt-4">
                <span className="inline-flex items-center gap-1 text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", fontWeight: 600 }}>
                  <Apple size={17} strokeWidth={1.8} fill="currentColor" />
                  <span className="font-light">Pay</span>
                </span>
                <button
                  onClick={() => !walletConfirming && setWalletSheet(null)}
                  aria-label="Fechar Apple Pay"
                  className="flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-white/[0.08] hover:text-ink-strong"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="h-px bg-white/8" />

              <div className="px-5 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>PCYES Gamer</span>
                  <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 700, letterSpacing: "-0.02em" }}>{formatBRL(total)}</span>
                </div>

                <div className="mb-3 rounded-card-sm p-3.5" style={{ background: "rgba(var(--foreground-rgb), 0.06)" }}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>Pagar com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-12 items-center justify-center rounded-[var(--radius-card)]" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
                      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800, color: "#fff" }}>VISA</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>Apple Card</p>
                      <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>•••• 4231</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 flex items-center justify-between text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                  <span>Enviar para</span>
                  <span className="text-ink-strong">{address.city || "Maringá"}, {address.state || "PR"}</span>
                </div>
                <div className="flex items-center justify-between text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
                  <span>Email</span>
                  <span className="text-ink-strong">j****@icloud.com</span>
                </div>
              </div>

              <div className="border-t border-edge-subtle px-5 py-5">
                <div className="mb-3 flex flex-col items-center gap-2">
                  <motion.div
                    animate={walletConfirming ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, repeat: walletConfirming ? Infinity : 0 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: walletConfirming ? "rgba(34,197,94,0.18)" : "rgba(var(--foreground-rgb), 0.06)", border: "1px solid rgba(var(--foreground-rgb), 0.12)" }}
                  >
                    {walletConfirming ? (
                      <Loader2 size={22} className="animate-spin text-green-400" strokeWidth={2.4} />
                    ) : (
                      <Fingerprint size={22} strokeWidth={1.6} className="text-ink-strong" />
                    )}
                  </motion.div>
                  <p className="text-center text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                    {walletConfirming ? "Autenticando..." : "Pressione 2× no botão lateral pra confirmar"}
                  </p>
                </div>
                <button
                  onClick={handleWalletConfirm}
                  disabled={walletConfirming}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "#fff",
                    color: "#000",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                  }}
                >
                  <Apple size={16} strokeWidth={1.8} fill="currentColor" />
                  Pagar com Face ID
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {walletSheet === "google" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !walletConfirming && setWalletSheet(null)}
            className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 backdrop-blur-md p-0 md:items-center md:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Google Pay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[420px] max-h-[90vh] overflow-y-auto rounded-t-[20px] md:rounded-[var(--radius-card-lg)]"
              style={{
                background: "#fff",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center justify-between px-5 pb-3 pt-5">
                <div className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", fontWeight: 600, color: "#5f6368" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                    <path d="M22 11.4c0-.7-.06-1.4-.18-2.05H12v3.87h5.62c-.24 1.3-.97 2.4-2.06 3.13v2.6h3.33C20.83 17.2 22 14.55 22 11.4z" fill="#4285F4" />
                    <path d="M12 22c2.78 0 5.12-.92 6.83-2.5l-3.33-2.6c-.92.62-2.1.99-3.5.99-2.7 0-4.97-1.82-5.78-4.27H2.78v2.68C4.48 19.6 8 22 12 22z" fill="#34A853" />
                    <path d="M6.22 13.62c-.2-.62-.32-1.28-.32-1.96s.12-1.34.32-1.96V7.02H2.78A9.99 9.99 0 002 12c0 1.6.38 3.13 1.05 4.47l3.17-2.85z" fill="#FBBC05" />
                    <path d="M12 5.78c1.52 0 2.88.52 3.95 1.55l2.96-2.96C17.12 2.83 14.78 2 12 2 8 2 4.48 4.4 2.78 7.02l3.44 2.68C7.03 7.6 9.3 5.78 12 5.78z" fill="#EA4335" />
                  </svg>
                  Pay
                </div>
                <button onClick={() => !walletConfirming && setWalletSheet(null)} aria-label="Fechar Google Pay" className="text-[#5f6368] hover:bg-black/[0.06] rounded-full h-11 w-11 md:h-8 md:w-8 flex items-center justify-center">
                  <X size={16} />
                </button>
              </div>

              <div className="px-5 pb-2">
                <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", color: "#5f6368" }}>Pagando para</p>
                <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", fontWeight: 600, color: "#202124" }}>PCYES Gamer</p>
                <p className="mt-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "#202124", letterSpacing: "-0.02em" }}>
                  {formatBRL(total)}
                </p>
              </div>

              <div className="mt-4 mx-5 mb-5 rounded-card-sm border" style={{ borderColor: "#dadce0" }}>
                <button className="flex w-full items-center gap-3 p-4 text-left">
                  <div className="flex h-10 w-12 items-center justify-center rounded-[var(--radius-card)]" style={{ background: "#1a73e8" }}>
                    <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800, color: "#fff" }}>VISA</span>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 500, color: "#202124" }}>Visa •••• 4231</p>
                    <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "#5f6368" }}>Pagamento padrão</p>
                  </div>
                  <Check size={18} strokeWidth={2} className="text-[#1a73e8]" />
                </button>
              </div>

              <div className="bg-[#f8f9fa] px-5 py-4">
                <button
                  onClick={handleWalletConfirm}
                  disabled={walletConfirming}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "#1a73e8",
                    color: "#fff",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    boxShadow: "0 4px 14px -4px rgba(26,115,232,0.4)",
                  }}
                >
                  {walletConfirming ? <Loader2 size={16} className="animate-spin" /> : null}
                  {walletConfirming ? "Processando..." : "Pagar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {walletSheet === "mercadopago" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !walletConfirming && setWalletSheet(null)}
            className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 backdrop-blur-md p-0 md:items-center md:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Mercado Pago"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px] max-h-[90vh] overflow-y-auto rounded-t-[20px] md:rounded-[var(--radius-card-lg)]"
              style={{
                background: "#fff",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center justify-between px-5 py-4" style={{ background: "#FFF159" }}>
                <div className="inline-flex items-center gap-2" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", fontWeight: 800, color: "#009ee3" }}>
                  <svg width="22" height="16" viewBox="0 0 30 22" aria-hidden>
                    <ellipse cx="15" cy="11" rx="14" ry="9" fill="#009ee3" />
                    <path d="M9 12c1.5-2 4-3 6-3s4.5 1 6 3" stroke="#FFF159" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                  Mercado Pago
                </div>
                <button onClick={() => !walletConfirming && setWalletSheet(null)} aria-label="Fechar Mercado Pago" className="text-[#009ee3] hover:bg-black/[0.06] rounded-full h-11 w-11 md:h-8 md:w-8 flex items-center justify-center">
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 py-6">
                <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "#737373", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 700 }}>
                  Valor a pagar
                </p>
                <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-2xl)", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
                  {formatBRL(total)}
                </p>
                <p className="mt-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "#737373" }}>
                  PCYES Gamer · pedido #PCY{Math.floor(Math.random() * 90000 + 10000)}
                </p>

                <div className="mt-5 space-y-2">
                  <button className="flex w-full items-center gap-3 rounded-card-sm border p-3.5 text-left transition-colors hover:bg-[#f5f5f5]" style={{ borderColor: "#009ee3", background: "rgba(0,158,227,0.05)" }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#009ee3", color: "#fff", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 800 }}>
                      MP
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#1a1a1a" }}>Saldo Mercado Pago</p>
                      <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "#737373" }}>R$ 2.349,80 disponível</p>
                    </div>
                    <Check size={18} strokeWidth={2.4} className="text-[#009ee3]" />
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-card-sm border p-3.5 text-left transition-colors hover:bg-[#f5f5f5]" style={{ borderColor: "#dadce0" }}>
                    <div className="flex h-9 w-12 items-center justify-center rounded-[var(--radius-card)]" style={{ background: "#eb001b" }}>
                      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800, color: "#fff" }}>MC</span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, color: "#1a1a1a" }}>Mastercard •••• 8821</p>
                      <p style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "#737373" }}>Crédito</p>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleWalletConfirm}
                  disabled={walletConfirming}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "#009ee3",
                    color: "#fff",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    boxShadow: "0 8px 22px -8px rgba(0,158,227,0.55)",
                  }}
                >
                  {walletConfirming ? <Loader2 size={16} className="animate-spin" /> : <Lock size={14} strokeWidth={2.4} />}
                  {walletConfirming ? "Processando..." : "Pagar agora"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modais de saved address/card — disponíveis em todos os steps. */}
      <AddressFormModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSubmit={(data) => {
          addAddress(data);
          /* Auto-seleciona o recém-criado: useEffect default-pick não roda se já tem selectedAddressId.
             Marcar como pending pra seleção via setTimeout depois que setUser atualizar. */
          setTimeout(() => {
            if (user) {
              const latest = [...user.addresses].pop();
              if (latest) setSelectedAddressId(latest.id);
            }
          }, 0);
        }}
      />
      <CardFormModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSubmit={(data) => {
          addCard(data);
          setTimeout(() => {
            if (user) {
              const latest = [...user.cards].pop();
              if (latest) setSelectedCardId(latest.id);
            }
          }, 0);
        }}
      />
    </>
  );
}

type DetectedBrand = "visa" | "master" | "amex" | "elo" | "hiper";

function detectCardBrand(digits: string): DetectedBrand | null {
  if (digits.length < 1) return null;
  const first = digits[0];
  const first2 = digits.slice(0, 2);
  if (first === "4") return "visa";
  if (["51", "52", "53", "54", "55"].includes(first2) || (Number(first2) >= 22 && Number(first2) <= 27)) return "master";
  if (first2 === "34" || first2 === "37") return "amex";
  if (["40", "43", "44", "45", "63", "65", "50"].includes(first2)) return "elo";
  if (first === "6") return "hiper";
  return null;
}

/* Bandeiras mostradas no checkout, iguais no Asaas e no Mercado Pago. O MP também
   aceita Elo (o Checkout Transparente não tem exclusão no admin), mas o logo fica
   de fora por decisão da PCYES, para não incentivar. Com o número digitado, a
   reconhecida acende e as outras apagam. */
type BrandLogo = { key: DetectedBrand; src: string; label: string };
const ACCEPTED_BRANDS: BrandLogo[] = [
  { key: "visa", src: visaLogo, label: "Visa" },
  { key: "master", src: mastercardLogo, label: "Mastercard" },
  { key: "amex", src: amexLogo, label: "American Express" },
];

function AcceptedBrands({ active, brands = ACCEPTED_BRANDS }: { active: DetectedBrand | null; brands?: BrandLogo[] }) {
  return (
    <span className="inline-flex flex-shrink-0 items-center gap-1.5" aria-label={`Aceitamos ${brands.map((b) => b.label).join(", ")}`}>
      {brands.map((b) => (
        <img
          key={b.key}
          src={b.src}
          alt=""
          className="h-5 w-auto transition-opacity"
          style={{ opacity: active === null || active === b.key ? 1 : 0.25 }}
        />
      ))}
    </span>
  );
}

function formatDoc(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 11) return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return d.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
}

/* CPF/CNPJ pedido pelo Asaas em todo método: no cartão é o do titular, no Pix e
   no boleto é o do pagador. Um estado só, para não pedir duas vezes ao trocar. */
function PayerDocField({ label, hint, value, onChange, className }: { label: string; hint?: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <Field label={label} required className={className}>
      <input
        inputMode="numeric"
        value={value}
        placeholder="000.000.000-00"
        onChange={(e) => onChange(formatDoc(e.target.value))}
        className={`${inputClass} checkout-field`}
        style={inputStyle}
      />
      {hint && (
        <p className="mt-1.5 text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
          {hint}
        </p>
      )}
    </Field>
  );
}

function isValidDoc(value: string) {
  const n = value.replace(/\D/g, "").length;
  return n === 11 || n === 14;
}

function CardBrand({ digits }: { digits: string }) {
  const brand = detectCardBrand(digits);
  if (!brand) return null;

  const wrap = (children: React.ReactNode, bg: string) => (
    <span
      className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-11 items-center justify-center overflow-hidden"
      style={{ background: bg, borderRadius: "var(--radius)", boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.18), 0 4px 12px -4px rgba(0,0,0,0.5)" }}
      aria-label={`Bandeira ${brand}`}
    >
      {children}
    </span>
  );

  if (brand === "visa")
    return wrap(
      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em" }}>VISA</span>,
      "linear-gradient(135deg, #1a1f71 0%, #0f1450 100%)",
    );
  if (brand === "master")
    return wrap(
      <span className="relative inline-flex h-5 w-9 items-center justify-center">
        <span className="absolute left-0 inline-block h-5 w-5 rounded-full" style={{ background: "#eb001b" }} />
        <span className="absolute right-0 inline-block h-5 w-5 rounded-full" style={{ background: "#f79e1b" }} />
        <span className="absolute left-2 right-2 inline-block h-5 w-3" style={{ background: "#ff5f00" }} />
      </span>,
      "#fff",
    );
  if (brand === "amex")
    return wrap(
      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em", textAlign: "center", lineHeight: 1 }}>AMEX</span>,
      "linear-gradient(135deg, #2671b8 0%, #1a4d80 100%)",
    );
  if (brand === "elo")
    return wrap(
      <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 900, color: "#fff", letterSpacing: "0.02em" }}>elo</span>,
      "linear-gradient(135deg, #000 0%, #333 100%)",
    );
  return wrap(
    <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em" }}>HIPER</span>,
    "linear-gradient(135deg, #cc0000 0%, #7a0000 100%)",
  );
}


function NumberStepperRed({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max: number;
  step?: number;
}) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  return (
    <div
      className="pcyes-step-gold inline-flex items-stretch overflow-hidden"
      style={{
        borderRadius: "var(--radius-card-sm)",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(250,204,21,0.35)",
      }}
    >
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value.replace(/\D/g, "")) || 0))}
        aria-label="Quantidade de pontos"
        className="w-14 bg-transparent px-2 py-1 text-center text-ink-strong focus:outline-none"
        style={{
          fontFamily: "var(--font-family-figtree)",
          fontSize: "var(--text-base)",
          fontWeight: 800,
          letterSpacing: "-0.01em",
        }}
      />
      <div className="flex flex-col border-l" style={{ borderColor: "rgba(var(--foreground-rgb), 0.08)" }}>
        <button
          type="button"
          onClick={() => onChange(clamp(value + step))}
          aria-label="Aumentar"
          className="flex h-4 w-7 min-h-[24px] min-w-[44px] md:min-h-0 md:min-w-0 items-center justify-center transition-colors hover:bg-white/[0.08]"
          style={{ color: "#facc15" }}
        >
          <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
            <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="h-px" style={{ background: "rgba(var(--foreground-rgb), 0.08)" }} />
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          aria-label="Diminuir"
          className="flex h-4 w-7 min-h-[24px] min-w-[44px] md:min-h-0 md:min-w-0 items-center justify-center transition-colors hover:bg-white/[0.08]"
          style={{ color: "#facc15" }}
        >
          <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
