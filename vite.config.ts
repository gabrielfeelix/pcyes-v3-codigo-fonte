import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { allProducts, categories } from './src/app/components/productsData'
import { productDetails } from './src/app/components/productDetails'
import {
  getProductUrl,
  getCategorySlug,
  getSubcategorySlug,
  getCategoryFromSlug,
} from './src/app/lib/slug'
import {
  CATEGORIES,
  TAXONOMY,
  getTaxonomyNodesByCategory,
  isMirrorSubcategory,
  resolveTaxonomyNode,
  validateTaxonomy,
} from './src/app/lib/taxonomy'
import { hasUsableProductImage } from './src/app/components/productPresentation'
import { getListingSeo } from './src/app/lib/listingSeo'

const prototypeBasePath = process.env.PROTOTYPE_BASE_PATH || '/'
const prototypeOutDir = process.env.PROTOTYPE_OUT_DIR || 'dist'
const prototypePublicRoots = ['home', 'pages', 'switches', 'assets', 'setups']

function prototypePublicAssetBase() {
  const base = prototypeBasePath.endsWith('/') ? prototypeBasePath : `${prototypeBasePath}/`
  if (base === '/') return null

  const roots = prototypePublicRoots.join('|')
  const stringPattern = new RegExp(`(["'\`])/(?:${roots})/`, 'g')
  const cssPattern = new RegExp(`url\\(/(?:${roots})/`, 'g')
  const htmlPattern = new RegExp(`(src|href)=["']/(?:${roots})/`, 'g')

  function rewrite(code) {
    return code
      .replace(stringPattern, (match, quote) => `${quote}${base}${match.slice(2)}`)
      .replace(cssPattern, (match) => `url(${base}${match.slice(5)}`)
      .replace(htmlPattern, (match, attr) => `${attr}="${base}${match.slice(attr.length + 3)}`)
  }

  return {
    name: 'prototype-public-asset-base',
    generateBundle(_options, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type === 'chunk') {
          item.code = rewrite(item.code)
        } else if (typeof item.source === 'string') {
          item.source = rewrite(item.source)
        }
      }
    },
  }
}

const publicAssetBasePlugin = prototypePublicAssetBase()

// Tira o bundle CSS local (index-*.css) do caminho crítico de renderização:
// carrega via preload+swap (non-blocking) e mantém <noscript> como fallback.
// O fundo base é pintado por CSS crítico inline em index.html, evitando FOUC.
function deferMainCss() {
  return {
    name: 'defer-main-css',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        // Casa o bundle CSS local sob .../assets/*.css (com ou sem PROTOTYPE_BASE_PATH
        // prefixado, ex. /pcyes/pcyes-v2/v3/assets/). Não casa fonts (https, sem /assets/).
        /<link rel="stylesheet"([^>]*?)href="([^"]*assets\/[^"]+\.css)"([^>]*)>/g,
        (match: string, pre: string, href: string, post: string) =>
          `<link rel="preload" as="style"${pre}href="${href}"${post} onload="this.onload=null;this.rel='stylesheet'"><noscript>${match}</noscript>`,
      )
    },
  }
}

/**
 * Sitemap gerado do catálogo + taxonomia, e não mantido à mão.
 *
 * O sitemap não é só para buscador: é a LISTA DE ROTAS que o prerender abaixo
 * usa para emitir HTML com canonical e JSON-LD. Mantido à mão, ele divergia do
 * catálogo em silêncio — quando a taxonomia mudou, 500 rotas de produto viraram
 * URLs que não existem mais e o JSON-LD caiu de 586 para 83 sem nada quebrar
 * visivelmente. Gerando aqui, sitemap, prerender e app não têm como discordar.
 *
 * Valida a taxonomia antes: produto sem classificação ou slug duplicado
 * derruba o build, em vez de virar URL órfã em produção.
 */
/**
 * Rotas que existem mas não entram no sitemap → caminho da página : canonical.
 * Preenchida por generateSitemap e consumida pelo prerender, que roda depois.
 */
