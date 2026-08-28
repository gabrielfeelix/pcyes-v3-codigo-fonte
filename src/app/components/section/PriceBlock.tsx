import { formatBRL, formatBRLSpoken } from "../../../utils/format";

/**
 * Bloco de preço do card — preço anterior, preço à vista e parcela.
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
 * PREÇO EM DESTAQUE É O DO PIX. A PDP já mostrava o valor com os 10% do PIX no
 * número grande e o card mostrava o valor cheio: quem clicava via o preço cair
 * sozinho na próxima tela. Agora as duas telas dizem o mesmo número, no mesmo
 * formato do resto do varejo brasileiro:
 *
 *   R$ 530,88            (riscado, preço anterior)
 *   R$ 404,91  à vista no PIX
 *   10x de R$ 44,99 sem juros no cartão
 *
 * O percentual "% OFF" que ficava ao lado do preço saiu daqui — o selo sobre a
 * foto (`DiscountBadge`) já carrega esse número, derivado dos mesmos dois
 * preços, e a linha do lado do valor agora responde uma pergunta melhor:
 * quanto custa pagando à vista.
 *
 * UM VERDE SÓ (`--save`): o verde está no "à vista no PIX" e em mais nada. Ele
 * chegou a existir no percentual e no PIX ao mesmo tempo, em linhas coladas, e
 * os dois disputavam a atenção.
 */

type PriceScale = "card" | "catalog";

/** Os 10% do PIX. Mesma conta de `getPixPrice` em productEnhancements. */
export const PIX_RATE = 0.9;
export const pixPriceOf = (priceNum: number) => Math.round(priceNum * PIX_RATE * 100) / 100;

/** Parcelamento máximo da loja. Não temos 12x. */
export const INSTALLMENTS = 10;

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
 * "10x de R$ X sem juros no cartão" — visual e falado.
 *
 * A parcela sai do preço CHEIO, não do preço do PIX: quem parcela no cartão não
 * tem o desconto à vista, e prometer a parcela menor seria mentira no checkout.
 */
export function InstallmentLine({ priceNum, scale = "card", className = "mt-1" }: InstallmentLineProps) {
  const parcela = priceNum / INSTALLMENTS;
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
      <span aria-hidden="true">
        {INSTALLMENTS}x de {formatBRL(parcela)} sem juros no cartão
      </span>
      <span className="sr-only">
        {INSTALLMENTS} vezes de {formatBRLSpoken(parcela)} sem juros no cartão
      </span>
    </p>
  );
}

interface PixLabelProps {
  scale?: PriceScale;
}

/** "à vista no PIX" — a etiqueta que explica o número grande. */
export function PixLabel({ scale = "card" }: PixLabelProps) {
  return (
    <span
      className="leading-none whitespace-nowrap"
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: SCALE[scale].installment,
        fontWeight: 700,
        color: "var(--save)",
        letterSpacing: "0.01em",
      }}
    >
      à vista no PIX
    </span>
  );
}

interface PriceBlockProps {
  /** Preço cheio do produto. O valor em destaque é derivado dele (PIX). */
  priceNum: number;
  oldPriceNum?: number;
  /** Texto já formatado do preço anterior; sem ele, formata a partir do número. */
  oldPrice?: string;
  scale?: PriceScale;
  className?: string;
}

export function PriceBlock({
  priceNum,
  oldPriceNum,
  oldPrice,
  scale = "card",
  className,
}: PriceBlockProps) {
  const cfg = SCALE[scale];
  const hasOld = Boolean(oldPrice) || (oldPriceNum !== undefined && oldPriceNum > priceNum);
  const pix = pixPriceOf(priceNum);

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

      {/* `items-baseline`: a etiqueta do PIX é bem menor que o preço, e alinhada
          pelo centro ela flutuava acima da linha dos algarismos. */}
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
          <span aria-hidden="true">{formatBRL(pix)}</span>
          <span className="sr-only">{formatBRLSpoken(pix)} à vista no PIX</span>
        </p>

        <PixLabel scale={scale} />
      </div>

      <InstallmentLine priceNum={priceNum} scale={scale} />
    </div>
  );
}
