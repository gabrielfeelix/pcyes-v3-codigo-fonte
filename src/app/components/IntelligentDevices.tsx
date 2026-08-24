"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Armchair,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Fan,
  Gamepad2,
  HardDrive,
  Headphones,
  Heart,
  Keyboard,
  Monitor,
  Mouse,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { CTAButton } from "./section";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts, type Product } from "./productsData";
import { getPrimaryProductImage, getShowcaseProducts } from "./productPresentation";
import { artFitClass } from "../lib/setupImages";

interface CategoryDef {
  label: string;
  Icon: typeof Headphones;
  href: string;
  match: (p: Product) => boolean;
}

const CATEGORIES: CategoryDef[] = [
  {
    label: "Headsets",
    Icon: Headphones,
    href: "/produtos?search=headset",
    match: (p) => /headset|fone/i.test(p.name),
  },
  {
    label: "Teclados",
    Icon: Keyboard,
    href: "/produtos?search=teclado",
    match: (p) => /teclado|keyboard/i.test(p.name),
  },
  {
    label: "Mouses",
    Icon: Mouse,
    href: "/produtos?search=mouse",
    match: (p) => /mouse/i.test(p.name) && !/microfone/i.test(p.name),
  },
  {
    label: "Monitores",
    Icon: Monitor,
    href: "/produtos?category=Monitores",
    match: (p) => p.category === "Monitores" || /monitor/i.test(p.name),
  },
  {
    label: "Hardware",
    Icon: Cpu,
    href: "/produtos?category=Hardware",
    match: (p) => p.category === "Hardware",
  },
  {
    label: "Placas de Vídeo",
    Icon: Zap,
    href: "/produtos?category=Placas%20de%20V%C3%ADdeo",
    match: (p) => p.category === "Placas de Vídeo",
  },
  {
    label: "PC Gamer",
    Icon: Gamepad2,
    href: "/produtos?category=Computadores",
    match: (p) => p.category === "Computadores",
  },
  {
    label: "Cadeiras",
    Icon: Armchair,
    href: "/produtos?category=Cadeiras",
    match: (p) => p.category === "Cadeiras",
  },
  {
    label: "Coolers",
    Icon: Fan,
    href: "/produtos?category=Refrigera%C3%A7%C3%A3o",
    match: (p) => p.category === "Refrigeração",
  },
  {
    label: "SSD e HD",
    Icon: HardDrive,
    href: "/produtos?category=SSD%20e%20HD",
    match: (p) => p.category === "SSD e HD",
  },
];

const GLITCH_WORDS = ["Gamers", "Streamers", "Escritório", "Performance"];
const GLITCH_INTERVAL = 1500;

function GlitchWord({ word }: { word: string }) {
  return (
    <span className="glitch-word" key={word}>
      <span className="glitch-word-base">{word}</span>
      <span className="glitch-word-r" aria-hidden>{word}</span>
    </span>
  );
}

