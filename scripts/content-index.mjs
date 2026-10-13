// Writes lib/content.generated.ts: one static import per file in content/.
// Static imports keep the data usable in client components and let new
// entries created in FLOW show up without touching code.
// Runs from next.config.ts (dev and build); `node scripts/content-index.mjs` also works.
import { readdirSync, readFileSync, writeFileSync, existsSync, watch } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "lib/content.generated.ts");
const SOURCES = [
  { name: "productFiles", dir: "content/produtos", prefix: "p" },
  { name: "regionFiles", dir: "content/destinos", prefix: "r" },
  { name: "pageFiles", dir: "content/paginas", prefix: "g" },
];

function render() {
  const imports = [];
  const maps = [];
  for (const { name, dir, prefix } of SOURCES) {
    const abs = join(ROOT, dir);
    const ids = existsSync(abs)
      ? readdirSync(abs).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).sort()
      : [];
    const entries = ids.map((id, i) => {
      const v = `${prefix}${i}`;
      imports.push(`import ${v} from "../${dir}/${id}.json";`);
      return `  ${JSON.stringify(id)}: ${v},`;
    });
    maps.push(`export const ${name} = {\n${entries.join("\n")}\n};`);
  }
  return `// Gerado por scripts/content-index.mjs a partir de content/. Não editar à mão.\n\n${imports.join("\n")}\n\n${maps.join("\n\n")}\n`;
}

export function writeContentIndex() {
  const next = render();
  const prev = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (next !== prev) writeFileSync(OUT, next);
}

/** Dev only: regenerate when `npm run conteudo` adds or removes an entry. */
export function watchContentIndex() {
  if (globalThis.__ntnContentWatch) return;
  globalThis.__ntnContentWatch = true;
  let timer;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(writeContentIndex, 300);
  };
  for (const { dir } of SOURCES) {
    const abs = join(ROOT, dir);
    if (existsSync(abs)) watch(abs, schedule);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) writeContentIndex();
