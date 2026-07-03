"use client";

import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CarouselDots } from "./CarouselDots";
import { SectionHeader } from "./section";

interface CategoryItem {
  label: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    label: "Headsets",
    description: "Áudio surround, drivers premium e isolamento total — escute cada passo antes do inimigo.",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Periféricos&subcategory=Headsets",
    cta: "Explorar headsets",
  },
  {
    label: "Teclados Mecânicos",
    description: "Switches Kailh, anti-ghosting e RGB. Construção em alumínio para responder no milisegundo.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Periféricos&subcategory=Teclados",
    cta: "Explorar teclados",
  },
  {
    label: "Mouses Gamer",
    description: "Sensores ópticos de alta precisão, polling 1000Hz e botões programáveis para FPS competitivo.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Periféricos&subcategory=Mouses",
    cta: "Explorar mouses",
  },
  {
    label: "Monitores",
    description: "Painéis IPS de 144Hz+ com 1ms de resposta. Cores reais para criação, fluidez para esports.",
    image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Monitores",
    cta: "Explorar monitores",
  },
  {
    label: "Cadeiras Gamer",
    description: "Suporte lombar, encosto reclinável e materiais que aguentam maratonas de 12h sem cansaço.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Cadeiras&subcategory=Cadeiras Gamer",
    cta: "Explorar cadeiras",
  },
  {
    label: "Gabinetes",
    description: "Vidro temperado, fluxo de ar otimizado e RGB sincronizado — sua build merece vitrine.",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Gabinetes",
    cta: "Explorar gabinetes",
  },
  {
    label: "Placas de Vídeo",
    description: "GPUs com Ray Tracing, DLSS e VRAM dedicada — performance gráfica de geração atual.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Placas de Vídeo",
    cta: "Explorar placas",
  },
  {
    label: "Fontes",
    description: "Fontes 80 Plus modulares com cabos sleeve. Energia limpa pra builds de 1000W+.",
    image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Fontes",
    cta: "Explorar fontes",
  },
  {
    label: "SSDs",
    description: "NVMe Gen4 com velocidades de até 7000MB/s. Boot instantâneo e cargas sem espera.",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=SSD e HD&subcategory=SSD",
    cta: "Explorar SSDs",
  },
  {
    label: "Memórias RAM",
    description: "DDR5 6000MHz+ com perfis XMP. Multitarefa, edição pesada e gaming sem gargalo.",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Hardware&subcategory=Memória",
    cta: "Explorar memórias",
  },
  {
    label: "Water Coolers",
    description: "Refrigeração líquida AIO com pump silencioso. Mantém o CPU no frio sob carga máxima.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Refrigeração&subcategory=Water Coolers",
    cta: "Explorar coolers",
  },
  {
    label: "Microfones",
    description: "Cardioides USB com tripé e ganho ajustável. Captação broadcast pra stream e podcast.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Streaming",
    cta: "Explorar microfones",
  },
  {
    label: "Mousepads",
    description: "Superfícies speed e control de tamanho XL. Base antiderrapante e bordas costuradas.",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Periféricos&subcategory=Mousepads",
    cta: "Explorar mousepads",
  },
  {
    label: "Mini PCs",
    description: "Computadores compactos com performance de desktop. Espaço otimizado, zero ruído.",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Computadores&subcategory=Mini Computadores",
    cta: "Explorar mini PCs",
  },
  {
    label: "Webcams",
    description: "Full HD 1080p 60fps com autofoco. Calls profissionais e streams com qualidade real.",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=2000&q=85&auto=format&fit=crop",
    href: "/produtos?category=Streaming",
    cta: "Explorar webcams",
  },
];

const GAP_PX = 24;

export function CategoryShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      className="relative"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-sm)",
        background: "var(--surface-0)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="px-5 md:px-[72px] mb-10 md:mb-12">
        <div className="mx-auto" style={{ maxWidth: "1600px" }}>
          <SectionHeader
            eyebrow="EXPLORE"
            title="Equipamentos por categoria"
            size="lg"
            weight={700}
            animated={false}
            titleStyle={{ maxWidth: "640px" }}
          />
        </div>
      </div>

      {/* Carousel — native horizontal scroll (touch swipe on mobile, arrows on desktop) */}
      <div className="relative">
        <div style={{ height: "clamp(300px, 56vw, 460px)" }}>
          <div
            ref={trackRef}
            className="category-track flex h-full overflow-x-auto snap-x snap-mandatory"
            style={{
              gap: `${GAP_PX}px`,
              paddingLeft: `${GAP_PX}px`,
              paddingRight: `${GAP_PX}px`,
              scrollbarWidth: "none",
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="flex-shrink-0 relative overflow-hidden h-full group category-card category-active snap-start"
                style={{
                  width: "clamp(260px, 82vw, calc((100% - 48px) / 3))",
                  borderRadius: "var(--radius-card-xl)",
                  border: "1px solid transparent",
                  boxShadow:
                    "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 18px -6px rgba(255,36,25,0.2), inset 0 1px 0 rgba(var(--foreground-rgb), 0.06)",
                  transition: "border-color 320ms ease, box-shadow 320ms ease",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: "var(--radius-card-xl)",
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(255,36,25,0.45) 0%, rgba(255,36,25,0.05) 45%, rgba(255,36,25,0.35) 100%)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    zIndex: 5,
                  }}
                />
                <div className="absolute inset-0 overflow-hidden">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)",
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                  <div className="max-w-[460px]">
                    <h3
                      className="text-ink-strong mb-2"
                      style={{
                        fontFamily: "var(--font-family-figtree)",
                        fontSize: "clamp(22px, 2.4vw, 34px)",
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                      }}
                    >
                      {cat.label}
                    </h3>
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "clamp(12px, 1vw, 14px)",
                        lineHeight: 1.5,
                        color: "rgba(var(--foreground-rgb), 0.85)",
                        textShadow: "0 1px 6px rgba(0,0,0,0.55)",
                      }}
                    >
                      {cat.description}
                    </p>
                    <Link
                      to={cat.href}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 transition-transform hover:scale-[1.04] active:scale-[0.97]"
                      style={{
                        background:
                          "var(--gradient-brand)",
                        color: "white",
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-caption)",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        boxShadow: "0 14px 32px -10px rgba(225,6,0,0.6)",
                      }}
                    >
                      {cat.cta} <ArrowRight size={13} strokeWidth={2.4} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollByPage(-1)}
          aria-label="Anterior"
          className="absolute left-4 md:left-6 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(15, 15, 16, 0.85)",
            border: "1px solid rgba(var(--foreground-rgb), 0.12)",
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 28px -8px rgba(0,0,0,0.6)",
          }}
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>
        <button
          onClick={() => scrollByPage(1)}
          aria-label="Próximo"
          className="absolute right-4 md:right-6 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            background: "rgba(15, 15, 16, 0.85)",
            border: "1px solid rgba(var(--foreground-rgb), 0.12)",
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 28px -8px rgba(0,0,0,0.6)",
          }}
        >
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* Mobile-only position dots driven by native scroll */}
      <CarouselDots trackRef={trackRef} className="mt-6" />
    </section>
  );
}
