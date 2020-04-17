import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { AllTeachersQueryQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const Teachers: React.FC = ({ location }) => {
  const data: any = useStaticQuery(graphql`
    query AllCoursesQuery {
      allContentfulCourse {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `);

  const courses = data.allContentfulCourse.edges;

  return (
    <Layout>
      <SEO
        title="Kaikki Salaisen Tiedekunnan Kurssit"
        pathname={location.pathname}
      />
      {courses.map(({ node }) => (
        <div key={node.id}>
          <p>{node.name}</p>
        </div>
      ))}
    </Layout>
  );
};

export default Teachers;
