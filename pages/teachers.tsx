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
import TeacherCard  from '../components/teacher' 
import { Container } from '../components/shared/styled-components';
type Props = {
	teachers: Teacher[];
	url: any;
	total: number;
	skip: number;
	limit: number;
	page?: number;
};

const teacherCards = (teachers) =>
	teachers.map((entry, index) => <TeacherCard info={entry} key={index}></TeacherCard>);

const TeachersPage: NextPage = (props: Props) => {
    const teachers = props.teachers.length ? props.teachers : [];

    console.log(teachers)
    
    return (
		<Layout>

			<Header></Header>

			<Container>
				<H1>Opettajat</H1>
                {teacherCards(teachers)}
			</Container>
		</Layout>
	);
};

TeachersPage.getInitialProps = async ({ query }) => {
	// define contentful service instance
	const contentfulService = new ContentfulService();

	const {teachers}  = await contentfulService.getAllTeachers();
	return { teachers };
};

export default TeachersPage;