const mirrorRoutes = new Map<string, string>()

function generateSitemap() {
  const SITE = 'https://www.pcyes.com.br'
  const STATIC_ROUTES: Array<[string, string, string]> = [
    ['/', 'daily', '1.0'],
    ['/monte-seu-pc/', 'weekly', '0.7'],
    ['/maringa-fc/', 'weekly', '0.6'],
    ['/influenciadores/', 'monthly', '0.5'],
    ['/revendedor/', 'monthly', '0.5'],
    ['/fale-conosco/', 'monthly', '0.4'],
    ['/onde-encontrar/', 'monthly', '0.4'],
    ['/quem-somos/', 'monthly', '0.4'],
    ['/faq/', 'monthly', '0.3'],
    ['/drivers-e-manuais/', 'weekly', '0.4'],
    ['/politica-de-privacidade/', 'yearly', '0.2'],
    ['/politica-de-garantia/', 'yearly', '0.2'],
    ['/termos-de-uso/', 'yearly', '0.2'],
  ]

  return {
    name: 'generate-sitemap',
    closeBundle() {
      const issues = validateTaxonomy(allProducts as any[])
      if (issues.length > 0) {
        const preview = issues.slice(0, 10).map((i) => `  ${i.kind}: ${i.detail}`).join('\n')
        throw new Error(
          `[taxonomia] ${issues.length} problema(s) — corrija em src/app/lib/taxonomy.ts:\n${preview}`,
        )
      }

      mirrorRoutes.clear()
      const rows: Array<[string, string, string]> = [...STATIC_ROUTES]
      const seen = new Set(rows.map(([loc]) => loc))
      const push = (loc: string, freq: string, prio: string) => {
        if (seen.has(loc)) return
        seen.add(loc)
        rows.push([loc, freq, prio])
      }

      /* Só publica listagem que tem produto EXIBÍVEL. A taxonomia declara nós
         que ainda não têm item (HDs, Webcams) ou cujos produtos não têm foto
         utilizável (Pasta Térmica) — publicá-los seria oferecer ao buscador
         uma página vazia, que é soft-404 e derruba a avaliação do domínio. O
         nó continua existindo para quando entrar produto. */
      const visible = (allProducts as any[]).filter(hasUsableProductImage)
      const countIn = (category: string, slug?: string) =>
        visible.filter((p) => {
          const node = resolveTaxonomyNode(p)
          const cat = node?.category ?? p.category
          return cat === category && (!slug || node?.slug === slug)
        }).length

      for (const category of CATEGORIES) {
        if (countIn(category) === 0) continue
        push(`/${getCategorySlug(category)}/`, 'weekly', '0.8')
        for (const node of getTaxonomyNodesByCategory(category)) {
          if (countIn(category, node.slug) === 0) continue
          /* Espelho da categoria: mesma lista, outra URL. Fora do sitemap
             para o buscador não escolher entre páginas idênticas — mas ainda
             precisa de HTML próprio, com canonical apontando para a
             categoria. Sem isso a rota cai no index.html raiz e sai com o
             canonical da HOME, que é pior que a duplicata original. */
          if (isMirrorSubcategory(node)) {
            mirrorRoutes.set(
              `/${getCategorySlug(category)}/${node.slug}/`,
              `/${getCategorySlug(category)}/`,
            )
            continue
          }
          push(`/${getCategorySlug(category)}/${node.slug}/`, 'weekly', '0.7')
        }
      }
      for (const product of visible) {
        push(getProductUrl(product), 'weekly', '0.6')
      }

      const body = rows
        .map(([loc, freq, prio]) =>
          `  <url><loc>${SITE}${loc}</loc><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`,
        )
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

      const outDir = path.resolve(__dirname, prototypeOutDir)
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
      // eslint-disable-next-line no-console
      console.log(`[sitemap] ${rows.length} rotas · taxonomia validada (${TAXONOMY.length} subcategorias)`)
    },
  }
}

