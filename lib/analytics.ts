/**
 * Analytics using Vexo
 * Auto-tracks screens with Expo Router integration
 */

import { vexo } from 'vexo-analytics';

// Initialize Vexo (only in production)
export function initializeAnalytics() {
  if (!__DEV__) {
    vexo('YOUR_VEXO_API_KEY'); // TODO: Replace with actual API key from .env
  }
}

/**
 * Event types for type safety
 */
export const AnalyticsEvents = {
  // Course events
  COURSE_VIEWED: 'Course Viewed',
  COURSE_FAVORITED: 'Course Favorited',
  COURSE_UNFAVORITED: 'Course Unfavorited',
  COURSE_SHARED: 'Course Shared',
  COURSES_SEARCHED: 'Courses Searched',

  // Major events
  MAJOR_VIEWED: 'Major Viewed',
  MAJORS_SEARCHED: 'Majors Searched',

  // Teacher events
  TEACHER_VIEWED: 'Teacher Viewed',
  TEACHER_CONTACTED: 'Teacher Contacted',
  TEACHERS_SEARCHED: 'Teachers Searched',

  // UI events
  THEME_CHANGED: 'Theme Changed',
  LANGUAGE_CHANGED: 'Language Changed',
  FILTER_APPLIED: 'Filter Applied',
  SORT_CHANGED: 'Sort Changed',

  // Error events
  API_ERROR: 'API Error',
  NETWORK_ERROR: 'Network Error',

  // Engagement events
  REFRESH_TRIGGERED: 'Refresh Triggered',
  EXTERNAL_LINK_OPENED: 'External Link Opened',
} as const;
