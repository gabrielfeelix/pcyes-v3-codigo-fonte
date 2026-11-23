/**
 * Collab Drop Dead × PCYES — o jogo DROP LINE ocupa a página.
 *
 * O jogo é estático (Canvas 2D) e mora em public/collab/dropdead/jogo/.
 * A fonte de verdade fica em projetos/collab-dropdead/jogo; para atualizar,
 * rode projetos/collab-dropdead/jogo/tools/publicar_v3.sh.
 */
export function DropDeadCollabPage() {
  return (
    <section
      aria-label="DROP LINE — jogo da collab PCYES × Drop Dead"
      style={{ background: "#F3EEE2", width: "100%", height: "calc(100dvh - var(--navbar-h, 72px))", minHeight: 520 }}
    >
      <iframe
        src="/collab/dropdead/jogo/index.html"
        title="DROP LINE — PCYES × Drop Dead"
        allow="autoplay; fullscreen"
        style={{ border: 0, width: "100%", height: "100%", display: "block" }}
      />
    </section>
  );
}
