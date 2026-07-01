import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

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

// Gera 1 index.html por rota do sitemap com canonical/og:url self-referring no
// HTML CRU (o doc de SEO pede canonical self-referring em todas as páginas).
// Como é SPA, o react-helmet só setava isso em runtime; aqui embutimos no estático.
// As tags têm data-rh, então o helmet reconcilia em runtime sem duplicar.
// Só mexe no <head> — body segue sendo o #root vazio → ZERO mudança de UI/UX.
function prerenderSeoHtml() {
  const SITE = 'https://www.pcyes.com.br'
  // Título/descrição por rota estática conhecida (canonical é feito pra TODAS).
  const META: Record<string, [string, string]> = {
    '/pre-venda/': ['Pré-venda', 'Garanta em primeira mão os lançamentos PCYES. Reserve na pré-venda com condições exclusivas, frete grátis acima de R$ 299 e até 12x sem juros.'],
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
  return {
    name: 'prerender-seo-html',
    closeBundle() {
      const outDir = path.resolve(__dirname, prototypeOutDir)
      const tplPath = path.join(outDir, 'index.html')
      const smPath = path.join(outDir, 'sitemap.xml')
      if (!fs.existsSync(tplPath) || !fs.existsSync(smPath)) return
      const tpl = fs.readFileSync(tplPath, 'utf8')
      const locs = [...fs.readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      let count = 0
      for (const loc of locs) {
        if (!loc.startsWith(SITE)) continue
        const p = loc.slice(SITE.length) || '/'
        if (p === '/') continue // home = index.html (canonical já é a home)
        let html = set(tpl, /(<link rel="canonical" href=")[^"]*(")/, loc)
        html = set(html, /(<meta property="og:url" content=")[^"]*(")/, loc)
        const meta = META[p]
        if (meta) {
          const full = `${meta[0]} | PCYES`
          html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${full}</title>`)
          html = set(html, /(<meta name="description" content=")[^"]*(")/, meta[1])
          html = set(html, /(<meta property="og:title" content=")[^"]*(")/, full)
          html = set(html, /(<meta property="og:description" content=")[^"]*(")/, meta[1])
        }
        const dir = path.join(outDir, p)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), html)
        count++
      }
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] ${count} rotas com canonical self-referring no HTML cru`)
    },
  }
}

export default defineConfig({
  base: prototypeBasePath,
  build: {
    outDir: prototypeOutDir,
    emptyOutDir: true,
  },
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    publicAssetBasePlugin,
    deferMainCss(),
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
