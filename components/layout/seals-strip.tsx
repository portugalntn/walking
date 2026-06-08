"use client";

import { useState } from "react";

/**
 * SealsStrip — certification / accreditation band shown above the footer on
 * every page.
 *
 * TEMPORARY: uses a single strip image as a placeholder. Save the strip image
 * to /public/images/seals/seals-strip.png (or .jpg and update SRC below).
 * Later we'll swap this for the isolated seals (vector / individual PNGs).
 *
 * The band hides itself gracefully until the image file exists, so it never
 * shows a broken image.
 */

const SRC = "/images/seals/seals-strip.png";

export function SealsStrip() {
  const [error, setError] = useState(false);
  if (error) return null;

  return (
    <section
      aria-label="Certifications"
      style={{
        backgroundColor: "var(--color-ntn-white)",
        borderTop: "1px solid rgba(29,29,26,0.06)",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div className="container-ntn" style={{ display: "flex", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          alt="Certificações e acreditações"
          onError={() => setError(true)}
          style={{ width: "100%", maxWidth: "1100px", height: "auto", objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
