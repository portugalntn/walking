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
    /** Omit when the program has a single year-round price. */
    high?: { from: number; single: number };
  };
  /** Optional commercial condition shown under the price cards. */
  priceCondition?: L;
  payment: L[];
  cancellation: L[];
};

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });
const G = "/images/programs/douro/";
const T = "/images/programs/tras-os-montes/";
const P = "/images/programs/geres/";

const sharedPayment: L[] = [
  tri("A 30% deposit confirms the booking.", "Um sinal de 30% confirma a reserva.", "Una señal del 30% confirma la reserva."),
  tri("The remaining balance is due 30 days before arrival.", "O restante é liquidado 30 dias antes da chegada.", "El resto se abona 30 días antes de la llegada."),
  tri("NET rates for agencies and tour operators.", "Tarifas NET para agências e operadores.", "Tarifas NET para agencias y operadores."),
];

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
    difficulty: tri("Moderate", "Moderada", "Moderada"),
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
    difficulty: tri("Moderate", "Moderada", "Moderada"),
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
};

export function getProgram(id: string): Program | undefined {
  return programs[id];
}
