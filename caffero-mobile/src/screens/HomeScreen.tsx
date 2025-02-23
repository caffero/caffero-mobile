import React, { useState, useEffect } from 'react';
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
import { spacing, layout, borderRadius } from '../theme';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchItem } from '../api/models/SearchItem';
import { searchItems } from '../api/services/searchService';
import { useCoffeeService } from '../api/services/coffeeService';
import { GetCoffeeList } from '../api/models/Coffee';

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
  const [recommendedBeans, setRecommendedBeans] = useState<GetCoffeeList[]>([]);
  const coffeeService = useCoffeeService();

  const fetchCoffees = async () => {
    try {
      const coffees = await coffeeService.getAll(new URLSearchParams({
        pageNumber: '5',
        pageSize: '10'
    }));
      setRecommendedBeans(coffees);
    } catch (error) {
      console.error('Error fetching coffees:', error);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCoffees();
    } catch (error) {
      console.error('Error refreshing coffees:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleTrendingPress = (id: string) => {
    navigation.navigate('RecipeDetail', { id });
  };

  const handleBeanPress = (id: string) => {
    navigation.navigate('CoffeeBeanDetail', { id });
  };

  const handleBlogPress = (id: string) => {
    navigation.navigate('PostDetail', { id });
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
    console.log('Search item pressed:', item);
    
    switch (item.type) {
      case 'Recipe':
        navigation.navigate('RecipeDetail', { id: item.id });
        setIsSearching(false);
        break;
      case 'CoffeeBean':
        navigation.navigate('CoffeeBeanDetail', { id: item.id });
        setIsSearching(false);
        break;
      case 'Roastery':
        navigation.navigate('RoasteryDetail', { id: item.id });
        setIsSearching(false);
        break;
      case 'Post':
        navigation.navigate('PostDetail', { id: item.id });
        setIsSearching(false);
        break;
    }
    
    // Clear search state after navigation
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
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
        <View style={styles.searchResultsContainer}>
          <View style={[styles.searchHeader, { borderBottomColor: theme.colors.border.primary }]}>
            <Text style={[styles.searchResultsTitle, { color: theme.colors.text.primary }]}>
              {searchResults.length > 0 
                ? `${searchResults.length} ${getText('searchResults')}` 
                : getText('noSearchResults')}
            </Text>
            <TouchableOpacity onPress={handleCancelSearch}>
              <Text style={[styles.cancelButton, { color: theme.colors.primary.main }]}>
                {getText('cancel')}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchResults}
            renderItem={renderSearchItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.searchResults}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
                  {getText('noSearchResults')}
                </Text>
              </View>
            }
          />
        </View>
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
            items={recommendedBeans.map(coffee => ({
              id: coffee.id,
              title: coffee.name,
              imageUrl: coffee.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=500&auto=format', // fallback image
              subtitle: coffee.roasteryName
            }))}
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
      <Header title={getText('appName')} />
      <View style={[styles.searchContainer, { 
        borderBottomColor: theme.colors.border.primary,
        backgroundColor: theme.colors.background.primary,
        ...theme.shadows.small
      }]}>
        <View style={[styles.searchBar, { 
          backgroundColor: theme.colors.surface.primary,
          ...theme.shadows.small
        }]}>
          <Icon 
            name="search" 
            size={20} 
            color={theme.colors.text.secondary}
            style={styles.searchIcon}
          />
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
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.text.secondary} />
              ) : (
                <Icon name="arrow-forward" size={24} color={theme.colors.text.secondary} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {renderContent()}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: spacing.md,
    borderBottomWidth: 1,
    zIndex: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.sm,
    height: 44,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.xs,
  },
  searchButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    zIndex: 0,
  },
  blurredContent: {
    opacity: 0.3,
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
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    padding: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
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
  searchResultsContainer: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  searchResultsTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 