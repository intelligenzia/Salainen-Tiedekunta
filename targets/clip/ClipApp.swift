import SwiftUI
import RevenueCat

@main
struct TiedekuntaClipApp: App {
    /// The HTTPS URL the Clip was invoked with (App Clip default experience,
    /// QR/NFC/Safari banner). Captured so the paywall can react to deep context
    /// later — e.g. `tiedekunta.com/courses/<id>` could preselect a product.
    @State private var invocationURL: URL?

    init() {
        Purchases.logLevel = .debug
        Purchases.configure(withAPIKey: RevenueCatConfig.publicAPIKey)
    }

    var body: some Scene {
        WindowGroup {
            ClipRootView(invocationURL: invocationURL)
                // App Clips are launched via a web-browsing user activity that
                // carries the invocation URL. There is no React Native / Expo
                // Router here, so URL handling lives in Swift (the JS
                // `app/+native-intent.ts` only runs in the parent app).
                .onContinueUserActivity(NSUserActivityTypeBrowsingWeb) { activity in
                    invocationURL = activity.webpageURL
                }
        }
    }
}
