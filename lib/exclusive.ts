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
import type { L } from "./destinations";
import { editable } from "./pages";

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });

export type ExJourney = {
  /** id do programa em lib/programs.ts, a base partilhada com o site público */
  base: string;
  /** nome do produto na versão EXCLUSIVE, diferente do público */
  name: L;
  /** o que muda em relação ao produto público */
  angle: L;
  region: string;
  days: number;
  distance: string;
  image: string;
};

const j = (base: string, name: L, angle: L, image?: string): ExJourney => {
  const p = programs[base];
  // Editable in FLOW: "ui.exclusive.<base>.name" and ".angle" (Site > Páginas > EXCLUSIVE).
  const tx = editable(`ui.exclusive.${base}`, { name, angle });
  return {
    base,
    name: tx.name,
    angle: tx.angle,
    region: p.region,
    days: p.duration.days,
    distance: p.totalDistance,
    image: image ?? p.heroImage,
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
  region: string;
  distance: string;
  walkTime: string;
  image: string;
};

const d = (base: string, name: L, walkTime = "2h"): ExDayTour => {
  const p = programs[base];
  const tx = editable(`ui.exclusive.${base}`, { name });
  return { base, name: tx.name, region: p.region, distance: p.totalDistance, walkTime, image: p.heroImage };
};

/** Day tours. Mais curtos, mesma exigência de mesa e de acesso. */
export const dayTours: ExDayTour[] = [
  d("douro-1day", tri("A Table in the Vineyard", "Uma Mesa na Vinha", "Una Mesa en la Viña")),
  d("sintra-1day", tri("The Sacred Mountain", "A Serra Sagrada", "La Sierra Sagrada")),
  d("arrabida-1day", tri("Arrábida, Sea and Cellar", "Arrábida, Mar e Adega", "Arrábida, Mar y Bodega")),
  d("cacela-1day", tri("The Lagoon at Cacela", "A Ria de Cacela", "La Ría de Cacela")),
  d("algarve-1day", tri("The Vincentian Cliffs", "As Falésias Vicentinas", "Los Acantilados Vicentinos")),
  d("tras-1day", tri("Olive Oil and a Village Table", "Azeite e Mesa de Aldeia", "Aceite y Mesa de Aldea")),
];

/**
 * Itinerário em destaque. O caminho desenha-se a partir dos dias do produto
 * (título e distância de cada dia), por isso nada aqui é posição à mão.
 * photoDay: o dia em que a fotografia foi tirada (o miradouro de Casal de
 * Loivos, no dia "Casal de Loivos a Pinhão"); fica assinalado no caminho.
 */
export const featured = {
  base: "douro-8days",
  name: journeys[0].name,
  image: journeys[0].image,
  photoDay: 7,
};
