import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'UpdateEquipment'>['route'];
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const equipmentKinds = ['Chemex', 'V60', 'Aeropress', 'French Press', 'Moka Pot'];
const equipmentTypes = ['Dripper', 'Immersion', 'Espresso', 'Grinder', 'Scale', 'Kettle'];

// Dummy data - replace with API call
const getEquipment = (id: string) => ({
  id,
  title: 'My Chemex',
  kind: 'Chemex',
  type: 'Dripper',
});

export const UpdateEquipmentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [selectedKind, setSelectedKind] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const equipment = getEquipment(id);
    setTitle(equipment.title);
    setSelectedKind(equipment.kind);
    setSelectedType(equipment.type);
  }, [id]);

  const handleSave = () => {
    if (!title || !selectedKind || !selectedType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Update equipment logic here
    Alert.alert(
      'Success',
      'Equipment updated successfully!',
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
        title="Update Equipment"
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
          <Text style={styles.saveButtonText}>Update Equipment</Text>
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
