"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Check, Copy, X } from "lucide-react";

/**
 * A barra anunciava "25% OFF com cupom JEDI25" e não existia lugar nenhum no
 * site para copiar o código — nem aqui, nem na home, nem no carrinho. Quem não
 * decorasse o cupom na primeira leitura perdia o desconto, e a barra ainda pode
 * ser fechada.
 *
 * Agora o código sai do texto e vira um chip que copia no clique. Fica onde a
 * pessoa já está lendo a oferta, sem inventar um bloco novo na home — isso é
 * assunto de marketing, e continua em aberto.
 */
const MESSAGES: { texto: string; cupom?: string }[] = [
  { texto: "Que a Força esteja com seu setup ⚔️ · 25% OFF com cupom", cupom: "JEDI25" },
  { texto: "Estes não são os preços que você procura... são MELHORES ⭐ · até 60% OFF" },
  { texto: "Path of the Sith aceito · Cartão, PIX e até créditos do Império" },
  { texto: "I am your father... do desconto. 10% extra com o cupom", cupom: "NERDPRIDE" },
];

/**
 * Faixa em imagem: o marketing sobe um PNG para o desktop e outro para o
 * celular, e a faixa mostra a imagem no lugar dos textos. Sem imagem
 * configurada, volta para os textos acima.
 *
 * Arte gerada por operacao/assets-site/faixa-topo/gerar-faixa.mjs (marca pcyes).
 * Tamanhos (2x, para tela retina): desktop 3840 × 80 (aparece com 40 px de
 * altura) e celular 780 × 72 (36 px). A imagem preenche a largura e corta as
 * laterais em telas menores, então texto e selo ficam nos 1200 px centrais no
 * desktop e nos 340 px centrais no celular.
 *
 * O selo do cupom está desenhado na imagem; clicar em qualquer ponto da faixa
 * copia o código.
 */
const BANNER_IMAGEM: {
  desktop: string;
  mobile: string;
  alt: string;
  cupom?: string;
} | null = {
  desktop: "/banners/faixa-bemvindo10-desktop.png",
  mobile: "/banners/faixa-bemvindo10-mobile.png",
  alt: "Primeira compra? Ganhe 10% OFF com o cupom BEMVINDO10",
  cupom: "BEMVINDO10",
};

/**
 * Faixa da collab PCYES × Drop Dead (35 anos), feita em código e não em imagem:
 * fica nítida em qualquer tela e o cupom é um ingresso de verdade que copia no
 * clique. Cores e fontes do zine dos jogos (azul Drop Dead, amarelo, nanquim).
 * Para voltar à faixa BEMVINDO10, troque FAIXA para "imagem".
 *
 * PLACEHOLDER: código e desconto provisórios, os mesmos do jogo — trocar pelo
 * cupom real quando for criado no Magento.
 */
const FAIXA: "collab" | "imagem" = "collab";
const COLLAB = { cupom: "DROPDEAD35", desconto: "35% OFF", link: "/drop-dead" };
const ZINE = { azul: "#3558A8", azul2: "#2B4889", amarelo: "#F6BE27", nanquim: "#111111", papel: "#F3EEE2", vermelho: "#E5141B" };

