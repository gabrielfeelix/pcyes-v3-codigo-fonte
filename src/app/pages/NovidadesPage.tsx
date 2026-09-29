import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarClock, Sparkles } from "lucide-react";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../components/CartContext";
import { useFavorites } from "../components/FavoritesContext";
import { allProducts, type Product } from "../components/productsData";
import { getPrimaryProductImage, getProductCategory, getVisibleCatalogProducts } from "../components/productPresentation";
import { PRE_ORDER_ITEMS, type PreOrderInfo } from "../components/PreOrderData";
import { useCountdown } from "../components/PreOrderBanner";

/**
 * Novidades — o que entrou por último no catálogo.
 *
 * O catálogo não guarda data de cadastro. O SKU é sequencial no ERP da Oderco,
 * então SKU maior = cadastro mais recente; é a aproximação usada aqui até o
 * Magento expor `created_at` no GraphQL.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Destaque do topo: categorias que rendem foto grande. SSD e cabo são novidade
   também, mas não seguram um card de 600px. */
const HERO_CATEGORIES = ["Gabinetes", "Refrigeração", "Fontes", "Placas de Vídeo", "Cadeiras", "Periféricos", "Monitores"];

const skuNum = (p: Product) => Number.parseInt(p.sku ?? "", 10) || 0;

/* Mesma família = mesmas quatro primeiras palavras ("Mini Computador PCYES
   B300"). Sem isso a grade abre com dez variações do mesmo mini PC. */
const familyKey = (p: Product) =>
  p.name.toLowerCase().replace(/pcyes|gamer/g, "").split(/\s+/).filter(Boolean).slice(0, 3).join(" ");

