declare module 'styled-components' {
  export interface DefaultTheme {
    textPrimary: string;
    textSecondary: string;
    gray: string;
    bgPrimary: string;
    bgSecondary: string;
  }
}

export const theme: DefaultTheme = {
  textPrimary: '#000',
  textSecondary: '#929fb5',
  gray: '#c1cbd8',
  bgPrimary: '#f1f3f6',
  bgSecondary: '#fff',
};
