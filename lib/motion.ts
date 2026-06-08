/**
 * NTN Motion System
 *
 * Centralised Framer Motion variants for the Portugal NTN Walking site.
 * Import these instead of writing inline variants — ensures visual
 * consistency across all animations.
 *
 * Usage:
 *   import { fadeUp, staggerContainer } from "@/lib/motion"
 *   <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} />
 */

import type { Variants } from "framer-motion";

/* ─── EASING ────────────────────────────────────────────────── */

/** Cubic-bezier curves — use as `ease` inside transitions */
export const ease = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  expo:   [0.19, 1, 0.22, 1]       as [number, number, number, number],
  sharp:  [0.77, 0, 0.175, 1]      as [number, number, number, number],
} as const;

/** Spring configs — use as the full `transition` object */
export const spring = {
  default: { type: "spring" as const, stiffness: 100, damping: 20 },
  snappy:  { type: "spring" as const, stiffness: 200, damping: 28 },
  bouncy:  { type: "spring" as const, stiffness: 300, damping: 15 },
} as const;

/* ─── FADE ──────────────────────────────────────────────────── */

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

/* ─── SLIDE + FADE ──────────────────────────────────────────── */

/** Content slides up while fading in — most-used pattern */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.expo },
  },
};

/** Subtle upward drift — for body text and labels */
export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.smooth },
  },
};

/** Slides in from left */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.expo },
  },
};

/** Slides in from right */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.expo },
  },
};

/* ─── HERO TITLE ────────────────────────────────────────────── */

/**
 * Large display text: clips from bottom with a mask-reveal effect.
 * Wrap each word/line in an overflow-hidden container.
 */
export const heroReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: ease.expo },
  },
};

/** Tagline / overline text — tiny drift + fade */
export const taglineReveal: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.3em" },
  show: {
    opacity: 1,
    letterSpacing: "0.14em",
    transition: { duration: 1, ease: ease.smooth },
  },
};

/* ─── SCALE ─────────────────────────────────────────────────── */

/** Image or card scales in from slightly smaller */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: ease.expo },
  },
};

/** Subtle zoom on hover — for cards and image containers */
export const hoverZoom = {
  initial: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.5, ease: ease.smooth } },
};

/* ─── STAGGER CONTAINERS ────────────────────────────────────── */

/**
 * Parent container that staggers its children.
 * Combine with any child variant (e.g. fadeUp, scaleIn).
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Faster stagger for tight grids (route cards, stats) */
export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/** Slower stagger for editorial / narrative sections */
export const staggerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

/* ─── PARALLAX HELPERS ──────────────────────────────────────── */

/**
 * Use with useTransform + useScroll for parallax.
 *
 * Example:
 *   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
 *   const y = useTransform(scrollYProgress, [0, 1], parallaxY.slow)
 */
export const parallaxY: Record<string, string[]> = {
  slow:    ["0%", "-12%"],
  medium:  ["0%", "-22%"],
  fast:    ["0%", "-35%"],
  reverse: ["0%",  "15%"],
};

/* ─── DRAW (SVG) ────────────────────────────────────────────── */

/** Animate SVG path drawing */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: ease.expo },
  },
};

/* ─── PRESENCE (mount / unmount) ────────────────────────────── */

/** For AnimatePresence — menu overlays, modals */
export const overlayPresence: Variants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  show: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: { duration: 0.3, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    transition: { duration: 0.2, ease: ease.smooth },
  },
};

export const panelSlideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: ease.smooth },
  },
};

export const drawerSlideUp: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.45, ease: ease.expo },
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: 0.3, ease: [0.77, 0, 0.175, 1] },
  },
};
