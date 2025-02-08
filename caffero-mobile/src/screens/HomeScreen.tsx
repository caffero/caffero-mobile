import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigator } from '../navigation/types';
import { spacing, layout } from '../theme';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchItem } from '../api/models/SearchItem';
import { searchItems } from '../api/services/searchService';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Add refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchItems(searchQuery);
      setSearchResults(results);
      setIsSearching(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchItemPress = (item: SearchItem) => {
    switch (item.type) {
      case 'Recipe':
        navigation.navigate('RecipeDetail', { id: item.id });
        break;
      case 'CoffeeBean':
        navigation.navigate('CoffeeBeanDetail', { id: item.id });
        break;
      case 'Roastery':
        navigation.navigate('RoasteryDetail', { id: item.id });
        break;
      case 'Post':
        navigation.navigate('PostDetail', { id: item.id });
        break;
    }
  };

  const renderSearchItem = ({ item }: { item: SearchItem }) => (
    <TouchableOpacity
      style={[styles.searchItem, { backgroundColor: theme.colors.surface.primary }]}
      onPress={() => handleSearchItemPress(item)}
    >
      <View style={styles.searchItemContent}>
        <Icon 
          name={
            item.type === 'Recipe' ? 'restaurant-menu' :
            item.type === 'CoffeeBean' ? 'coffee' :
            item.type === 'Roastery' ? 'store' : 'article'
          }
          size={24}
          color={theme.colors.text.secondary}
          style={styles.searchItemIcon}
        />
        <View style={styles.searchItemText}>
          <Text style={[styles.searchItemTitle, { color: theme.colors.text.primary }]}>
            {item.title}
          </Text>
          <Text style={[styles.searchItemType, { color: theme.colors.text.secondary }]}>
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (isSearching) {
      return (
        <FlatList
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.searchResults}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
                {getText('noSearchResults')}
              </Text>
            </View>
          }
        />
      );
    }

    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.background.accent}
            colors={[theme.colors.background.accent]}
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
    );
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background.primary}
      />
      <View style={[styles.header, { borderBottomColor: theme.colors.border.primary }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.surface.primary }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text.primary }]}
            placeholder={getText('search')}
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (text.length === 0) {
                setIsSearching(false);
                setSearchResults([]);
              }
            }}
            onFocus={() => setIsSearching(true)}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.text.secondary} />
            ) : (
              <Icon name="search" size={24} color={theme.colors.text.secondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isSearching && (
        <View style={[styles.overlay, { backgroundColor: theme.colors.background.primary + '80' }]} />
      )}

      {renderContent()}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.xs,
  },
  searchButton: {
    padding: spacing.xs,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
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
  searchResults: {
    padding: spacing.md,
  },
  searchItem: {
    borderRadius: 8,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  searchItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchItemIcon: {
    marginRight: spacing.sm,
  },
  searchItemText: {
    flex: 1,
  },
  searchItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  searchItemType: {
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 