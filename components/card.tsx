import React, { FunctionComponent, Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { getHref, getNavigationLink } from '../core/helper';

type Props = {
	info: {
		courseId: string;
		name: string;
		description: string;
		ects: string;
	};
};

const Card: FunctionComponent<Props> = ({ info }) => {
	// To properly display the hero image on the card, along with some simple styling to give it a share

	return (
		<CardContainer>
			<div className='card__body'>
				<H3>{info.name}</H3>
				<P>Opintopisteet: {info.ects}</P>
				<P>{info.description}</P>
			</div>

			<div className='card__footer'>
				<Link
					href={getHref(info.courseId)}
					as={getNavigationLink(info.courseId)}>
					<a className='card__action'>Explore</a>
				</Link>
			</div>
		</CardContainer>
	);
};

const CardContainer = styled.div`
	padding: 1rem;
	max-width: 20%;
	flex: 1;
	border-radius: 7px;
	margin: 0.5rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
`;

const H3 = styled.h3`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
	margin: 0.8rem 0 2rem 0;
	color: #111;
`;

const P = styled.p`
	color: #111;
`;

export default Card;
