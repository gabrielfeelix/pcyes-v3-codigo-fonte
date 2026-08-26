import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useCart } from "../components/CartContext";
import { getPrimaryProductImage } from "../components/productPresentation";
import { campaignById, campaignStore, computeGiftProgress, type GiftProgress } from "./giftCampaign";

/**
 * Estado do módulo de brinde, em um lugar só.
 *
 * O cálculo, a abertura do modal na borda de subida e a devolução do brinde
 * quando o carrinho regride estavam escritos DUAS vezes — CartDrawer e
 * CartPage — e já divergiam (o drawer abria o modal sozinho, a página não).
 * Com três tipos de meta, manter as duas cópias é garantir que uma fique
 * errada. A divergência que era intencional virou o parâmetro `autoOpen`.
 */
export function useGiftCampaign({ autoOpen = false }: { autoOpen?: boolean } = {}) {
  const { items, setGiftItem } = useCart();

  const [modalOpen, setModalOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);

  const campaignId = useSyncExternalStore(
    campaignStore.subscribe,
    campaignStore.getSnapshot,
    campaignStore.getSnapshot,
  );
  const campaign = useMemo(() => campaignById(campaignId), [campaignId]);
  const paidItems = useMemo(() => items.filter((item) => !item.isGift), [items]);
  const giftItem = items.find((item) => item.isGift) ?? null;

  const progress: GiftProgress | null = useMemo(
    () => (campaign ? computeGiftProgress(campaign, paidItems) : null),
    [campaign, paidItems],
  );

  const unlocked = progress?.unlocked ?? false;
  const gifts = progress?.gifts ?? [];
  /** Um brinde só não merece escolha: entra direto ao bater a meta. */
  const isSingleGift = gifts.length === 1;

  const chooseGift = useCallback(
    (productId: number) => {
      const product = gifts.find((item) => item.id === productId);
      if (!product) return;
      setGiftItem({
        id: product.id,
        name: product.name,
        price: "R$ 0,00",
        image: getPrimaryProductImage(product),
        isGift: true,
        originalPrice: product.price,
      });
      setModalOpen(false);
      setSelectedGiftId(null);
    },
    [gifts, setGiftItem],
  );

  const confirmGift = useCallback(() => {
    if (selectedGiftId !== null) chooseGift(selectedGiftId);
  }, [chooseGift, selectedGiftId]);

  // Só reage na BORDA de subida — cruzar a meta ao adicionar item. Reabrir o
  // drawer com o carrinho já acima não dispara nada.
  const prevUnlockedRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (prevUnlockedRef.current === null) prevUnlockedRef.current = unlocked;

    if (!unlocked) {
      if (giftItem) setGiftItem(null);
      setModalOpen(false);
      setDismissed(false);
      prevUnlockedRef.current = false;
      return;
    }

    const justCrossed = prevUnlockedRef.current === false;
    prevUnlockedRef.current = true;
    if (!justCrossed || giftItem) return;

    if (isSingleGift) {
      chooseGift(gifts[0].id);
    } else if (autoOpen && !dismissed) {
      setModalOpen(true);
    }
  }, [autoOpen, chooseGift, dismissed, giftItem, gifts, isSingleGift, setGiftItem, unlocked]);

  const openModal = useCallback(() => {
    setDismissed(false);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setDismissed(true);
    setSelectedGiftId(null);
  }, []);

  const swapGift = useCallback(() => {
    setGiftItem(null);
    setDismissed(false);
    setModalOpen(true);
  }, [setGiftItem]);

  return {
    campaign,
    campaignId,
    setCampaignId: campaignStore.set,
    progress,
    paidItems,
    giftItem,
    unlocked,
    isSingleGift,
    modalOpen,
    openModal,
    closeModal,
    swapGift,
    selectedGiftId,
    setSelectedGiftId,
    confirmGift,
  };
}
