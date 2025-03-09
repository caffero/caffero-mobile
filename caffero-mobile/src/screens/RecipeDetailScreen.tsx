import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { GetRecipe } from '../api/models/Recipe';
import { useRecipeService } from '../api/services/recipeService';
import { spacing, borderRadius } from '../theme';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>['route'];
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PouringStep {
  volume: number;
  time: number;
  temperature: number;
}

// Dummy data - replace with API call
const getRecipe = (id: string) => ({
  id,
  title: 'Morning V60',
  equipment: 'Hario V60',
  coffee: {
    name: 'Ethiopian Yirgacheffe',
    amount: '15',
  },
  useMilk: true,
  milk: {
    volume: 100,
    temperature: 65,
  },
  isPublic: true,
  pouringSteps: [
    { volume: 50, time: 30, temperature: 93 },
    { volume: 100, time: 60, temperature: 93 },
    { volume: 100, time: 90, temperature: 92 },
  ],
});

export const RecipeDetailScreen = () => {
  const { theme } = useTheme();
  const { getText } = useLanguage();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RecipeDetailScreenRouteProp>();
  const recipeService = useRecipeService();
  
  const [recipe, setRecipe] = useState<GetRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getById(route.params.id);
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipe();
  }, [route.params.id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically call an API to update the favorite status
  };

  if (isLoading || !recipe) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={getText('recipe')}
          showBack
          onBack={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </Screen>
    );
  }

  const renderPouringStep = (step: PouringStep, index: number) => (
    <View key={index} style={[styles.stepContainer, { borderBottomColor: theme.colors.border.primary }]}>
      <Text style={[styles.stepNumber, { color: theme.colors.primary.main }]}>
        {`${getText('step')} ${index + 1}`}
      </Text>
      <View style={styles.stepDetails}>
        <View style={styles.stepRow}>
          <Text style={[styles.stepLabel, { color: theme.colors.text.secondary }]}>
            {getText('waterVolume')}:
          </Text>
          <Text style={[styles.stepValue, { color: theme.colors.text.primary }]}>
            {`${step.volume}${getText('milliliters')}`}
          </Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={[styles.stepLabel, { color: theme.colors.text.secondary }]}>
            {getText('time')}:
          </Text>
          <Text style={[styles.stepValue, { color: theme.colors.text.primary }]}>
            {`${step.time}${getText('seconds')}`}
          </Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={[styles.stepLabel, { color: theme.colors.text.secondary }]}>
            {getText('temperature')}:
          </Text>
          <Text style={[styles.stepValue, { color: theme.colors.text.primary }]}>
            {`${step.temperature}${getText('celsius')}`}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('recipe')}
        showBack
        onBack={() => navigation.goBack()}
        rightIcon={isFavorite ? "favorite" : "favorite-outline"}
        onRightPress={toggleFavorite}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.recipeTitle, { color: theme.colors.text.primary }]}>
          {recipe.title}
        </Text>
        
        <Image 
          source={{ uri: recipe.imageUrl || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format' }} 
          style={styles.image} 
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="access-time" size={20} color={theme.colors.text.secondary} />
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              {recipe.brewTime} min
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="coffee" size={20} color={theme.colors.text.secondary} />
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              {recipe.coffeeAmount} g
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="opacity" size={20} color={theme.colors.text.secondary} />
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              {recipe.waterAmount} ml
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            {getText('description')}
          </Text>
          <Text style={[styles.sectionContent, { color: theme.colors.text.primary }]}>
            {recipe.description}
          </Text>
        </View>
        
        {recipe.steps && recipe.steps.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              {getText('steps')}
            </Text>
            {recipe.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary.main }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.stepText, { color: theme.colors.text.primary }]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        )}
        
        {recipe.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              {getText('notes')}
            </Text>
            <Text style={[styles.sectionContent, { color: theme.colors.text.primary }]}>
              {recipe.notes}
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('UpdateRecipe', { id: recipe.id })}
      >
        <Icon name="edit" size={24} color="#fff" />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  image: {
    width: SCREEN_WIDTH - (spacing.md * 2),
    height: 250,
    resizeMode: 'cover',
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: spacing.xs,
    fontSize: 14,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepDetails: {
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  stepValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
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