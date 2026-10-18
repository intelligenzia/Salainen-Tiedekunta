/**
 * Native deep-link normalization for the PARENT React Native app.
 *
 * Important: this does NOT run inside the App Clip — the Clip is pure SwiftUI
 * (exportJs:false), so it reads its invocation URL natively via
 * `onContinueUserActivity` in `targets/clip/ClipApp.swift`. This handler matters
 * for the full app, e.g. when a user who already installed it follows a
 * tiedekunta.com universal link or the App Clip "default" invocation that
 * proxies through `appclip.apple.com`.
 */
export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): string {
  try {
    const url = new URL(path);

    // App Clip "default" experience links open via Apple's proxy host with the
    // real destination carried in the `url` query param. Unwrap it.
    if (url.hostname === "appclip.apple.com") {
      const target = url.searchParams.get("url");
      if (target) {
        const targetUrl = new URL(target);
        return targetUrl.pathname + targetUrl.search;
      }
    }

    return path;
  } catch {
    // Malformed URL — fall back to the home route rather than crashing.
    return "/";
  }
}
