# Fila de ajustes — a discutir

Itens levantados por print. Cada um tem detalhe pendente de conversa.
Status: `[ ]` a discutir · `[~]` em conversa · `[x]` resolvido

---

## 1. [ ] Card de catálogo / promoções (mobile)

Bloco vermelho "Todas as promoções num só lugar" — `+200 itens EM PROMOÇÃO AGORA`, stack de miniaturas de produto, CTA "VER CATÁLOGO DE OFERTAS".

Detalhe: _(a definir na conversa)_

---

## 2. [x] Header — busca e navegação

Auditoria feita em Playwright (1024 → 1920). 12 achados numerados H1–H12.

### Resolvido — buscador (04/08/2026)

- **H1** buscador sem teto (`flex-1` solto): 667px @1366 → 1045px @1920. Agora coluna central de grade com teto 480/600/680px por breakpoint.
- **H2** ~600px de campo vazio a 1920 → resolvido pelo teto.
- **H3** buraco de 130px entre pílula e "Entre ou Cadastre-se" (`mr-16`) → `mr-16`/`ml-8` removidos, espaçamento passa a ser `gap` da grade.
- **H7/H8** "Todas as categorias" ocupava 191px → rótulo curto "Todas" (94px). Nome completo continua na lista e no `aria-label`.
- Pílula de 40 → 44px. `role="combobox"` + `aria-expanded`/`aria-controls` no campo, `listbox`/`option` na lista de categorias.
- X flutuante `-right-12` (encostava nos ícones da conta a partir de 1440px) removido; um X só, dentro da pílula: limpa o termo e, vazio, fecha o painel.
- Eixo: pílula e painel de resultados ficam no centro exato da tela em ≥1440px — mesmo eixo da linha de navegação.

### Resolvido — equilíbrio das colunas (04/08/2026)

Centralizar a busca deixou os vãos laterais desiguais (318px à esquerda contra
159px à direita a 1920px; 4:1 a 1440px), porque logo (142px) e bloco de conta
(301px) têm tamanhos diferentes. Em vez de encolher a busca ou abrir mão do
eixo central, entrou um bloco "Entregar em" ao lado do logo — `HeaderDelivery`.

| viewport | vão esquerda | vão direita |
|---|---|---|
| 1920 | 156px | 159px |
| 1600 | 84px | 87px |
| 1440 | 44px | 47px |

- CEP guardado em `localStorage` (`pcyes-cep`), UF resolvida offline por faixa
  dos Correios (`src/utils/cep.ts`) — sem chamada de rede.
- A calculadora de frete da página de produto herda o CEP e já abre calculada.
- Aparece só a partir de 1440px: abaixo disso a linha não comporta o bloco sem
  espremer a busca, e o cabeçalho segue como era.

### Encerrado sem ação (04/08/2026) — header aprovado como está

- ~~**H4/H5/H6** header desalinhado da coluna de conteúdo.~~ **Achado incorreto.**
  O header usa `px-5 md:px-[72px]` + `max-w-[1600px]`, que é exatamente o padrão
  de `SectionContainer` (`src/app/components/section/SectionContainer.tsx`,
  `maxWidth` default `"1600"`). Medido na home: o logo e 8 dos 10 títulos de
  seção caem no mesmo x — 160 a 1920px, 72 a 1600px e 1440px. **O header já
  estava alinhado.** O erro veio de comparar o logo com a borda da *caixa* de
  containers `max-w-[1760px]` em vez de com a coluna onde o conteúdo começa.
- **H9/H10** duas lógicas de alinhamento (linha de cima ancorada nas bordas,
  nav centralizada — x=550 @1920, ~390px de vazio sob o logo). **Não vamos
  mexer.** Fica registrado: a nav centralizada é o que sustenta o eixo central
  da busca; mexer numa obriga a revisitar a outra.
- **H11** 142px de altura (96 + 46). **Não vamos mexer** — depende de H9/H10.
- **H12** modal de boas-vindas → promovido para o item 8 desta fila.

Divergências de largura fora do header (1434 no footer/institucional, 1520 no
MonteSeuPc, contra 1600 do padrão) seguem existindo, mas não são do header.

---

## 3. [ ] PDP setup — "// Ficha do setup"

Tabela de specs (processador, placa de vídeo, memória, armazenamento, fonte, monitor, categoria de uso) + linhas "Jogos que rodam" / "Programas que rodam" com avatares e `+25 Ver jogos` · `+19 Ver programas`. Link "Ver configuração completa".

Detalhe: _(a definir na conversa)_

---

## 4. [ ] Página de setup — blocos de baixo

