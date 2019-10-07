import { NextPage } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Layout from '../components/layout';
import { H1 } from '../components/styled-components';
import Header from '../components/header';
import { Container } from 'next/app';

const CoursesPage: NextPage = (props: any) => {
	return (
		<Layout>
			<Header></Header>
			<Container>
				<H1>Kurssit</H1>
			</Container>
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
