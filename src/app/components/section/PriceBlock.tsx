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
 *   R$ 404,91 no PIX
 *   10x de R$ 44,99 sem juros no cartão
 *
 * O percentual "% OFF" que ficava ao lado do preço saiu daqui — o selo sobre a
 * foto (`DiscountBadge`) já carrega esse número, derivado dos mesmos dois
 * preços, e a linha do lado do valor agora responde uma pergunta melhor:
 * quanto custa pagando à vista.
 *
 * UM VERDE SÓ (`--save`): o verde está no "no PIX" e em mais nada. Ele
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
 * "ou 10x de R$ X sem juros" — visual e falado. O "ou" amarra com o preço do
 * PIX logo acima: são duas formas de pagar, não dois valores somados.
 *
 * A parcela sai do preço CHEIO, não do preço do PIX: quem parcela no cartão não
 * tem o desconto à vista, e prometer a parcela menor seria mentira no checkout.
 */
export function InstallmentLine({ priceNum, scale = "card", className = "mt-1" }: InstallmentLineProps) {
  const parcela = priceNum / INSTALLMENTS;
  const cfg = SCALE[scale];

  return (
    <p
      // Catálogo: 14px só do sm pra cima; no celular a coluna do card não
      // comporta e a linha quebrava. Lá fica no tamanho de legenda.
      className={`leading-tight truncate ${scale === "catalog" ? "text-[length:var(--text-caption)] sm:text-[length:var(--text-sm)]" : ""} ${className}`}
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: scale === "catalog" ? undefined : cfg.installment,
        color: `rgba(var(--foreground-rgb), ${cfg.alpha})`,
      }}
    >
      {/* Sempre uma linha só: a coluna do card é estreita (~160px no celular)
          e, com parcela de quatro dígitos, "10x de R$ 1.234,99 sem juros no
          cartão" quebrava e desalinhava os cards vizinhos. Forma curta de
          vitrine; a versão falada segue completa. */}
      <span aria-hidden="true">
        ou {INSTALLMENTS}x {formatBRL(parcela)} sem juros
      </span>
      <span className="sr-only">
        ou {INSTALLMENTS} vezes de {formatBRLSpoken(parcela)} sem juros no cartão
      </span>
    </p>
  );
}

interface PixLabelProps {
  scale?: PriceScale;
}

/** "no PIX" — a etiqueta que explica o número grande. "À vista" sobrava:
 *  PIX já é à vista. */
export function PixLabel({ scale = "card" }: PixLabelProps) {
  return (
    <span
      className="leading-none whitespace-nowrap"
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: SCALE[scale].installment,
        fontWeight: 700,
        color: "#16a34a",
        letterSpacing: "0.01em",
      }}
    >
      no PIX
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
  /** Em grade: guarda a altura da linha do preço antigo mesmo sem ele, pra
   *  o preço ficar na mesma altura em todos os cards. */
  reserveOldPrice?: boolean;
}

export function PriceBlock({
  priceNum,
  oldPriceNum,
  oldPrice,
  scale = "card",
  className,
  reserveOldPrice = false,
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
      {!hasOld && reserveOldPrice && (
        <p aria-hidden="true" className="invisible leading-none mb-1" style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-sm)" }}>
          &nbsp;
        </p>
      )}

      {/* `items-baseline`: a etiqueta do PIX é bem menor que o preço, e alinhada
          pelo centro ela flutuava acima da linha dos algarismos. */}
      {/* "no PIX" ao lado do preço. O preço nunca parte ("R$" numa linha, número
          na outra); em tela estreita a fonte encolhe, e só se ainda
          assim faltar espaço o "no PIX" desce de linha. */}
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <p
          className="text-ink-strong leading-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: `min(${cfg.price}, 4.3vw)`,
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          <span aria-hidden="true">{formatBRL(pix)}</span>
          <span className="sr-only">{formatBRLSpoken(pix)} no PIX</span>
        </p>

        <PixLabel scale={scale} />
      </div>

      <InstallmentLine priceNum={priceNum} scale={scale} className="mt-1.5" />
    </div>
  );
}
