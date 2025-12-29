# tiedekunta.com

Website for Salainen Tiedekunta, a cognitive science study circle at the University of Helsinki.

## Tech Stack

- **Framework**: Expo Router with React Native Web
- **Styling**: NativeWind (Tailwind CSS)
- **CMS**: Contentful (REST API)
- **Deployment**: Vercel (server-side rendering)
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
├── index.tsx           # Home page
├── +html.tsx           # HTML template with global meta tags
├── sitemap.xml+api.ts  # Dynamic sitemap generation
├── robots.txt+api.ts   # robots.txt
├── courses/            # Course listing and details
├── majors/             # Study programs
└── teachers/           # Faculty members
```

## Deployment

Configured for Vercel. Push to main branch or run:

```bash
vercel
```

## Content Types (Contentful)

- **Course**: courseId, name, ects, description, teacher
- **Major**: name, slug, introduction, courses
- **Teacher**: name, slug, avatar
