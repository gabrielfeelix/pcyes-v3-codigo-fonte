import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { X, ShoppingCart, Trash2, Check, Gift, Sparkles } from "lucide-react";
import { useCart } from "./CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { allProducts } from "./productsData";
import { getPrimaryProductImage, getShowcaseProducts } from "./productPresentation";
import { PcyesCoin } from "./PcyesCoin";
import { useCheckoutPrefs } from "./CheckoutPrefsContext";
import { BrindePill, Price, PreOrderPill, QtyStepper, ScrollFade } from "./section";
import { useFocusTrap } from "../lib/useFocusTrap";
import { getPreOrderInfo } from "./PreOrderData";
import { formatBRL, parseBRL } from "../../utils/format";
import { GIFT_THRESHOLD, maxRedeemablePoints, pointsToBRL } from "../../utils/commerce";
import { toast } from "sonner";

const USER_PCYES_POINTS = 480;

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, restoreItem, updateQuantity, totalItems, lastAdded, setGiftItem, clearCart } = useCart();
  const removeWithUndo = (item: (typeof items)[number]) => {
    const idx = items.findIndex((i) => i.cartKey === item.cartKey);
    removeItem(item.cartKey);
    toast(`${item.name.split(" ").slice(0, 4).join(" ")}… removido`, {
      action: { label: "Desfazer", onClick: () => restoreItem(item, idx) },
    });
  };
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;
  const navigate = useNavigate();
  const { pointsApplied, setPointsApplied, pointsToUse } = useCheckoutPrefs();

  // Foco preso no drawer enquanto aberto; Escape fecha; foco volta ao gatilho.
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen, () => setIsOpen(false));

  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [giftDismissed, setGiftDismissed] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);

  const parsePrice = parseBRL;
  const formatPrice = formatBRL;
  const formatInt = (n: number) => n.toLocaleString("pt-BR");

  const paidItems = items.filter((item) => !item.isGift);
  const giftItem = items.find((item) => item.isGift) ?? null;
  const subtotal = paidItems.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0);
  const maxPointsRedeem = maxRedeemablePoints(USER_PCYES_POINTS, subtotal);
  const pointsUsed = pointsApplied ? Math.min(pointsToUse, maxPointsRedeem) : 0;
  const pointsValue = pointsToBRL(pointsUsed);
  const total = Math.max(0, subtotal - pointsValue);
  const giftUnlocked = subtotal >= GIFT_THRESHOLD;
  const giftProgress = Math.min(100, (subtotal / GIFT_THRESHOLD) * 100);
  const remainingForGift = Math.max(0, GIFT_THRESHOLD - subtotal);

  const giftOptions = useMemo(
    () => {
      const uniqueCategories = new Set<string>();
      return getShowcaseProducts(allProducts)
        .sort((a, b) => a.priceNum - b.priceNum)
        .filter((product) => {
          if (uniqueCategories.has(product.category)) return false;
          uniqueCategories.add(product.category);
          return true;
        })
        .slice(0, 3);
    },
    [],
  );

  // Só abre o modal de brinde na BORDA de subida do subtotal (cruzou o limite
  // ao adicionar item) — nunca só por reabrir o drawer com o carrinho já acima.
  const prevUnlockedRef = useRef<boolean | null>(null);
  useEffect(() => {
    // Primeira execução: registra o estado atual sem disparar nada.
    if (prevUnlockedRef.current === null) prevUnlockedRef.current = giftUnlocked;

    if (!giftUnlocked) {
      if (giftItem) setGiftItem(null);
      setGiftModalOpen(false);
      setGiftDismissed(false);
      prevUnlockedRef.current = false;
      return;
    }

    const justCrossed = prevUnlockedRef.current === false;
    prevUnlockedRef.current = true;

    if (justCrossed && !giftItem && !giftDismissed) {
      setGiftModalOpen(true);
    }
  }, [giftDismissed, giftItem, giftUnlocked, setGiftItem]);

  const confirmGift = () => {
    const product = giftOptions.find((item) => item.id === selectedGiftId);
    if (!product) return;

    setGiftItem({
      id: product.id,
      name: product.name,
      price: "R$ 0,00",
      image: getPrimaryProductImage(product),
      isGift: true,
      originalPrice: product.price,
    });
    setGiftModalOpen(false);
    setSelectedGiftId(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
            className="fixed top-0 right-0 bottom-0 z-[61] flex w-full max-w-[460px] flex-col overflow-hidden"
            style={{
              background: isDark ? "#161617" : "white",
              borderTopLeftRadius: "var(--radius-card-lg)",
              borderBottomLeftRadius: "var(--radius-card-lg)",
              borderLeft: "1px solid rgba(var(--foreground-rgb), 0.06)",
              boxShadow: "var(--shadow-drawer-side)",
            }}
          >
            <div className="flex items-center justify-between border-b border-foreground/5 px-7 py-5">
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} className="text-foreground" strokeWidth={1.5} />
                <span className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-lg)", fontWeight: "var(--font-weight-medium)" }}>Carrinho</span>
                <span aria-hidden="true" className="px-2 py-0.5 bg-primary text-primary-foreground" style={{ borderRadius: "var(--radius-pill)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)" }}>{totalItems}</span>
                {/* O número sozinho não diz nada fora do contexto visual; esta
                    região anuncia a mudança de quantidade a leitores de tela. */}
                <span className="sr-only" role="status" aria-live="polite">
                  {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-500/70" style={{ borderRadius: "var(--radius-pill)", fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}>
                  <PcyesCoin size={14} />
                  {formatInt(USER_PCYES_POINTS)}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fechar carrinho"
                className="w-9 h-9 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5 cursor-pointer"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {paidItems.length > 0 && (
              <div className="border-b border-foreground/5 px-7 py-3.5">
                <div className={`overflow-hidden rounded-card-md border ${giftUnlocked ? "border-primary/18 bg-primary/[0.06]" : "border-foreground/8 bg-foreground/[0.03]"}`}>
                  <div className="px-4 py-3.5">
                    {/* items-center: com o texto em uma linha só, alinhar pelo topo
                        deixava a frase alta e o ícone "sobrando" embaixo. */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary">
                          <Gift size={15} />
                        </div>
                        {/* Uma linha só. Antes eram título + descrição dizendo a mesma
                            coisa (o valor do limite já aparece na régua abaixo e o
                            botão já diz a ação), o que inchava a altura do bloco. */}
                        <p className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: "600", lineHeight: 1.25 }}>
                          {giftUnlocked
                            ? giftItem
                              ? "Brinde adicionado ao carrinho"
                              : "Você liberou um brinde"
                            : `Faltam ${formatPrice(remainingForGift)} para ganhar um brinde`}
                        </p>
                      </div>
                      {giftUnlocked && (
                        <button
                          onClick={() => { setGiftDismissed(false); setGiftModalOpen(true); }}
                          className="text-primary hover:opacity-80 transition-opacity cursor-pointer"
                          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "700", letterSpacing: "0.08em" }}
                        >
                          {giftItem ? "TROCAR" : "ESCOLHER"}
                        </button>
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-foreground/6">
                        <motion.div
                          initial={false}
                          animate={{ width: `${giftProgress}%` }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-linear-to-r from-primary to-primary/65"
                        />
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-foreground/25" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "600", letterSpacing: "0.12em" }}>
                          0
                        </span>
                        <span className={`flex items-center gap-1.5 ${giftUnlocked ? "text-primary" : "text-foreground/35"}`} style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "700", letterSpacing: "0.12em" }}>
                          <Sparkles size={11} />
                          BRINDE
                        </span>
                        <span className="text-foreground/25" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "600", letterSpacing: "0.12em" }}>
                          {formatPrice(GIFT_THRESHOLD)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <ScrollFade className="flex-1 overflow-y-auto px-7 py-5" label="Itens do carrinho">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-foreground/5">
                    <ShoppingCart size={28} className="text-foreground/20" strokeWidth={1} />
                  </div>
                  <p className="text-foreground/60 mb-2" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-base)", fontWeight: "var(--font-weight-medium)" }}>Carrinho vazio</p>
                  <p className="text-foreground/30" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>Adicione produtos para começar</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div key={item.cartKey} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30, height: 0 }} transition={{ duration: 0.3 }}
                        className={`flex gap-4 p-3.5 border ${lastAdded?.cartKey === item.cartKey ? "border-primary/30 bg-primary/5" : item.isGift ? "border-primary/20 bg-primary/[0.04]" : "border-foreground/5 bg-foreground/[0.02]"} transition-colors duration-700`}
                        style={{ borderRadius: "var(--radius-card)" }}
                      >
                        <div className="w-[75px] h-[75px] flex-shrink-0 overflow-hidden relative" style={{ borderRadius: "var(--radius)", background: "var(--surface-1)" }}>
                          <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          {item.isGift && (
                            <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                              <Gift size={13} />
                            </div>
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="truncate text-foreground mb-0.5" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)" }}>{item.name}</p>
                              {item.isGift && <BrindePill />}
                              {!item.isGift && getPreOrderInfo(item.id) && <PreOrderPill info={getPreOrderInfo(item.id)!} compact />}
                            </div>
                            <div className="flex items-center gap-2">
                              {item.isGift && item.originalPrice && (
                                <p className="text-foreground/20 line-through" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)" }}>{item.originalPrice}</p>
                              )}
                              <p className={item.isGift ? "text-primary" : "text-foreground/50"} style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: item.isGift ? "600" : "400" }}>
                                {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            {item.isGift ? (
                              <div className="flex items-center gap-2 text-primary/80">
                                <Gift size={13} />
                                <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: "600", letterSpacing: "0.08em" }}>
                                  1 item gratuito
                                </span>
                              </div>
                            ) : (
                              <QtyStepper
                                size="sm"
                                value={item.quantity}
                                onChange={(next) => updateQuantity(item.cartKey, next)}
                              />
                            )}
                            <button onClick={() => item.isGift ? setGiftItem(null) : removeWithUndo(item)} aria-label={item.isGift ? "Remover brinde" : `Remover ${item.name}`} className="text-foreground/20 hover:text-primary transition-colors cursor-pointer">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </ScrollFade>

            {items.length > 0 && (
              <div className="border-t border-foreground/5 px-7 py-5 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/35" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>Subtotal</span>
                    <Price value={subtotal} className="text-foreground/60" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-foreground/50" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>Total</span>
                  <Price value={total} label="Total" className="text-foreground" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "var(--text-xl)", fontWeight: "var(--font-weight-medium)" }} />
                </div>

                <button
                  className="w-full py-4 rounded-full text-ink-strong transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    background: "var(--gradient-buy)",
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    boxShadow: "var(--shadow-buy-cta)",
                  }}
                  /* "Ver carrinho" e não "Finalizar compra": este botão leva ao
                     carrinho, não ao pagamento. Prometer a compra aqui quebra a
                     expectativa na próxima tela. O verbo de decisão fica no
                     carrinho, onde "Finalizar compra" é verdade. */
                  onClick={() => { setIsOpen(false); navigate("/carrinho"); }}
                  aria-label="Ver carrinho"
                >Ver carrinho</button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center border border-foreground/12 bg-transparent text-foreground/55 hover:text-foreground/85 hover:border-foreground/22 transition-colors cursor-pointer rounded-full"
                  style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)", fontWeight: 600, minHeight: "44px" }}
                >Continuar comprando</button>
                <div className="flex items-center justify-center pt-1">
                  <button
                    onClick={() => toast("Limpar todo o carrinho?", {
                      action: { label: "Limpar", onClick: () => clearCart() },
                    })}
                    className="inline-flex items-center gap-1 text-foreground/30 hover:text-primary transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600 }}
                    aria-label="Limpar carrinho"
                  >
                    <Trash2 size={12} strokeWidth={2} />
                    Limpar carrinho
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <AnimatePresence>
            {giftModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setGiftModalOpen(false); setGiftDismissed(true); setSelectedGiftId(null); }}
                className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-md p-0 md:items-center md:p-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.97 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-auto max-h-[92dvh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-[28px] md:max-h-[calc(100dvh-3rem)] md:rounded-[var(--radius-card-xl)]"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid rgba(var(--foreground-rgb), 0.08)",
                    boxShadow: "0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(var(--foreground-rgb), 0.04)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="border-b border-edge-subtle px-6 py-6 md:px-9 md:py-8">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <div className="mb-3 flex items-center gap-2 text-primary">
                          <Gift size={14} strokeWidth={2.2} />
                          <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.3em" }}>
                            // BRINDE DESBLOQUEADO
                          </span>
                        </div>
                        <h3 className="text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                          Escolha seu presente
                        </h3>
                        <p className="mt-3 max-w-[560px] text-ink-muted" style={{ fontFamily: "var(--font-family-inter)", fontSize: "clamp(12px, 3.4vw, 14px)", lineHeight: 1.6 }}>
                          Você atingiu {formatPrice(GIFT_THRESHOLD)}. Selecione um produto pra entrar no carrinho com selo de presente e valor zerado.
                        </p>
                      </div>
                      <button onClick={() => { setGiftModalOpen(false); setGiftDismissed(true); }} aria-label="Fechar oferta de brinde" className="flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full border border-edge text-ink-muted transition-colors hover:text-ink-strong hover:bg-white/[0.06] cursor-pointer flex-shrink-0">
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-9 md:py-8">
                    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                    {giftOptions.map((product) => {
                      const isSelected = selectedGiftId === product.id;
                      return (
                      <button
                        key={`gift-option-${product.id}`}
                        onClick={() => setSelectedGiftId(product.id)}
                        aria-pressed={isSelected}
                        className="group relative flex flex-row overflow-hidden text-left transition-all duration-300 cursor-pointer md:block"
                        style={{
                          borderRadius: "var(--radius-card-lg)",
                          background: "linear-gradient(135deg, rgba(var(--foreground-rgb), 0.06) 0%, rgba(var(--foreground-rgb), 0.02) 100%)",
                          border: isSelected ? "1.5px solid rgba(225,6,0,0.7)" : "1px solid rgba(var(--foreground-rgb), 0.08)",
                          boxShadow: isSelected
                            ? "0 24px 60px -20px rgba(225,6,0,0.35), inset 0 1px 0 rgba(var(--foreground-rgb), 0.05)"
                            : "var(--shadow-card-hairline)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: "radial-gradient(circle at 30% 25%, rgba(var(--foreground-rgb), 0.05) 0%, transparent 55%)",
                            borderRadius: "var(--radius-card-lg)",
                          }}
                        />
                        <div
                          className="relative h-[132px] w-[132px] flex-shrink-0 overflow-hidden border-r border-edge-subtle md:h-[210px] md:w-full md:border-r-0 md:border-b"
                          style={{ background: "radial-gradient(circle at top, rgba(225,6,0,0.12) 0%, transparent 60%)" }}
                        >
                          <ImageWithFallback src={getPrimaryProductImage(product)} alt={product.name} className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04] md:p-6" />
                          <div
                            className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-ink-strong md:left-4 md:top-4 md:h-9 md:w-9"
                            style={{
                              background: "var(--gradient-brand)",
                              boxShadow: "var(--shadow-medallion)",
                            }}
                          >
                            <Gift size={12} strokeWidth={2.2} className="md:hidden" />
                            <Gift size={14} strokeWidth={2.2} className="hidden md:block" />
                          </div>
                          {isSelected && (
                            <div
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-ink-strong md:right-4 md:top-4 md:h-9 md:w-9"
                              style={{
                                background: "var(--gradient-brand)",
                                boxShadow: "var(--shadow-medallion)",
                              }}
                            >
                              <Check size={13} strokeWidth={2.4} className="md:hidden" />
                              <Check size={15} strokeWidth={2.4} className="hidden md:block" />
                            </div>
                          )}
                        </div>
                        <div className="relative flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
                          <p className="line-clamp-2 text-ink-strong" style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(14px, 3.8vw, 17px)", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                            {product.name}
                          </p>
                          <div className="mt-3 flex items-baseline gap-2 md:mt-4">
                            <span className="line-through" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", color: "rgba(var(--foreground-rgb), 0.62)" }}>
                              {product.price}
                            </span>
                            <span style={{ fontFamily: "var(--font-family-figtree)", fontSize: "clamp(16px, 4.6vw, 22px)", fontWeight: 700, color: "#22c55e", letterSpacing: "-0.015em" }}>
                              R$ 0,00
                            </span>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-4 md:mt-4 md:pt-0">
                            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(var(--foreground-rgb), 0.4)" }}>
                              PRESENTE PCYES
                            </span>
                            <span style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 700, letterSpacing: "0.12em", color: isSelected ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.45)" }}>
                              {isSelected ? "SELECIONADO" : "SELECIONAR"}
                            </span>
                          </div>
                        </div>
                      </button>
                      );
                    })}
                  </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-edge-subtle px-6 py-5 md:px-9 md:py-6">
                    <button
                      onClick={() => { setGiftModalOpen(false); setGiftDismissed(true); setSelectedGiftId(null); }}
                      className="inline-flex items-center cursor-pointer text-ink-muted transition-colors hover:text-ink min-h-[44px] px-3 md:min-h-[24px] md:px-0"
                      style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.06em" }}
                    >
                      Agora não
                    </button>
                    <button
                      onClick={confirmGift}
                      disabled={!selectedGiftId}
                      className="cursor-pointer rounded-full px-7 py-3 text-ink-strong transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 min-h-[44px] md:min-h-[24px]"
                      style={{
                        background: "var(--gradient-brand)",
                        fontFamily: "var(--font-family-inter)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        boxShadow: "var(--shadow-brand-cta)",
                      }}
                    >
                      Selecionar presente
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
