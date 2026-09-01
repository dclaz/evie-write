import { deco, shapePicture, letterIcons } from './icons.mjs';

const BOOK_META = {
  1: { name: 'Book 1 · Lines & Shapes', kicker: 'Evie’s Writing Workbook' },
  2: { name: 'Book 2 · Capital Letters', kicker: 'Evie’s Writing Workbook' },
  3: { name: 'Book 3 · Cursive Words', kicker: 'Evie’s Writing Workbook' },
};

/* ---------------------------------------------------------- helpers */

const svgTag = (inner, vb = '0 0 100 100') =>
  `<svg viewBox="${vb}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

function page(accent, extraClass, inner) {
  return `<section class="page accent-${accent} ${extraClass || ''}">${inner}</section>`;
}

function header({ kicker, title, badge }) {
  return `
  <div class="wsheader">
    <div class="titles">
      <div class="kicker">${kicker}</div>
      <h1>${title}</h1>
    </div>
    <div class="badge">${badge || deco.pencil}</div>
  </div>
  <div class="divider"></div>`;
}

function tipBox({ text, say, icon }) {
  return `
  <div class="tip">
    <div class="tip-icon">${icon || deco.star}</div>
    <p>${text} <span class="say">“${say}”</span></p>
  </div>`;
}

function footer({ book, pageNum, total }) {
  return `
  <div class="wsfooter">
    <span class="book-name">${BOOK_META[book].name}</span>
    <span class="dots">• • •</span>
    <span>Page ${pageNum} of ${total}</span>
  </div>`;
}

/* ---------------------------------------------------------- Book 1: shape tiles */

const SHAPE_GEO = {
  vertical:  { d: 'M50 8 L50 92', start: [50, 8], arrow: { x: 50, y: 78, rot: 90 } },
  horizontal:{ d: 'M8 50 L92 50', start: [8, 50], arrow: { x: 78, y: 50, rot: 0 } },
  circle:    { d: 'M50 12 A38 38 0 1 1 49.9 12 Z', start: [50, 12] },
  cross:     { d: 'M50 10 L50 90 M10 50 L90 50', start: [50, 10], start2: [10, 50] },
  diagRight: { d: 'M15 15 L85 85', start: [15, 15], arrow: { x: 70, y: 70, rot: 45 } },
  diagLeft:  { d: 'M85 15 L15 85', start: [85, 15], arrow: { x: 30, y: 70, rot: 135 } },
  square:    { d: 'M15 15 L85 15 L85 85 L15 85 Z', start: [15, 15], arrow: { x: 60, y: 15, rot: 0 } },
  triangle:  { d: 'M50 10 L88 85 L12 85 Z', start: [50, 10] },
  zigzag:    { d: 'M8 80 L28 25 L48 80 L68 25 L88 80', start: [8, 80] },
  wave:      { d: 'M4 55 Q20 30 36 55 T68 55 T100 55', start: [4, 55] },
  loop:      { d: 'M10 72 C10 26 46 26 50 50 C54 74 90 74 90 28', start: [10, 72] },
  spiral:    null, // generated below
};

function spiralPath() {
  const cx = 50, cy = 50, turns = 2.4, maxR = 40;
  let d = `M${cx} ${cy}`;
  const steps = 90;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * 2 * Math.PI;
    const r = t * maxR;
    const x = cx + r * Math.sin(angle);
    const y = cy - r * Math.cos(angle);
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}
SHAPE_GEO.spiral = { d: spiralPath(), start: [50, 50] };

function arrowMark({ x, y, rot }, color) {
  return `<path d="M0 -6 L9 0 L0 6 Z" fill="${color}"
    transform="translate(${x} ${y}) rotate(${rot})"/>`;
}

function shapeTileSvg(id, mode) {
  const geo = SHAPE_GEO[id];
  const isTrace = mode === 'trace';
  const stroke = isTrace ? 'var(--trace-gray, #cfd3dc)' : '#3a3a4a';
  const dash = isTrace ? 'stroke-dasharray="4 5.5"' : '';
  const width = isTrace ? 6.5 : 8;
  let marks = `<circle cx="${geo.start[0]}" cy="${geo.start[1]}" r="5.5" fill="#3fae83"/>`;
  if (geo.start2) marks += `<circle cx="${geo.start2[0]}" cy="${geo.start2[1]}" r="5.5" fill="#e5644f"/>`;
  if (geo.arrow && !isTrace) marks += arrowMark(geo.arrow, '#6b6b80');
  const inner = `
    <rect x="2" y="2" width="96" height="96" rx="14" fill="none" stroke="#e3e6ee" stroke-width="2"/>
    <path d="${geo.d}" fill="none" stroke="${stroke}" stroke-width="${width}" ${dash}
      stroke-linecap="round" stroke-linejoin="round"/>
    ${marks}`;
  return svgTag(inner);
}

function shapeTile(id, mode, sizeMm) {
  return `<div style="width:${sizeMm}mm;height:${sizeMm}mm;flex:0 0 auto;">${shapeTileSvg(id, mode)}</div>`;
}

function blankTile(sizeMm) {
  return `<div style="width:${sizeMm}mm;height:${sizeMm}mm;flex:0 0 auto;">
    ${svgTag('<rect x="2" y="2" width="96" height="96" rx="14" fill="none" stroke="#c9d2e6" stroke-width="2.5" stroke-dasharray="3 4"/>')}
  </div>`;
}

function shapeRow(children) {
  return `<div style="display:flex;justify-content:space-between;align-items:center;gap:4mm;z-index:1;">${children.join('')}</div>`;
}

export function shapePage(shape, idx, total, book = 1) {
  const badge = deco.pencil;
  const rows = [
    shapeRow([shapeTile(shape.id, 'model', 34), shapeTile(shape.id, 'trace', 34), shapeTile(shape.id, 'trace', 34)]),
    shapeRow([shapeTile(shape.id, 'trace', 26), shapeTile(shape.id, 'trace', 26), shapeTile(shape.id, 'trace', 26), shapeTile(shape.id, 'trace', 26)]),
    shapeRow([blankTile(26), blankTile(26), blankTile(26), blankTile(26)]),
  ];
  const picture = shapePicture[shape.id] || deco.star;
  const inner = `
    ${header({ kicker: `Book 1 · Lines & Shapes · ${shape.title}`, title: shape.title, badge })}
    ${tipBox({ text: shape.tip, say: shape.say, icon: badge })}
    <div class="stack">
      ${rows.map(r => `<div>${r}</div>`).join('')}
      <div style="display:flex;align-items:center;gap:6mm;margin-top:2mm;background:var(--accent-bg);border:1.4pt solid var(--accent);border-radius:6mm;padding:4mm 6mm;">
        <div style="width:22mm;height:22mm;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:17mm;line-height:1;">${picture}</div>
        <p style="margin:0;font-family:'Baloo 2';font-weight:700;font-size:12.5pt;color:var(--ink);">${shape.reveal}</p>
      </div>
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(shape.accent, 'p-shape', inner);
}

