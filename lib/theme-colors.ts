// Theme colors for native navigation headers and other platform-specific UI
// These colors correspond to the CSS variables defined in global.css

export const lightThemeColors = {
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  border: '#e4e4e7',
  muted: '#f4f4f5',
};

export const darkThemeColors = {
  background: '#09090b',
  foreground: '#fafafa',
  card: '#09090b',
  border: '#27272a',
  muted: '#18181b',
};

export function getThemeColors(isDark: boolean) {
  return isDark ? darkThemeColors : lightThemeColors;
}
