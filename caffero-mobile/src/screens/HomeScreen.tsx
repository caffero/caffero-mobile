import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';

// Dummy data (replace with API calls later)
const trendingRecipes = [
  { id: '1', title: 'V60 Pour Over', imageUrl: 'https://example.com/v60.jpg' },
  { id: '2', title: 'Aeropress Recipe', imageUrl: 'https://example.com/aeropress.jpg' },
  // Add more items...
];

const recommendedBeans = [
  { id: '1', title: 'Ethiopian Yirgacheffe', imageUrl: 'https://example.com/ethiopian.jpg' },
  { id: '2', title: 'Colombian Supremo', imageUrl: 'https://example.com/colombian.jpg' },
  // Add more items...
];

const blogPosts = [
  { id: '1', title: 'The Art of Coffee Cupping', imageUrl: 'https://example.com/cupping.jpg' },
  { id: '2', title: 'Understanding Coffee Roasts', imageUrl: 'https://example.com/roasts.jpg' },
  // Add more items...
];

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();

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

  return (
    <View style={styles.container}>
      <Header title="Coffee App" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Carousel
          title="Trending"
          items={trendingRecipes}
          onItemPress={handleTrendingPress}
        />
        <Carousel
          title="For Your Taste"
          items={recommendedBeans}
          onItemPress={handleBeanPress}
        />
        <Carousel
          title="Discover Coffee"
          items={blogPosts}
          onItemPress={handleBlogPress}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
}); 