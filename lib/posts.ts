/**
 * Sample blog posts (placeholder data).
 * In production these will come from a CMS. Titles/excerpts kept neutral;
 * `category` maps to a translation key for localisation.
 */

export type Post = {
  slug: string;
  category: string;
  image: string;
  date: string;
  title: { en: string; pt: string; es: string };
  excerpt: { en: string; pt: string; es: string };
};

export const posts: Post[] = [
  {
    slug: "caminho-santiago-interior",
    category: "Routes",
    image: "/images/blog/post-1.jpg",
    date: "2026-05-18",
    title: {
      en: "Why we built the Caminho de Santiago Interior",
      pt: "Porque criámos o Caminho de Santiago Interior",
      es: "Por qué creamos el Caminho de Santiago Interior",
    },
    excerpt: {
      en: "From Vidago to Chaves, a quieter, deeper way to Santiago de Compostela.",
      pt: "De Vidago a Chaves, uma forma mais tranquila e profunda de chegar a Santiago de Compostela.",
      es: "De Vidago a Chaves, una forma más tranquila y profunda de llegar a Santiago de Compostela.",
    },
  },
  {
    slug: "walking-the-douro",
    category: "Destinations",
    image: "/images/blog/post-2.jpg",
    date: "2026-04-30",
    title: {
      en: "Inside the Douro: walking the terraced vineyards",
      pt: "No coração do Douro: caminhar entre os socalcos",
      es: "En el corazón del Duero: caminar entre los bancales",
    },
    excerpt: {
      en: "A UNESCO landscape best discovered one step at a time.",
      pt: "Uma paisagem UNESCO que se descobre melhor passo a passo.",
      es: "Un paisaje UNESCO que se descubre mejor paso a paso.",
    },
  },
  {
    slug: "every-step-gives-back",
    category: "Sustainability",
    image: "/images/blog/post-3.jpg",
    date: "2026-04-12",
    title: {
      en: "Sustainable walking: how every step gives back",
      pt: "Caminhar com propósito: como cada passo devolve ao território",
      es: "Caminar con propósito: cómo cada paso devuelve al territorio",
    },
    excerpt: {
      en: "The story behind our commitment to nature and local communities.",
      pt: "A história por trás do nosso compromisso com a natureza e as comunidades locais.",
      es: "La historia detrás de nuestro compromiso con la naturaleza y las comunidades locales.",
    },
  },
  {
    slug: "essence-of-tras-os-montes",
    category: "Destinations",
    image: "/images/blog/post-4.jpg",
    date: "2026-03-25",
    title: {
      en: "The essence of Trás-os-Montes",
      pt: "A essência de Trás-os-Montes",
      es: "La esencia de Trás-os-Montes",
    },
    excerpt: {
      en: "Vast plateaus, deep valleys and timeless villages in Portugal's wild northeast.",
      pt: "Planaltos imensos, vales profundos e aldeias intemporais no nordeste selvagem de Portugal.",
      es: "Mesetas inmensas, valles profundos y aldeas atemporales en el noreste salvaje de Portugal.",
    },
  },
  {
    slug: "mystic-sintra",
    category: "Routes",
    image: "/images/blog/post-5.jpg",
    date: "2026-03-08",
    title: {
      en: "Mystic Sintra: walking the sacred mountain",
      pt: "Sintra mística: caminhar a montanha sagrada",
      es: "Sintra mística: caminar la montaña sagrada",
    },
    excerpt: {
      en: "Mist, myth and forest on one of Portugal's most enchanting trails.",
      pt: "Névoa, mito e floresta num dos trilhos mais encantadores de Portugal.",
      es: "Niebla, mito y bosque en uno de los senderos más encantadores de Portugal.",
    },
  },
  {
    slug: "vincentian-coast",
    category: "Destinations",
    image: "/images/blog/post-6.jpg",
    date: "2026-02-20",
    title: {
      en: "The Vincentian Coast: Europe's wild edge",
      pt: "A Costa Vicentina: o limite selvagem da Europa",
      es: "La Costa Vicentina: el límite salvaje de Europa",
    },
    excerpt: {
      en: "One of the best-preserved coastlines in Europe, on foot.",
      pt: "Uma das costas mais bem preservadas da Europa, a pé.",
      es: "Una de las costas mejor conservadas de Europa, a pie.",
    },
  },
];
