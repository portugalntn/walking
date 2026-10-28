import { Cormorant_Garamond, Manrope } from "next/font/google";

/** Fontes só do EXCLUSIVE (coleção e apresentação). O site público continua em DIN. */

/** Serifa de exibição. */
export const exSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-ex-serif",
  display: "swap",
});

/** Sans refinada do texto corrido e dos rótulos (mais firme nos subtítulos). */
export const exSans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ex-sans",
  display: "swap",
});
