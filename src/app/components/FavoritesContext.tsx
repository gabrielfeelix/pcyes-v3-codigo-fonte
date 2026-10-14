import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface FavoritesContextType {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
  addFavorite: (product: any) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id?: number) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}

/* Favoritos ficam na sessão do navegador: recarregar a página não zera o
   coração nem o contador do header. Sem conta real no protótipo, a sessão
   faz o papel da lista salva. */
const STORAGE_KEY = "pcyes-favorites";

function loadFavorites(): Set<number> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as number[]) : []);
  } catch {
    return new Set();
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(loadFavorites);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {
      /* sessão bloqueada: segue só em memória */
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const addFavorite = useCallback((product: any) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.add(product.id);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id?: number) => {
    if (!id) return false;
    return favorites.has(id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, addFavorite, removeFavorite, isFavorite, count: favorites.size }}>
      {children}
    </FavoritesContext.Provider>
  );
}