export const SITE_URL = 'https://tiedekunta.com';
export const SITE_NAME = 'Salainen Tiedekunta';
export const SITE_DESCRIPTION = 'Helsingin yliopiston kognitiotieteen opintopiiri. Perustettu 1998.';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function createPageMeta(meta: PageMeta) {
  const fullTitle = meta.title.includes(SITE_NAME) ? meta.title : `${meta.title} - ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${meta.path}`;

  return {
    title: fullTitle,
    description: meta.description,
    canonical: canonicalUrl,
    openGraph: {
      title: fullTitle,
      description: meta.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: meta.type || 'website',
      locale: 'fi_FI',
      image: meta.image || `${SITE_URL}/og-image.png`,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: fullTitle,
      description: meta.description,
      image: meta.image || `${SITE_URL}/og-image.png`,
    },
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Sal. tdk.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon.png`,
    width: 512,
    height: 512,
  },
  description: SITE_DESCRIPTION,
  foundingDate: '1998',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Helsinki',
    addressCountry: 'FI',
  },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Helsingin yliopisto',
    url: 'https://www.helsinki.fi',
  },
  sameAs: ['https://www.helsinki.fi'],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'fi',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/courses?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createCourseSchema(course: {
  name: string;
  courseId?: string;
  description?: string;
  ects?: number;
  teachers?: { name: string; slug: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}/courses/${course.courseId}`,
    name: course.name,
    courseCode: course.courseId,
    description: course.description || `${course.name} - ${course.ects} opintopistettä`,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    numberOfCredits: course.ects,
    educationalCredentialAwarded: `${course.ects} ECTS`,
    inLanguage: 'fi',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: `PT${(course.ects || 5) * 27}H`,
    },
    ...(course.teachers?.length && {
      instructor: course.teachers.map((t) => ({
        '@type': 'Person',
        name: t.name,
        url: `${SITE_URL}/teachers/${t.slug}`,
      })),
    }),
  };
}

export function createPersonSchema(person: {
  name: string;
  slug: string;
  jobTitle?: string;
  email?: string;
  description?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/teachers/${person.slug}`,
    name: person.name,
    url: `${SITE_URL}/teachers/${person.slug}`,
    jobTitle: person.jobTitle || 'Professori',
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    ...(person.email && { email: `mailto:${person.email}` }),
    ...(person.description && { description: person.description }),
    ...(person.image && {
      image: {
        '@type': 'ImageObject',
        url: person.image,
      },
    }),
  };
}

export function createStudyProgramSchema(program: {
  name: string;
  slug: string;
  description?: string;
  courses?: { name: string; courseId: string }[];
  totalCredits?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    '@id': `${SITE_URL}/majors/${program.slug}`,
    name: program.name,
    url: `${SITE_URL}/majors/${program.slug}`,
    description: program.description || `${program.name} - opintokokonaisuus`,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    educationalProgramMode: 'full-time',
    timeToComplete: 'P3Y',
    numberOfCredits: {
      '@type': 'StructuredValue',
      value: program.totalCredits || 180,
      unitText: 'ECTS',
    },
    ...(program.courses?.length && {
      hasCourse: program.courses.map((c) => ({
        '@type': 'Course',
        '@id': `${SITE_URL}/courses/${c.courseId}`,
        name: c.name,
        courseCode: c.courseId,
      })),
    }),
  };
}

export function createItemListSchema(
  name: string,
  items: { name: string; url: string; position?: number }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

