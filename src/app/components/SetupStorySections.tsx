/**
 * BLOCO GLOBAL — a história do setup
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Vídeo, cenas de uso, montagem, o que vem na caixa, ruído, expansão, comparação
 * com a vizinha e FAQ. Só aparece em página de setup.
 *
 * REGRA DE DESENHO: cada seção usa um dispositivo visual DIFERENTE — trilha,
 * selo, foto sobre pedestal, escala, esquema, comparação lado a lado, acordeão.
 * Resolver tudo com o mesmo card em grid é o que faz uma página parecer gerada:
 * o olho percebe o molde antes de ler o conteúdo, e nada se destaca porque tudo
 * tem o mesmo peso.
 *
 * Mesma fronteira do SetupWorkloadsBlock: recebe só o identificador da máquina e
 * lê o conteúdo de `lib/setups`, indexado por persona × tier. Nada é escrito por
 * SKU (ver docs/magento/setup-pdp-blocos.md).
 *
 * DADO VIVO: a comparação com a vizinha É a exceção — mostra nome e preço de
 * OUTRO produto. No Magento esses dois campos têm que vir de consulta em runtime
 * (GraphQL), nunca de HTML estático, e o card some se a vizinha estiver
 * indisponível. Está marcado no ponto exato, mais abaixo.
 */

import { useState } from "react";
import { Play, Check, Plus, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getComponentImage } from "../lib/setupImages";
import { getSetupStory, type SetupScene, type SetupStory, type SetupPitch } from "../lib/setups";

/* ── Molduras compartilhadas ───────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-primary tracking-[0.24em]" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}>
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`max-w-[720px] text-foreground ${className}`}
      style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(20px, 3.2vw, 32px)", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em" }}
    >
      {children}
    </h3>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-foreground/60 ${className}`} style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.65 }}>
      {children}
    </p>
  );
}

const SECTION = "border-t border-edge-subtle px-6 py-12 md:px-10";

/* Pedestal: foco de luz atrás do produto recortado. Substitui a caixa com borda
   — a peça flutua, em vez de morar num quadradinho. */
const PLINTH = "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(var(--foreground-rgb), 0.10) 0%, transparent 70%)";

/* ═══════════════════════════════════════════════════════
   1. VÍDEO — fachada com play
   ═══════════════════════════════════════════════════════ */

/**
 * O `<iframe>` do YouTube só entra no DOM depois do clique: player carregando
 * junto da página custa mais que a página inteira, e a maioria não dá play.
 */
function VideoSection({ video }: { video: SetupStory["video"] }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <section className={SECTION}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <Eyebrow>{video.eyebrow}</Eyebrow>
          <SectionTitle>{video.title}</SectionTitle>
          <Body className="mt-4 max-w-[520px]">{video.text}</Body>

          {/* Régua de números separada por filete, não por caixas. */}
          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {video.stats.map((stat, i) => (
              <div key={stat.label} className={`max-w-[170px] ${i > 0 ? "border-l border-foreground/10 pl-8" : ""}`}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.4 }}>
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-video overflow-hidden" style={{ borderRadius: "var(--radius-card-lg)", background: "rgba(0,0,0,0.35)" }}>
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 cursor-pointer" aria-label={`Assistir: ${video.title}`}>
              <ImageWithFallback src={thumb} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.3) 100%)" }} />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-ink-strong shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                <Play size={24} fill="currentColor" className="ml-0.5" />
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-2.5 py-1 text-ink" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
                {video.duration}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. CENAS — arte panorâmica com o número por cima
   ═══════════════════════════════════════════════════════ */

