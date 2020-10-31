import React, { FC } from 'react'
import {
  BLOCKS,
  INLINES,
  // , MARKS, Document, Block
} from '@contentful/rich-text-types'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'
import { Tooltip } from 'react-tippy'
import { Link } from 'gatsby'
import { isIdentifier } from 'typescript'
import {
  ContentfulCourse,
  ContentfulMajor,
  ContentfulTeacher,
} from '../../types/graphql-types'
import TeacherCard from './TeacherCard/TeacherCard'
import CourseCard from './CourseCard/CourseCard'

type Props = {
  document: {
    nodeType: BLOCKS.DOCUMENT
    content: any[]
    data: any
  }
}

function getObjectKeyArray(obj: any): string[] {
  if (typeof obj !== 'object') return []
  const arr: string[] = []
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    arr.push(key)
  }
  return arr
}

const ContentfulRichText: React.FC<Props> = ({ document }: Props) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        if (!node.data.target.fields) return
        const { file, description } = node.data.target.fields
        const locales = getObjectKeyArray(file)
        // eslint-disable-next-line consistent-return
        return locales.map(locale => (
          <img
            src={file[locale].url}
            alt={description[locale]}
            data-locale={locale}
            key={locale}
          />
        ))
      },
      // eslint-disable-next-line react/display-name
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        return (
          <InlineEntry
            nodeType={node.data.target.sys.contentType.sys.id}
            fields={node.data.target.fields}
          />
        )
      },
      // eslint-disable-next-line react/display-name
      [INLINES.EMBEDDED_ENTRY]: node => {
        return (
          <EmbeddedEntry
            nodeType={node.data.target.sys.contentType.sys.id}
            fields={node.data.target.fields}
          />
        )
      },
    },
  }
  return <div>{documentToReactComponents(document, options)}</div>
}
export default ContentfulRichText

type EmbedProps = {
  nodeType: string
  fields: ContentfulTeacher | ContentfulCourse | ContentfulMajor
}

const EmbeddedEntry: FC<EmbedProps> = ({ fields, nodeType }) => {
  switch (nodeType) {
    case 'teacher': {
      const teacher = fields as ContentfulTeacher
      return (
        <TeacherCard
          name={teacher.name}
          slug={teacher.slug}
          avatar={teacher.avatar?.fluid}
        />
      )
    }
    case 'course': {
      const course = fields as ContentfulCourse
      return (
        <CourseCard
          name={`${course.name}`}
          ects={`${course.ects}`}
          courseId={`${course.courseId}`}
          introduction=""
          teachers={[]}
        />
      )
    }
    case 'major':
      return <></>
    default:
      return <></>
  }
}

EmbeddedEntry.displayName = 'EmbeddedEntry'

type InlineEntryProps = {
  nodeType: string
  fields: ContentfulTeacher | ContentfulCourse | ContentfulMajor
}

const InlineEntry: FC<InlineEntryProps> = ({ nodeType, fields }) => {
  switch (nodeType) {
    case 'teacher': {
      const teacher = fields as ContentfulTeacher
      return (
        <Tooltip title={`${teacher.name}`} arrow>
          <CourseLink to={`/teacher/${teacher.slug}`}>
            <Name>{teacher.name}</Name>
          </CourseLink>
        </Tooltip>
      )
    }
    case 'course': {
      const course = fields as ContentfulCourse
      return (
        <Tooltip title={`${course.courseId}: ${course.name}`} arrow>
          <CourseLink to={`/course/${course.courseId}`}>
            <Name>{course.name}</Name>
          </CourseLink>
        </Tooltip>
      )
    }
    case 'major': {
      const major = fields as ContentfulMajor
      return (
        <Tooltip title={`${major.name}`} arrow>
          <CourseLink to={`/major/${major.slug}`}>
            <Name>{major.name}</Name>
          </CourseLink>
        </Tooltip>
      )
    }
    default:
      return <></>
  }
}

InlineEntry.displayName = 'InlineEntry'

const CourseLink = styled(Link)``
const Name = styled.span``
