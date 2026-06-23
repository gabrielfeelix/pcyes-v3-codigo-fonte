import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import {
  ArrowRight,
  Cpu,
  Fingerprint,
  Flag,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Footer } from "../components/Footer";

const FIGTREE = "var(--font-family-figtree)";
const INTER = "var(--font-family-inter)";

/* Shared reveal — staggered, eased entrance used on load and on scroll. */
const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const viewportOnce = { once: true, amount: 0.35 } as const;

/* ----------------------------- data ----------------------------- */

type Stat = { value: string; label: string };
const stats: Stat[] = [
  { value: "10+", label: "anos de experiência" },
  { value: "700+", label: "produtos no portfólio" },
  { value: "8.000+", label: "parceiros em todo o Brasil" },
];

type Value = {
  icon: typeof Cpu;
  title: string;
  desc: string;
};
const values: Value[] = [
  {
    icon: Cpu,
    title: "Inovação",
    desc: "Produtos com design próprio e engenharia sólida — pensados do zero para entregar performance real.",
  },
  {
    icon: Fingerprint,
    title: "Autenticidade",
    desc: "Identidade brasileira, sem copiar ninguém. Uma marca que tem cara, voz e atitude próprias.",
  },
  {
    icon: Sparkles,
    title: "Acessibilidade",
    desc: "Preço justo, performance ao alcance de todos. Tecnologia de ponta não precisa ser inacessível.",
  },
];

type Milestone = { year: string; title: string; desc: string };
const milestones: Milestone[] = [
  {
    year: "2010",
    title: "O começo de tudo",
    desc: "Fundação por dois irmãos, movidos pela paixão por videogames e o desejo de criar uma marca de performance 100% brasileira.",
  },
  {
    year: "2012",
    title: "Primeiros periféricos",
    desc: "Lançamento dos primeiros produtos, com qualidade e design voltado inteiramente ao gamer.",
  },
  {
    year: "2016",
    title: "Reconhecimento",
    desc: "A marca ganha reconhecimento, participa de eventos de tecnologia e se firma entre os líderes do setor.",
  },
  {
    year: "2019",
    title: "Novos horizontes",
    desc: "Portfólio expande para produtos ergonômicos e de performance para ambientes profissionais.",
  },
  {
    year: "2023",
    title: "Estrutura própria",
    desc: "Inauguração de infraestrutura própria de produção e logística — mais controle, mais agilidade.",
  },
  {
    year: "2025",
    title: "Referência nacional",
    desc: "Consolidada como referência nacional em performance, design e tecnologia.",
  },
];

/* --------------------------- subcomponents --------------------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-ink-strong uppercase"
      style={{
        fontFamily: INTER,
        fontSize: "var(--text-caption)",
        letterSpacing: "0.22em",
        fontWeight: 700,
        boxShadow: "0 8px 26px -6px rgba(255,43,46,0.55)",
      }}
    >
      {children}
    </span>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex w-fit items-center gap-2 uppercase text-primary"
      style={{
        fontFamily: INTER,
        fontSize: "var(--text-caption)",
        letterSpacing: "0.28em",
        fontWeight: 700,
      }}
    >
      <span className="h-px w-6 bg-primary/60" />
      {children}
    </span>
  );
}

/* ------------------------------ page ------------------------------ */

