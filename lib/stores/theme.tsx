import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Platform, useColorScheme as useSystemColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@theme_preference';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Simple storage abstraction for web/native
const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Ignore storage errors
    }
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemColorScheme() ?? 'light';
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme preference from storage on mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const stored = await storage.getItem(STORAGE_KEY);
        if (stored && ['light', 'dark', 'system'].includes(stored)) {
          setThemeState(stored as ThemeMode);
        }
      } catch {
        // Ignore parse errors
      } finally {
        setIsLoaded(true);
      }
    }
    loadTheme();
  }, []);

  // Save theme to storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      storage.setItem(STORAGE_KEY, theme);
    }
  }, [theme, isLoaded]);

  // Apply theme class to document on web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const resolvedTheme = theme === 'system' ? systemTheme : theme;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolvedTheme);
    }
  }, [theme, systemTheme]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  }, []);

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme, isDark }),
    [theme, resolvedTheme, setTheme, toggleTheme, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
