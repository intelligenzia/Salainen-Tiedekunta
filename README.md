# tiedekunta.com

Website for Salainen Tiedekunta, a cognitive science study circle at the University of Helsinki.

## Tech Stack

- **Framework**: Expo SDK 58, Expo Router (iOS + Android + web, SSR)
- **Styling**: Uniwind (Tailwind CSS v4); design tokens in `global.css`
- **CMS**: Contentful (REST API)
- **Deployment**: Netlify (server-side rendering via a Netlify Function)
- **Runtime**: Bun

## Development

```bash
bun install
bun start --web
```

## Environment Variables

Create a `.env` file:

```
EXPO_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## Project Structure

```
app/
├── (tabs)/(home)/      # Home page (/)
├── +html.tsx           # HTML template with global meta tags
├── sitemap.xml+api.ts  # Dynamic sitemap generation
├── robots.txt+api.ts   # robots.txt
├── courses/            # Course listing and details
├── majors/             # Study programs
└── teachers/           # Faculty members
```

## Deployment

Configured for Netlify (`netlify.toml`). The build runs `bun run build`
(`expo export -p web`); static files are served from `dist/client`, and every
route is rendered by `netlify/functions/server.mjs` using the server bundle in
`dist/server`. Set `EXPO_PUBLIC_CONTENTFUL_SPACE_ID` and
`EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN` in the site's environment variables.

```bash
netlify deploy --build          # preview
netlify deploy --build --prod   # production
```

## Content Types (Contentful)

- **Course**: courseId, name, ects, description, teacher
- **Major**: name, slug, introduction, courses
- **Teacher**: name, slug, avatar

## iOS

```bash
npx expo prebuild -p ios --clean
npx expo run:ios --configuration Release
```

UI is built from `components/kit`, which has one implementation per platform:
SwiftUI on iOS (`index.ios.tsx`), Jetpack Compose on Android
(`index.android.tsx`), both via `@expo/ui`, and React Native Web on the web
(`index.tsx`). `plugins/with-pods-deployment-target.js` keeps Xcode 27 happy.

App Store screenshots are generated with goldie: `goldie/goldie.config.ts`
and the `store-*` flows in `.argent/flows`. Release steps are in
`docs/PRODUCTION_PLAN.md`.
