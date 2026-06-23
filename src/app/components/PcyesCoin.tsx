export function PcyesCoin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <radialGradient id="pcoin-grad-shared" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id="pcoin-shine-shared" cx="30%" cy="25%" r="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#pcoin-grad-shared)" stroke="#92400e" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="11" fill="none" stroke="#92400e" strokeWidth="0.7" strokeDasharray="1.5 1.2" opacity="0.45" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily="var(--font-family-figtree), system-ui, sans-serif"
        fontSize="14"
        fontWeight="900"
        fill="#7c2d12"
        letterSpacing="-0.04em"
      >
        P
      </text>
      <ellipse cx="12" cy="11" rx="4.5" ry="3" fill="url(#pcoin-shine-shared)" />
    </svg>
  );
}
