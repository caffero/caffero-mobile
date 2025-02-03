import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { BottomTabParamList } from '../navigation/types';
import { spacing, borderRadius } from '../theme';

interface BottomNavBarProps {
  currentRoute: keyof BottomTabParamList;
  onNavigate: (screen: keyof BottomTabParamList) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentRoute,
  onNavigate,
}) => {
  const { theme } = useTheme();
  
  const navItems = [
    { name: 'Home' as const, icon: 'home' },
    { name: 'Shelf' as const, icon: 'bookshelf' },
    { name: 'Scan' as const, icon: 'qr-code-scanner' },
    { name: 'Premium' as const, icon: 'star' },
    { name: 'Profile' as const, icon: 'person' },
  ];

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.background.primary,
        borderTopColor: theme.colors.border.primary,
      }
    ]}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => onNavigate(item.name)}
        >
          <Icon
            name={item.icon}
            size={24}
            color={currentRoute === item.name 
              ? theme.colors.primary.main
              : theme.colors.text.tertiary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    borderTopWidth: 1,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
    marginTop: -borderRadius.lg,
    paddingTop: borderRadius.lg,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
}); 