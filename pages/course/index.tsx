import { NextPage } from 'next';
import React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { ContentfulService } from '../../core/contentful';

import Layout from '../../components/layout';

import { Course } from '../../interfaces/course';
import Header from '../../components/header';
import { NextSeo } from 'next-seo';

type Props = {
	course: Course;
};
const CoursePage: NextPage = (props: Props) => {
	return (
		<>
			<NextSeo
				openGraph={{
					type: 'website',
					locale: 'fi',
					url: `https://tiedekunta.com/course/${props.course.courseId}`,
					site_name: `${props.course.name} – Salainen Tiedekunta – Faculty of Arcane Arts`,
					description: `${props.course.description}`,
					images: [
						{
							url: 'https://tiedekunta.com/static/earth.jpeg',
							width: 800,
							height: 600,
							alt: 'Salainen Tiedekunta - Faculty of Arcane Arts'
						}
					]
				}}
				twitter={{
					handle: '@tiedekunta',
					site: '@tiedekunta',
					cardType: 'summary_large_image'
				}}
			/>
			<Layout>
				<Header />
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
		</>
	);
};

CoursePage.getInitialProps = async ({ query }) => {
	// define contentful service instance
	const contentfulService = new ContentfulService();

	const id = query.course as string;
	const course = await contentfulService.getCourseById(id);
	return { course };
};

export default CoursePage;
