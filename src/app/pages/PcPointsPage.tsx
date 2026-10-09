import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { animate, AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Check,
  Gift,
  Heart,
  Hourglass,
  Instagram,
  Mail,
  MessageSquareText,
  ShieldCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Undo2,
  UserPlus,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { PcyesCoin } from "../components/PcyesCoin";
import { useAuth } from "../components/AuthContext";

const FIGTREE = "var(--font-family-figtree)";
const INTER = "var(--font-family-inter)";

/* Vermelho é a marca, ouro é o ponto — mesma regra do deck do programa
   (apresentacoes/pc-points). Tudo que é PC Points sai daqui. */
const GOLD = "#FACC15";
const GOLD_SOFT = "#FDE68A";
const GOLD_DEEP = "#B45309";
/* O mesmo degradê do "PC Points" do título: amarelo claro → ouro → âmbar.
   Botão, chip ativo e barras usam este, para o ouro ser um só na página. */
const GOLD_GRADIENT = "linear-gradient(115deg, #FDE68A 0%, #FACC15 42%, #F59E0B 100%)";

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const viewportOnce = { once: true, amount: 0.3 } as const;

const fmt = (n: number) => Math.floor(n).toLocaleString("pt-BR");
const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = (n: number) => `${n.toLocaleString("pt-BR")}%`;

/* ------------------------------ regras ------------------------------ */

/**
 * Regras do PC Points conforme "Regulamento do Programa de Fidelidade PCYES,
 * versão para o consumidor final" (Regulamento_PC_POINTS_Consumidor_Final.docx).
 *
 * NÃO são as regras de `lib/pcyesPoints.ts`: aquele arquivo é o modelo antigo
 * da v3 (cinco raridades, pontos por R$ 10, validade de 365 dias), desenhado
 * antes do regulamento. Até o perfil ser alinhado, esta página segue o
 * regulamento.
 *
 * O regulamento NÃO define (e por isso a página não promete):
 *  - quantos pontos sobem cada nível;
 *  - quanto vale 1 ponto em reais no resgate.
 */
interface Level {
  id: string;
  name: string;
  /** Pontos por R$ 1,00 em compras. */
  perReal: number;
  /** Teto do pedido que pode ser pago com pontos, em %. */
  cap: number;
  /** Cores da escada de raridade que o perfil já usa; o primeiro degrau,
      que a escada antiga não tinha, fica num cinza mais apagado que o Comum. */
  color: string;
}

const LEVELS: Level[] = [
  { id: "indique", name: "Indique e Ganhe", perReal: 1, cap: 5, color: "#64748b" },
  { id: "comum", name: "Comum", perReal: 1.2, cap: 8, color: "#94a3b8" },
  { id: "raro", name: "Raro", perReal: 1.5, cap: 10, color: "#38bdf8" },
  { id: "epico", name: "Épico", perReal: 2, cap: 12, color: "#a855f7" },
  { id: "lendario", name: "Lendário", perReal: 2.3, cap: 15, color: GOLD },
  { id: "mitico", name: "Mítico", perReal: 2.5, cap: 20, color: "#e10600" },
];


/** O exemplo do regulamento (seção 6): pedido de R$ 568,40 no Mítico, saldo de R$ 70. */
const EXAMPLE = { order: 568.4, balance: 70 };

/** O que o botão da missão faz: abrir o cadastro, sair para uma rede social ou
    ir a uma página da loja (que pede login antes, se precisar). Sem ação, a
    missão mostra só uma nota, porque não há para onde levar. */
type QuestAction =
  | { kind: "signup"; label: string }
  | { kind: "external"; label: string; href: string }
  | { kind: "account"; label: string; to: string }
  | { kind: "note"; label: string };

type Quest = {
  icon: typeof Star;
  title: string;
  detail: string;
  reward: string;
  action: QuestAction;
};

/* Mesmos endereços do rodapé (Footer.tsx, socialLinks). */
const INSTAGRAM = "https://www.instagram.com/pcyes";
const FACEBOOK = "https://www.facebook.com/PCYES";

const QUESTS: Quest[] = [
  {
    icon: UserPlus,
    title: "Criar sua conta",
    detail: "Ganha uma vez, ao se cadastrar.",
    reward: "+500",
    action: { kind: "signup", label: "Criar conta" },
  },
  {
    icon: Instagram,
    title: "Seguir a PCYES nas redes",
    detail: "Vale quando houver campanha ativa.",
    reward: "+100",
    action: { kind: "external", label: "Seguir no Instagram", href: INSTAGRAM },
  },
  {
    icon: Heart,
    title: "Curtir a página da PCYES",
    detail: "Vale quando houver campanha ativa.",
    reward: "+100",
    action: { kind: "external", label: "Curtir no Facebook", href: FACEBOOK },
  },
  {
    icon: Star,
    title: "Avaliar um produto que comprou",
    detail: "Até 3 por mês, de produtos diferentes. A avaliação fica pública no site.",
    reward: "+250",
    action: { kind: "account", label: "Avaliar minhas compras", to: "/perfil?tab=orders" },
  },
  {
    icon: MessageSquareText,
    title: "Responder a pesquisa pós-compra",
    detail: "A PCYES envia por e-mail depois que você compra.",
    reward: "+250",
    action: { kind: "note", label: "Chega no seu e-mail" },
  },
];

/* ------------------------------ moeda 3D ------------------------------ */

/**
 * A moeda do site (`PcyesCoin`) com espessura. Duas faces do mesmo SVG e uma
 * pilha de discos entre elas fazendo a borda: girando, ela mostra o canto
 * em vez de virar uma linha de 0px no meio da volta.
 */
function Coin3D({ size, style }: { size: number; style?: CSSProperties }) {
  const depth = Math.max(4, Math.round(size * 0.1));
  const layers = 9;

  return (
    <div className="relative" style={{ width: size, height: size, transformStyle: "preserve-3d", ...style }}>
      {Array.from({ length: layers }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute inset-[3%] rounded-full"
          style={{
            transform: `translateZ(${-depth / 2 + (i * depth) / (layers - 1)}px)`,
            background: i % 2 ? "#a16207" : "#92400e",
          }}
        />
      ))}
      <span className="absolute inset-0" style={{ transform: `translateZ(${depth / 2 + 0.5}px)` }}>
        <PcyesCoin size={size} />
      </span>
      <span className="absolute inset-0" style={{ transform: `rotateY(180deg) translateZ(${depth / 2 + 0.5}px)` }}>
        <PcyesCoin size={size} />
      </span>
    </div>
  );
}

