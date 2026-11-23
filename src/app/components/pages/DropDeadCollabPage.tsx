import { useEffect, useRef, useState } from "react";

/**
 * Collab Drop Dead × PCYES — o jogo DROP LINE ocupa a página.
 *
 * O jogo é estático (Canvas 2D) e mora em public/collab/dropdead/jogo/.
 * A fonte de verdade fica em projetos/collab-dropdead/jogo; para atualizar,
 * rode projetos/collab-dropdead/jogo/tools/publicar_v3.sh.
 * O jogo tem botão próprio de tela cheia (e tecla F).
 */
export function DropDeadCollabPage() {
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
    <section ref={ref} aria-label="DROP LINE — jogo da collab PCYES × Drop Dead"
      style={{ background: "#111", width: "100%", paddingTop: box.pad }}>
      <div style={{ height: box.h }}>
      <iframe
        src="/collab/dropdead/jogo/index.html"
        title="DROP LINE — PCYES × Drop Dead"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ border: 0, width: "100%", height: "100%", display: "block" }}
      />
      </div>
    </section>
  );
}
