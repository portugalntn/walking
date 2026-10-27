/**
 * Pré-visualização da equipa: a página de um produto com o que está gravado agora no FLOW,
 * antes de o site ser publicado outra vez (o site só lê o FLOW quando é construído).
 * Abre-se no FLOW (editor do produto > Pré-visualizar), com a mesma chave do EXCLUSIVE
 * (EXCLUSIVE_PREVIEW_KEY, no FLOW e aqui): /api/previa guarda um cookie de um dia e
 * a página /[locale]/previa/[id] só abre com ele. Só para o servidor.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import type { ProductEntry } from "./content";

export const COOKIE_PREVIA = "ntn-previa";
const chave = () => process.env.EXCLUSIVE_PREVIEW_KEY ?? "";

/** A chave do link bate com a do site. */
export function chaveCerta(dada: string): boolean {
  const k = chave();
  return k.length >= 12 && dada.length === k.length && timingSafeEqual(Buffer.from(dada), Buffer.from(k));
}

/** O valor do cookie: tirado da chave, sem a mostrar. Sem chave configurada, não há pré-visualização. */
export function marcaPrevia(): string | null {
  const k = chave();
  return k.length >= 12 ? createHash("sha256").update(`previa:${k}`).digest("hex").slice(0, 32) : null;
}

/** O produto tal como está gravado no FLOW agora (a mesma leitura que o build faz). */
export async function produtoDoFlow(id: string): Promise<{ entrada: ProductEntry; gravadoEm: string | null } | null> {
  const url = (process.env.FLOW_SUPABASE_URL ?? "").replace(/\/$/, "");
  const key = process.env.FLOW_SUPABASE_KEY ?? "";
  if (!url || !key || !/^[a-z0-9-]+$/.test(id)) return null;
  try {
    const r = await fetch(`${url}/rest/v1/walking_produtos?id=eq.${id}&select=id,dados,atualizado_em`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!r.ok) return null;
    const [linha] = (await r.json()) as { id: string; dados: Omit<ProductEntry, "id"> | null; atualizado_em: string | null }[];
    if (!linha?.dados) return null;
    return { entrada: { ...linha.dados, id: linha.id }, gravadoEm: linha.atualizado_em };
  } catch {
    return null;
  }
}
