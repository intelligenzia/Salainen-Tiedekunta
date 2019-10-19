import App, { Container } from 'next/app';
import React from 'react';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';

import { trackPageView } from '../core/analytics';

Router.events.on('routeChangeComplete', (url) => trackPageView(url));

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<React.Fragment>
				<Container>
					<DefaultSeo
						openGraph={{
							type: 'website',
							locale: 'fi',
							url: 'https://tiedekunta.com/',
							site_name: 'Salainen Tiedekunta – Faculty of Arcane Arts',
							description:
								'Salainen tiedekunta on Helsingin yliopistoon vuonna 1998 perustettu kognitiotieteen monipuolista opetusta ja tutkimusta kehittävä organisaatio. Muutaman aktiivisen opiskelijan alullepanema hanke on muutamassa vuodessa kasvanut useita laitoksia sisältäväksi täysimittaiseksi tiedekunnaksi.',
							images: [
								{
									url: 'https://tiedekunta.com/earth.jpeg',
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
					<Component {...pageProps} />
				</Container>
			</React.Fragment>
		);
	}
}

export default MyApp;
