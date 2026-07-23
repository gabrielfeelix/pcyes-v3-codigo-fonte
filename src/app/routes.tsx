import { lazy, type ComponentType } from "react";
import { createBrowserRouter, useParams } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./components/HomePage";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";
import { getCategoryFromSlug } from "./lib/slug";

import {
  clearChunkReload,
  hasRecentChunkReload,
  isChunkLoadError,
  markChunkReload,
  reloadForFreshChunks,
} from "./lib/chunkReload";

/**
 * `lazy()` que se recupera de chunk obsoleto.
 *
 * Cada build gera nomes com hash novo (MonteSeuPcPage-BcAOR-0_.js). Quem estava
 * com a aba aberta durante um deploy segue com o index.html antigo em memória e,
 * ao navegar, pede um arquivo que não existe mais no servidor — o erro "Failed
 * to fetch dynamically imported module". O código está certo; o índice é que
 * envelheceu.
 *
 * Aqui a primeira falha recarrega a página, o que busca o index.html atual com
 * os hashes novos. A trava datada em sessionStorage (ver lib/chunkReload) evita
 * laço quando a falha for real (rede fora, arquivo realmente ausente): duas
 * falhas em poucos segundos fazem o erro subir para o GlobalErrorBoundary.
 *
 * Erro que não é de chunk (bug no módulo, por exemplo) sobe direto — recarregar
 * não conserta código quebrado, só esconde o problema atrás de um piscar.
 */
function lazyRoute<T extends ComponentType<never>>(load: () => Promise<{ default: T }>) {
  return lazy(() =>
    load()
      .then((mod) => {
        clearChunkReload();
        return mod;
      })
      .catch((error) => {
        if (!isChunkLoadError(error)) throw error;
        if (hasRecentChunkReload()) throw error;

        markChunkReload();
        reloadForFreshChunks();
        // Promise pendente de propósito: a página já está sendo trocada, então
        // não faz sentido resolver nem estourar erro nesse intervalo.
        return new Promise<{ default: T }>(() => {});
      }),
  );
}

// Lazy-loaded page components (non-first-paint)
const ProductsPage = lazyRoute(() => import("./components/ProductsPage").then(m => ({ default: m.ProductsPage })));
const ProductPage = lazyRoute(() => import("./components/ProductPage").then(m => ({ default: m.ProductPage })));
const CartPage = lazyRoute(() => import("./components/CartPage").then(m => ({ default: m.CartPage })));
const CheckoutPage = lazyRoute(() => import("./components/CheckoutPage").then(m => ({ default: m.CheckoutPage })));
const ProfilePage = lazyRoute(() => import("./components/ProfilePage").then(m => ({ default: m.ProfilePage })));
const InfluencersPage = lazyRoute(() => import("./components/pages/InfluencersPage").then(m => ({ default: m.InfluencersPage })));
const ResellerPage = lazyRoute(() => import("./components/pages/ResellerPage").then(m => ({ default: m.ResellerPage })));
const ContactPage = lazyRoute(() => import("./components/pages/ContactPage").then(m => ({ default: m.ContactPage })));
const StoreLocatorPage = lazyRoute(() => import("./components/pages/StoreLocatorPage").then(m => ({ default: m.StoreLocatorPage })));
const MaringaFCCollabPage = lazyRoute(() => import("./components/pages/MaringaFCCollabPage").then(m => ({ default: m.MaringaFCCollabPage })));
const MonteSeuPcPage = lazyRoute(() => import("./pages/MonteSeuPcPage").then(m => ({ default: m.MonteSeuPcPage })));
const DriversManuaisPage = lazyRoute(() => import("./pages/DriversManuaisPage").then(m => ({ default: m.DriversManuaisPage })));
const DriverDetailPage = lazyRoute(() => import("./pages/DriverDetailPage").then(m => ({ default: m.DriverDetailPage })));
const FaqPage = lazyRoute(() => import("./pages/FaqPage").then(m => ({ default: m.FaqPage })));
const QuemSomosPage = lazyRoute(() => import("./pages/QuemSomosPage").then(m => ({ default: m.QuemSomosPage })));
const PrivacyPage = lazyRoute(() => import("./pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const WarrantyPage = lazyRoute(() => import("./pages/WarrantyPage").then(m => ({ default: m.WarrantyPage })));
const TermsPage = lazyRoute(() => import("./pages/TermsPage").then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazyRoute(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

/* Rota de categoria: se o slug não corresponde a nenhuma categoria real
   (URL digitada errada / lixo), mostra o 404 em vez de fingir uma categoria
   vazia com título sem sentido. Subcategoria inválida sob categoria válida
   segue no ProductsPage (estado vazio). */
function CategoryRoute() {
  const { category } = useParams();
  if (category && !getCategoryFromSlug(category)) return <NotFoundPage />;
  return <ProductsPage />;
}

const basename =
  import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <GlobalErrorBoundary />,
    children: [
      { index: true, Component: HomePage },
      { path: "produtos", Component: ProductsPage },
      { path: "produto/:id", Component: ProductPage },
      { path: "carrinho", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "perfil", Component: ProfilePage },
      { path: "influenciadores", Component: InfluencersPage },
      { path: "revendedor", Component: ResellerPage },
      { path: "fale-conosco", Component: ContactPage },
      { path: "onde-encontrar", Component: StoreLocatorPage },
      { path: "maringa-fc", Component: MaringaFCCollabPage },
      { path: "monte-seu-pc", Component: MonteSeuPcPage },
      { path: "drivers-e-manuais", Component: DriversManuaisPage },
      { path: "drivers-e-manuais/:slug", Component: DriverDetailPage },
      { path: "faq", Component: FaqPage },
      { path: "quem-somos", Component: QuemSomosPage },
      { path: "politica-de-privacidade", Component: PrivacyPage },
      { path: "politica-de-garantia", Component: WarrantyPage },
      { path: "termos-de-uso", Component: TermsPage },

      /* ── Semantic URL routes (A1) ──
         Order matters: static paths above are matched first by react-router.
         Dynamic segments below resolve via getCategoryFromSlug() inside the
         page component; unknown slugs render an empty result set.
         Examples:
           /perifericos                    -> ProductsPage (Periféricos)
           /perifericos/mouses             -> ProductsPage (Periféricos / Mouses)
           /perifericos/pcyes/mouse-vert   -> ProductPage  (no subcategory)
           /perifericos/mouses/pcyes/mv01  -> ProductPage  (full slug path)  */
      { path: ":category", Component: CategoryRoute },
      { path: ":category/:subcategory", Component: CategoryRoute },
      { path: ":category/:brand/:slug", Component: ProductPage },
      { path: ":category/:subcategory/:brand/:slug", Component: ProductPage },

      /* Catch-all: URLs sem correspondência (malformadas / profundas demais)
         caem numa página 404 útil (busca + home + categorias) em vez de tela
         de erro. Slugs de categoria desconhecidos ainda resolvem no ProductsPage
         com estado vazio. */
      { path: "*", Component: NotFoundPage },
    ],
  },
], { basename });
