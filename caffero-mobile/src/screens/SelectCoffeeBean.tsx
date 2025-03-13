import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCoffeeBeanService } from '../api/services/coffeeBeanService';
import { useCoffeeService } from '../api/services/coffeeService';
import { GetCoffeeBeanList } from '../api/models/CoffeeBean';
import { GetCoffeeList } from '../api/models/Coffee';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createMaterialTopTabNavigator();

const MyShelfTab = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const coffeeBeanService = useCoffeeBeanService();
  
  const [coffeeBeans, setCoffeeBeans] = useState<GetCoffeeBeanList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCoffeeBeans();
  }, []);

  const fetchCoffeeBeans = async () => {
    try {
      setIsLoading(true);
      const data = await coffeeBeanService.getAll();
      setCoffeeBeans(data);
    } catch (error) {
      console.error('Error fetching coffee beans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (id: string, name: string) => {
    // Return to CreateRecipeScreen with the selected coffee bean
    navigation.navigate('CreateRecipe', { 
      selectedCoffeeId: id, 
      selectedCoffeeName: name 
    });
  };

  const renderCoffeeBean = ({ item }: { item: GetCoffeeBeanList }) => (
    <TouchableOpacity 
      style={[
        styles.coffeeCard,
        {
          backgroundColor: theme.colors.surface.elevated,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.medium,
        }
      ]}
      onPress={() => handleSelect(item.coffeeId, item.name)}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }} 
        style={styles.coffeeImage} 
      />
      <View style={[styles.coffeeInfo, { backgroundColor: theme.colors.surface.elevated }]}>
        <Text 
          style={[
            styles.coffeeName,
            { color: theme.colors.text.primary, fontWeight: '600' }
          ]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="coffee" size={20} color={theme.colors.primary.main} />
          <Text style={[styles.ratingText, { color: theme.colors.text.secondary }]}>
            {item.likePoint ? item.likePoint.toFixed(1) : '—'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {coffeeBeans.length > 0 ? (
        <FlatList
          data={coffeeBeans}
          renderItem={renderCoffeeBean}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={fetchCoffeeBeans}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="coffee" size={64} color={theme.colors.text.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            {getText('noCoffeeBeans')}
          </Text>
        </View>
      )}
    </View>
  );
};

const SearchTab = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const coffeeService = useCoffeeService();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GetCoffeeList[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initial search with empty parameters
    searchCoffees();
  }, []);

  const searchCoffees = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (searchQuery) {
        params.append('name', searchQuery);
      }
      
      // Add pagination parameters
      params.append('pageNumber', '1');
      params.append('pageSize', '20');
      
      const results = await coffeeService.getAll(params);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching coffees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (id: string, name: string) => {
    // Return to CreateRecipeScreen with the selected coffee bean
    navigation.navigate('CreateRecipe', { 
      selectedCoffeeId: id, 
      selectedCoffeeName: name 
    });
  };

  const renderCoffeeBean = ({ item }: { item: GetCoffeeList }) => (
    <TouchableOpacity 
      style={[
        styles.coffeeCard,
        {
          backgroundColor: theme.colors.surface.elevated,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.medium,
        }
      ]}
      onPress={() => handleSelect(item.id, item.name)}
    >
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }} 
        style={styles.coffeeImage} 
      />
      <View style={[styles.coffeeInfo, { backgroundColor: theme.colors.surface.elevated }]}>
        <Text 
          style={[
            styles.coffeeName,
            { color: theme.colors.text.primary, fontWeight: '600' }
          ]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text style={[styles.roasteryName, { color: theme.colors.text.secondary }]}>
          {item.roasteryName || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface.primary }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.surface.secondary }]}>
          <Icon
            name="search"
            size={24}
            color={theme.colors.text.secondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text.primary }]}
            placeholder={getText('searchCoffeeBeans')}
            placeholderTextColor={theme.colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={searchCoffees}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: theme.colors.primary.main }]}
          onPress={searchCoffees}
        >
          <Text style={[styles.searchButtonText, { color: theme.colors.text.inverse }]}>
            {getText('search')}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderCoffeeBean}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
                {getText('noSearchResults')}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export const SelectCoffeeBean = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation<NavigationProp>();

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('selectCoffeeBean')}
        showBack
        onBack={() => navigation.goBack()}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary.main,
          tabBarInactiveTintColor: theme.colors.text.secondary,
          tabBarStyle: { 
            backgroundColor: theme.colors.background.primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border.primary,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary.main,
          },
        }}
      >
        <Tab.Screen 
          name="MyShelf" 
          component={MyShelfTab}
          options={{ 
            tabBarLabel: getText('myShelf'),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchTab}
          options={{ 
            tabBarLabel: getText('search'),
          }}
        />
      </Tab.Navigator>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  coffeeCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
  },
  coffeeImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  coffeeInfo: {
    padding: 12,
  },
  coffeeName: {
    fontSize: 14,
    marginBottom: 4,
  },
  roasteryName: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 