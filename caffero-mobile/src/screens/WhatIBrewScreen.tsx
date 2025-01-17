import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Text,
  Alert 
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CoffeeBean {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
}

// Dummy data
const coffeeBeans: CoffeeBean[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    imageUrl: 'https://example.com/coffee1.jpg',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    imageUrl: 'https://example.com/coffee2.jpg',
    rating: 4.0,
  },
  // Add more items...
];

export const WhatIBrewScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  const renderCoffeeBean = ({ item }: { item: CoffeeBean }) => (
    <TouchableOpacity 
      style={[
        styles.coffeeCard,
        {
          backgroundColor: theme.colors.surface.elevated,
          borderColor: theme.colors.border.primary,
          ...theme.shadows.medium,
        }
      ]}
      onPress={() => navigation.navigate('CoffeeBeanDetail', { id: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.coffeeImage} />
      <View style={[styles.coffeeInfo, { backgroundColor: theme.colors.surface.elevated }]}>
        <Text 
          style={[
            styles.coffeeName,
            theme.typography.headline,
            { color: theme.colors.text.primary }
          ]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="coffee" size={20} color={theme.colors.primary.main} />
          <Text style={[styles.ratingText, { color: theme.colors.text.secondary }]}>
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header 
        title="What I Brew" 
        showBack 
        onBack={() => navigation.goBack()}
        rightIcon="delete"
        onRightPress={() => navigation.navigate('RemoveCoffeeBean')}
      />
      <FlatList
        data={coffeeBeans}
        renderItem={renderCoffeeBean}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => {
          Alert.alert(
            'Add Coffee Bean',
            'Choose how to add a coffee bean',
            [
              {
                text: 'Scan QR',
                onPress: () => navigation.navigate('Scan'),
              },
              {
                text: 'Search by Name',
                onPress: () => navigation.navigate('AddCoffeeBean'),
              },
            ],
          );
        }}
      >
        <Icon name="add" size={24} color={theme.colors.text.inverse} />
      </TouchableOpacity>
    </View>
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
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  coffeeInfo: {
    padding: 12,
  },
  coffeeName: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 