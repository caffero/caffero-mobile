import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts, typography, spacing, borderRadius, shadows, layout } from '../theme';

// Extend the existing theme with dark mode variants
export const lightTheme = {
  colors: {
    primary: {
      main: colors.coffeeRust,
      light: colors.coffeeRustAlpha[60],
      dark: colors.coffeeRust,
      contrastText: colors.light.text.inverse,
    },
    background: colors.light.background,
    surface: colors.light.surface,
    text: colors.light.text,
    border: {
      primary: colors.border.light,
      secondary: colors.border.medium,
      dark: colors.border.dark,
    },
    status: colors.status,
    disabled: {
      main: colors.border.light,
      contrastText: colors.light.text.tertiary,
    },
  },
  fonts,
  typography,
  spacing,
  borderRadius,
  shadows: {
    small: {
      shadowColor: colors.coffeeRust,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.coffeeRust,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: colors.coffeeRust,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
      elevation: 8,
    },
    glass: {
      shadowColor: colors.coffeeRust,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
      backgroundColor: 'rgba(250, 247, 242, 0.85)', // Linen White with opacity
    },
  },
  layout,
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: {
      main: colors.coffeeRust,
      light: colors.coffeeRustAlpha[60],
      dark: colors.coffeeRust,
      contrastText: colors.dark.text.primary,
    },
    background: colors.dark.background,
    surface: colors.dark.surface,
    text: colors.dark.text,
    border: {
      primary: colors.dark.surface.secondary,
      secondary: colors.dark.surface.elevated,
      dark: colors.coffeeRust,
    },
    status: {
      ...colors.status,
      error: '#FF6B6B',
      success: '#51CF66',
      warning: '#FFD43B',
      info: colors.coffeeRust,
    },
    disabled: {
      main: colors.dark.surface.secondary,
      contrastText: colors.dark.text.tertiary,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 8,
    },
    glass: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 4,
      backgroundColor: 'rgba(24, 21, 18, 0.85)', // Deep Espresso with opacity
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