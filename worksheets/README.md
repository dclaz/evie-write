# Evie's Writing Workbook

A three-book series of printable A4 handwriting worksheets that takes a
3-year-old from a first wobbly pencil line all the way to joined-up
**VIC Modern Cursive** words. Ready-to-print PDFs are in [`output/`](output).

| Book | File | Pages | What it covers |
|---|---|---|---|
| 1 · Lines & Shapes | [`01-lines-and-shapes.pdf`](output/01-lines-and-shapes.pdf) | 13 | Pre-writing fine-motor practice, in developmental order: straight lines, circles, crosses, diagonals, squares, triangles, zig-zags, waves, loops and spirals. |
| 2 · Capital Letters | [`02-capital-letters.pdf`](output/02-capital-letters.pdf) | 28 | Big single-stroke capitals A–Z (one page each, "A is for Apple" style), plus a bonus "trace my name" page. |
| 3 · Cursive Words | [`03-cursive-words.pdf`](output/03-cursive-words.pdf) | 42 | A note for grown-ups, a full cursive alphabet reference, all 26 lowercase cursive letters, 12 first words (*mum, dad, cat, dog, sun, hat, run, big, red, yes, bee, fox*), and a bonus "my name in cursive" page. |

Print at 100% scale (no "fit to page") on A4 paper for the ruled guide
lines to come out at a true, pencil-friendly size.

## Design notes

- **Fonts** are the genuine Australian school handwriting fonts from Google
  Fonts, self-hosted in [`src/fonts/`](src/fonts) (SIL Open Font License,
  free for any use):
  - `Edu VIC WA NT Beginner` — the single-stroke print font for Book 2.
  - `Edu AU VIC WA NT Hand` / `Edu AU VIC WA NT Dots` — the joined VIC
    Modern Cursive font and its dotted tracing companion, for Book 3.
  - `Baloo 2` / `Nunito` — friendly display and body text.
- Every practice row is genuinely traceable: light-grey capitals, real
  dotted-outline cursive letters, a green start dot, and ruled guide lines
  (2-line for capitals, 4-line headline/x-height/baseline/descender for
  cursive) so a pencil has something to follow, not just decoration.
- Cursive rows are drawn as SVG so each letter's baseline lines up exactly
  with the ruled baseline — this font's generous descender metrics (for its
  loopy g/y/j/z) throw off plain CSS text alignment otherwise.
- Book 1's shapes each end with a one-line "reveal" connecting the abstract
  line to something recognisable (circles → sun, triangles → ice-cream
  cone, loops → the secret move behind cursive letters).

## Regenerating / editing

Everything is generated from small JS data + template files — no content
is hand-authored as HTML.

```
cd worksheets/scripts
node build.mjs          # writes src/book*.html from data.mjs + templates.mjs
node build.mjs --pdf    # also renders output/*.pdf via the pre-installed
                         # Playwright Chromium (no npm install needed)
```

- [`data.mjs`](scripts/data.mjs) — all the words, letters, tip text and
  colour assignments. Edit this to change wording, add words, or swap the
  child's name (`CHILD_NAME`).
- [`icons.mjs`](scripts/icons.mjs) — the emoji used for the 26 "A is
  for..." flashcards, decorations, and Book 1's reveal pictures (rendered
  by the system's colour emoji font — Playwright's headless Chromium has
  one preinstalled).
- [`templates.mjs`](scripts/templates.mjs) — page layout functions (one per
  page type: shape page, capital letter page, cursive letter/word page,
  cover, etc).
- [`src/common.css`](src/common.css) — shared print styles, the A4 page
  box, colour palette and guide-line styles.

To eyeball a single page while iterating, without opening the PDF:

```
node preview-page.mjs book2 5   # screenshots page index 5 (0-based) to PNG
```
