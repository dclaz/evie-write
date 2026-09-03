// Stroke-order diagrams for the Book 2 capitals.
//
// The tip text on each page says things like "slide down, slide down the other
// way, then a little line across" — but nothing on the page showed WHERE the
// first stroke starts or which way it travels, which is exactly what a child
// gets wrong when left to guess (an A built bottom-up, an O drawn clockwise).
// So each page now carries a small numbered diagram: ① at the start of stroke
// one, an arrow partway along it showing the direction, then ② and ③.
//
// The diagram is drawn geometrically rather than set in the tracing font: a
// glyph gives no stroke boundaries and no direction, so there is nothing to
// number. It follows the same single-stroke skeleton the Edu VIC WA NT
// Beginner face is built on, so the shapes agree even though the diagram is
// deliberately plainer than the letter the child traces below it.
//
// Coordinates live in a 60 x 104 box: cap height y=12..88 (76 tall) and
// letters spanning x=6..54, which puts them at about 0.63 of cap height —
// roughly the proportion of a real capital. Paths use only M / L / C so they
// can be flattened and measured by the sampler below (arcs are written as
// cubics; ELLIPSE holds the four quarter-curves of the O bowl).

const T = 12; // cap line (baseline is y=88)

// Ellipse quarters, anticlockwise from the top — the direction capitals are
// actually taught in (O, C, G and Q all open the same way).
const ELLIPSE = {
  topLeft: 'C16.8 12 6 29 6 50',
  leftBottom: 'C6 71 16.8 88 30 88',
  bottomRight: 'C43.2 88 54 71 54 50',
  rightTop: 'C54 29 43.2 12 30 12',
};
const OVAL = `M30 ${T} ${ELLIPSE.topLeft} ${ELLIPSE.leftBottom} ${ELLIPSE.bottomRight} ${ELLIPSE.rightTop}`;
// C and G share the oval minus its top-right quarter, with a short lead-in and
// run-out so the opening reads as a gap rather than a broken circle.
const CURVE_C = `M51 26 C45 15 38 12 30 12 ${ELLIPSE.topLeft} ${ELLIPSE.leftBottom}`;

export const CAPITAL_STROKES = {
  A: ['M30 12 L10 88', 'M30 12 L50 88', 'M17 62 L43 62'],
  B: ['M10 12 L10 88', 'M10 12 C36 12 44 20 44 30 C44 42 34 50 10 50',
      'M10 50 C40 50 50 60 50 69 C50 81 40 88 10 88'],
  C: [`${CURVE_C} C38 88 45 85 51 74`],
  D: ['M10 12 L10 88', 'M10 12 C40 12 50 28 50 50 C50 72 40 88 10 88'],
  E: ['M10 12 L10 88', 'M10 12 L48 12', 'M10 50 L40 50', 'M10 88 L48 88'],
  F: ['M10 12 L10 88', 'M10 12 L48 12', 'M10 48 L40 48'],
  G: [`${CURVE_C} C42 88 54 80 54 66 L54 55 L36 55`],
  H: ['M10 12 L10 88', 'M50 12 L50 88', 'M10 50 L50 50'],
  I: ['M30 12 L30 88'],
  J: ['M42 12 L42 70 C42 86 18 90 10 76'],
  K: ['M10 12 L10 88', 'M48 12 L10 54', 'M10 54 L50 88'],
  L: ['M10 12 L10 88', 'M10 88 L46 88'],
  M: ['M8 12 L8 88', 'M8 12 L30 55 L52 12', 'M52 12 L52 88'],
  N: ['M8 12 L8 88', 'M8 12 L52 88', 'M52 12 L52 88'],
  O: [OVAL],
  P: ['M10 12 L10 88', 'M10 12 C40 12 48 22 48 33 C48 45 38 53 10 53'],
  Q: [OVAL, 'M36 66 L54 92'],
  R: ['M10 12 L10 88', 'M10 12 C40 12 48 21 48 31 C48 42 38 50 10 50', 'M10 50 L50 88'],
  S: ['M48 24 C44 13 16 10 16 28 C16 44 48 44 48 65 C48 87 18 90 10 76'],
  T: ['M8 12 L52 12', 'M30 12 L30 88'],
  U: ['M10 12 L10 64 C10 84 50 84 50 64 L50 12'],
  V: ['M10 12 L30 88 L50 12'],
  W: ['M6 12 L18 88 L30 32 L42 88 L54 12'],
  X: ['M10 12 L50 88', 'M50 12 L10 88'],
  Y: ['M10 12 L30 50 L30 88', 'M50 12 L30 50'],
  Z: ['M10 12 L50 12 L10 88 L50 88'],
};

/* ------------------------------------------------------------------ sampler

   Flattens an M/L/C path into points so the arrow can be placed a fixed
   fraction of the way along a stroke, pointing wherever the stroke actually
   goes at that spot. Hand-placing ~50 arrowheads by eye would drift out of
   sync with the paths the moment a letter is adjusted.
*/

function samplePath(d) {
  const pts = [];
  let cur = [0, 0];
  for (const seg of d.match(/[MLC][^MLC]*/g)) {
    const n = seg.slice(1).trim().split(/[\s,]+/).map(Number);
    if (seg[0] === 'M') {
      cur = [n[0], n[1]];
      pts.push(cur);
    } else if (seg[0] === 'L') {
      for (let p = 0; p < n.length; p += 2) {
        const [x0, y0] = cur, x1 = n[p], y1 = n[p + 1];
        for (let i = 1; i <= 16; i++) pts.push([x0 + (x1 - x0) * i / 16, y0 + (y1 - y0) * i / 16]);
        cur = [x1, y1];
      }
    } else {
      for (let p = 0; p < n.length; p += 6) {
        const [x0, y0] = cur;
        for (let i = 1; i <= 24; i++) {
          const s = i / 24, m = 1 - s;
          pts.push([
            m * m * m * x0 + 3 * m * m * s * n[p] + 3 * m * s * s * n[p + 2] + s * s * s * n[p + 4],
            m * m * m * y0 + 3 * m * m * s * n[p + 1] + 3 * m * s * s * n[p + 3] + s * s * s * n[p + 5],
          ]);
        }
        cur = [n[p + 4], n[p + 5]];
      }
    }
  }
  return pts;
}

// Point and heading a given fraction along the stroke, by arc length.
export function pointAlong(d, fraction) {
  const pts = samplePath(d);
  const lens = [0];
  for (let i = 1; i < pts.length; i++) {
    lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const target = lens[lens.length - 1] * fraction;
  let i = lens.findIndex(l => l >= target);
  if (i < 1) i = 1;
  const [x, y] = pts[i];
  const [px, py] = pts[i - 1];
  return { x, y, rot: Math.atan2(y - py, x - px) * 180 / Math.PI };
}

export const strokeStart = (d) => samplePath(d)[0];
