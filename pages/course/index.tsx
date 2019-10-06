import { NextPage } from 'next';
import React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { ContentfulService } from '../../core/contentful';

import Layout from '../../components/layout';

import { Course } from '../../interfaces/course';

type Props = {
	course: Course;
};
const CoursePage: NextPage = (props: Props) => {
	return (
		<Layout>
			<div className='post-container' id='post-container'>
				<div className='post-header'>
					<h1>{props.course.name}</h1>
					<div className='author'>
						{/* <p>Written by {props.course.teacher.name}</p> */}
					</div>
				</div>
				<div
					dangerouslySetInnerHTML={{
						__html: documentToHtmlString(props.course.description)
					}}></div>
			</div>
		</Layout>
	);
};

CoursePage.getInitialProps = async ({ query }) => {
	// define contentful service instance
	const contentfulService = new ContentfulService();

	const id = query.course as string;
	const course = await contentfulService.getCourseById(id);
	console.log('course', course);
	return { course };
};

export default CoursePage;
