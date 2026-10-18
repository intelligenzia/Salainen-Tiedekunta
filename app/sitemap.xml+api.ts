import { getCourses, getMajors, getTeachers } from '@/lib/contentful';
import { absoluteUrl } from '@/lib/seo';

type Entry = { sys: { updatedAt?: string } };

const day = (iso?: string) => (iso ? iso.slice(0, 10) : undefined);
const newest = (entries: Entry[]) => day(entries.map((e) => e.sys.updatedAt ?? '').sort().at(-1));

function url(path: string, lastmod?: string) {
  return `  <url>\n    <loc>${absoluteUrl(path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

/** Sitemap with real last-modified dates from Contentful. */
export async function GET(): Promise<Response> {
  const urls: string[] = [];

  try {
    const [courses, majors, teachers] = await Promise.all([getCourses(), getMajors(), getTeachers()]);
    const all = [...courses, ...majors, ...teachers];

    urls.push(url('/', newest(all)));
    urls.push(url('/courses', newest(courses)));
    urls.push(url('/majors', newest(majors)));
    urls.push(url('/teachers', newest(teachers)));
    for (const c of courses) urls.push(url(`/courses/${c.fields.courseId || c.sys.id}`, day(c.sys.updatedAt)));
    for (const m of majors) urls.push(url(`/majors/${m.fields.slug || m.sys.id}`, day(m.sys.updatedAt)));
    for (const t of teachers) if (t.fields.slug) urls.push(url(`/teachers/${t.fields.slug}`, day(t.sys.updatedAt)));
  } catch (error) {
    console.error('sitemap: Contentful unavailable', error);
    urls.push(url('/'), url('/courses'), url('/majors'), url('/teachers'));
  }

  for (const path of ['/privacy', '/terms', '/license', '/copyright', '/open-source']) urls.push(url(path));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
