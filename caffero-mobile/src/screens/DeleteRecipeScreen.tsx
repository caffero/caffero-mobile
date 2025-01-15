import React, { useState } from 'react';
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
}

// Dummy data
const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Morning V60',
    equipment: 'Hario V60',
    coffee: 'Ethiopian Yirgacheffe',
  },
  {
    id: '2',
    title: 'Afternoon Chemex',
    equipment: 'Chemex',
    coffee: 'Colombian Supremo',
  },
  // Add more recipes...
];

export const DeleteRecipeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());

  const toggleRecipeSelection = (id: string) => {
    const newSelection = new Set(selectedRecipes);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRecipes(newSelection);
  };

  const handleDelete = () => {
    if (selectedRecipes.size === 0) {
      Alert.alert('Error', 'Please select at least one recipe to delete');
      return;
    }

    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${selectedRecipes.size} recipe(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete logic here
            Alert.alert(
              'Success',
              'Selected recipes have been deleted',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => toggleRecipeSelection(item.id)}
    >
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeInfo}>{item.equipment}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.recipeInfo}>{item.coffee}</Text>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <Icon
          name={selectedRecipes.has(item.id) ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedRecipes.has(item.id) ? '#007AFF' : '#666'}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Delete Recipes"
        showBack
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      {selectedRecipes.size > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon name="delete" size={24} color="#fff" />
          <Text style={styles.deleteButtonText}>
            Delete Selected ({selectedRecipes.size})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recipeContent: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recipeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeInfo: {
    fontSize: 14,
    color: '#666',
  },
  dot: {
    marginHorizontal: 4,
    color: '#666',
  },
  checkboxContainer: {
    marginLeft: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 