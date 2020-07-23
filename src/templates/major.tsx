import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ContentfulRichText from '../components/contentfulRichText';
import styled from 'styled-components';
import CourseCard from '../components/CourseCard/CourseCard';
import { Section } from '../components/primitives';

interface TemplateProps {
  data: any;
  pageContext: {
    next?: {
      name: string;
      slug: string;
    };
    previous?: {
      name: string;
      slug: string;
    };
  };
}

const Major = (props: TemplateProps) => {
  const {
    data: {
      contentfulMajor: {
        slug,
        name,
        createdAt,
        updatedAt,
        courses,
        introduction: {
          json,
          fields: { excerpt },
        },
      },
    },
    pageContext: { next, previous },
  } = props;

  console.log(courses);
  return (
    <Layout>
      <SEO title={name} description={excerpt} />

      <Flag>Opetussuuntaus</Flag>
      <h1>{name}</h1>
      <InfoContainer>
        <TinyInfo>Voimassaolo {createdAt} – </TinyInfo>
        <TinyInfo>Tiedot päivitetty {updatedAt} </TinyInfo>
      </InfoContainer>

      <Section>
        <h2>Opinto-ohjelman esittely</h2>
        <ContentfulRichText document={json} />
      </Section>

      <Section>
        <h2>Kurssit</h2>
        <p>Seuraavat kurssit ovat pakollisia</p>

        <Courses>
          {courses &&
            courses.map((course, index) => {
              const { courseId, name: courseName, ects, teacher } = course;
              return (
                <CourseCard
                  key={index}
                  name={courseName}
                  courseId={courseId}
                  ects={ects}
                  teachers={teacher}
                />
              );
            })}
        </Courses>
      </Section>
      <Section>
        <h3>Muita Opintosuuntauksia</h3>
      </Section>
    </Layout>
  );
};

export default Major;

export const pageQuery = graphql`
  query MajorBySlug($slug: String!) {
    contentfulMajor(slug: { eq: $slug }) {
      id
      slug
      name
      introduction {
        json
        fields {
          excerpt
        }
      }
      courses {
        name
        courseId
        ects
        teacher {
          id
          avatar {
            fluid(maxWidth: 30) {
              srcSet
            }
          }
        }
      }
      createdAt(formatString: "DD.MM.YYYY")
      updatedAt(formatString: "DD.MM.YYYY")
      courses {
        courseId
      }
    }
  }
`;

const TinyInfo = styled.p`
  font-size: 0.9rem;
  color: var(--secondary-text);
  margin: 0.2rem 0rem;
`;

const Courses = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -0.5rem 2rem;
`;

const Flag = styled.div`
  padding: 0.5rem;
  font-size: 0.7rem;
  font-style: bold;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #cecece;
  display: inline-block;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5rem;
`;
