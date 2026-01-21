/**
 * React Query offline persistence using AsyncStorage
 * Caches query results locally for offline access
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { createSyncStoragePersister } from '@tanstack/react-query-persist-client';

// Storage abstraction for web/native
const storage = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      const item = localStorage.getItem(key);
      return item;
    }
    // For native, we need to wrap AsyncStorage in a sync-like interface
    // This is handled by the persistQueryClient setup
    return null;
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    }
  },
};

/**
 * Create a persister for React Query
 * Uses localStorage on web and AsyncStorage on native
 */
export const queryPersister = Platform.OS === 'web'
  ? createSyncStoragePersister({
      storage,
    })
  : undefined; // Native will use async persister

/**
 * AsyncStorage persister for React Native
 * Handles async storage operations
 */
export const asyncStoragePersister = {
  persistClient: async (client: any) => {
    try {
      const data = JSON.stringify(client);
      await AsyncStorage.setItem('@react_query_cache', data);
    } catch (error) {
      console.warn('Failed to persist query cache:', error);
    }
  },
  restoreClient: async () => {
    try {
      const data = await AsyncStorage.getItem('@react_query_cache');
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      console.warn('Failed to restore query cache:', error);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      await AsyncStorage.removeItem('@react_query_cache');
    } catch (error) {
      console.warn('Failed to remove query cache:', error);
    }
  },
};

/**
 * Configuration for query persistence
 */
export const persistOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  buster: '', // Increment to bust cache
  dehydrateOptions: {
    // Only persist successful queries
    shouldDehydrateQuery: (query: any) => {
      return query.state.status === 'success';
    },
  },
};
