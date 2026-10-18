# App Clip + RevenueCat — build notes (post material)

Living log of every error and friction point while adding an App Clip to
tiedekunta.com via `@bacons/apple-targets` with RevenueCat. Capture verbatim
error strings + screenshots as we go — they're the searchable gold for the post.

## Environment reality vs. the plan

The plan assumed **Expo SDK 54 / RN 0.81.5**. The repo is actually on the
bleeding edge:

| Thing | Plan said | Actually |
|-------|-----------|----------|
| Expo SDK | 54 | **56** (`expo ^56.0.12`) |
| React Native | 0.81.5 | **0.85.3** |
| Expo Router | 6 | **56.x** |
| `@bacons/apple-targets` | — | **4.0.7** (installed) |

Implications for the post:
- The RN patch from `facebook/react-native#47000` (Phase 5, item 8) targets old
  RN and almost certainly **does not apply** on 0.85.3 — footnote it.
- SDK 56 is new enough that `@bacons/apple-targets@4.0.7` compatibility is itself
  worth a sentence; flag any prebuild breakage here.
- `expo-updates` is **not installed** → Evan's "expo-updates leaks into the Clip"
  footgun (Phase 5, item 9) is N/A for this project. Note it as "couldn't
  reproduce because the parent app doesn't use expo-updates."

## Project shape that matters

- `ios/` and `android/` are **gitignored** ("generated native folders") — this is
  a clean CNG project. The Clip therefore lives entirely in `targets/clip/`;
  the regenerated `ios/` is throwaway. This is exactly the expo-apple-targets
  model and means prebuild --clean *should* be a non-event (verify — item 6).
- Web is **SSR** via `expo-server` on Vercel, with `vercel.json` rewriting
  `/(.*) → /api/index`. This bites the AASA (see Phase 4 below).

## Decisions made

- **Query persister regression: kept intentional.** Working tree drops native
  AsyncStorage persistence (native → in-memory; web → localStorage). Confirmed
  with the owner before branching; not reverting.

## Pre-work done

- Removed two stray `build-*.aab` EAS artifacts (58 MB each) + stray
  `assets/images/icon Medium.jpeg` (unreferenced).
- Branched `appclip-demo` off `main`.
- Set `ios.appleTeamId` in `app.json` (placeholder — see below).
- Installed `@bacons/apple-targets@4.0.7`, added to `plugins`.

## ⚠️ Placeholders to replace before building

| Where | Placeholder | Replace with |
|-------|-------------|--------------|
| `app.json` → `ios.appleTeamId` | `XXXXXXXXXX` | real 10-char Apple Team ID |
| `public/.well-known/apple-app-site-association` | `XXXXXXXXXX` (×2) | real Team ID |
| `targets/clip/RevenueCatConfig.swift` → `publicAPIKey` | `appl_REPLACE_WITH_PUBLIC_KEY` | parent app's Apple public SDK key |
| `targets/clip/RevenueCatConfig.swift` → `entitlementID` | `premium` | real RC entitlement id |
| `app/+html.tsx` → `apple-itunes-app` | `app-id=0000000000` | numeric App Store ID |

Also configure the test product in App Store Connect on the existing
`com.tiedekunta.app` entry: e.g. `tiedekunta_premium_unlock`, non-consumable,
sandbox tester ready; attach it to a RevenueCat offering.

## What's scaffolded

- `targets/clip/expo-target.config.js` — `type:"clip"`, `bundleIdentifier:".Clip"`,
  `deploymentTarget:"16.0"`, `exportJs:false`, associated-domains entitlement.
  (Plugin auto-injects `com.apple.developer.parent-application-identifiers`
  because we pass an `entitlements` object.)
- `targets/clip/ClipApp.swift` — `@main`, `Purchases.configure(...)`, captures
  invocation URL via `onContinueUserActivity`.
- `targets/clip/PaywallView.swift` — single-product paywall (load offering →
  purchase → unlock), restore, error display. Finnish copy ("Avaa kaikki kurssit").
