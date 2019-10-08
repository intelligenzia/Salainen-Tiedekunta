import { createClient } from 'contentful';

export const CONTENT_TYPE_COURSE = 'course';
export const CONTENT_TYPE_TEACHER = 'teacher';
export const CONTENT_TYPE_MAJOR = 'major';

const Space = process.env.CONTENTFUL_SPACE;
const Token = process.env.CONTENTFUL_TOKEN;

export class ContentfulService {
	private client = createClient({
		space: Space,
		accessToken: Token
	});

	async fetchCourseByID(courseId) {
		return await this.client.getEntries({
			content_type: CONTENT_TYPE_COURSE,
			'fields.courseId': courseId
		});
	}

	async getAllTeachers() {
		const content = await this.client.getEntries({
			content_type: CONTENT_TYPE_TEACHER
		});

		const teachers = content.items.map(
			({ sys, fields }: { sys: any; fields: any }) => ({
				id: sys.id,
				name: fields.name
			})
		);

		return { teachers };
	}

	async getAllMajors() {
		const content = await this.client.getEntries({
			content_type: CONTENT_TYPE_MAJOR
		});

		const majors = content.items.map(
			({ sys, fields }: { sys: any; fields: any }) => ({
				id: sys.id,
				name: fields.name,
				introduction: fields.introduction,
				courses: fields.courses
			})
		);

		return { majors };
	}

	public async getCourseEntries(
		{ limit, skip, tag }: { limit?: number; skip?: number; tag?: string } = {
			limit: 5,
			skip: 0,
			tag: ''
		}
	) {
		try {
			const contents = await this.client.getEntries({
				include: 1,
				limit,
				skip,
				// 'fields.tags.sys.id': tag,
				content_type: CONTENT_TYPE_COURSE
				// order: 'fields.publishDate'
			});

			const entries = contents.items.map(
				({ sys, fields }: { sys: any; fields: any }) => ({
					id: sys.id,
					courseId: fields.courseId,
					name: fields.name,
					ects: fields.ects,
					description: fields.slug,
					teacher: fields.teacher
					// publishedAt: fields.publishDate
					// 	? new Date(fields.publishDate)
					// 	: new Date(sys.createdAt)
				})
			);

			const total = contents.total;

			return { entries, total, limit, skip };
		} catch (error) {
			// TODO: add error handling
			console.log(error);
		}
	}

	async getCourseById(courseId: string) {
		try {
			const content: any = await this.fetchCourseByID(courseId);
			console.log('content', content);
			const entry: { sys: any; fields: any } = content.items[0];

			// const teacher = {
			// 	name: entry.fields.teacher.fields.name
			// };

			const teachers = [];
			const course = {
				id: entry.sys.id,
				courseId: entry.fields.courseId,
				name: entry.fields.name,
				ects: entry.fields.ects,
				description: entry.fields.description
				// teacher: { ...teacher, id: entry.fields.teacher.sys.id }
			};

			console.log('aa', course);

			return course;
		} catch (error) {
			console.error(error);
		}
	}
}
