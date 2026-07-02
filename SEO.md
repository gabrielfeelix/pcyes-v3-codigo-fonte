# SEO do protótipo PCYES v3

Referência dos padrões de SEO aplicados neste protótipo. Serve de guia para a implementação em produção. Tudo descrito aqui já está no código e no ar.

Domínio canônico oficial: `https://www.pcyes.com.br` (com www). Todos os canonicals, o sitemap, o robots e os dados estruturados usam este domínio. Manter um domínio único (com www) evita sinais divergentes para o Google.

## 1. Canonical self-referring

Cada página aponta o canonical para ela mesma, nunca para a home. Exemplo na categoria de periféricos:

```html
<link rel="canonical" href="https://www.pcyes.com.br/perifericos/" />
```

Como o protótipo é uma SPA (React + Vite), o canonical correto é entregue de duas formas:

1. No HTML cru (o que o crawler lê antes de executar JavaScript). Um plugin de build (`prerenderSeoHtml`, em `vite.config.ts`) gera um `index.html` por rota do sitemap, cada um com o canonical e o og:url apontando para a própria URL. São 596 rotas geradas no build, além da home.
2. Em runtime (após o JavaScript). O componente `SEO.tsx` (react-helmet-async) define o canonical da rota atual.

Para não gerar tag duplicada, as tags de SEO no `index.html` levam o atributo `data-rh`. O react-helmet-async reconhece esse atributo e substitui a tag em vez de criar uma segunda. Resultado: uma única tag canonical por página, com o valor correto.

Regra para o time: toda página indexável precisa ter um canonical próprio. Duas páginas nunca devem compartilhar o mesmo canonical.

## 2. Meta robots

Padrão em todas as páginas indexáveis, presente já no HTML cru:

```html
<meta name="robots" content="index, follow" />
```

Páginas com filtro ativo (por exemplo, categoria filtrada por preço, marca ou cor) usam `noindex`. Isso evita indexar as infinitas combinações de filtro. A lógica está em `ProductsPage.tsx` (`robots={activeFilterCount > 0 ? "noindex" : "index"}`).

Páginas privadas (carrinho, checkout, perfil) não são indexadas.

## 3. Sitemap.xml

Arquivo estático em `public/sitemap.xml`, servido em `/sitemap.xml`. Contém 597 URLs (home, categorias, subcategorias, produtos e páginas institucionais), todas em `www.pcyes.com.br`, com `changefreq` e `priority`. O sitemap é referenciado no `robots.txt`.

## 4. Robots.txt

Arquivo em `public/robots.txt`, servido na raiz do domínio. Segue o padrão de SEO definido para a PCYES. Cobre:

- Regras gerais para todos os user-agents: libera o site e bloqueia áreas privadas e de sistema (admin, checkout, customer, wishlist, busca interna, comparador de produtos, review).
- Bloqueio de URLs com parâmetros de query (ordenação, paginação, limite, modo de listagem, UTM, SID, troca de loja). Esses parâmetros geram conteúdo duplicado.
- Content-Signal declarando uso permitido para busca e negado para treino de IA.
- Bloqueio de crawlers de IA específicos (Amazonbot, Applebot-Extended, Bytespider, CCBot, CloudflareBrowserRenderingCrawler, Google-Extended, meta-externalagent).
- Referência ao sitemap.

Importante: robots.txt só tem efeito na raiz do domínio (`/robots.txt`). Validar sempre pela raiz.

## 5. Hierarquia de headings

Uma única `<h1>` por página, no início do conteúdo principal. Abaixo dela, `<h2>` para as seções e `<h3>` para subseções. A hierarquia não pula níveis.

Padrões por tipo de página:

- Home: `<h1>` com o nome e a proposta da loja. Quando o topo é um banner em imagem (sem texto), o `<h1>` fica visualmente oculto pela classe `sr-only`. Continua válido para SEO e leitores de tela.
- Produto: `<h1>` é o nome do produto, no topo da primeira dobra. Seções como "Sobre o produto", "Avaliações de Clientes" e "Produtos Relacionados" são `<h2>`. Blocos internos dessas seções são `<h3>`.
- Categoria: `<h1>` é o nome da categoria. O bloco de texto descritivo abaixo da listagem usa `<h2>` e `<h3>`.
- Páginas institucionais: `<h1>` com o título da página.

Regras para o time:

- Nunca repetir o texto do H1 em um H2 ou H3 na mesma página.
- Nunca renderizar dois H1 ao mesmo tempo na mesma página.
- Não usar heading para estilo. Título visual que não é seção deve ser parágrafo estilizado, não heading.

## 6. Dados estruturados (JSON-LD)

- Organization na home (nome, url, logo, redes sociais).
- Product na página de produto (nome, disponibilidade, url).
- BreadcrumbList em produto e categoria.

Servem para rich results e ajudam o Google a entender a estrutura do site.

## 7. Open Graph e Twitter

Todas as páginas definem og:title, og:description, og:url (self-referring), og:image, og:type e twitter:card. Os valores vêm do componente `SEO.tsx` por rota. No HTML cru, o og:url também é reescrito por rota pelo plugin de prerender.

## 8. Performance que afeta SEO

- Bundle CSS e Google Fonts saem do caminho crítico de renderização (carregados por preload e depois trocados para stylesheet), com fallback em noscript. Um CSS crítico mínimo (cor de fundo) fica inline no `index.html` para evitar flash de tela.
- Imagens do catálogo em WebP. A imagem principal da home tem preload com fetchpriority alto, o que melhora o LCP.
- Code splitting por rota.

## 9. Arquivos-chave

- `src/app/components/SEO.tsx`: componente que define title, description, canonical, robots, Open Graph, Twitter e JSON-LD por rota. Ponto único de controle das tags de head.
- `index.html`: tags de SEO base com `data-rh`, CSS crítico inline, preload de fontes e da imagem de LCP.
- `vite.config.ts`: plugins de build. `deferMainCss` tira o CSS do caminho crítico. `prerenderSeoHtml` gera um HTML por rota com canonical e og:url self-referring no HTML cru, lendo as URLs do sitemap.
- `public/sitemap.xml` e `public/robots.txt`: arquivos estáticos servidos na raiz.

## 10. Conteúdo no HTML cru (SSG data-driven)

O corpo da página é renderizado por JavaScript (SPA), mas o conteúdo-chave de cada rota **também** é emitido no HTML cru pelo build, sem depender de servidor:

- **JSON-LD por rota** (`prerenderSeoHtml` em `vite.config.ts`): Organization na home, Product + `aggregateRating` + BreadcrumbList em produto, CollectionPage + BreadcrumbList em categoria. Emitido no `<head>` estático — crawlers que não executam JS (Bing, scrapers sociais, LLMs) leem o schema. 586/596 rotas.
- **Bloco de conteúdo** (`#seo-prerender`): `<div>` sr-only montado a partir do catálogo estático com h1, nome, preço, descrição, breadcrumb e links internos da rota. Injetado antes do `#root`. `main.tsx` **remove esse bloco antes do React montar** — o app renderiza no `#root` vazio exatamente como antes (zero mudança de UI, zero hidratação, zero flash). Crawlers sem JS leem o corpo textual + links.

Isso entrega o benefício de SSG (corpo crawlável) sem migrar de framework nem rodar servidor. Verificado em Chrome headless (`scripts/verify-prerender.mjs`): bloco removido após JS, app idêntico.

Em produção com preço/estoque dinâmicos, avaliar SSR/ISR (Next.js) para manter o corpo sempre fresco — aqui os dados são estáticos, então a geração no build basta.
