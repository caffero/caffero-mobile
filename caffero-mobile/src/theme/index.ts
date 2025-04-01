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
  coffeeRust: '#A3633B', // Coffee Rust (primary accent)
  coffeeRustAlpha: {
    95: 'rgba(163, 99, 59, 0.95)',
    90: 'rgba(163, 99, 59, 0.90)',
    80: 'rgba(163, 99, 59, 0.80)',
    60: 'rgba(163, 99, 59, 0.60)',
    40: 'rgba(163, 99, 59, 0.40)',
    20: 'rgba(163, 99, 59, 0.20)',
    10: 'rgba(163, 99, 59, 0.10)',
  },
  primaryUi: '#F5E4DA', // Muted Peach (primary UI)
  accent: '#A3633B', // Coffee Rust (for accents)
  highlights: '#F5E4DA', // Muted Peach (for highlights)
  
  // Light mode colors
  light: {
    background: {
      primary: '#FAF7F2', // Linen White
      secondary: '#F5E4DA', // Muted Peach
      tertiary: '#FAF7F2', // Linen White
      accent: 'rgba(163, 99, 59, 0.08)', // Coffee Rust with opacity
    },
    surface: {
      primary: '#FAF7F2', // Linen White
      secondary: '#F5E4DA', // Muted Peach
      elevated: '#FFFFFF',
    },
    text: {
      primary: '#2C1810', // Dark Coffee
      secondary: '#5C4030', // Medium Coffee
      tertiary: '#8B6B5A', // Light Coffee
      inverse: '#FAF7F2', // Linen White
    },
  },

  // Dark mode colors
  dark: {
    background: {
      primary: '#181512', // Deep Espresso
      secondary: '#241E1B', // Dark Cocoa
      tertiary: '#181512', // Deep Espresso
      accent: 'rgba(163, 99, 59, 0.15)', // Coffee Rust with opacity
    },
    surface: {
      primary: '#241E1B', // Dark Cocoa
      secondary: '#2F2925', // Slightly lighter cocoa
      elevated: '#3A332E', // Even lighter for elevation
    },
    text: {
      primary: '#EAE0D5', // Latte Cream
      secondary: '#BFAF9C', // Mocha Beige
      tertiary: '#A3978A', // Lighter Mocha
      inverse: '#241E1B', // Dark Cocoa
    },
  },

  border: {
    light: '#F5E4DA', // Muted Peach
    medium: '#E5D4CA', // Darker Muted Peach
    dark: '#A3633B', // Coffee Rust
  },
  status: {
    error: '#A3633B', // Coffee Rust
    success: '#8B6B5A', // Light Coffee
    warning: '#F5E4DA', // Muted Peach
    info: '#A3633B', // Coffee Rust
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
    shadowColor: '#2C1810', // Dark Coffee
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#2C1810', // Dark Coffee
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#2C1810', // Dark Coffee
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  // Glass effect for modern UI elements
  glass: {
    shadowColor: '#2C1810', // Dark Coffee
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: 'rgba(250, 247, 242, 0.85)', // Linen White with opacity
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