export function IntelligentDevices() {
  const [wordIdx, setWordIdx] = useState(0);
  const [activeCat, setActiveCat] = useState(0);
  const [favoritedIds, setFavoritedIds] = useState<Set<number>>(new Set());
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();
  const railRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % GLITCH_WORDS.length);
    }, GLITCH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const visibleCatalog = useMemo(() => getShowcaseProducts(allProducts), []);

  /**
   * Drop categories whose catalog returns no products — the user shouldn't
   * land on an empty grid. Filtering at runtime keeps CATEGORIES order while
   * silently skipping ones that don't match the current dataset.
   */
  const activeCategories = useMemo(
    () => CATEGORIES.filter((cat) => visibleCatalog.some(cat.match)),
    [visibleCatalog],
  );

  const safeActiveCat = Math.min(activeCat, Math.max(0, activeCategories.length - 1));

  const products = useMemo(() => {
    const cat = activeCategories[safeActiveCat];
    if (!cat) return [];
    return visibleCatalog.filter(cat.match).slice(0, 5);
  }, [visibleCatalog, activeCategories, safeActiveCat]);

  /**
   * Setas da trilha no celular.
   *
   * Antes só existia a seta da direita, e ao chegar no fim ela voltava para o
   * começo. Quem passasse do Headsets não tinha como voltar sem arrastar com o
   * dedo, e o card do Hardware, primeiro da fila, ficava inalcançável pelo
   * botão. Agora são duas setas, cada uma some na ponta em que não faz nada.
   */
  const [railPos, setRailPos] = useState({ atStart: true, atEnd: false });

  const updateRailPos = React.useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setRailPos({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateRailPos();
    el.addEventListener("scroll", updateRailPos, { passive: true });
    window.addEventListener("resize", updateRailPos);
    return () => {
      el.removeEventListener("scroll", updateRailPos);
      window.removeEventListener("resize", updateRailPos);
    };
  }, [updateRailPos, activeCategories.length]);

  const scrollRail = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <section
      className="relative px-5 md:px-[72px]"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-lg)",
        background: "var(--surface-0)",
        overflow: "hidden",
      }}
    >
      {/* Matrix-style backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(225, 6, 0, 0.4) 25%, rgba(225, 6, 0, 0.4) 26%, transparent 27%, transparent 74%, rgba(225, 6, 0, 0.4) 75%, rgba(225, 6, 0, 0.4) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(225, 6, 0, 0.4) 25%, rgba(225, 6, 0, 0.4) 26%, transparent 27%, transparent 74%, rgba(225, 6, 0, 0.4) 75%, rgba(225, 6, 0, 0.4) 76%, transparent 77%, transparent)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="relative mx-auto w-full"
        style={{ maxWidth: "1600px" }}
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="mb-4"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "var(--primary)",
            }}
          >
            // BUILT FOR PERFORMANCE
          </p>
          <h2
            className="text-ink-strong"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            {/* No celular "Tecnologia para" fica sozinho na primeira linha e a
                palavra que troca fica sozinha embaixo. Deixando as duas na mesma
                frase, a quebra caía no meio da palavra rotativa e mudava de
                lugar a cada troca, porque cada uma tem um comprimento. */}
            <span className="block md:inline">Tecnologia para</span>{" "}
            <GlitchWord word={GLITCH_WORDS[wordIdx]} />
          </h2>
        </div>

        {/* Category circles
            Mobile: horizontal scroll rail with mask-image fade + chevron
                    button on the right to advance ~75% viewport.
            md+:    original wrap layout. */}
        <div className="mb-14">
          {/* Mobile rail */}
          <div className="md:hidden relative">
            <div
              ref={railRef}
              /* `pt-5`: o círculo ativo cresce e ganha anel e brilho vermelho
                 que passam ~27px além dos 72px do botão. Como a trilha rola na
                 horizontal, o navegador também corta na vertical, e sem respiro
                 no topo o brilho aparecia decepado.

                 `scroll-pl-6`: com `snap-mandatory` o navegador encosta o
                 primeiro item na borda do scroll e come o `px`, jogando o
                 círculo para fora da tela. O scroll-padding é o que o snap
                 respeita. */
              className="flex items-start gap-5 overflow-x-auto -mx-5 px-6 scroll-pl-6 pt-5 pb-4 snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                /* O esmaecido só existe do lado que ainda tem conteúdo escondido. */
                maskImage: `linear-gradient(to right, ${railPos.atStart ? "black 0" : "transparent 0, black 56px"}, ${railPos.atEnd ? "black 100%" : "black calc(100% - 56px), transparent 100%"})`,
              }}
              role="tablist"
              aria-label="Categorias inteligentes"
            >
              {activeCategories.map((cat, i) => {
                const isActive = i === safeActiveCat;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCat(i)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="intelligent-products"
                    className="group flex flex-shrink-0 snap-start flex-col items-center gap-2 focus:outline-none cursor-pointer"
                  >
                    <div
                      className="flex h-[72px] w-[72px] items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        background: isActive
                          ? "radial-gradient(circle at 50% 50%, rgba(225, 6, 0, 0.22) 0%, rgba(225, 6, 0, 0.05) 70%, transparent 100%)"
                          : "rgba(var(--foreground-rgb), 0.04)",
                        border: isActive
                          ? "1.5px solid rgba(225, 6, 0, 0.7)"
                          : "1px solid rgba(var(--foreground-rgb), 0.10)",
                        boxShadow: isActive
                          ? "0 0 0 5px rgba(225, 6, 0, 0.06), 0 0 24px -2px rgba(225, 6, 0, 0.55)"
                          : "none",
                        transform: isActive ? "scale(1.04)" : "scale(1)",
                      }}
                    >
                      <cat.Icon
                        size={isActive ? 28 : 26}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        style={{
                          color: isActive ? "#ff2419" : "rgba(var(--foreground-rgb), 0.6)",
                          filter: isActive ? "drop-shadow(0 0 6px rgba(225, 6, 0, 0.5))" : "none",
                          transition: "color 280ms ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#ffffff" : "rgba(var(--foreground-rgb), 0.55)",
                        letterSpacing: "0.02em",
                        transition: "color 280ms ease, font-weight 280ms ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {!railPos.atStart && (
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Ver categorias anteriores"
                className="absolute left-1 top-[45px] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-black/55 text-ink backdrop-blur-md transition-colors hover:border-primary/50 hover:text-ink-strong hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
              >
                <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>
            )}
            {!railPos.atEnd && (
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Ver mais categorias"
                className="absolute right-1 top-[45px] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-black/55 text-ink backdrop-blur-md transition-colors hover:border-primary/50 hover:text-ink-strong hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
              >
                <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Desktop / tablet layout */}
          <div className="hidden md:flex flex-wrap items-start justify-center gap-12">
            {activeCategories.map((cat, i) => {
              const isActive = i === safeActiveCat;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCat(i)}
                  className="group flex flex-col items-center gap-3 focus:outline-none cursor-pointer"
                  aria-pressed={isActive}
                >
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: isActive
                        ? "radial-gradient(circle at 50% 50%, rgba(225, 6, 0, 0.22) 0%, rgba(225, 6, 0, 0.05) 70%, transparent 100%)"
                        : "rgba(var(--foreground-rgb), 0.04)",
                      border: isActive
                        ? "1.5px solid rgba(225, 6, 0, 0.7)"
                        : "1px solid rgba(var(--foreground-rgb), 0.10)",
                      boxShadow: isActive
                        ? "0 0 0 5px rgba(225, 6, 0, 0.06), 0 0 28px -2px rgba(225, 6, 0, 0.55)"
                        : "none",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    <cat.Icon
                      size={isActive ? 34 : 30}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      style={{
                        color: isActive ? "#ff2419" : "rgba(var(--foreground-rgb), 0.6)",
                        filter: isActive ? "drop-shadow(0 0 8px rgba(225, 6, 0, 0.5))" : "none",
                        transition: "color 280ms ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-sm)",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#ffffff" : "rgba(var(--foreground-rgb), 0.55)",
                      letterSpacing: "0.02em",
                      transition: "color 280ms ease, font-weight 280ms ease",
                    }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products row */}
        <div id="intelligent-products" className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5" role="tabpanel">
          {products.map((product) => {
            const image = getPrimaryProductImage(product);
            const isFav = favoritedIds.has(product.id);
            return (
              <div key={product.id} className="group block">
                <Link to={`/produto/${product.id}`} className="block">
                  <div
                    className="deal-card-img relative aspect-square overflow-hidden transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(140deg, rgba(var(--foreground-rgb), 0.07) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                      borderRadius: "var(--radius-card-lg)",
                      border: "1px solid rgba(var(--foreground-rgb), 0.05)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 25%, rgba(var(--foreground-rgb), 0.06) 0%, transparent 55%)",
                        borderRadius: "var(--radius-card-lg)",
                      }}
                    />
                    <ImageWithFallback
                      src={image}
                      alt={product.name}
                      /* Arte de setup sangra; foto de produto mantém contain + padding. */
                      className={`absolute inset-0 h-full w-full ${artFitClass(image, "p-4 md:p-7")} transition-transform duration-500 group-hover:scale-[1.06]`}
                    />
                    {/* Hover actions */}
                    {/* Favorite */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFavoritedIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(product.id)) next.delete(product.id);
                          else next.add(product.id);
                          return next;
                        });
                        addFavorite({ id: product.id, name: product.name, price: product.price, image });
                      }}
                      className="absolute right-3 top-3 z-20 flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full border opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 cursor-pointer"
                      style={{
                        background: isFav ? "rgba(225, 6, 0, 0.2)" : "rgba(0, 0, 0, 0.55)",
                        border: isFav ? "1px solid rgba(225, 6, 0, 0.8)" : "1px solid rgba(var(--foreground-rgb), 0.15)",
                        color: isFav ? "#ff2419" : "rgba(var(--foreground-rgb), 0.85)",
                        backdropFilter: "blur(8px)",
                      }}
                      aria-label="Favoritar"
                    >
                      <Heart size={13} strokeWidth={isFav ? 0 : 1.8} fill={isFav ? "#ff2419" : "none"} />
                    </button>

                    {/*
                      Quick add sobreposto à foto — só do `md` para cima, onde
                      existe hover para revelá-lo. No mobile ele ficava com
                      `opacity-100` permanente por cima da imagem: em grade de 2
                      colunas o card tem ~169px a 390px de viewport, e a pílula
                      cobria boa parte do produto. Lá embaixo o botão vai no
                      fluxo do card (ver depois do preço), como no ProductCard
                      usado em "Drops mais cobiçados".
                    */}
                    <CTAButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({ id: product.id, name: product.name, price: product.price, image });
                      }}
                      variant="buy"
                      size="sm"
                      className="hidden md:inline-flex absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:translate-y-2 md:opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 cursor-pointer"
                    >
                      <ShoppingCart size={12} strokeWidth={2} /> Comprar
                    </CTAButton>
                  </div>
                  <div className="mt-4 px-1">
                    <h3
                      className="line-clamp-1 text-ink-strong"
                      style={{
                        fontFamily: "var(--font-family-figtree)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="mt-2 text-ink-strong"
                      style={{
                        fontFamily: "var(--font-family-figtree)",
                        fontSize: "var(--text-base)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </Link>

                {/* Mobile: ação no fim do card, fora do <Link> — imagem, nome,
                    preço, ação. Some no `md`, onde o pill flutuante assume. */}
                <CTAButton
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image })}
                  variant="buy"
                  size="sm"
                  block
                  className="mt-3 md:hidden"
                  aria-label={`Comprar ${product.name}`}
                >
                  <ShoppingCart size={12} strokeWidth={2} /> Comprar
                </CTAButton>
              </div>
            );
          })}
        </div>

        {/* See-all link */}
        <div className="mt-10 text-center">
          <Link
            to={CATEGORIES[activeCat].href}
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 min-h-[44px] transition-all hover:scale-[1.03] cursor-pointer"
            style={{
              border: "1px solid rgba(225, 6, 0, 0.5)",
              color: "rgba(255, 80, 70, 0.95)",
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-caption)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Ver mais em {CATEGORIES[activeCat].label}
          </Link>
        </div>
      </div>
    </section>
  );
}
