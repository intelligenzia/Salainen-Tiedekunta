import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const SITE_URL = 'https://tiedekunta.com';
const SITE_NAME = 'Salainen Tiedekunta';
const SITE_DESCRIPTION = 'Helsingin yliopiston kognitiotieteen opintopiiri. Perustettu 1998.';

const organizationSchema = {
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
  image: `${SITE_URL}/og-image.png`,
  description: 'Kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio.',
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
  areaServed: {
    '@type': 'Country',
    name: 'Finland',
  },
  knowsAbout: [
    'Kognitiotiede',
    'Neurotiede',
    'Tekoäly',
    'Kielitiede',
    'Filosofia',
    'Psykologia',
  ],
};

const websiteSchema = {
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

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
  description: 'Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio.',
  isPartOf: {
    '@id': `${SITE_URL}/#website`,
  },
  about: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'fi',
};

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fi">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Primary Meta Tags */}
        <meta name="title" content={`${SITE_NAME} - ${SITE_DESCRIPTION}`} />
        <meta name="description" content="Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio." />
        <meta name="keywords" content="kognitiotiede, Helsingin yliopisto, opintopiiri, kurssit, opetus, tutkimus, neurotiede, tekoäly, kielitiede, filosofia" />
        <meta name="author" content={SITE_NAME} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* Geo Tags */}
        <meta name="geo.region" content="FI-18" />
        <meta name="geo.placename" content="Helsinki" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="fi_FI" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={SITE_NAME} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <meta name="twitter:creator" content="@salainentdk" />
        <meta name="twitter:site" content="@salainentdk" />

        {/* Theme & Browser */}
        <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="msapplication-TileColor" content="#09090b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="format-detection" content="telephone=no" />

        {/* PWA & App Links */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sal. tdk." />
        <meta name="application-name" content="Sal. tdk." />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#09090b" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://cdn.contentful.com" />

        {/* JSON-LD Structured Data - Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [organizationSchema, websiteSchema, webPageSchema],
            }),
          }}
        />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          #root {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          ::selection {
            background-color: #27272a;
            color: #fafafa;
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