function SceneBand({ scene, flip }: { scene: SetupScene; flip: boolean }) {
  return (
    <section className={SECTION}>
      <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* 2:1 porque a arte de origem é panorâmica (≈3:1). */}
        <div className="relative aspect-[2/1] overflow-hidden" style={{ borderRadius: "var(--radius-card-lg)" }}>
          <ImageWithFallback src={scene.image} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 34%, rgba(0,0,0,0.12) 72%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <p className="text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {scene.metric.value}
            </p>
            <p className="mt-1 text-white/75" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
              {scene.metric.label}
            </p>
          </div>
        </div>

        <div>
          <Eyebrow>{scene.eyebrow}</Eyebrow>
          <SectionTitle>{scene.title}</SectionTitle>
          <Body className="mt-4 max-w-[520px]">{scene.text}</Body>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. MONTAGEM — trilha + selo assinado
   ═══════════════════════════════════════════════════════ */

/**
 * Trilha, não grid de cards: uma linha atravessa a seção e os passos são pontos
 * nela, com o número em tipografia grande de fundo. O selo de bancada fecha a
 * trilha — é o mesmo assunto (quem montou, o que garantiu), então é uma seção
 * só, em vez de "montagem" e "garantia" repetindo molde.
 */
function AssemblyTrail({ steps, certificate }: { steps: SetupStory["assembly"]; certificate: SetupStory["certificate"] }) {
  return (
    <section className={SECTION}>
      <Eyebrow>// ANTES DE SAIR DAQUI</Eyebrow>
      <SectionTitle>Quatro etapas entre a peça na prateleira e a máquina na sua mesa</SectionTitle>
      <Body className="mt-3 max-w-[640px]">
        É o que separa comprar pronto de comprar peça solta: alguém montou, testou e assinou embaixo.
      </Body>

      <ol className="relative mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {/* A linha da trilha: só no desktop, onde os passos ficam lado a lado. */}
        <span aria-hidden="true" className="absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-primary/40 via-foreground/12 to-transparent xl:block" />
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-14 xl:pl-0">
            {/* Número em ghost, atrás do texto — dá hierarquia sem moldura. */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[-14px] text-foreground/[0.09] xl:left-auto xl:right-2 xl:top-[-30px]"
              style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(48px, 6vw, 76px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}
            >
              {i + 1}
            </span>
            <span className="relative z-10 mb-4 flex h-[9px] w-[9px] items-center justify-center rounded-full bg-primary ring-4 ring-[var(--surface-0)] xl:mb-5" />
            <p className="relative text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              {step.title}
            </p>
            <Body className="relative mt-2 max-w-[320px]">{step.text}</Body>
          </li>
        ))}
      </ol>

      {/* Selo de bancada: painel único com cara de documento carimbado. */}
      <div
        className="relative mt-12 overflow-hidden p-6 md:p-8"
        style={{
          borderRadius: "var(--radius-card-lg)",
          background: "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.05) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
          border: "1px dashed rgba(var(--foreground-rgb), 0.18)",
        }}
      >
        {/* Carimbo girado ao fundo — o detalhe que tira a cara de formulário. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 rotate-[-14deg] rounded-full border-[3px] border-primary/25 px-6 py-3 text-primary/25 md:block"
          style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(20px, 2.4vw, 30px)", fontWeight: 800, letterSpacing: "0.06em" }}
        >
          TESTADA 24H
        </span>

        <p className="uppercase tracking-[0.2em] text-foreground/40" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700 }}>
          Laudo de bancada
        </p>
        <p className="mt-1 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          {certificate.by}
        </p>

        <ul className="mt-5 grid max-w-[760px] gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {certificate.checks.map((check) => (
            <li key={check} className="flex items-start gap-2.5">
              <Check size={14} className="mt-0.5 shrink-0 text-primary" strokeWidth={3} />
              <span className="text-foreground/75" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.5 }}>
                {check}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-foreground/10 pt-5">
          <div className="max-w-[520px]">
            <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700 }}>
              {certificate.warranty}
            </p>
            <Body className="mt-1">{certificate.note}</Body>
          </div>
          {/* Linha de assinatura: fecha o documento sem virar mais um selo. */}
          <div className="min-w-[200px]">
            <span className="block border-b border-foreground/25 pb-1 text-foreground/30" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 700, fontStyle: "italic" }}>
              montada por
            </span>
            <span className="mt-1 block text-foreground/40" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
              nome do técnico no laudo que vem na caixa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. A CAIXA — foto de cada item, sem moldura
   ═══════════════════════════════════════════════════════ */

/**
 * O primeiro item é a máquina inteira e ocupa o dobro; os outros vêm com a foto
 * real do catálogo sobre um pedestal de luz. Sem borda, sem fundo de card: o que
 * separa um item do outro é o espaço, como numa foto de desembalar.
 */
