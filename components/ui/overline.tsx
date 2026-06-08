/**
 * Overline — section eyebrow label with a short accent rule before it.
 * Matches the editorial reference (Epic Portugal): a short line, then the
 * uppercase micro-label.
 *
 * Usage:
 *   <Overline color="var(--color-ntn-lime)">Our Routes</Overline>
 */

type OverlineProps = {
  children: React.ReactNode;
  color?: string;
  lineColor?: string;
  className?: string;
};

export function Overline({
  children,
  color = "var(--color-ntn-forest-400)",
  lineColor,
  className,
}: OverlineProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <span
        aria-hidden
        style={{
          display: "block",
          width: "40px",
          height: "2px",
          backgroundColor: lineColor ?? color,
          flexShrink: 0,
        }}
      />
      <span
        className="text-label"
        style={{ color, letterSpacing: "0.2em" }}
      >
        {children}
      </span>
    </span>
  );
}
