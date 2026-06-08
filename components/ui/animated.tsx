"use client";

/**
 * Animated wrappers — drop-in replacements for plain div/section/etc.
 *
 * All components trigger on scroll (whileInView) and animate once.
 * Viewport margin "-80px" means animation fires before the element
 * is fully visible — feels snappier.
 *
 * Usage:
 *   <FadeUp>  <p>This paragraph fades up on scroll</p>  </FadeUp>
 *   <StaggerChildren delay={0.2}>  <Card /> <Card /> <Card />  </StaggerChildren>
 */

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeIn,
  fadeUp,
  fadeUpSoft,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerFast,
  staggerSlow,
  heroReveal,
  taglineReveal,
} from "@/lib/motion";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: keyof typeof m;
};

/* ─── viewport config ────────────────────────────────────────── */
const vp = { once: true, margin: "-80px" } as const;

/* ─── helpers ────────────────────────────────────────────────── */

function withDelay(delay = 0) {
  return delay > 0
    ? { transition: { delay } }
    : {};
}

/* ─── EXPORT: FadeIn ─────────────────────────────────────────── */

export function FadeIn({ children, className, style, delay = 0 }: BaseProps) {
  return (
    <m.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      custom={delay}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: FadeUp ─────────────────────────────────────────── */

export function FadeUp({ children, className, style, delay = 0 }: BaseProps) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: FadeUpSoft ─────────────────────────────────────── */

export function FadeUpSoft({ children, className, style, delay = 0 }: BaseProps) {
  return (
    <m.div
      variants={fadeUpSoft}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: FadeLeft / FadeRight ───────────────────────────── */

export function FadeLeft({ children, className, style, delay = 0 }: BaseProps) {
  return (
    <m.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

export function FadeRight({ children, className, style, delay = 0 }: BaseProps) {
  return (
    <m.div
      variants={fadeRight}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: ScaleIn ────────────────────────────────────────── */

export function ScaleIn({ children, className, style, delay = 0 }: BaseProps) {
  return (
    <m.div
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: StaggerChildren ────────────────────────────────── */

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: "fast" | "normal" | "slow";
  delay?: number;
};

export function StaggerChildren({
  children,
  className,
  style,
  speed = "normal",
  delay = 0,
}: StaggerProps) {
  const variants =
    speed === "fast"
      ? staggerFast
      : speed === "slow"
      ? staggerSlow
      : staggerContainer;

  return (
    <m.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: HeroTitle ──────────────────────────────────────── */
/**
 * Clip-reveals each word line from bottom — signature hero animation.
 * Wrap each line in a separate <HeroLine> inside a <HeroTitle>.
 *
 * <HeroTitle>
 *   <HeroLine>We Built</HeroLine>
 *   <HeroLine delay={0.15}>The Trails</HeroLine>
 * </HeroTitle>
 */

export function HeroTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}

export function HeroLine({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <div className={cn("overflow-hidden", className)} style={style}>
      <m.span
        variants={heroReveal}
        {...withDelay(delay)}
        style={{ display: "block" }}
      >
        {children}
      </m.span>
    </div>
  );
}

/* ─── EXPORT: TaglineReveal ──────────────────────────────────── */

export function TaglineReveal({
  children,
  className,
  style,
  delay = 0,
}: BaseProps) {
  return (
    <m.span
      variants={taglineReveal}
      initial="hidden"
      animate="show"
      className={cn(className)}
      style={style}
      {...withDelay(delay)}
    >
      {children}
    </m.span>
  );
}

/* ─── EXPORT: ParallaxImage ──────────────────────────────────── */
/**
 * Image container with parallax scroll.
 * The image should be position: absolute / object-cover inside.
 *
 * <ParallaxImage speed="slow" className="relative h-[600px] overflow-hidden">
 *   <Image src="..." fill className="object-cover" alt="..." />
 * </ParallaxImage>
 */

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { parallaxY } from "@/lib/motion";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: "slow" | "medium" | "fast" | "reverse";
};

export function ParallaxImage({
  children,
  className,
  style,
  speed = "slow",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const outputRange = parallaxY[speed] as string[];
  const y = useTransform(scrollYProgress, [0, 1], outputRange);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)} style={style}>
      <m.div style={{ y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}

/* ─── EXPORT: HoverCard ──────────────────────────────────────── */
/**
 * Subtle scale + shadow lift on hover.
 * Use for route cards, destination cards.
 */

export function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={cn("cursor-pointer", className)}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </m.div>
  );
}

/* ─── EXPORT: CountUp ────────────────────────────────────────── */
/**
 * Animates a number from 0 to the target value when scrolled into view.
 * Usage: <CountUp value={12} suffix="+" />
 */

import { useState, useEffect } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{display}{suffix}
    </span>
  );
}
