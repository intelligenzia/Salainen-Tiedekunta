import { graphql } from 'gatsby';
import React, { FC } from 'react';
import { ContentfulCourse } from '../../types/graphql-types';
import ContentfulRichText from '../components/contentfulRichText';
import CourseCard from '../components/CourseCard/CourseCard';
import Layout from '../components/layout';
import { H1 } from '../components/primitives';
import SEO from '../components/seo';
import TeacherCard from '../components/TeacherCard/TeacherCard';

interface Props {
  data: {
    contentfulCourse: ContentfulCourse;
  };
}

const Course: FC<Props> = (props: Props) => {
  console.log(props);
  const {
    data: {
      contentfulCourse: {
        name = '',
        teacher,
        description: {
          json,
          fields: { excerpt },
        },
      },
    },
    pageContext: { next, previous },
  } = props;

  return (
    <Layout>
      <SEO title={name} description={excerpt} />
      <H1>{name}</H1>
      <time></time>

      <h3>Luennoitsijat</h3>
      {teacher?.map(t => (
        <TeacherCard name={t.name} slug={t.slug} />
      ))}

      <h3>Kurssin esittely</h3>
      <ContentfulRichText document={json} />

      <h3>Muita samanlaisia kursseja</h3>

      <div>
        <CourseCard
          name={next.name}
          courseId={next.courseId}
          teachers={[]}
          ects={3}
        />
        <CourseCard
          name={previous.name}
          courseId={previous.courseId}
          teachers={[]}
          ects={3}
        />
      </div>
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
      }
      major {
        slug
        name
      }
    }
  }
`;
