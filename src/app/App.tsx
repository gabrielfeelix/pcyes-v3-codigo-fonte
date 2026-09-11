import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { RouteLoading } from "./components/RouteLoading";

export default function App() {
  /* ?preview=loading trava a tela de carregamento no ar. Existe porque no
     localhost nenhum chunk demora os 120ms que o loader espera pra aparecer —
     sem isso só dá pra ver estrangulando a rede no DevTools, e aí ninguém
     revisa o desenho. */
  const previewLoading = new URLSearchParams(window.location.search).get("preview") === "loading";

  return (
    <HelmetProvider>
      {previewLoading && <RouteLoading />}
      <Suspense fallback={<RouteLoading />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </HelmetProvider>
  );
}
