/** Partilhado entre o script inline (servidor) e o seletor (cliente).
 *  Fica fora do ex-theme.tsx porque um valor exportado de um módulo
 *  "use client" chega ao servidor como referência, não como texto. */

export const EX_THEME_STORAGE_KEY = "ex-theme";
export const EX_THEME_ATTR = "data-ex-theme";

/** Corre antes da pintura, no HTML do servidor, para não haver salto de
 *  escuro para claro ao abrir a página. */
export const exThemeScript = `try{if(localStorage.getItem("${EX_THEME_STORAGE_KEY}")==="light")document.documentElement.setAttribute("${EX_THEME_ATTR}","light")}catch(e){}`;