- `targets/clip/RevenueCatConfig.swift` — keys/ids in one place.
- `public/.well-known/apple-app-site-association` — appclips + applinks.
- `vercel.json` — `Content-Type: application/json` header for the AASA path.
- `app/+html.tsx` — `apple-itunes-app` App Clip card meta tag.
- `app/+native-intent.ts` — unwraps `appclip.apple.com?url=` for the PARENT app.

## Phase 1 + 3 build log — IT RUNS ✅

Built and launched the Clip on an iPhone 17 Pro simulator (Xcode 26.5,
CocoaPods 1.16.2, Expo SDK 56 / RN 0.85.3). Paywall renders; RevenueCat is linked
and initialized — it rejects the placeholder key with its own error
*"There was a credentials issue... Invalid API Key."* (proof the SDK is wired,
not a build stub). Drop in the real `appl_…` key + a product and purchase works.

Two scriptable gotchas hit on the way (both great for the post):

- **`pods.rb` location: README is wrong.** README says "root of the repo." The
  actual Podfile loader globs `targets/**/pods.rb`. A root `pods.rb` is silently
  ignored. Correct path: `targets/clip/pods.rb`.
- **Pod target name must equal the target DIRECTORY name.** The loader does
  `File.basename(File.dirname(pods.rb))` → `"clip"`. Setting
  `name: "Tiedekunta Clip"` in `expo-target.config.js` made the Xcode target
  `"Tiedekunta Clip"`, so `pod install` died with
  `[!] Unable to find a target named 'clip' ... did find 'Tiedekunta Clip'`.
  Fix: omit `name` (defaults to dir name `clip`), use `displayName` for the
  user-facing label. Requires a `prebuild --clean` to re-bake the target name.
- **App Groups warning.** prebuild prints `[clip] Apple target may require the
  App Groups entitlement but none were found`. Non-fatal for launch, but App
  Groups is the mechanism for sharing data between Clip and parent — directly
  relevant to gotcha #3 (entitlement continuity). Add
  `com.apple.security.application-groups` to both when testing #3.

Commands that worked:
```
# targets/clip/pods.rb  ->  pod 'RevenueCat', '~> 5.0'
npx expo prebuild -p ios --clean
xcodebuild -workspace ios/tiedekuntacom.xcworkspace -scheme clip \
  -configuration Debug -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,id=<UDID>' -derivedDataPath ios/build_clip build
xcrun simctl install <UDID> .../clip.app
xcrun simctl launch <UDID> com.tiedekunta.app.Clip
```

## Course preview + gating (free-then-limit) ✅

The Clip now opens to a **list of courses** instead of a bare paywall: first 3
are free to browse, the rest are blurred + 🔒 and tap-to-unlock. Bottom CTA
"Avaa kaikki N kurssia" presents the paywall sheet. On purchase/restore the
entitlement check flips and the list reveals in place. Verified live: the CDA
returned **93 courses** in the simulator.

Files added: `targets/clip/ClipRootView.swift` (list + gating + paywall sheet),
`targets/clip/CourseService.swift` (Contentful CDA fetch), `PaywallView.swift`
reworked into a sheet with an `onUnlocked` callback.

More findings for the post:

- **No RN data layer in the Clip → re-implement fetch in Swift.** `lib/contentful.ts`
  is unreachable. CourseService.swift is a ~40-line native mirror of `getCourses()`
  hitting the same CDA (`content_type=course`, `select` to trim payload). Cheap,
  but it's duplicated logic — a real "the Clip is a different world" point.
- **Credentials.** Reused the public `EXPO_PUBLIC_CONTENTFUL_*` read-only CDA token
  (already in the shipped web bundle). To honor "don't commit .env", it lives in
  a **gitignored** `targets/clip/ContentfulConfig.swift`; prebuild links it from
  disk so it survives `--clean`. Template below.
