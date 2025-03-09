import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Slider from '@react-native-community/slider';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Screen from '../components/Screen';
import { useCoffeeService } from '../api/services/coffeeService';
import { useCoffeeBeanService } from '../api/services/coffeeBeanService';
import { GetCoffeeList } from '../api/models/Coffee';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AddCoffeeBeanScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const coffeeService = useCoffeeService();
  const coffeeBeanService = useCoffeeBeanService();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    roasteryId: '',
    countryId: '',
    acidity: 3,
    body: 3,
    intensity: 3,
  });
  const [searchResults, setSearchResults] = useState<GetCoffeeList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<{id: string, name: string}[]>([]);
  const [roasteries, setRoasteries] = useState<{id: string, name: string}[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Load initial data (countries, roasteries)
    const loadInitialData = async () => {
      try {
        setIsInitialLoading(true);
        // Here you would fetch countries and roasteries from API
        // For now, we'll use dummy data
        setCountries([
          { id: '1', name: 'Ethiopia' },
          { id: '2', name: 'Colombia' },
          { id: '3', name: 'Brazil' },
          { id: '4', name: 'Kenya' },
          { id: '5', name: 'Guatemala' }
        ]);
        
        setRoasteries([
          { id: '1', name: 'Specialty Roasters' },
          { id: '2', name: 'Coffee Lab' },
          { id: '3', name: 'Artisan Coffee' }
        ]);
        
        // Initial search with empty parameters
        await searchCoffees();
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  const searchCoffees = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (searchQuery) {
        params.append('name', searchQuery);
      }
      
      if (filters.roasteryId) {
        params.append('roasteryId', filters.roasteryId);
      }
      
      if (filters.countryId) {
        params.append('countryId', filters.countryId);
      }
      
      // Add other filter parameters as needed
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

  const handleAddBean = async (coffeeId: string) => {
    try {
      setIsLoading(true);
      await coffeeBeanService.create({
        id: coffeeId, 
        hasTasted: false
      });
      
      Alert.alert(
        getText('success'),
        getText('coffeeAddedToShelf'),
        [{ text: getText('ok'), onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error adding coffee bean:', error);
      Alert.alert(
        getText('error'),
        getText('failedToAddCoffee'),
        [{ text: getText('ok') }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderCoffeeBean = ({ item }: { item: GetCoffeeList }) => (
    <View style={[styles.coffeeCard, { backgroundColor: theme.colors.surface.primary }]}>
      <Image 
        source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9' }} 
        style={styles.coffeeImage} 
      />
      <View style={styles.coffeeInfo}>
        <Text style={[styles.coffeeName, { color: theme.colors.text.primary }]}>{item.name}</Text>
        <Text style={[styles.coffeeDetails, { color: theme.colors.text.secondary }]}>
          {item.roasteryName || ''}
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary.main }]}
          onPress={() => handleAddBean(item.id)}
        >
          <Icon name="add" size={20} color={theme.colors.text.inverse} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleApplyFilters = useCallback(() => {
    searchCoffees();
    setShowFilters(false);
  }, [searchQuery, filters]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      roasteryId: '',
      countryId: '',
      acidity: 3,
      body: 3,
      intensity: 3,
    });
    setSearchQuery('');
  }, []);

  if (isInitialLoading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={getText('addCoffeeBean')}
          showBack
          onBack={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('addCoffeeBean')}
        showBack
        onBack={() => navigation.goBack()}
      />
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
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Icon name="filter-list" size={24} color={theme.colors.text.primary} />
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
                {getText('cantFindCoffee')}
              </Text>
              <TouchableOpacity
                style={[styles.suggestButton, { backgroundColor: theme.colors.primary.main }]}
                onPress={() => navigation.navigate('SuggestProduct')}
              >
                <Text style={[styles.suggestButtonText, { color: theme.colors.text.inverse }]}>
                  {getText('suggestProduct')}
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilters(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowFilters(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={[styles.modalContent, { backgroundColor: theme.colors.surface.primary }]}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle} />
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowFilters(false)}
                  >
                    <Icon name="close" size={24} color={theme.colors.text.secondary} />
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                  {getText('filterCoffeeBeans')}
                </Text>
                
                <TextInput
                  style={[styles.searchInput, { 
                    backgroundColor: theme.colors.surface.secondary,
                    color: theme.colors.text.primary,
                    borderColor: theme.colors.border.primary,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 16
                  }]}
                  placeholder={getText('searchByName')}
                  placeholderTextColor={theme.colors.text.secondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />

                <View style={styles.dropdown}>
                  <Text style={[styles.dropdownLabel, { color: theme.colors.text.primary }]}>
                    {getText('roastery')}
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {roasteries.map((roastery) => (
                      <TouchableOpacity
                        key={roastery.id}
                        style={[
                          styles.dropdownItem,
                          { backgroundColor: theme.colors.surface.secondary },
                          filters.roasteryId === roastery.id && { 
                            backgroundColor: theme.colors.primary.main 
                          },
                        ]}
                        onPress={() => setFilters({ 
                          ...filters, 
                          roasteryId: filters.roasteryId === roastery.id ? '' : roastery.id 
                        })}
                      >
                        <Text style={[
                          styles.dropdownItemText, 
                          { 
                            color: filters.roasteryId === roastery.id 
                              ? theme.colors.text.inverse 
                              : theme.colors.text.primary 
                          }
                        ]}>
                          {roastery.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.dropdown}>
                  <Text style={[styles.dropdownLabel, { color: theme.colors.text.primary }]}>
                    {getText('country')}
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {countries.map((country) => (
                      <TouchableOpacity
                        key={country.id}
                        style={[
                          styles.dropdownItem,
                          { backgroundColor: theme.colors.surface.secondary },
                          filters.countryId === country.id && { 
                            backgroundColor: theme.colors.primary.main 
                          },
                        ]}
                        onPress={() => setFilters({ 
                          ...filters, 
                          countryId: filters.countryId === country.id ? '' : country.id 
                        })}
                      >
                        <Text style={[
                          styles.dropdownItemText, 
                          { 
                            color: filters.countryId === country.id 
                              ? theme.colors.text.inverse 
                              : theme.colors.text.primary 
                          }
                        ]}>
                          {country.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.sliderContainer}>
                  <Text style={[styles.sliderLabel, { color: theme.colors.text.primary }]}>
                    {getText('acidity')}
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5}
                    step={0.5}
                    value={filters.acidity}
                    minimumTrackTintColor={theme.colors.primary.main}
                    maximumTrackTintColor={theme.colors.border.primary}
                    thumbTintColor={theme.colors.primary.main}
                    onValueChange={(value) => setFilters({ ...filters, acidity: value })}
                  />
                  <Text style={[styles.sliderValue, { color: theme.colors.text.secondary }]}>
                    {filters.acidity}
                  </Text>
                </View>

                <View style={styles.sliderContainer}>
                  <Text style={[styles.sliderLabel, { color: theme.colors.text.primary }]}>
                    {getText('body')}
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5}
                    step={0.5}
                    value={filters.body}
                    minimumTrackTintColor={theme.colors.primary.main}
                    maximumTrackTintColor={theme.colors.border.primary}
                    thumbTintColor={theme.colors.primary.main}
                    onValueChange={(value) => setFilters({ ...filters, body: value })}
                  />
                  <Text style={[styles.sliderValue, { color: theme.colors.text.secondary }]}>
                    {filters.body}
                  </Text>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[
                      styles.clearButton,
                      { 
                        borderColor: theme.colors.primary.main,
                      }
                    ]}
                    onPress={handleClearFilters}
                  >
                    <Text style={[styles.clearButtonText, { color: theme.colors.primary.main }]}>
                      {getText('clear')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.applyButton,
                      { backgroundColor: theme.colors.primary.main }
                    ]}
                    onPress={handleApplyFilters}
                  >
                    <Text style={[styles.applyButtonText, { color: theme.colors.text.inverse }]}>
                      {getText('apply')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  listContent: {
    padding: 8,
  },
  coffeeCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  coffeeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  coffeeInfo: {
    padding: 12,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  coffeeDetails: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    textAlign: 'right',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
  },
  applyButtonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 12,
  },
  suggestButton: {
    padding: 12,
    borderRadius: 8,
  },
  suggestButtonText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 