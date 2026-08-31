// Small, friendly flat-SVG icon library used across the worksheets.
// Every icon is a self-contained <svg viewBox="0 0 100 100"> so it can be
// dropped anywhere and scaled purely with CSS width/height.

const svg = (inner, vb = '0 0 100 100') =>
  `<svg viewBox="${vb}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

/* ---------------- decorative corner / badge icons ---------------- */

export const deco = {
  sun: svg(`
    <g stroke="#e0a11e" stroke-width="4" stroke-linecap="round">
      <line x1="50" y1="4" x2="50" y2="16"/>
      <line x1="50" y1="84" x2="50" y2="96"/>
      <line x1="4" y1="50" x2="16" y2="50"/>
      <line x1="84" y1="50" x2="96" y2="50"/>
      <line x1="17" y1="17" x2="25" y2="25"/>
      <line x1="75" y1="75" x2="83" y2="83"/>
      <line x1="17" y1="83" x2="25" y2="75"/>
      <line x1="75" y1="25" x2="83" y2="17"/>
    </g>
    <circle cx="50" cy="50" r="26" fill="#ffc857" stroke="#e0a11e" stroke-width="4"/>
    <circle cx="42" cy="45" r="3.2" fill="#8a5a1e"/>
    <circle cx="58" cy="45" r="3.2" fill="#8a5a1e"/>
    <path d="M40 58 Q50 68 60 58" stroke="#8a5a1e" stroke-width="4" fill="none" stroke-linecap="round"/>
  `),
  cloud: svg(`
    <path d="M25 65 a16 16 0 0 1 4-31 a20 20 0 0 1 38-6 a15 15 0 0 1 8 29 z"
      fill="#eaf1fb" stroke="#7bb8f0" stroke-width="4" stroke-linejoin="round"/>
  `),
  star: svg(`
    <path d="M50 6 L61 38 L96 38 L67 58 L78 92 L50 71 L22 92 L33 58 L4 38 L39 38 Z"
      fill="#ffc857" stroke="#e0a11e" stroke-width="4" stroke-linejoin="round"/>
  `),
  heart: svg(`
    <path d="M50 88 C10 62 6 34 26 22 C38 15 48 22 50 30 C52 22 62 15 74 22 C94 34 90 62 50 88 Z"
      fill="#f6a6c1" stroke="#dd6e97" stroke-width="4" stroke-linejoin="round"/>
  `),
  flower: svg(`
    <g fill="#f6a6c1" stroke="#dd6e97" stroke-width="3">
      <circle cx="50" cy="26" r="16"/>
      <circle cx="50" cy="74" r="16"/>
      <circle cx="26" cy="50" r="16"/>
      <circle cx="74" cy="50" r="16"/>
    </g>
    <circle cx="50" cy="50" r="15" fill="#ffc857" stroke="#e0a11e" stroke-width="3"/>
  `),
  rainbow: svg(`
    <g fill="none" stroke-linecap="round">
      <path d="M8 88 A42 42 0 0 1 92 88" stroke="#ff8b7b" stroke-width="9"/>
      <path d="M18 88 A32 32 0 0 1 82 88" stroke="#ffc857" stroke-width="9"/>
      <path d="M28 88 A22 22 0 0 1 72 88" stroke="#7bd6b0" stroke-width="9"/>
      <path d="M38 88 A12 12 0 0 1 62 88" stroke="#7bb8f0" stroke-width="9"/>
    </g>
  `),
  balloon: svg(`
    <ellipse cx="50" cy="38" rx="26" ry="32" fill="#b39ddb" stroke="#8467c7" stroke-width="4"/>
    <path d="M50 70 L50 92" stroke="#8467c7" stroke-width="3"/>
    <path d="M46 70 L50 78 L54 70 Z" fill="#8467c7"/>
  `),
  pencil: svg(`
    <g transform="rotate(45 50 50)">
      <rect x="40" y="10" width="20" height="62" rx="3" fill="#ffc857" stroke="#8a5a1e" stroke-width="3"/>
      <path d="M40 72 L50 92 L60 72 Z" fill="#e8c39e" stroke="#8a5a1e" stroke-width="3" stroke-linejoin="round"/>
      <rect x="40" y="10" width="20" height="10" fill="#f6a6c1" stroke="#8a5a1e" stroke-width="3"/>
    </g>
  `),
  present: svg(`
    <rect x="18" y="42" width="64" height="46" rx="4" fill="#7bb8f0" stroke="#3e85c9" stroke-width="4"/>
    <rect x="18" y="42" width="64" height="14" fill="#eef6ff" stroke="#3e85c9" stroke-width="4"/>
    <rect x="45" y="42" width="10" height="46" fill="#f6a6c1"/>
    <path d="M50 42 C30 20 20 34 34 42 M50 42 C70 20 80 34 66 42" fill="none" stroke="#dd6e97" stroke-width="4"/>
  `),
  check: svg(`
    <circle cx="50" cy="50" r="42" fill="#7bd6b0" stroke="#3fae83" stroke-width="4"/>
    <path d="M30 52 L44 66 L72 34" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  `),
};

/* ---------------- Book 1: line & shape "reveal" pictures ---------------- */
// Each takes the raw practised stroke and turns it into something recognisable.

export const shapePicture = {
  vertical: svg(`
    <rect x="20" y="60" width="60" height="10" rx="3" fill="#7bd6b0" stroke="#3fae83" stroke-width="3"/>
    <line x1="50" y1="10" x2="50" y2="60" stroke="#e0a11e" stroke-width="10" stroke-linecap="round"/>
    <circle cx="50" cy="10" r="10" fill="#ffc857" stroke="#e0a11e" stroke-width="3"/>
  `),
  horizontal: svg(`
    <line x1="10" y1="50" x2="90" y2="50" stroke="#7bb8f0" stroke-width="10" stroke-linecap="round"/>
    <path d="M78 38 L92 50 L78 62" fill="none" stroke="#3e85c9" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="18" cy="50" r="8" fill="#fff" stroke="#3e85c9" stroke-width="4"/>
  `),
  circle: deco.sun,
  cross: svg(`
    <rect x="42" y="12" width="16" height="76" rx="4" fill="#f6a6c1" stroke="#dd6e97" stroke-width="4"/>
    <rect x="12" y="42" width="76" height="16" rx="4" fill="#f6a6c1" stroke="#dd6e97" stroke-width="4"/>
  `),
  diagRight: svg(`
    <line x1="20" y1="20" x2="80" y2="80" stroke="#b39ddb" stroke-width="10" stroke-linecap="round"/>
    <path d="M18 12 L28 22 L18 32" fill="none" stroke="#8467c7" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="rotate(45 22 20)"/>
  `),
  diagLeft: svg(`
    <line x1="80" y1="20" x2="20" y2="80" stroke="#ff8b7b" stroke-width="10" stroke-linecap="round"/>
  `),
  square: svg(`
    <rect x="16" y="16" width="68" height="68" rx="6" fill="#eef6ff" stroke="#3e85c9" stroke-width="8"/>
    <rect x="30" y="55" width="12" height="20" fill="#7bb8f0"/>
    <rect x="46" y="45" width="12" height="30" fill="#7bb8f0"/>
    <rect x="62" y="35" width="12" height="40" fill="#7bb8f0"/>
  `),
  triangle: svg(`
    <path d="M50 12 L88 82 L12 82 Z" fill="#7bd6b0" stroke="#3fae83" stroke-width="8" stroke-linejoin="round"/>
    <rect x="42" y="82" width="16" height="12" fill="#8a5a1e"/>
  `),
  wave: svg(`
    <path d="M6 55 Q19 35 32 55 T58 55 T84 55 T110 55" fill="none" stroke="#7bb8f0" stroke-width="9" stroke-linecap="round"/>
    <path d="M4 70 Q50 60 96 70" fill="none" stroke="#3e85c9" stroke-width="4" stroke-dasharray="1 8" stroke-linecap="round"/>
  `),
  zigzag: svg(`
    <path d="M8 78 L28 30 L48 78 L68 30 L88 78" fill="none" stroke="#7bd6b0" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="28" cy="30" r="6" fill="#3fae83"/>
    <circle cx="68" cy="30" r="6" fill="#3fae83"/>
  `),
  loop: svg(`
    <path d="M14 70 C14 40 40 30 50 50 C60 70 86 60 86 30" fill="none" stroke="#b39ddb" stroke-width="9" stroke-linecap="round"/>
  `),
  spiral: svg(`
    <path d="M50 50 m0,-2 a2,2 0 1,1 -0.1,0 a8,8 0 1,1 -0.1,0 a16,16 0 1,1 -0.1,0 a24,24 0 1,1 -0.1,0 a32,32 0 1,1 -0.1,0"
      fill="none" stroke="#ff8b7b" stroke-width="6" stroke-linecap="round"/>
  `),
};

/* ---------------- Book 2: A-is-for-Apple style letter icons ---------------- */

export const letterIcons = {
  A: svg(`<circle cx="46" cy="55" r="30" fill="#ff8b7b" stroke="#e5644f" stroke-width="4"/>
    <path d="M58 30 Q70 15 78 26" fill="none" stroke="#3fae83" stroke-width="5" stroke-linecap="round"/>
    <rect x="43" y="16" width="6" height="14" rx="3" fill="#8a5a1e"/>`),
  B: svg(`<circle cx="50" cy="50" r="34" fill="#ff8b7b" stroke="#e5644f" stroke-width="4"/>
    <path d="M20 40 A34 34 0 0 1 80 40" fill="none" stroke="#fff" stroke-width="4"/>
    <path d="M18 62 A34 34 0 0 0 82 62" fill="none" stroke="#fff" stroke-width="4"/>`),
  C: svg(`<circle cx="50" cy="55" r="28" fill="#f4a03a" stroke="#c97c1e" stroke-width="4"/>
    <path d="M32 40 L26 26 L42 32 Z" fill="#f4a03a" stroke="#c97c1e" stroke-width="3" stroke-linejoin="round"/>
    <path d="M68 40 L74 26 L58 32 Z" fill="#f4a03a" stroke="#c97c1e" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="40" cy="52" r="3.4" fill="#3a3a4a"/>
    <circle cx="60" cy="52" r="3.4" fill="#3a3a4a"/>
    <path d="M46 62 L54 62 L50 68 Z" fill="#3a3a4a"/>`),
  D: svg(`<ellipse cx="50" cy="58" rx="30" ry="24" fill="#ffc857" stroke="#e0a11e" stroke-width="4"/>
    <circle cx="50" cy="34" r="18" fill="#ffc857" stroke="#e0a11e" stroke-width="4"/>
    <path d="M50 20 L62 26 L50 30 Z" fill="#e5644f"/>`),
  E: svg(`<ellipse cx="50" cy="55" rx="26" ry="34" fill="#fdf3df" stroke="#c9a34a" stroke-width="4"/>
    <circle cx="38" cy="48" r="4" fill="#c9a34a"/>
    <circle cx="60" cy="58" r="3" fill="#c9a34a"/>
    <circle cx="48" cy="68" r="3.5" fill="#c9a34a"/>`),
  F: svg(`<ellipse cx="52" cy="52" rx="34" ry="16" fill="#7bb8f0" stroke="#3e85c9" stroke-width="4"/>
    <path d="M86 52 L98 44 L98 60 Z" fill="#7bb8f0" stroke="#3e85c9" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="30" cy="48" r="3" fill="#3a3a4a"/>`),
  G: svg(`<g fill="#8467c7" stroke="#6a4fae" stroke-width="3">
    <circle cx="40" cy="55" r="12"/><circle cx="58" cy="50" r="13"/><circle cx="50" cy="70" r="12"/>
    <circle cx="66" cy="65" r="11"/><circle cx="34" cy="72" r="10"/></g>
    <path d="M55 30 Q64 18 74 24" fill="none" stroke="#3fae83" stroke-width="5" stroke-linecap="round"/>`),
  H: svg(`<path d="M12 46 L50 14 L88 46 L88 88 L12 88 Z" fill="#ff8b7b" stroke="#e5644f" stroke-width="4" stroke-linejoin="round"/>
    <rect x="42" y="62" width="16" height="26" fill="#8a5a1e"/>
    <rect x="24" y="56" width="14" height="14" fill="#eaf1fb" stroke="#e5644f" stroke-width="2.5"/>`),
  I: svg(`<path d="M38 50 L50 90 L62 50 Z" fill="#e3b57a" stroke="#a3743c" stroke-width="4" stroke-linejoin="round"/>
    <path d="M42 56 L46 78 M50 56 L50 80 M58 56 L54 78" stroke="#a3743c" stroke-width="2"/>
    <circle cx="50" cy="34" r="22" fill="#f6a6c1" stroke="#dd6e97" stroke-width="4"/>
    <circle cx="42" cy="26" r="5" fill="#fbd2e2"/>`),
  J: svg(`<rect x="34" y="16" width="32" height="46" rx="4" fill="#eaf1fb" stroke="#3e85c9" stroke-width="4"/>
    <rect x="30" y="60" width="40" height="10" rx="3" fill="#3e85c9"/>
    <ellipse cx="50" cy="38" rx="10" ry="14" fill="#f6a6c1"/>`),
  K: svg(`<path d="M50 18 L74 30 L74 58 Q74 84 50 92 Q26 84 26 58 L26 30 Z" fill="#b39ddb" stroke="#8467c7" stroke-width="4" stroke-linejoin="round"/>
    <path d="M50 20 L50 60 M38 40 L62 40" stroke="#fff" stroke-width="3"/>
    <line x1="50" y1="18" x2="50" y2="4" stroke="#8467c7" stroke-width="3"/>`),
  L: svg(`<path d="M50 12 C30 12 20 32 30 48 C18 52 12 68 24 78 C36 88 52 84 56 70 C70 78 86 68 82 52 C92 42 88 24 72 22 C68 8 54 4 50 12 Z"
    fill="#7bd6b0" stroke="#3fae83" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 30 L50 70" stroke="#3fae83" stroke-width="3"/>`),
  M: svg(`<path d="M6 82 L34 32 L52 60 L64 40 L94 82 Z" fill="#a89f8f" stroke="#79705f" stroke-width="4" stroke-linejoin="round"/>
    <path d="M28 44 L34 32 L40 44 L34 40 Z" fill="#fff"/>
    <path d="M57 50 L64 40 L71 50 L64 47 Z" fill="#fff"/>`),
  N: svg(`<ellipse cx="50" cy="65" rx="34" ry="14" fill="#c9a34a" stroke="#8a5a1e" stroke-width="4"/>
    <ellipse cx="36" cy="62" rx="8" ry="6" fill="#fdf3df" stroke="#8a5a1e" stroke-width="3"/>
    <ellipse cx="52" cy="62" rx="8" ry="6" fill="#fdf3df" stroke="#8a5a1e" stroke-width="3"/>
    <ellipse cx="66" cy="65" rx="8" ry="6" fill="#fdf3df" stroke="#8a5a1e" stroke-width="3"/>`),
  O: svg(`<circle cx="50" cy="55" r="28" fill="#f4a03a" stroke="#c97c1e" stroke-width="4"/>
    <path d="M50 27 Q56 16 66 20" fill="none" stroke="#3fae83" stroke-width="4" stroke-linecap="round"/>`),
  P: svg(`<ellipse cx="50" cy="60" rx="20" ry="26" fill="#c7e07a" stroke="#7fae2c" stroke-width="4"/>
    <ellipse cx="50" cy="42" rx="12" ry="18" fill="#d8ec9c" stroke="#7fae2c" stroke-width="4"/>
    <path d="M50 16 Q56 10 62 16" fill="none" stroke="#7fae2c" stroke-width="3"/>`),
  Q: svg(`<path d="M22 42 L22 78 L78 78 L78 42 L62 58 L50 30 L38 58 Z"
    fill="#ffc857" stroke="#e0a11e" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="22" cy="42" r="6" fill="#ff8b7b" stroke="#e0a11e" stroke-width="2"/>
    <circle cx="50" cy="30" r="6" fill="#7bd6b0" stroke="#e0a11e" stroke-width="2"/>
    <circle cx="78" cy="42" r="6" fill="#7bb8f0" stroke="#e0a11e" stroke-width="2"/>
    <circle cx="50" cy="64" r="5" fill="#dd6e97"/>`),
  R: svg(`<g fill="none" stroke="#ff8b7b" stroke-width="9" stroke-linecap="round">
    <path d="M8 30 A42 42 0 0 1 92 30"/>
    <path d="M18 45 A32 32 0 0 1 82 45"/>
    <path d="M28 60 A22 22 0 0 1 72 60"/></g>`),
  S: deco.sun,
  T: svg(`<path d="M50 14 L26 40 L38 40 L38 56 L28 90 L72 90 L62 56 L62 40 L74 40 Z" fill="#7bd6b0" stroke="#3fae83" stroke-width="4" stroke-linejoin="round"/>`),
  U: svg(`<path d="M14 52 A36 36 0 0 1 86 52 Z" fill="#7bb8f0" stroke="#3e85c9" stroke-width="4" stroke-linejoin="round"/>
    <path d="M14 52 Q20 58 26 52 Q32 58 38 52 Q44 58 50 52 Q56 58 62 52 Q68 58 74 52 Q80 58 86 52"
      fill="none" stroke="#3e85c9" stroke-width="3"/>
    <line x1="50" y1="52" x2="50" y2="86" stroke="#8a5a1e" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M50 86 Q40 92 42 82" fill="none" stroke="#8a5a1e" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="50" cy="52" r="3" fill="#e0a11e"/>`),
  V: svg(`<path d="M20 24 Q50 20 80 24 L74 62 Q50 76 26 62 Z" fill="#7bb8f0" stroke="#3e85c9" stroke-width="4" stroke-linejoin="round"/>
    <path d="M40 24 Q50 10 60 24" fill="none" stroke="#3e85c9" stroke-width="3"/>`),
  W: svg(`<path d="M50 90 L14 26 A40 40 0 0 1 86 26 Z" fill="#e5644f" stroke="#a83f2e" stroke-width="3" stroke-linejoin="round"/>
    <path d="M14 26 A40 40 0 0 1 86 26" fill="none" stroke="#7bd6b0" stroke-width="7" stroke-linecap="round"/>
    <path d="M20 32 A34 34 0 0 1 80 32" fill="none" stroke="#fdf3df" stroke-width="4"/>
    <circle cx="42" cy="50" r="2.8" fill="#3a3a4a"/><circle cx="58" cy="50" r="2.8" fill="#3a3a4a"/>
    <circle cx="50" cy="64" r="2.8" fill="#3a3a4a"/><circle cx="44" cy="72" r="2.6" fill="#3a3a4a"/>`),
  X: svg(`<g stroke="#3a3a4a" stroke-width="1.4">
    <rect x="14" y="30" width="14" height="42" rx="3" fill="#ff8b7b"/>
    <rect x="30" y="24" width="14" height="48" rx="3" fill="#ffc857"/>
    <rect x="46" y="30" width="14" height="42" rx="3" fill="#7bd6b0"/>
    <rect x="62" y="24" width="14" height="48" rx="3" fill="#7bb8f0"/></g>`),
  Y: svg(`<path d="M50 30 L50 50" stroke="#e5644f" stroke-width="3"/>
    <circle cx="50" cy="20" r="17" fill="#7bb8f0" stroke="#3e85c9" stroke-width="4"/>
    <rect x="44" y="17" width="12" height="6" rx="2" fill="#3e85c9"/>
    <circle cx="50" cy="66" r="17" fill="#ffc857" stroke="#e0a11e" stroke-width="4"/>
    <rect x="44" y="63" width="12" height="6" rx="2" fill="#e0a11e"/>`),
  Z: svg(`<rect x="14" y="14" width="72" height="72" rx="8" fill="#f4a03a" stroke="#c97c1e" stroke-width="4"/>
    <path d="M14 30 L86 30 M14 50 L86 50 M14 70 L86 70" stroke="#fff" stroke-width="6"/>`),
};
