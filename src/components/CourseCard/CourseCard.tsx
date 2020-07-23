import React, { FC } from 'react';
import styled from 'styled-components';
import Image, { FluidObject } from 'gatsby-image';
import { ContentfulTeacher } from '../../../types/graphql-types';
import { Link } from 'gatsby';
import { device } from '../primitives';

type Props = {
  name: string;
  courseId: string;
  ects: string;
  teachers: ContentfulTeacher[];
};

const CourseCard: FC<Props> = ({ name, courseId, ects, teachers }) => {
  return (
    <Container>
      <Link to={`/course/${courseId}`}>
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
  margin: 1rem 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;

  @media ${device.desktopL} {
    max-width: calc(25% - 2 * 0.5rem);
    flex: 1 1 calc(25% - 2 * 0.5rem);
  }

  @media ${device.desktop} {
    max-width: calc(50% - 2 * 0.5rem);
    flex: 1 1 calc(50% - 2 * 0.5rem);
  }

  @media ${device.laptopL} {
    max-width: calc(50% - 2 * 0.5rem);
    flex: 1 1 calc(50% - 2 * 0.5rem);
  }

  @media ${device.laptop} {
    max-width: calc(50% - 2 * 0.5rem);
    flex: 1 1 calc(50% - 2 * 0.5rem);
  }

  @media ${device.tabletL} {
    max-width: calc(100% - 2 * 0.5rem);
    flex: 1 1 calc(100% - 2 * 0.5rem);
  }

  @media ${device.tablet} {
    max-width: calc(100% - 2 * 0.5rem);
    flex: 1 1 calc(100% - 2 * 0.5rem);
  }

  @media ${device.mobileL} {
    max-width: 100%;
    flex: 1 1 100%;
  }

  @media ${device.mobileM} {
    max-width: 100%;
    flex: 1 1 100%;
  }

  @media ${device.mobileS} {
    max-width: 100%;
    flex: 1 1 100%;
  }

  a {
    text-decoration: none;
  }
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
