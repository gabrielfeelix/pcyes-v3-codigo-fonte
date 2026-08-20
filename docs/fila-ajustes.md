# Fila de ajustes — estado e pendências

Documento de passagem de bastão. Última atualização: **06/08/2026**, commit `0717b10` + rodada de layout.

Status: `[ ]` a fazer · `[~]` em andamento · `[x]` resolvido · `[!]` decisão pendente

---

## Como trabalhar neste repositório

- **Dev server:** `npm run dev -- --port 5220`. **Ele não cai entre sessões — ele acumula.**
  Já achei três `vite` vivos ao mesmo tempo, um deles de horas antes, servindo módulos velhos:
  a página quebrava com "does not provide an export named X" enquanto o código no disco estava
  certo. Se o comando avisar que subiu em **outra porta**, tem zumbi na 5220. Mate todos
  (`pkill -f vite`), apague `node_modules/.vite` e suba um só.
- **Build:** `npm run build`. Roda sitemap + prerender e valida a taxonomia — se o número de
  rotas mudar sem motivo, alguma URL quebrou.
- **`npm run typecheck` NÃO funciona:** `typescript` não está instalado (`tsc: not found`).
  A verificação real é `npm run build` + Playwright.
- **Playwright:** não está no `package.json`. Existe em cache do npx:
  `/home/gabrielbarbosa/.npm/_npx/1ac161d228dd2210/node_modules/playwright`.
  Importe daí num script `.mjs` avulso.
- **Medir não é verificar.** Já aconteceu de eu ler números, dar por bom e passar um bug
  visível (dois botões colidindo). Sempre tire o print E olhe.
- **Popup atrapalha screenshot:** o convite de cadastro abre sobre a página e escurece tudo.
  A chave é `sessionStorage["pcyes-welcome"] = "seen"` — ponha num `addInitScript` antes de
  navegar. O banner de cookies também cobre card, e esse não tem chave: clique em "Aceitar".

---

## Resolvido

### Header (commit `3de8fc0`)

Busca sem teto (`flex-1` solto, ia a 1045px a 1920px) virou coluna central de grade com teto
480/600/680px por breakpoint, no eixo central da tela. Centralizar desequilibrou os vãos
laterais (logo tem 142px, bloco de conta tem 301px), então entrou o bloco **"Entregar em"**
(`HeaderDelivery`) para preencher a diferença com utilidade: vãos passaram a 156/159px a
1920px. CEP em `localStorage` (`pcyes-cep`), UF resolvida offline pelas faixas dos Correios
(`src/utils/cep.ts`), e a calculadora de frete da página de produto herda o CEP.

Também: "Todas as categorias" (191px) virou "Todas" (94px), pílula de 40→44px, X flutuante
removido, `role="combobox"` no campo.

> **Achado incorreto, não repetir:** cheguei a "corrigir" um desalinhamento do header que não
> existia. O header usa `px-5 md:px-[72px]` + `max-w-[1600px]`, que é exatamente o padrão de
> `SectionContainer` (default `maxWidth: "1600"`). O logo e 8 dos 10 títulos de seção caem no
> mesmo x. O erro veio de comparar o logo com a borda da *caixa* de containers `max-w-[1760px]`
> em vez da coluna onde o conteúdo começa.

**Encerrado sem ação por decisão do cliente:** nav centralizada versus linha de cima ancorada
(~390px de vazio sob o logo) e altura de 142px. A nav centralizada é o que sustenta o eixo da
busca — mexer numa obriga a revisitar a outra.

### Mobile: categorias, botão de compra e convite (commit `e796543`)

- **`CategoryShowcase`** — alturas do mobile afinadas: Gabinetes 312→258px, Microfones
  150→312px (par da Cadeiras), Placas fecha a grade em largura cheia com 204px. Para ter
  altura intermediária a trilha do mobile virou fina (`grid-auto-rows: 42px`) e os cards
  contam linhas: 3=150px, 4=204, 5=258, 6=312. `BENTO_SPAN` virou dois arrays, mobile e md.
  Véu de 0.32/0.42 para 0.22/0.30 e canto de 22→18px, só no mobile.

  > **Tentativa descartada:** uniformizei tudo (hero + quadrados iguais, sem cards altos).
  > Resolvia o degrau, mas o cliente preferiu o escalonamento. **Não refazer** — foi decisão
  > de gosto, não defeito.

  > Existia também um `CategoryGrid.tsx` com seção parecida, que confundia quem procurava a
  > grade de categorias. Era código morto e foi apagado — a home usa `CategoryShowcase`.

