import { forwardRef, type ComponentProps, type CSSProperties } from "react";

type FieldInputProps = ComponentProps<"input"> & {
  /** When true, exposes aria-required + the native required attribute. */
  required?: boolean;
  /** When true, exposes aria-invalid="true" and renders a red border. */
  invalid?: boolean;
};

const BASE_STYLE: CSSProperties = {
  padding: "11px 13px",
  borderRadius: "var(--radius-card-sm)",
  border: "1px solid rgba(var(--foreground-rgb), 0.08)",
  background: "rgba(var(--foreground-rgb), 0.03)",
  fontFamily: "var(--font-family-inter)",
  fontSize: "var(--text-sm)",
  fontWeight: 500,
  color: "rgb(var(--foreground-rgb))",
  width: "100%",
  outline: "none",
};

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(function FieldInput(
  { style, className = "", required, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      required={required}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      className={className}
      style={{
        ...BASE_STYLE,
        ...(invalid ? { borderColor: "var(--destructive)" } : {}),
        ...style,
      }}
    />
  );
});
