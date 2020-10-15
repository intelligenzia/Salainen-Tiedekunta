import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import {
  AllTeachersQueryQuery,
  ContentfulTeacher,
} from '../../types/graphql-types';
import Layout from '../components/layout';
import { H1 } from '../components/primitives';
import SEO from '../components/seo';
import TeacherCard from '../components/TeacherCard/TeacherCard';

const IndexPage: FC<PageProps> = ({ location }) => {
  const data: AllTeachersQueryQuery = useStaticQuery(graphql`
    query allTeachersQuery {
      allContentfulTeacher {
        nodes {
          id
          name
          slug
          avatar {
            fluid(maxWidth: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `);

  const teachers = data.allContentfulTeacher.nodes.sort(
    (
      a: Pick<ContentfulTeacher, 'id' | 'name' | 'slug'>,
      b: Pick<ContentfulTeacher, 'id' | 'name' | 'slug'>
    ) => a?.name?.localeCompare(b?.name ?? 'a') ?? 0
  );

  return (
    <Layout>
      <SEO
        title="Opettajat"
        description="Kaikki Salaisen Tiedekunnan palveluksessa olevat opettajat"
        pathname={location.pathname}
      />
      <H1>Opettajat</H1>

      {teachers.map(node => (
        <TeacherCard
          name={node.name}
          slug={node.slug}
          key={node.id}
          avatar={node.avatar?.fluid}
        />
      ))}
    </Layout>
  );
};

export default IndexPage;
