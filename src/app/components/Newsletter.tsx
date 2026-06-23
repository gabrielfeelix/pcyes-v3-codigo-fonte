"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, CTAButton } from "./section";

export function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3500);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 md:px-[72px]"
      style={{
        background: "var(--surface-0)",
        paddingTop: "var(--space-section-lg)",
        paddingBottom: "var(--space-section-lg)",
      }}
    >
      {/* Backdrop glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(700px 400px at 50% 50%, rgba(225, 6, 0, 0.10) 0%, transparent 60%)",
        }}
      />
      {/* Faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--foreground-rgb), 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--foreground-rgb), 0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto w-full" style={{ maxWidth: "720px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Label */}
          <Eyebrow style={{ marginBottom: "16px" }}>FIQUE POR DENTRO</Eyebrow>

          {/* Headline */}
          <h2
            className="text-ink-strong mb-4"
            style={{
              fontFamily: "var(--font-family-figtree)",
              fontSize: "clamp(26px, 7vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
          >
            Drops, ofertas e novidades{" "}
            <span style={{ color: "rgba(var(--foreground-rgb), 0.45)" }}>direto no seu inbox.</span>
          </h2>

          {/* Subtitle */}
          <p
            className="mx-auto mb-10"
            style={{
              fontFamily: "var(--font-family-inter)",
              fontSize: "var(--text-base)",
              lineHeight: 1.55,
              color: "rgba(var(--foreground-rgb), 0.55)",
              maxWidth: "440px",
            }}
          >
            Lançamentos exclusivos e cupons antes de qualquer um.
          </p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5"
                style={{
                  background: "linear-gradient(135deg, rgba(225, 6, 0, 0.12) 0%, rgba(225, 6, 0, 0.04) 100%)",
                  border: "1px solid rgba(225, 6, 0, 0.4)",
                  boxShadow: "0 0 0 4px rgba(225, 6, 0, 0.04), 0 12px 28px -8px rgba(225, 6, 0, 0.35)",
                }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{
                    background: "var(--gradient-brand)",
                    color: "white",
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                <span
                  className="text-ink-strong"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                  }}
                >
                  Você está dentro. Fica esperto no inbox.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="mx-auto"
                style={{ maxWidth: "520px" }}
              >
                {/* Mobile: stacked column; Desktop (md+): single pill row */}
                <div className="flex flex-col gap-3 md:hidden">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-transparent text-ink-strong placeholder:text-ink-subtle outline-none rounded-full min-h-[44px] px-5"
                    style={{
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-sm)",
                      background: "rgba(var(--foreground-rgb), 0.04)",
                      border: "1px solid rgba(var(--foreground-rgb), 0.10)",
                      boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.04)",
                    }}
                  />
                  <CTAButton type="submit" variant="brand" size="md" block className="min-h-[44px] cursor-pointer">
                    Assinar <ArrowRight size={13} strokeWidth={2.4} />
                  </CTAButton>
                </div>

                {/* Desktop pill (hidden on mobile) */}
                <div
                  className="group hidden md:flex items-center overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 focus-within:scale-[1.01]"
                  style={{
                    background: "rgba(var(--foreground-rgb), 0.04)",
                    border: "1px solid rgba(var(--foreground-rgb), 0.10)",
                    boxShadow: "inset 0 1px 0 rgba(var(--foreground-rgb), 0.04)",
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="flex-1 bg-transparent text-ink-strong placeholder:text-ink-subtle outline-none"
                    style={{
                      fontFamily: "var(--font-family-inter)",
                      fontSize: "var(--text-sm)",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  />
                  <CTAButton type="submit" variant="brand" size="md" className="flex-shrink-0 cursor-pointer">
                    Assinar <ArrowRight size={13} strokeWidth={2.4} />
                  </CTAButton>
                </div>

                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-family-inter)",
                    fontSize: "var(--text-caption)",
                    color: "rgba(var(--foreground-rgb), 0.35)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Sem spam · Cancele quando quiser
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
