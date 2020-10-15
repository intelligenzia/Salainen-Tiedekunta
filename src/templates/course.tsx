import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import { ContentfulCourse } from '../../types/graphql-types';
import ContentfulRichText from '../components/contentfulRichText';
import CourseCard from '../components/CourseCard/CourseCard';
import Layout from '../components/layout';
import { H1, CourseContainer } from '../components/primitives';
import SEO from '../components/seo';
import TeacherCard from '../components/TeacherCard/TeacherCard';
import { Icon } from '../components/Icons/Icons';
import styled from 'styled-components';

interface Props {
  contentfulCourse: ContentfulCourse;
}

const Course: FC<PageProps<Props>> = props => {
  const {
    data: {
      contentfulCourse: {
        name = '',
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
      <SEO title={name} description={excerpt} pathname={location.pathname} />
      <H1>{name}</H1>
      <time></time>

      {teachers && (
        <>
          <h3>Luennoitsijat</h3>
          <Teachers>
            {teachers?.map(teacher => (
              <TeacherCard
                name={teacher?.name}
                slug={teacher?.slug}
                avatar={teacher?.avatar}
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

      <h3>Muita samanlaisia kursseja</h3>

      <CourseContainer>
        {next && (
          <CourseCard
            name={next.name}
            courseId={next.courseId}
            teachers={[]}
            ects={3}
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
  query($courseId: String!) {
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
            src
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
`;
