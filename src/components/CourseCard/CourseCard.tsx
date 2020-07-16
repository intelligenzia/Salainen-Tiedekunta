import React from 'react';
import styled from 'styled-components';
import Image, { FluidObject } from 'gatsby-image';
import { ContentfulTeacher } from '../../../types/graphql-types';
import { Link } from 'gatsby';

interface Props {
  name: string;
  courseId: string;
  ects: string;
  teachers: ContentfulTeacher[];
}

const CourseCard = (props: Props) => {
  const { name, courseId, ects, teachers } = props;

  return (
    <Container>
      <Link to={`course/${courseId}`}>
        <Name>
          {courseId} : {name}
        </Name>
        <div>{ects} op</div>
        {teachers && (
          <>
            {teachers.map(teacher => {
              if (!teacher.avatar || !teacher.avatar.fluid) return null;
              return teacher ? <Teacher fluid={teacher.avatar?.fluid} /> : null;
            })}
          </>
        )}
      </Link>
    </Container>
  );
};

export default CourseCard;

const Container = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid black;
  margin: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 33%;
  width: 100%;
`;

const Name = styled.h4``;

const Teacher = styled(Image)`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  border: 2px solid black;
  box-sizing: border-box;
  transition: 0.7s ease-in-out transform;
  &:hover {
    transform: rotate(1080deg);
  }
`;
