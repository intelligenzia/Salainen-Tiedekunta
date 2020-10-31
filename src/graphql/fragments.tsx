import { graphql } from 'gatsby'

export const lessonFragment = graphql`
  fragment CourseFragment on ContentfulCourse {
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
          ...GatsbyContentfulFluid
        }
      }
    }
    major {
      slug
      name
    }
  }
`

export const teacherFragment = graphql`
  fragment TeacherFragment on ContentfulTeacher {
    id
    slug
    name
    course {
      id
      name
      courseId
    }
    createdAt(formatString: "DD.MM.YYYY")
    updatedAt(formatString: "DD.MM.YYYY")
  }
`

export const majorFragment = graphql`
  fragment MajorFragment on ContentfulMajor {
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
`
