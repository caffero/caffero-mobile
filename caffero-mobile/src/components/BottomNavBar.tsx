import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BottomTabParamList } from '../navigation/types';

interface BottomNavBarProps {
  currentRoute: keyof BottomTabParamList;
  onNavigate: (screen: keyof BottomTabParamList) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentRoute,
  onNavigate,
}) => {
  const navItems = [
    { name: 'Home' as const, icon: 'home' },
    { name: 'Shelf' as const, icon: 'bookshelf' },
    { name: 'Scan' as const, icon: 'qr-code-scanner' },
    { name: 'Premium' as const, icon: 'star' },
    { name: 'Profile' as const, icon: 'person' },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => onNavigate(item.name as keyof BottomTabParamList)}
        >
          <Icon
            name={item.icon}
            size={24}
            color={currentRoute === item.name ? '#007AFF' : '#666'}
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 