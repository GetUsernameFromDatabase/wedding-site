import type { ThemeDefinition } from 'vuetify';

export interface CustomTheme {
  name: string;
  theme: ThemeDefinition;
}

export const myMainTheme: CustomTheme = {
  name: 'myMainTheme',
  theme: {
    dark: false,
    colors: {
      background: '#f8eade',
      surface: '#f8eade',
      primary: '#e3ccb3',
      secondary: '#eddece',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  },
};

export const myThemes: CustomTheme[] = [myMainTheme];
