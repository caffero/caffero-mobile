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
  Image,
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

interface Cafe {
  id: string;
  name: string;
  district: string;
  city: string;
  imageUrl: string;
}

// Dummy cafe data
const cafes: Cafe[] = [
  {
    id: '1',
    name: 'Cafe Luminosa',
    district: 'Downtown',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format',
  },
  {
    id: '2',
    name: 'Sweet Corner',
    district: 'Kadıköy',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format',
  },
  {
    id: '3',
    name: 'Urban Roasters',
    district: 'Beşiktaş',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format',
  },
  {
    id: '4',
    name: 'Brew Haven',
    district: 'Nişantaşı',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format',
  },
  {
    id: '5',
    name: 'Coffee Lab',
    district: 'Bebek',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format',
  },
  {
    id: '6',
    name: 'Espresso Junction',
    district: 'Şişli',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format',
  },
  {
    id: '7',
    name: 'Bean & Gone',
    district: 'Etiler',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format',
  },
  {
    id: '8',
    name: 'Cuppa Joy',
    district: 'Levent',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format',
  },
  {
    id: '9',
    name: 'Latte Lane',
    district: 'Üsküdar',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format',
  },
  {
    id: '10',
    name: 'Morning Brew',
    district: 'Moda',
    city: 'Istanbul',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&auto=format',
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigator>();
  const [refreshing, setRefreshing] = useState(false);
  const { theme, isDark } = useTheme();
  const { getText } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Cafe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cafeList, setCafeList] = useState<Cafe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = (refresh = false) => {
    // In a real app, this would be an API call with pagination
    // For demo purposes, we're simulating pagination with the dummy data
    if (refresh) {
      setPage(1);
      setCafeList([]);
      setHasMoreData(true);
    }

    const pageSize = 5;
    const startIndex = (refresh ? 0 : (page - 1) * pageSize);
    const endIndex = startIndex + pageSize;
    
    // Simulate API call delay
    setIsLoading(startIndex === 0);
    setIsLoadingMore(startIndex > 0);
    
    setTimeout(() => {
      const newCafes = cafes.slice(startIndex, endIndex);
      
      if (refresh) {
        setCafeList(newCafes);
      } else {
        // Make sure we're not adding duplicates
        const existingIds = new Set(cafeList.map(cafe => cafe.id));
        const uniqueNewCafes = newCafes.filter(cafe => !existingIds.has(cafe.id));
        
        setCafeList(prevList => [...prevList, ...uniqueNewCafes]);
      }
      
      // Check if we've reached the end of the data
      if (endIndex >= cafes.length) {
        setHasMoreData(false);
      } else {
        setPage(prevPage => refresh ? 2 : prevPage + 1);
      }
      
      setIsLoading(false);
      setIsLoadingMore(false);
      setRefreshing(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCafes(true);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMoreData) {
      fetchCafes();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    setIsSearching(true);
    
    // In a real app, this would be an API call to search cafes
    // For demo purposes, we're simulating a search with the dummy data
    setTimeout(() => {
      const filteredCafes = cafes.filter(cafe => 
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cafe.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredCafes);
      setIsLoading(false);
    }, 500);
  };

  const handleCafePress = (id: string) => {
    navigation.navigate('CafeDetail', { id });
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const renderCafeItem = ({ item }: { item: Cafe }) => (
    <TouchableOpacity
      style={[styles.cafeCard, { backgroundColor: theme.colors.surface.primary }]}
      onPress={() => handleCafePress(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cafeImage} />
      <View style={styles.cafeInfo}>
        <Text style={[styles.cafeName, { color: theme.colors.text.primary }]}>
          {item.name}
        </Text>
        <Text style={[styles.cafeLocation, { color: theme.colors.text.secondary }]}>
          {item.district}, {item.city}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (isSearching) return null;
    
    if (isLoadingMore) {
      return (
        <View style={styles.footerLoading}>
          <ActivityIndicator size="small" color={theme.colors.primary.main} />
          <Text style={[styles.footerText, { color: theme.colors.text.secondary }]}>
            {getText('loadingMore')}
          </Text>
        </View>
      );
    }
    
    return null;
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={[styles.emptyStateText, { color: theme.colors.text.secondary }]}>
        {isLoading ? '' : getText('noCafesAvailable')}
      </Text>
    </View>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background.primary}
      />
      <Header title={getText('appName')} />
      <View style={[styles.searchContainer, { borderBottomColor: theme.colors.border.primary }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.background.secondary }]}>
          <Icon 
            name="search" 
            size={20} 
            color={theme.colors.text.secondary} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text.primary }]}
            placeholder={getText('searchCafes')}
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching && (
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
      )}
      
      <FlatList
        data={isSearching ? searchResults : cafeList}
        renderItem={renderCafeItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        onEndReached={!isSearching ? handleLoadMore : null}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.background.accent}
            colors={[theme.colors.background.accent]}
          />
        }
      />
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
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
  cafeCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cafeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cafeInfo: {
    padding: spacing.md,
  },
  cafeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cafeLocation: {
    fontSize: 14,
  },
  footerLoading: {
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: spacing.sm,
    fontSize: 14,
  },
}); 