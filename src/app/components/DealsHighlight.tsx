"use client";

import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { allProducts, type Product } from "./productsData";
import {
  getPrimaryProductImage,
  getProductCategory,
  getProductSubcategory,
  getShowcaseProducts,
  getVisibleCatalogProducts,
} from "./productPresentation";
import { SectionHeader } from "./section";
import { ProductCard } from "./ProductCard";

/**
 * Arte do banner da direita.
 *
 * PROVISÓRIA: o destino do slot é uma peça fechada do marketing. Até lá vale a
 * arte de setup montado, que é o que existe no repositório.
 *
 * O convite fala com quem NÃO entende de peça. Fotos de interior de gabinete
 * mostram justamente o que assusta esse público — cabos, dissipadores, placas —
 * e ainda vinham com logo de concorrente à mostra (ASUS, MSI). Esta mostra o
 * resultado: a máquina pronta, ligada, em cima da mesa.
 *
 * Variante `tall` (1000×1200, 5:6), não a `wide`: o slot é EM PÉ — no desktop
 * ele estica pela altura das duas fileiras de produto ao lado, algo perto de
 * 360×820. Com a arte larga, `object-cover` mostrava a cena quase inteira e
 * trazia junto o letreiro "PCYES Base", que nomeia uma linha específica num
 * banner genérico.
 */
const BANNER_ARTE = "/setups/tall/setup-base.webp";

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

  /* Contagem e preço de entrada das builds prontas vêm do catálogo. O card
     anterior trazia "+200 itens" chumbado no código — o número real era 280. */
  const setups = useMemo(
    () =>
      getVisibleCatalogProducts(allProducts).filter(
        (p) => getProductCategory(p) === "Computadores" && getProductSubcategory(p) === "Setups",
      ),
    [],
  );
  const setupFrom = useMemo(
    () => setups.reduce<Product | null>((min, p) => (!min || p.priceNum < min.priceNum ? p : min), null),
    [setups],
  );

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

            É um SLOT DE ARTE. O conteúdo abaixo (texto + botões sobre a foto) é
            o que existe hoje, mas o destino é receber uma peça fechada do
            marketing — quando ela chegar, troca-se `BANNER_ARTE` e apagam-se as
            camadas de texto; o enquadramento e a proporção não mudam.

            Proporção: a coluna é 1/4 da grade e a altura vem das duas fileiras
            de produto ao lado, então a arte precisa ser VERTICAL (algo perto de
            3:4). Arte horizontal aqui vai sobrar nas laterais ou cortar o
            assunto.
          */}
          <motion.a
            href="/monte-seu-pc?inicio=quiz"
            onClick={(e) => { e.preventDefault(); navigate("/monte-seu-pc?inicio=quiz"); }}
            data-keep-dark
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            /* `stroke-hover-red` é o hover de banner do sistema (mesmo de
               BannerDuo e InRealLifeSection): o anel vermelho é o estado de
               HOVER, não de repouso. */
            className="stroke-hover-red group/banner relative flex min-h-0 flex-col justify-end overflow-hidden border border-white/10 p-7 md:p-8"
            style={{ borderRadius: "var(--radius-card-xl)", minHeight: BANNER_MIN_H }}
            aria-label="Monte seu PC — responder 3 perguntas"
          >
            {/* A arte ocupa o card inteiro. */}
            <ImageWithFallback
              src={BANNER_ARTE}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/banner:scale-[1.04]"
              style={{ objectPosition: "100% 52%" }}
            />
            {/* Escurecimento neutro, sem tingir: a foto já é vermelha e um
                degradê vermelho por cima chapava tudo num bloco só. Preto puro
                segura a legibilidade e deixa a cor da arte aparecer. */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 34%, rgba(0,0,0,0.72) 68%, rgba(0,0,0,0.94) 100%)",
              }}
            />

            <div className="relative">
              {/* Sem eyebrow o banner não diz para onde leva, e destoa do resto
                  da home, onde todo bloco abre com `// ALGUMA COISA`. */}
              <span
                className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                <Zap size={11} strokeWidth={2.4} /> // Monte seu PC
              </span>

              <h3
                className="text-ink-strong"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(24px, 1.9vw, 32px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 24px rgba(0,0,0,0.6)",
                }}
              >
                Não sabe<br />qual PC comprar?
              </h3>

              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                  textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                }}
              >
                Responde 3 perguntas e sai com a máquina certa — ou vê as {setups.length} builds
                prontas{setupFrom ? `, a partir de ${setupFrom.price}` : ""}.
              </p>

              {/* Pílula, não `<button>`: o card inteiro já é o link, e um botão
                  dentro de âncora é HTML inválido. */}
              <span
                className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3"
                style={{
                  background: "#ffffff",
                  color: "#1a0000",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow: "0 14px 32px -8px rgba(0,0,0,0.55)",
                }}
              >
                Responder 3 perguntas
                <ArrowRight size={14} strokeWidth={2.6} className="transition-transform group-hover/banner:translate-x-1" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
