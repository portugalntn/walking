/**
 * Full program detail data (product pages).
 * Keyed by the same id used in lib/destinations.ts routes.
 * Localised text uses { en, pt, es }. Trail names are proper nouns (kept).
 * Meals are keys translated in the UI. No em dashes (house rule).
 */

import type { L } from "./destinations";
import type { GradeLevel } from "./grades";

export type Day = {
  day: number;
  title: L;
  trail?: string;
  description?: L;
  distance?: string;
  shape?: "circular" | "linear";
  ascent?: string;
  /** Walking time for the day, e.g. "2h". Used mainly by 1-day routes. */
  walkTime?: string;
  /** Elevation profile of the trail, in metres. Shown as a small stats row. */
  elevation?: { min: number; avg: number; max: number; gain: number; loss: number };
  meals: ("breakfast" | "packedLunch" | "dinner")[];
  accommodation?: string;
  gallery?: string[];
  note?: L;
};

/** A stop in the day, placed by its km on the trail. Drives the day timeline. */
export type Moment = {
  km: number;
  title: L;
  text: L;
  image?: string;
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
  /** Walking difficulty grade (1 to 5) on the NTN scale. See lib/grades.ts. */
  grade: GradeLevel;
  season: L;
  /** Proper noun (string) or a localised phrase such as "to be confirmed". */
  startPoint: string | L;
  totalDistance: string;
  /** Paragraphs separated by a blank line ("\n\n"). Same for Day.description. */
  overview: L;
  /** Program-specific note shown under the difficulty gauge. */
  difficultyNote?: L;
  /** The day, step by step (1-day programs). */
  moments?: Moment[];
  days: Day[];
  included: L[];
  notIncluded: L[];
  extras: L[];
  highlights: L[];
  /** Season-based pricing (multi-day programs). Omit for per-group day routes. */
  prices?: {
    low: { from: number; single: number };
    /** Omit when the program has a single year-round price. */
    high?: { from: number; single: number };
  };
  /** Per-group pricing tiers (1-day guided routes): total price by group size. */
  priceTiers?: { pax: number; price: number }[];
  /** Note shown under the price tiers, e.g. groups above 6 on request. */
  priceTiersNote?: L;
  /** Optional commercial condition shown under the price cards. */
  priceCondition?: L;
  payment: L[];
  cancellation: L[];
};

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });
const G = "/images/programs/douro/";
const T = "/images/programs/tras-os-montes/";
const P = "/images/programs/geres/";
const D1 = "/images/programs/douro-1day/";
const SI = "/images/programs/sintra-1day/";
const AL = "/images/programs/algarve-1day/";
const TR = "/images/programs/tras-1day/";
const CA = "/images/programs/cacela-1day/";
const AB = "/images/programs/arrabida-1day/";

const sharedPayment: L[] = [
  tri("A 30% deposit confirms the booking.", "Um sinal de 30% confirma a reserva.", "Una señal del 30% confirma la reserva."),
  tri("The remaining balance is due 30 days before arrival.", "O restante é liquidado 30 dias antes da chegada.", "El resto se abona 30 días antes de la llegada."),
  tri("Bank transfer, Multibanco or MB WAY.", "Transferência bancária, Multibanco ou MB WAY.", "Transferencia bancaria, Multibanco o MB WAY."),
];

const tiersNoteOver6: L = tri(
  "For groups larger than 6 people, price on request.",
  "Para grupos com mais de 6 pessoas, preço sob consulta.",
  "Para grupos de más de 6 personas, precio bajo consulta."
);

const sharedCancellation: L[] = [
  tri("Up to 30 days before arrival: full refund of the deposit.", "Até 30 dias antes da chegada: reembolso total do sinal.", "Hasta 30 días antes de la llegada: reembolso total de la señal."),
  tri("15 to 29 days before: 50% of the total.", "Entre 15 e 29 dias antes: 50% do total.", "Entre 15 y 29 días antes: 50% del total."),
  tri("Less than 15 days before: non-refundable.", "Menos de 15 dias antes: não reembolsável.", "Menos de 15 días antes: no reembolsable."),
  tri("Travel insurance is recommended.", "Recomendamos seguro de viagem.", "Recomendamos seguro de viaje."),
];

/** Items shared by the 2027 one-day programs. */
const inc = {
  guide: tri("Expert guide", "Guia especializado", "Guía especializado"),
  walk: tri("Guided walk", "Caminhada guiada", "Caminata guiada"),
  snacks: tri("Drinks and snacks during the walk", "Bebidas e snacks durante a caminhada", "Bebidas y aperitivos durante la caminata"),
  insurance: tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
};

