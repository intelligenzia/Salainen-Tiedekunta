import { NextPage } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Layout from '../components/layout';

const CoursesPage: NextPage = (props: any) => {
	return (
		<Layout>
			<h1>Kurssit</h1>
		</Layout>
	);
};

// CoursePage.getInitialProps = async ({ query }) => {
// 	// define contentful service instance
// 	const contentfulService = new ContentfulService();

// 	const id = query.course as string;
// 	const course = await contentfulService.getCourseById(id);
// 	console.log('course', course);
// 	return { course };
// };

export default CoursesPage;