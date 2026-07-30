"use client";

import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./section";
import { allProducts } from "./productsData";
import {
  getVisibleCatalogProducts,
  getProductCategory,
  getProductSubcategory,
  getPrimaryProductImage,
} from "./productPresentation";

/**
 * Vitrine de categorias — três layouts intercambiáveis (seletor 1/2/3).
 *
 *   1. Bento    — mosaico assimétrico, tudo numa dobra, sem scroll.
 *   2. Spotlight — carrossel de capas de PRODUTO sobre fundo escuro com brilho
 *                  vermelho; setas avançam.
 *   3. Rail     — capa "ver tudo" grande + tiles minimalistas de produto com
 *                  contagem, no estilo de vitrine editorial.
 *
 * Categorias reduzidas a 6 (sem Gabinetes/Microfones) para o bento caber sem
 * rolagem. Contagem e capa de produto saem do catálogo real.
 */

interface CategoryDef {
  label: string;
  teaser: string;
  href: string;
  /** Imagem lifestyle (V1/V3 hero). */
  lifestyle: string;
  /** Categoria canônica para casar no catálogo. */
  category: string;
  /** Rótulo de subcategoria; ausente = categoria inteira. */
  subLabel?: string;
  /** object-position da imagem no bento — reenquadra para o produto aparecer. */
  imgPos?: string;
}

/* Ordem pensada para o encaixe da imagem no bento (ver BENTO_SPAN):
   Teclados (hero 2×2, paisagem casa em qualquer frame) → Cadeiras (frame alto,
   a cadeira precisa de espaço vertical) → depois os produtos que fecham bem em
   quadrado pequeno. As demais views (2–5) só herdam esta ordem. */
const CATEGORY_DEFS: CategoryDef[] = [
  {
    label: "Gabinetes",
    teaser: "Fluxo de ar e vitrine",
    href: "/gabinetes/",
    lifestyle: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1600&q=85&auto=format&fit=crop",
    category: "Gabinetes",
  },
  {
    label: "Cadeiras Gamer",
    teaser: "Ergonomia de maratona",
    href: "/cadeiras/cadeiras-gamer/",
    lifestyle: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=85&auto=format&fit=crop",
    category: "Cadeiras",
    subLabel: "Cadeiras Gamer",
  },
  {
    label: "Mouses",
    teaser: "Precisão e alto polling",
    href: "/perifericos/mouses/",
    lifestyle: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=1200&q=85&auto=format&fit=crop",
    category: "Periféricos",
    subLabel: "Mouses",
  },
  {
    label: "Headsets",
    teaser: "Áudio imersivo",
    href: "/perifericos/headsets/",
    lifestyle: "https://images.unsplash.com/photo-1599669454699-248893623440?w=1200&q=85&auto=format&fit=crop",
    category: "Periféricos",
    subLabel: "Headsets e Fones",
  },
  {
    label: "Monitores",
    teaser: "Alta taxa de atualização",
    href: "/monitores/",
    lifestyle: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=1200&q=85&auto=format&fit=crop",
    category: "Monitores",
    imgPos: "center 28%",
  },
  {
    label: "Microfones",
    teaser: "Broadcast e stream",
    href: "/streaming/microfones/",
    lifestyle: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=85&auto=format&fit=crop",
    category: "Streaming",
    subLabel: "Microfones",
    imgPos: "center 82%",
  },
  {
    label: "Teclados",
    teaser: "Mecânicos, switches e RGB",
    href: "/perifericos/teclados/",
    lifestyle: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=85&auto=format&fit=crop",
    category: "Periféricos",
    subLabel: "Teclados",
  },
  {
    label: "Placas de Vídeo",
    teaser: "Ray tracing e DLSS",
    href: "/placas-de-video/",
    lifestyle: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&q=85&auto=format&fit=crop",
    category: "Placas de Vídeo",
  },
];

interface Category extends CategoryDef {
  count: number;
  productCover: string;
}

type ViewMode = 1 | 2 | 3 | 4 | 5;

/* ── V1 — Bento ─────────────────────────────────────────────────────────── */

/* Ritmo do mosaico. Teclados é o herói (2×2); ao lado dele, quatro quadrados
   iguais (Mouses, Headsets, Cadeiras, Microfones); Monitores fecha a base numa
   faixa larga e Gabinetes + Placas completam como quadrados. O índice do array
   segue a ordem de CATEGORY_DEFS; com grid-auto-flow dense os buracos preenchem
   sozinhos. */
