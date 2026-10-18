// Generates the native app icon, Android adaptive icon layers and splash image
// from the brand mark. Run with `node scripts/generate-app-icons.mjs`.
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { COLORS, markSvg } from './brand-mark.mjs';

const out = (file) => join(import.meta.dirname, '..', 'assets', 'images', file);
const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
const inner = (size) => markSvg(size, { tile: false }).replace(/<\/?svg[^>]*>/g, '');

// Draws the mark scaled to `scale` of a canvas, centred, on an optional background
function canvas(size, scale, background, { mono = false } = {}) {
  const offset = (size * (1 - scale)) / 2;
  let mark = inner(size);
  if (mono) mark = mark.replaceAll(COLORS.stamp, '#ffffff').replaceAll(COLORS.paper, '#ffffff');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''}
  <g transform="translate(${offset} ${offset}) scale(${scale})">${mark}</g>
</svg>`;
}

// iOS: opaque, full-bleed square (the system applies the rounded mask)
writeFileSync(out('icon.png'), png(canvas(1024, 1.15, COLORS.ink), 1024));
// Android adaptive layers: foreground inside the 66% safe zone
writeFileSync(out('android-icon-foreground.png'), png(canvas(1024, 0.95), 1024));
writeFileSync(out('android-icon-background.png'), png(canvas(1024, 0, COLORS.ink), 1024));
writeFileSync(out('android-icon-monochrome.png'), png(canvas(1024, 0.95, undefined, { mono: true }), 1024));
// Splash: the tiled mark, so it reads on both the light and dark splash backgrounds
writeFileSync(out('splash-icon.png'), png(markSvg(512), 512));
console.log('app icons written');
