import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * Feed de influenciador, não vitrine.
 *
 * A versão anterior marcava produto na foto e vendia direto do modal. Foi
 * removida de propósito: manter marcação por coordenada exige alguém repassando
 * X e Y a cada troca de foto, e no Magento isso vira campo customizado, tela de
 * administração e SKU amarrado a ponto na imagem. O bloco passa a ser o que já
 * era na prática, uma parede de fotos de gente usando produto PCYES, e o modal
 * conta quem é a pessoa.
 *
 * O histórico guarda a versão com produto marcado, caso valha a pena voltar.
 */
interface Post {
  id: number;
  image: string;
  username: string;
  /** O que a pessoa faz, em uma linha. Aparece embaixo do @. */
  role: string;
  /** Texto do "Sobre". Um parágrafo, tom de apresentação. */
  about: string;
}

const posts: Post[] = [
  {
    id: 1,
    image: "/influencers/alanzoka.png",
    username: "alanzoka",
    role: "Streamer, maior canal de games da Twitch BR",
    about:
      "Alan Ferreira transmite quase todo dia há mais de dez anos e construiu o maior canal de jogos do Brasil na Twitch. O formato mudou pouco nesse tempo: sessão longa, jogo do começo ao fim e conversa com o chat sem roteiro.",
  },
  {
    id: 2,
    image: "/influencers/yoda.png",
    username: "yoda",
    role: "League of Legends, campeão do CBLOL",
    about:
      "Felipe Noronha saiu do competitivo de League of Legends, onde foi campeão do CBLOL em 2017, e virou um dos streamers mais assistidos do país. Fundou a SehLoiro, rede que reúne criadores de conteúdo, e leva a mesma leitura de jogo do palco para a transmissão.",
  },
  {
    id: 3,
    image: "/influencers/sofiaespanha.png",
    username: "sofiaespanha",
    role: "Valorant e conteúdo IRL, criadora da FURIA",
    about:
      "Sofia Espanha faz parte do time de criadores da FURIA e reúne milhões de seguidores entre TikTok e Twitch. Alterna partida de Valorant com transmissão de react e conteúdo do dia a dia, formato que trouxe muita gente de fora do público de jogo para o competitivo.",
  },
  {
    id: 4,
    image: "/influencers/nobru.png",
    username: "nobru",
    role: "Free Fire, jogador e fundador da Fluxo",
    about:
      "Bruno Goes saiu do competitivo de Free Fire para montar a própria organização. A Fluxo nasceu em 2021 e virou uma das casas mais seguidas do país, com time em várias modalidades e uma base que acompanha o dia a dia da equipe.",
  },
  {
    id: 5,
    image: "/influencers/luba.png",
    username: "luba",
    role: "YouTube, gameplay e humor",
    about:
      "Um dos canais de games mais antigos ainda ativos no YouTube brasileiro. Ficou conhecido pela edição rápida e pelo humor em cima da própria gameplay, fórmula que atravessou mais de uma geração de público.",
  },
  {
    id: 6,
    image: "/influencers/muca.png",
    username: "mucahd",
    role: "Minecraft, construção e desafio",
    about:
      "Muca produz série longa de Minecraft, entre mega construção e desafio, e faz parte da Creative Squad. Mantém canal separado só para as transmissões ao vivo, onde a construção acontece do zero na frente de quem está assistindo.",
  },
  {
    id: 7,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/IEM_2015_San_Jose_Day_1_-_70.jpg?width=900",
    username: "fallen",
    role: "Counter-Strike, capitão e AWPer",
    about:
      "Gabriel Toledo, o nome mais conhecido do Counter-Strike brasileiro. Capitaneou a geração que levou o país a dois títulos de Major e fundou a Games Academy para formar jogador novo. Segue competindo em alto nível mais de uma década depois da estreia.",
  },
  {
    id: 8,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/BETWAY_AIM_CHALLENGE_COLDZERA_screenshot.jpg?width=900",
    username: "coldzera",
    role: "Counter-Strike, dois anos como melhor do mundo",
    about:
      "Marcelo David foi eleito o melhor jogador do mundo em 2016 e 2017, feito que nenhum outro brasileiro repetiu. Ficou marcado pelo salto com AWP contra a Team Liquid, jogada que virou pôster do Counter-Strike competitivo.",
  },
];