const BENTO_SPAN = [
  "col-span-2 row-span-2", // Teclados (hero, paisagem preenche o quadrado grande)
  "row-span-2", // Cadeiras (frame alto — a cadeira ganha espaço vertical)
  "", // Mouses
  "", // Headsets
  "", // Monitores
  "", // Microfones
  "", // Gabinetes
  "", // Placas
];

function BentoCell({ cat, index }: { cat: Category; index: number }) {
  return (
    <Link
      to={cat.href}
      className={`bento-cell group relative overflow-hidden ${BENTO_SPAN[index] ?? ""}`}
      style={{
        borderRadius: "var(--radius-card-lg)",
        border: "1px solid rgba(var(--foreground-rgb), 0.08)",
        background: "var(--surface-1)",
      }}
    >
      <ImageWithFallback
        src={cat.lifestyle}
        alt={cat.label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ objectPosition: cat.imgPos ?? "center" }}
      />
      {/* Véu curto só atrás do texto — topo e base leves, meio 100% limpo para
          a imagem aparecer. Antes o scrim cobria o tile inteiro e escondia o
          produto. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.32) 0%, transparent 12%, transparent 80%, rgba(8,8,10,0.42) 100%)",
        }}
      />
      {/* Anel vermelho suave no hover — sombra contida, sem exagero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: "var(--radius-card-lg)",
          boxShadow: "inset 0 0 0 1.5px rgba(225,6,0,0.55)",
        }}
      />
      <div className="absolute left-4 right-4 top-4 md:left-5 md:top-5 flex items-start justify-between">
        <div>
          <span
            className="block text-ink-strong"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(15px, 1.35vw, 20px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            {cat.label}
          </span>
          <span
            className="mt-1.5 block h-[2px] w-6 origin-left transition-transform duration-300 group-hover:scale-x-[2.2]"
            style={{ background: "var(--primary)" }}
          />
        </div>
        <span
          className="hidden md:block tabular-nums"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            color: "rgba(var(--foreground-rgb), 0.4)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5 flex items-end justify-between gap-3">
        <span
          className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            color: "rgba(var(--foreground-rgb), 0.82)",
            textShadow: "0 1px 5px rgba(0,0,0,0.55)",
          }}
        >
          {cat.count} produtos
        </span>
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "rgba(10,10,11,0.5)",
            border: "1px solid rgba(var(--foreground-rgb), 0.14)",
            color: "white",
            backdropFilter: "blur(6px)",
          }}
        >
          <ArrowUpRight size={15} strokeWidth={2.4} className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

function BentoView({ categories }: { categories: Category[] }) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      style={{ gridAutoRows: "clamp(150px, 16vw, 190px)", gridAutoFlow: "dense" }}
    >
      {categories.map((cat, i) => (
        <BentoCell key={cat.href} cat={cat} index={i} />
      ))}
    </div>
  );
}

/* ── carrossel base (V2 e V3) ──────────────────────────────────────────── */

function useRailScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return { ref, scroll };
}

function RailArrows({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const base =
    "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer";
  const style = {
    background: "rgba(20,20,22,0.9)",
    border: "1px solid rgba(var(--foreground-rgb), 0.12)",
    color: "white",
  };
  return (
    <div className="flex items-center gap-2">
      <button onClick={onPrev} aria-label="Anterior" className={base} style={style}>
        <ChevronLeft size={18} strokeWidth={2.2} />
      </button>
      <button onClick={onNext} aria-label="Próximo" className={base} style={style}>
        <ChevronRight size={18} strokeWidth={2.2} />
      </button>
    </div>
  );
}

/* ── V2 — Spotlight (capa de produto, fundo escuro + brilho vermelho) ───── */

function SpotlightView({ categories }: { categories: Category[] }) {
  const { ref, scroll } = useRailScroll();
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <RailArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat, i) => (
          <Link
            key={cat.href}
            to={cat.href}
            data-rail-card
            className="spotlight-card group relative flex-shrink-0 snap-start overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            style={{
              width: "clamp(240px, 27vw, 320px)",
              aspectRatio: "4 / 5",
              borderRadius: "var(--radius-card-lg)",
              border: "1px solid rgba(var(--foreground-rgb), 0.09)",
              background:
                "radial-gradient(120% 80% at 50% 12%, rgba(225,6,0,0.28) 0%, rgba(225,6,0,0.06) 34%, transparent 62%), linear-gradient(180deg, #17171a 0%, #0d0d0f 100%)",
            }}
          >
            <span
              className="absolute right-4 top-4 tabular-nums"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-caption)",
                fontWeight: 700,
                color: "rgba(var(--foreground-rgb), 0.45)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-0 flex items-center justify-center p-8 pb-24">
              <ImageWithFallback
                src={cat.productCover}
                alt={cat.label}
                className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                style={{ filter: "drop-shadow(0 22px 30px rgba(0,0,0,0.6))" }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3
                className="text-ink-strong"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {cat.label}
              </h3>
              {/* Linha vermelha que cresce no hover — o efeito pedido */}
              <span
                className="mt-2 mb-2.5 block h-[2px] w-8 origin-left transition-transform duration-300 ease-out group-hover:scale-x-[6]"
                style={{ background: "var(--primary)" }}
              />
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-caption)",
                    color: "rgba(var(--foreground-rgb), 0.62)",
                  }}
                >
                  {cat.count} produtos
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  className="-translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── V3 — Rail (capa "ver tudo" + tiles minimalistas) ──────────────────── */

