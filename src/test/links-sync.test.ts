import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The GitHub Pages copy (docs/index.html) and the app page must point to the same external links.
const hrefs = (text: string) =>
  [...text.matchAll(/href="((?:https?:|mailto:)[^"]+)"/g)]
    .map((m) => m[1])
    .filter((h) => !h.includes("fonts.googleapis.com"))
    .sort();

describe("external links", () => {
  it("are identical in the app page and the GitHub Pages copy", () => {
    const app = readFileSync(resolve(__dirname, "../routes/index.tsx"), "utf8");
    const pages = readFileSync(resolve(__dirname, "../../docs/index.html"), "utf8");
    expect(hrefs(app)).toEqual([
      "https://clubedeautores.com.br/livro/alef-tav-2",
      "https://loja.uiclap.com/titulo/ua208753",
      "https://www.amazon.com.br/dp/B0HLXVBY9Q",
      "https://www.instagram.com/missspoilerbrasil/",
      "https://www.youtube.com/@missspoilerbrasil",
      "mailto:missspoilerbrazil@gmail.com",
    ]);
    expect(hrefs(pages)).toEqual(hrefs(app));
  });
});
