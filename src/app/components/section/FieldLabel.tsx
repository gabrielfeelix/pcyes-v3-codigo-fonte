import type { CSSProperties, ReactNode } from "react";

type FieldLabelProps = {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  style?: CSSProperties;
};

export function FieldLabel({ children, required, htmlFor, className = "", style }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1.5 ${className}`}
      style={{
        fontFamily: "var(--font-family-inter)",
        fontSize: "var(--text-caption)",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(var(--foreground-rgb), 0.55)",
        ...style,
      }}
    >
      {children}
      {required && <span style={{ color: "var(--primary)", marginLeft: "4px" }}>*</span>}
    </label>
  );
}
