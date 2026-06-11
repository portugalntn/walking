/**
 * Frequently asked questions, grouped by theme.
 * Localised text uses { en, pt, es }. pt-PT (not pt-BR). No em dashes (house rule).
 * Source: portugalntnwalking.com/faqs.php, rewritten in a warmer, human tone.
 */

import type { L } from "./destinations";

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });

export type Faq = { q: L; a: L };
export type FaqGroup = { category: L; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    category: tri("Planning your walk", "Planear a sua caminhada", "Planificar su caminata"),
    items: [
      {
        q: tri(
          "What should I wear to go walking?",
          "O que devo levar para caminhar?",
          "¿Qué debo llevar para caminar?"
        ),
        a: tri(
          "Comfortable clothes and shoes are enough for most walks. Depending on the season and the trail, we recommend proper walking boots, and we are happy to advise you for each route.",
          "Para a maioria das caminhadas basta roupa e calçado confortáveis. Conforme a época e o trilho, recomendamos botas de caminhada próprias, e teremos todo o gosto em aconselhá-lo para cada percurso.",
          "Para la mayoría de las caminatas basta ropa y calzado cómodos. Según la temporada y el sendero, recomendamos botas de senderismo, y estaremos encantados de aconsejarle para cada ruta."
        ),
      },
      {
        q: tri(
          "Can I visit a place that is not in the program?",
          "Posso visitar um local que não esteja no programa?",
          "¿Puedo visitar un lugar que no esté en el programa?"
        ),
        a: tri(
          "Yes. Our programs are open to suggestions and changes requested by our guests. Whenever it is feasible and availability allows, we make it happen.",
          "Sim. Os nossos programas estão abertos a sugestões e alterações pedidas pelos hóspedes. Sempre que for viável e a disponibilidade o permita, tornamo-lo possível.",
          "Sí. Nuestros programas están abiertos a sugerencias y cambios solicitados por los huéspedes. Siempre que sea viable y la disponibilidad lo permita, lo hacemos posible."
        ),
      },
      {
        q: tri(
          "Why choose a guided walk?",
          "Porquê escolher um passeio guiado?",
          "¿Por qué elegir un paseo guiado?"
        ),
        a: tri(
          "An expert PORTUGALNTN guide is with you from start to finish, sharing the stories behind each place for a richer, more authentic experience.",
          "Um guia especializado da PORTUGALNTN acompanha-o do início ao fim, partilhando as histórias por trás de cada lugar para uma experiência mais rica e autêntica.",
          "Un guía especializado de PORTUGALNTN le acompaña de principio a fin, compartiendo las historias detrás de cada lugar para una experiencia más rica y auténtica."
        ),
      },
      {
        q: tri(
          "When does a self-guided walk make sense?",
          "Quando faz sentido um passeio autoguiado?",
          "¿Cuándo tiene sentido un paseo autoguiado?"
        ),
        a: tri(
          "When you prefer to set your own pace. We provide a map, route notes and refreshments, with optional luggage transfer, so you can walk on your own with confidence and without getting lost.",
          "Quando prefere definir o seu próprio ritmo. Fornecemos mapa, notas de percurso e bebidas, com transporte de bagagem opcional, para que caminhe por sua conta com confiança e sem se perder.",
          "Cuando prefiere marcar su propio ritmo. Le facilitamos mapa, notas de ruta y refrescos, con transporte de equipaje opcional, para que camine por su cuenta con confianza y sin perderse."
        ),
      },
      {
        q: tri(
          "How do I choose a walk suited to my fitness level?",
          "Como escolho uma caminhada adequada à minha condição física?",
          "¿Cómo elijo una caminata adecuada a mi condición física?"
        ),
        a: tri(
          "Each program shows its distance and difficulty. If you are unsure, tell us and we will tailor the route to your needs.",
          "Cada programa indica a distância e o grau de dificuldade. Se tiver dúvidas, diga-nos e adaptamos o percurso às suas necessidades.",
          "Cada programa indica la distancia y el grado de dificultad. Si tiene dudas, díganos y adaptamos la ruta a sus necesidades."
        ),
      },
      {
        q: tri(
          "What kind of accommodation should I expect?",
          "Que tipo de alojamento devo esperar?",
          "¿Qué tipo de alojamiento debo esperar?"
        ),
        a: tri(
          "It varies by program and is described in each itinerary, always chosen for comfort, character and a strong local identity. One-day routes do not include accommodation.",
          "Varia consoante o programa e está descrito em cada itinerário, sempre escolhido pelo conforto, carácter e forte identidade local. Os roteiros de um dia não incluem alojamento.",
          "Varía según el programa y se describe en cada itinerario, siempre elegido por su comodidad, carácter e identidad local. Las rutas de un día no incluyen alojamiento."
        ),
      },
      {
        q: tri(
          "Is there a minimum and maximum group size?",
          "Há número mínimo e máximo de participantes?",
          "¿Hay número mínimo y máximo de participantes?"
        ),
        a: tri(
          "Groups range from 1 person (minimum) to 12 people (maximum). For larger groups, just email us with your request.",
          "Os grupos vão de 1 pessoa (mínimo) a 12 pessoas (máximo). Para grupos maiores, basta enviar-nos o seu pedido por email.",
          "Los grupos van de 1 persona (mínimo) a 12 personas (máximo). Para grupos mayores, basta con enviarnos su solicitud por correo."
        ),
      },
      {
        q: tri(
          "What is the time zone in Portugal?",
          "Qual é o fuso horário em Portugal?",
          "¿Cuál es la zona horaria en Portugal?"
        ),
        a: tri(
          "Mainland Portugal is on UTC+00:00, in line with Western Europe. Daylight saving may shift this by an hour at certain times of year.",
          "Portugal continental está em UTC+00:00, alinhado com a Europa Ocidental. O horário de verão pode alterar este valor em uma hora em certas alturas do ano.",
          "Portugal continental está en UTC+00:00, en línea con Europa Occidental. El horario de verano puede variarlo en una hora en ciertas épocas del año."
        ),
      },
    ],
  },
  {
    category: tri("Booking and payment", "Reservas e pagamento", "Reservas y pago"),
    items: [
      {
        q: tri(
          "How do I book a program?",
          "Como reservo um programa?",
          "¿Cómo reservo un programa?"
        ),
        a: tri(
          "Send your request to walking@portugalntn.com, telling us the number of people and your preferred dates. We reply within 24 hours.",
          "Envie o seu pedido para walking@portugalntn.com, indicando o número de pessoas e as datas pretendidas. Respondemos em 24 horas.",
          "Envíe su solicitud a walking@portugalntn.com, indicando el número de personas y las fechas deseadas. Respondemos en 24 horas."
        ),
      },
      {
        q: tri(
          "What is included in the total price?",
          "O que está incluído no preço total?",
          "¿Qué está incluido en el precio total?"
        ),
        a: tri(
          "Personal accident insurance, civil liability insurance and refreshments are always included in every program. A guest relations contact supports you throughout your stay. Each program description lists everything else that is included.",
          "Seguro de acidentes pessoais, seguro de responsabilidade civil e bebidas estão sempre incluídos em todos os programas. Um contacto de apoio ao cliente acompanha-o durante toda a estadia. A descrição de cada programa indica tudo o resto que está incluído.",
          "El seguro de accidentes personales, el seguro de responsabilidad civil y los refrescos están siempre incluidos en todos los programas. Un contacto de atención al cliente le acompaña durante toda la estancia. La descripción de cada programa detalla todo lo demás incluido."
        ),
      },
      {
        q: tri(
          "What are your payment terms?",
          "Quais são as condições de pagamento?",
          "¿Cuáles son las condiciones de pago?"
        ),
        a: tri(
          "A 30% deposit confirms the booking. The remaining balance is due up to 40 days before your arrival.",
          "Um sinal de 30% confirma a reserva. O restante é liquidado até 40 dias antes da chegada.",
          "Una señal del 30% confirma la reserva. El resto se abona hasta 40 días antes de la llegada."
        ),
      },
      {
        q: tri(
          "Which payment methods do you accept?",
          "Que métodos de pagamento aceitam?",
          "¿Qué métodos de pago aceptan?"
        ),
        a: tri(
          "Bank transfer (IBAN PT50 0036 0536 99106003612 67, SWIFT MPIOPTPL). On request, we also accept credit card, MB Way, Multibanco and PayShop.",
          "Transferência bancária (IBAN PT50 0036 0536 99106003612 67, SWIFT MPIOPTPL). Mediante pedido, aceitamos também cartão de crédito, MB Way, Multibanco e PayShop.",
          "Transferencia bancaria (IBAN PT50 0036 0536 99106003612 67, SWIFT MPIOPTPL). Bajo petición, también aceptamos tarjeta de crédito, MB Way, Multibanco y PayShop."
        ),
      },
      {
        q: tri(
          "What is your cancellation policy?",
          "Qual é a política de cancelamento?",
          "¿Cuál es la política de cancelación?"
        ),
        a: tri(
          "30 or more days before: 10% charged. 21 to 29 days: 50%. 11 to 20 days: 75%. Less than 10 days: 100%. Unused parts of a program are not refundable. Rescheduling is assessed case by case.",
          "30 ou mais dias antes: cobrança de 10%. Entre 21 e 29 dias: 50%. Entre 11 e 20 dias: 75%. Menos de 10 dias: 100%. Partes não usadas do programa não são reembolsáveis. O reagendamento é avaliado caso a caso.",
          "30 o más días antes: se cobra el 10%. Entre 21 y 29 días: 50%. Entre 11 y 20 días: 75%. Menos de 10 días: 100%. Las partes no utilizadas del programa no son reembolsables. La reprogramación se evalúa caso por caso."
        ),
      },
      {
        q: tri(
          "Should I take out travel insurance?",
          "Devo fazer um seguro de viagem?",
          "¿Debo contratar un seguro de viaje?"
        ),
        a: tri(
          "We recommend taking out your own travel insurance for the whole of your stay in Portugal.",
          "Recomendamos que faça o seu próprio seguro de viagem para toda a estadia em Portugal.",
          "Recomendamos contratar su propio seguro de viaje para toda su estancia en Portugal."
        ),
      },
    ],
  },
  {
    category: tri("During your trip", "Durante a viagem", "Durante el viaje"),
    items: [
      {
        q: tri(
          "How do the guides support me during the walks?",
          "Como me apoiam os guias durante os passeios?",
          "¿Cómo me apoyan los guías durante los paseos?"
        ),
        a: tri(
          "Your guide leads you along the itinerary you have chosen, pointing out hidden gems and sharing everything about the places you visit.",
          "O seu guia conduz o itinerário que escolheu, mostrando recantos escondidos e partilhando tudo sobre os lugares que visita.",
          "Su guía conduce el itinerario que ha elegido, mostrando rincones escondidos y compartiendo todo sobre los lugares que visita."
        ),
      },
      {
        q: tri(
          "What are my responsibilities as a guest?",
          "Quais são as minhas responsabilidades como hóspede?",
          "¿Cuáles son mis responsabilidades como huésped?"
        ),
        a: tri(
          "We ask you to recognise the central role of local communities and to follow principles of social and economic fairness, respecting the environment and local culture.",
          "Pedimos que reconheça o papel central das comunidades locais e que siga princípios de justiça social e económica, respeitando o ambiente e a cultura local.",
          "Le pedimos que reconozca el papel central de las comunidades locales y que siga principios de justicia social y económica, respetando el medio ambiente y la cultura local."
        ),
      },
      {
        q: tri(
          "How does luggage transfer work?",
          "Como funciona o transporte de bagagem?",
          "¿Cómo funciona el transporte de equipaje?"
        ),
        a: tri(
          "Your luggage is collected each morning and delivered to the next accommodation. The full details are in your personal travel documents.",
          "A sua bagagem é recolhida todas as manhãs e entregue no alojamento seguinte. Os detalhes completos constam dos seus documentos de viagem pessoais.",
          "Su equipaje se recoge cada mañana y se entrega en el siguiente alojamiento. Los detalles completos están en sus documentos de viaje personales."
        ),
      },
      {
        q: tri(
          "How much should I tip?",
          "Quanto devo dar de gorjeta?",
          "¿Cuánto debo dar de propina?"
        ),
        a: tri(
          "Tipping is entirely voluntary and at your discretion, a way to reward service that went above and beyond.",
          "A gorjeta é totalmente voluntária e fica ao seu critério, uma forma de reconhecer um serviço que foi além do esperado.",
          "La propina es totalmente voluntaria y queda a su criterio, una forma de reconocer un servicio que fue más allá de lo esperado."
        ),
      },
      {
        q: tri(
          "What happens to outdoor activities in bad weather?",
          "O que acontece às atividades ao ar livre com mau tempo?",
          "¿Qué pasa con las actividades al aire libre con mal tiempo?"
        ),
        a: tri(
          "Weather and other conditions beyond our control can affect a walk. Our local guides assess safety and will cancel an activity if it is not safe, with a full refund in that case.",
          "O tempo e outras condições fora do nosso controlo podem afetar uma caminhada. Os nossos guias locais avaliam a segurança e cancelam uma atividade se não for segura, com reembolso total nesse caso.",
          "El tiempo y otras condiciones fuera de nuestro control pueden afectar a una caminata. Nuestros guías locales evalúan la seguridad y cancelan una actividad si no es segura, con reembolso total en ese caso."
        ),
      },
    ],
  },
];
