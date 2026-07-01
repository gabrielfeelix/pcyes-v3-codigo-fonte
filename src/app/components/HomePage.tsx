import { HeroSection } from "./HeroSection";
import { DropDoDiaSection } from "./DropDoDiaSection";
import { CategoryShowcase } from "./CategoryShowcase";
import { EssentialsSection } from "./EssentialsSection";
import { IntelligentDevices } from "./IntelligentDevices";
import { FlashDealsStrip } from "./FlashDealsStrip";
import { ProductShelf } from "./ProductShelf";
import { DealsHighlight } from "./DealsHighlight";
import { GpuShowcase } from "./GpuShowcase";
import { InRealLifeSection } from "./InRealLifeSection";
import { TrustStrip } from "./TrustStrip";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";
import { SEO } from "./SEO";

const bestSellerIds = [30, 446, 433, 217, 164, 84, 199, 125, 129, 72];
const newArrivalIds = [466, 295, 130, 252, 375, 217];
const dealIds = [446, 433, 30, 217, 199, 27, 84, 164];

export function HomePage() {
  return (
    <>
      <SEO
        title="Hardware, periféricos e setups gamer"
        description="Loja oficial PCYES. Mouses, teclados, headsets, placas de vídeo, PCs gamer, monte seu setup. Frete grátis acima de R$ 299. Até 12x sem juros."
        canonicalPath="/"
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "PCYES",
          url: "https://www.pcyes.com.br",
          logo: "https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png",
          sameAs: [
            "https://www.instagram.com/pcyesoficial",
            "https://www.youtube.com/@pcyesoficial",
          ],
        }}
      />
      {/* H1 semântico único da home (hero é banner em imagem, sem texto) */}
      <h1 className="sr-only">PCYES — Hardware, periféricos e setups gamer com identidade própria</h1>
      {/* ── BLOCO 1: Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── BLOCO 1.5: Benefícios (frete grátis, compra segura, etc.) ── */}
      <TrustStrip />

      {/* ── BLOCO 2: Drops mais cobiçados (Hall da meta) ── */}
      <DealsHighlight
        label="// HALL DA META"
        title="Drops mais cobiçados"
        productIds={dealIds}
      />

      {/* ── BLOCO 3: Promoções da semana ──────────────── */}
      <FlashDealsStrip />

      {/* ── BLOCO 4: Banner de categorias ──────────────── */}
      <CategoryShowcase />

      {/* ── BLOCO 5: Drop do dia (3 deals selecionados) ── */}
      <DropDoDiaSection />

      {/* ── BLOCO 5: Mais vendidos + essentials + smart ── */}
      <ProductShelf
        label="// MAIS VENDIDOS"
        title="Top da semana"
        productIds={bestSellerIds}
        showRanking
      />
      <EssentialsSection />
      <IntelligentDevices />

      {/* ── BLOCO 6: GPU before/after ──────────────────── */}
      <GpuShowcase />

      {/* ── BLOCO 7: Recém-chegados + UGC ──────────────── */}
      <ProductShelf
        label="// LANÇAMENTOS"
        title="Recém-chegados"
        productIds={newArrivalIds}
      />
      <InRealLifeSection />

      {/* ── BLOCO 8: Institucional ────────────────────── */}
      <Newsletter />
      <Footer />
    </>
  );
}
