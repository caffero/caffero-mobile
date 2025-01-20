import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import * as ImagePicker from 'expo-image-picker';
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SuggestProductScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getText } = useLanguage();
  const [productName, setProductName] = useState('');
  const [roastery, setRoastery] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert(getText('permissionRequired'), getText('photoLibraryPermission'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!productName || !roastery || !description || !image) {
      Alert.alert(getText('error'), getText('fillAllFields'));
      return;
    }

    Alert.alert(
      getText('success'),
      getText('suggestionThankYou'),
      [{ text: getText('ok'), onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={getText('suggestProduct')}
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePick}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="add-a-photo" size={40} color="#666" />
              <Text style={styles.imagePlaceholderText}>{getText('addProductImage')}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{getText('productName')}</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder={getText('enterCoffeeName')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{getText('roastery')}</Text>
          <TextInput
            style={styles.input}
            value={roastery}
            onChangeText={setRoastery}
            placeholder={getText('enterRoasteryName')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{getText('description')}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder={getText('tellUsAboutCoffee')}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{getText('submitSuggestion')}</Text>
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
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
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
  textArea: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 