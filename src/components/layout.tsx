/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { useTransition, animated } from 'react-spring';

import { Container } from './primitives';
import Header from './header';
import './layout.css';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const transitions = useTransition(true, null, {
    from: { opacity: 0, transform: `translate3d(0,2rem,0)` },
    enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-2rem,0)' },
  });

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <main>{children}</main>
              </animated.div>
            )
        )}
      </Container>
      <Footer>© {new Date().getFullYear()}</Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const Footer = styled.footer``;
