import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  getCourse,
  getCourses,
  getMajor,
  getMajors,
  getTeacher,
  getTeachers,
  majorCourses,
  type CourseEntry,
  type MajorEntry,
  type TeacherEntry,
} from '../contentful';

export const queryKeys = {
  courses: ['courses'] as const,
  course: (id: string) => ['course', id] as const,
  majors: ['majors'] as const,
  major: (slug: string) => ['major', slug] as const,
  teachers: ['teachers'] as const,
  teacher: (slug: string) => ['teacher', slug] as const,
};

// `initialData` comes from a web route loader (pre-rendered HTML). Marking it
// as old makes the client refetch fresh content right after hydration.
const fromLoader = <T,>(data: T | null | undefined) =>
  data ? { initialData: data, initialDataUpdatedAt: 0 } : {};

export function useCourses(initial?: CourseEntry[] | null) {
  return useQuery({ queryKey: queryKeys.courses, queryFn: getCourses, ...fromLoader(initial) });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: queryKeys.course(id),
    queryFn: () => getCourse(id),
    enabled: !!id,
  });
}

export function useMajors(initial?: MajorEntry[] | null) {
  return useQuery({ queryKey: queryKeys.majors, queryFn: getMajors, ...fromLoader(initial) });
}

export function useMajor(slug: string) {
  return useQuery({
    queryKey: queryKeys.major(slug),
    queryFn: () => getMajor(slug),
    enabled: !!slug,
  });
}

// Majors whose curriculum includes the given course entry
export function useMajorsForCourse(courseEntryId: string | undefined) {
  const { data: majors } = useMajors();
  return useMemo(
    () =>
      courseEntryId && majors
        ? majors.filter((m) => majorCourses(m).some((c) => c.sys.id === courseEntryId))
        : [],
    [majors, courseEntryId]
  );
}

export function useTeachers(initial?: TeacherEntry[] | null) {
  return useQuery({ queryKey: queryKeys.teachers, queryFn: getTeachers, ...fromLoader(initial) });
}

export function useTeacher(slug: string) {
  return useQuery({
    queryKey: queryKeys.teacher(slug),
    queryFn: () => getTeacher(slug),
    enabled: !!slug,
  });
}

export function usePrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchCourse: (id: string) =>
      queryClient.prefetchQuery({ queryKey: queryKeys.course(id), queryFn: () => getCourse(id) }),
    prefetchMajor: (slug: string) =>
      queryClient.prefetchQuery({ queryKey: queryKeys.major(slug), queryFn: () => getMajor(slug) }),
    prefetchTeacher: (slug: string) =>
      queryClient.prefetchQuery({ queryKey: queryKeys.teacher(slug), queryFn: () => getTeacher(slug) }),
  };
}
