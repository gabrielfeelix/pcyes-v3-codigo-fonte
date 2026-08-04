# PDP de Setup — o que é produto e o que é bloco global

Mapa de implantação da página de **setup** (build pronta) no Magento Open Source.
Vale só para produtos da categoria **Setups** — teclado, monitor e periférico
seguem a PDP padrão e não têm nada disto.

## A regra

> Nada que precise ser **igual em todas as páginas de setup** pode morar na
> `description` do produto.

No Magento a descrição é HTML digitado por pessoa, uma vez por SKU. Conteúdo
repetido ali vira nove cópias divergindo a cada edição: jogo novo entra em três
builds e falta em seis, a copy antiga sobrevive num canto, ninguém sabe qual é a
versão certa. O que é comum vai para **um** CMS block; o que é da máquina vem de
**atributo**, que é campo, não texto livre.

## Fronteira por seção

| Seção da página | Tipo no Magento | Campos / fonte | Gestor | Aceite |
|---|---|---|---|---|
| Ficha do setup (specs) | Atributos de produto (`setup_cpu`, `setup_gpu`, `setup_ram`, `setup_storage`, `setup_psu`, `setup_monitor`) | Um atributo por slot, no attribute set "Setup" | E-commerce | Ficha renderiza sem HTML na descrição |
| Pra quem é (título + parágrafo) | CMS block único + atributos `setup_persona` e `setup_tier` | Texto por `persona × tier` (9 combinações) dentro do bloco | Marketing | Trocar o tier do SKU troca o texto sem editar produto |
| Por que essa configuração (3 cards) | Mesmo CMS block acima | Texto por `persona × slot × tier`; modelo vem do atributo | Marketing | Nenhum texto de benefício na descrição do SKU |
| **O que roda nessa máquina** | **CMS block único + Widget Instance** | Biblioteca de títulos em JSON no bloco; veredito calculado por `peso × tier` | Marketing (lista) / E-commerce (widget) | Título novo aparece nas 9 builds editando **um** bloco |
| Configuração completa (drawer) | CMS block + atributos de slot | Lista de peças a partir dos atributos | E-commerce | Nenhuma peça digitada duas vezes |
| Essa ou a vizinha | CMS block + `setup_persona`/`setup_tier` | Vizinho derivado do degrau de tier na mesma persona | E-commerce | Build nova entra na comparação sem editar as vizinhas |
| Avaliações | Reviews nativas do Magento | — | E-commerce | Review do SKU, não texto global |

## "O que roda" — o caso crítico

É a seção com maior risco de divergência: lista longa, muda com frequência
(jogo novo todo mês) e é idêntica em todas as builds.

**Implantação**

1. **CMS Block** `setup-o-que-roda` contendo:
   - markup da vitrine e do modal;
   - `<script type="application/json">` com a biblioteca de títulos (nome, peso,
     categoria, arte);
   - o script que calcula o veredito a partir do tier da máquina.
2. **Widget Instance** (Content › Widgets, tipo *CMS Static Block*) com Layout
   Update apontando para as páginas de produto da categoria **Setups**. É o que
   faz o bloco aparecer sozinho em toda build, presente e futura — **zero HTML
   inserido por SKU**.
3. **Tier da máquina** vem do atributo `setup_tier` já renderizado na página. Sem
   atributo, o fallback é um mapa `SKU → tier` dentro do próprio bloco.

**Manutenção**

- Editar a lista: admin (CMS block) ou `PUT /V1/cmsBlock/:id`. Dá para versionar
  o conteúdo do bloco em repositório e publicar por script.
- Cache: salvar o bloco invalida `block_html`; a PDP pega a versão nova no
  próximo hit. Sem cron, sem deploy.
- Widget instance se configura **só pelo admin** (não há endpoint REST) — é
  setup manual, uma vez.

**Verificar antes de fechar a decisão**

- Se o container esperado existe no tema da PCYES (varia por tema e versão).
- Plano B, se o widget não puder ser colocado: uma linha
  `{{widget type="Magento\Cms\Block\Widget\Block" block_id="setup-o-que-roda"}}`
  na descrição de cada setup. Continua fonte única, mas volta a ter nove pontos
  de inserção — testar antes se a instância processa diretiva em `description`.

## Espelho no protótipo

| No protótipo | Vira no Magento |
|---|---|
| `src/app/components/SetupWorkloadsBlock.tsx` | CMS block + widget instance |
| `src/app/lib/gameLibrary.ts` | JSON dentro do bloco |
| `src/app/lib/setups.ts` (`AUDIENCE_COPY`, `BENEFIT_COPY`, `SLOT_COPY`) | Texto por `persona × tier` dentro do bloco |
| `SETUP_SEED[].specs` | Atributos de produto |
| `persona` / `tier` | `setup_persona` / `setup_tier` |

O componente do protótipo recebe **só o `productId`** (o SKU). Se algum dia ele
precisar de um dado novo por máquina, esse dado entra como atributo — nunca como
texto na descrição.
