import { useIsFocused } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';
import { createPageMeta, type PageMeta } from '@/lib/seo';

interface SEOProps extends Omit<PageMeta, 'path'> {
  path: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
}

/**
 * Page metadata for the web. React 19 hoists these elements into <head>,
 * including during streaming SSR. Only the focused screen renders them so
 * screens kept alive by tabs don't add duplicate titles.
 */
export function SEO(props: SEOProps) {
  if (Platform.OS !== 'web') return null;
  return <FocusedSEO {...props} />;
}

const subscribeNoop = () => () => {};

function FocusedSEO({ jsonLd, noIndex, ...meta }: SEOProps) {
  const focused = useIsFocused();
  // Render on the hydration pass regardless, so it matches the server output;
  // drop unfocused screens only afterwards.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (mounted && !focused) return null;

  const { title, description, canonical, openGraph, twitter } = createPageMeta(meta);

  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta
        name="robots"
        content={noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      
      <meta property="og:title" content={openGraph.title} />
      <meta property="og:description" content={openGraph.description} />
      <meta property="og:url" content={openGraph.url} />
      <meta property="og:site_name" content={openGraph.siteName} />
      <meta property="og:type" content={openGraph.type} />
      <meta property="og:locale" content={openGraph.locale} />
      <meta property="og:image" content={openGraph.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={openGraph.imageAlt} />
      <meta property="og:image:type" content="image/png" />

      
      <meta name="twitter:card" content={twitter.card} />
      <meta name="twitter:title" content={twitter.title} />
      <meta name="twitter:description" content={twitter.description} />
      <meta name="twitter:image" content={twitter.image} />
      <meta name="twitter:image:alt" content={openGraph.imageAlt} />

      
      {meta.type === 'article' && meta.publishedTime && (
        <meta property="article:published_time" content={meta.publishedTime} />
      )}
      {meta.type === 'article' && meta.modifiedTime && (
        <meta property="article:modified_time" content={meta.modifiedTime} />
      )}
      {meta.type === 'article' && meta.author && (
        <meta property="article:author" content={meta.author} />
      )}

      
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
