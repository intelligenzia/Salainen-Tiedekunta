const { createClient } = require('contentful');

const CONTENT_TYPE_COURSE = 'course';
const CONTENT_TYPE_TEACHER = 'teacher';
const CONTENT_TYPE_MAJOR = 'major';

const Space = 'yqczjjam9tzu';
const Token = '9_YI73LxFa8UUYcjY0LnvBjAD8wbZEJjpO55KVubQFw';

const client = createClient({
	space: Space,
	accessToken: Token
});

const fetchCourseByID = async (courseId) => {
	return await client.getEntries({
		content_type: CONTENT_TYPE_COURSE,
		'fields.courseId': courseId
	});
};

const getAllTeachers = async () => {
	const content = await client.getEntries({
		content_type: CONTENT_TYPE_TEACHER
	});

	const teachers = content.items.map(({ sys, fields }) => ({
		id: sys.id,
		name: fields.name
	}));

	return { teachers };
};

const getAllMajors = async () => {
	const content = await client.getEntries({
		content_type: CONTENT_TYPE_MAJOR
	});

	const majors = content.items.map(({ sys, fields }) => ({
		id: sys.id,
		name: fields.name,
		introduction: fields.introduction,
		courses: fields.courses ? fields.courses.slice(0, 3) : []
	}));

	return { majors };
};

const getCourseEntries = async (
	{ limit, skip, tag } = {
		limit: 5,
		skip: 0,
		tag: ''
	}
) => {
	try {
		const contents = await client.getEntries({
			include: 1,
			limit,
			skip,
			// 'fields.tags.sys.id': tag,
			content_type: CONTENT_TYPE_COURSE
			// order: 'fields.publishDate'
		});

		const entries = contents.items.map(({ sys, fields }) => ({
			id: sys.id,
			courseId: fields.courseId,
			name: fields.name,
			ects: fields.ects,
			description: fields.slug,
			teacher: fields.teacher
		}));

		const total = contents.total;

		return { entries, total, limit, skip };
	} catch (error) {
		// TODO: add error handling
		console.log(error);
	}
};

const getCourseById = async (courseId) => {
	try {
		const content = await fetchCourseByID(courseId);
		const entry = content.items[0];

		// const teacher = {
		// 	name: entry.fields.teacher.fields.name
		// };

		const course = {
			id: entry.sys.id,
			courseId: entry.fields.courseId,
			name: entry.fields.name,
			ects: entry.fields.ects,
			description: entry.fields.description
			// teacher: { ...teacher, id: entry.fields.teacher.sys.id }
		};

		return course;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getCourseById,
	getCourseEntries,
	getAllMajors,
	getAllTeachers,
	fetchCourseByID
};
