import { useUniwind, Uniwind } from 'uniwind';

export function useColorScheme() {
  const { theme } = useUniwind();

  const setColorScheme = (scheme: 'light' | 'dark' | 'system') => {
    Uniwind.setTheme(scheme);
  };

  const toggleColorScheme = () => {
    Uniwind.setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    colorScheme: theme,
    isDarkColorScheme: theme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
