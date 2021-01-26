import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { maxWidth } from './primitives'
import { Icon } from './Icons/Icons'
import devices from '../helpers/devices'

type Props = {
  siteTitle: string
}

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
]

const Header: FC<Props> = ({ siteTitle }: Props) => (
  <HeaderContainer>
    <Inner>
      <Title>
        <Link to="/">{siteTitle}</Link>
      </Title>

      <Links>
        {routes.map(route => (
          <LinkItem key={route.name}>
            <Route to={`/${route.to}`}>
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
)

export default Header

const HeaderContainer = styled.header`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
`

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  max-width: ${maxWidth};
  margin: 0rem auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: var(--secondary-bg);
  box-shadow: 1px 1px 4px 0px #27272738;
`

const Title = styled.div`
  flex: 1;
  text-decoration: none;
  font-weight: bold;
  a {
    color: var(--primary-text);
  }
`

const Links = styled.ul`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
`

const LinkItem = styled.li`
  margin: 0rem 0rem 0rem 1rem;
`

const Route = styled(Link)`
  text-decoration: none;
  font-weight: bold;

  @media ${devices.mobileM} {
    font-size: 0.9rem;
  }

  @media ${devices.tablet} {
    font-size: 1rem;
  }

  svg {
    @media ${devices.mobileM} {
      display: none;
    }
    @media ${devices.tablet} {
      display: inline-block;
    }
  }
  :hover {
    color: var(--primary-text);
  }
`
