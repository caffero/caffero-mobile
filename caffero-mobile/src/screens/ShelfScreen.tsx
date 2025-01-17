import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing } from '../theme';

interface ShelfItemType {
  id: string;
  title: string;
  type: 'bean' | 'equipment' | 'recipe';
}

const shelfItems: ShelfItemType[] = [
  { id: '1', title: 'Ethiopian Yirgacheffe', type: 'bean' },
  { id: '2', title: 'Hario V60', type: 'equipment' },
  { id: '3', title: 'Pour Over Recipe', type: 'recipe' },
];

export const ShelfScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const { theme } = useTheme();

  const handleItemPress = (item: ShelfItemType) => {
    switch (item.type) {
      case 'bean':
        navigation.navigate('CoffeeBeanDetail', { id: item.id });
        break;
      case 'equipment':
        navigation.navigate('EquipmentDetail', { id: item.id });
        break;
      case 'recipe':
        navigation.navigate('RecipeDetail', { id: item.id });
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="My Shelf" />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ padding: theme.spacing.md }}
      >
        {shelfItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.shelfItem,
              {
                backgroundColor: theme.colors.surface.primary,
                borderRadius: theme.borderRadius.md,
                ...theme.shadows.small,
              }
            ]}
            onPress={() => handleItemPress(item)}
          >
            {/* ShelfItem component content */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  shelfItem: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
}); 