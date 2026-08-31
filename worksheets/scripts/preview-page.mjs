// Dev helper: screenshot one page from a generated book HTML file, so you can
// eyeball a change without opening a PDF viewer.
//
//   node preview-page.mjs <book1|book2|book3> <pageIndex> [outFile]
//
// pageIndex is 0-based (0 = cover). Run `node build.mjs` first if the HTML
// is stale.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src');

const FILES = {
  book1: 'book1-lines-and-shapes.html',
  book2: 'book2-capital-letters.html',
  book3: 'book3-cursive-words.html',
};

const [, , bookArg, indexArg, outArg] = process.argv;
const file = FILES[bookArg];
if (!file) {
  console.error('Usage: node preview-page.mjs <book1|book2|book3> <pageIndex> [outFile]');
  process.exit(1);
}
const index = Number(indexArg ?? 0);
const outPath = outArg || path.join(__dirname, '..', `preview-${bookArg}-p${index}.png`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1300 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(SRC, file), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const pages = await page.$$('.page');
if (!pages[index]) {
  console.error(`Page index ${index} out of range (book has ${pages.length} pages)`);
  process.exit(1);
}
await pages[index].screenshot({ path: outPath });
console.log(`wrote ${outPath} (${pages.length} pages total in ${file})`);
await browser.close();
