import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./components/HomePage";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";

// Lazy-loaded page components (non-first-paint)
const ProductsPage = lazy(() => import("./components/ProductsPage").then(m => ({ default: m.ProductsPage })));
const ProductPage = lazy(() => import("./components/ProductPage").then(m => ({ default: m.ProductPage })));
const CartPage = lazy(() => import("./components/CartPage").then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import("./components/CheckoutPage").then(m => ({ default: m.CheckoutPage })));
const PreOrderPage = lazy(() => import("./components/PreOrderPage").then(m => ({ default: m.PreOrderPage })));
const ProfilePage = lazy(() => import("./components/ProfilePage").then(m => ({ default: m.ProfilePage })));
const InfluencersPage = lazy(() => import("./components/pages/InfluencersPage").then(m => ({ default: m.InfluencersPage })));
const ResellerPage = lazy(() => import("./components/pages/ResellerPage").then(m => ({ default: m.ResellerPage })));
const ContactPage = lazy(() => import("./components/pages/ContactPage").then(m => ({ default: m.ContactPage })));
const StoreLocatorPage = lazy(() => import("./components/pages/StoreLocatorPage").then(m => ({ default: m.StoreLocatorPage })));
const MaringaFCCollabPage = lazy(() => import("./components/pages/MaringaFCCollabPage").then(m => ({ default: m.MaringaFCCollabPage })));
const MonteSeuPcPage = lazy(() => import("./pages/MonteSeuPcPage").then(m => ({ default: m.MonteSeuPcPage })));
const DriversManuaisPage = lazy(() => import("./pages/DriversManuaisPage").then(m => ({ default: m.DriversManuaisPage })));
const DriverDetailPage = lazy(() => import("./pages/DriverDetailPage").then(m => ({ default: m.DriverDetailPage })));
const FaqPage = lazy(() => import("./pages/FaqPage").then(m => ({ default: m.FaqPage })));
const QuemSomosPage = lazy(() => import("./pages/QuemSomosPage").then(m => ({ default: m.QuemSomosPage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const WarrantyPage = lazy(() => import("./pages/WarrantyPage").then(m => ({ default: m.WarrantyPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then(m => ({ default: m.TermsPage })));

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
      { path: "pre-venda", Component: PreOrderPage },
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
      { path: ":category", Component: ProductsPage },
      { path: ":category/:subcategory", Component: ProductsPage },
      { path: ":category/:brand/:slug", Component: ProductPage },
      { path: ":category/:subcategory/:brand/:slug", Component: ProductPage },
    ],
  },
], { basename });
