import { Footer } from "../Footer";

/**
 * Collab PCYES × LOUD — por enquanto, a escolha entre as duas versões da página (A e B).
 *
 * As páginas em si são estáticas e moram em public/collab/loud/ (a.html, b.html), copiadas de
 * ux/empresas/pcyes/collab-loud-lp. Abrem em tela cheia, fora do layout da loja, com link normal
 * (<a>, não <Link>): são HTML próprio, não rota do React.
 * Quando o Gabriel escolher uma, ela vira a página da rota /loud (molde: DropDeadCollabPage).
 */
const BASE = "/collab/loud/";

const OPCOES = [
  {
    letra: "A",
    nome: "Vídeo ao lado",
    texto: "Hero da taça, a história numa tela só (escolha o ano), a frase da parceria com o vídeo ao lado e a vitrine Aprovado pela LOUD.",
    capa: `${BASE}capa-a.webp`,
    href: `${BASE}a.html`,
  },
  {
    letra: "B",
    nome: "Vídeo em tela cheia",
    texto: "A mesma página, com a frase da parceria centralizada e, logo abaixo, o vídeo da LOUD crescendo até ocupar a tela, antes da vitrine.",
    capa: `${BASE}capa-b.webp`,
    href: `${BASE}b.html`,
  },
];

export function LoudCollabPage() {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {/* header da loja é fixo: o conteúdo começa abaixo dele (--header-h vem do Navbar) */}
        <section className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10" style={{ paddingTop: "calc(var(--header-h, 156px) + 40px)" }}>
          <p
            className="mb-3"
            style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#00ff3b" }}
          >
            Nova parceria · escolha a versão
          </p>
          <h1
            className="mb-10 md:mb-14"
            style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(32px, 4.4vw, 64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            PCYES × LOUD
          </h1>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {OPCOES.map((o) => (
              <a
                key={o.letra}
                href={o.href}
                className="group relative block overflow-hidden rounded-[var(--radius-card-lg)] border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00ff3b]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={o.capa}
                    alt={`Opção ${o.letra}: ${o.nome}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 75%)" }} />
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-5 p-5 md:p-7">
                    <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(64px, 7vw, 112px)", fontWeight: 900, lineHeight: 0.8, color: "#00ff3b" }}>
                      {o.letra}
                    </span>
                    <div className="pb-1">
                      <p style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 800, lineHeight: 1.1 }}>
                        {o.nome}
                      </p>
                      <p className="mt-1.5 max-w-[46ch] text-white/70" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", lineHeight: 1.45 }}>
                        {o.texto}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
