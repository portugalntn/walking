/**
 * EXCLUSIVE (B2B) data layer.
 *
 * Deriva de lib/programs.ts de propósito: os dias, a distância e as imagens
 * têm uma fonte única. O que vive aqui é só o que o EXCLUSIVE acrescenta,
 * ou seja, o nome do produto elevado e o ângulo que o torna exclusivo.
 *
 * Regra do EXCLUSIVE: nenhum preço é lido nem exposto nestas páginas.
 * No em dashes (house rule).
 */

import { programs } from "./programs";
import { productEntries } from "./content";
import type { L } from "./destinations";
import { editable, pageImage } from "./pages";

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });

export type ExJourney = {
  /** id do programa em lib/programs.ts, a base partilhada com o site público */
  base: string;
  /** nome do produto na versão EXCLUSIVE, diferente do público */
  name: L;
  /** o que muda em relação ao produto público */
  angle: L;
  region: ExRegionId;
  days: number;
  image: string;
};

/** O território do produto (no FLOW: a região), com o nome que a página usa. */
const TERRITORIO: Record<string, ExRegionId> = { douro: "douro", "tras-os-montes": "tras", "peneda-geres": "geres", santiago: "santiago" };
const territorio = (base: string): ExRegionId => TERRITORIO[productEntries.find((e) => e.id === base)?.regionId ?? ""] ?? "douro";

const j = (base: string, name: L, angle: L, image?: string): ExJourney => {
  const p = programs[base];
  // Editable in FLOW: "ui.exclusive.<base>.name" and ".angle" (Site > Páginas > EXCLUSIVE).
  const tx = editable(`ui.exclusive.${base}`, { name, angle });
  return {
    base,
    name: tx.name,
    angle: tx.angle,
    region: territorio(base),
    days: p.duration.days,
    // A foto pode ser trocada no FLOW (Site › Páginas › EXCLUSIVE · Coleção › Viagens).
    image: pageImage("exclusive", `viagem.${base}`, image ?? p.heroImage),
  };
};

/** Multi-day. O coração do EXCLUSIVE. */
export const journeys: ExJourney[] = [
  j(
    "douro-8days",
    tri("Douro, Private Estates", "Douro, Quintas Privadas", "Duero, Quintas Privadas"),
    tri(
      "Eight days along the terraces with private access to family estates, cellar tastings closed to the public and a table set among the vines.",
      "Oito dias pelos socalcos com acesso privado a quintas de família, provas em adega fechadas ao público e uma mesa posta no meio das vinhas.",
      "Ocho días por los bancales con acceso privado a quintas familiares, catas en bodega cerradas al público y una mesa puesta entre las viñas."
    ),
    "/images/programs/douro/douro-a.jpg"
  ),
  j(
    "tras-8days",
    tri("Trás-os-Montes, The Last Frontier", "Trás-os-Montes, A Última Fronteira", "Trás-os-Montes, La Última Frontera"),
    tri(
      "The plateau at its own pace, with village houses opened for the group, a Mirandese supper and the Douro International at first light.",
      "O planalto ao ritmo dele, com casas de aldeia abertas para o grupo, uma ceia mirandesa e o Douro Internacional ao primeiro sol.",
      "La meseta a su propio ritmo, con casas de aldea abiertas para el grupo, una cena mirandesa y el Duero Internacional al amanecer."
    )
  ),
  j(
    "geres-8days",
    tri("Peneda Gerês, Granite and Water", "Peneda Gerês, Granito e Água", "Peneda Gerês, Granito y Agua"),
    tri(
      "Portugal's only national park walked with the shepherds who still use it, ending each day in houses that hold no more than twelve guests.",
      "O único parque nacional de Portugal caminhado com os pastores que ainda o usam, terminando o dia em casas que não recebem mais de doze hóspedes.",
      "El único parque nacional de Portugal caminado con los pastores que aún lo usan, terminando el día en casas que no reciben más de doce huéspedes."
    )
  ),
];

export type ExDayTour = {
  base: string;
  name: L;
  region: ExRegionId;
  image: string;
};

const d = (base: string, name: L, image?: string): ExDayTour => {
  const p = programs[base];
  const tx = editable(`ui.exclusive.${base}`, { name });
  return { base, name: tx.name, region: territorio(base), image: pageImage("exclusive", `viagem.${base}`, image ?? p.heroImage) };
};

/** One day. Só o Norte: os quatro territórios do EXCLUSIVE. */
export const dayTours: ExDayTour[] = [
  d("douro-1day", tri("A Table in the Vineyard", "Uma Mesa na Vinha", "Una Mesa en la Viña"), "/images/programs/douro-1day/walk-2.jpg"),
  d("monks-1day", tri("The Monks' Path", "O Caminho dos Monges", "El Camino de los Monjes"), "/images/programs/douro-8days/monge-2.jpg"),
  d("saomamede-1day", tri("São Mamede, Above the River", "São Mamede, Sobre o Rio", "São Mamede, Sobre el Río"), "/images/programs/douro-8days/monge-4.jpg"),
  d("vidago-1day", tri("Vidago, Spa Town and Vines", "Vidago, Termas e Vinha", "Vidago, Termas y Viña"), "/images/programs/vidago-1day/tras-os-montes-1.jpg"),
  d("chaves-1day", tri("Chaves and the Roman Bridge", "Chaves e a Ponte Romana", "Chaves y el Puente Romano")),
  d("podence-1day", tri("Podence, Land of the Caretos", "Podence, Terra dos Caretos", "Podence, Tierra de los Caretos")),
].filter((t) => programs[t.base]);

/** Imagens da coleção. Cada uma pode ser trocada no FLOW (Site › Páginas › EXCLUSIVE · Coleção). */
export const exImages = {
  hero: pageImage("exclusive", "hero", "/images/programs/douro-1day/walk-4.jpg"),
  origemA: pageImage("exclusive", "origemA", "/images/consulting/c-sinal-8.jpg"),
  origemB: pageImage("exclusive", "origemB", "/images/programs/douro-8days/samodaes-2.jpg"),
  douro: pageImage("exclusive", "douro", "/images/programs/douro-8days/douro-c.jpg"),
  tras: pageImage("exclusive", "tras", "/images/programs/tras-8days/picote-2.jpg"),
  geres: pageImage("exclusive", "geres", "/images/programs/geres-8days/geres-a.jpg"),
  santiago: pageImage("exclusive", "santiago", "/images/programs/douro-1day/walk-1.jpg"),
  mesa: pageImage("exclusive", "mesa", "/images/programs/tras-8days/tom-a.jpg"),
  vinho: pageImage("exclusive", "vinho", "/images/programs/douro-1day/walk-3.jpg"),
  azeite: pageImage("exclusive", "azeite", "/images/programs/tras-8days/azeite-1.jpg"),
  cultura: pageImage("exclusive", "cultura", "/images/programs/tras-8days/palacios-1.jpg"),
  natureza: pageImage("exclusive", "natureza", "/images/programs/geres-8days/geres-f.jpg"),
  padrao: pageImage("exclusive", "padrao", "/images/programs/douro-1day/hero-douro-1day.jpg"),
};

export type ExRegionId = "douro" | "tras" | "geres" | "santiago";
/** A ordem dos territórios na página (de oeste para leste, e o Caminho por fim). */
export const regionIds: ExRegionId[] = ["geres", "douro", "tras", "santiago"];