- "A máquina montada" (galeria de componentes: gabinete, monitor, kit periféricos, refrigeração, armazenamento, caixa/parafusos/documentação)
- "// Silêncio e temperatura" — dB em repouso/carga, temp CPU/GPU
- "// O que dá pra caber dentro" — baias SATA/M.2/3,5", slots PCIe, consumo típico vs fonte
- "// Essa é da vizinha" — comparação de degraus da linha (Pulse × Strike), preço/delta

Detalhe: _(a definir na conversa)_

---

## 5. [ ] Três portas de entrada (Monte seu PC)

Cards: "Eu já sei o que quero" (Montar do zero) · "Me ajuda a escolher" (Começar, badge POPULAR) · "Quero builds prontas" (Ver setups).

Detalhe: _(a definir na conversa)_

---

## 6. [x] Bento de categorias quebra no mobile — resolvido em 04/08/2026

`CategoryShowcase` — seção "// EXPLORE · Equipamentos por categoria".
Arquivo: [`src/app/components/CategoryShowcase.tsx`](../src/app/components/CategoryShowcase.tsx).

> Atenção para quem for mexer: existe também um `CategoryGrid.tsx` com seção
> parecida ("Explore por categoria"). É **código morto** — não é importado em
> lugar nenhum. A home usa `CategoryShowcase`.

O mosaico tem 8 categorias com spans fixos: Gabinetes hero 2×2, Cadeiras com
`row-span-2` (frame alto), o resto quadrado, tudo sob `grid-auto-flow: dense`.

No mobile a grade cai para 2 colunas mas o `row-span-2` de Cadeiras continuava
valendo: a coluna da esquerda avançava duas fileiras enquanto a direita avançava
uma, e o `dense` remendava o buraco com o card seguinte. Resultado: escada de
bordas irregulares, que é o que aparecia no print.

**Pesquisa consultada** — consenso de que tiles de categoria refluem para duas
colunas no mobile (não uma), com o card âncora em largura cheia e o resto
uniforme:

- <https://baymard.com/learn/ecommerce-category-page>
- <https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide>
- <https://inkbotdesign.com/bento-grid-design/>

**Tentativa 1 — descartada.** Uniformizei tudo: hero largo + grade de dois
quadrados iguais + Placas fechando, sem cards altos. Tecnicamente resolvia o
degrau, mas o cliente preferiu o escalonamento original. **Não refazer** — a
decisão foi de gosto, não de defeito.

**O que ficou (mobile):** o escalonamento continua, com alturas afinadas.

| card | antes | agora |
|---|---|---|
| Gabinetes | 312px | 258px |
| Cadeiras | 312px | 312px |
| Microfones | 150px | 312px (par da Cadeiras) |
| Placas | quadrado 150px | largura cheia, 204px |
| demais | 150px | 150px |

Empilhamento: Gabinetes largo → Cadeiras alta \| Mouses, Headsets → Monitores \|
Microfones alto, Teclados → Placas largo fechando. As duas colunas somam 12
linhas entre o hero e o fechamento, então fecham niveladas.

Para conseguir alturas intermediárias, a trilha do mobile passou a ser fina
(`grid-auto-rows: 42px`) e os cards contam linhas — 3 linhas = 150px, 4 = 204,
5 = 258, 6 = 312. Com a trilha grossa de antes só existia 150px ou 312px.
`BENTO_SPAN` virou dois arrays: `BENTO_SPAN_MOBILE` e `BENTO_SPAN_MD`.

Também no mobile: véu mais fraco (0.32/0.42 → 0.22/0.30 — a faixa é medida em %,
então num tile pequeno cobria proporcionalmente muito mais da foto) e canto de
22px → 18px. Desktop inalterado nos dois casos, medido a 768px e 1440px.

**Continua pendente, é conteúdo e não código:** algumas fotos de categoria são
banco de imagem em fundo claro (cadeira sobre verde-claro, teclado sobre
madeira, monitor em mesa branca) e destoam do resto, que é produto em fundo
escuro. O véu segura a legibilidade, mas a foto certa resolveria melhor.

---

## 7. [x] Botão "Comprar" cobre a imagem — resolvido em 04/08/2026

**Feito:** o pill flutuante virou `hidden md:inline-flex` — sobreposto à foto só
onde existe hover para revelá-lo. No mobile entrou um botão de largura cheia no
fim do card, **fora do `<Link>`**, depois do preço. Ordem final: imagem, nome,
preço, ação — a mesma do `ProductCard` usado em "Drops mais cobiçados".

Medido: a 390px e 430px o botão fica abaixo da caixa da imagem, com a largura do
card. A 768px e 1440px segue o pill flutuante de antes.

