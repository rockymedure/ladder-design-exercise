"use client";

/** Approximation of Ladder's "H" / ladder mark. */
export function LadderMark({
  size = 40,
  color = "var(--color-paper)",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ display: "block" }}
    >
      <g fill={color}>
        <path d="M9 4h9l-3 40H6L9 4Z" transform="skewX(-8)" />
        <path d="M30 4h9l-3 40h-9L30 4Z" transform="skewX(-8)" />
        <rect x="11" y="16" width="24" height="6" transform="skewX(-8)" />
        <rect x="10" y="27" width="24" height="6" transform="skewX(-8)" />
      </g>
    </svg>
  );
}

export function Wordmark({ color = "var(--color-paper)" }: { color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <LadderMark size={22} color={color} />
      <span
        className="font-display text-[15px] font-bold uppercase tracking-[0.04em]"
        style={{ color }}
      >
        Ladder
      </span>
    </div>
  );
}
