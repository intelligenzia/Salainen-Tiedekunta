import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@language_preference';

export type Language = 'fi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.fi) => string;
}

const translations = {
  fi: {
    // Navigation
    home: 'Etusivu',
    majors: 'Pääaineet',
    courses: 'Kurssit',
    teachers: 'Opettajat',
    settings: 'Asetukset',

    // Settings
    appearance: 'Ulkoasu',
    light: 'Vaalea',
    dark: 'Tumma',
    system: 'Järjestelmä',
    language: 'Kieli',
    legalInfo: 'Lakitiedot',
    termsOfUse: 'Käyttöehdot',
    license: 'Lisenssi',
    copyright: 'Tekijänoikeudet',
    openSourceLibraries: 'Avoimen lähdekoodin kirjastot',

    // Search & Filters
    searchCourses: 'Hae kursseja...',
    noResults: 'Ei hakutuloksia',
    tryDifferentSearch: 'Kokeile toista hakusanaa',
    all: 'Kaikki',
    favorites: 'Suosikit',
    sort: 'Järjestä',
    show: 'Näytä',
    name: 'Nimi',
    code: 'Koodi',
    credits: 'Opintopisteet',
    results: 'tulosta',
    coursesCount: 'kurssia',
    creditsTotal: 'op yhteensä',

    // Accessibility
    closeMenu: 'Sulje menu',
    openMenu: 'Avaa menu',
    removeFromFavorites: 'Poista suosikeista',
    addToFavorites: 'Lisää suosikiksi',
    creditsAccessibility: 'opintopistettä',

    // Course details
    courseInfo: 'Kurssitiedot',
    description: 'Kuvaus',
    prerequisites: 'Esitiedot',
    teachingPeriod: 'Opetusperiodi',
    teacher: 'Opettaja',

    // Major details
    requiredCourses: 'Pakolliset kurssit',
    optionalCourses: 'Valinnaiset kurssit',

    // Teacher details
    email: 'Sähköposti',
    taughtCourses: 'Opetettavat kurssit',

    // Home
    exploreMajors: 'Tutustu pääaineisiin',
    browseCourses: 'Selaa kursseja',
    meetTeachers: 'Tutustu opettajiin',
  },
  en: {
    // Navigation
    home: 'Home',
    majors: 'Majors',
    courses: 'Courses',
    teachers: 'Teachers',
    settings: 'Settings',

    // Settings
    appearance: 'Appearance',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    language: 'Language',
    legalInfo: 'Legal Information',
    termsOfUse: 'Terms of Use',
    license: 'License',
    copyright: 'Copyright',
    openSourceLibraries: 'Open Source Libraries',

    // Search & Filters
    searchCourses: 'Search courses...',
    noResults: 'No results',
    tryDifferentSearch: 'Try a different search term',
    all: 'All',
    favorites: 'Favorites',
    sort: 'Sort',
    show: 'Show',
    name: 'Name',
    code: 'Code',
    credits: 'Credits',
    results: 'results',
    coursesCount: 'courses',
    creditsTotal: 'credits total',

    // Accessibility
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    removeFromFavorites: 'Remove from favorites',
    addToFavorites: 'Add to favorites',
    creditsAccessibility: 'credits',

    // Course details
    courseInfo: 'Course Information',
    description: 'Description',
    prerequisites: 'Prerequisites',
    teachingPeriod: 'Teaching Period',
    teacher: 'Teacher',

    // Major details
    requiredCourses: 'Required Courses',
    optionalCourses: 'Optional Courses',

    // Teacher details
    email: 'Email',
    taughtCourses: 'Taught Courses',

    // Home
    exploreMajors: 'Explore Majors',
    browseCourses: 'Browse Courses',
    meetTeachers: 'Meet Teachers',
  },
} as const;

const LanguageContext = createContext<LanguageContextType | null>(null);

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fi');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language preference from storage on mount
  useEffect(() => {
    async function loadLanguage() {
      try {
        const stored = await storage.getItem(STORAGE_KEY);
        if (stored && ['fi', 'en'].includes(stored)) {
          setLanguageState(stored as Language);
        }
      } catch {
        // Ignore parse errors
      } finally {
        setIsLoaded(true);
      }
    }
    loadLanguage();
  }, []);

  // Save language to storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      storage.setItem(STORAGE_KEY, language);
    }
  }, [language, isLoaded]);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  const t = useCallback(
    (key: keyof typeof translations.fi): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
