import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { getText } = useLanguage();

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.username.trim() || !formData.email.trim()) {
      Alert.alert(getText('error'), getText('usernameEmailRequired'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert(getText('error'), getText('invalidEmail'));
      return;
    }

    // TODO: Implement profile update logic
    Alert.alert(
      getText('success'),
      getText('profileUpdateSuccess'),
      [{ text: getText('ok'), onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Header title={getText('editProfile')} showBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>{getText('username')}</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(value) => handleChange('username', value)}
              placeholder={getText('enterUsername')}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>{getText('email')}</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder={getText('enterEmail')}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>{getText('saveChanges')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 