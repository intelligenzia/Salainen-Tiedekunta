import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ContentfulRichText from '../components/contentfulRichText'
import CourseCard from '../components/CourseCard/CourseCard'

type Props = {
  contentfulMajor: any
}

const Major: FC<PageProps<Props>> = ({
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
  location,
}) => {
  return (
    <Layout>
      <SEO title={name} description={excerpt} pathname={location.pathname} />

      <h1>{name}</h1>
      <TinyInfo>Voimassaolo {createdAt} – </TinyInfo>
      <TinyInfo>Tiedot päivitetty {updatedAt} </TinyInfo>

      <h2>Opinto-ohjelman esittely</h2>
      <ContentfulRichText document={json} />

      <h2>Kurssit</h2>
      <p>Seuraavat kurssit ovat pakollisia</p>

      {courses &&
        courses.map((course, index) => {
          const { courseId, name: courseName, ects, teacher } = course
          return (
            <CourseCard
              key={index}
              name={courseName}
              courseId={courseId}
              ects={ects}
              teachers={teacher}
            />
          )
        })}

      <h3>Muita Opintosuuntauksia</h3>
    </Layout>
  )
}

export default Major

export const pageQuery = graphql`
  query MajorBySlug($slug: String!, $previous: String, $next: String) {
    contentfulMajor(slug: { eq: $slug }) {
      ...MajorFragment
    }
    nextMajor: contentfulMajor(slug: { eq: $previous }) {
      ...MajorFragment
    }
    previousMajor: contentfulMajor(slug: { eq: $next }) {
      ...MajorFragment
    }
  }
`

const TinyInfo = styled.p`
  font-size: 0.9rem;
  color: var(--secondary-text);
  margin: 0.2rem 0rem;
`
