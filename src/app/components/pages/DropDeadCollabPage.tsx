import { useEffect, useRef, useState } from "react";

/**
 * Collab Drop Dead × PCYES — o jogo DROP LINE ocupa a página.
 *
 * O jogo é estático (Canvas 2D) e mora em public/collab/dropdead/jogo/.
 * A fonte de verdade fica em projetos/collab-dropdead/jogo-1; para atualizar,
 * rode projetos/collab-dropdead/jogo-1/tools/publicar_v3.sh.
 * O jogo tem botão próprio de tela cheia (e tecla F).
 */
export function DropDeadCollabPage({ src = "/collab/dropdead/jogo/index.html", title = "DROP LINE — PCYES × Drop Dead" }: { src?: string; title?: string } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [box, setBox] = useState({ pad: 0, h: 640 });

  // O cabeçalho da loja é fixo e fica por cima do conteúdo: mede a base dele
  // e faz o jogo ocupar exatamente o resto da janela.
  useEffect(() => {
    const fit = () => {
      let headerBottom = 0; // faixa promocional + cabeçalho podem ser blocos fixos separados
      for (let y = 4; y < 260; y += 24) {
        let el = document.elementFromPoint(window.innerWidth / 2, y) as HTMLElement | null;
        while (el && el !== document.body && !["fixed", "sticky"].includes(getComputedStyle(el).position)) el = el.parentElement;
        if (el && el !== document.body) headerBottom = Math.max(headerBottom, el.getBoundingClientRect().bottom);
      }
      const top = ref.current?.getBoundingClientRect().top ?? 0;
      const pad = Math.max(0, headerBottom - top);
      setBox({ pad, h: Math.max(480, window.innerHeight - Math.max(top + pad, 0)) });
    };
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 400); // cabeçalho termina de montar
    return () => { window.removeEventListener("resize", fit); clearTimeout(t); };
  }, []);

  return (
    <section ref={ref} aria-label={title}
      style={{ background: "#111", width: "100%", paddingTop: box.pad }}>
      <div style={{ height: box.h }}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ border: 0, width: "100%", height: "100%", display: "block" }}
      />
      </div>
    </section>
  );
}

/** Jogo 2 — DROP SESSION (half-pipe). Fonte: projetos/collab-dropdead/jogo-2 (tools/publicar_v3.sh). */
export function DropSessionCollabPage() {
  return <DropDeadCollabPage src="/collab/dropdead/jogo2/index.html" title="DROP SESSION — PCYES × Drop Dead" />;
}
