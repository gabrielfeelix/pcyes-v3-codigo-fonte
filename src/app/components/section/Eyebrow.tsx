import type { CSSProperties, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Eyebrow({ children, icon, className = "", style }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-primary ${className}`}
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 700,
        letterSpacing: "0.3em",
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}
