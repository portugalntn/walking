// Exports every editable text of the site to FLOW, so its Site > Páginas forms
// cover all of them: messages/*.json, the code's short texts (lib/ui-texts.raw.ts),
// the grading scale, the EXCLUSIVE journeys and the FAQ / blog lists.
//
//   npm run textos              -> ../flow-ntn/lib/walking/catalogo-site.json
//   npm run textos -- <file>    -> somewhere else
//
// Run it whenever a text is added to the site, then commit the JSON in FLOW.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createJiti } from "jiti";

const root = resolve(import.meta.dirname, "..");
const out = resolve(root, process.argv[2] ?? "../flow-ntn/lib/walking/catalogo-site.json");
const jiti = createJiti(import.meta.url, { alias: { "@": root } });
const LOCS = ["en", "pt", "es"];

/** key -> { en, pt, es } */
const textos = {};

// 1) messages/*.json
const msgs = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(readFileSync(resolve(root, `messages/${l}.json`), "utf8"))]));
const andarMsgs = (o, p) => {
  if (typeof o === "string") {
    const v = {};
    for (const l of LOCS) v[l] = p.split(".").reduce((x, k) => (x == null ? x : x[k]), msgs[l]) ?? "";
    textos[p] = v;
  } else if (o && typeof o === "object") for (const [k, x] of Object.entries(o)) andarMsgs(x, p ? `${p}.${k}` : k);
};
andarMsgs(msgs.pt, "");

// 2) { en, pt, es } that live in the code
const isTri = (v) => v && typeof v === "object" && !Array.isArray(v) && typeof v.pt === "string" && typeof v.en === "string";
const andarTri = (v, p) => {
  if (isTri(v)) textos[p] = { en: v.en, pt: v.pt, es: v.es ?? "" };
  else if (Array.isArray(v)) v.forEach((x, i) => andarTri(x, `${p}.${i}`));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) andarTri(x, `${p}.${k}`);
};
const { UI_RAW } = await jiti.import(resolve(root, "lib/ui-texts.raw.ts"));
andarTri(UI_RAW, "ui");
const { gradesRaw } = await jiti.import(resolve(root, "lib/grades.ts"));
andarTri(gradesRaw.map((g) => ({ name: g.name, maxDistance: g.maxDistance, maxAscent: g.maxAscent, description: g.description })), "ui.grades");
const { journeys, dayTours } = await jiti.import(resolve(root, "lib/exclusive.ts"));
for (const j of journeys) andarTri({ name: j.name, angle: j.angle }, `ui.exclusive.${j.base}`);
for (const d of dayTours) andarTri({ name: d.name }, `ui.exclusive.${d.base}`);

// 3) lists edited as a whole
const { faqRowsRaw } = await jiti.import(resolve(root, "lib/faqs.ts"));
const { postsRaw } = await jiti.import(resolve(root, "lib/posts.ts"));

writeFileSync(
  out,
  JSON.stringify({ gerado: new Date().toISOString(), textos, listas: { faqs: faqRowsRaw, posts: postsRaw } }, null, 1) + "\n"
);
console.log(`[textos] ${Object.keys(textos).length} textos, ${faqRowsRaw.length} perguntas, ${postsRaw.length} artigos -> ${out}`);
