import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ContentfulService } from '../core/contentful';

import { Course } from '../interfaces/course';

import Layout from '../components/layout';
import Card from '../components/card';
import Paginator from '../components/paginator';
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

	useEffect(() => {
		void router.push({ pathname: '/', query: { page: page, tag: tag } });
	}, [page, tag]);

	const handleTagChosen = (tag) => {
		updatePage(1);
		updateTag(tag);
	};

	return (
		<Layout>
			<div className='container'>
				<div className='blogposts'>
					<h1 className='blogposts__header'>Latest posts</h1>
					<CardDeck>{cards(entries)}</CardDeck>
				</div>
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
			</div>
		</Layout>
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

const CardDeck = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;
