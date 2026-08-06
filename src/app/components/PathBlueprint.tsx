/**
 * Ilustrações das três portas do "Monte seu PC".
 *
 * Desenho técnico, não ícone: traço fino sobre grade milimetrada, como planta de
 * engenharia. A razão é o que a página promete logo abaixo — "compatibilidade
 * garantida". Blueprint diz medida e encaixe; um ícone colorido diria só
 * "computador".
 *
 * Cada uma conta o caminho do próprio card, e as três compartilham a mesma
 * gramática (grade, cota, traço tracejado para o que é hipótese, traço cheio
 * para o que é decisão) para lerem como um conjunto:
 *
 *   builder — gabinete explodido: as peças existem, quem escolhe é você
 *   quiz    — três perguntas que convergem numa build só
 *   prontas — três máquinas idênticas, já carimbadas
 *
 * SVG inline em vez de arquivo: são três desenhos pequenos, herdam a cor do tema
 * por `currentColor` e escalam sem borrar. Como arquivo seriam três requisições
 * e uma cor chumbada que não acompanha o claro/escuro.
 *
 * `aria-hidden` nas três: são decoração. O que a porta faz está no título e na
 * descrição ao lado, que o leitor de tela já lê.
 *
 * ALTURA DA CAIXA: 118, não 132. O card desbota o rodapé da ilustração para ela
 * não terminar num corte seco, e com 132 a cota de baixo caía dentro do desbote
 * — desenhada e invisível. Nada aqui deve passar de y=110.
 *
 * ANIMAÇÃO: cada desenho tem um gesto que dispara em `group-data-[ativo]` — as
 * peças se afastam, o nó pulsa, as torres sobem. O gatilho é o atributo
 * `data-ativo` do card, NÃO `:hover`. Um dos três está sempre ativo, inclusive
 * antes de existir cursor na página (e no celular, onde nunca existe). Ver
 * `PathCard` em `MonteSeuPcPage`.
 */

const VIEW = "0 0 320 118";

/** Grade de fundo — a mesma nas três, com id próprio para não colidir. */
function Grade({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M8 0H0V8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.16" />
        </pattern>
      </defs>
      <rect width="320" height="118" fill={`url(#${id})`} />
    </>
  );
}

