import { graphql, Link, PageProps, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import { AllMajorsQueryQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved
import ContentfulRichText from '../components/contentfulRichText';
import CourseCard from '../components/CourseCard/CourseCard';
import Layout from '../components/layout';
import { H1 } from '../components/primitives';
import SEO from '../components/seo';

const Majors: FC<PageProps> = ({ pageContext: { path } }) => {
  const data: AllMajorsQueryQuery = useStaticQuery(graphql`
    query allMajorsQuery {
      allContentfulMajor {
        nodes {
          name
          id
          slug
          introduction {
            json
          }
          courses {
            name
            courseId
            ects
            description {
              fields {
                excerpt
              }
            }
            teacher {
              avatar {
                fluid(maxWidth: 30) {
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  `);

  const majors = data.allContentfulMajor.nodes;

  return (
    <Layout>
      <SEO
        title="Pääaineet"
        description="Kaikki Salaisen Tiedekunnan opetuksessa olevat opintokokonaisuudet"
        pathname={path}
      />
      <H1>Opintokokonaisuudet</H1>

      {majors.map(node => (
        <div key={node.id}>
          <Link to={`major/${node.slug}`}>
            <h3>{node.name}</h3>
          </Link>
          <ContentfulRichText document={node.introduction?.json} />
          <Courses>
            {node.courses &&
              node.courses.map(course => (
                <CourseCard
                  key={course.courseId}
                  description={course.description.fields.excerpt}
                  name={course.name}
                  courseId={course.courseId}
                  ects={course.ects}
                  teachers={course?.teacher}
                />
              ))}
          </Courses>
        </div>
      ))}
    </Layout>
  );
};

export default Majors;

const Courses = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--secondary-text);
  margin-bottom: 2rem;
`;