const exc = {
  /** Transfer to the meeting point. pt carries its own preposition ("no Pinhão", "em Vidago"). */
  transfer: (en: string, pt: string, es: string): L =>
    tri(
      `Transfer between your accommodation and the meeting point in ${en}`,
      `Transfer entre o alojamento e o ponto de encontro ${pt}`,
      `Traslado entre el alojamiento y el punto de encuentro en ${es}`
    ),
  transport: tri("Transport during the program", "Transporte durante o programa", "Transporte durante el programa"),
  personal: tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
  rest: tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
};

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
    grade: 3,
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
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "tras-8days": {
    id: "tras-8days",
    format: "programa",
    title: "The Essence of Trás-os-Montes",
    subtitle: tri(
      "Vast plateaus, deep valleys and timeless villages",
      "Planaltos imensos, vales profundos e aldeias intemporais",
      "Mesetas inmensas, valles profundos y aldeas atemporales"
    ),
    region: "Trás-os-Montes",
    heroImage: `${T}miranda-1.jpg`,
    duration: { days: 8, nights: 7 },
    type: tri("Self-Guided", "Self-Guided", "Autoguiado"),
    difficulty: tri("Difficult", "Difícil", "Difícil"),
    grade: 4,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Palácios, Bragança",
    totalDistance: "104 km",
    overview: tri(
      "Discover the vast plateaus, deep river valleys and timeless rural villages of Trás-os-Montes. Each step reveals dramatic landscapes, olive groves, stone chapels and a living heritage rooted in daily life. This itinerary is an authentic journey into one of Portugal's most preserved and characterful regions, enriched by local gastronomy and genuine community encounters.",
      "Descubra os planaltos imensos, os vales profundos e as aldeias rurais intemporais de Trás-os-Montes. Cada passo revela paisagens dramáticas, olivais, capelas de pedra e um património vivo enraizado no dia a dia. Este itinerário é uma viagem autêntica a uma das regiões mais preservadas e genuínas de Portugal, enriquecida pela gastronomia local e por encontros verdadeiros com as comunidades.",
      "Descubra las inmensas mesetas, los valles profundos y las aldeas rurales atemporales de Trás-os-Montes. Cada paso revela paisajes dramáticos, olivares, capillas de piedra y un patrimonio vivo arraigado en la vida diaria. Este itinerario es un viaje auténtico a una de las regiones más preservadas y genuinas de Portugal, enriquecido por la gastronomía local y encuentros verdaderos con las comunidades."
    ),
    days: [
      {
        day: 1,
        title: tri("Arrival in Palácios", "Chegada a Palácios", "Llegada a Palácios"),
        description: tri(
          "Arrival and transfer to Palácios, a small village in the Montesinho Natural Park. Settle into Casal de Palácios and enjoy a welcome dinner of regional cuisine.",
          "Chegada e transfer para Palácios, uma pequena aldeia no Parque Natural de Montesinho. Instale-se no Casal de Palácios e desfrute de um jantar de boas-vindas com cozinha regional.",
          "Llegada y traslado a Palácios, una pequeña aldea en el Parque Natural de Montesinho. Instálese en el Casal de Palácios y disfrute de una cena de bienvenida con cocina regional."
        ),
        meals: ["dinner"],
        accommodation: "Casal de Palácios",
        gallery: [`${T}palacios-1.jpg`],
        note: tri("Transfer from the airport (225 km, 2h30).", "Transfer do aeroporto (225 km, 2h30).", "Traslado desde el aeropuerto (225 km, 2h30)."),
      },
      {
        day: 2,
        title: tri("Trilho do Aeródromo de Bragança", "Trilho do Aeródromo de Bragança", "Trilho do Aeródromo de Bragança"),
        trail: "Trilho do Aeródromo de Bragança",
        description: tri(
          "A linear walk through the Montesinho Natural Park towards Bragança, crossing oak woods, streams and quiet hamlets such as Gimonde, with its medieval bridge.",
          "Uma caminhada linear pelo Parque Natural de Montesinho em direcção a Bragança, atravessando carvalhais, ribeiras e aldeias tranquilas como Gimonde, com a sua ponte medieval.",
          "Una caminata lineal por el Parque Natural de Montesinho en dirección a Braganza, atravesando robledales, arroyos y aldeas tranquilas como Gimonde, con su puente medieval."
        ),
        distance: "16,5 km",
        shape: "linear",
        ascent: "+540 / -348 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${T}gimonde-1.jpg`, `${T}palacios-4.jpg`],
      },
      {
        day: 3,
        title: tri("Trilho de São Julião de Palácios", "Trilho de São Julião de Palácios", "Trilho de São Julião de Palácios"),
        trail: "Trilho de São Julião de Palácios",
        description: tri(
          "A circular route around São Julião de Palácios, among granite outcrops, chestnut groves and meadows where donkeys still graze. Rural Trás-os-Montes at its most genuine.",
          "Um percurso circular em torno de São Julião de Palácios, entre afloramentos graníticos, soutos e lameiros onde ainda pastam burros. O Trás-os-Montes rural no seu estado mais genuíno.",
          "Un recorrido circular en torno a São Julião de Palácios, entre afloramientos graníticos, sotos de castaños y prados donde aún pastan burros. El Trás-os-Montes rural en su estado más genuino."
        ),
        distance: "13 km",
        shape: "circular",
        ascent: "+429 / -429 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${T}palacios-2.jpg`, `${T}palacios-3.jpg`],
      },
      {
        day: 4,
        title: tri("Trilho dos Miradouros", "Trilho dos Miradouros", "Trilho dos Miradouros"),
        trail: "Trilho dos Miradouros",
        description: tri(
          "The viewpoints trail leads you to the Mirandese Plateau and the canyons of the Douro International Natural Park. Night in Miranda do Douro, capital of a unique culture and language.",
          "O trilho dos miradouros conduz ao Planalto Mirandês e aos canhões do Parque Natural do Douro Internacional. Noite em Miranda do Douro, capital de uma cultura e de uma língua únicas.",
          "El sendero de los miradores conduce a la Meseta Mirandesa y a los cañones del Parque Natural del Duero Internacional. Noche en Miranda do Douro, capital de una cultura y una lengua únicas."
        ),
        distance: "17,8 km",
        shape: "linear",
        ascent: "+355 / -331 m",
        meals: ["breakfast", "packedLunch"],
        accommodation: "Hotel O Mirandês, Miranda do Douro",
        gallery: [`${T}miranda-1.jpg`, `${T}picote-2.jpg`],
      },
      {
        day: 5,
        title: tri("Trilho de São João das Arribas", "Trilho de São João das Arribas", "Trilho de São João das Arribas"),
        trail: "Trilho de São João das Arribas",
        description: tri(
          "The longest day, along the arribas: dramatic cliffs carved by the Douro on the border with Spain. Griffon vultures glide below the viewpoints of São João das Arribas and Picote.",
          "O dia mais longo, pelas arribas: falésias dramáticas escavadas pelo Douro na fronteira com Espanha. Os grifos planam abaixo dos miradouros de São João das Arribas e de Picote.",
          "El día más largo, por las arribes: acantilados dramáticos excavados por el Duero en la frontera con España. Los buitres leonados planean bajo los miradores de São João das Arribas y Picote."
        ),
        distance: "21,6 km",
        shape: "circular",
        ascent: "+479 / -479 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${T}picote-1.jpg`, `${T}picote-2.jpg`, `${T}miranda-1.jpg`],
      },
      {
        day: 6,
        title: tri("Trilho do Caminho de Santiago do Este", "Trilho do Caminho de Santiago do Este", "Trilho do Caminho de Santiago do Este"),
        trail: "Trilho do Caminho de Santiago do Este",
        description: tri(
          "Follow a stretch of the eastern Way of Saint James through olive groves and quiet valleys, before the transfer to Mirandela, the olive oil capital of the Northeast.",
          "Siga um troço do Caminho de Santiago do Este por entre olivais e vales tranquilos, antes do transfer para Mirandela, capital do azeite do Nordeste.",
          "Siga un tramo del Camino de Santiago del Este entre olivares y valles tranquilos, antes del traslado a Mirandela, capital del aceite de oliva del Nordeste."
        ),
        distance: "17,3 km",
        shape: "linear",
        ascent: "+364 / -375 m",
        meals: ["breakfast", "packedLunch"],
        accommodation: "Coração do Tua Hotel, Mirandela",
        gallery: [`${T}azeite-1.jpg`, `${T}palacios-4.jpg`],
      },
      {
        day: 7,
        title: tri("Trilho de Vila Verdinho a Mirandela", "Trilho de Vila Verdinho a Mirandela", "Trilho de Vila Verdinho a Mirandela"),
        trail: "Trilho de Vila Verdinho a Mirandela",
        description: tri(
          "From Vila Verdinho down to Mirandela along the Tua valley. An educational olive oil tasting and a visit to the Olive Tree and Olive Oil Museum close the journey with the region's liquid gold.",
          "De Vila Verdinho até Mirandela, pelo vale do Tua. Uma prova educativa de azeite e a visita ao Museu da Oliveira e do Azeite encerram a viagem com o ouro líquido da região.",
          "De Vila Verdinho a Mirandela, por el valle del Tua. Una cata educativa de aceite y la visita al Museo del Olivo y del Aceite cierran el viaje con el oro líquido de la región."
        ),
        distance: "18,2 km",
        shape: "linear",
        ascent: "+592 / -365 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${T}tom-a.jpg`, `${T}azeite-1.jpg`],
      },
      {
        day: 8,
        title: tri("Departure", "Partida", "Salida"),
        description: tri(
          "Time to say goodbye after a final Trás-os-Montes breakfast. Transfer to Porto Airport can be arranged as an extra service.",
          "Hora da despedida, depois de um último pequeno-almoço transmontano. O transfer para o Aeroporto do Porto pode ser organizado como serviço extra.",
          "Hora de la despedida, después de un último desayuno tradicional. El traslado al Aeropuerto de Oporto puede organizarse como servicio extra."
        ),
        meals: ["breakfast"],
      },
    ],
    included: [
      tri("Accommodation with breakfast", "Alojamento com pequeno-almoço", "Alojamiento con desayuno"),
      tri("6 packed lunches, collected at the hotel reception", "6 almoços de piquenique, a levantar na recepção do hotel", "6 almuerzos de picnic, a recoger en la recepción del hotel"),
      tri("Educational olive oil tasting", "Prova educativa de azeite", "Cata educativa de aceite de oliva"),
      tri("Visit to the Palácios Rural Museum", "Visita ao Museu Rural de Palácios", "Visita al Museo Rural de Palácios"),
      tri("Visit to the Olive Tree and Olive Oil Museum", "Visita ao Museu da Oliveira e do Azeite", "Visita al Museo del Olivo y del Aceite"),
      tri("All transport in the program", "Todos os transportes do programa", "Todos los transportes del programa"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
      tri("PORTUGALNTN gift", "Oferta PORTUGALNTN", "Obsequio PORTUGALNTN"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [
      tri("Accommodation upgrade from 3 to 4 stars", "Upgrade de alojamento de 3 para 4 estrelas", "Mejora de alojamiento de 3 a 4 estrellas"),
      tri("Transfer to Porto Airport", "Transfer para o Aeroporto do Porto", "Traslado al Aeropuerto de Oporto"),
      tri("Extra nights in Porto", "Noites extra no Porto", "Noches extra en Oporto"),
    ],
    highlights: [
      tri("Montesinho Natural Park", "Parque Natural de Montesinho", "Parque Natural de Montesinho"),
      tri("Douro International Natural Park", "Parque Natural do Douro Internacional", "Parque Natural del Duero Internacional"),
      tri("The Mirandese Plateau", "Planalto Mirandês", "Meseta Mirandesa"),
      tri("Authentic villages and preserved rural life", "Aldeias autênticas e vida rural preservada", "Aldeas auténticas y vida rural preservada"),
      tri("Living cultural and ethnographic heritage", "Património cultural e etnográfico vivo", "Patrimonio cultural y etnográfico vivo"),
      tri("Wild nature and biodiversity", "Natureza selvagem e biodiversidade", "Naturaleza salvaje y biodiversidad"),
    ],
    prices: {
      low: { from: 1165, single: 131 },
    },
    priceCondition: tri(
      "Single price all year round, based on double room occupancy.",
      "Preço único todo o ano, com base em quarto duplo.",
      "Precio único todo el año, en base a habitación doble."
    ),
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "geres-8days": {
    id: "geres-8days",
    format: "programa",
    title: "Peneda-Gerês National Park",
    subtitle: tri(
      "Portugal's only national park",
      "O único parque nacional de Portugal",
      "El único parque nacional de Portugal"
    ),
    region: "Peneda-Gerês",
    heroImage: `${P}geres-i.jpg`,
    duration: { days: 8, nights: 7 },
    type: tri("Self-Guided", "Self-Guided", "Autoguiado"),
    difficulty: tri("Difficult", "Difícil", "Difícil"),
    grade: 4,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Pitões das Júnias",
    totalDistance: "74 km",
    overview: tri(
      "Discover Peneda-Gerês, Portugal's only national park, where mountains, rivers and ancient villages come together in a rich natural and cultural setting. This itinerary offers simple, meaningful experiences that blend nature, tradition and sustainability, in communities that still live by the rhythm of the land.",
      "Descubra a Peneda-Gerês, o único parque nacional de Portugal, onde montanhas, rios e aldeias antigas se encontram num cenário natural e cultural riquíssimo. Este itinerário oferece experiências simples e com significado, juntando natureza, tradição e sustentabilidade, em comunidades que ainda vivem ao ritmo da terra.",
      "Descubra Peneda-Gerês, el único parque nacional de Portugal, donde montañas, ríos y aldeas antiguas se unen en un entorno natural y cultural riquísimo. Este itinerario ofrece experiencias sencillas y con significado, uniendo naturaleza, tradición y sostenibilidad, en comunidades que aún viven al ritmo de la tierra."
    ),
    days: [
      {
        day: 1,
        title: tri("Arrival in Pitões das Júnias", "Chegada a Pitões das Júnias", "Llegada a Pitões das Júnias"),
        description: tri(
          "Arrival and transfer to Pitões das Júnias, one of the highest villages in Portugal, on the Barroso plateau. Settle into Casa do Preto and breathe in the mountain air.",
          "Chegada e transfer para Pitões das Júnias, uma das aldeias mais altas de Portugal, no planalto do Barroso. Instale-se na Casa do Preto e respire o ar da montanha.",
          "Llegada y traslado a Pitões das Júnias, una de las aldeas más altas de Portugal, en la meseta del Barroso. Instálese en la Casa do Preto y respire el aire de la montaña."
        ),
        meals: [],
        accommodation: "Casa do Preto, Pitões das Júnias",
        gallery: [`${P}geres-e.jpg`],
        note: tri("Transfer from the airport (168 km, 2h15).", "Transfer do aeroporto (168 km, 2h15).", "Traslado desde el aeropuerto (168 km, 2h15)."),
      },
      {
        day: 2,
        title: tri("Trilho do Pastoreio", "Trilho do Pastoreio", "Trilho do Pastoreio"),
        trail: "Trilho do Pastoreio",
        description: tri(
          "The shepherding trail follows the vezeira, the communal herding tradition of the Barroso, across pastures where barrosã cattle graze under the peaks. A UNESCO recognised agricultural heritage.",
          "O trilho do pastoreio segue a vezeira, a tradição comunitária de pastoreio do Barroso, por lameiros onde o gado barrosão pasta sob os picos. Um património agrícola reconhecido pela UNESCO.",
          "El sendero del pastoreo sigue la vezeira, la tradición comunitaria de pastoreo del Barroso, por prados donde el ganado barrosano pasta bajo los picos. Un patrimonio agrícola reconocido por la UNESCO."
        ),
        distance: "14,6 km",
        shape: "circular",
        ascent: "+759 / -759 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${P}geres-d.jpg`, `${P}geres-f.jpg`],
      },
      {
        day: 3,
        title: tri("Trilho de Pitões a Outeiro", "Trilho de Pitões a Outeiro", "Trilho de Pitões a Outeiro"),
        trail: "Trilho de Pitões a Outeiro",
        description: tri(
          "A gentler day, descending from Pitões to Outeiro past the medieval monastery of Santa Maria das Júnias and its waterfall, through oak woods draped in moss.",
          "Um dia mais suave, a descer de Pitões para Outeiro, passando pelo mosteiro medieval de Santa Maria das Júnias e pela sua cascata, entre carvalhais cobertos de musgo.",
          "Un día más suave, descendiendo de Pitões a Outeiro, pasando por el monasterio medieval de Santa Maria das Júnias y su cascada, entre robledales cubiertos de musgo."
        ),
        distance: "8,7 km",
        shape: "linear",
        ascent: "+309 / -626 m",
        meals: ["breakfast", "packedLunch"],
        accommodation: "Casa Albelo do Gerês, Outeiro",
        gallery: [`${P}geres-c.jpg`, `${P}geres-e.jpg`],
      },
      {
        day: 4,
        title: tri("Trilho dos Miradouros", "Trilho dos Miradouros", "Trilho dos Miradouros"),
        trail: "Trilho dos Miradouros",
        description: tri(
          "A circular route linking natural viewpoints over the valleys and peaks of the national park, with granite outcrops and endless horizons.",
          "Um percurso circular que liga miradouros naturais sobre os vales e picos do parque nacional, entre afloramentos graníticos e horizontes sem fim.",
          "Un recorrido circular que une miradores naturales sobre los valles y picos del parque nacional, entre afloramientos graníticos y horizontes infinitos."
        ),
        distance: "13 km",
        shape: "circular",
        ascent: "+595 / -595 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${P}geres-h.jpg`, `${P}geres-i.jpg`],
      },
      {
        day: 5,
        title: tri("Trilho do Rio", "Trilho do Rio", "Trilho do Rio"),
        trail: "Trilho do Rio",
        description: tri(
          "The river trail follows crystal-clear waters between giant boulders, wooden footbridges and natural pools. The Gerês at its wildest.",
          "O trilho do rio acompanha águas cristalinas entre penedos gigantes, passadiços de madeira e piscinas naturais. O Gerês no seu estado mais selvagem.",
          "El sendero del río acompaña aguas cristalinas entre rocas gigantes, pasarelas de madera y piscinas naturales. El Gerês en su estado más salvaje."
        ),
        distance: "16,2 km",
        shape: "linear",
        ascent: "+523 / -625 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${P}geres-a.jpg`, `${P}geres-b.jpg`],
      },
      {
        day: 6,
        title: tri("Trilho dos Poços Verdes", "Trilho dos Poços Verdes", "Trilho dos Poços Verdes"),
        trail: "Trilho dos Poços Verdes",
        description: tri(
          "Walk to the emerald pools that give this trail its name, then settle in Fafião, a village guarded by the wolf: its ancient fojo, a communal wolf trap, still stands.",
          "Caminhe até aos poços verdes que dão nome ao trilho e instale-se depois em Fafião, aldeia guardada pelo lobo: o seu antigo fojo, armadilha comunitária para lobos, ainda se mantém de pé.",
          "Camine hasta las pozas esmeralda que dan nombre al sendero e instálese después en Fafião, aldea guardada por el lobo: su antiguo fojo, trampa comunitaria para lobos, sigue en pie."
        ),
        distance: "10,4 km",
        shape: "circular",
        ascent: "+549 / -549 m",
        meals: ["breakfast", "packedLunch"],
        accommodation: "Hostel Retiro do Gerês, Fafião",
        gallery: [`${P}geres-b.jpg`, `${P}geres-g.jpg`],
      },
      {
        day: 7,
        title: tri("Trilho do Pão, do Azeite e dos Miradouros", "Trilho do Pão, do Azeite e dos Miradouros", "Trilho do Pão, do Azeite e dos Miradouros"),
        trail: "Trilho do Pão, do Azeite e dos Miradouros",
        description: tri(
          "The bread, olive oil and viewpoints trail: a final loop through terraces, communal ovens and balconies over the Cávado valley, celebrating what the mountain gives.",
          "O trilho do pão, do azeite e dos miradouros: uma última volta por socalcos, fornos comunitários e varandas sobre o vale do Cávado, a celebrar o que a montanha dá.",
          "El sendero del pan, del aceite y de los miradores: una última vuelta por bancales, hornos comunales y balcones sobre el valle del Cávado, celebrando lo que da la montaña."
        ),
        distance: "11,5 km",
        shape: "circular",
        ascent: "+801 / -801 m",
        meals: ["breakfast", "packedLunch"],
        gallery: [`${P}geres-f.jpg`, `${P}geres-h.jpg`],
      },
      {
        day: 8,
        title: tri("Departure", "Partida", "Salida"),
        description: tri(
          "Time to say goodbye. Transfer from Fafião to the airport, with the silence of the mountains still with you.",
          "Hora da despedida. Transfer de Fafião para o aeroporto, com o silêncio das montanhas ainda consigo.",
          "Hora de la despedida. Traslado de Fafião al aeropuerto, con el silencio de las montañas todavía con usted."
        ),
        meals: ["breakfast"],
        note: tri("Transfer to the airport (99 km, 1h50).", "Transfer para o aeroporto (99 km, 1h50).", "Traslado al aeropuerto (99 km, 1h50)."),
      },
    ],
    included: [
      tri("Accommodation with breakfast", "Alojamento com pequeno-almoço", "Alojamiento con desayuno"),
      tri("6 packed lunches, collected at the reception", "6 almoços de piquenique, a levantar na recepção", "6 almuerzos de picnic, a recoger en la recepción"),
      tri("Visit to the Iberian Wolf Interpretive Center", "Visita ao Centro Interpretativo do Lobo Ibérico", "Visita al Centro Interpretativo del Lobo Ibérico"),
      tri("Barroso Ecomuseum, Corte do Boi", "Ecomuseu do Barroso, Corte do Boi", "Ecomuseo del Barroso, Corte do Boi"),
      tri("Barroso Ecomuseum, Vezeira e a Serra", "Ecomuseu do Barroso, Vezeira e a Serra", "Ecomuseo del Barroso, Vezeira e a Serra"),
      tri("All transport in the program", "Todos os transportes do programa", "Todos los transportes del programa"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
      tri("PORTUGALNTN gift", "Oferta PORTUGALNTN", "Obsequio PORTUGALNTN"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [
      tri("Extra nights in Porto", "Noites extra no Porto", "Noches extra en Oporto"),
    ],
    highlights: [
      tri("Portugal's only national park", "O único parque nacional de Portugal", "El único parque nacional de Portugal"),
      tri("UNESCO World Agricultural Heritage", "Património Agrícola Mundial UNESCO", "Patrimonio Agrícola Mundial UNESCO"),
      tri("Gerês-Xurés Transboundary Biosphere Reserve", "Reserva da Biosfera Transfronteiriça Gerês-Xurés", "Reserva de la Biosfera Transfronteriza Gerês-Xurés"),
      tri("Fojo dos Lobos and Silha de Ursos", "Fojo dos Lobos e Silha de Ursos", "Fojo dos Lobos y Silha de Ursos"),
      tri("Small rural villages", "Pequenas aldeias rurais", "Pequeñas aldeas rurales"),
      tri("Natural viewpoints and protected landscapes", "Miradouros naturais e paisagens protegidas", "Miradores naturales y paisajes protegidos"),
    ],
    prices: {
      low: { from: 815, single: 360 },
      high: { from: 875, single: 417 },
    },
    priceCondition: tri(
      "Prices for groups of 6 to 8 people, based on double room occupancy.",
      "Preços para grupos de 6 a 8 pessoas, com base em quarto duplo.",
      "Precios para grupos de 6 a 8 personas, en base a habitación doble."
    ),
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  // ── 1-day programs 2027 (source: InfoTours1DiaWebsite.docx, 07/10/2026) ──
  // Images are provisional until the product photos are uploaded.

  "douro-1day": {
    id: "douro-1day",
    format: "roteiro",
    title: "Wine Town of Pinhão",
    subtitle: tri(
      "Discover the heart of the Douro on foot, among vineyards, terraces and some of the most iconic views over the valley.",
      "Descubra o coração do Douro a pé, entre vinhas, socalcos e algumas das vistas mais emblemáticas sobre o vale.",
      "Descubra el corazón del Duero a pie, entre viñedos, bancales y algunas de las vistas más emblemáticas sobre el valle."
    ),
    region: "Douro Valley",
    heroImage: `${D1}hero-douro-1day.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Easy", "Fácil", "Fácil"),
    grade: 2,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Pinhão",
    totalDistance: "6,47 km",
    overview: tri(
      "Starting in Pinhão, this walk takes us up the slopes of the Cima Corgo to Casal de Loivos, through a landscape deeply shaped by the vine and by the terraces that mould the Alto Douro Wine Region.\n\nAlong the way, the altitude keeps revealing new perspectives over the valley, the Douro River and Pinhão. After reaching Casal de Loivos, the path gradually returns towards the town through the vineyards, ending at Quinta do Bomfim, where the experience continues with a picnic in a privileged setting above the Douro.",
      "Partindo do Pinhão, esta caminhada leva-nos pelas encostas do Cima Corgo até Casal de Loivos, atravessando uma paisagem profundamente marcada pela cultura da vinha e pelos socalcos que moldam o Alto Douro Vinhateiro.\n\nAo longo do percurso, a altitude vai revelando novas perspetivas sobre o vale, o rio Douro e o Pinhão. Depois de alcançar Casal de Loivos, o caminho regressa progressivamente em direção à vila através das vinhas, terminando na Quinta do Bomfim, onde a experiência continua com um picnic num cenário privilegiado sobre o Douro.",
      "Partiendo de Pinhão, esta caminata nos lleva por las laderas del Cima Corgo hasta Casal de Loivos, atravesando un paisaje profundamente marcado por la cultura de la viña y por los bancales que moldean el Alto Duero Vinícola.\n\nA lo largo del recorrido, la altitud va revelando nuevas perspectivas sobre el valle, el río Duero y Pinhão. Tras alcanzar Casal de Loivos, el camino regresa poco a poco hacia el pueblo entre viñedos, terminando en la Quinta do Bomfim, donde la experiencia continúa con un picnic en un escenario privilegiado sobre el Duero."
    ),
    days: [
      {
        day: 1,
        title: tri("Pinhão to Casal de Loivos Trail", "Trilho do Pinhão – Casal de Loivos", "Sendero de Pinhão a Casal de Loivos"),
        trail: "Pinhão · Casal de Loivos · Quinta do Bomfim",
        description: tri(
          "The walk begins in Pinhão and soon leaves the town behind to enter the wine slopes that surround the valley. The route follows rural paths between estates and vineyard plots, climbing gradually towards Casal de Loivos.\n\nThis first part is the most demanding of the route, but also the one where the landscape changes most visibly. As we gain altitude, ever wider views open up over Pinhão, the Douro River and the terraces that draw the slopes of the region.\n\nReaching Casal de Loivos, the route crosses one of the areas with the best perspective over the valley before heading back. From here the walk is mostly downhill, again between vineyards and farm tracks, offering a different reading of the Douro landscape.\n\nThe route ends at Quinta do Bomfim, next to Pinhão. A historic estate of the Symington family, linked to the production of Dow's Port since 1896, the quinta is surrounded by vineyards overlooking the Douro. Here the walk gives way to a picnic, a chance to enjoy the landscape and the flavours of the region at an easy pace.",
          "A caminhada começa no Pinhão e rapidamente deixa o ambiente da vila para entrar nas encostas vinhateiras que rodeiam o vale. O percurso segue por caminhos rurais entre quintas e parcelas de vinha, acompanhando a subida gradual em direção a Casal de Loivos.\n\nEsta primeira parte é a mais exigente do percurso, mas também aquela em que a paisagem se transforma de forma mais evidente. À medida que ganhamos altitude, surgem vistas cada vez mais amplas sobre o Pinhão, o rio Douro e os socalcos que desenham as encostas da região.\n\nChegando a Casal de Loivos, o percurso atravessa uma das zonas com melhor perspetiva sobre o vale antes de iniciar o regresso. A partir daqui, a caminhada torna-se predominantemente descendente, novamente entre vinhas e caminhos agrícolas, proporcionando uma leitura diferente da paisagem duriense.\n\nO percurso termina na Quinta do Bomfim, junto ao Pinhão. Propriedade histórica da família Symington e ligada à produção do Porto Dow's desde 1896, a quinta encontra-se rodeada por vinhas com vista sobre o Douro. Aqui, a caminhada dá lugar a um picnic, permitindo desfrutar com calma da paisagem e dos sabores da região.",
          "La caminata empieza en Pinhão y enseguida deja el ambiente del pueblo para entrar en las laderas vinícolas que rodean el valle. El recorrido sigue caminos rurales entre quintas y parcelas de viña, acompañando la subida gradual hacia Casal de Loivos.\n\nEsta primera parte es la más exigente del recorrido, pero también aquella en la que el paisaje se transforma de forma más evidente. A medida que ganamos altitud, aparecen vistas cada vez más amplias sobre Pinhão, el río Duero y los bancales que dibujan las laderas de la región.\n\nAl llegar a Casal de Loivos, el recorrido atraviesa una de las zonas con mejor perspectiva sobre el valle antes de iniciar el regreso. A partir de aquí la caminata es mayoritariamente descendente, de nuevo entre viñedos y caminos agrícolas, ofreciendo otra lectura del paisaje del Duero.\n\nEl recorrido termina en la Quinta do Bomfim, junto a Pinhão. Propiedad histórica de la familia Symington y ligada a la producción del Oporto Dow's desde 1896, la quinta está rodeada de viñedos con vistas al Duero. Aquí la caminata da paso a un picnic, para disfrutar con calma del paisaje y de los sabores de la región."
        ),
        distance: "6,47 km",
        ascent: "+401 m",
        elevation: { min: 87, avg: 248, max: 424, gain: 401, loss: 397 },
        meals: [],
        gallery: [`${D1}walk-1.jpg`, `${D1}walk-2.jpg`, `${D1}walk-3.jpg`, `${D1}walk-4.jpg`],
      },
    ],
    difficultyNote: tri(
      "A relatively short route, but with a significant climb in the first part up to Casal de Loivos. Recommended for participants in reasonable physical condition who are comfortable with walks that include some ascent.",
      "Percurso de distância relativamente curta, mas com uma subida significativa na primeira parte até Casal de Loivos. Recomendado a participantes com uma condição física regular e confortáveis com caminhadas que incluam algum desnível.",
      "Recorrido de distancia relativamente corta, pero con una subida significativa en la primera parte hasta Casal de Loivos. Recomendado para participantes con una condición física regular y cómodos con caminatas que incluyan algo de desnivel."
    ),
    moments: [
      {
        km: 0,
        title: tri("Setting off from Pinhão", "Partida do Pinhão", "Salida desde Pinhão"),
        text: tri(
          "We meet in Pinhão, by the Douro, and soon leave the town behind for the wine slopes around the valley.",
          "Encontramo-nos no Pinhão, junto ao Douro, e rapidamente deixamos a vila para entrar nas encostas vinhateiras que rodeiam o vale.",
          "Nos encontramos en Pinhão, junto al Duero, y enseguida dejamos el pueblo para entrar en las laderas vinícolas que rodean el valle."
        ),
        image: `${D1}walk-4.jpg`,
      },
      {
        km: 1.2,
        title: tri("The climb between estates", "A subida entre quintas", "La subida entre quintas"),
        text: tri(
          "Rural paths between estates and vineyard plots. The most demanding part of the day, and the one where the landscape changes most.",
          "Caminhos rurais entre quintas e parcelas de vinha. É a parte mais exigente do dia, e aquela em que a paisagem mais se transforma.",
          "Caminos rurales entre quintas y parcelas de viña. Es la parte más exigente del día, y aquella en la que el paisaje más se transforma."
        ),
        image: `${D1}walk-1.jpg`,
      },
      {
        km: 2.5,
        title: tri("Casal de Loivos", "Casal de Loivos", "Casal de Loivos"),
        text: tri(
          "The high point of the walk, with one of the best perspectives over the valley, the river and the terraces of the Cima Corgo.",
          "O ponto mais alto da caminhada, com uma das melhores perspetivas sobre o vale, o rio e os socalcos do Cima Corgo.",
          "El punto más alto de la caminata, con una de las mejores perspectivas sobre el valle, el río y los bancales del Cima Corgo."
        ),
        image: `${D1}walk-2.jpg`,
      },
      {
        km: 4.3,
        title: tri("Back down through the vines", "Regresso pelas vinhas", "Regreso entre viñedos"),
        text: tri(
          "Mostly downhill now, between vineyards and farm tracks, for a different reading of the Douro landscape.",
          "Agora predominantemente a descer, entre vinhas e caminhos agrícolas, numa leitura diferente da paisagem duriense.",
          "Ahora sobre todo de bajada, entre viñedos y caminos agrícolas, con otra lectura del paisaje del Duero."
        ),
        image: `${D1}walk-3.jpg`,
      },
      {
        km: 6.4,
        title: tri("Picnic at Quinta do Bomfim", "Picnic na Quinta do Bomfim", "Picnic en la Quinta do Bomfim"),
        text: tri(
          "A historic Symington estate, linked to Dow's Port since 1896. A picnic and a wine experience among vines overlooking the Douro.",
          "Propriedade histórica da família Symington, ligada ao Porto Dow's desde 1896. Picnic e experiência vínica entre vinhas com vista sobre o Douro.",
          "Propiedad histórica de la familia Symington, ligada al Oporto Dow's desde 1896. Picnic y experiencia vinícola entre viñedos con vistas al Duero."
        ),
        image: `${D1}hero-douro-1day.jpg`,
      },
    ],
    included: [
      inc.guide,
      inc.walk,
      inc.snacks,
      tri("Picnic at Quinta do Bomfim", "Picnic na Quinta do Bomfim", "Picnic en la Quinta do Bomfim"),
      tri("Wine experience at Quinta do Bomfim", "Experiência vínica na Quinta do Bomfim", "Experiencia vinícola en la Quinta do Bomfim"),
      inc.insurance,
    ],
    notIncluded: [
      exc.transfer("Pinhão", "no Pinhão", "Pinhão"),
      exc.transport,
      exc.personal,
      exc.rest,
    ],
    extras: [],
    highlights: [
      tri("Vineyards and terraces of the Alto Douro", "Vinhas e socalcos do Alto Douro", "Viñedos y bancales del Alto Duero"),
      tri("Panoramic views over Pinhão", "Vistas panorâmicas sobre o Pinhão", "Vistas panorámicas sobre Pinhão"),
      tri("Casal de Loivos and the Douro landscape", "Casal de Loivos e paisagem do Douro", "Casal de Loivos y el paisaje del Duero"),
      tri("Picnic at Quinta do Bomfim", "Picnic na Quinta do Bomfim", "Picnic en la Quinta do Bomfim"),
    ],
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "saomamede-1day": {
    id: "saomamede-1day",
    format: "roteiro",
    title: "São Mamede Walkways",
    subtitle: tri(
      "Walk the Tua Valley and discover a Douro where nature, food, wine and art meet.",
      "Caminhe pelo Vale do Tua e descubra um Douro onde natureza, gastronomia, vinho e arte se encontram.",
      "Camine por el Valle del Tua y descubra un Duero donde naturaleza, gastronomía, vino y arte se encuentran."
    ),
    region: "Douro Valley",
    heroImage: `${G}douro-b.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Easy", "Fácil", "Fácil"),
    grade: 2,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: tri("To be confirmed", "A definir", "Por confirmar"),
    totalDistance: "7,9 km",
    overview: tri(
      "Discover one of the most surprising landscapes in the municipality of Alijó on a walk along the São Mamede de Ribatua Walkways, in the heart of the Tua Valley Regional Natural Park. Along the route, the stream, the rocky slopes and the Mediterranean vegetation keep you company, with privileged views over the surrounding landscape.\n\nAfter the walk, the program continues with a regional lunch in Alijó, followed by a wine experience at Quanta Terra. Set in a former Casa do Douro distillery, Quanta Terra brings together winemaking and contemporary culture, for a close to the day where wine and art share the same space.",
      "Descubra uma das paisagens mais surpreendentes do concelho de Alijó numa caminhada pelos Passadiços de São Mamede de Ribatua, no coração do Parque Natural Regional do Vale do Tua. Ao longo do percurso, a ribeira, as encostas rochosas e a vegetação mediterrânica acompanham o caminho, com vistas privilegiadas sobre a paisagem envolvente.\n\nDepois da caminhada, o programa continua com um almoço regional em Alijó, seguido de uma experiência vínica na Quanta Terra. Instalada numa antiga destilaria da Casa do Douro, a Quanta Terra combina produção de vinho e cultura contemporânea, proporcionando um final de dia onde o vinho e a arte partilham o mesmo espaço.",
      "Descubra uno de los paisajes más sorprendentes del municipio de Alijó en una caminata por las Pasarelas de São Mamede de Ribatua, en el corazón del Parque Natural Regional del Valle del Tua. A lo largo del recorrido, el arroyo, las laderas rocosas y la vegetación mediterránea acompañan el camino, con vistas privilegiadas sobre el paisaje.\n\nDespués de la caminata, el programa continúa con un almuerzo regional en Alijó, seguido de una experiencia vinícola en Quanta Terra. Instalada en una antigua destilería de la Casa do Douro, Quanta Terra combina producción de vino y cultura contemporánea, para un final de día en el que el vino y el arte comparten el mismo espacio."
    ),
    days: [
      {
        day: 1,
        title: tri("Nature, food, wine and art in the Douro", "Natureza, gastronomia, vinho e arte no Douro", "Naturaleza, gastronomía, vino y arte en el Duero"),
        trail: "São Mamede de Ribatua · Alijó · Favaios",
        description: tri(
          "The day begins with a 7.9 km walk along the São Mamede de Ribatua Walkways, a route that follows the natural landscape of the Tua Valley through paths, boardwalks and steeper stretches. Waterfalls, streams, slopes and views over the valley make this walk a different way of getting to know the land of Alijó.\n\nDuring the experience there is also a chance to visit the Ujo Viewpoint, one of the most iconic panoramic points of the Tua Valley, with a wide view over the reservoir and the slopes around it.\n\nOnce the walk is over, we head to Alijó for lunch at a local restaurant, where regional cooking marks the transition between the morning walk and the afternoon experience.\n\nThe program ends at Quanta Terra, in Favaios, a wine tourism space set in a former Casa do Douro distillery. The visit brings the world of wine together with contemporary art, ending with a wine tasting and a different take on the wine culture of the Douro.",
          "O dia começa com uma caminhada de 7,9 km pelos Passadiços de São Mamede de Ribatua, um percurso que acompanha a paisagem natural do Vale do Tua entre caminhos, passadiços e zonas de maior desnível. Cascatas, linhas de água, encostas e vistas sobre o vale fazem desta caminhada uma forma diferente de conhecer o território de Alijó.\n\nDurante a experiência, haverá também oportunidade de conhecer o Miradouro do Ujo, um dos pontos panorâmicos mais emblemáticos do Vale do Tua, com uma ampla vista sobre a albufeira e as encostas que a rodeiam.\n\nTerminada a caminhada, seguimos para Alijó para um almoço num restaurante local, onde a gastronomia regional marca a transição entre a manhã de caminhada e a experiência da tarde.\n\nO programa termina na Quanta Terra, em Favaios, num espaço de enoturismo instalado numa antiga destilaria da Casa do Douro. A visita cruza o universo do vinho com a arte contemporânea, terminando com uma prova de vinhos e uma abordagem diferente à cultura vínica do Douro.",
          "El día empieza con una caminata de 7,9 km por las Pasarelas de São Mamede de Ribatua, un recorrido que acompaña el paisaje natural del Valle del Tua entre caminos, pasarelas y zonas de mayor desnivel. Cascadas, cursos de agua, laderas y vistas sobre el valle hacen de esta caminata una forma diferente de conocer el territorio de Alijó.\n\nDurante la experiencia habrá también ocasión de conocer el Mirador del Ujo, uno de los puntos panorámicos más emblemáticos del Valle del Tua, con una amplia vista sobre el embalse y las laderas que lo rodean.\n\nTerminada la caminata, seguimos hacia Alijó para almorzar en un restaurante local, donde la gastronomía regional marca la transición entre la mañana de caminata y la experiencia de la tarde.\n\nEl programa termina en Quanta Terra, en Favaios, un espacio de enoturismo instalado en una antigua destilería de la Casa do Douro. La visita cruza el universo del vino con el arte contemporáneo y termina con una cata de vinos y una mirada diferente a la cultura vinícola del Duero."
        ),
        distance: "7,9 km",
        ascent: "+333 m",
        elevation: { min: 168, avg: 266, max: 404, gain: 333, loss: 333 },
        meals: [],
        gallery: [],
      },
    ],
    difficultyNote: tri(
      "An easy route, with some changes in level and stretches of stairs along the walkways. Suitable for active participants used to occasional walks, with no technical experience needed.",
      "Percurso de dificuldade fácil, com alguns desníveis e secções de escadas ao longo dos passadiços. Adequado a participantes ativos e habituados a caminhadas ocasionais, não sendo necessária experiência técnica.",
      "Recorrido de dificultad fácil, con algunos desniveles y tramos de escaleras a lo largo de las pasarelas. Adecuado para participantes activos y habituados a caminatas ocasionales, sin necesidad de experiencia técnica."
    ),
    included: [
      inc.guide,
      inc.walk,
      tri("Private driver and vehicle during the program", "Motorista e viatura privados durante o programa", "Conductor y vehículo privados durante el programa"),
      tri("Transport between the different points of the experience", "Transporte entre os diferentes pontos da experiência", "Transporte entre los diferentes puntos de la experiencia"),
      inc.snacks,
      tri("Regional lunch", "Almoço regional", "Almuerzo regional"),
      tri("Visit and wine tasting at Quanta Terra", "Visita e prova de vinhos na Quanta Terra", "Visita y cata de vinos en Quanta Terra"),
      inc.insurance,
    ],
    notIncluded: [
      tri("Transfer between your accommodation and the meeting point", "Transfer entre o alojamento e o ponto de encontro", "Traslado entre el alojamiento y el punto de encuentro"),
      exc.personal,
      exc.rest,
    ],
    extras: [],
    highlights: [
      tri("São Mamede de Ribatua Walkways", "Passadiços de São Mamede de Ribatua", "Pasarelas de São Mamede de Ribatua"),
      tri("Ujo Viewpoint and the Tua Valley", "Miradouro do Ujo e Vale do Tua", "Mirador del Ujo y Valle del Tua"),
      tri("Regional food in Alijó", "Gastronomia regional em Alijó", "Gastronomía regional en Alijó"),
      tri("Wine and art at Quanta Terra", "Vinho e arte na Quanta Terra", "Vino y arte en Quanta Terra"),
    ],
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "monks-1day": {
    id: "monks-1day",
    format: "roteiro",
    title: "Douro Monks & Vineyards Trail",
    subtitle: tri(
      "A walk through the heart of the Douro, among vineyards, terraces and historic paths, with wine and regional flavours along the way.",
      "Uma caminhada pelo coração do Douro, entre vinhas, socalcos e caminhos históricos, com vinho e sabores regionais pelo percurso.",
      "Una caminata por el corazón del Duero, entre viñedos, bancales y caminos históricos, con vino y sabores regionales por el camino."
    ),
    region: "Douro Valley",
    heroImage: `${G}monge-1.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Difficult", "Difícil", "Difícil"),
    grade: 4,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Peso da Régua",
    totalDistance: "16,7 km",
    overview: tri(
      "Starting in Peso da Régua, this circular walk is inspired by one of the final stretches of the historic Monks' Way and crosses a landscape deeply tied to the culture of the vine and of wine.\n\nThroughout the day, the route crosses wine slopes, rural paths and high ground with wide views over the Douro and the Varosa valley. Near the end of the walk, we stop at Quinta do Valdalágea for a wine experience with regional snacks.\n\nAfter the tasting, we walk the last kilometres back to Peso da Régua, where the program ends with a traditional lunch.",
      "Partindo do Peso da Régua, esta caminhada circular inspira-se num dos troços finais do histórico Caminho dos Monges e percorre uma paisagem profundamente ligada à cultura da vinha e do vinho.\n\nAo longo do dia, o percurso atravessa encostas vinhateiras, caminhos rurais e zonas elevadas com amplas perspetivas sobre o Douro e o vale do Varosa. Já perto do final da caminhada, fazemos uma pausa na Quinta do Valdalágea para uma experiência vínica acompanhada por petiscos regionais.\n\nDepois da prova, retomamos os últimos quilómetros em direção ao Peso da Régua, onde o programa termina com um almoço tradicional.",
      "Partiendo de Peso da Régua, esta caminata circular se inspira en uno de los tramos finales del histórico Camino de los Monjes y recorre un paisaje profundamente ligado a la cultura de la viña y del vino.\n\nA lo largo del día, el recorrido atraviesa laderas vinícolas, caminos rurales y zonas elevadas con amplias perspectivas sobre el Duero y el valle del Varosa. Ya cerca del final de la caminata, hacemos una pausa en la Quinta do Valdalágea para una experiencia vinícola acompañada de aperitivos regionales.\n\nDespués de la cata, retomamos los últimos kilómetros hacia Peso da Régua, donde el programa termina con un almuerzo tradicional."
    ),
    days: [
      {
        day: 1,
        title: tri("The Monks' Way among Douro vineyards", "Caminhos dos Monges entre vinhas do Douro", "Caminos de los Monjes entre viñedos del Duero"),
        trail: "Peso da Régua · Valdigem · Peso da Régua",
        description: tri(
          "The walk begins in Peso da Régua and gradually leaves the town to enter the wine slopes that define this part of the Douro.\n\nFor much of the route we walk among vineyards, terraces and rural paths across a landscape shaped over centuries by winegrowing. The successive climbs and descents reveal different perspectives over the land, alternating between open areas, small villages and slopes facing the Douro and Varosa valleys.\n\nPart of this land is linked to the Monks' Way, a route inspired by the old paths used by the Cistercian monks and by the historic connection between the interior and the Douro. Here that heritage meets a landscape where the vine is the dominant element.\n\nAt km 12.9 we reach Quinta do Valdalágea, in Valdigem, a few kilometres from Peso da Régua. The estate has around 35 hectares of vineyards, spread across different exposures and altitudes, within the historic area of the Douro Demarcated Region. Here we stop for a wine tasting with snacks and produce from the estate, discovering the Douro through its flavours too. After the experience, we walk the last kilometres back to Peso da Régua. Back in town, the day ends with a traditional lunch, closing a demanding but complete walk through the Douro wine country.",
          "A caminhada começa no Peso da Régua e deixa progressivamente a zona urbana para entrar nas encostas vinhateiras que caracterizam esta parte do Douro.\n\nDurante grande parte do percurso, caminhamos entre vinhas, socalcos e caminhos rurais que atravessam uma paisagem moldada durante séculos pela viticultura. As sucessivas subidas e descidas permitem descobrir diferentes perspetivas sobre o território, alternando entre zonas mais abertas, pequenas povoações e encostas voltadas para os vales do Douro e do Varosa.\n\nParte deste território está associada ao Caminho dos Monges, uma rota inspirada nos antigos percursos utilizados pelos monges de Cister e na ligação histórica entre o interior e o Douro. Aqui, essa herança cruza-se com uma paisagem onde a vinha é o elemento dominante.\n\nAo km 12,9 chegamos à Quinta do Valdalágea, situada em Valdigem, a poucos quilómetros do Peso da Régua. A propriedade possui cerca de 35 hectares de vinha, distribuídos por diferentes exposições e altitudes, e encontra-se dentro da área histórica da Região Demarcada do Douro. Aqui fazemos uma pausa para uma prova de vinhos acompanhada por petiscos e produtos da quinta, permitindo descobrir o Douro também através dos seus sabores. A própria propriedade promove experiências de degustação associadas aos vinhos e produtos locais. Depois da experiência, retomamos os últimos quilómetros do percurso em direção ao Peso da Régua. De volta à cidade, o dia termina com um almoço tradicional, encerrando uma caminhada exigente mas completa pelo território vinhateiro do Douro.",
          "La caminata empieza en Peso da Régua y deja poco a poco la zona urbana para entrar en las laderas vinícolas que caracterizan esta parte del Duero.\n\nDurante gran parte del recorrido caminamos entre viñedos, bancales y caminos rurales que atraviesan un paisaje moldeado durante siglos por la viticultura. Las sucesivas subidas y bajadas permiten descubrir distintas perspectivas del territorio, alternando zonas más abiertas, pequeñas aldeas y laderas orientadas a los valles del Duero y del Varosa.\n\nParte de este territorio está asociada al Camino de los Monjes, una ruta inspirada en los antiguos caminos utilizados por los monjes del Císter y en la conexión histórica entre el interior y el Duero. Aquí esa herencia se cruza con un paisaje donde la viña es el elemento dominante.\n\nEn el km 12,9 llegamos a la Quinta do Valdalágea, en Valdigem, a pocos kilómetros de Peso da Régua. La propiedad tiene unas 35 hectáreas de viñedo, repartidas en distintas orientaciones y altitudes, dentro del área histórica de la Región Demarcada del Duero. Aquí hacemos una pausa para una cata de vinos acompañada de aperitivos y productos de la quinta, descubriendo el Duero también a través de sus sabores. Después de la experiencia, retomamos los últimos kilómetros hacia Peso da Régua. De vuelta en la ciudad, el día termina con un almuerzo tradicional, cerrando una caminata exigente pero completa por el territorio vinícola del Duero."
        ),
        distance: "16,7 km",
        shape: "circular",
        ascent: "+654 m",
        elevation: { min: 49, avg: 165, max: 293, gain: 654, loss: 654 },
        meals: [],
        gallery: [],
      },
    ],
    difficultyNote: tri(
      "A long and demanding route, with several climbs and descents over the day. Recommended for participants in good physical condition with regular experience of medium and long distance walks. No mountaineering skills are needed, but it does require stamina.",
      "Percurso longo e exigente, com várias subidas e descidas acumuladas ao longo do dia. Recomendado a participantes com boa condição física e experiência regular em caminhadas de média e longa distância. Não requer conhecimentos técnicos de montanhismo, mas exige resistência física.",
      "Recorrido largo y exigente, con varias subidas y bajadas acumuladas a lo largo del día. Recomendado para participantes con buena condición física y experiencia regular en caminatas de media y larga distancia. No requiere conocimientos técnicos de montañismo, pero exige resistencia física."
    ),
    included: [
      inc.guide,
      inc.walk,
      inc.snacks,
      tri("Wine tasting at Quinta do Valdalágea", "Prova de vinhos na Quinta do Valdalágea", "Cata de vinos en la Quinta do Valdalágea"),
      tri("Snacks and regional produce during the wine experience", "Petiscos e produtos regionais durante a experiência vínica", "Aperitivos y productos regionales durante la experiencia vinícola"),
      tri("Traditional lunch in Peso da Régua", "Almoço tradicional no Peso da Régua", "Almuerzo tradicional en Peso da Régua"),
      inc.insurance,
    ],
    notIncluded: [
      exc.transfer("Peso da Régua", "no Peso da Régua", "Peso da Régua"),
      exc.transport,
      exc.personal,
      exc.rest,
    ],
    extras: [],
    highlights: [
      tri("Douro vineyards and terraces", "Vinhas e socalcos do Douro", "Viñedos y bancales del Duero"),
      tri("Historic paths between Régua and Valdigem", "Caminhos históricos entre Régua e Valdigem", "Caminos históricos entre Régua y Valdigem"),
      tri("Wine tasting and snacks at Quinta do Valdalágea", "Prova de vinhos e petiscos na Quinta do Valdalágea", "Cata de vinos y aperitivos en la Quinta do Valdalágea"),
      tri("Views over the Douro and Varosa valleys", "Paisagens sobre os vales do Douro e Varosa", "Paisajes sobre los valles del Duero y del Varosa"),
    ],
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "vidago-1day": {
    id: "vidago-1day",
    format: "roteiro",
    title: "Vidago & Arcossó Wine Trail",
    subtitle: tri(
      "A walk through the rural landscapes of Vidago, with vineyards, Trás-os-Montes wine and traditional flavours along the way.",
      "Uma caminhada pelas paisagens rurais de Vidago, com vinhas, vinho de Trás-os-Montes e sabores tradicionais pelo caminho.",
      "Una caminata por los paisajes rurales de Vidago, con viñedos, vino de Trás-os-Montes y sabores tradicionales por el camino."
    ),
    region: "Trás-os-Montes",
    heroImage: "/images/routes/tras-os-montes-1.jpg",
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderada"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Vidago",
    totalDistance: "13,8 km",
    overview: tri(
      "Starting in Vidago, this circular walk crosses the rural landscape around the town, following old paths, small villages and areas with wide views over the Tâmega valley. Along the way, local heritage meets a landscape of vineyards, fields and small inland Trás-os-Montes villages.\n\nAt km 9, the walk brings us to Quinta de Arcossó, where we stop to see the vineyards and taste the wines made on the estate. After the wine experience, we walk back towards Vidago, where the day ends with a regional lunch at a traditional restaurant.",
      "Partindo de Vidago, esta caminhada circular percorre a paisagem rural que envolve a vila, seguindo por antigos caminhos, pequenas aldeias e zonas com amplas vistas sobre o vale do rio Tâmega. Ao longo do percurso, o património local cruza-se com uma paisagem de vinhas, campos e pequenas povoações do interior transmontano.\n\nAo km 9, a caminhada conduz-nos à Quinta de Arcossó, onde fazemos uma pausa para conhecer as vinhas e provar os vinhos produzidos nesta propriedade. Depois da experiência vínica, retomamos o percurso em direção a Vidago, onde o dia termina com um almoço de cozinha regional num restaurante tradicional.",
      "Partiendo de Vidago, esta caminata circular recorre el paisaje rural que rodea el pueblo, siguiendo antiguos caminos, pequeñas aldeas y zonas con amplias vistas sobre el valle del río Tâmega. A lo largo del recorrido, el patrimonio local se cruza con un paisaje de viñedos, campos y pequeños pueblos del interior de Trás-os-Montes.\n\nEn el km 9, la caminata nos lleva a la Quinta de Arcossó, donde hacemos una pausa para conocer los viñedos y catar los vinos producidos en la propiedad. Después de la experiencia vinícola, retomamos el recorrido hacia Vidago, donde el día termina con un almuerzo de cocina regional en un restaurante tradicional."
    ),
    days: [
      {
        day: 1,
        title: tri("PR2 CHV · Vidago–Arcossó", "PR2 CHV · Vidago–Arcossó", "PR2 CHV · Vidago–Arcossó"),
        trail: "Vidago · Arcossó · Vidago",
        description: tri(
          "The walk begins by the Tâmega River and gradually leaves Vidago behind to enter a rural landscape of old paths, farm fields and small villages.\n\nThe route passes through Arcossó, where the higher ground offers a new perspective over Vidago and the Tâmega valley. Between rural areas and small hamlets we also find traces of the old Corgo railway line, a memory of the rail link that marked this region.\n\nAt km 9 we reach Quinta de Arcossó. Here we pause the walk for a visit among the vines, followed by a tasting of the estate's wines. Set at around 400 metres of altitude on granite soils, these vineyards are part of the wine identity of this corner of Trás-os-Montes.\n\nAfter the tasting, we pick up the trail again for the final kilometres to Vidago. The route ends back by the Tâmega, before we sit down to a lunch of traditional Trás-os-Montes cooking, closing the day at the table after the walk.",
          "A caminhada começa junto ao rio Tâmega e deixa progressivamente Vidago para entrar numa paisagem rural marcada por caminhos antigos, campos agrícolas e pequenas povoações.\n\nO percurso passa por Arcossó, onde a posição mais elevada permite observar Vidago e o vale do Tâmega a partir de uma nova perspetiva. Entre zonas rurais e pequenos núcleos habitados, encontramos também vestígios da antiga Linha do Corgo, uma memória da ligação ferroviária que marcou esta região.\n\nAo km 9 chegamos à Quinta de Arcossó. Aqui fazemos uma pausa na caminhada para uma visita entre as vinhas, seguida de uma prova dos vinhos da propriedade. Situadas a cerca de 400 metros de altitude e em solos de origem granítica, estas vinhas fazem parte da identidade vitivinícola desta zona de Trás-os-Montes.\n\nDepois da prova, retomamos o trilho para os quilómetros finais até Vidago. O percurso termina novamente junto ao Tâmega, antes de seguirmos para um almoço de cozinha tradicional transmontana, encerrando o dia à mesa depois da caminhada.",
          "La caminata empieza junto al río Tâmega y deja poco a poco Vidago para entrar en un paisaje rural marcado por caminos antiguos, campos de cultivo y pequeñas aldeas.\n\nEl recorrido pasa por Arcossó, donde la posición más elevada permite observar Vidago y el valle del Tâmega desde una nueva perspectiva. Entre zonas rurales y pequeños núcleos habitados encontramos también vestigios de la antigua Línea del Corgo, memoria de la conexión ferroviaria que marcó esta región.\n\nEn el km 9 llegamos a la Quinta de Arcossó. Aquí hacemos una pausa en la caminata para una visita entre los viñedos, seguida de una cata de los vinos de la propiedad. Situados a unos 400 metros de altitud y en suelos de origen granítico, estos viñedos forman parte de la identidad vitivinícola de esta zona de Trás-os-Montes.\n\nDespués de la cata, retomamos el sendero para los últimos kilómetros hasta Vidago. El recorrido termina de nuevo junto al Tâmega, antes de seguir hacia un almuerzo de cocina tradicional transmontana, cerrando el día en la mesa después de la caminata."
        ),
        distance: "13,8 km",
        shape: "circular",
        ascent: "+433 m",
        elevation: { min: 315, avg: 377, max: 457, gain: 433, loss: 433 },
        meals: [],
        gallery: [],
      },
    ],
    difficultyNote: tri(
      "A moderate route, mainly because of its distance and the accumulated ascent over the day. Suitable for active participants used to regular walks, with no technical experience needed.",
      "Percurso de dificuldade moderada, sobretudo pela sua distância e pelo desnível acumulado ao longo do dia. Adequado a participantes ativos e habituados a caminhadas regulares, sem necessidade de experiência técnica.",
      "Recorrido de dificultad moderada, sobre todo por su distancia y por el desnivel acumulado a lo largo del día. Adecuado para participantes activos y habituados a caminatas regulares, sin necesidad de experiencia técnica."
    ),
    included: [
      inc.guide,
      inc.walk,
      inc.snacks,
      tri("Visit to the vineyards of Quinta de Arcossó", "Visita às vinhas da Quinta de Arcossó", "Visita a los viñedos de la Quinta de Arcossó"),
      tri("Wine tasting at Quinta de Arcossó", "Prova de vinhos na Quinta de Arcossó", "Cata de vinos en la Quinta de Arcossó"),
      tri("Regional lunch in Vidago", "Almoço regional em Vidago", "Almuerzo regional en Vidago"),
      inc.insurance,
    ],
    notIncluded: [
      exc.transfer("Vidago", "em Vidago", "Vidago"),
      exc.transport,
      exc.personal,
      exc.rest,
    ],
    extras: [],
    highlights: [
      tri("Rural landscape and the Tâmega valley", "Paisagem rural e vale do Tâmega", "Paisaje rural y valle del Tâmega"),
      tri("Paths and villages around Vidago", "Caminhos e aldeias em redor de Vidago", "Caminos y aldeas alrededor de Vidago"),
      tri("Vineyard visit and tasting at Quinta de Arcossó", "Visita às vinhas e prova na Quinta de Arcossó", "Visita a los viñedos y cata en la Quinta de Arcossó"),
      tri("Traditional Trás-os-Montes cooking", "Gastronomia tradicional de Trás-os-Montes", "Gastronomía tradicional de Trás-os-Montes"),
    ],
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "podence-1day": {
    id: "podence-1day",
    format: "roteiro",
    title: "Podence & Azibo Experience",
    subtitle: tri(
      "Culture, nature and calm by the waters of the Azibo, in a day that combines a walk, local heritage and a boat trip with a picnic.",
      "Cultura, natureza e tranquilidade junto às águas do Azibo, numa experiência que combina caminhada, património e um passeio de barco com picnic.",
      "Cultura, naturaleza y tranquilidad junto a las aguas del Azibo, en una experiencia que combina caminata, patrimonio y un paseo en barco con picnic."
    ),
    region: "Trás-os-Montes",
    heroImage: "/images/routes/tras-os-montes-2.jpg",
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Very easy", "Muito fácil", "Muy fácil"),
    grade: 1,
    season: tri("March to October", "Março a outubro", "Marzo a octubre"),
    startPoint: "Podence",
    totalDistance: "4,58 km",
    overview: tri(
      "The day begins in Podence, home of the famous Caretos, whose carnival tradition is inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.\n\nThe experience continues by the Azibo Reservoir, where we set off on an easy walk through the protected landscape around the reservoir. The route follows natural paths, wooded areas and open ground with views over the water and the surrounding hills.\n\nAt the end of the walk, we swap the trail for a boat for a relaxed trip on the Azibo Reservoir, with a picnic on board.",
      "O dia começa em Podence, terra dos famosos Caretos, cuja tradição carnavalesca integra a Lista Representativa do Património Cultural Imaterial da Humanidade da UNESCO.\n\nA experiência continua junto à Albufeira do Azibo, onde iniciamos uma caminhada de baixa dificuldade pela paisagem protegida que envolve a albufeira. O percurso segue por caminhos naturais, zonas arborizadas e áreas abertas com vistas sobre a água e as colinas envolventes.\n\nNo final da caminhada, trocamos o trilho pelo barco para uma experiência tranquila na Albufeira do Azibo, acompanhada por um picnic a bordo.",
      "El día empieza en Podence, tierra de los famosos Caretos, cuya tradición de carnaval forma parte de la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad de la UNESCO.\n\nLa experiencia continúa junto al Embalse del Azibo, donde iniciamos una caminata de baja dificultad por el paisaje protegido que rodea el embalse. El recorrido sigue caminos naturales, zonas arboladas y áreas abiertas con vistas sobre el agua y las colinas.\n\nAl final de la caminata, cambiamos el sendero por el barco para una experiencia tranquila en el Embalse del Azibo, con un picnic a bordo."
    ),
    days: [
      {
        day: 1,
        title: tri("Walk at the Azibo Reservoir", "Caminhada na Albufeira do Azibo", "Caminata en el Embalse del Azibo"),
        trail: "Podence · Albufeira do Azibo",
        description: tri(
          "After meeting in Podence, we head to the Fraga da Pegada beach area, where the walk begins.\n\nThe route runs along the Azibo Reservoir, on easy natural paths with little change in level. Over its 4.58 km, the water is with you for much of the way, alternating with wooded areas, open spaces and different perspectives over the surrounding landscape.\n\nThe walk lies within an area of high natural and scenic value, making for a calm and accessible route, ideal for anyone who wants to enjoy the land without a high physical demand.\n\nOnce the trail is done, we reach the boarding point for the second part of the experience. From here we set off by boat across the waters of the Azibo, seeing the landscape from a different angle.\n\nDuring the trip a picnic is served on board, closing the day in a relaxed way and leaving time to take in the calm of the reservoir.",
          "Depois do encontro em Podence, seguimos para a zona da Praia da Fraga da Pegada, onde começa a caminhada.\n\nO percurso desenvolve-se junto à Albufeira do Azibo, por caminhos naturais de baixa dificuldade e com pouco desnível. Ao longo dos 4,58 km, a água acompanha grande parte da experiência, alternando com zonas arborizadas, espaços abertos e diferentes perspetivas sobre a paisagem envolvente.\n\nA caminhada insere-se numa área de elevado valor natural e paisagístico, proporcionando um percurso calmo e acessível, ideal para quem procura desfrutar do território sem uma exigência física elevada.\n\nDepois de completar o trilho, chegamos ao ponto de embarque para a segunda parte da experiência. A partir daqui, seguimos de barco pelas águas do Azibo, observando a paisagem a partir de uma perspetiva diferente.\n\nDurante o passeio, é servido um picnic a bordo, encerrando o dia de forma descontraída e permitindo aproveitar com calma a tranquilidade da albufeira.",
          "Después del encuentro en Podence, seguimos hacia la zona de la Playa de Fraga da Pegada, donde empieza la caminata.\n\nEl recorrido transcurre junto al Embalse del Azibo, por caminos naturales de baja dificultad y con poco desnivel. A lo largo de sus 4,58 km, el agua acompaña gran parte de la experiencia, alternando con zonas arboladas, espacios abiertos y distintas perspectivas sobre el paisaje.\n\nLa caminata se sitúa en un área de elevado valor natural y paisajístico, con un recorrido tranquilo y accesible, ideal para quien quiere disfrutar del territorio sin una gran exigencia física.\n\nAl completar el sendero, llegamos al punto de embarque para la segunda parte de la experiencia. Desde aquí seguimos en barco por las aguas del Azibo, observando el paisaje desde otra perspectiva.\n\nDurante el paseo se sirve un picnic a bordo, cerrando el día de forma relajada y permitiendo disfrutar con calma de la tranquilidad del embalse."
        ),
        distance: "4,58 km",
        ascent: "+162 m",
        elevation: { min: 601, avg: 627, max: 667, gain: 162, loss: 118 },
        meals: [],
        gallery: [],
      },
    ],
    difficultyNote: tri(
      "A short, accessible route with little change in level, mostly on natural paths along the Azibo Reservoir. Suitable for most participants in normal physical condition, with no previous walking experience needed.",
      "Percurso curto, acessível e com pouco desnível, realizado maioritariamente por caminhos naturais junto à Albufeira do Azibo. Adequado à maioria dos participantes com uma condição física normal e sem necessidade de experiência prévia em caminhadas.",
      "Recorrido corto, accesible y con poco desnivel, realizado mayoritariamente por caminos naturales junto al Embalse del Azibo. Adecuado para la mayoría de los participantes con una condición física normal y sin necesidad de experiencia previa en caminatas."
    ),
    included: [
      inc.guide,
      inc.walk,
      inc.snacks,
      tri("Boat trip on the Azibo Reservoir", "Passeio de barco na Albufeira do Azibo", "Paseo en barco por el Embalse del Azibo"),
      tri("Picnic during the boat trip", "Picnic durante a experiência de barco", "Picnic durante la experiencia en barco"),
      inc.insurance,
    ],
    notIncluded: [
      exc.transfer("Podence", "em Podence", "Podence"),
      exc.personal,
      exc.rest,
    ],
    extras: [],
    highlights: [
      tri("The Caretos of Podence, UNESCO heritage", "Caretos de Podence e Património UNESCO", "Caretos de Podence y Patrimonio UNESCO"),
      tri("Azibo Reservoir Protected Landscape", "Paisagem Protegida da Albufeira do Azibo", "Paisaje Protegido del Embalse del Azibo"),
      tri("An easy walk by the reservoir", "Caminhada tranquila junto à albufeira", "Caminata tranquila junto al embalse"),
      tri("Boat trip with a picnic", "Passeio de barco com picnic", "Paseo en barco con picnic"),
    ],
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "chaves-1day": {
    id: "chaves-1day",
    format: "roteiro",
    title: "Chaves & São Lourenço Walkways",
    subtitle: tri(
      "A walk between the city, the rural landscape and the flavours of Trás-os-Montes, ending in the historic heart of Chaves.",
      "Uma caminhada entre a cidade, a paisagem rural e os sabores de Trás-os-Montes, com final no coração histórico de Chaves.",
      "Una caminata entre la ciudad, el paisaje rural y los sabores de Trás-os-Montes, con final en el corazón histórico de Chaves."
    ),
    region: "Trás-os-Montes",
    heroImage: "/images/routes/tras-os-montes-3.jpg",
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderada"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Chaves",
    totalDistance: "14,7 km",
    overview: tri(
      "The day begins in Chaves and heads on foot towards São Lourenço, gradually leaving the city behind for a more rural landscape of traditional paths, high ground and views over the land around Chaves.\n\nHalfway through the walk, we stop for a tasting of regional produce, with cured ham, cheeses and local wine. Then we walk back towards Chaves, where the day ends with lunch in the historic centre, close to some of the most iconic remains of the ancient Aquae Flaviae.",
      "O dia começa em Chaves e segue a pé em direção a São Lourenço, deixando progressivamente o ambiente urbano para entrar numa paisagem mais rural, marcada por caminhos tradicionais, zonas elevadas e vistas sobre o território flaviense.\n\nA meio da caminhada, fazemos uma pausa para uma degustação de produtos regionais, com presunto, queijos e vinho local. Depois, retomamos o percurso em direção a Chaves, onde o dia termina com um almoço no centro histórico, junto a alguns dos elementos mais emblemáticos da antiga Aquae Flaviae.",
      "El día empieza en Chaves y sigue a pie hacia São Lourenço, dejando poco a poco el ambiente urbano para entrar en un paisaje más rural, marcado por caminos tradicionales, zonas elevadas y vistas sobre el territorio de Chaves.\n\nA mitad de la caminata hacemos una pausa para una degustación de productos regionales, con jamón curado, quesos y vino local. Después retomamos el recorrido hacia Chaves, donde el día termina con un almuerzo en el centro histórico, junto a algunos de los elementos más emblemáticos de la antigua Aquae Flaviae."
    ),
    days: [
      {
        day: 1,
        title: tri("Walk between Chaves and São Lourenço", "Caminhada entre Chaves e São Lourenço", "Caminata entre Chaves y São Lourenço"),
        trail: "Chaves · São Lourenço · Chaves",
        description: tri(
          "The walk begins in the city of Chaves and heads towards São Lourenço, gradually gaining height as we leave the centre behind. The route combines rural paths, natural areas and different perspectives over the surroundings of Chaves.\n\nAt 14.7 km long and with a moderate accumulated ascent, the trail offers a varied experience, alternating gradual climbs, more open areas and stretches heading back down to the valley. At km 6.5 we stop at Casa dos Presuntos Zeca Moura to get to know some of the most representative flavours of the region. The experience includes a tasting of cured ham and cheeses with regional wine, a moment of rest before the second half of the walk.\n\nAfter the tasting, we walk back towards Chaves. Arriving in the city makes a natural transition from nature to history, ending in the centre of a city deeply marked by its Roman past.\n\nKnown in antiquity as Aquae Flaviae, Chaves still preserves some of the most important remains of that period, including Trajan's Bridge over the Tâmega River and the old Roman baths. The bridge is one of the main symbols of the city and one of the most important legacies of the Romanisation of this region.\n\nThe day ends with lunch in the historic centre of Chaves, pairing local cooking with the atmosphere of a city where more than two thousand years of history are still present.",
          "A caminhada começa na cidade de Chaves e segue em direção a São Lourenço, ganhando progressivamente altitude à medida que nos afastamos do centro urbano. O percurso combina caminhos rurais, zonas naturais e diferentes perspetivas sobre a envolvente de Chaves.\n\nCom 14,7 km de extensão e um desnível acumulado moderado, o trilho oferece uma experiência variada, alternando entre subidas graduais, zonas mais abertas e troços de regresso em direção ao vale. Ao km 6,5 fazemos uma pausa na Casa dos Presuntos Zeca Moura para conhecer alguns dos sabores mais representativos da região. A experiência inclui uma degustação de presunto e queijos, acompanhada por vinho regional, criando um momento de descanso antes da segunda metade da caminhada.\n\nDepois da degustação, retomamos o percurso em direção a Chaves. A chegada à cidade cria uma transição natural entre a componente de natureza e o património histórico, terminando no centro de uma cidade profundamente marcada pela presença romana.\n\nConhecida na Antiguidade como Aquae Flaviae, Chaves preserva ainda hoje alguns dos testemunhos mais importantes desse período, incluindo a Ponte de Trajano sobre o rio Tâmega e as antigas termas romanas. A ponte é um dos principais símbolos da cidade e um dos legados mais importantes da romanização desta região.\n\nO dia termina com um almoço no centro histórico de Chaves, combinando gastronomia local com o ambiente de uma cidade onde mais de dois mil anos de história continuam presentes.",
          "La caminata empieza en la ciudad de Chaves y sigue hacia São Lourenço, ganando altitud poco a poco a medida que nos alejamos del centro urbano. El recorrido combina caminos rurales, zonas naturales y distintas perspectivas sobre los alrededores de Chaves.\n\nCon 14,7 km de longitud y un desnivel acumulado moderado, el sendero ofrece una experiencia variada, alternando subidas graduales, zonas más abiertas y tramos de regreso hacia el valle. En el km 6,5 hacemos una pausa en la Casa dos Presuntos Zeca Moura para conocer algunos de los sabores más representativos de la región. La experiencia incluye una degustación de jamón curado y quesos, acompañada de vino regional, un momento de descanso antes de la segunda mitad de la caminata.\n\nDespués de la degustación, retomamos el recorrido hacia Chaves. La llegada a la ciudad crea una transición natural entre la naturaleza y el patrimonio histórico, terminando en el centro de una ciudad profundamente marcada por la presencia romana.\n\nConocida en la Antigüedad como Aquae Flaviae, Chaves conserva aún hoy algunos de los testimonios más importantes de ese periodo, como el Puente de Trajano sobre el río Tâmega y las antiguas termas romanas. El puente es uno de los principales símbolos de la ciudad y uno de los legados más importantes de la romanización de esta región.\n\nEl día termina con un almuerzo en el centro histórico de Chaves, combinando gastronomía local con el ambiente de una ciudad donde más de dos mil años de historia siguen presentes."
        ),
        distance: "14,7 km",
        ascent: "+485 m",
        elevation: { min: 347, avg: 462, max: 649, gain: 485, loss: 485 },
        meals: [],
        gallery: [],
      },
    ],
    difficultyNote: tri(
      "A moderate route, mainly because of its distance and the accumulated ascent over the day. Recommended for active participants used to regular walks, with no technical experience needed.",
      "Percurso de dificuldade moderada, sobretudo pela sua distância e pelo desnível acumulado ao longo do dia. Recomendado a participantes ativos e habituados a caminhadas regulares, sem necessidade de experiência técnica.",
      "Recorrido de dificultad moderada, sobre todo por su distancia y por el desnivel acumulado a lo largo del día. Recomendado para participantes activos y habituados a caminatas regulares, sin necesidad de experiencia técnica."
    ),
    included: [
      inc.guide,
      inc.walk,
      inc.snacks,
      tri("Tasting of cured ham and cheeses", "Degustação de presunto e queijos", "Degustación de jamón curado y quesos"),
      tri("Regional wine during the tasting", "Vinho regional durante a degustação", "Vino regional durante la degustación"),
      tri("Lunch in the centre of Chaves", "Almoço no centro de Chaves", "Almuerzo en el centro de Chaves"),
      inc.insurance,
    ],
    notIncluded: [
      exc.transfer("Chaves", "em Chaves", "Chaves"),
      exc.transport,
      exc.personal,
      exc.rest,
    ],
    extras: [],
    highlights: [
      tri("A walk between Chaves and São Lourenço", "Caminhada entre Chaves e São Lourenço", "Caminata entre Chaves y São Lourenço"),
      tri("Rural landscapes and views over the valley", "Paisagens rurais e vistas sobre o vale", "Paisajes rurales y vistas sobre el valle"),
      tri("Tasting of cured ham, cheeses and regional wine", "Degustação de presunto, queijos e vinho regional", "Degustación de jamón curado, quesos y vino regional"),
      tri("The historic centre and Roman legacy of Chaves", "Centro histórico e legado romano de Chaves", "Centro histórico y legado romano de Chaves"),
    ],
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "sintra-1day": {
    id: "sintra-1day",
    format: "roteiro",
    title: "Mystic Sintra",
    subtitle: tri(
      "The Sacred Mountain: a misty forest walk and a hidden convent",
      "A Montanha Sagrada: uma caminhada na floresta enevoada e um convento escondido",
      "La Montaña Sagrada: una caminata en el bosque brumoso y un convento escondido"
    ),
    region: "Lisboa & Sintra",
    heroImage: `${SI}hero-sintra-1day-v2.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderado"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Lisboa",
    totalDistance: "6 km",
    overview: tri(
      "A walk entirely within the Sintra-Cascais Natural Park, under the unique spell of the mystical Serra de Sintra. The trail links the village of Penedo, the Convent of the Capuchos, the Monge dolmen, the sanctuaries of São Saturnino and Peninha, Adro Nunes and Quinta da Urca. Along the way we visit the Convent of the Capuchos, and afterwards enjoy lunch at a traditional restaurant. A day of mist, myth and forest, a short drive from Lisbon.",
      "Uma caminhada inteiramente no Parque Natural de Sintra-Cascais, sob o encanto único da mística Serra de Sintra. O trilho liga a aldeia do Penedo, o Convento dos Capuchos, o dólmen do Monge, os santuários de São Saturnino e da Peninha, o Adro Nunes e a Quinta da Urca. Pelo caminho visitamos o Convento dos Capuchos e, no final, almoçamos num restaurante tradicional. Um dia de névoa, mito e floresta, a poucos minutos de Lisboa.",
      "Una caminata enteramente en el Parque Natural de Sintra-Cascais, bajo el encanto único de la mística Sierra de Sintra. El sendero une la aldea de Penedo, el Convento de los Capuchos, el dolmen del Monge, los santuarios de São Saturnino y Peninha, Adro Nunes y la Quinta da Urca. Por el camino visitamos el Convento de los Capuchos y, al final, almorzamos en un restaurante tradicional. Un día de niebla, mito y bosque, a pocos minutos de Lisboa."
    ),
    days: [
      {
        day: 1,
        title: tri("The mystic forest", "A floresta mística", "El bosque místico"),
        trail: "Trilho Místico de Sintra",
        description: tri(
          "We walk the misty trails of the Serra de Sintra, between centuries-old trees draped in ivy and moss, to the Convent of the Capuchos, a hermitage carved into the rock. Past sanctuaries and dolmens, the day ends with lunch at the traditional O Apeadeiro restaurant.",
          "Caminhamos pelos trilhos enevoados da Serra de Sintra, entre árvores centenárias cobertas de hera e musgo, até ao Convento dos Capuchos, um eremitério escavado na rocha. Por entre santuários e dólmenes, o dia termina com almoço no restaurante tradicional O Apeadeiro.",
          "Caminamos por los senderos brumosos de la Sierra de Sintra, entre árboles centenarios cubiertos de hiedra y musgo, hasta el Convento de los Capuchos, una ermita excavada en la roca. Entre santuarios y dólmenes, el día termina con almuerzo en el restaurante tradicional O Apeadeiro."
        ),
        distance: "6 km",
        walkTime: "2h",
        meals: [],
        gallery: [
          `${SI}walk-3.jpg`,
          `${SI}convento-capuchos-2.jpg`,
          `${SI}parques-sintra-capuchos-06.jpg`,
          `${SI}walk-1.jpg`,
          `${SI}walk-2.jpg`,
          `${SI}hotel-convento-capuchos.jpg`,
        ],
      },
    ],
    included: [
      tri("Expert guide", "Guia especializado", "Guía especializado"),
      tri("Guided hiking trail", "Trilho pedestre guiado", "Sendero pedestre guiado"),
      tri("Private driver and private car", "Motorista e viatura privados", "Conductor y vehículo privados"),
      tri("Refreshments", "Bebidas e snacks", "Bebidas y aperitivos"),
      tri("Lunch at the traditional O Apeadeiro restaurant", "Almoço no restaurante tradicional O Apeadeiro", "Almuerzo en el restaurante tradicional O Apeadeiro"),
      tri("Visit to the Convent of the Capuchos", "Visita ao Convento dos Capuchos", "Visita al Convento de los Capuchos"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [],
    highlights: [
      tri("Sintra-Cascais Natural Park", "Parque Natural de Sintra-Cascais", "Parque Natural de Sintra-Cascais"),
      tri("The mystical Serra de Sintra", "A mística Serra de Sintra", "La mística Sierra de Sintra"),
      tri("Visit to the Convent of the Capuchos", "Visita ao Convento dos Capuchos", "Visita al Convento de los Capuchos"),
      tri("Lunch at a traditional restaurant", "Almoço num restaurante tradicional", "Almuerzo en un restaurante tradicional"),
    ],
    priceTiers: [
      { pax: 1, price: 770 },
      { pax: 2, price: 900 },
      { pax: 3, price: 1030 },
      { pax: 4, price: 1160 },
      { pax: 5, price: 1290 },
      { pax: 6, price: 1427 },
    ],
    priceTiersNote: tiersNoteOver6,
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "algarve-1day": {
    id: "algarve-1day",
    format: "roteiro",
    title: "Charneca do Farol",
    subtitle: tri(
      "The Vincentian Coast: cliffs and the wild Atlantic",
      "A Costa Vicentina: falésias e o Atlântico selvagem",
      "La Costa Vicentina: acantilados y el Atlántico salvaje"
    ),
    region: "Algarve",
    heroImage: `${AL}hero-algarve-1day.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderado"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Portimão",
    totalDistance: "6 km",
    overview: tri(
      "A trail along the Vincentian Coast, one of the best-preserved coastlines in Europe, certified by the European Ramblers Association as a Leading Quality Trail, Best of Europe. We walk in the company of the mighty Atlantic and its coloured cliffs, ending the day with a picnic of local products alongside your local guide.",
      "Um trilho pela Costa Vicentina, uma das costas mais bem preservadas da Europa, certificada pela European Ramblers Association como Leading Quality Trail, Best of Europe. Caminhamos na companhia do imenso Atlântico e das suas falésias coloridas, terminando o dia com um piquenique de produtos locais ao lado do seu guia local.",
      "Un sendero por la Costa Vicentina, una de las costas mejor conservadas de Europa, certificada por la European Ramblers Association como Leading Quality Trail, Best of Europe. Caminamos en compañía del inmenso Atlántico y sus acantilados de colores, terminando el día con un picnic de productos locales junto a su guía local."
    ),
    days: [
      {
        day: 1,
        title: tri("The Vincentian Coast", "A Costa Vicentina", "La Costa Vicentina"),
        trail: "Trilho da Charneca do Farol",
        description: tri(
          "We follow the cliff tops above the Atlantic, where the wind shapes the heath and waves break on coloured rock far below. A relaxed walk on one of Europe's finest trails, closing with a traditional picnic of local products by the sea.",
          "Seguimos pelo topo das falésias sobre o Atlântico, onde o vento molda a charneca e as ondas rebentam na rocha colorida lá em baixo. Uma caminhada tranquila num dos melhores trilhos da Europa, a fechar com um piquenique tradicional de produtos locais junto ao mar.",
          "Seguimos por lo alto de los acantilados sobre el Atlántico, donde el viento moldea el matorral y las olas rompen en la roca de colores allá abajo. Una caminata tranquila en uno de los mejores senderos de Europa, cerrando con un picnic tradicional de productos locales junto al mar."
        ),
        distance: "6 km",
        walkTime: "2h",
        meals: [],
        gallery: [`${AL}walk-1.jpg`, `${AL}walk-2.jpg`, `${AL}walk-3.jpg`, `${AL}walk-4.jpg`],
      },
    ],
    included: [
      tri("Expert guide", "Guia especializado", "Guía especializado"),
      tri("Guided hiking trail", "Trilho pedestre guiado", "Sendero pedestre guiado"),
      tri("Private driver and private car", "Motorista e viatura privados", "Conductor y vehículo privados"),
      tri("Refreshments", "Bebidas e snacks", "Bebidas y aperitivos"),
      tri("Traditional picnic with local products", "Piquenique tradicional com produtos locais", "Picnic tradicional con productos locales"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [],
    highlights: [
      tri("The Vincentian Coast", "A Costa Vicentina", "La Costa Vicentina"),
      tri("ERA Leading Quality Trail, Best of Europe", "Trilho ERA Leading Quality, Best of Europe", "Sendero ERA Leading Quality, Best of Europe"),
      tri("Dramatic Atlantic cliffs", "Falésias atlânticas dramáticas", "Acantilados atlánticos dramáticos"),
      tri("Traditional picnic with local products", "Piquenique tradicional com produtos locais", "Picnic tradicional con productos locales"),
    ],
    priceTiers: [
      { pax: 1, price: 782 },
      { pax: 2, price: 942 },
      { pax: 3, price: 1102 },
      { pax: 4, price: 1260 },
      { pax: 5, price: 1434 },
      { pax: 6, price: 1615 },
    ],
    priceTiersNote: tiersNoteOver6,
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "tras-1day": {
    id: "tras-1day",
    format: "roteiro",
    title: "Quadrassal e Romeu",
    subtitle: tri(
      "Natura 2000: organic farmland, olive oil and a village table",
      "Natura 2000: campos biológicos, azeite e uma mesa de aldeia",
      "Natura 2000: campos ecológicos, aceite y una mesa de aldea"
    ),
    region: "Trás-os-Montes",
    heroImage: `${TR}hero-tras-1day.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderado"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Romeu, Mirandela",
    totalDistance: "6 km",
    overview: tri(
      "The Quadrassal trail crosses the Quinta do Romeu estate, managed entirely through certified organic farming and including areas protected by the Natura 2000 network. The walk ends at the Maria Rita restaurant, a charming space full of history, where Douro DOC wines and family recipes made with Romeu olive oil and fresh local vegetables are served with genuine warmth. After lunch, we visit the Olive Oil Museum for an olive oil tasting.",
      "O trilho do Quadrassal atravessa a Quinta do Romeu, gerida inteiramente em Agricultura Biológica certificada e com áreas protegidas pela rede Natura 2000. A caminhada termina no restaurante Maria Rita, um espaço cheio de história, onde se servem vinhos DOC do Douro e receitas de família feitas com o azeite de Romeu e legumes frescos locais, com hospitalidade genuína. Depois do almoço, visitamos o Museu do Azeite para uma prova de azeite.",
      "El sendero del Quadrassal atraviesa la Quinta do Romeu, gestionada enteramente con Agricultura Ecológica certificada y con áreas protegidas por la red Natura 2000. La caminata termina en el restaurante Maria Rita, un espacio lleno de historia, donde se sirven vinos DOC del Duero y recetas de familia hechas con el aceite de Romeu y verduras frescas locales, con hospitalidad genuina. Después del almuerzo, visitamos el Museo del Aceite para una cata de aceite."
    ),
    days: [
      {
        day: 1,
        title: tri("Through the Quinta do Romeu", "Pela Quinta do Romeu", "Por la Quinta do Romeu"),
        trail: "Trilho do Quadrassal",
        description: tri(
          "We cross the organic estate of Quinta do Romeu, through oak woods, granite outcrops and meadows of exceptional natural beauty, within the Natura 2000 network. The walk ends in the village of Romeu, with lunch at Maria Rita and an olive oil tasting at the museum.",
          "Atravessamos a quinta biológica do Romeu, por carvalhais, afloramentos graníticos e lameiros de beleza natural excepcional, dentro da rede Natura 2000. A caminhada termina na aldeia de Romeu, com almoço no Maria Rita e prova de azeite no museu.",
          "Atravesamos la finca ecológica de Romeu, por robledales, afloramientos graníticos y prados de belleza natural excepcional, dentro de la red Natura 2000. La caminata termina en la aldea de Romeu, con almuerzo en Maria Rita y cata de aceite en el museo."
        ),
        distance: "6 km",
        walkTime: "2h",
        meals: [],
        gallery: [`${TR}walk-1.jpg`, `${TR}walk-2.jpg`, `${TR}walk-3.jpg`, `${TR}walk-4.jpg`],
      },
    ],
    included: [
      tri("Expert guide", "Guia especializado", "Guía especializado"),
      tri("Guided hiking trail", "Trilho pedestre guiado", "Sendero pedestre guiado"),
      tri("Private driver and private car", "Motorista e viatura privados", "Conductor y vehículo privados"),
      tri("Refreshments", "Bebidas e snacks", "Bebidas y aperitivos"),
      tri("Lunch at the traditional Maria Rita restaurant", "Almoço no restaurante tradicional Maria Rita", "Almuerzo en el restaurante tradicional Maria Rita"),
      tri("Visit and olive oil tasting at the Olive Oil Museum", "Visita e prova de azeite no Museu do Azeite", "Visita y cata de aceite en el Museo del Aceite"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [],
    highlights: [
      tri("Natura 2000 network", "Rede Natura 2000", "Red Natura 2000"),
      tri("Certified organic farming estate", "Quinta em Agricultura Biológica certificada", "Finca de Agricultura Ecológica certificada"),
      tri("Lunch at the Maria Rita restaurant", "Almoço no restaurante Maria Rita", "Almuerzo en el restaurante Maria Rita"),
      tri("Olive oil tasting at the Olive Oil Museum", "Prova de azeite no Museu do Azeite", "Cata de aceite en el Museo del Aceite"),
    ],
    priceTiers: [
      { pax: 1, price: 631 },
      { pax: 2, price: 748 },
      { pax: 3, price: 867 },
      { pax: 4, price: 985 },
      { pax: 5, price: 1103 },
      { pax: 6, price: 1221 },
    ],
    priceTiersNote: tiersNoteOver6,
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "cacela-1day": {
    id: "cacela-1day",
    format: "roteiro",
    title: "Barril Beach & Cacela Velha",
    subtitle: tri(
      "Two seaside walks, a tuna fishing trail and a picnic by the lagoon",
      "Dois passeios à beira-mar, um trilho da pesca do atum e um piquenique junto à ria",
      "Dos paseos junto al mar, un sendero de la pesca del atún y un picnic junto a la ría"
    ),
    region: "Algarve",
    heroImage: `${CA}hero-cacela-1day.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderado"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Vila Nova de Cacela",
    totalDistance: "7 km",
    overview: tri(
      "A gentle day on the eastern Algarve, by the Ria Formosa. We walk two seaside trails, the longer one on Barril Beach and a shorter one around Cacela Velha, following an interpretive trail dedicated to the old tuna fishing tradition that ends at the curious Anchor Cemetery. We close the day with a picnic of local products in the company of your local guide.",
      "Um dia tranquilo no Algarve oriental, junto à Ria Formosa. Caminhamos dois trilhos à beira-mar, o mais longo na Praia do Barril e um mais curto por Cacela Velha, seguindo um percurso interpretativo dedicado à antiga pesca do atum que termina no curioso Cemitério das Âncoras. Fechamos o dia com um piquenique de produtos locais na companhia do seu guia local.",
      "Un día tranquilo en el Algarve oriental, junto a la Ría Formosa. Caminamos dos senderos junto al mar, el más largo en la Playa do Barril y uno más corto por Cacela Velha, siguiendo un recorrido interpretativo dedicado a la antigua pesca del atún que termina en el curioso Cementerio de Anclas. Cerramos el día con un picnic de productos locales en compañía de su guía local."
    ),
    days: [
      {
        day: 1,
        title: tri("Barril Beach and Cacela Velha", "Praia do Barril e Cacela Velha", "Playa do Barril y Cacela Velha"),
        trail: "Trilho da Pesca do Atum",
        description: tri(
          "We begin on Barril Beach, walking the interpretive tuna fishing trail to the Anchor Cemetery, where rows of rusted anchors stand in the dunes as a memorial to the old fishery. A second, shorter walk takes us around Cacela Velha, with its whitewashed houses above the lagoon, before a traditional picnic of local products by the sea.",
          "Começamos na Praia do Barril, percorrendo o trilho interpretativo da pesca do atum até ao Cemitério das Âncoras, onde filas de âncoras enferrujadas se erguem nas dunas em memória da antiga pesca. Um segundo passeio, mais curto, leva-nos por Cacela Velha, com as suas casas caiadas sobre a ria, antes de um piquenique tradicional de produtos locais junto ao mar.",
          "Empezamos en la Playa do Barril, recorriendo el sendero interpretativo de la pesca del atún hasta el Cementerio de Anclas, donde filas de anclas oxidadas se alzan en las dunas en memoria de la antigua pesca. Un segundo paseo, más corto, nos lleva por Cacela Velha, con sus casas encaladas sobre la ría, antes de un picnic tradicional de productos locales junto al mar."
        ),
        distance: "7 km",
        walkTime: "2h",
        meals: [],
        gallery: [`${CA}walk-1.jpg`, `${CA}walk-2.jpg`, `${CA}walk-3.jpg`, `${CA}walk-4.jpg`],
      },
    ],
    included: [
      tri("Expert guide", "Guia especializado", "Guía especializado"),
      tri("Guided hiking trail", "Trilho pedestre guiado", "Sendero pedestre guiado"),
      tri("Private driver and private car", "Motorista e viatura privados", "Conductor y vehículo privados"),
      tri("Refreshments", "Bebidas e snacks", "Bebidas y aperitivos"),
      tri("Traditional picnic with local products", "Piquenique tradicional com produtos locais", "Picnic tradicional con productos locales"),
      tri("Visit to the Anchor Cemetery", "Visita ao Cemitério das Âncoras", "Visita al Cementerio de Anclas"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [],
    highlights: [
      tri("The Ria Formosa and Barril Beach", "A Ria Formosa e a Praia do Barril", "La Ría Formosa y la Playa do Barril"),
      tri("Interpretive tuna fishing trail", "Trilho interpretativo da pesca do atum", "Sendero interpretativo de la pesca del atún"),
      tri("Visit to the Anchor Cemetery", "Visita ao Cemitério das Âncoras", "Visita al Cementerio de Anclas"),
      tri("Traditional picnic with local products", "Piquenique tradicional com produtos locais", "Picnic tradicional con productos locales"),
    ],
    priceTiers: [
      { pax: 1, price: 994 },
      { pax: 2, price: 1164 },
      { pax: 3, price: 1337 },
      { pax: 4, price: 1514 },
      { pax: 5, price: 1686 },
      { pax: 6, price: 1853 },
    ],
    priceTiersNote: tiersNoteOver6,
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },

  "arrabida-1day": {
    id: "arrabida-1day",
    format: "roteiro",
    title: "Arrábida Natural Park",
    subtitle: tri(
      "Sea cliffs, a hike in the Arrábida and wine at Quinta da Bacalhôa",
      "Falésias sobre o mar, uma caminhada na Arrábida e vinho na Quinta da Bacalhôa",
      "Acantilados sobre el mar, una caminata en la Arrábida y vino en la Quinta da Bacalhôa"
    ),
    region: "Lisboa & Sintra",
    heroImage: `${AB}hero-arrabida-1day.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Easy", "Fácil", "Fácil"),
    grade: 2,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Lisbon",
    totalDistance: "5 km",
    overview: tri(
      "An easy day a short drive from Lisbon, inside the Arrábida Natural Park, where limestone hills drop to a turquoise sea. After the hike we sit down to lunch at a traditional restaurant, and then visit Quinta da Bacalhôa in Azeitão for a wine tasting. Founded in 1922, Bacalhôa stands out for its innovation and quality, and the iconic palace and estate blend history into a truly unique setting.",
      "Um dia tranquilo a curta distância de Lisboa, dentro do Parque Natural da Arrábida, onde as serras calcárias descem a um mar turquesa. Depois da caminhada, sentamo-nos para almoçar num restaurante tradicional e seguimos para a Quinta da Bacalhôa, em Azeitão, para uma prova de vinhos. Fundada em 1922, a Bacalhôa distingue-se pela inovação e qualidade, e o emblemático palácio e quinta fundem história num cenário verdadeiramente único.",
      "Un día tranquilo a corta distancia de Lisboa, dentro del Parque Natural de Arrábida, donde las sierras calcáreas descienden a un mar turquesa. Después de la caminata, nos sentamos a almorzar en un restaurante tradicional y vamos a la Quinta da Bacalhôa, en Azeitão, para una cata de vinos. Fundada en 1922, Bacalhôa destaca por su innovación y calidad, y el emblemático palacio y quinta funden historia en un escenario verdaderamente único."
    ),
    days: [
      {
        day: 1,
        title: tri("The Arrábida and Quinta da Bacalhôa", "A Arrábida e a Quinta da Bacalhôa", "La Arrábida y la Quinta da Bacalhôa"),
        trail: "Trilho do Parque Natural da Arrábida",
        description: tri(
          "We walk a relaxed trail inside the Arrábida Natural Park, with the limestone ridges on one side and the turquoise sea on the other. After the hike we enjoy lunch at a traditional restaurant, followed by a guided visit and wine tasting at the historic Quinta da Bacalhôa in Azeitão.",
          "Caminhamos um trilho tranquilo dentro do Parque Natural da Arrábida, com as cristas calcárias de um lado e o mar turquesa do outro. Depois da caminhada, almoçamos num restaurante tradicional, seguido de visita guiada e prova de vinhos na histórica Quinta da Bacalhôa, em Azeitão.",
          "Caminamos un sendero tranquilo dentro del Parque Natural de Arrábida, con las crestas calcáreas de un lado y el mar turquesa del otro. Después de la caminata, almorzamos en un restaurante tradicional, seguido de visita guiada y cata de vinos en la histórica Quinta da Bacalhôa, en Azeitão."
        ),
        distance: "5 km",
        walkTime: "2h",
        meals: [],
        gallery: [`${AB}walk-1.jpg`, `${AB}walk-2.jpg`, `${AB}walk-3.jpg`, `${AB}walk-4.jpg`],
      },
    ],
    included: [
      tri("Expert guide", "Guia especializado", "Guía especializado"),
      tri("Guided hiking trail", "Trilho pedestre guiado", "Sendero pedestre guiado"),
      tri("Private driver and private car", "Motorista e viatura privados", "Conductor y vehículo privados"),
      tri("Refreshments", "Bebidas e snacks", "Bebidas y aperitivos"),
      tri("Lunch at a traditional restaurant", "Almoço num restaurante tradicional", "Almuerzo en un restaurante tradicional"),
      tri("Visit and wine tasting at Quinta da Bacalhôa", "Visita e prova de vinhos na Quinta da Bacalhôa", "Visita y cata de vinos en la Quinta da Bacalhôa"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [],
    highlights: [
      tri("Arrábida Natural Park", "Parque Natural da Arrábida", "Parque Natural de Arrábida"),
      tri("Sea cliffs above a turquoise coast", "Falésias sobre uma costa turquesa", "Acantilados sobre una costa turquesa"),
      tri("Lunch at a traditional restaurant", "Almoço num restaurante tradicional", "Almuerzo en un restaurante tradicional"),
      tri("Visit and wine tasting at Quinta da Bacalhôa", "Visita e prova de vinhos na Quinta da Bacalhôa", "Visita y cata de vinos en la Quinta da Bacalhôa"),
    ],
    priceTiers: [
      { pax: 1, price: 927 },
      { pax: 2, price: 1144 },
      { pax: 3, price: 1366 },
      { pax: 4, price: 1577 },
      { pax: 5, price: 1800 },
      { pax: 6, price: 2007 },
    ],
    priceTiersNote: tiersNoteOver6,
    payment: sharedPayment,
    cancellation: sharedCancellation,
  },
};

export function getProgram(id: string): Program | undefined {
  return programs[id];
}
