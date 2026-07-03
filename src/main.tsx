
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { initAnalytics, reportWebVitals } from "./utils/analytics";
  import "./styles/index.css";

  // Remove o bloco de conteúdo prerender (Fase 3 — SSG): existe só no HTML cru
  // para crawlers sem JS. É retirado ANTES do React montar, então o app renderiza
  // no #root vazio exatamente como antes — zero mudança de UI, zero hidratação.
  document.getElementById("seo-prerender")?.remove();

  // Analytics com Consent Mode v2 (default negado até aceite no banner de cookies).
  initAnalytics();
  reportWebVitals(); // LCP/INP/CLS/FCP/TTFB reais → dataLayer

  createRoot(document.getElementById("root")!).render(<App />);