- **`IntelligentDevices`** — a pílula "Comprar" ficava sobreposta à foto com `opacity-100`
  permanente no mobile, onde não há hover. Agora a sobreposição é `md:` para cima e o mobile
  tem botão de largura cheia no fim do card, fora do `<Link>`.

- **`WelcomePopup`** — disparava por `setTimeout` de 4s em qualquer página. Agora abre depois
  de 15% da página rolada, com piso de 600px e de 2,5s, e não abre em `/carrinho` nem
  `/checkout`.

### Banner do builder, quiz e setups (commit `ac0fefe`)

- **`DealsHighlight`** — o card vermelho anunciava o catálogo de ofertas com CTA quebrada
  (`?onlyDiscount=true` enquanto a listagem lê `promo=1`) e "+200 itens" chumbado (o real era
  280). Virou a entrada do "Monte seu PC", que só existia na home como terceiro slide do
  carrossel do hero. São **dois cards**: o de cima lidera pelo quiz ("responder 3 perguntas"),
  o de baixo é builds prontas com contagem e preço lidos do catálogo.

- **Quiz** — termina na página do setup recomendado. `MonteSeuPcPage` ganhou `?inicio=`
  (`quiz` | `builder` | `presets`), senão um botão escrito "fazer o quiz" cairia na tela de
  escolha.

- **Selo de degrau** nos setups: Entrada · Intermediário · Avançado, cores em `TIER_STYLE`
  (azul `#38bdf8`, violeta `#a78bfa`, âmbar `#fbbf24`) — rampa fria → quente. Vermelho, verde
  e laranja estavam fora porque já significam desconto, comprar e pré-venda no mesmo card.

  > **Descartado:** cheguei a pôr placa e resolução no nome do produto
  > (`Setup Gamer PCYES Apex — RTX 4090, 4K 144Hz`). O cliente prefere que isso viva na ARTE,
  > feita pelo marketing. Nomes voltaram a `Setup Gamer PCYES Apex`.

- **Arte ambientada sangra** até a borda no quick view, carrinho e checkout (`artFitClass`).

- **Card de compra da PDP** — bloco de frete era o último e tinha `mb-5`, virando faixa vazia;
  vão entre opções de frete de 26 para 20px.

  > **Descartado:** teto de altura + rolagem interna no card sticky. O cliente prefere que o
  > card **passe da tela** a ter barra de rolagem própria. Não reintroduzir.

### Página de setup enxugada e as três portas ganham desenho

- **[x] Catálogo de "o que roda" fixado na v1.** O modal tinha um seletor de protótipo com três
  layouts — grid de capas, destaque + faixa, lista compacta. O cliente escolheu o **grid de
  capas**; os outros dois e o seletor foram apagados. **Não reintroduzir:** a comparação já
  aconteceu.

- **[x] Cinco seções saíram da PDP de setup.** Entre "// O QUE RODA NESSA MÁQUINA" e o FAQ
  havia "// ANTES DE SAIR DAQUI" (trilha de montagem + certificado), "// UMA CAIXA SÓ",
  "// SILÊNCIO E TEMPERATURA", "// O QUE AINDA CABE DENTRO" e "// ESSA OU A VIZINHA". Todas
  removidas: a página fica no que a máquina FAZ, não em como foi montada. Hoje é
  vídeo → cenas → o que roda → FAQ.

  > O **conteúdo** delas continua em `getSetupStory` (`assembly`, `certificate`, `box`,
  > `acoustics`, `expansion`). Voltar qualquer uma é reescrever a seção, não o texto.
  >
  > Com "essa ou a vizinha" saiu o **único dado vivo** do arquivo: era a única seção que
  > mostrava nome e preço de outro produto, e a única que exigiria consulta em runtime no
  > Magento. Hoje `SetupStorySections` é 100% estático.

