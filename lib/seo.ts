export const SITE_URL = 'https://tiedekunta.com';
export const SITE_NAME = 'Salainen Tiedekunta';
export const SITE_DESCRIPTION = 'Helsingin yliopiston kognitiotieteen opintopiiri. Perustettu 1998.';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  /** Absolute URL of a 1200×630 share image; see ogImage(). */
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/** Absolute URL for a path, with non-ASCII segments percent-encoded. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${encodeURI(decodeURI(path))}`;
}

/**
 * Share images rendered at build time by scripts/generate-og.mjs:
 * `ogImage()` is the site card, `ogImage('courses')` a section card and
 * `ogImage('courses', entryId)` the card for one Contentful entry.
 */
export function ogImage(section?: 'courses' | 'majors' | 'teachers', entryId?: string) {
  if (!section) return `${SITE_URL}/og/default.png`;
  return entryId ? `${SITE_URL}/og/${section}/${entryId}.png` : `${SITE_URL}/og/${section}.png`;
}

/** Trims text to a meta-description length at a word boundary. */
export function summarize(text: string, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, '').replace(/[,.;:]$/, '') + '…';
}

export function createPageMeta(meta: PageMeta) {
  const fullTitle = meta.title.includes(SITE_NAME) ? meta.title : `${meta.title} – ${SITE_NAME}`;
  const canonical = absoluteUrl(meta.path);
  const image = meta.image || ogImage();

  return {
    title: fullTitle,
    description: meta.description,
    canonical,
    openGraph: {
      title: fullTitle,
      description: meta.description,
      url: canonical,
      siteName: SITE_NAME,
      type: meta.type || 'website',
      locale: 'fi_FI',
      image,
      imageAlt: meta.imageAlt || fullTitle,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: fullTitle,
      description: meta.description,
      image,
    },
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url.replace(SITE_URL, '') || '/'),
    })),
  };
}

export function createCourseSchema(course: {
  name: string;
  courseId: string;
  description: string;
  ects?: number;
  image?: string;
  teachers?: { name: string; slug: string }[];
}) {
  const url = absoluteUrl(`/courses/${course.courseId}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': url,
    url,
    name: course.name,
    courseCode: course.courseId,
    description: course.description,
    inLanguage: 'fi',
    provider: { '@id': `${SITE_URL}/#organization` },
    ...(course.image && { image: course.image }),
    ...(course.ects && {
      numberOfCredits: course.ects,
      educationalCredentialAwarded: `${course.ects} op`,
    }),
    ...(course.teachers?.length && {
      instructor: course.teachers.map((t) => ({
        '@type': 'Person',
        '@id': absoluteUrl(`/teachers/${t.slug}`),
        name: t.name,
        url: absoluteUrl(`/teachers/${t.slug}`),
      })),
    }),
  };
}

export function createPersonSchema(person: {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}) {
  const url = absoluteUrl(`/teachers/${person.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': url,
    url,
    name: person.name,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    ...(person.description && { description: person.description }),
    ...(person.image && { image: person.image }),
  };
}

export function createStudyProgramSchema(program: {
  name: string;
  slug: string;
  description: string;
  courses?: { name: string; courseId: string }[];
  totalCredits?: number;
}) {
  const url = absoluteUrl(`/majors/${program.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    '@id': url,
    url,
    name: program.name,
    description: program.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    ...(program.totalCredits && {
      numberOfCredits: { '@type': 'StructuredValue', value: program.totalCredits, unitText: 'op' },
    }),
    ...(program.courses?.length && {
      hasCourse: program.courses.map((c) => ({
        '@type': 'Course',
        '@id': absoluteUrl(`/courses/${c.courseId}`),
        name: c.name,
        courseCode: c.courseId,
      })),
    }),
  };
}

export function createItemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url.replace(SITE_URL, '') || '/'),
    })),
  };
}
