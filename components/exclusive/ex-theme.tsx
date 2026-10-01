"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

/** Tema claro / escuro do EXCLUSIVE. O escuro é a identidade e o padrão;
 *  a escolha do visitante fica no browser. O atributo vive no <html>
 *  (que já tem suppressHydrationWarning) e só os seletores .ex o leem,
 *  por isso o site público não é afetado. */

import { EX_THEME_ATTR as ATTR, EX_THEME_STORAGE_KEY as STORAGE_KEY } from "./ex-theme-script";

type ExTheme = "dark" | "light";

function readTheme(): ExTheme {
  return document.documentElement.getAttribute(ATTR) === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [ATTR] });
  return () => observer.disconnect();
}

function applyTheme(theme: ExTheme) {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute(ATTR, "light");
  else root.removeAttribute(ATTR);
}

export function ExThemeToggle() {
  const t = useTranslations("exclusive.nav");
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as const);

  // Navegação do lado do cliente (vinda do site público) não corre o
  // script inline, por isso a escolha guardada é reaplicada aqui.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "light") applyTheme("light");
    } catch {}
  }, []);

  const next: ExTheme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduced) doc.startViewTransition(() => applyTheme(next));
    else applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="ex-over ex-theme-toggle"
      aria-label={t(next === "light" ? "themeToLight" : "themeToDark")}
      title={t(next === "light" ? "themeToLight" : "themeToDark")}
    >
      <span className="ex-theme-toggle-mark" aria-hidden>(</span>
      {t(next === "light" ? "themeLight" : "themeDark")}
      <span className="ex-theme-toggle-mark" aria-hidden>)</span>
    </button>
  );
}