/* ------------------------------ peças ------------------------------ */

function Eyebrow({ children, color = GOLD }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex w-fit items-center gap-2 uppercase"
      style={{ fontFamily: INTER, fontSize: "var(--text-caption)", letterSpacing: "0.28em", fontWeight: 700, color }}
    >
      <span className="h-px w-6" style={{ background: color, opacity: 0.6 }} />
      {children}
    </span>
  );
}

function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-5 text-ink-strong ${className}`}
      style={{
        fontFamily: FIGTREE,
        fontSize: "clamp(30px, 3.8vw, 52px)",
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.06,
      }}
    >
      {children}
    </h2>
  );
}

function Lede({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mt-5 text-ink-muted ${className}`} style={{ fontFamily: INTER, fontSize: "var(--text-base)", lineHeight: 1.7 }}>
      {children}
    </p>
  );
}

const goldText: CSSProperties = {
  background: GOLD_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/** Medalhão hexagonal do nível, mesma forma da régua de raridade do perfil. */
function LevelMedal({ level, index, size = 64 }: { level: Level; index: number; size?: number }) {
  /* id por instância: o mesmo medalhão aparece na escada e no simulador, e
     `url(#id)` repetido pinta todos com o primeiro (ver PcyesCoin). */
  const gradId = `medal-${level.id}-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={level.color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={level.color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill={`url(#${gradId})`} stroke={level.color} strokeWidth="1.5" />
      <path d="M32 11 50 21.5v21L32 53 14 42.5v-21Z" fill="#0a0a0a" opacity="0.6" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-family-figtree), system-ui, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="#fff"
      >
        {index + 1}
      </text>
    </svg>
  );
}

/* ------------------------------ hero ------------------------------ */

/* A arte (img-pc-points-robot, 1536×1024) já traz a moeda no ar. Por cima
   dela vai só o que a imagem não faz: o brilho da moeda pulsando, faíscas
   subindo e o "+pts" que sai dela a cada pulso.
   Tudo posicionado em % da arte, por isso a caixa mantém 3:2 em qualquer
   tela e só o corte (overflow) muda. */
const COIN_AT = { x: "53.5%", y: "16.5%" };
const PULSE_MS = 2800;
/* Valores das missões, em rodízio, no "+pts" que sai da moeda. */
const GAINS = [250, 100, 500, 100];

const SPARKS = [
  { x: -38, y: 30, d: 0 },
  { x: 26, y: 46, d: 0.7 },
  { x: -12, y: 58, d: 1.3 },
  { x: 44, y: 18, d: 1.9 },
  { x: -52, y: -6, d: 2.4 },
];

function useCycle(ms: number) {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), ms);
    return () => window.clearInterval(id);
  }, [reduce, ms]);
  return { cycle, reduce };
}

