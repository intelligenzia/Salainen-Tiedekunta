import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import { ContentfulCourse } from '../../types/graphql-types';
import ContentfulRichText from '../components/contentfulRichText';
import CourseCard from '../components/CourseCard/CourseCard';
import Layout from '../components/layout';
import { H1, Section } from '../components/primitives';
import SEO from '../components/seo';
import TeacherCard from '../components/TeacherCard/TeacherCard';
import styled from 'styled-components';
import { useTrail, animated } from 'react-spring';

type Props = {
  data: {
    contentfulCourse: ContentfulCourse;
    previous: ContentfulCourse;
    next: ContentfulCourse;
  };
};
const config = { mass: 5, tension: 2000, friction: 200 };

const Course: FC<PageProps<Props>> = (props: Props) => {
  console.log(props);
  const {
    data: {
      contentfulCourse: {
        name = '',
        teacher: teachers,
        description: {
          json,
          fields: { excerpt },
        },
      },
      nextLesson: next,
      previousLesson: previous,
    },
  } = props;

  const trail = useTrail(teachers?.length, {
    config,
    opacity: 1,
    x: 0,
    height: 80,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <Layout>
      <SEO title={name as string} description={excerpt} />

      <Flag>Kurssi</Flag>
      <H1>{name}</H1>
      <time></time>

      <Section>
        {teachers && (
          <>
            <h3>Luennoitsijat</h3>
            {trail.map(({ x, height, ...rest }, index) => (
              <animated.div
                key={teachers[index].slug}
                style={{
                  ...rest,
                  transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
                }}
              >
                <TeacherCard
                  name={teachers[index].name}
                  slug={teachers[index].slug}
                  avatar={teachers[index].avatar.fluid}
                />
              </animated.div>
            ))}
          </>
        )}
      </Section>

      <Section>
        <h3>Kurssin esittely</h3>
        <ContentfulRichText document={json} />
      </Section>

      <Section>
        <h3>Muita samanlaisia kursseja</h3>

        <MoreCourses>
          {next && (
            <CourseCard
              name={next.name}
              courseId={next.courseId}
              teachers={next.teacher}
              ects={next.ects}
            />
          )}
          {previous && (
            <CourseCard
              name={previous.name}
              courseId={previous.courseId}
              teachers={previous.teacher}
              ects={previous.ects}
            />
          )}
        </MoreCourses>
      </Section>
    </Layout>
  );
};

export default Course;

export const pageQuery = graphql`
  query($courseId: String!, $next: String, $previous: String) {
    contentfulCourse(courseId: { eq: $courseId }) {
      name
      id
      ects
      description {
        json
        fields {
          excerpt
        }
      }
      courseId
      createdAt(fromNow: false)
      updatedAt
      teacher {
        slug
        name
        avatar {
          fluid(maxWidth: 30) {
            srcSet
          }
        }
      }
      major {
        slug
        name
      }
    }

    nextLesson: contentfulCourse(courseId: { eq: $next }) {
      name
      id
      ects
      description {
        json
        fields {
          excerpt
        }
      }
      courseId
      createdAt(fromNow: false)
      updatedAt
      teacher {
        slug
        name
        avatar {
          fluid(maxWidth: 30) {
            srcSet
          }
        }
      }
      major {
        slug
        name
      }
    }

    previousLesson: contentfulCourse(courseId: { eq: $previous }) {
      name
      id
      ects
      description {
        json
        fields {
          excerpt
        }
      }
      courseId
      createdAt(fromNow: false)
      updatedAt
      teacher {
        slug
        name
        avatar {
          fluid(maxWidth: 30) {
            srcSet
          }
        }
      }
      major {
        slug
        name
      }
    }
  }
`;

const MoreCourses = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2rem -0.5rem;
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
