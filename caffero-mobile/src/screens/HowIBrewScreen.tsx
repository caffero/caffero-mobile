import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Screen from '../components/Screen';
import { useRecipeService } from '../api/services/recipeService';
import { GetRecipeList } from '../api/models/Recipe';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// We'll use the GetRecipeList interface from the API instead of the local Recipe interface
// interface Recipe {
//   id: string;
//   title: string;
//   equipment: string;
//   coffee: string;
//   steps: number;
// }

// // Dummy data
// const recipes: Recipe[] = [
//   {
//     id: '1',
//     title: 'Morning V60',
//     equipment: 'Hario V60',
//     coffee: 'Ethiopian Yirgacheffe',
//     steps: 4,
//   },
//   {
//     id: '2',
//     title: 'Afternoon Chemex',
//     equipment: 'Chemex',
//     coffee: 'Colombian Supremo',
//     steps: 5,
//   },
//   // Add more recipes...
// ];

export const HowIBrewScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const recipeService = useRecipeService();
  
  const [recipes, setRecipes] = useState<GetRecipeList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const data = await recipeService.getAll();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecipe = ({ item }: { item: GetRecipeList }) => {
    // Handle the case where equipment or coffeeBean might be objects instead of strings
    const equipmentName = typeof item.equipment === 'object' && item.equipment !== null 
      ? (item.equipment as any).name || '' 
      : item.equipment;
    
    const coffeeBeanName = typeof item.coffeeBean === 'object' && item.coffeeBean !== null 
      ? (item.coffeeBean as any).name || '' 
      : item.coffeeBean;
    
    return (
      <TouchableOpacity
        style={[styles.recipeCard, { 
          backgroundColor: theme.colors.surface.primary,
          borderColor: theme.colors.border.primary,
        }]}
        onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}
      >
        <View style={[styles.recipeContent, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.recipeTitle, { color: theme.colors.text.primary }]}>
            {item.title}
          </Text>
          <View style={styles.recipeDetails}>
            <Text style={[styles.recipeInfo, { color: theme.colors.text.secondary }]}>
              {equipmentName}
            </Text>
            <Text style={[styles.dot, { color: theme.colors.text.secondary }]}>•</Text>
            <Text style={[styles.recipeInfo, { color: theme.colors.text.secondary }]}>
              {coffeeBeanName}
            </Text>
          </View>
          <Text style={[styles.steps, { color: theme.colors.text.tertiary }]}>
            {item.brewTime} min
          </Text>
        </View>
        <View style={[styles.notePaper, { backgroundColor: theme.colors.primary.light }]} />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={getText('howIBrew')}
          showBack
          onBack={() => navigation.goBack()}
          rightIcon="delete"
          onRightPress={() => navigation.navigate('DeleteRecipe', { id: '' })}
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
        title={getText('howIBrew')}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon="delete"
        onRightPress={() => navigation.navigate('DeleteRecipe', { id: '' })}
      />
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={fetchRecipes}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="coffee" size={64} color={theme.colors.text.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            {getText('noRecipes')}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => navigation.navigate('CreateRecipe')}
      >
        <Icon name="add" size={24} color={theme.colors.text.inverse} />
      </TouchableOpacity>
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
  recipeCard: {
    flex: 1,
    margin: 8,
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
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
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'System',
  },
  recipeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipeInfo: {
    fontSize: 14,
  },
  dot: {
    marginHorizontal: 4,
  },
  steps: {
    fontSize: 12,
  },
  notePaper: {
    height: 4,
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
}); 