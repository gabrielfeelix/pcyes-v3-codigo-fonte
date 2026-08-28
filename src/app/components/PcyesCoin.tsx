import { useId } from "react";

export function PcyesCoin({ size = 18 }: { size?: number }) {
  /* Cada moeda precisa dos SEUS gradientes. Com id fixo (`pcoin-grad-shared`),
     toda instância na página declarava o mesmo `<defs>`: `url(#id)` resolve
     para o PRIMEIRO nó com aquele id no documento, então todas as moedas
     pintavam com o def de uma só. Quando essa instância saía do DOM — fechar o
     drawer do carrinho — as outras ficavam apontando para um def que não existe
     mais e a moeda perdia o ouro, virando um disco preto com contorno. Era o
     bug da pílula da PDP: funcionava com a sidebar aberta, quebrava ao fechar.

     `useId()` dá um id por instância. O `replace` tira os `:` que o React usa,
     que não valem em seletor CSS e complicam `querySelector`. */
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `pcoin-grad-${uid}`;
  const shineId = `pcoin-shine-${uid}`;

  return (
    /* `shrink-0`: dentro de um flex apertado a moeda achatava e virava um
       ovalzinho sem brilho — foi o que aconteceu no chip da PDP. */
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id={shineId} cx="30%" cy="25%" r="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill={`url(#${gradId})`} stroke="#92400e" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="11" fill="none" stroke="#92400e" strokeWidth="0.7" strokeDasharray="1.5 1.2" opacity="0.45" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily="var(--font-family-figtree), system-ui, sans-serif"
        fontSize="14"
        fontWeight="900"
        fill="#7c2d12"
        letterSpacing="-0.04em"
      >
        P
      </text>
      <ellipse cx="12" cy="11" rx="4.5" ry="3" fill={`url(#${shineId})`} />
    </svg>
  );
}
