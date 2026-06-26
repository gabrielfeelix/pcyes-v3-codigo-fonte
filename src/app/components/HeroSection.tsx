"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Slide {
  /** Desktop / default image. Used when `srcMobile` is absent or viewport is >= md. */
  src: string;
  /** Optional mobile-specific art. Use a vertically taller crop for mobile-first reading. */
  srcMobile?: string;
  href: string;
  alt: string;
}

/**
 * Each slide can also declare `srcMobile` for a vertically taller crop.
 * Today we ship only desktop art; uncomment the mobile entries once the
 * mobile-cropped files exist in /public/assets — otherwise <picture>
 * would 404 on small viewports.
 */
const slides: Slide[] = [
  { src: "/assets/banner-1.webp", href: "/produtos", alt: "Nova Coleção Performance 2026" },
  { src: "/assets/banner-2.webp", href: "/produtos?category=Periféricos", alt: "Equipamentos para streamers" },
  { src: "/assets/banner-3.webp", href: "/monte-seu-pc", alt: "Builds prontas pra dominar" },
];

const SLIDE_DURATION = 6500;
const slideGap = "clamp(14px, 4vw, 44px)";

export function HeroSection() {
  const N = slides.length;
  // Triple buffer for infinite loop
  const items = useMemo(() => [...slides, ...slides, ...slides], []);
  const [pos, setPos] = useState(N);
  const [skip, setSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  // WCAG 2.2.2 Pause/Stop/Hide — user can pause the auto-advance carousel.
  // Auto-pauses when reduced motion is set or when the carousel has focus.
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState<boolean>(false);
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const isAutoplayDisabled = paused || hasFocus || !!prefersReducedMotion;

  const activeIdx = ((pos % N) + N) % N;

  const goPrev = useCallback(() => {
    setSkip(false);
    setPos((p) => p - 1);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goNext = useCallback(() => {
    setSkip(false);
    setPos((p) => p + 1);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const delta = idx - activeIdx;
      setSkip(false);
      setPos((p) => p + delta);
      setProgress(0);
      startTimeRef.current = Date.now();
    },
    [activeIdx],
  );

  // Auto-advance timer with progress bar (pauses on user request / focus / reduced motion).
  useEffect(() => {
    if (isAutoplayDisabled) {
      // Freeze the progress bar where it sits.
      return;
    }
    startTimeRef.current = Date.now() - progress * SLIDE_DURATION;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(p);
      if (p >= 1) goNext();
    }, 50);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, goNext, isAutoplayDisabled]);

  // Snap back from buffer edges (invisible)
  const handleSettled = () => {
    if (pos >= 2 * N) {
      setSkip(true);
      setPos(pos - N);
    } else if (pos < N) {
      setSkip(true);
      setPos(pos + N);
    }
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const threshold = 60;
    const swipe = info.offset.x + info.velocity.x * 0.25;
    if (swipe < -threshold) goNext();
    else if (swipe > threshold) goPrev();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Banners promocionais"
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        // Only release when focus leaves the section entirely.
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHasFocus(false);
      }}
      onMouseEnter={() => setHasFocus(true)}
      onMouseLeave={() => setHasFocus(false)}
      className="relative overflow-x-hidden pb-4 md:pb-8 pt-[calc(80px+var(--announce-h))] md:pt-[calc(170px+var(--announce-h))] notebook:pt-[calc(108px+var(--announce-h))]"
      style={{ background: "var(--surface-0)" }}
    >
      {/* Carousel track. Heights:
            mobile:   clamp(460px, 115vw, 620px), capped to 78dvh so it never
                      eats more than the viewport's safe area. Tall enough
                      to read the artwork copy on phone portrait.
            desktop:  clamp(300px, 48vw, 600px), capped to 60dvh on shorter
                      notebooks so the TrustStrip stays in the first fold. */}
      <div className="relative">
        <div className="overflow-hidden h-[min(clamp(460px,115vw,620px),78dvh)] md:h-[min(clamp(300px,48vw,600px),60dvh)]">
          <motion.div
            className="flex h-full"
            style={{ gap: slideGap, paddingLeft: "0px", paddingRight: "0px" }}
            animate={{
              x: `calc(${-pos} * (82% + ${slideGap}) + 9%)`,
            }}
            transition={
              skip
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            onAnimationComplete={handleSettled}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {items.map((slide, i) => {
              const isActive = i === pos;
              return (
                <Link
                  key={i}
                  to={slide.href}
                  draggable={false}
                  className={`hero-card flex-shrink-0 relative h-full block cursor-grab active:cursor-grabbing ${isActive ? "hero-card--active" : ""}`}
                  style={{
                    width: "82%",
                    borderRadius: "var(--radius-card-xl)",
                  }}
                >
                  <div
                    className="relative h-full w-full overflow-hidden"
                    style={{ borderRadius: "var(--radius-card-xl)" }}
                  >
                    {/* <picture> lets the browser pick the correct art per viewport.
                        Mobile crop (vertically taller) below 768px, desktop crop above. */}
                    <picture>
                      {slide.srcMobile && <source media="(max-width: 767px)" srcSet={slide.srcMobile} />}
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        draggable={false}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        className="h-full w-full object-cover pointer-events-none select-none"
                        style={{
                          WebkitUserDrag: "none",
                          objectPosition: "center 25%",
                          filter: isActive ? "none" : "brightness(0.35) saturate(0.7)",
                          transition: "filter 320ms ease",
                        } as React.CSSProperties}
                      />
                    </picture>
                  </div>
                  {/* Gradient stroke — gray default, red on hover */}
                  <div
                    className="hero-card-stroke pointer-events-none absolute inset-0"
                    style={{
                      borderRadius: "var(--radius-card-xl)",
                      padding: "2px",
                      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      transition: "background 320ms ease",
                    }}
                  />
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Side arrows */}
        <button
          onClick={goPrev}
          aria-label="Anterior"
          className="absolute top-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            left: "9%",
            transform: "translate(-50%, -50%)",
            background: "rgba(48, 48, 52, 0.92)",
            border: "1px solid rgba(var(--foreground-rgb), 0.18)",
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 28px -8px rgba(0,0,0,0.6)",
          }}
        >
          <ChevronLeft size={18} strokeWidth={2.2} className="md:hidden" />
          <ChevronLeft size={20} strokeWidth={2.2} className="hidden md:block" />
        </button>
        <button
          onClick={goNext}
          aria-label="Próximo"
          className="absolute top-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            right: "9%",
            transform: "translate(50%, -50%)",
            background: "rgba(48, 48, 52, 0.92)",
            border: "1px solid rgba(var(--foreground-rgb), 0.18)",
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 28px -8px rgba(0,0,0,0.6)",
          }}
        >
          <ChevronRight size={18} strokeWidth={2.2} className="md:hidden" />
          <ChevronRight size={20} strokeWidth={2.2} className="hidden md:block" />
        </button>
      </div>

      {/* Dots BELOW the carousel + WCAG 2.2.2 pause toggle */}
      <div className="mt-4 md:mt-7 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Retomar carrossel" : "Pausar carrossel"}
          aria-pressed={paused}
          className="mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink-strong hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
        >
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
        {slides.map((_, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex h-11 cursor-pointer items-center justify-center px-1.5"
              aria-label={`Banner ${i + 1}`}
            >
              <span
                className="relative block overflow-hidden rounded-full transition-all duration-500"
                style={{
                  height: "8px",
                  width: isActive ? "44px" : "10px",
                  background: isActive ? "rgba(var(--foreground-rgb), 0.18)" : "rgba(var(--foreground-rgb), 0.25)",
                }}
              >
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress * 100}%`,
                      background: "linear-gradient(90deg, var(--primary) 0%, #ff2419 100%)",
                      boxShadow: "0 0 10px rgba(225,6,0,0.6)",
                      transition: "width 50ms linear",
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
