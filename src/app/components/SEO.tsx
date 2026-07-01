import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.pcyes.com.br";
const SITE_NAME = "PCYES";
const DEFAULT_TITLE = "PCYES — Built for Performance";
const DEFAULT_DESC =
  "Hardware, periféricos e setups feitos pra quem joga, edita e cria sem trava.";
const DEFAULT_IMAGE = "https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/og-default.png";

type SEOProps = {
  title?: string;
  description?: string;
  /** Path relative to site root, no host. Example: `/perifericos/mouses/`. Defaults to current pathname. */
  canonicalPath?: string;
  /** Override og:image. */
  image?: string;
  /** `index` (default) lets robots index the page. `noindex` blocks indexing (filter pages, etc). */
  robots?: "index" | "noindex";
  /** `product` | `category` | `article` etc. Defaults to `website`. */
  ogType?: string;
  /** Inject one or many JSON-LD structured data blobs. */
  jsonLd?: object | object[];
  /** Optional extra children (custom meta tags etc). */
  children?: React.ReactNode;
};

export function SEO({
  title,
  description = DEFAULT_DESC,
  canonicalPath,
  image = DEFAULT_IMAGE,
  robots = "index",
  ogType = "website",
  jsonLd,
  children,
}: SEOProps) {
  const finalTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const path =
    canonicalPath ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={`${robots}, follow`} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdArray.map((blob, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(blob)}
        </script>
      ))}

      {children}
    </Helmet>
  );
}