/* ---------------------------------------------------------- guide-line rows (fonts) */

function guideCapsRow({ h, base, items, justify = 'space-between' }) {
  return `
  <div class="guide-caps" style="--gh:${h}mm;--base:${base}mm;">
    <div class="content-row" style="justify-content:${justify};">${items.join('')}</div>
    <div class="rule-top"></div>
    <div class="rule-base"></div>
  </div>`;
}

// Cursive rows need pixel-perfect baseline placement (this font's line-height
// metrics carry a lot of extra descender space for its loopy g/y/j/z, which
// throws off plain CSS box alignment). SVG <text> sidesteps that: the y
// coordinate IS the true glyph baseline, so we draw the guide rules and the
// letters in one SVG using mm-equivalent viewBox units.
const ROW_WIDTH_MM = 182; // matches .page inner content width (210mm - 14mm*2)
const DOTS_FONT = `'Edu AU VIC WA NT Dots', cursive`;

function guide4Row({ h, mid, base, items, sizeMm, color = 'var(--trace-gray)', font = DOTS_FONT }) {
  const n = items.length;
  const margin = 10;
  const usable = ROW_WIDTH_MM - margin * 2;
  const step = n > 1 ? usable / n : 0;
  const texts = items.map((text, i) => {
    if (!text) return '';
    const cx = n === 1 ? margin : margin + step * i + step / 2;
    return `<text x="${cx.toFixed(1)}" y="${base}" text-anchor="middle"
      font-family="${font}" font-size="${sizeMm}" fill="${color}">${text}</text>`;
  }).join('');
  return `
  <svg class="guide4-svg" viewBox="0 0 ${ROW_WIDTH_MM} ${h}" width="100%" height="${h}mm"
       style="display:block;overflow:visible;position:relative;z-index:1;" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="${ROW_WIDTH_MM}" y2="0" stroke="var(--line-faint)" stroke-width="0.35" stroke-dasharray="1.4 1.6"/>
    <line x1="0" y1="${mid}" x2="${ROW_WIDTH_MM}" y2="${mid}" stroke="var(--line-mid)" stroke-width="0.4" stroke-dasharray="1.6 1.8"/>
    <line x1="0" y1="${base}" x2="${ROW_WIDTH_MM}" y2="${base}" stroke="var(--line-baseline)" stroke-width="0.7"/>
    <line x1="0" y1="${h}" x2="${ROW_WIDTH_MM}" y2="${h}" stroke="var(--line-faint)" stroke-width="0.35" stroke-dasharray="1.4 1.6"/>
    ${texts}
  </svg>`;
}

