// Generates the favicon set and PWA icons in public/ from the brand mark.
// Run with `node scripts/generate-favicons.mjs`; the output is committed.
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { COLORS, markSvg } from './brand-mark.mjs';

const out = (file) => join(import.meta.dirname, '..', 'public', file);
const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

// Scalable favicon for modern browsers
writeFileSync(out('favicon.svg'), markSvg(64));

for (const size of [16, 32, 48]) writeFileSync(out(`favicon-${size}x${size}.png`), png(markSvg(size), size));
writeFileSync(out('favicon.png'), png(markSvg(48), 48));

// iOS adds its own rounding, so the touch icon is a full-bleed square
writeFileSync(out('apple-touch-icon.png'), png(markSvg(180, { radius: 0 }), 180));

for (const size of [192, 512]) writeFileSync(out(`icon-${size}.png`), png(markSvg(size), size));
writeFileSync(out('icon.png'), png(markSvg(512), 512));

// Maskable icon: the mark kept inside the 80% safe zone on a full-bleed tile
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${COLORS.ink}"/>
  <g transform="translate(72 72) scale(0.72)">${markSvg(512, { tile: false }).replace(/<\/?svg[^>]*>/g, '')}</g>
</svg>`;
writeFileSync(out('icon-maskable-512.png'), png(maskable, 512));

console.log('favicons written');
