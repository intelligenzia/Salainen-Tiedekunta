import { NextPage } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Layout from '../components/layout';
import { H1 } from '../components/styled-components';
import Header from '../components/header';
import { ContentfulService } from '../core/contentful';
import { Course } from '../interfaces/course';
import { Teacher } from '../interfaces/teacher';
import TeacherCard from '../components/teacher';
import { Container } from '../components/shared/styled-components';
import { Major } from '../interfaces/major';
import MajorRow from '../components/majorRow';
type Props = {
	majors: Major[];
	url: any;
	total: number;
	skip: number;
	limit: number;
	page?: number;
};

const majorCards = (majors) =>
	majors.map((entry, index) => <MajorRow info={entry} key={index}></MajorRow>);

const MajorsPage: NextPage = (props: Props) => {
	const majors = props.majors.length ? props.majors : [];

	return (
		<Layout>
			<Header></Header>

			<Container>
				<H1>Opintosuuntaukset</H1>
				{majorCards(majors)}
			</Container>
		</Layout>
	);
};

MajorsPage.getInitialProps = async ({ query }) => {
	// define contentful service instance
	const contentfulService = new ContentfulService();

	const { majors } = await contentfulService.getAllMajors();
	return { majors };
};

export default MajorsPage;
