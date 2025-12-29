import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fi">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Primary Meta Tags */}
        <meta name="title" content="Salainen Tiedekunta - Helsingin yliopiston kognitiotieteen opintopiiri" />
        <meta name="description" content="Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio." />
        <meta name="keywords" content="kognitiotiede, Helsingin yliopisto, opintopiiri, kurssit, opetus, tutkimus" />
        <meta name="author" content="Salainen Tiedekunta" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Salainen Tiedekunta" />
        <meta property="og:locale" content="fi_FI" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Theme */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Disable body scrolling on web */}
        <ScrollViewStyleReset />

        {/* Custom fonts and styles can be added here */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          #root {
            display: flex;
            flex-direction: column;
            height: 100%;
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
