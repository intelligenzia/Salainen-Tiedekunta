const { createClient } = require('contentful');
require('dotenv').config();

const Space = process.env.CONTENTFUL_SPACE;
const Token = process.env.CONTENTFUL_TOKEN;

const client = createClient({
	space: Space,
	accessToken: Token
});

const CONTENT_TYPE_COURSE = 'course';
const CONTENT_TYPE_TEACHER = 'teacher';

const getAllTeachers = async () => {
	return await client.getEntries({
		content_type: CONTENT_TYPE_TEACHER,
		select: 'fields.name'
	});
};

const gettAllCourses = async () => {
	return await client.getEntries({
		content_type: CONTENT_TYPE_COURSE,
		select: 'fields.name,fields.courseId'
	});
};

exports.generateAllAuthors = async () => {
	const teachers = await getAllTeachers();
	return teachers.items.map((item) => ({ ...item.fields }));
};

exports.generateAllArticles = async () => {
	const courses = await getAllCourses();
	return courses.items.map((item) => ({ ...item.fields }));
};
