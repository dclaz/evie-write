// Every "picture" in the workbook is a real Noto Emoji vector illustration
// (https://github.com/googlefonts/noto-emoji, Apache-2.0), loaded from
// src/emoji/ and inlined as SVG. We used to just print the emoji character
// and let the system's colour emoji font (Noto Color Emoji) render it, but
// that font stores glyphs as fixed-resolution bitmaps — fine at the small
// sizes most icons use, but visibly pixelated at the size the cover badge
// is printed at. Inlining the same artwork as vector SVG stays crisp at
// any size.
//
// Sizing: each export below is a full <svg width="100%" height="100%" ...>
// element, so callers size it with plain CSS width/height on its container
// (see .badge, .tip-icon, .icon-card, .cover-badge in common.css).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EMOJI_DIR = path.join(__dirname, '..', 'src', 'emoji');

function loadEmoji(name) {
  const raw = readFileSync(path.join(EMOJI_DIR, `${name}.svg`), 'utf8');
  // The source files carry no width/height (just a viewBox), so an inline
  // <svg> would fall back to the UA default box (~300x150) instead of
  // filling its container. Force it to fill.
  return raw.replace('<svg ', '<svg width="100%" height="100%" ');
}

// Same artwork, but as a data: URI for use inside an <image> element. Inline
// <svg> can't be positioned in another SVG's user coordinates (a nested <svg>
// with width="100%" resolves against the wrong box), so path pages — which
// need the start/finish picture sitting exactly on the road — reference the
// emoji through <image x= y= width= height= href=...> instead.
// Inline <svg> for the same artwork, by name — for pages whose decoration is
// chosen from data rather than fixed in the template (e.g. a road page badges
// itself with wherever that road leads).
export const emoji = loadEmoji;

export function emojiHref(name) {
  const raw = readFileSync(path.join(EMOJI_DIR, `${name}.svg`), 'utf8');
  return 'data:image/svg+xml;base64,' + Buffer.from(raw, 'utf8').toString('base64');
}

/* ---------------- decorative corner / badge icons ---------------- */

export const deco = {
  sun: loadEmoji('sun'),
  cloud: loadEmoji('cloud'),
  star: loadEmoji('star'),
  heart: loadEmoji('heart'),
  flower: loadEmoji('flower'),
  rainbow: loadEmoji('rainbow'),
  balloon: loadEmoji('balloon'),
  pencil: loadEmoji('pencil'),
  check: loadEmoji('check'),
};

/* ---------------- Book 2: A-is-for-Apple style letter icons ---------------- */

export const letterIcons = {
  A: loadEmoji('apple'), B: loadEmoji('ball'), C: loadEmoji('cat'),
  D: loadEmoji('duck'), E: loadEmoji('egg'), F: loadEmoji('fish'),
  G: loadEmoji('grapes'), H: loadEmoji('house'), I: loadEmoji('icecream'),
  J: loadEmoji('jellyfish'), K: loadEmoji('kite'), L: loadEmoji('leaf'),
  M: loadEmoji('mountain'), N: loadEmoji('nest'), O: loadEmoji('orange'),
  P: loadEmoji('pear'), Q: loadEmoji('crown'), R: loadEmoji('rainbow'),
  S: loadEmoji('sun'), T: loadEmoji('trophy'), U: loadEmoji('umbrella'),
  V: loadEmoji('amphora'), W: loadEmoji('watermelon'), X: loadEmoji('xray'),
  Y: loadEmoji('yoyo'), Z: loadEmoji('zebra'),
};

/* ---------------- Book 3: first-word icons ---------------- */

export const wordIcons = {
  mum: loadEmoji('woman'), dad: loadEmoji('man'), cat: loadEmoji('cat'),
  dog: loadEmoji('dog'), sun: loadEmoji('sun'), hat: loadEmoji('tophat'),
  run: loadEmoji('runner'), big: loadEmoji('elephant'), red: loadEmoji('redcircle'),
  yes: loadEmoji('check'), bee: loadEmoji('bee'), fox: loadEmoji('fox'),
};
