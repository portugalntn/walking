/*
 * Apresentação do EXCLUSIVE sem internet (feiras, reuniões fora do escritório).
 *
 * Só controla as páginas /{pt,en,es}/exclusive/apresentacao (é registado com esse
 * âmbito), por isso o resto do site nunca passa por aqui. Guarda no tablet:
 *  - as três páginas da apresentação (só a apresentação aberta, nunca o portão);
 *  - o código e as fontes (/_next/static, imutáveis);
 *  - as fotografias (/_next/image e /images).
 * Com rede, a página vem sempre fresca (e a cópia atualiza-se); sem rede, ou com
 * rede tão lenta que não responde em 4 s, abre a cópia do tablet. O botão
 * "Atualizar" da apresentação espera pela rede sem esse limite.
 * A página manda preparar tudo à entrada (mensagem "preparar") e mostra o progresso.
 */

const CACHE = "ex-apresentacao-v1";
const ESPERA_REDE = 4000;
/** O que distingue a apresentação aberta do portão, no HTML. */
const MARCA = "ex-dk-track";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      for (const k of await caches.keys()) if (k.startsWith("ex-apresentacao-") && k !== CACHE) await caches.delete(k);
      await self.clients.claim();
    })()
  );
});

const semExtras = (u) => {
  const url = new URL(u, self.location.origin);
  url.hash = "";
  url.search = "";
  return url.href;
};

/** Guarda a página só se for a apresentação aberta (com o portão à frente não serve offline). */
async function guardarPagina(cache, chave, res) {
  if (!res.ok) return false;
  const html = await res.clone().text();
  if (!html.includes(MARCA)) return false;
  await cache.put(chave, res);
  return true;
}

async function pagina(req) {
  const cache = await caches.open(CACHE);
  const chave = semExtras(req.url);
  const guardada = await cache.match(chave);
  const rede = fetch(req).then(async (res) => {
    await guardarPagina(cache, chave, res.clone());
    return res;
  });
  if (!guardada) return rede;
  // O botão "Atualizar" (?atualizar=…) espera pela rede o que for preciso; a cópia só sem rede nenhuma.
  if (new URL(req.url).searchParams.has("atualizar")) return rede.catch(() => guardada);
  const lenta = new Promise((ok) => setTimeout(() => ok(guardada), ESPERA_REDE));
  return Promise.race([rede.catch(() => guardada), lenta]);
}

async function guardarSeDer(cache, req, res) {
  if (res.ok && res.type === "basic") await cache.put(req, res.clone());
  return res;
}

async function estatico(req) {
  const cache = await caches.open(CACHE);
  return (await cache.match(req)) || guardarSeDer(cache, req, await fetch(req));
}

/** Fotografias: a guardada; sem ela e sem rede, a mesma foto noutro tamanho (o tablet rodou). */
async function imagem(req) {
  const cache = await caches.open(CACHE);
  const ja = await cache.match(req);
  if (ja) return ja;
  try {
    return await guardarSeDer(cache, req, await fetch(req));
  } catch (erro) {
    const foto = new URL(req.url).searchParams.get("url");
    if (foto) {
      for (const k of await cache.keys()) {
        if (new URL(k.url).searchParams.get("url") === foto) return cache.match(k);
      }
    }
    throw erro;
  }
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(pagina(req));
  if (url.pathname.startsWith("/_next/static/")) return e.respondWith(estatico(req));
  if (url.pathname === "/_next/image" || url.pathname.startsWith("/images/")) return e.respondWith(imagem(req));
});

/** Preparar o tablet: as páginas (sempre frescas) e cada recurso que ainda não esteja guardado. */
async function preparar({ paginas = [], recursos = [] }, cliente) {
  const cache = await caches.open(CACHE);
  const total = paginas.length + recursos.length;
  let feitos = 0;
  let falhas = 0;
  const avisar = () => cliente && cliente.postMessage({ tipo: "progresso", feitos, total });

  for (const p of paginas) {
    try {
      const res = await fetch(p, { credentials: "same-origin", cache: "no-store" });
      if (!(await guardarPagina(cache, semExtras(p), res))) falhas++;
    } catch {
      falhas++;
    }
    feitos++;
    avisar();
  }

  const fila = [...new Set(recursos)];
  const trabalhar = async () => {
    for (let u = fila.shift(); u; u = fila.shift()) {
      try {
        if (!(await cache.match(u))) {
          const res = await fetch(u, { credentials: "same-origin" });
          if (res.ok) await cache.put(u, res);
          else falhas++;
        }
      } catch {
        falhas++;
      }
      feitos++;
      avisar();
    }
  };
  await Promise.all(Array.from({ length: 6 }, trabalhar));

  if (cliente) cliente.postMessage({ tipo: "pronto", total, falhas });
}

self.addEventListener("message", (e) => {
  if (e.data && e.data.tipo === "preparar") e.waitUntil(preparar(e.data, e.source));
});
