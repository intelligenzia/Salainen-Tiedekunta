import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import CourseCard from '../components/CourseCard/CourseCard';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { CourseContainer } from '../components/primitives';

const Teachers: React.FC = ({ location }: any) => {
  const data: any = useStaticQuery(graphql`
    query AllCoursesQuery {
      allContentfulCourse {
        edges {
          node {
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
  `);

  const courses = data.allContentfulCourse.edges;

  console.log(courses);
  return (
    <Layout>
      <SEO
        title="Kaikki Salaisen Tiedekunnan Kurssit"
        pathname={location.pathname}
      />
      <h1>Kaikki tiedekunnan kurssit</h1>
      <CourseContainer>
        {courses.map(({ node }: { node: ContentfulCourse }, index: number) => (
          <CourseCard
            key={index}
            courseId={node.courseId}
            name={node.name}
            ects={node.ects}
            teachers={node.teacher}
          />
        ))}
      </CourseContainer>
    </Layout>
  );
};

export default Teachers;
