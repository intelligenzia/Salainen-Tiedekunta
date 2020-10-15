import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React, { FC, ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import { Footer } from './footer';
import Header from './header';
import { Container } from './primitives';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <Main>{children}</Main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = styled.main`
  margin: 0rem 0rem 5rem;
`;

export default Layout;
