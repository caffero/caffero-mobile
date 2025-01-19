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
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { theme } = useTheme();
  const { getText } = useLanguage();

  const renderRecipe = ({ item }: { item: Recipe }) => (
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
            {item.equipment}
          </Text>
          <Text style={[styles.dot, { color: theme.colors.text.secondary }]}>•</Text>
          <Text style={[styles.recipeInfo, { color: theme.colors.text.secondary }]}>
            {item.coffee}
          </Text>
        </View>
        <Text style={[styles.steps, { color: theme.colors.text.tertiary }]}>
          {item.steps} steps
        </Text>
      </View>
      <View style={[styles.notePaper, { backgroundColor: theme.colors.primary.light }]} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('howIBrew')}
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
        style={[styles.fab, { backgroundColor: theme.colors.primary.main }]}
        onPress={() => navigation.navigate('CreateRecipe')}
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
}); 