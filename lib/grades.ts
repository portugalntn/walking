/**
 * Walking difficulty scale (5 levels), shared by the product gauge and the
 * standalone grading page. Localised text uses { en, pt, es }. pt-PT, no em dashes.
 * Source: portugalntnwalking.com/walking-grading.php.
 */

import type { L } from "./destinations";

const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });

export type GradeLevel = 1 | 2 | 3 | 4 | 5;

export type Grade = {
  level: GradeLevel;
  name: L;
  maxDistance: L;
  maxAscent: L;
  description: L;
};

export const grades: Grade[] = [
  {
    level: 1,
    name: tri("Very easy", "Muito fácil", "Muy fácil"),
    maxDistance: tri("up to 10 km", "até 10 km", "hasta 10 km"),
    maxAscent: tri("up to +200 m", "até +200 m", "hasta +200 m"),
    description: tri(
      "Gentle ascents and descents on mostly even ground. No specific fitness required.",
      "Subidas e descidas suaves em terreno sobretudo regular. Não exige preparação física específica.",
      "Subidas y bajadas suaves en terreno sobre todo regular. No requiere preparación física específica."
    ),
  },
  {
    level: 2,
    name: tri("Easy", "Fácil", "Fácil"),
    maxDistance: tri("up to 14 km", "até 14 km", "hasta 14 km"),
    maxAscent: tri("up to +400 m", "até +400 m", "hasta +400 m"),
    description: tri(
      "Easy ascents and descents on ground that is sometimes uneven. Accessible and great for families.",
      "Subidas e descidas pouco exigentes, em terreno por vezes irregular. Acessível e ideal para famílias.",
      "Subidas y bajadas poco exigentes, en terreno a veces irregular. Accesible e ideal para familias."
    ),
  },
  {
    level: 3,
    name: tri("Moderate", "Moderado", "Moderado"),
    maxDistance: tri("up to 18 km", "até 18 km", "hasta 18 km"),
    maxAscent: tri("up to +600 m", "até +600 m", "hasta +600 m"),
    description: tri(
      "Steeper ascents and descents. Some fitness helps you enjoy the whole walk.",
      "Subidas e descidas mais íngremes. Pede alguma preparação física para se aproveitar o percurso por inteiro.",
      "Subidas y bajadas más empinadas. Requiere algo de preparación física para disfrutar todo el recorrido."
    ),
  },
  {
    level: 4,
    name: tri("Difficult", "Difícil", "Difícil"),
    maxDistance: tri("up to 22 km", "até 22 km", "hasta 22 km"),
    maxAscent: tri("up to +800 m", "até +800 m", "hasta +800 m"),
    description: tri(
      "For experienced walkers in good shape. May include long, steep climbs on challenging ground.",
      "Para caminhantes experientes e com boa preparação. Pode incluir subidas longas e íngremes em terreno desafiante.",
      "Para caminantes experimentados y en buena forma. Puede incluir subidas largas y empinadas en terreno exigente."
    ),
  },
  {
    level: 5,
    name: tri("Very difficult", "Muito difícil", "Muy difícil"),
    maxDistance: tri("more than 22 km", "mais de 22 km", "más de 22 km"),
    maxAscent: tri("more than +800 m", "mais de +800 m", "más de +800 m"),
    description: tri(
      "Very demanding, with sharp gradients and rough terrain. Not advised for inexperienced walkers.",
      "Muito exigente, com declives acentuados e terreno irregular. Não recomendado a caminhantes inexperientes.",
      "Muy exigente, con pendientes pronunciadas y terreno irregular. No recomendado para caminantes inexpertos."
    ),
  },
];

export function getGrade(level: GradeLevel): Grade {
  return grades[level - 1];
}
