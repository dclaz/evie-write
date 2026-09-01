// Every "picture" in the workbook is a plain emoji character. Rendered by
// the system's colour emoji font (Playwright's headless Chromium has one
// preinstalled), these look polished and consistent for free — no more
// hand-drawn SVGs to get slightly wrong.
//
// Sizing: an emoji is just text, so callers size it with CSS font-size on
// its container (see .badge, .tip-icon, .icon-card, .cover-badge in
// common.css) rather than width/height like the old inline SVGs.

/* ---------------- decorative corner / badge icons ---------------- */

export const deco = {
  sun: '☀️',
  cloud: '☁️',
  star: '⭐',
  heart: '❤️',
  flower: '🌸',
  rainbow: '🌈',
  balloon: '🎈',
  pencil: '✏️',
  check: '✅',
};

/* ---------------- Book 1: line & shape "reveal" pictures ---------------- */
// Each connects the abstract practised stroke to something recognisable.

export const shapePicture = {
  vertical: '🚀',
  horizontal: '🛣️',
  circle: deco.sun,
  cross: '🩹',
  diagRight: '🛝',
  diagLeft: '🌠',
  square: '🎁',
  triangle: '🍦',
  zigzag: '⚡',
  wave: '🌊',
  loop: '🌀',
  spiral: '🐌',
};

/* ---------------- Book 2: A-is-for-Apple style letter icons ---------------- */

export const letterIcons = {
  A: '🍎', B: '⚽', C: '🐱', D: '🦆', E: '🥚', F: '🐟', G: '🍇',
  H: '🏠', I: '🍦', J: '🪼', K: '🪁', L: '🍃', M: '⛰️', N: '🪺',
  O: '🍊', P: '🍐', Q: '👑', R: '🌈', S: '☀️', T: '🏆', U: '☂️',
  V: '🏺', W: '🍉', X: '🩻', Y: '🪀', Z: '🦓',
};
