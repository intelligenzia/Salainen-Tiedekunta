import Foundation

/// Central place for the RevenueCat configuration shared by the App Clip.
///
/// The Clip uses the SAME RevenueCat project / app entry as the parent
/// tiedekunta.com app — NOT a separate one. (Creating a second RevenueCat app
/// for the `.Clip` bundle id is the #1 gotcha: the IAP key upload fails with
/// "The key is not valid or is not compatible with the Bundle ID of your app".
/// See appclip-notes.md, Phase 2.)
enum RevenueCatConfig {
    /// Public Apple SDK key from the parent app's RevenueCat project.
    /// RevenueCat → Project settings → API keys → the **Apple** public key
    /// (prefixed `appl_…`). This is safe to ship in the client.
    /// TODO: replace with the real key before building.
    static let publicAPIKey = "appl_REPLACE_WITH_PUBLIC_KEY"

    /// Entitlement identifier configured in RevenueCat that the unlock grants.
    static let entitlementID = "premium"

    /// Offering to display in the Clip's single-product paywall.
    /// `nil` falls back to the project's current/default offering.
    static let offeringID: String? = nil
}
