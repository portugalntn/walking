"use client";

/**
 * MotionProvider
 *
 * Wraps the app with Framer Motion's LazyMotion.
 * Using `domAnimation` feature set — includes all standard animations
 * (layout, drag, gestures) without the heavier `domMax` (3D transforms).
 *
 * Use `m` (not `motion`) inside this context for tree-shaking to work:
 *   import { m } from "framer-motion"
 *
 * For components outside this tree, use `motion` directly (e.g. in modals).
 */

import { LazyMotion, domAnimation } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
