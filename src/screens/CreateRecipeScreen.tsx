import React, { useState } from 'react';
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
import Screen from '../components/Screen';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PouringStep {
  volume: string;
  time: string;
  temperature: string;
}

export const CreateRecipeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedCoffee, setSelectedCoffee] = useState('');
  const [useMilk, setUseMilk] = useState(false);
  const [milkVolume, setMilkVolume] = useState('');
  const [milkTemperature, setMilkTemperature] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [pouringSteps, setPouringSteps] = useState<PouringStep[]>([
    { volume: '', time: '', temperature: '' },
  ]);

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

    // Save recipe logic here
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
          onPress={() => {/* Navigate to equipment selection */}}
        >
          <Text style={[styles.selectButtonText, { color: theme.colors.text.primary }]}>
            {selectedEquipment || getText('selectEquipment')}
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {/* Navigate to coffee selection */}}
        >
          <Text style={styles.selectButtonText}>
            {selectedCoffee || getText('selectCoffeeBean')}
          </Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>{getText('useMilk')}</Text>
          <Switch value={useMilk} onValueChange={setUseMilk} />
        </View>

        {useMilk && (
          <View style={styles.milkContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{getText('milkVolume')}</Text>
              <TextInput
                style={styles.input}
                value={milkVolume}
                onChangeText={setMilkVolume}
                keyboardType="numeric"
                placeholder={getText('enterMilkVolume')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{getText('milkTemperature')}</Text>
              <TextInput
                style={styles.input}
                value={milkTemperature}
                onChangeText={setMilkTemperature}
                keyboardType="numeric"
                placeholder={getText('enterMilkTemperature')}
              />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getText('pouringSteps')}</Text>
          {pouringSteps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepNumber}>{getText('step')} {index + 1}</Text>
              <View style={styles.stepInputs}>
                <View style={styles.stepInput}>
                  <Text style={styles.label}>{getText('volume')}</Text>
                  <TextInput
                    style={styles.input}
                    value={step.volume}
                    onChangeText={(value) => handleStepChange(index, 'volume', value)}
                    keyboardType="numeric"
                    placeholder={getText('enterVolume')}
                  />
                </View>
                <View style={styles.stepInput}>
                  <Text style={styles.label}>{getText('time')}</Text>
                  <TextInput
                    style={styles.input}
                    value={step.time}
                    onChangeText={(value) => handleStepChange(index, 'time', value)}
                    keyboardType="numeric"
                    placeholder={getText('enterTime')}
                  />
                </View>
                <View style={styles.stepInput}>
                  <Text style={styles.label}>{getText('temperature')}</Text>
                  <TextInput
                    style={styles.input}
                    value={step.temperature}
                    onChangeText={(value) => handleStepChange(index, 'temperature', value)}
                    keyboardType="numeric"
                    placeholder={getText('enterTemperature')}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addStepButton} onPress={handleAddStep}>
          <Icon name="add" size={24} color="#007AFF" />
          <Text style={styles.addStepText}>{getText('addStep')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{getText('saveRecipe')}</Text>
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
    padding: 12,
    marginBottom: 24,
  },
  addStepText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
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
  section: {
    marginBottom: 24,
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
    color: '#666',
  },
}); 