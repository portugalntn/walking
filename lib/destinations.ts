/**
 * Destinations data — regions (hero carousel) + route products (grid).
 * Localised fields use { en, pt, es }. In production, route prices and
 * full itineraries come from a CMS / the operator's catalogue.
 */

export type L = { en: string; pt: string; es: string };

export type Region = {
  id: string;
  name: string;
  image: string;
  durations: string;
  routes: number;
  tagline: L;
  description: L;
};

export const regions: Region[] = [
  {
    id: "douro",
    name: "Douro Valley",
    image: "/images/routes/douro-1.jpg",
    durations: "1 · 8",
    routes: 4,
    tagline: {
      en: "UNESCO terraced vineyards",
      pt: "Socalcos vinhateiros UNESCO",
      es: "Bancales vinícolas UNESCO",
    },
    description: {
      en: "Walk the world's oldest demarcated wine region, where terraced vineyards cascade to the river and every village tells a story of wine and stone.",
      pt: "Caminhe na mais antiga região vinhateira demarcada do mundo, onde os socalcos descem até ao rio e cada aldeia conta uma história de vinho e pedra.",
      es: "Camina por la región vinícola demarcada más antigua del mundo, donde los bancales descienden hasta el río y cada aldea cuenta una historia de vino y piedra.",
    },
  },
  {
    id: "tras-os-montes",
    name: "Trás-os-Montes",
    image: "/images/routes/hero-miranda.jpg",
    durations: "1 · 8",
    routes: 3,
    tagline: {
      en: "Wild plateaus and deep valleys",
      pt: "Planaltos selvagens e vales profundos",
      es: "Mesetas salvajes y valles profundos",
    },
    description: {
      en: "Portugal's untamed northeast: vast plateaus, dramatic gorges and timeless villages where ancient traditions still shape daily life.",
      pt: "O nordeste indomado de Portugal: planaltos imensos, gargantas dramáticas e aldeias intemporais onde as tradições antigas ainda moldam o dia a dia.",
      es: "El nordeste indómito de Portugal: mesetas inmensas, gargantas dramáticas y aldeas atemporales donde las tradiciones antiguas aún moldean la vida diaria.",
    },
  },
  {
    id: "peneda-geres",
    name: "Peneda-Gerês",
    image: "/images/routes/geres-1.jpg",
    durations: "8",
    routes: 2,
    tagline: {
      en: "Portugal's only national park",
      pt: "O único parque nacional de Portugal",
      es: "El único parque nacional de Portugal",
    },
    description: {
      en: "Granite peaks, emerald rivers and ancient oak forests in Portugal's only national park, home to wild ponies and stone villages frozen in time.",
      pt: "Picos de granito, rios esmeralda e antigos carvalhais no único parque nacional de Portugal, lar de garranos selvagens e aldeias de pedra paradas no tempo.",
      es: "Picos de granito, ríos esmeralda y antiguos robledales en el único parque nacional de Portugal, hogar de garranos salvajes y aldeas de piedra detenidas en el tiempo.",
    },
  },
  {
    id: "algarve",
    name: "Algarve",
    image: "/images/routes/algarve-1.jpg",
    durations: "1",
    routes: 3,
    tagline: {
      en: "Europe's wild Atlantic coast",
      pt: "A costa atlântica selvagem da Europa",
      es: "La costa atlántica salvaje de Europa",
    },
    description: {
      en: "The Vincentian Coast: one of Europe's best-preserved coastlines, where dramatic cliffs meet the Atlantic and trails carry the scent of the sea.",
      pt: "A Costa Vicentina: uma das costas mais bem preservadas da Europa, onde falésias dramáticas encontram o Atlântico e os trilhos trazem o cheiro do mar.",
      es: "La Costa Vicentina: una de las costas mejor conservadas de Europa, donde acantilados dramáticos encuentran el Atlántico y los senderos traen el aroma del mar.",
    },
  },
  {
    id: "lisboa-sintra",
    name: "Lisboa & Sintra",
    image: "/images/routes/sintra-1.jpg",
    durations: "1",
    routes: 3,
    tagline: {
      en: "Mist, myth and sacred forest",
      pt: "Névoa, mito e floresta sagrada",
      es: "Niebla, mito y bosque sagrado",
    },
    description: {
      en: "The mystical Serra de Sintra and the Arrábida Natural Park, a short walk from Lisbon: palaces, convents and forests wrapped in Atlantic mist.",
      pt: "A mística Serra de Sintra e o Parque Natural da Arrábida, a um passo de Lisboa: palácios, conventos e florestas envoltos em névoa atlântica.",
      es: "La mística Sierra de Sintra y el Parque Natural de Arrábida, a un paso de Lisboa: palacios, conventos y bosques envueltos en niebla atlántica.",
    },
  },
  {
    id: "santiago",
    name: "Caminho de Santiago Interior",
    image: "/images/routes/santiago-1.jpg",
    durations: "11",
    routes: 1,
    tagline: {
      en: "The inland way to Compostela",
      pt: "O caminho interior para Compostela",
      es: "El camino interior a Compostela",
    },
    description: {
      en: "From Vidago to Chaves and on towards Santiago de Compostela: a quieter, deeper pilgrimage through the heart of northern Portugal. Our flagship route.",
      pt: "De Vidago a Chaves e em direcção a Santiago de Compostela: uma peregrinação mais tranquila e profunda pelo coração do Norte de Portugal. O nosso roteiro de eleição.",
      es: "De Vidago a Chaves y rumbo a Santiago de Compostela: una peregrinación más tranquila y profunda por el corazón del Norte de Portugal. Nuestra ruta insignia.",
    },
  },
];

