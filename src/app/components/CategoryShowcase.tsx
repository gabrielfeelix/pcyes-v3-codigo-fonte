"use client";

import { useMemo } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeader } from "./section";
import { allProducts } from "./productsData";
import {
  getVisibleCatalogProducts,
  getProductCategory,
  getProductSubcategory,
} from "./productPresentation";

/**
 * Vitrine de categorias — mosaico bento (sem scroll, tudo numa dobra).
 *
 * Substitui o antigo carrossel horizontal. O tamanho e o enquadramento de cada
 * tile são escolhidos pelo formato da imagem: Gabinetes é o herói 2×2, a cadeira
 * ganha um frame alto (precisa de espaço vertical), e o resto fecha bem em
 * quadrado. `imgPos` reenquadra onde o produto está deslocado (mic embaixo,
 * monitor no topo). Contagem por categoria vem do catálogo real.
 */

interface CategoryDef {
  label: string;
  teaser: string;
  href: string;
  lifestyle: string;
  /** Categoria canônica para casar no catálogo. */
  category: string;
  /** Rótulo de subcategoria; ausente = categoria inteira. */
  subLabel?: string;
  /** object-position da imagem — reenquadra para o produto aparecer. */
  imgPos?: string;
}

/* Ordem = encaixe no bento (ver BENTO_SPAN): Gabinetes (hero 2×2) → Cadeiras
   (frame alto) → produtos que fecham bem em quadrado pequeno. */
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
}

/* Ritmo do mosaico (índice segue CATEGORY_DEFS; grid-auto-flow dense preenche
   os buracos): Gabinetes hero 2×2, Cadeiras frame alto, o resto quadrado. */
const BENTO_SPAN = [
  "col-span-2 row-span-2", // Gabinetes (hero)
  "row-span-2", // Cadeiras (frame alto)
  "", // Mouses
  "", // Headsets
  "", // Monitores
  "", // Microfones
  "", // Teclados
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
      {/* Véu curto só atrás do texto — topo e base leves, meio limpo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.32) 0%, transparent 12%, transparent 80%, rgba(8,8,10,0.42) 100%)",
        }}
      />
      {/* Anel vermelho suave no hover. */}
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

export function CategoryShowcase() {
  const categories = useMemo<Category[]>(() => {
    const catalog = getVisibleCatalogProducts(allProducts);
    return CATEGORY_DEFS.map((def) => ({
      ...def,
      count: catalog.filter(
        (p) =>
          getProductCategory(p) === def.category &&
          (!def.subLabel || getProductSubcategory(p) === def.subLabel),
      ).length,
    }));
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
        <div className="mb-8 md:mb-10">
          <SectionHeader
            eyebrow="EXPLORE"
            title="Equipamentos por categoria"
            size="lg"
            weight={700}
            animated={false}
            titleStyle={{ maxWidth: "640px" }}
          />
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          style={{ gridAutoRows: "clamp(150px, 16vw, 190px)", gridAutoFlow: "dense" }}
        >
          {categories.map((cat, i) => (
            <BentoCell key={cat.href} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