function RailView({ categories, total }: { categories: Category[]; total: number }) {
  const { ref, scroll } = useRailScroll();
  return (
    <div className="relative">
      <div className="mb-4 flex justify-end">
        <RailArrows onPrev={() => scroll(-1)} onNext={() => scroll(1)} />
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Capa grande: ver tudo */}
        <Link
          to="/produtos"
          data-rail-card
          className="group relative flex-shrink-0 snap-start overflow-hidden"
          style={{
            width: "clamp(320px, 40vw, 480px)",
            aspectRatio: "4 / 5",
            borderRadius: "var(--radius-card-lg)",
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.75)",
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1400&q=85&auto=format&fit=crop"
            alt="Ver todos os produtos"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(10,10,11,0.15) 0%, rgba(10,10,11,0.9) 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <h3
              className="text-ink-strong flex items-start gap-1"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(24px, 2.4vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Ver tudo
              <sup style={{ fontSize: "0.5em", fontWeight: 600, color: "rgba(var(--foreground-rgb),0.6)" }}>{total}</sup>
            </h3>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-sm)",
                color: "rgba(var(--foreground-rgb), 0.72)",
              }}
            >
              O catálogo completo PCYES
            </p>
            <span
              className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
              style={{ background: "var(--primary)", color: "white" }}
            >
              <ArrowRight size={17} strokeWidth={2.4} />
            </span>
          </div>
        </Link>

        {/* Tiles minimalistas de produto */}
        {categories.map((cat) => (
          <Link
            key={cat.href}
            to={cat.href}
            data-rail-card
            className="group relative flex flex-shrink-0 snap-start flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              width: "clamp(280px, 32vw, 360px)",
              aspectRatio: "4 / 5",
              borderRadius: "var(--radius-card-lg)",
              // Mesmo degradê dos cards de produto — fundo clareia sutil no topo
              background:
                "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.10) 0%, rgba(var(--foreground-rgb), 0.03) 100%)",
              border: "1px solid rgba(var(--foreground-rgb), 0.08)",
              boxShadow: "0 22px 50px -22px rgba(0,0,0,0.7)",
            }}
          >
            {/* Brilho interno, igual ao card de produto */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: "var(--radius-card-lg)",
                background: "radial-gradient(circle at 30% 22%, rgba(var(--foreground-rgb), 0.06) 0%, transparent 55%)",
              }}
            />
            <div className="relative flex flex-1 items-center justify-center p-9">
              <ImageWithFallback
                src={cat.productCover}
                alt={cat.label}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.07]"
                style={{ filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.55))" }}
              />
            </div>
            <div className="p-5 pt-0">
              <h3
                className="text-ink-strong flex items-start gap-1"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {cat.label}
                <sup style={{ fontSize: "0.55em", fontWeight: 600, color: "var(--primary)" }}>{cat.count}</sup>
              </h3>
              <div className="mt-1 flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-caption)",
                    color: "rgba(var(--foreground-rgb), 0.55)",
                  }}
                >
                  {cat.teaser}
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={2.2}
                  className="text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── V4 — Accordion (painéis horizontais que expandem no hover) ─────────── */

