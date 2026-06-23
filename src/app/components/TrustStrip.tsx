import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "motion/react";
import { Truck, CreditCard, ShieldCheck, RefreshCcw, type LucideIcon } from "lucide-react";

type Feature = { icon: LucideIcon; title: string; desc: string };

const features: Feature[] = [
  { icon: Truck,        title: "Frete grátis",       desc: "Acima de R$ 299 pra todo Brasil" },
  { icon: CreditCard,   title: "Até 12x sem juros",  desc: "Em todos os cartões" },
  { icon: ShieldCheck,  title: "Compra 100% segura", desc: "Pagamento criptografado" },
  { icon: RefreshCcw,   title: "Troca grátis",       desc: "7 dias para devolver" },
];

// Pair features into two-item pages for the mobile next-page button.
const mobilePages: Feature[][] = [features.slice(0, 2), features.slice(2, 4)];

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div className="group flex flex-col items-center justify-start gap-2 text-center md:flex-row md:items-center md:gap-4 md:text-left">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-edge bg-surface-glass transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 md:h-14 md:w-14">
        <f.icon
          strokeWidth={1.6}
          aria-hidden="true"
          className="size-4 text-ink-muted transition-colors duration-300 group-hover:text-primary md:size-[22px]"
        />
      </div>
      <div className="min-w-0">
        <p
          className="text-ink-strong leading-tight"
          style={{
            fontFamily: "var(--font-family-figtree)",
            fontSize: "clamp(13px, 3.4vw, 16px)",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {f.title}
        </p>
        {/* Description shows from md+ only — keeps mobile compact while desktop keeps the E-EAT detail. */}
        <p
          className="hidden md:block text-ink-muted"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.4,
          }}
        >
          {f.desc}
        </p>
      </div>
    </div>
  );
}

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const [page, setPage] = useState(0);

  // Mobile: auto-rotate the two pages every 2s. No arrow, no timer/dots —
  // the strip just cycles on its own. Honors reduced-motion (freezes).
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % mobilePages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className="border-y border-edge-subtle px-5 py-6 md:px-[72px] md:pt-7 md:pb-12"
      style={{ background: "var(--surface-0)" }}
    >
      {/* Mobile: 2 cards visible, auto-rotating between the two pairs every 2s.
          No arrow, no dots, no timer — the surface cycles on its own. */}
      <div className="md:hidden mx-auto max-w-[640px]">
        <div className="relative min-h-[88px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-x-4 gap-y-5"
            >
              {mobilePages[page].map((f) => (
                <FeatureCard key={f.title} f={f} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop / tablet: full 4-up grid, no carousel. */}
      <div className="hidden mx-auto max-w-[1200px] md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06 * i }}
          >
            <FeatureCard f={f} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
