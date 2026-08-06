"use client";

import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowRight, Heart, ShoppingCart, Zap } from "lucide-react";
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
import { SectionHeader, CTAButton, DiscountBadge } from "./section";
import { ProductCard } from "./ProductCard";

/**
 * Arte do banner — setup PCYES montado sobre a mesa.
 *
 * O convite fala com quem NÃO entende de peça. Fotos de interior de gabinete
 * mostravam justamente o que assusta esse público — cabos, dissipadores,
 * placas — e ainda vinham com logo de concorrente à mostra (ASUS, MSI). Aqui a
 * imagem mostra o resultado: a máquina pronta, ligada, em cima da mesa.
 *
 * `object-position` puxa o enquadramento para a direita porque a arte é larga e
 * traz o letreiro "PCYES Base" no canto esquerdo — nomear uma linha específica
 * não faz sentido num banner genérico.
 */
const BUILD_PHOTO = "/setups/wide/setup-base.webp";

/** Arte do card de builds prontas — mesma família, outro setup. */
const SETUP_PHOTO = "/setups/wide/setup-strike.webp";

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

  const products = useMemo(() => {
    const visible = getShowcaseProducts(allProducts);
    const resolved = productIds
      .map((id) => visible.find((p) => p.id === id))
      .filter(Boolean) as Product[];
    return resolved.slice(0, 8);
  }, [productIds]);

  const rest = products.slice(1, 7); // 6 products (3 cols × 2 rows)

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

        {/* Grid: products (left) + featured (right) */}
        <div className="grid gap-5 md:gap-6 lg:grid-cols-[2fr_1fr]">
          {/* LEFT: 6 products in 3 cols × 2 rows */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {rest.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.05 * i }}
              >
                <ProductCard
                  product={product}
                  variant="grid"
                  favorite
                  onAdd={handleAdd}
                  onFavorite={handleFavorite}
                />
              </motion.div>
            ))}
          </div>

          {/* RIGHT: as duas portas do "Monte seu PC" que sobram fora do quiz —
              montar e comprar pronto. Em coluna única a altura acompanhava as
              duas fileiras de produto e sobravam ~525px de foto sem função. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex h-full flex-col gap-5 md:gap-6"
          >
          <div
            data-keep-dark
            /* `stroke-hover-red` é o hover de banner do sistema (mesmo de
               BannerDuo e InRealLifeSection): o anel vermelho é
               o estado de HOVER. Aqui ele estava como borda e brilho fixos, o
               que obrigava a inventar um segundo realce por cima. */
            className="stroke-hover-red group/quiz relative flex flex-[1.2] flex-col justify-between overflow-hidden border border-white/10 p-7 md:p-9"
            style={{
              background:
                "radial-gradient(circle at 25% 15%, rgba(255,90,80,0.35) 0%, transparent 55%), radial-gradient(circle at 80% 85%, rgba(225,6,0,0.4) 0%, transparent 55%), linear-gradient(135deg, #b00500 0%, #6e0200 50%, #2a0000 100%)",
              borderRadius: "var(--radius-card-xl)",
              /* Sem `boxShadow` inline: estilo inline vence a regra de
                 `.stroke-hover-red:hover` e o anel nunca aparecia. Os outros
                 banners do sistema também não têm sombra em repouso. */
              minHeight: "clamp(390px, 82vw, 470px)",
            }}
          >
            {/* Faint grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(var(--foreground-rgb), 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--foreground-rgb), 0.9) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            {/* Foto ocupando o card inteiro. Ela é vertical, então acompanha a
                coluna sem esticar. O degradê por cima é o que mantém a frase
                legível: opaco no topo, abrindo para a foto na metade de baixo. */}
            <div className="pointer-events-none absolute inset-0">
              <ImageWithFallback
                src={BUILD_PHOTO}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                style={{ objectPosition: "88% 58%" }}
              />
              {/* Escurecimento neutro, sem tingir: a foto já é vermelha e o
                  degradê vermelho por cima chapava tudo num bloco só. Preto
                  puro segura a legibilidade e deixa a cor da foto aparecer. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.8) 38%, rgba(0,0,0,0.62) 66%, rgba(0,0,0,0.28) 100%)",
                }}
              />
            </div>

            {/*
              O CTA lidera pelo quiz, que é o caminho de menor esforço — e o que
              a própria página de montagem marca como POPULAR. "Montar meu PC"
              falava só com quem já sabe as peças, que é a minoria.

              O link secundário existe para não fechar a porta dos outros dois
              caminhos: quem já sabe o que quer não precisa passar pelo quiz.
            */}
            <div className="relative">
              {/* Sem eyebrow o card não dizia para onde levava, e destoava do
                  resto da home, onde todo bloco abre com `// ALGUMA COISA`. */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-5"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Zap size={11} strokeWidth={2.4} className="text-ink-strong" />
                <span
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-caption)",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  // MONTE SEU PC
                </span>
              </div>

              <h3
                className="text-ink-strong"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(30px, 2.8vw, 42px)",
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 24px rgba(0,0,0,0.55)",
                }}
              >
                Não sabe<br />qual PC comprar?
              </h3>

              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                  maxWidth: "280px",
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                }}
              >
                A gente pergunta, você responde. No fim sai a máquina certa pro que você joga.
              </p>

              {/* "Responder 3 perguntas" em vez de "Fazer o quiz": o quiz tem
                  três passos, e dizer o tamanho antes do clique tira o medo de
                  compromisso aberto. Largura cheia porque é a única ação
                  principal do bloco. */}
              <Link
                to="/monte-seu-pc?inicio=quiz"
                className="group/cta mt-7 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "#ffffff",
                  color: "#1a0000",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow: "0 14px 32px -8px rgba(0,0,0,0.55)",
                }}
              >
                Responder 3 perguntas
                <ArrowRight size={15} strokeWidth={2.6} className="transition-transform group-hover/cta:translate-x-1" />
              </Link>

              {/* Era um link de 11px em 78% de opacidade sobre foto: existia
                  para não fechar a porta de quem já sabe o que quer, e ninguém
                  via. Como botão fantasma, tem alvo de toque e contraste. */}
              <Link
                to="/monte-seu-pc?inicio=builder"
                className="mt-3 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-black/35 px-6 py-3.5 transition-colors duration-200 hover:border-white/70 hover:bg-black/55"
                style={{
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Já sei, montar do zero
              </Link>
            </div>
          </div>

          {/*
            Terceira porta: quem não quer escolher peça nenhuma.

            O card inteiro navega, mas NÃO é um `<a>` envolvendo tudo: dentro de
            um link, arrastar o cursor inicia arraste de link e o texto deixa de
            ser selecionável — o card de cima selecionava, este não. Aqui o
            container é `div` com `onClick`, e quem carrega a semântica de link
            (teclado, leitor de tela, abrir em nova aba) é o "Ver setups
            prontos" lá embaixo, que é `<Link>` de verdade.
          */}
          <div
            data-keep-dark
            onClick={(e) => {
              // Não navega quando o clique foi o fim de uma seleção de texto,
              // nem quando saiu de dentro do próprio link do CTA.
              if (window.getSelection()?.toString()) return;
              if ((e.target as HTMLElement).closest("a")) return;
              navigate("/computadores/setups/");
            }}
            className="stroke-hover-red group/setup relative flex flex-1 cursor-pointer flex-col justify-end overflow-hidden border border-white/10 p-7 md:p-9"
            style={{
              borderRadius: "var(--radius-card-xl)",
              minHeight: "clamp(250px, 54vw, 320px)",
            }}
          >
            <ImageWithFallback
              src={SETUP_PHOTO}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/setup:scale-[1.04]"
              style={{ objectPosition: "97% 62%" }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 34%, rgba(0,0,0,0.6) 68%, rgba(0,0,0,0.92) 100%)",
              }}
            />

            <div className="relative">
              <span
                className="mb-3 block"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                }}
              >
                // BUILDS PRONTAS
              </span>

              <h3
                className="text-ink-strong"
                style={{
                  fontFamily: "var(--font-family-figtree)",
                  fontSize: "clamp(24px, 2vw, 30px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  textShadow: "0 4px 20px rgba(0,0,0,0.7)",
                }}
              >
                Não quer montar nada?
              </h3>

              <p
                className="mt-2.5"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.5,
                  textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                }}
              >
                {setups.length} setups montados e testados
                {setupFrom ? `, a partir de ${setupFrom.price}` : ""}. Compra num clique, como qualquer produto.
              </p>

              <Link
                to="/computadores/setups/"
                className="mt-5 inline-flex w-fit items-center gap-2 underline-offset-4 hover:underline"
                style={{
                  fontFamily: "var(--font-family-inter)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Ver setups prontos
                <ArrowRight size={15} strokeWidth={2.6} className="transition-transform group-hover/setup:translate-x-1" />
              </Link>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
