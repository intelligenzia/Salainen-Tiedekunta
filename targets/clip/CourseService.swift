import Foundation

/// A single course, flattened from the Contentful CDA response.
struct Course: Identifiable {
    let id: String
    let name: String
    let ects: Double?
    let courseId: String?
}

/// Fetches courses straight from the Contentful Content Delivery API.
///
/// The App Clip can't reuse the React Native data layer (`lib/contentful.ts`),
/// so this is a tiny native mirror of `getCourses()` — same space, same
/// read-only token, same `content_type=course` query.
enum CourseService {
    static func fetchCourses() async throws -> [Course] {
        var components = URLComponents(
            string: "https://cdn.contentful.com/spaces/\(ContentfulConfig.spaceID)/environments/master/entries"
        )!
        components.queryItems = [
            URLQueryItem(name: "content_type", value: "course"),
            URLQueryItem(name: "order", value: "fields.name"),
            URLQueryItem(name: "limit", value: "200"),
            // Only the fields the Clip renders — keeps the payload small.
            URLQueryItem(name: "select", value: "sys.id,fields.name,fields.ects,fields.courseId"),
        ]

        var request = URLRequest(url: components.url!)
        request.setValue("Bearer \(ContentfulConfig.accessToken)", forHTTPHeaderField: "Authorization")

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
            throw URLError(.badServerResponse)
        }

        let list = try JSONDecoder().decode(CDAList.self, from: data)
        return list.items.map {
            Course(
                id: $0.sys.id,
                name: $0.fields.name ?? "Nimetön kurssi",
                ects: $0.fields.ects,
                courseId: $0.fields.courseId
            )
        }
    }
}

// MARK: - Wire format

private struct CDAList: Decodable {
    let items: [Item]

    struct Item: Decodable {
        let sys: Sys
        let fields: Fields
    }
    struct Sys: Decodable { let id: String }
    struct Fields: Decodable {
        let name: String?
        let ects: Double?
        let courseId: String?
    }
}
