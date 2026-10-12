// Pulls the site content edited in FLOW (Supabase: walking_produtos, walking_regioes)
// into content/*.json, before `next build`. "Publicar" in FLOW triggers that build.
//
// Needs FLOW_SUPABASE_URL and FLOW_SUPABASE_KEY (the publishable key; the tables
// are readable by anon). Without them, or if Supabase fails, the committed
// content/*.json is used as is, so the site still builds.
//
//   npm run conteudo      pull now (local dev)
import { mkdirSync, readdirSync, rmSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Local runs read .env.local (Next only loads it for next itself).
const envFile = join(ROOT, ".env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const URL_ = (process.env.FLOW_SUPABASE_URL ?? "").replace(/\/$/, "");
const KEY = process.env.FLOW_SUPABASE_KEY ?? "";
const ID_OK = /^[a-z0-9-]+$/;

async function table(name) {
  const r = await fetch(`${URL_}/rest/v1/${name}?select=id,dados&order=id`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
  });
  if (!r.ok) throw new Error(`${name}: HTTP ${r.status} ${await r.text()}`);
  return r.json();
}

function write(dir, rows) {
  const abs = join(ROOT, dir);
  mkdirSync(abs, { recursive: true });
  const keep = new Set();
  for (const { id, dados } of rows) {
    if (!ID_OK.test(id)) continue;
    keep.add(`${id}.json`);
    writeFileSync(join(abs, `${id}.json`), JSON.stringify(dados, null, 2) + "\n");
  }
  for (const f of readdirSync(abs)) if (f.endsWith(".json") && !keep.has(f)) rmSync(join(abs, f));
  return keep.size;
}

if (!URL_ || !KEY) {
  console.log("[conteudo] FLOW_SUPABASE_URL/KEY em falta: uso os content/*.json do repo.");
} else {
  try {
    const [produtos, regioes] = await Promise.all([table("walking_produtos"), table("walking_regioes")]);
    // An empty answer means something is wrong (RLS, wrong project): never wipe the site.
    if (!produtos.length || !regioes.length) throw new Error("resposta vazia");
    const regionIds = new Set(regioes.map((r) => r.id));
    const orphan = produtos.filter((p) => !regionIds.has(p.dados?.regionId)).map((p) => p.id);
    if (orphan.length) console.warn(`[conteudo] produtos com região inexistente: ${orphan.join(", ")}`);
    console.log(`[conteudo] FLOW: ${write("content/produtos", produtos)} produtos, ${write("content/destinos", regioes)} regiões.`);
  } catch (e) {
    console.warn(`[conteudo] Não deu para ler o FLOW (${e.message}). Uso os content/*.json do repo.`);
  }
}
