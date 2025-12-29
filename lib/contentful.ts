import type { Document } from '@contentful/rich-text-types';

const SPACE_ID = process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

function getBaseUrl(): string {
  if (!SPACE_ID) {
    throw new Error('EXPO_PUBLIC_CONTENTFUL_SPACE_ID is missing');
  }
  return `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;
}

async function fetchContentful<T>(endpoint: string): Promise<T> {
  if (!ACCESS_TOKEN) {
    throw new Error('EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN is missing');
  }

  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status}`);
  }

  return response.json();
}

// Asset type for images
export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title?: string;
    file?: {
      url: string;
      details?: {
        image?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

// Link reference type
export interface ContentfulLink {
  sys: {
    type: 'Link';
    linkType: 'Entry' | 'Asset';
    id: string;
  };
}

// Teacher entry type
export interface TeacherEntry {
  sys: {
    id: string;
  };
  fields: {
    name?: string;
    slug: string;
    avatar?: ContentfulLink;
  };
}

// Course entry type
export interface CourseEntry {
  sys: {
    id: string;
  };
  fields: {
    courseId?: string;
    ects: number;
    name: string;
    description?: Document;
    teacher?: (ContentfulLink | TeacherEntry)[];
  };
}

// Major entry type
export interface MajorEntry {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug?: string;
    introduction?: Document;
    courses?: (ContentfulLink | CourseEntry)[];
  };
}

// Response types
interface ContentfulResponse<T> {
  items: T[];
  includes?: {
    Entry?: any[];
    Asset?: ContentfulAsset[];
  };
}

// Helper to resolve linked entries
function resolveLinks<T extends { sys: { id: string }; fields: unknown }>(
  items: (ContentfulLink | T)[] | undefined,
  includes: any[] | undefined
): T[] {
  if (!items) return [];
  if (!includes) return items.filter((item): item is T => 'fields' in item);

  return items.map((item) => {
    if ('fields' in item) return item as T;
    const resolved = includes.find((inc) => inc.sys.id === (item as ContentfulLink).sys.id);
    return resolved as T | undefined;
  }).filter((item): item is T => item !== undefined && 'fields' in item);
}

// Majors
export async function getMajors(): Promise<MajorEntry[]> {
  const response = await fetchContentful<ContentfulResponse<MajorEntry>>(
    '/entries?content_type=major&include=2'
  );
  return response.items;
}

export async function getMajor(slug: string): Promise<{ major: MajorEntry; courses: CourseEntry[] } | null> {
  const response = await fetchContentful<ContentfulResponse<MajorEntry>>(
    `/entries?content_type=major&fields.slug=${encodeURIComponent(slug)}&include=3`
  );

  if (!response.items[0]) return null;

  const major = response.items[0];
  const courses = major.fields.courses
    ? resolveLinks<CourseEntry>(major.fields.courses, response.includes?.Entry)
    : [];

  return { major, courses };
}

// Courses
export async function getCourses(): Promise<CourseEntry[]> {
  const response = await fetchContentful<ContentfulResponse<CourseEntry>>(
    '/entries?content_type=course&include=2'
  );
  return response.items;
}

export async function getCourse(courseId: string): Promise<{ course: CourseEntry; teachers: TeacherEntry[] } | null> {
  const response = await fetchContentful<ContentfulResponse<CourseEntry>>(
    `/entries?content_type=course&fields.courseId=${encodeURIComponent(courseId)}&limit=1&include=2`
  );

  if (!response.items[0]) return null;

  const course = response.items[0];
  const teachers = course.fields.teacher
    ? resolveLinks<TeacherEntry>(course.fields.teacher, response.includes?.Entry)
    : [];

  return { course, teachers };
}

// Teachers
export async function getTeachers(): Promise<TeacherEntry[]> {
  const response = await fetchContentful<ContentfulResponse<TeacherEntry>>(
    '/entries?content_type=teacher&include=1'
  );
  return response.items;
}

export async function getTeacher(slug: string): Promise<{ teacher: TeacherEntry; avatar?: ContentfulAsset } | null> {
  const response = await fetchContentful<ContentfulResponse<TeacherEntry>>(
    `/entries?content_type=teacher&fields.slug=${encodeURIComponent(slug)}&limit=1&include=1`
  );

  if (!response.items[0]) return null;

  const teacher = response.items[0];
  const avatarLink = teacher.fields.avatar;
  const avatar = avatarLink && response.includes?.Asset?.find(
    (asset) => asset.sys.id === avatarLink.sys.id
  );

  return { teacher, avatar };
}

// Get courses by teacher
export async function getCoursesByTeacher(teacherId: string): Promise<CourseEntry[]> {
  const response = await fetchContentful<ContentfulResponse<CourseEntry>>(
    `/entries?content_type=course&links_to_entry=${teacherId}&include=1`
  );
  return response.items;
}
