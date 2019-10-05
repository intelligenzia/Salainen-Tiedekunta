// Helper functions
export const getNavigationLink = (courseId) => `/course/${courseId}`;
export const getHref = (courseId) => ({
	pathname: '/course',
	query: { course: courseId }
});
