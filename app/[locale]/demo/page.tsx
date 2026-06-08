"use client";

/**
 * /[locale]/demo — Página de teste do sistema de animações.
 * Acede em: http://localhost:3000/en/demo
 * Remove este ficheiro antes do deploy de produção.
 */

import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  ScaleIn,
  StaggerChildren,
  HeroTitle,
  HeroLine,
  TaglineReveal,
  CountUp,
  HoverCard,
  ParallaxImage,
} from "@/components/ui/animated";
import { fadeUp } from "@/lib/motion";

export default function DemoPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main style={{ backgroundColor: "var(--color-ntn-black-900)", minHeight: "100vh" }}>

      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section
        className="min-h-screen flex items-center justify-center section-padding"
        style={{ backgroundColor: "var(--color-ntn-black-900)" }}
      >
        <div className="container-ntn text-center">
          <TaglineReveal
            className="text-label block mb-8"
            style={{ color: "var(--color-ntn-lime)" } as React.CSSProperties}
            delay={0.2}
          >
            Framer Motion — Demo
          </TaglineReveal>

          <HeroTitle>
            <HeroLine
              className="font-display text-display-xl"
              style={{ color: "var(--color-ntn-white)" } as React.CSSProperties}
              delay={0.3}
            >
              Motion
            </HeroLine>
            <HeroLine
              className="font-display text-display-xl"
              style={{ color: "var(--color-ntn-lime)" } as React.CSSProperties}
              delay={0.45}
            >
              System
            </HeroLine>
            <HeroLine
              className="font-display text-display-xl"
              style={{ color: "var(--color-ntn-white)" } as React.CSSProperties}
              delay={0.6}
            >
              Active
            </HeroLine>
          </HeroTitle>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10"
          >
            <a href="#sections" className="btn btn-primary">
              Scroll para ver animações ↓
            </a>
          </m.div>
        </div>
      </section>

      {/* ─── FADE VARIANTS ────────────────────────────────── */}
      <section
        id="sections"
        className="section-padding"
        style={{ backgroundColor: "var(--color-ntn-cream-50)" }}
      >
        <div className="container-ntn">
          <FadeUp>
            <p className="text-label mb-4" style={{ color: "var(--color-ntn-lime)" }}>
              Fade Variants
            </p>
            <h2
              className="font-display text-display-lg mb-12"
              style={{ color: "var(--color-ntn-black-900)" }}
            >
              FadeUp · FadeLeft · FadeRight
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeLeft delay={0}>
              <div
                className="p-8 rounded-lg"
                style={{ backgroundColor: "var(--color-ntn-white)" }}
              >
                <p className="text-label mb-2" style={{ color: "var(--color-ntn-forest-400)" }}>FadeLeft</p>
                <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)" }}>
                  Slides from left with opacity.
                </p>
              </div>
            </FadeLeft>

            <FadeUp delay={0.1}>
              <div
                className="p-8 rounded-lg"
                style={{ backgroundColor: "var(--color-ntn-white)" }}
              >
                <p className="text-label mb-2" style={{ color: "var(--color-ntn-forest-400)" }}>FadeUp</p>
                <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)" }}>
                  Slides from bottom with opacity.
                </p>
              </div>
            </FadeUp>

            <FadeRight delay={0.2}>
              <div
                className="p-8 rounded-lg"
                style={{ backgroundColor: "var(--color-ntn-white)" }}
              >
                <p className="text-label mb-2" style={{ color: "var(--color-ntn-forest-400)" }}>FadeRight</p>
                <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)" }}>
                  Slides from right with opacity.
                </p>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ─── STAGGER CHILDREN ─────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-ntn-black-900)" }}
      >
        <div className="container-ntn">
          <FadeUp>
            <p className="text-label mb-4" style={{ color: "var(--color-ntn-lime)" }}>
              Stagger Children
            </p>
            <h2
              className="font-display text-display-lg mb-12"
              style={{ color: "var(--color-ntn-white)" }}
            >
              Cards animados em cascata
            </h2>
          </FadeUp>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Douro", "Gerês", "Algarve", "Lisboa", "Trás-os-Montes", "Sintra", "Arrábida", "Caminho"].map(
              (name) => (
                <m.div
                  key={name}
                  variants={fadeUp}
                >
                  <HoverCard>
                    <div
                      className="p-6 rounded-lg text-center"
                      style={{
                        backgroundColor: "var(--color-ntn-forest-600)",
                        color: "var(--color-ntn-white)",
                      }}
                    >
                      <p className="font-display text-display-sm">{name}</p>
                    </div>
                  </HoverCard>
                </m.div>
              )
            )}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── COUNT UP ─────────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-ntn-forest-400)" }}
      >
        <div className="container-ntn">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: 12, suffix: "", label: "Anos de Experiência" },
              { value: 9, suffix: "+", label: "Roteiros Activos" },
              { value: 3, suffix: "", label: "Regiões Cobertas" },
            ].map((stat) => (
              <m.div key={stat.label} variants={fadeUp}>
                <p
                  className="font-display text-display-xl"
                  style={{ color: "var(--color-ntn-white)" }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  className="text-label mt-2"
                  style={{ color: "var(--color-ntn-lime)" }}
                >
                  {stat.label}
                </p>
              </m.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ─── ANIMATE PRESENCE ─────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-ntn-cream-100)" }}
      >
        <div className="container-ntn text-center">
          <FadeUp>
            <p className="text-label mb-4" style={{ color: "var(--color-ntn-lime)" }}>
              AnimatePresence
            </p>
            <h2
              className="font-display text-display-lg mb-10"
              style={{ color: "var(--color-ntn-black-900)" }}
            >
              Mount / Unmount suave
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-primary mb-8"
            >
              {isOpen ? "Fechar Painel" : "Abrir Painel"}
            </button>
          </FadeUp>

          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.97 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  backgroundColor: "var(--color-ntn-forest-400)",
                  borderRadius: "0.375rem",
                  padding: "2.5rem",
                  color: "var(--color-ntn-white)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  transformOrigin: "top",
                }}
              >
                <p className="text-body-lg">
                  AnimatePresence gere o ciclo de entrada e saída. Quando
                  o componente é removido do DOM, a animação <code>exit</code>{" "}
                  executa antes da remoção.
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── PARALLAX ─────────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-ntn-black-800)" }}
      >
        <div className="container-ntn">
          <FadeUp>
            <p className="text-label mb-4" style={{ color: "var(--color-ntn-lime)" }}>
              Parallax Scroll
            </p>
            <h2
              className="font-display text-display-lg mb-8"
              style={{ color: "var(--color-ntn-white)" }}
            >
              ParallaxImage
            </h2>
          </FadeUp>

          <ParallaxImage speed="slow" className="relative rounded-xl" style={{ height: "400px" } as React.CSSProperties}>
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-ntn-forest-400) 0%, var(--color-ntn-black-900) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="font-display text-display-xl text-center"
                style={{ color: "var(--color-ntn-white)" }}
              >
                Scroll para ver parallax
              </p>
            </div>
          </ParallaxImage>
        </div>
      </section>

      {/* ─── SUMMARY ──────────────────────────────────────── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-ntn-lime)" }}
      >
        <div className="container-ntn text-center">
          <ScaleIn>
            <h2
              className="font-display text-display-lg"
              style={{ color: "var(--color-ntn-black-900)" }}
            >
              Sistema Pronto ✓
            </h2>
            <p className="text-body-lg mt-4" style={{ color: "var(--color-ntn-forest-600)" }}>
              FadeUp · FadeLeft · FadeRight · ScaleIn · StaggerChildren ·<br />
              HeroTitle · HeroLine · TaglineReveal · CountUp · HoverCard · ParallaxImage ·
              AnimatePresence
            </p>
          </ScaleIn>
        </div>
      </section>

    </main>
  );
}
