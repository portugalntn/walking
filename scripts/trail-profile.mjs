#!/usr/bin/env node
/**
 * Builds the elevation profile of a product from its GPS file.
 *
 *   npm run trail -- <program-id> <file.kml|kmz|gpx|geojson>
 *   npm run trail -- douro-1day "\\NTN\Walking\...\ALJ_PR20_QtaBonfim.kmz"
 *
 * Writes ONLY distance and altitude (km, metres) to lib/trail-profiles.json.
 * The route itself (coordinates) is never stored in the site: the elevation
 * graph cannot be turned back into a map.
 *
 * Altitude: taken from the file when it has it; otherwise sampled from the
 * EU-DEM 25 m terrain model (api.opentopodata.org, public trail points only).
 * No dependencies: KMZ is unzipped with node:zlib.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const SAMPLES = 120;
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..", "lib", "trail-profiles.json");

const [id, file] = process.argv.slice(2);
if (!id || !file) {
  console.error("Uso: npm run trail -- <id-do-programa> <ficheiro .kml|.kmz|.gpx|.geojson>");
  process.exit(1);
}

// ── Read the file into a list of lines, each [lon, lat, ele?][] ──
function unzipFirstKml(buf) {
  // Minimal zip reader: walk the central directory, inflate the first .kml.
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) throw new Error("KMZ inválido (não é um zip).");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28), extraLen = buf.readUInt16LE(p + 30), commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    if (name.toLowerCase().endsWith(".kml")) {
      const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
      const data = buf.subarray(start, start + size);
      return (method === 0 ? data : zlib.inflateRawSync(data)).toString("utf8");
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error("O KMZ não tem nenhum .kml lá dentro.");
}

function readLines(f) {
  const ext = path.extname(f).toLowerCase();
  const raw = fs.readFileSync(f);
  if (ext === ".geojson" || ext === ".json") {
    const j = JSON.parse(raw.toString("utf8"));
    const geoms = (j.features ?? [j]).map((ft) => ft.geometry ?? ft);
    return geoms.flatMap((g) => (g.type === "LineString" ? [g.coordinates] : g.type === "MultiLineString" ? g.coordinates : []));
  }
  if (ext === ".gpx") {
    const t = raw.toString("utf8");
    return [...t.matchAll(/<trkseg>([\s\S]*?)<\/trkseg>/g)].map((seg) =>
      [...seg[1].matchAll(/<trkpt[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"[^>]*>([\s\S]*?)<\/trkpt>/g)].map((m) => {
        const ele = /<ele>([^<]+)<\/ele>/.exec(m[3]);
        return [Number(m[2]), Number(m[1]), ele ? Number(ele[1]) : 0];
      })
    );
  }
  if (ext === ".kml" || ext === ".kmz") {
    const t = ext === ".kmz" ? unzipFirstKml(raw) : raw.toString("utf8");
    return [...t.matchAll(/<coordinates>([\s\S]*?)<\/coordinates>/g)]
      .map((m) => m[1].trim().split(/\s+/).map((p) => p.split(",").map(Number)))
      .filter((line) => line.length > 1);
  }
  throw new Error(`Formato não suportado: ${ext}`);
}

const R = 6371, rad = Math.PI / 180;
const hav = (a, b) => {
  const dl = (b[1] - a[1]) * rad, dn = (b[0] - a[0]) * rad;
  const h = Math.sin(dl / 2) ** 2 + Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const lengthOf = (line) => line.reduce((s, p, i) => (i ? s + hav(line[i - 1], p) : 0), 0);

// The trail is the longest line in the file (files often carry extra bits).
const lines = readLines(file);
if (!lines.length) throw new Error("Não encontrei nenhuma linha de percurso no ficheiro.");
const line = lines.reduce((best, l) => (lengthOf(l) > lengthOf(best) ? l : best));

const cum = [0];
for (let i = 1; i < line.length; i++) cum.push(cum[i - 1] + hav(line[i - 1], line[i]));
const total = cum[cum.length - 1];

// Evenly spaced samples along the distance.
const samples = Array.from({ length: SAMPLES }, (_, s) => {
  const k = (s * total) / (SAMPLES - 1);
  let i = cum.findIndex((c) => c >= k);
  if (i <= 0) i = 1;
  const f = (k - cum[i - 1]) / Math.max(cum[i] - cum[i - 1], 1e-9);
  const a = line[i - 1], b = line[i];
  return { km: k, lon: a[0] + (b[0] - a[0]) * f, lat: a[1] + (b[1] - a[1]) * f, ele: (a[2] ?? 0) + ((b[2] ?? 0) - (a[2] ?? 0)) * f };
});

let source = "ficheiro GPS";
if (samples.every((s) => !s.ele)) {
  source = "EU-DEM 25 m (OpenTopoData)";
  for (let i = 0; i < samples.length; i += 100) {
    const chunk = samples.slice(i, i + 100);
    const res = await fetch("https://api.opentopodata.org/v1/eudem25m", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locations: chunk.map((s) => `${s.lat.toFixed(6)},${s.lon.toFixed(6)}`).join("|") }),
    });
    const j = await res.json();
    if (j.status !== "OK") throw new Error(`Serviço de altitude falhou: ${JSON.stringify(j).slice(0, 200)}`);
    j.results.forEach((r, n) => (chunk[n].ele = r.elevation));
    if (i + 100 < samples.length) await new Promise((r) => setTimeout(r, 1100)); // 1 pedido por segundo
  }
}

const profile = samples.map((s) => [Number(s.km.toFixed(2)), Math.round(s.ele)]);
const elev = profile.map((p) => p[1]);
let gain = 0, loss = 0;
for (let i = 1; i < elev.length; i++) {
  const d = elev[i] - elev[i - 1];
  if (d > 0) gain += d; else loss -= d;
}

const all = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
all[id] = { length: Number(total.toFixed(2)), source, profile };
fs.writeFileSync(OUT, JSON.stringify(all, null, 2) + "\n");

console.log(`${id}: ${total.toFixed(2)} km, ${Math.min(...elev)}–${Math.max(...elev)} m, +${gain} / -${loss} m (amostrado), fonte: ${source}`);
console.log("Confirme estes valores com a ficha do produto antes de publicar.");
