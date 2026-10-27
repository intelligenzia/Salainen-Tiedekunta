import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const SITE_URL = 'https://tiedekunta.com';
const SITE_NAME = 'Salainen Tiedekunta';
const SITE_DESCRIPTION = 'Helsingin yliopiston kognitiotieteen opintopiiri. Perustettu 1998.';

const organizationSchema = {
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Sal. tdk.',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  image: `${SITE_URL}/og/default.png`,
  description: 'Kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio.',
  foundingDate: '1998',
  sameAs: ['https://x.com/tiedekunta'],
  address: { '@type': 'PostalAddress', addressLocality: 'Helsinki', addressCountry: 'FI' },
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: 'Sal. tdk.',
  description: SITE_DESCRIPTION,
  inLanguage: 'fi',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/courses?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export default function Root({ children }: PropsWithChildren) {
  // SDK 58 streams the bundle scripts and styles through these nodes
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();

  return (
    <html {...htmlAttributes} lang="fi">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content={SITE_NAME} />
        <meta name="twitter:site" content="@tiedekunta" />
        <meta name="theme-color" content="#09090a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#eeedea" media="(prefers-color-scheme: light)" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content="Sal. tdk." />
        <meta name="application-name" content="Sal. tdk." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" />
        <link rel="preconnect" href="https://images.ctfassets.net" />

        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [organizationSchema, websiteSchema],
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
          body {
            background-color: #eeedea;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #09090a;
            }
          }
          ::selection {
            background-color: #c1121f;
            color: #ffffff;
          }
        `}} />
        {/* Self-hosted Umami at stats.perttu.dev */}
        <script
          defer
          src='https://stats.perttu.dev/p.js'
          data-website-id='7dcb7779-6889-4484-951c-6041d958e549'
          data-domains='tiedekunta.com,www.tiedekunta.com'
        />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
