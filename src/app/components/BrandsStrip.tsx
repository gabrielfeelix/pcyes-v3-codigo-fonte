import { useRef } from "react";
import { motion, useInView } from "motion/react";

const brands = [
  "PCYES",
  "ARKEUM",
  "KIRIN",
  "KUROMORI",
  "FALLEN",
  "VOYAGER",
  "BLACK VULCAN",
  "WHITE GHOST",
];

export function BrandsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="border-y border-edge-subtle px-5 py-10 md:px-[72px]"
      style={{ background: "var(--surface-0)" }}
    >
      <div className="mx-auto max-w-[1760px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center text-ink-subtle"
          style={{
            fontFamily: "var(--font-family-inter)",
            fontSize: "var(--text-caption)",
            fontWeight: 500,
            letterSpacing: "0.28em",
          }}
        >
          MARCAS QUE VOCÊ ENCONTRA AQUI
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 md:gap-x-16">
          {brands.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className="text-ink-subtle transition-colors hover:text-ink cursor-default"
              style={{
                fontFamily: "var(--font-family-figtree)",
                fontSize: "clamp(16px, 1.6vw, 19px)",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
