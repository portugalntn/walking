import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** A apresentação sem internet (ver public/sw-apresentacao.js): o tablet guarda as
 *  três línguas, o código e as fotografias, e os contactos recolhidos sem rede
 *  ficam numa fila até haver internet. */

const LINGUAS = ["pt", "en", "es"] as const;
const PRONTO = "ex-offline-pronto";
const FILA = "ex-contactos-por-enviar";

export type EstadoOffline = { fase: "nada" } | { fase: "preparar"; pct: number } | { fase: "pronto" };

const ouvirRede = (mudou: () => void) => {
  window.addEventListener("online", mudou);
  window.addEventListener("offline", mudou);
  return () => {
    window.removeEventListener("online", mudou);
    window.removeEventListener("offline", mudou);
  };
};

/** true com internet; no servidor assume-se que sim. */
export const useComRede = () => useSyncExternalStore(ouvirRede, () => navigator.onLine, () => true);

const guardavel = (u: string) => {
  const url = new URL(u);
  return url.origin === location.origin && (url.pathname.startsWith("/_next/static/") || url.pathname === "/_next/image" || url.pathname.startsWith("/images/"));
};

/** Regista o service worker nas três línguas e, com rede, manda guardar tudo o que a página carregou. */
export function useApresentacaoOffline(): EstadoOffline {
  const [estado, setEstado] = useState<EstadoOffline>({ fase: "nada" });
  const jaPronto = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Em desenvolvimento os ficheiros do código não mudam de nome entre versões e o service worker
    // serviria código antigo: aqui não se guarda nada (e limpa-se o que tiver ficado). Testar o
    // modo offline com `next build` + `next start`.
    if (process.env.NODE_ENV === "development") {
      navigator.serviceWorker.getRegistrations().then((rs) => rs.filter((r) => r.scope.includes("/exclusive/apresentacao")).forEach((r) => r.unregister()));
      caches.keys().then((ks) => ks.filter((k) => k.startsWith("ex-apresentacao-")).forEach((k) => caches.delete(k)));
      return;
    }
    // O registo de recursos chega por defeito a 250 entradas; a apresentação pede mais.
    performance.setResourceTimingBufferSize?.(1000);

    const ouvir = (e: MessageEvent) => {
      const d = e.data as { tipo?: string; feitos?: number; total?: number };
      if (d?.tipo === "progresso" && !jaPronto.current && d.total) {
        setEstado({ fase: "preparar", pct: Math.min(99, Math.floor(((d.feitos ?? 0) / d.total) * 100)) });
      } else if (d?.tipo === "pronto") {
        jaPronto.current = true;
        setEstado({ fase: "pronto" });
        try {
          localStorage.setItem(PRONTO, new Date().toISOString());
        } catch {}
      }
    };
    navigator.serviceWorker.addEventListener("message", ouvir);

    const preparar = async () => {
      try {
        if (localStorage.getItem(PRONTO)) {
          jaPronto.current = true;
          setEstado({ fase: "pronto" });
        }
      } catch {}
      try {
        await Promise.all(LINGUAS.map((l) => navigator.serviceWorker.register("/sw-apresentacao.js", { scope: `/${l}/exclusive/apresentacao` })));
        if (!navigator.onLine) return;
        const sw = (await navigator.serviceWorker.ready).active;
        const recursos = performance
          .getEntriesByType("resource")
          .map((e) => e.name)
          .filter(guardavel);
        sw?.postMessage({ tipo: "preparar", paginas: LINGUAS.map((l) => `/${l}/exclusive/apresentacao`), recursos });
      } catch {}
    };
    // Depois de a página e todas as fotos (carregadas logo à entrada) chegarem.
    if (document.readyState === "complete") preparar();
    else window.addEventListener("load", preparar, { once: true });

    return () => {
      navigator.serviceWorker.removeEventListener("message", ouvir);
      window.removeEventListener("load", preparar);
    };
  }, []);

  return estado;
}

/** Um pedido de contacto, tal como vai para /api/exclusive/lead. */
export type Contacto = Record<string, string>;

const lerFila = (): Contacto[] => {
  try {
    return JSON.parse(localStorage.getItem(FILA) ?? "[]") as Contacto[];
  } catch {
    return [];
  }
};

/** Guarda o contacto no tablet para seguir mais tarde. Devolve false se não houver onde guardar. */
export function guardarContacto(c: Contacto): boolean {
  try {
    localStorage.setItem(FILA, JSON.stringify([...lerFila(), c]));
    return true;
  } catch {
    return false;
  }
}

let aEnviar = false;

/** Envia os contactos que ficaram na fila. Os recusados por erro do servidor ou da rede ficam para a próxima. */
export async function enviarContactos() {
  if (aEnviar || !navigator.onLine) return;
  const fila = lerFila();
  if (!fila.length) return;
  aEnviar = true;
  const ficam: Contacto[] = [];
  for (const c of fila) {
    try {
      const res = await fetch("/api/exclusive/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(c) });
      if (res.status >= 500) ficam.push(c);
    } catch {
      ficam.push(c);
    }
  }
  try {
    // Contactos guardados entretanto (durante o envio) não se perdem.
    const novos = lerFila().slice(fila.length);
    localStorage.setItem(FILA, JSON.stringify([...ficam, ...novos]));
  } catch {}
  aEnviar = false;
}

/** Envia a fila ao abrir e sempre que a internet volta. */
export function useEnviarContactos() {
  useEffect(() => {
    enviarContactos();
    window.addEventListener("online", enviarContactos);
    return () => window.removeEventListener("online", enviarContactos);
  }, []);
}
