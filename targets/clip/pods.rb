# Pods for the App Clip target (`targets/clip`).
#
# NOTE: the @bacons/apple-targets README says to put this at the repo ROOT, but
# the actual Podfile loader globs `targets/**/pods.rb` and names the pod target
# after the containing directory ("clip"). So it MUST live here, not at the root.
#
# This is the CNG-friendly way to add RevenueCat to the Clip: it survives
# `expo prebuild --clean` (the manual "Add Package Dependencies" SPM route in
# Xcode does NOT — it lives in the regenerated .xcodeproj). See appclip-notes.md.
pod 'RevenueCat', '~> 5.0'