export function InRealLifeSection() {
  /* Guarda o índice, e não o post, porque o modal navega entre criadores:
     com o índice em mãos o anterior e o próximo saem de uma conta. */
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selectedPost = selectedIdx === null ? null : posts[selectedIdx];
  const scrollRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

  /* Circular: do último volta pro primeiro. Quem está vendo um feed espera
     continuar deslizando, não bater numa parede. */
  const goToPost = (dir: -1 | 1) =>
    setSelectedIdx((i) => (i === null ? i : (i + dir + posts.length) % posts.length));

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      else if (e.key === "ArrowLeft") goToPost(-1);
      else if (e.key === "ArrowRight") goToPost(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIdx]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const el = scrollRef.current;
    if (!mq.matches || !el) return;

    let raf = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    const SPEED = 0.35;

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 1800);
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", scheduleResume, { passive: true });
    el.addEventListener("touchcancel", scheduleResume, { passive: true });

    const step = () => {
      if (!paused) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) {
          raf = requestAnimationFrame(step);
          return;
        }
        if (el.scrollLeft + SPEED >= maxScroll) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += SPEED;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", scheduleResume);
      el.removeEventListener("touchcancel", scheduleResume);
    };
  }, []);

  return (
    <section className="px-5 py-16 md:px-[72px] md:py-20" style={{ background: "var(--surface-0)" }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p
            className="mb-3 text-primary"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.3em",
            }}
          >
            // PCYES IN REAL LIFE
          </p>
          <h2
            className="text-ink-strong"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(28px, 3vw, 36px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {/* A frase tem dois tempos separados pela vírgula. Solta, a quebra
                do celular caía depois de "tem", deixando a conjunção órfã no fim
                de uma linha e "PCYES" sozinho na outra. */}
            <span className="block md:inline">Onde tem performance,</span>{" "}
            tem PCYES
          </h2>
          <p
            className="mt-3 max-w-xl"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-sm)",
              color: "rgba(var(--foreground-rgb), 0.55)",
              lineHeight: 1.5,
            }}
          >
            A rotina dos criadores brasileiros que vivem de hardware, jogo e transmissão. Clique numa foto pra conhecer quem está por trás.
          </p>
        </motion.div>

        {/* Horizontal scrollable gallery */}
        <div className="relative group/carousel">
        <button
          onClick={() => scroll("left")}
          aria-label="Ver fotos anteriores"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-edge flex items-center justify-center text-ink hover:text-ink-strong hover:bg-black/80 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 cursor-pointer"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Ver próximas fotos"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-edge flex items-center justify-center text-ink hover:text-ink-strong hover:bg-black/80 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 cursor-pointer"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>

        <div
          ref={scrollRef}
          tabIndex={0}
          role="group"
          aria-label="Galeria de fotos — role horizontalmente"
          className="flex overflow-x-auto scrollbar-hide gap-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="stroke-hover-red flex-shrink-0 w-[240px] md:w-[300px] aspect-[3/4] relative group/card cursor-pointer overflow-hidden"
              style={{
                borderRadius: "var(--radius-card-lg)",
                border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                boxShadow: "var(--shadow-card-hairline)",
              }}
              onClick={() => setSelectedIdx(i)}
            >
              <ImageWithFallback
                src={post.image}
                alt={`Setup de @${post.username}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              />

              {/* Véu só na base, atrás do @. Antes o card inteiro escurecia para
                  dar contraste aos pontos de produto, que não existem mais.

                  Só o @ aqui: a função da pessoa fica para o modal. No card ela
                  competia com a foto, que é o que deve puxar o clique. */}
              <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
                <span
                  className="block text-ink-strong"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
                >
                  @{post.username}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* ─── Modal with tagged dots (Insider-style) ─── */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`${isDark ? "bg-surface-1" : "bg-card"} max-w-[960px] w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row`}
              style={{ borderRadius: "var(--radius-card)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Esquerda: a foto, com as setas para trocar de criador sem
                  precisar fechar e reabrir o modal. `key` no elemento animado
                  faz a foto atravessar um fade a cada troca. */}
              <div className="md:w-[60%] flex-shrink-0 relative max-h-[40vh] md:max-h-none overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPost.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full w-full"
                  >
                    <ImageWithFallback
                      src={selectedPost.image}
                      alt={`Setup de @${selectedPost.username}`}
                      className="w-full h-full object-cover md:min-h-[520px]"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={() => goToPost(-1)}
                  aria-label="Criador anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  onClick={() => goToPost(1)}
                  aria-label="Próximo criador"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Direita: quem é a pessoa. */}
              <div className="md:w-[40%] p-6 md:p-8 flex flex-col overflow-y-auto">
                <button
                  onClick={() => setSelectedIdx(null)}
                  aria-label="Fechar"
                  className="self-end flex h-11 w-11 items-center justify-center text-foreground/30 hover:text-foreground transition-colors cursor-pointer mb-4"
                >
                  <X size={20} />
                </button>

                <span
                  key={`user-${selectedPost.id}`}
                  className="text-foreground"
                  style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl, 22px)", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  @{selectedPost.username}
                </span>
                <span
                  className="text-foreground/45 mt-1"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
                >
                  {selectedPost.role}
                </span>

                <span
                  className="text-foreground/25 block mt-7 mb-3 tracking-wider"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
                >
                  SOBRE
                </span>
                <p
                  className="text-foreground/70"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.65 }}
                >
                  {selectedPost.about}
                </p>

                {/* Rodapé: diz onde a pessoa está na sequência e repete a
                    navegação em texto, para quem não associou as setas da foto
                    a trocar de criador. `mt-auto` cola no fim da coluna. */}
                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <span
                    className="text-foreground/30"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", letterSpacing: "0.06em" }}
                  >
                    {selectedIdx! + 1} de {posts.length} criadores
                  </span>
                  <button
                    onClick={() => goToPost(1)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-foreground/55 transition-colors hover:text-foreground cursor-pointer"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
                  >
                    Próximo
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
