// Builds the three workbook HTML files and renders each to a print-ready
// A4 PDF using the pre-installed Playwright Chromium.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { SHAPES, CAPITAL_LETTERS, CURSIVE_LETTERS, CURSIVE_WORDS, CHILD_NAME } from './data.mjs';
import {
  shapePage, capitalLetterPage, cursiveLetterPage, cursiveWordPage,
  coverPage, introPage, namePageCaps, namePageCursive, alphabetReferencePage,
} from './templates.mjs';
import { deco } from './icons.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src');
const OUT = path.join(__dirname, '..', 'output');
mkdirSync(OUT, { recursive: true });

function wrapDoc(title, pagesHtml) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="common.css">
</head>
<body>
${pagesHtml.join('\n')}
</body>
</html>`;
}

/* ============================== BOOK 1 ============================== */
function buildBook1() {
  const total = SHAPES.length + 1;
  const pages = [];
  pages.push(coverPage({
    book: 1, accent: 'sky', badge: deco.rainbow,
    subtitle: 'Wobbly lines, round circles and pointy triangles — the very first steps to writing!',
  }));
  SHAPES.forEach((s, i) => pages.push(shapePage(s, i + 2, total, 1)));
  return wrapDoc('Book 1 — Lines & Shapes', pages);
}

/* ============================== BOOK 2 ============================== */
function buildBook2() {
  const total = CAPITAL_LETTERS.length + 2; // cover + 26 letters + name page
  const pages = [];
  pages.push(coverPage({
    book: 2, accent: 'coral', badge: deco.balloon,
    subtitle: 'Big, bold capital letters from A to Z — ready, set, trace!',
  }));
  CAPITAL_LETTERS.forEach((L, i) => pages.push(capitalLetterPage(L, i + 2, total, 2, i + 1, CAPITAL_LETTERS.length)));
  pages.push(namePageCaps({ book: 2, name: CHILD_NAME, idx: total, total, accent: 'pink' }));
  return wrapDoc('Book 2 — Capital Letters A to Z', pages);
}

/* ============================== BOOK 3 ============================== */
function buildBook3() {
  const total = 1 + 1 + 1 + CURSIVE_LETTERS.length + CURSIVE_WORDS.length + 1;
  const pages = [];
  pages.push(coverPage({
    book: 3, accent: 'lav', badge: deco.flower,
    subtitle: 'Joined-up VIC Modern Cursive letters and first words — for when big capitals feel easy!',
  }));
  pages.push(introPage({
    book: 3, accent: 'sky', title: 'A Note for Grown-ups', idx: 2, total,
    paragraphs: [
      `This book uses the <b>VIC Modern Cursive</b> style taught in Victorian schools — the same joined-up handwriting ${CHILD_NAME} will use for years to come.`,
      `Cursive is usually introduced a little later than the toddler years, so there's no rush at all. Let ${CHILD_NAME} lead: some days might just be finger-tracing the shapes in the air, and that's perfect too.`,
      `Each letter starts at the green dot. Encourage one smooth, unlifted stroke where you can — the loops and joins are what make cursive fast and fun once they click!`,
    ],
  }));
  pages.push(alphabetReferencePage({
    book: 3, accent: 'mint', title: 'The Cursive Alphabet', idx: 3, total,
    kicker: 'Book 3 · Cursive Words · Reference',
    glyphs: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    fontClass: 'hand-font',
  }));
  const letterTotal = total;
  CURSIVE_LETTERS.forEach((L, i) => pages.push(cursiveLetterPage(L, i + 4, letterTotal, 3, i + 1, CURSIVE_LETTERS.length)));
  CURSIVE_WORDS.forEach((W, i) => pages.push(cursiveWordPage(W, i + 4 + CURSIVE_LETTERS.length, letterTotal, 3, i + 1, CURSIVE_WORDS.length)));
  pages.push(namePageCursive({ book: 3, name: CHILD_NAME, idx: letterTotal, total: letterTotal, accent: 'pink' }));
  return wrapDoc('Book 3 — Cursive Words', pages);
}

const books = [
  { file: 'book1-lines-and-shapes.html', pdf: '01-lines-and-shapes.pdf', html: buildBook1() },
  { file: 'book2-capital-letters.html', pdf: '02-capital-letters.pdf', html: buildBook2() },
  { file: 'book3-cursive-words.html', pdf: '03-cursive-words.pdf', html: buildBook3() },
];

for (const b of books) {
  writeFileSync(path.join(SRC, b.file), b.html, 'utf8');
  console.log(`wrote ${b.file}`);
}

/* ---------------------------- render to PDF via Playwright ---------------------------- */
if (process.argv.includes('--pdf')) {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const { chromium } = require('/opt/node22/lib/node_modules/playwright');

  const browser = await chromium.launch();
  for (const b of books) {
    const page = await browser.newPage();
    const fileUrl = 'file://' + path.join(SRC, b.file);
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const outPath = path.join(OUT, b.pdf);
    await page.pdf({
      path: outPath,
      width: '210mm',
      height: '297mm',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });
    console.log(`rendered ${b.pdf}`);
    await page.close();
  }
  await browser.close();
}
