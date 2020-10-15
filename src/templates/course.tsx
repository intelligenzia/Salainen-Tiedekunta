import { graphql, Link, PageProps } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { ContentfulTeacher, CoursePageQuery } from '../../types/graphql-types';
import ContentfulRichText from '../components/contentfulRichText';
import CourseCard from '../components/CourseCard/CourseCard';
import { Icon } from '../components/Icons/Icons';
import Layout from '../components/layout';
import { CourseContainer, H1 } from '../components/primitives';
import SEO from '../components/seo';
import TeacherCard from '../components/TeacherCard/TeacherCard';
import devices from '../helpers/devices';

const Course: FC<PageProps<CoursePageQuery>> = props => {
  const {
    data: {
      contentfulCourse: {
        name = '',
        major: majors,
        teacher: teachers,
        description: {
          json,
          fields: { excerpt },
        },
      },
    },
    location,
    pageContext: { next, previous },
  } = props;

  return (
    <Layout>
      <SEO
        title={`${name}`}
        description={excerpt}
        pathname={location.pathname}
      />

      {majors && (
        <Major to={`/major/${majors[0].slug}`}>{majors[0].name}</Major>
      )}

      <H1>{name}</H1>

      {teachers && (
        <>
          <h3>Luennoitsijat</h3>
          <Teachers>
            {teachers?.map(teacher => (
              <TeacherCard
                name={teacher?.name}
                slug={teacher?.slug}
                avatar={teacher?.avatar?.fluid}
              />
            ))}
          </Teachers>
        </>
      )}

      <h3>
        <Icon
          height="30px"
          width="30px"
          stroke="none"
          fill="currentColor"
          name="teacher"
        />
        Kurssin esittely
      </h3>
      <ContentfulRichText document={json} />

      <h3>Muita vastaavia kursseja</h3>

      <CourseContainer>
        {next && (
          <CourseCard
            name={next.name}
            courseId={next.courseId}
            teachers={[]}
            ects={`${3}`}
          />
        )}

        {previous && (
          <CourseCard
            name={previous.name}
            courseId={previous.courseId}
            teachers={[]}
            ects={3}
          />
        )}
      </CourseContainer>
    </Layout>
  );
};

export default Course;

export const pageQuery = graphql`
  query CoursePage($courseId: String!) {
    contentfulCourse(courseId: { eq: $courseId }) {
      name
      id
      ects
      description {
        json
        fields {
          excerpt
        }
      }
      courseId
      createdAt(fromNow: false)
      updatedAt
      teacher {
        slug
        name
        avatar {
          fluid(maxWidth: 30) {
            ...GatsbyContentfulFluid
          }
        }
      }
      major {
        slug
        name
      }
    }
  }
`;

const Teachers = styled.div`
  margin: 2rem 0rem 4rem;
  display: block;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 0px #27272738;

  @media ${devices.tablet} {
    width: 50%;
  }
`;

const Major = styled(Link)`
  display: inline-block;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  box-sizing: border-box;
  background-color: ${({ theme }): string => theme.gray};
  color: ${({ theme }): string => theme.textPrimary};
  margin-bottom: 0.8rem;
`;
