import { graphql, PageProps, useStaticQuery } from 'gatsby';
import React from 'react';
import CourseCard from '../components/CourseCard/CourseCard';
import Layout from '../components/layout';
import { CourseContainer } from '../components/primitives';
import SEO from '../components/seo';

const Teachers: React.FC<PageProps> = ({ location }) => {
  const data: any = useStaticQuery(graphql`
    query AllCoursesQuery {
      allContentfulCourse {
        nodes {
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
  `);

  const courses = data.allContentfulCourse.nodes;

  return (
    <Layout>
      <SEO
        title="Kaikki Salaisen Tiedekunnan Kurssit"
        pathname={location.pathname}
      />
      <h1>Kaikki tiedekunnan kurssit</h1>
      <CourseContainer>
        {courses.map((node: ContentfulCourse) => (
          <CourseCard
            key={`${node.courseId}`}
            courseId={node.courseId}
            name={node.name}
            ects={node.ects}
            introduction={node.description.fields.excerpt}
            teachers={node.teacher}
          />
        ))}
      </CourseContainer>
    </Layout>
  );
};

export default Teachers;
