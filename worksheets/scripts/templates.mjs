import { deco, letterIcons, wordIcons, emoji, emojiHref } from './icons.mjs';
import { CAPITAL_STROKES, pointAlong, strokeStart } from './strokes.mjs';

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

// Every shape carries a direction arrow, not just a start dot. A dot alone
// says where to put the pencil but not which way to travel, and for a circle
// or a spiral that's exactly the thing a child gets wrong: "round and round"
// is ambiguous until you show clockwise.
const SHAPE_GEO = {
  vertical:  { d: 'M50 8 L50 92', start: [50, 8], arrow: { x: 50, y: 78, rot: 90 } },
  horizontal:{ d: 'M8 50 L92 50', start: [8, 50], arrow: { x: 78, y: 50, rot: 0 } },
  circle:    { d: 'M50 12 A38 38 0 1 1 49.9 12 Z', start: [50, 12], arrow: { x: 88, y: 55, rot: 90 } },
  cross:     { d: 'M50 10 L50 90 M10 50 L90 50', start: [50, 10], start2: [10, 50],
               arrow: { x: 50, y: 78, rot: 90 }, arrow2: { x: 78, y: 50, rot: 0 } },
  diagRight: { d: 'M15 15 L85 85', start: [15, 15], arrow: { x: 70, y: 70, rot: 45 } },
  diagLeft:  { d: 'M85 15 L15 85', start: [85, 15], arrow: { x: 30, y: 70, rot: 135 } },
  square:    { d: 'M15 15 L85 15 L85 85 L15 85 Z', start: [15, 15], arrow: { x: 60, y: 15, rot: 0 } },
  triangle:  { d: 'M50 10 L88 85 L12 85 Z', start: [50, 10], arrow: { x: 74, y: 58, rot: 63 } },
  zigzag:    { d: 'M8 80 L28 25 L48 80 L68 25 L88 80', start: [8, 80], arrow: { x: 20, y: 47, rot: -70 } },
  wave:      { d: 'M6 55 Q20 32 34 55 T62 55 T90 55', start: [6, 55], arrow: { x: 15, y: 43, rot: -55 } },
  loop:      { d: 'M10 72 C10 26 46 26 50 50 C54 74 90 74 90 28', start: [10, 72], arrow: { x: 10, y: 48, rot: -90 } },
  spiral:    null, // generated below
};

