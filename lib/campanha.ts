/**
 * De onde veio o visitante: os utm_ do link (uma campanha de tráfego pago, um e-mail, uma publicação no
 * Instagram ou no Facebook) e os identificadores dos anúncios (gclid, fbclid). O proxy guarda-os num cookie
 * quando a pessoa chega por um desses links (30 dias; um link novo substitui); os formulários juntam-nos
 * ao lead que vai para o FLOW (Comercial › Atendimento mostra a campanha).
 */

export const COOKIE_CAMPANHA = "ntn-campanha";
const CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;
const DIAS = 30;

/** Os utm_ (e os ids dos anúncios) de um endereço, com a página de entrada; nada se não tiver nenhum. */
export function campanhaDoUrl(url: URL): Record<string, string> | null {
  const c: Record<string, string> = {};
  for (const k of CHAVES) {
    const v = url.searchParams.get(k)?.trim();
    if (v) c[k] = v.slice(0, 120);
  }
  if (!Object.keys(c).length) return null;
  c.entrada = url.pathname.slice(0, 200);
  c.chegou_em = new Date().toISOString().slice(0, 10);
  return c;
}

/** O valor do cookie (o que o proxy grava). */
export const valorCookie = (c: Record<string, string>) => encodeURIComponent(JSON.stringify(c));
export const opcoesCookie = { path: "/", maxAge: DIAS * 24 * 3600, sameSite: "lax" as const, httpOnly: true, secure: process.env.NODE_ENV === "production" };

/** A campanha guardada no cookie de um pedido (só as chaves conhecidas, cortadas); vazio se não houver. */
export function lerCampanha(cabecalhoCookie: string | null): Record<string, string> {
  const bruto = (cabecalhoCookie ?? "")
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith(`${COOKIE_CAMPANHA}=`))
    ?.slice(COOKIE_CAMPANHA.length + 1);
  if (!bruto) return {};
  try {
    const j = JSON.parse(decodeURIComponent(bruto)) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const k of [...CHAVES, "entrada", "chegou_em"]) if (typeof j[k] === "string" && j[k]) out[k] = (j[k] as string).slice(0, 200);
    return out;
  } catch {
    return {};
  }
}