function BoxLayout({ box, heroImage, heroName }: { box: SetupStory["box"]; heroImage: string; heroName: string }) {
  return (
    <section className={SECTION}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>// UMA CAIXA SÓ</Eyebrow>
          <SectionTitle>Chega tudo junto — inclusive o monitor</SectionTitle>
        </div>
        <p className="text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Nada para comprar à parte
        </p>
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* A máquina: dobro de largura, é o protagonista da foto. */}
        <figure className="sm:col-span-2 lg:col-span-2">
          {/* A arte tem fundo próprio e é quadrada: preenche o quadro em vez de
              flutuar sobre o pedestal, que é tratamento de peça recortada. */}
          <div className="relative aspect-square w-full overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
            <ImageWithFallback src={heroImage} alt={heroName} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <figcaption className="mt-4 border-t border-foreground/10 pt-3">
            <span className="block uppercase tracking-[0.16em] text-primary" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}>
              A máquina montada
            </span>
            <span className="mt-1 block text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              {heroName}
            </span>
          </figcaption>
        </figure>

        {box.map((entry) => {
          const shot = entry.slot ? getComponentImage(entry.slot) : null;
          return (
            <figure key={entry.label}>
              <div className="relative flex h-[240px] items-center justify-center px-4 lg:h-[300px]" style={{ background: shot ? PLINTH : "none" }}>
                {shot ? (
                  <ImageWithFallback src={shot} alt="" className="max-h-full max-w-full object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]" />
                ) : (
                  /* Item sem foto (cabo, papelada) não ganha caixa vazia: ganha
                     um símbolo grande, no mesmo espaço dos outros. */
                  <span aria-hidden="true" className="text-foreground/[0.07]" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "110px", fontWeight: 800, lineHeight: 1 }}>
                    +
                  </span>
                )}
              </div>
              <figcaption className="mt-4 border-t border-foreground/10 pt-3">
                <span className="block uppercase tracking-[0.16em] text-foreground/40" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700 }}>
                  {entry.label}
                </span>
                <span className="mt-1 block text-foreground/85" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, lineHeight: 1.45 }}>
                  {entry.item}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. RUÍDO E TEMPERATURA — escala e folga térmica
   ═══════════════════════════════════════════════════════ */

/* Referências para a escala de ruído: número solto não diz nada, "mais baixo
   que uma conversa" diz. Duas referências, não três — com quatro rótulos numa
   régua de 70dB eles se sobrepõem em tela de notebook.

   A escala começa em 15dB, não em zero: ninguém mede silêncio absoluto numa
   sala, e partindo do zero metade do eixo ficava vazia. */
const DB_SCALE_MIN = 15;
const DB_SCALE_MAX = 70;
const DB_REFS = [
  { db: 30, label: "biblioteca" },
  { db: 60, label: "conversa" },
];

/** Posição na régua, em %, já recortada para o rótulo não vazar da caixa. */
function dbPos(db: number): number {
  const pct = ((db - DB_SCALE_MIN) / (DB_SCALE_MAX - DB_SCALE_MIN)) * 100;
  return Math.min(94, Math.max(6, pct));
}
/* Temperatura de throttle das peças atuais — a barra mostra a FOLGA até lá. */
const TEMP_LIMIT = 95;

function parseNum(value: string): number {
  return Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
}

