import { Platform } from 'react-native';

export const isServer = typeof window === 'undefined';
export const isWeb = Platform.OS === 'web';

export async function getStaticData<T>(
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (isWeb && isServer) {
    try {
      return await fetcher();
    } catch (error) {
      console.error('Static data fetch error:', error);
      return fallback;
    }
  }
  return fallback;
}

