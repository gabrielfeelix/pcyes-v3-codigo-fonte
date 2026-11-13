import type { ReactNode } from "react";
import { ProductCard } from "../components/ProductCard";
import { GiftInline, GiftOfferBlock } from "../components/GiftOffer";
import { allProducts } from "../components/productsData";
import type { GiftDef } from "../components/PreOrderData";
import { SectionContainer, SectionHeader } from "../components/section";

/**
 * Vitrine do "compre e ganhe": todas as situações lado a lado, para
 * apresentar. Rota escondida (/compre-e-ganhe), fora de menu e sitemap.
 */

const g = (...items: [number, number?][]): GiftDef => ({
  items: items.map(([productId, qty]) => ({ productId, qty })),
});

type Scenario = { title: string; note: string; productId: number; gift?: GiftDef };

const CARDS: Scenario[] = [
  { title: "1 brinde", note: "Foto, nome e valor riscado", productId: 260, gift: g([173]) },
  { title: "1 brinde · pré-venda", note: "Convive com a pill de pré-venda", productId: 509, gift: g([468]) },
  { title: "2 brindes", note: "Fotos em grupo, sem nomes", productId: 72, gift: g([339], [296]) },
  { title: "Mesmo item 2×", note: "Quantidade no canto da foto", productId: 436, gift: g([322, 2]) },
  { title: "3 brindes · pré-venda", note: "2 fones + 1 mouse", productId: 32, gift: g([322, 2], [339]) },
  { title: "4 brindes", note: "2 fotos + contador +2", productId: 446, gift: g([181], [295], [339], [322]) },
  { title: "6 brindes · pré-venda", note: "Contador absorve o resto", productId: 35, gift: g([181], [339], [295], [175], [322], [129]) },
  { title: "Sem brinde", note: "Referência: card normal", productId: 262 },
];

const PDP: Scenario[] = [
  { title: "PDP · 1 brinde", note: "Bloco acima do botão de compra", productId: 260, gift: g([173]) },
  { title: "PDP · vários brindes", note: "Um brinde por linha, total no topo", productId: 32, gift: g([322, 2], [339]) },
];

const LIST: Scenario[] = [
  { title: "Lista · 1 brinde", note: "", productId: 260, gift: g([173]) },
  { title: "Lista · 4 brindes", note: "", productId: 446, gift: g([181], [295], [339], [322]) },
];

function Label({ title, note }: { title: string; note: string }) {
  return (
    <div className="mb-3">
      <p className="text-ink-strong" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 800 }}>
        {title}
      </p>
      {note && (
        <p className="text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

function Block({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="mt-14 first:mt-0">
      <SectionHeader eyebrow={eyebrow} title={title} size="sm" />
      <div className="mt-8">{children}</div>
    </div>
  );
}

const product = (id: number) => allProducts.find((p) => p.id === id)!;

export function CompreEGanhePage() {
  return (
    <SectionContainer>
      <Block eyebrow="Compre e ganhe" title="Card de produto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {CARDS.map((s) => (
            <div key={s.title}>
              <Label title={s.title} note={s.note} />
              <ProductCard product={product(s.productId)} gift={s.gift} variant="shelf" />
            </div>
          ))}
        </div>
      </Block>

      <Block eyebrow="Compre e ganhe" title="Página do produto">
        <div className="grid gap-8 md:grid-cols-2">
          {PDP.map((s) => (
            <div key={s.title} className="max-w-[420px]">
              <Label title={s.title} note={s.note} />
              <GiftOfferBlock info={{ gift: s.gift }} />
            </div>
          ))}
        </div>
      </Block>

      <Block eyebrow="Compre e ganhe" title="Catálogo em lista">
        <div className="grid gap-8 md:grid-cols-2">
          {LIST.map((s) => (
            <div key={s.title}>
              <Label title={s.title} note={s.note} />
              <GiftInline info={{ gift: s.gift }} />
            </div>
          ))}
        </div>
      </Block>
    </SectionContainer>
  );
}
