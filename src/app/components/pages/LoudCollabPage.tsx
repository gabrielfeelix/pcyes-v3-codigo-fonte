import { useEffect } from "react";

/**
 * Collab PCYES × LOUD — página oficial (versão A, aprovada 26/11: hero, vitrine, história, faixa, vídeo + parceria).
 *
 * A página é estática e mora em public/collab/loud/a.html (fonte: ux/empresas/pcyes/collab-loud-lp).
 * A rota /loud só leva até ela com navegação normal: é HTML próprio, não rota do React.
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
