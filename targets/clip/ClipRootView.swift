import SwiftUI
import RevenueCat

/// The Clip's main screen: a teaser list of courses. The first few are free to
/// browse; the rest are locked behind the RevenueCat unlock. Tapping a locked
/// row (or the bottom CTA) presents the paywall. Once the entitlement is active
/// — whether bought here or restored from a previous purchase — everything
/// unlocks in place.
struct ClipRootView: View {
    let invocationURL: URL?

    /// How many courses to reveal for free before gating.
    private let freePreviewCount = 3

    @State private var courses: [Course] = []
    @State private var state: LoadState = .loading
    @State private var isUnlocked = false
    @State private var showPaywall = false

    enum LoadState: Equatable {
        case loading
        case loaded
        case failed(String)
    }

    var body: some View {
        NavigationStack {
            content
                .navigationTitle("Kurssit")
                .navigationBarTitleDisplayMode(.inline)
        }
        .task {
            await refreshEntitlement()
            await loadCourses()
        }
        .sheet(isPresented: $showPaywall) {
            PaywallView(lockedCount: lockedCount) {
                isUnlocked = true
                showPaywall = false
            }
        }
    }

    private var lockedCount: Int { max(0, courses.count - freePreviewCount) }

    @ViewBuilder
    private var content: some View {
        switch state {
        case .loading:
            ProgressView("Ladataan kursseja…")
        case .failed(let message):
            ContentUnavailableView {
                Label("Kursseja ei voitu ladata", systemImage: "wifi.exclamationmark")
            } description: {
                Text(message)
            } actions: {
                Button("Yritä uudelleen") { Task { await loadCourses() } }
                    .buttonStyle(.borderedProminent)
            }
        case .loaded:
            courseList
        }
    }

    private var courseList: some View {
        List {
            Section {
                ForEach(Array(courses.enumerated()), id: \.element.id) { index, course in
                    let locked = !isUnlocked && index >= freePreviewCount
                    CourseRow(course: course, locked: locked)
                        .contentShape(Rectangle())
                        .onTapGesture { if locked { showPaywall = true } }
                }
            } header: {
                Text("Salainen tiedekunta")
            } footer: {
                if !isUnlocked && lockedCount > 0 {
                    Text("Näet \(freePreviewCount) kurssia ilmaiseksi. Avaa kaikki \(courses.count) kurssia kertaostoksella.")
                }
            }
        }
        .safeAreaInset(edge: .bottom) {
            if !isUnlocked && lockedCount > 0 {
                unlockBar
            }
        }
    }

    private var unlockBar: some View {
        Button { showPaywall = true } label: {
            Label("Avaa kaikki \(courses.count) kurssia", systemImage: "lock.open.fill")
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding()
                .background(.tint, in: RoundedRectangle(cornerRadius: 14))
                .foregroundStyle(.white)
        }
        .padding()
        .background(.bar)
    }

    // MARK: - Data

    private func loadCourses() async {
        state = .loading
        do {
            courses = try await CourseService.fetchCourses()
            state = .loaded
        } catch {
            state = .failed(error.localizedDescription)
        }
    }

    private func refreshEntitlement() async {
        if let info = try? await Purchases.shared.customerInfo() {
            isUnlocked = info.entitlements[RevenueCatConfig.entitlementID]?.isActive == true
        }
    }
}

/// One course row. When locked, the text is blurred and a lock badge replaces
/// the disclosure affordance — enough of a tease to show there's more.
private struct CourseRow: View {
    let course: Course
    let locked: Bool

    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(course.name)
                    .font(.body)
                    .blur(radius: locked ? 4.5 : 0)
                if let ects = course.ects {
                    Text("\(ects.formatted()) op")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .blur(radius: locked ? 4 : 0)
                }
            }
            Spacer()
            if locked {
                Image(systemName: "lock.fill")
                    .foregroundStyle(.secondary)
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityHint(locked ? "Lukittu. Avaa ostamalla." : "")
    }
}
