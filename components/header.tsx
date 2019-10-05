import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = () => (
	<HeaderContainer>
		<Logo>Salainen tiedekunta</Logo>

		<Search>
			<SearchInput></SearchInput>
		</Search>

		<SideLinks>
			<Link href='/teachers'>
				<StyledLink>Opettajat</StyledLink>
			</Link>

			<Link href='/majors'>
				<StyledLink>Opetusohjelmat</StyledLink>
			</Link>

			<Link href='/courses'>
				<StyledLink>Kurssit</StyledLink>
			</Link>
		</SideLinks>
	</HeaderContainer>
);

export default Header;

const HeaderContainer = styled.header`
	box-sizing: border-box;
	width: 100%;
	padding: 0rem 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Logo = styled.div`
	flex: 1;
	font-family: 'Bree Serif', serif;
`;

const SideLinks = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
`;

const StyledLink = styled.a`
	font-family: 'Overpass', sans-serif;
	color: rgba(0, 0, 32, 0.6);
	text-decoration: none;
	transition: 200ms ease color;
	opacity: 1;
	font-size: 16px;
	padding-top: 3px;
	margin: 0 12px 0 12px;
	border-bottom: 2px solid transparent;
	-webkit-transition: 200ms ease color;
`;

const Search = styled.div`
	z-index: 500;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	max-width: 694px;
	margin: 0 0 0 24px;
	width: 100%;
	position: relative;
	border-radius: 3px;
	background: rgba(0, 0, 32, 0.1);
`;
const SearchInput = styled.input`
	z-index: 500;
	height: 40px;
	font-size: 16px;
	border: 0;
	outline: 0;
	padding: 0 16px 0 16px;
	display: block;
	width: 100%;
	background: transparent;
	color: rgba(0, 0, 32, 0.8);
`;