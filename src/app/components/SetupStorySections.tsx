/**
 * BLOCO GLOBAL — a história do setup
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Vídeo, cenas de uso e FAQ. Só aparece em página de setup.
 *
 * O arquivo já teve cinco seções a mais entre "o que roda" e o FAQ — trilha de
 * montagem, o que vem na caixa, ruído e temperatura, o que ainda cabe dentro e a
 * comparação com a vizinha. Saíram por decisão do cliente: a página fica no que
 * a máquina FAZ, não em como ela foi montada. O conteúdo delas continua em
 * `getSetupStory` (`assembly`, `certificate`, `box`, `acoustics`, `expansion`),
 * então voltar qualquer uma é escrever a seção, não o texto.
 *
 * Com a comparação com a vizinha saiu também o único dado vivo daqui: era a
 * única seção que mostrava nome e preço de OUTRO produto, e a única que exigiria
 * consulta em runtime no Magento. Hoje tudo neste arquivo é conteúdo estático
 * indexado por persona × tier.
 *
 * REGRA DE DESENHO: cada seção usa um dispositivo visual DIFERENTE — vídeo,
 * faixa de cena alternada, acordeão. Resolver tudo com o mesmo card em grid é o
 * que faz uma página parecer gerada: o olho percebe o molde antes de ler o
 * conteúdo, e nada se destaca porque tudo tem o mesmo peso.
 *
 * Mesma fronteira do SetupWorkloadsBlock: recebe só o identificador da máquina e
 * lê o conteúdo de `lib/setups`. Nada é escrito por SKU
 * (ver docs/magento/setup-pdp-blocos.md).
 */

import { useState } from "react";
import { Play, Plus, Minus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getSetupStory, type SetupScene, type SetupStory } from "../lib/setups";

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

/**
 * FAQ — fecha a página, logo depois de "o que roda nessa máquina".
 *
 * Entre um e outro existiam cinco seções: "// ANTES DE SAIR DAQUI" (trilha de
 * montagem + certificado), "// UMA CAIXA SÓ", "// SILÊNCIO E TEMPERATURA",
 * "// O QUE AINDA CABE DENTRO" e "// ESSA OU A VIZINHA". Saíram todas por
 * decisão do cliente — a página fica no que a máquina faz, não em como ela foi
 * montada. Os dados delas continuam em `getSetupStory`; se alguma voltar, é
 * escrever a seção de novo, não o conteúdo.
 */
export function SetupStoryClose({ productId }: { productId: number }) {
  const story = getSetupStory(productId);
  if (!story) return null;

  return <Faq faq={story.faq} />;
}
