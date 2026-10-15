/**
 * Envio de leads B2B para o FLOW (Supabase do FLOW NTN).
 *
 * Só servidor. Usa a chave pública e a função registar_lead_site(), que é
 * a única porta de escrita que o site tem: a tabela comercial_leads não
 * tem nenhuma policy para anon, por isso o site não lê nem altera leads.
 * Ver flow-ntn/supabase/012-comercial-leads.sql.
 */

export type LeadSite = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  pais: string;
  tipoEmpresa: string;
  interesse: string;
  mensagem: string;
  idioma: string;
  dados: Record<string, string>;
};

export function flowConfigurado() {
  return Boolean(process.env.FLOW_SUPABASE_URL && process.env.FLOW_SUPABASE_KEY);
}

export async function registarLeadNoFlow(lead: LeadSite): Promise<{ ok: true } | { ok: false; motivo: string }> {
  const url = process.env.FLOW_SUPABASE_URL;
  const key = process.env.FLOW_SUPABASE_KEY;
  if (!url || !key) return { ok: false, motivo: "FLOW_SUPABASE_URL / FLOW_SUPABASE_KEY em falta" };

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/registar_lead_site`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_nome: lead.nome,
      p_empresa: lead.empresa,
      p_email: lead.email,
      p_telefone: lead.telefone,
      p_pais: lead.pais,
      p_tipo_empresa: lead.tipoEmpresa,
      p_interesse: lead.interesse,
      p_mensagem: lead.mensagem,
      p_idioma: lead.idioma,
      p_dados: lead.dados,
    }),
    cache: "no-store",
  });

  if (!res.ok) return { ok: false, motivo: `FLOW respondeu ${res.status}: ${await res.text()}` };
  return { ok: true };
}

/** Cookie que abre a página depois do formulário de acesso. */
export const EX_ACCESS_COOKIE = "ex-acesso";

/** Pedido B2C do site: "Pedir proposta" ou "Fazer uma pergunta" (flow-ntn/supabase/016). */
export type PedidoSite = {
  tipo: "proposta" | "pergunta";
  nome: string;
  email: string;
  telefone: string;
  pessoas: number | null;
  mensagem: string;
  produtoId: string;
  produtoTitulo: string;
  idioma: string;
  consentimento: boolean;
  dados: Record<string, string>;
};

export async function registarPedidoNoFlow(p: PedidoSite): Promise<{ ok: true } | { ok: false; motivo: string }> {
  const url = process.env.FLOW_SUPABASE_URL;
  const key = process.env.FLOW_SUPABASE_KEY;
  if (!url || !key) return { ok: false, motivo: "FLOW_SUPABASE_URL / FLOW_SUPABASE_KEY em falta" };

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/registar_pedido_site`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_tipo: p.tipo,
      p_nome: p.nome,
      p_email: p.email,
      p_telefone: p.telefone,
      p_pessoas: p.pessoas,
      p_mensagem: p.mensagem,
      p_produto_id: p.produtoId,
      p_produto_titulo: p.produtoTitulo,
      p_idioma: p.idioma,
      p_consentimento: p.consentimento,
      p_dados: p.dados,
    }),
    cache: "no-store",
  });

  if (!res.ok) return { ok: false, motivo: `FLOW respondeu ${res.status}: ${await res.text()}` };
  return { ok: true };
}
