/** Partilhado entre o script inline (servidor) e o seletor (cliente).
 *  Fica fora do ex-theme.tsx porque um valor exportado de um módulo
 *  "use client" chega ao servidor como referência, não como texto. */

export const EX_THEME_STORAGE_KEY = "ex-theme";
export const EX_THEME_ATTR = "data-ex-theme";

/** Corre antes da pintura, no HTML do servidor, para não haver salto de
 *  tema ao abrir a página. Sem escolha guardada ("light" ou "dark"),
 *  segue o tema do sistema (telemóvel, computador). */
export const exThemeScript = `try{var s=localStorage.getItem("${EX_THEME_STORAGE_KEY}");if(s==="light"||(s!=="dark"&&matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.setAttribute("${EX_THEME_ATTR}","light")}catch(e){}`;
