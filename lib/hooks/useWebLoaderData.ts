import { useLoaderData } from 'expo-router';
// Internal: needed to work around the non-ASCII path lookup below
import { ServerDataLoaderContext } from 'expo-router/build/loaders/ServerDataLoaderContext';
import { use } from 'react';
import { Platform } from 'react-native';

declare global {
  // Injected into the server-rendered HTML by Expo Router
  var __EXPO_ROUTER_LOADER_DATA__: Record<string, unknown> | undefined;
}

/**
 * Data from the route's `loader`, which only runs for web (rendered on the
 * server so crawlers get real content). Native fetches through React Query
 * instead, so this returns undefined there. Platform.OS never changes at
 * runtime, so the conditional hook calls are stable.
 *
 * Pass the route's own `path` for routes whose URLs can contain non-ASCII
 * characters (course codes like "Epä171"): Expo Router stores their loader
 * data under the percent-encoded path but looks it up with the decoded one,
 * so without this those pages would render empty on the server.
 */
export function useWebLoaderData<T>(path?: string): T | undefined {
  if (Platform.OS !== 'web') return undefined;

  const encoded = path ? encodeURI(decodeURI(path)) : undefined;
  if (encoded && encoded !== path) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const server = use(ServerDataLoaderContext) as Record<string, unknown> | null;
    const injected =
      server?.[encoded] ?? (typeof window !== 'undefined' ? globalThis.__EXPO_ROUTER_LOADER_DATA__?.[encoded] : undefined);
    if (injected !== undefined) return injected as T;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLoaderData() as T | undefined;
}
