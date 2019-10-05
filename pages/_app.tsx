import App from 'next/app';
import React from 'react';
import Router from 'next/router';

import { trackPageView } from '../core/analytics';

Router.events.on('routeChangeComplete', (url) => trackPageView(url));

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<React.Fragment>
				<Component {...pageProps} />
			</React.Fragment>
		);
	}
}

export default MyApp;
