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
  location: any;
}

const Teacher: FC<Props> = ({
  data: { contentfulTeacher },
  location,
}: Props) => {
  const {
    name = 'Perttu Lähteenlahti',
    createdAt,
    updatedAt,
    course,
  } = contentfulTeacher;

  return (
    <Layout>
      <SEO title={name as string} pathname={location.pathname} />
      <H1>{name}</H1>
      <time dateTime={createdAt}>{createdAt}</time>
      <time dateTime={updatedAt}>{updatedAt}</time>

      <h3>Opettajan järjestämä opetus</h3>
      {course &&
        course.map(c => (
          <Link to={`/course/${c?.courseId}`} key={c?.id}>
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
      ...TeacherFragment
    }
  }
`;
