import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFavorites } from '../stores/favorites';
import { queryKeys } from './useQueries';

/**
 * React Query mutation hooks for favorites management
 * Provides optimistic updates and cache invalidation.
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
    onSuccess: () => {
      // Invalidate courses query to reflect favorite status changes
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
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
    onError: (_error, _courseId, context) => {
      // Rollback on error
      if (context?.previousCourses) {
        queryClient.setQueryData(queryKeys.courses, context.previousCourses);
      }
    },
    onSuccess: () => {
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
    onError: (_error, _courseId, context) => {
      // Rollback on error
      if (context?.previousCourses) {
        queryClient.setQueryData(queryKeys.courses, context.previousCourses);
      }
    },
    onSuccess: () => {
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
    onSuccess: () => {
      // Invalidate courses query
      queryClient.invalidateQueries({ queryKey: queryKeys.courses });
    },
  });
}
