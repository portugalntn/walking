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
  /** Walking difficulty grade (1 to 5) on the NTN scale. See lib/grades.ts. */
  grade: GradeLevel;
  season: L;
  startPoint: string;
  totalDistance: string;
  overview: L;
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

  "douro-1day": {
    id: "douro-1day",
    format: "roteiro",
    title: "Alto Douro Wine Region",
    subtitle: tri(
      "A guided day among UNESCO vineyards, with a walk and a great wine",
      "Um dia guiado entre vinhas UNESCO, com caminhada e um grande vinho",
      "Un día guiado entre viñedos UNESCO, con caminata y un gran vino"
    ),
    region: "Douro Valley",
    heroImage: `${D1}hero-douro-1day.jpg`,
    duration: { days: 1, nights: 0 },
    type: tri("Guided", "Guiado", "Guiado"),
    difficulty: tri("Moderate", "Moderada", "Moderado"),
    grade: 3,
    season: tri("All year", "Todo o ano", "Todo el año"),
    startPoint: "Peso da Régua",
    totalDistance: "6 km",
    overview: tri(
      "Spend a relaxed day in the heart of the Alto Douro, the world's oldest demarcated wine region and a UNESCO World Heritage site. You walk gentle trails framed by terraced vineyards, with the Douro River opening up below at every turn. The pace is easy but rewarding: enough walking to feel the day, enough time to take in the light and the silence. Then comes the part everyone remembers, a visit to a local winery to taste Douro wines rated by Wine Spectator among the best in the world. Walking, landscape and a great glass of wine, in one unforgettable day.",
      "Passe um dia tranquilo no coração do Alto Douro, a mais antiga região vinhateira demarcada do mundo e Património Mundial UNESCO. Caminha por trilhos suaves ladeados de socalcos de vinha, com o rio Douro a abrir-se lá em baixo a cada curva. O ritmo é leve mas compensador: caminhada que chegue para sentir o dia, tempo que chegue para absorver a luz e o silêncio. Depois vem a parte que todos recordam: a visita a uma quinta para provar vinhos do Douro classificados pela Wine Spectator entre os melhores do mundo. Caminhada, paisagem e um grande copo de vinho, num dia inesquecível.",
      "Pase un día tranquilo en el corazón del Alto Duero, la región vinícola demarcada más antigua del mundo y Patrimonio Mundial UNESCO. Camina por senderos suaves flanqueados por bancales de viña, con el río Duero abriéndose abajo en cada curva. El ritmo es ligero pero gratificante: caminata suficiente para sentir el día, tiempo suficiente para absorber la luz y el silencio. Luego llega la parte que todos recuerdan: la visita a una quinta para catar vinos del Duero reconocidos por Wine Spectator entre los mejores del mundo. Caminata, paisaje y una gran copa de vino, en un día inolvidable."
    ),
    days: [
      {
        day: 1,
        title: tri("The vineyard trail", "O trilho das vinhas", "El sendero de los viñedos"),
        trail: "Trilho do Alto Douro Vinhateiro",
        description: tri(
          "The walk begins gently, on narrow paths edged by dry schist walls and rows of vines that climb the hillsides tier after tier. As we go, the valley keeps opening up: the river curls below, hamlets cling to the slopes, and the light shifts across the terraces. We pass close to everyday Douro life, with traditional yards, vegetable plots and orchards heavy with fruit, a reminder that this is a living, working landscape and not just a postcard. The rhythm is calm but real, with enough up and down to feel that you have walked. We finish at Quinta da Pacheca, where a traditional picnic or lunch gives way to a guided visit to the cellars and a tasting of the estate's wines. An expert guide and private transport are with you from start to finish.",
          "A caminhada começa suave, por carreiros estreitos entre muros de xisto e fileiras de vinha que sobem a encosta, socalco após socalco. À medida que avançamos, o vale vai-se abrindo: o rio desenha-se lá em baixo, as aldeias agarram-se às vertentes e a luz muda sobre os terraços. Passamos rente ao dia a dia do Douro, com quintais tradicionais, hortas e pomares carregados de fruta, lembrando que esta é uma paisagem viva e de trabalho, não um postal. O ritmo é calmo mas verdadeiro, com subidas e descidas que chegam para sentir que caminhámos. Terminamos na Quinta da Pacheca, onde um piquenique tradicional ou almoço dá lugar a uma visita guiada às caves e à prova dos vinhos da casa. Um guia especializado e transporte privado acompanham-no do início ao fim.",
          "La caminata empieza suave, por sendas estrechas entre muros de esquisto e hileras de viña que suben la ladera, bancal tras bancal. A medida que avanzamos, el valle se va abriendo: el río se dibuja abajo, las aldeas se aferran a las laderas y la luz cambia sobre las terrazas. Pasamos junto al día a día del Duero, con patios tradicionales, huertas y vergeles cargados de fruta, recordando que este es un paisaje vivo y de trabajo, no una postal. El ritmo es tranquilo pero real, con subidas y bajadas suficientes para sentir que has caminado. Terminamos en la Quinta da Pacheca, donde un picnic tradicional o almuerzo da paso a una visita guiada a las bodegas y a la cata de los vinos de la casa. Un guía especializado y transporte privado le acompañan de principio a fin."
        ),
        distance: "6 km",
        walkTime: "2h",
        meals: [],
        gallery: [`${D1}walk-1.jpg`, `${D1}walk-2.jpg`, `${D1}walk-3.jpg`, `${D1}walk-4.jpg`],
      },
    ],
    included: [
      tri("Expert guide", "Guia especializado", "Guía especializado"),
      tri("Guided hiking trail", "Trilho pedestre guiado", "Sendero pedestre guiado"),
      tri("Private driver and private car", "Motorista e viatura privados", "Conductor y vehículo privados"),
      tri("Refreshments", "Bebidas e snacks", "Bebidas y aperitivos"),
      tri("Traditional picnic or lunch at Quinta da Pacheca", "Piquenique tradicional ou almoço na Quinta da Pacheca", "Picnic tradicional o almuerzo en la Quinta da Pacheca"),
      tri("Visit and wine tasting at Quinta da Pacheca", "Visita e prova de vinhos na Quinta da Pacheca", "Visita y cata de vinos en la Quinta da Pacheca"),
      tri("Personal insurance", "Seguro pessoal", "Seguro personal"),
    ],
    notIncluded: [
      tri("Personal expenses", "Despesas pessoais", "Gastos personales"),
      tri("Anything not listed as included", "Tudo o que não esteja indicado como incluído", "Todo lo que no figure como incluido"),
    ],
    extras: [],
    highlights: [
      tri("Vineyard trails through a UNESCO World Heritage landscape", "Trilhos entre vinhas, em paisagem Património Mundial UNESCO", "Senderos entre viñedos, en un paisaje Patrimonio Mundial UNESCO"),
      tri("Panoramic views over the Douro River and its terraces", "Vistas panorâmicas sobre o rio Douro e os socalcos", "Vistas panorámicas sobre el río Duero y los bancales"),
      tri("A guided walk of about 6 km, around 2 hours", "Caminhada guiada de cerca de 6 km, à volta de 2 horas", "Caminata guiada de unos 6 km, alrededor de 2 horas"),
      tri("A premium tasting of award-winning Douro wines", "Prova premium de vinhos do Douro premiados", "Cata premium de vinos del Duero premiados"),
      tri("A traditional picnic or a typical local lunch", "Piquenique tradicional ou almoço típico local", "Picnic tradicional o almuerzo típico local"),
    ],
    priceTiers: [
      { pax: 1, price: 786 },
      { pax: 2, price: 960 },
      { pax: 3, price: 1134 },
      { pax: 4, price: 1308 },
      { pax: 5, price: 1482 },
      { pax: 6, price: 1656 },
    ],
    priceTiersNote: tiersNoteOver6,
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
