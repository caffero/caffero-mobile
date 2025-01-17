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
  deepNavy: '#2E4057',
  deepNavyAlpha: {
    95: 'rgba(46, 64, 87, 0.95)',
    90: 'rgba(46, 64, 87, 0.90)',
    80: 'rgba(46, 64, 87, 0.80)',
    60: 'rgba(46, 64, 87, 0.60)',
    40: 'rgba(46, 64, 87, 0.40)',
    20: 'rgba(46, 64, 87, 0.20)',
    10: 'rgba(46, 64, 87, 0.10)',
  },
  mutedTeal: '#66A182',
  vibrantAqua: '#119DA4',
  brightYellow: '#FFC857',
  
  // UI colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F5',
    accent: 'rgba(17, 157, 164, 0.08)', // vibrantAqua with opacity
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    elevated: '#FFFFFF',
  },
  text: {
    primary: '#2E4057',
    secondary: '#66768E',
    tertiary: '#8E99AB',
    inverse: '#FFFFFF',
  },
  border: {
    light: '#E1E4E8',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
  status: {
    error: '#DC3545',
    success: '#66A182',
    warning: '#FFC857',
    info: '#119DA4',
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
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  // Glass effect for modern UI elements
  glass: {
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
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