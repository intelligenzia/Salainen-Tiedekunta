import type { Document } from '@contentful/rich-text-types';

const SPACE_ID = process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

function getBaseUrl(): string {
  if (!SPACE_ID) {
    throw new Error('EXPO_PUBLIC_CONTENTFUL_SPACE_ID is missing');
  }
  return `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;
}

function request(endpoint: string) {
  return fetch(`${getBaseUrl()}${endpoint}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
}

async function fetchContentful<T>(endpoint: string): Promise<T> {
  if (!ACCESS_TOKEN) {
    throw new Error('EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN is missing');
  }

  let response = await request(endpoint);
  // The CDA rate-limits bursts (e.g. pre-rendering every page at build time)
  for (let attempt = 1; response.status === 429 && attempt <= 5; attempt++) {
    const reset = Number(response.headers.get('X-Contentful-RateLimit-Reset'));
    await new Promise((r) => setTimeout(r, (reset > 0 ? reset * 1000 : 0) + attempt * 250));
    response = await request(endpoint);
  }

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
    updatedAt?: string;
  };
  fields: {
    name?: string;
    slug: string;
    avatar?: ContentfulLink;
  };
  // Resolved from `avatar` by getTeachers()/getTeacher()
  avatarUrl?: string;
}

// Course entry type
export interface CourseEntry {
  sys: {
    id: string;
    updatedAt?: string;
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
    updatedAt?: string;
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
    '/entries?content_type=major&include=1&order=fields.name'
  );
  // Resolve course links so lists can show real course counts and credits
  return response.items.map((major) => ({
    ...major,
    fields: {
      ...major.fields,
      courses: resolveLinks<CourseEntry>(major.fields.courses, response.includes?.Entry),
    },
  }));
}

// Courses that a major lists, after getMajors() has resolved the links
export function majorCourses(major: MajorEntry): CourseEntry[] {
  return (major.fields.courses ?? []).filter((c): c is CourseEntry => 'fields' in c);
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
    '/entries?content_type=course&include=1&order=fields.name&limit=1000'
  );
  return response.items;
}

export async function getCourse(courseId: string): Promise<{ course: CourseEntry; teachers: TeacherEntry[] } | null> {
  const response = await fetchContentful<ContentfulResponse<CourseEntry>>(
    `/entries?content_type=course&fields.courseId=${encodeURIComponent(courseId)}&limit=1&include=2`
  );

  if (!response.items[0]) return null;

  const course = response.items[0];
  const teachers = resolveLinks<TeacherEntry>(course.fields.teacher, response.includes?.Entry).map(
    (teacher) => ({ ...teacher, avatarUrl: assetUrl(teacher.fields.avatar, response.includes?.Asset) })
  );

  return { course, teachers };
}

// Teachers
export async function getTeachers(): Promise<TeacherEntry[]> {
  const response = await fetchContentful<ContentfulResponse<TeacherEntry>>(
    '/entries?content_type=teacher&include=1&order=fields.name'
  );
  return response.items.map((teacher) => ({
    ...teacher,
    avatarUrl: assetUrl(teacher.fields.avatar, response.includes?.Asset),
  }));
}

function assetUrl(link: ContentfulLink | undefined, assets: ContentfulAsset[] | undefined) {
  const url = link && assets?.find((asset) => asset.sys.id === link.sys.id)?.fields.file?.url;
  return url ? `https:${url}` : undefined;
}

export async function getTeacher(
  slug: string
): Promise<{ teacher: TeacherEntry; avatar?: ContentfulAsset; courses: CourseEntry[] } | null> {
  const response = await fetchContentful<ContentfulResponse<TeacherEntry>>(
    `/entries?content_type=teacher&fields.slug=${encodeURIComponent(slug)}&limit=1&include=1`
  );

  if (!response.items[0]) return null;

  const teacher = response.items[0];
  const avatarLink = teacher.fields.avatar;
  const avatar = avatarLink && response.includes?.Asset?.find(
    (asset) => asset.sys.id === avatarLink.sys.id
  );

  const courses = await getCoursesByTeacher(teacher.sys.id);

  return {
    teacher: { ...teacher, avatarUrl: assetUrl(avatarLink, response.includes?.Asset) },
    avatar,
    courses,
  };
}

// Get courses by teacher
export async function getCoursesByTeacher(teacherId: string): Promise<CourseEntry[]> {
  const response = await fetchContentful<ContentfulResponse<CourseEntry>>(
    `/entries?content_type=course&links_to_entry=${teacherId}&include=0&order=fields.name`
  );
  return response.items;
}
