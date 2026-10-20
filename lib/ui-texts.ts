import { editable } from "./pages";
import { UI_RAW } from "./ui-texts.raw";

/** The code's short texts with what was edited in FLOW applied ("ui.<group>.<key>"). */
export const UI = editable("ui", UI_RAW);

type Loc = "en" | "pt" | "es";
/** One of those texts in a language, for places outside React (metadata). */
export function uiText(group: keyof typeof UI, key: string, locale: string): string {
  const v = (UI[group] as Record<string, Record<Loc, string>>)[key];
  return v?.[(locale as Loc) in v ? (locale as Loc) : "en"] ?? "";
}
