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
    image: "https://images.unsplash.com/photo-1758410473598-ef957adbf57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBnYW1pbmclMjBzZXR1cCUyMGhlYWRzZXQlMjBrZXlib2FyZHxlbnwxfHx8fDE3NzM4NDQ2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "setupbr_",
    role: "Montagem e organização de cabo",
    about:
      "Documenta montagem de PC do zero há seis anos, sempre pensando em quem está montando a primeira máquina. Ficou conhecido pelos vídeos de organização de cabo, onde cada escolha leva em conta quem vai abrir o gabinete de novo daqui a dois anos.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1715078795172-c1636d5bc845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB1c2luZyUyMGNvbXB1dGVyJTIwZGVzayUyMHNldHVwJTIwZGFya3xlbnwxfHx8fDE3NzM4NDQ2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "techzera",
    role: "Teste de hardware em bancada",
    about:
      "Publica os números antes da opinião. Roda a mesma bateria de teste em toda peça que passa pela bancada, o que acabou virando uma base de comparação que a audiência consulta mais do que a própria análise. Prefere setup de trabalho a setup de vitrine.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1638741631188-a42a58d5499c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBnYW1lciUyMGRlc2t0b3AlMjBtb25pdG9yJTIwZGFyayUyMGFtYmllbnR8ZW58MXx8fHwxNzczODQ1MTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "gamergirlbr",
    role: "FPS competitivo e rotina de treino",
    about:
      "Mostra a rotina que sustenta o competitivo: treino de mira, ajuste de sensibilidade e mesa montada para sessão longa. Fala bastante de ergonomia, assunto que costuma ficar de fora do conteúdo de setup e que aparece cedo em quem joga muitas horas seguidas.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1619190324856-af3f6eb55601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1lciUyMG1pY3JvcGhvbmUlMjB3ZWJjYW0lMjBzZXR1cHxlbnwxfHx8fDE3NzM4NDQ2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "streamerbr",
    role: "Transmissão ao vivo e áudio",
    about:
      "Virou referência em áudio de live entre quem está começando. Ensina a montar captação decente sem sala tratada, aproveitando o que o quarto já oferece em vez de pedir investimento em acústica antes de qualquer outra coisa.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1767589908215-f583b894c9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0eXBpbmclMjBtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBjbG9zZXVwfGVufDF8fHx8MTc3Mzg0NDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "keybfanatic",
    role: "Teclado mecânico e customização",
    about:
      "Documenta cada troca de switch, lubrificação e ajuste de estabilizador. Mantém um comparativo público de som por switch que já passou de duzentas entradas, construído gravando sempre no mesmo microfone e na mesma distância.",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1760612484753-2311a768798a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lciUyMHdlYXJpbmclMjBoZWFkcGhvbmVzJTIwcGxheWluZyUyMGRhcmslMjByb29tfGVufDF8fHx8MTc3Mzg0NDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "neonsetup",
    role: "Iluminação e ambientação",
    about:
      "Trata o setup como cenário: luz de fundo, temperatura de cor e o quanto de RGB cabe antes de cansar a vista. Ensina a calibrar iluminação pela câmera, e não pelo olho, porque o que fica bonito ao vivo costuma estourar na foto.",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1624749076719-52c184a2e2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzaXR0aW5nJTIwZ2FtaW5nJTIwY2hhaXIlMjBkZXNrfGVufDF8fHx8MTc3Mzg0NDY4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "cleansetup",
    role: "Minimalismo e mesa limpa",
    about:
      "Defende que setup bom é aquele que some enquanto a pessoa trabalha. Monta com poucas peças, cabo fora de vista e paleta reduzida a duas cores, provando que dá para ter máquina forte sem transformar a mesa em vitrine.",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1684488624316-774ea1824d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0cmVhbWluZyUyMGNvbXB1dGVyJTIwUkdCJTIwbGlnaHRzfGVufDF8fHx8MTc3Mzg0NDY4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "rgbmaster_",
    role: "RGB e sincronização de iluminação",
    about:
      "Sincroniza a luz do gabinete, do periférico e da fita de LED sem depender de cinco programas abertos ao mesmo tempo. Publica preset pronto para quem quer o resultado sem passar pela configuração inteira.",
  },
];

export function InRealLifeSection() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

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
            Setups reais, peças reais
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
            Criadores brasileiros usando periférico e componente PCYES no setup do dia a dia. Clique numa foto pra conhecer quem está por trás.
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
              onClick={() => setSelectedPost(post)}
            >
              <ImageWithFallback
                src={post.image}
                alt={`Setup de @${post.username}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              />

              {/* Véu só na base, atrás do @. Antes o card inteiro escurecia para
                  dar contraste aos pontos de produto, que não existem mais. */}
              <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
                <span
                  className="block text-ink-strong"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
                >
                  @{post.username}
                </span>
                <span
                  className="mt-0.5 block"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-caption)",
                    color: "rgba(255,255,255,0.62)",
                  }}
                >
                  {post.role}
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
            onClick={() => setSelectedPost(null)}
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
              {/* Esquerda: a foto, sem marcação nenhuma por cima. */}
              <div className="md:w-[60%] flex-shrink-0 relative max-h-[40vh] md:max-h-none overflow-hidden">
                <ImageWithFallback
                  src={selectedPost.image}
                  alt={`Setup de @${selectedPost.username}`}
                  className="w-full h-full object-cover md:min-h-[520px]"
                />
              </div>

              {/* Direita: quem é a pessoa. */}
              <div className="md:w-[40%] p-6 md:p-8 flex flex-col overflow-y-auto">
                <button
                  onClick={() => setSelectedPost(null)}
                  aria-label="Fechar"
                  className="self-end flex h-11 w-11 items-center justify-center text-foreground/30 hover:text-foreground transition-colors cursor-pointer mb-4"
                >
                  <X size={20} />
                </button>

                <span
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
