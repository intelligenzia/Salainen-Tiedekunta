# Production plan: tiedekunta.com (web + iOS)

Status as of 2026-10-13, branch `appclip-demo`.

## Where things stand

| Area | State |
|---|---|
| Stack | Expo SDK 58 (upgraded from 56), RN 0.88, @expo/ui (SwiftUI / Jetpack Compose), Expo Router with SSR (`web.output: server`) on Netlify, Contentful CDA, Uniwind |
| Web (live) | `https://tiedekunta.com` serves an empty `/` page (title empty in SSR), no favicons / OG image (all referenced files 404), AASA not deployed |
| iOS (ASC) | App `6757742510` (`com.tiedekunta.app`). Version 1.0 in *Prepare for Submission*. Only builds are 1.0.0 (1) and (2), both **expired**. en-US localization has keywords only: no description, screenshots, privacy policy URL or age rating answers |
| App Clip | `targets/clip` (RevenueCat paywall demo). Placeholder Team ID, RevenueCat key and App Store ID. **Not shippable as-is** |
| Content | 93 courses (all with descriptions), 14 majors, 6 teachers (all with avatars) |
| Branch | Large uncommitted working tree on `appclip-demo`; `main` is behind |

### Problems found

1. **Fabricated content in the UI.** Every course page showed the same invented workload (133 h), schedule ("Syksy 2024"), learning outcomes, grading split and parent programme. Teacher pages invented an email (`firstname.lastname@tiedekunta.fi`), office and research areas. Major pages invented a 25/35/60 op structure. Lists fell back to fake placeholder courses on network errors. This would mislead users and is an App Review risk (2.1 / 5.1.1 for the invented emails). **Fixed** — UI now shows only Contentful data, with honest loading, empty and error states.
2. **`/` rendered nothing on SSR** (it was a client-side redirect to `/home`). **Fixed** by moving home into a `(home)` group.
3. **Theme toggle didn't reach Uniwind** on native, so `dark:` classes ignored the in-app setting. **Fixed** (`Uniwind.setTheme`).
4. **iOS app crashed on launch with Xcode 27 / iOS 27 SDK** ("UIScene life cycle is required for apps built with this SDK"), and the build itself failed (pods targeting < iOS 15, an `expo-modules-jsi` Swift error). **Fixed**: upgraded to SDK 58 (its template adopts the scene life cycle) plus `plugins/with-pods-deployment-target.js`.
6. **Large titles rendered blank** on iOS 26+ with an opaque header. **Fixed** with a transparent large-title header (`lib/navigation.ts`).
7. **Web list pages pre-rendered empty** (no data in HTML for crawlers). **Fixed** with route `loader`s (`unstable_useServerDataLoaders`) feeding React Query's initial data; Contentful 429s during the build are retried.
5. **Web header used `@expo/ui` native buttons**, which render as default blue system buttons on web, and a fixed mobile bottom bar. **Replaced.**

## UI work done

New visual identity, "confidential study guide": warm paper background, ink text, a rubber-stamp red accent, Fraunces serif for display type, monospace course codes. Tokens live in `global.css` (light + dark).

- Shared building blocks: `components/ui/screen.tsx`, `editorial.tsx`, `rows.tsx`, `controls.tsx`, `states.tsx`, `components/RichText.tsx`
- Native: large-title headers in the brand font, red tint on tabs and back buttons, native search bars, link previews + long-press menus (favourite, share) on course rows, header favourite/share on course pages
- Web: sticky translucent header, breadcrumb trail, footer with legal links on every page, real search field with `/` shortcut
- Course pages render the Contentful rich-text description, the real teachers, and the majors that include the course
- Major pages show real course count and credit totals; teacher pages show avatar and real courses
- Generated web icon set, manifest colours and a 1200×630 OG image in `public/`

## Remaining plan

### 1. Decisions needed (owner)

- [ ] **App Clip**: ship v1.0 *without* the Clip (recommended), or finish RevenueCat setup first. Shipping it requires the Team ID, an `appl_` key, an IAP product, Clip experience in ASC, and the AASA deployed.
- [ ] **Content review**: some course/major names and teacher names are crude humour, and teacher avatars look like stock photos of real people. Confirm rights to the photos, and answer the age-rating questionnaire honestly (likely 12+ for "mature/suggestive themes" and "crude humor").
- [ ] **Legal copy**: Terms say course data comes from "Helsingin yliopiston julkisista lähteistä" and the contact is `info@tiedekunta.fi`. Both look wrong for a parody site on `.com`. Terms also say no data is collected; keep that true if analytics are added on Netlify.
- [ ] **App icon**: current icon is a plain wordmark on white with baked rounded corners. A new icon in the new identity is recommended before screenshots.

### 2. Repo hygiene

- [ ] Commit the work in logical commits; merge `appclip-demo` into `main` (or split the Clip into its own branch if it is not shipping)
- [ ] Remove dead code: `lib/useColorScheme.tsx`, `lib/hooks/useFavoritesMutation.ts`, `lib/hooks/useKeyboardNavigation.ts` keyboard-list hook (only the search shortcut is used), `@expo/ui` dependency
- [ ] Update README (NativeWind → Uniwind, deploy steps)

### 3. Web production

- [ ] `bun run build` locally and smoke-test `dist/` with `npx expo serve`
- [ ] Verify SSR loaders populate detail pages for crawlers (titles/meta in raw HTML for `/courses/:id`, `/majors/:slug`, `/teachers/:slug`)
- [ ] Create the Netlify site and point `tiedekunta.com` DNS at it; deploy a preview and check: `/`, list + detail pages, `/sitemap.xml`, `/robots.txt`, `/.well-known/apple-app-site-association` (served as JSON), `og-image.png`, favicons
- [ ] Decide on analytics (Netlify Analytics is server-side and needs no script)
- [ ] Set Contentful env vars on Netlify (all deploy contexts); they are inlined at build time
- [ ] Promote to production; run Lighthouse and the `seo-audit` skill against the live site

### 4. iOS release (ASC CLI + goldie)

1. **Config**: real `appleTeamId` in `app.json`; bump `version` to 1.0.0 matching ASC; decide on Clip (remove `@bacons/apple-targets` plugin from the production config if not shipping it)
2. **Build**: `eas build -p ios --profile production` (or local `xcodebuild archive` via `asc-xcode-build`); upload with `eas submit` / `asc publish`
3. **TestFlight**: internal testing on device (dark mode, Dynamic Type, offline, deep links from `tiedekunta.com/courses/...`)
4. **Screenshots**: done with goldie (`goldie/goldie.config.ts`, flows in `.argent/flows/store-*.yaml`): six 6.9" PNGs and a 22 s preview video in `goldie/out/`, all passing `goldie verify`. Re-run `capture` after the icon/copy decisions, then upload with `asc screenshots` / `asc video-previews`
5. **Metadata** with `asc`: switch primary locale to Finnish (or add `fi`), description, subtitle, keywords, promotional text, support URL, marketing URL, **privacy policy URL** (required), category Education, copyright
6. **Compliance**: age rating questionnaire, App Privacy ("Data Not Collected" if the native app keeps no analytics), export compliance already `usesNonExemptEncryption: false`, content rights
7. **Submit**: `asc submit` for review with phased release; monitor with `asc status`

### 5. After launch

- Real App Store ID into `app/+html.tsx` (`apple-itunes-app` smart banner)
- Crash reporting (Sentry or similar) and basic analytics, with privacy labels updated to match
