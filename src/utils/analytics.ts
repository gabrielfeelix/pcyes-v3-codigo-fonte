/**
 * Analytics GA4 via Google Tag Manager, com Consent Mode v2.
 *
 * Protótipo: sem `VITE_GTM_ID` configurado, o container NÃO é injetado — os
 * eventos apenas empilham em `window.dataLayer` (no-op inofensivo, zero rede,
 * zero 404). Em produção, definir `VITE_GTM_ID=GTM-XXXXXXX` ativa o envio.
 *
 * Consentimento: default NEGADO (LGPD). O banner de cookies chama
 * `updateConsent(true)` no aceite. Nada de analytics dispara antes do opt-in.
 *
 * Funil e-commerce (GA4): view_item → add_to_cart → begin_checkout → purchase.
 */

const GTM_ID = (import.meta as any).env?.VITE_GTM_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

function dl(): any[] {
  if (typeof window === "undefined") return [];
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function gtag(...args: any[]) {
  dl().push(args);
}

let started = false;

/** Injeta o GTM (se houver ID) e fixa o consent default. Chamar 1x no boot. */
export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;

  const stored = localStorage.getItem("pcyes-cookies");
  const granted = stored === "accepted";
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: granted ? "granted" : "denied",
    wait_for_update: 500,
  });

  if (!GTM_ID) return; // protótipo: sem container → não injeta script

  dl().push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/** Atualiza o consentimento após decisão do usuário no banner de cookies. */
export function updateConsent(granted: boolean) {
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

/** Empurra um evento genérico para o dataLayer. */
export function track(event: string, params: Record<string, any> = {}) {
  dl().push({ event, ...params });
}

/* ── E-commerce GA4 ─────────────────────────────────────────── */

const toNum = (p: string | number | undefined): number =>
  typeof p === "number"
    ? p
    : Number(String(p ?? "").replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3})/g, "").replace(",", ".")) || 0;

function ecom(event: string, ecommerce: Record<string, any>) {
  dl().push({ ecommerce: null }); // limpa o objeto anterior (recomendação GA4)
  track(event, { ecommerce });
}

type ItemLike = {
  id: number | string;
  name: string;
  price?: string | number;
  priceNum?: number;
  quantity?: number;
  brand?: string;
  category?: string;
};

const mapItem = (i: ItemLike) => ({
  item_id: String(i.id),
  item_name: i.name,
  price: i.priceNum ?? toNum(i.price),
  quantity: i.quantity ?? 1,
  ...(i.brand ? { item_brand: i.brand } : {}),
  ...(i.category ? { item_category: i.category } : {}),
});

export function trackViewItem(product: ItemLike) {
  const value = product.priceNum ?? toNum(product.price);
  ecom("view_item", { currency: "BRL", value, items: [mapItem(product)] });
}

export function trackAddToCart(item: ItemLike) {
  const it = mapItem(item);
  ecom("add_to_cart", { currency: "BRL", value: it.price * it.quantity, items: [it] });
}

export function trackBeginCheckout(items: ItemLike[], value: number) {
  ecom("begin_checkout", { currency: "BRL", value, items: items.map(mapItem) });
}

export function trackPurchase(order: { id: string; value: number; items: ItemLike[]; shipping?: number; tax?: number }) {
  ecom("purchase", {
    transaction_id: order.id,
    currency: "BRL",
    value: order.value,
    shipping: order.shipping ?? 0,
    tax: order.tax ?? 0,
    items: order.items.map(mapItem),
  });
}

/* ── Core Web Vitals (RUM) ──────────────────────────────────── */

/**
 * Mede LCP, INP, CLS, FCP e TTFB reais e empurra pro dataLayer como
 * `web_vitals`. `web-vitals` é carregado por import dinâmico (fora do caminho
 * crítico). GTM decide o que fazer com o evento (consentimento já se aplica).
 */
export function reportWebVitals() {
  if (typeof window === "undefined") return;
  import("web-vitals")
    .then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      const send = (m: { name: string; value: number; rating: string; id: string }) =>
        track("web_vitals", {
          metric: m.name,
          value: Math.round(m.name === "CLS" ? m.value * 1000 : m.value),
          rating: m.rating,
          metric_id: m.id,
        });
      onLCP(send);
      onINP(send);
      onCLS(send);
      onFCP(send);
      onTTFB(send);
    })
    .catch(() => {});
}
