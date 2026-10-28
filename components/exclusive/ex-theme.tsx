"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import { EX_THEME_ATTR as ATTR, EX_THEME_STORAGE_KEY as STORAGE_KEY } from "./ex-theme-script";

/** Tema do EXCLUSIVE em três modos: Automático (segue o sistema, o padrão),
 *  Claro e Escuro. A escolha fica no browser. O atributo vive no <html>
 *  (que já tem suppressHydrationWarning) e só os seletores .ex o leem,
 *  por isso o site público não é afetado. */

type Modo = "auto" | "light" | "dark";
const SEGUINTE: Record<Modo, Modo> = { auto: "light", light: "dark", dark: "auto" };
const EVENTO = "ex-theme-change";
const sistema = () => window.matchMedia("(prefers-color-scheme: light)");

function lerModo(): Modo {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s === "light" || s === "dark" ? s : "auto";
  } catch {
    return "auto";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENTO, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENTO, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function aplicar(modo: Modo) {
  const claro = modo === "light" || (modo === "auto" && sistema().matches);
  const root = document.documentElement;
  if (claro) root.setAttribute(ATTR, "light");
  else root.removeAttribute(ATTR);
}

export function ExThemeToggle() {
  const t = useTranslations("exclusive.nav");
  const modo = useSyncExternalStore(subscribe, lerModo, () => "auto" as const);

  // Aplica o modo ao entrar (a navegação do lado do cliente não corre o
  // script inline) e, no Automático, acompanha o sistema quando ele muda.
  useEffect(() => {
    aplicar(modo);
    if (modo !== "auto") return;
    const mq = sistema();
    const mudou = () => aplicar("auto");
    mq.addEventListener("change", mudou);
    return () => mq.removeEventListener("change", mudou);
  }, [modo]);

  const proximo = SEGUINTE[modo];

  const mudar = () => {
    try {
      if (proximo === "auto") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, proximo);
    } catch {}
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const feito = () => {
      aplicar(proximo);
      window.dispatchEvent(new Event(EVENTO));
    };
    if (doc.startViewTransition && !reduced) doc.startViewTransition(feito);
    else feito();
  };

  const rotulo = { auto: "themeAuto", light: "themeLight", dark: "themeDark" } as const;
  const acao = { auto: "themeToAuto", light: "themeToLight", dark: "themeToDark" } as const;

  return (
    <button type="button" onClick={mudar} className="ex-over ex-theme-toggle" aria-label={t(acao[proximo])} title={t(acao[proximo])}>
      <span className="ex-theme-toggle-mark" aria-hidden>(</span>
      {t(rotulo[modo])}
      <span className="ex-theme-toggle-mark" aria-hidden>)</span>
    </button>
  );
}
