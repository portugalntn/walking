"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";

import { ExLogo } from "./ex-chrome";
import { ExThemeToggle } from "./ex-theme";
import { SLIDES, type SlideId } from "./ex-deck-slides";

/** Apresentação do EXCLUSIVE para tablet: o vendedor conduz o atendimento ecrã
 *  a ecrã. Os ecrãs estão lado a lado numa faixa com scroll-snap horizontal,
 *  por isso o deslize do dedo é o nativo do tablet; as setas, a barra de
 *  progresso, o índice e o teclado (ou um comando de apresentações) levam ao
 *  mesmo sítio. O número do ecrã fica no endereço (#4), para mudar de língua
 *  sem perder o lugar. */

/** O nome de cada ecrã no índice e na barra de baixo (chaves de exclusive.*). */
const ROTULO: Record<SlideId, string> = {
  capa: "deck.cover",
  quem: "manifesto.overline",
  compromisso: "deck.commitment",
  territorios: "nav.territories",
  experiencias: "nav.experiences",
  formatos: "nav.formats",
  viagens: "journeys.title",
  oneday: "dayTours.overline",
  padrao: "standard.overline",
  trade: "nav.howWeWork",
  contacto: "enquiry.overline",
};

const LINGUAS = ["pt", "en", "es"] as const;
const TOTAL = SLIDES.length;
const pad = (n: number) => String(n).padStart(2, "0");

type DocCheio = Document & { webkitFullscreenEnabled?: boolean; webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void };
type ElCheio = HTMLElement & { webkitRequestFullscreen?: () => void };

const doc = () => document as DocCheio;
const nada = () => () => {};
const ouvirCheio = (mudou: () => void) => {
  document.addEventListener("fullscreenchange", mudou);
  document.addEventListener("webkitfullscreenchange", mudou);
  return () => {
    document.removeEventListener("fullscreenchange", mudou);
    document.removeEventListener("webkitfullscreenchange", mudou);
  };
};

