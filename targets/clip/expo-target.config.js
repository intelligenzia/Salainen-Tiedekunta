/** @type {import('@bacons/apple-targets').ConfigFunction} */
module.exports = (config) => ({
  type: "clip",
  // IMPORTANT: do NOT set `name`. The pods.rb loader names the CocoaPods target
  // after the target DIRECTORY ("clip"), so the Xcode target name must match it.
  // Setting `name: "Tiedekunta Clip"` made `pod install` fail with
  // "Unable to find a target named `clip`". Omitting `name` defaults the target
  // to the dir name ("clip"); use `displayName` for the user-facing label.
  displayName: "Salainen tiedekunta",
  // Relative bundle id — the leading dot appends to the main app's bundle id,
  // producing `com.tiedekunta.app.Clip` (required: an App Clip must be a child
  // bundle id of its parent app).
  bundleIdentifier: ".Clip",
  // Targeting iOS 18 (also the plugin default) so the Clip can use modern
  // SwiftUI APIs like ContentUnavailableView without availability shims.
  deploymentTarget: "18.0",
  // Frameworks the Clip's Swift code links against. RevenueCat itself is added
  // to the Clip target via Swift Package Manager in Xcode (see appclip-notes.md).
  frameworks: ["StoreKit"],
  // NOTE: keep React Native OUT of the Clip. exportJs:true would embed the JS
  // bundle (and balloon past the 10MB uncompressed App Clip limit), so the Clip
  // stays pure SwiftUI. This is intentional — see the footnote in the post.
  exportJs: false,
  entitlements: {
    // Providing an entitlements object is what makes the plugin inject the
    // required `com.apple.developer.parent-application-identifiers` for us.
    "com.apple.developer.associated-domains": ["appclips:tiedekunta.com"],
  },
});
