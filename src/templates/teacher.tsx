import React, { FC } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { ContentfulTeacher } from '../../types/graphql-types';
import { H1 } from '../components/primitives';

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
      <time dateTime={createdAt}>{createdAt}</time>
      <time dateTime={updatedAt}>{updatedAt}</time>

      <h3>Opettajan järjestämä opetus</h3>
      {course &&
        course.map(c => (
          <Link to={`course/${c?.courseId}`} key={c?.id}>
            <h4>
              {c?.courseId} - {c?.name}
            </h4>
          </Link>
        ))}
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
        name
        courseId
      }
      createdAt(formatString: "DD.MM.YYYY")
      updatedAt(formatString: "DD.MM.YYYY")
    }
  }
`;