/* ---------------------------------------------------------- Book 2: capital letters */

export function capitalLetterPage(entry, idx, total, book = 2, n, nTotal) {
  const { letter, word, tip, accent } = entry;
  const icon = letterIcons[letter] || deco.star;
  const traceBig = Array.from({ length: 3 }, () => `<span class="trace caps-font" style="font-size:58pt;">${letter}</span>`);
  const traceMed = Array.from({ length: 4 }, () => `<span class="trace caps-font" style="font-size:42pt;">${letter}</span>`);

  const inner = `
    ${header({ kicker: `Book 2 · Capital Letters · Letter ${n} of ${nTotal}`, title: `Capital ${letter}`, badge: deco.pencil })}
    <div class="letter-hero">
      <div class="big-letter">${letter}</div>
      <div class="icon-card">${icon}</div>
      <div class="word-label">${letter} is for ${word}</div>
    </div>
    ${tipBox({ text: tip, say: 'Big line, then the little bits!', icon: deco.check })}
    <div class="stack">
      ${guideCapsRow({ h: 32, base: 27, items: traceBig, justify: 'space-around' })}
      ${guideCapsRow({ h: 28, base: 24, items: traceMed, justify: 'space-around' })}
      ${guideCapsRow({ h: 28, base: 24, items: [''], justify: 'flex-start' })}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-cap', inner);
}

/* ---------------------------------------------------------- Book 3: cursive letters & words */

export function cursiveLetterPage(entry, idx, total, book = 3, n, nTotal) {
  const { letter, tip, accent } = entry;
  const rep = (count) => Array.from({ length: count }, () => letter);

  const inner = `
    ${header({ kicker: `Book 3 · Cursive Letters · Letter ${n} of ${nTotal}`, title: `Little “${letter}”`, badge: deco.pencil })}
    <div class="letter-hero">
      <div class="big-letter hand-font" style="font-size:56pt;">${letter}</div>
      <div class="icon-card" style="background:var(--accent-bg);">${deco.star}</div>
      <div class="word-label">In VIC Modern Cursive</div>
    </div>
    ${tipBox({ text: tip, say: 'Nice and joined-up!', icon: deco.check })}
    <div class="stack">
      ${guide4Row({ h: 24, mid: 9, base: 17, items: rep(4), sizeMm: 16 })}
      ${guide4Row({ h: 22, mid: 8, base: 15, items: rep(5), sizeMm: 14 })}
      ${guide4Row({ h: 22, mid: 8, base: 15, items: [] })}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-cursive', inner);
}

export function cursiveWordPage(entry, idx, total, book = 3, n, nTotal) {
  const { word, tip, accent } = entry;
  const rep = (count) => Array.from({ length: count }, () => word);

  const inner = `
    ${header({ kicker: `Book 3 · First Words · Word ${n} of ${nTotal}`, title: `“${word}”`, badge: deco.heart })}
    <div class="letter-hero">
      <div class="big-letter hand-font" style="font-size:44pt;">${word}</div>
      <div class="icon-card">${deco.flower}</div>
      <div class="word-label">Trace it, then write your own!</div>
    </div>
    ${tipBox({ text: tip, say: `Keep your pencil moving — don’t lift it!`, icon: deco.check })}
    <div class="stack">
      ${guide4Row({ h: 26, mid: 10, base: 19, items: rep(2), sizeMm: 17 })}
      ${guide4Row({ h: 24, mid: 9, base: 17, items: rep(3), sizeMm: 15 })}
      ${guide4Row({ h: 24, mid: 9, base: 17, items: [] })}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-word', inner);
}

/* ---------------------------------------------------------- Covers & bonus pages */

export function coverPage({ book, subtitle, badge, accent }) {
  const inner = `
    <div class="cover">
      <div class="series">Evie’s Writing Workbook</div>
      <div class="cover-badge">${badge}</div>
      <h1>${BOOK_META[book].name.split('·')[1].trim()}</h1>
      <div class="sub">${subtitle}</div>
      <div class="owner-label">This book belongs to</div>
      <div class="owner">&nbsp;</div>
    </div>`;
  return page(accent, 'p-cover', inner);
}

export function introPage({ book, accent, title, paragraphs, idx = 1, total = 1 }) {
  const inner = `
    ${header({ kicker: BOOK_META[book].name, title, badge: deco.cloud })}
    <div class="stack" style="justify-content:center;">
      ${paragraphs.map(p => `<p style="font-size:13pt;line-height:1.7;font-weight:600;color:var(--ink);z-index:1;">${p}</p>`).join('')}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-intro', inner);
}

