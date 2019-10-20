import { NextPage } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { NextSeo } from 'next-seo';

import Layout from '../components/layout';
import { H1, Container } from '../components/styled-components';
import Header from '../components/header';

import { ContentfulService } from '../core/contentful';

const CoursesPage: NextPage = (props: any) => {
	return (
		<>
			<NextSeo
				openGraph={{
					type: 'website',
					url: 'https://tiedekunta.com/courses',
					title: 'Salaisen Tiedekunnan kurssivalikoima',
					description: 'Salaisen Tiedekunnan kurssivalikoima',
					images: [
						{
							url: 'https://tiedekunta.com/static/earth.jpeg',
							width: 800,
							height: 600,
							alt: 'Salainen Tiedekunta - Faculty of Arcane Arts'
						}
					]
				}}
			/>
			<Layout>
				<Header />
				<Container>
					<H1>Kurssit</H1>
				</Container>
			</Layout>
		</>
	);
};

CoursesPage.getInitialProps = async ({ query }) => {
	const contentfulService = new ContentfulService();

	let page: number = 1;

	if (query.page) {
		page = parseInt(query.page + '');
	}

	const courseLimit = 3;
	const {
		entries,
		total,
		skip,
		limit
	} = await contentfulService.getCourseEntries({
		tag: query.tag ? query.tag.toString() : ''
		// skip: (page - 1) * courseLimit,
		// limit: courseLimit
	});
	// const {tags} = await contentfulService.();

	return { page, entries, total, skip };
};

export default CoursesPage;
