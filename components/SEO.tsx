import Head from 'expo-router/head';
import { Platform } from 'react-native';
import { SITE_NAME, SITE_URL, createPageMeta, type PageMeta } from '@/lib/seo';

interface SEOProps extends Omit<PageMeta, 'path'> {
  path: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
}

export function SEO({ jsonLd, noIndex, ...meta }: SEOProps) {
  if (Platform.OS !== 'web') return null;

  const { title, description, canonical, openGraph, twitter } = createPageMeta(meta);

  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={openGraph.title} />
      <meta property="og:description" content={openGraph.description} />
      <meta property="og:url" content={openGraph.url} />
      <meta property="og:site_name" content={openGraph.siteName} />
      <meta property="og:type" content={openGraph.type} />
      <meta property="og:locale" content={openGraph.locale} />
      <meta property="og:image" content={openGraph.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={openGraph.title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitter.card} />
      <meta name="twitter:title" content={twitter.title} />
      <meta name="twitter:description" content={twitter.description} />
      <meta name="twitter:image" content={twitter.image} />

      {/* Article-specific meta (if type is article) */}
      {meta.type === 'article' && meta.publishedTime && (
        <meta property="article:published_time" content={meta.publishedTime} />
      )}
      {meta.type === 'article' && meta.modifiedTime && (
        <meta property="article:modified_time" content={meta.modifiedTime} />
      )}
      {meta.type === 'article' && meta.author && (
        <meta property="article:author" content={meta.author} />
      )}

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  if (Platform.OS !== 'web') return null;

  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Head>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

