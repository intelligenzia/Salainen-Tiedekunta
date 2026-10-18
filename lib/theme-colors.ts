// Plain color strings for native UI (SwiftUI / Compose modifiers, headers,
// icons). Keep in sync with the tokens in global.css.

export const lightThemeColors = {
  background: '#eeedea',
  surface: '#ffffff',
  sunken: '#e4e2de',
  foreground: '#0e0e0f',
  soft: '#3a3a3d',
  muted: '#76757a',
  border: '#dcdad5',
  accent: '#c1121f',
};

export const darkThemeColors = {
  background: '#09090a',
  surface: '#141416',
  sunken: '#1d1d20',
  foreground: '#ececee',
  soft: '#bdbdc2',
  muted: '#85858c',
  border: '#232327',
  accent: '#f0444f',
};

export type ThemeColors = typeof lightThemeColors;

export function getThemeColors(isDark: boolean): ThemeColors {
  return isDark ? darkThemeColors : lightThemeColors;
}
