import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Header } from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

export const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { theme } = useTheme();

  const isFormValid = name.trim() && email.trim() && message.trim();

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, email, message });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="Contact Us" showBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>
              Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface.primary,
                  borderColor: theme.colors.border.primary,
                  color: theme.colors.text.primary,
                }
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.text.tertiary}
            />

            <Text style={[styles.label, { color: theme.colors.text.primary }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface.primary,
                  borderColor: theme.colors.border.primary,
                  color: theme.colors.text.primary,
                }
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { color: theme.colors.text.primary }]}>
              Message
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.messageInput,
                {
                  backgroundColor: theme.colors.surface.primary,
                  borderColor: theme.colors.border.primary,
                  color: theme.colors.text.primary,
                }
              ]}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message here"
              placeholderTextColor={theme.colors.text.tertiary}
              multiline
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isFormValid && styles.submitButtonDisabled,
                { backgroundColor: isFormValid ? theme.colors.primary.main : theme.colors.disabled.main }
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid}
            >
              <Text style={[
                styles.submitButtonText,
                { color: isFormValid ? theme.colors.text.inverse : theme.colors.disabled.contrastText }
              ]}>
                Send Message
              </Text>
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
  messageInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 