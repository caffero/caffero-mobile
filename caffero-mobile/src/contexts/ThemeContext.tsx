import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts, typography, spacing, borderRadius, shadows, layout } from '../theme';

// Extend the existing theme with dark mode variants
export const lightTheme = {
  colors: {
    ...colors,
    primary: {
      main: colors.vibrantAqua,
      light: colors.vibrantAqua + '80',
      dark: colors.deepNavy,
      contrastText: '#FFFFFF',
    },
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    border: {
      primary: colors.border.light,
      secondary: colors.border.medium,
      dark: colors.border.dark,
    },
    status: colors.status,
    disabled: {
      main: colors.border.light,
      contrastText: colors.text.tertiary,
    },
  },
  fonts,
  typography: {
    ...typography,
    body1: typography.body.large,
    body2: typography.body.medium,
    button: typography.button.medium,
    h1: typography.title1,
    h2: typography.title2,
    h3: typography.title3,
  },
  spacing,
  borderRadius,
  shadows: {
    ...shadows,
    small: {
      ...shadows.small,
      shadowColor: colors.deepNavy,
    },
    medium: {
      ...shadows.medium,
      shadowColor: colors.deepNavy,
    },
    large: {
      ...shadows.large,
      shadowColor: colors.deepNavy,
    },
    glass: {
      ...shadows.glass,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
  },
  layout,
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...colors,
    primary: {
      main: colors.vibrantAqua,
      light: colors.vibrantAqua + '80',
      dark: colors.deepNavy,
      contrastText: '#FFFFFF',
    },
    background: {
      primary: colors.deepNavy,
      secondary: '#1F2937',
      tertiary: '#111827',
      accent: `${colors.vibrantAqua}14`,
    },
    surface: {
      primary: colors.deepNavy,
      secondary: '#1F2937',
      elevated: '#374151',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D1D5DB',
      tertiary: '#9CA3AF',
      inverse: colors.deepNavy,
    },
    border: {
      primary: '#374151',
      secondary: '#4B5563',
      dark: '#6B7280',
    },
    status: colors.status,
    disabled: {
      main: '#374151',
      contrastText: '#6B7280',
    },
  },
  shadows: {
    ...shadows,
    small: {
      ...shadows.small,
      shadowColor: '#000000',
    },
    medium: {
      ...shadows.medium,
      shadowColor: '#000000',
    },
    large: {
      ...shadows.large,
      shadowColor: '#000000',
    },
    glass: {
      ...shadows.glass,
      backgroundColor: 'rgba(17, 24, 39, 0.85)',
    },
  },
};

export type Theme = typeof lightTheme;

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        setIsDark(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newIsDark));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 