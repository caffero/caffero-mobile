import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const equipmentKinds = ['Chemex', 'V60', 'Aeropress', 'French Press', 'Moka Pot'];
const equipmentTypes = ['Dripper', 'Immersion', 'Espresso', 'Grinder', 'Scale', 'Kettle'];

export const CreateEquipmentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [selectedKind, setSelectedKind] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSave = () => {
    if (!title || !selectedKind || !selectedType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Save equipment logic here
    Alert.alert(
      'Success',
      'Equipment added successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleBack = () => {
    if (title || selectedKind || selectedType) {
      Alert.alert(
        'Discard Changes',
        'Your changes will be lost. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create Equipment"
        showBack
        onBack={handleBack}
      />
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter equipment name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Equipment Kind</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {equipmentKinds.map((kind) => (
              <TouchableOpacity
                key={kind}
                style={[
                  styles.optionButton,
                  selectedKind === kind && styles.selectedOption,
                ]}
                onPress={() => setSelectedKind(kind)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedKind === kind && styles.selectedOptionText,
                  ]}
                >
                  {kind}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Equipment Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {equipmentTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  selectedType === type && styles.selectedOption,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedType === type && styles.selectedOptionText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Equipment</Text>
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
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 