function dedupeFamilies(list: Product[]) {
  const seen = new Set<string>();
  return list.filter((p) => {
    const key = familyKey(p);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* Nome de vitrine: o nome de catálogo carrega ficha técnica e SKU ("Fonte PCYES
   Gamer Electro V2 750W 80 Plus Bronze PFC Ativo 115-230V ELECV2PTO750W").
   No destaque fica só até a primeira especificação. */
function showcaseName(name: string) {
  const clean = name.replace(/\bPCYES\b\s*/gi, "").split(/\s[–-]\s/)[0];
  const cut = clean.search(/\s(\d+([.,]\d+)?\s?(W|GB|TB|MM|mm|Hz|")\b|TDP|80 Plus|PFC|Vidro|M\.2|DDR\d|\d+\s?x\s?\d)/i);
  return (cut > 12 ? clean.slice(0, cut) : clean).trim();
}

const eyebrowStyle = {
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-caption)",
  letterSpacing: "0.18em",
  fontWeight: 700,
} as const;

function FeaturedCard({ product, size }: { product: Product; size: "lg" | "sm" }) {
  const lg = size === "lg";
  return (
    <Link
      to={`/produto/${product.id}`}
      className={`group relative flex overflow-hidden rounded-[28px] border border-foreground/10 bg-white/[0.03] transition-all duration-500 hover:border-primary/40 hover:shadow-[0_30px_70px_-36px_rgba(255,43,46,0.55)] ${
        lg ? "min-h-[440px] flex-col md:min-h-[560px]" : "min-h-[220px] items-center md:min-h-[266px]"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at ${lg ? "62% 42%" : "78% 50%"}, rgba(255,43,46,0.22), transparent ${lg ? "58%" : "52%"})` }}
      />
      <div className={`relative z-10 flex flex-col ${lg ? "p-7 md:p-10" : "w-[52%] p-6 md:p-7"}`}>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-primary" style={eyebrowStyle}>
          <Sparkles size={11} /> NOVO
        </span>
        <span className="mt-4 text-foreground/45" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 500 }}>
          {getProductCategory(product)}
        </span>
        <h3
          className={`mt-1.5 text-foreground ${lg ? "max-w-[460px]" : "line-clamp-3"}`}
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: lg ? "clamp(26px, 3vw, 38px)" : "clamp(17px, 1.5vw, 20px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
          }}
        >
          {showcaseName(product.name)}
        </h3>
        <span className="mt-4 text-foreground" style={{ fontFamily: "var(--font-family-inter)", fontSize: lg ? "var(--text-xl, 22px)" : "var(--text-base)", fontWeight: 700 }}>
          {product.price}
        </span>
        <span
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-foreground/70 transition-all duration-300 group-hover:gap-2.5 group-hover:text-foreground"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
        >
          Ver produto <ArrowUpRight size={15} />
        </span>
      </div>
      <div className={lg ? "relative flex flex-1 items-end justify-center px-8 pb-8" : "absolute inset-y-0 right-0 flex w-[52%] items-center justify-center p-4"}>
        <ImageWithFallback
          src={getPrimaryProductImage(product)}
          alt={product.name}
          className={`object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.05] ${
            lg ? "h-[240px] w-full md:h-[330px]" : "h-[170px] w-full md:h-[210px]"
          }`}
        />
      </div>
    </Link>
  );
}

function PreOrderCard({ info, product }: { info: PreOrderInfo; product: Product }) {
  const { days, hours } = useCountdown(info.releaseDate);
  const reserved = Math.round((info.reservedUnits / info.totalUnits) * 100);
  const date = new Date(info.releaseDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
  return (
    <Link
      to={`/produto/${product.id}`}
      className="group flex w-[280px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-foreground/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#f97316]/50 md:w-[300px]"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center p-6">
        <span aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 60%, rgba(249,115,22,0.16), transparent 62%)" }} />
        <ImageWithFallback
          src={getPrimaryProductImage(product)}
          alt={product.name}
          className="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#f97316] px-2.5 py-1 text-white" style={eyebrowStyle}>
          <CalendarClock size={11} /> {date}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <h3 className="line-clamp-2 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: 600, lineHeight: 1.25 }}>
          {product.name}
        </h3>
        <span className="mt-1.5 text-foreground/50" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
          {days > 0 ? `Chega em ${days} ${days === 1 ? "dia" : "dias"}` : `Chega em ${hours}h`}
        </span>
        <div className="mt-auto pt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-[#f97316]" style={{ width: `${reserved}%` }} />
          </div>
          <span className="mt-2 block text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
            {reserved}% reservado
          </span>
        </div>
      </div>
    </Link>
  );
}

export function NovidadesPage() {
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();
  const [activeCategory, setActiveCategory] = useState("Todas");

  const { featured, preOrders, latest } = useMemo(() => {
    const now = Date.now();
    const catalog = getVisibleCatalogProducts(allProducts);
    const byId = new Map(catalog.map((p) => [p.id, p]));

    const preOrders = PRE_ORDER_ITEMS
      .filter((info) => new Date(info.releaseDate).getTime() > now && byId.has(info.productId))
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
      .map((info) => ({ info, product: byId.get(info.productId)! }));
    const preOrderIds = new Set(preOrders.map((p) => p.product.id));

    const newest = dedupeFamilies(
      catalog.filter((p) => !preOrderIds.has(p.id)).sort((a, b) => skuNum(b) - skuNum(a)),
    );

    // Um destaque por categoria, na ordem de chegada.
    const featured: Product[] = [];
    const usedCats = new Set<string>();
    for (const p of newest) {
      const cat = getProductCategory(p);
      if (!HERO_CATEGORIES.includes(cat) || usedCats.has(cat)) continue;
      featured.push(p);
      usedCats.add(cat);
      if (featured.length === 3) break;
    }
    const featuredIds = new Set(featured.map((p) => p.id));
    const latest = newest.filter((p) => !featuredIds.has(p.id)).slice(0, 24);
    return { featured, preOrders, latest };
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    latest.forEach((p) => counts.set(getProductCategory(p), (counts.get(getProductCategory(p)) ?? 0) + 1));
    return ["Todas", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)];
  }, [latest]);

  const visible = activeCategory === "Todas" ? latest : latest.filter((p) => getProductCategory(p) === activeCategory);
  const toCartItem = (p: Product) => ({ id: p.id, name: p.name, price: p.price, image: getPrimaryProductImage(p) });

  return (
    <>
      <SEO
        title="Novidades"
        description="Lançamentos PCYES: o que acabou de chegar em hardware, periféricos, cadeiras e computadores, e o que está em pré-venda."
        canonicalPath="/novidades/"
      />

      <section className="pt-[152px] md:pt-[182px]" style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 pb-16 md:px-12 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="max-w-[680px]">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-ink-strong" style={{ ...eyebrowStyle, boxShadow: "0 6px 22px -4px rgba(255,43,46,0.55)" }}>
              <Sparkles size={11} /> NOVIDADES
            </span>
            <h1 className="mt-5 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Acabou de chegar
            </h1>
            <p className="mt-4 max-w-[520px] text-foreground/55" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-base)", lineHeight: 1.6 }}>
              Os lançamentos mais recentes da PCYES e o que já dá para reservar antes de chegar.
            </p>
          </motion.div>

          {featured.length > 0 && (
            <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[1.35fr_1fr] lg:gap-5">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
                <FeaturedCard product={featured[0]} size="lg" />
              </motion.div>
              <div className="grid gap-4 lg:gap-5">
                {featured.slice(1).map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 + i * 0.08, ease: EASE }}>
                    <FeaturedCard product={p} size="sm" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {preOrders.length > 0 && (
        <section style={{ background: "var(--surface-0)" }}>
          <div className="mx-auto max-w-[1434px] px-5 pb-16 md:px-12 md:pb-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="text-[#f97316]" style={eyebrowStyle}>PRÉ-VENDA</span>
                <h2 className="mt-2 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                  Reserve antes de chegar
                </h2>
              </div>
            </div>
            <div className="-mx-5 mt-7 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:-mx-12 md:scroll-px-12 md:px-12 mega-track">
              {preOrders.map(({ info, product }) => (
                <PreOrderCard key={product.id} info={info} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--surface-0)" }}>
        <div className="mx-auto max-w-[1434px] px-5 pb-20 md:px-12 md:pb-28">
          <span className="text-primary" style={eyebrowStyle}>RECÉM-CHEGADOS</span>
          <h2 className="mt-2 text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 500, letterSpacing: "-0.01em" }}>
            Chegaram agora
          </h2>
          <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0 mega-track">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 rounded-full border px-4 py-2 transition-colors duration-200 ${
                    active ? "border-foreground bg-foreground text-background" : "border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600 }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grid"
                swatches
                favorite
                onAdd={(p) => addItem(toCartItem(p))}
                onFavorite={(p) => addFavorite(toCartItem(p))}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
