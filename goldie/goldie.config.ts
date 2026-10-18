// App Store screenshots and preview for tiedekunta.com, rendered by goldie.
// Flows live in ../.argent/flows (store-*.yaml).

const APP_ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

const config = {
  appRoot: APP_ROOT,
  // Release simulator build: see docs/PRODUCTION_PLAN.md for the build command
  appPath: `${APP_ROOT}/ios/build_app/Build/Products/Release-iphonesimulator/tiedekuntacom.app`,
  bundleId: 'com.tiedekunta.app',

  devices: ['iphone-6.9'],
  locales: ['fi'],
  appearance: 'light',

  frame: { variant: '17-pro-silver' },

  theme: {
    background: 'linear-gradient(170deg, #F5F1E8 0%, #EFE8DA 60%, #E9DFCC 100%)',
    headlineColor: '#1D1A16',
    subheadColor: '#4A443B',
    fontFamily: 'Merriweather',
    copyHeightRatio: 0.24,
    deviceWidthRatio: 0.84,
    template: 'uniform',
    layout: 'classic',
    decorations: [],
  },

  store: {
    name: 'Salainen Tiedekunta',
    subtitle: { fi: 'Kognitiotieteen opinto-opas' },
    developer: 'Salainen Tiedekunta',
    category: 'Opetus',
    rating: 4.8,
    ratingCount: '120 arviota',
    ageRating: '12+',
    price: 'Ilmainen',
    description: {
      fi: 'Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen opintopiiri. Sovelluksessa on koko opinto-opas: kurssit, pääaineet ja opettajat.\n\nHae kursseja nimellä tai koodilla, tallenna suosikit ja lue kurssikuvaukset kokonaisuudessaan. Toimii myös tummassa tilassa.',
    },
  },

  scenes: [
    {
      kind: 'screenshot',
      id: 'home',
      flow: 'store-01-home',
      headline: { fi: 'Opinto-opas, jota ei virallisesti ole' },
      subhead: { fi: 'Salaisen Tiedekunnan kurssit taskussa.' },
    },
    {
      kind: 'screenshot',
      id: 'courses',
      flow: 'store-02-courses',
      headline: { fi: '93 kurssia, yksi haku' },
      subhead: { fi: 'Etsi nimellä tai koodilla, tallenna suosikit.' },
    },
    {
      kind: 'screenshot',
      id: 'course',
      flow: 'store-03-course',
      headline: { fi: 'Koko kurssikuvaus' },
      subhead: { fi: 'Opettajat ja pääaineet samalla sivulla.' },
    },
    {
      kind: 'screenshot',
      id: 'majors',
      flow: 'store-04-majors',
      headline: { fi: 'Valitse pääaineesi' },
      subhead: { fi: '14 opintosuuntaa kursseineen ja opintopisteineen.' },
    },
    {
      kind: 'screenshot',
      id: 'teacher',
      flow: 'store-05-teacher',
      headline: { fi: 'Tunne opettajasi' },
      subhead: { fi: 'Ainakin ne, joiden henkilöllisyys ei ole salainen.' },
    },
    {
      kind: 'preview',
      id: 'preview',
      segments: [
        { id: 'home', flow: 'store-preview-01-home' },
        { id: 'search', flow: 'store-preview-02-search' },
        { id: 'course', flow: 'store-preview-03-course', holdSeconds: 2 },
      ],
    },
  ],
};

export default config;
