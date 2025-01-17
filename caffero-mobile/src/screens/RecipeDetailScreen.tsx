import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../contexts/ThemeContext';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>['route'];
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
    amount: '15g',
  },
  useMilk: true,
  milk: {
    volume: 100,
    temperature: 65,
  },
  pouringSteps: [
    { volume: 50, time: 30, temperature: 93 },
    { volume: 100, time: 60, temperature: 93 },
    { volume: 100, time: 90, temperature: 92 },
  ],
});

export const RecipeDetailScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  
  const recipe = getRecipe(id);

  const renderPouringStep = (step: PouringStep, index: number) => (
    <View key={index} style={[styles.stepContainer, { borderBottomColor: theme.colors.border.primary }]}>
      <Text style={[styles.stepNumber, { color: theme.colors.primary.main }]}>
        {index + 1}
      </Text>
      <View style={styles.stepDetails}>
        <View style={styles.stepRow}>
          <Text style={[styles.stepLabel, { color: theme.colors.text.secondary }]}>
            Water Volume:
          </Text>
          <Text style={[styles.stepValue, { color: theme.colors.text.primary }]}>
            {step.volume}ml
          </Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={[styles.stepLabel, { color: theme.colors.text.secondary }]}>
            Time:
          </Text>
          <Text style={[styles.stepValue, { color: theme.colors.text.primary }]}>
            {step.time}s
          </Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={[styles.stepLabel, { color: theme.colors.text.secondary }]}>
            Temperature:
          </Text>
          <Text style={[styles.stepValue, { color: theme.colors.text.primary }]}>
            {step.temperature}°C
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          {recipe.title}
        </Text>
        
        <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Equipment
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.text.primary }]}>
            {recipe.equipment}
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Coffee
          </Text>
          <Text style={[styles.sectionText, { color: theme.colors.text.primary }]}>
            {recipe.coffee.name}
          </Text>
          <Text style={[styles.sectionSubtext, { color: theme.colors.text.secondary }]}>
            Amount: {recipe.coffee.amount}
          </Text>
        </View>

        {recipe.useMilk && (
          <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Milk
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.text.primary }]}>
              Volume: {recipe.milk.volume}ml
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.text.primary }]}>
              Temperature: {recipe.milk.temperature}°C
            </Text>
          </View>
        )}

        <View style={[styles.section, { backgroundColor: theme.colors.surface.primary }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Pouring Steps
          </Text>
          {recipe.pouringSteps.map((step, index) => renderPouringStep(step, index))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('UpdateRecipe', { id })}
      >
        <Icon name="edit" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'System', // Consider using a handwriting font
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#34495e',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 4,
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#3498db',
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