/** Cota de engenharia: linha entre dois traços verticais, com a medida em cima. */
function Cota({ x1, x2, label }: { x1: number; x2: number; label: string }) {
  return (
    <g stroke="currentColor" strokeWidth="0.75" opacity="0.55">
      <path d={`M${x1} 101v6M${x2} 101v6M${x1} 104H${x2}`} />
      <text
        x={(x1 + x2) / 2}
        y="98"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        style={{ fontFamily: "var(--font-family-inter)", fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.16em" }}
      >
        {label}
      </text>
    </g>
  );
}

const rotulo = {
  fontFamily: "var(--font-family-inter)",
  fontSize: "8px",
  fontWeight: 700,
  letterSpacing: "0.14em",
} as const;

/**
 * "Eu já sei o que quero" — gabinete em vista explodida.
 *
 * As peças saem do gabinete em vez de estarem dentro dele: o card é sobre
 * ESCOLHER cada uma. O tracejado é o caminho que a peça ainda vai fazer.
 */
export function BlueprintBuilder() {
  return (
    <svg viewBox={VIEW} className="h-full w-full text-primary" aria-hidden="true" role="presentation">
      <Grade id="grade-builder" />

      {/* Gabinete: caixa alta, painel frontal, grade de ventilação e botão. */}
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8">
        <rect x="22" y="14" width="62" height="76" rx="3" />
        <path d="M22 30H84" strokeWidth="0.8" opacity="0.7" />
        <path d="M30 40h18M30 47h18M30 54h18M30 61h12" strokeWidth="0.8" opacity="0.5" />
        <circle cx="74" cy="22" r="2.5" strokeWidth="0.8" />
      </g>

      {/* Trilhos: de onde cada peça sai. */}
      <g fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.42">
        <path d="M84 26H128" />
        <path d="M84 52H128" />
        <path d="M84 76H128" />
      </g>

      {/* As peças, já deslocadas para fora. No hover afastam mais um pouco —
          é o gesto da vista explodida acontecendo. */}
      <g
        className="transition-transform duration-500 group-data-[ativo]:translate-x-[7px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.9"
      >
        <rect x="128" y="16" width="126" height="20" rx="2.5" />
        <path d="M228 16v20M236 16v20M244 16v20" strokeWidth="0.7" opacity="0.55" />
        <text x="136" y="29.5" fill="currentColor" stroke="none" style={rotulo}>GPU</text>

        <rect x="128" y="42" width="70" height="20" rx="2.5" />
        <path d="M134 48h7M134 56h7M186 48h7M186 56h7" strokeWidth="0.7" opacity="0.55" />
        <text x="148" y="55.5" fill="currentColor" stroke="none" style={rotulo}>CPU</text>

        <rect x="128" y="68" width="98" height="16" rx="2" />
        <path d="M152 68v16M176 68v16M200 68v16" strokeWidth="0.7" opacity="0.5" />
        <text x="133" y="79.5" fill="currentColor" stroke="none" style={rotulo}>RAM</text>
      </g>

      <Cota x1={22} x2={254} label="VOCÊ ESCOLHE CADA UMA" />
    </svg>
  );
}

/**
 * "Me ajuda a escolher" — três perguntas que viram uma build.
 *
 * Tracejado antes do nó (ainda é pergunta), traço cheio depois (virou decisão).
 * É o quiz inteiro num desenho: três passos, uma saída.
 */
export function BlueprintQuiz() {
  return (
    <svg viewBox={VIEW} className="h-full w-full text-primary" aria-hidden="true" role="presentation">
      <Grade id="grade-quiz" />

      {/* As três perguntas. */}
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.75">
        {[18, 44, 70].map((y) => (
          <rect key={y} x="22" y={y} width="22" height="20" rx="2.5" />
        ))}
      </g>
      <g fill="currentColor" stroke="none" opacity="0.9" style={{ ...rotulo, fontSize: "11px" }}>
        <text x="33" y="32" textAnchor="middle">?</text>
        <text x="33" y="58" textAnchor="middle">?</text>
        <text x="33" y="84" textAnchor="middle">?</text>
      </g>

      {/* Caminhos convergindo. Tracejado: ainda é hipótese. */}
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3.5 3.5" opacity="0.5">
        <path d="M44 28H92q10 0 10 10v6q0 6 6 6" />
        <path d="M44 54H108" />
        <path d="M44 80H92q10 0 10-10v-6q0-6 6-6" />
      </g>

      {/* O nó da decisão. */}
      <circle cx="114" cy="54" r="5" fill="currentColor" opacity="0.95" />
      <circle
        cx="114"
        cy="54"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.45"
        className="origin-center transition-transform duration-500 group-data-[ativo]:scale-[1.35]"
      />

      {/* Daqui para a frente é decisão: traço cheio, com seta. */}
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.85">
        <path d="M124 54H176" />
        <path d="M170 50l6 4-6 4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* A build que sai do outro lado. Começa em y=30, e não no topo: este é o
          único card com o selo "POPULAR", que fica em `right-5 top-5` e passava
          por cima da caixa. */}
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.9">
        <rect x="182" y="30" width="76" height="60" rx="3" />
        <path d="M182 44h76" strokeWidth="0.8" opacity="0.7" />
        <path d="M190 54h60M190 63h60M190 72h38" strokeWidth="0.9" opacity="0.6" />
        <circle cx="248" cy="37" r="2.5" strokeWidth="0.8" />
      </g>

      <Cota x1={22} x2={258} label="3 PERGUNTAS · 1 BUILD" />
    </svg>
  );
}

/**
 * "Quero builds prontas" — três máquinas idênticas, já carimbadas.
 *
 * Idênticas de propósito: o argumento do card é padronização, não variedade.
 * O selo tracejado é o "montados e testados" que o texto promete.
 */
export function BlueprintPresets() {
  return (
    <svg viewBox={VIEW} className="h-full w-full text-primary" aria-hidden="true" role="presentation">
      <Grade id="grade-presets" />

      {/* Três torres com o mesmo desenho interno — a repetição é o recado. */}
      {[22, 86, 150].map((x, i) => (
        <g
          key={x}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.85"
          className="transition-transform duration-500 group-data-[ativo]:-translate-y-[4px]"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <rect x={x} y="16" width="52" height="72" rx="3" />
          <path d={`M${x} 32H${x + 52}`} strokeWidth="0.8" opacity="0.7" />
          <path d={`M${x + 9} 42h20M${x + 9} 50h20M${x + 9} 58h13`} strokeWidth="0.85" opacity="0.55" />
          <circle cx={x + 42} cy="24" r="2.5" strokeWidth="0.8" />
          <path d={`M${x + 9} 74h34`} strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}

      {/* Linha de base: as três assentadas no mesmo nível. */}
      <path
        d="M16 90H288"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 4"
        opacity="0.4"
      />

      {/* Carimbo de testado. */}
      <g className="origin-center transition-transform duration-500 group-data-[ativo]:rotate-[-8deg]">
        <circle
          cx="264"
          cy="42"
          r="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
        />
        <circle cx="264" cy="42" r="19" fill="currentColor" opacity="0.14" />
        <path
          d="M255 42l6 6 13-13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <Cota x1={22} x2={202} label="9 MONTADOS E TESTADOS" />
    </svg>
  );
}