function HeroArt({ cycle, reduce, showGains }: { cycle: number; reduce: boolean | null; showGains: boolean }) {
  const gain = GAINS[(cycle - 1 + GAINS.length) % GAINS.length];

  return (
    <div className="relative h-full w-full">
      <img
        src="/pontos/pc-points-robo.webp"
        srcSet="/pontos/pc-points-robo-1024.webp 1024w, /pontos/pc-points-robo.webp 1536w"
        sizes="(min-width: 1024px) 90vw, 160vw"
        alt="Mascote da PCYES jogando uma moeda PC Points para o alto com o polegar"
        width={1536}
        height={1024}
        {...{ fetchpriority: "high" }}
        className="absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
      />

      {/* funde a arte no fundo da página: esquerda (texto), topo (menu) e base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, var(--surface-0) 0%, var(--surface-0) 14%, transparent 42%),
                       linear-gradient(to bottom, var(--surface-0) 0%, transparent 12%, transparent 80%, var(--surface-0) 100%)`,
        }}
      />

      <div className="pointer-events-none absolute" style={{ left: COIN_AT.x, top: COIN_AT.y }}>
        {/* brilho da moeda respirando */}
        <motion.span
          aria-hidden
          className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "clamp(140px, 16vw, 260px)",
            height: "clamp(140px, 16vw, 260px)",
            background: "radial-gradient(closest-side, rgba(250,204,21,0.38), rgba(245,158,11,0.12) 55%, transparent)",
            mixBlendMode: "screen",
          }}
          animate={reduce ? undefined : { scale: [0.85, 1.12, 0.85], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: PULSE_MS / 1000, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduce &&
          SPARKS.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute block h-1 w-1 rounded-full"
              style={{ background: GOLD_SOFT, boxShadow: `0 0 8px ${GOLD}` }}
              initial={{ x: s.x, y: s.y, opacity: 0 }}
              animate={{ y: [s.y, s.y - 70], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: s.d, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

        <AnimatePresence>
          {!reduce && showGains && cycle > 0 && (
            <motion.span
              key={`plus-${cycle}`}
              className="absolute left-0 top-0 whitespace-nowrap"
              initial={{ opacity: 0, x: "-50%", y: -30 }}
              animate={{ opacity: [0, 1, 1, 0], y: -90 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 20, color: GOLD, textShadow: "0 0 18px rgba(250,204,21,0.6)" }}
            >
              +{gain} pts
            </motion.span>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

/* ------------------------------ página ------------------------------ */

export function PcPointsPage() {
  const { isLoggedIn, setAuthModalOpen, setAuthModalTab } = useAuth();
  /* Um relógio só para as duas cópias da arte (desktop e mobile). */
  const { cycle, reduce } = useCycle(PULSE_MS);

  const openSignup = () => {
    setAuthModalTab("register");
    setAuthModalOpen(true);
  };

  const ctaClass =
    "group relative inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[#1a1200] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-2px_0_rgba(146,64,14,0.35),0_22px_48px_-12px_rgba(245,158,11,0.7)] active:scale-[0.98] md:w-auto";
  const ctaStyle: CSSProperties = {
    fontFamily: INTER,
    fontSize: "var(--text-sm)",
    fontWeight: 800,
    background: GOLD_GRADIENT,
    /* luz em cima, sombra âmbar embaixo: dá volume de moeda ao botão */
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(146,64,14,0.35), 0 16px 40px -14px rgba(245,158,11,0.6)",
  };
  /* Brilho que atravessa o botão no hover, como o reflexo da moeda. */
  const ctaSheen = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
    />
  );
  const ctaArrow = <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />;

  const primaryCta = isLoggedIn ? (
    <Link to="/perfil?tab=points" className={ctaClass} style={ctaStyle}>
      {ctaSheen}
      <span className="relative">Ver meus pontos</span>
      {ctaArrow}
    </Link>
  ) : (
    <button type="button" onClick={openSignup} className={ctaClass} style={ctaStyle}>
      {ctaSheen}
      <span className="relative">Criar conta e ganhar 500 pts</span>
      {ctaArrow}
    </button>
  );

  /* "Como funciona" desliza até a seção em vez de pular. Curva própria (sai
     devagar, acelera, pousa devagar): o `behavior: smooth` do navegador é
     rápido demais e cada navegador usa uma curva. */
  const scrollToHow = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("como-funciona");
    if (!target) return;
    e.preventDefault();
    const to = target.getBoundingClientRect().top + window.scrollY - 96;
    if (reduce) {
      window.scrollTo(0, to);
      return;
    }
    const from = window.scrollY;
    const distance = Math.abs(to - from);
    animate(from, to, {
      duration: Math.min(1.6, 0.7 + distance / 2200),
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => window.scrollTo(0, v),
    });
  };

  /* Parallax do hero: a arte desce mais devagar que a página e o texto some
     um pouco antes, dando profundidade ao sair do topo. */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <SEO
        title="PC Points"
        description="PC Points, o programa de fidelidade da PCYES: ganhe pontos em compras e ações, evolua de nível e use os pontos para pagar até 20% do pedido."
        canonicalPath="/pc-points/"
      />

      {/* ============================== HERO ============================== */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
        {/* desktop: a arte ocupa a direita, do menu até a base do hero */}
        <motion.div
          className="absolute bottom-0 right-0 top-[120px] hidden aspect-[3/2] lg:block"
          style={{ y: reduce ? 0 : artY }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroArt cycle={cycle} reduce={reduce} showGains />
        </motion.div>

        {/* mobile: a mesma caixa 3:2, maior que a tela e cortada à esquerda */}
        <div className="relative mt-[118px] h-[min(104vw,520px)] overflow-hidden lg:hidden">
          <div className="absolute right-[-16%] top-0 aspect-[3/2] h-full">
            <HeroArt cycle={cycle} reduce={reduce} showGains={false} />
          </div>
        </div>

        <div className="relative mx-auto -mt-16 max-w-[1434px] px-5 pb-20 md:px-12 lg:mt-0 lg:flex lg:min-h-[min(100svh,940px)] lg:items-center lg:pb-24 lg:pt-[170px]">
            <motion.div
              initial="hidden"
              animate="show"
              className="relative flex max-w-[640px] flex-col"
              style={reduce ? undefined : { y: textY, opacity: textOpacity }}
            >
              <motion.div variants={reveal} custom={0}>
                <Eyebrow>PC Points · programa de fidelidade da PCYES</Eyebrow>
              </motion.div>

              <motion.h1
                variants={reveal}
                custom={1}
                className="mt-6 max-w-[15ch] text-ink-strong"
                style={{ fontFamily: FIGTREE, fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.0 }}
              >
                Compre, junte pontos e <span style={goldText}>pague menos</span> na próxima.
              </motion.h1>

              <motion.p
                variants={reveal}
                custom={2}
                className="mt-6 max-w-[46ch] text-ink-muted"
                style={{ fontFamily: INTER, fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.65 }}
              >
                O PC Points é o programa de fidelidade da PCYES. Cada compra na loja rende pontos, e você usa esses
                pontos para pagar uma parte das próximas compras. É grátis e começa quando você cria sua conta.
              </motion.p>

              <motion.div variants={reveal} custom={3} className="mt-9 flex flex-wrap items-center gap-3">
                {primaryCta}
                <a
                  href="#como-funciona"
                  onClick={scrollToHow}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-edge bg-white/[0.03] px-7 py-3.5 text-ink transition-colors duration-300 hover:border-edge-strong hover:text-ink-strong md:w-auto"
                  style={{ fontFamily: INTER, fontSize: "var(--text-sm)", fontWeight: 700 }}
                >
                  Como funciona
                </a>
              </motion.div>

              <motion.dl variants={reveal} custom={4} className="mt-12 grid max-w-[540px] grid-cols-3 gap-6 border-t border-edge pt-6">
                {[
                  ["500 pts", "ao criar a conta"],
                  ["6 níveis", "quanto mais alto, mais pontos"],
                  ["até 20%", "da compra paga com pontos"],
                ].map(([value, label]) => (
                  <div key={value} className="flex flex-col gap-1">
                    <dt className="sr-only">{label}</dt>
                    <dd style={{ fontFamily: FIGTREE, fontWeight: 700, fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: "-0.02em", color: GOLD }}>
                      {value}
                    </dd>
                    <dd className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 13, lineHeight: 1.4 }}>
                      {label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>
        </div>
      </section>

      {/* ============================ COMO FUNCIONA ============================ */}
      <section id="como-funciona" className="relative scroll-mt-24" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-28">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Eyebrow>Passo a passo</Eyebrow>
            <SectionTitle className="max-w-[20ch]">Como o PC Points funciona</SectionTitle>
          </motion.div>

          <HowItWorks />
        </div>
      </section>

      {/* ============================== NÍVEIS ============================== */}
      <section className="relative" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-28">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-[680px]">
            <Eyebrow>Níveis</Eyebrow>
            <SectionTitle>Os 6 níveis do PC Points</SectionTitle>
            <Lede>
              O nível muda duas coisas: quantos pontos você ganha a cada R$ 1 gasto e quanto de uma compra você
              pode pagar com pontos. Você sobe de nível conforme compra e participa do programa, e acompanha o seu
              na área da conta. Pontos que vencem não fazem você descer de nível.
            </Lede>
          </motion.div>

          <LevelStairs />
        </div>
      </section>

      {/* ============================ CALCULADORA ============================ */}
      <section className="relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-28">
          <OrderCalculator />
        </div>
      </section>

      {/* ============================== RESGATE ============================== */}
      <section className="relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-28">
          <RedeemRule />
        </div>
      </section>

      {/* ============================== MISSÕES ============================== */}
      <section className="relative" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-28">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-[640px]">
            <Eyebrow>Pontos extras</Eyebrow>
            <SectionTitle>Outras formas de ganhar pontos</SectionTitle>
          </motion.div>

          <Quests />
        </div>
      </section>

      {/* ============================== REGRAS ============================== */}
      <section className="relative" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-28">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-[640px]">
            <Eyebrow color="var(--ink-muted)">Regras</Eyebrow>
            <SectionTitle>O que você precisa saber</SectionTitle>
          </motion.div>

          <Rules />
        </div>
      </section>

      {/* ============================== CTA FINAL ============================== */}
      <section className="relative overflow-hidden" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 pb-24 md:px-12 md:pb-32">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-card-xl border px-6 py-14 text-center md:px-16 md:py-20"
            style={{
              borderColor: "rgba(250,204,21,0.22)",
              background: "radial-gradient(70% 90% at 50% 0%, rgba(250,204,21,0.14), transparent 70%), rgba(255,255,255,0.02)",
            }}
          >
            <div className="mx-auto mb-8 flex w-fit items-end justify-center" style={{ perspective: 600 }}>
              <CoinStack />
            </div>
            <h2
              className="mx-auto max-w-[18ch] text-ink-strong"
              style={{ fontFamily: FIGTREE, fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.08 }}
            >
              {isLoggedIn ? (
                "Veja seus pontos e o seu nível."
              ) : (
                <>
                  Crie sua conta e ganhe <span style={goldText}>500 pontos</span>.
                </>
              )}
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-ink-muted" style={{ fontFamily: INTER, fontSize: "var(--text-base)", lineHeight: 1.6 }}>
              {isLoggedIn
                ? "Na sua conta você vê o saldo, os pontos a liberar e os que estão perto de vencer."
                : "Os 500 pontos entram quando você se cadastra. Depois disso, cada compra soma mais pontos."}
            </p>
            <div className="mt-9 flex justify-center">{primaryCta}</div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ------------------------------ seções ------------------------------ */

const STEPS = [
  { icon: ShoppingBag, title: "Compre", body: "Cada R$ 1 gasto na loja da PCYES vira pontos: de 1 a 2,5 pontos por real, conforme o seu nível." },
  { icon: Hourglass, title: "Receba", body: "Os pontos entram na sua conta 30 dias depois da compra. A partir daí, valem por 6 meses." },
  { icon: TrendingUp, title: "Suba de nível", body: "Quanto mais você compra e participa, mais alto fica o seu nível. Nível mais alto dá mais pontos." },
  { icon: Wallet, title: "Use como desconto", body: "Na hora de pagar uma nova compra, escolha usar seus pontos. Eles abatem parte do valor." },
];

/**
 * A moeda percorre as quatro etapas e para em cada uma. Ao chegar, a etapa
 * acende (anel, brilho e uma onda que se abre) e o trilho atrás dela fica
 * dourado; as já visitadas seguem acesas mais fracas. Depois da última, a
 * moeda some e volta ao começo.
 *
 * Um único `active` comanda tudo, e o relógio só anda com a seção na tela.
 */
const STOP_MS = 2700;
const TRAVEL = { duration: 1.5, ease: [0.45, 0, 0.25, 1] } as const;

function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(reduce ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), STOP_MS);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  const last = STEPS.length - 1;
  const restarting = active === 0;

  return (
    <div ref={ref} className="relative mt-14">
      <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[34px] hidden md:block">
        {/* trilho apagado */}
        <div
          className="h-px w-full"
          style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.22) 50%, transparent 50%)`, backgroundSize: "8px 1px" }}
        />
        {/* trilho percorrido */}
        <motion.div
          className="absolute left-0 top-[-1px] h-[3px] origin-left rounded-full"
          style={{ width: "100%", background: `linear-gradient(to right, ${GOLD_DEEP}, ${GOLD})`, boxShadow: `0 0 12px rgba(250,204,21,0.55)` }}
          animate={{ scaleX: active / last }}
          transition={restarting ? { duration: 0.5, ease: "easeOut" } : TRAVEL}
        />
        {/* a moeda */}
        {!reduce && (
          <motion.div
            className="absolute top-0"
            animate={{ left: `${(active / last) * 100}%`, opacity: restarting ? [0, 1] : 1 }}
            transition={restarting ? { left: { duration: 0 }, opacity: { duration: 0.5, delay: 0.25 } } : TRAVEL}
            style={{ x: "-50%", y: "-50%", perspective: 400 }}
          >
            {/* Rola, não gira de perfil: uma volta no próprio plano (horário,
                o sentido de quem anda para a direita), inclinando um pouco
                para a frente na saída e voltando na chegada. A face fica
                sempre virada para quem lê; girar em Y deixava a moeda um
                risco de 2px no meio da volta. */}
            <motion.div
              key={active}
              initial={{ rotate: 0, rotateY: 0, y: 0 }}
              animate={
                restarting
                  ? { rotate: 0, rotateY: 0, y: 0 }
                  : { rotate: 360, rotateY: [0, -28, -28, 0], y: [0, -8, 0] }
              }
              transition={{
                ...TRAVEL,
                rotateY: { duration: TRAVEL.duration, times: [0, 0.25, 0.75, 1], ease: "easeInOut" },
                y: { duration: TRAVEL.duration, times: [0, 0.5, 1], ease: ["easeOut", "easeIn"] },
              }}
              style={{ transformStyle: "preserve-3d", filter: "drop-shadow(0 0 10px rgba(250,204,21,0.6))" }}
            >
              <Coin3D size={30} />
            </motion.div>
          </motion.div>
        )}
      </div>

      <ol className="grid gap-9 md:grid-cols-4 md:gap-6">
        {STEPS.map((step, i) => {
          const isOn = i === active;
          const visited = i < active;
          return (
            <motion.li
              key={step.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              custom={i}
              className="relative grid grid-cols-[56px_1fr] items-start gap-x-5 md:flex md:flex-col md:items-center md:text-center"
            >
              <div className="relative z-10 h-14 w-14 md:h-[68px] md:w-[68px]">
                {/* onda que se abre quando a moeda chega */}
                <AnimatePresence>
                  {isOn && !reduce && (
                    <motion.span
                      key={`wave-${active}`}
                      aria-hidden
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: GOLD }}
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, delay: restarting ? 0.5 : TRAVEL.duration - 0.25, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  className="relative flex h-full w-full items-center justify-center rounded-full border"
                  animate={{
                    borderColor: isOn ? GOLD : visited ? "rgba(250,204,21,0.45)" : "rgba(255,255,255,0.14)",
                    backgroundColor: isOn ? "#1c1606" : "#0f0f0f",
                    boxShadow: isOn
                      ? "0 0 0 8px var(--surface-0), 0 0 44px 4px rgba(250,204,21,0.45)"
                      : "0 0 0 8px var(--surface-0), 0 0 0px 0px rgba(250,204,21,0)",
                    scale: isOn ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.6, delay: isOn && !restarting ? TRAVEL.duration - 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    animate={{ color: isOn ? GOLD : visited ? "rgba(250,204,21,0.7)" : "rgba(255,255,255,0.45)" }}
                    transition={{ duration: 0.5, delay: isOn && !restarting ? TRAVEL.duration - 0.3 : 0 }}
                    className="flex"
                  >
                    <step.icon size={26} strokeWidth={1.75} />
                  </motion.span>
                </motion.div>
              </div>
              <div className="md:contents">
                <motion.span
                  className="block tabular-nums md:mt-6"
                  animate={{ color: isOn || visited ? GOLD : "rgba(255,255,255,0.4)" }}
                  transition={{ duration: 0.5 }}
                  style={{ fontFamily: INTER, fontSize: 12, letterSpacing: "0.2em", fontWeight: 700 }}
                >
                  0{i + 1}
                </motion.span>
                <motion.h3
                  className="mt-2"
                  animate={{ color: isOn ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                  transition={{ duration: 0.5 }}
                  style={{ fontFamily: FIGTREE, fontSize: "clamp(22px, 2.2vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </motion.h3>
                <p className="mt-3 max-w-[30ch] text-ink-muted" style={{ fontFamily: INTER, fontSize: "var(--text-base)", lineHeight: 1.65 }}>
                  {step.body}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Escada de 6 degraus: a altura de cada coluna é o teto de resgate do nível,
 * então a forma da escada É o dado. A moeda sobe pelos degraus quando a
 * seção entra na tela.
 */
function LevelStairs() {
  const reduce = useReducedMotion();
  const maxCap = LEVELS[LEVELS.length - 1].cap;

  return (
    <div className="mt-14 -mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:overflow-visible md:px-0">
      <ol className="grid min-w-[860px] grid-cols-6 items-end gap-3">
        {LEVELS.map((level, i) => (
          <motion.li
            key={level.id}
            className="relative flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex flex-col items-center gap-3 text-center">
              <LevelMedal level={level} index={i} size={48} />
              <h3 className="text-ink-strong" style={{ fontFamily: FIGTREE, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {level.name}
              </h3>
            </div>

            <motion.div
              className="relative flex flex-col items-center justify-end overflow-hidden rounded-t-card-md border border-b-0 px-4 pb-5 pt-4 text-center"
              style={{
                height: 120 + (level.cap / maxCap) * 220,
                borderColor: `${level.color}55`,
                background: `linear-gradient(to bottom, ${level.color}2e, ${level.color}08 70%)`,
                transformOrigin: "bottom",
              }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: level.color }} />
              <span className="tabular-nums" style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 34, letterSpacing: "-0.03em", color: level.color, lineHeight: 1 }}>
                {pct(level.cap)}
              </span>
              <span className="mt-1 text-ink-muted" style={{ fontFamily: INTER, fontSize: 12, lineHeight: 1.35 }}>
                da compra pode ser paga com pontos
              </span>
              <span className="mt-4 border-t border-white/[0.08] pt-3 tabular-nums text-ink-strong" style={{ fontFamily: INTER, fontSize: 14, fontWeight: 700 }}>
                {level.perReal.toLocaleString("pt-BR")} pt{level.perReal === 1 ? "" : "s"}
                <span className="font-normal text-ink-muted"> a cada R$ 1</span>
              </span>
            </motion.div>
          </motion.li>
        ))}
      </ol>
      <div className="h-px min-w-[860px] bg-white/[0.12]" />
    </div>
  );
}

const PRESETS = [200, 568.4, 1500, 4000];

/** Pedido × nível: quantos pontos o pedido rende e quanto dele dá pra pagar com pontos. */
function OrderCalculator() {
  const [amount, setAmount] = useState(568.4);
  const [levelIdx, setLevelIdx] = useState(1);
  const level = LEVELS[levelIdx];
  const earned = Math.floor(amount * level.perReal);
  const maxRedeem = (amount * level.cap) / 100;
  const MIN = 50;
  const MAX = 6000;

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce} className="lg:sticky lg:top-40">
        <Eyebrow>Simulador</Eyebrow>
        <SectionTitle className="max-w-[16ch]">Faça a conta com a sua compra</SectionTitle>
        <Lede className="max-w-[44ch]">
          Escolha o valor da compra e o seu nível. O simulador mostra duas coisas: quantos pontos essa compra te
          dá e qual o desconto máximo que você poderia usar nela com pontos que já tem.
        </Lede>
      </motion.div>

      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        custom={1}
        className="rounded-card-lg border border-edge bg-white/[0.02] p-6 md:p-10"
      >
        <label htmlFor="pp-amount" className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600 }}>
          Valor da compra
        </label>
        <div
          className="mt-2 tabular-nums text-ink-strong"
          style={{ fontFamily: FIGTREE, fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          <AnimatedBRL value={amount} />
        </div>

        <input
          id="pp-amount"
          type="range"
          min={MIN}
          max={MAX}
          step={10}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="pp-range mt-6 w-full"
          style={{ ["--pp-fill" as string]: `${((amount - MIN) / (MAX - MIN)) * 100}%` }}
        />
        {/* Trilho com o trecho percorrido em ouro: `accentColor`, que o
            carrinho usa, não pinta o trilho no Firefox nem no Safari. */}
        <style>{`
          .pp-range { -webkit-appearance: none; appearance: none; height: 28px; background: transparent; cursor: pointer; }
          .pp-range::-webkit-slider-runnable-track { height: 6px; border-radius: 999px;
            background: linear-gradient(to right, ${GOLD_DEEP}, ${GOLD} var(--pp-fill), rgba(255,255,255,0.1) var(--pp-fill)); }
          .pp-range::-moz-range-track { height: 6px; border-radius: 999px; background: rgba(255,255,255,0.1); }
          .pp-range::-moz-range-progress { height: 6px; border-radius: 999px; background: linear-gradient(to right, ${GOLD_DEEP}, ${GOLD}); }
          .pp-range::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; margin-top: -9px; border-radius: 999px;
            background: radial-gradient(circle at 35% 30%, ${GOLD_SOFT}, ${GOLD} 50%, ${GOLD_DEEP}); border: 2px solid #92400e;
            box-shadow: 0 0 0 6px rgba(250,204,21,0.15), 0 6px 16px rgba(0,0,0,0.5); }
          .pp-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 999px;
            background: radial-gradient(circle at 35% 30%, ${GOLD_SOFT}, ${GOLD} 50%, ${GOLD_DEEP}); border: 2px solid #92400e; }
          .pp-range:focus-visible { outline: none; }
          .pp-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px rgba(250,204,21,0.55); }
        `}</style>

        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const on = amount === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(p)}
                className={`min-h-[36px] cursor-pointer rounded-full border px-4 text-sm transition-colors ${on ? "text-[#1a1200]" : "border-edge text-ink hover:border-edge-strong"}`}
                style={{ fontFamily: INTER, fontWeight: 600, ...(on ? { background: GOLD_GRADIENT, borderColor: "transparent" } : {}) }}
              >
                {brl(p)}
              </button>
            );
          })}
        </div>

        <fieldset className="mt-8">
          <legend className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600 }}>
            Seu nível
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {LEVELS.map((l, i) => {
              const on = i === levelIdx;
              return (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setLevelIdx(i)}
                  className="flex min-h-[44px] cursor-pointer flex-col items-center justify-center gap-1 rounded-card-sm border px-1 py-2 text-center transition-colors"
                  style={{
                    borderColor: on ? l.color : "var(--edge)",
                    background: on ? `${l.color}22` : "transparent",
                  }}
                >
                  <LevelMedal level={l} index={i} size={26} />
                  <span className={on ? "text-ink-strong" : "text-ink"} style={{ fontFamily: INTER, fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
                    {l.name}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 grid gap-px overflow-hidden rounded-card-md border border-edge bg-white/[0.06] sm:grid-cols-2">
          <div className="flex flex-col gap-1 bg-[#0d0d0d] p-5">
            <span className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 13 }}>
              Pontos que você ganha
            </span>
            <span className="flex items-center gap-2 tabular-nums" style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 30, color: GOLD, letterSpacing: "-0.02em" }}>
              <PcyesCoin size={24} />
              <AnimatedNumber value={earned} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>pts</span>
            </span>
            <span className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 12 }}>
              entram na sua conta 30 dias depois
            </span>
          </div>
          <div className="flex flex-col gap-1 bg-[#0d0d0d] p-5">
            <span className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 13 }}>
              Desconto máximo com pontos
            </span>
            <span className="tabular-nums text-ink-strong" style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em" }}>
              <AnimatedBRL value={maxRedeem} />
            </span>
            <span className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 12 }}>
              {pct(level.cap)} da compra, se você tiver pontos suficientes
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * "Vale sempre o menor dos dois limites" (regulamento, seção 5).
 *
 * Toda barra é a compra inteira (R$ 568,40, o exemplo do regulamento), na
 * mesma escala, com o limite de 20% do Mítico marcado por uma linha vermelha
 * que atravessa as três. Linha 1: até onde o nível deixa ir. Linha 2: até onde
 * os pontos chegam. Linha 3: o que acontece com a compra.
 *
 * Duas situações para alternar, porque a regra só fica óbvia vendo os dois
 * lados: pontos abaixo do limite (R$ 70, o caso do regulamento) e pontos
 * acima (R$ 150, derivado), quando a barra dourada passa da linha e é cortada.
 */
const SCENARIOS = [
  { id: "menos", tab: "Pontos abaixo do limite", balance: EXAMPLE.balance },
  { id: "mais", tab: "Pontos acima do limite", balance: 150 },
];

function RedeemRule() {
  const reduce = useReducedMotion();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const { balance } = SCENARIOS[scenarioIdx];
  const mitico = LEVELS[LEVELS.length - 1];
  const order = EXAMPLE.order;
  const cap = (order * mitico.cap) / 100;
  const used = Math.min(cap, balance);
  const leftover = balance - used;
  const rest = order - used;
  const w = (v: number) => `${(v / order) * 100}%`;
  const capAt = w(cap);
  const limitedByLevel = balance > cap;

  const bar = { duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] } as const;
  const rowLabel = "flex items-baseline justify-between gap-4";
  const labelText: CSSProperties = { fontFamily: INTER, fontSize: 14 };
  const valueText: CSSProperties = { fontFamily: FIGTREE, fontWeight: 700, fontSize: 18 };
  const track = "relative mt-2 h-7 overflow-hidden rounded-md bg-white/[0.06]";

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <Eyebrow>Usando os pontos</Eyebrow>
        <SectionTitle className="max-w-[18ch]">Quanto dos meus pontos posso usar em uma compra?</SectionTitle>
        <Lede className="max-w-[46ch]">
          Existem dois limites, e vale o menor deles. O primeiro é o limite do seu nível: uma porcentagem do
          valor da compra. O segundo são os pontos que você tem: não dá para usar mais do que o seu saldo.
        </Lede>
        <p className="mt-4 text-ink-muted" style={{ fontFamily: INTER, fontSize: 14, lineHeight: 1.6 }}>
          Atenção: os 20% do nível Mítico não são um desconto automático. É o máximo da compra que você pode pagar
          com pontos. Pontos também não podem ser trocados por dinheiro.
        </p>
      </motion.div>

      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        custom={1}
        className="rounded-card-lg border border-edge bg-white/[0.02] p-6 md:p-10"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-ink-muted" style={{ fontFamily: INTER, fontSize: 14 }}>
            Exemplo: compra no nível Mítico
          </span>
          <span className="tabular-nums text-ink-strong" style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em" }}>
            {brl(order)}
          </span>
        </div>

        <div role="tablist" aria-label="Situação do exemplo" className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-edge p-1">
          {SCENARIOS.map((sc, i) => {
            const on = i === scenarioIdx;
            return (
              <button
                key={sc.id}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setScenarioIdx(i)}
                className="relative min-h-[40px] cursor-pointer rounded-full px-3 text-center"
                style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700 }}
              >
                {on && (
                  <motion.span
                    layoutId="redeem-tab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: GOLD_GRADIENT }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={`relative ${on ? "text-[#1a1200]" : "text-ink"}`}>{sc.tab}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-8">

          {/* A linha do limite se repete dentro de cada barra (e não atravessa
              o bloco todo) para não riscar os rótulos entre elas. */}
          <div className="flex flex-col gap-7">
            {/* 1. limite do nível */}
            <div>
              <div className={rowLabel}>
                <span className="text-ink" style={labelText}>
                  <b className="mr-1.5" style={{ color: mitico.color }}>1</b>Limite do nível: {pct(mitico.cap)} da compra
                </span>
                <span className="tabular-nums" style={{ ...valueText, color: mitico.color }}>
                  {brl(cap)}
                </span>
              </div>
              <div className={track}>
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ width: capAt, background: `repeating-linear-gradient(135deg, ${mitico.color}55 0 6px, ${mitico.color}22 6px 12px)`, transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ ...bar, delay: reduce ? 0 : 0.2 }}
                />
                <span aria-hidden className="absolute inset-y-0 z-10 w-0 border-l-2 border-dashed" style={{ left: capAt, borderColor: mitico.color }} />
              </div>
            </div>

            {/* 2. quanto valem os pontos */}
            <div>
              <div className={rowLabel}>
                <span className="text-ink" style={labelText}>
                  <b className="mr-1.5" style={{ color: GOLD }}>2</b>Quanto valem os seus pontos
                </span>
                <span className="tabular-nums" style={{ ...valueText, color: GOLD }}>
                  <AnimatedBRL value={balance} />
                </span>
              </div>
              <div className={track}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-r-md"
                  style={{ background: GOLD_GRADIENT }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: w(balance) }}
                  animate={{ width: w(balance) }}
                  viewport={viewportOnce}
                  transition={{ ...bar, delay: reduce ? 0 : 0.35 }}
                />
                {/* o pedaço que passa do limite fica riscado: não pode ser usado */}
                <AnimatePresence>
                  {limitedByLevel && (
                    <motion.div
                      className="absolute inset-y-0"
                      style={{ left: capAt, width: w(leftover), background: "repeating-linear-gradient(135deg, rgba(10,10,10,0.75) 0 5px, rgba(10,10,10,0.35) 5px 10px)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: reduce ? 0 : 0.6 }}
                    />
                  )}
                </AnimatePresence>
                <span aria-hidden className="absolute inset-y-0 z-10 w-0 border-l-2 border-dashed" style={{ left: capAt, borderColor: mitico.color }} />
              </div>
            </div>

            {/* 3. resultado */}
            <div>
              <div className={rowLabel}>
                <span className="text-ink-strong" style={{ ...labelText, fontWeight: 700 }}>
                  <b className="mr-1.5 text-ink-strong">3</b>Como a compra fica
                </span>
              </div>
              <div className="relative mt-2 flex h-11 overflow-hidden rounded-md">
                <motion.div
                  className="flex h-full shrink-0 items-center justify-center"
                  style={{ background: GOLD_GRADIENT }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: w(used) }}
                  animate={{ width: w(used) }}
                  viewport={viewportOnce}
                  transition={{ ...bar, delay: reduce ? 0 : 0.6 }}
                >
                  <PcyesCoin size={20} />
                </motion.div>
                <span aria-hidden className="absolute inset-y-0 z-10 w-0 border-l-2 border-dashed" style={{ left: capAt, borderColor: mitico.color }} />
                <div className="flex h-full flex-1 items-center justify-end bg-white/[0.12] px-3">
                  <span className="tabular-nums text-ink-strong" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700 }}>
                    <AnimatedBRL value={rest} /> <span className="font-normal text-ink-muted">você paga</span>
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2" style={{ fontFamily: INTER, fontSize: 13 }}>
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: GOLD_GRADIENT }} />
                <span className="text-ink">
                  <b className="tabular-nums" style={{ color: GOLD }}>
                    <AnimatedBRL value={used} />
                  </b>{" "}
                  pagos com pontos
                </span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={scenarioIdx}
            className="mt-8 rounded-card-md border p-4 text-ink"
            style={{ fontFamily: INTER, fontSize: 14, lineHeight: 1.6, borderColor: "rgba(250,204,21,0.3)", background: "rgba(250,204,21,0.05)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {limitedByLevel ? (
              <>
                Seus pontos valem <b>{brl(balance)}</b>, mas o nível só deixa usar até <b>{brl(cap)}</b> nesta compra.
                Você usa {brl(cap)} e os outros <b>{brl(leftover)}</b> continuam guardados para a próxima.
              </>
            ) : (
              <>
                O nível deixaria usar até <b>{brl(cap)}</b>, mas seus pontos valem <b>{brl(balance)}</b>. Você usa todos
                eles e paga o resto, <b>{brl(rest)}</b>, normalmente.
              </>
            )}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/** Valor em reais que corre até o novo número em vez de trocar de uma vez. */
function AnimatedBRL({ value }: { value: number }) {
  return <AnimatedNumber value={value} format={brl} />;
}

function AnimatedNumber({ value, format = fmt }: { value: number; format?: (n: number) => string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return <>{format(shown)}</>;
}

const ghostBtn =
  "group/btn mt-4 inline-flex min-h-[36px] w-fit cursor-pointer items-center gap-1.5 rounded-full border border-edge px-3.5 text-ink transition-colors duration-300 hover:border-[rgba(250,204,21,0.55)] hover:text-ink-strong";

function QuestButton({ action }: { action: QuestAction }) {
  const { isLoggedIn, setAuthModalOpen, setAuthModalTab, promptLogin } = useAuth();
  const navigate = useNavigate();
  const text: CSSProperties = { fontFamily: INTER, fontSize: 13, fontWeight: 700 };
  const arrow = <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />;

  if (action.kind === "note") {
    return (
      <span className="mt-4 inline-flex min-h-[36px] items-center gap-1.5 text-ink-muted" style={{ ...text, fontWeight: 600 }}>
        <Mail size={14} />
        {action.label}
      </span>
    );
  }

  if (action.kind === "signup") {
    if (isLoggedIn) {
      return (
        <span className="mt-4 inline-flex min-h-[36px] items-center gap-1.5" style={{ ...text, color: "#22c55e" }}>
          <Check size={15} strokeWidth={2.5} />
          Você já ganhou
        </span>
      );
    }
    return (
      <button
        type="button"
        className={ghostBtn}
        style={text}
        onClick={() => {
          setAuthModalTab("register");
          setAuthModalOpen(true);
        }}
      >
        {action.label}
        {arrow}
      </button>
    );
  }

  if (action.kind === "external") {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={ghostBtn} style={text}>
        {action.label}
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={ghostBtn}
      style={text}
      onClick={() => (isLoggedIn ? navigate(action.to) : promptLogin(action.to))}
    >
      {action.label}
      {arrow}
    </button>
  );
}

function Quests() {
  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {QUESTS.map((q, i) => (
        <motion.div
          key={q.title}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          custom={i % 3}
          className="group flex items-stretch gap-4 rounded-card-md border border-edge bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[rgba(250,204,21,0.35)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
            <q.icon size={20} className="text-ink" strokeWidth={1.75} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-ink-strong" style={{ fontFamily: FIGTREE, fontWeight: 700, fontSize: 17 }}>
              {q.title}
            </span>
            <span className="mt-1 text-ink-muted" style={{ fontFamily: INTER, fontSize: 13, lineHeight: 1.5 }}>
              {q.detail}
            </span>
            <div className="mt-auto">
              <QuestButton action={q.action} />
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap tabular-nums" style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 16, color: GOLD }}>
            <span className="transition-transform duration-500 group-hover:[transform:rotateY(360deg)]">
              <PcyesCoin size={18} />
            </span>
            {q.reward}
          </span>
        </motion.div>
      ))}

      {/* Indicação depende de campanha e paga em cupom, não em pontos: fica
          separada para não parecer mais uma linha de "+pts". */}
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        custom={2}
        className="flex items-start gap-4 rounded-card-md border p-5"
        style={{ borderColor: "rgba(255,43,46,0.3)", background: "linear-gradient(120deg, rgba(255,43,46,0.10), rgba(255,255,255,0.01) 70%)" }}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <Users size={20} className="text-primary" strokeWidth={1.75} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-ink-strong" style={{ fontFamily: FIGTREE, fontWeight: 700, fontSize: 17 }}>
            Indicar um amigo
          </span>
          <span className="mt-1 text-ink-muted" style={{ fontFamily: INTER, fontSize: 13, lineHeight: 1.5 }}>
            Quando houver campanha de indicação, você e o amigo ganham R$ 100 de desconto em compras acima de
            R$ 500. O seu desconto sai depois da primeira compra dele.
          </span>
        </div>
        <span className="shrink-0 whitespace-nowrap text-primary" style={{ fontFamily: FIGTREE, fontWeight: 800, fontSize: 16 }}>
          R$ 100
        </span>
      </motion.div>
    </div>
  );
}

const RULES = [
  { icon: Hourglass, title: "Os pontos entram em 30 dias", body: "Os pontos de uma compra aparecem no seu saldo 30 dias depois que ela é concluída. Esse prazo serve para confirmar a compra." },
  { icon: Gift, title: "Os pontos valem 6 meses", body: "Exemplo: pontos recebidos em 1º de junho vencem em 1º de dezembro. Quando vencem, você não desce de nível." },
  { icon: Undo2, title: "Se cancelar ou devolver", body: "Os pontos daquela compra podem ser retirados do saldo. Se devolver só parte, sai só a parte proporcional. O nível pode mudar." },
  { icon: UserRound, title: "Uma conta, um CPF", body: "Os pontos são pessoais e intransferíveis. Cada CPF participa com uma única conta." },
  { icon: Ban, title: "Pontos não viram dinheiro", body: "Não dá para sacar nem transferir para conta bancária. Eles servem só como desconto nas compras da PCYES." },
  { icon: ShieldCheck, title: "Uso correto", body: "Em caso de fraude, contas duplicadas ou uso indevido, a PCYES pode cancelar os pontos e bloquear o acesso ao programa." },
];

function Rules() {
  return (
    <>
      <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {RULES.map((r, i) => (
          <motion.div key={r.title} variants={reveal} initial="hidden" whileInView="show" viewport={viewportOnce} custom={i % 3} className="flex gap-4">
            <r.icon size={22} className="mt-0.5 shrink-0 text-ink-muted" strokeWidth={1.75} />
            <div>
              <dt className="text-ink-strong" style={{ fontFamily: FIGTREE, fontWeight: 700, fontSize: 18 }}>
                {r.title}
              </dt>
              <dd className="mt-1.5 text-ink-muted" style={{ fontFamily: INTER, fontSize: 14.5, lineHeight: 1.6 }}>
                {r.body}
              </dd>
            </div>
          </motion.div>
        ))}
      </dl>
      <p className="mt-14 max-w-[80ch] border-t border-edge pt-6 text-ink-muted" style={{ fontFamily: INTER, fontSize: 13, lineHeight: 1.7 }}>
        Quem pode participar: pessoas físicas que moram no Brasil e têm conta em pcyes.com.br. Onde ver seus pontos:
        na área da sua conta, com saldo, pontos a liberar e pontos perto de vencer. Troca por produto: quando a
        PCYES oferecer, é 1 troca por mês, sujeita a estoque, e o cupom vale 1 mês. A PCYES pode mudar as regras do
        programa e avisa nos canais oficiais.
      </p>
    </>
  );
}

/**
 * Pilha de moedas do fecho: cai uma de cada vez quando entra na tela.
 *
 * Posição absoluta, cada moeda `STEP` px acima da anterior. Com fluxo normal
 * (flex + margem negativa) a altura da caixa girada não acompanhava o
 * achatamento do `rotateX` e as moedas ficavam soltas, com vão entre elas.
 */
function CoinStack() {
  const SIZE = 62;
  const STEP = 9;
  const columns = [2, 4, 3];
  let n = 0;

  return (
    <div className="flex items-end gap-2">
      {columns.map((count, col) => (
        <div key={col} className="relative" style={{ width: SIZE, height: SIZE * 0.55 + (count - 1) * STEP }}>
          {Array.from({ length: count }, (_, j) => {
            const order = n++;
            return (
              <motion.span
                key={j}
                className="absolute left-0"
                style={{ bottom: j * STEP - SIZE * 0.22, zIndex: j }}
                initial={{ opacity: 0, y: -70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.15 + order * 0.08 }}
              >
                <span className="block" style={{ transform: "rotateX(64deg)", transformStyle: "preserve-3d" }}>
                  <Coin3D size={SIZE} />
                </span>
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
