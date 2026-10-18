// The Sal·Tdk mark: a document frame with a red "classified" dot.
// Shared by the favicon generator and the OG image generator.

export const COLORS = {
  ink: '#0e0e0f',
  paper: '#eeedea',
  stamp: '#f0444f',
  muted: '#85858c',
  rule: '#2a2a2e',
};

/** Mark as SVG markup sized to `size`, optionally on a filled tile. */
export function markSvg(size, { tile = true, radius = 0.22 } = {}) {
  const s = size;
  const frame = s * 0.5; // frame width
  const stroke = Math.max(1.5, s * 0.07);
  const x = (s - frame) / 2;
  const dot = s * 0.16;
  const d = (s - dot) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  ${tile ? `<rect width="${s}" height="${s}" rx="${s * radius}" fill="${COLORS.ink}"/>` : ''}
  <rect x="${x + stroke / 2}" y="${x + stroke / 2}" width="${frame - stroke}" height="${frame - stroke}" fill="none" stroke="${COLORS.paper}" stroke-width="${stroke}"/>
  <rect x="${d}" y="${d}" width="${dot}" height="${dot}" fill="${COLORS.stamp}"/>
</svg>`;
}
