require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Salainen Tiedekunta`,
    description: `Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu
    kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä
    organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on
    muutamassa vuodessa kasvanut useita laitoksia sisältäväksi
    täysimittaiseksi tiedekunnaksi.`,
    siteUrl: `https://www.tiedekunta.com`,
    author: `@tiedekunta`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /* eslint-disable @typescript-eslint/camelcase */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Salainen Tiedekunta`,
        short_name: `Salainen Tiedekunta`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#373737`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        localeFilter: locale => locale.code === 'fi-FI',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Alfa Slab One`,
          },
          {
            family: `Domine`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-63351583-3',
        head: false,
        anonymize: true,
        respectDNT: true,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'example.com',
      },
    },
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `types/graphql-types.d.ts`,
      },
    },
    /* eslint-enable @typescript-eslint/camelcase */
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
