// Helper functions
export const getNavigationLink = (courseId) => `/course/${courseId}`;
export const getHref = (courseId) => ({
	pathname: '/course',
	query: { course: courseId }
});


export const getTeacherNavigationLink = (courseId) => `/teacher/${courseId}`;
export const getTeacherHref = (courseId) => ({
	pathname: '/teacher',
	query: { course: courseId }
});


