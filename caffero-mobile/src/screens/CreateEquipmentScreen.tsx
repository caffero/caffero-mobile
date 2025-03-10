import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';
import { useEquipmentService } from '../api/services/equipmentService';
import { CreateEquipment } from '../api/models/Equipment';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type EquipmentType = {
  id: string;
  name: string;
};

export const CreateEquipmentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const { theme } = useTheme();
  const equipmentService = useEquipmentService();
  
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  useEffect(() => {
    fetchEquipmentTypes();
  }, []);

  const fetchEquipmentTypes = async () => {
    try {
      setIsLoadingTypes(true);
      const types = await equipmentService.getEquipmentTypes();
      const formattedTypes = types.map(type => ({
        id: type.id,
        name: type.equipmentTypeName
      }));
      setEquipmentTypes(formattedTypes);
      setIsLoadingTypes(false);
    } catch (error) {
      console.error('Error fetching equipment types:', error);
      Alert.alert(
        getText('error'),
        getText('failedToLoadEquipmentTypes')
      );
      setIsLoadingTypes(false);
    }
  };

  const handleSave = async () => {
    if (!title || !selectedType) {
      Alert.alert(getText('error'), getText('fillAllFields'));
      return;
    }

    try {
      setIsLoading(true);
      
      const newEquipment: CreateEquipment = {
        title,
        equipmentId: selectedType,
        imageUrl: '', // This would typically come from an image upload feature
      };
      
      await equipmentService.create(newEquipment);
      
      Alert.alert(
        getText('success'),
        getText('equipmentAddedSuccess'),
        [{ text: getText('ok'), onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error creating equipment:', error);
      Alert.alert(
        getText('error'),
        getText('failedToCreateEquipment'),
        [{ text: getText('ok') }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (title || selectedType) {
      Alert.alert(
        getText('discardChanges'),
        getText('discardChangesMessage'),
        [
          { text: getText('cancel'), style: 'cancel' },
          { text: getText('discard'), style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <Screen style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={getText('createEquipment')}
        showBack
        onBack={handleBack}
      />
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>
            {getText('title')}
          </Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: theme.colors.surface.secondary,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border.primary
              }
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder={getText('enterEquipmentName')}
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>
            {getText('equipmentType')}
          </Text>
          
          {isLoadingTypes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={theme.colors.primary.main} />
              <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
                {getText('loadingEquipmentTypes')}
              </Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {equipmentTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.optionButton,
                    { backgroundColor: theme.colors.surface.secondary },
                    selectedType === type.id && { backgroundColor: theme.colors.primary.main },
                  ]}
                  onPress={() => setSelectedType(type.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: theme.colors.text.primary },
                      selectedType === type.id && { color: theme.colors.text.inverse },
                    ]}
                  >
                    {getText(`equipmentType.${type.name}`) || type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <TouchableOpacity 
          style={[
            styles.saveButton, 
            { backgroundColor: theme.colors.primary.main },
            (isLoading || isLoadingTypes) && { opacity: 0.7 }
          ]} 
          onPress={handleSave}
          disabled={isLoading || isLoadingTypes}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.text.inverse} />
          ) : (
            <Text style={[styles.saveButtonText, { color: theme.colors.text.inverse }]}>
              {getText('saveEquipment')}
            </Text>
          )}
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
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
}); 