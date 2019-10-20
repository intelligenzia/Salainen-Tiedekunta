import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ContentfulService } from '../core/contentful';
import { NextSeo } from 'next-seo';

import { Course } from '../interfaces/course';

import Layout from '../components/layout';
import Card from '../components/card';
import Paginator from '../components/paginator';
import Footer from '../components/footer';
import Header from '../components/header';
import {
	H1,
	Intro,
	CoverPhoto,
	Cover,
	Container,
	CardDeck,
	InnerContainer
} from '../components/styled-components';

// import TagFilters from "../shared/components/tag-filters";

const calculateRange = (length) => Array.from({ length }, (v, k) => k + 1);

const cards = (entries) =>
	entries.map((entry, index) => <Card info={entry} key={index} />);

type Props = {
	entries: Course[];
	tags: { id: string; name: string }[];
	url: any;
	total: number;
	skip: number;
	limit: number;
	page?: number;
};

const IndexPage: NextPage = (props: Props) => {
	const router = useRouter();
	const entries = props.entries.length ? props.entries : [];
	const tags = props.tags || [];
	const total = props.total;

	const limitX = props.limit;
	const rangeLimit = Math.ceil(total / limitX);
	const range = calculateRange(rangeLimit);

	const [page, updatePage] = useState(!!props.page ? props.page : 1);
	const [tag, updateTag] = useState('');

	// useEffect(() => {
	// 	void router.push({ pathname: '/', query: { page: page, tag: tag } });
	// }, [page, tag]);

	const handleTagChosen = (tag) => {
		updatePage(1);
		updateTag(tag);
	};

	return (
		<>
			<NextSeo
				openGraph={{
					type: 'website',
					locale: 'fi',
					url: 'https://tiedekunta.com/',
					site_name: 'Salainen Tiedekunta – Faculty of Arcane Arts',
					description:
						'Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on muutamassa vuodessa kasvanut useita laitoksia sisältäväksi täysimittaiseksi tiedekunnaksi.',
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
				<Cover>
					<InnerContainer>
						<H1>Salainen tiedekunta</H1>
						<Intro>
							Salainen tiedekunta on Helsingin yliopistoon vuonna 1998
							perustettu kognitiotieteen monipuolista opetusta ja tutkimusta
							kehittävä organisaatio. Muutaman aktiivisen opiskelijan
							alullepanema hanke on muutamassa vuodessa kasvanut useita
							laitoksia sisältäväksi täysimittaiseksi tiedekunnaksi.
						</Intro>
					</InnerContainer>
					<CoverPhoto src='/static/earth.jpeg' />
				</Cover>

				<Container>
					<CardDeck>{cards(entries)}</CardDeck>

					<div className='sidenav'>
						{/* <TagFilters tags={tags} updatePage={handleTagChosen} selectedTagId={tag}/> */}
					</div>
					<div className='pagination'>
						<Paginator
							handlePaginationChange={(event) => updatePage(event)}
							range={range}
							skip={page}
						/>
					</div>
				</Container>
				<Footer />
			</Layout>
		</>
	);
};

IndexPage.getInitialProps = async ({ query }) => {
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

export default IndexPage;
