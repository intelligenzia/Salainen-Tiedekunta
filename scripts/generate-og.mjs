// Renders Open Graph images (1200×630) into dist/client/og after `expo export`:
// one for the site, one per section and one per course, major and teacher.
// Page metadata points at them through ogImage() in lib/seo.ts.
import { Resvg } from '@resvg/resvg-js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { COLORS, markSvg } from './brand-mark.mjs';

const require = createRequire(import.meta.url);
const OUT = join(import.meta.dirname, '..', 'dist', 'client', 'og');
const W = 1200;
const H = 630;
const PAD = 80;

const fontFiles = [
  require.resolve('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
  require.resolve('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
  require.resolve('@expo-google-fonts/ibm-plex-mono/500Medium/IBMPlexMono_500Medium.ttf'),
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy word wrap using an average glyph width for Inter Bold. */
function wrap(text, size, maxWidth, maxLines) {
  const perLine = Math.floor(maxWidth / (size * 0.56));
  const lines = [];
  let line = '';
  for (const word of text.trim().split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > perLine && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

function card({ kicker, title, meta, image }) {
  const textWidth = image ? W - PAD * 2 - 280 : W - PAD * 2;
  let size = 76;
  let lines = wrap(title, size, textWidth, 3);
  if (lines.length === 3) {
    size = 62;
    lines = wrap(title, size, textWidth, 3);
  }
  const lineHeight = Math.round(size * 1.1);
  // Centre the kicker + title + meta block between the header and the footer rule
  const capHeight = size * 0.75;
  const blockHeight = 40 + capHeight + (lines.length - 1) * lineHeight + (meta ? 60 : 0);
  const titleTop = Math.round(150 + (390 - blockHeight) / 2 + 40 + capHeight);
  const lastLine = titleTop + (lines.length - 1) * lineHeight;
  const titleSvg = lines
    .map((l, i) => `<text x="${PAD}" y="${titleTop + i * lineHeight}" font-family="Inter" font-weight="700" font-size="${size}" fill="${COLORS.paper}" letter-spacing="-1.5">${esc(l)}</text>`)
    .join('\n');
  const metaY = lastLine + 60;
  const mark = markSvg(44, { tile: false }).replace(/<\/?svg[^>]*>/g, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="mono"><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="${COLORS.ink}"/>
  <rect width="${W}" height="44" fill="#000"/>
  <text x="${PAD}" y="29" font-family="IBM Plex Mono" font-size="16" fill="${COLORS.paper}" letter-spacing="4">LUOKITELTU</text>
  <text x="${W - PAD}" y="29" text-anchor="end" font-family="IBM Plex Mono" font-size="16" fill="${COLORS.stamp}" letter-spacing="4">PÄÄSY VAIN VALTUUTETUILLE</text>
  <g transform="translate(${PAD - 4} 92)">${mark}</g>
  <text x="${PAD + 52}" y="122" font-family="IBM Plex Mono" font-size="22" fill="${COLORS.paper}" letter-spacing="3">SAL·TDK</text>
  ${kicker ? `<rect x="${PAD}" y="${titleTop - capHeight - 44}" width="10" height="10" fill="${COLORS.stamp}"/>
  <text x="${PAD + 22}" y="${titleTop - capHeight - 34}" font-family="IBM Plex Mono" font-size="20" fill="${COLORS.stamp}" letter-spacing="4">${esc(kicker.toUpperCase())}</text>` : ''}
  ${titleSvg}
  ${meta ? `<text x="${PAD}" y="${metaY}" font-family="IBM Plex Mono" font-size="24" fill="${COLORS.muted}" letter-spacing="1">${esc(meta)}</text>` : ''}
  ${image ? `<rect x="${W - PAD - 240}" y="${Math.round(150 + (390 - 240) / 2)}" width="240" height="240" fill="#000"/>
  <image x="${W - PAD - 240}" y="${Math.round(150 + (390 - 240) / 2)}" width="240" height="240" preserveAspectRatio="xMidYMid slice" xlink:href="${image}" filter="url(#mono)"/>
  <rect x="${W - PAD - 240}" y="${Math.round(150 + (390 - 240) / 2)}" width="240" height="240" fill="none" stroke="${COLORS.paper}" stroke-width="2"/>` : ''}
  <rect x="${PAD}" y="${H - 86}" width="${W - PAD * 2}" height="1" fill="${COLORS.rule}"/>
  <text x="${PAD}" y="${H - 44}" font-family="IBM Plex Mono" font-size="20" fill="${COLORS.muted}" letter-spacing="2">TIEDEKUNTA.COM</text>
  <rect x="${W - PAD - 300}" y="${H - 62}" width="170" height="22" fill="${COLORS.rule}"/>
  <rect x="${W - PAD - 116}" y="${H - 62}" width="116" height="22" fill="${COLORS.rule}"/>
</svg>`;
}

function render(file, props) {
  const path = join(OUT, file);
  mkdirSync(dirname(path), { recursive: true });
  const png = new Resvg(card(props), {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    fitTo: { mode: 'width', value: W },
  })
    .render()
    .asPng();
  writeFileSync(path, png);
}

async function contentful(query) {
  const space = process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID;
  const token = process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (!space || !token) throw new Error('Contentful env vars missing');
  const res = await fetch(`https://cdn.contentful.com/spaces/${space}/environments/master/entries?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Contentful ${res.status}`);
  return res.json();
}

async function dataUri(url) {
  const res = await fetch(url);
  if (!res.ok) return undefined;
  const type = res.headers.get('content-type') || 'image/jpeg';
  return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`;
}

const plural = (n) => `${n} ${n === 1 ? 'kurssi' : 'kurssia'}`;

render('default.png', { kicker: 'Arkisto · luokiteltu', title: 'Salainen Tiedekunta', meta: 'Kognitiotieteen opinto-opas vuodesta 1998' });
render('courses.png', { kicker: 'Arkisto · kurssit', title: 'Kurssit', meta: 'Koko opinto-opas, haettavissa' });
render('majors.png', { kicker: 'Arkisto · osastot', title: 'Pääaineet', meta: 'Osastot ja niiden opintokokonaisuudet' });
render('teachers.png', { kicker: 'Henkilöstötiedostot', title: 'Opettajat', meta: 'Osa henkilöllisyyksistä on salattu' });

try {
  const [courses, majors, teachers] = await Promise.all([
    contentful('content_type=course&limit=1000&include=0'),
    contentful('content_type=major&limit=1000&include=0'),
    contentful('content_type=teacher&limit=1000&include=1'),
  ]);
  const ects = new Map(courses.items.map((c) => [c.sys.id, c.fields.ects || 0]));

  for (const c of courses.items) {
    const code = c.fields.courseId || c.sys.id;
    render(`courses/${c.sys.id}.png`, { kicker: `Tiedosto ${code} · salainen`, title: c.fields.name, meta: `${c.fields.ects} op` });
  }
  for (const m of majors.items) {
    const links = m.fields.courses ?? [];
    const credits = links.reduce((sum, l) => sum + (ects.get(l.sys.id) || 0), 0);
    render(`majors/${m.sys.id}.png`, { kicker: 'Osasto · pääaine', title: m.fields.name, meta: `${plural(links.length)} · ${credits} op` });
  }
  const assets = new Map((teachers.includes?.Asset ?? []).map((a) => [a.sys.id, a.fields.file?.url]));
  for (const t of teachers.items) {
    const url = t.fields.avatar && assets.get(t.fields.avatar.sys.id);
    const image = url ? await dataUri(`https:${url}?w=480&h=480&fit=thumb&f=face&fm=jpg`) : undefined;
    render(`teachers/${t.sys.id}.png`, { kicker: 'Henkilöstötiedosto', title: t.fields.name || t.fields.slug, image });
  }
  console.log(`OG images: 4 static, ${courses.items.length} courses, ${majors.items.length} majors, ${teachers.items.length} teachers`);
} catch (error) {
  // Pages fall back to the section image; don't fail the deploy over it
  console.warn('OG images: content images skipped:', error.message);
}
