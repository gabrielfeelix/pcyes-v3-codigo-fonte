import { useEffect, useState } from "react";
import { PcyesMark } from "./PcyesMark";

/* Espera antes de aparecer, pra rota rápida não piscar um painel e sumir. Era
   180ms com 200ms de fade: quase 400ms até ficar legível, e num carregamento de
   meio segundo dava só um borrão. 120 + 120 continua filtrando a troca
   instantânea e já está inteiro na tela quando a espera é real. */
const APPEAR_AFTER_MS = 120;

/* Quatorze células porque a onda precisa de corpo suficiente pra ler como
   varredura; com menos vira pisca-pisca, com mais a volta demora e parece
   travado. */
const CELLS = 14;
const SWEEP_MS = 1100;

/* Fallback do Suspense que envolve o RouterProvider: enquanto o chunk da rota
   baixa, o app inteiro sai da tela, navbar incluída. Antes o fallback era null
   e a troca de página virava um preto sem explicação. Ocupa a tela toda porque
   é isso que está acontecendo — meia tela fingiria que o resto do site continua
   ali.

   Tudo aqui é SVG e CSS, sem uma requisição. Esta tela só existe quando a rede
   está ruim, e buscar o logotipo no CDN bem nessa hora entrega um retângulo
   vazio — foi o que aconteceu na primeira versão.

   Indeterminada de propósito: o navegador não informa quanto falta de um
   módulo, então porcentagem aqui seria número inventado — travaria em 70%
   quando a rede cai e pularia pro fim quando a página chega. */
export function RouteLoading() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), APPEAR_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-[120ms]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <style>{`
        @keyframes pcyes-cell {
          0%, 55%, 100% { background: rgba(var(--foreground-rgb), 0.10); box-shadow: none; }
          20%           { background: var(--primary); box-shadow: 0 0 12px rgba(255,43,46,0.55); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcyes-cell { animation: none !important; background: var(--primary) !important; opacity: .45; }
        }
      `}</style>

      <div className="flex flex-col items-center">
        <PcyesMark size={54} className="text-primary" />

        {/* O "//" com tracking largo é o mesmo rótulo de seção que o site já usa
            (// SOBRE O PRODUTO). Custa zero requisição e não tem como ser de
            outra loja. */}
        <p
          className="mt-5 text-center font-bold text-primary"
          style={{ fontFamily: "var(--font-family-inter)", fontSize: "var(--text-caption)", letterSpacing: "0.3em" }}
        >
          // CARREGANDO DADOS
        </p>

        {/* Células inclinadas em vez de barra lisa: a inclinação é a mesma do
            logotipo da PCYES, e a onda percorrendo célula a célula lê como HUD
            em vez de progresso de instalador. */}
        <div className="mt-4 flex items-center justify-center gap-[3px]" aria-hidden="true">
          {Array.from({ length: CELLS }, (_, i) => (
            <span
              key={i}
              className="pcyes-cell h-[13px] w-[5px]"
              style={{
                transform: "skewX(-18deg)",
                background: "rgba(var(--foreground-rgb), 0.10)",
                animation: `pcyes-cell ${SWEEP_MS}ms linear infinite`,
                animationDelay: `${(i * SWEEP_MS) / (CELLS * 2.2)}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="sr-only">Carregando a página…</p>
    </div>
  );
}
