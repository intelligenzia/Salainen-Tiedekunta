import { Link } from 'gatsby'
import Image, { GatsbyImageProps } from 'gatsby-image'
import React, { FC } from 'react'
import styled from 'styled-components'
import { ContentfulTeacher } from '../../../types/graphql-types'

interface Props {
  name: string
  courseId: string
  ects: string
  teachers: ContentfulTeacher[]
  introduction: string
}

const CourseCard: FC<Props> = ({
  name,
  courseId,
  ects,
  teachers,
  introduction,
}) => {
  return (
    <Container to={`/course/${courseId}`}>
      <Name>
        {courseId} : {name}
      </Name>
      <Introduction>{introduction}</Introduction>
      <div>{ects} op</div>
      {teachers && (
        <Teachers>
          {teachers.map(teacher => {
            if (!teacher.avatar || !teacher.avatar.fluid) return null
            return teacher ? <Teacher fluid={teacher.avatar?.fluid} /> : null
          })}
        </Teachers>
      )}
    </Container>
  )
}

export default CourseCard

const Container = styled(Link)`
  padding: 1.5rem;
  box-sizing: border-box;
  margin: 5px;
  border-radius: 20px;
  background-color: var(--secondary-bg);
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 33%;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 1px 1px 4px 0px #27272738;

  &:hover {
    transform: translateY(-2px);
  }
`

const Name = styled.h4`
  color: var(--primary-text);
  text-decoration: none;
`

const Teachers = styled.div`
  display: flex;
  flex-direction: row;
`

const Teacher = styled(Image)<GatsbyImageProps>`
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

const Introduction = styled.p``
