import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { maxWidth } from './primitives';

type Props = {
  siteTitle: string;
};

const routes = [
  {
    name: 'Suuntaukset',
    to: 'majors',
  },
  {
    name: 'Kurssit',
    to: 'courses',
  },
  {
    name: 'Opettajat',
    to: 'teachers',
  },
];

const Header: React.FC<Props> = ({ siteTitle }: Props) => (
  <HeaderContainer>
    <Inner>
      <Title>
        <Link to="/">{siteTitle}</Link>
      </Title>

      <Links>
        {routes.map(route => (
          <LinkItem key={route.name}>
            <Route to={route.to}>{route.name}</Route>
          </LinkItem>
        ))}
      </Links>
    </Inner>
  </HeaderContainer>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  margin-top: 1rem;
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  max-width: ${maxWidth};
  margin: 0rem auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h3`
  flex: 1;
  margin: 0;
  a {
    text-decoration: none;
    color: #444;
  }
`;

const Links = styled.ul`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
`;

const LinkItem = styled.li`
  margin: 0rem 0rem 0rem 1rem;
  box-sizing: border-box;
  padding: 0.2rem;
  transition: 0.14s ease-in-out;
  a {
    text-decoration: none;
    color: #333;
  }

  &:hover  {
    transform: translateY(-0.2rem) scale(1.02);
    font-weight: bold;
  }
`;

const Route = styled(Link)`
  text-decoration: none;
`;
