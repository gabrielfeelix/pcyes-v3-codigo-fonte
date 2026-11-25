import { useEffect } from "react";

/**
 * Collab PCYES × LOUD — a página escolhida (versão curta: hero, história, vídeo + parceria, vitrine).
 *
 * A página é estática e mora em public/collab/loud/a.html (fonte: ux/empresas/pcyes/collab-loud-lp).
 * A rota /loud só leva até ela com navegação normal: é HTML próprio, não rota do React.
 * (A versão B continua em /collab/loud/b.html, fora do menu.)
 */
const PAGINA = "/collab/loud/a.html";

export function LoudCollabPage() {
  useEffect(() => {
    window.location.replace(PAGINA);
  }, []);
  return (
    <main className="min-h-screen bg-black" aria-busy="true">
      <noscript>
        <a href={PAGINA}>PCYES × LOUD</a>
      </noscript>
    </main>
  );
}
