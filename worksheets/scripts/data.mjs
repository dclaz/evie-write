// Content definitions for the three workbooks.

export const CHILD_NAME = 'Evie';

/* ============================================================
   BOOK 1 — Lines & Shapes (pre-writing / fine motor)
   Ordered by typical developmental sequence for ~3 year olds.
   ============================================================ */
export const SHAPES = [
  {
    id: 'vertical', title: 'Straight Down', accent: 'sky',
    say: 'Top... to... bottom!',
    tip: 'Start at the dot. Pull your pencil straight DOWN to the line.',
  },
  {
    id: 'horizontal', title: 'Straight Across', accent: 'coral',
    say: 'Zoooom, all the way across!',
    tip: 'Start at the dot. Slide your pencil straight ACROSS to the arrow.',
  },
  {
    id: 'circle', title: 'Round and Round', accent: 'sun',
    say: 'Round... and round... and round!',
    tip: 'Start at the dot. Go round and round, just like a wheel.',
  },
  {
    id: 'cross', title: 'Criss Cross', accent: 'pink',
    say: 'Down... then across!',
    tip: 'First pull straight DOWN. Then slide straight ACROSS. Two lines make a cross!',
  },
  {
    id: 'diagRight', title: 'Slanty Line', accent: 'lav',
    say: 'Slide down the slide!',
    tip: 'Start at the top dot. Slide down to the bottom, like a playground slide.',
  },
  {
    id: 'diagLeft', title: 'Slanty Line the Other Way', accent: 'mint',
    say: 'Whoosh, the other way!',
    tip: 'Start at the top dot. Slide down the OTHER way this time.',
  },
  {
    id: 'square', title: 'Boxy Square', accent: 'sky',
    say: 'Across, down, across, up!',
    tip: 'Trace all four sides: across the top, down the side, across the bottom, up the side.',
  },
  {
    id: 'triangle', title: 'Pointy Triangle', accent: 'coral',
    say: 'Up to the point, then down!',
    tip: 'Slide up to the point, slide down the other side, then straight across to close it.',
  },
  // `pattern` shapes run right across the page instead of sitting in tiles:
  // a rhythm needs a long run, not one and a half cycles in a little box.
  // `big` gives the spiral fewer, larger tiles so its turns stay far enough
  // apart for a pencil to fit between them.
  {
    id: 'zigzag', title: 'Zig Zag', accent: 'mint', pattern: true,
    say: 'Zig! Zag! Zig! Zag!',
    tip: 'Bounce your pencil up and down like little mountains — all the way across, without stopping.',
  },
  {
    id: 'wave', title: 'Wavy Line', accent: 'sky', pattern: true,
    say: 'Up and over, like the sea!',
    tip: 'Curve gently up and down, smooth like water. No sharp corners, and don\u2019t lift your pencil!',
  },
  {
    id: 'loop', title: 'Loop the Loop', accent: 'lav', pattern: true,
    say: 'Round, up, and over!',
    tip: 'Swing up, curl right around in a loop, then straight on into the next one. This is how cursive letters join!',
  },
  {
    id: 'spiral', title: 'Snail Spiral', accent: 'sun', big: true,
    say: 'Round and round, bigger and bigger!',
    tip: 'Start in the middle. Curl round and round, getting bigger every time.',
  },
];

/* ============================================================
   BOOK 1, part 2 — Roads & Paths (draw BETWEEN two lines)

   Tracing a dotted line trains accuracy ON a target; staying inside a
   channel trains control WITHIN a boundary — which is the skill that
   actually transfers to keeping a letter between two ruled lines. Each
   page repeats one shape with a road that gets narrower down the page,
   and the two easiest levels keep a faint dotted centreline for support.
   `kind` picks the geometry generator in templates.mjs; `from`/`to` are
   filenames in src/emoji/, drawn at the start and finish of every road.
   ============================================================ */