- **iOS 16 vs SwiftUI APIs → bumped Clip to iOS 18.** `ContentUnavailableView` is
  iOS 17+; on `deploymentTarget:"16.0"` it failed
  (`'ContentUnavailableView' is only available in iOS 17.0 or newer`). Rather than
  shim, set the Clip's `deploymentTarget:"18.0"` (also the plugin default) and use
  the modern API directly. NOTE: this is the Clip only — the parent app is still on
  16.4 (Expo default). Raising the parent needs the `expo-build-properties` plugin
  (`ios.deploymentTarget`), a separate user-facing decision (drops iOS 16/17).
- **Adding Swift files = no pbxproj surgery.** The Clip target is an Xcode 16
  `PBXFileSystemSynchronizedRootGroup` pointing at `targets/clip/`, so new `.swift`
  files are picked up by folder sync (re-ran prebuild to be safe). Nice contrast
  to the old "drag into target / fix membership" dance.

### `targets/clip/ContentfulConfig.swift` template (gitignored — copy like .env)
```swift
import Foundation
enum ContentfulConfig {
    static let spaceID = "<EXPO_PUBLIC_CONTENTFUL_SPACE_ID>"
    static let accessToken = "<EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN>"
}
```

## Manual steps still required (can't be scripted)

1. `npx expo prebuild -p ios --clean` then `xed ios`.
2. Add RevenueCat to the **Clip target only** via SPM
   (`https://github.com/RevenueCat/purchases-ios.git`, v5.x).
3. Build/run the Clip (simulator with a `.storekit` file first, then sandbox on
   device).
4. Deploy web so the AASA is live (`bun run build` → Vercel).

---

## Gotcha checklist (fill verbatim during testing)

### RevenueCat-specific
1. **Bundle ID key error (Phase 2 cold open).** Create a 2nd RC app for
   `com.tiedekunta.app.Clip`, upload the IAP key, capture the exact
   `"The key is not valid or is not compatible with the Bundle ID of your app"`
   + screenshot, then delete it. → _status: pending_
2. **SDK size vs 10 MB limit.** Measure Clip size with/without the RC SDK.
   → _status: pending_
3. **Entitlement continuity Clip → parent.** Anonymous purchase in Clip, install
   parent, does it carry? Test anonymous appUserID vs `logIn(userID:)` matching
   both targets. → _status: pending_
4. **StoreKit 2 + Clip quirks** (sandbox/restore/transactions). → _status: pending_
5. **Working sandbox flow**, step by step. → _status: pending_

### expo-apple-targets-specific
6. **Does `prebuild --clean` preserve the Clip's Swift?** → _status: CONFIRMED yes_.
   Ran `--clean` twice; the Swift, entitlements, RevenueCat pod (via pods.rb) all
   regenerated correctly. This is the whole point of the plugin — verified.
7. **Build-number sync** — `CURRENT_PROJECT_VERSION` matches across targets.
   → _status: pending_
8. **RN patch #47000** — likely N/A on RN 0.85.3; confirm. → _status: pending_
9. **expo-updates on the Clip** — N/A, not installed in parent. → _status: confirmed N/A_
10. **Local invocation testing** — Run scheme `_XCAppClipURL` env var vs
    TestFlight vs local experience in iOS Settings → Developer. → _status: pending_

### New gotcha found while scaffolding (bonus)
11. **AASA on an SSR/Vercel host.** `vercel.json` rewrites `/(.*) → /api/index`,
    so the App Site Association file can be swallowed by the SSR function instead
    of served as static JSON. Mitigations applied: file in `public/.well-known/`
    (filesystem precedence beats the soft rewrite) + a `Content-Type:
    application/json` header. **Verify after `bun run build` that the file lands
    in `dist/client/.well-known/` (Expo's public-folder copy may skip dot-dirs)
    and that `curl -I https://tiedekunta.com/.well-known/apple-app-site-association`
    returns 200 + JSON, no redirect.** → _status: verify after deploy_