export type RouteProduct = {
  id: string;
  regionId: string; // matches a Region.id (groups products under a destination)
  region: string;
  duration: string; // "1 Day" | "8 Days" | "11 Days"
  days: number;
  format: "roteiro" | "programa"; // roteiro = 1-day walk, programa = multiday
  type: L;
  image: string;
  title: string;
  tagline: L;
};

export const routes: RouteProduct[] = [
  {
    id: "santiago-interior",
    regionId: "santiago",
    region: "Caminho de Santiago",
    duration: "11 Days",
    days: 11,
    format: "programa",
    type: { en: "Self-Guided", pt: "Self-Guided", es: "Autoguiado" },
    image: "/images/routes/santiago-1.jpg",
    title: "Caminho Português Interior",
    tagline: {
      en: "From Vidago to Santiago de Compostela",
      pt: "De Vidago a Santiago de Compostela",
      es: "De Vidago a Santiago de Compostela",
    },
  },
  {
    id: "tras-8days",
    regionId: "tras-os-montes",
    region: "Trás-os-Montes",
    duration: "8 Days",
    days: 8,
    format: "programa",
    type: { en: "Self-Guided", pt: "Self-Guided", es: "Autoguiado" },
    image: "/images/routes/hero-miranda.jpg",
    title: "The Essence of Trás-os-Montes",
    tagline: {
      en: "Vast plateaus and timeless villages",
      pt: "Planaltos imensos e aldeias intemporais",
      es: "Mesetas inmensas y aldeas atemporales",
    },
  },
  {
    id: "douro-8days",
    regionId: "douro",
    region: "Douro Valley",
    duration: "8 Days",
    days: 8,
    format: "programa",
    type: { en: "Self-Guided", pt: "Self-Guided", es: "Autoguiado" },
    image: "/images/routes/douro-1.jpg",
    title: "Feel & Taste Douro Valley",
    tagline: {
      en: "Terraced vineyards along the river",
      pt: "Socalcos vinhateiros ao longo do rio",
      es: "Bancales vinícolas a lo largo del río",
    },
  },
  {
    id: "geres-8days",
    regionId: "peneda-geres",
    region: "Peneda-Gerês",
    duration: "8 Days",
    days: 8,
    format: "programa",
    type: { en: "Self-Guided", pt: "Self-Guided", es: "Autoguiado" },
    image: "/images/routes/geres-1.jpg",
    title: "Peneda-Gerês National Park",
    tagline: {
      en: "Granite peaks and emerald rivers",
      pt: "Picos de granito e rios esmeralda",
      es: "Picos de granito y ríos esmeralda",
    },
  },
  {
    id: "douro-1day",
    regionId: "douro",
    region: "Douro Valley",
    duration: "1 Day",
    days: 1,
    format: "roteiro",
    type: { en: "Guided", pt: "Guiado", es: "Guiado" },
    image: "/images/routes/douro-2.jpg",
    title: "Alto Douro Wine Region",
    tagline: {
      en: "UNESCO vineyards and world-class wine",
      pt: "Vinhas UNESCO e vinho de classe mundial",
      es: "Viñedos UNESCO y vino de clase mundial",
    },
  },
  {
    id: "sintra-1day",
    regionId: "lisboa-sintra",
    region: "Lisboa & Sintra",
    duration: "1 Day",
    days: 1,
    format: "roteiro",
    type: { en: "Guided", pt: "Guiado", es: "Guiado" },
    image: "/images/routes/sintra-1.jpg",
    title: "Mystic Sintra",
    tagline: {
      en: "Mist, myth and forest",
      pt: "Névoa, mito e floresta",
      es: "Niebla, mito y bosque",
    },
  },
  {
    id: "tras-1day",
    regionId: "tras-os-montes",
    region: "Trás-os-Montes",
    duration: "1 Day",
    days: 1,
    format: "roteiro",
    type: { en: "Guided", pt: "Guiado", es: "Guiado" },
    image: "/images/routes/tras-os-montes-3.jpg",
    title: "Quadrassal e Romeu",
    tagline: {
      en: "Organic farmland and olive groves",
      pt: "Campos biológicos e olivais",
      es: "Campos ecológicos y olivares",
    },
  },
  {
    id: "algarve-1day",
    regionId: "algarve",
    region: "Algarve",
    duration: "1 Day",
    days: 1,
    format: "roteiro",
    type: { en: "Guided", pt: "Guiado", es: "Guiado" },
    image: "/images/routes/algarve-1.jpg",
    title: "Charneca do Farol",
    tagline: {
      en: "Cliffs and the wild Atlantic",
      pt: "Falésias e o Atlântico selvagem",
      es: "Acantilados y el Atlántico salvaje",
    },
  },
  {
    id: "cacela-1day",
    regionId: "algarve",
    region: "Algarve",
    duration: "1 Day",
    days: 1,
    format: "roteiro",
    type: { en: "Guided", pt: "Guiado", es: "Guiado" },
    image: "/images/routes/cacela-1.jpg",
    title: "Barril Beach & Cacela Velha",
    tagline: {
      en: "Lagoon, sandbar and the Anchor Cemetery",
      pt: "Ria, ilha-barreira e o Cemitério das Âncoras",
      es: "Ría, isla barrera y el Cementerio de Anclas",
    },
  },
  {
    id: "arrabida-1day",
    regionId: "lisboa-sintra",
    region: "Lisboa & Sintra",
    duration: "1 Day",
    days: 1,
    format: "roteiro",
    type: { en: "Guided", pt: "Guiado", es: "Guiado" },
    image: "/images/routes/arrabida-1.jpg",
    title: "Arrábida Natural Park",
    tagline: {
      en: "Sea cliffs and wine at Quinta da Bacalhôa",
      pt: "Falésias sobre o mar e vinho na Quinta da Bacalhôa",
      es: "Acantilados sobre el mar y vino en la Quinta da Bacalhôa",
    },
  },
];

/** Region (destination) by its id. */
export function getRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

/** All route products that belong to a given region (destination). */
export function routesForRegion(regionId: string): RouteProduct[] {
  return routes.filter((r) => r.regionId === regionId);
}
