import { getCourses, getMajors, getTeachers } from '@/lib/contentful';

const SITE_URL = 'https://tiedekunta.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function GET(): Promise<Response> {
  const today = new Date().toISOString().split('T')[0];
  const urls: SitemapUrl[] = [];

  // Static pages
  urls.push({
    loc: SITE_URL,
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0',
  });

  urls.push({
    loc: `${SITE_URL}/courses`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
  });

  urls.push({
    loc: `${SITE_URL}/majors`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
  });

  urls.push({
    loc: `${SITE_URL}/teachers`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8',
  });

  // Dynamic pages from Contentful
  try {
    // Courses
    const courses = await getCourses();
    for (const course of courses) {
      const courseId = course.fields.courseId || course.sys.id;
      urls.push({
        loc: `${SITE_URL}/courses/${encodeURIComponent(courseId)}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }

    // Majors
    const majors = await getMajors();
    for (const major of majors) {
      const slug = major.fields.slug || major.sys.id;
      urls.push({
        loc: `${SITE_URL}/majors/${encodeURIComponent(slug)}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }

    // Teachers
    const teachers = await getTeachers();
    for (const teacher of teachers) {
      const slug = teacher.fields.slug;
      if (slug) {
        urls.push({
          loc: `${SITE_URL}/teachers/${encodeURIComponent(slug)}`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.6',
        });
      }
    }
  } catch (error) {
    console.error('Error fetching Contentful data for sitemap:', error);
  }

  const sitemap = generateSitemapXml(urls);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
