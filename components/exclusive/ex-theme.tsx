"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import { EX_THEME_ATTR as ATTR, EX_THEME_STORAGE_KEY as STORAGE_KEY } from "./ex-theme-script";

/** Tema do EXCLUSIVE. Por padrão segue o sistema (Automático). O botão diz
 *  sempre o tema para onde se vai: no escuro lê-se "Claro", no claro "Escuro".
 *  Se a escolha coincidir com o tema do sistema, volta ao Automático (apaga a
 *  preferência), para continuar a acompanhar o sistema. O atributo vive no
 *  <html> (que já tem suppressHydrationWarning) e só os seletores .ex o leem,
 *  por isso o site público não é afetado. */

type Tema = "light" | "dark";
const SIMBOLO: Record<Tema, string> = { light: "○", dark: "●" };
const EVENTO = "ex-theme-change";
const sistema = () => window.matchMedia("(prefers-color-scheme: light)");

function guardado(): Tema | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s === "light" || s === "dark" ? s : null;
  } catch {
    return null;
  }
}

/** O tema que está à vista agora. */
const atual = (): Tema => guardado() ?? (sistema().matches ? "light" : "dark");

function aplicar() {
  const root = document.documentElement;
  if (atual() === "light") root.setAttribute(ATTR, "light");
  else root.removeAttribute(ATTR);
}

function subscribe(onChange: () => void) {
  const mq = sistema();
  const mudou = () => {
    aplicar();
    onChange();
  };
  window.addEventListener(EVENTO, onChange);
  window.addEventListener("storage", mudou);
  mq.addEventListener("change", mudou);
  return () => {
    window.removeEventListener(EVENTO, onChange);
    window.removeEventListener("storage", mudou);
    mq.removeEventListener("change", mudou);
  };
}

export function ExThemeToggle() {
  const t = useTranslations("exclusive.nav");
  const tema = useSyncExternalStore(subscribe, atual, () => "dark" as const);
  const destino: Tema = tema === "light" ? "dark" : "light";

  // A navegação do lado do cliente não corre o script inline: aplica ao entrar.
  useEffect(aplicar, []);

  const mudar = () => {
    try {
      const doSistema: Tema = sistema().matches ? "light" : "dark";
      if (destino === doSistema) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, destino);
    } catch {}
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const feito = () => {
      aplicar();
      window.dispatchEvent(new Event(EVENTO));
    };
    if (doc.startViewTransition && !reduced) doc.startViewTransition(feito);
    else feito();
  };

  const acao = destino === "light" ? t("themeToLight") : t("themeToDark");

  return (
    <button type="button" onClick={mudar} className="ex-over ex-theme-toggle" aria-label={acao} title={acao}>
      <span className="ex-theme-toggle-mark" aria-hidden>(</span>
      <span className="ex-theme-long">{destino === "light" ? t("themeLight") : t("themeDark")}</span>
      {/* No telemóvel o nome não cabe ao lado da logo: fica o símbolo (o nome vai no aria-label). */}
      <span className="ex-theme-short" aria-hidden>{SIMBOLO[destino]}</span>
      <span className="ex-theme-toggle-mark" aria-hidden>)</span>
    </button>
  );
}
