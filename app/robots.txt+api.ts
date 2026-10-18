import { SITE_URL } from '@/lib/seo';

export function GET(): Response {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /clearance
Disallow: /settings-tab
Disallow: /courses-tab
Disallow: /majors-tab
Disallow: /teachers-tab
Disallow: /_expo/loaders/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
