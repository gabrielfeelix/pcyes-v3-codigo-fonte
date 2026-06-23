import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../useScrollReveal";
import { Eyebrow } from "./Eyebrow";

type Size = "sm" | "md" | "lg";

const TITLE_SIZE: Record<Size, string> = {
  sm: "clamp(28px, 3vw, 36px)",
  md: "clamp(28px, 3vw, 38px)",
  lg: "clamp(28px, 3.4vw, 44px)",
};

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  size?: Size;
  weight?: 500 | 600 | 700;
  align?: "left" | "center";
  animated?: boolean;
  className?: string;
  titleClassName?: string;
  titleStyle?: CSSProperties;
};

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  size = "sm",
  weight = 600,
  align = "left",
  animated = true,
  className = "",
  titleClassName = "text-ink-strong",
  titleStyle,
}: SectionHeaderProps) {
  const { ref, isInView } = useScrollReveal();

  const finalTitleStyle: CSSProperties = {
    fontFamily: "var(--font-family-figtree)",
    fontSize: TITLE_SIZE[size],
    fontWeight: weight,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    ...titleStyle,
  };

  const alignClass = align === "center" ? "text-center" : "text-left";
  const eyebrowNode = eyebrow ? <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow> : null;

  if (!animated) {
    return (
      <div className={`${alignClass} ${className}`}>
        {eyebrowNode && <p className="mb-3">{eyebrowNode}</p>}
        <h2 className={titleClassName} style={finalTitleStyle}>{title}</h2>
      </div>
    );
  }

  return (
    <div ref={ref} className={`${alignClass} ${className}`}>
      {eyebrowNode && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3"
        >
          {eyebrowNode}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={titleClassName}
        style={finalTitleStyle}
      >
        {title}
      </motion.h2>
    </div>
  );
}
