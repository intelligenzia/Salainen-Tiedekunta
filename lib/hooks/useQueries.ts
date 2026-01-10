import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourses, getMajors, getTeachers, getCourse, getMajor, getTeacher } from '../contentful';
import type { CourseEntry, MajorEntry, TeacherEntry } from '../contentful';

// Query keys
export const queryKeys = {
  courses: ['courses'] as const,
  course: (id: string) => ['course', id] as const,
  majors: ['majors'] as const,
  major: (slug: string) => ['major', slug] as const,
  teachers: ['teachers'] as const,
  teacher: (slug: string) => ['teacher', slug] as const,
};

// Placeholder data
const placeholderCourses: CourseEntry[] = [
  { sys: { id: '1' }, fields: { courseId: 'KOG-101', name: 'Johdatus kognitiotieteeseen', ects: 5 } },
  { sys: { id: '2' }, fields: { courseId: 'KOG-102', name: 'Kognitiivinen psykologia', ects: 5 } },
  { sys: { id: '3' }, fields: { courseId: 'NEU-101', name: 'Neurotieteen perusteet', ects: 5 } },
];

const placeholderMajors: MajorEntry[] = [
  { sys: { id: '1' }, fields: { name: 'Kognitiotiede', slug: 'kognitiotiede' } },
  { sys: { id: '2' }, fields: { name: 'Neurotiede', slug: 'neurotiede' } },
];

const placeholderTeachers: TeacherEntry[] = [
  { sys: { id: '1' }, fields: { name: 'Prof. Matti Meikäläinen', slug: 'matti-meikalainen' } },
  { sys: { id: '2' }, fields: { name: 'Dr. Maija Virtanen', slug: 'maija-virtanen' } },
];

// Courses hooks
export function useCourses() {
  return useQuery({
    queryKey: queryKeys.courses,
    queryFn: async () => {
      const courses = await getCourses();
      return courses.length > 0 ? courses : placeholderCourses;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
    placeholderData: placeholderCourses,
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: queryKeys.course(id),
    queryFn: async () => {
      const data = await getCourse(id);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!id,
  });
}

// Majors hooks
export function useMajors() {
  return useQuery({
    queryKey: queryKeys.majors,
    queryFn: async () => {
      const majors = await getMajors();
      return majors.length > 0 ? majors : placeholderMajors;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: placeholderMajors,
  });
}

export function useMajor(slug: string) {
  return useQuery({
    queryKey: queryKeys.major(slug),
    queryFn: async () => {
      const data = await getMajor(slug);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!slug,
  });
}

// Teachers hooks
export function useTeachers() {
  return useQuery({
    queryKey: queryKeys.teachers,
    queryFn: async () => {
      const teachers = await getTeachers();
      return teachers.length > 0 ? teachers : placeholderTeachers;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: placeholderTeachers,
  });
}

export function useTeacher(slug: string) {
  return useQuery({
    queryKey: queryKeys.teacher(slug),
    queryFn: async () => {
      const data = await getTeacher(slug);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!slug,
  });
}

// Prefetching hooks
export function usePrefetch() {
  const queryClient = useQueryClient();

  const prefetchCourse = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.course(id),
      queryFn: () => getCourse(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchMajor = (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.major(slug),
      queryFn: () => getMajor(slug),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchTeacher = (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.teacher(slug),
      queryFn: () => getTeacher(slug),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchCourse, prefetchMajor, prefetchTeacher };
}
