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
  ActivityIndicator,
} from 'react-native';
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useRecipeService } from '../api/services/recipeService';
import { CreateRecipe as CreateRecipeModel } from '../api/models/Recipe';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CreateRecipeRouteProp = RouteProp<RootStackParamList, 'CreateRecipe'>;

interface PouringStep {
  volume: string;
  time: string;
  temperature: string;
}

export const CreateRecipeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CreateRecipeRouteProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const recipeService = useRecipeService();
  
  const [title, setTitle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');
  const [selectedCoffee, setSelectedCoffee] = useState('');
  const [selectedCoffeeId, setSelectedCoffeeId] = useState('');
  const [grindSize, setGrindSize] = useState('');
  const [waterTemperature, setWaterTemperature] = useState('');
  const [brewTime, setBrewTime] = useState('');
  const [coffeeAmount, setCoffeeAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [useMilk, setUseMilk] = useState(false);
  const [milkVolume, setMilkVolume] = useState('');
  const [milkTemperature, setMilkTemperature] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [pouringSteps, setPouringSteps] = useState<PouringStep[]>([
    { volume: '', time: '', temperature: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Check for selected coffee from navigation params
  useEffect(() => {
    if (route.params?.selectedCoffeeId && route.params?.selectedCoffeeName) {
      setSelectedCoffeeId(route.params.selectedCoffeeId);
      setSelectedCoffee(route.params.selectedCoffeeName);
    }
    
    if (route.params?.selectedEquipmentId && route.params?.selectedEquipmentName) {
      setSelectedEquipmentId(route.params.selectedEquipmentId);
      setSelectedEquipment(route.params.selectedEquipmentName);
    }
  }, [route.params]);

  const handleAddStep = () => {
    setPouringSteps([...pouringSteps, { volume: '', time: '', temperature: '' }]);
  };

  const handleStepChange = (index: number, field: keyof PouringStep, value: string) => {
    const newSteps = [...pouringSteps];
    newSteps[index][field] = value;
    setPouringSteps(newSteps);
  };

  const handleSave = async () => {
    if (!title || !selectedEquipmentId || !selectedCoffeeId || !grindSize || 
        !waterTemperature || !brewTime || !coffeeAmount || !waterAmount) {
      Alert.alert(getText('error'), getText('fillRequiredFields'));
      return;
    }

    try {
      setIsLoading(true);
      
      // Format pouring steps for API
      const formattedSteps = pouringSteps.map(step => 
        `Volume: ${step.volume}ml, Time: ${step.time}s, Temperature: ${step.temperature}°C`
      );
      
      // If using milk, add milk information to steps
      if (useMilk && milkVolume && milkTemperature) {
        formattedSteps.push(`Milk: ${milkVolume}ml at ${milkTemperature}°C`);
      }
      
      // Create recipe data object according to the API model
      const recipeData: CreateRecipeModel = {
        title,
        coffeeBeanId: selectedCoffeeId,
        equipmentId: selectedEquipmentId,
        grindSize,
        waterTemperature: parseFloat(waterTemperature),
        brewTime: parseFloat(brewTime),
        coffeeAmount: parseFloat(coffeeAmount),
        waterAmount: parseFloat(waterAmount),
        description,
        steps: formattedSteps,
        notes
      };
      
      // Call the API to create the recipe
      await recipeService.create(recipeData);
      
      Alert.alert(
        getText('success'),
        getText('recipeCreateSuccess'),
        [{ text: getText('ok'), onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error creating recipe:', error);
      Alert.alert(
        getText('error'),
        getText('recipeCreateError')
      );
    } finally {
      setIsLoading(false);
    }
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

  const handleSelectEquipment = () => {
    // Navigate to equipment selection screen
    navigation.navigate('SelectEquipment');
  };

  const handleSelectCoffee = () => {
    // Navigate to coffee selection screen
    navigation.navigate('SelectCoffeeBean');
  };

  if (isLoading) {
    return (
      <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={getText('createRecipe')}
          showBack
          onBack={handleBack}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
          <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
            {getText('creatingRecipe')}
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('createRecipe')}
        showBack
        onBack={handleBack}
      />
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
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

        <View style={styles.privacySection}>
          <View style={styles.privacyHeader}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>
              {getText('recipePrivacy')}
            </Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ 
                false: theme.colors.border.primary, 
                true: theme.colors.primary.main 
              }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
          <Text style={[styles.privacyDescription, { color: theme.colors.text.secondary }]}>
            {isPublic ? getText('publicRecipeDescription') : getText('privateRecipeDescription')}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.selectButton, { 
            backgroundColor: theme.colors.surface.secondary,
            borderColor: theme.colors.border.primary 
          }]}
          onPress={handleSelectEquipment}
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
          onPress={handleSelectCoffee}
        >
          <Text style={[styles.selectButtonText, { color: theme.colors.text.primary }]}>
            {selectedCoffee || getText('selectCoffeeBean')}
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('grindSize')}</Text>
          <TextInput
            style={[styles.input, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={grindSize}
            onChangeText={setGrindSize}
            placeholder={getText('enterGrindSize')}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('waterTemperature')}</Text>
          <TextInput
            style={[styles.input, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={waterTemperature}
            onChangeText={setWaterTemperature}
            keyboardType="numeric"
            placeholder={getText('enterWaterTemperature')}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('brewTime')}</Text>
          <TextInput
            style={[styles.input, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={brewTime}
            onChangeText={setBrewTime}
            keyboardType="numeric"
            placeholder={getText('enterBrewTime')}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('coffeeAmount')}</Text>
          <TextInput
            style={[styles.input, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={coffeeAmount}
            onChangeText={setCoffeeAmount}
            keyboardType="numeric"
            placeholder={getText('enterCoffeeAmount')}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('waterAmount')}</Text>
          <TextInput
            style={[styles.input, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={waterAmount}
            onChangeText={setWaterAmount}
            keyboardType="numeric"
            placeholder={getText('enterWaterAmount')}
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('description')}</Text>
          <TextInput
            style={[styles.textArea, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={description}
            onChangeText={setDescription}
            placeholder={getText('enterDescription')}
            placeholderTextColor={theme.colors.text.tertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={[styles.switchContainer, { 
          backgroundColor: theme.colors.surface.secondary,
          borderColor: theme.colors.border.primary 
        }]}>
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
          <View style={styles.milkContainer}>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>{getText('pouringSteps')}</Text>
          {pouringSteps.map((step, index) => (
            <View key={index} style={[styles.stepContainer, { 
              backgroundColor: theme.colors.surface.secondary,
              borderColor: theme.colors.border.primary 
            }]}>
              <Text style={[styles.stepNumber, { color: theme.colors.text.primary }]}>
                {getText('step')} {index + 1}
              </Text>
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

        <TouchableOpacity 
          style={[styles.addStepButton, { borderColor: theme.colors.primary.main }]} 
          onPress={handleAddStep}
        >
          <Icon name="add" size={24} color={theme.colors.primary.main} />
          <Text style={[styles.addStepText, { color: theme.colors.primary.main }]}>
            {getText('addStep')}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>{getText('notes')}</Text>
          <TextInput
            style={[styles.textArea, { 
              color: theme.colors.text.primary,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.primary 
            }]}
            value={notes}
            onChangeText={setNotes}
            placeholder={getText('enterNotes')}
            placeholderTextColor={theme.colors.text.tertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.colors.primary.main }]} 
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: theme.colors.text.inverse }]}>
            {getText('saveRecipe')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
  },
  selectButtonText: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
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
    borderWidth: 1,
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
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addStepText: {
    fontSize: 16,
    marginLeft: 8,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  privacySection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  privacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  privacyDescription: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
}); 