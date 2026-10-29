/**
 * Short texts that live in the code (labels, buttons, small captions), in
 * { en, pt, es }. Each one is editable in FLOW under "ui.<group>.<key>"
 * (Site > Páginas): lib/ui-texts.ts applies what was edited.
 * Only data here: scripts/export-texts.mjs reads this file for FLOW.
 * pt-PT, no em dashes (house rule).
 */

const tri = (en: string, pt: string, es: string) => ({ en, pt, es });

export const UI_RAW = {
  /** footer.tsx, hero-section.tsx: short texts of the frame of every page. */
  layout: {
    footerLine: tri(
      "Premium walking tours crafted by the people who built the trails.",
      "Caminhadas premium desenhadas por quem construiu os trilhos.",
      "Rutas de senderismo premium diseñadas por quienes construyeron los senderos."
    ),
    scroll: tri("scroll", "scroll", "scroll"),
    subpages: tri("More in this section", "Também nesta secção", "También en esta sección"),
  },
  /** Browser tab and Google: title and description of each page (SEO). */
  meta: {
    siteTitle: tri(
      "Portugal NTN Walking: Premium Walking Tours in Portugal",
      "Portugal NTN Walking: Operadora de Caminhadas Premium",
      "Portugal NTN Walking: Operadora de Senderismo Premium"
    ),
    siteDescription: tri(
      "Premium guided and self-guided walking tours across Portugal's most extraordinary landscapes. Every route designed, waymarked and certified by the team that operates it.",
      "Roteiros de caminhada guiados e self-guided pelas paisagens mais extraordinárias de Portugal. Cada percurso desenhado, sinalizado e certificado por quem o opera.",
      "Rutas de senderismo guiadas y autoguiadas por los paisajes más extraordinarios de Portugal. Cada ruta diseñada, señalizada y certificada por quien la opera."
    ),
    about: tri("About Us", "Sobre nós", "Sobre nosotros"),
    destinations: tri("Destinations", "Destinos", "Destinos"),
    faqs: tri("FAQs", "Perguntas frequentes", "Preguntas frecuentes"),
    grading: tri("Walking Grades", "Graus de dificuldade", "Grados de dificultad"),
    destination: tri("Destination", "Destino", "Destino"),
  },
  /** product-page-content.tsx */
  product: {
    seeGallery: tri("See the gallery", "Ver galeria", "Ver galería"),
    photos: tri("photos", "fotos", "fotos"),
    photoSoon: tri("Photo coming soon", "Foto em breve", "Foto próximamente"),
    whyLabel: tri("Why this day", "Porquê este dia", "Por qué este día"),
    dayLabel: tri("The day, step by step", "O dia, passo a passo", "El día, paso a paso"),
    routeLabel: tri("The route", "O percurso", "El recorrido"),
    routeTitle: tri("The shape of the day", "O relevo do dia", "El relieve del día"),
    routeHint: tri(
      "The walk drawn kilometre by kilometre. When it ends, move along the profile to see each point.",
      "A caminhada desenhada quilómetro a quilómetro. No fim, percorra o perfil para ver cada ponto.",
      "La caminata dibujada kilómetro a kilómetro. Al terminar, recorra el perfil para ver cada punto."
    ),
    replay: tri("Walk it again", "Rever o percurso", "Ver de nuevo"),
    of: tri("of", "de", "de"),
    altitude: tri("altitude", "altitude", "altitud"),
    start: tri("Start", "Partida", "Salida"),
    finish: tri("Finish", "Chegada", "Llegada"),
    ask: tri("Ask a question", "Fazer uma pergunta", "Hacer una pregunta"),
    perGroupFrom: tri("From, per group", "Desde, por grupo", "Desde, por grupo"),
    perPersonFrom: tri("From, per person", "Desde, por pessoa", "Desde, por persona"),
    dayByDay: tri("Day by day", "Dia a dia", "Día a día"),
    whatsIncluded: tri("What is included", "O que está incluído", "Qué está incluido"),
  },
  /** region-page-content.tsx */
  region: {
    overline: { en: "Destination", pt: "Destino", es: "Destino" },  
    essenceLabel: { en: "The territory", pt: "O território", es: "El territorio" },  
    heritageLabel: { en: "Culture and table", pt: "Cultura e mesa", es: "Cultura y mesa" },  
    programsHere: { en: "Programmes in this destination", pt: "Programas neste destino", es: "Programas en este destino" },  
    programsLabel: { en: "Walk here", pt: "Caminhe aqui", es: "Camina aquí" },  
    multiDays: { en: "Multi-day", pt: "Multidias", es: "Multidías" },  
    oneDay: { en: "Day trips", pt: "1 dia", es: "1 día" },  
    empty: {  
      en: "Programmes for this destination are being prepared.",  
      pt: "Os programas deste destino estão a ser preparados.",  
      es: "Los programas de este destino se están preparando.",  
    },  
    ctaTitle: { en: "Ready to walk this destination?", pt: "Pronto para caminhar neste destino?", es: "¿Listo para caminar este destino?" },  
    ctaBody: {  
      en: "Pick a programme above, or tell us what you are looking for and we will tailor it to you.",  
      pt: "Escolha um programa acima, ou diga-nos o que procura e desenhamos à medida.",  
      es: "Elija un programa arriba, o díganos qué busca y lo diseñamos a medida.",  
    },  
    ctaPrograms: { en: "All programmes", pt: "Todos os programas", es: "Todos los programas" },  
    back: { en: "All destinations", pt: "Todos os destinos", es: "Todos los destinos" },  
  },
  /** destinos-hub-content.tsx */
  destinations: {
    programsWord: { en: "programmes", pt: "programas", es: "programas" },  
    programWord: { en: "programme", pt: "programa", es: "programa" },  
    daysWord: { en: "days", pt: "dias", es: "días" },  
    explore: { en: "Explore the destination", pt: "Explorar destino", es: "Explorar destino" },  
    programsHere: { en: "Programmes in this destination", pt: "Programas neste destino", es: "Programas en este destino" },  
    durationLabel: { en: "Duration", pt: "Duração", es: "Duración" },  
    formatsLabel: { en: "Formats", pt: "Formatos", es: "Formatos" },  
    styleLabel: { en: "Style", pt: "Estilo", es: "Estilo" },  
    oneDay: { en: "1 day", pt: "1 dia", es: "1 día" },  
    multiDay: { en: "Multi-day", pt: "Vários dias", es: "Varios días" },  
    to: { en: "to", pt: "a", es: "a" },  
  },
  /** destinations-page-content.tsx */
  programs: {
    // Filter labels kept universal (same in the three languages), as decided on 29/10/2026.
    oneDay: tri("One day", "One day", "One day"),  
    multiDay: tri("Multi-days", "Multi-days", "Multi-days"),
    guided: tri("Guided", "Guided", "Guided"),
    selfGuided: tri("Self-guided", "Self-guided", "Self-guided"),  
    formatAria: tri("Programme format", "Formato do programa", "Formato del programa"),
    styleAria: tri("Guided or self-guided", "Guiado ou self-guided", "Guiado o autoguiado"),
    clear: tri("Clear filters", "Limpar filtros", "Borrar filtros"),  
    programs: tri("programmes", "programas", "programas"),  
    programOne: tri("programme", "programa", "programa"),  
    daysRange: tri("days", "dias", "días"),  
    to: tri("to", "a", "a"),  
    see1: tri("See the one-day programmes", "Ver os programas de 1 dia", "Ver los programas de 1 día"),  
    seeMulti: tri("See the multi-day journeys", "Ver os programas de vários dias", "Ver los programas de varios días"),  
    p1a: tri("Expert local guide", "Guia especializado", "Guía especializado"),  
    p1b: tri("Local flavours on the way", "Sabores locais pelo caminho", "Sabores locales por el camino"),  
    p1c: tri("Start and finish the same day", "Começa e acaba no mesmo dia", "Empieza y acaba el mismo día"),  
    pMa: tri("Self-guided or guided", "Self-guided ou guiado", "Autoguiado o guiado"),  
    pMb: tri("Accommodation and logistics included", "Alojamento e logística incluídos", "Alojamiento y logística incluidos"),  
    pMc: tri("Day-by-day itinerary", "Itinerário dia a dia", "Itinerario día a día"),  
    empty: tri("No programme matches this combination yet.", "Ainda não há programas para esta combinação.", "Aún no hay programas para esta combinación."),  
    reset: tri("Show all programmes", "Ver todos os programas", "Ver todos los programas"),  
  },
  /** sustainable-page-content.tsx */
  sustainable: {
    nature1: tri("Small groups", "Pequenos grupos", "Grupos pequeños"),  
    nature2: tri("Marked, certified trails", "Trilhos sinalizados e certificados", "Senderos señalizados y certificados"),  
    nature3: tri("Routes designed for low impact", "Percursos desenhados para baixo impacto", "Recorridos diseñados para bajo impacto"),  
    where1: tri("Local guesthouses and hotels", "Alojamentos locais", "Alojamientos locales"),  
    where2: tri("Village restaurants", "Restaurantes das aldeias", "Restaurantes de los pueblos"),  
    where3: tri("Producers, estates and wineries", "Produtores, quintas e adegas", "Productores, quintas y bodegas"),  
    where4: tri("Guides from the region", "Guias da região", "Guías de la región"),  
    photoSoon: tri("Photo: local producer (coming soon)", "Imagem: produtor local (em breve)", "Imagen: productor local (próximamente)"),  
  },
  /** program-card.tsx */
  card: {
    day: { en: "day", pt: "dia", es: "día" },  
    days: { en: "days", pt: "dias", es: "días" },  
    see: { en: "See the programme", pt: "Ver programa", es: "Ver programa" },  
  },
};
