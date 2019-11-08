const path = require('path');
const Dotenv = require('dotenv-webpack');
const { getCourseEntries } = require('./core/contentful');

const next_config = {
	exportPathMap: async function() {
		const paths = {
			'/': { page: '/' }
		};

		const { entries } = await getCourseEntries();
		const courses = entries;
		courses.forEach((course) => {
			paths[`/course/${course.courseId}`] = {
				page: '/course',
				query: { id: course.courseId }
			};
		});

		return paths;
	},
	webpack: (config) => {
		config.plugins = config.plugins || [];

		config.plugins = [
			...config.plugins,
			// Read the .env file
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true
			})
		];

		return config;
	}
};

module.exports = { ...next_config };