export const ROADS = [
  {
    id: 'straightRoad', kind: 'straight', title: 'The Long Road', accent: 'sky',
    from: 'dog', to: 'ball',
    say: 'Stay on the road!',
    tip: 'Drive your pencil from the puppy all the way to the ball. Try not to bump the edges!',
    levels: [
      { h: 30, chan: 24, guide: true },
      { h: 26, chan: 18, guide: true },
      { h: 22, chan: 13 },
      { h: 18, chan: 9 },
    ],
  },
  {
    id: 'downRoad', kind: 'down', title: 'Rain Comes Down', accent: 'lav',
    from: 'cloud', to: 'flower',
    say: 'Down, down, down!',
    tip: 'Start at each cloud and bring the rain straight down to the flower. Keep inside the lines!',
    channels: [24, 19, 15, 11, 8],
  },
  {
    id: 'waveRoad', kind: 'wave', title: 'The Wavy River', accent: 'mint',
    from: 'duck', to: 'nest',
    waves: 3,
    say: 'Smooth like water!',
    tip: 'Swim the duck home along the river. Curve gently — no sharp corners, and no splashing over the banks!',
    levels: [
      { h: 44, chan: 20, guide: true },
      { h: 40, chan: 14, guide: true },
      { h: 36, chan: 10 },
    ],
  },
  {
    id: 'zigzagRoad', kind: 'zigzag', title: 'Zig Zag Mountain', accent: 'coral',
    from: 'fox', to: 'mountain',
    waves: 3,
    say: 'Zig! Zag! Zig! Zag!',
    tip: 'Climb the fox up to the mountain. Stop at each pointy corner, then set off the other way!',
    levels: [
      { h: 44, chan: 20, guide: true },
      { h: 40, chan: 14, guide: true },
      { h: 36, chan: 10 },
    ],
  },
  {
    id: 'bumpRoad', kind: 'bumps', title: 'Over the Hills', accent: 'sun',
    from: 'cat', to: 'house',
    waves: 3,
    say: 'Up and over, up and over!',
    tip: 'Take the cat home over every hill. Go all the way up and all the way down — no shortcuts!',
    levels: [
      { h: 44, chan: 18, guide: true },
      { h: 40, chan: 13, guide: true },
      { h: 36, chan: 9 },
    ],
  },
  {
    id: 'spiralRoad', kind: 'spiral', title: 'The Snail Shell', accent: 'pink',
    from: 'bee', to: 'flower',
    say: 'Round and round, bigger and bigger!',
    tip: 'Start with the bee in the middle. Wind all the way round and round until you reach the flower.',
  },
];

/* ============================================================
   BOOK 2 — Capital Letters A–Z (Edu VIC WA NT Beginner font)
   ============================================================ */
const A2Z = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const WORD_FOR = {
  A: 'Apple', B: 'Ball', C: 'Cat', D: 'Duck', E: 'Egg', F: 'Fish',
  G: 'Grapes', H: 'House', I: 'Ice Cream', J: 'Jellyfish', K: 'Kite', L: 'Leaf',
  M: 'Mountain', N: 'Nest', O: 'Orange', P: 'Pear', Q: 'Queen', R: 'Rainbow',
  S: 'Sun', T: 'Trophy', U: 'Umbrella', V: 'Vase', W: 'Watermelon',
  X: 'Xylophone', Y: 'Yo-yo', Z: 'Zebra',
};
const TIP_FOR = {
  A: 'Slide down, slide down the other way, then a little line across.',
  B: 'Straight line down. Then two round bumps on the right.',
  C: 'Start at the top. Curve round like a hug, and stop.',
  D: 'Straight line down. Then one big curve back to the top.',
  E: 'Straight line down, then three lines across: top, middle, bottom.',
  F: 'Straight line down, then two lines across: top and middle.',
  G: 'Curve like a C, then a little line in for the hook.',
  H: 'Two straight lines down, then one line across the middle.',
  I: 'One straight line down. Simple and tall!',
  J: 'Straight line down, then curve round like a hook at the bottom.',
  K: 'Straight line down. Then two slanty lines meeting in the middle.',
  L: 'Straight line down, then straight across the bottom.',
  M: 'Straight line down. Then down to the middle and back up to the top. Then down again.',
  N: 'Straight line down. Then a slanty line down to the corner. Then one more line down.',
  O: 'One big curve all the way round, like a circle.',
  P: 'Straight line down, then a round bump at the top.',
  Q: 'Curve round like an O, then a little tail at the bottom.',
  R: 'Down, round bump at top, then a slanty leg.',
  S: 'Curve like a snake — round the top, round the bottom.',
  T: 'Line across the top, then straight down the middle.',
  U: 'Down, curve at the bottom, then straight up again.',
  V: 'Slide down, then slide back up the other way.',
  W: 'Down, up, down, up — like two little V shapes.',
  X: 'One slanty line down, then another slanty line crossing it.',
  Y: 'Two slanty lines meeting in the middle, then straight down.',
  Z: 'Line across the top, slant down, line across the bottom.',
};
export const CAPITAL_LETTERS = A2Z.map((L, i) => ({
  letter: L,
  word: WORD_FOR[L],
  tip: TIP_FOR[L],
  accent: ['coral', 'sun', 'mint', 'sky', 'lav', 'pink'][i % 6],
}));

