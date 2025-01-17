import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts, typography, spacing, borderRadius, shadows, layout } from '../theme';

// Extend the existing theme with dark mode variants
export const lightTheme = {
  colors: {
    ...colors,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    border: colors.border,
    status: colors.status,
  },
  fonts,
  typography,
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
    background: {
      primary: colors.deepNavy,
      secondary: '#1F2937',
      tertiary: '#111827',
      accent: `${colors.vibrantAqua}14`, // vibrantAqua with 8% opacity
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
      light: '#374151',
      medium: '#4B5563',
      dark: '#6B7280',
    },
    status: colors.status,
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