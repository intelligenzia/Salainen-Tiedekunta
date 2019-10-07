import React, { FunctionComponent, Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { getHref, getNavigationLink, getTeacherHref, getTeacherNavigationLink } from '../core/helper';
import { H3 } from './styled-components';

type Props = {
	info: {
        name:string
        id: string;
	};
};

const TeacherCard: FunctionComponent<Props> = ({ info }) => {
	// To properly display the hero image on the card, along with some simple styling to give it a share

	return (
		<CardContainer>
			<div className='card__body'>
				<H3>{info.name}</H3>
			</div>

			<div className='card__footer'>
				<Link
					href={getTeacherHref(info.id)}
					as={getTeacherNavigationLink(info.id)}>
					<Button>Tutustu</Button>
				</Link>
			</div>
		</CardContainer>
	);
};

const CardContainer = styled.div`
	padding: 1rem;
	max-width: 100%;
	min-width: calc(33% - 1rem);
	flex: 1;
	border-radius: 7px;
	margin: 0.5rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
	transition: transform 300ms ease-in-out, box-shadow 400ms ease,
		background-color 100ms ease;
	position: relative;

	&:hover,
	&:focus-within {
		background: #111111;
		box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
		transform: translateY(-0.5rem);
	}
`;

const P = styled.p`
	color: #111;
`;

const Button = styled.a`
	font-family: inherit;
	font-weight: 600;
	padding: 0.6rem 2rem;
	background: transparent;
	color: currentcolor;
	border: 1px solid;
	transition: background-color 100ms ease;
	position: static;

	&,
	&::before {
		cursor: pointer;
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&:focus::before {
		outline: 1px solid #ffffff;
		outline-offset: -0.8rem;
	}
`;

export default TeacherCard;
