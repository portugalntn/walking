/**
 * Full program detail data (product pages).
 * Keyed by the same id used in lib/destinations.ts routes.
 * Localised text uses { en, pt, es }. Trail names are proper nouns (kept).
 * Meals are keys translated in the UI. No em dashes (house rule).
 */

import type { L } from "./destinations";

export type Day = {
  day: number;
  title: L;
  trail?: string;
  description?: L;
  distance?: string;
  shape?: "circular" | "linear";
  ascent?: string;
  meals: ("breakfast" | "packedLunch" | "dinner")[];
  accommodation?: string;
  gallery?: string[];
  note?: L;
};

export type Program = {
  id: string;
  format: "roteiro" | "programa";
  title: string;
  subtitle: L;
  region: string;
  heroImage: string;
  duration: { days: number; nights: number };
  type: L;
  difficulty: L;
  season: L;
  startPoint: string;
  totalDistance: string;
  overview: L;
  days: Day[];
  included: L[];
  notIncluded: L[];
  extras: L[];
  highlights: L[];
  prices: {
    low: { from: number; single: number };
    high: { from: number; single: number };
  };
  payment: L[];
  cancellation: L[];
};

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });
const G = "/images/programs/douro/";

export const programs: Record<string, Program> = {
  "douro-8days": {
    id: "douro-8days",
    format: "programa",
    title: "Feel & Taste Douro Valley",
    subtitle: tri(
      "Douro Demarcated Region, UNESCO World Heritage",
      "Região Demarcada do Douro, Património Mundial UNESCO",
      "Región Demarcada del Duero, Patrimonio Mundial UNESCO"
    ),
    region: "Douro Valley",
    heroImage: "/images/programs/douro/hero-douro-v2.jpg",
    duration: { days: 8, nights: 7 },
    type: tri("Self-Guided", "Self-Guided", "Autoguiado"),
    difficulty: tri("Moderate", "Moderada", "Moderada"),
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Peso da Régua",
    totalDistance: "75 km",
    overview: tri(
      "This itinerary invites you to discover natural beauty, ancestral traditions and a renowned wine heritage. From the terraced vineyards of the Douro Valley to historic towns and scenic trails, each day blends nature, culture and local identity at a balanced pace, combining discovery with moments of rest in one of Portugal's most captivating regions.",
      "Este itinerário convida-o a descobrir beleza natural, tradições ancestrais e um património vinhateiro reconhecido. Dos socalcos do Vale do Douro às vilas históricas e trilhos cénicos, cada dia combina natureza, cultura e identidade local a um ritmo equilibrado, juntando a descoberta a momentos de descanso numa das regiões mais cativantes de Portugal.",
      "Este itinerario le invita a descubrir belleza natural, tradiciones ancestrales y un patrimonio vinícola reconocido. De los bancales del Valle del Duero a las villas históricas y senderos escénicos, cada día combina naturaleza, cultura e identidad local a un ritmo equilibrado, uniendo el descubrimiento a momentos de descanso en una de las regiones más cautivadoras de Portugal."
    ),
    days: [
      {
        day: 1,
        title: tri("Arrival in Peso da Régua", "Chegada a Peso da Régua", "Llegada a Peso da Régua"),
        description: tri(
          "Arrival and transfer to your hotel in the heart of the Douro. Settle in and enjoy a first evening by the river, in the capital of the demarcated wine region.",
          "Chegada e transfer para o seu hotel no coração do Douro. Instale-se e desfrute de um primeiro fim de tarde junto ao rio, na capital da região demarcada.",
          "Llegada y traslado a su hotel en el corazón del Duero. Instálese y disfrute de un primer atardecer junto al río, en la capital de la región demarcada."
        ),
        meals: [],
        accommodation: "Hotel Régua Douro",
        gallery: [`${G}douro-a.jpg`],
        note: tri("Transfer from the airport (120 km, 1h15).", "Transfer do aeroporto (120 km, 1h15).", "Traslado desde el aeropuerto (120 km, 1h15)."),
      },
      {
        day: 2,
        title: tri("Caminho dos Monges e Santiago", "Caminho dos Monges e Santiago", "Caminho dos Monges e Santiago"),
        trail: "Trilho do Caminho dos Monges e Santiago",
        description: tri(
          "A full day on the circular Monks and Santiago trail, climbing through terraced vineyards with sweeping views over the river. A packed lunch keeps you going between viewpoints.",
          "Um dia inteiro no trilho circular dos Monges e Santiago, subindo por socalcos de vinha com vistas amplas sobre o rio. Um almoço de piquenique acompanha-o entre miradouros.",
          "Un día completo en el sendero circular de los Monjes y Santiago, subiendo por bancales de viña con amplias vistas sobre el río. Un almuerzo de picnic le acompaña entre miradores."
        ),
        distance: "16,7 km",
        shape: "circular",
        ascent: "+634 / -634 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${G}monge-1.jpg`, `${G}monge-2.jpg`, `${G}douro-b.jpg`],
      },
      {
        day: 3,
        title: tri("Caminhada de Samodães", "Caminhada de Samodães", "Caminhada de Samodães"),
        trail: "Trilho da Caminhada de Samodães",
        description: tri(
          "A gentler walk down to Samodães, with the Douro always in sight. Visit the Douro Museum with a tasting before the transfer to Alijó for the night.",
          "Uma caminhada mais suave até Samodães, com o Douro sempre à vista. Visita ao Museu do Douro com prova antes do transfer para Alijó, onde passa a noite.",
          "Una caminata más suave hasta Samodães, con el Duero siempre a la vista. Visita al Museo del Duero con cata antes del traslado a Alijó, donde pasa la noche."
        ),
        distance: "9,4 km",
        shape: "linear",
        ascent: "+417 / -482 m",
        meals: ["breakfast"],
        accommodation: "Forrester Essence Douro, Alijó",
        gallery: [`${G}samodaes-1.jpg`, `${G}samodaes-2.jpg`, `${G}douro-c.jpg`],
      },
      {
        day: 4,
        title: tri("Alijó to Castedo", "Alijó a Castedo", "Alijó a Castedo"),
        trail: "Trilho de Alijó a Castedo",
        description: tri(
          "The longest day, a circular route between Alijó and Castedo through vineyards and schist villages, across wide plateaus and quiet country roads.",
          "O dia mais longo, um percurso circular entre Alijó e Castedo por vinhas e aldeias de xisto, por planaltos amplos e estradas rurais tranquilas.",
          "El día más largo, un recorrido circular entre Alijó y Castedo por viñedos y aldeas de esquisto, por amplias mesetas y caminos rurales tranquilos."
        ),
        distance: "19,6 km",
        shape: "circular",
        ascent: "+513 / -513 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${G}douro-b.jpg`, `${G}monge-3.jpg`, `${G}douro-d.jpg`],
      },
      {
        day: 5,
        title: tri("Alijó to Favaios", "Alijó a Favaios", "Alijó a Favaios"),
        trail: "Trilho de Alijó a Favaios",
        description: tri(
          "Walk to Favaios, one of the Douro wine villages, famous for its Moscatel and bread. Tastings at Quinta da Avessada and a visit to the Favaios Museum Center.",
          "Caminhada até Favaios, uma das Aldeias Vinhateiras do Douro, famosa pelo Moscatel e pelo pão. Provas na Quinta da Avessada e visita ao Centro Museológico de Favaios.",
          "Caminata hasta Favaios, una de las Aldeas Vinícolas del Duero, famosa por su Moscatel y su pan. Catas en la Quinta da Avessada y visita al Centro Museológico de Favaios."
        ),
        distance: "13,2 km",
        shape: "circular",
        ascent: "+306 / -306 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${G}douro-c.jpg`, `${G}monge-4.jpg`, `${G}douro-a.jpg`],
      },
      {
        day: 6,
        title: tri("Vineyards of Provesende", "Trilho Vinhateiro de Provesende", "Viñedos de Provesende"),
        trail: "Trilho Vinhateiro de Provesende",
        description: tri(
          "A short, scenic descent through the vineyards of Provesende, one of the region's most beautiful manor villages, before settling in Pinhão by the river.",
          "Uma descida curta e cénica pelas vinhas de Provesende, uma das mais belas aldeias senhoriais da região, antes de se instalar no Pinhão, junto ao rio.",
          "Un descenso corto y escénico por los viñedos de Provesende, una de las aldeas señoriales más bellas de la región, antes de instalarse en Pinhão, junto al río."
        ),
        distance: "7,7 km",
        shape: "linear",
        ascent: "+186 / -635 m",
        meals: ["breakfast"],
        accommodation: "LBV House Hotel, Pinhão",
        gallery: [`${G}douro-d.jpg`, `${G}monge-5.jpg`, `${G}samodaes-1.jpg`],
      },
      {
        day: 7,
        title: tri("Casal de Loivos to Pinhão", "Casal de Loivos a Pinhão", "Casal de Loivos a Pinhão"),
        trail: "Trilho de Casal de Loivos a Pinhão",
        description: tri(
          "From the legendary Casal de Loivos viewpoint down to Pinhão. A Rabelo boat ride and a tasting at Quinta do Bomfim round off the journey.",
          "Do lendário miradouro de Casal de Loivos até ao Pinhão. Um passeio de barco rabelo e uma prova na Quinta do Bomfim coroam a viagem.",
          "Desde el legendario mirador de Casal de Loivos hasta Pinhão. Un paseo en barco rabelo y una cata en la Quinta do Bomfim coronan el viaje."
        ),
        distance: "8,8 km",
        shape: "circular",
        ascent: "+490 / -490 m",
        meals: ["breakfast"],
        gallery: [`${G}douro-a.jpg`, `${G}monge-1.jpg`, `${G}monge-2.jpg`],
      },
      {
        day: 8,
        title: tri("Departure", "Partida", "Salida"),
        description: tri(
          "Time to say goodbye. Transfer to the station and a scenic train ride from Pinhão to Porto, included in your program.",
          "Hora da despedida. Transfer para a estação e uma viagem cénica de comboio do Pinhão para o Porto, incluída no programa.",
          "Hora de la despedida. Traslado a la estación y un viaje escénico en tren de Pinhão a Oporto, incluido en el programa."
        ),
        meals: ["breakfast"],
        note: tri(
          "Transfer to the railway station (1 km). Train ticket from Pinhão to Porto included.",
          "Transfer para a estação ferroviária (1 km). Bilhete de comboio de Pinhão para o Porto incluído.",
          "Traslado a la estación de tren (1 km). Billete de tren de Pinhão a Oporto incluido."
        ),
      },
    ],
    included: [
      tri("Accommodation with breakfast", "Alojamento com pequeno-almoço", "Alojamiento con desayuno"),
      tri("3 packed lunches", "3 almoços de piquenique", "3 almuerzos de picnic"),
      tri("Douro Museum visit (with tasting)", "Visita ao Museu do Douro (com prova)", "Visita al Museo del Duero (con cata)"),
      tri("Quinta do Valdalágea (with tastings)", "Quinta do Valdalágea (com provas)", "Quinta do Valdalágea (con catas)"),
      tri("Quinta da Pacheca (tastings and light meal)", "Quinta da Pacheca (provas e refeição ligeira)", "Quinta da Pacheca (catas y comida ligera)"),
      tri("Enoteca da Quinta da Avessada (with tastings)", "Enoteca da Quinta da Avessada (com provas)", "Enoteca da Quinta da Avessada (con catas)"),
      tri("Favaios Museum Center (with tasting)", "Centro Museológico de Favaios (com prova)", "Centro Museológico de Favaios (con cata)"),
      tri("Quinta do Bomfim (with tastings)", "Quinta do Bomfim (com provas)", "Quinta do Bomfim (con catas)"),
      tri("Rabelo boat ride", "Passeio de barco rabelo", "Paseo en barco rabelo"),
      tri("Train ticket from Pinhão to Porto", "Bilhete de comboio de Pinhão para o Porto", "Billete de tren de Pinhão a Oporto"),
      tri("All transport in the program", "Todos os transportes do programa", "Todos los transportes del programa"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [
      tri("Picnic", "Piquenique", "Picnic"),
      tri("Extra packed lunches", "Almoços de piquenique extra", "Almuerzos de picnic extra"),
      tri("Transfer to Porto Airport", "Transfer para o Aeroporto do Porto", "Traslado al Aeropuerto de Oporto"),
      tri("Extra nights in Porto", "Noites extra no Porto", "Noches extra en Oporto"),
    ],
    highlights: [
      tri("UNESCO World Heritage Site", "Património Mundial UNESCO", "Patrimonio Mundial UNESCO"),
      tri("Small rural villages", "Pequenas aldeias rurais", "Pequeñas aldeas rurales"),
      tri("Protected landscapes", "Paisagens protegidas", "Paisajes protegidos"),
      tri("Regional and traditional products", "Produtos regionais e tradicionais", "Productos regionales y tradicionales"),
      tri("Douro and Trás-os-Montes wine region", "Região vinhateira do Douro e Trás-os-Montes", "Región vinícola del Duero y Trás-os-Montes"),
    ],
    prices: {
      low: { from: 1340, single: 240 },
      high: { from: 1411, single: 295 },
    },
    payment: [
      tri("A 30% deposit confirms the booking.", "Um sinal de 30% confirma a reserva.", "Una señal del 30% confirma la reserva."),
      tri("The remaining balance is due 30 days before arrival.", "O restante é liquidado 30 dias antes da chegada.", "El resto se abona 30 días antes de la llegada."),
      tri("NET rates for agencies and tour operators.", "Tarifas NET para agências e operadores.", "Tarifas NET para agencias y operadores."),
    ],
    cancellation: [
      tri("Up to 30 days before arrival: full refund of the deposit.", "Até 30 dias antes da chegada: reembolso total do sinal.", "Hasta 30 días antes de la llegada: reembolso total de la señal."),
      tri("15 to 29 days before: 50% of the total.", "Entre 15 e 29 dias antes: 50% do total.", "Entre 15 y 29 días antes: 50% del total."),
      tri("Less than 15 days before: non-refundable.", "Menos de 15 dias antes: não reembolsável.", "Menos de 15 días antes: no reembolsable."),
      tri("Travel insurance is recommended.", "Recomendamos seguro de viagem.", "Recomendamos seguro de viaje."),
    ],
  },
};

export function getProgram(id: string): Program | undefined {
  return programs[id];
}
