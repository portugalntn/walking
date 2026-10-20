"use client";

/**
 * A page created in FLOW, drawn from blocks. Every block copies a section that
 * already exists on the site (Sustentabilidade, Sobre nós, Destinos), so a new
 * page looks like the rest of the site without new design work.
 * pt-PT, no em dashes (house rule).
 */

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { FadeUp, FadeLeft, FadeRight, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { fadeUp } from "@/lib/motion";
import { tx, type Block, type CustomPage } from "@/lib/custom-pages";

type Item = Record<string, unknown>;
const lista = (v: unknown): Item[] => (Array.isArray(v) ? (v as Item[]) : []);
const fotos = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && !!x.trim()) : []);
const foto = (v: unknown, fallback = "/images/routes/geres-2.jpg") => (typeof v === "string" && v.trim() ? v.trim() : fallback);
const paragrafos = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const H2 = { lineHeight: 1.05, textTransform: "none" as const, fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)" };

function Rotulo({ texto, claro }: { texto: string; claro?: boolean }) {
  if (!texto) return null;
  return (
    <div style={{ marginBottom: "16px" }}>
      {claro ? (
        <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{texto}</Overline>
      ) : (
        <Overline color="var(--color-ntn-forest-400)">{texto}</Overline>
      )}
    </div>
  );
}

