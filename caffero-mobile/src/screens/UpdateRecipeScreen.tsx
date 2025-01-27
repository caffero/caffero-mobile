import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'UpdateRecipe'>['route'];
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PouringStep {
  volume: string;
  time: string;
  temperature: string;
}

// Dummy data - replace with API call
const getRecipe = (id: string) => ({
  id,
  title: 'Morning V60',
  equipment: 'Hario V60',
  coffee: 'Ethiopian Yirgacheffe',
  useMilk: true,
  milk: {
    volume: '100',
    temperature: '65',
  },
  pouringSteps: [
    { volume: '50', time: '30', temperature: '93' },
    { volume: '100', time: '60', temperature: '93' },
  ],
});

export const UpdateRecipeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  const { getText } = useLanguage();
  const { theme } = useTheme();

  const [title, setTitle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedCoffee, setSelectedCoffee] = useState('');
  const [useMilk, setUseMilk] = useState(false);
  const [milkVolume, setMilkVolume] = useState('');
  const [milkTemperature, setMilkTemperature] = useState('');
  const [pouringSteps, setPouringSteps] = useState<PouringStep[]>([]);

  useEffect(() => {
    const recipe = getRecipe(id);
    setTitle(recipe.title);
    setSelectedEquipment(recipe.equipment);
    setSelectedCoffee(recipe.coffee);
    setUseMilk(recipe.useMilk);
    if (recipe.useMilk) {
      setMilkVolume(recipe.milk.volume);
      setMilkTemperature(recipe.milk.temperature);
    }
    setPouringSteps(recipe.pouringSteps);
  }, [id]);

  const handleAddStep = () => {
    setPouringSteps([...pouringSteps, { volume: '', time: '', temperature: '' }]);
  };

  const handleStepChange = (index: number, field: keyof PouringStep, value: string) => {
    const newSteps = [...pouringSteps];
    newSteps[index][field] = value;
    setPouringSteps(newSteps);
  };

  const handleSave = () => {
    if (!title || !selectedEquipment || !selectedCoffee) {
      Alert.alert(getText('error'), getText('fillRequiredFields'));
      return;
    }

    // Update recipe logic here
    Alert.alert(
      getText('success'),
      getText('recipeUpdateSuccess'),
      [{ text: getText('ok'), onPress: () => navigation.goBack() }]
    );
  };

  const handleBack = () => {
    Alert.alert(
      getText('discardChanges'),
      getText('discardChangesMessage'),
      [
        { text: getText('cancel'), style: 'cancel' },
        { text: getText('discard'), style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('updateRecipe')}
        showBack
        onBack={handleBack}
      />
      <ScrollView style={styles.content}>
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface.secondary }]}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('recipeTitle')}</Text>
          <TextInput
            style={[styles.input, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={title}
            onChangeText={setTitle}
            placeholder={getText('enterRecipeName')}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        <TouchableOpacity
          style={[styles.selectButton, { 
            backgroundColor: theme.colors.surface.secondary,
            borderColor: theme.colors.border.primary 
          }]}
          onPress={() => {/* Navigate to equipment selection */}}
        >
          <Text style={[styles.selectButtonText, { color: theme.colors.text.primary }]}>
            {selectedEquipment || getText('selectEquipment')}
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectButton, { 
            backgroundColor: theme.colors.surface.secondary,
            borderColor: theme.colors.border.primary 
          }]}
          onPress={() => {/* Navigate to coffee selection */}}
        >
          <Text style={[styles.selectButtonText, { color: theme.colors.text.primary }]}>
            {selectedCoffee || getText('selectCoffeeBean')}
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('useMilk')}</Text>
          <Switch 
            value={useMilk} 
            onValueChange={setUseMilk}
            trackColor={{ 
              false: theme.colors.border.primary, 
              true: theme.colors.primary.main 
            }}
            thumbColor={theme.colors.background.primary}
          />
        </View>

        {useMilk && (
          <View style={[styles.milkContainer, { backgroundColor: theme.colors.surface.secondary }]}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('milkVolume')}</Text>
              <TextInput
                style={[styles.input, { 
                  color: theme.colors.text.primary,
                  backgroundColor: theme.colors.surface.primary,
                  borderColor: theme.colors.border.primary 
                }]}
                value={milkVolume}
                onChangeText={setMilkVolume}
                keyboardType="numeric"
                placeholder={getText('enterMilkVolume')}
                placeholderTextColor={theme.colors.text.tertiary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('milkTemperature')}</Text>
              <TextInput
                style={[styles.input, { 
                  color: theme.colors.text.primary,
                  backgroundColor: theme.colors.surface.primary,
                  borderColor: theme.colors.border.primary 
                }]}
                value={milkTemperature}
                onChangeText={setMilkTemperature}
                keyboardType="numeric"
                placeholder={getText('enterMilkTemperature')}
                placeholderTextColor={theme.colors.text.tertiary}
              />
            </View>
          </View>
        )}

        <View style={[styles.section, { backgroundColor: theme.colors.surface.secondary }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>{getText('pouringSteps')}</Text>
          {pouringSteps.map((step, index) => (
            <View key={index} style={[styles.stepContainer, { backgroundColor: theme.colors.surface.primary }]}>
              <Text style={[styles.stepNumber, { color: theme.colors.text.primary }]}>{getText('step')} {index + 1}</Text>
              <View style={styles.stepInputs}>
                <View style={styles.stepInput}>
                  <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('volume')}</Text>
                  <TextInput
                    style={[styles.input, { 
                      color: theme.colors.text.primary,
                      backgroundColor: theme.colors.surface.primary,
                      borderColor: theme.colors.border.primary 
                    }]}
                    value={step.volume}
                    onChangeText={(value) => handleStepChange(index, 'volume', value)}
                    keyboardType="numeric"
                    placeholder={getText('enterVolume')}
                    placeholderTextColor={theme.colors.text.tertiary}
                  />
                </View>
                <View style={styles.stepInput}>
                  <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('time')}</Text>
                  <TextInput
                    style={[styles.input, { 
                      color: theme.colors.text.primary,
                      backgroundColor: theme.colors.surface.primary,
                      borderColor: theme.colors.border.primary 
                    }]}
                    value={step.time}
                    onChangeText={(value) => handleStepChange(index, 'time', value)}
                    keyboardType="numeric"
                    placeholder={getText('enterTime')}
                    placeholderTextColor={theme.colors.text.tertiary}
                  />
                </View>
                <View style={styles.stepInput}>
                  <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('temperature')}</Text>
                  <TextInput
                    style={[styles.input, { 
                      color: theme.colors.text.primary,
                      backgroundColor: theme.colors.surface.primary,
                      borderColor: theme.colors.border.primary 
                    }]}
                    value={step.temperature}
                    onChangeText={(value) => handleStepChange(index, 'temperature', value)}
                    keyboardType="numeric"
                    placeholder={getText('enterTemperature')}
                    placeholderTextColor={theme.colors.text.tertiary}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addStepButton} onPress={handleAddStep}>
          <Icon name="add" size={24} color={theme.colors.primary.main} />
          <Text style={[styles.addStepText, { color: theme.colors.primary.main }]}>{getText('addStep')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.colors.primary.main }]} 
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: theme.colors.primary.contrastText }]}>
            {getText('updateRecipe')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 24,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  milkContainer: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  stepContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  stepInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  addStepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  addStepText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 