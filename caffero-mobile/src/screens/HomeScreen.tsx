import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Platform,
} from 'react-native';
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { spacing, layout } from '../theme';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

// Dummy data (replace with API calls later)
const trendingRecipes = [
  { 
    id: '1', 
    title: 'V60 Pour Over', 
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format'
  },
  { 
    id: '2', 
    title: 'Aeropress Recipe', 
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format'
  },
  { 
    id: '3', 
    title: 'French Press Classic', 
    imageUrl: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&auto=format'
  },
];

const recommendedBeans = [
  { 
    id: '1', 
    title: 'Ethiopian Yirgacheffe', 
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=500&auto=format'
  },
  { 
    id: '2', 
    title: 'Colombian Supremo', 
    imageUrl: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500&auto=format'
  },
  { 
    id: '3', 
    title: 'Brazilian Santos', 
    imageUrl: 'https://images.unsplash.com/photo-1587734005433-78ec37761d12?w=500&auto=format'
  },
];

const blogPosts = [
  { 
    id: '1', 
    title: 'The Art of Coffee Roasting', 
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format'
  },
  { 
    id: '2', 
    title: 'Understanding Coffee Origins', 
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&auto=format'
  },
  { 
    id: '3', 
    title: 'Brewing the Perfect Cup', 
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format'
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const [refreshing, setRefreshing] = React.useState(false);
  const { theme, isDark } = useTheme();
  const { getText } = useLanguage();

  const handleTrendingPress = (id: string) => {
    navigation.navigate('RecipeDetail', { id });
  };

  const handleBeanPress = (id: string) => {
    navigation.navigate('CoffeeBeanDetail', { id });
  };

  const handleBlogPress = (id: string) => {
    // TODO: Add DiscoverCoffee to RootStackParamList if needed
    // navigation.navigate('DiscoverCoffee');
    console.log('Blog post pressed:', id);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Add refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background.primary}
      />
      <Header title={getText('appName')} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.accent}
            colors={[theme.colors.accent]}
          />
        }
      >
        <View style={[styles.carouselContainer, { 
          backgroundColor: Platform.select({
            ios: theme.colors.background.primary,
            android: theme.colors.background.secondary,
          })
        }]}>
          <Carousel
            title={getText('trending')}
            items={trendingRecipes}
            onItemPress={handleTrendingPress}
          />
          <Carousel
            title={getText('forYourTaste')}
            items={recommendedBeans}
            onItemPress={handleBeanPress}
          />
          <Carousel
            title={getText('discoverCoffee')}
            items={blogPosts}
            onItemPress={handleBlogPress}
          />
        </View>
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
  carouselContainer: {
    flex: 1,
    paddingVertical: spacing.md,
  },
}); 