import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { AllTeachersQueryQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { H1 } from '../components/primitives';

const IndexPage: React.FC = () => {
  const data: AllTeachersQueryQuery = useStaticQuery(graphql`
    query allTeachersQuery {
      allContentfulTeacher {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  const teachers = data.allContentfulTeacher.edges;

  return (
    <Layout>
      <SEO
        title="Opettajat"
        description="Kaikki Salaisen Tiedekunnan palveluksessa olevat opettajat"
      />
      <H1>Opettajat</H1>

      <TeacherCards>
        {teachers.map(({ node }) => (
          <TeacherCard key={node.id}>
            <Name>{node.name}</Name>
          </TeacherCard>
        ))}
      </TeacherCards>
    </Layout>
  );
};

export default IndexPage;

const TeacherCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  grid-auto-rows: minmax(300px, auto);
`;

const TeacherCard = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;

const Name = styled.h3`
  text-align: center;
`;
