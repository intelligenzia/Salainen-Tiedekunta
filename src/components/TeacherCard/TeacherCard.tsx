import React, { FC } from 'react'
import styled from 'styled-components'
import Image, { FluidObject, GatsbyImageProps } from 'gatsby-image'
import { Link } from 'gatsby'
import { Icon } from '../Icons/Icons'
import { ContentfulFluid } from '../../../types/graphql-types'

interface Props {
  name: string | undefined | null
  slug: string | undefined | null
  avatar:
    | Pick<ContentfulFluid, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
    | undefined
    | null
}

const TeacherCard: FC<Props> = ({ name, slug, avatar }) => {
  return (
    <Container to={`/teacher/${slug}`}>
      {avatar ? <Avatar fluid={avatar} alt={`${name}`} /> : <PlaceHolder />}
      <Name>{name}</Name>
      <ArrowContainer>
        <Arrow />
      </ArrowContainer>
    </Container>
  )
}

export default TeacherCard

const Container = styled(Link)`
  display: block;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }): string => theme.bgSecondary};
  border-bottom: 1px solid ${({ theme }): string => theme.textSecondary};

  display: flex;
  flex-direction: row;
  align-items: center;

  &:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-of-type {
    border: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

const Name = styled.h4`
  margin: 0 0 0 1rem;
`

const PlaceHolder = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  border: 2px solid black;
  box-sizing: border-box;
`

const Avatar = styled(Image)<GatsbyImageProps>`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  border: 2px solid black;
  box-sizing: border-box;
  transition: 0.7s ease-in-out transform;
  filter: grayscale(100%);
  &:hover {
    transform: rotate(1080deg);
  }
`

const ArrowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const Arrow = styled(Icon).attrs(({ theme }) => ({
  name: 'arrow',
  height: 18,
  fill: 'none',
  stroke: theme.textSecondary,
  width: 50,
  viewBox: '0 0 20 20',
}))`
  margin: 0;
`