function AcousticsChart({ acoustics }: { acoustics: SetupStory["acoustics"] }) {
  const idle = parseNum(acoustics.idle);
  const load = parseNum(acoustics.load);
  const temps = [
    { label: "Processador", value: parseNum(acoustics.cpuTemp), raw: acoustics.cpuTemp },
    { label: "Placa de vídeo", value: parseNum(acoustics.gpuTemp), raw: acoustics.gpuTemp },
  ];

  return (
    <section className={SECTION}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>// SILÊNCIO E TEMPERATURA</Eyebrow>
          <SectionTitle>Potência que você vê no monitor, não escuta na mesa</SectionTitle>
          <Body className="mt-4 max-w-[520px]">{acoustics.note}</Body>
          <p className="mt-5 text-foreground/40" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.5 }}>
            Medições da nossa bancada com {acoustics.cooler}, a um metro do gabinete, em sala a 25 °C.
          </p>
        </div>

        <div>
          {/* Escala de ruído: a máquina plotada contra sons conhecidos. */}
          <div className="relative pt-10 pb-8">
            {/* Repouso ancora à esquerda e carga à direita da própria marca:
                com os dois centralizados, 20dB e 36dB se sobrepunham. */}
            {[{ v: idle, raw: acoustics.idle, label: "em repouso", align: "right" },
              { v: load, raw: acoustics.load, label: "em carga máxima", align: "left" }].map((mark) => (
              <div
                key={mark.label}
                className={`absolute top-0 ${mark.align === "right" ? "-translate-x-full pr-2 text-right" : "pl-2 text-left"}`}
                style={{ left: `${dbPos(mark.v)}%` }}
              >
                <span className="block whitespace-nowrap text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {mark.raw}
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-foreground/50" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                  {mark.label}
                </span>
              </div>
            ))}

            <div className="relative h-1.5 w-full overflow-hidden rounded-full" style={{ background: "linear-gradient(90deg, rgba(var(--foreground-rgb),0.10) 0%, rgba(var(--foreground-rgb),0.22) 60%, rgba(var(--foreground-rgb),0.35) 100%)" }}>
              {/* Faixa que a máquina ocupa: do repouso à carga máxima. */}
              <span className="absolute inset-y-0 rounded-full bg-primary" style={{ left: `${dbPos(idle)}%`, width: `${dbPos(load) - dbPos(idle)}%` }} />
            </div>

            {DB_REFS.map((ref) => (
              <div key={ref.label} className="absolute bottom-0 -translate-x-1/2 text-center" style={{ left: `${dbPos(ref.db)}%` }}>
                <span aria-hidden="true" className="mx-auto mb-1.5 block h-3 w-px bg-foreground/20" />
                <span className="block whitespace-nowrap text-foreground/35" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                  {ref.label} · {ref.db} dB
                </span>
              </div>
            ))}
          </div>

          {/* Temperatura como folga, não como número solto. */}
          <div className="mt-8 space-y-5 border-t border-foreground/10 pt-7">
            {temps.map((temp) => (
              <div key={temp.label}>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <span className="text-foreground/70" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                    {temp.label} sob carga contínua
                  </span>
                  <span className="tabular-nums text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {temp.raw}
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-foreground/8">
                  <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(temp.value / TEMP_LIMIT) * 100}%`, background: "linear-gradient(90deg, rgba(var(--primary-rgb, 227 30 36), 0.55) 0%, var(--primary) 100%)" }} />
                  <span aria-hidden="true" className="absolute -top-1 bottom-[-4px] w-px bg-foreground/30" style={{ left: "100%" }} />
                </div>
                <p className="mt-1.5 text-foreground/40" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
                  {TEMP_LIMIT - temp.value} °C de folga até o limite de {TEMP_LIMIT} °C, onde a peça começaria a reduzir desempenho
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   6. EXPANSÃO — esquema do que ainda cabe
   ═══════════════════════════════════════════════════════ */

/**
 * Em vez de "três cards falando de upgrade": o desenho dos encaixes. Cheio é
 * ocupado, vazado é livre — dá para contar com o olho quanto ainda cabe.
 */
function ExpansionDiagram({ expansion }: { expansion: SetupStory["expansion"] }) {
  const usoFonte = Math.round((expansion.power.draw / expansion.power.psu) * 100);

  return (
    <section className={SECTION}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <Eyebrow>// O QUE AINDA CABE DENTRO</Eyebrow>
          <SectionTitle>Comprada pronta, não fechada</SectionTitle>
          <Body className="mt-4 max-w-[520px]">{expansion.note}</Body>

          <div className="mt-7">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-foreground/70" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}>
                Consumo típico × fonte instalada
              </span>
              <span className="tabular-nums text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 800 }}>
                {expansion.power.draw}W / {expansion.power.psu}W
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-foreground/8">
              <span className="block h-full rounded-full bg-primary" style={{ width: `${usoFonte}%` }} />
            </div>
            <p className="mt-2 text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
              {expansion.power.label}
            </p>
          </div>
        </div>

        <ul className="space-y-6">
          {expansion.slots.map((slot) => {
            const livres = slot.total - slot.used;
            return (
              <li key={slot.label} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 700 }}>
                    {slot.label}
                  </p>
                  <p className="text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", lineHeight: 1.45 }}>
                    {slot.hint}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Os encaixes desenhados: preenchido = ocupado. */}
                  <span className="flex gap-1.5" aria-hidden="true">
                    {Array.from({ length: slot.total }, (_, i) => (
                      <span
                        key={i}
                        className="block h-8 w-3 rounded-[3px]"
                        style={i < slot.used
                          ? { background: "var(--primary)" }
                          : { border: "1px dashed rgba(var(--foreground-rgb), 0.3)", background: "rgba(var(--foreground-rgb), 0.03)" }}
                      />
                    ))}
                  </span>
                  <span className="w-[70px] shrink-0 tabular-nums text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
                    {livres} {livres === 1 ? "livre" : "livres"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   7. A VIZINHA — comparação que mostra a máquina
   ═══════════════════════════════════════════════════════ */

/**
 * A comparação precisa MOSTRAR a outra build: a arte das duas lado a lado, o
 * que muda peça por peça e o degrau de preço. Texto só dizia "1440p em vez de
 * 4K" e obrigava o comprador a abrir outra aba para ver do que se tratava.
 *
 * DADO VIVO: `name`, `price` e a existência do vizinho vêm de outro produto. No
 * Magento isso é consulta em runtime — e vizinho sem estoque não renderiza.
 */
function NeighborCompare({ pitch }: { pitch: SetupPitch }) {
  const { downgrade, upgrade, self } = pitch;
  if (!downgrade && !upgrade) return null;

  /* Só as specs que MUDAM entram na coluna do vizinho: repetir o que é igual
     nos dois lados é o que fazia a comparação virar tabela ilegível. */
  const diffs = (specs: { cpu: string; gpu: string; ram: string }) =>
    ([["Processador", specs.cpu, self.specs.cpu], ["Placa de vídeo", specs.gpu, self.specs.gpu], ["Memória", specs.ram, self.specs.ram]] as const)
      .filter(([, valor, atual]) => valor !== atual)
      .map(([label, valor]) => ({ label, valor }));

  const NeighborColumn = ({ neighbor }: { neighbor: NonNullable<SetupPitch["upgrade"]> }) => {
    const subindo = neighbor.direction === "up";
    const Arrow = subindo ? ArrowUpRight : ArrowDownRight;
    return (
      <Link to={neighbor.url} className="group block text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-foreground/55"
          style={{ background: "rgba(var(--foreground-rgb), 0.06)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700 }}
        >
          <Arrow size={12} /> {subindo ? "um degrau acima" : "um degrau abaixo"}
        </span>
        <div className="relative mx-auto mt-4 aspect-square w-full max-w-[210px] overflow-hidden opacity-80 transition-opacity group-hover:opacity-100" style={{ borderRadius: "var(--radius-card)" }}>
          <ImageWithFallback src={neighbor.image} alt={neighbor.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        </div>
        <p className="mt-3 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}>
          {neighbor.name}
        </p>
        {/* DADO VIVO: preço e nome vêm de outro produto — no Magento isto é
            consulta em runtime, e vizinho sem estoque não renderiza. */}
        <p className="tabular-nums text-primary" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          {neighbor.priceDiff}
        </p>
        <p className="tabular-nums text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
          fica {neighbor.price} · {neighbor.resolution}
        </p>

        <ul className="mx-auto mt-4 max-w-[240px] space-y-1.5 border-t border-foreground/10 pt-4">
          {diffs(neighbor.specs).map((diff) => (
            <li key={diff.label}>
              <span className="block uppercase tracking-[0.12em] text-foreground/30" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700 }}>
                {diff.label}
              </span>
              <span className="block text-foreground/75" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600, lineHeight: 1.35 }}>
                {diff.valor}
              </span>
            </li>
          ))}
        </ul>

        <span className="mt-4 inline-flex items-center gap-1 text-primary transition-colors group-hover:text-primary/80" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700 }}>
          Ver esta build <ArrowUpRight size={13} />
        </span>
      </Link>
    );
  };

  return (
    <section className={SECTION}>
      <Eyebrow>// ESSA OU A VIZINHA</Eyebrow>
      <SectionTitle>Você está neste degrau da linha</SectionTitle>
      <Body className="mt-3 max-w-[640px]">
        Mesma família, outro nível de desempenho. O que muda de peça e quanto isso custa — sem abrir três abas.
      </Body>

      {/* Escada: abaixo à esquerda, esta no meio e maior, acima à direita. */}
      <div className="mt-10 grid items-center gap-8 lg:grid-cols-3">
        {downgrade ? <NeighborColumn neighbor={downgrade} /> : <div className="hidden lg:block" />}

        <div className="order-first text-center lg:order-none">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 800 }}
          >
            você está aqui
          </span>
          <div className="relative mx-auto mt-4 aspect-square w-full max-w-[290px] overflow-hidden shadow-[0_24px_40px_rgba(0,0,0,0.55)]" style={{ borderRadius: "var(--radius-card)" }}>
            <ImageWithFallback src={self.image} alt={self.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <p className="mt-4 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {self.name}
          </p>
          <p className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
            entrega {self.resolution}
          </p>
          <ul className="mx-auto mt-4 max-w-[260px] space-y-1.5 border-t border-foreground/10 pt-4">
            {[{ label: "Processador", valor: self.specs.cpu }, { label: "Placa de vídeo", valor: self.specs.gpu }, { label: "Memória", valor: self.specs.ram }].map((linha) => (
              <li key={linha.label}>
                <span className="block uppercase tracking-[0.12em] text-foreground/30" style={{ fontFamily: "var(--font-family-inter)", fontSize: "10px", fontWeight: 700 }}>
                  {linha.label}
                </span>
                <span className="block text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, lineHeight: 1.35 }}>
                  {linha.valor}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {upgrade ? <NeighborColumn neighbor={upgrade} /> : <div className="hidden lg:block" />}
      </div>

      {/* O ganho em palavras, uma linha por vizinho — fecha o raciocínio. */}
      <div className="mt-10 grid gap-3 border-t border-foreground/10 pt-6 md:grid-cols-2">
        {[downgrade, upgrade].filter(Boolean).map((n) => (
          <p key={n!.id} className="text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
            <span className="text-foreground" style={{ fontWeight: 700 }}>{n!.name}</span> {n!.gain}.
          </p>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   8. FAQ
   ═══════════════════════════════════════════════════════ */

function Faq({ faq }: { faq: SetupStory["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={SECTION}>
      <Eyebrow>// PERGUNTAS QUE TODO MUNDO FAZ</Eyebrow>
      <SectionTitle>Antes de você abrir o chat</SectionTitle>

      <ul className="mt-7 overflow-hidden border border-foreground/8" style={{ borderRadius: "var(--radius-card)" }}>
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(var(--foreground-rgb), 0.07)" }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-foreground/[0.03]"
              >
                <span className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {item.q}
                </span>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-primary/15 text-primary" : "bg-foreground/8 text-foreground/50"}`}>
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              {/* grid-rows animado: altura fluida sem medir o conteúdo na mão. */}
              <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <Body className="max-w-[760px] px-5 pb-5">{item.a}</Body>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOCOS EXPORTADOS
   ═══════════════════════════════════════════════════════ */

/** Vídeo + cenas de uso — vão logo abaixo de "por que essa configuração". */
export function SetupStoryIntro({ productId }: { productId: number }) {
  const story = getSetupStory(productId);
  if (!story) return null;

  return (
    <>
      <VideoSection video={story.video} />
      {story.scenes.map((scene, i) => (
        <SceneBand key={scene.title} scene={scene} flip={i % 2 === 1} />
      ))}
    </>
  );
}

/** Montagem, caixa, ruído e expansão — depois de "o que roda". */
export function SetupStoryProof({ productId, heroImage, heroName }: { productId: number; heroImage: string; heroName: string }) {
  const story = getSetupStory(productId);
  if (!story) return null;

  return (
    <>
      <AssemblyTrail steps={story.assembly} certificate={story.certificate} />
      <BoxLayout box={story.box} heroImage={heroImage} heroName={heroName} />
      <AcousticsChart acoustics={story.acoustics} />
      <ExpansionDiagram expansion={story.expansion} />
    </>
  );
}

/** Comparação com a vizinha e FAQ — fecham a página. */
export function SetupStoryClose({ productId, pitch }: { productId: number; pitch?: SetupPitch }) {
  const story = getSetupStory(productId);
  if (!story) return null;

  return (
    <>
      {pitch && <NeighborCompare pitch={pitch} />}
      <Faq faq={story.faq} />
    </>
  );
}
