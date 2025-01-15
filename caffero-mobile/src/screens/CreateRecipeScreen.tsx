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
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PouringStep {
  volume: string;
  time: string;
  temperature: string;
}

export const CreateRecipeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedCoffee, setSelectedCoffee] = useState('');
  const [useMilk, setUseMilk] = useState(false);
  const [milkVolume, setMilkVolume] = useState('');
  const [milkTemperature, setMilkTemperature] = useState('');
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
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Save recipe logic here
    Alert.alert(
      'Success',
      'Recipe saved successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleBack = () => {
    Alert.alert(
      'Discard Changes',
      'Your changes will be lost. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create Recipe"
        showBack
        onBack={handleBack}
      />
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipe Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter recipe name"
          />
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {/* Navigate to equipment selection */}}
        >
          <Text style={styles.selectButtonText}>
            {selectedEquipment || 'Select Equipment'}
          </Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {/* Navigate to coffee selection */}}
        >
          <Text style={styles.selectButtonText}>
            {selectedCoffee || 'Select Coffee Bean'}
          </Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Use Milk</Text>
          <Switch value={useMilk} onValueChange={setUseMilk} />
        </View>

        {useMilk && (
          <View style={styles.milkContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Milk Volume (ml)</Text>
              <TextInput
                style={styles.input}
                value={milkVolume}
                onChangeText={setMilkVolume}
                keyboardType="numeric"
                placeholder="Enter milk volume"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Milk Temperature (°C)</Text>
              <TextInput
                style={styles.input}
                value={milkTemperature}
                onChangeText={setMilkTemperature}
                keyboardType="numeric"
                placeholder="Enter milk temperature"
              />
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Pouring Steps</Text>
        {pouringSteps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>Step {index + 1}</Text>
            <View style={styles.stepInputs}>
              <View style={styles.stepInputContainer}>
                <Text style={styles.stepLabel}>Volume (ml)</Text>
                <TextInput
                  style={styles.stepInput}
                  value={step.volume}
                  onChangeText={(value) => handleStepChange(index, 'volume', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.stepInputContainer}>
                <Text style={styles.stepLabel}>Time (s)</Text>
                <TextInput
                  style={styles.stepInput}
                  value={step.time}
                  onChangeText={(value) => handleStepChange(index, 'time', value)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.stepInputContainer}>
                <Text style={styles.stepLabel}>Temp (°C)</Text>
                <TextInput
                  style={styles.stepInput}
                  value={step.temperature}
                  onChangeText={(value) => handleStepChange(index, 'temperature', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addStepButton} onPress={handleAddStep}>
          <Icon name="add" size={24} color="#007AFF" />
          <Text style={styles.addStepText}>Add Step</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  stepInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  stepLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  stepInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
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
}); 