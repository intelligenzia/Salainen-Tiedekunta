import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = () => (
	<HeaderContainer>
		<Logo>Salainen tiedekunta</Logo>

		<SideLinks>
			<Link href='/teachers'>
				<StyledLink>Opettajat</StyledLink>
			</Link>
			<Link href='/courses'>
				<StyledLink>Kurssit</StyledLink>
			</Link>
			<Link href='/koirat'>
				<StyledLink>koirat</StyledLink>
			</Link>
		</SideLinks>
	</HeaderContainer>
);

export default Header;

const HeaderContainer = styled.header`
	width: 100%;
	padding: 0rem 1rem;
	display: flex;
	flex-direction: row;
`;

const Logo = styled.div`
	flex: 1;
`;

const SideLinks = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
`;

const StyledLink = styled.a`
	color: palevioletred;
	font-weight: bold;
`;