// Gera 1 index.html por rota do sitemap com canonical/og:url self-referring no
// HTML CRU (o doc de SEO pede canonical self-referring em todas as páginas).
// Como é SPA, o react-helmet só setava isso em runtime; aqui embutimos no estático.
// As tags têm data-rh, então o helmet reconcilia em runtime sem duplicar.
// Só mexe no <head> — body segue sendo o #root vazio → ZERO mudança de UI/UX.
function prerenderSeoHtml() {
  const SITE = 'https://www.pcyes.com.br'
  // Título/descrição por rota estática conhecida (canonical é feito pra TODAS).
  const META: Record<string, [string, string]> = {
    '/monte-seu-pc/': ['Monte seu PC', 'Monte seu PC gamer ou workstation PCYES peça a peça. Compatibilidade garantida, montagem profissional, frete grátis acima de R$ 299.'],
    '/drivers-e-manuais/': ['Drivers e Manuais', 'Baixe drivers, firmwares e manuais oficiais dos produtos PCYES. Central de downloads atualizada.'],
    '/faq/': ['Perguntas Frequentes', 'Tire dúvidas sobre pedidos, entrega, trocas, garantia e pagamento na PCYES.'],
    '/quem-somos/': ['Quem Somos', 'Conheça a PCYES: marca brasileira de hardware, periféricos e setups gamer.'],
    '/influenciadores/': ['Influenciadores', 'Programa de influenciadores PCYES: parcerias, cupons e conteúdo para creators de tecnologia e games.'],
    '/revendedor/': ['Seja um Revendedor', 'Torne-se revendedor oficial PCYES. Condições especiais de atacado em hardware, periféricos e setups gamer.'],
    '/fale-conosco/': ['Fale Conosco', 'Fale com a PCYES: suporte, dúvidas sobre pedidos, garantia e parcerias.'],
    '/onde-encontrar/': ['Onde Encontrar', 'Encontre os produtos PCYES em lojas e revendedores oficiais perto de você.'],
    '/maringa-fc/': ['PCYES × Maringá FC', 'Coleção oficial PCYES em parceria com o Maringá FC. Edições especiais para a torcida.'],
  }
  const set = (html: string, re: RegExp, val: string) =>
    html.replace(re, (_m, a, b) => `${a}${val}${b}`)

  // ── JSON-LD no HTML cru (Fase 2) ──────────────────────────────
  // Indexa o catálogo estático para emitir dados estruturados por rota
  // ANTES do JavaScript. Crawlers que não executam JS (Bing, scrapers
  // sociais, LLMs) passam a ver Product/Breadcrumb/CollectionPage.
  const productByUrl = new Map<string, any>()
  const subLabelBySlug = new Map<string, string>()
  const productsByCat = new Map<string, any[]>()
  const productsByCatSub = new Map<string, any[]>()
  /* Indexa pela TAXONOMIA, não pelos campos crus do produto. Indexando pelo
     dado bruto, a chave não batia com a URL gerada: o rótulo da subcategoria
     não era encontrado e o H1 do HTML cru saía com o slug
     ("suportes-e-ergonomia — Periféricos"), que é justamente o que o crawler
     lê. Os agrupamentos de produto por listagem tinham o mesmo furo. */
  for (const prod of allProducts as any[]) {
    productByUrl.set(getProductUrl(prod), prod)
    /* Agrupa só o que a listagem de fato mostra. A página esconde produto sem
       foto utilizável, então incluí-lo aqui faria o HTML cru anunciar uma
       contagem que o usuário não encontra — e a descrição gerada divergiria
       entre o que o crawler lê e o que a SPA renderiza. */
    if (!hasUsableProductImage(prod)) continue
    const node = resolveTaxonomyNode(prod)
    const catSlug = getCategorySlug(node?.category ?? prod.category)
    ;(productsByCat.get(catSlug) ?? productsByCat.set(catSlug, []).get(catSlug)!).push(prod)
    const subSlug = node?.slug ?? (prod.subcategory ? getSubcategorySlug(prod.subcategory) : '')
    if (subSlug) {
      const key = `${catSlug}/${subSlug}`
      if (!subLabelBySlug.has(key)) subLabelBySlug.set(key, node?.label ?? prod.subcategory)
      ;(productsByCatSub.get(key) ?? productsByCatSub.set(key, []).get(key)!).push(prod)
    }
  }
  const abs = (img?: string): string | undefined =>
    !img ? undefined : /^https?:\/\//.test(img) ? img : `${SITE}${img.startsWith('/') ? img : `/${img}`}`

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PCYES',
    url: SITE,
    logo: 'https://pcyes-cdn.oderco.com.br/Logotipos/PCYES/Simbolo-Logo-Horiz-Vermelho.png',
    sameAs: ['https://www.instagram.com/pcyesoficial', 'https://www.youtube.com/@pcyesoficial'],
  }

  const productLd = (prod: any, url: string): any[] => {
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: prod.name,
      image: abs(prod.images?.[0] ?? prod.image),
      sku: prod.sku ? String(prod.sku) : undefined,
      brand: { '@type': 'Brand', name: prod.brand || 'PCYES' },
      category: prod.category,
      aggregateRating:
        prod.reviews > 0
          ? { '@type': 'AggregateRating', ratingValue: prod.rating, reviewCount: prod.reviews, bestRating: 5, worstRating: 1 }
          : undefined,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: prod.priceNum,
        availability: prod.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        url: `${SITE}${url}`,
      },
    }
    const catSlug = url.split('/').filter(Boolean)[0]
    const catLabel = getCategoryFromSlug(catSlug) || prod.category
    const items: any[] = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: catLabel, item: `${SITE}/${catSlug}/` },
    ]
    if (prod.subcategory) {
      const subSlug = getSubcategorySlug(prod.subcategory)
      items.push({ '@type': 'ListItem', position: 3, name: prod.subcategory, item: `${SITE}/${catSlug}/${subSlug}/` })
      items.push({ '@type': 'ListItem', position: 4, name: prod.name })
    } else {
      items.push({ '@type': 'ListItem', position: 3, name: prod.name })
    }
    return [product, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }]
  }

  const categoryLd = (p: string): any[] | null => {
    const segs = p.split('/').filter(Boolean)
    const catLabel = getCategoryFromSlug(segs[0])
    if (!catLabel) return null
    const items: any[] = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: catLabel, item: `${SITE}/${segs[0]}/` },
    ]
    let name = catLabel
    if (segs[1]) {
      const subLabel = subLabelBySlug.get(`${segs[0]}/${segs[1]}`) || segs[1]
      items.push({ '@type': 'ListItem', position: 3, name: subLabel, item: `${SITE}/${segs[0]}/${segs[1]}/` })
      name = `${subLabel} ${catLabel}`
    }
    return [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items },
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name, url: `${SITE}${p}`, isPartOf: { '@type': 'WebSite', name: 'PCYES', url: SITE } },
    ]
  }

  const injectLd = (html: string, blobs: any[] | null): string => {
    if (!blobs || !blobs.length) return html
    const scripts = blobs
      .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
      .join('')
    return html.replace('</head>', `${scripts}</head>`)
  }

  // ── Conteúdo textual no HTML cru (Fase 3) ─────────────────────
  // Bloco sr-only com o conteúdo-chave da rota (h1, nome, preço, descrição,
  // breadcrumb, links internos) montado a partir do catálogo estático.
  // main.tsx REMOVE o bloco antes de montar o React → zero mudança de UI,
  // zero flash, zero hidratação. Crawler sem JS (Bing/LLM/social) lê o corpo.
  const esc = (s: any): string =>
    String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const SR_STYLE =
    'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0'
  const wrapSeo = (inner: string) =>
    `<div id="seo-prerender" aria-hidden="true" style="${SR_STYLE}">${inner}</div>`

  const homeSeo = () => {
    const links = categories
      .map((c) => `<a href="/${getCategorySlug(c)}/">${esc(c)}</a>`)
      .join('')
    return wrapSeo(
      `<h1>PCYES — Hardware, periféricos e setups gamer</h1>` +
        `<p>Loja oficial PCYES. Hardware, periféricos, computadores, monitores, cadeiras e setups gamer. Frete grátis acima de R$ 299, até 12x sem juros e 10% no PIX.</p>` +
        `<nav aria-label="Categorias">${links}</nav>`,
    )
  }

  const productSeo = (prod: any, url: string) => {
    const segs = url.split('/').filter(Boolean)
    const catSlug = segs[0]
    const catLabel = getCategoryFromSlug(catSlug) || prod.category
    const crumbs = [`<a href="/">Home</a>`, `<a href="/${catSlug}/">${esc(catLabel)}</a>`]
    if (prod.subcategory) {
      const subSlug = getSubcategorySlug(prod.subcategory)
      crumbs.push(`<a href="/${catSlug}/${subSlug}/">${esc(prod.subcategory)}</a>`)
    }
    const feats = Array.isArray(prod.features) && prod.features.length
      ? `<ul>${prod.features.slice(0, 10).map((f: any) => `<li>${esc(f)}</li>`).join('')}</ul>`
      : ''
    // Descrição completa (productDetails) para o crawler, não o blurb do bundle.
    const fullDesc = productDetails[prod.id]?.description ?? prod.description
    return wrapSeo(
      `<nav aria-label="Breadcrumb">${crumbs.join(' / ')}</nav>` +
        `<h1>${esc(prod.name)}</h1>` +
        `<p>${esc(prod.price)}${prod.oldPrice ? ` (de ${esc(prod.oldPrice)})` : ''}</p>` +
        (fullDesc ? `<p>${esc(fullDesc).slice(0, 2000)}</p>` : '') +
        feats,
    )
  }

  const categorySeo = (p: string) => {
    const segs = p.split('/').filter(Boolean)
    const catLabel = getCategoryFromSlug(segs[0])
    if (!catLabel) return null
    let name = catLabel
    let list = productsByCat.get(segs[0]) ?? []
    if (segs[1]) {
      const key = `${segs[0]}/${segs[1]}`
      const subLabel = subLabelBySlug.get(key) || segs[1]
      name = `${subLabel} — ${catLabel}`
      list = productsByCatSub.get(key) ?? []
    }
    const items = list
      .slice(0, 60)
      .map((pr) => `<li><a href="${getProductUrl(pr)}">${esc(pr.name)}</a> — ${esc(pr.price)}</li>`)
      .join('')
    return wrapSeo(
      `<h1>${esc(name)}</h1>` +
        `<p>Produtos da categoria ${esc(name)} na PCYES. Frete grátis acima de R$ 299, até 12x sem juros.</p>` +
        `<ul>${items}</ul>`,
    )
  }

  const institutionalSeo = (p: string) => {
    const meta = META[p]
    if (!meta) return null
    return wrapSeo(`<h1>${esc(meta[0])}</h1><p>${esc(meta[1])}</p>`)
  }

  const injectSeo = (html: string, block: string | null): string =>
    !block ? html : html.replace('<div id="root"></div>', `${block}<div id="root"></div>`)

  return {
    name: 'prerender-seo-html',
    closeBundle() {
      const outDir = path.resolve(__dirname, prototypeOutDir)
      const tplPath = path.join(outDir, 'index.html')
      const smPath = path.join(outDir, 'sitemap.xml')
      if (!fs.existsSync(tplPath) || !fs.existsSync(smPath)) return
      const tpl = fs.readFileSync(tplPath, 'utf8')
      const locs = [...fs.readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      // Rota fora do sitemap ainda recebe HTML: sem ele, o rewrite entrega o
      // index.html raiz e a página herda o canonical da home.
      const canonicalOverride = new Map<string, string>()
      for (const [route, canonical] of mirrorRoutes) {
        locs.push(`${SITE}${route}`)
        canonicalOverride.set(route, `${SITE}${canonical}`)
      }
      let count = 0
      let ld = 0
      let body = 0
      // Home: Organization + bloco de conteúdo no index.html raiz.
      fs.writeFileSync(tplPath, injectSeo(injectLd(tpl, [orgLd]), homeSeo()))
      for (const loc of locs) {
        if (!loc.startsWith(SITE)) continue
        const p = loc.slice(SITE.length) || '/'
        if (p === '/') continue
        const canonical = canonicalOverride.get(p) ?? loc
        let html = set(tpl, /(<link rel="canonical" href=")[^"]*(")/, canonical)
        html = set(html, /(<meta property="og:url" content=")[^"]*(")/, canonical)
        const meta = META[p]
        if (meta) {
          const full = `${meta[0]} | PCYES`
          html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${full}</title>`)
          html = set(html, /(<meta name="description" content=")[^"]*(")/, meta[1])
          html = set(html, /(<meta property="og:title" content=")[^"]*(")/, full)
          html = set(html, /(<meta property="og:description" content=")[^"]*(")/, meta[1])
        }
        // Por tipo de rota: produto > categoria/subcategoria > institucional.
        const segs = p.split('/').filter(Boolean)
        const prod = productByUrl.get(p)
        const isCategory = !prod && segs.length <= 2 && !!getCategoryFromSlug(segs[0])

        /* Listagem ganha title/description próprios, do MESMO módulo que a SPA
           usa em runtime. Sem isso, as 40 listagens herdavam o título
           institucional do site — quarenta páginas com o mesmo <title>, que é
           conteúdo duplicado e desperdiça o resultado de busca. */
        if (isCategory) {
          const catLabel = getCategoryFromSlug(segs[0])!
          const key = segs[1] ? `${segs[0]}/${segs[1]}` : ''
          const subLabel = key ? subLabelBySlug.get(key) : undefined
          const listing = getListingSeo({
            category: catLabel,
            subcategoryLabel: subLabel,
            products: (key ? productsByCatSub.get(key) : productsByCat.get(segs[0])) ?? [],
          })
          const full = `${listing.title} | PCYES`
          html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(full)}</title>`)
          html = set(html, /(<meta name="description" content=")[^"]*(")/, esc(listing.description))
          html = set(html, /(<meta property="og:title" content=")[^"]*(")/, esc(full))
          html = set(html, /(<meta property="og:description" content=")[^"]*(")/, esc(listing.description))
        }
        const blobs = prod ? productLd(prod, p) : isCategory ? categoryLd(p) : null
        if (blobs) {
          html = injectLd(html, blobs)
          ld++
        }
        const seo = prod
          ? productSeo(prod, p)
          : isCategory
            ? categorySeo(p)
            : institutionalSeo(p)
        if (seo) {
          html = injectSeo(html, seo)
          body++
        }
        const dir = path.join(outDir, p)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
        count++
      }
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] ${count} rotas canonical · ${ld} JSON-LD · ${body} com corpo no HTML cru (+home)`)
    },
  }
}

export default defineConfig({
  base: prototypeBasePath,
  build: {
    outDir: prototypeOutDir,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        /* O catálogo (productsData.ts, ~970KB de fonte) é importado por ~23
           componentes, entre eles a Navbar — que é eager. Sem isso ele entra
           no bundle de entrada e ainda é reavaliado no chunk da página de
           produto. Isolado, vira UM arquivo compartilhado e cacheado à parte:
           o entry encolhe e o catálogo só é baixado uma vez, sobrevivendo a
           deploys que não mexem no catálogo.

           Só reparticiona o bundle — nenhuma mudança de comportamento. */
        manualChunks(id) {
          if (id.includes("productsData")) return "catalog";
          // productDetails.ts (~1MB) são as descrições longas, usadas só pela
          // página de produto. Em chunk próprio, o código da página volta a ser
          // pequeno e as descrições ficam cacheadas à parte.
          if (id.includes("productDetails")) return "product-details";
        },
      },
    },
  },
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    publicAssetBasePlugin,
    deferMainCss(),
    generateSitemap(),
    prerenderSeoHtml(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