- **[x] Os dois cards do `DealsHighlight` tinham alturas diferentes.** O do quiz era `flex-[1.2]`
  contra `flex-1` do de builds, com pisos de altura diferentes: 20% mais alto no desktop, e no
  celular cada um parava na própria altura de conteúdo. Viraram uma grade de duas fileiras
  `1fr` com o mesmo piso (`PORTA_MIN_H`). Conferido em 1440/1024/768/390px: iguais nos quatro.

- **[x] Ilustrações nas três portas do "Monte seu PC"** (`PathBlueprint.tsx`). Desenho técnico
  em SVG inline — traço fino sobre grade milimetrada, como planta de engenharia, para conversar
  com o "compatibilidade garantida" que a página promete logo abaixo. Gabinete explodido no
  builder, três perguntas convergindo no quiz, três máquinas carimbadas nas prontas.

- **[x] Uma porta nasce em foco.** O realce dos `PathCard` deixou de ser `:hover` e virou
  `data-ativo`, controlado por estado: **"Me ajuda a escolher" começa aceso** (é o que leva o
  selo POPULAR), e passar o mouse — ou tabular — move o foco para outra porta. Saindo da
  fileira, volta para o quiz.

  > Por que não `:hover`: com ele a tela abria com as três apagadas, e a recomendação só
  > aparecia para quem já tivesse decidido passar o mouse — no celular, nunca. O mesmo atributo
  > dispara o gesto de cada ilustração (`group-data-[ativo]` em `PathBlueprint`), então realce e
  > animação têm um gatilho só.

---

## Pendente — precisa de detalhe do cliente

- **[ ] 3. Ficha do setup na PDP.** Tabela de specs (processador, placa de vídeo, memória,
  armazenamento, fonte, monitor, categoria de uso) + linhas "Jogos que rodam" / "Programas que
  rodam" com avatares e `+25 Ver jogos` · `+19 Ver programas`. Link "Ver configuração completa".

- **[~] 5. Três portas do Monte seu PC.** As três aparecem na home pelos dois banners do
  `DealsHighlight`, e a página em si ganhou ilustração e foco padrão. Falta decidir se muda
  mais alguma coisa.

- **[ ] 1. Card de promoções mobile.** O slot virou "Monte seu PC". Se ainda quiser um bloco
  de promoções, é assunto novo e precisa de lugar.

> **Encerrado:** o item 4 (blocos de baixo da página de setup — "A máquina montada",
> "Silêncio e temperatura", "O que dá pra caber dentro", "Essa é da vizinha") saiu da fila.
> Essas seções existiam e foram **removidas** por decisão do cliente. Não replanejar.

---

## Pendente — decisão do cliente, não técnica

- **[!] `sessionStorage` do `WelcomePopup`.** O convite volta a cada aba nova. Trocar por
  `localStorage` com prazo (ex.: 30 dias) muda quantas vezes uma pessoa real vê a oferta.
  É decisão de marketing.

- **[!] Fotos de categoria em fundo claro.** Cadeiras, Monitores e Teclados são foto de cena
  clara (a de monitor tem plantinha, iPhone e copo do Starbucks) e destoam do resto, que é
  produto em fundo escuro. É conteúdo, não código.

- **[!] Variantes de botão no design system.** O botão fantasma do banner do builder é
  invenção sem precedente no projeto. Existem dois sistemas — `section/CTAButton.tsx`
  (`buy`/`preorder`/`brand`) e `ui/button.tsx` (shadcn) — e **nenhum banner usa nenhum dos
  dois**: `MegaSaleBanner`, `CouponBanner` e `BannerDuo` fazem a pílula branca à mão. O
  caminho seria criar `onBrand` e `outline` no `CTAButton` e migrar os quatro.

---

## Bugs

- **[x] `MegaSaleBanner` usava `?onlyDiscount=true`.** Agora `promo=1`, que é o que a listagem
  lê (`ProductsPage:489`). Conferido no navegador: `/produtos?promo=1` mostra 280 produtos com
  a pílula "Promoção" ligada; `/produtos` mostra 489.

