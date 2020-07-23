import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import { device, H1, Section } from '../components/primitives';
import SEO from '../components/seo';
import { AllTeachersQueryQuery } from '../../types/graphql-types';
import TeacherCard from '../components/TeacherCard/TeacherCard';

const IndexPage: React.FC = () => {
  const data: AllTeachersQueryQuery = useStaticQuery(graphql`
    query allTeachersQuery {
      allContentfulTeacher {
        edges {
          node {
            id
            name
            slug
            avatar {
              fluid(maxWidth: 30) {
                srcSet
              }
            }
          }
        }
      }
    }
  `);

  const teachers = data.allContentfulTeacher.edges;

  console.log(teachers);

  return (
    <Layout>
      <SEO
        title="Opettajat"
        description="Kaikki Salaisen Tiedekunnan palveluksessa olevat opettajat"
      />
      <H1>Opettajat</H1>

      <p>
        Tällä hetkellä seuraavat henkilöt vastaavat kaikesta Salaisen Tiedekunna
        opetuksesta. Opettajien kohdalla käytetään salanimiä ellei asiasta ole
        erikseen mainittu. Opettajia ja sekä vierailevia luennoitsijoita
        koskevat samat käytännöt. Luennoitsijoita ei saa ruokkia.
      </p>

      <Section>
        {teachers.map(({ node: teacher }) => (
          <TeacherCard
            slug={teacher.slug}
            avatar={teacher.avatar?.fluid}
            name={teacher.name}
          />
        ))}
      </Section>
    </Layout>
  );
};

export default IndexPage;