<details>
<summary>Diagnóstico original</summary>

`IntelligentDevices` — seção "// BUILT FOR PERFORMANCE · Tecnologia para Gamers".
Arquivo: [`src/app/components/IntelligentDevices.tsx`](../src/app/components/IntelligentDevices.tsx), botão na linha 403.

O botão é posicionado dentro da caixa da imagem:

```
absolute bottom-4 left-1/2 -translate-x-1/2 ... opacity-100 md:opacity-0 md:group-hover:opacity-100
```

No desktop ele só aparece no hover, sobreposto à foto — funciona. No mobile
`opacity-100` vale sempre e não existe hover, então **o botão fica permanente em
cima da imagem**. Como a grade é `grid-cols-2` em telas pequenas, cada card tem
~169px a 390px de viewport: a pílula verde ocupa boa parte da foto do produto, e
o nome e o preço ficam abaixo, fora do bloco visual.

Compare com "// HALL DA META · Drops mais cobiçados" (`HomePage`, via
`ProductCard`): lá o botão está no fluxo do card, depois do preço. Ordem certa —
imagem, nome, avaliação, preço, ação. É o padrão que esta seção deveria seguir.

Duas correções possíveis: tirar o botão de dentro da imagem no mobile (vira
`static` no fim do card), ou manter a sobreposição só a partir de `md`.

</details>

---

## 8. [x] Modal de boas-vindas dispara por tempo — resolvido em 04/08/2026

**Feito:** gatilho por rolagem no lugar do relógio.

| constante | valor | por quê |
|---|---|---|
| `SCROLL_TRIGGER` | 15% | fração do rolável percorrida antes de convidar |
| `SCROLL_FLOOR_PX` | 600px | piso: em página curta 15% seriam dois toques de dedo |
| `MIN_DWELL_MS` | 2500ms | rolagem por inércia cruza os 15% em menos de 1s |
| `BLOCKED_PATHS` | `/carrinho`, `/checkout` | quem já decidiu comprar não leva modal na cara |

Listener de `scroll` (passivo) mais um `setInterval` de 500ms — sem o intervalo,
parar de rolar logo antes do piso de tempo vencer deixaria o convite preso
esperando um scroll que não vem mais.

Testado: parado 6s sem rolar não abre · rolar o limiar antes de 2,5s de página
não abre, abre sozinho quando o piso vence · no `/carrinho`, rolando até o fim,
não abre.

**Não mexi:** a dispensa segue em `sessionStorage`, ou seja o convite volta a
cada aba nova. Trocar para `localStorage` com prazo muda quantas vezes uma
pessoa real vê a oferta — decisão de marketing, não minha.

<details>
<summary>Diagnóstico original</summary>

`WelcomePopup` — "Cadastre-se e ganhe 10% OFF na primeira compra".
Arquivo: [`src/app/components/WelcomePopup.tsx`](../src/app/components/WelcomePopup.tsx),
montado global em [`RootLayout.tsx`](../src/app/components/RootLayout.tsx) (linha 43).

Hoje o gatilho é só um relógio:

```
const timer = setTimeout(() => setVisible(true), 4000);
```

Quatro segundos depois do mount, em **qualquer página**, sem olhar para nada que
a pessoa fez. Aparece um `fixed inset-0 z-[75] bg-black/65 backdrop-blur-md`
cobrindo a página inteira. Dispensa é guardada em `sessionStorage`
(`pcyes-welcome`), ou seja: volta a cada aba nova.

Atrapalhou a própria investigação do header duas vezes — screenshots saíam
pretos até eu entender que não era erro do teste. Se atrapalha quem está
trabalhando no site, atrapalha quem está comprando.

### Direção decidida

Trocar tempo por **rolagem**: só abrir depois de ~15% da página percorrida.
Rolar é sinal de interesse; 4 segundos parados não é sinal de nada.

Pontos a resolver na implementação:

- **15% de quê** — da altura rolável (`scrollHeight - innerHeight`). Em página
  curta 15% é quase nada, então vale um piso em px (ex.: `max(15%, 600px)`).
- **Piso de tempo junto**, para não abrir no meio de uma rolagem rápida.
- **Persistência** — `sessionStorage` faz o modal voltar em cada aba nova.
  Se a ideia é uma vez por pessoa, é `localStorage` com prazo (ex.: 30 dias).
- **Onde vale** — hoje é global. Faz sentido na home e em listagem; no
  checkout e no carrinho, atrapalha venda.

</details>

---

Manda o detalhe de cada um na ordem que preferir — vou preenchendo aqui.
