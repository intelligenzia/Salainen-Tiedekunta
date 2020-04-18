import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { maxWidth } from './primitives';
import { Icon } from './Icons/Icons';

type Props = {
  siteTitle: string;
};

const routes = [
  {
    name: 'Suuntaukset',
    to: 'majors',
    icon: 'book',
  },
  {
    name: 'Kurssit',
    to: 'courses',
    icon: 'teacher',
  },
  {
    name: 'Opettajat',
    to: 'teachers',
    icon: 'teacher',
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
            <Route to={route.to}>
              <Icon
                stroke="none"
                fill="currentColor"
                height="20px"
                width="20px"
                name={route.icon}
              />
              {route.name}
            </Route>
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

const Title = styled.div`
  flex: 1;
  text-decoration: none;
  font-weight: bold;
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
`;

const Route = styled(Link)`
  text-decoration: none;
  font-weight: bold;

  :hover {
    color: var(--primary-text);
  }
`;
