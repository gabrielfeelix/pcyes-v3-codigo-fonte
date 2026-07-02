import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { X, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";

interface TaggedProduct {
  name: string;
  price: string;
  image: string;
  /** Position of the dot on the image (percentage) */
  x: number;
  y: number;
}

interface Post {
  id: number;
  image: string;
  username: string;
  products: TaggedProduct[];
}

const posts: Post[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1758410473598-ef957adbf57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBnYW1pbmclMjBzZXR1cCUyMGhlYWRzZXQlMjBrZXlib2FyZHxlbnwxfHx8fDE3NzM4NDQ2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "setupbr_",
    products: [
      { name: "Headset Fallen 7.1", price: "R$ 279,90", image: "https://images.unsplash.com/photo-1673669231301-09baa4d7761b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczODM5Nzk1fDA&ixlib=rb-4.1.0&q=80&w=400", x: 50, y: 22 },
      { name: "Teclado Striker RGB", price: "R$ 349,90", image: "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBjbG9zZXVwJTIwZGFya3xlbnwxfHx8fDE3NzM4Mzk3OTZ8MA&ixlib=rb-4.1.0&q=80&w=400", x: 55, y: 72 },
      { name: "Mouse Cobra V2", price: "R$ 189,90", image: "https://images.unsplash.com/photo-1768561327952-119a4c9c76f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGRhcmslMjBtaW5pbWFsfGVufDF8fHx8MTc3MzgzOTc5NHww&ixlib=rb-4.1.0&q=80&w=400", x: 78, y: 68 },
    ],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1715078795172-c1636d5bc845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB1c2luZyUyMGNvbXB1dGVyJTIwZGVzayUyMHNldHVwJTIwZGFya3xlbnwxfHx8fDE3NzM4NDQ2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "techzera",
    products: [
      { name: "Monitor Ultrawide 34\"", price: "R$ 2.199,90", image: "https://images.unsplash.com/photo-1604329051903-d89ddd523330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQQyUyMGJhdHRsZXN0YXRpb24lMjB1bHRyYXdpZGUlMjBtb25pdG9yfGVufDF8fHx8MTc3Mzg0MzU5OXww&ixlib=rb-4.1.0&q=80&w=400", x: 50, y: 30 },
      { name: "Deskpad RGB Pro", price: "R$ 149,90", image: "https://images.unsplash.com/photo-1713012003065-7ca32db003ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSR0IlMjBtb3VzZXBhZCUyMGRlc2slMjBtYXQlMjBkYXJrfGVufDF8fHx8MTc3Mzg0MDQwOXww&ixlib=rb-4.1.0&q=80&w=400", x: 50, y: 75 },
    ],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1638741631188-a42a58d5499c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBnYW1lciUyMGRlc2t0b3AlMjBtb25pdG9yJTIwZGFyayUyMGFtYmllbnR8ZW58MXx8fHwxNzczODQ1MTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "gamergirlbr",
    products: [
      { name: "Headset Fallen 7.1", price: "R$ 279,90", image: "https://images.unsplash.com/photo-1673669231301-09baa4d7761b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczODM5Nzk1fDA&ixlib=rb-4.1.0&q=80&w=400", x: 45, y: 18 },
      { name: "Gabinete Spectrum Pro", price: "R$ 599,90", image: "https://images.unsplash.com/photo-1695120485648-0b6eed4707aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNhc2UlMjB0b3dlciUyMGRhcmt8ZW58MXx8fHwxNzczODM5Nzk1fDA&ixlib=rb-4.1.0&q=80&w=400", x: 20, y: 60 },
    ],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1619190324856-af3f6eb55601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlYW1lciUyMG1pY3JvcGhvbmUlMjB3ZWJjYW0lMjBzZXR1cHxlbnwxfHx8fDE3NzM4NDQ2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    username: "streamerbr",
    products: [
      { name: "Studio X Microfone", price: "R$ 489,90", image: "https://images.unsplash.com/photo-1579870946215-8284f1a47c9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Bob25lJTIwY29uZGVuc2VyJTIwc3R1ZGlvJTIwZGFya3xlbnwxfHx8fDE3NzM4NDA0MTB8MA&ixlib=rb-4.1.0&q=80&w=400", x: 48, y: 35 },
      { name: "Monitor PCYES 27\"", price: "R$ 1.599,90", image: "https://images.unsplash.com/photo-1604329051903-d89ddd523330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQQyUyMGJhdHRsZXN0YXRpb24lMjB1bHRyYXdpZGUlMjBtb25pdG9yfGVufDF8fHx8MTc3Mzg0MzU5OXww&ixlib=rb-4.1.0&q=80&w=400", x: 72, y: 25 },
      { name: "Teclado Striker RGB", price: "R$ 349,90", image: "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBjbG9zZXVwJTIwZGFya3xlbnwxfHx8fDE3NzM4Mzk3OTZ8MA&ixlib=rb-4.1.0&q=80&w=400", x: 40, y: 78 },
    ],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1767589908215-f583b894c9d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB0eXBpbmclMjBtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBjbG9zZXVwfGVufDF8fHx8MTc3Mzg0NDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "keybfanatic",
    products: [
      { name: "Teclado Striker TKL", price: "R$ 299,90", image: "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBjbG9zZXVwJTIwZGFya3xlbnwxfHx8fDE3NzM4Mzk3OTZ8MA&ixlib=rb-4.1.0&q=80&w=400", x: 50, y: 55 },
    ],
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1760612484753-2311a768798a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lciUyMHdlYXJpbmclMjBoZWFkcGhvbmVzJTIwcGxheWluZyUyMGRhcmslMjByb29tfGVufDF8fHx8MTc3Mzg0NDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "neonsetup",
    products: [
      { name: "Headset Fallen 7.1", price: "R$ 279,90", image: "https://images.unsplash.com/photo-1673669231301-09baa4d7761b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczODM5Nzk1fDA&ixlib=rb-4.1.0&q=80&w=400", x: 50, y: 20 },
      { name: "Mouse Cobra V2", price: "R$ 189,90", image: "https://images.unsplash.com/photo-1768561327952-119a4c9c76f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGRhcmslMjBtaW5pbWFsfGVufDF8fHx8MTc3MzgzOTc5NHww&ixlib=rb-4.1.0&q=80&w=400", x: 70, y: 65 },
    ],
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1624749076719-52c184a2e2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzaXR0aW5nJTIwZ2FtaW5nJTIwY2hhaXIlMjBkZXNrfGVufDF8fHx8MTc3Mzg0NDY4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "cleansetup",
    products: [
      { name: "Cadeira Titan Elite", price: "R$ 1.899,90", image: "https://images.unsplash.com/photo-1757194455393-8e3134d4ce19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMGVyZ29ub21pYyUyMGRhcmt8ZW58MXx8fHwxNzczODQwNDA4fDA&ixlib=rb-4.1.0&q=80&w=400", x: 45, y: 55 },
      { name: "Monitor PCYES 27\"", price: "R$ 1.599,90", image: "https://images.unsplash.com/photo-1604329051903-d89ddd523330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQQyUyMGJhdHRsZXN0YXRpb24lMjB1bHRyYXdpZGUlMjBtb25pdG9yfGVufDF8fHx8MTc3Mzg0MzU5OXww&ixlib=rb-4.1.0&q=80&w=400", x: 52, y: 22 },
    ],
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1684488624316-774ea1824d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHN0cmVhbWluZyUyMGNvbXB1dGVyJTIwUkdCJTIwbGlnaHRzfGVufDF8fHx8MTc3Mzg0NDY4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    username: "rgbmaster_",
    products: [
      { name: "Gabinete Spectrum Pro", price: "R$ 599,90", image: "https://images.unsplash.com/photo-1695120485648-0b6eed4707aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGNhc2UlMjB0b3dlciUyMGRhcmt8ZW58MXx8fHwxNzczODM5Nzk1fDA&ixlib=rb-4.1.0&q=80&w=400", x: 25, y: 50 },
      { name: "Cooler Galaxy 360mm", price: "R$ 699,90", image: "https://images.unsplash.com/photo-1630831506636-5209d7349db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHBvd2VyJTIwc3VwcGx5JTIwdW5pdCUyMGRhcmt8ZW58MXx8fHwxNzczODM5Nzk2fDA&ixlib=rb-4.1.0&q=80&w=400", x: 30, y: 32 },
      { name: "Teclado Striker RGB", price: "R$ 349,90", image: "https://images.unsplash.com/photo-1718803448073-90ebd0d982e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBjbG9zZXVwJTIwZGFya3xlbnwxfHx8fDE3NzM4Mzk3OTZ8MA&ixlib=rb-4.1.0&q=80&w=400", x: 60, y: 80 },
    ],
  },
];

