export type ColorTheme = {
  bg: string;
  text: string;
  accent: string;
  light: string;
};

export const colorThemes: Record<string, ColorTheme> = {
  home: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    accent: 'bg-blue-100',
    light: '#E3F2FD',
  },
  skills: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    accent: 'bg-green-100',
    light: '#E8F5E9',
  },
  projects: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-900',
    accent: 'bg-yellow-100',
    light: '#FFFDE7',
  },
  experience: {
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    accent: 'bg-pink-100',
    light: '#FCE4EC',
  },
  certifications: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'bg-purple-100',
    light: '#F3E5F5',
  },
  contact: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    accent: 'bg-orange-100',
    light: '#FFF3E0',
  },
};

export const cardOrder = ['home', 'skills', 'projects', 'experience', 'certifications', 'contact'];

export function getThemeByIndex(index: number): ColorTheme {
  const key = cardOrder[index % cardOrder.length];
  return colorThemes[key];
}

export function getThemeByName(name: string): ColorTheme {
  return colorThemes[name] || colorThemes.home;
}
