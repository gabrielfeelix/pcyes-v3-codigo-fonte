import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SOCIAL_BRANDS, SocialBrandIcon, socialNetworkFromUrl } from "./SocialBrandIcon";

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
  /** O que a pessoa faz, em uma linha. Aparece embaixo do @. Vazio = some. */
  role?: string;
  /** Texto do "Sobre". Um parágrafo, tom de apresentação. Vazio = o bloco some. */
  about?: string;
  /**
   * Reenquadramento da foto, no formato do `object-position`.
   *
   * O quadro é em pé e boa parte das fotos vem deitada, então o corte central
   * pode deixar a pessoa espremida na beirada. Só preencher quando o padrão
   * não servir.
   */
  imgPos?: string;
  /** Perfis da pessoa, na ordem em que aparecem no modal. Vazio = o bloco some. */
  socials?: Social[];
}

interface Social {
  /** Nome da rede, como aparece na pílula. Duas contas na mesma rede levam o @ junto. */
  label: string;
  url: string;
}

/* Fotos finais do design (Site V2), 1200×1600 (3:4). @, nome, seguidores, bio e
   redes vêm da apresentação dos criadores enviada pelo marketing (out/2026). */
const posts: Post[] = [
  {
    id: 1, image: "/influencers/king.webp", username: "kingsizejoga",
    role: "King · +334,6k seguidores",
    about: "King (KingSizejoga) é criador de conteúdo gamer, conhecido por seus conteúdos de jogos e entretenimento, com presença em diferentes redes sociais e uma comunidade de mais de 334 mil seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/kingsizejoga/" },
      { label: "Twitch", url: "https://www.twitch.tv/kingsizejoga" },
      { label: "TikTok", url: "https://www.tiktok.com/@kingsizejoga" },
      { label: "YouTube", url: "https://www.youtube.com/@KingSizejoga" },
    ],
  },
  {
    id: 2, image: "/influencers/atri.webp", username: "atriaki",
    role: "Atri · +113,7k seguidores",
    about: "Amanda Nickhorn, conhecida como Atri, é criadora de conteúdo do universo gamer, com conteúdos voltados para games e entretenimento.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/atriakii/" },
      { label: "Twitch", url: "https://www.twitch.tv/atriaki" },
      { label: "TikTok", url: "https://www.tiktok.com/@atriaki" },
    ],
  },
  {
    id: 3, image: "/influencers/butterzinho.webp", username: "butterzim",
    role: "Butterzim · +609,3k seguidores",
    about: "Butterzim é criador de conteúdo gamer, conhecido por seus vídeos de jogos e entretenimento nas redes sociais, com uma comunidade de mais de 609 mil seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/butterzim/" },
      { label: "YouTube", url: "https://www.youtube.com/@butterzim" },
      { label: "TikTok", url: "https://www.tiktok.com/@butterzim" },
      { label: "X", url: "https://x.com/butterzimm" },
    ],
  },
  {
    id: 4, image: "/influencers/kaciane.webp", username: "kacianecaroline",
    role: "Kaciane · +904,5k seguidores",
    about: "Kaciane Caroline é criadora de conteúdo conhecida por seus vídeos de games, humor e entretenimento, com presença em diferentes redes sociais e uma comunidade de mais de 904 mil seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/kacianecaroline/" },
      { label: "YouTube", url: "https://www.youtube.com/@kacianecaroline" },
      { label: "TikTok", url: "https://www.tiktok.com/@kacianecaroline" },
      { label: "Facebook", url: "https://www.facebook.com/kacianecarolinee" },
    ],
  },
  {
    id: 5, image: "/influencers/lucas-incrivel-filme.webp", username: "incrivelfilme",
    role: "Lucas · +2M seguidores",
    about: "Lucas Dominic do perfil Incrível Filme é criador de conteúdo conhecido por falar sobre filmes e cinema, com mais de 2 milhões de seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/incrivelfilme/" },
      { label: "YouTube", url: "https://www.youtube.com/@incrivelfilme" },
      { label: "TikTok", url: "https://www.tiktok.com/@incrivelfilme" },
      { label: "Facebook", url: "https://www.facebook.com/incrivelfilmeoficial" },
    ],
  },
  {
    id: 6, image: "/influencers/paivinha.webp", username: "paivinha29",
    role: "Paivinha · +1,1M seguidores",
    about: "Gustavo Paiva, conhecido como Paivinha, é criador de conteúdo gamer, conhecido por seus conteúdos de futebol virtual, com uma comunidade de mais de 1,1 milhão de seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/paivinha29/" },
      { label: "Twitch", url: "https://www.twitch.tv/paivinha29" },
      { label: "YouTube", url: "https://www.youtube.com/@PAIVINHA_29" },
      { label: "TikTok", url: "https://www.tiktok.com/@paivinha29_" },
      { label: "Kick", url: "https://kick.com/paivinha" },
    ],
  },
  {
    id: 7, image: "/influencers/projeto-trivia.webp", username: "oprojetotrivia",
    role: "Projeto Trivia · +1,5M seguidores",
    about: "Estevão e Eduardo, do Projeto Trivia, são irmãos e criadores de conteúdo conhecidos por seus vídeos de perguntas e respostas e desafios de conhecimentos gerais, com mais de 1,5 milhão de seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/oprojetotrivia/" },
      { label: "TikTok", url: "https://www.tiktok.com/@oprojetotrivia" },
      { label: "YouTube", url: "https://www.youtube.com/@PROJETOTRIVIA2" },
    ],
  },
  {
    id: 8, image: "/influencers/wesley.webp", username: "wesyfrancisco",
    role: "Wesley · +603k seguidores",
    about: "Wesley Francisco, conhecido como Wesy, é criador de conteúdo gamer, com vídeos voltados para jogos e entretenimento e uma comunidade de mais de 603 mil seguidores.",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/wesyfrancisco/" },
      { label: "YouTube @wesy", url: "https://www.youtube.com/@wesy" },
      { label: "YouTube @WesyTvz", url: "https://www.youtube.com/@WesyTvz" },
      { label: "TikTok", url: "https://www.tiktok.com/@wesyfrancisco" },
    ],
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

  /**
   * Carrossel infinito.
   *
   * A lista é repetida três vezes e a rolagem começa na cópia do meio. Quando
   * a posição se afasta demais do centro, ela volta uma cópia inteira: como as
   * três são idênticas, o salto cai exatamente sobre a mesma imagem e não
   * aparece. Assim a seta da direita nunca trava no fim, a da esquerda nunca
   * trava no começo, e a rolagem automática do celular deixa de dar aquele
   * pulo ao voltar para a primeira foto.
   */
  const LOOP = 3;
  const items = useMemo(() => Array.from({ length: LOOP }, () => posts).flat(), []);

  /* Enquanto uma rolagem suave está em curso, ninguém pode tocar no
     `scrollLeft`: escrever nele no meio do caminho mata a animação, e a
     normalização passa a brigar com ela. Foi o que fazia a seta andar suave
     duas vezes e na terceira dar um tranco para trás. */
  const rolandoRef = useRef(false);
  const fimDaRolagem = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Largura de uma cópia da lista.
   *
   * Não é `scrollWidth / 3`: a lista tem um espaçamento entre cada par de
   * cards, e o último não tem espaçamento depois dele, então a divisão dá
   * 5px a menos que o período real. Costurando por esse valor a imagem
   * escorregava um pouco a cada volta, e o erro se somava. Medir a distância
   * entre o primeiro card de uma cópia e o da cópia seguinte dá o período
   * exato.
   */
  const larguraDaCopia = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const c = el.children;
    if (c.length <= posts.length) return el.scrollWidth / LOOP;
    return (c[posts.length] as HTMLElement).offsetLeft - (c[0] as HTMLElement).offsetLeft;
  }, []);

  const normalizeLoop = useCallback(() => {
    const el = scrollRef.current;
    if (!el || rolandoRef.current) return;
    const seg = larguraDaCopia();
    if (seg <= 0) return;
    if (el.scrollLeft < seg * 0.5) el.scrollLeft += seg;
    else if (el.scrollLeft > seg * 1.5) el.scrollLeft -= seg;
  }, [larguraDaCopia]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = larguraDaCopia();
    el.addEventListener("scroll", normalizeLoop, { passive: true });
    return () => {
      el.removeEventListener("scroll", normalizeLoop);
      if (fimDaRolagem.current) clearTimeout(fimDaRolagem.current);
    };
  }, [normalizeLoop, larguraDaCopia]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const seg = larguraDaCopia();
    const delta = (dir === "left" ? -1 : 1) * el.clientWidth * 0.6;

    /* Recentra ANTES de animar, olhando onde a rolagem vai parar. O salto de
       uma cópia inteira acontece com a lista parada e cai sobre a mesma
       imagem, então não aparece, e a animação seguinte corre inteira. */
    const alvo = el.scrollLeft + delta;
    if (alvo < seg * 0.5) el.scrollLeft += seg;
    else if (alvo > seg * 1.5) el.scrollLeft -= seg;

    rolandoRef.current = true;
    el.scrollBy({ left: delta, behavior: "smooth" });
    if (fimDaRolagem.current) clearTimeout(fimDaRolagem.current);
    fimDaRolagem.current = setTimeout(() => { rolandoRef.current = false; }, 700);
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

    /* O deslocamento se acumula fora do elemento e só é aplicado quando passa
       de um pixel inteiro. `scrollLeft` arredonda o valor recebido, então
       somar 0,35 a cada quadro direto nele não saía do lugar: lia 2043,
       gravava 2043,35 e o navegador guardava 2043 de novo. A rolagem
       automática ficava parada. */
    let acc = 0;
    const step = () => {
      if (!paused) {
        acc += SPEED;
        if (acc >= 1) {
          const inteiro = Math.floor(acc);
          acc -= inteiro;
          /* Sem reset manual no fim: quem devolve a posição é o normalizeLoop,
             e ele faz isso sobre uma cópia idêntica, sem pulo visível. */
          el.scrollLeft += inteiro;
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
          {items.map((post, i) => (
            <motion.div
              key={`${post.id}-${Math.floor(i / posts.length)}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % posts.length) * 0.05 }}
              className="stroke-hover-red flex-shrink-0 w-[240px] md:w-[300px] aspect-[3/4] relative group/card cursor-pointer overflow-hidden"
              style={{
                borderRadius: "var(--radius-card-lg)",
                border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                boxShadow: "var(--shadow-card-hairline)",
              }}
              onClick={() => setSelectedIdx(i % posts.length)}
            >
              <ImageWithFallback
                src={post.image}
                alt={`Setup de @${post.username}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                style={{ objectPosition: post.imgPos ?? "center" }}
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
                      style={{ objectPosition: selectedPost.imgPos ?? "center" }}
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

              {/* Direita: quem é a pessoa. `min-h-0` deixa a coluna encolher
                  dentro do modal no celular e rolar; sem ele o fim (redes e
                  "Próximo") ficava cortado pelo `overflow-hidden` do modal. */}
              <div className="md:w-[40%] min-h-0 p-6 md:p-8 flex flex-col overflow-y-auto">
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
                {selectedPost.role && (
                <span
                  className="text-foreground/45 mt-1"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}
                >
                  {selectedPost.role}
                </span>
                )}

                {selectedPost.about && (
                <>
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
                </>
                )}

                {selectedPost.socials && selectedPost.socials.length > 0 && (
                <>
                <span
                  className="text-foreground/25 block mt-7 mb-3 tracking-wider"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
                >
                  REDES
                </span>
                <div className="flex flex-wrap gap-2">
                  {/* Cada pílula carrega a cor da rede em `--brand`: o logo já
                      vem nela, e no hover a borda e o fundo acendem no mesmo tom. */}
                  {selectedPost.socials.map((s) => {
                    const network = socialNetworkFromUrl(s.url);
                    const brand = network ? SOCIAL_BRANDS[network].color : "#ffffff";
                    return (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.label} de @${selectedPost.username} (abre em nova aba)`}
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] pl-3 pr-4 text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:text-foreground hover:border-[color-mix(in_srgb,var(--brand)_55%,transparent)] hover:bg-[color-mix(in_srgb,var(--brand)_14%,transparent)]"
                        style={{ "--brand": brand, fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 } as CSSProperties}
                      >
                        {network && <SocialBrandIcon network={network} size={16} />}
                        {s.label}
                      </a>
                    );
                  })}
                </div>
                </>
                )}

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
