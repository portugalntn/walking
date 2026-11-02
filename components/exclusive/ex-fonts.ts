import localFont from "next/font/local";

/**
 * Fontes só do EXCLUSIVE (coleção e apresentação). O site público continua em DIN.
 * Os ficheiros estão em ./fonts (licença OFL ao lado), para o build não depender do Google Fonts:
 * são as versões variáveis do google/fonts, com os mesmos carateres (latin e latin-ext) e as mesmas
 * funcionalidades que o Google serve. Cada ficheiro tem todos os pesos; "weight" diz quais se usam.
 */

/** Serifa de exibição. */
export const exSerif = localFont({
  src: [
    { path: "./fonts/CormorantGaramond.woff2", weight: "300 400", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic.woff2", weight: "300 400", style: "italic" },
  ],
  variable: "--font-ex-serif",
  display: "swap",
  adjustFontFallback: false, // a Times ajustada está no globals.css
  fallback: ["Cormorant Garamond Fallback"],
});

/** Sans refinada do texto corrido e dos rótulos (mais firme nos subtítulos). */
export const exSans = localFont({
  src: "./fonts/Manrope.woff2",
  weight: "300 700",
  variable: "--font-ex-sans",
  display: "swap",
  adjustFontFallback: false, // a Arial ajustada está no globals.css
  fallback: ["Manrope Fallback"],
});
