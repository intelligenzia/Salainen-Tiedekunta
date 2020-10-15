import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { AllTeachersQueryQuery } from '../../types/graphql-types';
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
        }
      }
    }
  `);

  const teachers = data.allContentfulTeacher.nodes.sort((a, b) =>
    a.name.localeCompare(b.name)
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
        <TeacherCard name={node.name} slug={node.slug} key={node.id} />
      ))}
    </Layout>
  );
};

export default IndexPage;