export function QuemSomosPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroGlowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-[96px] md:pt-[182px]"
        style={{ background: "var(--surface-0)" }}
      >
        {/* atmospheric red radial mesh */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            y: heroGlowY,
            opacity: heroFade,
            background:
              "radial-gradient(620px 420px at 78% 12%, rgba(255,43,46,0.22), transparent 70%), radial-gradient(560px 480px at 12% 88%, rgba(255,43,46,0.10), transparent 72%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
            maskImage:
              "radial-gradient(720px 520px at 50% 30%, black, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(to bottom, transparent, #0e0e0e)",
          }}
        />

        <div className="relative mx-auto max-w-[1434px] px-5 pb-16 pt-10 md:px-12 md:pb-36 md:pt-24">
          <motion.div
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={reveal} custom={0}>
              <Badge>Quem Somos</Badge>
            </motion.div>

            <motion.h1
              variants={reveal}
              custom={1}
              className="mt-8 max-w-[16ch] text-ink-strong"
              style={{
                fontFamily: FIGTREE,
                fontSize: "clamp(34px, 6.4vw, 92px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.04,
              }}
            >
              Existimos para você{" "}
              <span className="relative whitespace-normal md:whitespace-nowrap">
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #ff2b2e 0%, #ff5558 55%, #ff2b2e 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 60px rgba(255,43,46,0.45)",
                  }}
                >
                  power up
                </span>{" "}
                your game.
              </span>
            </motion.h1>

            <motion.p
              variants={reveal}
              custom={2}
              className="mt-7 max-w-[58ch] text-ink-muted"
              style={{
                fontFamily: INTER,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.65,
              }}
            >
              A PCYES é uma marca brasileira de performance — nascida da paixão
              por videogames e construída para quem leva o próprio setup a
              sério. Hardware, periféricos e tecnologia para elevar cada jogada.
            </motion.p>

            <motion.div
              variants={reveal}
              custom={3}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/produtos"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-ink-strong transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] min-h-[44px] md:w-auto md:justify-start"
                style={{
                  fontFamily: INTER,
                  fontSize: "var(--text-sm)",
                  fontWeight: 700,
                  boxShadow: "0 16px 40px -12px rgba(255,43,46,0.6)",
                }}
              >
                Conhecer a loja
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/monte-seu-pc"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-edge bg-white/[0.03] px-7 py-3.5 text-ink transition-colors duration-300 hover:border-edge-strong hover:text-ink-strong active:scale-[0.98] min-h-[44px] md:w-auto md:justify-start"
                style={{ fontFamily: INTER, fontSize: "var(--text-sm)", fontWeight: 700 }}
              >
                Montar meu PC
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================== STORY ============================== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--surface-0)" }}
      >
        <div className="mx-auto max-w-[1434px] px-5 py-24 md:px-12 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <SectionEyebrow>Nossa história</SectionEyebrow>
              <h2
                className="mt-6 max-w-[16ch] text-ink-strong"
                style={{
                  fontFamily: FIGTREE,
                  fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.06,
                }}
              >
                Feita no Brasil, pensada para o mundo.
              </h2>
              <div
                className="mt-7 flex flex-col gap-5 text-ink-muted"
                style={{ fontFamily: INTER, fontSize: "var(--text-base)", lineHeight: 1.7 }}
              >
                <p>
                  A marca PCYES nasceu da paixão de dois irmãos por videogames,
                  com o desejo de criar uma marca de performance 100%
                  brasileira — sem depender de fórmulas importadas, sem abrir
                  mão de qualidade.
                </p>
                <p>
                  O que começou como um sonho de garagem virou referência. Hoje
                  a PCYES é uma comunidade que desafia padrões e cria soluções
                  para quem vive a performance no máximo — do primeiro setup ao
                  rig dos sonhos.
                </p>
              </div>
            </motion.div>

            {/* Quote panel — refined dark glass card */}
            <motion.figure
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              custom={1}
              className="relative overflow-hidden rounded-2xl border border-edge bg-white/[0.03] p-8 md:p-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,43,46,0.28), transparent 70%)",
                }}
              />
              <span
                aria-hidden
                className="block text-primary/40"
                style={{
                  fontFamily: FIGTREE,
                  fontSize: "120px",
                  fontWeight: 700,
                  lineHeight: 0.6,
                }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative mt-2 text-ink-strong"
                style={{
                  fontFamily: FIGTREE,
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                }}
              >
                Não copiamos ninguém. Criamos uma marca brasileira de
                performance — para quem joga, cria e exige o máximo.
              </blockquote>
              <figcaption
                className="mt-7 flex items-center gap-3 text-ink-muted"
                style={{
                  fontFamily: INTER,
                  fontSize: "var(--text-caption)",
                  letterSpacing: "0.04em",
                }}
              >
                <span className="h-px w-8 bg-primary/60" />
                Essência PCYES
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ============================== STATS ============================== */}
      <section
        className="relative overflow-hidden border-y border-edge"
        style={{ background: "var(--surface-0)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 360px at 50% 0%, rgba(255,43,46,0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1434px] px-5 py-20 md:px-12 md:py-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-12 flex flex-col items-center text-center"
          >
            <SectionEyebrow>Em números</SectionEyebrow>
            <p
              className="mt-5 max-w-[52ch] text-ink-muted"
              style={{ fontFamily: INTER, fontSize: "var(--text-base)", lineHeight: 1.6 }}
            >
              Mais de uma década construindo uma marca de performance — e parte
              do{" "}
              <span className="text-ink" style={{ fontWeight: 600 }}>
                Grupo Oderço
              </span>
              , uma das maiores estruturas de tecnologia do país.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-edge bg-white/[0.03] p-8 text-center transition-colors duration-300 hover:border-primary/40 md:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-12 h-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 100%, rgba(255,43,46,0.3), transparent 70%)",
                  }}
                />
                <div
                  className="relative tabular-nums text-ink-strong"
                  style={{
                    fontFamily: FIGTREE,
                    fontSize: "clamp(40px, 6vw, 76px)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="relative mt-3 text-ink-muted"
                  style={{
                    fontFamily: INTER,
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== VALUES ============================== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--surface-0)" }}
      >
        <div className="mx-auto max-w-[1434px] px-5 py-24 md:px-12 md:py-32">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="max-w-[44ch]"
          >
            <SectionEyebrow>No que acreditamos</SectionEyebrow>
            <h2
              className="mt-6 text-ink-strong"
              style={{
                fontFamily: FIGTREE,
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
              }}
            >
              Três pilares que guiam cada produto.
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  custom={i}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-edge bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-10"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,43,46,0.22), transparent 70%)",
                    }}
                  />
                  <span
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 text-primary"
                    style={{ background: "rgba(255,43,46,0.10)" }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <h3
                    className="relative mt-6 text-ink-strong"
                    style={{
                      fontFamily: FIGTREE,
                      fontSize: "var(--text-xl)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="relative mt-3 text-ink-muted"
                    style={{
                      fontFamily: INTER,
                      fontSize: "var(--text-base)",
                      lineHeight: 1.65,
                    }}
                  >
                    {value.desc}
                  </p>
                  <span
                    aria-hidden
                    className="relative mt-6 text-ink-subtle tabular-nums"
                    style={{
                      fontFamily: FIGTREE,
                      fontSize: "var(--text-sm)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    0{i + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== TIMELINE ============================== */}
      <section
        className="relative overflow-hidden border-y border-edge"
        style={{ background: "var(--surface-0)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 420px at 85% 10%, rgba(255,43,46,0.10), transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-[1434px] px-5 py-24 md:px-12 md:py-32">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-16 max-w-[44ch]"
          >
            <SectionEyebrow>Linha do tempo</SectionEyebrow>
            <h2
              className="mt-6 text-ink-strong"
              style={{
                fontFamily: FIGTREE,
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
              }}
            >
              De uma garagem a referência nacional.
            </h2>
          </motion.div>

          <div className="relative">
            {/* vertical rail */}
            <div
              aria-hidden
              className="absolute left-[13px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,43,46,0.5) 12%, rgba(255,43,46,0.5) 88%, transparent)",
              }}
            />

            <div className="flex flex-col gap-10 md:gap-14">
              {milestones.map((milestone, i) => {
                const isRight = i % 2 === 1;
                return (
                  <motion.div
                    key={milestone.year}
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="relative grid grid-cols-[28px_1fr] items-start gap-3 md:grid-cols-[1fr_40px_1fr] md:gap-8"
                  >
                    {/* left column (desktop) */}
                    <div
                      className={
                        isRight
                          ? "hidden md:block"
                          : "hidden md:flex md:justify-end"
                      }
                    >
                      {!isRight && (
                        <MilestoneCard milestone={milestone} align="right" />
                      )}
                    </div>

                    {/* node */}
                    <div className="relative flex justify-center pt-1.5 md:col-start-2">
                      <span className="relative flex h-10 w-10 items-center justify-center">
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(255,43,46,0.35), transparent 70%)",
                          }}
                        />
                        <span
                          className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary"
                          style={{
                            boxShadow:
                              "0 0 0 4px rgba(255,43,46,0.18), 0 0 18px rgba(255,43,46,0.55)",
                          }}
                        />
                      </span>
                    </div>

                    {/* right column (desktop) / single column (mobile) */}
                    <div className={isRight ? "md:block" : "md:hidden"}>
                      <MilestoneCard milestone={milestone} align="left" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== CLOSING CTA ============================== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--surface-0)" }}
      >
        <div className="mx-auto max-w-[1434px] px-5 py-24 md:px-12 md:py-32">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-2xl border border-edge bg-white/[0.03] px-7 py-16 text-center md:px-16 md:py-24"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(560px 320px at 50% 0%, rgba(255,43,46,0.22), transparent 72%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,43,46,0.6), transparent)",
              }}
            />

            <div className="relative flex flex-col items-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 text-primary"
                style={{ background: "rgba(255,43,46,0.10)" }}
              >
                <Flag size={22} strokeWidth={1.8} />
              </span>
              <h2
                className="mt-7 max-w-[20ch] text-ink-strong"
                style={{
                  fontFamily: FIGTREE,
                  fontSize: "clamp(30px, 4vw, 54px)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.07,
                }}
              >
                Pronto para dar power up no seu game?
              </h2>
              <p
                className="mt-5 max-w-[54ch] text-ink-muted"
                style={{ fontFamily: INTER, fontSize: "var(--text-base)", lineHeight: 1.65 }}
              >
                Explore o portfólio completo PCYES ou monte a máquina perfeita
                para o seu jeito de jogar, criar e produzir.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/produtos"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-ink-strong transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] min-h-[44px] md:w-auto md:justify-start"
                  style={{
                    fontFamily: INTER,
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    boxShadow: "0 16px 40px -12px rgba(255,43,46,0.6)",
                  }}
                >
                  Explorar a loja
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/monte-seu-pc"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-edge bg-white/[0.03] px-7 py-3.5 text-ink transition-colors duration-300 hover:border-edge-strong hover:text-ink-strong active:scale-[0.98] min-h-[44px] md:w-auto md:justify-start"
                  style={{
                    fontFamily: INTER,
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                  }}
                >
                  <Wrench size={15} strokeWidth={1.8} />
                  Montar meu PC
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* --------------------------- milestone card --------------------------- */

function MilestoneCard({
  milestone,
  align,
}: {
  milestone: Milestone;
  align: "left" | "right";
}) {
  return (
    <div
      className={
        "group relative overflow-hidden rounded-2xl border border-edge bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 md:p-7 " +
        (align === "right" ? "md:text-right" : "")
      }
    >
      <div
        aria-hidden
        className={
          "pointer-events-none absolute -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 " +
          (align === "right" ? "-left-12" : "-right-12")
        }
        style={{
          background:
            "radial-gradient(circle, rgba(255,43,46,0.20), transparent 70%)",
        }}
      />
      <span
        className={
          "relative inline-flex items-center gap-2 " +
          (align === "right" ? "md:flex-row-reverse" : "")
        }
      >
        <span
          className="tabular-nums text-primary"
          style={{
            fontFamily: FIGTREE,
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {milestone.year}
        </span>
        <span className="h-px w-7 bg-primary/40" />
      </span>
      <h3
        className="relative mt-3 text-ink-strong"
        style={{
          fontFamily: FIGTREE,
          fontSize: "var(--text-lg)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {milestone.title}
      </h3>
      <p
        className="relative mt-2 text-ink-muted"
        style={{ fontFamily: INTER, fontSize: "var(--text-sm)", lineHeight: 1.6 }}
      >
        {milestone.desc}
      </p>
    </div>
  );
}
