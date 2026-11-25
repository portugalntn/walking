/**
 * Os períodos das épocas escritos no FLOW (em português, ex.: "1 jan–30 abr; 16 out–31 dez") na língua da
 * página: troca os meses (e o "e" / "a" que os ligam). Sem período, a página usa as notas fixas
 * ("Novembro a Abril").
 */
type Loc = "pt" | "en" | "es";

const MESES: Record<Exclude<Loc, "pt">, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};
const PT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// "jan", "janeiro", "mar", "março", "marco", "mai", "maio"… (a palavra inteira, com ou sem ponto)
const MES_PT = /(^|[^a-zà-ú])(jan(?:eiro)?|fev(?:ereiro)?|mar(?:ço|co)?|abr(?:il)?|mai(?:o)?|jun(?:ho)?|jul(?:ho)?|ago(?:sto)?|set(?:embro)?|out(?:ubro)?|nov(?:embro)?|dez(?:embro)?)\.?(?=$|[^a-zà-ú])/gi;

export function periodoNaLingua(texto: string | null | undefined, locale: Loc): string {
  const s = String(texto ?? "").trim();
  if (!s || locale === "pt") return s;
  const meses = MESES[locale];
  return s
    .replace(MES_PT, (_t, antes: string, mes: string) => antes + meses[PT.indexOf(mes.slice(0, 3).toLowerCase())])
    .replace(/\s+e\s+/g, locale === "en" ? " and " : " y ")
    .replace(/\s+a\s+/g, locale === "en" ? " to " : " a ")
    .replace(/^todo o ano$/i, locale === "en" ? "All year" : "Todo el año");
}
