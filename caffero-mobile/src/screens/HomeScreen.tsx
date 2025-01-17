import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';

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
    title: 'The Art of Coffee Cupping', 
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&auto=format'
  },
  { 
    id: '2', 
    title: 'Understanding Coffee Roasts', 
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format'
  },
  { 
    id: '3', 
    title: 'Brewing the Perfect Cup', 
    imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&auto=format'
  },
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
      <Header title="Caffero" />
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