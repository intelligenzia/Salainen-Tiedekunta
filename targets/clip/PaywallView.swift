import SwiftUI
import RevenueCat

/// Single-product paywall, presented as a sheet from `ClipRootView` when the
/// user taps a locked course or the unlock bar. Calls `onUnlocked` once the
/// entitlement is active (fresh purchase or restore) so the list can reveal
/// everything in place.
struct PaywallView: View {
    /// Number of courses still gated — used for the headline.
    let lockedCount: Int
    /// Invoked when the entitlement becomes active.
    var onUnlocked: () -> Void

    @Environment(\.dismiss) private var dismiss

    @State private var package: Package?
    @State private var phase: Phase = .loading
    @State private var errorMessage: String?

    enum Phase {
        case loading
        case ready
        case purchasing
    }

    var body: some View {
        VStack(spacing: 24) {
            HStack {
                Spacer()
                Button { dismiss() } label: {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title2)
                        .foregroundStyle(.secondary)
                }
            }

            Spacer()

            Image(systemName: "graduationcap.fill")
                .font(.system(size: 64))
                .foregroundStyle(.tint)

            Text("Avaa kaikki kurssit")
                .font(.largeTitle.bold())
                .multilineTextAlignment(.center)

            Text(lockedCount > 0
                 ? "Vielä \(lockedCount) kurssia lukittuna. Avaa koko kognitiotieteen kurssikirjasto kertaostoksella."
                 : "Avaa koko kognitiotieteen kurssikirjasto kertaostoksella.")
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)

            Spacer()

            if phase == .loading {
                ProgressView()
            } else {
                purchaseButton
                restoreButton
            }

            if let errorMessage {
                Text(errorMessage)
                    .font(.footnote)
                    .foregroundStyle(.red)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }

            Spacer()
        }
        .padding()
        .task { await loadOffering() }
    }

    // MARK: - Subviews

    private var purchaseButton: some View {
        Button { Task { await purchase() } } label: {
            HStack {
                if phase == .purchasing {
                    ProgressView().tint(.white)
                } else {
                    Text(buyTitle)
                }
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(.tint, in: RoundedRectangle(cornerRadius: 14))
            .foregroundStyle(.white)
            .font(.headline)
        }
        .disabled(package == nil || phase == .purchasing)
        .padding(.horizontal, 24)
    }

    private var restoreButton: some View {
        Button("Palauta ostokset") { Task { await restore() } }
            .font(.subheadline)
            .disabled(phase == .purchasing)
    }

    private var buyTitle: String {
        if let price = package?.storeProduct.localizedPriceString {
            return "Osta \(price)"
        }
        return "Osta"
    }

    // MARK: - RevenueCat

    private func loadOffering() async {
        do {
            let offerings = try await Purchases.shared.offerings()
            let offering = RevenueCatConfig.offeringID.flatMap { offerings.offering(identifier: $0) }
                ?? offerings.current
            guard let package = offering?.availablePackages.first else {
                errorMessage = "Tuotetta ei löytynyt. Tarkista RevenueCat-tarjous."
                phase = .ready
                return
            }
            self.package = package
            phase = .ready
        } catch {
            errorMessage = error.localizedDescription
            phase = .ready
        }
    }

    private func purchase() async {
        guard let package else { return }
        phase = .purchasing
        errorMessage = nil
        do {
            let result = try await Purchases.shared.purchase(package: package)
            if result.userCancelled {
                phase = .ready
                return
            }
            apply(result.customerInfo)
        } catch {
            errorMessage = error.localizedDescription
            phase = .ready
        }
    }

    private func restore() async {
        phase = .purchasing
        errorMessage = nil
        do {
            apply(try await Purchases.shared.restorePurchases())
        } catch {
            errorMessage = error.localizedDescription
            phase = .ready
        }
    }

    private func apply(_ info: CustomerInfo) {
        if info.entitlements[RevenueCatConfig.entitlementID]?.isActive == true {
            onUnlocked()
        } else {
            phase = .ready
            errorMessage = "Ostos ei aktivoinut käyttöoikeutta."
        }
    }
}
