import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { CartProvider } from "./CartContext";
import { CheckoutPrefsProvider } from "./CheckoutPrefsContext";
import { AuthProvider } from "./AuthContext";
import { FavoritesProvider } from "./FavoritesContext";
import { CartDrawer } from "./CartDrawer";
import { AuthModal } from "./AuthModal";
import { CookieConsent } from "./CookieConsent";
import { WelcomePopup } from "./WelcomePopup";
import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";
import { ThemeProvider } from "./ThemeProvider";
import { VLibras } from "./VLibras";

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <CheckoutPrefsProvider>
              <div className="min-h-dvh bg-background text-foreground overflow-x-clip transition-colors duration-300">
                {/* WCAG 2.4.1 Bypass Blocks — first focusable element jumps to main content. */}
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-ink-strong focus:shadow-lg focus:outline-none"
                >
                  Pular para o conteúdo principal
                </a>
                {pathname !== "/checkout" && pathname !== "/carrinho" && pathname !== "/monte-seu-pc" && <AnnouncementBar />}
                {pathname !== "/checkout" && pathname !== "/monte-seu-pc" && <Navbar />}
                <div data-page-light-scope className="contents">
                  {pathname !== "/checkout" && <CartDrawer />}
                  <AuthModal />
                  <WelcomePopup />
                  <CookieConsent />
                  <main id="main-content" tabIndex={-1} className="outline-none">
                    <Outlet />
                  </main>
                </div>
                <VLibras />
              </div>
            </CheckoutPrefsProvider>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