// A spiral's tangent isn't obvious by eye, so sample it rather than guess:
// take two neighbouring points on the curve and point the arrow along them.
function spiralGeo({ cx = 50, cy = 50, turns = 2.4, maxR = 40, arrowAt = 0.62 } = {}) {
  const steps = 120;
  const at = (t) => {
    const a = t * turns * 2 * Math.PI;
    return [cx + t * maxR * Math.sin(a), cy - t * maxR * Math.cos(a)];
  };
  let d = `M${cx} ${cy}`;
  for (let i = 1; i <= steps; i++) {
    const [x, y] = at(i / steps);
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  const [ax, ay] = at(arrowAt);
  const [bx, by] = at(arrowAt + 0.01);
  return {
    d, start: [cx, cy],
    arrow: { x: ax, y: ay, rot: Math.atan2(by - ay, bx - ax) * 180 / Math.PI },
  };
}
SHAPE_GEO.spiral = spiralGeo();

function arrowMark({ x, y, rot }, color) {
  return `<path d="M0 -6 L9 0 L0 6 Z" fill="${color}"
    transform="translate(${x} ${y}) rotate(${rot})"/>`;
}

function shapeTileSvg(id, mode) {
  const geo = SHAPE_GEO[id];
  const isTrace = mode === 'trace';
  const stroke = isTrace ? 'var(--trace-gray, #cfd3dc)' : '#3a3a4a';
  // The spiral's turns sit ~8mm apart at print size; the default 8-unit
  // stroke (4mm) would eat half that gap and read as a solid disc.
  const scale = id === 'spiral' ? 0.6 : 1;
  const dash = isTrace ? `stroke-dasharray="${4 * scale} ${5.5 * scale}"` : '';
  const width = (isTrace ? 6.5 : 8) * scale;
  let marks = `<circle cx="${geo.start[0]}" cy="${geo.start[1]}" r="5.5" fill="#3fae83"/>`;
  if (geo.start2) marks += `<circle cx="${geo.start2[0]}" cy="${geo.start2[1]}" r="5.5" fill="#e5644f"/>`;
  if (!isTrace) {
    if (geo.arrow) marks += arrowMark(geo.arrow, '#6b6b80');
    if (geo.arrow2) marks += arrowMark(geo.arrow2, '#6b6b80');
  }
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

/* ---- continuous patterns run across the page, not inside a tile ----

   A zigzag or a wave squeezed into a 24mm box gives a child one and a half
   cycles, which is a doodle, not a motor pattern. What builds the rhythm is a
   long unbroken run, so these shapes get full-width strips instead: one model
   row, two dotted rows, then two empty rows ruled with the same faint band so
   the pattern keeps its height. Discrete shapes (a circle, a square) stay in
   tiles, where a repeated box is exactly right.
*/

const PATTERN_W = 182;      // mm — full page content width
const PATTERN_PAD = 3;      // mm — keeps the stroke's round cap inside the band

const PATTERN_GEN = {
  zigzag(h, n = 7) {
    const top = PATTERN_PAD, bot = h - PATTERN_PAD;
    const step = PATTERN_W / (n * 2);
    let d = `M0 ${bot}`;
    for (let i = 1; i <= n * 2; i++) d += ` L${(step * i).toFixed(1)} ${i % 2 ? top : bot}`;
    return {
      d, start: [0, bot],
      arrowAt: [step * 0.55, bot - (bot - top) * 0.55, -Math.atan2(bot - top, step) * 180 / Math.PI],
    };
  },
  wave(h, n = 5) {
    const cy = h / 2, amp = cy - PATTERN_PAD;
    const half = PATTERN_W / (n * 2);
    let d = `M0 ${cy} Q${(half / 2).toFixed(1)} ${(cy - amp).toFixed(1)} ${half.toFixed(1)} ${cy}`;
    for (let i = 2; i <= n * 2; i++) d += ` T${(half * i).toFixed(1)} ${cy}`;
    return { d, start: [0, cy], arrowAt: [half * 0.3, cy - amp * 0.55, -52] };
  },
  loop(h, n = 6) {
    // A prolate cycloid — the curve a point inside a rolling wheel traces. It
    // is the loop chain, exactly: every join is smooth and every loop closes
    // on itself, which hand-placed Béziers only ever approximate. Phase runs
    // from π so the run starts on the baseline heading right (a loop chain
    // begins with a pencil already on the line), and x is normalised
    // afterwards because the curve reaches back past its own start.
    const cy = h / 2, amp = cy - PATTERN_PAD;
    const a = PATTERN_W / n / (2 * Math.PI);
    const steps = 48;
    const at = (t) => [a * t - amp * Math.sin(t), cy - amp * Math.cos(t)];
    const pts = [];
    for (let i = 0; i <= n * steps; i++) pts.push(at(Math.PI + (i / steps) * 2 * Math.PI));
    const xs = pts.map(p => p[0]);
    const min = Math.min(...xs), k = PATTERN_W / (Math.max(...xs) - min);
    const fit = ([x, y]) => [(x - min) * k, y];
    const d = pts.map(fit).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
    // 2.6rad in: the top of the first loop, where the curve is out in the
    // open. Earlier than that and the arrowhead lands on the self-crossing.
    const [ax, ay] = fit(at(Math.PI + 2.6));
    const [bx, by] = fit(at(Math.PI + 2.7));
    return { d, start: fit(pts[0]), arrowAt: [ax, ay, Math.atan2(by - ay, bx - ax) * 180 / Math.PI] };
  },
};

function patternStrip(id, mode, h) {
  const { d, start, arrowAt } = PATTERN_GEN[id](h);
  const isModel = mode === 'model';
  const band = `
    <line x1="0" y1="${PATTERN_PAD}" x2="${PATTERN_W}" y2="${PATTERN_PAD}"
      stroke="var(--line-faint)" stroke-width="0.35" stroke-dasharray="1.6 2"/>
    <line x1="0" y1="${h - PATTERN_PAD}" x2="${PATTERN_W}" y2="${h - PATTERN_PAD}"
      stroke="var(--line-faint)" stroke-width="0.35" stroke-dasharray="1.6 2"/>`;
  let art = '';
  if (mode !== 'blank') {
    art = `<path d="${d}" fill="none" stroke="${isModel ? '#3a3a4a' : 'var(--trace-gray)'}"
      stroke-width="${isModel ? 1.8 : 1.5}" ${isModel ? '' : 'stroke-dasharray="1.2 1.7"'}
      stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  // Empty rows keep the start dot: the child still needs to know which end of
  // the line to begin at, and left-to-right isn't yet obvious at three.
  const marks = `
    <circle cx="${(start[0] + 1).toFixed(1)}" cy="${start[1].toFixed(1)}" r="1.8" fill="#3fae83"/>
    ${isModel ? `<path d="M0 -1.7 L2.6 0 L0 1.7 Z" fill="#6b6b80"
      transform="translate(${arrowAt[0].toFixed(1)} ${arrowAt[1].toFixed(1)}) rotate(${arrowAt[2].toFixed(0)})"/>` : ''}`;
  return `
  <svg viewBox="0 0 ${PATTERN_W} ${h}" width="100%" height="${h}mm"
       style="display:block;overflow:visible;z-index:1;" xmlns="http://www.w3.org/2000/svg">
    ${band}${art}${marks}
  </svg>`;
}

export function shapePage(shape, idx, total, book = 1) {
  const badge = deco.pencil;
  const rows = shape.pattern
    ? [
        patternStrip(shape.id, 'model', 32),
        patternStrip(shape.id, 'trace', 32),
        patternStrip(shape.id, 'trace', 30),
        patternStrip(shape.id, 'blank', 30),
        patternStrip(shape.id, 'blank', 30),
      ]
    : shape.big
      ? [
          // A spiral's turns have to be far enough apart for a pencil to fit
          // between them, which a 24mm tile can't manage — so fewer, bigger.
          shapeRow([shapeTile(shape.id, 'model', 50), shapeTile(shape.id, 'trace', 50), shapeTile(shape.id, 'trace', 50)]),
          shapeRow([shapeTile(shape.id, 'trace', 44), shapeTile(shape.id, 'trace', 44), shapeTile(shape.id, 'trace', 44)]),
          shapeRow([blankTile(44), blankTile(44), blankTile(44)]),
        ]
      : [
          shapeRow([shapeTile(shape.id, 'model', 32), shapeTile(shape.id, 'trace', 32), shapeTile(shape.id, 'trace', 32)]),
          shapeRow([shapeTile(shape.id, 'trace', 26), shapeTile(shape.id, 'trace', 26), shapeTile(shape.id, 'trace', 26), shapeTile(shape.id, 'trace', 26)]),
          shapeRow([shapeTile(shape.id, 'trace', 24), shapeTile(shape.id, 'trace', 24), shapeTile(shape.id, 'trace', 24), shapeTile(shape.id, 'trace', 24)]),
          shapeRow([blankTile(24), blankTile(24), blankTile(24), blankTile(24)]),
          shapeRow([blankTile(24), blankTile(24), blankTile(24), blankTile(24)]),
        ];
  const inner = `
    ${header({ kicker: `Book 1 · Lines & Shapes · ${shape.title}`, title: shape.title, badge })}
    ${tipBox({ text: shape.tip, say: shape.say, icon: badge })}
    <div class="stack">
      ${rows.map(r => `<div>${r}</div>`).join('')}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(shape.accent, 'p-shape', inner);
}

/* ---------------------------------------------------------- Book 1 part 2: roads (draw BETWEEN two lines)

   A different skill from tracing a dotted line. Tracing asks for accuracy on
   a target; a road asks for control inside a boundary, which is what actually
   transfers to keeping a letter between two ruled lines. So the visual grammar
   is deliberately the opposite of the trace tiles:

     grey + dotted  = follow me
     coloured solid = do NOT cross me

   A road is one centreline stroked twice — a fat coloured stroke, then a
   slightly thinner white stroke on top — which leaves exactly two parallel
   rails at any curvature, something SVG can't do by offsetting a path.
   Butt caps keep both ends open so it reads as a road, not a capsule.
*/

const ROAD_W = 182;   // mm — full page content width (210mm - 14mm margins)
const RAIL = 0.8;     // mm — thickness of each rail
const ROAD_ICON = 14; // mm — start / finish picture box

// Every generator takes the road's x-span, the strip height and the channel
// width, and keeps the centreline far enough inside the box that neither rail
// is clipped.
const ROAD_GEN = {
  straight(x0, x1, h) {
    const cy = h / 2;
    return { d: `M${x0} ${cy} L${x1} ${cy}`, start: [x0, cy], end: [x1, cy] };
  },
  wave(x0, x1, h, chan, n = 4) {
    const pad = chan / 2 + 1;
    const cy = h / 2;
    const amp = cy - pad;
    const half = (x1 - x0) / (n * 2);
    let d = `M${x0} ${cy} Q${(x0 + half / 2).toFixed(1)} ${(cy - amp).toFixed(1)} ${(x0 + half).toFixed(1)} ${cy}`;
    for (let i = 2; i <= n * 2; i++) d += ` T${(x0 + half * i).toFixed(1)} ${cy}`;
    return { d, start: [x0, cy], end: [x1, cy] };
  },
  zigzag(x0, x1, h, chan, n = 4) {
    // Corners are mitred, so a sharp peak pushes the outer rail well past the
    // centreline. Extra padding keeps the points inside the strip.
    const pad = chan / 2 + 2.5;
    const top = pad, bot = h - pad;
    const step = (x1 - x0) / (n * 2);
    let d = `M${x0} ${bot}`;
    for (let i = 1; i <= n * 2; i++) d += ` L${(x0 + step * i).toFixed(1)} ${i % 2 ? top : bot}`;
    return { d, start: [x0, bot], end: [x1, bot] };
  },
  bumps(x0, x1, h, chan, n = 4) {
    // Hills, not semicircles. Touching semicircles meet in a cusp — both
    // tangents vertical — and the inner rail of a cusp collapses into a flat
    // valley floor, so the road stops being a constant width exactly where
    // the child needs it most. Each hill is instead two cubics that leave the
    // ground and reach the summit horizontally, so the offset stays clean.
    const pad = chan / 2 + 1;
    const bot = h - pad;
    const ht = h - 2 * pad;
    // The level ground between hills has to be at least as long as the road
    // is wide, or the inner rail cusps and the road pinches shut in the
    // valley — the same trap as the semicircles, one step further out.
    const span = (x1 - x0) / n;
    const flat = Math.max(chan * 1.15, span * 0.18);
    const w = span - flat;          // hill width
    const y = (v) => (bot - v).toFixed(1);
    let d = `M${x0} ${bot}`;
    let x = x0;
    for (let i = 0; i < n; i++) {
      d += ` C${(x + w * 0.28).toFixed(1)} ${bot} ${(x + w * 0.22).toFixed(1)} ${y(ht)} ${(x + w / 2).toFixed(1)} ${y(ht)}`;
      d += ` C${(x + w * 0.78).toFixed(1)} ${y(ht)} ${(x + w * 0.72).toFixed(1)} ${bot} ${(x + w).toFixed(1)} ${bot}`;
      x += w;
      if (flat > 0.2) { d += ` L${(x + flat).toFixed(1)} ${bot}`; x += flat; }
    }
    return { d, start: [x0, bot], end: [x1, bot] };
  },
};

function roadStrip({ kind, h, chan, guide, from, to, waves }) {
  // Tuck the road a little under the pictures so it reads as one journey
  // rather than a strip with two stickers beside it.
  const x0 = ROAD_ICON;
  const x1 = ROAD_W - ROAD_ICON;
  const { d, start, end } = ROAD_GEN[kind](x0, x1, h, chan, waves);
  const iconY = (y) => Math.max(0, Math.min(h - ROAD_ICON, y - ROAD_ICON / 2));
  const guideLine = guide
    ? `<path d="${d}" fill="none" stroke="var(--trace-gray)" stroke-width="0.5"
         stroke-dasharray="1.6 2.4" stroke-linecap="round"/>`
    : '';
  return `
  <svg viewBox="0 0 ${ROAD_W} ${h}" width="100%" height="${h}mm"
       style="display:block;z-index:1;" xmlns="http://www.w3.org/2000/svg">
    <path d="${d}" fill="none" stroke="var(--accent)" stroke-width="${chan}"
      stroke-linecap="butt" stroke-linejoin="miter"/>
    <path d="${d}" fill="none" stroke="#ffffff" stroke-width="${(chan - RAIL * 2).toFixed(2)}"
      stroke-linecap="butt" stroke-linejoin="miter"/>
    ${guideLine}
    <circle cx="${start[0]}" cy="${start[1].toFixed(1)}" r="2" fill="#3fae83"/>
    <image href="${emojiHref(from)}" x="0" y="${iconY(start[1]).toFixed(1)}"
      width="${ROAD_ICON}" height="${ROAD_ICON}"/>
    <image href="${emojiHref(to)}" x="${ROAD_W - ROAD_ICON}" y="${iconY(end[1]).toFixed(1)}"
      width="${ROAD_ICON}" height="${ROAD_ICON}"/>
  </svg>`;
}

export function roadPage(road, idx, total, book = 1) {
  const strips = road.levels.map(l => roadStrip({
    kind: road.kind, from: road.from, to: road.to, waves: road.waves, ...l,
  }));
  const inner = `
    ${header({ kicker: `Book 1 · Roads & Paths · ${road.title}`, title: road.title, badge: emoji(road.to) })}
    ${tipBox({ text: road.tip, say: road.say, icon: deco.pencil })}
    <div class="stack" style="justify-content:space-evenly;">${strips.map(s => `<div>${s}</div>`).join('')}</div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(road.accent, 'p-road', inner);
}

/* ---- vertical roads: a different motor pattern from the horizontal ones,
        and the one that matters most (every letter starts top-to-bottom). ---- */

export function downRoadPage(road, idx, total, book = 1) {
  const H = 176;
  const cols = road.channels.length;
  const slot = ROAD_W / cols;
  const top = ROAD_ICON + 2;
  const bot = H - ROAD_ICON - 2;
  const lanes = road.channels.map((chan, i) => {
    const cx = slot * i + slot / 2;
    const d = `M${cx.toFixed(1)} ${top} L${cx.toFixed(1)} ${bot}`;
    return `
      <path d="${d}" fill="none" stroke="var(--accent)" stroke-width="${chan}" stroke-linecap="butt"/>
      <path d="${d}" fill="none" stroke="#ffffff" stroke-width="${(chan - RAIL * 2).toFixed(2)}" stroke-linecap="butt"/>
      ${i < 2 ? `<path d="${d}" fill="none" stroke="var(--trace-gray)" stroke-width="0.5"
          stroke-dasharray="1.6 2.4" stroke-linecap="round"/>` : ''}
      <circle cx="${cx.toFixed(1)}" cy="${top}" r="2" fill="#3fae83"/>
      <image href="${emojiHref(road.from)}" x="${(cx - ROAD_ICON / 2).toFixed(1)}" y="0"
        width="${ROAD_ICON}" height="${ROAD_ICON}"/>
      <image href="${emojiHref(road.to)}" x="${(cx - ROAD_ICON / 2).toFixed(1)}" y="${H - ROAD_ICON}"
        width="${ROAD_ICON}" height="${ROAD_ICON}"/>`;
  }).join('');
  const inner = `
    ${header({ kicker: `Book 1 · Roads & Paths · ${road.title}`, title: road.title, badge: emoji(road.to) })}
    ${tipBox({ text: road.tip, say: road.say, icon: deco.pencil })}
    <div class="stack" style="justify-content:center;">
      <svg viewBox="0 0 ${ROAD_W} ${H}" width="100%" height="${H}mm"
           style="display:block;z-index:1;" xmlns="http://www.w3.org/2000/svg">${lanes}</svg>
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(road.accent, 'p-road', inner);
}

/* ---- one big spiral road: the whole point of the spiral is the long,
        continuous, ever-widening turn, which a 24mm tile can't give. ---- */

function spiralChannelPath(cx, cy, r0, r1, turns) {
  const steps = 240;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * 2 * Math.PI;
    const r = r0 + (r1 - r0) * t;
    const x = cx + r * Math.sin(a);
    const y = cy - r * Math.cos(a);
    d += `${i ? ' L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export function spiralRoadPage(road, idx, total, book = 1) {
  const H = 172, cx = ROAD_W / 2, cy = H / 2;
  const turns = 2.5, r0 = 8, r1 = 78, chan = 16;
  const d = spiralChannelPath(cx, cy, r0, r1, turns);
  const endA = turns * 2 * Math.PI;
  const ex = cx + r1 * Math.sin(endA), ey = cy - r1 * Math.cos(endA);
  const inner = `
    ${header({ kicker: `Book 1 · Roads & Paths · ${road.title}`, title: road.title, badge: emoji(road.to) })}
    ${tipBox({ text: road.tip, say: road.say, icon: deco.pencil })}
    <div class="stack" style="justify-content:center;">
      <svg viewBox="0 0 ${ROAD_W} ${H}" width="100%" height="${H}mm"
           style="display:block;z-index:1;" xmlns="http://www.w3.org/2000/svg">
        <path d="${d}" fill="none" stroke="var(--accent)" stroke-width="${chan}"
          stroke-linecap="butt" stroke-linejoin="round"/>
        <path d="${d}" fill="none" stroke="#ffffff" stroke-width="${(chan - RAIL * 2).toFixed(2)}"
          stroke-linecap="butt" stroke-linejoin="round"/>
        <image href="${emojiHref(road.from)}" x="${(cx - 6).toFixed(1)}" y="${(cy - r0 - 6).toFixed(1)}"
          width="12" height="12"/>
        <image href="${emojiHref(road.to)}" x="${(ex - 7).toFixed(1)}" y="${(ey - 7).toFixed(1)}"
          width="14" height="14"/>
      </svg>
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(road.accent, 'p-road', inner);
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
  // The four rules are deliberately unequal in weight. The x-height rule runs
  // straight through the middle of every letter, so at the old --line-mid it
  // was darker than the dotted letters themselves and the two fought: it read
  // as part of the glyph. Order of emphasis is now baseline (solid, dark) >
  // letters > x-height > ascender/descender, which is the order they matter in.
  return `
  <svg class="guide4-svg" viewBox="0 0 ${ROW_WIDTH_MM} ${h}" width="100%" height="${h}mm"
       style="display:block;overflow:visible;position:relative;z-index:1;" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="${ROW_WIDTH_MM}" y2="0" stroke="var(--line-ghost)" stroke-width="0.3" stroke-dasharray="1.2 2"/>
    <line x1="0" y1="${mid}" x2="${ROW_WIDTH_MM}" y2="${mid}" stroke="var(--line-faint)" stroke-width="0.32" stroke-dasharray="1.3 2.2"/>
    <line x1="0" y1="${base}" x2="${ROW_WIDTH_MM}" y2="${base}" stroke="var(--line-baseline)" stroke-width="0.7"/>
    <line x1="0" y1="${h}" x2="${ROW_WIDTH_MM}" y2="${h}" stroke="var(--line-ghost)" stroke-width="0.3" stroke-dasharray="1.2 2"/>
    ${texts}
  </svg>`;
}

// The four-line system is one proportion, not three free numbers: the baseline
// sits one em below the headline, the x-height rule at 0.53 em, the descender
// rule at 1.47 em. Deriving them from the letter size keeps every row's rules
// actually touching the letters printed on it — before this, the smaller rows
// set 13mm letters inside a 14mm band and the x-height line floated free.
const cursiveRow = (sizeMm, items) => guide4Row({
  sizeMm, items,
  base: +sizeMm.toFixed(2),
  mid: +(sizeMm * 0.53).toFixed(2),
  h: +(sizeMm * 1.47).toFixed(2),
});

/* ---------------------------------------------------------- Book 2: capital letters */

// Each stroke gets its own colour so ①②③ can be told apart at a glance, in
// the order they're written.
const STROKE_COLORS = ['#3fae83', '#e5644f', '#3e85c9', '#8467c7'];

const MARK_R = 8;

// Every capital page used to end on the same chant — "Big line, then the
// little bits!" — which is simply untrue of T, O or S. Tie it to the diagram
// instead, so what the page says out loud matches what it shows.
function strokeChant(letter) {
  const n = (CAPITAL_STROKES[letter] || []).length;
  if (n <= 1) return 'One smooth line — don’t lift your pencil!';
  if (n === 2) return 'Number 1 first, then number 2!';
  return 'Follow the numbers, one at a time!';
}

function strokeDiagram(letter) {
  const strokes = CAPITAL_STROKES[letter];
  if (!strokes) return '';
  const starts = strokes.map(strokeStart);
  // Several capitals begin two strokes at the same spot (the top of B, D, E,
  // F, P, R; the apex of A), which would stack ② straight on top of ① and
  // hide the one marker that matters most. Spread any such cluster sideways.
  const marks = starts.map(([x, y], i) => {
    const cluster = starts.reduce((acc, [sx, sy], j) => (Math.hypot(sx - x, sy - y) < 3 ? [...acc, j] : acc), []);
    return [x + (cluster.indexOf(i) - (cluster.length - 1) / 2) * (MARK_R * 2 + 1), y];
  });
  const art = strokes.map((d, i) => {
    const color = STROKE_COLORS[i % STROKE_COLORS.length];
    // Two thirds along: past the start marker, still short of the end, and on
    // the long limb of an L-shaped stroke rather than in its corner. Slide it
    // further along if it would land under a number (T's crossbar arrow ends
    // up right under ②).
    let a = pointAlong(d, 0.66);
    if (marks.some(([mx, my]) => Math.hypot(mx - a.x, my - a.y) < MARK_R + 4)) a = pointAlong(d, 0.84);
    const [mx, my] = marks[i];
    return `
      <path d="${d}" fill="none" stroke="${color}" stroke-width="4.5"
        stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0 -4.5 L7 0 L0 4.5 Z" fill="${color}"
        transform="translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${a.rot.toFixed(0)})"/>
      <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${MARK_R}" fill="${color}"/>
      <text x="${mx.toFixed(1)}" y="${my.toFixed(1)}" text-anchor="middle" dominant-baseline="central"
        font-family="'Baloo 2', sans-serif" font-weight="700" font-size="11" fill="#ffffff">${i + 1}</text>`;
  }).join('');
  // Letters occupy x=6..54; the box reaches to -8 and 68 so a spread-out
  // marker at the edge of a stem still has room.
  return `
    <div class="stroke-card">
      <div class="stroke-card-label">How to make it</div>
      <div class="stroke-card-art">
        <svg viewBox="-8 0 76 104" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${art}</svg>
      </div>
    </div>`;
}

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
      ${strokeDiagram(letter)}
    </div>
    ${tipBox({ text: tip, say: strokeChant(letter), icon: deco.check })}
    <div class="stack">
      ${guideCapsRow({ h: 30, base: 25, items: traceBig, justify: 'space-around' })}
      ${guideCapsRow({ h: 26, base: 22, items: traceMed, justify: 'space-around' })}
      ${guideCapsRow({ h: 26, base: 22, items: [''], justify: 'flex-start' })}
      ${guideCapsRow({ h: 26, base: 22, items: [''], justify: 'flex-start' })}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-cap', inner);
}

/* ---------------------------------------------------------- Book 3: cursive letters & words */

export function cursiveLetterPage(entry, idx, total, book = 3, n, nTotal) {
  const { letter, word, tip, accent } = entry;
  const icon = letterIcons[letter.toUpperCase()] || deco.star;
  const rep = (count) => Array.from({ length: count }, () => letter);

  const inner = `
    ${header({ kicker: `Book 3 · Cursive Letters · Letter ${n} of ${nTotal}`, title: `Little “${letter}”`, badge: deco.pencil })}
    <div class="letter-hero">
      <div class="big-letter hand-font" style="font-size:56pt;">${letter}</div>
      <div class="icon-card" style="background:var(--accent-bg);">${icon}</div>
      <div class="word-label">${letter} is for ${word}</div>
    </div>
    ${tipBox({ text: tip, say: 'Nice and joined-up!', icon: deco.check })}
    <div class="stack">
      ${cursiveRow(18, rep(4))}
      ${cursiveRow(16, rep(5))}
      ${cursiveRow(16, [])}
      ${cursiveRow(16, [])}
      ${cursiveRow(16, [])}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-cursive', inner);
}

export function cursiveWordPage(entry, idx, total, book = 3, n, nTotal) {
  const { word, tip, accent } = entry;
  const icon = wordIcons[word] || deco.flower;
  const rep = (count) => Array.from({ length: count }, () => word);

  const inner = `
    ${header({ kicker: `Book 3 · First Words · Word ${n} of ${nTotal}`, title: `“${word}”`, badge: deco.heart })}
    <div class="letter-hero">
      <div class="big-letter hand-font" style="font-size:44pt;">${word}</div>
      <div class="icon-card">${icon}</div>
      <div class="word-label">Trace it, then write your own!</div>
    </div>
    ${tipBox({ text: tip, say: `Keep your pencil moving — don’t lift it!`, icon: deco.check })}
    <div class="stack">
      ${cursiveRow(18, rep(2))}
      ${cursiveRow(16, rep(3))}
      ${cursiveRow(16, [])}
      ${cursiveRow(16, [])}
      ${cursiveRow(16, [])}
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

export function introPage({ book, accent, title, paragraphs, figure, idx = 1, total = 1 }) {
  const inner = `
    ${header({ kicker: BOOK_META[book].name, title, badge: deco.cloud })}
    <div class="stack" style="justify-content:center;">
      ${paragraphs.map(p => `<p style="font-size:13pt;line-height:1.7;font-weight:600;color:var(--ink);z-index:1;">${p}</p>`).join('')}
      ${figure || ''}
    </div>
    ${footer({ book, pageNum: idx, total })}`;
  return page(accent, 'p-intro', inner);
}

// The Part 2 divider asks the reader to learn a new rule about what the marks
// on the page mean, so it shows the two kinds side by side rather than only
// describing them.
export function roadLegend() {
  const row = (art, text) => `
    <div style="display:flex;align-items:center;gap:6mm;">
      <div style="flex:0 0 auto;width:54mm;">${art}</div>
      <span style="font-size:12pt;font-weight:700;color:var(--ink);">${text}</span>
    </div>`;
  const follow = `
    <svg viewBox="0 0 60 16" width="100%" height="11mm" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="8" x2="58" y2="8" stroke="var(--trace-gray)" stroke-width="1.6"
        stroke-dasharray="2.4 3" stroke-linecap="round"/>
      <circle cx="3" cy="8" r="1.8" fill="#3fae83"/>
    </svg>`;
  const between = `
    <svg viewBox="0 0 60 16" width="100%" height="11mm" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="8" x2="58" y2="8" stroke="var(--accent)" stroke-width="11" stroke-linecap="butt"/>
      <line x1="2" y1="8" x2="58" y2="8" stroke="#ffffff" stroke-width="9.4" stroke-linecap="butt"/>
      <circle cx="3.5" cy="8" r="1.8" fill="#3fae83"/>
    </svg>`;
  return `
    <div style="display:flex;flex-direction:column;gap:5mm;background:var(--accent-bg);
      border:1.4pt solid var(--accent);border-radius:6mm;padding:6mm 7mm;z-index:1;">
      ${row(follow, 'Grey and dotted — <b>draw on top of it</b>.')}
      ${row(between, 'Two coloured lines — <b>drive between them</b>.')}
    </div>`;
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
      ${cursiveRow(22, [proper, proper])}
      ${cursiveRow(20, [proper, proper])}
      ${cursiveRow(20, [])}
      ${cursiveRow(20, [])}
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
