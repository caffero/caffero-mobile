import React, { useState } from 'react';
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
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Slider from '@react-native-community/slider';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CoffeeBean {
  id: string;
  name: string;
  roastery: string;
  country: string;
  imageUrl: string;
  acidity: number;
  body: number;
  intensity: number;
}

// Dummy data
const searchResults: CoffeeBean[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    roastery: 'Specialty Roasters',
    country: 'Ethiopia',
    imageUrl: 'https://example.com/coffee1.jpg',
    acidity: 4.5,
    body: 3.8,
    intensity: 3.5,
  },
  // Add more items...
];

const countries = ['Ethiopia', 'Colombia', 'Brazil', 'Kenya', 'Guatemala'];
const roasteries = ['Specialty Roasters', 'Coffee Lab', 'Artisan Coffee'];

export const AddCoffeeBeanScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    roastery: '',
    country: '',
    acidity: 3,
    body: 3,
    intensity: 3,
  });
  const { theme } = useTheme();

  const handleAddBean = (beanId: string) => {
    Alert.alert(
      getText('success'),
      getText('coffeeAddedToShelf'),
      [{ text: getText('ok'), onPress: () => navigation.goBack() }]
    );
  };

  const renderCoffeeBean = ({ item }: { item: CoffeeBean }) => (
    <View style={styles.coffeeCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.coffeeImage} />
      <View style={styles.coffeeInfo}>
        <Text style={styles.coffeeName}>{item.name}</Text>
        <Text style={styles.coffeeDetails}>{item.roastery}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddBean(item.id)}
        >
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{getText('filterCoffeeBeans')}</Text>
          
          <TextInput
            style={styles.searchInput}
            placeholder={getText('searchByName')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={styles.dropdown}>
            <Text style={styles.dropdownLabel}>{getText('roastery')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {roasteries.map((roastery) => (
                <TouchableOpacity
                  key={roastery}
                  style={[
                    styles.dropdownItem,
                    filters.roastery === roastery && styles.selectedItem,
                  ]}
                  onPress={() => setFilters({ ...filters, roastery })}
                >
                  <Text style={[styles.dropdownItemText, { color: theme.colors.text.primary }]}>
                    {roastery}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.dropdown}>
            <Text style={styles.dropdownLabel}>{getText('country')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.dropdownItem,
                    filters.country === country && styles.selectedItem,
                  ]}
                  onPress={() => setFilters({ ...filters, country })}
                >
                  <Text style={[styles.dropdownItemText, { color: theme.colors.text.primary }]}>
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getText('acidity')}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={0.5}
              value={filters.acidity}
              onValueChange={(value) => setFilters({ ...filters, acidity: value })}
            />
            <Text style={[styles.sliderValue, { color: theme.colors.text.secondary }]}>
              {filters.acidity}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getText('body')}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={0.5}
              value={filters.body}
              onValueChange={(value) => setFilters({ ...filters, body: value })}
            />
            <Text style={[styles.sliderValue, { color: theme.colors.text.secondary }]}>
              {filters.body}
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setFilters({
                  roastery: '',
                  country: '',
                  acidity: 3,
                  body: 3,
                  intensity: 3,
                });
              }}
            >
              <Text style={styles.clearButtonText}>{getText('clearFilters')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>{getText('applyFilters')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('addCoffeeBean')}
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={getText('searchCoffeeBeans')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Icon name="filter-list" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

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
              style={styles.suggestButton}
              onPress={() => navigation.navigate('SuggestProduct')}
            >
              <Text style={styles.suggestButtonText}>{getText('suggestProduct')}</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <FilterModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
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
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  selectedItem: {
    backgroundColor: '#007AFF',
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
    borderColor: '#007AFF',
  },
  clearButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  applyButtonText: {
    color: '#fff',
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
    backgroundColor: '#007AFF',
  },
  suggestButtonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 