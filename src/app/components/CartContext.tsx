import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { trackAddToCart } from "../../utils/analytics";

export interface CartItem {
  cartKey: string;
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  isGift?: boolean;
  originalPrice?: string;
}

type AddCartItemInput = Omit<CartItem, "quantity" | "cartKey"> & {
  cartKey?: string;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: AddCartItemInput) => void;
  removeItem: (cartKey: string) => void;
  restoreItem: (item: CartItem, index?: number) => void;
  clearCart: () => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  setGiftItem: (item: AddCartItemInput | null) => void;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastAdded: CartItem | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  const addItem = useCallback((item: AddCartItemInput) => {
    const itemKey = item.cartKey ?? `${item.isGift ? "gift" : "product"}-${item.id}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.cartKey === itemKey);
      if (existing) {
        return prev.map((i) => i.cartKey === itemKey ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, cartKey: itemKey, quantity: 1 }];
    });
    const newItem = { ...item, cartKey: itemKey, quantity: 1 };
    setLastAdded(newItem);
    setIsOpen(true);
    setTimeout(() => setLastAdded(null), 2000);
    if (!item.isGift) trackAddToCart({ id: item.id, name: item.name, price: item.price });
  }, []);

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }, []);

  // Reinsere um item removido preservando quantidade e posição (undo do toast).
  const restoreItem = useCallback((item: CartItem, index?: number) => {
    setItems((prev) => {
      if (prev.some((i) => i.cartKey === item.cartKey)) return prev;
      if (index === undefined || index < 0 || index > prev.length) return [...prev, item];
      const next = [...prev];
      next.splice(index, 0, item);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateQuantity = useCallback((cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
    } else {
      setItems((prev) => prev.map((i) => i.cartKey === cartKey ? { ...i, quantity } : i));
    }
  }, []);

  const setGiftItem = useCallback((item: AddCartItemInput | null) => {
    setItems((prev) => {
      const withoutExistingGift = prev.filter((cartItem) => !cartItem.isGift);
      if (!item) return withoutExistingGift;

      return [
        ...withoutExistingGift,
        {
          ...item,
          cartKey: item.cartKey ?? `gift-${item.id}`,
          quantity: 1,
          isGift: true,
        },
      ];
    });
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, restoreItem, clearCart, updateQuantity, setGiftItem, totalItems, isOpen, setIsOpen, lastAdded }}>
      {children}
    </CartContext.Provider>
  );
}
