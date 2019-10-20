import styled from 'styled-components';

export const H1 = styled.h1`
	color: #222;
	font-size: 3rem;
	font-family: 'Bree Serif', serif;
`;
export const H2 = styled.h2`
	color: #222;
	font-size: 2rem;
	font-family: 'Bree Serif', serif;
`;

export const H3 = styled.h3`
	color: #222;
	font-size: 1.5rem;
	font-family: 'Bree Serif', serif;
`;

export const Intro = styled.p`
	font-size: 18px;
	font-family: 'Overpass', sans-serif;
`;

export const Container = styled.div`
	padding: 5rem 1rem;
	max-width: 1140px;
	margin: 0 auto;
`;

export const CoverPhoto = styled.img`
	position: absolute;

	width: 100vw;
	height: 100%;
	height: 50vh;
`;

export const Cover = styled.div`
	position: relative;
	width: 100%;
	height: 50vh;
	max-height: 40rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
export const InnerContainer = styled.div`
	position: relative;
	padding: 5rem 1rem;
	max-width: 1140px;
	margin: 0 auto;
	max-height: 40rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	z-index: 2;
	color: white;

	h1 {
		color: white;
	}
	p {
		color: white;
	}
`;
