import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Recipe {
  id: string;
  title: string;
  equipment: string;
  coffee: string;
  steps: number;
}

// Dummy data
const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Morning V60',
    equipment: 'Hario V60',
    coffee: 'Ethiopian Yirgacheffe',
    steps: 4,
  },
  {
    id: '2',
    title: 'Afternoon Chemex',
    equipment: 'Chemex',
    coffee: 'Colombian Supremo',
    steps: 5,
  },
  // Add more recipes...
];

export const HowIBrewScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
    >
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeInfo}>{item.equipment}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.recipeInfo}>{item.coffee}</Text>
        </View>
        <Text style={styles.steps}>{item.steps} steps</Text>
      </View>
      <View style={styles.notePaper} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="How I Brew"
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="delete"
        onRightPress={() => navigation.navigate('DeleteRecipe')}
      />
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateRecipe')}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 8,
  },
  recipeCard: {
    flex: 1,
    margin: 8,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  recipeContent: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fffaf0', // Antique white color for notepad effect
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'System', // Consider using a handwriting font
  },
  recipeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipeInfo: {
    fontSize: 14,
    color: '#666',
  },
  dot: {
    marginHorizontal: 4,
    color: '#666',
  },
  steps: {
    fontSize: 12,
    color: '#999',
  },
  notePaper: {
    height: 4,
    backgroundColor: '#f0e68c', // Khaki color for notepad edge
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 