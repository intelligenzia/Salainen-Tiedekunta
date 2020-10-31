import { graphql, PageProps, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'
import {
  AllTeachersQueryQuery,
  ContentfulTeacher,
} from '../../types/graphql-types'
import Layout from '../components/layout'
import { H1, P } from '../components/primitives'
import SEO from '../components/seo'
import TeacherCard from '../components/TeacherCard/TeacherCard'
import devices from '../helpers/devices'

const IndexPage: FC<PageProps> = ({ location }) => {
  const data: AllTeachersQueryQuery = useStaticQuery(graphql`
    query allTeachersQuery {
      allContentfulTeacher {
        nodes {
          id
          name
          slug
          avatar {
            fluid(maxWidth: 100) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `)

  const teachers = data.allContentfulTeacher.nodes.sort(
    (
      a: Pick<ContentfulTeacher, 'id' | 'name' | 'slug'>,
      b: Pick<ContentfulTeacher, 'id' | 'name' | 'slug'>
    ) => a?.name?.localeCompare(b?.name ?? 'a') ?? 0
  )

  return (
    <Layout>
      <SEO
        title="Opettajat"
        description="Kaikki Salaisen Tiedekunnan palveluksessa olevat opettajat"
        pathname={location.pathname}
      />
      <H1>Opettajat</H1>

      <P>
        Salaisen Tiedekunnan palveluksessa on tällä hetkellä {teachers.length}{' '}
        opettajaa.
      </P>
      <Teachers>
        {teachers.map(node => (
          <TeacherCard
            name={node.name}
            slug={node.slug}
            key={node.id}
            avatar={node.avatar?.fluid}
          />
        ))}
      </Teachers>
    </Layout>
  )
}

export default IndexPage

const Teachers = styled.div`
  margin: 2rem 0rem 4rem;
  display: block;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 0px #27272738;

  @media ${devices.tablet} {
    width: 50%;
  }
`