/* ============================================================
   BOOK 3 — Lowercase cursive (Edu AU VIC WA NT Hand / Dots)
   ============================================================ */
const a2z = 'abcdefghijklmnopqrstuvwxyz'.split('');
const CTIP_FOR = {
  a: 'Curve round, then straight down beside it.',
  b: 'Tall line up first, then a round tummy on the way down.',
  c: 'One little curve, like the start of an O.',
  d: 'Round curve, then a tall line up and straight down.',
  e: 'A tiny curl in the middle, then round like a c.',
  f: 'Tall curve up high, loop down low, then a little cross.',
  g: 'Round like an a, then swing a loop down under the line.',
  h: 'Tall line up, then over and down like a little bridge.',
  i: 'A tiny straight line, then a neat dot on top.',
  j: 'A little line down that loops under the line, then a dot.',
  k: 'Tall line up, then a small loop and kick out to the leg.',
  l: 'One long, tall, elegant loop all the way up.',
  m: 'Two little bridges in a row.',
  n: 'One little bridge.',
  o: 'A neat round curve, all the way round.',
  p: 'Line down under the line, then a round tummy.',
  q: 'Round like an a, then a curly tail under the line.',
  r: 'Small line up with a little flick at the top.',
  s: 'A curvy little snake shape.',
  t: 'Line up, straight down, then a little cross in the middle.',
  u: 'Two little dips in a row, like a smile.',
  v: 'Down and up in a little V.',
  w: 'Down, up, down, up — three little dips.',
  x: 'Two tiny slanted lines crossing over.',
  y: 'A dip down, then swing a tail under the line.',
  z: 'A tiny zig-zag shape.',
};
export const CURSIVE_LETTERS = a2z.map((l, i) => ({
  letter: l,
  word: WORD_FOR[l.toUpperCase()],
  tip: CTIP_FOR[l],
  accent: ['sky', 'coral', 'sun', 'mint', 'lav', 'pink'][i % 6],
}));

export const CURSIVE_WORDS = [
  { word: 'mum', tip: 'Three little bridges in a row.', accent: 'coral' },
  { word: 'dad', tip: 'Round and tall, round and tall.', accent: 'sky' },
  { word: 'cat', tip: 'Curl, curl, then a little cross on top.', accent: 'sun' },
  { word: 'dog', tip: 'Round and tall, then round with a loopy tail.', accent: 'mint' },
  { word: 'sun', tip: 'A curvy snake, then two little dips.', accent: 'lav' },
  { word: 'hat', tip: 'A tall bridge, then a curl and a cross.', accent: 'pink' },
  { word: 'run', tip: 'A little flick, then two little dips.', accent: 'coral' },
  { word: 'big', tip: 'A round tummy, then a tall line, then a loopy tail.', accent: 'sky' },
  { word: 'red', tip: 'A little flick, curl, then a bridge.', accent: 'sun' },
  { word: 'yes', tip: 'A dip with a tail, curvy snake, curvy snake.', accent: 'mint' },
  { word: 'bee', tip: 'Round tummy, then two little curls.', accent: 'lav' },
  { word: 'fox', tip: 'A tall loop, round curve, two crossing lines.', accent: 'pink' },
];
