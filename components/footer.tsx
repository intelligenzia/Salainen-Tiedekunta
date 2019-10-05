import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => <FooterContainer></FooterContainer>;

export default Footer;

const FooterContainer = styled.footer`
	width: 100%;
	margin: 0 auto;
	padding: 0 0;
	background-image: linear-gradient(to bottom, #121212 0%, #323232 100%);
	color: #f1f1f1;
	overflow: hidden;
`;
