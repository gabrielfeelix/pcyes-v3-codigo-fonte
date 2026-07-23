# PCYES — v3 (protótipo de referência)

Protótipo navegável da **v3** do e-commerce da PCYES (hardware,
periféricos, computadores e edições exclusivas) — redesign **mobile-first**
da v2, feito página por página.

Serve como **referência para a versão oficial da v3**: está publicado na
**Vercel** para o time de desenvolvimento navegar, validar fluxos e
consultar como cada tela, componente e token foi montado antes de levar
para o ambiente de produção definitivo.

**🔗 Protótipo online:** <https://pcyes-v3-codigo-fonte.vercel.app>

> Não é a loja de produção. É um protótipo de alta fidelidade — toda a UI,
> as telas e o design system estão prontos e funcionais, mas o catálogo é
> estático (sem API/backend ligado).

Aplicação **SPA** — não é HTML estático. As páginas são componentes React;
o `index.html` é só o ponto de entrada e o resto é renderizado em runtime
pelo JavaScript.

## Stack

| Camada      | Tecnologia                                          |
| ----------- | --------------------------------------------------- |
| Build / dev | Vite 6                                               |
| UI          | React 18 + TypeScript                                |
| Roteamento  | React Router 7 (`createBrowserRouter`)               |
| Estilo      | Tailwind CSS 4 + tokens em `src/styles/theme.css`    |
| Componentes | Radix UI (primitivos em `src/app/components/ui/`)    |
| Animação    | `motion`                                             |
| Ícones      | `lucide-react`                                       |

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script          | O que faz                            |
| --------------- | ------------------------------------ |
| `npm run dev`   | Servidor de desenvolvimento (Vite)   |
| `npm run build` | Build de produção em `dist/`         |

## Deploy

Publicado na **Vercel** como SPA. O build (`vite build`) gera `dist/` e o
`vercel.json` faz rewrite das rotas para `index.html` (necessário para o
roteamento client-side do React Router). Cada push na branch `main` dispara um
novo deploy.

### Por que o `vercel.json` é do jeito que é

O arquivo não tem comentários porque a Vercel valida `vercel.json` contra um
schema **estrito**: propriedade desconhecida (inclusive a convenção `"//"`)
derruba o deploy na validação da config, antes de rodar o build. Por isso a
explicação mora aqui.

- **`/assets/` fica fora do rewrite.** Cada build renomeia os chunks com um
  hash novo. Quem está com a aba aberta durante um deploy segue pedindo o nome
  antigo; se o rewrite pegasse `/assets/`, esse arquivo inexistente devolveria
  `index.html` em vez de 404 — e o browser tentaria executar HTML esperando
  JavaScript.
- **`Cache-Control` imutável em `/assets/`.** Nome com hash implica conteúdo
  fixo, então cachear por um ano é seguro.
- **`must-revalidate` no resto.** O `index.html` é o índice que aponta para os
  hashes vigentes; em cache, ele perpetua o erro acima.
- **A regra geral exclui `/assets/`** para não sobrescrever a anterior: quando
  duas regras de header casam, a última vence.

A recuperação em runtime está em `src/app/routes.tsx` (`lazyRoute`), que
recarrega a página uma vez quando um chunk não é encontrado.

## Estrutura de pastas

```
src/
  main.tsx                  Ponto de entrada — monta o React
  styles/                   CSS global, tema, fontes, Tailwind
  app/
    App.tsx                 RouterProvider
    routes.tsx              Definição de todas as rotas
    lib/                    Utilitários
    pages/                  Páginas: monte-seu-pc, FAQ, legais
    components/             Componentes e páginas
      ui/                   Primitivos Radix (button, dialog, input...)
      section/              Wrappers de seção
      icons/                SVGs de bandeiras de cartão
      pages/                Páginas institucionais carregadas via HTML
      *.tsx                 Seções da home, páginas, contextos, modais
      *Data.ts              Dados estáticos (produtos, drivers, pré-venda)
public/                     Imagens estáticas (home, setups, switches...)
```

## Dados de produto

Os produtos seguem um padrão claro — não são hardcoded espalhados pelos
componentes. Três camadas:

1. **`src/app/components/productsData.ts`** — fonte única de verdade.
   Interface `Product` tipada (id, sku, nome, preço, specs, tags,
   imagens...) e o array do catálogo real da PCYES. Exporta também
   `categories`, `allTags` e `brands`.

2. **`productEnhancements.ts`** — valores *derivados*: desconto %, preço no
   PIX, parcelamento, formatação BRL. Calculado, não fixo por produto.

3. **`productPresentation.ts`** — apresentação derivada: swatches de cor,
   mídia de hover, links de catálogo.

~20 componentes importam o catálogo dessa fonte única. Para mudar os
produtos, edita-se **um** arquivo. Limitação atual: catálogo 100% estático,
sem API/backend.

## Rotas

Definidas em `src/app/routes.tsx`. Principais: `/` (home), `/produtos`,
`/produto/:id`, `/carrinho`, `/checkout`, `/pre-venda`, `/perfil`, mais
páginas institucionais (`/quem-somos`, `/faq`, `/termos-de-uso`, etc.).
