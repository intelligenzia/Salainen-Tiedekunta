import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import {
  AllTeachersQueryQuery,
  AllMajorsQueryQuery,
} from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved
import { H1 } from '../components/primitives';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import CourseCard from '../components/CourseCard/CourseCard';
import styled from 'styled-components';
import ContentfulRichText from '../components/contentfulRichText';

const Majors: React.FC = () => {
  const data: AllMajorsQueryQuery = useStaticQuery(graphql`
    query allMajorsQuery {
      allContentfulMajor {
        edges {
          node {
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
    }
  `);

  const majors = data.allContentfulMajor.edges;

  return (
    <Layout>
      <SEO
        title="Pääaineet"
        description="Kaikki Salaisen Tiedekunnan opetuksessa olevat opintokokonaisuudet"
      />
      <H1>Opintokokonaisuudet</H1>

      {majors.map(({ node }) => (
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
  margin: 2rem -0.5rem 2rem;
`;