function AccordionView({ categories }: { categories: Category[] }) {
  return (
    <>
      {/* Desktop: o acordeão. Estados e transições vivem em theme.css
          (.cat-accordion) porque dependem de :has/:hover encadeados. */}
      <div
        className="cat-accordion hidden md:flex gap-2"
        style={{ height: "clamp(360px, 42vw, 480px)" }}
      >
        {categories.map((cat, i) => (
          <Link
            key={cat.href}
            to={cat.href}
            className="cat-panel group relative block overflow-hidden"
            style={{
              borderRadius: "var(--radius-card-lg)",
              border: "1px solid rgba(var(--foreground-rgb), 0.08)",
              background: "#0d0d0f",
            }}
          >
            <ImageWithFallback
              src={cat.lifestyle}
              alt={cat.label}
              className="cat-media absolute inset-0 h-full w-full object-cover"
            />
            {/* Escurece a base para o texto; topo fica limpo */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(8,8,10,0.35) 0%, transparent 30%, transparent 55%, rgba(8,8,10,0.88) 100%)" }}
            />
            {/* Brilho vermelho de assinatura no painel ativo */}
            <div
              className="cat-glow pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(120% 60% at 50% 100%, rgba(225,6,0,0.4) 0%, transparent 55%)",
              }}
            />

            {/* Índice no topo */}
            <span
              className="absolute right-4 top-4 tabular-nums"
              style={{
                fontFamily: "var(--font-family-inter)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                mixBlendMode: "difference",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Rótulo vertical (colapsado) */}
            <span
              className="cat-vlabel absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-ink-strong"
              style={{
                writingMode: "vertical-rl",
                transform: "translateX(-50%) rotate(180deg)",
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(15px, 1.3vw, 19px)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              {cat.label}
            </span>

            {/* Conteúdo revelado (ativo) */}
            <div className="cat-reveal absolute inset-x-0 bottom-0 p-7">
              <span className="mb-3 block h-[3px] w-10" style={{ background: "var(--primary)" }} />
              <h3
                className="text-ink-strong"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(22px, 2.2vw, 32px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                }}
              >
                {cat.label}
              </h3>
              <p
                className="mt-1.5"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.82)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                }}
              >
                {cat.teaser}
              </p>
              <span
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "var(--gradient-brand)",
                  color: "white",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: "0 12px 28px -12px rgba(225,6,0,0.7)",
                }}
              >
                {cat.count} produtos <ArrowRight size={14} strokeWidth={2.4} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: acordeão horizontal não cabe — cai num grid simples de capas. */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            to={cat.href}
            className="relative block overflow-hidden"
            style={{
              aspectRatio: "3 / 4",
              borderRadius: "var(--radius-card-lg)",
              border: "1px solid rgba(var(--foreground-rgb), 0.08)",
            }}
          >
            <ImageWithFallback src={cat.lifestyle} alt={cat.label} className="absolute inset-0 h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,8,10,0.85) 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="mb-1.5 block h-[2px] w-6" style={{ background: "var(--primary)" }} />
              <span className="block text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: 16, fontWeight: 700 }}>
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

/* ── V5 — Editorial (lista tipográfica + imagem que segue o cursor) ─────── */

function EditorialView({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // rAF coalesce: um setState por frame, não por evento de mouse.
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPointer({ x, y }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 items-start">
      {/* Lista tipográfica */}
      <div
        ref={listRef}
        className="relative lg:col-span-7"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={onMove}
      >
        {categories.map((cat, i) => {
          const on = active === i;
          return (
            <Link
              key={cat.href}
              to={cat.href}
              onMouseEnter={() => setActive(i)}
              className="group relative flex items-center justify-between gap-6 border-t"
              style={{
                borderColor: "rgba(var(--foreground-rgb), 0.12)",
                padding: "clamp(14px, 2vw, 26px) 0",
              }}
            >
              {/* Preenchimento vermelho que entra da esquerda no ativo */}
              <span
                className="pointer-events-none absolute left-0 top-0 h-full origin-left transition-transform duration-500 ease-out"
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg, rgba(225,6,0,0.12) 0%, transparent 60%)",
                  transform: on ? "scaleX(1)" : "scaleX(0)",
                }}
              />
              <div className="relative flex items-baseline gap-4 md:gap-6">
                <span
                  className="tabular-nums transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: on ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.35)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-family-figtree)",
                    fontSize: "clamp(30px, 5.5vw, 68px)",
                    fontWeight: 700,
                    lineHeight: 0.98,
                    letterSpacing: "-0.03em",
                    color: on ? "var(--foreground)" : "rgba(var(--foreground-rgb), 0.42)",
                    transform: on ? "translateX(12px)" : "translateX(0)",
                  }}
                >
                  {cat.label}
                </h3>
              </div>
              <div className="relative flex items-center gap-4 md:gap-6 flex-shrink-0">
                <span
                  className="hidden sm:block tabular-nums transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    color: on ? "rgba(var(--foreground-rgb), 0.8)" : "rgba(var(--foreground-rgb), 0.3)",
                  }}
                >
                  {cat.count}
                </span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    background: on ? "var(--gradient-brand)" : "transparent",
                    border: on ? "1px solid transparent" : "1px solid rgba(var(--foreground-rgb), 0.2)",
                    color: on ? "white" : "rgba(var(--foreground-rgb), 0.5)",
                    transform: on ? "scale(1)" : "scale(0.9)",
                  }}
                >
                  <ArrowUpRight size={17} strokeWidth={2.4} />
                </span>
              </div>
            </Link>
          );
        })}
        <div className="border-t" style={{ borderColor: "rgba(var(--foreground-rgb), 0.12)" }} />

        {/* Miniatura de produto que segue o cursor (só desktop) */}
        <div
          className="pointer-events-none absolute z-20 hidden lg:block overflow-hidden"
          style={{
            left: 0,
            top: 0,
            width: 190,
            height: 230,
            borderRadius: "var(--radius-card)",
            transform: `translate(${pointer.x - 95}px, ${pointer.y - 115}px) scale(${hovering ? 1 : 0.85})`,
            opacity: hovering ? 1 : 0,
            transition: "opacity 300ms ease, transform 120ms ease-out",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8)",
            background:
              "radial-gradient(120% 80% at 50% 15%, rgba(225,6,0,0.3) 0%, transparent 55%), linear-gradient(180deg, #17171a, #0d0d0f)",
            border: "1px solid rgba(var(--foreground-rgb), 0.1)",
          }}
        >
          {categories.map((cat, i) => (
            <ImageWithFallback
              key={cat.href}
              src={cat.productCover}
              alt=""
              className="absolute inset-0 h-full w-full object-contain p-5 transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.6))" }}
            />
          ))}
        </div>
      </div>

      {/* Painel de preview — crossfade da imagem lifestyle da categoria ativa */}
      <div className="hidden lg:block lg:col-span-5">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "4 / 5", borderRadius: "var(--radius-card-lg)", border: "1px solid rgba(var(--foreground-rgb), 0.08)" }}
        >
          {categories.map((cat, i) => (
            <ImageWithFallback
              key={cat.href}
              src={cat.lifestyle}
              alt={cat.label}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
              style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1.03)" : "scale(1.08)" }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(8,8,10,0.85) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <span className="mb-3 block h-[3px] w-10" style={{ background: "var(--primary)" }} />
            <h4
              className="text-ink-strong"
              style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(22px, 1.9vw, 28px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {categories[active].label}
            </h4>
            <p className="mt-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.78)" }}>
              {categories[active].teaser} · {categories[active].count} produtos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── seletor 1 / 2 / 3 / 4 / 5 ─────────────────────────────────────────── */

function ViewSwitcher({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full p-1"
      style={{ background: "var(--surface-1)", border: "1px solid rgba(var(--foreground-rgb), 0.1)" }}
    >
      {([1, 2, 3, 4, 5] as ViewMode[]).map((v) => {
        const active = v === value;
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            aria-label={`Layout ${v}`}
            aria-pressed={active}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-all cursor-pointer"
            style={{
              background: active ? "var(--gradient-brand)" : "transparent",
              color: active ? "white" : "rgba(var(--foreground-rgb), 0.55)",
              fontFamily: "var(--font-family-figtree)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              boxShadow: active ? "0 6px 16px -8px rgba(225,6,0,0.7)" : "none",
            }}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}

export function CategoryShowcase() {
  const [view, setView] = useState<ViewMode>(1);

  const { categories, total } = useMemo(() => {
    const catalog = getVisibleCatalogProducts(allProducts);
    const cats: Category[] = CATEGORY_DEFS.map((def) => {
      const list = catalog.filter(
        (p) =>
          getProductCategory(p) === def.category &&
          (!def.subLabel || getProductSubcategory(p) === def.subLabel),
      );
      return {
        ...def,
        count: list.length,
        productCover: list[0] ? getPrimaryProductImage(list[0]) : def.lifestyle,
      };
    });
    return { categories: cats, total: catalog.length };
  }, []);

  return (
    <section
      className="px-5 md:px-[72px]"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-sm)",
        background: "var(--surface-0)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        <div className="mb-8 md:mb-10 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="EXPLORE"
            title="Equipamentos por categoria"
            size="lg"
            weight={700}
            animated={false}
            titleStyle={{ maxWidth: "640px" }}
          />
          <ViewSwitcher value={view} onChange={setView} />
        </div>

        {view === 1 && <BentoView categories={categories} />}
        {view === 2 && <SpotlightView categories={categories} />}
        {view === 3 && <RailView categories={categories} total={total} />}
        {view === 4 && <AccordionView categories={categories} />}
        {view === 5 && <EditorialView categories={categories} />}
      </div>
    </section>
  );
}
