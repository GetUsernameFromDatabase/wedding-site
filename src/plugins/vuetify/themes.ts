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
    },
  },
};

export const ryanTheme: CustomTheme = {
  name: 'ryan',
  theme: {
    dark: false,
    colors: {
      background: '#E0F2F1',
      surface: '#E0F2F1',
      primary: '#00897B',
      secondary: '#80CBC4',
    },
  },
};

export const marionTheme: CustomTheme = {
  name: 'marion',
  theme: {
    dark: true,
    colors: {
      background: '#F3E5F5',
      surface: '#F3E5F5',
      primary: '#AB47BC',
      secondary: '#CE93D8',
    },
  },
};

export const myThemes: CustomTheme[] = [myMainTheme, ryanTheme, marionTheme];