export function ExDeck() {
  const t = useTranslations("exclusive");
  const locale = useLocale();
  const pista = useRef<HTMLDivElement>(null);
  const atualRef = useRef(0);
  /** Para onde a faixa está a deslizar: toques seguidos (ou um comando de apresentações) contam a partir daqui. */
  const destino = useRef<number | null>(null);
  /** O ecrã do endereço à chegada (#4), lido uma só vez: em dev o React corre os efeitos duas
   *  vezes e, à segunda, o endereço já foi reescrito para #1. */
  const inicio = useRef<number | null>(null);
  const [atual, setAtual] = useState(0);
  /** Ecrãs à vista (mesmo a meio do deslize): o conteúdo entra assim que o ecrã aparece. */
  const [dentro, setDentro] = useState<Set<number>>(() => new Set([0]));
  const [indice, setIndice] = useState(false);
  // Ecrã inteiro só onde o tablet o permite (o iPad sim; o iPhone não).
  const podeCheio = useSyncExternalStore(nada, () => Boolean(doc().fullscreenEnabled || doc().webkitFullscreenEnabled), () => false);
  const cheio = useSyncExternalStore(ouvirCheio, () => Boolean(doc().fullscreenElement || doc().webkitFullscreenElement), () => false);

  const go = useCallback((i: number) => {
    const el = pista.current;
    if (!el) return;
    const n = Math.max(0, Math.min(TOTAL - 1, i));
    destino.current = n;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: n * el.clientWidth, behavior: reduzido ? "auto" : "smooth" });
  }, []);
  const goId = useCallback((id: SlideId) => go(SLIDES.findIndex((s) => s.id === id)), [go]);
  const andar = useCallback((passo: number) => go((destino.current ?? atualRef.current) + passo), [go]);

  // Abrir no ecrã do endereço (#4), seguir o scroll e voltar a alinhar ao rodar o tablet.
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    if (inicio.current === null) {
      const n = Number.parseInt(window.location.hash.slice(1), 10);
      inicio.current = n >= 1 && n <= TOTAL ? n - 1 : 0;
    }
    if (inicio.current > 0) el.scrollLeft = inicio.current * el.clientWidth;

    const onScroll = () => {
      const pos = el.scrollLeft / el.clientWidth;
      const i = Math.round(pos);
      if (i === destino.current && Math.abs(pos - i) < 0.01) destino.current = null;
      if (i !== atualRef.current) {
        atualRef.current = i;
        setAtual(i);
      }
      // Um ecrã entra quando mostra um quinto de si e só sai quando desaparece de todo.
      setDentro((antes) => {
        const s = new Set([...antes].filter((k) => Math.abs(pos - k) < 0.98));
        for (let k = Math.floor(pos); k <= Math.ceil(pos); k++) if (Math.abs(pos - k) <= 0.8) s.add(k);
        return s.size === antes.size && [...s].every((k) => antes.has(k)) ? antes : s;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    // O evento de scroll só chega no frame seguinte: o ecrã de chegada acerta-se já.
    queueMicrotask(onScroll);
    // Um deslize com o dedo manda mais do que um destino pendente.
    const largar = () => (destino.current = null);
    el.addEventListener("pointerdown", largar, { passive: true });

    const ro = new ResizeObserver(() => {
      el.scrollLeft = (destino.current ?? atualRef.current) * el.clientWidth;
    });
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", largar);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${atual + 1}`);
  }, [atual]);

  // Teclado e comandos de apresentação (enviam setas ou Page Up / Page Down).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const origem = e.target as HTMLElement;
      if (origem.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "Escape") return setIndice(false);
      // Espaço num botão é carregar no botão, não avançar.
      if (e.key === " " && origem.closest("button, a")) return;
      const passo = { ArrowRight: 1, PageDown: 1, " ": 1, ArrowLeft: -1, PageUp: -1 }[e.key];
      if (passo) {
        e.preventDefault();
        andar(passo);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(TOTAL - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, andar]);

  // O ecrã fica sempre aceso durante a apresentação (o tablet não adormece a meio da conversa).
  useEffect(() => {
    let tranca: WakeLockSentinel | null = null;
    const acender = async () => {
      if (document.visibilityState !== "visible" || !("wakeLock" in navigator)) return;
      try {
        tranca = await navigator.wakeLock.request("screen");
      } catch {}
    };
    acender();
    document.addEventListener("visibilitychange", acender);

    return () => {
      document.removeEventListener("visibilitychange", acender);
      tranca?.release().catch(() => {});
    };
  }, []);

  const alternarCheio = () => {
    const d = doc();
    const raiz = document.documentElement as ElCheio;
    if (d.fullscreenElement || d.webkitFullscreenElement) {
      if (d.exitFullscreen) d.exitFullscreen().catch(() => {});
      else d.webkitExitFullscreen?.();
    } else if (raiz.requestFullscreen) raiz.requestFullscreen().catch(() => {});
    else raiz.webkitRequestFullscreen?.();
  };

  const rotulo = (i: number) => t(ROTULO[SLIDES[i].id]);
  const escuro = SLIDES[atual]?.fundo === "foto" || SLIDES[atual]?.fundo === "deep";
  const saltar = (i: number) => {
    setIndice(false);
    go(i);
  };

  return (
    <>
      <header className={`ex-dk-top${escuro ? " ex-dark" : ""}`}>
        <button type="button" className="ex-logo ex-dk-logo" onClick={() => go(0)} aria-label={t("deck.toStart")}>
          <ExLogo h={36} priority />
        </button>
        <div className="ex-dk-tools">
          <button type="button" className="ex-over ex-dk-tool" onClick={() => setIndice(true)} aria-haspopup="dialog">
            <span className="ex-theme-toggle-mark" aria-hidden>(</span>
            {t("deck.index")}
            <span className="ex-theme-toggle-mark" aria-hidden>)</span>
          </button>
          <nav className="ex-dk-langs" aria-label={t("deck.language")}>
            {LINGUAS.map((l) => (
              <a key={l} href={`/${l}/exclusive/apresentacao#${atual + 1}`} hrefLang={l} className={`ex-over${l === locale ? " is-on" : ""}`} aria-current={l === locale ? "true" : undefined}>
                {l}
              </a>
            ))}
          </nav>
          <ExThemeToggle />
          {podeCheio && (
            <button type="button" className="ex-over ex-dk-tool ex-dk-full" onClick={alternarCheio} aria-label={cheio ? t("deck.exitFullscreen") : t("deck.fullscreen")}>
              <span className="ex-theme-toggle-mark" aria-hidden>(</span>
              <span className="ex-dk-full-ico" aria-hidden>{cheio ? "↙" : "↗"}</span>
              <span className="ex-dk-full-txt">{cheio ? t("deck.exitFullscreen") : t("deck.fullscreen")}</span>
              <span className="ex-theme-toggle-mark" aria-hidden>)</span>
            </button>
          )}
        </div>
      </header>

      <div className="ex-dk-track" ref={pista}>
        {SLIDES.map(({ id, fundo, Ecra }, i) => (
          <section
            key={id}
            id={`ecra-${id}`}
            aria-roledescription="slide"
            aria-label={`${pad(i + 1)} / ${pad(TOTAL)} · ${rotulo(i)}`}
            className={["ex-slide", fundo ? `ex-slide-${fundo}` : "", fundo === "foto" || fundo === "deep" ? "ex-dark" : "", dentro.has(i) ? "is-in" : ""].filter(Boolean).join(" ")}
            style={{ "--n": i } as React.CSSProperties}
            inert={i !== atual && !dentro.has(i) ? true : undefined}
          >
            <Ecra go={goId} />
          </section>
        ))}
      </div>

      <footer className={`ex-dk-bottom${escuro ? " ex-dark" : ""}`}>
        <p className="ex-over ex-dk-where" aria-live="polite">
          <span className="ex-dk-count">
            {pad(atual + 1)} <span aria-hidden>/</span> {pad(TOTAL)}
          </span>
          <span className="ex-dk-chapter">{rotulo(atual)}</span>
        </p>
        <ol className="ex-dk-progress" aria-label={t("deck.progress")}>
          {SLIDES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={i < atual ? "is-past" : i === atual ? "is-on" : undefined}
                aria-current={i === atual ? "step" : undefined}
                aria-label={`${pad(i + 1)} · ${rotulo(i)}`}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ol>
        <div className="ex-dk-arrows">
          <button type="button" onClick={() => andar(-1)} disabled={atual === 0} aria-label={t("deck.prev")}>
            <span aria-hidden>&larr;</span>
          </button>
          <button type="button" onClick={() => andar(1)} disabled={atual === TOTAL - 1} aria-label={t("deck.next")}>
            <span aria-hidden>&rarr;</span>
          </button>
        </div>
      </footer>

      <div className={`ex-dk-index${indice ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t("deck.index")} inert={!indice ? true : undefined}>
        <div className="ex-dk-index-top">
          <p className="ex-over ex-over-accent">{t("deck.index")}</p>
          <button type="button" className="ex-over ex-dk-tool" onClick={() => setIndice(false)}>
            <span className="ex-theme-toggle-mark" aria-hidden>(</span>
            {t("deck.close")}
            <span className="ex-theme-toggle-mark" aria-hidden>)</span>
          </button>
        </div>
        <ol className="ex-dk-index-list">
          {SLIDES.map((s, i) => (
            <li key={s.id}>
              <button type="button" className={i === atual ? "is-on" : undefined} onClick={() => saltar(i)}>
                <span className="ex-num">{pad(i + 1)}</span>
                <span className="ex-serif">{rotulo(i)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
