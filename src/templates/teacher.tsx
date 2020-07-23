import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { ContentfulTeacher } from '../../types/graphql-types';
import { H1, Section } from '../components/primitives';
import CourseCard from '../components/CourseCard/CourseCard';
import styled from 'styled-components';

interface Props {
  data: {
    contentfulTeacher: ContentfulTeacher;
  };
}

const Teacher: FC<Props> = ({ data: { contentfulTeacher } }: Props) => {
  const {
    name = 'Perttu Lähteenlahti',
    createdAt,
    updatedAt,
    course,
  } = contentfulTeacher;

  return (
    <Layout>
      <SEO title={name} />
      <H1>{name}</H1>
      <Created>
        Saavuitte tietoisuuden: <time dateTime={createdAt}>{createdAt}</time>
      </Created>
      <Updated>
        Viimeksi kyseenalaistanut todellisuuden:
        <time dateTime={updatedAt}>{updatedAt}</time>
      </Updated>

      <Section>
        <h3>Opettajan järjestämä opetus</h3>
        <Courses>
          {course &&
            course.map(c => (
              <CourseCard
                courseId={c?.courseId}
                name={c?.name}
                ects={c?.ects}
                teachers={c?.teacher}
              />
            ))}
        </Courses>
      </Section>
    </Layout>
  );
};

export default Teacher;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulTeacher(slug: { eq: $slug }) {
      id
      slug
      name
      course {
        id
        ects
        name
        courseId
      }
      createdAt(formatString: "DD.MM.YYYY")
      updatedAt(formatString: "DD.MM.YYYY")
    }
  }
`;

const Courses = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -0.5rem 2rem;
`;

const Created = styled.span``;

const Updated = styled.span``;
