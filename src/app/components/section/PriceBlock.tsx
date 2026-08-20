import { formatBRL, formatBRLSpoken } from "../../../utils/format";

/**
 * Bloco de preço do card — preço anterior, preço e parcela.
 *
 * Existia copiado em quatro lugares (ProductCard, o card inline da listagem, o
 * carrossel da home e os relacionados da PDP) com o mesmo desenho e a mesma
 * conta de parcela. Três dessas cópias escreviam a parcela como texto puro, sem
 * a versão falada — o NVDA não anuncia o "R$" na configuração padrão, então o
 * leitor de tela ouvia "10x de R 123 vírgula 45", sem moeda. Ver `Price`.
 *
 * Duas escalas, porque o card da listagem é maior que o card de vitrine:
 *   card    — preço `--text-lg`, parcela `--text-caption`
 *   catalog — preço `--text-xl`, parcela `--text-sm`
 *
 * `price`/`oldPrice` aceitam o texto já formatado que vem do dado do produto;
 * sem eles o valor é formatado aqui. A fala sai sempre do número.
 *
 * VERDE DE ECONOMIA (`--save`): quando há preço anterior, o percentual sai em
 * verde ao lado do preço. Antes o card não tinha verde nenhum — o desconto só
 * existia como selo vermelho sobre a foto, e vermelho no card já significa
 * outras três coisas (marca, oferta, pré-venda). Verde é o que faz o olho
 * registrar "estou economizando" antes de ler o número.
 *
 * Um verde só: a palavra PIX chegou a sair em verde também e os dois, em linhas
 * coladas, disputavam a atenção. O desconto ganhou.
 *
 * O percentual é DERIVADO dos dois preços, nunca escrito à mão: card e selo da
 * foto sempre concordam, e ninguém precisa lembrar de atualizar os dois.
 */

type PriceScale = "card" | "catalog";

const SCALE: Record<PriceScale, { price: string; installment: string; alpha: number }> = {
  card: { price: "var(--text-lg)", installment: "var(--text-caption)", alpha: 0.55 },
  catalog: { price: "var(--text-xl)", installment: "var(--text-sm)", alpha: 0.6 },
};

interface InstallmentLineProps {
  priceNum: number;
  scale?: PriceScale;
  className?: string;
}

/**
 * "No PIX ou 10x de R$ X" — visual e falado.
 *
 * Sem destaque no "PIX", de propósito: chegou a sair em verde junto com o
 * percentual e ficaram dois verdes em linhas coladas, competindo. O verde no
 * card é UM só, e é o do desconto — que é o que precisa ser visto primeiro.
 */
export function InstallmentLine({ priceNum, scale = "card", className = "mt-1.5" }: InstallmentLineProps) {
  const parcela = priceNum / 10;
  const cfg = SCALE[scale];

  return (
    <p
      className={`leading-tight ${className}`}
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: cfg.installment,
        color: `rgba(var(--foreground-rgb), ${cfg.alpha})`,
      }}
    >
      <span aria-hidden="true">No PIX ou 10x de {formatBRL(parcela)}</span>
      <span className="sr-only">No PIX ou 10 vezes de {formatBRLSpoken(parcela)}</span>
    </p>
  );
}

interface PriceBlockProps {
  priceNum: number;
  /** Texto já formatado do dado; sem ele, formata a partir de `priceNum`. */
  price?: string;
  oldPriceNum?: number;
  oldPrice?: string;
  scale?: PriceScale;
  className?: string;
}

export function PriceBlock({
  priceNum,
  price,
  oldPriceNum,
  oldPrice,
  scale = "card",
  className,
}: PriceBlockProps) {
  const cfg = SCALE[scale];
  const hasOld = Boolean(oldPrice) || (oldPriceNum !== undefined && oldPriceNum > priceNum);

  /* Derivado, nunca escrito à mão — o mesmo cálculo do selo sobre a foto.
     Só sai quando há número: com `oldPrice` apenas como texto não dá para
     calcular, e um "OFF" sem percentual não informa nada. */
  const off =
    oldPriceNum !== undefined && oldPriceNum > priceNum
      ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
      : 0;

  return (
    <div className={className}>
      {hasOld && (
        <p
          className="line-through leading-none mb-1"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-sm)",
            color: "rgba(var(--foreground-rgb), 0.62)",
          }}
        >
          {oldPriceNum !== undefined ? (
            /* Com o número em mãos dá para falar o valor; o texto visual, quando
               o dado traz um, ganha prioridade sobre o formatado. */
            <>
              <span aria-hidden="true">{oldPrice ?? formatBRL(oldPriceNum)}</span>
              <span className="sr-only">Preço anterior, {formatBRLSpoken(oldPriceNum)}</span>
            </>
          ) : (
            /* Só o texto: sem número não há como montar a fala, então ele fica
               visível ao leitor de tela como está. */
            oldPrice
          )}
        </p>
      )}

      {/* `items-baseline`: o percentual é bem menor que o preço, e alinhado pelo
          centro ele flutuava acima da linha dos algarismos. */}
      <div className="flex flex-wrap items-baseline gap-x-2">
        <p
          className="text-ink-strong leading-none"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: cfg.price,
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          <span aria-hidden="true">{price ?? formatBRL(priceNum)}</span>
          <span className="sr-only">{formatBRLSpoken(priceNum)}</span>
        </p>

        {off > 0 && (
          /* Texto puro, sem pílula: o selo sobre a foto já é uma pílula, e duas
             a dois centímetros uma da outra brigam. Aqui a cor basta.
             O "OFF" fica junto do número e não só na cor — WCAG 1.4.1 pede que
             a informação não dependa de cor sozinha. */
          <span
            className="leading-none"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: cfg.installment,
              fontWeight: 700,
              color: "var(--save)",
              letterSpacing: "0.01em",
            }}
          >
            {off}% OFF
          </span>
        )}
      </div>

      <InstallmentLine priceNum={priceNum} scale={scale} />
    </div>
  );
}
