# Evie's Writing Workbook

A three-book series of printable A4 handwriting worksheets that takes a
3-year-old from a first wobbly pencil line all the way to joined-up
**VIC Modern Cursive** words. Ready-to-print PDFs are in [`output/`](output).

| Book | File | Pages | What it covers |
|---|---|---|---|
| 1 · Lines & Shapes | [`01-lines-and-shapes.pdf`](output/01-lines-and-shapes.pdf) | 13 | Pre-writing fine-motor practice, in developmental order: straight lines, circles, crosses, diagonals, squares, triangles, zig-zags, waves, loops and spirals. |
| 2 · Capital Letters | [`02-capital-letters.pdf`](output/02-capital-letters.pdf) | 28 | Big single-stroke capitals A–Z (one page each, "A is for Apple" style), plus a bonus "trace my name" page. |
| 3 · Cursive Words | [`03-cursive-words.pdf`](output/03-cursive-words.pdf) | 42 | A note for grown-ups, a full cursive alphabet reference, all 26 lowercase cursive letters ("b is for Ball" style, reusing Book 2's words/emoji), 12 first words (*mum, dad, cat, dog, sun, hat, run, big, red, yes, bee, fox*), and a bonus "my name in cursive" page. |

Print at 100% scale (no "fit to page") on A4 paper for the ruled guide
lines to come out at a true, pencil-friendly size.

## Design notes

- **Page backgrounds are plain white** (no cream tint, no decorative dot
  texture behind the content) so pages print cleanly on regular paper
  without laying down a full-page ink/toner wash. Colour is reserved for
  the deliberate accents — headers, tip boxes, guide lines, icons.
- **Fonts** are the genuine Australian school handwriting fonts from Google
  Fonts, self-hosted in [`src/fonts/`](src/fonts) (SIL Open Font License,
  free for any use):
  - `Edu VIC WA NT Beginner` — the single-stroke print font for Book 2.
  - `Edu AU VIC WA NT Hand` / `Edu AU VIC WA NT Dots` — the joined VIC
    Modern Cursive font and its dotted tracing companion, for Book 3.
  - `Baloo 2` / `Nunito` — friendly display and body text.
- Every practice row is genuinely traceable: light-grey capitals, real
  dotted-outline cursive letters, and ruled guide lines (2-line for
  capitals, 4-line headline/x-height/baseline/descender for cursive) so a
  pencil has something to follow, not just decoration. Book 1's shape
  tiles additionally mark the stroke's start point with a green dot
  (precise there, since each shape's start is fixed geometry — unlike a
  cursive glyph's entry stroke, which varies letter to letter).
- Cursive rows are drawn as SVG so each letter's baseline lines up exactly
  with the ruled baseline — this font's generous descender metrics (for its
  loopy g/y/j/z) throw off plain CSS text alignment otherwise.
- Book 1's shape pages give five rows per shape (three traceable, shrinking
  in guidance, then two fully blank) rather than a single demo row, so
  there's plenty of repetition to build the motor pattern.

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
- [`icons.mjs`](scripts/icons.mjs) — loads the emoji artwork used for the
  26 "A is for..." flashcards and header/badge decorations from
  [`src/emoji/`](src/emoji) and inlines it as SVG. These are
  [Noto Emoji](https://github.com/googlefonts/noto-emoji) vector source
  files (Apache-2.0), not the system's emoji *font* — a font's colour
  emoji glyphs are usually fixed-resolution bitmaps, crisp at small icon
  sizes but visibly pixelated blown up to the size of the cover badge;
  the vector originals stay sharp at any size.
- [`templates.mjs`](scripts/templates.mjs) — page layout functions (one per
  page type: shape page, capital letter page, cursive letter/word page,
  cover, etc).
- [`src/common.css`](src/common.css) — shared print styles, the A4 page
  box, colour palette and guide-line styles.

To eyeball a single page while iterating, without opening the PDF:

```
node preview-page.mjs book2 5   # screenshots page index 5 (0-based) to PNG
```
