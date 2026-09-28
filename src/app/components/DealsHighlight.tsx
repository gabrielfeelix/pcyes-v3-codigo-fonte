"use client";

import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts, type Product } from "./productsData";
import {
  getCatalogHref,
  getPrimaryProductImage,
  getShowcaseProducts,
} from "./productPresentation";
import { SectionHeader } from "./section";
import { ProductCard } from "./ProductCard";

/**
 * Arte do banner da direita — peça final do marketing (Site V2).
 *
 * Duas artes porque o slot muda de orientação: no desktop ele estica pela
 * altura das duas fileiras de produto (900×1800, em pé); no celular a grade
 * quebra e ele deita (1050×900). Chamada e botão já vêm desenhados na arte,
 * então o card não sobrepõe texto nem escurecido — o card inteiro é o link.
 */
const BANNER_ARTE = {
  desktop: "/banners/drops/upgrade-monitor-desktop.webp",
  mobile: "/banners/drops/upgrade-monitor-mobile.webp",
  href: getCatalogHref({ category: "Monitores" }),
  alt: "Upgrade que seu setup merece. Linha de monitores gamer em até 10x sem juros",
};

/**
 * Piso de altura do banner.
 *
 * No desktop quem manda é a coluna ao lado: o banner estica até a altura das
 * duas fileiras de produto. O piso só vale no celular, onde a coluna fica
 * sozinha e sem altura para herdar.
 */
const BANNER_MIN_H = "clamp(300px, 62vw, 380px)";

interface DealsHighlightProps {
  label?: string;
  title?: string;
  productIds: number[];
}


export function DealsHighlight({
  label = "OFERTAS",
  title = "Promoções imperdíveis",
  productIds,
}: DealsHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addFavorite } = useFavorites();

  /**
   * Oito produtos, sempre — a grade é 4×2 e um buraco na segunda fileira salta
   * aos olhos.
   *
   * A lista curada nem sempre entrega oito: `getShowcaseProducts` corta quem não
   * tem foto usável, e hoje a pasta térmica (id 27) cai nesse filtro, deixando a
   * vitrine com sete. Em vez de caçar o id quebrado a cada mudança de catálogo,
   * a lista se completa sozinha com os primeiros da vitrine que ainda não estão
   * nela. Os curados continuam vindo primeiro e na ordem escrita.
   */
  const vitrine = useMemo(() => {
    const visible = getShowcaseProducts(allProducts);
    const curados = productIds
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean) as Product[];

    const escolhidos = curados.slice(0, 8);
    if (escolhidos.length < 8) {
      const jaTem = new Set(escolhidos.map((p) => p.id));
      for (const p of visible) {
        if (escolhidos.length === 8) break;
        if (!jaTem.has(p.id)) escolhidos.push(p);
      }
    }
    return escolhidos;
  }, [productIds]);

  const handleAdd = (p: Product) =>
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: getPrimaryProductImage(p),
    });
  const handleFavorite = (p: Product) =>
    addFavorite({
      id: p.id,
      name: p.name,
      price: p.price,
      image: getPrimaryProductImage(p),
    });

  return (
    <section
      ref={ref}
      className="px-5 md:px-[72px]"
      style={{
        paddingTop: "var(--space-section-sm)",
        paddingBottom: "var(--space-section-lg)",
        background: "var(--surface-0)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1600px" }}>
        {/* Header */}
        <SectionHeader eyebrow={label} title={title} size="sm" weight={600} className="mb-10" />

        {/*
          Grade densa: oito produtos em quatro colunas à esquerda, um banner em
          pé à direita.

          Antes eram seis produtos em três colunas e DOIS banners empilhados na
          direita. Ficava enorme: cada card passava de 340px, e a coluna da
          direita virava meio metro de altura para dizer duas frases. A seção
          inteira empurrava o resto da home para baixo da dobra.

          Quatro colunas resolvem pela densidade, não por encolher card no
          braço: a mesma largura mostra 8 produtos em vez de 6, cada card cai
          para ~244px sem perder foto, preço nem botão de compra, e a seção
          inteira sai de ~1500px para 1096px de altura.

          `2.6fr_1fr` dá ~27% ao banner (399px a 1600). Não é arredondado à toa:
          com `3fr_1fr` (24%) a arte ficava estreita demais para o assunto, e
          passando de 30% os cards começam a sufocar.
        */}
        <div className="grid gap-4 md:gap-5 lg:grid-cols-[2.6fr_1fr]">
          {/* ESQUERDA: 8 produtos — 2 colunas no celular, 4 do md para cima. */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {vitrine.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.04 * i }}
              >
                <ProductCard
                  product={product}
                  variant="grid"
                  favorite
                  /* Vitrine de deals sem selo de desconto é vitrine muda: o
                     card mostrava só o preço, enquanto as outras faixas de
                     oferta (FlashDealsStrip) marcam a foto. Produto com
                     `oldPriceNum` usa o desconto real; o resto deriva os 18%
                     da convenção da casa e sai como 15%. Pré-venda não entra —
                     ali a pílula de pré-venda ocupa o mesmo canto. */
                  emphasizeDiscount
                  onAdd={handleAdd}
                  onFavorite={handleFavorite}
                />
              </motion.div>
            ))}
          </div>

          {/*
            DIREITA: um banner só, na altura das duas fileiras de produto.
            Slot de arte fechada: nada de texto por cima. Desktop em pé,
            celular deitado — `<picture>` troca a arte no breakpoint `lg`,
            o mesmo em que a grade passa a ter a coluna lateral.
          */}
          <motion.a
            href={BANNER_ARTE.href}
            onClick={(e) => { e.preventDefault(); navigate(BANNER_ARTE.href); }}
            data-keep-dark
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            /* `stroke-hover-red` é o hover de banner do sistema (mesmo de
               BannerDuo e InRealLifeSection): o anel vermelho é o estado de
               HOVER, não de repouso. */
            className="stroke-hover-red group/banner relative block min-h-0 overflow-hidden border border-white/10"
            style={{ borderRadius: "var(--radius-card-xl)", minHeight: BANNER_MIN_H }}
            aria-label={BANNER_ARTE.alt}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={BANNER_ARTE.desktop} />
              <img
                src={BANNER_ARTE.mobile}
                alt={BANNER_ARTE.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/banner:scale-[1.04]"
                style={{ objectPosition: "center center" }}
              />
            </picture>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