/** Altura da faixa em imagem: 40 px no desktop e 36 px no celular. */
const ALTURA_IMAGEM = { desktop: 40, mobile: 36 };

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);
  const [copiado, setCopiado] = useState(false);
  const timerCopia = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [celular, setCelular] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setCelular(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const mensagem = MESSAGES[idx];
  const alturaFaixa = BANNER_IMAGEM ? (celular ? ALTURA_IMAGEM.mobile : ALTURA_IMAGEM.desktop) : 40;

  /* Um cupom por vez: trocar de anúncio limpa o "copiado" do anterior. */
  useEffect(() => {
    setCopiado(false);
  }, [idx]);

  useEffect(() => () => clearTimeout(timerCopia.current), []);

  const copiar = async (cupom: string) => {
    try {
      await navigator.clipboard.writeText(cupom);
    } catch {
      /* Sem permissão de área de transferência (http, Safari antigo): o código
         continua visível para copiar à mão, então só não confirmamos. */
      return;
    }
    setCopiado(true);
    clearTimeout(timerCopia.current);
    timerCopia.current = setTimeout(() => setCopiado(false), 2000);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--announce-h", dismissed ? "0px" : `${alturaFaixa}px`);
  }, [dismissed, alturaFaixa]);

  useEffect(() => () => {
    document.documentElement.style.setProperty("--announce-h", "0px");
  }, []);

  if (dismissed) return null;

  if (FAIXA === "collab") return (
    <FaixaCollab celular={celular} altura={alturaFaixa} copiado={copiado} copiar={copiar} fechar={() => setDismissed(true)} />
  );

  if (BANNER_IMAGEM) {
    const { desktop, mobile, alt, cupom } = BANNER_IMAGEM;
    return (
      <div
        role="region"
        aria-label="Aviso promocional"
        className="announce-bar fixed inset-x-0 top-0 z-[60] w-full overflow-hidden"
        style={{ height: alturaFaixa, background: "#9b0f1e" }}
      >
        <button
          type="button"
          onClick={() => cupom && copiar(cupom)}
          aria-label={cupom ? (copiado ? `Cupom ${cupom} copiado` : `${alt}. Copiar cupom ${cupom}`) : alt}
          className="block h-full w-full cursor-pointer"
        >
          {/* `object-cover` centralizado: a imagem ocupa a largura toda e, em
              tela menor que 1920, perde só as pontas, que são fundo. */}
          <picture>
            <source media="(max-width: 767px)" srcSet={mobile} />
            <img src={desktop} alt="" className="h-full w-full object-cover object-center" draggable={false} />
          </picture>
        </button>

        {/* Confirma a cópia por cima da imagem, no centro, sem esconder o X. */}
        {copiado && (
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center gap-1.5"
            style={{
              background: "rgba(10,10,10,0.82)",
              color: "#4ade80",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              animation: "fadeSlide 0.25s ease",
            }}
          >
            <Check size={14} strokeWidth={2.6} aria-hidden="true" />
            Cupom {cupom} copiado
          </span>
        )}
        <span role="status" aria-live="polite" className="sr-only">
          {copiado ? `Cupom ${cupom} copiado` : ""}
        </span>

        {/* Só do md pra cima: no celular a arte ocupa a largura toda e, em 360
            px, o X caía em cima do selo do cupom. Lá a faixa já some ao rolar,
            junto com o header. */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar aviso"
          className="absolute right-4 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-black/25 hover:text-white md:flex"
        >
          <X size={12} strokeWidth={2.4} />
        </button>

        <style>{`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(2px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Aviso promocional"
      className="announce-bar fixed inset-x-0 top-0 z-[60] w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #050505 0%, #0a0a1a 50%, #050505 100%)",
        borderBottom: "1px solid rgba(255,232,31,0.18)",
      }}
    >
      {/* starfield */}
      <div
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          backgroundImage:
            "radial-gradient(circle at 8% 60%, #fff 0.5px, transparent 1px), radial-gradient(circle at 24% 30%, #fff 0.5px, transparent 1px), radial-gradient(circle at 42% 70%, #fde68a 0.5px, transparent 1px), radial-gradient(circle at 58% 25%, #fff 0.5px, transparent 1px), radial-gradient(circle at 73% 65%, #fff 0.5px, transparent 1px), radial-gradient(circle at 88% 40%, #fde68a 0.5px, transparent 1px), radial-gradient(circle at 95% 75%, #fff 0.5px, transparent 1px)",
        }}
      />
      {/* lightsaber stripe */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
        style={{
          background: "linear-gradient(180deg, #22c55e 0%, #facc15 50%, #ff2419 100%)",
          boxShadow: "0 0 18px rgba(34,197,94,0.55), 0 0 8px rgba(255,36,25,0.55)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[3px]"
        style={{
          background: "linear-gradient(180deg, #ff2419 0%, #facc15 50%, #22c55e 100%)",
          boxShadow: "0 0 18px rgba(255,36,25,0.55), 0 0 8px rgba(34,197,94,0.55)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1760px] items-center justify-between gap-3 px-5 py-[10px] md:px-8">
        <button
          onClick={() => setIdx((i) => (i - 1 + MESSAGES.length) % MESSAGES.length)}
          className="hidden h-6 w-6 items-center justify-center text-ink-muted transition-colors hover:text-ink-strong md:inline-flex"
          aria-label="Anúncio anterior"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
        >
          ‹
        </button>

        <div className="flex flex-1 items-center justify-center gap-3 overflow-hidden">
          {/* pill semana nerd */}
          <span
            className="hidden flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 sm:inline-flex"
            style={{
              background: "linear-gradient(135deg, #facc15 0%, #f97316 100%)",
              color: "#0f0a02",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 900,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              boxShadow: "0 4px 14px -4px rgba(250,204,21,0.6)",
            }}
          >
            ⚡ Semana do Orgulho Nerd
          </span>

          {/* O chip de cupom é um <button>, então não pode viver dentro do
              <Link> — conteúdo interativo aninhado em <a> é HTML inválido e
              o clique brigaria com a navegação. Por isso são irmãos. */}
          <div key={idx} className="flex min-w-0 items-center gap-2" style={{ animation: "fadeSlide 0.45s ease" }}>
            <Link
              to="/produtos"
              className="line-clamp-1 text-center text-ink transition-opacity hover:text-ink-strong"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              {mensagem.texto}
            </Link>

            {mensagem.cupom && (
              <button
                type="button"
                onClick={() => copiar(mensagem.cupom!)}
                aria-label={copiado ? `Cupom ${mensagem.cupom} copiado` : `Copiar cupom ${mensagem.cupom}`}
                className="group/cupom inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-[3px] transition-colors cursor-pointer"
                style={{
                  borderColor: copiado ? "rgba(34,197,94,0.55)" : "rgba(255,232,31,0.45)",
                  background: copiado ? "rgba(34,197,94,0.14)" : "rgba(255,232,31,0.10)",
                  color: copiado ? "#4ade80" : "#ffe81f",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                }}
              >
                {mensagem.cupom}
                {copiado ? (
                  <Check size={11} strokeWidth={2.6} aria-hidden="true" />
                ) : (
                  <Copy size={11} strokeWidth={2.2} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* WCAG 4.1.3 — confirma a cópia para leitor de tela; o "copiado" do
            chip é só cor e ícone. */}
        <span role="status" aria-live="polite" className="sr-only">
          {copiado ? `Cupom ${mensagem.cupom} copiado` : ""}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIdx((i) => (i + 1) % MESSAGES.length)}
            className="hidden h-6 w-6 items-center justify-center text-ink-muted transition-colors hover:text-ink-strong md:inline-flex"
            aria-label="Próximo anúncio"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
          >
            ›
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Fechar aviso"
            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-white/10 hover:text-ink-strong"
          >
            <X size={11} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/** Fontes do zine (as mesmas dos jogos), carregadas só quando a faixa da collab aparece. */
function useFontesZine() {
  useEffect(() => {
    if (document.getElementById("fontes-zine")) return;
    const l = document.createElement("link");
    l.id = "fontes-zine"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Graduate&family=Permanent+Marker&display=swap";
    document.head.appendChild(l);
  }, []);
}

function FaixaCollab({ celular, altura, copiado, copiar, fechar }: {
  celular: boolean; altura: number; copiado: boolean; copiar: (c: string) => void; fechar: () => void;
}) {
  useFontesZine();
  const { cupom, desconto, link } = COLLAB;
  return (
    <div
      role="region"
      aria-label="Collab PCYES × Drop Dead"
      className="announce-bar faixa-collab fixed inset-x-0 top-0 z-[60] w-full overflow-hidden"
      style={{
        height: altura,
        backgroundColor: ZINE.azul,
        /* retícula de nanquim, como nos jogos */
        backgroundImage: `radial-gradient(${ZINE.azul2} 1.2px, transparent 1.6px)`,
        backgroundSize: "6px 6px",
        borderBottom: `2px solid ${ZINE.nanquim}`,
      }}
    >
      {/* fita amarela de 35 anos correndo nas pontas */}
      <div aria-hidden="true" className="fc-fita pointer-events-none absolute inset-y-0 left-0 hidden w-[22%] lg:block" />
      <div aria-hidden="true" className="fc-fita fc-fita-dir pointer-events-none absolute inset-y-0 right-0 hidden w-[22%] lg:block" />

      <div className="relative mx-auto flex h-full max-w-[1200px] items-center justify-center gap-3 px-3 md:gap-5">
        <Link to={link} className="flex min-w-0 items-center gap-2.5 md:gap-3" aria-label="Ver a collab PCYES × Drop Dead">
          {!celular && (
            <img src="/collab/dropdead/dropdead-logo.webp" alt="" width={44} height={28} className="h-[28px] w-auto flex-shrink-0 -rotate-3" draggable={false} />
          )}
          <span className="fc-titulo flex-shrink-0">{celular ? "PCYES × DROP DEAD" : "PCYES × DROP DEAD · 35 ANOS"}</span>
          {!celular && <span className="fc-texto truncate">{desconto} em toda a collab com o cupom</span>}
        </Link>

        {/* o cupom é um ingresso: miolo amarelo, picote, sombra de nanquim; clique copia */}
        <button
          type="button"
          onClick={() => copiar(cupom)}
          aria-label={copiado ? `Cupom ${cupom} copiado` : `Copiar cupom ${cupom}, ${desconto}`}
          className={`fc-ingresso flex-shrink-0 ${copiado ? "fc-copiado" : ""}`}
        >
          <span className="fc-canhoto">{celular ? desconto.replace(" OFF", "") : "CUPOM"}</span>
          <span className="fc-codigo">
            {copiado ? (<>COPIADO <Check size={12} strokeWidth={3} aria-hidden="true" /></>) : (<>{cupom} <Copy size={11} strokeWidth={2.6} aria-hidden="true" /></>)}
          </span>
        </button>

        {!celular && (
          <Link to={link} className="fc-jogar hidden flex-shrink-0 md:inline-flex">JOGAR ►</Link>
        )}
      </div>

      <span role="status" aria-live="polite" className="sr-only">{copiado ? `Cupom ${cupom} copiado` : ""}</span>

      <button
        onClick={fechar}
        aria-label="Fechar aviso"
        className="absolute right-3 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-black/25 hover:text-white md:flex"
      >
        <X size={12} strokeWidth={2.4} />
      </button>

      <style>{`
        .faixa-collab .fc-titulo { font-family: Graduate, var(--font-family-inter); font-size: ${celular ? 12 : 14}px; letter-spacing: .04em;
          color: ${ZINE.amarelo}; text-shadow: 2px 2px 0 ${ZINE.nanquim}; white-space: nowrap; }
        .faixa-collab .fc-texto { font-family: var(--font-family-inter); font-size: 13px; font-weight: 600; color: ${ZINE.papel}; }
        .faixa-collab .fc-ingresso { position: relative; display: inline-flex; align-items: stretch; height: ${celular ? 24 : 26}px;
          transform: rotate(-2deg); filter: drop-shadow(2px 2px 0 ${ZINE.nanquim}); cursor: pointer; transition: transform .15s ease; }
        .faixa-collab .fc-ingresso:hover { transform: rotate(0deg) scale(1.05); }
        .faixa-collab .fc-ingresso:active { transform: rotate(0deg) scale(.97); }
        .faixa-collab .fc-ingresso:focus-visible { outline: 2px solid ${ZINE.papel}; outline-offset: 3px; }
        /* recortes de meia-lua nas pontas e no picote, como ingresso destacável */
        .faixa-collab .fc-canhoto, .faixa-collab .fc-codigo { display: inline-flex; align-items: center; gap: 5px; border: 2px solid ${ZINE.nanquim}; }
        .faixa-collab .fc-canhoto { padding: 0 7px 0 9px; background: ${ZINE.vermelho}; color: ${ZINE.papel}; border-right: 2px dashed ${ZINE.nanquim};
          font-family: Graduate, var(--font-family-inter); font-size: 10px; letter-spacing: .08em;
          -webkit-mask: radial-gradient(circle 5px at 0 50%, transparent 98%, #000) ; mask: radial-gradient(circle 5px at 0 50%, transparent 98%, #000); }
        .faixa-collab .fc-codigo { padding: 0 9px 0 8px; border-left: 0; background: ${ZINE.amarelo}; color: ${ZINE.nanquim};
          font-family: Graduate, var(--font-family-inter); font-size: ${celular ? 12 : 13}px; letter-spacing: .06em; white-space: nowrap;
          -webkit-mask: radial-gradient(circle 5px at 100% 50%, transparent 98%, #000); mask: radial-gradient(circle 5px at 100% 50%, transparent 98%, #000); }
        .faixa-collab .fc-copiado .fc-codigo { background: ${ZINE.nanquim}; color: ${ZINE.amarelo}; }
        .faixa-collab .fc-copiado { animation: fcCarimbo .3s ease; }
        .faixa-collab .fc-jogar { align-items: center; height: 24px; padding: 0 10px; border: 2px solid ${ZINE.nanquim}; background: ${ZINE.papel};
          color: ${ZINE.nanquim}; font-family: "Permanent Marker", var(--font-family-inter); font-size: 13px; transform: rotate(2deg);
          box-shadow: 2px 2px 0 ${ZINE.nanquim}; transition: background .15s ease; }
        .faixa-collab .fc-jogar:hover { background: ${ZINE.amarelo}; }
        .faixa-collab .fc-fita { background: repeating-linear-gradient(-45deg, ${ZINE.amarelo} 0 10px, ${ZINE.nanquim} 10px 20px);
          opacity: .9; -webkit-mask: linear-gradient(90deg, #000 0%, transparent 100%); mask: linear-gradient(90deg, #000 0%, transparent 100%);
          animation: fcFita 1.2s steps(8) infinite; }
        .faixa-collab .fc-fita-dir { -webkit-mask: linear-gradient(270deg, #000 0%, transparent 100%); mask: linear-gradient(270deg, #000 0%, transparent 100%); }
        @keyframes fcFita { to { background-position: 28.28px 0; } }
        @keyframes fcCarimbo { 0% { transform: rotate(-2deg) scale(1.18); } 100% { transform: rotate(-2deg) scale(1); } }
        @media (prefers-reduced-motion: reduce) { .faixa-collab .fc-fita, .faixa-collab .fc-copiado { animation: none; } }
      `}</style>
    </div>
  );
}