export function InRealLifeSection() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [highlightedProduct, setHighlightedProduct] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
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

  const handleAddToCart = (product: TaggedProduct) => {
    addItem({
      id: product.name.toLowerCase().replace(/\s/g, "-"),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

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
            Periféricos e componentes PCYES presentes nos melhores setups do Brasil. Clique pra explorar.
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
              onClick={() => { setSelectedPost(post); setHighlightedProduct(null); }}
            >
              <ImageWithFallback
                src={post.image}
                alt={post.username}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              />

              {/* Hover overlay with dots preview */}
              <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-400">
                {/* Mini dots */}
                {post.products.map((_, pi) => (
                  <div
                    key={pi}
                    className="absolute w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                    style={{
                      left: `${post.products[pi].x}%`,
                      top: `${post.products[pi].y}%`,
                      transform: "translate(-50%, -50%)",
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-caption)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "#000",
                    }}
                  >
                    {pi + 1}
                  </div>
                ))}
              </div>

              {/* Username at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-400">
                <span
                  className="text-ink"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)" }}
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
              {/* Left — image with dots */}
              <div className="md:w-[60%] flex-shrink-0 relative max-h-[40vh] md:max-h-none overflow-hidden">
                <ImageWithFallback
                  src={selectedPost.image}
                  alt={selectedPost.username}
                  className="w-full h-full object-cover md:min-h-[520px]"
                />

                {/* Numbered dots on the image */}
                {selectedPost.products.map((product, pi) => (
                  <button
                    key={pi}
                    className="absolute flex h-11 w-11 cursor-pointer items-center justify-center"
                    style={{
                      left: `${product.x}%`,
                      top: `${product.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setHighlightedProduct(highlightedProduct === pi ? null : pi)}
                    onMouseEnter={() => setHighlightedProduct(pi)}
                    onMouseLeave={() => setHighlightedProduct(null)}
                  >
                    <span
                      className={`transition-all duration-300 ${highlightedProduct === pi
                        ? "w-9 h-9 bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb,255,255,255),0.4)]"
                        : "w-7 h-7 bg-white/90 hover:bg-white hover:scale-110 shadow-lg"
                        } rounded-full flex items-center justify-center`}
                      style={{
                        fontFamily: "var(--font-family-inter)",
                        fontSize: highlightedProduct === pi ? "13px" : "12px",
                        fontWeight: "var(--font-weight-semibold)",
                        color: highlightedProduct === pi ? "#fff" : "#000",
                      }}
                    >
                      {pi + 1}
                    </span>
                  </button>
                ))}

                {/* Pulsing animation rings */}
                {selectedPost.products.map((product, pi) => (
                  <div
                    key={`ring-${pi}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${product.x}%`,
                      top: `${product.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="absolute inset-0 w-7 h-7 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2.5s", left: "-14px", top: "-14px" }} />
                  </div>
                ))}
              </div>

              {/* Right — product list */}
              <div className="md:w-[40%] p-6 md:p-8 flex flex-col overflow-y-auto">
                {/* Close */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="self-end flex h-11 w-11 items-center justify-center text-foreground/30 hover:text-foreground transition-colors cursor-pointer mb-4"
                >
                  <X size={20} />
                </button>

                {/* Username */}
                <span
                  className="text-foreground/40 mb-1"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                >
                  @{selectedPost.username}
                </span>

                {/* Section label */}
                <span
                  className="text-foreground/20 block mb-6 tracking-wider"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)" }}
                >
                  PRODUTOS NA IMAGEM
                </span>

                {/* Products list */}
                <div className="space-y-3 flex-1">
                  {selectedPost.products.map((product, pi) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: pi * 0.08 }}
                      className={`flex items-center gap-4 p-3 border transition-all duration-300 cursor-pointer ${highlightedProduct === pi
                        ? "border-primary/40 bg-primary/5"
                        : "border-foreground/8 hover:border-foreground/15"
                        }`}
                      style={{ borderRadius: "var(--radius-card)" }}
                      onMouseEnter={() => setHighlightedProduct(pi)}
                      onMouseLeave={() => setHighlightedProduct(null)}
                    >
                      {/* Number badge */}
                      <div
                        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${highlightedProduct === pi ? "bg-primary text-ink-strong" : "bg-foreground/10 text-foreground/50"
                          }`}
                        style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" }}
                      >
                        {pi + 1}
                      </div>

                      {/* Product image */}
                      <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-foreground/5" style={{ borderRadius: "var(--radius)" }}>
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`truncate transition-colors duration-300 ${highlightedProduct === pi ? "text-foreground" : "text-foreground/80"
                            }`}
                          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}
                        >
                          {product.name}
                        </p>
                        <p
                          className="text-foreground/35"
                          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}
                        >
                          {product.price}
                        </p>
                      </div>

                      {/* Add to cart button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="flex-shrink-0 w-11 h-11 md:w-9 md:h-9 rounded-full border border-foreground/15 text-foreground/40 hover:text-foreground hover:border-foreground/40 transition-all duration-300 cursor-pointer flex items-center justify-center"
                        title="Comprar"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Add all CTA */}
                <button
                  onClick={() => selectedPost.products.forEach(p => handleAddToCart(p))}
                  className="mt-6 w-full py-3 border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    borderRadius: "var(--radius-button)",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-caption)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  <ShoppingBag size={14} />
                  Comprar todos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
