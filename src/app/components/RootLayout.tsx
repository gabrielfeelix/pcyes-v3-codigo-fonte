import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { CartProvider } from "./CartContext";
import { CheckoutPrefsProvider } from "./CheckoutPrefsContext";
import { AuthProvider } from "./AuthContext";
import { FavoritesProvider } from "./FavoritesContext";
import { CartDrawer } from "./CartDrawer";
import { AuthModal } from "./AuthModal";
import { CookieConsent } from "./CookieConsent";
import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";
import { ThemeProvider } from "./ThemeProvider";
import { VLibras } from "./VLibras";
import { CartAnnouncer } from "./CartAnnouncer";

export function RootLayout() {
  const { pathname } = useLocation();

  const showAnnouncement =
    pathname !== "/checkout" && pathname !== "/carrinho" && pathname !== "/monte-seu-pc";
  const showNavbar = pathname !== "/checkout" && pathname !== "/monte-seu-pc";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* `--announce-h` nasce em 40px no tema e é a AnnouncementBar que a mantém
     atualizada. Nas rotas onde a faixa não é renderizada ninguém zera a
     variável: num acesso direto a /carrinho ela continua em 40px, a navbar
     (que se posiciona por ela) desce 40px sem motivo e o conteúdo da página
     passa por baixo do cabeçalho. Quem decide se a faixa existe é este
     layout, então é aqui que a altura zera. */
  useEffect(() => {
    if (!showAnnouncement) {
      document.documentElement.style.setProperty("--announce-h", "0px");
    }
  }, [showAnnouncement]);

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
                {showAnnouncement && <AnnouncementBar />}
                {showNavbar && <Navbar />}
                <div data-page-light-scope className="contents">
                  {pathname !== "/checkout" && <CartDrawer />}
                  <AuthModal />
                  {/* Convite de cadastro DESLIGADO temporariamente a pedido do
                      cliente, para avaliar as telas sem ele por cima. O
                      componente segue inteiro em ./WelcomePopup — religar é
                      apagar este comentário e descomentar a linha. */}
                  {/* <WelcomePopup /> */}
                  <CookieConsent />
                  {/* O aviso de cookies é `fixed bottom-0`: sem reservar a altura
                      dele, o rodapé da página e o fim do card de compra ficam
                      permanentemente escondidos embaixo. Aceito ou recusado,
                      `--cookie-h` volta a 0px. */}
                  <main
                    id="main-content"
                    tabIndex={-1}
                    className="outline-none"
                    style={{ paddingBottom: "var(--cookie-h, 0px)" }}
                  >
                    <Outlet />
                  </main>
                </div>
                <CartAnnouncer />
                <VLibras />
              </div>
            </CheckoutPrefsProvider>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
