/**
 * BrandElements — subtle floating brand glyphs (leaf, mountain, ring)
 * derived from the Portugal NTN symbol. Fixed, pointer-events-none,
 * very low opacity — a quiet textural layer behind the content.
 */

const Leaf = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      d="M 0,20 C 8,-5 32,-5 40,20 C 32,45 8,45 0,20 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const Mountain = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 36" fill="none">
    <path
      d="M 0,30 L 20,5 L 40,30 M 8,30 L 20,12 L 32,30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Ring = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

type FloatItem = {
  el: React.ReactNode;
  top: string;
  left?: string;
  right?: string;
  opacity: number;
  anim: string;
  duration: string;
  delay: string;
};

const items: FloatItem[] = [
  { el: <Leaf size={28} />,     top: "15%", right: "3%",   opacity: 0.06, anim: "floatA", duration: "7s",  delay: "0s" },
  { el: <Mountain size={32} />, top: "45%", left: "1.5%",  opacity: 0.05, anim: "floatB", duration: "9s",  delay: "1s" },
  { el: <Ring size={22} />,     top: "70%", right: "4%",   opacity: 0.07, anim: "floatC", duration: "6s",  delay: "0.5s" },
  { el: <Leaf size={20} />,     top: "85%", left: "3%",    opacity: 0.04, anim: "floatA", duration: "10s", delay: "2s" },
  { el: <Mountain size={24} />, top: "30%", right: "5%",   opacity: 0.05, anim: "floatB", duration: "8s",  delay: "1.5s" },
];

export function BrandElements() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        color: "var(--color-ntn-forest-400)",
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className="brand-float"
          style={{
            position: "absolute",
            top: it.top,
            left: it.left,
            right: it.right,
            opacity: it.opacity,
            animation: `${it.anim} ${it.duration} ease-in-out ${it.delay} infinite`,
          }}
        >
          {it.el}
        </div>
      ))}
    </div>
  );
}
