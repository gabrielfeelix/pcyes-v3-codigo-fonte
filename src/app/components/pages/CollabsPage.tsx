import { Link } from "react-router";
import { Footer } from "../Footer";
import { collabBanners } from "../Navbar";

/**
 * /collabs — todas as collabs em cards grandes (mesmo estilo da escolha A/B da LOUD).
 * Fonte única: a lista do mega menu (collabBanners, em Navbar.tsx). Collab nova = um item lá.
 * A primeira da lista ganha o card largo; as outras vão em duas colunas.
 * Arte que é recorte de produto (.png) aparece inteira sobre um fundo na cor da marca;
 * foto (.webp/.jpg) preenche o card.
 */
export function CollabsPage() {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {/* header da loja é fixo: o conteúdo começa abaixo dele (--header-h vem do Navbar) */}
        <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10" style={{ paddingTop: "calc(var(--header-h, 156px) + 40px)" }}>
          <p
            className="mb-3"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)" }}
          >
            Parcerias oficiais
          </p>
          <h1
            className="mb-10 md:mb-14"
            style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(32px, 4.4vw, 64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            Collabs PCYES
          </h1>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {collabBanners.map((c, i) => {
              const accent = c.accent ?? "var(--primary)";
              const recorte = false;   // hoje todas as artes têm fundo próprio; se entrar recorte de produto, trocar por /\.png$/
              const destaque = i === 0;
              return (
                <Link
                  key={c.title}
                  to={c.href}
                  className={`group relative block overflow-hidden rounded-[var(--radius-card-lg)] border border-white/10 transition-all duration-300 hover:-translate-y-0.5 ${destaque ? "md:col-span-2" : ""}`}
                  style={{ ["--collab-accent" as string]: accent }}
                >
                  <div className={`relative overflow-hidden ${destaque ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}>
                    {recorte ? (
                      <div className="absolute inset-0" style={{ background: `radial-gradient(70% 80% at 70% 40%, color-mix(in srgb, ${accent} 35%, #111), #050505 75%)` }}>
                        <img src={c.image} alt={c.title} className="absolute right-[6%] top-[6%] h-[78%] w-auto object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:scale-[1.05]" />
                      </div>
                    ) : (
                      <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 75%)" }} />
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1.5px ${accent}` }} />
                    <div className="absolute inset-x-0 bottom-0 flex items-end gap-5 p-5 md:p-7">
                      <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: destaque ? "clamp(64px, 8vw, 132px)" : "clamp(56px, 6vw, 100px)", fontWeight: 900, lineHeight: 0.8, color: accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pb-1">
                        {c.eyebrow && (
                          <p className="mb-1.5" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent }}>
                            {c.eyebrow}
                          </p>
                        )}
                        <p style={{ fontFamily: "var(--font-family-figtree)", fontSize: destaque ? "clamp(24px, 2.6vw, 36px)" : "clamp(20px, 2vw, 28px)", fontWeight: 800, lineHeight: 1.1 }}>
                          {c.title}
                        </p>
                        {c.tagline && (
                          <p className="mt-1.5 max-w-[46ch] text-white/70" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.45 }}>
                            {c.tagline}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
