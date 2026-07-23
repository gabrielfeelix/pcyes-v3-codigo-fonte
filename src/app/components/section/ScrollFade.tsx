import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  /** Altura do esmaecido, em px. */
  size?: number;
  /** Rótulo da região rolável (lido por leitor de tela). */
  label?: string;
}

/**
 * Área rolável com esmaecido nas bordas indicando que há mais conteúdo.
 *
 * Por que existe: listas com `scrollbar-width: none` escondem a barra, então
 * nada indica que o conteúdo continua — o item seguinte parece simplesmente
 * não existir. O fade devolve essa pista sem trazer a barra de volta.
 *
 * Usa `mask-image` (e não um degradê sobreposto) para não precisar conhecer a
 * cor de fundo do container: o próprio conteúdo desvanece.
 *
 * A11y: um container rolável precisa ser alcançável por teclado, senão quem
 * navega sem mouse não consegue rolá-lo (WCAG 2.1.1). Recebe `tabindex="0"` e
 * `role="region"` apenas enquanto há transbordo.
 */
export function ScrollFade({ children, className = "", size = 28, label }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(true);
  const [overflows, setOverflows] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const max = scrollHeight - clientHeight;
    setOverflows(max > 1);
    setAtTop(scrollTop <= 1);
    setAtBottom(scrollTop >= max - 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    // Itens entram/saem da lista sem redimensionar o container.
    const mutation = new MutationObserver(update);
    mutation.observe(el, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [update]);

  const top = atTop ? 0 : size;
  const bottom = atBottom ? 0 : size;
  const mask =
    `linear-gradient(to bottom, transparent 0, #000 ${top}px,` +
    ` #000 calc(100% - ${bottom}px), transparent 100%)`;

  return (
    <div
      ref={ref}
      onScroll={update}
      className={className}
      tabIndex={overflows ? 0 : undefined}
      role={overflows ? "region" : undefined}
      aria-label={overflows ? label : undefined}
      style={{
        scrollbarWidth: "none",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      {children}
    </div>
  );
}
