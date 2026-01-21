import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFavorites } from '../stores/favorites';
import { queryKeys } from './useQueries';
import { analytics, AnalyticsEvents } from '../analytics';

/**
 * React Query mutation hooks for favorites management
 * Provides optimistic updates, cache invalidation, and analytics tracking
 */

export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();
  const { toggleFavorite, isFavorite } = useFavorites();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const wasFavorite = isFavorite(courseId);

      // Perform the toggle
      toggleFavorite(courseId);

      return { courseId, action: wasFavorite ? 'unfavorite' : 'favorite' };
    },
    onSuccess: ({ courseId, action }) => {
      // Track analytics event
      analytics.trackMutation('Toggle Favorite', {
        course_id: courseId,
        action,
      });

      // Track specific event
      if (action === 'favorite') {
        analytics.track(AnalyticsEvents.COURSE_FAVORITED, { course_id: courseId });
      } else {
        analytics.track(AnalyticsEvents.COURSE_UNFAVORITED, { course_id: courseId });
      }

      // Invalidate courses query to reflect favorite status changes
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
    onError: (error, { courseId }) => {
      // Track error
      analytics.trackError(error as Error, {
        mutation: 'Toggle Favorite',
        course_id: courseId,
      });
    },
  });
}

export function useAddFavoriteMutation() {
  const queryClient = useQueryClient();
  const { toggleFavorite, isFavorite } = useFavorites();

  return useMutation({
    mutationFn: async (courseId: string) => {
      // Only add if not already a favorite
      if (!isFavorite(courseId)) {
        toggleFavorite(courseId);
      }
      return courseId;
    },
    onMutate: async (courseId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.courses });

      // Snapshot previous value for rollback
      const previousCourses = queryClient.getQueryData(queryKeys.courses);

      // Return context for rollback
      return { previousCourses };
    },
    onError: (error, courseId, context) => {
      // Rollback on error
      if (context?.previousCourses) {
        queryClient.setQueryData(queryKeys.courses, context.previousCourses);
      }

      // Track error
      analytics.trackError(error as Error, {
        mutation: 'Add Favorite',
        course_id: courseId,
      });
    },
    onSuccess: (courseId) => {
      // Track analytics
      analytics.track(AnalyticsEvents.COURSE_FAVORITED, { course_id: courseId });

      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
  });
}

export function useRemoveFavoriteMutation() {
  const queryClient = useQueryClient();
  const { toggleFavorite, isFavorite } = useFavorites();

  return useMutation({
    mutationFn: async (courseId: string) => {
      // Only remove if it's a favorite
      if (isFavorite(courseId)) {
        toggleFavorite(courseId);
      }
      return courseId;
    },
    onMutate: async (courseId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.courses });

      // Snapshot previous value for rollback
      const previousCourses = queryClient.getQueryData(queryKeys.courses);

      // Return context for rollback
      return { previousCourses };
    },
    onError: (error, courseId, context) => {
      // Rollback on error
      if (context?.previousCourses) {
        queryClient.setQueryData(queryKeys.courses, context.previousCourses);
      }

      // Track error
      analytics.trackError(error as Error, {
        mutation: 'Remove Favorite',
        course_id: courseId,
      });
    },
    onSuccess: (courseId) => {
      // Track analytics
      analytics.track(AnalyticsEvents.COURSE_UNFAVORITED, { course_id: courseId });

      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
  });
}

export function useClearFavoritesMutation() {
  const queryClient = useQueryClient();
  const { clearFavorites, favorites } = useFavorites();

  return useMutation({
    mutationFn: async () => {
      const count = favorites.size;
      clearFavorites();
      return count;
    },
    onSuccess: (count) => {
      // Track analytics
      analytics.trackMutation('Clear Favorites', {
        favorites_count: count,
      });

      // Invalidate courses query
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
    onError: (error) => {
      // Track error
      analytics.trackError(error as Error, {
        mutation: 'Clear Favorites',
      });
    },
  });
}
