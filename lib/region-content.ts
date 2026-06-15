/**
 * Editorial content for each destination (region) page.
 * Localised text uses { en, pt, es }. No em dashes (house rule).
 * Keyed by Region.id (see lib/destinations.ts).
 */

import type { L } from "./destinations";

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });

export type RegionContent = {
  essence: {
    title: L;
    body: L;
    image: string;
    badgeValue: string;
    badgeLabel: L;
  };
  heritage?: {
    title: L;
    body: L;
    gallery: string[];
  };
  highlights: L[];
};

export const regionContent: Record<string, RegionContent> = {
  douro: {
    essence: {
      title: tri("Where wine is born from stone", "Onde o vinho nasce da pedra", "Donde el vino nace de la piedra"),
      body: tri(
        "The Douro is a work of human hands and patience. For centuries, generations carved terraces into the schist slopes to tame the river and the vine. Walking here means reading that story at every bend, with the river always below and the scent of the harvest in the air come September.",
        "O Douro é uma obra de mão humana e de paciência. Durante séculos, gerações esculpiram socalcos na encosta de xisto para domar o rio e a vinha. Caminhar aqui é ler essa história a cada curva, com o rio sempre lá em baixo e o aroma do mosto no ar quando chega a vindima.",
        "El Duero es obra de manos humanas y de paciencia. Durante siglos, generaciones esculpieron bancales en la ladera de esquisto para domar el río y la viña. Caminar aquí es leer esa historia en cada curva, con el río siempre abajo y el aroma de la vendimia en el aire al llegar septiembre."
      ),
      image: "/images/programs/douro/douro-a.jpg",
      badgeValue: "1756",
      badgeLabel: tri("World's oldest demarcated wine region", "Região vinhateira demarcada mais antiga do mundo", "La región vinícola demarcada más antigua del mundo"),
    },
    heritage: {
      title: tri("Table, estate and harvest", "Mesa, quinta e vindima", "Mesa, quinta y vendimia"),
      body: tri(
        "Every estate has its grape and its story. We taste ports and award-winning reds where they are made, at the table with rooted cooking: slow-grilled beef, local olive oil and mountain cheeses. You enter the Douro on foot, but you stay for the taste.",
        "Cada quinta tem a sua casta e a sua história. Provamos vinhos do Porto e tintos premiados onde foram criados, à mesa com cozinha de raiz: posta grelhada, azeite local e queijos de montanha. O Douro entra-se a pé, mas fica-se pelo paladar.",
        "Cada quinta tiene su uva y su historia. Catamos oportos y tintos premiados donde se crean, a la mesa con cocina de raíz: carne a la brasa, aceite local y quesos de montaña. Al Duero se entra a pie, pero te quedas por el paladar."
      ),
      gallery: ["/images/programs/douro/samodaes-1.jpg", "/images/programs/douro/monge-2.jpg", "/images/programs/douro-1day/walk-2.jpg"],
    },
    highlights: [
      tri("UNESCO World Heritage terraced vineyards", "Socalcos vinhateiros Património Mundial UNESCO", "Bancales vinícolas Patrimonio Mundial UNESCO"),
      tri("Tastings at historic Douro estates", "Provas em quintas históricas do Douro", "Catas en quintas históricas del Duero"),
      tri("The Douro River ever-present in the landscape", "Rio Douro sempre presente na paisagem", "El río Duero siempre presente en el paisaje"),
      tri("Food and wines with Denomination of Origin", "Gastronomia e vinhos com Denominação de Origem", "Gastronomía y vinos con Denominación de Origen"),
    ],
  },

  "tras-os-montes": {
    essence: {
      title: tri("The northeast time never rushed", "O nordeste que o tempo não apressou", "El nordeste que el tiempo no apresuró"),
      body: tri(
        "Trás-os-Montes is a land of vast plateaus, cold winters and villages where Mirandese, Portugal's second official language, is still spoken. Here the clock runs by the seasons. We walk through chestnut groves, granite outcrops and meadows where donkeys still graze.",
        "Trás-os-Montes é terra de planaltos imensos, invernos frios e aldeias onde ainda se fala mirandês, a segunda língua oficial de Portugal. Aqui o relógio é o das estações. Caminhamos por soutos de castanheiros, afloramentos de granito e lameiros onde os burros ainda pastam.",
        "Trás-os-Montes es tierra de mesetas inmensas, inviernos fríos y aldeas donde aún se habla mirandés, la segunda lengua oficial de Portugal. Aquí el reloj es el de las estaciones. Caminamos por sotos de castaños, afloramientos de granito y prados donde aún pastan los burros."
      ),
      image: "/images/routes/tras-os-montes-2.jpg",
      badgeValue: "2",
      badgeLabel: tri("Official languages in the Land of Miranda", "Línguas oficiais na Terra de Miranda", "Lenguas oficiales en la Tierra de Miranda"),
    },
    heritage: {
      title: tri("Smoked meats, olive oil and a village table", "Fumeiro, azeite e mesa de aldeia", "Embutidos, aceite y mesa de aldea"),
      body: tri(
        "Trás-os-Montes cooking is generous and unhurried: cold-cured smoked meats, oil from old mills, beef, honey and convent sweets. We sit at family tables, in houses with history, where the recipe has not changed for generations and the welcome is genuine.",
        "A cozinha transmontana é generosa e sem pressa: fumeiro curado ao frio, azeite de lagares antigos, posta, mel e doçaria conventual. Sentamo-nos a mesas de família, em casas com história, onde a receita é a mesma há gerações e a hospitalidade é genuína.",
        "La cocina transmontana es generosa y sin prisa: embutidos curados al frío, aceite de lagares antiguos, carne, miel y dulces conventuales. Nos sentamos a mesas de familia, en casas con historia, donde la receta es la misma desde hace generaciones y la hospitalidad es genuina."
      ),
      gallery: ["/images/programs/tras-os-montes/miranda-1.jpg", "/images/programs/tras-os-montes/azeite-1.jpg", "/images/programs/tras-os-montes/palacios-1.jpg"],
    },
    highlights: [
      tri("Mirandese, Portugal's second official language", "Mirandês, segunda língua oficial de Portugal", "Mirandés, segunda lengua oficial de Portugal"),
      tri("Medieval villages and bridges (Gimonde, Romeu)", "Aldeias e pontes medievais (Gimonde, Romeu)", "Aldeas y puentes medievales (Gimonde, Romeu)"),
      tri("Montesinho Natural Park and the Natura 2000 network", "Parque Natural de Montesinho e rede Natura 2000", "Parque Natural de Montesinho y red Natura 2000"),
      tri("Olive oil, smoked meats and the local table", "Azeite, fumeiro e mesa transmontana", "Aceite, embutidos y mesa transmontana"),
    ],
  },

  "peneda-geres": {
    essence: {
      title: tri("Portugal's only national park", "O único parque nacional de Portugal", "El único parque nacional de Portugal"),
      body: tri(
        "In the far northwest, Gerês holds the only landscape with National Park status in Portugal. Granite peaks, emerald rivers, ancient oak woods and waterfalls. Wild garrano ponies roam here, alongside stone villages that seem frozen in time, like Pitões das Júnias.",
        "No extremo noroeste, o Gerês guarda a única paisagem com estatuto de Parque Nacional em Portugal. Picos de granito, rios de água esmeralda, carvalhais antigos e cascatas. Por aqui vivem os garranos selvagens e aldeias de pedra que parecem paradas no tempo, como Pitões das Júnias.",
        "En el extremo noroeste, Gerês guarda el único paisaje con estatus de Parque Nacional en Portugal. Picos de granito, ríos de agua esmeralda, robledales antiguos y cascadas. Aquí viven los garranos salvajes y aldeas de piedra que parecen detenidas en el tiempo, como Pitões das Júnias."
      ),
      image: "/images/programs/geres/geres-a.jpg",
      badgeValue: "1",
      badgeLabel: tri("The country's only National Park", "O único Parque Nacional do país", "El único Parque Nacional del país"),
    },
    heritage: {
      title: tri("Granite, water and community", "Granito, água e comunidade", "Granito, agua y comunidad"),
      body: tri(
        "Life in Gerês is built around water and stone: communal granaries, mills, Roman roads and the shared herding traditions that still bind the villages. We eat kid goat, corn bread and mountain honey, and drink the water that comes down from the peaks.",
        "A vida do Gerês organiza-se em torno da água e da pedra: espigueiros comunitários, moinhos, calçadas romanas e a vezeira em que as aldeias partilham o gado. Comemos cabrito, broa e mel da serra, e bebemos a água que desce da montanha.",
        "La vida en Gerês se organiza en torno al agua y la piedra: hórreos comunitarios, molinos, calzadas romanas y la tradición de pastoreo compartido que une a las aldeas. Comemos cabrito, pan de maíz y miel de la sierra, y bebemos el agua que baja de la montaña."
      ),
      gallery: ["/images/programs/geres/geres-c.jpg", "/images/programs/geres/geres-e.jpg", "/images/programs/geres/geres-g.jpg"],
    },
    highlights: [
      tri("Portugal's only National Park", "Único Parque Nacional de Portugal", "El único Parque Nacional de Portugal"),
      tri("Wild garrano ponies and ancient oak woods", "Garranos selvagens e carvalhais antigos", "Garranos salvajes y robledales antiguos"),
      tri("Stone villages and communal granaries", "Aldeias de pedra e espigueiros comunitários", "Aldeas de piedra y hórreos comunitarios"),
      tri("Waterfalls, lagoons and Roman roads", "Cascatas, lagoas e calçadas romanas", "Cascadas, lagunas y calzadas romanas"),
    ],
  },

  algarve: {
    essence: {
      title: tri("The coast Europe kept wild", "A costa que a Europa preservou", "La costa que Europa conservó"),
      body: tri(
        "Far from the crowded-beach cliché, our Algarve is that of the Vincentian Coast and the Ria Formosa: Atlantic-battered cliffs, bird-filled marshes and fine-sand barrier islands. We walk the clifftops and old fishing trails, always with the sea for company.",
        "Longe da imagem de praia cheia, o nosso Algarve é o da Costa Vicentina e da Ria Formosa: falésias batidas pelo Atlântico, sapais cheios de aves e ilhas-barreira de areia fina. Caminhamos pelo topo das arribas e por trilhos de pesca antigos, sempre com o mar por companhia.",
        "Lejos del tópico de playa llena, nuestro Algarve es el de la Costa Vicentina y la Ría Formosa: acantilados batidos por el Atlántico, marismas llenas de aves e islas barrera de arena fina. Caminamos por lo alto de los acantilados y por antiguos senderos de pesca, siempre con el mar de compañía."
      ),
      image: "/images/programs/cacela-1day/hero-cacela-1day.jpg",
      badgeValue: "300",
      badgeLabel: tri("Days of sun a year", "Dias de sol por ano", "Días de sol al año"),
    },
    heritage: {
      title: tri("Sea, salt and the southern table", "Mar, sal e mesa do sul", "Mar, sal y mesa del sur"),
      body: tri(
        "The south lives by the sea and the rhythm of the tides. We taste fresh fish, shellfish from the lagoon, traditional salt and the almond and fig sweets of Moorish roots. We close the day with a picnic of local products, to the sound of the waves.",
        "O sul vive do mar e do compasso das marés. Provamos peixe fresco, marisco da ria, sal tradicional e os doces de amêndoa e figo de raiz árabe. Terminamos o dia com um piquenique de produtos locais, ao som das ondas.",
        "El sur vive del mar y del compás de las mareas. Catamos pescado fresco, marisco de la ría, sal tradicional y los dulces de almendra e higo de raíz árabe. Terminamos el día con un picnic de productos locales, al son de las olas."
      ),
      gallery: ["/images/programs/algarve-1day/walk-1.jpg", "/images/programs/cacela-1day/walk-1.jpg", "/images/programs/algarve-1day/walk-3.jpg"],
    },
    highlights: [
      tri("Vincentian Coast, ERA Best of Europe trail", "Costa Vicentina, trilho Best of Europe (ERA)", "Costa Vicentina, sendero Best of Europe (ERA)"),
      tri("Ria Formosa and its barrier islands", "Ria Formosa e as ilhas-barreira", "Ría Formosa y sus islas barrera"),
      tri("Anchor Cemetery and the tuna fishing heritage", "Cemitério das Âncoras e a pesca do atum", "Cementerio de Anclas y la pesca del atún"),
      tri("Picnic of local products by the sea", "Piquenique de produtos locais junto ao mar", "Picnic de productos locales junto al mar"),
    ],
  },

  "lisboa-sintra": {
    essence: {
      title: tri("Mist, palaces and the sea a step from Lisbon", "Névoa, palácios e mar a um passo de Lisboa", "Niebla, palacios y mar a un paso de Lisboa"),
      body: tri(
        "Between the Serra de Sintra and the Arrábida Natural Park lies a world of contrasts. To the north, the damp, mystical forest of Sintra, with its palaces and convents wrapped in mist. To the south, the limestone cliffs of Arrábida dropping into a turquoise sea. All less than an hour from the capital.",
        "Entre a Serra de Sintra e o Parque Natural da Arrábida cabe um mundo de contrastes. A norte, a floresta húmida e mística de Sintra, com os seus palácios e conventos envoltos em névoa. A sul, as falésias calcárias da Arrábida a cair num mar turquesa. Tudo a menos de uma hora da capital.",
        "Entre la Sierra de Sintra y el Parque Natural de Arrábida cabe un mundo de contrastes. Al norte, el bosque húmedo y místico de Sintra, con sus palacios y conventos envueltos en niebla. Al sur, los acantilados calcáreos de Arrábida cayendo a un mar turquesa. Todo a menos de una hora de la capital."
      ),
      image: "/images/programs/arrabida-1day/hero-arrabida-1day.jpg",
      badgeValue: "UNESCO",
      badgeLabel: tri("Cultural Landscape of Sintra", "Paisagem Cultural de Sintra", "Paisaje Cultural de Sintra"),
    },
    heritage: {
      title: tri("Myth, convent and wine", "Mito, convento e vinho", "Mito, convento y vino"),
      body: tri(
        "Sintra is a UNESCO Cultural Landscape, a land of romanticism, legend and the cork-lined Convent of the Capuchos. Arrábida adds the historic wine of Quinta da Bacalhôa and the calm of the sea. We walk the sacred and the sensory, and close with a good table.",
        "Sintra é Paisagem Cultural da Humanidade, terra de romantismo, lendas e do Convento dos Capuchos forrado a cortiça. A Arrábida acrescenta o vinho histórico da Quinta da Bacalhôa e a calma do mar. Caminhamos no sagrado e no sensorial, e fechamos com uma boa mesa.",
        "Sintra es Paisaje Cultural de la Humanidad, tierra de romanticismo, leyendas y del Convento dos Capuchos forrado de corcho. Arrábida añade el vino histórico de la Quinta da Bacalhôa y la calma del mar. Caminamos en lo sagrado y lo sensorial, y cerramos con una buena mesa."
      ),
      gallery: ["/images/programs/sintra-1day/walk-1.jpg", "/images/programs/arrabida-1day/walk-1.jpg", "/images/programs/sintra-1day/walk-2.jpg"],
    },
    highlights: [
      tri("Sintra, UNESCO Cultural Landscape", "Sintra, Paisagem Cultural UNESCO", "Sintra, Paisaje Cultural UNESCO"),
      tri("Convent of the Capuchos and the mystical hills", "Convento dos Capuchos e a serra mística", "Convento dos Capuchos y la sierra mística"),
      tri("Arrábida Natural Park above the sea", "Parque Natural da Arrábida sobre o mar", "Parque Natural de Arrábida sobre el mar"),
      tri("Wine tasting at the historic Quinta da Bacalhôa", "Prova de vinhos na histórica Quinta da Bacalhôa", "Cata de vinos en la histórica Quinta da Bacalhôa"),
    ],
  },

  santiago: {
    essence: {
      title: tri("The inland way to Compostela", "O caminho interior para Compostela", "El camino interior a Compostela"),
      body: tri(
        "There is more than one way to Santiago. The Inland Portuguese Way climbs from Vidago and Chaves through the heart of the North, far from the crowds, past villages, spa towns and Roman bridges. A slower, deeper pilgrimage, and our flagship programme.",
        "Há mais do que um caminho para Santiago. O Caminho Português Interior sobe de Vidago e Chaves pelo coração do Norte, longe das multidões, por aldeias, termas e pontes romanas. Uma peregrinação mais lenta e mais profunda, o nosso programa de eleição.",
        "Hay más de un camino a Santiago. El Camino Portugués Interior sube desde Vidago y Chaves por el corazón del Norte, lejos de las multitudes, por aldeas, termas y puentes romanos. Una peregrinación más lenta y profunda, nuestro programa insignia."
      ),
      image: "/images/routes/santiago-1.jpg",
      badgeValue: "11",
      badgeLabel: tri("Days to Compostela", "Dias até Compostela", "Días hasta Compostela"),
    },
    highlights: [
      tri("11 days from Vidago to Santiago de Compostela", "11 dias de Vidago a Santiago de Compostela", "11 días de Vidago a Santiago de Compostela"),
      tri("Away from the crowds of the classic ways", "Longe das multidões dos caminhos clássicos", "Lejos de las multitudes de los caminos clásicos"),
      tri("Spa towns, villages and Roman bridges", "Termas, aldeias e pontes romanas", "Termas, aldeas y puentes romanos"),
      tri("A pilgrimage through inland northern Portugal", "Peregrinação pelo interior do Norte de Portugal", "Una peregrinación por el interior del norte de Portugal"),
    ],
  },
};
