import { Fragment } from "react";

/**
 * Renders a title so each word stays whole: a name like "Trás-os-Montes" is
 * never split at its hyphens, while long names still wrap between words.
 * A line break typed in the text ("\n", an ENTER in the editor) is kept as a
 * manual break; elsewhere on the site the same text simply reads as a space.
 * Pair it with `textWrap: "balance"` on the heading for even lines.
 */
export function KeepWords({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.trim().split(/\s+/).map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 && " "}
              <span style={{ whiteSpace: "nowrap" }}>{word}</span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}