export function namePageCaps({ book, name, total, idx, accent }) {
  const letters = name.toUpperCase().split('');
  const traceBig = letters.map(l => `<span class="trace caps-font" style="font-size:58pt;">${l}</span>`);
  const inner = `
    ${header({ kicker: `Book 2 · Capital Letters · Bonus`, title: `My Name!`, badge: deco.heart })}
    <div class="letter-hero">
      <div class="big-letter">${letters.join('')}</div>
      <div class="icon-card">${deco.balloon}</div>
      <div class="word-label">I can write my own name!</div>
    </div>
    ${tipBox({ text: `Trace each letter of your name. You are a superstar writer!`, say: `That’s ME!`, icon: deco.check })}
    <div class="stack">
      ${guideCapsRow({ h: 34, base: 29, items: traceBig, justify: 'space-around' })}
      ${guideCapsRow({ h: 34, base: 29, items: traceBig.map(() => ''), justify: 'flex-start' })}
      ${guideCapsRow({ h: 34, base: 29, items: [''], justify: 'flex-start' })}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-name', inner);
}

export function namePageCursive({ book, name, total, idx, accent }) {
  const proper = name[0].toUpperCase() + name.slice(1).toLowerCase();
  const inner = `
    ${header({ kicker: `Book 3 · Cursive · Bonus`, title: `My Name in Cursive!`, badge: deco.heart })}
    <div class="letter-hero">
      <div class="big-letter hand-font" style="font-size:48pt;">${proper}</div>
      <div class="icon-card">${deco.balloon}</div>
      <div class="word-label">A capital letter to start, then the rest joined up!</div>
    </div>
    ${tipBox({ text: `Start with the tall capital letter, then keep your pencil moving through the rest of your name.`, say: `That’s ME!`, icon: deco.check })}
    <div class="stack">
      ${guide4Row({ h: 30, mid: 12, base: 22, items: [proper, proper], sizeMm: 22 })}
      ${guide4Row({ h: 28, mid: 11, base: 20, items: [proper, proper], sizeMm: 19 })}
      ${guide4Row({ h: 28, mid: 11, base: 20, items: [] })}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-name', inner);
}

export function alphabetReferencePage({ book, accent, title, glyphs, fontClass, kicker, idx = 1, total = 1 }) {
  const rows = [];
  for (let i = 0; i < glyphs.length; i += 7) rows.push(glyphs.slice(i, i + 7));
  const rowsHtml = rows.map(r => `
    <div style="display:flex;gap:6mm;justify-content:flex-start;z-index:1;">
      ${r.map(g => `<span class="model ${fontClass}" style="font-size:30pt;">${g}</span>`).join('')}
    </div>`).join('');
  const legendItem = (mark, text) => `
    <div style="display:flex;align-items:center;gap:3mm;">${mark}
      <span style="font-family:'Baloo 2';font-weight:700;font-size:10.5pt;color:var(--ink);">${text}</span>
    </div>`;
  const baseLine = `<svg width="14mm" height="4mm" viewBox="0 0 20 4"><line x1="0" y1="2" x2="20" y2="2" stroke="var(--line-baseline)" stroke-width="2"/></svg>`;
  const dashLine = `<svg width="14mm" height="4mm" viewBox="0 0 20 4"><line x1="0" y1="2" x2="20" y2="2" stroke="var(--line-mid)" stroke-width="1.6" stroke-dasharray="2.5 2.5"/></svg>`;
  const inner = `
    ${header({ kicker, title, badge: deco.rainbow })}
    <p style="margin:0 0 6mm 0;font-size:12.5pt;font-weight:700;color:var(--ink);z-index:1;">
      Every cursive letter sits on the same four guide lines. Here's what they mean:
    </p>
    <div style="display:flex;gap:8mm;flex-wrap:wrap;margin-bottom:8mm;background:var(--accent-bg);
      border:1.4pt solid var(--accent);border-radius:6mm;padding:5mm 6mm;z-index:1;">
      ${legendItem(baseLine, 'Solid line — sit letters on this')}
      ${legendItem(dashLine, 'Dashed line — top of small letters')}
    </div>
    <div class="stack" style="justify-content:center;gap:9mm;">${rowsHtml}</div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-ref', inner);
}
