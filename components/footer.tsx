import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => (
	<FooterContainer>
		<Row>
			<FooterTitle>Tiedekunta</FooterTitle>
		</Row>
	</FooterContainer>
);

export default Footer;

const FooterContainer = styled.footer`
	min-height: 10rem;
	width: 100%;
	margin: 0 auto;
	padding: 0 0;
	background-image: linear-gradient(to bottom, #121212 0%, #323232 100%);
	color: #f1f1f1;
	overflow: hidden;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const FooterTitle = styled.div`
	font-size: 1rem;
	color: white;
`;
