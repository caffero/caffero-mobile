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
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { getText } = useLanguage();
  const { theme } = useTheme();

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

  const handleBack = () => {
    const hasChanges = 
      formData.username !== (user?.username || '') || 
      formData.email !== (user?.email || '');

    if (hasChanges) {
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
      <Header title={getText('editProfile')} showBack onBack={handleBack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <Text style={[
              styles.label,
              theme.typography.body.large,
              { color: theme.colors.text.primary }
            ]}>
              {getText('username')}
            </Text>
            <TextInput
              style={[styles.input, { 
                ...theme.typography.body.medium,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.surface.secondary,
                borderColor: theme.colors.border.primary 
              }]}
              value={formData.username}
              onChangeText={(value) => handleChange('username', value)}
              placeholder={getText('enterUsername')}
              placeholderTextColor={theme.colors.text.tertiary}
            />

            <Text style={[
              styles.label,
              theme.typography.body.large,
              { color: theme.colors.text.primary }
            ]}>
              {getText('email')}
            </Text>
            <TextInput
              style={[styles.input, { 
                ...theme.typography.body.medium,
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.surface.secondary,
                borderColor: theme.colors.border.primary 
              }]}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              placeholder={getText('enterEmail')}
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: theme.colors.primary.main }]}
              onPress={handleSubmit}
            >
              <Text style={[
                styles.submitButtonText,
                theme.typography.body.large,
                { color: theme.colors.primary.contrastText }
              ]}>
                {getText('saveChanges')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 