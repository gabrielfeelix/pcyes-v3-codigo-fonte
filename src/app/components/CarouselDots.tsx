import { useEffect, useRef, useState, type RefObject } from "react";

interface CarouselDotsProps {
  /** ref to the horizontally-scrollable track element */
  trackRef: RefObject<HTMLElement>;
  /** extra classes for the wrapper */
  className?: string;
}

export function CarouselDots({ trackRef, className = "" }: CarouselDotsProps) {
  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const recalc = () => {
      const pageW = el.clientWidth;
      const count = pageW > 0 ? Math.ceil(el.scrollWidth / pageW) : 0;
      setPages(count > 1 ? count : 0);
      setActive(pageW > 0 ? Math.round(el.scrollLeft / pageW) : 0);
    };

    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(recalc);
    };

    recalc();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [trackRef]);

  if (pages < 2) return null;

  return (
    <div className={`flex justify-center gap-2 md:hidden ${className}`}>
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          aria-label={`Ir para página ${i + 1}`}
          onClick={() => {
            const el = trackRef.current;
            if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
          }}
          className="flex h-11 w-6 items-center justify-center"
        >
          <span
            className="block rounded-full transition-all"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? "var(--primary)" : "rgba(var(--foreground-rgb), 0.2)",
            }}
          />
        </button>
      ))}
    </div>
  );
}
