import React, { Fragment } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';
import { GA_TRACKING_ID } from '../core/analytics';

type Props = {
	isProduction: boolean;
	styleTags: any;
};

// styled.injectGlobal`
// 	html {
// 		font-size: 10px;
// 	}
// 	body {
// 		font-family: 'Merriweather', serif;
// 		font-size: 1.6em;
// 		line-height: 1.6;
// 	}
// `;

export default class extends Document<Props> {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();

		const isProduction = process.env.NODE_ENV.toLowerCase() === 'production';
		const initialProps = await Document.getInitialProps(ctx);
		const page = ctx.renderPage((App) => (props) =>
			sheet.collectStyles(<App {...props} />)
		);
		const styleTags = sheet.getStyleElement();
		return { ...initialProps, isProduction, ...page, styleTags };
	}

	setGoogleTags(GA_TRACKING_ID) {
		return {
			__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${GA_TRACKING_ID}');
            `
		};
	}

	render() {
		const language = 'fi';
		const { isProduction } = this.props;

		return (
			<html lang={language}>
				<Head>
					{/*Global meta tags*/}
					{this.props.styleTags}
					<link
						href='https://fonts.googleapis.com/css?family=Bree+Serif|Overpass&display=swap'
						rel='stylesheet'></link>
					<meta httpEquiv='x-ua-compatible' content='ie=edge' />
					<base href='/' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta charSet='utf-8' />
					{/* Global Site Tag (gtag.js) - Google Analytics */}
					{/* We only want to add the scripts if in production */}
					{isProduction && (
						<Fragment>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
							/>
							{/* We call the function above to inject the contents of the script tag */}
							<script
								dangerouslySetInnerHTML={this.setGoogleTags(GA_TRACKING_ID)}
							/>
						</Fragment>
					)}
				</Head>
				<Body
					style={{
						margin: 0,
						padding: 0
					}}>
					<Main />
					<NextScript />
				</Body>
			</html>
		);
	}
}

const Body = styled.body`
	margin: 0;
	padding: 0;
`;