function Hero({ d, l }: { d: Item; l: string }) {
  return (
    <section className="relative flex items-end" style={{ minHeight: "78vh" }}>
      <div className="absolute inset-0 z-0">
        <Image src={foto(d.foto)} alt={tx(d.titulo, l)} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,20,18,0.78) 0%, rgba(20,20,18,0.35) 55%, rgba(20,20,18,0.1) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,20,18,0.45) 0%, transparent 35%, rgba(20,20,18,0.85) 100%)" }} />
      </div>
      <div className="container-ntn relative z-10" style={{ paddingTop: "170px", paddingBottom: "88px" }}>
        <FadeUp>
          <Rotulo texto={tx(d.rotulo, l)} claro />
          <h1 className="font-title" style={{ color: "#fff", whiteSpace: "pre-line", lineHeight: 1.02, textTransform: "none", fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)", maxWidth: "16ch", marginBottom: "24px" }}>
            {tx(d.titulo, l)}
          </h1>
          {tx(d.texto, l) && (
            <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.86)", maxWidth: "40rem" }}>
              {tx(d.texto, l)}
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

function Texto({ d, l }: { d: Item; l: string }) {
  const ps = paragrafos(tx(d.texto, l));
  return (
    <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="container-ntn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <FadeUp>
            <Rotulo texto={tx(d.rotulo, l)} />
            <h2 className="font-title" style={{ ...H2, color: "var(--color-ntn-black-900)", whiteSpace: "pre-line" }}>{tx(d.titulo, l)}</h2>
          </FadeUp>
          <FadeRight delay={0.1}>
            {ps.map((p, i) => (
              <p
                key={i}
                className="font-ui"
                style={i === 0 ? { color: "var(--color-ntn-black-900)", fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)", lineHeight: 1.55, fontWeight: 500, marginBottom: "20px" } : { color: "var(--color-ntn-black-800)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "16px" }}
              >
                {p}
              </p>
            ))}
          </FadeRight>
        </div>
      </div>
    </section>
  );
}

function Faixa({ d, l }: { d: Item; l: string }) {
  const itens = lista(d.itens).map((x) => tx(x, l)).filter(Boolean);
  return (
    <section className="relative flex items-center" style={{ minHeight: "80vh" }}>
      <div className="absolute inset-0 z-0">
        <Image src={foto(d.foto, "/images/routes/geres-1.jpg")} alt={tx(d.titulo, l)} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,20,18,0.8) 0%, rgba(20,20,18,0.45) 50%, rgba(20,20,18,0.05) 100%)" }} />
      </div>
      <div className="container-ntn relative z-10" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <FadeLeft>
          <div style={{ maxWidth: "36rem" }}>
            <Rotulo texto={tx(d.rotulo, l)} claro />
            <h2 className="font-title" style={{ ...H2, color: "#fff", marginBottom: "22px" }}>{tx(d.titulo, l)}</h2>
            <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.86)", marginBottom: itens.length ? "28px" : 0 }}>{tx(d.texto, l)}</p>
            {itens.length > 0 && (
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {itens.map((it, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                    <span style={{ width: "26px", height: "26px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={15} style={{ color: "var(--color-ntn-black-900)" }} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FadeLeft>
      </div>
    </section>
  );
}

function TextoImagem({ d, l }: { d: Item; l: string }) {
  const direita = d.lado === "direita";
  const escuro = d.fundo !== "claro";
  const cor = escuro ? "#fff" : "var(--color-ntn-black-900)";
  const imagem = (
    <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "16px" }}>
      <Image src={foto(d.foto, "/images/routes/douro-1.jpg")} alt={tx(d.titulo, l)} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
    </div>
  );
  const texto = (
    <div>
      <Rotulo texto={tx(d.rotulo, l)} claro={escuro} />
      <h2 className="font-title" style={{ ...H2, color: cor, marginBottom: "22px" }}>{tx(d.titulo, l)}</h2>
      {paragrafos(tx(d.texto, l)).map((p, i) => (
        <p key={i} className="text-body-lg leading-relaxed" style={{ color: escuro ? "rgba(255,255,255,0.84)" : "var(--color-ntn-black-800)", marginBottom: "18px" }}>
          {p}
        </p>
      ))}
    </div>
  );
  return (
    <section style={{ backgroundColor: escuro ? "var(--color-ntn-forest-600)" : "var(--color-ntn-cream-50)", paddingTop: "110px", paddingBottom: "110px" }}>
      <div className="container-ntn">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "clamp(40px, 6vw, 88px)" }}>
          {direita ? (
            <>
              <FadeLeft>{texto}</FadeLeft>
              <FadeRight delay={0.1}>{imagem}</FadeRight>
            </>
          ) : (
            <>
              <FadeLeft>{imagem}</FadeLeft>
              <FadeRight delay={0.1}>{texto}</FadeRight>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Cabeca({ d, l }: { d: Item; l: string }) {
  if (!tx(d.rotulo, l) && !tx(d.titulo, l)) return null;
  return (
    <FadeUp>
      <Rotulo texto={tx(d.rotulo, l)} />
      <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "48px" }}>
        {tx(d.titulo, l)}
      </h2>
    </FadeUp>
  );
}

function Grelha({ d, l }: { d: Item; l: string }) {
  const itens = lista(d.itens).filter((x) => tx(x.titulo, l) || tx(x.texto, l));
  const cols = itens.length === 3 ? "lg:grid-cols-3" : itens.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";
  return (
    <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="container-ntn">
        <Cabeca d={d} l={l} />
        <StaggerChildren speed="fast" className={`grid grid-cols-1 sm:grid-cols-2 ${cols}`} style={{ gap: "20px" } as React.CSSProperties}>
          {itens.map((it, n) => (
            <m.div key={n} variants={fadeUp} style={{ backgroundColor: "var(--color-ntn-white)", borderRadius: "14px", padding: "28px 26px 30px", border: "1px solid rgba(89,105,77,0.14)", display: "flex", flexDirection: "column" }}>
              <span className="font-title" style={{ color: "rgba(89,105,77,0.35)", fontSize: "2rem", lineHeight: 1, marginBottom: "24px" }}>{String(n + 1).padStart(2, "0")}</span>
              <h3 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "10px" }}>{tx(it.titulo, l)}</h3>
              <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>{tx(it.texto, l)}</p>
            </m.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function Numeros({ d, l }: { d: Item; l: string }) {
  const itens = lista(d.itens).filter((x) => String(x.valor ?? "").trim());
  return (
    <section style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container-ntn">
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "32px" }}>
          {itens.map((it, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <p className="font-title" style={{ color: "var(--color-ntn-lime)", fontSize: "clamp(2.6rem, 5vw, 4rem)", lineHeight: 1 }}>{String(it.valor)}</p>
              <p className="font-ui" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, marginTop: "10px" }}>{tx(it.rotulo, l)}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cartoes({ d, l, locale }: { d: Item; l: string; locale: string }) {
  const itens = lista(d.itens).filter((x) => tx(x.titulo, l));
  return (
    <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="container-ntn">
        <Cabeca d={d} l={l} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
          {itens.map((it, i) => {
            const href = ligacao(it.ligacao, locale);
            const corpo = (
              <div style={{ backgroundColor: "var(--color-ntn-white)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(89,105,77,0.14)", height: "100%" }}>
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <Image src={foto(it.foto, "/images/routes/douro-1.jpg")} alt={tx(it.titulo, l)} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>{tx(it.titulo, l)}</h3>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>{tx(it.texto, l)}</p>
                  {href && <ArrowRight size={18} style={{ color: "var(--color-ntn-forest-400)", marginTop: "14px" }} />}
                </div>
              </div>
            );
            return (
              <FadeUp key={i} delay={i * 0.05}>
                {href ? <Link href={href} style={{ textDecoration: "none" }}>{corpo}</Link> : corpo}
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Galeria({ d, l }: { d: Item; l: string }) {
  const fs = fotos(d.fotos);
  if (!fs.length) return null;
  return (
    <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "90px", paddingBottom: "90px" }}>
      <div className="container-ntn">
        <Cabeca d={d} l={l} />
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "12px" }}>
          {fs.map((src, i) => (
            <div key={i} className="relative overflow-hidden" style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1", borderRadius: "12px" }}>
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ligacao(v: unknown, locale: string): string | null {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return null;
  if (/^https?:\/\//.test(s) || s.startsWith("mailto:")) return s;
  if (s.startsWith("#")) return `/${locale}${s}`;
  return `/${locale}${s.startsWith("/") ? "" : "/"}${s}`;
}

function Fecho({ d, l, locale }: { d: Item; l: string; locale: string }) {
  const href = ligacao(d.ligacao, locale) ?? `/${locale}#contact`;
  return (
    <section style={{ backgroundColor: "var(--color-ntn-lime)", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="container-ntn">
        <FadeLeft>
          <div className="max-w-2xl">
            <h2 className="font-title" style={{ color: "#1a2510", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginBottom: "24px" }}>{tx(d.titulo, l)}</h2>
            {tx(d.texto, l) && <p className="text-body-lg leading-relaxed" style={{ color: "#2d3b1e", marginBottom: "40px" }}>{tx(d.texto, l)}</p>}
            {tx(d.botao, l) && (
              <a
                href={href}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "16px 32px", backgroundColor: "#1a2510", color: "var(--color-ntn-lime)", borderRadius: "3px", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
              >
                {tx(d.botao, l)}
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        </FadeLeft>
      </div>
    </section>
  );
}

function Bloco({ b, locale }: { b: Block; locale: string }) {
  const l = locale;
  switch (b.tipo) {
    case "hero": return <Hero d={b.d} l={l} />;
    case "texto": return <Texto d={b.d} l={l} />;
    case "faixa": return <Faixa d={b.d} l={l} />;
    case "textoImagem": return <TextoImagem d={b.d} l={l} />;
    case "grelha": return <Grelha d={b.d} l={l} />;
    case "numeros": return <Numeros d={b.d} l={l} />;
    case "cartoes": return <Cartoes d={b.d} l={l} locale={locale} />;
    case "galeria": return <Galeria d={b.d} l={l} />;
    case "fecho": return <Fecho d={b.d} l={l} locale={locale} />;
    default: return null;
  }
}

export function CustomPageContent({ page, filhas }: { page: CustomPage; filhas: { titulo: string; href: string }[] }) {
  const locale = useLocale();
  return (
    <main style={{ overflowX: "clip" }}>
      {page.blocos.map((b) => (
        <Bloco key={b.i} b={b} locale={locale} />
      ))}
      <SubPages links={filhas} />
    </main>
  );
}

/** Links to the pages created under this one ("Saiba mais"). */
export function SubPages({ links, titulo }: { links: { titulo: string; href: string }[]; titulo?: string }) {
  if (!links.length) return null;
  return (
    <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "64px", paddingBottom: "72px", borderTop: "1px solid rgba(89,105,77,0.14)" }}>
      <div className="container-ntn">
        {titulo && <p className="text-label" style={{ color: "var(--color-ntn-forest-400)", marginBottom: "18px" }}>{titulo}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "14px" }}>
          {links.map((x) => (
            <Link key={x.href} href={x.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "20px 22px", borderRadius: "12px", backgroundColor: "var(--color-ntn-white)", border: "1px solid rgba(89,105,77,0.14)", color: "var(--color-ntn-black-900)", fontFamily: "var(--font-ui)", fontWeight: 700, textDecoration: "none" }}>
              {x.titulo}
              <ArrowRight size={18} style={{ color: "var(--color-ntn-forest-400)", flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
