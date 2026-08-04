# Fila de ajustes — a discutir

Itens levantados por print. Cada um tem detalhe pendente de conversa.
Status: `[ ]` a discutir · `[~]` em conversa · `[x]` resolvido

---

## 1. [ ] Card de catálogo / promoções (mobile)

Bloco vermelho "Todas as promoções num só lugar" — `+200 itens EM PROMOÇÃO AGORA`, stack de miniaturas de produto, CTA "VER CATÁLOGO DE OFERTAS".

Detalhe: _(a definir na conversa)_

---

## 2. [~] Header — busca e navegação

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

### Em aberto — não mexido, decisão pendente

- ~~**H4/H5/H6** header desalinhado da coluna de conteúdo.~~ **Achado incorreto, descartado em 04/08/2026.** O header usa `px-5 md:px-[72px]` + `max-w-[1600px]`, que é exatamente o padrão de `SectionContainer` (`src/app/components/section/SectionContainer.tsx`, `maxWidth` default `"1600"`). Medido na home: o logo e 8 dos 10 títulos de seção caem no mesmo x — 160 a 1920px, 72 a 1600px e 1440px. **O header já está alinhado.** O erro veio de comparar o logo com a borda da *caixa* de containers `max-w-[1760px]` em vez de com a coluna onde o conteúdo de fato começa. As outras larguras (1434 no footer/institucional, 1520 no MonteSeuPc) seguem sendo divergências reais, mas fora do header.
- **H9/H10** duas lógicas de alinhamento no mesmo header — linha de cima ancorada nas bordas, linha de nav centralizada (x=550 @1920, 390 @1600). Deixa ~390px de vazio sob o logo.
- **H11** header com 142px de altura (96 + 46), antes do banner promo.
- **H12** *(fora do header)* modal `fixed inset-0 z-[75] bg-black/65` ("Cadastre-se e ganhe 10% OFF") abre sozinho ~2s depois do load da home e cobre a página inteira.

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

Manda o detalhe de cada um na ordem que preferir — vou preenchendo aqui.