- **[x] Banner de cookies cobria o card de compra.** Era pior do que estava escrito aqui: o
  aviso é `fixed bottom-0` num `z-[80]`, e **quatro** páginas têm barra fixa embaixo num
  `z-40` — PDP, carrinho, checkout e Monte seu PC. No celular ele cobria o "Comprar agora"
  inteiro, preço e botão (medido: barra em y 774–844, aviso a partir de y 655).

  A altura do aviso agora é medida e publicada em `--cookie-h`, no mesmo padrão do
  `--announce-h` da `AnnouncementBar`. Quem ancora embaixo usa `bottom: var(--cookie-h, 0px)`,
  e o `main` ganha o mesmo valor de `padding-bottom` para que o fim da página não fique
  escondido. Aceito ou recusado, volta a `0px` e o layout reflui.

  > **Verificado de verdade só na PDP** (celular: a barra saiu de y 774–844 para 510–580, sem
  > sobreposição; desktop: "Consultar frete" e o campo de CEP livres). Carrinho, checkout e
  > Monte seu PC receberam a **mesma linha**, mas não consegui exercitar: o carrinho vive só
  > em memória (o `CartContext` não persiste em `localStorage`), então recarregar a página
  > esvazia, e o fluxo de adicionar pelo Playwright não fechou. Vale um olhar humano nos três.

- **[x] Cupom sem lugar para copiar.** O código saiu do texto da `AnnouncementBar` e virou um
  chip que copia no clique, com confirmação em `role="status"` para leitor de tela. Vale para
  os dois cupons da barra, JEDI25 e NERDPRIDE. O chip é irmão do `<Link>`, não filho —
  `<button>` dentro de `<a>` é HTML inválido e o clique brigaria com a navegação.

  > **Continua aberto:** um bloco de cupom na home. O chip resolve "não dá para copiar", não
  > resolve "a barra pode ser fechada e o cupom some do site". Onde esse bloco entra é decisão
  > de marketing, como o card de promoções mobile.

---

## Dívida técnica

- **[x] `CategoryGrid.tsx` era código morto.** Apagado. O único vestígio era um comentário no
  `DealsHighlight` que o citava como exemplo de `stroke-hover-red`; passou a citar
  `BannerDuo` e `InRealLifeSection`, que existem.

- **[x] Padding fixo de imagem** em `DropDoDiaSection`, `IntelligentDevices`, `GpuShowcase` e
  `ProductCarousel` → `artFitClass(src, padding)` nos quatro. O `ProductCarousel` desenha num
  quadro 5:6 e também ganhou `setupArtVariant(src, "tall")`, como o `ProductCard`. Nenhuma
  dessas listas tem setup hoje, então na tela nada muda — muda no dia em que tiver.

- **[x] `public/setups/_originais-1448/`** virou `assets-fonte/setups-1448/`, com README.
  O problema maior não era o git: a pasta estava dentro de `public/`, então os 17 MB de PNG
  master iam para `dist/` a cada build sem que página nenhuma os pedisse. O `dist/` caiu de
  36 MB para 19 MB.

- **[~] Dois cards de produto em paralelo.** `ProductCard.tsx` e o markup inline da listagem
  em `ProductsPage.tsx` continuam existindo, mas as três partes que doíam saíram para
  primitivos em `components/section/`:

  - `SetupTierBadge` — o selo de degrau, que era o exemplo do problema (escrito duas vezes).
  - `PriceBlock` — preço anterior + preço + parcela. Estava copiado em **quatro** lugares
    (`ProductCard`, listagem, `ProductCarousel`, relacionados da PDP), com duas escalas:
    `card` (`--text-lg`/`--text-caption`) e `catalog` (`--text-xl`/`--text-sm`).
  - `InstallmentLine` — a linha da parcela sozinha, para a visão em lista.

  De brinde, três dessas quatro cópias escreviam preço e parcela como texto puro, sem a
  versão `sr-only` falada — o NVDA não anuncia o "R$" na configuração padrão, então o leitor
  de tela ouvia "R 1899 vírgula 90", sem moeda. Só o `ProductCard` tinha o tratamento (via
  `Price`); agora os quatro têm.

  > **Fundir os dois cards num só ainda não dá — e é decisão de design, não refactor.**
  > Contei ~15 divergências deliberadas entre eles: escala de preço, `mb-4` a mais no poço da
  > imagem, corte do título (1 linha × 2), breakpoint do hover (`md` × `lg`), tratamento da
  > foto (`group-hover:scale-[1.05]` × `sm:scale-[0.92] group-hover:scale-[0.97]`), botão de
  > favorito com desenho diferente, quick view só na listagem, selo de switch só na listagem,
  > swatches com estado interno × controlado por fora, e o `<Link>` cobrindo o card inteiro ×
  > só imagem e título. Um `variant="catalog"` que respeitasse tudo isso viraria uma máquina
  > de condicionais pior que as duas implementações. O caminho real é o cliente escolher qual
  > dos dois desenhos vence — aí a fusão é mecânica.

