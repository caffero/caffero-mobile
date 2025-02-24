import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { spacing } from '../theme';
import { ShelfItem } from '../components/ShelfItem';
import Screen from '../components/Screen';

interface ShelfItemType {
  id: string;
  title: string;
  route: 'WhatIBrew' | 'WhatIBrewWith' | 'HowIBrew' | 'WhatIThink';
  imageUrl: string;
}

const shelfItems: ShelfItemType[] = [
  { 
    id: '1', 
    title: 'whatIBrew', 
    route: 'WhatIBrew',
    imageUrl: 'https://images.unsplash.com/photo-1524350876685-274059332603', // Coffee beans spilled
  },
  { 
    id: '2', 
    title: 'whatIBrewWith', 
    route: 'WhatIBrewWith',
    imageUrl: 'https://images.unsplash.com/photo-1516315720917-231ef9acce48', // Coffee equipment
  },
  { 
    id: '3', 
    title: 'howIBrew', 
    route: 'HowIBrew',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', // Pour over brewing
  },
  { 
    id: '4', 
    title: 'whatIThink', 
    route: 'WhatIThink',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348', // Coffee thoughts
  },
];

export const ShelfScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const { theme } = useTheme();
  const { getText } = useLanguage();

  const handleItemPress = (route: ShelfItemType['route']) => {
    navigation.navigate(route);
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title={getText('appName')} showBack={false} />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingHorizontal: spacing.md,
            paddingTop: spacing.md,
            paddingBottom: spacing.xl + 56, // Add extra padding for bottom tab bar
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {shelfItems.map((item) => (
          <ShelfItem
            key={item.id}
            title={getText(item.title)}
            imageUrl={item.imageUrl}
            onPress={() => handleItemPress(item.route)}
          />
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
}); 