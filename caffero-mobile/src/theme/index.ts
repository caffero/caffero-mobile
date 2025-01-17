export const fonts = {
  primary: {
    thin: 'Raleway-Thin',
    extraLight: 'Raleway-ExtraLight',
    light: 'Raleway-Light',
    regular: 'Raleway-Regular',
    medium: 'Raleway-Medium',
    semiBold: 'Raleway-SemiBold',
    bold: 'Raleway-Bold',
    extraBold: 'Raleway-ExtraBold',
    black: 'Raleway-Black',
  }
};

export const colors = {
  // Primary palette
  navy: '#1E2B3D',
  navyAlpha: {
    95: 'rgba(30, 43, 61, 0.95)',
    90: 'rgba(30, 43, 61, 0.90)',
    80: 'rgba(30, 43, 61, 0.80)',
    60: 'rgba(30, 43, 61, 0.60)',
    40: 'rgba(30, 43, 61, 0.40)',
    20: 'rgba(30, 43, 61, 0.20)',
    10: 'rgba(30, 43, 61, 0.10)',
  },
  teal: '#4FB8B1',
  tealAlpha: {
    95: 'rgba(79, 184, 177, 0.95)',
    90: 'rgba(79, 184, 177, 0.90)',
    80: 'rgba(79, 184, 177, 0.80)',
    60: 'rgba(79, 184, 177, 0.60)',
    40: 'rgba(79, 184, 177, 0.40)',
    20: 'rgba(79, 184, 177, 0.20)',
    10: 'rgba(79, 184, 177, 0.10)',
  },
  cream: '#F5D6A7',
  darkCream: '#E6C38E',
  coffee: '#4A3B2F',
  
  // UI colors
  background: {
    primary: '#1E2B3D', // navy background
    secondary: '#243447', // lighter navy
    tertiary: '#2A3C52', // even lighter navy
    accent: 'rgba(79, 184, 177, 0.12)', // teal with opacity
  },
  surface: {
    primary: '#243447', // lighter navy
    secondary: '#4FB8B1', // teal
    elevated: '#2A3C52', // even lighter navy
    card: '#F5D6A7', // cream for cards
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    inverse: '#1E2B3D', // navy
    accent: '#4FB8B1', // teal
  },
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(255, 255, 255, 0.2)',
  },
  status: {
    error: '#FF6B6B',
    success: '#4FB8B1', // teal
    warning: '#F5D6A7', // cream
    info: '#4FB8B1', // teal
  }
};

export const typography = {
  // Display styles for hero sections
  display: {
    fontSize: 40,
    lineHeight: 48,
    fontFamily: fonts.primary.black,
    letterSpacing: -0.4,
  },
  // Title styles
  title1: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: fonts.primary.bold,
    letterSpacing: -0.4,
  },
  title2: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.primary.semiBold,
    letterSpacing: -0.2,
  },
  title3: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: fonts.primary.semiBold,
    letterSpacing: -0.2,
  },
  // Content styles
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: fonts.primary.semiBold,
    letterSpacing: -0.1,
  },
  body: {
    large: {
      fontSize: 17,
      lineHeight: 24,
      fontFamily: fonts.primary.regular,
      letterSpacing: -0.1,
    },
    medium: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: fonts.primary.regular,
      letterSpacing: -0.1,
    },
    small: {
      fontSize: 13,
      lineHeight: 20,
      fontFamily: fonts.primary.regular,
      letterSpacing: -0.1,
    }
  },
  // UI element styles
  button: {
    large: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: fonts.primary.semiBold,
      letterSpacing: -0.1,
    },
    medium: {
      fontSize: 15,
      lineHeight: 20,
      fontFamily: fonts.primary.semiBold,
      letterSpacing: -0.1,
    },
    small: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: fonts.primary.semiBold,
      letterSpacing: -0.1,
    }
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.primary.medium,
    letterSpacing: 0,
  },
};

export const spacing = {
  // Base spacing units
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
  
  // Specific spacing for different contexts
  gutter: 16,
  sectionPadding: 24,
  stackSpacing: 12,
  listItemSpacing: 16,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

// Following Apple's guidelines for elevation and depth
export const shadows = {
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  // Glass effect for modern UI elements
  glass: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: 'rgba(36, 52, 71, 0.85)', // semi-transparent navy
  }
};

// Common layout styles
export const layout = {
  // Minimum touch target size (44x44 as per Apple guidelines)
  minTouchTarget: 44,
  
  // Screen edge padding
  screenEdgePadding: spacing.md,
  
  // Content max width for larger screens
  contentMaxWidth: 564,
  
  // Common aspect ratios
  aspectRatio: {
    square: 1,
    portrait: 4/3,
    landscape: 16/9,
  }
}; 