- **[!] Parcela acima de R$ 1.000 ganhou separador de milhar.** Efeito colateral do
  `PriceBlock`: a conta da parcela era `toFixed(2).replace(".", ",")` à mão em todos os
  lugares, sem separador, enquanto o preço logo acima usava `formatBRL`, com separador. No
  mesmo card lia-se `R$ 20.499,00` e `10x de R$ 2049,90`. Agora os dois usam `formatBRL`.
  **Muda pixel em 3 dos 9 setups** (Studio, Apex e Cockpit, os acima de R$ 10 mil) e em nada
  mais — o resto do catálogo tem parcela abaixo de mil. Se o cliente preferir sem separador,
  é trocar `formatBRL` por `toFixed` dentro de `InstallmentLine`, um lugar só.

  Junto disso, `brl()` em `lib/setups.ts` era cópia byte a byte de `formatBRL` e virou um
  alias. Sobra um formato de moeda escrito à mão fora do padrão: o `DropDoDiaSection`, que
  escreve "ou R$ 1299,90 em 10x sem juros" com estrutura própria — não é o mesmo texto, então
  não entrou no `PriceBlock`.

- **[ ] `SheetOverlay` dá aviso de `ref` no console** (`components/ui/sheet.tsx`, componente
  shadcn). "Function components cannot be given refs" ao abrir qualquer `Sheet` — o catálogo de
  jogos, por exemplo. É `forwardRef` faltando no wrapper do Radix. Não é regressão desta rodada;
  aparece desde que o Sheet existe.

  > Cuidado parecido, este já resolvido: `AnimatePresence` do `motion` lê `ref` como **prop** de
  > qualquer filho direto, e em React 18 `ref` não é prop. O `CookieConsent` dava o mesmo tipo de
  > aviso; a saída foi marcar o elemento com `data-cookie-bar` e achá-lo por seletor. Envolver
  > num `<div ref>` **não** resolve — o aviso passa a apontar para o `div`.

- **[x] Deploy: não precisa de CLI, sai do `git push`.** Ficou tempo demais anotado como
  bloqueado por um diagnóstico que era só conta errada. A CLI estava logada em
  `gabfeelix1-7902` (time `freela1`), que não tem projeto nenhum. A conta certa é
  **`gabrielbarbosa-8923`**, e nela o `pcyes-v3-codigo-fonte` existe com integração de GitHub
  ligada no `main`.

  Ou seja: **`git push origin main` já publica**. Medido — commit às 09:18:42, deploy de
  produção criado às 09:18:46, quatro segundos depois. Não há `.vercel/` no repositório e não
  precisa haver; `vercel link` também não.

  > Se o link publicado mostrar código velho, o problema NÃO é o deploy: é `vercel whoami`
  > apontando para outra conta (aí a CLI mente sobre o estado) ou cache do navegador. Confira
  > pelo conteúdo, não pela CLI — `vercel inspect https://pcyes-v3-codigo-fonte.vercel.app`
  > mostra a hora do deploy de produção em `created`.

---

## Larguras de container (contexto útil)

O padrão é `SectionContainer` — `px-5 md:px-[72px]` + `max-w-[1600px]`. Existem divergências
reais fora dele: **1434px** no footer e páginas institucionais, **1520px** no MonteSeuPc,
**1760px** em caixas externas que ainda têm um `SectionContainer` dentro. Não é urgente, mas
explica confusão ao medir alinhamento — meça pela coluna onde o conteúdo começa, não pela
borda da caixa.
