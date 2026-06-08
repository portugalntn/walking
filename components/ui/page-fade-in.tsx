"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * PageFadeIn — a one-shot dark overlay that fades out on mount.
 * Smooths arrivals from the portal "dive" transition (no white flash),
 * and gives a soft cinematic entrance on direct loads.
 */
export function PageFadeIn() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            backgroundColor: "var(--color-ntn-black-900)",
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
